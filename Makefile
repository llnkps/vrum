# Detect host IP depending on OS
HOST_IP := $(shell \
	if command -v hostname >/dev/null 2>&1 && hostname -I >/dev/null 2>&1; then \
		hostname -I | awk '{print $$1}'; \
	elif command -v ipconfig >/dev/null 2>&1; then \
		ipconfig getifaddr en0 || ipconfig getifaddr en1; \
	else \
		echo "127.0.0.1"; \
	fi \
)

gfa:
	cd ./src/openapi/ && \
	docker exec -i vrump-api_php php bin/console nelmio:apidoc:dump \
		--format=json \
		--server-url "http://$(HOST_IP):8000/" \
		> openapi.json && \
	ls -lrt && echo ${PWD} && \
	docker run --rm -v ${PWD}/src/openapi:/local openapitools/openapi-generator-cli \
		generate -i /local/openapi.json -g typescript-fetch -o /local/client
