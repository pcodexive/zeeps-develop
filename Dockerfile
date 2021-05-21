FROM node:14.9

RUN mkdir frontend

WORKDIR /frontend

COPY package.json ./

RUN npm install

COPY . /frontend/
# RUN yarn run start:local

# CMD yarn run dev
CMD ["yarn", "run", "dev"]