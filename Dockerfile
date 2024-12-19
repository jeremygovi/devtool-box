FROM debian:bookworm

# Prevent interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Install base packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    wget \
    git \
    zsh \
    python3 \
    python3-pip \
    nodejs \
    npm \
    netcat-openbsd \
    iputils-ping \
    unzip \
    fonts-powerline \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install AWS CLI
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && ./aws/install \
    && rm -rf aws awscliv2.zip

# Install kubectl
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" \
    && chmod +x kubectl \
    && mv kubectl /usr/local/bin/

# Install Helm
RUN curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Install ArgoCD CLI
RUN curl -sSL -o argocd-linux-amd64 https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64 \
    && install -m 555 argocd-linux-amd64 /usr/local/bin/argocd \
    && rm argocd-linux-amd64

# Install Oh My Zsh and Powerlevel10k
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended \
    && git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

# Set up Zsh configuration
COPY image_resources/.zshrc /root/.zshrc
COPY image_resources/.p10k.zsh /root/.p10k.zsh

# Set up working directory
WORKDIR /app

# Copy application files
COPY package*.json tsconfig.json tsconfig.app.json ./

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install

COPY . .

# Build the application
RUN npm run build

# Expose port for web interface
EXPOSE 3000

# Set Zsh as default shell
SHELL ["/bin/zsh", "-c"]

# Start command
CMD ["npm", "start"]
