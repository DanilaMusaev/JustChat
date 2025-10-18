FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

EXPOSE 5173

# For dev
CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0"]

# For prod:
# RUN npm run build
# CMD [ "npm", "run", "preview", "--", "--host", "0.0.0.0"]