---
id: stringbuilder-stringbuffer
title: StringBuilder and StringBuffer
description: Learn mutable strings in Java — StringBuilder vs StringBuffer, key methods, thread safety, and when to use each.
sidebar_position: 2
keywords:
  - Java
  - StringBuilder
  - StringBuffer
  - mutable string
  - thread safe
  - append
---

# StringBuilder and StringBuffer

> **Reading Time:** 10 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

`StringBuilder` and `StringBuffer` are classes in Java that allow you to create **mutable** (changeable) sequences of characters. Unlike `String`, you can modify their content directly without creating new objects. `StringBuilder` is fast but not thread-safe, while `StringBuffer` is thread-safe but slightly slower.

---

## What You'll Learn

- Why mutable Strings exist and when you need them
- How to use `StringBuilder` with all key methods
- The difference between `StringBuilder` (fast) and `StringBuffer` (thread-safe)
- When to use `String`, `StringBuilder`, or `StringBuffer`
- Performance comparison with real numbers

---

## Prerequisites

- Java Strings and immutability (Lesson 01)
- Basic understanding of loops and methods

---

## Explanation

### Why Do We Need Mutable Strings?

Recall that `String` is **immutable** — every modification creates a new object. Consider building a sentence word by word:

```java
String result = "";
for (int i = 0; i < 1000; i++) {
    result = result + "word ";
}
```

Each iteration creates a **new String object**, discards the old one, and copies all previous characters plus the new word. After 1000 iterations, Java has created 1000 String objects and copied millions of characters. This is extremely wasteful.

`StringBuilder` solves this by maintaining a single **resizable character buffer** that you can append to, insert into, or delete from — all without creating new objects.

---

### StringBuilder — The Fast Mutable String

`StringBuilder` was introduced in Java 5 as a faster, non-synchronized version of `StringBuffer`. It is the **recommended choice** for most situations where you need to build or modify strings.

#### How StringBuilder Works Internally

`StringBuilder` internally uses a **char array** (character array) with an initial capacity of 16 characters. When the array fills up, it automatically doubles in size (capacity = 2 × old capacity + 2). This is called **dynamic resizing**.

---

### Key Methods of StringBuilder

#### `append(value)` — Add to the End
Appends any type of value to the end of the current sequence. You can chain multiple `append()` calls because each returns the same `StringBuilder` object.

#### `insert(index, value)` — Insert at Position
Inserts a value at the specified index, shifting everything after it to the right.

#### `delete(start, end)` — Remove Characters
Removes characters from `start` (inclusive) to `end` (exclusive).

#### `deleteCharAt(index)` — Remove One Character
Removes the character at a specific index.

#### `replace(start, end, str)` — Replace a Section
Replaces the characters from `start` to `end` with the given String.

#### `reverse()` — Flip the String
Reverses the character sequence in place.

#### `charAt(index)` — Get a Character
Returns the character at the given index.

#### `length()` — Current Length
Returns the number of characters currently stored.

#### `capacity()` — Internal Buffer Size
Returns the current capacity of the internal buffer (not the same as length).

#### `toString()` — Convert to String
Converts the `StringBuilder` content back to a regular immutable `String`.

---

### StringBuffer — The Thread-Safe Version

`StringBuffer` has the **same methods** as `StringBuilder` but all its methods are `synchronized`. Synchronized means only one thread can use the method at a time — this prevents data corruption when multiple threads try to modify the same object simultaneously.

| Feature | StringBuilder | StringBuffer |
|---|---|---|
| Introduced in | Java 5 | Java 1.0 |
| Thread-safe | ❌ No | ✅ Yes |
| Performance | ⚡ Faster | 🐢 Slower |
| Synchronized | ❌ No | ✅ Yes |
| Recommended for | Single-threaded | Multi-threaded |

---

### When to Use Which?

| Scenario | Use |
|---|---|
| Fixed text that never changes | `String` |
| Building text in a loop (single thread) | `StringBuilder` |
| Building text in a multi-threaded environment | `StringBuffer` |
| Simple one-time concatenation | `String` (Java compiler optimizes it) |

**Rule of thumb:** 99% of the time, use `StringBuilder`. Only switch to `StringBuffer` if you are explicitly sharing a mutable String across multiple threads.

---

### Performance Comparison

In tests concatenating 100,000 words:

- **String +** concatenation: ~5000 milliseconds (creates ~100,000 objects)
- **StringBuilder.append()**: ~2 milliseconds (modifies one object)

That is a **2500× speed difference** for 100,000 iterations. For real programs that process large data, this makes an enormous difference.

---

## Real-World Analogy

Imagine you are writing a report and you keep crossing words out and writing new ones.

- **String** is like a **typed document** — every time you make a change, you retype the whole document from scratch and throw away the old one.
- **StringBuilder** is like a **whiteboard** — you write, erase, and edit freely. Same board, no waste.
- **StringBuffer** is like a **whiteboard in a classroom** — there is a lock on the marker. Only one person can write at a time (thread-safe), so it takes a tiny bit longer, but there's no chaos.

---

## Code Example

### Example 1: StringBuilder Basics

