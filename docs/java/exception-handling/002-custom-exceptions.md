---
id: custom-exceptions
title: Custom Exceptions
description: Learn how to create your own custom exceptions in Java using throw, throws, try-with-resources, and extending Exception.
sidebar_position: 2
keywords:
  - Java
  - custom exception
  - throw
  - throws
  - try-with-resources
  - InvalidAgeException
---

# Custom Exceptions

> **Reading Time:** 10 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

Java allows you to create your own **custom exception classes** for business-specific error conditions that the built-in exceptions don't describe well. You use the `throw` keyword to trigger an exception and `throws` to declare that a method might throw one. `try-with-resources` automatically closes resources when done.

---

## What You'll Learn

- Why custom exceptions make code clearer and more meaningful
- How to create a custom exception by extending `Exception` or `RuntimeException`
- The difference between `throw` (trigger) and `throws` (declare)
- How `try-with-resources` works for automatic cleanup
- A real-world example: `InvalidAgeException`

---

## Prerequisites

- Exception Handling basics — try, catch, finally (Lesson 01)
- Java classes and inheritance

---

## Explanation

### Why Create Custom Exceptions?

Java has many built-in exceptions — `NullPointerException`, `IllegalArgumentException`, `IOException`, etc. But sometimes none of them describe your specific business problem clearly.

Consider a banking application. When someone tries to withdraw more than their balance, you could throw:
- `RuntimeException("Insufficient funds")` — works, but generic
- `InsufficientFundsException("Balance: 500, Attempted: 1000")` — specific, meaningful, professional

Custom exceptions make your code:
- **Self-documenting** — the exception name tells you exactly what went wrong
- **Easier to catch** — callers can catch your specific exception separately from others
- **Better for logging and debugging** — more context is available

---

### Extending Exception vs RuntimeException

When creating a custom exception, you must extend either `Exception` or `RuntimeException`:

**Extend `Exception`** → Creates a **checked exception**
- The compiler forces anyone calling your method to handle it
- Good for errors the caller is expected to handle (invalid input, business rule violation)

**Extend `RuntimeException`** → Creates an **unchecked exception**
- No compile-time enforcement
- Good for programming errors or conditions that are unlikely to be recoverable

```java
// Checked — caller MUST handle this
public class InvalidAgeException extends Exception {
    // ...
}

// Unchecked — caller doesn't have to handle this
public class InvalidAgeException extends RuntimeException {
    // ...
}
```

**General rule:** Use checked exceptions for recoverable conditions; use unchecked for programming errors or unrecoverable conditions.

---

### The `throw` Keyword

`throw` is used to **manually trigger (throw)** an exception. You create an exception object and throw it:

```java
throw new InvalidAgeException("Age cannot be negative: " + age);
```

Key points:
- `throw` is followed by an **exception object** (not a class)
- After `throw`, no more code in that block runs
- You can throw both built-in and custom exceptions

---

### The `throws` Keyword

`throws` is used in a **method signature** to declare that the method might throw a checked exception. It is a warning to callers that they need to handle it.

```java
public void registerUser(int age) throws InvalidAgeException {
    if (age < 0) {
        throw new InvalidAgeException("Age cannot be negative");
    }
}
```

Key points:
- `throws` goes on the method declaration line (not inside the method)
- For unchecked exceptions (RuntimeException), `throws` is optional
- For checked exceptions, `throws` is required if you don't handle it yourself

| Keyword | Where used | Purpose |
|---|---|---|
| `throw` | Inside method body | Actually throws the exception |
| `throws` | In method signature | Declares the exception may be thrown |

---

### try-with-resources

`try-with-resources` is a special syntax introduced in Java 7 that automatically closes resources (like files, database connections) when the try block ends — even if an exception occurs.

To use try-with-resources, the resource class must implement the `AutoCloseable` interface (which has a single `close()` method). All standard I/O classes already implement this.

```java
try (ResourceType resource = new ResourceType()) {
    // use resource
} catch (Exception e) {
    // handle exception
}
// resource.close() is called automatically here
```

Without try-with-resources, you would need a `finally` block to close the resource — and forgetting to do so causes **resource leaks**.

---

### Anatomy of a Custom Exception Class

