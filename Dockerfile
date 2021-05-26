FROM node:14.17.0-stretch
ENV NODE_VERSION=14.17.0
ENV SERVICE_PORT=3000 
ENV NODE_ENV=production
ENV MONGODB_URL='mongodb://localhost/node_arch_study'

WORKDIR /usr/src/app
COPY [".env.example", "package.json", "package-lock.json*", "tsconfig.json", "npm-shrinkwrap.json*", "./"]
RUN mv './.env.example' './.env'
RUN npm install -g nodemon && npm install -g ts-node && npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE ${SERVICE_PORT}
CMD ["npm", "start"]
