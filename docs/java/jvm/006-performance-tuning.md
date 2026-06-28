---
id: performance-tuning
title: JVM Performance Tuning
description: Master JVM performance tuning with heap flags (-Xms, -Xmx, -Xss), memory leak detection, profiling with VisualVM, and common performance pitfalls like autoboxing and String concatenation.
sidebar_position: 6
keywords:
  - Java
  - JVM Performance Tuning
  - Xmx
  - Xms
  - Memory Leak
  - VisualVM
  - String interning
  - Autoboxing
---

# JVM Performance Tuning

> **Reading Time:** 12 Minutes  
> **Difficulty:** Intermediate

---

## Topic Summary

Performance tuning is about making your Java application run faster, use less memory, and respond more quickly. This involves setting the right JVM flags, understanding how to detect and fix memory leaks, profiling your application with tools like VisualVM, and avoiding common coding mistakes that waste memory and CPU.

---

## What You'll Learn

- Key JVM memory flags: `-Xms`, `-Xmx`, `-Xss` and what they control
- How to detect memory leaks and common causes
- How to profile a Java application with VisualVM
- Performance anti-patterns: autoboxing, String concatenation in loops, unnecessary object creation

---

## Prerequisites

- JVM Memory Areas (Lesson 3)
- Garbage Collection (Lesson 4)
- GC Algorithms (Lesson 5)

---

## Explanation

### JVM Flags for Memory Configuration

JVM flags control how much memory the JVM uses and how it behaves. Here are the most important ones:

#### `-Xms` — Initial Heap Size
Sets the **starting size** of the Heap when the JVM launches.

```bash
java -Xms512m MyApp   # Start with 512 MB heap
```

If not set, the JVM starts with a small default (usually 1/64 of RAM). It will grow as needed, but that resizing has a cost.

#### `-Xmx` — Maximum Heap Size
Sets the **maximum size** the Heap can grow to. If your app needs more, it throws `OutOfMemoryError`.

```bash
java -Xmx2g MyApp    # Max 2 GB heap
```

> **Best Practice**: In production, set `-Xms` equal to `-Xmx` to prevent heap resizing during runtime.

```bash
java -Xms2g -Xmx2g MyApp    # Fixed 2 GB heap (no resizing overhead)
```

#### `-Xss` — Thread Stack Size
Sets the **stack size per thread**. Increasing this allows deeper recursion without `StackOverflowError`.

```bash
java -Xss512k MyApp     # 512 KB stack per thread (conservative)
java -Xss2m MyApp       # 2 MB stack per thread (allows deep recursion)
```

#### `-XX:MetaspaceSize` / `-XX:MaxMetaspaceSize`
Controls the Metaspace (class metadata memory).

```bash
java -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=256m MyApp
```

Useful when your app loads many classes (frameworks like Spring) or uses heavy reflection.

#### Other Useful Flags

```bash
# GC selection
-XX:+UseG1GC
-XX:+UseZGC
-XX:MaxGCPauseMillis=200

# GC logging (Java 9+)
-Xlog:gc*:gc.log:time,uptime

# Print all JVM flags being used
-XX:+PrintCommandLineFlags

# Heap dump on OutOfMemoryError (invaluable for debugging)
-XX:+HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=/tmp/heapdump.hprof

# JVM Flight Recorder
-XX:+FlightRecorder
-XX:StartFlightRecording=duration=60s,filename=recording.jfr
```

---

### Complete Flag Reference Table

| Flag | Purpose | Example |
|---|---|---|
| `-Xms<size>` | Initial heap size | `-Xms512m` |
| `-Xmx<size>` | Max heap size | `-Xmx4g` |
| `-Xss<size>` | Thread stack size | `-Xss1m` |
| `-XX:MetaspaceSize=<size>` | Initial Metaspace | `-XX:MetaspaceSize=128m` |
| `-XX:MaxMetaspaceSize=<size>` | Max Metaspace | `-XX:MaxMetaspaceSize=512m` |
| `-XX:+UseG1GC` | Use G1 GC | |
| `-XX:MaxGCPauseMillis=<ms>` | GC pause target | `-XX:MaxGCPauseMillis=200` |
| `-XX:+HeapDumpOnOutOfMemoryError` | Dump heap on OOM | |
| `-XX:+PrintCommandLineFlags` | Print active flags | |
| `-Xlog:gc*` | GC logging (Java 9+) | |

