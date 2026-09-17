REGISTRY ?= registry.wwitzel3.id
IMAGE    ?= $(REGISTRY)/numeronym
VERSION  ?= $(shell git describe --tags --always --dirty 2>/dev/null || echo dev)
PORT     ?= 8080

.PHONY: help test css build release run clean

help:
	@echo "test     run the unit tests"
	@echo "css      rebuild vendor/tailwind/tailwind.min.css from tailwind/"
	@echo "build    build the docker image ($(IMAGE):$(VERSION))"
	@echo "release  run tests, build, and push the image to $(REGISTRY)"
	@echo "run      serve the built image locally on http://localhost:$(PORT)"

test:
	python3 -m unittest -v

css:
	npx --yes tailwindcss@3.4.17 -c tailwind/tailwind.config.js -i tailwind/input.css -o vendor/tailwind/tailwind.min.css --minify

build:
	docker build -t $(IMAGE):$(VERSION) -t $(IMAGE):latest .

release: test build
	docker push $(IMAGE):$(VERSION)
	docker push $(IMAGE):latest

run: build
	docker run --rm -p $(PORT):80 $(IMAGE):$(VERSION)

clean:
	rm -rf __pycache__
	-docker rmi $(IMAGE):$(VERSION) $(IMAGE):latest 2>/dev/null
