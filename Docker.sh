#!/bin/bash

cd ./frontend && docker build -t frontend:latest .

cd .. && cd ./backend && docker build -t backend:latest .

cd .. && docker-compose up -d --build
