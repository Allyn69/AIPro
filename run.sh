#!/bin/bash

# Start the docker instance of RabbitMQ, if they have docker
if which docker > /dev/null; then
	RABBITMQ_VERSION=3-management
	docker run -d -p 5672:5672 -p 15672:15672 rabbitmq:$RABBITMQ_VERSION
	docker run -d -p 27017:27017 -v $(pwd)/db_data:/data/db mongo
else
	echo "Docker not installed, please find another way to run your RabbitMQ server"
fi