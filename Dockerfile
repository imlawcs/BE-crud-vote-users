# stage base
FROM node:20-alpine AS base

# stage dependencies
FROM base AS dependencies

WORKDIR /
COPY package*.json ./

RUN npm install 

# COPY .env ./

# stage build
FROM base AS build

WORKDIR /
COPY . .
COPY --from=dependencies /node_modules ./node_modules

RUN npm run build

# stage deploy
FROM base AS deploy

WORKDIR /
COPY --from=build /package*.json ./
COPY --from=build /node_modules ./node_modules
# COPY --from=build / .
COPY --from=build /src ./src
COPY --from=build /server.js ./server.js

# Mở cổng 3000 để ứng dụng chạy
EXPOSE 3000

CMD ["npm", "start"]

