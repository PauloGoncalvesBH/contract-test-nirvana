.PHONY: provider-test-contract consumer-test-contract 

provider-test-contract:
	@echo "\n================================================"
	@echo "🚀 Running provider contract test..."
	@echo "================================================\n"
	@docker compose run --rm provider-test-contract

consumer-test-contract:
	@echo "\n================================================"
	@echo "🚀 Running consumer contract test..."
	@echo "================================================\n"
	@docker compose run --rm consumer-test-contract

publish-contract-to-pactbroker:
	@echo "\n================================================"
	@echo "🚀 Publishing contract to Pactbroker..."
	@echo "================================================\n"
	@	docker run --rm \
		-v ${PWD}/consumer-frontend/pacts:/app/pacts \
		-e PACT_BROKER_BASE_URL=http://pact-broker-staging.groupondev.com \
		-e PACT_BROKER_USERNAME="$(shell op read 'op://vgqmyqubm2vck2s44uqi5xadny/Pact Broker - Write Auth/username')" \
		-e PACT_BROKER_PASSWORD="$(shell op read 'op://vgqmyqubm2vck2s44uqi5xadny/Pact Broker - Write Auth/password')" \
		pactfoundation/pact-cli:1.5.0.3 \
		pact-broker publish \
		/app/pacts \
		--consumer-app-version $(shell git rev-parse HEAD) \
		--branch $(shell git branch --show-current)


## Pactflow - Ignore this section

PACT_CLI="docker run --rm -v ${PWD}:${PWD} -e PACT_BROKER_BASE_URL -e PACT_BROKER_TOKEN pactfoundation/pact-cli"
GITHUB_REPO := "paulogoncalves/contract-test-nirvana"
PROVIDER='clients-service'

# export the GITHUB_TOKEN environment variable before running this
create_github_token_secret:
	curl -v -X POST ${PACT_BROKER_BASE_URL}/secrets \
	-H "Authorization: Bearer ${PACT_BROKER_TOKEN}" \
	-H "Content-Type: application/json" \
	-H "Accept: application/hal+json" \
	-d  "{\"name\":\"githubToken\",\"description\":\"Github token\",\"value\":\"${GITHUB_TOKEN}\"}"

create_contract_requiring_verification_published_webhook:
	"${PACT_CLI}" \
	  broker create-webhook \
	  "https://api.github.com/repos/${GITHUB_REPO}/dispatches" \
	  --header 'Content-Type: application/json' 'Accept: application/vnd.github.everest-preview+json' 'Authorization: Bearer $${user.githubToken}' \
	  --request POST \
	  --data '{ "event_type": "contract_requiring_verification_published","client_payload": { "pact_url": "$${pactbroker.pactUrl}", "sha": "$${pactbroker.providerVersionNumber}", "branch":"$${pactbroker.providerVersionBranch}" , "message": "Verify changed pact for $${pactbroker.consumerName} version $${pactbroker.consumerVersionNumber} branch $${pactbroker.consumerVersionBranch} by $${pactbroker.providerVersionNumber} ($${pactbroker.providerVersionDescriptions})" } }' \
	  --provider ${PROVIDER} \
	  --contract-requiring-verification-published \
	  --description "contract_requiring_verification_published for ${PROVIDER}"

