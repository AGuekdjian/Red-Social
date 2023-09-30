#!/bin/bash

check_exit_code() {
  if [ $? -ne 0 ]; then
    echo "Error en el comando: $1"
    exit 1
  fi
}
echo "***** Creando contenedor y levantando aplicacion *****"
sudo docker compose up -d --build
check_exit_code "sudo docker compose up -d --build"
