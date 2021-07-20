.PHONY: provider-test-contract consumer-test-contract 

provider-test-contract:
	@docker-compose run --rm provider-test-contract

consumer-test-contract:
	@docker-compose run --rm consumer-test-contract
