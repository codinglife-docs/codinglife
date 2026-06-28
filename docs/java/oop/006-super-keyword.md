---
id: super-keyword
title: The super Keyword
description: Learn how Java's super keyword calls parent constructors, accesses parent methods, and works with parent fields in inheritance hierarchies.
sidebar_position: 6
keywords:
  - Java
  - super keyword
  - Parent Constructor
  - Inheritance
  - Method Override
---

# The super Keyword

> **Reading Time:** 8 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

The `super` keyword in Java is used inside a child class to refer to its **parent class**. Just like `this` refers to the current object, `super` refers to the parent's version of things — calling the parent's constructor, invoking the parent's method, or accessing the parent's field. It's the bridge from child to parent.

---

## What You'll Learn

- How to call a parent class constructor using `super()`
- How to call a parent class method using `super.methodName()`
- How to access a parent class field using `super.fieldName`
- The rule: `super()` must be the first statement in a constructor

---

## Prerequisites

- Inheritance (Lesson 05)
- Constructors (Lesson 03)
- this Keyword (Lesson 04)

---

## Explanation

### What Is `super`?

When a child class inherits from a parent class, it gains all the parent's public and protected fields and methods. But sometimes the child needs to specifically say "I want to call the *parent's* version of something, not my own."

That's where `super` comes in. It's a reference to the **parent class** from inside the child class.

---

### Use Case 1: Calling the Parent Constructor — `super()`

When you create a child object, Java requires that the parent part of the object also gets initialized. You do this by calling the parent's constructor using `super(arguments)` inside the child's constructor.

```java
class Animal {
    String name;
    int age;

    Animal(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("Animal constructor called for: " + name);
    }
}

class Dog extends Animal {
    String breed;

    Dog(String name, int age, String breed) {
        super(name, age);  // MUST be first — calls Animal's constructor
        this.breed = breed;
        System.out.println("Dog constructor called. Breed: " + breed);
    }
}
```

**Critical Rule:** `super()` must be the **very first statement** in the child constructor. Java enforces this because the parent part of the object must be set up before the child part.

---

### Implicit super() Call

