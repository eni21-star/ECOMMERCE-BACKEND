FROM node:20
WORKDIR /app
COPY package.json .
ARG NODE_ENV
 RUN npm install
#  if  [ "${NODE_ENV}" == "production" ]; \ 
#     then npm install --only=production; \
#     else  npm install; \
#     fi  
COPY . .
EXPOSE 3000
CMD ["npm", "start"]