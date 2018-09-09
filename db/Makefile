.phony: build run

build:
	docker build --pull -t graffic/nanocorp:db .

run:
	docker run --rm -it -p 27017:27017 graffic/nanocorp:db