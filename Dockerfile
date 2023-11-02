# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy your application code to the container
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your application listens on
EXPOSE 3000

# Define the command to run your application
CMD [ "npm", "start" ]
