FROM node:10

RUN npm install -g signalhub

EXPOSE 3618

ENTRYPOINT [ "signalhub" ]

CMD [ "listen", "-p", "3618" ]
