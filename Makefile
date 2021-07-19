.PHONY: test-contract-consumer test-contract-provider

test-contract-consumer:
	@docker-compose run --rm test-contract-consumer

test-contract-provider:
	@docker-compose run --rm test-contract-provider
