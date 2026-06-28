---
id: memory-areas
title: JVM Memory Areas
description: Deep dive into the five JVM runtime data areas — Heap, Stack, Method Area, PC Register, and Native Method Stack — and what gets stored where.
sidebar_position: 3
keywords:
  - Java
  - JVM Memory
  - Heap
  - Stack
  - Method Area
  - Java Memory Model
---

# JVM Memory Areas

> **Reading Time:** 10 Minutes  
> **Difficulty:** Intermediate

---

## Topic Summary

The JVM divides its memory into five distinct areas, each with a specific purpose. Understanding where different data lives — objects on the Heap, method calls on the Stack, class metadata in the Method Area — is essential for writing efficient Java code and debugging memory problems.

---

## What You'll Learn

- The five runtime data areas of the JVM
- What exactly gets stored in each area
- Which areas are shared between threads and which are private
- How the Stack and Heap interact during method calls

---

## Prerequisites

- JVM Architecture (Lesson 1)
- ClassLoader (Lesson 2)
- Basic understanding of Java classes, methods, and objects

---

## Explanation

### Overview: The Five Memory Areas

```
┌─────────────────────────────────────────────────────────────────┐
│                    JVM Runtime Data Areas                       │
│                                                                 │
│  ┌───────────────────────┐  ┌──────────────────────────────┐   │
│  │      Method Area      │  │            Heap              │   │
│  │  (shared — all threads)│  │  (shared — all threads)      │   │
│  │                       │  │                              │   │
│  │ - Class metadata      │  │  - All objects (new Foo())   │   │
│  │ - Static variables    │  │  - Instance variables        │   │
│  │ - Method bytecode     │  │  - Arrays                    │   │
│  │ - Runtime constant    │  │                              │   │
│  │   pool                │  │  Young Gen: Eden, S0, S1     │   │
│  └───────────────────────┘  │  Old Gen (Tenured)           │   │
│                              └──────────────────────────────┘   │
│                                                                 │
│  ─────────────── Per Thread (private) ───────────────────────  │
│                                                                 │
│  Thread 1:  ┌──────────┐ ┌────────────┐ ┌──────────────────┐  │
│             │  Stack   │ │ PC Register│ │Native Method Stack│  │
│             │          │ │            │ │                  │  │
│             │ Frame 1  │ │ curr instr │ │  C/C++ calls     │  │
│             │ Frame 2  │ │ address    │ │                  │  │
│             └──────────┘ └────────────┘ └──────────────────┘  │
│                                                                 │
│  Thread 2:  ┌──────────┐ ┌────────────┐ ┌──────────────────┐  │
│             │  Stack   │ │ PC Register│ │Native Method Stack│  │
│             └──────────┘ └────────────┘ └──────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

### Area 1: Method Area (Metaspace)

**Shared between all threads.**

The Method Area stores information about **loaded classes** — not instances, but the class blueprints themselves.

What's stored here:
- **Class metadata**: class name, superclass, interfaces, access modifiers
- **Method bytecode**: the actual compiled instructions for every method
- **Static variables**: variables declared with `static` keyword
- **Runtime Constant Pool**: symbolic references, string literals, numeric constants

```java
public class Employee {
    // ↓ stored in Method Area (static variable)
    static int totalEmployees = 0;

    // ↓ method bytecode stored in Method Area
    public void work() {
        System.out.println("Working...");
    }
}
```

> **Note on Metaspace (Java 8+):** Before Java 8, the Method Area was called **PermGen (Permanent Generation)** and had a fixed size, causing the infamous `OutOfMemoryError: PermGen space`. In Java 8+, it was replaced by **Metaspace**, which grows dynamically in native memory (outside the heap), avoiding this issue.

---

### Area 2: Heap

**Shared between all threads.**

The Heap is where **all Java objects live**. When you write `new SomeClass()`, the object is created in the Heap. This is the largest memory area and the one managed by Garbage Collection.

What's stored here:
- All object instances
- Instance variables (fields belonging to objects)
- Arrays (even arrays of primitives)

```java
public class HeapDemo {
    int instanceVar = 42;  // stored in Heap (part of the object)

