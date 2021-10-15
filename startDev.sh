#!/bin/bash

if yarn --cwd server/ run dev; then
	echo -ne "----------We good g!!!!!!!!!!!!!!!!!!!!"
else
	echo -ne "Error starting dev environment"
fi
