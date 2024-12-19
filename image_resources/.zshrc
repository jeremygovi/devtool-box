# Enable Powerlevel10k instant prompt
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# Path to oh-my-zsh installation
export ZSH="$HOME/.oh-my-zsh"

# Set theme
ZSH_THEME="powerlevel10k/powerlevel10k"

# Plugins
plugins=(git docker kubectl helm aws)

source $ZSH/oh-my-zsh.sh

# Aliases
alias k="kubectl"
alias h="helm"
alias d="docker"
alias g="git"

# Source Powerlevel10k config
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh