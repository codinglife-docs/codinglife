---
id: builder-pattern
title: Builder Pattern
description: Learn the Builder design pattern in Java — constructing complex objects step by step using an inner static Builder class, with optional fields, method chaining, and a mention of Lombok @Builder.
sidebar_position: 4
keywords:
  - Java
  - Builder Pattern
  - Design Patterns
  - Method Chaining
  - Lombok Builder
  - Creational Patterns
---

# Builder Pattern

> **Reading Time:** 10 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

The Builder pattern is a creational design pattern that lets you construct complex objects step by step. Instead of a massive constructor with many parameters (some optional), you use a fluent builder that lets you set only the fields you need, in any order. The result is clean, readable code like `Person.builder().name("Rahee").age(20).build()`.

---

## What You'll Learn

- The problem with constructors that have many parameters
- How to implement the Builder pattern with an inner static Builder class
- Method chaining (fluent interface)
- The difference between mandatory and optional fields
- How Lombok's `@Builder` generates Builder code automatically

---

## Prerequisites

- Introduction to Design Patterns (Lesson 1)
- Java classes, constructors, and method chaining basics

---

## Explanation

### The Problem: Constructor with Too Many Parameters

Suppose you're creating a `Person` object with many fields — some required, some optional:

```java
// This constructor is a nightmare
public Person(String firstName, String lastName, int age,
              String email, String phone, String address,
              String city, String country, boolean active) {
    // ...
}

// What does this mean? Which argument is which?
Person p = new Person("John", "Doe", 25, "john@email.com",
                      null, "123 Main St", "New York", "USA", true);
```

Problems:
1. **Readability**: You can't tell which `null` maps to which field without checking the constructor
2. **Error-prone**: Easy to mix up arguments (especially same-type params like multiple Strings)
3. **Optional fields**: Must pass `null` for every optional field you don't need
4. **Telescoping constructors**: Adding many overloaded constructors for different combinations

The Builder pattern solves all of this elegantly.

---

### The Builder Pattern Structure

```
┌─────────────────────────────────────┐
│           Person (Target class)      │
│                                     │
│  - firstName: String                │
│  - lastName: String                 │
│  - age: int                         │
│  - email: String                    │
│  - phone: String (optional)         │
│  - address: String (optional)       │
│                                     │
│  + private Person(Builder builder)  │
│  + static builder(): Builder        │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   static class Builder      │   │
│  │                             │   │
│  │  + firstName(): Builder     │   │
│  │  + lastName(): Builder      │   │
│  │  + age(): Builder           │   │
│  │  + email(): Builder         │   │
│  │  + phone(): Builder         │   │
│  │  + address(): Builder       │   │
│  │  + build(): Person          │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

### Implementing the Builder Pattern

```java
public class Person {
    // All fields are final — Person is immutable once built
    private final String firstName;   // required
    private final String lastName;    // required
    private final int age;            // required
    private final String email;       // required
    private final String phone;       // optional
    private final String address;     // optional
    private final String city;        // optional
    private final String country;     // optional

    // Private constructor — only Builder can create Person
    private Person(Builder builder) {
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.age = builder.age;
        this.email = builder.email;
        this.phone = builder.phone;
        this.address = builder.address;
        this.city = builder.city;
        this.country = builder.country;
    }