Size suffixes: `k`=KB, `m`=MB, `g`=GB

---

### Memory Leaks in Java

Java has automatic GC, but **memory leaks still happen**! In Java, a memory leak is when objects are still referenced (reachable from GC roots) but are no longer needed by the application.

#### Common Memory Leak Causes

**1. Static Collections that grow forever**
```java
public class LeakExample {
    // This list is static — lives forever, GC can never collect its items
    private static final List<byte[]> cache = new ArrayList<>();

    public void addData() {
        cache.add(new byte[1024 * 1024]); // 1MB each call!
    }
    // Fix: Use a bounded cache (e.g., Guava Cache, Caffeine) or WeakReferences
}
```

**2. Unclosed Resources**
```java
// BAD — connection never closed = resource leak
Connection conn = dataSource.getConnection();
// ... use conn ...
// forgot conn.close()!

// GOOD — try-with-resources auto-closes
try (Connection conn = dataSource.getConnection()) {
    // use conn safely
} // conn.close() called automatically
```

**3. Listeners/Observers Not Removed**
```java
// BAD — EventBus/listeners hold references to objects
eventBus.register(myListener);
// if myListener is never unregistered, it's never GC'd

// GOOD — always unregister when done
eventBus.register(myListener);
try {
    // use
} finally {
    eventBus.unregister(myListener);
}
```

**4. Inner Class Holding Outer Class Reference**
```java
class Outer {
    byte[] bigData = new byte[1024 * 1024]; // 1MB

    class Inner {
        // Inner class implicitly holds reference to Outer
        // As long as Inner is alive, Outer (and its 1MB) can't be GC'd
    }
    // Fix: use static nested class if you don't need the outer reference
}
```

---

### Detecting Memory Leaks

**Symptom**: Your application's heap usage grows over time and never decreases, eventually causing `OutOfMemoryError`.

**Step 1**: Enable heap dump on OOM
```bash
java -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=./heapdump.hprof MyApp
```

**Step 2**: Analyze with Eclipse Memory Analyzer (MAT) or VisualVM to find which objects are consuming the most memory and who is holding references to them.

**Step 3**: Use GC logs to track heap growth patterns.

---

### Profiling with VisualVM

VisualVM is a free, powerful profiling tool bundled with the JDK.

