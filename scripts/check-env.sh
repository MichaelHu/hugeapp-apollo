#!/bin/bash

node_version=$(node -v | awk -Fv '{print $2}')
if [ $node_version != '8.9.4' ]; then
    echo 
    echo "# =================================== \033[31m\033[4mERROR\033[0m ==================================== #"
    echo "# 确保开发环境一致，保证代码构建质量，务必使用\033[47;30m  node-v8.9.4 \033[0m"
    echo "# 你当前使用\033[33m node-v$node_version \033[0m，请安装\033[33mnvm\033[0m并执行"
    echo "# \033[33m$ nvm use 8.9.4\033[0m"
    echo "# =================================== \033[31m\033[4mERROR\033[0m ==================================== #"
    echo 
    say oh, no, 同学，npm版本号不对, baba didi wuuuuu, lala la lala la
    exit 1
fi
