---
id: java-program-execution
title: Java Program Execution Flow
description: Learn exactly how a Java program runs — from writing source code to execution by the JVM. Includes step-by-step explanation and ASCII flow diagram.
sidebar_position: 5
keywords:
  - Java
  - Java Program Execution
  - Bytecode
  - javac compiler
  - JVM execution
---

# Java Program Execution Flow

> **Reading Time:** 7 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

When you write a Java program and click "Run," a lot of things happen behind the scenes. Java first compiles your code into bytecode, then the JVM interprets and runs that bytecode. Understanding this flow helps you debug errors, understand error messages, and appreciate what makes Java special.

---

## What You'll Learn

- What happens at each stage of Java execution
- The role of `javac` (compiler) and JVM (runtime)
- What bytecode is and what a `.class` file contains
- How JIT compilation speeds things up
- The difference between compile-time errors and runtime errors

---

## Prerequisites

- Lesson 003 — Features of Java (platform independence)
- Lesson 004 — JDK vs JRE vs JVM

---

## Explanation

### The Complete Execution Flow

```
┌──────────────────┐
│  You write code  │
│  HelloWorld.java │
│  (Source Code)   │
└────────┬─────────┘
         │
         │  Step 1: javac compiler (part of JDK)
         ▼
┌──────────────────┐
│   Bytecode       │
│  HelloWorld.class│
│  (Platform       │
│   Independent)   │
└────────┬─────────┘
         │
         │  Step 2: JVM loads the .class file
         ▼
┌──────────────────────────────────────┐
│             JVM                      │
│                                      │
│  ┌────────────┐  ┌─────────────────┐ │
│  │Class Loader│→ │Bytecode Verifier│ │
│  └────────────┘  └────────┬────────┘ │
│                           │          │
│              ┌────────────▼────────┐ │
│              │  Execution Engine   │ │
│              │                     │ │
│              │  Interpreter        │ │
│              │       +             │ │
│              │  JIT Compiler       │ │
│              └────────────┬────────┘ │
└───────────────────────────┼──────────┘
                            │
                            ▼
               ┌──────────────────────┐
               │  Native Machine Code │
               │  (Your CPU runs it!) │
               └──────────────────────┘
                            │
                            ▼
               ┌──────────────────────┐
               │  OUTPUT on Screen    │
               │  "Hello, World!"     │
               └──────────────────────┘
```

---

### Step 1: Writing Source Code (.java file)

You write Java code in a plain text file with the `.java` extension. This is called **source code** — code that humans can read.

```java
// File: HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

**Rules for the file name**: The file name MUST match the public class name. If your class is `HelloWorld`, the file must be `HelloWorld.java`.

---

### Step 2: Compilation — javac (Java Compiler)

When you run `javac HelloWorld.java` in the terminal, the **javac compiler** reads your source code and:

1. **Checks syntax** — is the code grammatically correct?
2. **Checks types** — are you using variables correctly?
3. **Converts** source code into **bytecode**
4. **Produces** a `HelloWorld.class` file

This is called a **compile-time** check. Errors caught here are called **compile-time errors** (or syntax errors).

```
Command: javac HelloWorld.java
Output:  HelloWorld.class (bytecode file)
```

**What is bytecode?** Bytecode is a set of instructions written for an imaginary "ideal computer" (the JVM). It's not your CPU's native instructions — it's a middle format that any JVM can understand.

If you open a `.class` file in a text editor, you'll see something unreadable like:
```
café babe 0000 003d 001d 0a00 0200 ...
```
(Java class files start with the magic bytes `cafe babe` — yes, that's actually a Java easter egg! ☕)

---

### Step 3: Class Loading

When you run `java HelloWorld`, the JVM's **Class Loader** takes over:

1. **Bootstrap Class Loader** — loads core Java classes (java.lang, java.util, etc.)
2. **Extension Class Loader** — loads extension libraries
3. **Application Class Loader** — loads YOUR `HelloWorld.class` file

The class loader reads the `.class` file and loads it into **memory (heap)**.

---

### Step 4: Bytecode Verification

Before running your code, the **Bytecode Verifier** checks:

- Is the bytecode properly formatted?
- Does the code try to do anything illegal (like accessing memory it shouldn't)?
- Are all types used correctly?

This is a **security measure** — it prevents malicious or corrupted bytecode from running.

---

### Step 5: Execution — Interpreter + JIT Compiler

The **Execution Engine** runs your bytecode in two ways:

#### 5a. Interpreter
The interpreter reads bytecode instructions **one by one** and executes them. Simple and works immediately, but slower for frequently-executed code.

#### 5b. JIT (Just-In-Time) Compiler
The JVM monitors which code runs frequently ("hot code"). For hot code, the JIT compiler converts bytecode into **native machine code** that your CPU can run directly — much faster!

```
First few runs:  Interpreted (slower but starts fast)
Hot code:        JIT compiled to native code (fast!)
Result:          Near-native performance over time
```

---

### Step 6: Output

After execution, the result appears — on screen, in a file, over a network, wherever your program sends it.

---

### Compile-Time vs Runtime Errors

| | Compile-Time Error | Runtime Error |
|--|-------------------|---------------|
| **When detected** | During `javac` compilation | During program execution |
| **Example** | Missing semicolon, wrong type | Dividing by zero, null pointer |
| **Caught by** | Java compiler | JVM at runtime |
| **Java term** | Syntax error / type error | Exception |

---

## Real-World Analogy

Think of this like **making and playing a music album**:

1. **Writing source code** = A musician **writes sheet music** (`.java` file)
2. **Compilation** = Recording studio **records to digital format** (`.class` bytecode) — can play on any player
3. **Class Loading** = Your music player **loads the track** into memory
4. **Bytecode Verification** = Player **checks the file** isn't corrupted
5. **Interpretation/JIT** = Player **converts digital to sound waves** your ears can hear (native machine code your CPU executes)
6. **Output** = You **hear the music** 🎵

The sheet music (source) → digital recording (bytecode) → sound (machine code) → music in your ears (output)!

---

## Code Example

```java
// File: ExecutionDemo.java
// Demonstrates Java execution flow concepts

