---
id: var-keyword
title: The var Keyword
description: Learn how Java 10's var keyword enables local variable type inference, its rules, and when to use or avoid it for cleaner code.
sidebar_position: 8
keywords:
  - Java
  - var keyword
  - Java 10
  - Type Inference
  - Local Variable
---

# The var Keyword

> **Reading Time:** 6 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

Introduced in **Java 10**, the `var` keyword allows the compiler to **automatically infer** (figure out) the type of a local variable from its assigned value. Instead of writing `ArrayList<String> list = new ArrayList<>()`, you write `var list = new ArrayList<String>()`. The code becomes shorter, but the type safety remains exactly the same — `var` is NOT a dynamic type like JavaScript's `var`.

---

## What You'll Learn

- What `var` is and how it works
- The strict rules for using `var`
- Where `var` can and cannot be used
- When to use `var` and when to avoid it

---

## Prerequisites

- Basic Java variable declarations
- Understanding of data types in Java

---

## Explanation

### What is `var`?

`var` is a **reserved type name** (not a keyword, technically) that tells the Java compiler: "figure out the type for me based on what I'm assigning."

```java
// Without var
ArrayList<String> names = new ArrayList<String>();
Map<String, List<Integer>> map = new HashMap<String, List<Integer>>();

// With var — much shorter
var names = new ArrayList<String>();
var map = new HashMap<String, List<Integer>>();
```

The type is inferred **at compile time** — this is NOT dynamic typing. The variable `names` is still `ArrayList<String>` after the compiler processes it. At runtime, there is zero difference.

---

### How the Compiler Infers the Type

The compiler looks at the **right-hand side** of the assignment:

```java
var x = 42;           // inferred as int
var pi = 3.14;        // inferred as double
var name = "Alice";   // inferred as String
var list = new ArrayList<String>();  // inferred as ArrayList<String>
```

The type is locked at the point of declaration — you can't reassign a `var` variable to a different type:

```java
var count = 10;
count = 20;       // ✅ OK — still int
count = "hello";  // ❌ Compile error — can't assign String to int
```

---

### Rules for Using `var`

**1. Only for local variables** — inside methods, constructors, or initialization blocks:
```java
var x = 5; // ✅ inside method
```

**2. Must be initialized at declaration** — the compiler needs the right-hand side to infer type:
```java
var x;       // ❌ Cannot infer type — no initializer
var x = null; // ❌ Cannot infer type from null alone
```

**3. Cannot be null without a cast**:
```java
var x = (String) null; // ✅ inferred as String (rare use case)
```

**4. Cannot be used for method parameters**:
```java
void process(var data) { } // ❌ NOT allowed
```

**5. Cannot be used for fields (class-level variables)**:
```java
class MyClass {
    var count = 0; // ❌ NOT allowed for fields
}
```

**6. Cannot be used for return types**:
```java
var getCount() { return 5; } // ❌ NOT allowed
```

**7. Cannot be used in lambda parameter types** (Java 11 allows it in certain cases):
```java
Consumer<String> c = (var s) -> System.out.println(s); // ✅ Java 11+
```

---

### Where `var` IS Allowed

| Context | Example |
|---------|---------|
| Local variable in method | `var list = new ArrayList<>();` |
| For-each loop variable | `for (var item : list)` |
| Traditional for loop variable | `for (var i = 0; i < 10; i++)` |
| Try-with-resources | `try (var conn = getConnection())` |

---

### `var` with Generics

`var` works great with complex generic types:

```java
// Old — verbose
Map<String, List<Integer>> studentScores = new HashMap<String, List<Integer>>();

// With var — cleaner right side
var studentScores = new HashMap<String, List<Integer>>();
```

Be careful: if you use the diamond operator `<>` with `var`, the compiler may infer `Object` instead of the correct generic type:

```java
var list = new ArrayList<>(); // inferred as ArrayList<Object>! Not ideal
var list = new ArrayList<String>(); // ✅ inferred as ArrayList<String>
```

---

### When to Use `var`

✅ **Use var when:**
- The type is obvious from the right-hand side: `var name = "Alice"`
- The type is very long and repetitive: `var map = new HashMap<String, List<String>>()`
- In for-each loops: `for (var student : students)`
- When using Builder pattern with long chains

