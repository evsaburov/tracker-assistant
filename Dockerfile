FROM node:14-alpina
WORKDIR /opt/app
ADD packege.json packege.json
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --production
CMD ["node", "./dist/main.js"]