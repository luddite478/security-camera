#!/bin/bash

cd nginx-rtmp && docker build -t nginx-rtmp .
cd ../tg-notificator && docker build -t tg-notificator .
cd ../video-cutter && docker build -t video-cutter .

