build:
	docker-compose build
	npm install

start:
	docker-compose up -d
	cd chroma && docker-compose up -d --build && cd ..
	npm run dev

stop:
	docker-compose down
	cd chroma && docker-compose down && cd ..

logs:
	docker-compose logs

.PHONY: build start stop logs