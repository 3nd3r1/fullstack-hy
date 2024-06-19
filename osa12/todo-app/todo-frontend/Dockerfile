FROM node:20 AS test-stage
WORKDIR /usr/src/app
COPY . .
RUN npm ci && npm run test

FROM test-stage AS build-stage
ARG VITE_BACKEND_URL=http://localhost:3000
RUN npm run build

FROM nginx:1.25-alpine
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
