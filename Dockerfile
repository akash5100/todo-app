# Start with the latest version of Node.js
FROM node:latest

# Set the working directory to the server folder
WORKDIR /server

# Copy the server code into the container
COPY ./server .

# Install the server dependencies
RUN npm install

# Set the working directory to the client folder
WORKDIR /client

# Copy the client code into the container
COPY ./client .

# Install the client dependencies
RUN npm install

# Compile the TypeScript code
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the Node.js server
CMD ["npm" , "start"]