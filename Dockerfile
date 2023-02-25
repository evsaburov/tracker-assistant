FROM node:14-alpine
WORKDIR /opt/app
ADD package.json package.json
COPY prisma ./prisma/
RUN npm install
ADD . .
run echo $DATABASE_URL
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run build
RUN npm run start
RUN npm prune --production