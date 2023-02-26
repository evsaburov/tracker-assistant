FROM node:14-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install
ADD . .
RUN npx prisma migrate deploy
RUN npx prisma generate
RUN npm run build
RUN npm run start
RUN npm prune --production