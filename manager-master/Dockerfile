FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY public public/
# COPY .eslintrc.js ./
# COPY .browserslistrc ./
COPY babel.config.js ./
COPY vue.config.js ./
COPY src src/
# RUN npm install
RUN npm run build

RUN ls


FROM nginx:alpine
COPY --from=build /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