    // Getters (no setters — immutable)
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public int getAge() { return age; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getAddress() { return address; }

    @Override
    public String toString() {
        return "Person{" +
            "name='" + firstName + " " + lastName + "'" +
            ", age=" + age +
            ", email='" + email + "'" +
            (phone != null ? ", phone='" + phone + "'" : "") +
            (address != null ? ", address='" + address + "'" : "") +
            "}";
    }

    // Static factory method — entry point for the builder
    public static Builder builder() {
        return new Builder();
    }

    // ======= Inner Static Builder Class =======
    public static class Builder {
        // Required fields
        private String firstName;
        private String lastName;
        private int age;
        private String email;

        // Optional fields — initialized to null/defaults
        private String phone;
        private String address;
        private String city;
        private String country;

        // Private constructor — only accessible via Person.builder()
        private Builder() {}

        // Each setter returns 'this' (the Builder) — enables chaining
        public Builder firstName(String firstName) {
            this.firstName = firstName;
            return this;    // ← key for method chaining
        }

        public Builder lastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public Builder age(int age) {
            this.age = age;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder phone(String phone) {
            this.phone = phone;
            return this;
        }

        public Builder address(String address) {
            this.address = address;
            return this;
        }

        public Builder city(String city) {
            this.city = city;
            return this;
        }

        public Builder country(String country) {
            this.country = country;
            return this;
        }

        // Validate required fields and construct the Person
        public Person build() {
            // Validate required fields
            if (firstName == null || firstName.isEmpty()) {
                throw new IllegalStateException("firstName is required");
            }
            if (lastName == null || lastName.isEmpty()) {
                throw new IllegalStateException("lastName is required");
            }
            if (age <= 0) {
                throw new IllegalStateException("age must be positive");
            }
            if (email == null || !email.contains("@")) {
                throw new IllegalStateException("valid email is required");
            }
            return new Person(this);
        }
    }
}
```

---

### Using the Builder

```java
public class BuilderDemo {
    public static void main(String[] args) {

        // Full person with all fields — clean and readable
        Person alice = Person.builder()
            .firstName("Alice")
            .lastName("Johnson")
            .age(28)
            .email("alice@example.com")
            .phone("+1-555-0100")
            .address("123 Main St")
            .city("New York")
            .country("USA")
            .build();

        // Minimal person — only required fields
        Person bob = Person.builder()
            .firstName("Bob")
            .lastName("Smith")
            .age(35)
            .email("bob@example.com")
            .build();  // no phone, address, etc.

        System.out.println(alice);
        System.out.println(bob);

        // This will throw IllegalStateException — missing required fields
        try {
            Person invalid = Person.builder()
                .firstName("Charlie")
                .build();  // missing lastName, age, email
        } catch (IllegalStateException e) {
            System.out.println("Caught: " + e.getMessage());
        }
    }
}
```

### Output
```
Person{name='Alice Johnson', age=28, email='alice@example.com', phone='+1-555-0100', address='123 Main St'}
Person{name='Bob Smith', age=35, email='bob@example.com'}
Caught: lastName is required
```

---

### Lombok @Builder — Automatic Builder Generation

In real projects, manually writing builder classes is repetitive. **Lombok** is a Java library that generates builder code automatically with a single annotation:

```java
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@ToString
public class Person {
    private final String firstName;     // required (enforce in builder)
    private final String lastName;
    private final int age;
    private final String email;
    private final String phone;         // optional
    private final String address;       // optional
}
```

With Lombok, you get the SAME clean builder syntax for free — no boilerplate:

```java
Person person = Person.builder()
    .firstName("Rahee")
    .lastName("Dev")
    .age(20)
    .email("rahee@example.com")
    .build();

System.out.println(person);
```

Lombok generates the `Builder` inner class, all setter methods, and `build()` at compile time. Add Lombok to your Maven/Gradle project and it handles the rest.

---

### Builder vs Constructor with Many Parameters

| Aspect | Constructor | Builder |
|---|---|---|
| Readability | Poor for 5+ params | Excellent — self-documenting |
| Optional fields | Must pass null | Just don't call that setter |
| Field order | Fixed by constructor | Any order |
| Immutability | Can have it | Natural fit (final fields) |
| Validation | In constructor | In `build()` |
| Boilerplate | None | Moderate (use Lombok to reduce) |
| Usage | Simple objects | Complex objects with many fields |

---

## Real-World Analogy

Building a `Person` object is like **ordering a custom burger**. You tell the cashier (builder) step by step: "I want a beef patty, add cheese, skip the pickles, add extra sauce." You don't have to specify every possible ingredient — just the ones you want. When you're done specifying (`build()`), they make your burger (object) exactly as you described.

---

## Code Example

```java
// Building a complex HTTP Request object using Builder
public class HttpRequest {
    private final String url;          // required
    private final String method;       // required
    private final String body;         // optional
    private final int timeoutMs;       // optional (default: 5000)
    private final java.util.Map<String, String> headers;  // optional

    private HttpRequest(Builder builder) {
        this.url = builder.url;
        this.method = builder.method;
        this.body = builder.body;
        this.timeoutMs = builder.timeoutMs;
        this.headers = java.util.Collections.unmodifiableMap(builder.headers);
    }

    @Override
    public String toString() {
        return method + " " + url +
            "\n  Timeout: " + timeoutMs + "ms" +
            "\n  Headers: " + headers +
            (body != null ? "\n  Body: " + body : "");
    }

    public static Builder builder(String url, String method) {
        return new Builder(url, method);
    }

    public static class Builder {
        private final String url;
        private final String method;
        private String body;
        private int timeoutMs = 5000;  // default value
        private java.util.Map<String, String> headers = new java.util.HashMap<>();

        private Builder(String url, String method) {
            this.url = url;
            this.method = method;
        }

        public Builder body(String body) { this.body = body; return this; }
        public Builder timeout(int ms) { this.timeoutMs = ms; return this; }
        public Builder header(String key, String value) {
            this.headers.put(key, value);
            return this;
        }

        public HttpRequest build() {
            if (url == null || url.isEmpty()) throw new IllegalStateException("URL required");
            return new HttpRequest(this);
        }
    }
}

public class HttpBuilderDemo {
    public static void main(String[] args) {
        // GET request — minimal
        HttpRequest getRequest = HttpRequest.builder("https://api.example.com/users", "GET")
            .header("Accept", "application/json")
            .header("Authorization", "Bearer token123")
            .timeout(3000)
            .build();

        System.out.println("=== GET Request ===");
        System.out.println(getRequest);

        // POST request — with body
        HttpRequest postRequest = HttpRequest.builder("https://api.example.com/users", "POST")
            .header("Content-Type", "application/json")
            .header("Authorization", "Bearer token123")
            .body("{\"name\": \"Alice\", \"age\": 28}")
            .timeout(10000)
            .build();

        System.out.println("\n=== POST Request ===");
        System.out.println(postRequest);
    }
}
```

### Output
```
=== GET Request ===
GET https://api.example.com/users
  Timeout: 3000ms
  Headers: {Accept=application/json, Authorization=Bearer token123}

=== POST Request ===
POST https://api.example.com/users
  Timeout: 10000ms
  Headers: {Content-Type=application/json, Authorization=Bearer token123}
  Body: {"name": "Alice", "age": 28}
```

---

## Common Mistakes

- ❌ **Mistake**: Forgetting to return `this` in Builder setter methods → ✅ **Fix**: Every setter in the Builder must `return this;` to enable method chaining.
- ❌ **Mistake**: Making Builder's fields have the same names as the target class's fields but making them non-private → ✅ **Fix**: Builder fields should be private; only expose them via setter methods.
- ❌ **Mistake**: Not validating required fields in `build()` → ✅ **Fix**: Always validate mandatory fields in `build()` and throw `IllegalStateException` with a clear message.
- ❌ **Mistake**: Using Builder for simple 2–3 field objects → ✅ **Fix**: Builders add complexity. Use them only when you have 4+ fields, especially with optional ones.

---

## Best Practices

- Use Lombok `@Builder` in real projects to eliminate builder boilerplate.
- Make the built object **immutable** — use `final` fields and no setters on the target class.
- Validate all required fields in `build()` before constructing the object.
- Provide defaults for optional fields directly in the Builder class.
- Name the entry-point method `builder()` or `newBuilder()` for consistency.
- Consider `@Builder.Default` with Lombok to set default values for optional fields.

---

## Interview Questions

**Q: What problem does the Builder pattern solve?**  
A: The Builder pattern solves the problem of constructors with many parameters — often called the "telescoping constructor" anti-pattern. When a class has many fields (some mandatory, some optional), a constructor becomes hard to read and use. Builder provides a fluent, step-by-step way to construct complex objects with clarity and safety.

**Q: How does method chaining work in the Builder pattern?**  
A: Each setter method in the Builder class sets a field and then returns `this` (the Builder object itself). This allows consecutive method calls to be chained: `builder.name("Alice").age(25).email("alice@test.com")`. The chain ends with `.build()` which validates and constructs the target object.

**Q: What is the difference between Builder pattern and Factory pattern?**  
A: Factory pattern focuses on **what** to create — deciding which class to instantiate. Builder pattern focuses on **how** to create — constructing a complex object step by step with many configuration options. Factory hides the class selection; Builder hides the complexity of construction. They can be used together: a factory that returns a builder.

**Q: Why should the built object be immutable?**  
A: Immutability (using `final` fields and no setters) makes objects thread-safe, prevents accidental modification after construction, and makes code easier to reason about. Once you call `build()`, the object's state is fixed. If you need a modification, create a new object using the builder again.

---

## Quick Revision

✔ Builder pattern constructs complex objects step by step  
✔ Core structure: target class with private constructor + inner static Builder class  
✔ Builder setters return `this` to enable method chaining  
✔ `build()` validates required fields and returns the final immutable object  
✔ Great for classes with many optional fields  
✔ Lombok `@Builder` eliminates all boilerplate in real projects  

---

## Related Topics

- Singleton Pattern (Lesson 2)
- Factory Pattern (Lesson 3)
- Observer Pattern (Lesson 5)

---

## Next Lesson

**Lesson 5 — Observer Pattern: Subject Notifies All Observers**
