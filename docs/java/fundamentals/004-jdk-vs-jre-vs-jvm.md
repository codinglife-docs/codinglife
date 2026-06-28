---
id: jdk-vs-jre-vs-jvm
title: JDK vs JRE vs JVM
description: Understand the difference between JDK, JRE, and JVM in Java — what each one does, how they relate, and when you need each one. Explained with simple analogies.
sidebar_position: 4
keywords:
  - Java
  - JDK
  - JRE
  - JVM
  - Java Virtual Machine
  - Java Development Kit
---

# JDK vs JRE vs JVM

> **Reading Time:** 7 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

JDK, JRE, and JVM are three key components of the Java ecosystem. Every Java program needs all three to work. Understanding the difference helps you know what to install and how Java programs actually run on your computer.

---

## What You'll Learn

- What JVM is and what it does
- What JRE is and what it contains
- What JDK is and what extras it provides
- How JDK, JRE, and JVM relate to each other
- When you need each one

---

## Prerequisites

- Lesson 001 — What is Java
- Lesson 003 — Features of Java (platform independence concept)

---

## Explanation

### JVM — Java Virtual Machine

The **JVM (Java Virtual Machine)** is the most fundamental piece. It is a **virtual computer** inside your real computer. Its job is to:

1. **Load** the compiled Java bytecode (`.class` files)
2. **Verify** the bytecode is safe to run
3. **Execute** the bytecode — running your Java program
4. **Manage memory** — garbage collection happens here

The JVM is what makes Java platform independent. Each operating system has its OWN version of JVM (Windows JVM, Mac JVM, Linux JVM), but they all understand the same bytecode. So you write once, the JVM runs it everywhere.

**Key point**: The JVM does NOT understand Java source code (`.java` files). It only understands **bytecode** (`.class` files).

#### What's inside JVM?
- **Class Loader** — loads your `.class` files into memory
- **Bytecode Verifier** — checks the code is valid and safe
- **Interpreter** — executes bytecode instructions
- **JIT Compiler** — compiles hot bytecode to native machine code for speed
- **Garbage Collector** — frees unused memory automatically

---

### JRE — Java Runtime Environment

The **JRE (Java Runtime Environment)** is everything you need to **RUN** a Java program. It contains:

- ✅ The **JVM** (to execute bytecode)
- ✅ **Java standard libraries** (pre-written classes like String, Math, ArrayList)
- ✅ Supporting files and configuration

**If you just want to RUN Java programs (not write them)**, you install the JRE. For example, a user who just wants to play a Java game — they need JRE, not JDK.

> **Note**: Since Java 11, Oracle no longer ships a standalone JRE download. The JDK includes the JRE functionality. For Java 11+, just install the JDK.

---

### JDK — Java Development Kit

The **JDK (Java Development Kit)** is everything you need to **WRITE, COMPILE, AND RUN** Java programs. It contains:

- ✅ Everything in **JRE** (which includes JVM)
- ✅ **javac** — the Java compiler (turns `.java` → `.class`)
- ✅ **javadoc** — generates documentation from comments
- ✅ **jar** — creates JAR archive files
- ✅ **jdb** — Java debugger
- ✅ **jshell** — interactive Java REPL (since Java 9)
- ✅ Other development tools

**If you want to WRITE Java programs**, you need the JDK. Always install JDK as a developer.

---

### The Relationship — Nested Like Boxes

```
┌─────────────────────────────────────────┐
│              JDK                        │
│  (Java Development Kit)                 │
│                                         │
│   javac, javadoc, jar, jdb, jshell...   │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │            JRE                    │  │
│  │  (Java Runtime Environment)       │  │
│  │                                   │  │
│  │   Java Standard Libraries         │  │
│  │   (java.lang, java.util, etc.)    │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │          JVM                │  │  │
│  │  │  (Java Virtual Machine)     │  │  │
│  │  │                             │  │  │
│  │  │  Class Loader               │  │  │
│  │  │  Bytecode Verifier          │  │  │
│  │  │  Interpreter + JIT          │  │  │
│  │  │  Garbage Collector          │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

Think of it as **nested Russian dolls** — JVM is inside JRE, JRE is inside JDK.

---

### Quick Comparison Table

| | JVM | JRE | JDK |
|--|-----|-----|-----|
| **Full Name** | Java Virtual Machine | Java Runtime Environment | Java Development Kit |
| **Purpose** | Execute bytecode | Run Java programs | Develop Java programs |
| **Contains** | Interpreter, JIT, GC | JVM + Libraries | JRE + javac + tools |
| **Who needs it?** | (part of JRE) | End users | Developers |
| **Can compile Java?** | ❌ No | ❌ No | ✅ Yes |
| **Can run Java?** | ✅ Yes | ✅ Yes | ✅ Yes |

---

### How They Work Together

When you write and run a Java program:

```
Step 1: You write HelloWorld.java
Step 2: JDK's javac compiles it → HelloWorld.class (bytecode)
Step 3: JRE's class loader loads HelloWorld.class
Step 4: JVM executes the bytecode → Output appears!
```

---

## Real-World Analogy

Imagine you're in the **film industry**:

- 🎬 **JVM** = The **movie projector**. It knows how to play films (bytecode). But it needs the right film reel format. It can't CREATE films, only show them.

- 🎞️ **JRE** = The **cinema** (projector + screen + seats + sound system). Everything needed to *watch* a movie. Audiences (end users) need this.

- 🎥 **JDK** = The full **film studio** (cinema + cameras + editing tools + scriptwriting software). Directors (developers) need this to CREATE films and show them too.

A moviegoer just needs the cinema (JRE). A filmmaker needs the full studio (JDK).

---

## Code Example

```java
// This program demonstrates what the JDK, JRE, and JVM do

