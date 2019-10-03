FROM node:8

ARG NODE_ENV=development
ENV NODE_ENV ${NODE_ENV}

ARG APP_DIR=app
RUN mkdir -p /app && chown node:node /app

USER node

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install && npm cache clean --force

# For production 
# RUN npm install --production && npm cache clean --force


# Copy project files
COPY . .

# Expose running port
EXPOSE 3000