❌ **Avoid var when:**
- The type isn't obvious: `var result = getValue()` — what does `getValue()` return?
- It reduces readability: `var x = process(y, z)` — what type is x?
- The code is part of a public API (though var can't be used in public method signatures anyway)
- For beginners learning type systems — explicit types are educational

---

## Real-World Analogy

`var` is like saying "you know what I mean" to the compiler. Instead of saying "Give me a red, 2-door, manual transmission Honda Civic" every time, you point to one and say "give me one of those." The compiler knows exactly what you mean by looking at what you're pointing at — and it locks in that understanding permanently.

---

## Code Example

### Example 1: Basic var Usage

```java
import java.util.*;

public class VarDemo {
    public static void main(String[] args) {
        // Basic types
        var age = 25;                   // int
        var salary = 75000.50;          // double
        var name = "Alice";             // String
        var isActive = true;            // boolean

        System.out.println(name + " | Age: " + age + " | Salary: " + salary);

        // Collections
        var list = new ArrayList<String>();
        list.add("Java");
        list.add("Python");
        list.add("Go");

        // For-each with var
        for (var language : list) {
            System.out.println("Language: " + language);
        }

        // Map with var
        var scores = new HashMap<String, Integer>();
        scores.put("Alice", 95);
        scores.put("Bob", 82);
        scores.put("Charlie", 78);

        for (var entry : scores.entrySet()) {
            System.out.println(entry.getKey() + " → " + entry.getValue());
        }
    }
}
```

### Output
```
Alice | Age: 25 | Salary: 75000.5
Language: Java
Language: Python
Language: Go
Alice → 95
Bob → 82
Charlie → 78
```

---

### Example 2: var with Complex Types

```java
import java.util.*;
import java.util.stream.*;

public class VarWithStreams {
    public static void main(String[] args) {
        var numbers = List.of(5, 3, 8, 1, 9, 2, 7, 4, 6);

        // Without var:
        // List<Integer> evenNumbers = numbers.stream()
        //     .filter(n -> n % 2 == 0)
        //     .collect(Collectors.toList());

        // With var:
        var evenNumbers = numbers.stream()
                .filter(n -> n % 2 == 0)
                .collect(Collectors.toList());

        System.out.println("Even numbers: " + evenNumbers);

        // var in traditional for loop
        for (var i = 0; i < 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();

        // var with try-with-resources
        try (var scanner = new Scanner(System.in)) {
            // scanner is inferred as Scanner
            System.out.println("Scanner ready");
        }
    }
}
```

### Output
```
Even numbers: [8, 2, 4, 6]
0 1 2 3 4
Scanner ready
```

---

### Example 3: What NOT to Do

```java
public class VarMistakes {
    // var count = 0; // ❌ NOT allowed as class field

    public static void main(String[] args) {
        // ✅ Good — type is obvious
        var message = "Hello World";

        // ⚠️ Questionable — what type is result?
        var result = compute(); // hard to tell without checking compute()

        // ❌ This gives ArrayList<Object> — not what you probably want
        var list = new ArrayList<>(); // use ArrayList<String>() instead

        // ✅ Better
        var typedList = new ArrayList<String>();
        typedList.add("Java");

        System.out.println(message);
        System.out.println(typedList);
    }

    static String compute() {
        return "done";
    }
}
```

### Output
```
Hello World
[Java]
```

---

## Common Mistakes

- ❌ **Mistake**: Using `var` without initialization: `var x;` → ✅ **Fix**: Always provide a value: `var x = 5;`
- ❌ **Mistake**: Using `var x = null;` expecting type inference → ✅ **Fix**: Compiler can't infer type from null alone — use explicit type or cast: `var x = (String) null`
- ❌ **Mistake**: Using `var` in method parameters or return types → ✅ **Fix**: `var` is only for local variables — not parameters, fields, or return types
- ❌ **Mistake**: Using `var list = new ArrayList<>()` without specifying generic type → ✅ **Fix**: Use `var list = new ArrayList<String>()` so the inferred type is `ArrayList<String>` not `ArrayList<Object>`
- ❌ **Mistake**: Overusing `var` and making code unreadable → ✅ **Fix**: If the type isn't obvious from the right-hand side, use an explicit type

---

## Best Practices

- Use `var` when the type is obvious and the right-hand side clearly shows what it is
- Avoid `var` when the method/constructor name doesn't make the type obvious
- Use `var` freely in for-each loops — it almost always improves readability
- Don't use `var` for primitive types like `int`, `double` in simple cases — explicit types are fine and clear
- Code reviews: if a teammate can't tell the type of a `var` variable in 2 seconds, use an explicit type

---

## Interview Questions

**Q: What is `var` in Java 10?**  
A: `var` is a reserved type name in Java 10 that enables local variable type inference. The compiler infers the variable's type from its initializer expression. It is not dynamic typing — the type is fixed at compile time.

**Q: Where can `var` NOT be used?**  
A: `var` cannot be used for: class fields, method parameters, method return types, or variables without an initializer. It's only for local variables inside methods, constructors, and initializer blocks.

**Q: What is the difference between Java's `var` and JavaScript's `var`?**  
A: They are completely different. Java's `var` uses **compile-time type inference** — the type is determined by the compiler and is fixed. Once a `var` variable is declared as `int`, it stays `int`. JavaScript's `var` is truly dynamic — the same variable can hold different types at runtime.

**Q: Can you use `var` with generics?**  
A: Yes, but be careful. `var list = new ArrayList<String>()` correctly infers `ArrayList<String>`. But `var list = new ArrayList<>()` infers `ArrayList<Object>` because the diamond operator alone doesn't specify the type.

---

## Quick Revision

✔ `var` = local variable type inference — introduced in Java 10  
✔ Compiler figures out type from right-hand side at compile time  
✔ Type is locked — `var` is NOT dynamic typing  
✔ Rules: only local variables, must be initialized, cannot be null alone  
✔ Cannot use on fields, parameters, or return types  
✔ Use when type is obvious; avoid when type is unclear from context  

---

## Related Topics

- Java Generics
- Type System in Java
- Records (Java 16)
- Java Streams with var

---

## Next Lesson

**Lesson 9 — Records**
