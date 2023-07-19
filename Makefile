build:
	docker-compose build
	cd chroma && docker-compose up -d --build

start:
	docker-compose up -d
	cd chroma && docker-compose up -d

stop:
	docker-compose down
	cd chroma && docker-compose down

logs:
	docker-compose logs

.PHONY: build start stop logs