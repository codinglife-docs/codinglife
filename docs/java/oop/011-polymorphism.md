---
id: polymorphism
title: Polymorphism
description: Master Java polymorphism — compile-time overloading vs runtime overriding, upcasting, dynamic method dispatch, and real shape examples.
sidebar_position: 11
keywords:
  - Java
  - Polymorphism
  - Runtime Polymorphism
  - Compile-time Polymorphism
  - Upcasting
  - Dynamic Dispatch
---

# Polymorphism

> **Reading Time:** 10 Minutes  
> **Difficulty:** Intermediate

---

## Topic Summary

**Polymorphism** means "one thing, many forms." It's the ability of a single reference type to represent different types of objects, and for a single method call to behave differently depending on which object actually runs it. It's one of the most powerful features of OOP, allowing you to write flexible, extensible code without rewriting it for every new type.

---

## What You'll Learn

- The two types of polymorphism: compile-time and runtime
- How upcasting works
- Dynamic method dispatch explained step by step
- A complete shapes example showing polymorphism in action

---

## Prerequisites

- Inheritance (Lesson 05)
- Method Overriding (Lesson 07)
- Method Overloading (Lesson 08)
- Abstraction (Lesson 09)

---

## Explanation

### What Is Polymorphism?

The word comes from Greek: *poly* = many, *morph* = form. Polymorphism in Java means:

1. **One method name** can behave differently in different classes (overriding)
2. **One reference variable** can point to objects of different types (upcasting)
3. **One code block** can work on many different object types without knowing the exact type

---

### Type 1: Compile-Time Polymorphism (Static Binding)

This is **method overloading** — covered in Lesson 08. The compiler decides which method to call based on the number and types of arguments.

```java
class Printer {
    void print(int x) { System.out.println("Int: " + x); }
    void print(String s) { System.out.println("String: " + s); }
    void print(double d) { System.out.println("Double: " + d); }
}

Printer p = new Printer();
p.print(5);       // Compiler picks print(int)
p.print("Hello"); // Compiler picks print(String)
p.print(3.14);    // Compiler picks print(double)
```

It's called "compile-time" because the decision is made when the code is compiled.

---

### Type 2: Runtime Polymorphism (Dynamic Binding)

This is **method overriding** with **upcasting**. Java decides which method to call at runtime based on the actual object, not the reference type.

```java
class Animal {
    void speak() { System.out.println("..."); }
}

class Dog extends Animal {
    @Override
    void speak() { System.out.println("Woof!"); }
}

class Cat extends Animal {
    @Override
    void speak() { System.out.println("Meow!"); }
}

// UPCASTING — parent reference holds child object
Animal a1 = new Dog();  // Animal reference → Dog object
Animal a2 = new Cat();  // Animal reference → Cat object

a1.speak();  // Calls Dog's speak() — decided at RUNTIME
a2.speak();  // Calls Cat's speak() — decided at RUNTIME
```

The reference type is `Animal`, but the actual behavior depends on the real object type (`Dog` or `Cat`).

---

### Upcasting

**Upcasting** is when you assign a child object to a parent reference. It's safe and automatic — no casting syntax needed.

```java
Dog dog = new Dog();   // regular
Animal a = dog;        // UPCASTING — implicit, always safe
Animal b = new Dog();  // UPCASTING — direct, also fine
```

When you upcast, through the reference you can only access methods defined in the parent type. But if those methods are overridden, the child's version runs.

```java
Animal a = new Dog();
a.speak();  // Can call speak() — exists in Animal
// a.bark(); // COMPILE ERROR — bark() is not in Animal reference type
```

---

### Dynamic Method Dispatch

Dynamic method dispatch is the mechanism Java uses for runtime polymorphism. Here's how it works step by step:

1. You have an `Animal` reference that points to a `Dog` object
2. You call `a.speak()`
3. **At compile time:** Java checks if `speak()` exists in `Animal` — yes, so no error
4. **At runtime:** Java looks at the actual object (`Dog`) and calls Dog's `speak()`

This means the decision is made dynamically at runtime — that's why it's called "dynamic."

---

### Polymorphism with Arrays/Lists

The real power of polymorphism shows when you process many different objects through a common type:

```java
Animal[] animals = {
    new Dog(),
    new Cat(),
    new Animal(),
    new Dog()
};

// One loop handles ALL types — no if-else needed!
for (Animal a : animals) {
    a.speak();  // Each calls its own version
}
```

Without polymorphism, you'd need `if (a instanceof Dog) ... else if (a instanceof Cat) ...` which is messy and breaks every time you add a new type.

---

### Polymorphism with Interfaces

Interfaces enable the most flexible polymorphism:

```java
interface Shape {
    double area();
}

class Circle implements Shape { ... }
class Rectangle implements Shape { ... }
class Triangle implements Shape { ... }

// Same reference type — different objects!
Shape[] shapes = { new Circle(5), new Rectangle(4, 6), new Triangle(3, 4, 5) };

double totalArea = 0;
for (Shape s : shapes) {
    totalArea += s.area();  // Polymorphic call!
}
```

Adding a new shape? Just make it implement `Shape`. The loop doesn't change at all.

---

## Real-World Analogy

Think of a **TV remote control**.

The remote has a "Power" button. When you press it:
- Aimed at a Samsung TV → Samsung turns on
- Aimed at a Sony TV → Sony turns on
- Aimed at an LG TV → LG turns on

The button is the same (same method call). The behavior is different depending on what you're pointing at (the actual object). That's runtime polymorphism — one action, many different results based on the actual target.

---

## Code Example

