---
id: method-overriding
title: Method Overriding
description: Master runtime polymorphism in Java by learning how child classes override parent methods using the @Override annotation and the rules that apply.
sidebar_position: 7
keywords:
  - Java
  - Method Overriding
  - Runtime Polymorphism
  - Override annotation
  - Dynamic Dispatch
---

# Method Overriding

> **Reading Time:** 9 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

**Method overriding** happens when a child class provides its own specific version of a method that already exists in the parent class. The child says: "I know you (parent) have a `speak()` method, but I'm going to do it MY way." This is the heart of **runtime polymorphism** — Java decides which version to call based on the actual object type, not the variable type.

---

## What You'll Learn

- What method overriding is and why it's powerful
- The rules that a valid override must follow
- The `@Override` annotation and why you should use it
- What covariant return type means
- Which methods cannot be overridden

---

## Prerequisites

- Inheritance (Lesson 05)
- super Keyword (Lesson 06)

---

## Explanation

### What Is Method Overriding?

When a child class defines a method with the **exact same name, exact same parameters**, and a **compatible return type** as a method in its parent class, it **overrides** that method.

```java
class Animal {
    void speak() {
        System.out.println("Some animal makes a sound.");
    }
}

class Dog extends Animal {
    @Override
    void speak() {  // OVERRIDES Animal's speak()
        System.out.println("Dog says: Woof!");
    }
}

class Cat extends Animal {
    @Override
    void speak() {  // OVERRIDES Animal's speak()
        System.out.println("Cat says: Meow!");
    }
}
```

When you call `speak()` on a Dog, Java runs Dog's version. When you call it on a Cat, Java runs Cat's version. The parent's generic version is replaced by the child's specific one.

---

### The Rules for Valid Overriding

For an override to be valid, ALL of these must be true:

| Rule | Explanation |
|---|---|
| **Same method name** | Must be exactly the same name |
| **Same parameter list** | Same number, types, and order of parameters |
| **Same or covariant return type** | Same return type, OR a subtype (child type) |
| **Same or less restrictive access** | Can make it more public, never more private |
| **Cannot throw broader exceptions** | Can throw fewer/narrower checked exceptions |

---

### The `@Override` Annotation

`@Override` is an annotation you place above an overriding method. It tells the Java compiler: "I intend to override a parent method here — please verify this is correct."

```java
@Override
void speak() {
    System.out.println("Dog says: Woof!");
}
```

**Why use it?**
- If you accidentally misspell the method name or change parameters, the compiler throws an error
- Without it, Java would silently treat it as a new method, not an override!

```java
class Dog extends Animal {
    // TYPO! This is NOT overriding — it's a new method called 'speek'
    void speek() {  // Without @Override, no error!
        System.out.println("Dog says: Woof!");
    }
}
```

Always use `@Override` — it's free protection.

---

### Runtime Polymorphism (Dynamic Method Dispatch)

This is where the magic happens. When you have a **parent type reference** pointing to a **child object**, Java decides which method to call at **runtime** (not compile time), based on the actual object:

```java
Animal a = new Dog();  // Parent reference, Child object
a.speak();             // Which speak() is called? → Dog's! (decided at runtime)
```

This is called **dynamic method dispatch**. Java looks at the actual object type (`Dog`), not the reference type (`Animal`), to pick the method.

```java
Animal[] animals = {
    new Dog(),
    new Cat(),
    new Animal()
};

for (Animal a : animals) {
    a.speak();  // Each calls its OWN version — resolved at runtime
}
```

Output:
```
Dog says: Woof!
Cat says: Meow!
Some animal makes a sound.
```

---

### Covariant Return Type

Since Java 5, an overriding method can return a **subtype** of the parent's return type. This is called covariant return type.

```java
class Animal {
    Animal create() {
        return new Animal();
    }
}

class Dog extends Animal {
    @Override
    Dog create() {  // Returns Dog (subtype of Animal) — valid override!
        return new Dog();
    }
}
```

---

### Methods That CANNOT Be Overridden

| Modifier | Reason Cannot Override |
|---|---|
| `private` | Not visible to child class at all |
| `static` | Belongs to the class, not objects; only **hidden**, not overridden |
| `final` | Explicitly marked "do not override" |

