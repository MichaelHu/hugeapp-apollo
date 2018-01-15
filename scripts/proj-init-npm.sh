#!/bin/bash

npm init

# babel
npm install babel-core babel-preset-react babel-preset-env --save-dev

# webpack and loaders
npm install webpack webpack-dev-server --save-dev
npm install babel-loader file-loader url-loader --save-dev
npm install node-sass sass-loader css-loader style-loader --save-dev

# react
npm install react react-dom react-router --save
npm install redux react-redux react-router-redux --save

