---
id: lambda-expressions
title: Lambda Expressions
description: Learn what lambda expressions are in Java 8, their syntax, and how they replace anonymous classes for cleaner code.
sidebar_position: 1
keywords:
  - Java
  - Lambda Expressions
  - Java 8
  - Functional Programming
  - Anonymous Class
---

# Lambda Expressions

> **Reading Time:** 8 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

A lambda expression is a short block of code that takes in parameters and returns a value. Think of it as a mini function that you can write inline — without needing to give it a name. Java 8 introduced lambdas to make code shorter and easier to read, especially when working with collections and event handling.

---

## What You'll Learn

- What a lambda expression is and why it exists
- The syntax of lambda expressions
- How lambdas replace anonymous inner classes
- Multi-line lambda expressions
- Real examples with `Runnable` and `Comparator`

---

## Prerequisites

- Basic Java syntax (classes, methods, interfaces)
- Understanding of interfaces in Java

---

## Explanation

### What Problem Do Lambdas Solve?

Before Java 8, whenever you needed to pass behavior (a piece of code) to a method, you had to create an **anonymous inner class**. Anonymous classes are verbose and messy. Let's look at an example:

```java
// Old way — anonymous inner class
Runnable r = new Runnable() {
    @Override
    public void run() {
        System.out.println("Running!");
    }
};
```

That's 5 lines of code just to say "print Running!". With a lambda expression, the same thing becomes:

```java
// New way — lambda
Runnable r = () -> System.out.println("Running!");
```

Just one line. That's the power of lambdas.

---

### Lambda Syntax

The general syntax of a lambda expression is:

```
(parameters) -> expression
```

Or for multiple statements:

```
(parameters) -> {
    statement1;
    statement2;
    return value;
}
```

Let's break it down:

| Part | Description |
|------|-------------|
| `(parameters)` | Input values. Can be empty `()` or have types or just names |
| `->` | The "arrow" — separates params from body |
| `expression` | What the lambda does / returns |

---

### Lambda Syntax Rules

**1. No parameters:**
```java
() -> System.out.println("Hello")
```

**2. One parameter (parentheses optional):**
```java
name -> System.out.println("Hello " + name)
// or
(name) -> System.out.println("Hello " + name)
```

**3. Multiple parameters:**
```java
(a, b) -> a + b
```

**4. With explicit types (optional):**
```java
(int a, int b) -> a + b
```

**5. Multi-line body (needs curly braces and return):**
```java
(a, b) -> {
    int sum = a + b;
    return sum;
}
```

---

### Where Can You Use Lambdas?

Lambdas can only be used where a **functional interface** is expected. A functional interface is any interface that has **exactly one abstract method**. Examples:

- `Runnable` — has `run()`
- `Comparator<T>` — has `compare()`
- `Callable<T>` — has `call()`

The compiler figures out which method you're implementing based on the interface type.

---

### Multi-line Lambdas

When your lambda has more than one line of logic, use curly braces:

```java
Comparator<String> comp = (s1, s2) -> {
    int lengthDiff = s1.length() - s2.length();
    if (lengthDiff != 0) return lengthDiff;
    return s1.compareTo(s2);
};
```

---

### Why Lambdas = Cleaner Code

- **Less boilerplate**: No need to write full anonymous class
- **More readable**: Intent is clearer at a glance
- **Enables functional style**: Pass behavior as arguments naturally
- **Works with Stream API**: Powers Java 8's stream pipeline

---

## Real-World Analogy

Think of a lambda like a **sticky note instruction**. Instead of hiring a full employee (anonymous class), writing their contract, and assigning them a desk — you just stick a note on the fridge saying "wash dishes". It's quick, direct, and disposable. Lambdas are your sticky notes for behavior.

---

## Code Example

### Example 1: Runnable with Lambda

```java
public class LambdaDemo {
    public static void main(String[] args) {

        // Old way — anonymous class
        Runnable oldWay = new Runnable() {
            @Override
            public void run() {
                System.out.println("Old way: Running in a thread!");
            }
        };

        // New way — lambda expression
        Runnable newWay = () -> System.out.println("New way: Running in a thread!");

        // Run both
        oldWay.run();
        newWay.run();
    }
}
```

