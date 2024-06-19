FROM node:20

WORKDIR /usr/src/app

ARG MONGO_URL
ARG REDIS_URL

EXPOSE 3000

ENTRYPOINT ["npm", "run", "dev"]
