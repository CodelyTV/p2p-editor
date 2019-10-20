FROM node:10
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install
COPY ./ ./
ENTRYPOINT [ "yarn" ]
CMD [ "start" ]
