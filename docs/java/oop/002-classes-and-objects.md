---
id: classes-and-objects
title: Classes and Objects
description: Understand how classes act as blueprints and objects as real instances, with syntax for creating and using them in Java.
sidebar_position: 2
keywords:
  - Java
  - Classes
  - Objects
  - new keyword
  - Instance
---

# Classes and Objects

> **Reading Time:** 9 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

A **class** is a blueprint that describes what something looks like and what it can do. An **object** is an actual thing built from that blueprint. In Java, you define classes and then create as many objects as you want from them — each object gets its own copy of the data.

---

## What You'll Learn

- How to write a class in Java with fields and methods
- How to create objects using the `new` keyword
- How to access fields and methods on an object
- How multiple objects from the same class work independently

---

## Prerequisites

- Introduction to OOP (Lesson 01)
- Basic Java syntax (variables, methods)

---

## Explanation

### Anatomy of a Class

A class in Java has three main parts:

1. **Fields (instance variables)** — the data the object stores
2. **Constructors** — special methods to create the object (next lesson)
3. **Methods** — the behaviors the object can perform

Here is the general syntax:

```
class ClassName {
    // 1. Fields
    dataType fieldName;

    // 2. Methods
    returnType methodName() {
        // body
    }
}
```

---

### Fields (Instance Variables)

Fields are variables declared inside a class but **outside** any method. Every object gets its own private copy of these fields.

```java
class Student {
    String name;    // field
    int age;        // field
    double gpa;     // field
}
```

These are called **instance variables** because each *instance* (object) of the class holds its own values for them.

---

### Methods

Methods define what the object can do. They live inside the class body.

```java
class Student {
    String name;
    int age;
    double gpa;

    // method — behavior of a Student object
    void introduce() {
        System.out.println("Hi, I'm " + name + ", age " + age);
    }

    void study() {
        System.out.println(name + " is studying hard!");
    }
}
```

---

### Creating Objects with `new`

To create an object from a class, use the `new` keyword:

```java
Student s1 = new Student();
```

Breaking this down:
- `Student` — the **type** (which class to use as blueprint)
- `s1` — the **variable name** (reference to the object)
- `new Student()` — actually creates the object in memory

---

### Accessing Fields and Methods

Use the **dot (`.`) operator** to access an object's fields and methods:

```java
// Setting fields
s1.name = "Alice";
s1.age = 16;
s1.gpa = 3.9;

// Calling methods
s1.introduce();
s1.study();
```

---

### Multiple Objects from the Same Class

You can create as many objects as you want. Each object is **independent** — changing one doesn't affect another.

```java
Student s1 = new Student();
s1.name = "Alice";
s1.age = 16;

Student s2 = new Student();
s2.name = "Bob";
s2.age = 17;

// Alice and Bob are completely separate objects
s1.introduce(); // Hi, I'm Alice, age 16
s2.introduce(); // Hi, I'm Bob, age 17
```

Think of it like this: you have one `Student` mold (class), but you can stamp out Alice, Bob, Charlie — as many individual students (objects) as you need.

---

### Object Reference vs Object

An important concept: the variable `s1` doesn't *hold* the object — it holds a **reference** (like a pointer/address) to where the object lives in memory.

```java
Student s1 = new Student();
Student s2 = s1;  // s2 now points to the SAME object as s1!

s1.name = "Alice";
System.out.println(s2.name); // prints "Alice" — same object!
```

This is different from primitive types like `int`, which store the actual value.

---

### The `null` Reference

Before you assign an object, a reference variable holds `null` — meaning it points to nothing.

```java
Student s1 = null; // s1 points to nothing
s1.introduce();    // NullPointerException! Can't call method on null
```

Always make sure your reference points to an actual object before using it.

---

## Real-World Analogy

Think of a **Student Enrollment Form** at a school.

- The **blank form template** = the **Class** (it defines what information goes where: name, age, grade)
- Each **filled-in form** for a real student = an **Object** (Alice's form, Bob's form)
- Each form has its own information, but they all follow the same structure

The school can have thousands of filled forms (objects), all based on the same blank template (class).

---

## Code Example

```java
// Defining the Student class (blueprint)
class Student {
    // Fields (instance variables)
    String name;
    int age;
    String subject;
    double gpa;

    // Method: introduce the student
    void introduce() {
        System.out.println("Hello! I'm " + name + ", " + age + " years old.");
        System.out.println("I study " + subject + " and my GPA is " + gpa);
    }

    // Method: check if student passed
    void checkResult() {
        if (gpa >= 2.0) {
            System.out.println(name + " has PASSED!");
        } else {
            System.out.println(name + " has FAILED. Study harder!");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        // Creating Object 1
        Student alice = new Student();
        alice.name = "Alice";
        alice.age = 16;
        alice.subject = "Computer Science";
        alice.gpa = 3.9;

        // Creating Object 2
        Student bob = new Student();
        bob.name = "Bob";
        bob.age = 17;
        bob.subject = "Mathematics";
        bob.gpa = 1.8;

        // Creating Object 3
        Student charlie = new Student();
        charlie.name = "Charlie";
        charlie.age = 15;
        charlie.subject = "Physics";
        charlie.gpa = 3.2;

        // Using each object independently
        alice.introduce();
        alice.checkResult();
        System.out.println("---");

        bob.introduce();
        bob.checkResult();
        System.out.println("---");

        charlie.introduce();
        charlie.checkResult();
    }
}
```

### Output
```
Hello! I'm Alice, 16 years old.
I study Computer Science and my GPA is 3.9
Alice has PASSED!
---
Hello! I'm Bob, 17 years old.
I study Mathematics and my GPA is 1.8
Bob has FAILED. Study harder!
---
Hello! I'm Charlie, 15 years old.
I study Physics and my GPA is 3.2
Charlie has PASSED!
```

---

## Common Mistakes

- ❌ **Mistake**: Forgetting `new` when creating an object (`Student s1 = Student()`) → ✅ **Fix**: Always use `new`: `Student s1 = new Student()`
- ❌ **Mistake**: Accessing a field before setting it (getting default values like 0 or null) → ✅ **Fix**: Always set field values after creating the object, or use a constructor (next lesson)
- ❌ **Mistake**: Thinking two references are two objects (`Student s2 = s1` is NOT a new object) → ✅ **Fix**: Use `new` to create a truly new, separate object

---

## Best Practices

- Name your class with a capital first letter and use a singular noun: `Student`, not `students` or `student`
- Keep related fields and methods together in the same class
- Don't create giant classes — if a class does too many things, split it up
- Use meaningful field names: `studentName` is better than `n`

---

## Interview Questions

**Q: What is the difference between a class and an object in Java?**  
A: A class is a blueprint/template that defines fields and methods. An object is an actual instance created from that blueprint using the `new` keyword. A class exists once in code; objects can be created many times from it.

**Q: What is an instance variable?**  
A: An instance variable (or field) is a variable declared inside a class but outside any method. Each object (instance) of the class gets its own separate copy of instance variables.

**Q: What is a NullPointerException?**  
A: A NullPointerException occurs when you try to access a field or call a method on a reference that is `null` (not pointing to any object). It's one of the most common runtime errors in Java.

---

## Quick Revision

✔ A **class** is a blueprint with fields (data) and methods (behavior)  
✔ An **object** is created from a class using the `new` keyword  
✔ Use the **dot operator (`.`)** to access fields and methods on an object  
✔ Each object has its own independent copy of instance variables  
✔ A reference variable stores the *address* of an object, not the object itself  

---

## Related Topics

- Constructors
- this Keyword
- Encapsulation

---

## Next Lesson

**03 - Constructors**
