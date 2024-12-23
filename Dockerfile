# Step 1: Set up the base image with Node.js 22
FROM node:22-alpine

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Expose the port the app will run on
EXPOSE 3000

# Step 7: Start the app in development mode using React's default script
CMD ["npm", "run", "start"]
