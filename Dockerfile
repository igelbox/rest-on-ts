FROM node:8.3-alpine

MAINTAINER Vakhurin Sergey (igelbox)

WORKDIR /srv

COPY ./package.json .
COPY ./package-lock.json .
RUN chown -R node .

USER node
ENV NODE_ENV=production

RUN npm -q install --only=production

EXPOSE 8080

COPY ./dist ./dist

CMD ["node", "dist/server.js"]
