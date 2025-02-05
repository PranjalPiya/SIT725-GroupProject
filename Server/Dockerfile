# Use a newer Node.js version
FROM node:14-alpine

# Create a directory for the application inside the container
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Set the working directory for the application
WORKDIR /home/node/app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Switch to the 'node' user to avoid running the application as root
USER node

# Install the application dependencies using npm
RUN npm install

# Copy the rest of the application source code into the container
COPY --chown=node:node . .

# Expose the port the application listens on
EXPOSE 8080

# Define the command to start the application
CMD [ "node", "app.js" ]