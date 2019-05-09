#!/bin/bash

cd tg-notificator && docker build -t tg-notificator .
cd ../video-cutter && docker build -t video-cutter .
