# 
# Build stage 1.
#
FROM node:14.19-alpine

COPY . /home/node/app
WORKDIR /home/node/app
RUN npm --dd install
RUN npm --dd run-script build

#
# Build stage 2.
#

FROM nginx:alpine
COPY --from=0 /home/node/app/build /usr/share/nginx/html/upload