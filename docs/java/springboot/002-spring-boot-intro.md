---
id: spring-boot-intro
title: Introduction to Spring Boot
description: Learn what Spring Boot is, how auto-configuration works, the embedded server, project structure, and how to build your first Spring Boot application.
sidebar_position: 2
keywords:
  - Java
  - Spring Boot
  - Auto-configuration
  - Embedded Tomcat
  - Spring Initializr
---

# Introduction to Spring Boot

> **Reading Time:** 14 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

Spring Boot is the fastest way to build production-ready Java applications. It takes the powerful Spring Framework and wraps it with smart defaults and auto-configuration so you can go from zero to a running application in minutes — with almost no setup. If Spring Framework is the engine, Spring Boot is the car with the ignition already hot.

---

## What You'll Learn

- What Spring Boot is and why developers love it
- How auto-configuration works (the magic behind Spring Boot)
- What the embedded server (Tomcat) is and why it matters
- How to use Spring Initializr to generate a project
- The structure of a Spring Boot project
- What `@SpringBootApplication` does
- How to write and run your first Spring Boot application

---

## Prerequisites

- Understanding of Spring Framework basics (IoC, DI)
- Basic Java knowledge (classes, annotations, methods)
- Java 17+ installed
- Maven or Gradle installed (Maven is used in examples)

---

## Explanation

### What is Spring Boot?

Spring Boot is an opinionated, convention-over-configuration framework built on top of Spring Framework. It removes the pain of setting up a Spring application by:

1. **Auto-configuring** Spring and third-party libraries based on what's on your classpath
2. **Embedding** a web server (Tomcat by default) directly into your JAR file
3. Providing **starter dependencies** that bundle related libraries together
4. Generating production-ready apps with **no XML configuration** required

Before Spring Boot, setting up a Spring web application required: configuring a DispatcherServlet in web.xml, setting up a Spring MVC context, configuring a view resolver, deploying a WAR file to an external Tomcat server... pages of XML. Spring Boot replaced all of that with a single annotation: `@SpringBootApplication`.

---

### How Auto-Configuration Works

Auto-configuration is the core magic of Spring Boot. Here's how it works:

