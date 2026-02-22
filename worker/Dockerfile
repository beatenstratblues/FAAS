# Use the smallest possible Node image
FROM node:20-alpine

# Create a directory for your app
WORKDIR /app

# Copy your single JS file into the container
COPY index.js .

# Run the file using the node engine
CMD ["node", "index.js"]