#!/bin/bash

cd rtmp-authenticator && docker build -t rtmp-authenticator .
cd ../nginx-rtmp && docker build -t nginx-rtmp .
cd ../tg-notificator && docker build -t tg-notificator .
cd ../video-cutter && docker build -t video-cutter .

