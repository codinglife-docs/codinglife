---
id: sealed-classes
title: Sealed Classes
description: Master Java 17 sealed classes — restrict class hierarchies with sealed, permits, non-sealed, and final for safer, more expressive code.
sidebar_position: 10
keywords:
  - Java
  - Sealed Classes
  - Java 17
  - permits
  - Pattern Matching
  - sealed
---

# Sealed Classes

> **Reading Time:** 8 Minutes  
> **Difficulty:** Intermediate

---

## Topic Summary

Java 17 introduced **sealed classes** as a way to control which classes can extend or implement a given class or interface. Before sealed classes, any class could extend any other non-final class — there was no way to say "only these specific classes are allowed subclasses." Sealed classes fix this, enabling more precise modeling of data hierarchies and better support for pattern matching with `switch`.

---

## What You'll Learn

- What sealed classes are and why they exist
- The `sealed` and `permits` keywords
- The three modifiers for permitted subclasses: `final`, `sealed`, `non-sealed`
- Pattern matching with sealed classes and `switch`
- When to use sealed classes vs regular class hierarchies

---

## Prerequisites

- Inheritance in Java (extends, implements)
- Records (Lesson 9) — often used together with sealed classes
- Basic `instanceof` and `switch` understanding

---

## Explanation

### The Problem: Uncontrolled Inheritance

Before Java 17, if you created a class hierarchy for shapes:

```java
abstract class Shape { }
```

Anyone could extend `Shape`:
```java
class Circle extends Shape { }
class Square extends Shape { }
class Triangle extends Shape { }
// Anyone can add this — you can't stop it:
class HackyShape extends Shape { } // ← you didn't intend this!
```

When processing shapes with `instanceof` chains, you couldn't be sure you handled all cases. You couldn't tell the compiler "the only shapes that exist are Circle, Square, and Triangle."

---

### Sealed Classes — Controlling the Hierarchy

A `sealed` class declares exactly which classes are allowed to extend it using `permits`:

```java
public sealed class Shape permits Circle, Rectangle, Triangle { }
```

Now **only** `Circle`, `Rectangle`, and `Triangle` can extend `Shape`. Any other class trying to extend `Shape` gets a **compile error**.

---

### The Three Modifiers for Permitted Subclasses

Every class in the `permits` list must be one of three things:

**1. `final`** — cannot be extended further (leaf node):
```java
public final class Circle extends Shape { }
```

**2. `sealed`** — can be further extended, but also with restricted permits:
```java
public sealed class Rectangle extends Shape permits Square { }
public final class Square extends Rectangle { }
```

**3. `non-sealed`** — opens the hierarchy back up — any class can extend it:
```java
public non-sealed class Triangle extends Shape { }
// Now anyone can extend Triangle
class IsoscelesTriangle extends Triangle { } // ✅ allowed
```

---

### Sealed Interfaces

You can also seal interfaces:

```java
public sealed interface Payment permits CreditCard, DebitCard, UPI { }
public record CreditCard(String cardNumber) implements Payment { }
public record DebitCard(String cardNumber) implements Payment { }
public record UPI(String vpa) implements Payment { }
```

Records work perfectly with sealed interfaces — they're automatically `final`, satisfying the sealed contract.

---

### Pattern Matching with `switch` (Java 21 stable, preview earlier)

The real power of sealed classes shines with `switch` expressions and pattern matching. The compiler knows the complete set of permitted types, so it can warn you about missing cases:

```java
static double calculateArea(Shape shape) {
    return switch (shape) {
        case Circle c    -> Math.PI * c.radius() * c.radius();
        case Rectangle r -> r.width() * r.height();
        case Triangle t  -> 0.5 * t.base() * t.height();
        // No default needed! Compiler knows these are ALL the cases
    };
}
```

Without sealed classes, you'd need a `default` case because the compiler can't know all subtypes. With sealed classes, the exhaustiveness check works — if you miss a case, it's a compile error.

---

### Why Sealed Classes Improve Safety

1. **Exhaustive pattern matching** — compiler ensures all cases are handled
2. **Domain modeling** — precisely models "this can only be one of these things"
3. **Prevents unintended extension** — third parties can't add unauthorized subclasses
4. **Better API design** — clear documentation of allowed hierarchy
5. **Works beautifully with records** — sealed interface + record subclasses = clean domain model

---

### Key Rules

