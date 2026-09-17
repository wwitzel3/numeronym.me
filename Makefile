REGISTRY ?= registry.wwitzel3.id
IMAGE    ?= $(REGISTRY)/numeronym
VERSION  ?= $(shell git describe --tags --always --dirty 2>/dev/null || echo dev)
PORT     ?= 8080

.PHONY: help install test check dist build release run clean

help:
	@echo "install  install dev dependencies with bun"
	@echo "test     run the unit tests"
	@echo "check    type-check with tsc"
	@echo "dist     build the static site into dist/"
	@echo "build    build the docker image ($(IMAGE):$(VERSION))"
	@echo "release  run tests, build, and push the image to $(REGISTRY)"
	@echo "run      serve the built image locally on http://localhost:$(PORT)"

install:
	bun install

test:
	bun test

check:
	bunx tsc --noEmit

dist:
	bun run build

build:
	docker build -t $(IMAGE):$(VERSION) -t $(IMAGE):latest .

release: test build
	docker push $(IMAGE):$(VERSION)
	docker push $(IMAGE):latest

run: build
	docker run --rm -p $(PORT):80 $(IMAGE):$(VERSION)

clean:
	rm -rf dist node_modules
	-docker rmi $(IMAGE):$(VERSION) $(IMAGE):latest 2>/dev/null
