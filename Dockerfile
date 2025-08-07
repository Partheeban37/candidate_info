# Start from a Java runtime image
FROM openjdk:21-jdk-slim

# Set working directory inside the container
WORKDIR /app

# Copy built JAR file into the container
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]

# Expose port
EXPOSE 8080
