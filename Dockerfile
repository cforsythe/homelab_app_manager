# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js app
RUN npm run build

# Use a lightweight web server for production (e.g., nginx or node)
FROM node:18-alpine AS runner

# Set the working directory in the container
WORKDIR /app

# Copy the build output and node_modules from the builder stage
COPY --from=builder /app ./

# Expose the port that the app will run on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
