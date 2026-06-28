---
id: exception-handling
title: Exception Handling
description: Learn how Java handles runtime errors using try-catch-finally, exception hierarchy, and common exception types.
sidebar_position: 1
keywords:
  - Java
  - exception handling
  - try catch finally
  - checked exception
  - unchecked exception
  - NullPointerException
---

# Exception Handling

> **Reading Time:** 12 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

An **exception** is an unexpected event that happens during program execution which disrupts the normal flow — like dividing by zero, accessing a null object, or reading a file that doesn't exist. Java provides the `try-catch-finally` mechanism to handle these errors gracefully instead of crashing the program.

---

## What You'll Learn

- What exceptions are and why they happen
- The difference between checked and unchecked exceptions
- How to use `try`, `catch`, and `finally` blocks
- How to handle multiple exception types
- The Java exception hierarchy (Throwable → Error, Exception)
- Common exception types with examples

---

## Prerequisites

- Basic Java syntax (classes, methods, variables)
- Understanding of Java programs running and executing

---

## Explanation

### What Is an Exception?

An exception is a problem that arises during the **execution** of a program. The word "exception" means "exceptional condition" — something unusual happened that the program was not expecting.

When Java encounters an error during execution, it **throws an exception** — it creates an exception object describing what went wrong and stops the normal flow. If no code **catches** this exception, the program terminates and prints a stack trace (an error message showing where the problem occurred).

Without exception handling:
```
Exception in thread "main" java.lang.ArithmeticException: / by zero
```

With exception handling, you can show a friendly message and keep the program running.

---

### The Exception Hierarchy

Java organises exceptions in a **tree structure** (class hierarchy):

```
java.lang.Throwable
├── java.lang.Error
│   ├── StackOverflowError
│   ├── OutOfMemoryError
│   └── (other errors — do NOT catch these)
└── java.lang.Exception
    ├── IOException           ← Checked
    ├── SQLException          ← Checked
    ├── FileNotFoundException ← Checked
    └── RuntimeException      ← Unchecked
        ├── NullPointerException
        ├── ArrayIndexOutOfBoundsException
        ├── ClassCastException
        ├── ArithmeticException
        └── NumberFormatException
```

**Key Classes:**
- **Throwable** — The root of all errors and exceptions
- **Error** — Serious JVM-level problems (OutOfMemoryError, StackOverflowError). You should almost never catch these.
- **Exception** — Problems your program can reasonably recover from
- **RuntimeException** — A subtype of Exception that does NOT need to be declared

---

### Checked vs Unchecked Exceptions

**Checked Exceptions** — The compiler FORCES you to handle them. If you call a method that might throw a checked exception, you MUST either surround it with `try-catch` or declare it with `throws`. Examples: `IOException`, `SQLException`, `FileNotFoundException`.

**Unchecked Exceptions** (RuntimeExceptions) — The compiler does NOT force you to handle them. They are caused by programming bugs and can happen anywhere. Examples: `NullPointerException`, `ArithmeticException`, `ArrayIndexOutOfBoundsException`.

| Type | Examples | Must handle? |
|---|---|---|
| Checked | IOException, SQLException | ✅ Yes |
| Unchecked (Runtime) | NullPointerException, ArithmeticException | ❌ No (but you should) |
| Error | OutOfMemoryError, StackOverflowError | ❌ No (almost never) |

---

### try-catch-finally Syntax

```java
try {
    // Code that might throw an exception
} catch (ExceptionType e) {
    // Code to handle the exception
} finally {
    // Code that ALWAYS runs (cleanup)
}
```

**Rules:**
- `try` block contains the risky code
- `catch` block handles a specific type of exception
- `finally` block ALWAYS executes — even if there was no exception, or even if there was one that wasn't caught

---

### Multiple Catch Blocks

You can have multiple `catch` blocks for different exception types. Java matches the first catch block whose type matches the exception:

```java
try {
    // risky code
} catch (NullPointerException e) {
    System.out.println("Null reference!");
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Array index out of range!");
} catch (Exception e) {
    System.out.println("Some other error: " + e.getMessage());
}
```

⚠️ Always put **more specific** exception types **before** more general ones. If you put `catch (Exception e)` first, it will catch everything and the specific catch blocks below it will never run.

---

### Common Exception Types

**NullPointerException** — Occurs when you try to use a variable that is `null` (has no object).
```java
String s = null;
s.length(); // NullPointerException!
```

**ArrayIndexOutOfBoundsException** — Occurs when you access an array with an invalid index.
```java
int[] arr = {1, 2, 3};
arr[5]; // ArrayIndexOutOfBoundsException!
```

**ArithmeticException** — Occurs on illegal math operations like dividing by zero.
```java
int x = 10 / 0; // ArithmeticException!
```

**ClassCastException** — Occurs when you try to cast an object to an incompatible type.
```java
Object obj = "Hello";
Integer num = (Integer) obj; // ClassCastException!
```

**NumberFormatException** — Occurs when you try to convert an invalid String to a number.
```java
int n = Integer.parseInt("abc"); // NumberFormatException!
```

---

### `finally` Always Runs

The `finally` block runs no matter what — whether the `try` block succeeded, an exception was thrown and caught, or an exception was thrown and not caught. It is used for **cleanup** code like closing files, database connections, etc.

---

## Real-World Analogy

Think of exception handling like a fire drill at school.

- **try block** = Going about your normal school day (risky — a fire could start)
- **catch block** = The fire alarm and evacuation procedure (handles the emergency)
- **finally block** = Roll call after evacuation (always happens — whether there was a fire or not)

