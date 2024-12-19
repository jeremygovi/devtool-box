import React, { useState } from 'react';
import { Play } from 'lucide-react';
import Editor from '@monaco-editor/react';

export default function CodeExecutor() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');

  const handleExecute = async () => {
    // This is a mock implementation
    // In the real container, this would send the code to the backend
    setOutput(`Executing ${language} code:\n${code}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Code Executor</h1>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-700 text-white rounded px-3 py-1"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="bash">Bash</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-lg">
          <Editor
            height="400px"
            defaultLanguage="javascript"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false }
            }}
          />
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Output</h2>
            <button
              onClick={handleExecute}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Run</span>
            </button>
          </div>
          <pre className="bg-gray-900 p-4 rounded-lg h-[332px] overflow-auto">
            {output || 'Output will appear here...'}
          </pre>
        </div>
      </div>
    </div>
  );
}
