#制定node镜像的版本
FROM node:8.9-alpine
#移动当前目录下面的文件到app目录下
ADD . /app/
#进入到app目录下面，类似cd
WORKDIR /app
#对外暴露的端口
EXPOSE 8088
#程序启动脚本
CMD ["npm", "start"]