Without a fire drill plan, a fire means chaos and everyone runs out randomly (program crash). With a plan, the emergency is handled calmly and predictably.

---

## Code Example

### Example 1: Basic try-catch-finally

```java
public class ExceptionDemo {
    public static void main(String[] args) {

        System.out.println("Program starts");

        try {
            int[] numbers = {10, 20, 30};
            System.out.println("Accessing index 5...");
            System.out.println(numbers[5]);  // This throws an exception!
            System.out.println("This line is never reached");

        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Caught: " + e.getMessage());

        } finally {
            System.out.println("Finally block always runs!");
        }

        System.out.println("Program continues after exception");
    }
}
```

### Output
```
Program starts
Accessing index 5...
Caught: Index 5 out of bounds for length 3
Finally block always runs!
Program continues after exception
```

---

### Example 2: Multiple Catch Blocks

```java
public class MultipleCatchDemo {
    public static void main(String[] args) {

        String[] inputs = {"42", null, "abc", "0"};

        for (String input : inputs) {
            try {
                // Might throw NullPointerException or NumberFormatException
                int value = Integer.parseInt(input);

                // Might throw ArithmeticException
                int result = 100 / value;

                System.out.println("100 / " + value + " = " + result);

            } catch (NullPointerException e) {
                System.out.println("Error: Input was null!");

            } catch (NumberFormatException e) {
                System.out.println("Error: '" + input + "' is not a number!");

            } catch (ArithmeticException e) {
                System.out.println("Error: Cannot divide by zero!");

            } catch (Exception e) {
                System.out.println("Unexpected error: " + e.getMessage());
            }
        }
    }
}
```

### Output
```
100 / 42 = 2
Error: Input was null!
Error: 'abc' is not a number!
Error: Cannot divide by zero!
```

---

### Example 3: Exception Hierarchy — Catching Parent Types

```java
public class HierarchyDemo {
    public static void main(String[] args) {

        try {
            String text = null;
            System.out.println(text.length()); // NullPointerException

        } catch (RuntimeException e) {
            // NullPointerException IS-A RuntimeException
            // So this catches it
            System.out.println("Caught RuntimeException: " + e.getClass().getSimpleName());
            System.out.println("Message: " + e.getMessage());
        }

        // You can get exception info:
        try {
            int[] arr = new int[5];
            arr[10] = 1;
        } catch (Exception e) {
            System.out.println("Exception type: " + e.getClass().getName());
            System.out.println("Message: " + e.getMessage());
            // e.printStackTrace(); // Prints full stack trace — useful for debugging
        }
    }
}
```

### Output
```
Caught RuntimeException: NullPointerException
Message: Cannot invoke "String.length()" because "text" is null
Exception type: java.lang.ArrayIndexOutOfBoundsException
Message: Index 10 out of bounds for length 5
```

---

## Common Mistakes

- ❌ **Mistake**: Catching `Exception` as the first catch block → ✅ **Fix**: Always put specific exceptions BEFORE general ones
- ❌ **Mistake**: Empty catch block — silently swallowing exceptions → ✅ **Fix**: Always log or handle the exception; at minimum print `e.getMessage()`
- ❌ **Mistake**: Using exceptions for normal flow control (like checking if a number exists) → ✅ **Fix**: Use `if` checks for expected cases; exceptions are for unexpected errors
- ❌ **Mistake**: Catching `Error` types like `OutOfMemoryError` → ✅ **Fix**: Almost never catch `Error` — these are JVM-level problems you cannot recover from

---

## Best Practices

- Always catch the most specific exception type possible
- Never swallow exceptions silently — always log them
- Use `finally` (or try-with-resources) to close resources like files and database connections
- Provide clear, user-friendly error messages in catch blocks
- Use `e.getMessage()` for brief description and `e.printStackTrace()` only during debugging

---

## Interview Questions

**Q: What is the difference between checked and unchecked exceptions?**  
A: Checked exceptions are checked by the compiler at compile time — you MUST handle them with try-catch or declare them with `throws`. Examples: `IOException`, `SQLException`. Unchecked exceptions (RuntimeExceptions) are NOT checked at compile time and usually indicate programming bugs. Examples: `NullPointerException`, `ArithmeticException`.

**Q: Does `finally` always execute?**  
A: Almost always. `finally` executes even if an exception is thrown or caught. The only cases where `finally` might not run are: if the JVM crashes, if `System.exit()` is called inside the try block, or if the thread is killed.

**Q: What is the difference between `Error` and `Exception`?**  
A: Both extend `Throwable`. `Error` represents serious JVM problems (like `OutOfMemoryError`, `StackOverflowError`) that the application cannot reasonably recover from — you should almost never catch these. `Exception` represents conditions that a well-written application might want to catch and handle.

**Q: Can you catch multiple exception types in one catch block?**  
A: Yes, from Java 7 onwards, you can use the multi-catch syntax: `catch (IOException | SQLException e)`. This is cleaner when both exceptions are handled the same way.

---

## Quick Revision

✔ Exception = unexpected runtime event that disrupts normal program flow  
✔ Checked exceptions must be handled; unchecked (runtime) exceptions don't have to be  
✔ `try` contains risky code, `catch` handles exceptions, `finally` always runs  
✔ Put specific catches BEFORE general ones  
✔ `Error` types are JVM-level — almost never catch them  

---

## Related Topics

- Custom Exceptions (Lesson 02)
- File Handling (uses checked exceptions)
- Java Threads (throws checked exceptions)

---

## Next Lesson

**02 - Custom Exceptions**
