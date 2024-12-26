from flask import Flask, jsonify, render_template, request
import os
import json
import logging
import subprocess

app = Flask(__name__)

app.logger.setLevel(logging.INFO) # oui c'est crade, on verra plus tard

@app.route('/')
def dashboard():
    app_version = os.getenv('APP_VERSION', 'non défini')
    return render_template('dashboard.html', app_version=app_version)

@app.route('/info')
def system_info():
    total_memory = os.sysconf('SC_PAGE_SIZE') * os.sysconf('SC_PHYS_PAGES')
    free_memory = os.sysconf('SC_PAGE_SIZE') * os.sysconf('SC_AVPHYS_PAGES')
    used_memory = total_memory - free_memory

    cpu_usage = os.getloadavg()[0]
    memory_info = {
        'total': round(total_memory / 1024 / 1024),
        'used': round(used_memory / 1024 / 1024),
        'free': round(free_memory / 1024 / 1024),
    }
    cpu_usage_percent = round((cpu_usage / os.cpu_count()) * 100)
    env_vars = "\n".join([f"{key}: {value}" for key, value in os.environ.items()])

    return render_template('system_info.html',
        hostname=os.uname().nodename,
        platform=os.uname().sysname,
        arch=os.uname().machine,
        cpuUsage=cpu_usage_percent,
        memoryUsage=memory_info,
        env_vars=env_vars
    )

@app.route('/version')
def version():
    app_version = os.getenv('APP_VERSION', 'non défini')
    return {"app_version": app_version}, 200

@app.route('/request-info')
def request_info():
    print(">>> Endpoint /request-info triggered", flush=True) 

    # Récupérer les informations de la requête
    request_data = {
        'Path': request.path,
        'Protocol': request.environ.get('SERVER_PROTOCOL'),
        'Method': request.method,
        'Headers': dict(request.headers),
        'URL Parameters': request.args.to_dict(),
        'Referer': request.referrer,
        'Cookies': request.cookies,
        'Hostname': request.host,
        'Remote Address': request.remote_addr,
    }

    # Utiliser le logger pour afficher les informations
    app.logger.info("========== Request Information ==========")
    app.logger.info(json.dumps(request_data, indent=2))
    app.logger.info("=========================================")

    # Passer les informations au template
    return render_template('request_info.html', request_data=request_data)

@app.route('/code-executor')
def code_executor():
    # Charger les noms des scripts disponibles
    scripts_dir = '/app/scripts'
    scripts = [f for f in os.listdir(scripts_dir) if os.path.isfile(os.path.join(scripts_dir, f))]
    return render_template('code_executor.html', scripts=scripts)

@app.route('/load-script')
def load_script():
    script_name = request.args.get('script')
    script_path = os.path.join('/app/scripts', script_name)
    try:
        with open(script_path, 'r') as file:
            content = file.read()
        return jsonify({'content': content})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/execute-script', methods=['POST'])
def execute_script():
    data = request.json
    script_content = data.get('script')

    script_path = '/app/temp_script.sh'
    try:
        # Écrire le contenu du script temporaire
        with open(script_path, 'w') as temp_script:
            temp_script.write(script_content)

        # Rendre le script exécutable
        os.chmod(script_path, 0o755)

        # Exécuter le script et capturer la sortie
        result = subprocess.run(['/bin/bash', script_path], capture_output=True, text=True)
        output = result.stdout + result.stderr

        return jsonify({'output': output})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if os.path.exists(script_path):
            os.remove(script_path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