**How to use**:
1. Start your application with monitoring enabled (no special flags needed for local apps)
2. Open VisualVM (`jvisualvm` command or download from https://visualvm.github.io/)
3. Connect to your running Java process

**What VisualVM shows**:
- **Monitor tab**: Real-time heap usage, CPU usage, thread count
- **Heap Dumps**: Take a snapshot and analyze which objects are taking the most memory
- **CPU Profiler**: See which methods are using the most CPU time
- **Thread dumps**: See what each thread is doing (find deadlocks)

```bash
# Run VisualVM
jvisualvm

# Or enable JMX for remote profiling
java -Dcom.sun.management.jmxremote \
     -Dcom.sun.management.jmxremote.port=9090 \
     -Dcom.sun.management.jmxremote.authenticate=false \
     MyApp
```

---

### Common Performance Mistakes and Fixes

#### Mistake 1: String Concatenation in Loops

```java
// BAD — creates a new String object on every iteration! O(n²) memory
String result = "";
for (int i = 0; i < 10000; i++) {
    result += "item-" + i;  // creates a new String each time
}

// GOOD — StringBuilder reuses internal buffer
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 10000; i++) {
    sb.append("item-").append(i);
}
String result = sb.toString();
```

The `+` operator on Strings creates a new `String` object every time. In a loop, this creates thousands of temporary objects and puts huge pressure on the GC.

---

#### Mistake 2: Unnecessary Autoboxing

```java
// BAD — autoboxes int → Integer on every iteration
Long sum = 0L;  // Long (wrapper) instead of long (primitive)
for (int i = 0; i < 1_000_000; i++) {
    sum += i;  // each += creates a new Long object!
}

// GOOD — use primitives for calculations
long sum = 0L;
for (int i = 0; i < 1_000_000; i++) {
    sum += i;  // no boxing, just primitive math
}
```

Autoboxing (int ↔ Integer, long ↔ Long, etc.) creates wrapper objects on the Heap. In tight loops, this generates millions of short-lived objects.

---

#### Mistake 3: String Interning

The JVM has a **String Pool** — a cache of string literals. String interning ensures that identical string values share one object in memory.

```java
// String literals automatically go to the pool
String s1 = "hello";
String s2 = "hello";
System.out.println(s1 == s2);  // true — same object from pool

// new String() bypasses the pool
String s3 = new String("hello");
System.out.println(s1 == s3);  // false — different objects

// intern() puts it back in the pool
String s4 = new String("hello").intern();
System.out.println(s1 == s4);  // true — now using pool version

// Use case: intern when you have many duplicate strings (e.g., country codes)
String country = getUserCountry().intern(); // saves memory if many duplicates
```

---

#### Mistake 4: Creating Objects Inside Loops Unnecessarily

```java
// BAD — creates a new Random object on every call
public int getRandom() {
    return new Random().nextInt(100);  // wasteful!
}

// GOOD — create once, reuse
private final Random random = new Random();
public int getRandom() {
    return random.nextInt(100);
}

// BAD — creates Pattern object on every call to matches()
if (email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) { ... }

// GOOD — compile Pattern once
private static final Pattern EMAIL_PATTERN =
    Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");

if (EMAIL_PATTERN.matcher(email).matches()) { ... }
```

---

#### Mistake 5: Not Sizing Collections

```java
// BAD — ArrayList starts with capacity 10, resizes many times
List<String> list = new ArrayList<>();
for (int i = 0; i < 100_000; i++) {
    list.add("item-" + i);  // many resize operations!
}

// GOOD — preallocate capacity if you know the size
List<String> list = new ArrayList<>(100_000);
for (int i = 0; i < 100_000; i++) {
    list.add("item-" + i);  // no resizing!
}
```

---

## Real-World Analogy

JVM performance tuning is like setting up a new office:
- **`-Xms`/`-Xmx`** are like booking office space: book too little and you overflow; book too much and you waste rent. Setting them equal is like a fixed lease — no surprise mid-year expansions.
- **Memory leaks** are like employees who never throw away their mail — their desk fills up until there's no room to work.
- **Autoboxing in loops** is like wrapping every sheet of paper in a box, using the box once, and throwing it away. Efficient people just pass the papers directly.
- **VisualVM** is like a building manager who can show you exactly which office is overflowing and who's been hoarding.

---

## Code Example

```java
import java.util.*;

public class PerformanceDemo {

    // Performance comparison: String + vs StringBuilder
    public static void stringConcatComparison() {
        int iterations = 50_000;

        // BAD: String concatenation
        long start = System.currentTimeMillis();
        String badResult = "";
        for (int i = 0; i < iterations; i++) {
            badResult += i;
        }
        long badTime = System.currentTimeMillis() - start;

        // GOOD: StringBuilder
        start = System.currentTimeMillis();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < iterations; i++) {
            sb.append(i);
        }
        String goodResult = sb.toString();
        long goodTime = System.currentTimeMillis() - start;

        System.out.println("String +: " + badTime + "ms");
        System.out.println("StringBuilder: " + goodTime + "ms");
        System.out.println("StringBuilder is ~" + (badTime / Math.max(goodTime, 1)) + "x faster");
    }

    // BAD autoboxing example
    public static long autoboxingBad() {
        Long sum = 0L; // Long object, not long primitive!
        for (int i = 0; i < 1_000_000; i++) {
            sum += i; // creates a new Long object each time!
        }
        return sum;
    }

    // GOOD primitive example
    public static long primitiveGood() {
        long sum = 0L; // primitive long, no boxing
        for (int i = 0; i < 1_000_000; i++) {
            sum += i;
        }
        return sum;
    }

    public static void autoboxingComparison() {
        long start = System.currentTimeMillis();
        long r1 = autoboxingBad();
        long badTime = System.currentTimeMillis() - start;

        start = System.currentTimeMillis();
        long r2 = primitiveGood();
        long goodTime = System.currentTimeMillis() - start;

        System.out.println("Autoboxing (Long): " + badTime + "ms, result: " + r1);
        System.out.println("Primitive (long): " + goodTime + "ms, result: " + r2);
    }

    public static void main(String[] args) {
        System.out.println("=== String Concatenation ===");
        stringConcatComparison();

        System.out.println("\n=== Autoboxing vs Primitive ===");
        autoboxingComparison();
    }
}
```

### Output (approximate — varies by machine)
```
=== String Concatenation ===
String +: 4821ms
StringBuilder: 5ms
StringBuilder is ~964x faster

=== Autoboxing vs Primitive ===
Autoboxing (Long): 45ms, result: 499999500000
Primitive (long): 3ms, result: 499999500000
```

---

## Common Mistakes

- ❌ **Mistake**: Setting `-Xmx` very high "just in case" → ✅ **Fix**: Size your heap based on actual profiling. An oversized heap means longer GC scan times and more wasted memory.
- ❌ **Mistake**: Ignoring `OutOfMemoryError` types — not all OOM errors mean heap is full → ✅ **Fix**: Read the full message: `Java heap space` = heap full; `Metaspace` = class metadata full; `unable to create new native thread` = too many threads.
- ❌ **Mistake**: Using `String +=` in any loop → ✅ **Fix**: Always use `StringBuilder` in loops.
- ❌ **Mistake**: Using wrapper types (Integer, Long) for simple arithmetic variables → ✅ **Fix**: Use primitives (int, long) for arithmetic; wrappers only when needed (collections, generics, nullable).

---

## Best Practices

- Set `-Xms` = `-Xmx` in production to avoid heap resizing.
- Always use `StringBuilder` for string building in loops.
- Use primitives over wrapper types in computational code.
- Pre-size collections when you know the expected size.
- Always use `try-with-resources` for connections, streams, and other resources.
- Use `-XX:+HeapDumpOnOutOfMemoryError` in production to capture memory snapshots.
- Profile before optimizing — don't guess; measure with VisualVM or JFR.

---

## Interview Questions

**Q: What is the difference between `-Xms` and `-Xmx`?**  
A: `-Xms` sets the initial heap size — how much memory the JVM requests from the OS when it starts. `-Xmx` sets the maximum heap size — the JVM will never exceed this. Setting `-Xms` equal to `-Xmx` prevents heap resizing overhead at runtime, which is recommended for production servers.

**Q: What causes a Java memory leak and how do you detect it?**  
A: Java memory leaks happen when objects are still reachable from GC roots but are no longer needed. Common causes: objects stored in static collections that are never removed, unclosed resources, event listeners never unregistered, inner classes holding outer class references. Detection: enable `-XX:+HeapDumpOnOutOfMemoryError`, then analyze the heap dump with Eclipse MAT or VisualVM to find objects occupying disproportionate memory.

**Q: Why is `String +=` in a loop bad? What should you use?**  
A: Each `+=` on a String creates a new `String` object because Strings are immutable in Java. In a loop with N iterations, this creates O(N) String objects and copies O(N²) characters total. Use `StringBuilder.append()` instead — it maintains an internal mutable buffer and creates only one final String object, making it O(N) overall.

**Q: What is autoboxing and why can it cause performance problems?**  
A: Autoboxing is the automatic conversion between Java primitives (int, long, etc.) and their wrapper types (Integer, Long, etc.). The problem occurs in tight loops: `Long sum = 0L; sum += i;` creates a new `Long` object on every iteration because `Long` is immutable. With a million iterations, you create a million temporary objects. Fix: use the primitive type `long sum = 0L;`.

---

## Quick Revision

✔ `-Xms` = initial heap; `-Xmx` = max heap; `-Xss` = per-thread stack size  
✔ Set `-Xms` = `-Xmx` in production to avoid heap resizing  
✔ Memory leaks in Java: objects still referenced but never needed again  
✔ Common leak causes: static collections, unclosed resources, unremoved listeners  
✔ Use `StringBuilder` in loops — never `String +=`  
✔ Use primitives (int, long) not wrappers (Integer, Long) for arithmetic  
✔ Pre-size collections, reuse expensive objects, compile Patterns once  

---

## Related Topics

- GC Algorithms (Lesson 5)
- Garbage Collection Basics (Lesson 4)
- String and StringBuilder

---

## Next Lesson

**Phase 7, Lesson 1 — Introduction to Design Patterns**