1. When your app starts, Spring Boot scans your **classpath** (the JARs you've added as dependencies)
2. It checks which libraries are present (e.g., Is Tomcat on the classpath? Is H2 database present? Is Jackson present?)
3. Based on what it finds, it automatically creates and configures the right beans

**Example:** If you add `spring-boot-starter-web` to your project:
- Spring Boot sees Tomcat on the classpath → automatically sets up an embedded Tomcat server on port 8080
- It sees Jackson (JSON library) → automatically configures JSON serialization/deserialization
- It creates a `DispatcherServlet` for you

You can **override** any auto-configured bean by creating your own. Spring Boot always respects your explicit configuration over its defaults.

Auto-configuration classes live in `spring-boot-autoconfigure.jar`. The `@EnableAutoConfiguration` annotation (part of `@SpringBootApplication`) triggers this process.

---

### Embedded Server — No More WAR Files!

Traditionally, you would:
1. Write your app
2. Package it as a WAR file
3. Deploy the WAR to an external Tomcat server
4. Start the Tomcat server
5. Navigate to your app's URL

With Spring Boot:
1. Write your app
2. Run `java -jar myapp.jar` ← That's it!

The Tomcat server is **embedded inside the JAR file**. This means:
- Your app is fully self-contained
- Easy to deploy anywhere Java runs
- Great for Docker containers and microservices
- No more "it works on my Tomcat but not yours" problems

You can switch from Tomcat to Jetty or Undertow by simply swapping dependencies.

---

### Spring Initializr — Your Project Generator

**Spring Initializr** at [https://start.spring.io](https://start.spring.io) is a web tool that generates a Spring Boot project for you. 

**Steps:**
1. Go to [start.spring.io](https://start.spring.io)
2. Choose: Project (Maven), Language (Java), Spring Boot version (3.x)
3. Fill in: Group (`com.example`), Artifact (`myapp`), Name, Description
4. Select Java version (17 or 21)
5. Add dependencies (e.g., Spring Web, Spring Data JPA, MySQL Driver)
6. Click **Generate** → download a ZIP file
7. Extract and open in IntelliJ IDEA or Eclipse

Your IDE also has built-in Spring Initializr support (IntelliJ: File → New → Spring Initializr).

---

### Spring Boot Project Structure

After generating a project, you get this structure:

```
myapp/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/myapp/
│   │   │       └── MyappApplication.java   ← Main class
│   │   └── resources/
│   │       ├── application.properties       ← Configuration file
│   │       ├── static/                      ← Static files (CSS, JS, images)
│   │       └── templates/                   ← HTML templates (if using Thymeleaf)
│   └── test/
│       └── java/
│           └── com/example/myapp/
│               └── MyappApplicationTests.java
├── pom.xml                                  ← Maven build file
└── HELP.md
```

Key files:
- **`MyappApplication.java`** — Entry point with `main()` method and `@SpringBootApplication`
- **`application.properties`** — Configure port, database, logging, etc.
- **`pom.xml`** — Dependencies and build configuration

---

### The `@SpringBootApplication` Annotation

This single annotation on your main class does three things:

```java
@SpringBootApplication
// is equivalent to:
@SpringBootConfiguration   // Marks this as a configuration class (@Configuration)
@EnableAutoConfiguration   // Enables Spring Boot's auto-configuration
@ComponentScan             // Scans for @Component, @Service, @Repository, @Controller in this package and sub-packages
```

It's the master switch that starts the entire Spring Boot magic.

---

### Key application.properties Settings

```properties
# Server port (default is 8080)
server.port=8080

# Application name
spring.application.name=myapp

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=secret

# JPA / Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Logging level
logging.level.org.springframework=INFO
```

---

### Spring Boot Starter Dependencies

Starters are pre-packaged sets of dependencies. Instead of adding 10 separate JARs, you add one starter:

| Starter | What It Includes |
|---|---|
| `spring-boot-starter-web` | Spring MVC, Tomcat, Jackson |
| `spring-boot-starter-data-jpa` | Spring Data JPA, Hibernate |
| `spring-boot-starter-security` | Spring Security |
| `spring-boot-starter-test` | JUnit, Mockito, AssertJ |
| `spring-boot-starter-thymeleaf` | Thymeleaf template engine |
| `spring-boot-starter-actuator` | Health checks, metrics, monitoring |

---

## Real-World Analogy

Building a web app with old Spring was like buying a car in parts — you get the engine, wheels, body, electronics separately and assemble them yourself. Exhausting!

**Spring Boot** is like buying a fully assembled car from a factory. You get in, turn the key (`main()` method), and drive. All the parts are already configured to work together. If you want to customize — swap the stereo (change JSON library), change the seats (switch from Tomcat to Jetty) — you can, but the defaults are great.

**Spring Initializr** is the car configurator on the website — pick your options, click "generate," and the factory ships you the ready-to-drive car.

---

## Code Example

### pom.xml (Spring Boot Maven Setup)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <!-- Spring Boot Parent — provides dependency management -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>

    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>demo</name>
    <description>My first Spring Boot app</description>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <!-- Web starter: Spring MVC + embedded Tomcat + Jackson -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Test starter -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <!-- Plugin to create executable JAR -->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

### Main Application Class
```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// This single annotation does: @Configuration + @EnableAutoConfiguration + @ComponentScan
@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        // Boots up the entire Spring application
        SpringApplication.run(DemoApplication.class, args);
        System.out.println("🚀 Spring Boot Application Started!");
    }
}
```

### A Simple REST Controller
```java
package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController  // Marks this as a controller that returns data (not HTML views)
public class HelloController {

    @GetMapping("/hello")  // Maps HTTP GET /hello to this method
    public String sayHello() {
        return "Hello from Spring Boot! 🎉";
    }

    @GetMapping("/")
    public String home() {
        return "Welcome to my first Spring Boot app!";
    }
}
```

### Run the Application
```bash
# From project root directory
mvn spring-boot:run

# OR build and run the JAR
mvn clean package
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

### Output (Console)
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::               (v3.2.0)

Started DemoApplication in 2.456 seconds (JVM running for 3.012)
🚀 Spring Boot Application Started!
```

### Test in Browser
Visit: `http://localhost:8080/hello`
```
Hello from Spring Boot! 🎉
```

---

## Common Mistakes

- ❌ **Mistake**: Placing the main class in the wrong package (not the root package) → ✅ **Fix**: Keep `@SpringBootApplication` in the root package — `@ComponentScan` scans sub-packages from there
- ❌ **Mistake**: Forgetting to add `spring-boot-starter-web` for web apps → ✅ **Fix**: Always check that the right starters are in your `pom.xml`
- ❌ **Mistake**: Hardcoding passwords and database URLs in `application.properties` → ✅ **Fix**: Use environment variables or `application-{profile}.properties` for sensitive config
- ❌ **Mistake**: Expecting Spring Boot to configure things it can't detect → ✅ **Fix**: If you want something auto-configured, the dependency must be on the classpath

---

## Best Practices

- Always use the latest stable Spring Boot version (check [spring.io](https://spring.io))
- Use **Spring Initializr** to generate projects — never set up from scratch manually
- Organize code in packages: `controller`, `service`, `repository`, `model`
- Store all configuration in `application.properties` or `application.yml` — not hardcoded in Java
- Use **profiles** (`dev`, `test`, `prod`) to separate configurations per environment
- Use `spring-boot-starter-actuator` in production for health checks

---

## Interview Questions

**Q: What is Spring Boot and how is it different from Spring Framework?**  
A: Spring Boot is an opinionated framework built on top of Spring Framework that adds auto-configuration, embedded server support (Tomcat by default), and starter dependencies. While Spring Framework requires extensive manual configuration, Spring Boot follows "convention over configuration" — it auto-configures your application based on what's on the classpath, letting you get started in minutes.

**Q: What does `@SpringBootApplication` do?**  
A: It's a composed annotation that combines three annotations: `@SpringBootConfiguration` (marks the class as a configuration class), `@EnableAutoConfiguration` (enables Spring Boot's auto-configuration mechanism), and `@ComponentScan` (scans the current package and sub-packages for Spring components). It's the entry point annotation for any Spring Boot application.

**Q: What is auto-configuration in Spring Boot?**  
A: Auto-configuration is Spring Boot's ability to automatically configure Spring beans based on what libraries are present on the classpath. For example, if `spring-boot-starter-web` is in the classpath, Spring Boot automatically configures an embedded Tomcat server, a DispatcherServlet, and JSON support. You can override any auto-configured bean with your own explicit configuration.

**Q: What are Spring Boot Starters?**  
A: Starters are pre-packaged sets of Maven/Gradle dependencies that work well together. For example, `spring-boot-starter-web` pulls in Spring MVC, embedded Tomcat, and Jackson — all in one dependency. They follow the naming convention `spring-boot-starter-*` and eliminate the need to figure out which libraries and versions to use together.

**Q: What is the embedded server in Spring Boot?**  
A: Spring Boot embeds a web server (Tomcat by default, or Jetty/Undertow) directly inside the application JAR file. This means you don't need to install or configure an external server — you just run `java -jar app.jar` and the server starts automatically. This makes deployment simple and makes Spring Boot ideal for microservices.

---

## Quick Revision

✔ Spring Boot = Spring Framework + Auto-configuration + Embedded Tomcat + Zero XML config  
✔ `@SpringBootApplication` = `@Configuration` + `@EnableAutoConfiguration` + `@ComponentScan`  
✔ Auto-configuration detects classpath and sets up beans automatically  
✔ Spring Initializr (start.spring.io) generates project scaffolding in seconds  
✔ Starters bundle related dependencies together (e.g., `spring-boot-starter-web`)  
✔ Run with `mvn spring-boot:run` or `java -jar` — no external server needed  

---

## Related Topics

- Spring Framework (IoC, DI)
- REST API with Spring Boot
- Spring Data JPA
- Spring Security Basics

---

## Next Lesson

**Lesson 3 — Building REST APIs with Spring Boot**
