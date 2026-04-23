# --- Stage 1: Build React Frontend ---
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Stage 2: Build Go Backend ---
FROM golang:1.25-alpine AS backend-builder
WORKDIR /app

COPY go-backend/go.mod go-backend/go.sum ./
RUN go mod download
COPY go-backend/ .
# Build the binary
RUN CGO_ENABLED=0 GOOS=linux go build -o server main.go

# --- Stage 3: Final Lightweight Image ---
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/

# Copy the Go binary
COPY --from=backend-builder /app/server .
# Copy the React build files
COPY --from=frontend-builder /app/dist ./dist

# Render provides a PORT environment variable
ENV PORT=8080
EXPOSE 8080

CMD ["./server"]