---
id: singleton-pattern
title: Singleton Pattern
description: Learn the Singleton design pattern in Java — how to ensure only one instance of a class exists using private constructors, thread-safe double-checked locking, and the best-practice Enum singleton.
sidebar_position: 2
keywords:
  - Java
  - Singleton Pattern
  - Design Patterns
  - Thread Safe Singleton
  - Enum Singleton
  - Double Checked Locking
---

# Singleton Pattern

> **Reading Time:** 10 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

The Singleton pattern ensures that a class has **only one instance** throughout the entire application, and provides a **global access point** to that instance. It's one of the most widely used — and sometimes misused — creational design patterns.

---

## What You'll Learn

- What the Singleton pattern is and when to use it
- How to implement Singleton with a private constructor and static instance
- Thread-safe Singleton using double-checked locking
- The best Singleton implementation: Enum singleton
- Drawbacks of Singleton and when to avoid it

---

## Prerequisites

- Introduction to Design Patterns (Lesson 1)
- Java classes, static keyword, and basic multithreading concepts

---

## Explanation

### What is the Singleton Pattern?

Sometimes you need exactly **one** instance of a class — not zero, not two — exactly one. Common examples:
- **Database connection pool**: You want one pool shared everywhere, not a new pool per class.
- **Logger**: One logging instance writes to the same log file.
- **Configuration manager**: All parts of the app read from the same config.
- **Thread pool**: One pool shared across the application.

The Singleton pattern solves this by:
1. Making the constructor **private** (so nobody can call `new MyClass()` from outside)
2. Storing the single instance in a **static variable**
3. Providing a **static method** (`getInstance()`) to access that single instance

---

### Implementation 1: Basic Singleton (Not Thread-Safe)

```java
public class DatabaseConnection {

    // Step 2: Static variable holds the single instance
    private static DatabaseConnection instance;

    // Step 1: Private constructor — nobody can do 'new DatabaseConnection()'
    private DatabaseConnection() {
        System.out.println("Database connection created!");
        // actual connection setup would go here
    }

    // Step 3: Public static method to get the single instance
    public static DatabaseConnection getInstance() {
        if (instance == null) {           // If no instance yet...
            instance = new DatabaseConnection();  // ...create one
        }
        return instance;
    }

    public void query(String sql) {
        System.out.println("Executing: " + sql);
    }
}
```

**Usage:**
```java
DatabaseConnection db1 = DatabaseConnection.getInstance();
DatabaseConnection db2 = DatabaseConnection.getInstance();

System.out.println(db1 == db2);  // true — same object!
db1.query("SELECT * FROM users");
```

**Problem**: This is NOT thread-safe. If two threads call `getInstance()` simultaneously when `instance` is null, both might create a new instance, breaking the "only one" guarantee.

---

### Implementation 2: Synchronized Method (Thread-Safe, Slow)

```java
public class DatabaseConnection {
    private static DatabaseConnection instance;

    private DatabaseConnection() { }

    // synchronized — only one thread can enter at a time
    public static synchronized DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
}
```

**Problem**: `synchronized` on the method means every call to `getInstance()` acquires a lock — even when `instance` is already created. This is unnecessarily slow in high-concurrency situations.

---

### Implementation 3: Double-Checked Locking (Thread-Safe, Fast)

The classic solution for high-performance thread-safe Singleton:

```java
public class DatabaseConnection {

    // volatile ensures changes are visible to all threads immediately
    private static volatile DatabaseConnection instance;

    private DatabaseConnection() { }

    public static DatabaseConnection getInstance() {
        if (instance == null) {                      // Check 1 (no lock)
            synchronized (DatabaseConnection.class) { // Lock only if needed
                if (instance == null) {              // Check 2 (with lock)
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }
}
```

**Why double-check?**
- First `if`: avoids locking when instance is already created (fast path)
- `synchronized`: only one thread creates the instance
- Second `if`: handles the rare case where two threads both passed the first check simultaneously

**Why `volatile`?**
Without `volatile`, one thread might see a partially constructed object due to JVM instruction reordering. `volatile` ensures full visibility and ordering.

---

### Implementation 4: Bill Pugh Singleton (Using Static Inner Class)