A well-written custom exception typically has:
1. A **no-argument constructor** (with a default message)
2. A **message constructor** (takes a `String` message)
3. A **cause constructor** (takes another exception as the root cause — useful for wrapping)

```java
public class MyException extends Exception {
    public MyException() {
        super("Default error message");
    }

    public MyException(String message) {
        super(message);
    }

    public MyException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

---

## Real-World Analogy

Imagine a hospital receptionist checking patient ages before allowing blood donation. The hospital has a rule: donors must be between 18 and 65.

Java's built-in `IllegalArgumentException` would be like a generic rejection stamp that says "INVALID". A custom `InvalidDonorAgeException` is like a specific rejection letter that says "Rejected: donor age 15 is below minimum age of 18". 

The second is much clearer for the patient (caller) to understand and respond to appropriately. Custom exceptions are about **clarity and communication**.

---

## Code Example

### Example 1: Creating and Using InvalidAgeException

```java
// Step 1: Define the custom exception
class InvalidAgeException extends Exception {

    public InvalidAgeException() {
        super("Invalid age provided.");
    }

    public InvalidAgeException(String message) {
        super(message);
    }

    public InvalidAgeException(String message, Throwable cause) {
        super(message, cause);
    }
}

// Step 2: Use the custom exception in a class
class VotingSystem {

    // 'throws' declares that this method may throw InvalidAgeException
    public void registerVoter(String name, int age) throws InvalidAgeException {

        if (age < 0) {
            throw new InvalidAgeException("Age cannot be negative. Got: " + age);
        }

        if (age < 18) {
            throw new InvalidAgeException(
                name + " is too young to vote. Minimum age is 18, got: " + age
            );
        }

        System.out.println(name + " registered successfully. Age: " + age);
    }
}

// Step 3: Handle the exception
public class CustomExceptionDemo {
    public static void main(String[] args) {

        VotingSystem vs = new VotingSystem();

        String[][] candidates = {
            {"Alice", "25"},
            {"Bob", "16"},
            {"Charlie", "-5"},
            {"Diana", "30"}
        };

        for (String[] candidate : candidates) {
            try {
                vs.registerVoter(candidate[0], Integer.parseInt(candidate[1]));

            } catch (InvalidAgeException e) {
                System.out.println("Registration failed: " + e.getMessage());
            }
        }
    }
}
```

### Output
```
Alice registered successfully. Age: 25
Registration failed: Bob is too young to vote. Minimum age is 18, got: 16
Registration failed: Age cannot be negative. Got: -5
Diana registered successfully. Age: 30
```

---

### Example 2: try-with-resources (AutoCloseable)

```java
// A custom resource that implements AutoCloseable
class DatabaseConnection implements AutoCloseable {

    private String dbName;

    public DatabaseConnection(String dbName) {
        this.dbName = dbName;
        System.out.println("Connecting to database: " + dbName);
    }

    public void query(String sql) {
        System.out.println("Executing query: " + sql);
    }

    @Override
    public void close() {
        // This is called automatically when the try block ends
        System.out.println("Closing connection to: " + dbName);
    }
}

public class TryWithResourcesDemo {
    public static void main(String[] args) {

        System.out.println("--- With try-with-resources ---");

        // Connection is automatically closed after the try block
        try (DatabaseConnection conn = new DatabaseConnection("students_db")) {
            conn.query("SELECT * FROM students");
            // If an exception happened here, close() would STILL be called
        }

        System.out.println("After try block");

        System.out.println("\n--- Multiple resources ---");

        // Multiple resources — closed in REVERSE order
        try (DatabaseConnection conn1 = new DatabaseConnection("db1");
             DatabaseConnection conn2 = new DatabaseConnection("db2")) {
            conn1.query("SELECT * FROM orders");
            conn2.query("SELECT * FROM users");
        }
    }
}
```

### Output
```
--- With try-with-resources ---
Connecting to database: students_db
Executing query: SELECT * FROM students
Closing connection to: students_db
After try block

--- Multiple resources ---
Connecting to database: db1
Connecting to database: db2
Executing query: SELECT * FROM orders
Executing query: SELECT * FROM users
Closing connection to: db2
Closing connection to: db1
```

---

### Example 3: Unchecked Custom Exception

```java
// Unchecked — extends RuntimeException (no 'throws' needed)
class InsufficientFundsException extends RuntimeException {

