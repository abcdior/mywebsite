# Variables
IMAGE_NAME = whatsapp-lab
CONTAINER_NAME = whatsapp-instance
PORT = 8080

.PHONY: build run stop clean logs shell reup

# Build the multi-stage Docker image
build:
	@echo "Building Docker image..."
	docker build -t $(IMAGE_NAME) .

# Run the container (Mapping internal 8080 to host 8080)
run:
	@echo "Starting container on http://localhost:$(PORT)"
	docker run -d -p $(PORT):$(PORT) --name $(CONTAINER_NAME) $(IMAGE_NAME)

# Stop and remove the container (ignores errors if container doesn't exist)
stop:
	@echo "Stopping existing containers..."
	@docker stop $(CONTAINER_NAME)
	@docker rm $(CONTAINER_NAME)

# Clean up Docker images and the SQLite DB
clean: stop
	@echo "Cleaning up..."
	docker rmi $(IMAGE_NAME)
	rm -f go-backend/auth.db

# View real-time logs from the Go backend
logs:
	docker logs -f $(CONTAINER_NAME)

# Access the container shell (useful for Alpine debugging)
shell:
	docker exec -it $(CONTAINER_NAME) sh

# Rebuild and restart in one go
reup: build run