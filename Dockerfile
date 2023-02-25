FROM node:14-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install
ADD . .
RUN npm run build
RUN npx prisma migrate deploy
RUN npx prisma generate
RUN npm run build
RUN npm prune --production
CMD ["node", "./dist/main.js"]