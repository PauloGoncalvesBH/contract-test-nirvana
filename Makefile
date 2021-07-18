.PHONY: test-contract-consumer
# serverest 

# NAME_IMAGE=serverest
# PORT=3000

# build:
# 	@DOCKER_BUILDKIT=1 docker build -t ${NAME_IMAGE}/${NAME_IMAGE} .

# build/run: build run	

# run:
# 	@docker run -p  ${PORT}:3000 ${NAME_IMAGE}/${NAME_IMAGE}

# stop:
# 	@docker stop -t 0 $$(docker ps -q  --filter ancestor=${NAME_IMAGE}/${NAME_IMAGE})

# clean:
# 	@docker rmi -f serverest/serverest

test-contract-consumer:
	@docker-compose run --rm test-contract-consumer

# test:
# 	@docker-compose run --rm test

# test-mutation-diff:
# 	@docker-compose run --rm test-mutation-diff

# test-mutation:
# 	@docker-compose run --rm test-mutation
