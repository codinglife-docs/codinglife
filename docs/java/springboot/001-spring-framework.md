---
id: spring-framework
title: What is Spring Framework?
description: Learn the Spring Framework core concepts — IoC, Dependency Injection, Spring modules, and how Spring differs from Spring Boot.
sidebar_position: 1
keywords:
  - Java
  - Spring Framework
  - IoC
  - Dependency Injection
  - Spring Boot
---

# What is Spring Framework?

> **Reading Time:** 12 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

Spring Framework is the most popular Java framework for building enterprise applications. It solves the most painful problems developers face — like creating and managing objects — by providing a powerful container that takes over that job for you. Think of Spring as the backbone that holds your entire Java application together.

---

## What You'll Learn

- What the Spring Framework is and why it was created
- What Inversion of Control (IoC) means and why it matters
- What Dependency Injection (DI) is and how it works
- The major modules inside Spring Framework
- The key differences between Spring and Spring Boot

---

## Prerequisites

- Basic Java knowledge (classes, objects, interfaces)
- Understanding of OOP concepts (encapsulation, inheritance)
- Familiarity with Maven or Gradle is helpful but not required

---

## Explanation

### The Problem Spring Solves

Before Spring, Java developers used **EJB (Enterprise JavaBeans)** — a complex, heavy system for building enterprise apps. Writing even a simple application required tons of configuration, XML files, and boilerplate code. Developers spent more time wrestling with the framework than actually writing business logic.

**Rod Johnson** looked at this mess and thought: "There must be a better way." In 2003, he released the Spring Framework. It was lightweight, flexible, and — most importantly — it respected the developer.

### What is Spring Framework?

Spring Framework is an open-source Java framework that provides a comprehensive programming and configuration model for modern Java-based enterprise applications. It handles the "plumbing" of your application — object creation, database connections, transactions, security, web requests — so you can focus on writing actual business logic.

At the heart of Spring is a powerful concept called the **IoC Container**.

---

### Inversion of Control (IoC)

**IoC** sounds scary but it's a simple idea.

Normally in Java, YOU control when objects are created:

```java
// Traditional way — YOU control object creation
Car car = new Car();
Engine engine = new Engine();
car.setEngine(engine);
```

With **Inversion of Control**, you flip this — you **give up control** of object creation to the framework. Spring creates and manages objects for you. Your code just declares what it needs, and Spring provides it.

This "control" has been "inverted" — instead of your code controlling object lifecycle, the framework does.

The objects that Spring manages are called **Beans**.

---

### Dependency Injection (DI)

**Dependency Injection** is how Spring implements IoC. Instead of your class creating its dependencies, Spring **injects** them from outside.

There are 3 ways Spring can inject dependencies:

#### 1. Constructor Injection (Recommended ✅)
```java
@Component
public class CarService {
    private final Engine engine;

    // Spring sees this constructor and injects Engine automatically
    public CarService(Engine engine) {
        this.engine = engine;
    }
}
```

#### 2. Setter Injection
```java
@Component
public class CarService {
    private Engine engine;

    @Autowired
    public void setEngine(Engine engine) {
        this.engine = engine;
    }
}
```

#### 3. Field Injection (Convenient but not recommended for testing)
```java
@Component
public class CarService {
    @Autowired
    private Engine engine;
}
```

**Why is DI useful?**
- Your classes don't need to know HOW to create their dependencies
- Makes code easier to test (you can inject mock objects in tests)
- Makes code loosely coupled — components don't depend on each other's implementation

---

### The Spring IoC Container

The IoC container is the core of Spring. It reads your configuration (XML or annotations), creates all the beans, wires them together, and manages their lifecycle.

Spring has two types of containers:
- **BeanFactory** — basic, lightweight container (rarely used directly)
- **ApplicationContext** — advanced container with extra features (this is what you use)

---

### Why Spring Became Popular

1. **Lightweight** — No need for heavy app servers like older EJB
2. **Non-invasive** — Your POJOs (Plain Old Java Objects) don't need to extend Spring classes
3. **Testable** — DI makes unit testing easy
4. **Modular** — Use only what you need
5. **Huge ecosystem** — Data, Security, Web, Cloud — all covered
6. **Great community** — Millions of developers, tons of resources

---

### Spring Modules Overview

Spring is not just one thing — it's a collection of modules. You pick what you need:

| Module | What It Does |
|---|---|
| **Spring Core** | IoC Container and DI — the foundation |
| **Spring MVC** | Build web applications and REST APIs |
| **Spring Data** | Simplified database access (JPA, MongoDB, etc.) |
| **Spring Security** | Authentication and authorization |
| **Spring AOP** | Aspect-Oriented Programming (logging, transactions) |
| **Spring Cloud** | Microservices, distributed systems |
| **Spring Batch** | Process large amounts of data in batches |
| **Spring Test** | Testing utilities |

You don't use all of them — you pick what your project needs and add them as dependencies.

---

### Spring vs Spring Boot

| Feature | Spring Framework | Spring Boot |
|---|---|---|
| Configuration | Manual (lots of XML/Java config) | Auto-configuration (zero config needed) |
| Server | Deploy to external Tomcat/JBoss | Embedded Tomcat/Jetty/Undertow |
| Getting Started | Complex setup | `start.spring.io` → ready in seconds |
| Boilerplate | High | Minimal |
| Production Ready | Manual setup | Built-in (Actuator, metrics, health checks) |
| Best For | Legacy apps, full control | New apps, microservices, REST APIs |