    public static void main(String[] args) {
        // Both objects go into the Heap
        HeapDemo obj1 = new HeapDemo();   // object in Heap
        int[] arr = new int[]{1, 2, 3};  // array in Heap
    }
}
```

The Heap is divided into **generations** for efficient Garbage Collection:
```
Heap:
├── Young Generation
│   ├── Eden Space      (new objects born here)
│   ├── Survivor 0 (S0)
│   └── Survivor 1 (S1)
└── Old Generation (Tenured)
    └── (long-lived objects promoted here)
```

We'll cover this in detail in Garbage Collection lessons.

---

### Area 3: Stack (Java Virtual Machine Stack)

**Private — one Stack per thread.**

The Stack stores **method call information**. Every time a method is called, a new **Stack Frame** is pushed onto the stack. When the method returns, its frame is popped.

Each Stack Frame contains:
- **Local variables**: all variables declared inside the method (including method parameters)
- **Operand stack**: used for intermediate calculations
- **Reference to the constant pool**: for resolving symbolic references

```java
public class StackDemo {
    public static void main(String[] args) {
        // Frame for main() is pushed onto the Stack
        int a = 5;        // local variable — stored in main's Stack Frame
        int b = 10;       // local variable — stored in main's Stack Frame
        int result = add(a, b);  // add() frame pushed on top
        System.out.println(result);
        // main() frame is popped when main() returns
    }

    public static int add(int x, int y) {
        // Frame for add() is pushed on the Stack
        int sum = x + y;  // local variable — stored in add's Stack Frame
        return sum;
        // add() frame is popped when it returns
    }
}
```

Stack memory is much faster than Heap because allocation/deallocation is just a pointer increment/decrement. But it has limited size.

> ⚠️ **StackOverflowError** happens when the stack runs out of space — usually from infinite or very deep recursion.

---

### Area 4: PC Register (Program Counter Register)

**Private — one per thread.**

The PC Register holds the **memory address of the current instruction** being executed by that thread. Think of it as a bookmark — it tells the JVM "this thread is currently at this bytecode instruction."

- When a method is executing, the PC Register holds the address of the current bytecode instruction.
- When a native method is executing, the PC Register value is undefined.

This is how the JVM can pause a thread, switch to another, then resume the first one right where it left off — the PC Register remembers the exact position.

---

### Area 5: Native Method Stack

**Private — one per thread.**

Similar to the JVM Stack, but used specifically for **native (C/C++) method calls** invoked via JNI (Java Native Interface).

When a Java method calls a native method, the native method's execution context (like its own stack frame) is tracked here instead of in the JVM Stack.

---

### Stack vs Heap: The Key Differences

| Feature | Stack | Heap |
|---|---|---|
| What's stored | Local variables, method frames | Objects, arrays, instance vars |
| Thread safety | Thread-private (inherently safe) | Shared (needs synchronization) |
| Size | Small (typically 256KB–1MB) | Large (up to -Xmx limit) |
| Allocation speed | Very fast (pointer move) | Slower (GC overhead) |
| Lifetime | Method scope | Until GC collects it |
| Error when full | `StackOverflowError` | `OutOfMemoryError` |
| Managed by | JVM automatically | Garbage Collector |

---

### What Goes Where? — Complete Picture

```java
public class WhatGoesWhere {

    // 1. Static variable → METHOD AREA
    static String companyName = "TechCorp";

    // 2. Instance variable → HEAP (part of the object)
    String employeeName;

    public static void main(String[] args) {
        // 3. Local variable (primitive) → STACK
        int salary = 50000;

        // 4. Object reference → STACK (the reference 'emp')
        // 5. The actual object → HEAP
        WhatGoesWhere emp = new WhatGoesWhere();

        // 6. String literal → STRING POOL (part of Heap in Java 8+)
        String dept = "Engineering";

        // 7. new String → HEAP (not the pool)
        String dept2 = new String("Engineering");

        emp.employeeName = "Alice";  // modifies object on Heap
    }
}
```

---

## Real-World Analogy

Think of the JVM memory like an **office building**:
- The **Method Area** is the **company handbook** — class blueprints and rules shared by everyone.
- The **Heap** is the **office floor** — where all the actual work items (objects) are stored, shared among all workers.
- The **Stack** is each employee's **personal desk** — their current task, papers (local variables), and call notes. Each employee (thread) has their own desk.
- The **PC Register** is the **bookmark** in the document each employee is currently reading.

---

## Code Example

```java
public class MemoryAreaDemo {

