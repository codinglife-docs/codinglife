---
id: records
title: Records
description: Learn Java 16 Records — immutable data classes that auto-generate constructors, getters, equals, hashCode, and toString with minimal code.
sidebar_position: 9
keywords:
  - Java
  - Records
  - Java 16
  - Immutable
  - Data Class
  - Compact Constructor
---

# Records

> **Reading Time:** 8 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

Java 16 introduced **records** as a special kind of class designed to hold immutable data. Before records, creating a simple data-holding class meant writing a constructor, getters, `equals()`, `hashCode()`, and `toString()` — all boilerplate. A record auto-generates all of that from a one-line declaration. Records are the Java equivalent of data classes in Kotlin or named tuples in Python.

---

## What You'll Learn

- Why records were created and what problem they solve
- How to declare a record
- What Java auto-generates for records
- Compact constructors and custom methods in records
- When to use records vs regular classes

---

## Prerequisites

- Java classes, constructors, getters
- `equals()` and `hashCode()` basics

---

## Explanation

### The Problem: Too Much Boilerplate

Imagine a simple class to hold a `Point` with x and y coordinates. Before records:

```java
public final class Point {
    private final int x;
    private final int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int x() { return x; }
    public int y() { return y; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Point)) return false;
        Point point = (Point) o;
        return x == point.x && y == point.y;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y);
    }

    @Override
    public String toString() {
        return "Point[x=" + x + ", y=" + y + "]";
    }
}
```

That's **30+ lines** for just two fields. With records:

```java
public record Point(int x, int y) { }
```

One line. Same functionality. The compiler generates everything else automatically.

---

### Record Syntax

```java
public record ClassName(Type field1, Type field2, ...) {
    // optional: custom methods, compact constructor
}
```

Example:
```java
public record Student(String name, int age, double gpa) { }
```

---

### What Java Auto-Generates

For `record Student(String name, int age, double gpa)`, Java automatically creates:

| Generated Item | What it does |
|---------------|-------------|
| `Student(String name, int age, double gpa)` | Canonical constructor |
| `name()`, `age()`, `gpa()` | Accessor methods (getters) — NOTE: no "get" prefix |
| `equals(Object o)` | Value-based equality (compares fields) |
| `hashCode()` | Based on all fields |
| `toString()` | `"Student[name=Alice, age=20, gpa=3.8]"` |

---

### Key Characteristics of Records

**1. Immutable** — record fields are implicitly `private final`. You cannot change them after construction.

**2. No setters** — since fields are final, there are no setter methods generated.

**3. Accessors use field name, not `getX()`** — `student.name()`, not `student.getName()`.

**4. Implicitly `final`** — you cannot extend a record or have a record extend another class (except `Object`).

**5. Can implement interfaces** — records can implement interfaces.

---

### Compact Constructors

Records have a special "compact constructor" that runs extra validation/logic inside `{}` without re-listing parameters:

```java
public record Student(String name, int age, double gpa) {

    // Compact constructor — no params, no this.field = field needed
    public Student {
        if (age < 0) throw new IllegalArgumentException("Age cannot be negative");
        if (gpa < 0.0 || gpa > 4.0) throw new IllegalArgumentException("Invalid GPA");
        name = name.trim(); // can transform values here
    }
}
```

