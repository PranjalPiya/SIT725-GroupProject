# Use an official Node.js runtime
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json first (skip package-lock.json if missing)
COPY package.json ./

# Install dependencies inside the container
RUN npm install --force

# Copy the rest of the application files
COPY . .

# Expose the application port (change if needed)
EXPOSE 3000

# Run the application
CMD ["node", "app.js"]
