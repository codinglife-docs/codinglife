---
id: functional-interfaces
title: Functional Interfaces
description: Understand Java's built-in functional interfaces — Predicate, Function, Consumer, Supplier, BiFunction — and how to create your own.
sidebar_position: 2
keywords:
  - Java
  - Functional Interfaces
  - Predicate
  - Function
  - Consumer
  - Supplier
  - Java 8
---

# Functional Interfaces

> **Reading Time:** 9 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

A functional interface is simply an interface with **exactly one abstract method**. Java 8 introduced the `@FunctionalInterface` annotation and a whole package of built-in functional interfaces (`java.util.function`) so you don't have to write your own every time. They are the building blocks that power lambdas and the Stream API.

---

## What You'll Learn

- What `@FunctionalInterface` means and why it matters
- The 5 most important built-in functional interfaces
- How to use each one with lambda expressions
- How to write your own custom functional interface

---

## Prerequisites

- Lambda Expressions (Lesson 1)
- Basic Java interfaces

---

## Explanation

### What is a Functional Interface?

A functional interface is an interface that contains **exactly one abstract method**. It can have any number of default or static methods, but only one abstract method.

```java
@FunctionalInterface
public interface Greeting {
    void greet(String name); // Only one abstract method
}
```

The `@FunctionalInterface` annotation is optional but recommended — it tells the compiler to throw an error if someone accidentally adds a second abstract method.

---

### Why Functional Interfaces Matter

Lambda expressions need a **target type** — the compiler needs to know which method the lambda is implementing. Functional interfaces give that target type. When you write:

```java
Runnable r = () -> System.out.println("Hi");
```

The compiler sees `Runnable` is a functional interface with `run()`, so it knows the lambda implements `run()`.

---

### The `java.util.function` Package

Java 8 ships with dozens of ready-made functional interfaces. The 5 most important ones are:

| Interface | Method | Takes | Returns | Use when |
|-----------|--------|-------|---------|----------|
| `Predicate<T>` | `test(T t)` | T | boolean | Testing/filtering |
| `Function<T,R>` | `apply(T t)` | T | R | Transforming |
| `Consumer<T>` | `accept(T t)` | T | nothing | Performing action |
| `Supplier<T>` | `get()` | nothing | T | Producing value |
| `BiFunction<T,U,R>` | `apply(T t, U u)` | T and U | R | Two-input transform |

---

### 1. Predicate\<T\> — Test Something

`Predicate<T>` takes one value and returns `true` or `false`. Perfect for filtering.

```java
Predicate<Integer> isEven = n -> n % 2 == 0;
System.out.println(isEven.test(4));  // true
System.out.println(isEven.test(7));  // false
```

Predicates can be combined with `and()`, `or()`, `negate()`:

```java
Predicate<Integer> isPositive = n -> n > 0;
Predicate<Integer> isEvenAndPositive = isEven.and(isPositive);
System.out.println(isEvenAndPositive.test(4));   // true
System.out.println(isEvenAndPositive.test(-4));  // false
```

---

### 2. Function\<T, R\> — Transform Something

`Function<T,R>` takes a value of type T and returns a value of type R. Perfect for converting or mapping.

```java
Function<String, Integer> strLength = s -> s.length();
System.out.println(strLength.apply("Hello"));  // 5

Function<String, String> toUpper = s -> s.toUpperCase();
System.out.println(toUpper.apply("hello"));    // HELLO
```

Functions can be chained with `andThen()` and `compose()`:

```java
Function<String, String> trim = s -> s.trim();
Function<String, String> upper = s -> s.toUpperCase();
Function<String, String> trimThenUpper = trim.andThen(upper);
System.out.println(trimThenUpper.apply("  hello  ")); // HELLO
```

---

### 3. Consumer\<T\> — Do Something, Return Nothing

`Consumer<T>` takes a value and does something with it (like printing), but returns nothing.

```java
Consumer<String> printer = s -> System.out.println("Value: " + s);
printer.accept("Java");  // Value: Java

Consumer<String> logger = s -> System.out.println("[LOG] " + s);
Consumer<String> printAndLog = printer.andThen(logger);
printAndLog.accept("Error");
// Value: Error
// [LOG] Error
```

---

### 4. Supplier\<T\> — Produce Something from Nothing

`Supplier<T>` takes no input and returns a value. Like a factory.

```java
Supplier<String> greeting = () -> "Hello, World!";
System.out.println(greeting.get());  // Hello, World!

Supplier<Double> randomNumber = () -> Math.random();
System.out.println(randomNumber.get());  // e.g. 0.7342...
```

---

### 5. BiFunction\<T, U, R\> — Two Inputs, One Output

`BiFunction<T,U,R>` takes two values and returns one. Useful when you need two inputs.

```java
BiFunction<String, Integer, String> repeat = (s, n) -> s.repeat(n);
System.out.println(repeat.apply("Java! ", 3)); // Java! Java! Java!

BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
System.out.println(add.apply(10, 20));  // 30
```

---

### Custom Functional Interface

You can create your own functional interface for any custom behavior:

```java
@FunctionalInterface
interface MathOperation {
    int operate(int a, int b);
}
```

Then use it like any other:

```java
MathOperation add = (a, b) -> a + b;
MathOperation multiply = (a, b) -> a * b;
System.out.println(add.operate(5, 3));       // 8
System.out.println(multiply.operate(5, 3));  // 15
```

---

## Real-World Analogy

