---
id: inheritance
title: Inheritance
description: Learn how Java inheritance lets child classes reuse and extend parent class code using the extends keyword, with Animal to Dog examples.
sidebar_position: 5
keywords:
  - Java
  - Inheritance
  - extends
  - Parent Class
  - Child Class
  - IS-A relationship
---

# Inheritance

> **Reading Time:** 10 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

**Inheritance** is one of the four pillars of OOP. It lets a new class (child) automatically get all the fields and methods of an existing class (parent), and then add or change things on top. It's the ultimate code reuse mechanism — write something once in the parent, and all children get it for free.

---

## What You'll Learn

- What inheritance is and why it matters
- How to use the `extends` keyword
- What the IS-A relationship means
- What gets inherited and what doesn't
- A multi-level example: Animal → Dog → GoldenRetriever

---

## Prerequisites

- Classes and Objects (Lesson 02)
- Constructors (Lesson 03)
- this Keyword (Lesson 04)

---

## Explanation

### What Is Inheritance?

Imagine you're designing a game with many types of characters: Warriors, Mages, Archers. All of them have a name, health points, and can move. Instead of writing `name`, `hp`, and `move()` three times in three separate classes, you write it once in a `Character` class and let the others **inherit** from it.

Inheritance = **"I already have everything my parent has, plus my own stuff."**

In Java, inheritance is implemented with the `extends` keyword.

---

### The `extends` Keyword

```java
class Animal {          // Parent class (superclass)
    String name;
    int age;

    void eat() {
        System.out.println(name + " is eating.");
    }

    void sleep() {
        System.out.println(name + " is sleeping.");
    }
}

class Dog extends Animal {  // Child class (subclass)
    String breed;

    void bark() {
        System.out.println(name + " says: Woof!");  // 'name' inherited from Animal!
    }
}
```

`Dog extends Animal` means: Dog has everything Animal has, PLUS its own `breed` field and `bark()` method.

---

### The IS-A Relationship

Inheritance models an **IS-A** relationship:
- A Dog IS-A Animal ✅
- A GoldenRetriever IS-A Dog ✅
- A Car IS-A Animal ❌ (doesn't make sense — don't extend it!)

The rule: only use inheritance when the child truly "IS A" more specific version of the parent.

---

### What Gets Inherited?

| Gets Inherited | Does NOT Get Inherited |
|---|---|
| Public fields | Private fields (but accessible via public getters) |
| Public methods | Private methods |
| Protected fields | Constructors |
| Protected methods | Static members (inherited differently) |

**Constructors are NOT inherited.** The child class must define its own constructors and call the parent's constructor using `super()`.

---

### Single Inheritance in Java

Java supports **single inheritance** — a class can extend only ONE parent class. This avoids the "diamond problem" seen in languages like C++.

```java
class A extends B, C { } // COMPILE ERROR — not allowed in Java!
class A extends B { }    // OK — single inheritance only
```

However, a class can implement multiple **interfaces** (covered in Lesson 10).

---

### Multi-Level Inheritance

A child can itself become a parent. This creates a chain:

```java
class Animal { ... }           // grandparent
class Dog extends Animal { ... } // parent
class GoldenRetriever extends Dog { ... } // child
```

A `GoldenRetriever` object has ALL fields and methods from all three classes!

---

### The Object Class

In Java, every class automatically extends `Object` (from `java.lang`) if no parent is explicitly specified. So `Object` is the root of all Java classes. It provides methods like `toString()`, `equals()`, and `hashCode()`.

---

## Real-World Analogy

Think of **family inheritance**.

Your grandfather established a business. Your parent inherited the business (and all its assets). You inherit from your parent — getting the business, the assets, AND anything new your parent added. Each generation adds their own thing on top of what they inherited.

In Java, that's exactly how class inheritance works — each child gets everything above it in the family tree, and adds its own specialization.

---

## Code Example