If the parent class has a **no-args constructor**, Java automatically adds `super()` as the first line of every child constructor (if you don't write it yourself).

```java
class Animal {
    Animal() {  // no-args constructor
        System.out.println("Animal created");
    }
}

class Dog extends Animal {
    Dog() {
        // Java invisibly adds: super(); here
        System.out.println("Dog created");
    }
}
```

But if the parent has ONLY parameterized constructors (no default), you MUST call `super(args)` yourself — otherwise Java won't know what arguments to pass.

---

### Use Case 2: Calling a Parent Method — `super.methodName()`

When a child **overrides** a parent method, it replaces the parent's behavior. But sometimes you want to use the parent's behavior AND add to it. You can call the parent's version using `super.methodName()`.

```java
class Animal {
    void displayInfo() {
        System.out.println("I am an animal.");
    }
}

class Dog extends Animal {
    String breed;

    @Override
    void displayInfo() {
        super.displayInfo();  // calls Animal's displayInfo() first
        System.out.println("I am a Dog. Breed: " + breed);
    }
}
```

Without `super.displayInfo()`, calling `dog.displayInfo()` would only run the Dog's version and the Animal's version would be skipped entirely.

---

### Use Case 3: Accessing a Parent Field — `super.fieldName`

If a child class has a field with the same name as a parent field, you can use `super.fieldName` to access the parent's version.

```java
class Animal {
    String type = "Animal";
}

class Dog extends Animal {
    String type = "Dog";  // hides parent's 'type'

    void printTypes() {
        System.out.println("Child type: " + type);        // Dog
        System.out.println("Parent type: " + super.type); // Animal
    }
}
```

Note: Hiding fields (same name in parent and child) is generally a bad practice. It's much more common to use `super.method()` than `super.field`.

---

### `super` vs `this` — Side by Side

| Feature | `this` | `super` |
|---|---|---|
| Refers to | Current object | Parent class |
| Call constructor | `this()` — same class | `super()` — parent class |
| Access method | `this.method()` | `super.method()` — parent's version |
| Access field | `this.field` | `super.field` — parent's field |
| First statement rule | Only `this()` in constructors | Only `super()` in constructors |
| Can be used together? | Only one of `this()` or `super()` can be the first statement |

---

## Real-World Analogy

Think of `super` like calling your parent on the phone.

You're a Doctor (child). Your parent is a Scientist (parent). When you write a research paper (override a method), you still reference your parent's earlier work (call `super.method()`). And before you started your medical degree (child constructor), you needed your parent to fill out the enrollment paperwork (parent constructor called via `super()`).

`super` is how you say: "Hey parent — I need something from you."

---

## Code Example

```java
class Vehicle {
    String brand;
    int year;
    double price;

    Vehicle(String brand, int year, double price) {
        this.brand = brand;
        this.year = year;
        this.price = price;
        System.out.println("Vehicle constructor: " + brand);
    }

    void displayInfo() {
        System.out.println("Brand: " + brand);
        System.out.println("Year: " + year);
        System.out.println("Price: $" + price);
    }

    void start() {
        System.out.println(brand + " is starting...");
    }
}

class ElectricCar extends Vehicle {
    int batteryCapacity; // in kWh
    int range;           // in km

    ElectricCar(String brand, int year, double price, int batteryCapacity, int range) {
        super(brand, year, price);  // calls Vehicle's constructor
        this.batteryCapacity = batteryCapacity;
        this.range = range;
        System.out.println("ElectricCar constructor: " + brand);
    }

    @Override
    void displayInfo() {
        super.displayInfo();  // calls Vehicle's displayInfo first
        System.out.println("Battery: " + batteryCapacity + " kWh");
        System.out.println("Range: " + range + " km");
    }

    @Override
    void start() {
        super.start();  // calls Vehicle's start
        System.out.println("(Silent electric motor engaged)");
    }
}

public class Main {
    public static void main(String[] args) {
        ElectricCar tesla = new ElectricCar("Tesla Model 3", 2024, 40000.0, 75, 570);

        System.out.println("\n--- Display Info ---");
        tesla.displayInfo();

        System.out.println("\n--- Start ---");
        tesla.start();
    }
}
```

### Output
```
Vehicle constructor: Tesla Model 3
ElectricCar constructor: Tesla Model 3

--- Display Info ---
Brand: Tesla Model 3
Year: 2024
Price: $40000.0
Battery: 75 kWh
Range: 570 km

--- Start ---
Tesla Model 3 is starting...
(Silent electric motor engaged)
```

---

## Common Mistakes

- ❌ **Mistake**: Not calling `super()` when parent has only parameterized constructors → ✅ **Fix**: Always explicitly call `super(args)` as the first line in the child constructor when the parent has no default constructor.
- ❌ **Mistake**: Trying to put code before `super()` in a constructor → ✅ **Fix**: `super()` must be the absolute first statement. No code can come before it.
- ❌ **Mistake**: Using `super` in a static method → ✅ **Fix**: `super` refers to the parent of an *object*, so it cannot be used in a static context. Remove `static`.

---

## Best Practices

- Always call `super()` explicitly in child constructors — don't rely on implicit calls, it's clearer
- Use `super.method()` when you want to extend (not completely replace) the parent's behavior
- Avoid hiding parent fields with same-named child fields — it causes confusion
- Chain constructors using `super()` to keep initialization DRY (Don't Repeat Yourself)

---

## Interview Questions

**Q: What is the `super` keyword in Java?**  
A: `super` is a reference to the parent class of the current object. It's used to call the parent's constructor (`super()`), invoke the parent's method (`super.methodName()`), or access the parent's field (`super.fieldName`).

**Q: When must `super()` be the first statement?**  
A: `super()` (calling the parent constructor) must always be the first statement in a child class constructor. This ensures that the parent portion of the object is fully initialized before the child adds its own initialization.

**Q: What happens if you don't write `super()` in a child constructor?**  
A: If the parent has a no-args constructor, Java automatically inserts `super()` as the first line. If the parent has ONLY parameterized constructors (no no-args), not calling `super(args)` causes a compile error because Java doesn't know which parent constructor to call.

---

## Quick Revision

✔ `super` refers to the **parent class** from inside a child class  
✔ `super()` calls the parent's constructor — must be the **first statement**  
✔ `super.method()` calls the parent's version of an overridden method  
✔ Java auto-inserts `super()` only if the parent has a no-args constructor  
✔ Cannot use `super` in static methods  

---

## Related Topics

- Inheritance
- Method Overriding
- this Keyword
- Polymorphism

---

## Next Lesson

**07 - Method Overriding**
