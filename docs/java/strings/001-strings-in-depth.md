---
id: strings-in-depth
title: Strings In Depth
description: Master Java Strings — immutability, String pool, all key methods, and why StringBuilder beats String for performance.
sidebar_position: 1
keywords:
  - Java
  - String
  - String pool
  - immutable
  - StringBuilder
  - String methods
---

# Strings In Depth

> **Reading Time:** 12 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

A `String` in Java is a sequence of characters used to store text like names, messages, or sentences. Strings in Java are **immutable** — once created, they cannot be changed. Java also uses a special memory area called the **String Pool** to save memory by reusing String objects.

---

## What You'll Learn

- What immutability means and why Strings are immutable
- How the String pool works and saves memory
- All important String methods with examples
- The difference between `==` and `.equals()` for Strings
- Why `StringBuilder` is faster than `String` for repeated changes

---

## Prerequisites

- Basic Java syntax (variables, data types)
- Understanding of objects and classes

---

## Explanation

### What Is a String?

A `String` is a class in Java, not a primitive type. When you write:

```java
String name = "Alice";
```

Java creates a `String` object that holds the characters `A`, `l`, `i`, `c`, `e`.

---

### Immutability — What Does It Mean?

**Immutable** means "cannot be changed". Once a String object is created in memory, its value can never be modified. If you try to "change" a String, Java actually creates a **brand new String object** and leaves the old one in memory.

```java
String s = "Hello";
s = s + " World";
// "Hello" is still in memory, Java created a new String "Hello World"
```

This behaviour is by design — it makes Strings **thread-safe** and **predictable**.

---

### The String Pool

Java has a special area inside the **Heap memory** called the **String Constant Pool** (or just String Pool). When you create a String using double quotes, Java checks the pool first:

- If the same String already exists → Java **reuses** it (no new object)
- If it does NOT exist → Java **creates** a new one and adds it to the pool

```java
String a = "Java";   // Created in pool
String b = "Java";   // Reused from pool — same reference!
String c = new String("Java"); // Created in heap, NOT pool
```

This is why `a == b` is `true` but `a == c` is `false` (they point to different memory locations).

---

### `==` vs `.equals()` — The Most Common Mistake

- `==` compares **memory addresses** (references)
- `.equals()` compares **actual content**

Always use `.equals()` when comparing String values. Use `==` only when you intentionally want to check if two variables point to the exact same object.

---

### Key String Methods

#### 1. `length()` — Count Characters
Returns the number of characters in the String.

#### 2. `charAt(index)` — Get Character at Position
Returns the character at a specific index (0-based).

#### 3. `substring(start)` / `substring(start, end)` — Extract Part
Extracts a portion of the String. The `end` index is exclusive.

#### 4. `indexOf(str)` — Find Position
Returns the index of the first occurrence of the given character or substring. Returns `-1` if not found.

#### 5. `contains(str)` — Check If Present
Returns `true` if the String contains the specified sequence of characters.

#### 6. `replace(old, new)` — Replace Characters
Replaces all occurrences of a character or substring with another.

#### 7. `toUpperCase()` / `toLowerCase()` — Change Case
Converts all characters to upper or lower case.

#### 8. `trim()` — Remove Extra Spaces
Removes leading and trailing whitespace from the String.

#### 9. `split(delimiter)` — Break Into Array
Splits the String around matches of the given delimiter, returning a String array.

#### 10. `equals(str)` / `equalsIgnoreCase(str)` — Compare
`equals()` is case-sensitive. `equalsIgnoreCase()` ignores case differences.

---

### StringBuilder vs String — Performance

Every time you concatenate Strings using `+`, Java creates a new String object. Do this thousands of times (in a loop) and your program slows down because of repeated object creation and garbage collection.

`StringBuilder` is a **mutable** sequence of characters. You can change it without creating new objects every time. This makes it **much faster** for building Strings in loops.

| Feature | String | StringBuilder |
|---|---|---|
| Mutable | ❌ No | ✅ Yes |
| Thread-safe | ✅ Yes | ❌ No |
| Performance | Slower in loops | Much faster |
| Use case | Fixed text | Building dynamic text |

---

## Real-World Analogy

Think of a `String` like a printed book. Once the book is printed, you cannot erase or change its pages. If you want a "new version", the publisher has to print a completely new book (new object).

`StringBuilder` is like a **whiteboard**. You can write, erase, and rewrite as many times as you want without creating a new whiteboard each time.

---

## Code Example