    // Static variable — stored in Method Area
    static int objectCount = 0;

    // Instance variable — stored in Heap (as part of object)
    String name;
    int id;

    public MemoryAreaDemo(String name) {
        this.name = name;
        objectCount++;    // modifies Method Area data
        this.id = objectCount; // modifies Heap data
    }

    public String getInfo() {
        // Local variables — stored in Stack Frame
        String prefix = "Employee #";  // reference on Stack, String in Heap
        int tempId = this.id;          // primitive copy on Stack
        return prefix + tempId + ": " + this.name;
    }

    public static void main(String[] args) {
        // References on Stack, objects on Heap
        MemoryAreaDemo emp1 = new MemoryAreaDemo("Alice");
        MemoryAreaDemo emp2 = new MemoryAreaDemo("Bob");
        MemoryAreaDemo emp3 = new MemoryAreaDemo("Charlie");

        System.out.println(emp1.getInfo());
        System.out.println(emp2.getInfo());
        System.out.println(emp3.getInfo());

        // Static variable — accessed from Method Area
        System.out.println("Total objects: " + objectCount);
    }
}
```

### Output
```
Employee #1: Alice
Employee #2: Bob
Employee #3: Charlie
Total objects: 3
```

---

## Common Mistakes

- ❌ **Mistake**: Thinking local variables (primitives) are stored on the Heap → ✅ **Fix**: Primitive local variables are stored on the Stack. Only objects and arrays go on the Heap.
- ❌ **Mistake**: Confusing static variables with instance variables storage → ✅ **Fix**: Static variables live in the Method Area; instance variables live in the Heap as part of the object.
- ❌ **Mistake**: Thinking each object has its own copy of method bytecode → ✅ **Fix**: Method bytecode is stored once in the Method Area, shared by all instances.
- ❌ **Mistake**: Assuming the Stack is unlimited → ✅ **Fix**: Each thread has a limited Stack size (configurable with `-Xss`). Deep recursion causes `StackOverflowError`.

---

## Best Practices

- Minimize object creation in tight loops — every `new` goes to the Heap and adds GC pressure.
- Prefer primitive types over wrapper types for local variables where performance matters.
- Use `-Xss` to increase Stack size only when dealing with deep recursion, not as a default.
- Be careful with static variables — they live in the Method Area for the entire application lifetime, which can be a memory leak if they hold references to objects.

---

## Interview Questions

**Q: What is stored in the JVM Stack vs the Heap?**  
A: The Stack stores method call frames, which contain local variables (including references to objects) and intermediate calculation values. It is private to each thread. The Heap stores all object instances and arrays — it's shared among all threads. The reference variable (pointer) lives on the Stack, while the actual object lives on the Heap.

**Q: What is the difference between PermGen and Metaspace?**  
A: PermGen (Permanent Generation) was the old Method Area in Java 7 and below. It had a fixed maximum size, causing `OutOfMemoryError: PermGen space` when too many classes were loaded. Java 8 replaced it with Metaspace, which stores class metadata in native memory and grows dynamically, eliminating this issue. You can still set a max with `-XX:MaxMetaspaceSize`.

**Q: What error occurs when the Stack is full? When the Heap is full?**  
A: A full Stack causes `java.lang.StackOverflowError`, typically from infinite or very deep recursion. A full Heap causes `java.lang.OutOfMemoryError: Java heap space`, typically from creating too many objects or memory leaks.

**Q: Are static variables stored on the Heap?**  
A: No. Static variables are stored in the Method Area (Metaspace in Java 8+). However, if a static variable holds a reference to an object, that referenced object lives on the Heap.

---

## Quick Revision

✔ **Method Area** — class metadata, static variables, method bytecode (shared, permanent-ish)  
✔ **Heap** — all objects and arrays (shared, GC-managed)  
✔ **Stack** — method frames with local variables (per-thread, fast)  
✔ **PC Register** — current instruction address (per-thread)  
✔ **Native Method Stack** — tracks native C/C++ method calls (per-thread)  
✔ Stack overflow → `StackOverflowError`; Heap overflow → `OutOfMemoryError`  

---

## Related Topics

- Garbage Collection (Lesson 4)
- GC Algorithms (Lesson 5)
- JVM Performance Tuning (Lesson 6)

---

## Next Lesson

**Lesson 4 — Garbage Collection: How Java Frees Memory Automatically**
