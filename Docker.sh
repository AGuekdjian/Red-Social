#!/bin/bash

check_exit_code() {
  if [ $? -ne 0 ]; then
    echo "Error en el comando: $1"
    exit 1
  fi
}

echo "***** Creando imagen de Frontend *****"
cd ./frontend && sudo docker build -t frontend:2.0 . && cd ..
check_exit_code "cd ./frontend && docker build -t frontend:1.0 . && cd .."

echo "***** Creando imagen de Backend *****"
cd ./backend && sudo docker build -t backend:2.0 . && cd ..
check_exit_code "cd ./backend && docker build -t backend:1.0 . && cd .."

echo "***** Creando y levantando contenedor *****"
sudo docker compose up -d --build
check_exit_code "docker-compose up -d --build"
