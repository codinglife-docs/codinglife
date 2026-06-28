---
id: data-types
title: Java Data Types
description: Explore Java's 8 primitive data types (integers, decimals, characters, booleans) and reference types, including memory sizes and Stack vs Heap allocation.
sidebar_position: 9
keywords:
  - Java
  - Data Types
  - Primitives
  - Reference Types
  - Memory
  - Heap
  - Stack
---

# Java Data Types

> **Reading Time:** 12 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

Java is a **statically-typed language**, meaning every variable must be declared with a specific data type before it can be used. Data types tell the computer how much memory to allocate for the variable and what operations can be performed on it.

In Java, data types are divided into two main categories: **Primitive Types** (basic types built into the language) and **Reference Types** (objects created by developers or libraries).

---

## What You'll Learn

- The difference between Primitive and Reference types
- Detailed breakdown of Java's 8 primitive data types (sizes, ranges, defaults)
- How to declare values using literal suffixes (`L` and `f`)
- The basics of Stack vs Heap memory allocation for data types
- Common type mismatches and how to avoid them

---

## Prerequisites

- Variables in Java (Lesson 008)

---

## Explanation

### Primitive vs. Reference Types

```
                    DATA TYPES IN JAVA
                            │
            ┌───────────────┴───────────────┐
            ▼                               ▼
     PRIMITIVE TYPES                 REFERENCE TYPES
  (Store values directly)        (Store memory addresses)
  int, double, char, etc.        String, Arrays, Classes
```

1. **Primitive Types**: These types store values directly in the memory location reserved for the variable. They are fast, lightweight, and represent basic numbers, characters, and true/false states.
2. **Reference (Non-Primitive) Types**: These types do not store the value directly. Instead, they store a reference (a memory address) pointing to the actual object located in another part of the system's memory.

---

## The 8 Primitive Data Types

Java provides 8 built-in primitive types, each with its own size, default value, and range.

| Type | Size | Category | Default | Range / Description | Example |
|---|---|---|---|---|---|
| **`byte`** | 1 byte (8 bits) | Integer | `0` | -128 to 127 | `byte age = 20;` |
| **`short`** | 2 bytes (16 bits) | Integer | `0` | -32,768 to 32,767 | `short speed = 250;` |
| **`int`** | 4 bytes (32 bits) | Integer | `0` | ~ -2 Billion to +2 Billion | `int population = 120000;` |
| **`long`** | 8 bytes (64 bits) | Integer | `0L` | ~ -9 Quintillion to +9 Quintillion | `long distance = 9876543210L;` |
| **`float`** | 4 bytes (32 bits) | Floating-point | `0.0f` | Single-precision decimal (6-7 digits) | `float temp = 98.6f;` |
| **`double`** | 8 bytes (64 bits) | Floating-point | `0.0d` | Double-precision decimal (15-16 digits) | `double price = 19.99;` |
| **`char`** | 2 bytes (16 bits) | Character | `\u0000` | Single Unicode character | `char grade = 'A';` |
| **`boolean`** | ~1 bit | Logical | `false` | `true` or `false` | `boolean isActive = true;` |

---

## Real-World Analogy

Think of **Containers** in a kitchen.

*   **Primitives** are like **measuring cups**:
    *   A `byte` is a tiny shot glass.
    *   An `int` is a regular coffee mug.
    *   A `long` is a large thermos.
    *   If you try to pour the contents of a thermos (`long`) into a shot glass (`byte`), it overflows and leaks (data loss).
*   **Reference Types** are like **claim tags at a coat check**:
    *   The tag is small and stays in your pocket (the reference variable).
    *   It points to a large coat hanger in another room (the actual object in the Heap).

---

## Syntax & Code Examples

```java
public class DataTypesDemo {
    public static void main(String[] args) {
        // Integer Types
        byte smallNumber = 125;
        int standardInt = 450000;
        
        // Note: 'L' or 'l' suffix is required for long literals exceeding int range
        long bankBalance = 15000000000L; 

        // Decimal (Floating Point) Types
        // Note: 'f' or 'F' suffix is required for float literals
        float discountPercentage = 15.5f; 
        double scientificConstant = 9.80665; 

        // Character Type (single quotes only)
        char currencySymbol = '$'; 

        // Boolean Type
        boolean isJavaFun = true;

        // Reference Type (String starts with uppercase letter)
        String welcomeMessage = "Welcome to Coding Life!";

        System.out.println("Integer: " + standardInt);
        System.out.println("Long Balance: " + bankBalance);
        System.out.println("Float: " + discountPercentage + "%");
        System.out.println("Char: " + currencySymbol);
        System.out.println("Message: " + welcomeMessage);
    }
}
```

---

## Memory Allocation: Stack vs Heap

Java uses two main memory regions to store data variables:

```
      STACK                              HEAP
┌─────────────────┐               ┌─────────────────┐
│ int age = 25    │               │                 │
├─────────────────┤               │   "Hello World" │
│ String name ────┼──────────────►│    String Object│
└─────────────────┘               └─────────────────┘
```

1.  **The Stack**: A fast, organized memory region. 
    *   All **primitive variables** (their type and actual values) are stored here.
    *   The **reference addresses** of object variables are also stored here.
2.  **The Heap**: A larger, dynamic memory region used for objects.
    *   All **objects and arrays** (e.g. String instances) are stored here.
    *   The variable on the stack simply holds the address location of the object in the heap.

---

## Common Mistakes

- ❌ **Forgetting the `L` or `f` suffix**:
  *   `float price = 10.99;` will throw a compiler error because Java treats all decimal literals as `double` by default.
  *   **Fix**: Write `float price = 10.99f;`.
- ❌ **Integer Overflow**: Assigning a value outside a type's range:
  *   `byte score = 130;` will fail because the maximum value a `byte` can store is 127.
- ❌ **Confusing char and String syntax**:
  *   Using double quotes for `char`: `char initial = "A";` or single quotes for `String`: `String word = 'Hello';`.
  *   **Fix**: Always use single quotes `'` for `char` and double quotes `"` for `String`.

---

## Best Practices

- Use `int` for standard integers unless you have a specific reason (like saving memory on arrays of `byte`/`short` or storing massive numbers in `long`).
- Use `double` for decimal calculations unless memory constraints require `float`.
- For precise financial calculations, avoid `double`/`float` due to binary floating-point roundoff errors. Use the reference type `BigDecimal` instead.

---

## Interview Questions

### Q1. Why does Java have primitive types when it is an Object-Oriented language?
Java keeps primitive types because they are highly efficient. Objects require extra memory overhead (metadata, reference pointers) and run slower. Primitives are stored on the Stack and offer rapid read/write performance.

### Q2. What are wrapper classes in Java?
Wrapper classes are object representations of the primitive types. Each primitive has a corresponding class: e.g. `int` has `Integer`, `char` has `Character`, `double` has `Double`. They allow primitives to be used in OOP structures like collection lists, which can only store objects.

### Q3. What is the default value of local primitive variables?
Local variables (variables declared inside methods) do not receive default values. You must initialize them manually. Only instance fields and static fields get automatically initialized to default values.

---

## Quick Revision

- [x] Java has 8 primitive data types for storing numbers, text characters, and booleans.
- [x] Literal floating-point numbers default to `double` and integers default to `int`.
- [x] Reference types store memory pointers, whereas primitives store values directly.
- [x] Object values reside on the Heap; primitive values and reference pointers reside on the Stack.

---

## Related Topics

- Variables in Java (Lesson 008)
- Type Casting (Lesson 010)

---

## Next Lesson

**Lesson 010 — Type Casting**
