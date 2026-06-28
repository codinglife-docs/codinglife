---
id: constructors
title: Constructors
description: Learn what constructors are in Java, how to write default and parameterized constructors, and how constructor chaining works with this().
sidebar_position: 3
keywords:
  - Java
  - Constructor
  - Parameterized Constructor
  - Default Constructor
  - Constructor Chaining
---

# Constructors

> **Reading Time:** 9 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

A **constructor** is a special method that runs automatically when you create an object. Its job is to set up the object's initial state — think of it as the "setup" that happens the moment an object is born. Without constructors, you'd have to manually set every field after creating each object.

---

## What You'll Learn

- What a constructor is and how it's different from a regular method
- Default constructors vs parameterized constructors
- How to use constructor overloading
- Constructor chaining using `this()`

---

## Prerequisites

- Classes and Objects (Lesson 02)
- this Keyword basics (next lesson will cover in detail)

---

## Explanation

### What Is a Constructor?

A constructor is a special block of code that runs when you write `new ClassName()`. It has three unique rules:

1. Its **name must exactly match the class name**
2. It has **no return type** (not even `void`)
3. It is **called automatically** when an object is created — you can't call it manually later

```java
class Student {
    String name;

    // This is a constructor
    Student() {
        System.out.println("A new Student object was created!");
    }
}
```

The moment you write `new Student()`, Java runs the constructor body.

---

### Default Constructor

If you don't write any constructor, Java automatically provides a hidden one called the **default constructor**. It takes no parameters and does nothing — just allocates memory.

```java
class Student {
    String name;
    int age;
    // No constructor written — Java silently provides:
    // Student() { }
}

Student s = new Student(); // This works even without a constructor written
```

**Important:** The moment you write *any* constructor yourself, Java **stops** providing the automatic default constructor.

---

### Parameterized Constructor

A parameterized constructor takes arguments, letting you set field values right at the time of object creation.

```java
class Student {
    String name;
    int age;

    // Parameterized constructor
    Student(String name, int age) {
        this.name = name;  // 'this.name' = the field; 'name' = the parameter
        this.age = age;
    }
}

// Now you can set values at creation time
Student alice = new Student("Alice", 16);
```

Notice the `this.name = name` pattern — `this.name` refers to the class field, and `name` (without `this`) refers to the constructor parameter. The `this` keyword is covered in depth in the next lesson.

---

### Constructor Overloading

Just like methods, constructors can be **overloaded** — you can have multiple constructors with different parameter lists.

```java
class Student {
    String name;
    int age;
    String school;

    // Constructor 1: no args (default values)
    Student() {
        name = "Unknown";
        age = 0;
        school = "Unknown School";
    }

    // Constructor 2: name and age only
    Student(String name, int age) {
        this.name = name;
        this.age = age;
        this.school = "Unknown School";
    }

    // Constructor 3: all fields
    Student(String name, int age, String school) {
        this.name = name;
        this.age = age;
        this.school = school;
    }
}
```

Java chooses which constructor to call based on the arguments you pass:

```java
Student s1 = new Student();                        // calls Constructor 1
Student s2 = new Student("Alice", 16);             // calls Constructor 2
Student s3 = new Student("Bob", 17, "MIT High");   // calls Constructor 3
```

---

### Constructor Chaining with `this()`

When you have multiple constructors, it's common to have duplicate code. Constructor chaining solves this — you can call one constructor from another using `this()`.

```java
class Student {
    String name;
    int age;
    String school;

    // Constructor 3: the "master" constructor with all fields
    Student(String name, int age, String school) {
        this.name = name;
        this.age = age;
        this.school = school;
    }

    // Constructor 2: chains to Constructor 3 with a default school
    Student(String name, int age) {
        this(name, age, "Unknown School"); // calls Constructor 3
    }

    // Constructor 1: chains to Constructor 2 with defaults
    Student() {
        this("Unknown", 0); // calls Constructor 2
    }
}
```

