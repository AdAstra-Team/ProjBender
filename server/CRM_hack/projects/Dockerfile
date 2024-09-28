FROM maven:3.9.0-eclipse-temurin-19 AS build
WORKDIR /app
COPY ./server/CRM_hack/pom.xml .
COPY ./server/CRM_hack/projects/pom.xml projects/
COPY ./server/CRM_hack/projects/src projects/src

RUN mvn clean install -DskipTests

WORKDIR /app/projects
RUN mvn -o compile

FROM openjdk:19-jdk-slim
WORKDIR /app
COPY --from=build /app/projects/target/*.jar /app/app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
