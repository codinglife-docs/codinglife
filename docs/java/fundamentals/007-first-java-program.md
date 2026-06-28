---
id: first-java-program
title: Your First Java Program
description: Learn how to write, compile, and run a Java program from scratch, with a line-by-line code anatomy explanation.
sidebar_position: 7
keywords:
  - Java
  - Hello World
  - Compilation
  - Execution
  - JDK
---

# Your First Java Program

> **Reading Time:** 8 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

Writing your first Java program is the classic starting point for any developer. We write the code in a text file, compile it into machine-readable bytecode using the compiler (`javac`), and then execute it using the JVM (`java`).

In this lesson, you will learn how to write the classic "Hello World" program and understand what each line of code actually means.

---

## What You'll Learn

- How to write a standard Java program structure
- Line-by-line anatomy of a Java program
- How to compile Java code from the terminal
- How to run Java code
- Common compilation and syntax errors and how to fix them

---

## Prerequisites

- Installing Java (JDK 21) (Lesson 006)
- JDK vs JRE vs JVM (Lesson 004)

---

## Explanation

### The "Hello World" Code

Create a file named `Main.java` and type the following code:

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

---

## Real-World Analogy

Think of a **Recipe**.

1. **Writing Code** = Writing a recipe in English.
2. **Compiler (`javac`)** = Translating the recipe into a universal system code that a robot chef can understand.
3. **JVM (`java`)** = The robot chef reading the translated instructions and actually baking the cake.

If you make a grammar mistake in the recipe, the translator will stop you and complain before the chef even starts cooking.

---

## Anatomy of the Code

Let's break down each part of our first program:

### 1. `public class Main`
*   `public`: An **access modifier** that means this class is accessible from anywhere.
*   `class`: A keyword used to define a class in Java. Everything in Java must live inside a class.
*   `Main`: The name of the class. **Important:** The class name MUST match the file name exactly (case-sensitive). Since our class is named `Main`, the file name must be `Main.java`.

### 2. `public static void main(String[] args)`
This is the **entry point** of any Java application. When you run a Java program, the JVM automatically looks for this exact line to start execution.
*   `public`: Accessible to the JVM from outside the class.
*   `static`: Allows the JVM to call this method without creating an instance (object) of the class.
*   `void`: The return type. `void` means this method does not return any value.
*   `main`: The name of the method. This name is reserved for the entry point.
*   `String[] args`: Parameters passed to the program from the command line (an array of text strings).

### 3. `System.out.println("Hello, World!");`
This line prints text to the screen.
*   `System`: A built-in Java class that contains useful system tools.
*   `out`: A field in the `System` class representing the standard output stream (your terminal screen).
*   `println`: Short for "print line". It prints the text inside the parentheses and then moves the cursor to a new line.
*   `;`: The semicolon. In Java, every statement must end with a semicolon, just like a sentence ends with a period.

---

## How to Compile and Run Your Program

Open your terminal or command prompt and navigate to the folder where you saved `Main.java`.

### Step 1: Compile the Code
The compiler translates your source code (`.java`) into bytecode (`.class`). Run the following command:

```bash
javac Main.java
```

If successful, no output will appear, but a new file named `Main.class` will be created in the same folder.

### Step 2: Run the Code
Run the compiled bytecode using the JVM. Run the following command (do not include the `.class` extension):

```bash
java Main
```

### Output

```
Hello, World!
```

---

## Common Mistakes

- ❌ **Filename mismatch**: Naming your file `main.java` (lowercase) while the class is `public class Main` (uppercase).
  *   **Fix**: Rename the file to `Main.java`.
- ❌ **Missing semicolon**: Leaving out the `;` at the end of the `println` statement.
  *   **Fix**: Add `;` to the end of the statement.
- ❌ **Typo in main method signature**: Typing `public static void Main` (capital M) or forgetting `String[] args`.
  *   **Fix**: Ensure it is exactly `public static void main(String[] args)`.
- ❌ **Running with .class extension**: Executing `java Main.class` instead of `java Main`.
  *   **Fix**: Run it as `java Main`.

---

## Best Practices

- Always use proper indentation (usually 4 spaces or 1 tab) so your code is readable.
- Use PascalCase for class names (e.g. `MyFirstProgram`) and camelCase for method/variable names.
- Always match file names exactly with public class names.

---

## Interview Questions

### Q1. What is the entry point of a Java program?
The entry point of any Java program is the `public static void main(String[] args)` method. The JVM automatically searches for this method signature to start running the application.

### Q2. Why is the `main` method static?
It is marked `static` so that the JVM can execute it directly without having to instantiate (create an object of) the class first. This saves memory and simplifies startup.

### Q3. What is the difference between `print()` and `println()`?
`print()` prints the text and leaves the cursor on the same line, so the next printed text will appear immediately after. `println()` prints the text and moves the cursor to the next line.

---

## Quick Revision

- [x] Every Java program starts with a class definition.
- [x] The file name must match the public class name exactly.
- [x] Java is case-sensitive (`Main` is different from `main`).
- [x] Use `javac` to compile to bytecode, and `java` to run using the JVM.

---

## Related Topics

- Java Program Execution Flow (Lesson 005)
- Variables in Java (Lesson 008)

---

## Next Lesson

**Lesson 008 — Variables**
