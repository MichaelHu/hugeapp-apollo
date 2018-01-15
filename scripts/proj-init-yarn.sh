#!/bin/bash

yarn add html-webpack-plugin --dev
exit 0
yarn add extract-text-webpack-plugin --dev

yarn init

# babel
yarn add babel-core babel-preset-react babel-preset-env --dev

# webpack and loaders
yarn add webpack webpack-dev-server --dev
yarn add babel-loader file-loader url-loader --dev
yarn add node-sass sass-loader css-loader style-loader --dev

# react
yarn add react react-dom react-router
yarn add redux react-redux react-router-redux