The compact constructor:
- Has no parameter list (they're implicit)
- Runs before field assignment
- Can validate or transform field values

---

### Custom Methods in Records

You can add your own methods to a record:

```java
public record Circle(double radius) {

    // Custom method
    public double area() {
        return Math.PI * radius * radius;
    }

    public double circumference() {
        return 2 * Math.PI * radius;
    }
}
```

---

### Records Can Implement Interfaces

```java
interface Printable {
    void print();
}

public record Employee(String name, String department) implements Printable {
    @Override
    public void print() {
        System.out.println("Employee: " + name + " | Dept: " + department);
    }
}
```

---

### When to Use Records vs Regular Classes

| Use **Records** when... | Use **Regular Classes** when... |
|------------------------|--------------------------------|
| Data is immutable | Data needs to change (setters needed) |
| The class is just a data container | Complex behavior and logic |
| DTOs, value objects, responses | Entities with lifecycle |
| Key-value pairs | Classes that extend other classes |
| Returning multiple values | Mutable state is needed |

---

## Real-World Analogy

A record is like a **business card**. It holds fixed information (name, company, phone number) — you don't change the info on the card, you create a new one if details change. It comes with a standard format (toString), and two cards with the same info are considered identical (equals). Records are the business card of Java classes.

---

## Code Example

### Example 1: Basic Record

```java
// Define records
record Point(int x, int y) { }

record Student(String name, int age, double gpa) {
    // Compact constructor for validation
    public Student {
        if (age < 0) throw new IllegalArgumentException("Age cannot be negative: " + age);
        if (gpa < 0 || gpa > 10) throw new IllegalArgumentException("Invalid GPA: " + gpa);
        name = name.trim(); // normalize
    }

    // Custom method
    public String grade() {
        if (gpa >= 9) return "A+";
        if (gpa >= 8) return "A";
        if (gpa >= 7) return "B";
        return "C";
    }
}

public class RecordsDemo {
    public static void main(String[] args) {
        // Create instances
        Point p1 = new Point(3, 4);
        Point p2 = new Point(3, 4);
        Point p3 = new Point(0, 0);

        // Auto-generated toString
        System.out.println(p1); // Point[x=3, y=4]

        // Auto-generated equals (value-based!)
        System.out.println(p1.equals(p2)); // true — same values
        System.out.println(p1.equals(p3)); // false

        // Accessor methods (no "get" prefix)
        System.out.println("X = " + p1.x()); // X = 3
        System.out.println("Y = " + p1.y()); // Y = 4

        // Student record
        Student alice = new Student("  Alice  ", 20, 9.2);
        System.out.println(alice); // Student[name=Alice, age=20, gpa=9.2]
        System.out.println("Grade: " + alice.grade()); // Grade: A+

        // Immutability — there are no setters
        // alice.name = "Bob"; // ❌ Compile error — fields are final
    }
}
```

### Output
```
Point[x=3, y=4]
true
false
X = 3
Y = 4
Student[name=Alice, age=20, gpa=9.2]
Grade: A+
```

---

### Example 2: Records in Real Use — API Response

```java
import java.util.List;

// Records as data transfer objects
record Address(String street, String city, String country) { }

record UserResponse(int id, String username, String email, Address address) {
    // Custom method
    public String displayName() {
        return username + " (" + email + ")";
    }
}

public class RecordInAPI {
    public static void main(String[] args) {
        Address addr = new Address("123 Main St", "Mumbai", "India");
        UserResponse user = new UserResponse(1, "alice_dev", "alice@example.com", addr);

        System.out.println(user);
        System.out.println("Display: " + user.displayName());
        System.out.println("City: " + user.address().city());

        // Records work great in collections
        List<UserResponse> users = List.of(
            new UserResponse(1, "alice", "alice@mail.com", addr),
            new UserResponse(2, "bob", "bob@mail.com", new Address("456 Oak Ave", "Delhi", "India"))
        );

        users.forEach(u -> System.out.println(u.username() + " from " + u.address().city()));
    }
}
```

### Output
```
UserResponse[id=1, username=alice_dev, email=alice@example.com, address=Address[street=123 Main St, city=Mumbai, country=India]]
Display: alice_dev (alice@example.com)
City: Mumbai
alice from Mumbai
bob from Delhi
```

---

### Example 3: Records Implementing Interface

```java
interface Shape {
    double area();
    double perimeter();
}

record Rectangle(double width, double height) implements Shape {
    @Override
    public double area() { return width * height; }

    @Override
    public double perimeter() { return 2 * (width + height); }
}

record Circle(double radius) implements Shape {
    @Override
    public double area() { return Math.PI * radius * radius; }

    @Override
    public double perimeter() { return 2 * Math.PI * radius; }
}

public class ShapeRecords {
    public static void main(String[] args) {
        Shape rect = new Rectangle(5, 3);
        Shape circle = new Circle(4);

        System.out.printf("Rectangle: area=%.2f, perimeter=%.2f%n",
            rect.area(), rect.perimeter());
        System.out.printf("Circle: area=%.2f, perimeter=%.2f%n",
            circle.area(), circle.perimeter());
    }
}
```

### Output
```
Rectangle: area=15.00, perimeter=16.00
Circle: area=50.27, perimeter=25.13
```

---

## Common Mistakes

- ❌ **Mistake**: Trying to add setters to a record → ✅ **Fix**: Records are immutable — there are no setters. If you need to "change" a field, create a new instance
- ❌ **Mistake**: Using `getName()` to access record fields → ✅ **Fix**: Record accessors don't have the `get` prefix — use `name()`, not `getName()`
- ❌ **Mistake**: Trying to extend a record → ✅ **Fix**: Records are implicitly `final` and cannot be extended
- ❌ **Mistake**: Adding instance fields to a record body → ✅ **Fix**: All record state must be declared in the record header `record Foo(Type field)`. You can add `static` fields in the body though
- ❌ **Mistake**: Using records for mutable entities (like JPA database entities) → ✅ **Fix**: JPA entities need setters and a no-arg constructor — use regular classes for those

---

## Best Practices

- Use records for DTOs (Data Transfer Objects), value objects, API responses/requests
- Use compact constructors to validate input — don't skip validation just because it's easy
- Records make excellent map keys since they have correct `equals()` and `hashCode()`
- In Spring Boot / REST APIs, use records for request/response bodies
- Don't use records for JPA entities, builder pattern objects, or anything needing mutability

---

## Interview Questions

**Q: What is a record in Java?**  
A: A record is a special kind of class introduced in Java 16 for holding immutable data. It automatically generates a canonical constructor, accessor methods (without `get` prefix), `equals()`, `hashCode()`, and `toString()` based on the fields declared in the record header.

**Q: What is the difference between a record and a regular class?**  
A: Records are immutable (fields are `private final`), have no setters, are implicitly `final` (cannot be extended), and have auto-generated implementations of equals, hashCode, and toString. Regular classes are mutable by default and require you to write all of this manually.

**Q: What is a compact constructor in a record?**  
A: A compact constructor is a special constructor syntax in records where you write validation/transformation logic without re-listing the parameters or manually assigning `this.field = field`. The compiler handles field assignment after the compact constructor body runs.

**Q: Can records implement interfaces?**  
A: Yes, records can implement interfaces. They just cannot extend any class other than the implicit `Record` superclass (and `Object`).

**Q: Can you add methods to a record?**  
A: Yes. You can add any number of instance methods, static methods, and static fields to a record. You just cannot add non-static (instance) fields beyond what's declared in the record header.

---

## Quick Revision

✔ Record = immutable data class with auto-generated constructor, accessors, equals, hashCode, toString  
✔ Syntax: `record Name(Type field1, Type field2) { }`  
✔ Accessor methods use field name, no `get` prefix: `.name()`, `.age()`  
✔ Records are `final` — cannot be extended  
✔ Compact constructor: validate without re-listing params or assigning fields  
✔ Best for: DTOs, value objects, API response models  

---

## Related Topics

- Sealed Classes (Java 17)
- var Keyword
- Immutable Objects in Java
- Java Generics
- Spring Boot DTOs

---

## Next Lesson

**Lesson 10 — Sealed Classes**
