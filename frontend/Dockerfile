# Use Node 18 base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project
COPY . .

# Expose all relevant Expo ports
EXPOSE 8081 8082 19000 19001 19002

# Run Expo with tunnel and clear Metro cache
CMD ["npx", "expo", "start", "--tunnel", "--clear"]
