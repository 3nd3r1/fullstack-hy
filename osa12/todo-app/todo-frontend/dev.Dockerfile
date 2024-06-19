FROM node:20
WORKDIR /usr/src/app
ARG VITE_BACKEND_URL
ENTRYPOINT ["npm", "run", "dev","--","--host"]
