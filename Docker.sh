#!/bin/bash

cd ./frontend-generic && docker build -t frontend:latest .

cd .. && docker-compose up -d --build