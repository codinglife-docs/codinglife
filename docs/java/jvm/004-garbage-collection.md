---
id: garbage-collection
title: Garbage Collection in Java
description: Learn how Java's Garbage Collector automatically frees memory, what makes objects eligible for GC, how mark-and-sweep works, and generational GC with Young, Old, and Metaspace regions.
sidebar_position: 4
keywords:
  - Java
  - Garbage Collection
  - GC
  - Mark and Sweep
  - Generational GC
  - Eden Space
  - JVM Memory
---

# Garbage Collection in Java

> **Reading Time:** 12 Minutes  
> **Difficulty:** Intermediate

---

## Topic Summary

Garbage Collection (GC) is Java's automatic memory management system. Instead of manually freeing memory like in C/C++, Java's GC automatically finds objects that are no longer used and reclaims their memory. Understanding how GC works helps you write memory-efficient code and avoid memory leaks.

---

## What You'll Learn

- What makes an object eligible for garbage collection
- How GC roots work and how the GC traces live objects
- The Mark-and-Sweep algorithm explained simply
- Generational GC: Young Generation (Eden + Survivors), Old Generation, Metaspace

---

## Prerequisites

- JVM Architecture (Lesson 1)
- JVM Memory Areas (Lesson 3)
- Basic understanding of Java objects and references

---

## Explanation

### What is Garbage Collection?

In languages like C and C++, programmers must manually allocate memory (`malloc`) and free it (`free`). Forgetting to free memory causes **memory leaks** — your program uses more and more memory until it crashes.

Java solves this automatically. The **Garbage Collector (GC)** runs in the background, identifies objects that are no longer reachable by your program, and frees their memory. You never call `free()` in Java.

```
Object is created  →  Object is used  →  Object becomes unreachable  →  GC frees memory
     (new Foo())              ...             (no references left)         (automatically)
```

---

### When is an Object Eligible for GC?

An object becomes eligible for garbage collection when it is **no longer reachable** from any live thread. This means no variable, field, or data structure in your running program holds a reference to it.

```java
public class GCDemo {
    public static void main(String[] args) {

        // Object created — NOT eligible for GC (referenced by 'obj')
        Object obj = new Object();

        // Now obj points elsewhere — original object has no references
        obj = null;  // original Object is NOW eligible for GC

        // Another example:
        StringBuilder sb = new StringBuilder("hello");
        StringBuilder sb2 = sb;  // two references to same object
        sb = null;               // still NOT eligible (sb2 still points to it)
        sb2 = null;              // NOW eligible (no references left)

        System.out.println("Objects are eligible for GC now");
    }
}
```

**Cases that make an object eligible:**
1. Reference set to `null`
2. Reference goes out of scope (method ends)
3. Object only referenced by other eligible objects (island of isolation)
4. Re-assigning the reference variable to a different object

---

### GC Roots — Where Tracing Begins

The GC doesn't start from nothing. It starts from **GC Roots** — known starting points that are always considered "live". Any object reachable from a GC root (directly or through a chain of references) is considered alive and will NOT be collected.

**GC Roots are:**
- Local variables in active method Stack Frames
- Static variables in loaded classes
- Active threads themselves
- JNI references (native code references)
- Objects in synchronized monitors

```
GC Root (local variable 'list')
    ↓
ArrayList object (alive — reachable)
    ↓
String "Hello" (alive — reachable through list)

(Some other object with no path to any GC Root) ← ELIGIBLE FOR GC
```

---

### The Mark-and-Sweep Algorithm

The basic GC algorithm used (in various enhanced forms) is **Mark-and-Sweep**. It runs in two phases:

#### Phase 1: Mark
Starting from all GC Roots, the GC traverses every reference chain and **marks** every reachable object as "alive".

```
GC Root → Object A (MARKED) → Object B (MARKED) → Object C (MARKED)
                            ↘ Object D (MARKED)

Object E (not reachable — NOT marked) ← will be swept
Object F (not reachable — NOT marked) ← will be swept
```

#### Phase 2: Sweep
All objects that were NOT marked are unreachable — the GC **sweeps** (frees) their memory.

```
Before sweep: [A][B][C][D][E][F]   (E, F are unmarked)
After sweep:  [A][B][C][D][  ][  ] (memory freed)
```

Modern GCs also include a **Compact** phase to eliminate memory fragmentation:
```
After compact: [A][B][C][D]         (objects moved together)
```

---

### `System.gc()` — A Request, Not a Command

