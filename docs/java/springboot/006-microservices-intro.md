---
id: microservices-intro
title: Introduction to Microservices
description: Learn what microservices are, how they compare to monoliths, service discovery with Eureka, API Gateway, inter-service communication, and Spring Cloud basics.
sidebar_position: 6
keywords:
  - Java
  - Microservices
  - Spring Cloud
  - Eureka
  - API Gateway
  - Monolith
  - Feign Client
---

# Introduction to Microservices

> **Reading Time:** 16 Minutes  
> **Difficulty:** Intermediate

---

## Topic Summary

As software systems grow, one giant application becomes hard to manage, scale, and deploy. Microservices is an architectural approach where you break a large application into small, independent services — each doing one thing well. Spring Cloud is the toolkit that makes building these services in Java practical. In this lesson you'll understand when and how to use microservices.

---

## What You'll Learn

- What a monolithic architecture is and its limitations
- What microservices are and how they differ from monoliths
- The benefits and real challenges of microservices
- Service discovery with Eureka
- API Gateway pattern
- Inter-service communication: REST and Feign Client
- Overview of Spring Cloud components
- When microservices make sense (and when they don't)

---

## Prerequisites

- Spring Boot Introduction
- REST API with Spring Boot
- Spring Data JPA (for understanding service structure)
- Basic understanding of networking (ports, HTTP)

---

## Explanation

### What is a Monolithic Application?

A **monolith** is a single, large application where all features — user management, orders, payments, notifications, reporting — are deployed together as one unit.

```
Monolithic Application
┌─────────────────────────────────────────┐
│                                         │
│  [User Module] [Order Module]           │
│  [Payment Module] [Notification Module] │
│  [Inventory Module] [Reporting Module]  │
│                                         │
│  All sharing: same database, same       │
│  codebase, same deployment              │
└─────────────────────────────────────────┘
```

**Pros of Monolith:**
- Simple to develop initially
- Easy to test end-to-end
- No network calls between components
- Simple deployment (one unit)

**Cons as it grows:**
- One bug can crash the entire application
- Hard to scale (you must scale everything, even if only one module is slow)
- Slow deployments — changing one line requires deploying the whole app
- Technology lock-in — can't use different languages/databases for different parts
- Large teams stepping on each other's code constantly

---

### What are Microservices?

**Microservices** is an architectural style where an application is broken into small, independent services. Each service:
- Does **one specific thing** (single responsibility)
- Has its **own database**
- **Runs independently** (its own process, its own deployment)
- **Communicates via APIs** (HTTP REST or messaging)
- Can be **scaled independently**

```
Microservices Architecture
┌────────────┐  ┌────────────┐  ┌────────────┐
│  User      │  │  Order     │  │  Payment   │
│  Service   │  │  Service   │  │  Service   │
│  :8081     │  │  :8082     │  │  :8083     │
│  [UserDB]  │  │  [OrderDB] │  │  [PayDB]   │
└────────────┘  └────────────┘  └────────────┘
       │               │               │
       └───────────────┴───────────────┘
                       │
              [API Gateway :8080]
                       │
                   [Client]
```

---

### Monolith vs Microservices Comparison

| Aspect | Monolith | Microservices |
|---|---|---|
| **Structure** | Single codebase | Multiple services |
| **Deployment** | Deploy everything | Deploy individually |
| **Scaling** | Scale the whole app | Scale only what's needed |
| **Database** | Single shared DB | Each service has its own DB |
| **Failure** | One failure = full downtime | One failure = partial impact |
| **Tech Stack** | Same for everything | Different per service |
| **Complexity** | Simple to start | Complex distributed system |
| **Team Size** | Works well for small teams | Works well for large teams |

---

### Benefits of Microservices

1. **Independent Deployment** — Deploy the Order Service without touching User Service
2. **Independent Scaling** — If Payment Service is slow, scale only it
3. **Technology Flexibility** — User Service in Java, ML service in Python, Analytics in Node.js
4. **Fault Isolation** — If Notification Service crashes, users can still place orders
5. **Team Autonomy** — Each team owns one service completely
6. **Faster Development** — Small, focused codebases are easier to understand

---

### Challenges of Microservices

1. **Distributed System Complexity** — Network calls fail; you need retry logic, circuit breakers
2. **Data Consistency** — Transactions across services are hard (no single database)
3. **Service Discovery** — How does Order Service find Payment Service's address?
4. **Monitoring** — Logs are scattered across 20 services; you need centralized logging
5. **Latency** — Every inter-service call adds network overhead
6. **Testing** — Integration testing across services is complex
7. **Operational Overhead** — Managing 20 deployments is much harder than 1

---

### Service Discovery — Eureka

**Problem:** In a dynamic environment, services start/stop, and their IP addresses change. How does Service A find Service B?

**Solution: Eureka Server (Service Registry)**

```
┌─────────────────────────────────────┐
│          Eureka Server              │
│  Registry:                          │
│  - order-service  → localhost:8082  │
│  - user-service   → localhost:8081  │
│  - payment-service → localhost:8083 │
└─────────────────────────────────────┘
         ↑ Register          ↓ Ask "where is order-service?"
    ┌────────────┐       ┌────────────┐
    │ Order      │       │ User       │
    │ Service    │       │ Service    │
    └────────────┘       └────────────┘
```

Each service registers itself with Eureka on startup. When User Service wants to call Order Service, it asks Eureka: "Where is order-service?" Eureka returns the address.

**Eureka Server Setup:**
```java
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}
```

**application.properties for Eureka Server:**
```properties
server.port=8761
spring.application.name=eureka-server
eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false
```

**Eureka Client (each microservice):**
```java
@SpringBootApplication
@EnableEurekaClient
public class OrderServiceApplication { ... }
```

```properties
# order-service application.properties
server.port=8082
spring.application.name=order-service
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
```

---

### API Gateway

**Problem:** The client (mobile app, browser) shouldn't need to know about 10 different services on 10 different ports. You need a single entry point.

**Solution: API Gateway**

The API Gateway is the front door of your microservices system. It:
- Routes requests to the correct service
- Handles cross-cutting concerns: authentication, rate limiting, logging
- Hides internal service structure from clients

```
Client → API Gateway (:8080) → [route /orders/**] → Order Service (:8082)
                             → [route /users/**]  → User Service (:8081)
                             → [route /payments/**]→ Payment Service (:8083)
```

**Spring Cloud Gateway configuration:**
```yaml
# application.yml for API Gateway
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://user-service    # lb = load balanced via Eureka
          predicates:
            - Path=/api/users/**
        - id: order-service
          uri: lb://order-service
          predicates:
            - Path=/api/orders/**
        - id: payment-service
          uri: lb://payment-service
          predicates:
            - Path=/api/payments/**
```

---

### Inter-Service Communication

#### Option 1: RestTemplate (Traditional)
```java
@Service
public class OrderService {
    private final RestTemplate restTemplate;

    public User getUserById(Long userId) {
        // Call User Service directly
        return restTemplate.getForObject(
            "http://user-service/api/users/" + userId, 
            User.class
        );
    }
}
```

#### Option 2: OpenFeign (Declarative — Recommended)

Feign lets you call another service as if it were a local Java interface:

```java
// Define the client interface — Feign generates the implementation
@FeignClient(name = "user-service")  // name matches the service name in Eureka
public interface UserServiceClient {
    
    @GetMapping("/api/users/{id}")
    User getUserById(@PathVariable Long id);
    
    @PostMapping("/api/users")
    User createUser(@RequestBody User user);
}

// Use it in your service
@Service
public class OrderService {
    private final UserServiceClient userServiceClient;

    public OrderService(UserServiceClient userServiceClient) {
        this.userServiceClient = userServiceClient;
    }

    public Order createOrder(Long userId, OrderRequest request) {
        // This looks like a local call but actually makes an HTTP request to user-service
        User user = userServiceClient.getUserById(userId);
        // ... create order logic
    }
}
```

Enable Feign in your main class:
```java
@SpringBootApplication
@EnableFeignClients
public class OrderServiceApplication { ... }
```

---

### Spring Cloud Ecosystem Overview

| Component | Purpose |
|---|---|
| **Spring Cloud Eureka** | Service discovery and registration |
| **Spring Cloud Gateway** | API Gateway — single entry point |
| **Spring Cloud OpenFeign** | Declarative REST client for inter-service calls |
| **Spring Cloud Config** | Centralized configuration for all services |
| **Spring Cloud Sleuth** | Distributed tracing (track requests across services) |
| **Spring Cloud CircuitBreaker (Resilience4j)** | Prevent cascading failures |
| **Spring Cloud LoadBalancer** | Client-side load balancing |

---

### When to Use Microservices

**Use Microservices when:**
- ✅ You have a large, complex system that needs to scale
- ✅ Multiple large teams work on the same application
- ✅ Different parts need different technology stacks
- ✅ Parts of the system have very different load patterns
- ✅ You need zero-downtime deployments

**Stick with Monolith when:**
- ❌ Small team (< 10 developers)
- ❌ Early-stage product — requirements change frequently
- ❌ Limited DevOps/infrastructure expertise
- ❌ Simple domain with clear boundaries
- ❌ Performance-critical app where latency matters

> **Martin Fowler's rule:** Start with a monolith. Move to microservices only when the monolith's pain points are clear and real.

---

## Real-World Analogy

**Monolith** is like a **Swiss Army knife** — does everything in one tool. Great for everyday use, but if the blade breaks, the whole knife is useless. Can't upgrade just the scissors.

**Microservices** are like a **professional chef's kitchen** — each tool does one job perfectly (a knife for cutting, a blender for blending, an oven for baking). If the blender breaks, the kitchen still functions. You can upgrade the oven without touching the blender. But managing 20 specialized tools requires more organization!

**Eureka** is the **kitchen phone directory** — when the chef needs the baker, they call the directory to find out where the baker is.

**API Gateway** is the **restaurant front desk** — all guests talk to the front desk, who routes them to the right table/kitchen/bar.

---

## Code Example

### Minimal Two-Service Example

#### User Service (port 8081)
```java
// UserServiceApplication.java
@SpringBootApplication
@EnableEurekaClient
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}

// UserController.java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping("/{id}")
    public Map<String, Object> getUser(@PathVariable Long id) {
        return Map.of("id", id, "name", "Alice Johnson", "email", "alice@example.com");
    }
}
```

```properties
# user-service application.properties
server.port=8081
spring.application.name=user-service
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
```

#### Order Service (port 8082) — calls User Service via Feign
```java
// Feign client to call User Service
@FeignClient(name = "user-service")
public interface UserClient {
    @GetMapping("/api/users/{id}")
    Map<String, Object> getUser(@PathVariable Long id);
}

// OrderController.java
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    
    private final UserClient userClient;
    
    public OrderController(UserClient userClient) {
        this.userClient = userClient;
    }
    
    @PostMapping
    public Map<String, Object> createOrder(@RequestBody Map<String, Object> request) {
        Long userId = Long.valueOf(request.get("userId").toString());
        String product = (String) request.get("product");
        
        // Call User Service to get user details
        Map<String, Object> user = userClient.getUser(userId);
        
        return Map.of(
            "orderId", 101,
            "product", product,
            "user", user,
            "status", "CREATED"
        );
    }
}
```

### Output
```
POST http://localhost:8082/api/orders
Body: {"userId": 1, "product": "Laptop"}

Response:
{
  "orderId": 101,
  "product": "Laptop",
  "user": {"id": 1, "name": "Alice Johnson", "email": "alice@example.com"},
  "status": "CREATED"
}
```

---

## Common Mistakes

- ❌ **Mistake**: Starting with microservices for a small project → ✅ **Fix**: Start with a monolith; extract services only when scaling pain is real
- ❌ **Mistake**: Sharing a single database across all microservices → ✅ **Fix**: Each service must own its own database — sharing creates tight coupling
- ❌ **Mistake**: Synchronous calls for everything → ✅ **Fix**: For non-critical, high-volume communication, use async messaging (Kafka, RabbitMQ)
- ❌ **Mistake**: No circuit breaker for inter-service calls → ✅ **Fix**: Use Resilience4j to prevent one failing service from cascading to others

---

## Best Practices

- Design each microservice around a **business capability** (User Service, Order Service)
- Each service should have its **own database** — no shared databases
- Use **asynchronous messaging** (Kafka/RabbitMQ) for non-time-critical communication
- Implement **Circuit Breaker** (Resilience4j) to handle service failures gracefully
- Centralize logging with **ELK Stack** (Elasticsearch, Logstash, Kibana)
- Use **distributed tracing** (Spring Cloud Sleuth + Zipkin) to track requests across services
- Each service should be **independently deployable** — avoid tightly coupled releases

---

## Interview Questions

**Q: What is the difference between monolithic and microservices architecture?**  
A: A monolith is a single deployable unit containing all application functionality, sharing one codebase and database. Microservices splits the application into small, independent services, each responsible for one capability, having its own database, and communicating via APIs. Microservices offer better scalability and fault isolation but introduce distributed system complexity.

**Q: What is service discovery and why is it needed in microservices?**  
A: In microservices, services run on dynamic IP addresses and ports that can change. Service discovery solves this: services register themselves with a registry (like Eureka) on startup. When Service A wants to call Service B, it asks the registry for Service B's current address instead of hardcoding it. This enables dynamic scaling and deployment.

**Q: What is an API Gateway?**  
A: An API Gateway is a single entry point for all client requests to a microservices system. It routes requests to the appropriate service, handles cross-cutting concerns like authentication, rate limiting, logging, and SSL termination. Clients talk to one URL instead of knowing about 10 different services. Spring Cloud Gateway is the modern implementation.

**Q: What is the difference between RestTemplate and Feign Client?**  
A: RestTemplate is the traditional imperative HTTP client where you manually build URLs and parse responses. OpenFeign is declarative — you define an interface with annotations and Spring generates the HTTP client implementation. Feign integrates with Eureka for service discovery and is much less verbose. Feign is the recommended approach in modern Spring Cloud applications.

**Q: What is a Circuit Breaker in microservices?**  
A: A Circuit Breaker is a pattern that prevents cascading failures. When Service A calls Service B and B is failing, without a circuit breaker, A will keep getting errors and may also fail. With a circuit breaker (like Resilience4j), after a threshold of failures, the circuit "opens" — A immediately returns a fallback response without calling B, giving B time to recover.

---

## Quick Revision

✔ Monolith = one big app; Microservices = many small independent services  
✔ Each microservice has its own database, codebase, and deployment  
✔ Eureka = service registry; services register themselves and discover others  
✔ API Gateway = single entry point; routes requests to correct service  
✔ Feign Client = declarative REST client for inter-service calls  
✔ Spring Cloud provides: Eureka, Gateway, Feign, Config, Sleuth, CircuitBreaker  
✔ Start with monolith; move to microservices when the pain is real  

---

## Related Topics

- Spring Boot REST APIs
- Spring Security
- Docker and Kubernetes (for deploying microservices)
- Message Queues (Kafka, RabbitMQ) for async communication

---

## Next Lesson

**JDBC — Lesson 1: Java Database Connectivity**