**Spring Boot is built ON TOP of Spring Framework.** Everything Spring does, Spring Boot does too — just with much less configuration. Spring Boot doesn't replace Spring; it makes Spring easier to use.

**Analogy:** Spring Framework is like buying raw ingredients. Spring Boot is like a meal kit — all the right ingredients pre-measured, ready to cook.

---

## Real-World Analogy

Imagine you run a restaurant kitchen. **Without Spring (traditional Java):** You personally hire every cook, buy all equipment, and arrange everything yourself — exhausting! 

**With Spring (IoC/DI):** You hire a kitchen manager (the Spring container). You just say "I need a pasta cook and a grill cook" — the manager finds them, trains them, and assigns them to stations. You focus on the menu (business logic). The manager handles the people (objects).

**Spring Boot** is like having the kitchen manager ALSO design the kitchen layout, stock the pantry, and set the tables — you just walk in and start cooking!

---

## Code Example

### Traditional Java (Without Spring)
```java
// You manually create and wire everything
public class TraditionalApp {
    public static void main(String[] args) {
        // Creating dependencies manually
        Engine engine = new PetrolEngine();
        Transmission transmission = new AutomaticTransmission();
        Car car = new Car(engine, transmission);
        car.start();
    }
}
```

### With Spring (Using Annotations)
```java
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

// Mark as a Spring-managed component
@Component
class Engine {
    public String start() {
        return "Engine started!";
    }
}

@Component
class Car {
    private final Engine engine;

    // Spring automatically injects Engine here
    @Autowired
    public Car(Engine engine) {
        this.engine = engine;
    }

    public void drive() {
        System.out.println(engine.start());
        System.out.println("Car is driving!");
    }
}

// Configuration class — tells Spring where to scan for components
@Configuration
@ComponentScan(basePackages = "com.example")
class AppConfig {
}

public class SpringApp {
    public static void main(String[] args) {
        // Spring container takes over
        ApplicationContext context =
            new AnnotationConfigApplicationContext(AppConfig.class);

        // Get the Car bean — Spring already injected Engine into it
        Car car = context.getBean(Car.class);
        car.drive();
    }
}
```

### Output
```
Engine started!
Car is driving!
```

*Notice: You never wrote `new Engine()` inside `Car`. Spring did it for you!*

---

## Common Mistakes

- ❌ **Mistake**: Confusing Spring and Spring Boot as separate things → ✅ **Fix**: Spring Boot is built on Spring Framework — it just adds auto-configuration and embedded server on top
- ❌ **Mistake**: Using `@Autowired` on fields for everything (field injection) → ✅ **Fix**: Prefer constructor injection — it's safer, easier to test, and makes dependencies explicit
- ❌ **Mistake**: Thinking IoC means "no control" → ✅ **Fix**: IoC means you control WHAT you need, Spring controls HOW it's created and wired
- ❌ **Mistake**: Adding all Spring modules to every project → ✅ **Fix**: Only add the dependencies your project actually needs

---

## Best Practices

- Always prefer **constructor injection** over field or setter injection
- Keep your Spring beans **stateless** when possible — this makes them thread-safe
- Use **interfaces** for your services so Spring can easily swap implementations
- Don't put business logic inside Spring configuration classes (`@Configuration`)
- Use **profiles** (`@Profile`) to manage different configurations for dev, test, and prod environments

---

## Interview Questions

**Q: What is the Spring Framework?**  
A: Spring is an open-source Java framework that provides a comprehensive infrastructure for enterprise Java development. Its core feature is the IoC container that manages object creation and dependency injection, allowing developers to focus on business logic rather than boilerplate code.

**Q: What is Inversion of Control (IoC)?**  
A: IoC is a design principle where the control of object creation and dependency management is transferred from the application code to a framework (the container). Instead of objects creating their own dependencies, the container creates and injects them. This leads to loosely coupled, testable code.

**Q: What is Dependency Injection and what are its types?**  
A: Dependency Injection is the mechanism Spring uses to implement IoC — the container injects an object's dependencies from outside rather than the object creating them. There are three types: (1) Constructor Injection — dependencies passed via constructor; (2) Setter Injection — dependencies set via setter methods; (3) Field Injection — dependencies injected directly into fields using `@Autowired`. Constructor injection is recommended.

**Q: What is the difference between Spring Framework and Spring Boot?**  
A: Spring Framework provides the core features (IoC, DI, MVC, Data, Security) but requires manual configuration. Spring Boot is built on top of Spring and adds auto-configuration, an embedded web server, starter dependencies, and production-ready features — dramatically reducing setup time. Spring Boot does not replace Spring; it makes it easier to use.

**Q: What is a Spring Bean?**  
A: A Spring Bean is any object whose lifecycle is managed by the Spring IoC container. When Spring creates, configures, and manages an object, that object is called a Bean. Beans are defined using annotations like `@Component`, `@Service`, `@Repository`, `@Controller`, or in `@Configuration` classes using `@Bean` methods.

---

## Quick Revision

✔ Spring Framework is a lightweight Java framework that solves object creation and management via IoC and DI  
✔ IoC = Control of object creation is given to the framework (the container)  
✔ DI = Framework injects dependencies into your classes (constructor, setter, or field)  
✔ Spring has many modules: Core, MVC, Data, Security, Cloud, AOP, Batch  
✔ Spring Boot = Spring Framework + Auto-configuration + Embedded Server + Zero boilerplate  

---

## Related Topics

- Spring Boot Introduction
- REST API with Spring Boot
- Spring Data JPA
- Spring Security

---

## Next Lesson

**Lesson 2 — Introduction to Spring Boot**
