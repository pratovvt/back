FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

EXPOSE 443

ENV PORT=443
ENV PG_HOST=localhost
ENV PG_PORT=5432
ENV PG_USERNAME=postgres
ENV PG_PASSWORD=1
ENV PG_DATABASE=backend
ENV JWT_ACCESS_SECRET=secret
ENV JWT_REFRESH_SECRET=secret

CMD ["npm","build"]

CMD [ "npm","start"]