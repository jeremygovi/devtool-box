RED=\033[0;31m
GREEN=\033[0;32m
YELLOW=\033[1;33m
BLUE=\033[0;34m
NC=\033[0m

# Règle par défaut (affiche l'aide)
.DEFAULT_GOAL := help

help: ## Show this help message
	@echo "$(YELLOW)Available commands:$(NC)"
	@awk 'BEGIN {FS = ":.*?##"} /^[a-zA-Z_-]+:.*?$$/ { \
		if (match(lastLine, "^##")) { \
			helpMsg = substr(lastLine, 4); \
			printf "  $(GREEN)%-30s$(NC) %s\n", $$1, helpMsg \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)

## Build the Docker container
build:
	docker-compose build

## Build the Docker container with progress plain
build-progress-plain:
	docker-compose --progress=plain build

## Build the Docker container with no cache
build-no-cache:
	docker-compose build --no-cache

## Run docker-compose up
up:
	@echo "Running docker-compose up"
	docker-compose up --force-recreate --remove-orphans

## Clean all the stuff
clean:
	@echo "$(GREEN)Cleaning up Docker containers, volumes, images, and caches$(NC)"
	docker system prune -af --volumes