This elegant approach leverages the JVM's class loading mechanism for thread safety — no `synchronized` keyword needed:

```java
public class DatabaseConnection {

    private DatabaseConnection() { }

    // Inner class loaded only when getInstance() is first called
    private static class SingletonHelper {
        // JVM guarantees this is created only once (class initialization)
        private static final DatabaseConnection INSTANCE = new DatabaseConnection();
    }

    public static DatabaseConnection getInstance() {
        return SingletonHelper.INSTANCE;
    }
}
```

**Why this is brilliant**: The `SingletonHelper` class is not loaded until `getInstance()` is called. Class initialization is inherently thread-safe in Java. No `synchronized`, no `volatile`, lazy initialization — it has everything!

---

### Implementation 5: Enum Singleton (Best Practice ✅)

**Josh Bloch** (author of *Effective Java*) recommends using an **enum** for Singleton — it's the simplest, safest, and most concise approach:

```java
public enum Logger {
    INSTANCE;  // Only one constant = only one instance

    private StringBuilder log = new StringBuilder();

    public void log(String message) {
        log.append(message).append("\n");
        System.out.println("[LOG] " + message);
    }

    public String getFullLog() {
        return log.toString();
    }
}
```

**Usage:**
```java
Logger.INSTANCE.log("Application started");
Logger.INSTANCE.log("User logged in");
System.out.println("Full log:\n" + Logger.INSTANCE.getFullLog());
```

**Why Enum Singleton wins**:
- ✅ Thread-safe by default (enum instances created at class load time)
- ✅ JVM guarantees only one instance
- ✅ Serialization-safe (prevents creating extra instances via deserialization)
- ✅ Prevents reflection attacks (unlike other Singleton implementations)
- ✅ Zero boilerplate

**Why other implementations fail at serialization**: If a regular Singleton class implements `Serializable`, deserializing it creates a **new instance**, breaking the pattern. Enum handles this automatically.

---

### Drawbacks of Singleton

Singleton is popular but has real downsides:

1. **Hidden global state**: Everything that uses the Singleton is secretly coupled to it. Hard to test in isolation.
2. **Difficult to unit test**: You can't easily substitute a mock Singleton for testing.
3. **Violates Single Responsibility Principle**: The class manages both its own business logic AND its own lifecycle.
4. **Concurrency issues**: If the Singleton holds mutable state, all threads share it — requires careful synchronization.
5. **Becomes a dumping ground**: Developers often add unrelated functionality to Singleton classes because "it's accessible everywhere."

**Alternatives**: Dependency Injection (Spring `@Bean @Scope("singleton")`) is often better — it gives you the same "one instance" behavior without tight coupling.

---

## Real-World Analogy

A **country's president** is a Singleton — at any given time, there is exactly one. You don't create a new president every time you need to talk to the government. Everyone accesses the same person. They hold the position until they leave. But if the president tries to handle everything personally, it becomes a bottleneck — the same risk with an overloaded Singleton.

---

## Code Example

```java
// Complete Singleton example: Application Logger
public enum AppLogger {
    INSTANCE;

    private final java.util.List<String> logs = new java.util.ArrayList<>();

    public void info(String message) {
        String entry = "[INFO] " + message;
        logs.add(entry);
        System.out.println(entry);
    }

    public void error(String message) {
        String entry = "[ERROR] " + message;
        logs.add(entry);
        System.out.println(entry);
    }

    public void printAllLogs() {
        System.out.println("\n=== Complete Log History ===");
        logs.forEach(System.out::println);
    }
}

// Simulated classes using the same logger
class UserService {
    public void login(String user) {
        AppLogger.INSTANCE.info("User logged in: " + user);
    }
}

class OrderService {
    public void placeOrder(String item) {
        AppLogger.INSTANCE.info("Order placed: " + item);
    }

    public void cancelOrder(String id) {
        AppLogger.INSTANCE.error("Order cancelled: " + id);
    }
}

public class SingletonDemo {
    public static void main(String[] args) {
        UserService userService = new UserService();
        OrderService orderService = new OrderService();

        userService.login("Alice");
        orderService.placeOrder("Laptop");
        orderService.cancelOrder("ORD-001");
        userService.login("Bob");

        // The SAME logger instance captured everything
        AppLogger.INSTANCE.printAllLogs();

        // Verify it's truly one instance
        System.out.println("\nSame instance? " +
            (AppLogger.INSTANCE == AppLogger.INSTANCE));  // always true
    }
}
```