    private double balance;
    private double amount;

    public InsufficientFundsException(double balance, double amount) {
        super(String.format(
            "Insufficient funds. Balance: %.2f, Attempted withdrawal: %.2f",
            balance, amount
        ));
        this.balance = balance;
        this.amount = amount;
    }

    public double getBalance() { return balance; }
    public double getAmount() { return amount; }
}

class BankAccount {
    private double balance;

    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }

    public void withdraw(double amount) {
        if (amount > balance) {
            throw new InsufficientFundsException(balance, amount);
        }
        balance -= amount;
        System.out.printf("Withdrew %.2f. Remaining balance: %.2f%n", amount, balance);
    }
}

public class BankDemo {
    public static void main(String[] args) {
        BankAccount account = new BankAccount(500.00);

        try {
            account.withdraw(200.00);  // OK
            account.withdraw(400.00);  // Fails — only 300 left
        } catch (InsufficientFundsException e) {
            System.out.println("Transaction failed: " + e.getMessage());
            System.out.printf("Your balance is: %.2f%n", e.getBalance());
        }
    }
}
```

### Output
```
Withdrew 200.00. Remaining balance: 300.00
Transaction failed: Insufficient funds. Balance: 300.00, Attempted withdrawal: 400.00
Your balance is: 300.00
```

---

## Common Mistakes

- ❌ **Mistake**: Confusing `throw` and `throws` → ✅ **Fix**: `throw` (no 's') goes INSIDE a method to trigger; `throws` goes on the method signature to declare
- ❌ **Mistake**: Not calling `super(message)` in the custom exception constructor → ✅ **Fix**: Always call `super(message)` so `getMessage()` works correctly
- ❌ **Mistake**: Extending `Exception` when `RuntimeException` is more appropriate → ✅ **Fix**: Use `RuntimeException` for programming errors; `Exception` for conditions the caller should explicitly handle
- ❌ **Mistake**: Forgetting to close resources in finally blocks → ✅ **Fix**: Use try-with-resources for anything that implements `AutoCloseable`

---

## Best Practices

- Name custom exceptions clearly: `InvalidAgeException`, `InsufficientFundsException`, `UserNotFoundException`
- Always call `super(message)` in every constructor of your custom exception
- Include extra fields in your exception for context (like balance and amount in `InsufficientFundsException`)
- Use try-with-resources for ALL I/O and database operations
- Prefer specific custom exceptions over generic `RuntimeException("some message")`

---

## Interview Questions

**Q: What is the difference between `throw` and `throws`?**  
A: `throw` is a statement inside a method body used to actually throw an exception object: `throw new MyException()`. `throws` is a keyword in the method signature that declares that the method might throw a checked exception, warning callers to handle it: `public void foo() throws MyException`.

**Q: When should you extend Exception vs RuntimeException for a custom exception?**  
A: Extend `Exception` (checked) when the caller is expected to handle the condition — like invalid user input or a business rule violation. Extend `RuntimeException` (unchecked) for programming errors or conditions that most callers cannot reasonably recover from. In modern Java, many prefer unchecked custom exceptions to avoid forcing callers to add boilerplate try-catch code.

**Q: What is try-with-resources and why is it important?**  
A: `try-with-resources` (Java 7+) automatically calls `close()` on any `AutoCloseable` resource declared in the try parentheses, even if an exception is thrown. This prevents resource leaks (file handles left open, database connections not released) which were a common bug when developers forgot to close resources in `finally` blocks.

**Q: Can you have a custom exception with additional fields?**  
A: Yes. Since a custom exception is just a Java class, you can add any fields, constructors, and methods you want. This is useful for storing context like an error code, a balance amount, or a user ID — information the catch block might need to handle the error appropriately.

---

## Quick Revision

✔ Custom exceptions extend `Exception` (checked) or `RuntimeException` (unchecked)  
✔ `throw` — fires the exception; `throws` — declares it in the method signature  
✔ Always call `super(message)` in custom exception constructors  
✔ try-with-resources auto-closes `AutoCloseable` resources — no more leaks  
✔ Name exceptions clearly to make code self-documenting  

---

## Related Topics

- Exception Handling (Lesson 01)
- File Handling (heavy use of exceptions)
- Java Interface — AutoCloseable

---

## Next Lesson

**01 - File Handling**