You can ask the GC to run with `System.gc()`, but the JVM is **not obligated** to honor it immediately (or at all).

```java
// This is a SUGGESTION, not a guaranteed invocation
System.gc();

// Better: just let the JVM decide when to GC
// Don't call System.gc() in production code
```

Why not call it? GC pauses stop your application threads ("Stop-the-World"). Calling it at the wrong time can degrade performance significantly.

---

### `finalize()` — Deprecated and Dangerous

Before Java 9, you could override `finalize()` to run cleanup code before an object was GC'd. This is now **deprecated** (removed in Java 18) because:
- Timing is unpredictable (no guarantee when finalize runs)
- Objects can be "resurrected" in finalize (putting themselves back in scope!)
- It causes performance problems and delays GC

```java
// DON'T do this (deprecated since Java 9)
@Override
protected void finalize() throws Throwable {
    System.out.println("About to be GC'd");
    super.finalize();
}

// DO this instead — use try-with-resources or explicit close()
try (MyResource resource = new MyResource()) {
    resource.use();
} // resource.close() called automatically
```

---

### Generational Garbage Collection

Modern JVMs use **Generational GC** — a strategy based on the observation:

> **Most objects die young.** A temporary object created in a loop is likely unreachable within milliseconds, while a configuration object created at startup may live for hours.

So the Heap is divided into **generations** to collect short-lived objects quickly without scanning the whole heap every time.

```
┌────────────────────────────────────────────────────────────────┐
│                         HEAP                                   │
│                                                                │
│  ┌────────────────────────────────┐  ┌───────────────────────┐│
│  │      Young Generation          │  │   Old Generation       ││
│  │                                │  │   (Tenured Space)      ││
│  │  ┌──────────┐  ┌────┐ ┌────┐  │  │                       ││
│  │  │  Eden    │  │ S0 │ │ S1 │  │  │  Long-lived objects    ││
│  │  │  Space   │  │    │ │    │  │  │  promoted from Young   ││
│  │  │          │  │    │ │    │  │  │                       ││
│  │  │ New objs │  │ Sur│ │ Sur│  │  │  GC: Major / Full GC   ││
│  │  │ born here│  │ 0  │ │ 1  │  │  │  (infrequent, slow)   ││
│  │  └──────────┘  └────┘ └────┘  │  │                       ││
│  │  GC: Minor GC (fast, frequent) │  │                       ││
│  └────────────────────────────────┘  └───────────────────────┘│
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Metaspace (not part of Heap — native memory)            │ │
│  │  Stores: Class metadata, method bytecode                 │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

#### Young Generation — Where Objects Are Born

**Eden Space**: All new objects are allocated here.

When Eden fills up, a **Minor GC** runs:
1. GC marks all live objects in Eden and Survivor spaces
2. Live objects are copied to one Survivor space (e.g., S0)
3. Eden is completely cleared (very fast!)
4. Objects that survive many GC cycles get **promoted** to Old Generation

**Survivor Spaces (S0 and S1)**:
- Two survivor spaces exist; at any time, one is active and one is empty.
- Surviving objects bounce between S0 and S1 on each Minor GC.
- An object's "age" increments each time it survives.
- When age reaches the **tenuring threshold** (default: 15), the object is promoted to Old Generation.

```
New object → Eden
Eden full? → Minor GC → live objects copied to S0
Next Minor GC → S0 survivors copied to S1 (age++)
Next Minor GC → S1 survivors copied to S0 (age++)
... age reaches 15 → promoted to Old Generation
```

#### Old Generation (Tenured Space)

Holds long-lived objects that have survived many Minor GCs. Collected by a **Major GC** (or Full GC), which is less frequent but takes longer. A full GC collects both Young and Old generations.

#### Metaspace (Java 8+)

Not technically part of the Heap. Stores class metadata. Collected when classes are unloaded (e.g., when a ClassLoader is GC'd). Grows dynamically in native memory.

---

## Real-World Analogy

Think of the Heap like a **hotel**:
- **Eden** is the check-in desk — most guests (objects) check in here.
- **Survivor spaces** are short-stay rooms — guests who stay a day or two move here.
- **Old Generation** is the long-term suites — guests who've been there for months live here.
- The hotel **housekeeper** (GC) checks all rooms regularly (Minor GC for short-stay, Major GC for long-term) and cleans out rooms where guests have already left (no references).

---

## Code Example

```java
public class GCEligibilityDemo {

