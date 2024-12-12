# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy the built application and dependencies
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]
