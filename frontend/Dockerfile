# Use Node image for building
FROM node:18-alpine

# Create and set working directory (Docker will create this for you)
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other source code files
COPY . .

# Expose port 5173 (Vite default port)
EXPOSE 5173

# Command to run the app
CMD ["npm", "run", "dev", "--", "--host"]