**Critical Rule:** `this()` must be the **very first statement** in the constructor. You cannot put anything before it.

---

### Constructor vs Method — Key Differences

| Feature | Constructor | Method |
|---|---|---|
| Name | Same as class name | Any name |
| Return type | None (not even void) | Must have a return type |
| Called when? | Automatically on `new` | Manually by programmer |
| Purpose | Initialize the object | Define object behavior |
| Inherited? | No | Yes |

---

## Real-World Analogy

Think of a constructor like a **new car being assembled at the factory**.

When the car rolls off the assembly line (object is created), the factory automatically sets it up: installs the engine, paints it the chosen color, sets the odometer to 0. You don't have to manually go and do each step after — it all happens **automatically at the moment of creation**.

That's exactly what a constructor does — it automatically sets up your object the moment it's created.

---

## Code Example

```java
class Person {
    String name;
    int age;
    String city;

    // Constructor 1 — no args, uses defaults
    Person() {
        this("Unknown", 0, "Unknown City");
    }

    // Constructor 2 — name and age
    Person(String name, int age) {
        this(name, age, "Unknown City");
    }

    // Constructor 3 — all fields (master constructor)
    Person(String name, int age, String city) {
        this.name = name;
        this.age = age;
        this.city = city;
        System.out.println("Person created: " + name);
    }

    void display() {
        System.out.println("Name: " + name + ", Age: " + age + ", City: " + city);
    }
}

public class Main {
    public static void main(String[] args) {
        Person p1 = new Person();                          // no-args constructor
        Person p2 = new Person("Alice", 16);               // 2-arg constructor
        Person p3 = new Person("Bob", 25, "New York");     // 3-arg constructor

        System.out.println("---");
        p1.display();
        p2.display();
        p3.display();
    }
}
```

### Output
```
Person created: Unknown
Person created: Alice
Person created: Bob
---
Name: Unknown, Age: 0, City: Unknown City
Name: Alice, Age: 16, City: Unknown City
Name: Bob, Age: 25, City: New York
```

---

## Common Mistakes

- ❌ **Mistake**: Adding a return type to a constructor (`void Student() {}`) → ✅ **Fix**: Constructors have no return type at all — not even `void`. Adding `void` makes Java treat it as a regular method, not a constructor.
- ❌ **Mistake**: Forgetting that writing your own constructor removes the automatic default constructor → ✅ **Fix**: If you need a no-args constructor too, write one explicitly.
- ❌ **Mistake**: Putting code before `this()` in a chained constructor → ✅ **Fix**: `this()` must always be the **very first line** of the constructor.

---

## Best Practices

- Use a "master" parameterized constructor and chain other constructors to it using `this()` — avoids duplicate code
- Always provide a no-args constructor if others might create objects with default values
- Initialize all fields in the constructor — don't leave objects in a half-baked state
- Keep constructors simple — just set fields. Don't put complex logic inside constructors

---

## Interview Questions

**Q: What is a constructor in Java?**  
A: A constructor is a special method that has the same name as the class, has no return type, and is automatically called when an object is created with `new`. Its purpose is to initialize the object's fields.

**Q: What is the difference between a default constructor and a no-args constructor?**  
A: A default constructor is provided automatically by Java *only* when you write no constructors at all. A no-args constructor is one you explicitly write yourself with no parameters. Once you write any constructor, Java no longer provides the default one.

**Q: What is constructor chaining?**  
A: Constructor chaining is when one constructor calls another constructor using `this()`. This avoids duplicate initialization code. The `this()` call must be the first statement in the constructor.

---

## Quick Revision

✔ A constructor has the **same name as the class** and **no return type**  
✔ It runs **automatically** when you create an object with `new`  
✔ Java provides a **default constructor** only if you write zero constructors  
✔ You can **overload** constructors with different parameter lists  
✔ Use `this()` for **constructor chaining** — it must be the first statement  

---

## Related Topics

- this Keyword
- Method Overloading
- Encapsulation

---

## Next Lesson

**04 - The this Keyword**
