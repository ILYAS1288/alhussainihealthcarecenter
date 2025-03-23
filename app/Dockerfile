# Use official Node.js image as a base
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Expose port 3000 (or any port your app uses)
EXPOSE 3000

# Command to start the app
CMD ["npm", "start"]