    public static void main(String[] args) {
        // --- Example 1: Null reference ---
        Object obj = new Object();
        obj = null; // eligible for GC

        // --- Example 2: Out of scope ---
        {
            String temp = new String("Temporary");
            // temp used here
        }
        // temp is out of scope — the String object is eligible for GC

        // --- Example 3: Island of Isolation ---
        Node a = new Node("A");
        Node b = new Node("B");
        a.next = b;
        b.next = a;  // circular reference

        // Now remove all external references
        a = null;
        b = null;
        // Both nodes reference each other but neither is reachable
        // from any GC root — both are eligible for GC!

        // --- Example 4: Watching object creation pressure ---
        System.out.println("Creating many short-lived objects...");
        for (int i = 0; i < 1_000_000; i++) {
            // These String objects die immediately after loop body
            String s = "Object-" + i;
            // s goes out of scope — eligible for GC next iteration
        }
        System.out.println("Done! GC handled cleanup automatically.");
    }

    static class Node {
        String value;
        Node next;
        Node(String value) { this.value = value; }
    }
}
```

### Output
```
Creating many short-lived objects...
Done! GC handled cleanup automatically.
```

---

## Common Mistakes

- ❌ **Mistake**: Calling `System.gc()` frequently in production code → ✅ **Fix**: Let the JVM manage GC timing. Manual calls can cause unnecessary Stop-the-World pauses.
- ❌ **Mistake**: Relying on `finalize()` for resource cleanup → ✅ **Fix**: Use `try-with-resources` and implement `AutoCloseable`/`Closeable` for deterministic cleanup.
- ❌ **Mistake**: Thinking circular references cause memory leaks in Java → ✅ **Fix**: Java's GC handles circular references. It leaks only when objects are still reachable from GC roots (e.g., stored in a static collection that's never cleared).
- ❌ **Mistake**: Keeping references in static collections forever → ✅ **Fix**: Use `WeakReference` or `WeakHashMap` for caches, so GC can reclaim objects when memory is needed.

---

## Best Practices

- Nullify references you no longer need only if they are long-lived (e.g., fields in long-running objects). For local variables, going out of scope is sufficient.
- Avoid memory leaks by removing objects from static collections when done.
- Use `WeakReference` or `SoftReference` for cache implementations.
- Monitor GC behavior with `-verbose:gc` or GC logging flags to understand your application's GC behavior.
- Prefer object pooling (e.g., connection pools) for expensive objects rather than creating and discarding them repeatedly.

---

## Interview Questions

**Q: How does the Garbage Collector determine which objects to collect?**  
A: The GC starts from GC Roots (active threads, local variables, static variables, JNI references) and traverses all object references. Objects reachable from GC roots are "live" and kept. Objects not reachable from any GC root are eligible for collection. This is called reachability analysis.

**Q: What is the difference between Minor GC and Major GC?**  
A: Minor GC collects the Young Generation (Eden + Survivor spaces). It's fast and frequent because most objects die young. Major GC (or Full GC) collects the Old Generation (and possibly Young Generation too). It's slower and less frequent. A Full GC is the most expensive — it stops all application threads and collects the entire heap.

**Q: What is an "island of isolation" in Java GC?**  
A: An island of isolation is a group of objects that reference each other in a cycle, but none of them are referenced from any GC root. Even though they reference each other, they are all unreachable from the program, so they are all eligible for GC. Java's GC correctly handles this — unlike reference-counting GCs.

**Q: Why is `finalize()` deprecated?**  
A: `finalize()` has several problems: (1) No guarantee on when or if it runs; (2) Objects can "resurrect" themselves during finalization; (3) It causes GC overhead — finalizable objects require two GC cycles to be collected; (4) Exceptions in `finalize()` are silently ignored. Use `try-with-resources` and `AutoCloseable` instead.

---

## Quick Revision

✔ GC automatically frees memory for objects no longer reachable from GC Roots  
✔ An object is eligible when no live code holds a reference to it  
✔ Mark-and-Sweep: mark all reachable objects, then sweep (free) the unmarked ones  
✔ Young Generation (Eden + S0 + S1) → Minor GC (fast, frequent)  
✔ Old Generation → Major GC (slow, infrequent)  
✔ `System.gc()` is a suggestion; `finalize()` is deprecated — avoid both  

---

## Related Topics

- GC Algorithms (Lesson 5)
- JVM Performance Tuning (Lesson 6)
- JVM Memory Areas (Lesson 3)

---

## Next Lesson

**Lesson 5 — GC Algorithms: Serial, Parallel, G1, ZGC, and Shenandoah**
