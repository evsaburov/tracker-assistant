FROM node:14-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install
ADD . .
RUN npm run build
RUN npx prisma generate
RUN npm prune --production
CMD ["nide", "./dist/main.js"]