```java
public class StringBuilderDemo {
    public static void main(String[] args) {

        // Creating a StringBuilder
        StringBuilder sb = new StringBuilder("Hello");

        // append() — add to end
        sb.append(", ");
        sb.append("World");
        sb.append("!");
        System.out.println(sb);           // Hello, World!

        // insert() — insert at position
        sb.insert(7, "Java ");
        System.out.println(sb);           // Hello, Java World!

        // delete() — remove characters (start inclusive, end exclusive)
        sb.delete(7, 12);
        System.out.println(sb);           // Hello, World!

        // replace() — replace a section
        sb.replace(7, 12, "Everyone");
        System.out.println(sb);           // Hello, Everyone!

        // reverse() — flip the whole thing
        StringBuilder rev = new StringBuilder("abcde");
        rev.reverse();
        System.out.println(rev);          // edcba

        // length and capacity
        StringBuilder cap = new StringBuilder();
        System.out.println("Length: " + cap.length());       // 0
        System.out.println("Capacity: " + cap.capacity());   // 16 (default)

        // Convert to String
        String result = sb.toString();
        System.out.println(result);       // Hello, Everyone!
    }
}
```

### Output
```
Hello, World!
Hello, Java World!
Hello, World!
Hello, Everyone!
edcba
Length: 0
Capacity: 16
Hello, Everyone!
```

---

### Example 2: Performance — String vs StringBuilder

```java
public class PerformanceDemo {
    public static void main(String[] args) {

        int iterations = 50000;

        // Test 1: String concatenation (slow)
        long startTime = System.currentTimeMillis();
        String s = "";
        for (int i = 0; i < iterations; i++) {
            s = s + "a";
        }
        long endTime = System.currentTimeMillis();
        System.out.println("String + took: " + (endTime - startTime) + " ms");

        // Test 2: StringBuilder (fast)
        startTime = System.currentTimeMillis();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < iterations; i++) {
            sb.append("a");
        }
        endTime = System.currentTimeMillis();
        System.out.println("StringBuilder took: " + (endTime - startTime) + " ms");
    }
}
```

### Output
```
String + took: 1823 ms
StringBuilder took: 2 ms
```

---

### Example 3: StringBuffer in Multi-threaded Context

```java
public class StringBufferDemo {
    public static void main(String[] args) throws InterruptedException {

        StringBuffer buffer = new StringBuffer();

        // Thread 1 appends "Hello "
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                buffer.append("Hello ");
            }
        });

        // Thread 2 appends "World "
        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                buffer.append("World ");
            }
        });

        t1.start();
        t2.start();
        t1.join();
        t2.join();

        System.out.println("Length: " + buffer.length());  // Always 60 (safe)
        System.out.println(buffer.toString());
    }
}
```

### Output
```
Length: 60
Hello Hello Hello Hello Hello World World World World World
```

---

## Common Mistakes

- ❌ **Mistake**: Using `String +` in a for loop → ✅ **Fix**: Use `StringBuilder.append()` inside loops
- ❌ **Mistake**: Using `StringBuffer` everywhere "just to be safe" → ✅ **Fix**: Use `StringBuilder` unless you are actually in a multi-threaded environment — `StringBuffer` has unnecessary overhead
- ❌ **Mistake**: Forgetting to call `.toString()` before passing to a method expecting `String` → ✅ **Fix**: Always call `sb.toString()` when you need a `String`
- ❌ **Mistake**: Calling `delete(0, sb.length())` to clear — confusing → ✅ **Fix**: Use `sb.setLength(0)` to clear a `StringBuilder` efficiently

---

## Best Practices

- Always use `StringBuilder` (not `+`) when concatenating inside loops
- Initialize `StringBuilder` with an estimated capacity: `new StringBuilder(500)` to avoid frequent resizing
- Chain `append()` calls for cleaner code: `sb.append("a").append("b").append("c")`
- Use `sb.setLength(0)` to reuse an existing `StringBuilder` (faster than creating a new one)
- Never use `StringBuffer` unless you genuinely need thread safety — it adds synchronization overhead for no reason in single-threaded code

---

## Interview Questions

**Q: What is the difference between String, StringBuilder, and StringBuffer?**  
A: `String` is immutable — modifications create new objects. `StringBuilder` is mutable and fast but not thread-safe. `StringBuffer` is mutable and thread-safe (synchronized) but slower than `StringBuilder`. Use `String` for fixed values, `StringBuilder` for single-threaded string building, and `StringBuffer` for multi-threaded scenarios.

**Q: Why is StringBuilder faster than String concatenation?**  
A: String concatenation with `+` creates a new String object every time. In a loop with N iterations, this is O(N²) time complexity because each new String copies all previous characters. StringBuilder uses a resizable char array and appends to it in-place, making it O(N) overall.

**Q: Is StringBuilder thread-safe?**  
A: No. `StringBuilder` is NOT thread-safe. If multiple threads try to modify the same `StringBuilder` at the same time, data corruption can occur. For thread-safe mutable strings, use `StringBuffer` instead.

**Q: What is the default capacity of StringBuilder?**  
A: The default capacity is **16 characters**. When the buffer is full, it resizes to `(old capacity × 2) + 2`. You can specify an initial capacity with `new StringBuilder(100)` to avoid frequent resizing for large strings.

---

## Quick Revision

✔ `StringBuilder` is mutable — you can change it without creating new objects  
✔ `StringBuilder` is NOT thread-safe; `StringBuffer` IS thread-safe (but slower)  
✔ Key methods: `append()`, `insert()`, `delete()`, `reverse()`, `toString()`  
✔ Use `StringBuilder` in loops — it is up to 2500× faster than `String +`  
✔ Default capacity is 16; auto-doubles when full  

---

## Related Topics

- Strings In Depth (Lesson 01)
- Java Threads and Synchronization
- Java Memory Management

---

## Next Lesson

**01 - Exception Handling**
