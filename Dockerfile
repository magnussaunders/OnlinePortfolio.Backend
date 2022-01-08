ARG node_version

FROM node:$node_version as builder
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install -g typescript
RUN npm install
COPY . .
RUN npm run build

FROM node:$node_version as deployer
WORKDIR /app
COPY package.json ./
RUN npm install
COPY --from=builder /app/dist .
CMD ["node", "app.js"]