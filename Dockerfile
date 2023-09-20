FROM node:18-alpine as builder
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
# If you are building your code for production
# RUN npm ci --omit=dev
# Bundle app source

FROM node:18-alpine as app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000
CMD [ "node", "dist/app.js" ]