```java
// Abstract base — the common type
abstract class Shape {
    private String name;
    private String color;

    Shape(String name, String color) {
        this.name = name;
        this.color = color;
    }

    abstract double area();
    abstract double perimeter();

    String getName() { return name; }
    String getColor() { return color; }
}

// Concrete shapes
class Circle extends Shape {
    private double radius;
    Circle(String color, double radius) {
        super("Circle", color);
        this.radius = radius;
    }
    @Override public double area() { return Math.PI * radius * radius; }
    @Override public double perimeter() { return 2 * Math.PI * radius; }
}

class Rectangle extends Shape {
    private double w, h;
    Rectangle(String color, double w, double h) {
        super("Rectangle", color);
        this.w = w; this.h = h;
    }
    @Override public double area() { return w * h; }
    @Override public double perimeter() { return 2 * (w + h); }
}

class Square extends Shape {
    private double side;
    Square(String color, double side) {
        super("Square", color);
        this.side = side;
    }
    @Override public double area() { return side * side; }
    @Override public double perimeter() { return 4 * side; }
}

class Triangle extends Shape {
    private double a, b, c;
    Triangle(String color, double a, double b, double c) {
        super("Triangle", color);
        this.a = a; this.b = b; this.c = c;
    }
    @Override public double area() {
        double s = (a + b + c) / 2;
        return Math.sqrt(s * (s-a) * (s-b) * (s-c));
    }
    @Override public double perimeter() { return a + b + c; }
}

public class Main {
    // This method works for ANY shape — polymorphism!
    static void printShapeInfo(Shape s) {
        System.out.printf("%-10s | %-6s | Area: %7.2f | Perimeter: %7.2f%n",
            s.getName(), s.getColor(), s.area(), s.perimeter());
    }

    static double totalArea(Shape[] shapes) {
        double total = 0;
        for (Shape s : shapes) {
            total += s.area();  // Polymorphic call!
        }
        return total;
    }

    public static void main(String[] args) {
        // All stored as Shape — runtime polymorphism in action
        Shape[] shapes = {
            new Circle("Red", 5),
            new Rectangle("Blue", 4, 8),
            new Square("Green", 6),
            new Triangle("Yellow", 3, 4, 5)
        };

        System.out.println("Shape      | Color  | Area        | Perimeter");
        System.out.println("-----------|--------|-------------|----------");
        for (Shape s : shapes) {
            printShapeInfo(s);  // Same method call, different behavior each time
        }

        System.out.printf("%nTotal Area of all shapes: %.2f%n", totalArea(shapes));
    }
}
```

### Output
```
Shape      | Color  | Area        | Perimeter
-----------|--------|-------------|----------
Circle     | Red    | Area:  78.54 | Perimeter:  31.42
Rectangle  | Blue   | Area:  32.00 | Perimeter:  24.00
Square     | Green  | Area:  36.00 | Perimeter:  24.00
Triangle   | Yellow | Area:   6.00 | Perimeter:  12.00

Total Area of all shapes: 152.54
```

---

## Common Mistakes

- ❌ **Mistake**: Trying to call a child-specific method through a parent reference (`Animal a = new Dog(); a.bark()`) → ✅ **Fix**: Cast the reference first: `((Dog)a).bark()` — but only if you're sure the object is actually a Dog. Use `instanceof` to check.
- ❌ **Mistake**: Thinking compile-time polymorphism and runtime polymorphism are the same → ✅ **Fix**: Compile-time (overloading) is resolved by the compiler; runtime (overriding) is resolved by the JVM while the program runs.
- ❌ **Mistake**: Overusing `instanceof` to check object types → ✅ **Fix**: If you find yourself writing lots of `instanceof` checks, it's a sign polymorphism should be doing that work for you. Refactor to use overriding.

---

## Best Practices

- Design with polymorphism in mind — program to interfaces or abstract types, not concrete types
- Let polymorphism eliminate `if-else` chains based on object type
- Use upcasting liberally to write general-purpose code
- Only downcast (parent → child) when necessary, and always check with `instanceof` first

---

## Interview Questions

**Q: What is polymorphism in Java?**  
A: Polymorphism means "one thing, many forms." In Java, it refers to the ability of a reference variable to refer to objects of different types and have methods behave differently based on the actual object. It comes in two forms: compile-time polymorphism (method overloading, resolved at compile time) and runtime polymorphism (method overriding, resolved at runtime via dynamic method dispatch).

**Q: What is dynamic method dispatch?**  
A: Dynamic method dispatch is the mechanism behind runtime polymorphism. When you call an overridden method through a parent reference, Java doesn't decide which version to call at compile time. Instead, at runtime, it looks at the actual object type and calls that class's version of the method.

**Q: What is upcasting?**  
A: Upcasting is assigning a child class object to a parent class reference (`Animal a = new Dog()`). It's implicit and always safe because a Dog IS-A Animal. Through the upcast reference, only the parent type's methods are accessible (at compile time), but overridden methods resolve to the child's version at runtime.

---

## Quick Revision

✔ Polymorphism = one thing, many forms  
✔ Compile-time (overloading): method picked at compile time based on arguments  
✔ Runtime (overriding): method picked at runtime based on actual object type  
✔ Upcasting: parent reference = child object — implicit and safe  
✔ Dynamic dispatch: JVM calls the actual object's overridden method at runtime  
✔ Enables writing code that works with many types without knowing exact type  

---

## Related Topics

- Method Overriding
- Method Overloading
- Abstraction
- Interfaces

---

## Next Lesson

**12 - Encapsulation**