### Output
```
Old way: Running in a thread!
New way: Running in a thread!
```

---

### Example 2: Comparator with Lambda

```java
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class ComparatorLambda {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Charlie", "Alice", "Bob", "Diana");

        // Old way — anonymous class
        names.sort(new Comparator<String>() {
            @Override
            public int compare(String a, String b) {
                return a.compareTo(b);
            }
        });
        System.out.println("Sorted (old way): " + names);

        // New way — lambda
        names.sort((a, b) -> b.compareTo(a)); // reverse sort
        System.out.println("Sorted (lambda): " + names);
    }
}
```

### Output
```
Sorted (old way): [Alice, Bob, Charlie, Diana]
Sorted (lambda): [Diana, Charlie, Bob, Alice]
```

---

### Example 3: Multi-line Lambda

```java
import java.util.Arrays;
import java.util.List;

public class MultiLineLambda {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(5, 2, 8, 1, 9, 3);

        // Multi-line lambda for sorting with custom logic
        numbers.sort((a, b) -> {
            System.out.println("Comparing " + a + " and " + b);
            return Integer.compare(a, b);
        });

        System.out.println("Sorted: " + numbers);
    }
}
```

### Output
```
Comparing 2 and 5
Comparing 8 and 2
...
Sorted: [1, 2, 3, 5, 8, 9]
```

---

## Common Mistakes

- ❌ **Mistake**: Using a lambda where the interface has more than one abstract method → ✅ **Fix**: Lambdas only work with functional interfaces (one abstract method)
- ❌ **Mistake**: Forgetting `return` in a multi-line lambda body → ✅ **Fix**: Always add `return` inside `{}` if the lambda should return a value
- ❌ **Mistake**: Modifying local variables from the enclosing method inside a lambda → ✅ **Fix**: Local variables used in lambdas must be effectively final (not changed after assignment)
- ❌ **Mistake**: Using explicit types inconsistently — e.g., `(int a, b)` → ✅ **Fix**: Either provide types for ALL params or NONE: `(int a, int b)` or `(a, b)`

---

## Best Practices

- Keep lambdas short — if it's more than 3-4 lines, consider using a named method and a **method reference** instead
- Use lambda expressions with the Stream API for clean data processing pipelines
- Avoid complex logic in lambdas — they should be readable at a glance
- Prefer lambdas over anonymous classes — they're the modern Java way
- Name your lambda variables meaningfully (e.g., `isAdult` not `x`)

---

## Interview Questions

**Q: What is a lambda expression in Java?**  
A: A lambda expression is an anonymous function (no name, no class) that can be passed around as a value. It provides a short syntax for implementing functional interfaces. Introduced in Java 8, it replaces verbose anonymous inner classes.

**Q: What is the syntax of a lambda expression?**  
A: `(parameters) -> expression` or `(parameters) -> { statements; }`. Parentheses are optional for single parameters, and the return keyword is optional for single-expression bodies.

**Q: Can lambda expressions access variables from the enclosing scope?**  
A: Yes, but only **effectively final** variables — variables that are assigned once and never changed. This is because lambda expressions may be executed at a different time, and mutable local variables could cause unpredictable behavior.

**Q: What is the difference between a lambda and an anonymous class?**  
A: Both implement an interface, but lambdas are shorter syntax, don't create a new scope (they share `this` with enclosing class), and can only implement functional interfaces. Anonymous classes can implement any interface or extend a class and have their own `this`.

**Q: Can a lambda expression throw a checked exception?**  
A: Only if the functional interface's abstract method declares that exception in its `throws` clause. Otherwise, you must catch it inside the lambda body.

---

## Quick Revision

✔ Lambda = short anonymous function: `(params) -> body`  
✔ Replaces anonymous inner classes for functional interfaces  
✔ Works only with interfaces that have **exactly one abstract method**  
✔ Multi-line lambdas use `{}` and explicit `return`  
✔ Local variables used in lambdas must be **effectively final**  

---

## Related Topics

- Functional Interfaces (`@FunctionalInterface`)
- Method References
- Stream API
- Anonymous Inner Classes

---

## Next Lesson

**Lesson 2 — Functional Interfaces**
