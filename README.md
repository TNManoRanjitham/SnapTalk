# Project Title

This application is built using React with TypeScript, leveraging the modern JSX transform for optimized performance. It includes a functional chat interface powered by a Socket Context for real-time message communication.

## Features
- **TypeScript Integration:** Ensures type safety and a better developer experience.
- **Real-Time Messaging:** Utilizes context-based socket integration for dynamic communication.
- **Modern JSX Transform:** Enhances performance and reduces build times.
- **Scalable Architecture:** Modular components for easier maintenance and scalability.
- **Unit Testing:** Comprehensive tests using Jest and React Testing Library.

## Setup Instructions
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/TNManoRanjitham/SnapTalk.git
   ```
2. **Install Dependencies:**
   Navigate to the project directory and run:
   ```bash
   npm install
   ```
3. **Start the Development Server:**
   Run the following command to start the application:
   ```bash
   npm run start
   ```
4. **Build for Production:**
   To create a production-ready build, use:
   ```bash
   npm run build
   ```

## Testing
- **Run Tests:** Execute unit tests using Jest:
  ```bash
  npm run test
  ```
- **Testing Frameworks:** Jest and React Testing Library are configured to support TypeScript and `.tsx` files.
- **Mocking:** External dependencies and modules are mocked as needed to ensure isolated testing.

## Docker Setup Instructions

To run the application using Docker, follow these steps:

### 1. **Ensure Docker is Installed**
Ensure that Docker and Docker Compose are installed on your machine. You can download Docker Desktop from [Docker's official website](https://www.docker.com/products/docker-desktop). Docker Compose is included in Docker Desktop.

For more information about Docker, check the [official Docker documentation](https://docs.docker.com/).


### 2. **Build and Run the Application Using Docker**
The docker.sh script helps to build and run the application using Docker. You can execute the script using the bash or sh command:

```bash
bash build-docker.sh
```
or 
```bash
sh build-docker.sh
```

The `docker.sh` script is used to automate the build and run process for Docker. You can execute the script with either `bash docker.sh` or `sh docker.sh` based on your environment.

### 3. **Access the Application**
After successfully running the Docker container, open your browser and go to:

```bash
http://localhost:3000
```

### 4. **Stopping the Application**
To stop the application running inside Docker:

```bash
docker-compose down
```

### 5. **Clean Up After Stopping the Application**
To clean up Docker resources after the app is stopped:

```bash
docker system prune -f
```

## Recommendations
- Use a TypeScript-compatible editor like VSCode with relevant plugins for optimal development.
- Regularly update dependencies to prevent compatibility issues.
- Follow best practices for modular component design and maintainability.

