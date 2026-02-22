# 1. Use a lightweight base image
FROM node:20-alpine

# 2. Create app directory
WORKDIR /usr/src/app

# 3. Copy dependency definitions FIRST
# This allows Docker to cache the 'npm install' layer
COPY package*.json ./

# 4. Install dependencies
# 'npm ci' is faster and more reliable for Docker builds than 'npm install'
RUN npm ci --only=production

# 5. Copy the rest of your application code
COPY . .

# 6. Set the user to 'node' for security (instead of root)
USER node

# 7. Expose the port your app runs on
EXPOSE 3000

# 8. Start the application
CMD [ "node", "index.js" ]