```java
class Parent {
    private void secret() { ... }       // can't override — child can't see it
    static void classMethod() { ... }   // can't override — only hide
    final void lockedMethod() { ... }   // can't override — compiler error
}
```

---

## Real-World Analogy

Think of a **restaurant franchise**.

The parent company (Animal) has a standard recipe for "Burger" that all restaurants should have. But each specific location (Dog, Cat) can override that standard recipe with their local specialty version. When a customer walks into a specific location and orders a "Burger," they get *that location's* version — not the generic headquarters version.

That's method overriding: the same "menu item" name, but each subclass serves its own version.

---

## Code Example

```java
// Parent class
class Shape {
    String color;

    Shape(String color) {
        this.color = color;
    }

    // This will be overridden
    double area() {
        return 0.0;
    }

    void displayInfo() {
        System.out.println("Color: " + color + ", Area: " + area());
    }
}

// Circle overrides area()
class Circle extends Shape {
    double radius;

    Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    double area() {
        return Math.PI * radius * radius;
    }
}

// Rectangle overrides area()
class Rectangle extends Shape {
    double width, height;

    Rectangle(String color, double width, double height) {
        super(color);
        this.width = width;
        this.height = height;
    }

    @Override
    double area() {
        return width * height;
    }
}

// Triangle overrides area()
class Triangle extends Shape {
    double base, height;

    Triangle(String color, double base, double height) {
        super(color);
        this.base = base;
        this.height = height;
    }

    @Override
    double area() {
        return 0.5 * base * height;
    }
}

public class Main {
    public static void main(String[] args) {
        // Parent references, child objects — runtime polymorphism!
        Shape[] shapes = {
            new Circle("Red", 5),
            new Rectangle("Blue", 4, 6),
            new Triangle("Green", 3, 8)
        };

        for (Shape s : shapes) {
            s.displayInfo();  // Each calls ITS OWN area() — resolved at runtime
        }
    }
}
```

### Output
```
Color: Red, Area: 78.53981633974483
Color: Blue, Area: 24.0
Color: Green, Area: 12.0
```

---

## Common Mistakes

- ❌ **Mistake**: Not using `@Override` and accidentally creating a new method with a typo → ✅ **Fix**: Always add `@Override` — the compiler will catch naming mistakes.
- ❌ **Mistake**: Trying to override a `private` or `final` method → ✅ **Fix**: `private` methods are invisible to child classes; `final` methods are locked. Neither can be overridden.
- ❌ **Mistake**: Confusing overriding with overloading → ✅ **Fix**: Overriding = same method signature in child class. Overloading = same method name with different parameters in the SAME class.

---

## Best Practices

- Always use `@Override` when overriding — treat it as mandatory, not optional
- Call `super.method()` when you want to extend (not replace) the parent's behavior
- Don't override just to do nothing — if a method makes no sense in the child, reconsider the design
- Keep overriding methods focused — they should do what their name says

---

## Interview Questions

**Q: What is method overriding in Java?**  
A: Method overriding is when a child class provides its own implementation for a method that is already defined in its parent class. The overriding method must have the same name, same parameter list, and a compatible return type. It enables runtime polymorphism.

**Q: What is dynamic method dispatch?**  
A: Dynamic method dispatch (runtime polymorphism) is when Java determines which overridden method to call at runtime based on the actual object type, not the reference type. If `Animal a = new Dog()` and you call `a.speak()`, Java calls Dog's `speak()` because the actual object is a Dog.

**Q: Can you override a static method in Java?**  
A: No. Static methods belong to the class, not to objects. A child class can define a static method with the same name (called method hiding), but this is not true overriding — dynamic dispatch does not apply to static methods.

---

## Quick Revision

✔ Override = child provides its own version of a parent method  
✔ Rules: same name, same parameters, same or covariant return type  
✔ Use `@Override` — it's your safety net against typos  
✔ Runtime polymorphism: Java picks the method based on **actual object type**  
✔ Cannot override `private`, `static`, or `final` methods  

---

## Related Topics

- Method Overloading
- Polymorphism
- Abstraction
- Interfaces

---

## Next Lesson

**08 - Method Overloading**