```java
public class StringsDemo {
    public static void main(String[] args) {

        String name = "  Hello, Java World!  ";

        // Basic methods
        System.out.println("Length: " + name.trim().length());          // 19
        System.out.println("Upper: " + name.trim().toUpperCase());       // HELLO, JAVA WORLD!
        System.out.println("Lower: " + name.trim().toLowerCase());       // hello, java world!
        System.out.println("Trimmed: '" + name.trim() + "'");            // 'Hello, Java World!'

        // charAt and substring
        String word = "Programming";
        System.out.println("Char at 0: " + word.charAt(0));             // P
        System.out.println("Substring(0,7): " + word.substring(0, 7));  // Program

        // indexOf and contains
        System.out.println("Index of 'gram': " + word.indexOf("gram")); // 3
        System.out.println("Contains 'ming': " + word.contains("ming")); // true

        // replace and split
        String csv = "apple,banana,cherry";
        String[] fruits = csv.split(",");
        for (String fruit : fruits) {
            System.out.println(fruit);  // apple / banana / cherry
        }

        String replaced = csv.replace("banana", "mango");
        System.out.println(replaced);   // apple,mango,cherry

        // == vs equals
        String s1 = "Java";
        String s2 = "Java";
        String s3 = new String("Java");

        System.out.println(s1 == s2);         // true  (same pool reference)
        System.out.println(s1 == s3);         // false (different object in heap)
        System.out.println(s1.equals(s3));    // true  (same content)

        // StringBuilder performance
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 5; i++) {
            sb.append("Item").append(i).append(" ");
        }
        System.out.println(sb.toString());    // Item1 Item2 Item3 Item4 Item5
    }
}
```

### Output
```
Length: 19
Upper: HELLO, JAVA WORLD!
Lower: hello, java world!
Trimmed: 'Hello, Java World!'
Char at 0: P
Substring(0,7): Program
Index of 'gram': 3
Contains 'ming': true
apple
banana
cherry
apple,mango,cherry
true
false
true
Item1 Item2 Item3 Item4 Item5
```

---

## Common Mistakes

- ❌ **Mistake**: Using `==` to compare String values → ✅ **Fix**: Always use `.equals()` or `.equalsIgnoreCase()`
- ❌ **Mistake**: Concatenating Strings in a loop with `+` (very slow) → ✅ **Fix**: Use `StringBuilder.append()` inside loops
- ❌ **Mistake**: Calling `.length()` on a `null` String → ✅ **Fix**: Always null-check first: `if (str != null)`
- ❌ **Mistake**: `substring(2, 5)` thinking end is inclusive → ✅ **Fix**: The end index is exclusive — `substring(2, 5)` returns characters at index 2, 3, 4

---

## Best Practices

- Always use `.equals()` (not `==`) when comparing String content
- Use `StringBuilder` when you need to build or modify Strings repeatedly
- Use `trim()` when reading user input to remove accidental spaces
- Prefer `equalsIgnoreCase()` for user input comparisons (avoids case issues)
- Use `isEmpty()` or `isBlank()` (Java 11+) instead of `.length() == 0` for readability

---

## Interview Questions

**Q: Why is String immutable in Java?**  
A: String is immutable for three main reasons: (1) **Security** — Strings are used for file paths, network URLs, database credentials. Making them immutable prevents tampering. (2) **String Pool** — Immutability allows multiple references to safely share the same pool object. (3) **Thread Safety** — Immutable objects are inherently thread-safe without synchronization.

**Q: What is the String constant pool?**  
A: The String constant pool is a special region in Java heap memory where String literals are stored. When you create a String literal, Java checks the pool first. If the same value exists, it reuses the reference rather than creating a new object. This saves memory. Strings created with `new String("...")` bypass the pool.

**Q: What is the difference between `==` and `.equals()` for Strings?**  
A: `==` compares object references (memory addresses) while `.equals()` compares the actual character content. Two different String objects can have the same content but different references, so `==` would return `false` while `.equals()` returns `true`.

**Q: When should you use StringBuilder over String?**  
A: Use `StringBuilder` when you need to perform many modifications to a String, especially in loops. String concatenation with `+` creates a new object each time, which is O(n²) in a loop. StringBuilder is O(n) because it modifies the same buffer in place.

---

## Quick Revision

✔ Strings are immutable — changes create new objects, not modify existing ones  
✔ The String pool reuses String literals to save memory  
✔ Always use `.equals()` for content comparison, never `==`  
✔ `substring(start, end)` — end index is EXCLUSIVE  
✔ `StringBuilder` is faster for repeated concatenations  

---

## Related Topics

- StringBuilder and StringBuffer
- Java Memory Model (Heap & Stack)
- Wrapper Classes and Autoboxing

---

## Next Lesson

**02 - StringBuilder and StringBuffer**
