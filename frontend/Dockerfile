# 
# Build stage 1.
#
FROM node:14.19-alpine

#docker run -v ${PWD}/upload_frontend:/home/node/app -v ${PWD}/deploy/upload_frontend/upload_frontend_build:/home/node/app/build -v ${PWD}/deploy/upload_frontend:/home/node/build_scripts -v ${PWD}/deploy/upload_frontend/env:/home/node/app/.env node:14.19-alpine ash home/node/build_scripts/build.sh

COPY . /home/node/app
WORKDIR /home/node/app
RUN npm --dd install
RUN npm --dd run-script build

#
# Build stage 2.
#

FROM nginx:alpine
COPY --from=0 /home/node/app/build /usr/share/nginx/html/