public class JdkJreJvm {
    public static void main(String[] args) {

        // The JDK compiled this file using javac
        // The JRE loaded Java standard libraries like System, String
        // The JVM is executing THIS line right now!

        System.out.println("=== Understanding JDK, JRE, JVM ===\n");

        System.out.println("JVM  → Executes bytecode (this program runs ON the JVM)");
        System.out.println("JRE  → JVM + Standard Libraries (String, System, Math...)");
        System.out.println("JDK  → JRE + javac + javadoc + jar + dev tools");

        // Using JRE's standard library (Math class)
        double result = Math.sqrt(144);
        System.out.println("\nMath.sqrt(144) = " + result);
        // Math is part of JRE's standard library!

        // JVM information at runtime
        System.out.println("\n--- Your JVM Info ---");
        System.out.println("Java Version: " + System.getProperty("java.version"));
        System.out.println("JVM Name: " + System.getProperty("java.vm.name"));
        System.out.println("OS: " + System.getProperty("os.name"));
    }
}
```

### Output
```
=== Understanding JDK, JRE, JVM ===

JVM  → Executes bytecode (this program runs ON the JVM)
JRE  → JVM + Standard Libraries (String, System, Math...)
JDK  → JRE + javac + javadoc + jar + dev tools

Math.sqrt(144) = 12.0

--- Your JVM Info ---
Java Version: 21.0.1
JVM Name: OpenJDK 64-Bit Server VM
OS: Windows 11
```

---

## Common Mistakes

- ❌ **Mistake**: Installing JRE to write Java programs → ✅ **Fix**: Developers always need the **JDK**. JRE alone doesn't include `javac` (the compiler).
- ❌ **Mistake**: Thinking JVM is the same on all platforms → ✅ **Fix**: Each OS has a different JVM *implementation*, but they all execute the same bytecode (that's the magic!).
- ❌ **Mistake**: Confusing bytecode with machine code → ✅ **Fix**: Bytecode is an intermediate format only the JVM understands. Machine code is what your CPU directly executes.

---

## Best Practices

- As a developer, always install the **JDK** — it includes everything
- Use the latest **LTS version** of the JDK (currently JDK 21)
- When deploying an app to a server, you might only need the JRE (or JDK — both work)
- Use `java -version` to check your Java version and `javac -version` to verify the compiler

---

## Interview Questions

**Q: What is the difference between JDK, JRE, and JVM?**  
A: **JVM** (Java Virtual Machine) executes bytecode. **JRE** (Java Runtime Environment) = JVM + standard libraries — needed to run Java programs. **JDK** (Java Development Kit) = JRE + compiler (javac) + dev tools — needed to develop Java programs.

**Q: Is JVM platform dependent or independent?**  
A: The JVM itself is **platform dependent** (there's a Windows JVM, Mac JVM, etc.). But the **bytecode** that runs ON the JVM is platform independent. That's why "Write Once, Run Anywhere" works.

**Q: Can you run Java without JDK?**  
A: Yes — if you only want to *run* (not develop) Java programs, you need only the JRE (which contains the JVM). However, to compile and develop, you need the full JDK.

**Q: What is the JIT compiler?**  
A: JIT (Just-In-Time) compiler is part of the JVM. It monitors which bytecode is executed frequently (hot code) and compiles that to native machine code for faster execution, giving Java near-native performance.

---

## Quick Revision

✔ **JVM** = Java Virtual Machine — executes bytecode, inside JRE  
✔ **JRE** = JVM + standard libraries — runs Java programs  
✔ **JDK** = JRE + javac + dev tools — develops Java programs  
✔ JVM is **platform dependent**, bytecode is **platform independent**  
✔ Developers install **JDK**; end users (historically) needed **JRE**  
✔ JDK 11+ bundles everything — just install the JDK  

---

## Related Topics

- Java Program Execution Flow (Lesson 005)
- Installing Java (Lesson 006)
- Features of Java — Platform Independence (Lesson 003)

---

## Next Lesson

**Lesson 005 — Java Program Execution Flow**
