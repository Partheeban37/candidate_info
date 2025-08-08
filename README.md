Based on the project files and configurations we've reviewed, here is a detailed `README.md` file for your "Candidate Management System."

-----

# Candidate Management System

This is a three-tier web application for managing candidate information. The system allows users to create, view, edit, and delete candidate records through a web interface. It is built using a modern technology stack and is designed to be easily containerized and deployed.

## 🚀 Features

  * **➕ Create Candidates**: Add new candidate records with their name, email, and phone number.
  * **📋 List Candidates**: View a complete list of all candidates in a dynamic table.
  * **✏️ Edit Candidates**: Update the details of an existing candidate using their unique ID.
  * **🗑️ Delete Candidates**: Remove a candidate record from the system by providing their ID.
  * **💖 Health Check**: A dedicated endpoint to verify the status and health of the backend API.

-----

## ⚙️ Technology Stack

The project is built with the following technologies:

### Frontend

  * **HTML, CSS & JavaScript**: For the user interface and client-side logic.
  * **Bootstrap 5**: A popular CSS framework used for responsive design and styling.

### Backend

  * **Spring Boot**: A powerful Java framework for building the RESTful API.
  * **Maven**: The build automation tool for managing project dependencies and packaging the application.

### Infrastructure

  * **Nginx**: Used as a reverse proxy to serve the static frontend files and forward API requests to the Spring Boot backend.
  * **Docker**: For containerizing the application, making it portable and easy to deploy.

-----

## 📁 Project Structure

The project directory is organized to separate the frontend and backend code.

```
.
├── frontend/
│   ├── candidates.html
│   ├── delete.html
│   ├── edit.html
│   ├── health.html
│   ├── index.html
│   ├── script.js
│   └── styles.css
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/demo/
│   │   │       ├── controller/
│   │   │       │   └── CandidateController.java
│   │   │       ├── model/
│   │   │       │   └── Candidate.java
│   │   │       └── repository/
│   │   │           └── CandidateRepository.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│
├── Dockerfile
├── docker-compose.yml
└── pom.xml
```

-----

## 🛠️ Setup and Installation

Follow these steps to get the application running on your local machine.

### 1\. Backend and Docker Setup

First, rebuild the Spring Boot application and create a Docker image.

```bash
# Rebuild the Spring Boot application
mvn clean package

# Build the Docker image (assuming a Dockerfile exists)
docker build -t candidate-demo .

# Stop and remove any old container
docker stop candidate-demo || true && docker rm candidate-demo || true

# Run the new container, exposing port 8080
docker run -d --name candidate-demo -p 8080:8080 candidate-demo
```

### 2\. Frontend and Nginx Setup

Place the frontend files in the Nginx web root and restart the service.

```bash
# Copy the HTML, CSS, and JS files to the Nginx web root
cp -r frontend/* /var/www/html/

# Restart Nginx to apply the changes
sudo systemctl restart nginx
```

### 3\. Verify Configurations

Ensure your `/etc/nginx/sites-available/default` file has the following `location` block to proxy API requests:

```nginx
location /api/ {
    proxy_pass http://localhost:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection keep-alive;
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

-----

## 🚀 Usage

Once the setup is complete, you can access the application through your web browser.

1.  Open your browser and navigate to `http://localhost/`.
2.  Use the navigation links on the home page to access different functionalities:
      * **Create & List Candidates**: `http://localhost/candidates.html`
      * **Edit Candidate**: `http://localhost/edit.html`
      * **Delete Candidate**: `http://localhost/delete.html`
      * **Health Check**: `http://localhost/health.html`
<img width="1920" height="1080" alt="Screenshot_2025-08-08_16_18_23" src="https://github.com/user-attachments/assets/8ab009f3-923a-4409-9d49-1badc3a5434b" />
<img width="1920" height="1080" alt="Screenshot_2025-08-08_16_18_34" src="https://github.com/user-attachments/assets/0e6e1292-b197-4935-bebf-4720ad6113f5" />
<img width="1920" height="1080" alt="Screenshot_2025-08-08_16_18_52" src="https://github.com/user-attachments/assets/18af6e87-1f8a-414b-8162-b0cd1c129d64" />
<img width="1920" height="1080" alt="Screenshot_2025-08-08_16_19_01" src="https://github.com/user-attachments/assets/1eac8731-e4d3-43be-9034-3646c8d8edcf" />
