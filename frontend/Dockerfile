FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install react-router

COPY . .

RUN npm run build

FROM nginx:stable-alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]