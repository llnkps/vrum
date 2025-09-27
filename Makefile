gfa:
	cd ./src/openapi/ && \
	docker exec -i vrump-api_php php bin/console nelmio:apidoc:dump --format=json --server-url "http://nginx:8080/" > openapi.json && \
	ls -lrt && echo ${PWD} && \
	docker run --rm -v ${PWD}/src/openapi:/local openapitools/openapi-generator-cli \
		generate -i /local/openapi.json -g typescript-fetch -o /local/client