```java
// Level 1: Animal (grandparent)
class Animal {
    String name;
    int age;

    Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    void eat() {
        System.out.println(name + " is eating.");
    }

    void breathe() {
        System.out.println(name + " is breathing.");
    }

    void displayInfo() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

// Level 2: Dog extends Animal (parent)
class Dog extends Animal {
    String breed;

    Dog(String name, int age, String breed) {
        super(name, age);  // calls Animal's constructor
        this.breed = breed;
    }

    void bark() {
        System.out.println(name + " says: Woof! Woof!");
    }

    void fetch() {
        System.out.println(name + " fetched the ball!");
    }
}

// Level 3: GoldenRetriever extends Dog (child)
class GoldenRetriever extends Dog {
    String furColor;

    GoldenRetriever(String name, int age, String furColor) {
        super(name, age, "Golden Retriever");  // calls Dog's constructor
        this.furColor = furColor;
    }

    void swim() {
        System.out.println(name + " is swimming — Golden Retrievers love water!");
    }

    @Override
    void displayInfo() {
        super.displayInfo();  // calls Animal's displayInfo
        System.out.println("Breed: " + breed + ", Fur: " + furColor);
    }
}

public class Main {
    public static void main(String[] args) {
        GoldenRetriever buddy = new GoldenRetriever("Buddy", 3, "Golden");

        // Inherited from Animal
        buddy.eat();
        buddy.breathe();

        // Inherited from Dog
        buddy.bark();
        buddy.fetch();

        // Own method
        buddy.swim();

        // Overridden displayInfo
        buddy.displayInfo();
    }
}
```

### Output
```
Buddy is eating.
Buddy is breathing.
Buddy says: Woof! Woof!
Buddy fetched the ball!
Buddy is swimming — Golden Retrievers love water!
Name: Buddy, Age: 3
Breed: Golden Retriever, Fur: Golden
```

---

## Common Mistakes

- ❌ **Mistake**: Extending a class just to reuse code when there's no real IS-A relationship → ✅ **Fix**: Only extend when the child truly IS-A type of the parent. Use composition (has-a) otherwise.
- ❌ **Mistake**: Forgetting to call `super(...)` in the child constructor → ✅ **Fix**: If the parent has a parameterized constructor, the child MUST call `super(...)` as the first statement.
- ❌ **Mistake**: Trying to extend multiple classes → ✅ **Fix**: Java only allows single inheritance. Use interfaces for multiple type contracts.

---

## Best Practices

- Use inheritance only for true IS-A relationships (a `Dog` IS-A `Animal`)
- Prefer shallow inheritance hierarchies — deep chains become hard to follow
- If you find yourself duplicating code across unrelated classes, that's when inheritance (or composition) helps
- Use `@Override` annotation when overriding methods — it helps the compiler catch errors

---

## Interview Questions

**Q: What is inheritance in Java?**  
A: Inheritance is an OOP mechanism where a child class (subclass) acquires the fields and methods of a parent class (superclass) using the `extends` keyword. It enables code reuse and represents an IS-A relationship.

**Q: Does Java support multiple inheritance?**  
A: Java does NOT support multiple inheritance through classes (a class can only extend one class). This avoids the "diamond problem." However, Java supports multiple inheritance through interfaces — a class can implement multiple interfaces.

**Q: What is the difference between IS-A and HAS-A relationships?**  
A: IS-A (inheritance): Dog IS-A Animal — `class Dog extends Animal`. HAS-A (composition): Car HAS-A Engine — `class Car { Engine engine; }`. IS-A is implemented through inheritance; HAS-A is implemented by making one class a field of another.

---

## Quick Revision

✔ Inheritance: child class gets all public/protected fields and methods from parent  
✔ Use `extends` keyword — only one class allowed (single inheritance)  
✔ Models IS-A relationship: Dog IS-A Animal  
✔ Constructors are NOT inherited — use `super()` to call parent constructor  
✔ Multi-level inheritance is allowed: `A → B → C`  
✔ All Java classes implicitly extend `Object`  

---

## Related Topics

- super Keyword
- Method Overriding
- Polymorphism
- Abstraction

---

## Next Lesson

**06 - The super Keyword**