- All permitted classes must be in the **same package** (or same module)
- Permitted classes must **directly extend** the sealed class (no skipping levels)
- The `permits` clause is optional if all subclasses are in the **same source file** (the compiler detects them automatically)
- Every permitted class must be `final`, `sealed`, or `non-sealed`

---

## Real-World Analogy

A sealed class is like a **company organizational chart** where only specific departments report to the CEO. You can't just create a new department and claim it reports to the CEO — you'd need explicit permission. `sealed` = the CEO; `permits` = the approved departments; `final` = leaf employees who manage no one; `non-sealed` = a manager who is allowed to hire freely.

---

## Code Example

### Example 1: Shape Hierarchy with Sealed Classes

```java
// Sealed class — only these 3 can extend Shape
sealed class Shape permits Circle, Rectangle, Triangle { }

// final — cannot be extended further
final class Circle extends Shape {
    private final double radius;
    Circle(double radius) { this.radius = radius; }
    double radius() { return radius; }
}

// sealed — can only be extended by Square
sealed class Rectangle extends Shape permits Square {
    private final double width, height;
    Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    double width() { return width; }
    double height() { return height; }
}

// Square extends Rectangle — must be final/sealed/non-sealed
final class Square extends Rectangle {
    Square(double side) { super(side, side); }
}

// non-sealed — any class can extend Triangle
non-sealed class Triangle extends Shape {
    private final double base, height;
    Triangle(double base, double height) {
        this.base = base;
        this.height = height;
    }
    double base() { return base; }
    double height() { return height; }
}

public class SealedClassDemo {
    static double area(Shape shape) {
        // Pattern matching switch — exhaustive!
        return switch (shape) {
            case Circle c    -> Math.PI * c.radius() * c.radius();
            case Square s    -> s.width() * s.width();
            case Rectangle r -> r.width() * r.height();
            case Triangle t  -> 0.5 * t.base() * t.height();
        };
    }

    static String describe(Shape shape) {
        return switch (shape) {
            case Circle c    -> "Circle with radius " + c.radius();
            case Square s    -> "Square with side " + s.width();
            case Rectangle r -> "Rectangle " + r.width() + "x" + r.height();
            case Triangle t  -> "Triangle with base " + t.base();
        };
    }

    public static void main(String[] args) {
        Shape[] shapes = {
            new Circle(5),
            new Rectangle(4, 6),
            new Square(3),
            new Triangle(8, 4)
        };

        for (Shape s : shapes) {
            System.out.printf("%s → area = %.2f%n", describe(s), area(s));
        }
    }
}
```

### Output
```
Circle with radius 5.0 → area = 78.54
Rectangle 4.0x6.0 → area = 24.00
Square with side 3.0 → area = 9.00
Triangle with base 8.0 → area = 16.00
```

---

### Example 2: Sealed Interface with Records

```java
// Sealed interface for payment methods
sealed interface Payment permits CreditCard, DebitCard, UPI, Cash {
    double amount();
}

// Records automatically satisfy the final requirement
record CreditCard(String cardNumber, double amount) implements Payment { }
record DebitCard(String cardNumber, double amount) implements Payment { }
record UPI(String vpa, double amount) implements Payment { }
record Cash(double amount) implements Payment { }

public class PaymentDemo {

    static String processPayment(Payment payment) {
        return switch (payment) {
            case CreditCard cc -> "Credit card ending in " +
                cc.cardNumber().substring(cc.cardNumber().length() - 4) +
                " charged ₹" + cc.amount();
            case DebitCard dc  -> "Debit card debited ₹" + dc.amount();
            case UPI u         -> "UPI payment to " + u.vpa() + " of ₹" + u.amount();
            case Cash c        -> "Cash payment of ₹" + c.amount();
            // No default needed — compiler knows all cases!
        };
    }

    public static void main(String[] args) {
        Payment[] payments = {
            new CreditCard("1234567890123456", 1500.00),
            new DebitCard("9876543210987654", 800.00),
            new UPI("alice@upi", 250.00),
            new Cash(100.00)
        };

        for (Payment p : payments) {
            System.out.println(processPayment(p));
        }
    }
}
```

### Output
```
Credit card ending in 3456 charged ₹1500.0
Debit card debited ₹800.0
UPI payment to alice@upi of ₹250.0
Cash payment of ₹100.0
```

---

