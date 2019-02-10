FROM node:lts-alpine as builder
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install
COPY ./ ./
RUN yarn build

FROM httpd:2.4-alpine
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf && \
    sed -i 's#AllowOverride [Nn]one#AllowOverride All#' /usr/local/apache2/conf/httpd.conf
COPY --from=builder /usr/src/app/dist /usr/local/apache2/htdocs