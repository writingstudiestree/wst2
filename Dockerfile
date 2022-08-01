FROM node:16.15.0-alpine

WORKDIR /app

# copy everything to the container
COPY . .

# remove any ".env" file (variables should be specified in Docker config)
RUN rm .env

# clean install all dependencies
RUN npm ci

# remove potential security issues
RUN npm audit fix

# build SvelteKit app
RUN npm run build

EXPOSE 3000
CMD ["node", "./build"]
