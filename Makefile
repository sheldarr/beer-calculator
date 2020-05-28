.PHONY: help build

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
USER_ID = `id -u $$USER`
UUID = `uuidgen`

DOCKER_COMPOSE_RUN_NODE = docker-compose run \
	--name "$(UUID)" \
	--user "$(USER_ID)" \
	--rm \
	node 

build: ## build for production
	$(DOCKER_COMPOSE_RUN_NODE) yarn build

dev: ## start development
	docker-compose run --name beer-calculator --rm --service-ports beer-calculator

install: ## stop all services
	$(DOCKER_COMPOSE_RUN_NODE) yarn install

prod: ## start production
	docker-compose -f docker-compose.yml -f docker-compose.production.yml up

up: ## start all services
	docker-compose up -d

down: ## stop all services
	docker-compose down --remove-orphans

lint:
	$(DOCKER_COMPOSE_RUN_NODE) yarn lint
