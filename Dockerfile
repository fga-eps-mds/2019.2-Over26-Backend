FROM node:8

USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app


# Install dependencies
COPY package*.json ./
RUN npm install && npm cache clean --force

# For production 
# RUN npm install --production && npm cache clean --force


# Copy project files
COPY --chown=node:node . .

# Expose running port
EXPOSE 3000
