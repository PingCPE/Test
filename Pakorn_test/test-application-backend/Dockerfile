FROM node:14

# Set the working directory
WORKDIR /test-app

# Copy only package.json and package-lock.json to leverage Docker's layer caching
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment to production (optional)
ENV NODE_ENV=production

# Expose the app port (if required by the app)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]