FROM node:lts-alpine as builder
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install
COPY ./ ./
RUN yarn build

FROM httpd:2.4-alpine
COPY --from=builder /usr/src/app/dist /usr/local/apache2/htdocs