public class ExecutionDemo {

    public static void main(String[] args) {

        System.out.println("=== Java Execution Flow Demo ===\n");

        // Step 1: Variables loaded into memory by JVM
        String message = "Hello from the JVM!";
        int number = 42;

        // Step 2: JVM executes these statements
        System.out.println("Message: " + message);
        System.out.println("Number: " + number);

        // Step 3: JIT would optimize this loop (hot code!)
        System.out.println("\nCounting (JIT optimizes loops like this):");
        long sum = 0;
        for (int i = 1; i <= 10; i++) {
            sum += i;
        }
        System.out.println("Sum of 1-10 = " + sum);

        // Step 4: Runtime information from JVM
        Runtime runtime = Runtime.getRuntime();
        System.out.println("\n--- JVM Memory Info ---");
        System.out.println("Total Memory: " + runtime.totalMemory() / 1024 + " KB");
        System.out.println("Free Memory:  " + runtime.freeMemory() / 1024 + " KB");
        System.out.println("Processors:   " + runtime.availableProcessors());
    }
}
```

### Output
```
=== Java Execution Flow Demo ===

Message: Hello from the JVM!
Number: 42

Counting (JIT optimizes loops like this):
Sum of 1-10 = 55

--- JVM Memory Info ---
Total Memory: 256000 KB
Free Memory:  249856 KB
Processors:   8
```

---

### Terminal Commands

```bash
# Step 1: Compile your Java file
javac ExecutionDemo.java

# This creates: ExecutionDemo.class

# Step 2: Run the compiled program
java ExecutionDemo

# Note: Don't include .class extension when running!
# java ExecutionDemo  ✅  CORRECT
# java ExecutionDemo.class  ❌  WRONG
```

---

## Common Mistakes

- ❌ **Mistake**: Running `java HelloWorld.class` (with .class) → ✅ **Fix**: Use `java HelloWorld` — the JVM knows to look for the `.class` file.
- ❌ **Mistake**: File name doesn't match class name → ✅ **Fix**: If your class is `public class MyProgram`, the file MUST be `MyProgram.java`.
- ❌ **Mistake**: Trying to run `.java` file directly → ✅ **Fix**: Always compile first with `javac`, then run with `java`. (Exception: Java 11+ allows `java HelloWorld.java` for single-file programs)

---

## Best Practices

- Always compile with `javac FileName.java` before running
- Use `java -verbose:class HelloWorld` to see which classes are being loaded — great for debugging
- For Java 11+, you can run single-file programs directly with `java HelloWorld.java` (no separate compile step)
- Keep one public class per file for clarity

---

## Interview Questions

**Q: Explain the Java program execution flow.**  
A: 1) Write source code (`.java`), 2) Compile with `javac` → bytecode (`.class`), 3) JVM's class loader loads the `.class` file, 4) Bytecode verifier checks safety, 5) Execution engine runs it via interpreter + JIT compiler, 6) Output is produced.

**Q: What is bytecode in Java?**  
A: Bytecode is the intermediate, platform-independent code that `javac` produces from Java source code. It's stored in `.class` files and can be executed by any JVM on any platform, enabling "Write Once, Run Anywhere."

**Q: What is JIT compilation?**  
A: JIT (Just-In-Time) compilation is when the JVM identifies frequently-executed ("hot") bytecode and compiles it into native machine code at runtime for faster execution. This gives Java near-native performance.

**Q: What is the difference between compile-time and runtime errors?**  
A: Compile-time errors (syntax errors, type mismatches) are caught by `javac` before the program runs. Runtime errors (exceptions like NullPointerException, ArrayIndexOutOfBoundsException) occur during execution and are handled by the JVM.

---

## Quick Revision

✔ Flow: `.java` → `javac` → `.class` (bytecode) → JVM → Output  
✔ **javac** = compiler (part of JDK), converts source to bytecode  
✔ **Bytecode** = platform-independent intermediate code in `.class` files  
✔ **JVM** loads, verifies, and executes bytecode  
✔ **JIT** = compiles hot code to native machine code at runtime  
✔ Compile-time errors caught by compiler; runtime errors caught by JVM  

---

## Related Topics

- JDK vs JRE vs JVM (Lesson 004)
- Installing Java (Lesson 006)
- Your First Java Program (Lesson 007)

---

## Next Lesson

**Lesson 006 — Installing Java (JDK 21)**