### Example 3: What Sealed Prevents

```java
sealed class Result<T> permits Success, Failure { }

final class Success<T> extends Result<T> {
    private final T value;
    Success(T value) { this.value = value; }
    T value() { return value; }
}

final class Failure<T> extends Result<T> {
    private final String error;
    Failure(String error) { this.error = error; }
    String error() { return error; }
}

// This would cause a COMPILE ERROR:
// class Unknown extends Result<String> { } // ❌ Not permitted!

public class ResultDemo {
    static <T> String handle(Result<T> result) {
        return switch (result) {
            case Success<T> s -> "✅ Success: " + s.value();
            case Failure<T> f -> "❌ Error: " + f.error();
        };
    }

    public static void main(String[] args) {
        System.out.println(handle(new Success<>("Data loaded")));
        System.out.println(handle(new Failure<>("Network timeout")));
    }
}
```

### Output
```
✅ Success: Data loaded
❌ Error: Network timeout
```

---

## Common Mistakes

- ❌ **Mistake**: Forgetting to mark each permitted class as `final`, `sealed`, or `non-sealed` → ✅ **Fix**: Every class in the `permits` list must have one of these three modifiers — the compiler will tell you
- ❌ **Mistake**: Trying to put permitted classes in a different package → ✅ **Fix**: All permitted subclasses must be in the same package as the sealed class (or the same module if using modules)
- ❌ **Mistake**: Expecting sealed classes to work without the `permits` clause in different files → ✅ **Fix**: If permitted classes are in different files, you MUST include the `permits` clause; it's only optional when all subclasses are in the same file
- ❌ **Mistake**: Using `default` in switch when you have a sealed class — makes you lose exhaustiveness checking → ✅ **Fix**: Omit `default` in switch on a sealed type so the compiler warns if you miss a case

---

## Best Practices

- Combine sealed classes with records for clean, immutable domain models
- Use sealed interfaces when modeling "sum types" (a value can be one of several distinct types)
- Avoid `non-sealed` unless you specifically need to open the hierarchy — it defeats the purpose
- Use pattern matching `switch` with sealed classes — that's where they shine most
- Model domain concepts like `Result<T>` (Success/Failure), `Payment` (Credit/Debit/UPI), `Event` types using sealed classes

---

## Interview Questions

**Q: What is a sealed class in Java?**  
A: A sealed class (Java 17) restricts which classes can extend or implement it, using the `sealed` keyword and `permits` clause. Only the explicitly listed classes are allowed to be subclasses. Each permitted subclass must be `final`, `sealed`, or `non-sealed`.

**Q: What are the three modifiers a permitted subclass must have?**  
A: (1) `final` — cannot be extended further. (2) `sealed` — can be extended, but with its own `permits` list. (3) `non-sealed` — opens the hierarchy, allowing any class to extend it.

**Q: What is the benefit of sealed classes with switch?**  
A: With sealed classes, the compiler knows the complete set of permitted subclasses. This enables exhaustive pattern matching in `switch` expressions — no `default` is needed, and the compiler gives a compile error if any case is missing. This eliminates an entire class of runtime bugs.

**Q: How do sealed classes differ from `final` classes?**  
A: A `final` class cannot be extended at all. A `sealed` class can be extended, but only by specifically permitted subclasses. Sealed classes allow a controlled, limited hierarchy; final classes allow no hierarchy at all.

**Q: Can an interface be sealed?**  
A: Yes. You can declare `sealed interface MyInterface permits Foo, Bar`. This works especially well with records, since records are implicitly `final` and satisfy the sealed interface contract perfectly.

---

## Quick Revision

✔ `sealed` class + `permits` = restrict which classes can extend  
✔ Each permitted subclass must be: `final`, `sealed`, or `non-sealed`  
✔ `final` = no further extension; `sealed` = controlled extension; `non-sealed` = open again  
✔ All permitted classes must be in the same package  
✔ Sealed + pattern matching `switch` = exhaustive, compile-time-safe handling  
✔ Combine with records for clean domain modeling  

---

## Related Topics

- Records (Java 16)
- Pattern Matching with `instanceof` (Java 16)
- Pattern Matching with `switch` (Java 21)
- Abstract Classes and Interfaces
- Algebraic Data Types (functional programming concept)

---

## Next Lesson

**Lesson 11 — Process vs Thread (Multithreading Module)**