Think of each functional interface as a **job role**:
- **Predicate** = Security guard (tests: "Are you allowed in?")
- **Function** = Translator (takes input, returns transformed output)
- **Consumer** = Delivery person (takes a package, delivers it, done — nothing returned)
- **Supplier** = Vending machine (you ask, it produces — no input needed)
- **BiFunction** = Chef (takes two ingredients, produces one dish)

---

## Code Example

### Complete Example: All 5 Functional Interfaces

```java
import java.util.function.*;

public class FunctionalInterfacesDemo {
    public static void main(String[] args) {

        // 1. Predicate — test if a student passed (marks >= 40)
        Predicate<Integer> hasPassed = marks -> marks >= 40;
        System.out.println("Student 1 passed: " + hasPassed.test(75));  // true
        System.out.println("Student 2 passed: " + hasPassed.test(30));  // false

        // 2. Function — convert student name to uppercase
        Function<String, String> toUpper = name -> name.toUpperCase();
        System.out.println("Name: " + toUpper.apply("alice"));  // ALICE

        // 3. Consumer — print a welcome message
        Consumer<String> welcome = name -> System.out.println("Welcome, " + name + "!");
        welcome.accept("Bob");  // Welcome, Bob!

        // 4. Supplier — provide a default grade
        Supplier<String> defaultGrade = () -> "C";
        System.out.println("Default Grade: " + defaultGrade.get());  // C

        // 5. BiFunction — calculate average of two scores
        BiFunction<Integer, Integer, Double> average = (a, b) -> (a + b) / 2.0;
        System.out.println("Average: " + average.apply(80, 90));  // 85.0
    }
}
```

### Output
```
Student 1 passed: true
Student 2 passed: false
Name: ALICE
Welcome, Bob!
Default Grade: C
Average: 85.0
```

---

### Custom Functional Interface Example

```java
@FunctionalInterface
interface StringTransformer {
    String transform(String input);

    // Default methods are allowed!
    default StringTransformer andThenTransform(StringTransformer after) {
        return input -> after.transform(this.transform(input));
    }
}

public class CustomFunctionalInterface {
    public static void main(String[] args) {
        StringTransformer trim = s -> s.trim();
        StringTransformer upper = s -> s.toUpperCase();
        StringTransformer exclaim = s -> s + "!!!";

        // Chain: trim → upper → add exclamation
        StringTransformer combined = trim
                .andThenTransform(upper)
                .andThenTransform(exclaim);

        System.out.println(combined.transform("  hello world  "));
        // Output: HELLO WORLD!!!
    }
}
```

### Output
```
HELLO WORLD!!!
```

---

## Common Mistakes

- ❌ **Mistake**: Putting two abstract methods in a `@FunctionalInterface` → ✅ **Fix**: A functional interface must have exactly ONE abstract method — the compiler will flag this error
- ❌ **Mistake**: Confusing `Function<T,R>` with `Consumer<T>` — both take input but Consumer returns void → ✅ **Fix**: If you need a return value, use `Function`; if you're just doing side effects, use `Consumer`
- ❌ **Mistake**: Forgetting that `Supplier` takes no input → ✅ **Fix**: `Supplier.get()` has no parameters — it produces a value from nothing
- ❌ **Mistake**: Thinking `@FunctionalInterface` is required → ✅ **Fix**: It's optional but strongly recommended — without it, a second abstract method won't cause a compile error

---

## Best Practices

- Always use `@FunctionalInterface` on your custom functional interfaces — it's a safety net
- Prefer the built-in `java.util.function` interfaces over writing your own when possible
- Use `Predicate` for filtering, `Function` for mapping — don't mix them up
- Chain predicates with `and()`, `or()`, `negate()` instead of writing complex inline logic
- Name your lambda variables after what they do: `isAdult`, `toUpperCase`, `printName`

---

## Interview Questions

**Q: What is a functional interface?**  
A: An interface with exactly one abstract method. It can have default and static methods. The `@FunctionalInterface` annotation is used to enforce this constraint at compile time.

**Q: What is the difference between `Predicate` and `Function`?**  
A: `Predicate<T>` takes a T and always returns `boolean` (used for testing/filtering). `Function<T,R>` takes a T and returns any type R (used for transforming data).

**Q: Can a functional interface have default methods?**  
A: Yes! Default methods don't count toward the "one abstract method" rule. `Predicate` itself has `and()`, `or()`, and `negate()` as default methods.

**Q: What is the difference between `Consumer` and `Function`?**  
A: `Consumer<T>` takes a value and returns nothing (`void`) — it's for side effects. `Function<T,R>` returns a transformed value — it's for mapping.

**Q: Name some built-in functional interfaces in Java.**  
A: `Predicate<T>`, `Function<T,R>`, `Consumer<T>`, `Supplier<T>`, `BiFunction<T,U,R>`, `UnaryOperator<T>`, `BinaryOperator<T>`, `Runnable`, `Callable<V>`.

---

## Quick Revision

✔ Functional interface = interface with exactly **one abstract method**  
✔ `@FunctionalInterface` = annotation that enforces the single-method rule  
✔ `Predicate<T>` → tests, returns boolean  
✔ `Function<T,R>` → transforms, returns R  
✔ `Consumer<T>` → acts, returns nothing  
✔ `Supplier<T>` → produces, takes nothing  
✔ `BiFunction<T,U,R>` → two inputs, one output  

---

## Related Topics

- Lambda Expressions
- Method References
- Stream API
- Optional Class

---

## Next Lesson

**Lesson 3 — Stream API**
