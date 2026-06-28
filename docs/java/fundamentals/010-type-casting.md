---
id: type-casting
title: Type Casting in Java
description: Learn about implicit (widening) and explicit (narrowing) type casting in Java, including potential data loss, ASCII character conversion, and common mistakes.
sidebar_position: 10
keywords:
  - Java
  - Type Casting
  - Widening Casting
  - Narrowing Casting
  - Type Conversion
  - Data Loss
---

# Type Casting in Java

> **Reading Time:** 10 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

In Java, variables have strict types. Sometimes, we need to assign a value of one type to a variable of another type. This process is called **Type Casting**.

Type casting allows us to convert data from one type to another, either automatically by Java (for safe conversions) or manually by the developer (for conversions that could result in data loss).

---

## What You'll Learn

- What type casting is and why it is needed
- Automatic Widening Casting (Implicit conversion)
- Manual Narrowing Casting (Explicit conversion)
- How conversion behaves under data loss and integer overflow
- Casting between character types (`char`) and numbers (`int`)

---

## Prerequisites

- Variables in Java (Lesson 008)
- Java Data Types (Lesson 009)

---

## Explanation

In Java, casting can be categorized into two directions based on memory sizes:

```
            WIDENING CASTING (Implicit / Automatic)
  byte ──► short ──► char ──► int ──► long ──► float ──► double
  ─────────────────────────────────────────────────────────────►
  Smaller Type                                       Larger Type

            NARROWING CASTING (Explicit / Manual)
  double ──► float ──► long ──► int ──► char ──► short ──► byte
  ◄─────────────────────────────────────────────────────────────
  Larger Type                                       Smaller Type
```

### 1. Widening Casting (Automatic)
Widening occurs when you convert a smaller data type to a larger data type size.
*   **Safety**: 100% safe. Since the destination type is larger than the source type, there is no risk of losing data.
*   **Syntax**: Done automatically by the Java compiler. No special code is needed.

### 2. Narrowing Casting (Manual)
Narrowing occurs when you convert a larger data type to a smaller data type size.
*   **Safety**: Unsafe. If the value in the larger type exceeds the range of the smaller type, data will be lost (truncated) or overflow will occur.
*   **Syntax**: Must be done manually by placing the target type in parentheses in front of the value.

---

## Real-World Analogy

Think of **Water Containers**.

*   **Widening** is like pouring a **glass of water** (smaller container) into a **large bucket** (larger container). 
    *   It fits perfectly, and there is no spill. Java does this automatically.
*   **Narrowing** is like pouring a **large bucket of water** into a **glass**.
    *   If the bucket contains more water than the glass can hold, it will overflow and spill (data loss).
    *   Because of this risk, Java demands you confirm the operation by manually writing the cast.

---

## Syntax & Code Examples

Here is how widening and narrowing casting look in action:

```java
public class TypeCastingDemo {
    public static void main(String[] args) {
        // 1. Widening Casting (Automatic)
        int myInt = 9;
        double myDouble = myInt; // Automatic cast: int to double

        System.out.println("Widening Casting:");
        System.out.println("Integer value: " + myInt);
        System.out.println("Double value: " + myDouble);

        // 2. Narrowing Casting (Manual)
        double scoreDouble = 97.75;
        int scoreInt = (int) scoreDouble; // Manual cast: double to int

        System.out.println("\nNarrowing Casting:");
        System.out.println("Double value: " + scoreDouble);
        System.out.println("Integer value: " + scoreInt); // Notice the decimal part is cut off!

        // 3. Overflow Example during Narrowing
        int largeNumber = 130;
        byte truncatedByte = (byte) largeNumber; // byte max limit is 127
        
        System.out.println("\nOverflow Example:");
        System.out.println("Int value: " + largeNumber);
        System.out.println("Byte value (Overflow): " + truncatedByte); // Results in -126 due to binary wrap-around!
    }
}
```

### Output

```
Widening Casting:
Integer value: 9
Double value: 9.0

Narrowing Casting:
Double value: 97.75
Integer value: 97

Overflow Example:
Int value: 130
Byte value (Overflow): -126
```

### Casting `char` to `int`

In computer memory, characters are stored as numeric Unicode values (similar to ASCII). You can easily cast characters to numbers to see their numeric code, and vice versa:

```java
char letter = 'A';
int asciiValue = (int) letter; // Widening cast (automatic char to int works too)

System.out.println("Char: " + letter + " -> Code: " + asciiValue);

int codePoint = 66;
char correspondingChar = (char) codePoint; // Narrowing cast (manual required)

System.out.println("Code: " + codePoint + " -> Char: " + correspondingChar);
```

### Output

```
Char: A -> Code: 65
Code: 66 -> Char: B
```

---

## Common Mistakes

- ❌ **Incorrect casting placement in arithmetic division**:
  ```java
  int total = 15;
  int count = 2;
  double average = (double) (total / count); // ❌ Wrong!
  ```
  *   **Explanation**: `total / count` does integer division first, giving `7`. The cast to `double` then gives `7.0`.
  *   **Fix**: Cast one of the variables before the division:
  ```java
  double average = (double) total / count; // ✅ Correct! Gives 7.5
  ```
- ❌ **Expecting narrowing to round decimals**:
  *   Casting `double` `9.99` to `int` results in `9`, not `10`. Explicit casting simply chops off (truncates) the decimal part.
  *   **Fix**: If you need rounding, use `Math.round(value)`.

---

## Best Practices

- Always check if the value you are narrowing fits inside the target type's range to prevent silent overflow errors.
- Avoid unnecessary explicit casts. If a conversion is safe (widening), let Java handle it implicitly to keep code clean.
- Use explicit types or cast variables in equations to guarantee floating-point precision where needed.

---

## Interview Questions

### Q1. What is the difference between implicit and explicit type casting?
Implicit casting (widening) is done automatically by the compiler when converting a smaller type to a larger type, as there is no risk of data loss. Explicit casting (narrowing) must be written manually by the developer using parentheses `(type)` when converting a larger type to a smaller one, acknowledging the risk of data truncation or overflow.

### Q2. How does Java handle decimal-to-integer casting?
When you cast a floating-point number (`double` or `float`) to an integer type (`int`, `long`, `byte`, etc.), Java truncates the value by throwing away all decimal fractions. It does not round the number. For instance, `(int) -3.99` will result in `-3`.

### Q3. What is integer overflow during type casting?
Integer overflow occurs when a value exceeds the maximum storage capacity of the target data type. When explicitly cast, the binary bits are truncated to fit the smaller data size, causing the number to wrap around (e.g. casting `int` `130` to `byte` results in `-126`).

---

## Quick Revision

- [x] Type casting converts a variable from one data type to another.
- [x] Widening casting is automatic and safe (no data loss).
- [x] Narrowing casting requires manual notation `(type)` and can cause data loss or overflow.
- [x] Decimal values are truncated (not rounded) when cast to integers.
- [x] Characters (`char`) can be cast to integers (`int`) to reveal their numeric ASCII/Unicode code points.

---

## Related Topics

- Java Data Types (Lesson 009)
- Operators in Java

---

## Next Lesson

**Phase 2, Lesson 1 — Introduction to OOP**