### Output
```
[INFO] User logged in: Alice
[INFO] Order placed: Laptop
[ERROR] Order cancelled: ORD-001
[INFO] User logged in: Bob

=== Complete Log History ===
[INFO] User logged in: Alice
[INFO] Order placed: Laptop
[ERROR] Order cancelled: ORD-001
[INFO] User logged in: Bob

Same instance? true
```

---

## Common Mistakes

- ❌ **Mistake**: Basic Singleton without `volatile` or synchronization in multithreaded code → ✅ **Fix**: Use double-checked locking with `volatile`, or use the Bill Pugh/Enum approach.
- ❌ **Mistake**: Making too many classes Singleton → ✅ **Fix**: Only use Singleton when you genuinely need one instance. Consider Dependency Injection instead.
- ❌ **Mistake**: Singleton implementing `Serializable` without `readResolve()` → ✅ **Fix**: Add `protected Object readResolve() { return INSTANCE; }` or use Enum singleton (handles this automatically).
- ❌ **Mistake**: Not considering reflection attacks — `Constructor.setAccessible(true)` can bypass private constructors → ✅ **Fix**: Use Enum singleton (immune to reflection).

---

## Best Practices

- **Prefer Enum Singleton** for simplicity, thread safety, and serialization safety.
- **If not using Enum**, use the Bill Pugh static inner class approach for lazy, thread-safe initialization.
- Use `volatile` with double-checked locking if you must use that approach (Java 5+).
- Consider **Dependency Injection** frameworks (Spring) as an alternative — they manage singleton lifecycle without the coupling problems.
- Avoid adding mutable state to Singletons used in multithreaded environments.

---

## Interview Questions

**Q: How do you implement a thread-safe Singleton in Java?**  
A: Three main approaches: (1) **Synchronized method** — simple but slow due to lock on every call; (2) **Double-checked locking** with `volatile` — fast after initialization, thread-safe; (3) **Bill Pugh (static inner class)** — lazy, thread-safe, no synchronization needed; (4) **Enum** — best practice per Effective Java, handles thread safety, serialization, and reflection automatically.

**Q: Why use `volatile` in double-checked locking?**  
A: Without `volatile`, the JVM's instruction reordering optimization can cause a thread to see a partially constructed object. `volatile` prevents reordering and ensures that when a thread reads the `instance` variable, it sees the fully constructed object. It also guarantees that writes to `instance` are immediately visible to all threads.

**Q: What is the best way to implement Singleton in Java and why?**  
A: The Enum approach is considered best practice (per *Effective Java* by Josh Bloch). It's thread-safe by default (JVM guarantees one enum constant), serialization-safe (doesn't create duplicate instances during deserialization), and immune to reflection attacks. It also has the least boilerplate.

**Q: What are the drawbacks of the Singleton pattern?**  
A: (1) Creates hidden global state making code hard to reason about; (2) Makes unit testing difficult since you can't inject a mock; (3) Can become a code smell — a "god object" accumulating unrelated responsibilities; (4) Mutable state in a Singleton in multithreaded code requires careful synchronization; (5) Violates the Single Responsibility Principle by managing its own lifecycle.

---

## Quick Revision

✔ Singleton ensures only one instance of a class exists  
✔ Core mechanics: private constructor + static instance + `getInstance()` method  
✔ Basic Singleton is NOT thread-safe  
✔ Thread-safe options: synchronized method, double-checked locking with `volatile`, Bill Pugh, Enum  
✔ **Enum Singleton is the best practice** — thread-safe, serialization-safe, reflection-proof  
✔ Drawbacks: hidden state, hard to test, can become god object  

---

## Related Topics

- Factory Pattern (Lesson 3)
- Builder Pattern (Lesson 4)
- Introduction to Design Patterns (Lesson 1)

---

## Next Lesson

**Lesson 3 — Factory Pattern: Creating Objects the Smart Way**
