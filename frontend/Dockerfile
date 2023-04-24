# 
# Build stage 1.
#
FROM node:14.19-alpine

COPY . /home/node/app
WORKDIR /home/node/app
RUN npm --dd install
#for newer versions of node.js one might needs to use $(npm pkg get version) here
RUN export REACT_APP_VERSION=$(npm info my-app version) && npm --dd run-script build

#
# Build stage 2.
#

FROM nginx:alpine
COPY --from=0 /home/node/app/build /usr/share/nginx/html/upload
# fix serving react router URLs
RUN   sed -i "s|index  index.html index.htm;|index  index.html index.htm;\n        try_files \$uri \$uri\/ \/upload\/index.html;|g" /etc/nginx/conf.d/default.conf
