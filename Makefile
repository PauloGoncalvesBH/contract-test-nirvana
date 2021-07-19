.PHONY: provider-start provider-test-contract consumer-start consumer-test-contract 

# Comandos do Provider (sample-clientsService)

provider-start:
	@docker-compose run --rm provider-start

provider-test-contract:
	@docker-compose run --rm provider-test-contract

# Comandos do Consumer (sample-Frontend)

consumer-start:
	@docker-compose run --rm consumer-start

consumer-test-contract:
	@docker-compose run --rm consumer-test-contract
