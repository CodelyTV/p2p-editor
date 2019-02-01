FROM node:lts-alpine

RUN npm install -g signalhub

ENTRYPOINT [ "signalhub" ]

CMD [ "listen", "-p", "8080" ]