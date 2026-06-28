---
id: intro-to-oop
title: Introduction to OOP
description: Learn what Object-Oriented Programming is, why it was invented, and get an overview of its four pillars with real-world examples.
sidebar_position: 1
keywords:
  - Java
  - OOP
  - Object-Oriented Programming
  - Four Pillars
  - Procedural vs OOP
---

# Introduction to OOP

> **Reading Time:** 8 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

Object-Oriented Programming (OOP) is a style of writing code where you organize everything around **objects** — just like the real world is made of objects. Instead of writing a long list of instructions, you group related data and actions together. Java is built entirely around this idea.

---

## What You'll Learn

- What OOP is and why it was invented
- How OOP compares to old-school procedural programming
- The four pillars of OOP (overview)
- How a real-world car maps to a Java class

---

## Prerequisites

- No prerequisites, this is the first lesson in OOP

---

## Explanation

### Why Was OOP Invented?

In the early days of programming, people wrote code in a **procedural** style — one long list of steps, like a recipe. This worked fine for small programs. But as programs grew bigger, things got messy fast:

- Code was repeated everywhere
- Changing one thing broke ten other things
- It was hard to understand what did what
- Teams couldn't work on the same code easily

So computer scientists asked: *"How do we write programs the same way we think about the real world?"*

The answer was **Object-Oriented Programming**, pioneered in the 1960s and popularized in the 1980s–90s. The idea: model your software after real objects. A car is an object. A student is an object. A bank account is an object.

---

### Procedural vs Object-Oriented

Let's compare both styles with a simple example — managing a student's data.

**Procedural Style (old way):**

```
String studentName = "Alice";
int studentAge = 16;
float studentGrade = 9.5f;

// function takes all data as parameters — messy!
printStudentReport(studentName, studentAge, studentGrade);
```

Everything is floating around as loose variables. As you add more students, this becomes chaos.

**OOP Style (Java way):**

```
Student alice = new Student("Alice", 16, 9.5f);
alice.printReport();
```

All data and behavior for a student lives in one neat `Student` object. Clean, organized, scalable.

---

### What Is a Class?

A **class** is a blueprint. Think of it like an architectural drawing for a house. The drawing isn't a house — but you can build many houses from the same drawing.

A **class** defines:
- **Properties (fields):** what the object *has* (color, speed, name)
- **Behaviors (methods):** what the object *can do* (drive, brake, honk)

### What Is an Object?

An **object** is an actual instance created from the class — a real house built from the blueprint. You can create as many objects as you want from the same class, each with its own data.

---

### Real-World Example: A Car

Let's map a real car to Java concepts:

| Real World | Java Equivalent |
|---|---|
| Car blueprint at factory | `Car` class |
| Your red Honda Civic | `Car myCar = new Car()` |
| Color, speed, fuel level | Fields (variables inside class) |
| Drive, brake, honk | Methods (functions inside class) |

A rough sketch of what this looks like in Java:

```java
class Car {
    String color;   // property
    int speed;      // property

    void drive() {  // behavior
        System.out.println("Car is driving!");
    }

    void brake() {  // behavior
        System.out.println("Car is braking!");
    }
}
```

---

### The Four Pillars of OOP

Java OOP is built on four fundamental concepts. Don't worry — each one gets its own dedicated lesson. Here's the overview:

| Pillar | One-Line Summary |
|---|---|
| **Encapsulation** | Hide the data, expose only what's needed |
| **Abstraction** | Show what an object does, hide *how* it does it |
| **Inheritance** | Child class reuses and extends the parent class |
| **Polymorphism** | One thing can take many forms |

Think of them as the four legs of a table — OOP needs all four to stand strong.

---

### OOP Makes Code:

- **Reusable** — write once, use many times
- **Organized** — related things live together
- **Maintainable** — easy to update without breaking everything
- **Scalable** — big teams can work on different classes independently

---

## Real-World Analogy

Imagine a **cookie cutter** and **cookies**.

- The **cookie cutter** = the **Class** (blueprint, the template)
- Each **cookie** = an **Object** (created from that template)

Every cookie has the same shape (defined by the cutter), but each one can have different toppings (its own data). You can make hundreds of cookies from one cutter — just like you can create hundreds of objects from one class!

---

## Code Example

```java
// Class = blueprint for a Car
class Car {
    // Properties (fields)
    String color;
    String brand;
    int speed;

    // Behavior (method)
    void drive() {
        System.out.println(brand + " (" + color + ") is driving at " + speed + " km/h");
    }

    void brake() {
        speed = 0;
        System.out.println(brand + " has stopped.");
    }
}

public class Main {
    public static void main(String[] args) {
        // Creating Object 1 from Car class
        Car car1 = new Car();
        car1.color = "Red";
        car1.brand = "Honda";
        car1.speed = 80;

        // Creating Object 2 from Car class
        Car car2 = new Car();
        car2.color = "Blue";
        car2.brand = "Toyota";
        car2.speed = 100;

        // Each object behaves independently
        car1.drive();
        car2.drive();
        car1.brake();
    }
}
```

### Output
```
Honda (Red) is driving at 80 km/h
Toyota (Blue) is driving at 100 km/h
Honda has stopped.
```

---

## Common Mistakes

- ❌ **Mistake**: Thinking a class and an object are the same thing → ✅ **Fix**: A class is the blueprint; an object is the actual thing built from it. `Car` is the class, `car1` is the object.
- ❌ **Mistake**: Writing all code in one giant `main` method (procedural thinking) → ✅ **Fix**: Break code into classes with meaningful fields and methods.
- ❌ **Mistake**: Making every variable global → ✅ **Fix**: Keep variables inside the class they belong to — that's the essence of OOP.

---

## Best Practices

- Name classes with a capital letter and use nouns (e.g., `Car`, `Student`, `BankAccount`)
- Each class should represent one real-world concept — keep it focused
- Think "what does this object *have*?" for fields, and "what can it *do*?" for methods

---

## Interview Questions

**Q: What is Object-Oriented Programming?**  
A: OOP is a programming paradigm where code is organized around objects — entities that combine data (fields) and behavior (methods). It models real-world concepts and is built on four pillars: Encapsulation, Abstraction, Inheritance, and Polymorphism.

**Q: What is the difference between a class and an object?**  
A: A class is a blueprint or template that defines properties and behaviors. An object is an actual instance created from that blueprint. For example, `Car` is a class, and `new Car()` creates an object of that class.

**Q: Why is OOP better than procedural programming?**  
A: OOP provides better code reusability through inheritance, better data protection through encapsulation, better maintainability since related code lives together, and makes it easier for large teams to work in parallel on different classes.

---

## Quick Revision

✔ OOP organizes code around objects that have data (fields) and behavior (methods)  
✔ A **class** is the blueprint; an **object** is the instance created from it  
✔ The 4 pillars are: Encapsulation, Abstraction, Inheritance, Polymorphism  
✔ OOP makes code more reusable, organized, and maintainable than procedural code  

---

## Related Topics

- Classes and Objects
- Encapsulation
- Inheritance
- Polymorphism

---

## Next Lesson

**02 - Classes and Objects**
