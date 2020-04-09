# BUILD stage.
FROM node:12.16 as buildStage

## Copy only relevant files and install dependencies.
## Storing node_modules on a separate layer will prevent unnecessary npm installs on each build!
COPY package.json package-lock.json ./
RUN npm ci && mkdir /build && mv ./node_modules ./build

WORKDIR /build

## Copy all local files into the image (discarting items from .dockerignore).
COPY . .

## Build the project.
RUN npm run build


# PUBLISH stage.
FROM nginx:1.17-alpine as publishStage

## Copy default nginx configuration.s
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf

## Remove default nginx website.
RUN rm -rf /usr/share/nginx/html/*

COPY --from=buildStage /build/dist /app

CMD ["nginx", "-g", "daemon off;"]
