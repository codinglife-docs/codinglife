---
id: variables
title: Variables in Java
description: Learn how to declare, initialize, and use variables in Java, including naming rules, local/instance/static scopes, and constants.
sidebar_position: 8
keywords:
  - Java
  - Variables
  - Scope
  - Constant
  - final keyword
  - Initialization
---

# Variables in Java

> **Reading Time:** 10 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

In programming, we need to store information so we can use it later. A **variable** is a container (a memory location) that stores a data value. 

In Java, every variable has a specific **data type** (which determines what kind of value it can hold) and a **name** (identifier) that we use to reference it in our code.

---

## What You'll Learn

- What a variable is and how it works in memory
- How to declare and initialize variables
- Naming rules (identifiers) and conventions in Java
- The three scopes of variables: Local, Instance, and Static
- How to declare read-only constants using the `final` keyword

---

## Prerequisites

- Your First Java Program (Lesson 007)

---

## Explanation

### Declaring and Initializing Variables

To use a variable, you must perform two steps (which can be combined on a single line):

1. **Declaration**: Tell Java the variable's type and name.
2. **Initialization**: Assign an initial value to the variable.

```java
// 1. Declaration
int age;

// 2. Initialization
age = 25;

// Combined on a single line (Recommended)
int score = 100;
```

---

## Real-World Analogy

Think of variables as **labeled storage boxes** in a warehouse.

*   The **box label** is the variable name (e.g. `dadsScrews`).
*   The **box size/type** is the data type (e.g. "small wooden box" only for screws, not big tools).
*   The **items inside** are the values (e.g. 50 screws).

If you want to use the screws later, you search for the box labeled `dadsScrews` and look inside.

---

## Syntax & Code Examples

Here is how we work with different types of variables:

```java
public class VariablesDemo {
    public static void main(String[] args) {
        // Declaring different variables
        String studentName = "Alice";
        int studentAge = 20;
        double gpa = 3.85;
        boolean isEnrolled = true;

        // Displaying variables
        System.out.println("Name: " + studentName);
        System.out.println("Age: " + studentAge);
        System.out.println("GPA: " + gpa);
        System.out.println("Enrolled: " + isEnrolled);

        // Modifying variable values
        studentAge = 21; // age increases
        System.out.println("New Age: " + studentAge);
    }
}
```

### Output

```
Name: Alice
Age: 20
GPA: 3.85
Enrolled: true
New Age: 21
```

### Declaring Constants (`final` keyword)

If you don't want others (or your own code) to change a variable's value, use the `final` keyword. This makes the variable a constant.

```java
final double PI = 3.14159;
// PI = 3.14; // ❌ Compilation Error: Cannot assign a value to final variable 'PI'
```

---

## Types of Variables (Scope)

In Java, where you declare a variable determines its **scope** (where it can be accessed) and its **lifetime** (when it is destroyed). There are three types:

```
+----------------------------------------------------+
| class ScopeDemo {                                  |
|     int instanceVar = 10;     // Instance Variable |
|     static int staticVar = 20;// Static Variable   |
|                                                    |
|     void method() {                                |
|         int localVar = 30;    // Local Variable    |
|     }                                              |
| }                                                  |
+----------------------------------------------------+
```

### 1. Local Variables
Declared inside a method, constructor, or code block (`{}`).
*   **Access**: Only accessible within that specific method/block.
*   **Lifetime**: Created when the method is called and destroyed when the method exits.
*   **Default Value**: None. Local variables **must** be initialized before use, or the code won't compile.

### 2. Instance Variables (Fields)
Declared inside a class but outside any method.
*   **Access**: Tied to a specific object instance. Every object has its own copy.
*   **Lifetime**: Created when an object is instantiated and destroyed when the object is garbage-collected.
*   **Default Value**: Automatically initialized to default values (e.g. `0` for numbers, `false` for boolean, `null` for objects).

### 3. Static Variables (Class Variables)
Declared with the `static` keyword inside a class but outside any method.
*   **Access**: Shared across all objects of the class. There is only one copy in memory.
*   **Lifetime**: Created when the class is loaded at startup and destroyed when the program terminates.

---

## Naming Rules & Conventions

### Hard Rules (Identifiers must follow these or the code fails):
1. Names can contain letters, digits, underscores (`_`), and dollar signs (`$`).
2. Names must start with a letter, `_`, or `$`. They **cannot** start with a digit.
3. Names cannot contain spaces.
4. Names cannot be Java reserved keywords (like `int`, `class`, `public`, `void`).
5. Names are case-sensitive (`age` and `Age` are different variables).

### Soft Rules (Conventions for clean code):
*   Use **camelCase** for variables and methods (e.g. `userRegistrationDate`).
*   Use descriptive names (`studentAge` instead of `a`).
*   Use UPPERCASE with underscores for constants (e.g. `MAX_SPEED_LIMIT`).

---

## Common Mistakes

- ❌ **Using uninitialized local variables**:
  ```java
  int number;
  System.out.println(number); // ❌ Compile Error: variable number might not have been initialized
  ```
- ❌ **Starting names with numbers**:
  ```java
  int 1stPlace = 100; // ❌ Compile Error
  ```
- ❌ **Reassigning a constant**: Trying to write a new value to a variable marked `final`.

---

## Best Practices

- Always initialize your variables when declaring them to prevent uninitialized access.
- Choose clear, readable variable names rather than short codes (use `userEmail` instead of `ue`).
- Keep local variable scope as narrow as possible. Declare them close to where they are first used.

---

## Interview Questions

### Q1. What is the difference between local variables and instance variables?
Local variables are declared inside a method and are only visible inside that method. They must be initialized before use and do not have default values. Instance variables are declared in a class, are visible to all methods in the class (depending on access modifiers), and are initialized automatically to default values if not explicitly set.

### Q2. What does the `final` keyword do when applied to a variable?
The `final` keyword makes a variable immutable (read-only). Once a value is assigned to a `final` variable, it cannot be changed.

### Q3. Why do we use the `static` keyword on class variables?
We use `static` when we want a single variable to be shared among all instances of a class. It belongs to the class itself rather than individual object instances, saving memory and keeping state consistent.

---

## Quick Revision

- [x] Variables are containers in memory that hold data.
- [x] Java is strongly typed; you must declare a variable's type before using it.
- [x] Use camelCase for variable names and UPPERCASE for constants.
- [x] Local variables must be initialized manually; instance fields get defaults.
- [x] The `final` keyword creates a constant.

---

## Related Topics

- Your First Java Program (Lesson 007)
- Java Data Types (Lesson 009)

---

## Next Lesson

**Lesson 009 — Data Types**
