Summoners War Rune Optimizer Docker Image
=================

This is a fork of [tutum-docker-lamp](https://github.com/tutumcloud/lamp) to include [Summoners War Rune Database](http://swrunes.all.my/)

Usage
-----

Install docker following these instructions https://docs.docker.com/mac/

To create the image `swrunes`, execute the following command in the swrune-optimizer-docker folder:

    docker build -t swrunes .
    docker run -d -p 80:80 -p 3306:3306 swrunes

Wait for a few seconds and you can test the deployment:

    curl http://localhost/
