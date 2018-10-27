#! bin/bash

docker build -t etap.web .
docker run -d -p 8080:80 --name etapweb etap.web