---
id: generics
title: Generics in Java
description: Learn Java Generics — type safety, generic classes, generic methods, bounded type parameters, wildcards, and the Pair example.
sidebar_position: 1
keywords:
  - Java
  - generics
  - type safety
  - bounded type parameters
  - wildcards
  - generic class
---

# Generics in Java

> **Reading Time:** 12 Minutes  
> **Difficulty:** Intermediate

---

## Topic Summary

**Generics** allow you to write classes, interfaces, and methods that work with **any data type** while maintaining **type safety** at compile time. Instead of writing separate code for Integer lists, String lists, and Double lists, you write one generic class that works with all of them. Generics were introduced in Java 5 to eliminate the need for unsafe casting.

---

## What You'll Learn

- What generics are and why they exist
- How to define and use a generic class with `<T>`
- How to write generic methods
- Bounded type parameters (`<T extends Number>`)
- Wildcards (`?`, `? extends`, `? super`)
- A real example: `Pair<K, V>` generic class

---

## Prerequisites

- Java Classes and Objects
- Inheritance and Interfaces
- Collections basics (helpful but not required)

---

## Explanation

### The Problem Before Generics

Before Java 5, collections stored items as `Object`. This forced you to cast every item you retrieved, and the compiler couldn't warn you about type errors:

```java
// Without generics (Java 1.4 and before)
List list = new ArrayList();
list.add("Hello");
list.add(42);          // No error — but dangerous!

String s = (String) list.get(0);  // Works
String s2 = (String) list.get(1); // ClassCastException at RUNTIME!
```

The bug appears only when the program runs — potentially in production. Generics fix this by making the compiler catch type errors **before** the program runs.

---

### The Solution — Generics

With generics, you tell Java exactly what type a container holds:

```java
// With generics
List<String> list = new ArrayList<String>();
list.add("Hello");
list.add(42);          // COMPILE ERROR — caught before running!

String s = list.get(0); // No cast needed!
```

Now the compiler guarantees that only Strings go in, and you never need to cast when taking them out.

---

### Generic Class Syntax — `<T>`

A **type parameter** like `<T>` is a placeholder for an actual type. When you create an instance, you specify the actual type. `T` can be any name (T = Type, E = Element, K = Key, V = Value are conventions).

```java
public class Box<T> {
    private T content;

    public void set(T item) {
        this.content = item;
    }

    public T get() {
        return content;
    }
}
```

Usage:
```java
Box<String> stringBox = new Box<>();
stringBox.set("Hello");
String value = stringBox.get(); // No cast needed!

Box<Integer> intBox = new Box<>();
intBox.set(100);
int num = intBox.get(); // Works perfectly
```

---

### Generic Methods

A method can be generic independently of its class. You declare type parameters before the return type:

```java
public <T> void printArray(T[] array) {
    for (T element : array) {
        System.out.print(element + " ");
    }
    System.out.println();
}
```

This single method works with `Integer[]`, `String[]`, `Double[]`, and any other array.

---

### Bounded Type Parameters

Sometimes you want to restrict what types can be used. **Bounded type parameters** add constraints:

**Upper bound** — `<T extends Number>` means T can be `Number` or any subclass (`Integer`, `Double`, `Float`, `Long`).

```java
public <T extends Number> double sum(T a, T b) {
    return a.doubleValue() + b.doubleValue();
}
```

Now `sum(3, 4)` works, `sum(3.14, 2.71)` works, but `sum("hello", "world")` gives a compile error.

**Multiple bounds** — `<T extends Comparable<T> & Serializable>` — T must extend `Comparable` AND implement `Serializable`.

---

### Wildcards — `?`, `? extends`, `? super`

A **wildcard** `?` represents an **unknown type**. Wildcards are used mainly in method parameters when you want to accept collections of different types.

**Unbounded Wildcard — `?`**
Accepts a collection of ANY type. You can read from it as `Object`, but cannot add anything (except `null`).
```java
public void printList(List<?> list) {
    for (Object item : list) {
        System.out.println(item);
    }
}
```

**Upper Bounded Wildcard — `? extends Type`**
Accepts a collection of `Type` or any subclass. Used when you want to **read** values (producer — "PECS: Producer Extends").
```java
public double sumNumbers(List<? extends Number> list) {
    double total = 0;
    for (Number n : list) {
        total += n.doubleValue();
    }
    return total;
}
// Accepts List<Integer>, List<Double>, List<Float>...
```

**Lower Bounded Wildcard — `? super Type`**
Accepts a collection of `Type` or any superclass. Used when you want to **write/add** values (consumer — "PECS: Consumer Super").
```java
public void addNumbers(List<? super Integer> list) {
    list.add(1);
    list.add(2);
    list.add(3);
}
// Accepts List<Integer>, List<Number>, List<Object>
```

**PECS Rule (Producer Extends, Consumer Super):**
- Reading from a collection? Use `? extends`
- Writing to a collection? Use `? super`

---

### Type Erasure

Java Generics are a **compile-time feature only**. After compilation, all type parameters are erased and replaced with `Object` (or the bound type). This is called **type erasure**. At runtime, `List<String>` and `List<Integer>` are both just `List`.

This means you cannot do:
- `new T()` — cannot instantiate a type parameter
- `instanceof T` — type checking on generics doesn't work at runtime
- Create a generic array: `T[] arr = new T[10]` — not allowed

---

## Real-World Analogy

Generics are like **labelled containers at a warehouse**. 

Without generics: You have plain unlabelled boxes. You can put anything in any box — but when you want to retrieve a banana, you might accidentally grab a wrench (ClassCastException). You won't know until you open the box.

With generics: Each box has a clear label: "FRUIT ONLY" or "TOOLS ONLY". The warehouse manager (compiler) will stop you from putting a wrench in the fruit box before it even happens. When you open the fruit box, you're guaranteed to find fruit — no surprise, no error, no casting needed.

---

## Code Example

### Example 1: Generic Class — Box

```java
// Generic class with type parameter T
class Box<T> {
    private T value;

    public Box(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }

    public void setValue(T value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "Box[" + value + "] (type: " + value.getClass().getSimpleName() + ")";
    }
}

public class GenericBoxDemo {
    public static void main(String[] args) {

        Box<String> stringBox = new Box<>("Hello, Generics!");
        Box<Integer> intBox = new Box<>(42);
        Box<Double> doubleBox = new Box<>(3.14);

        System.out.println(stringBox);  // Box[Hello, Generics!] (type: String)
        System.out.println(intBox);     // Box[42] (type: Integer)
        System.out.println(doubleBox);  // Box[3.14] (type: Double)

        // Type safety in action:
        stringBox.setValue("Updated value");
        System.out.println(stringBox.getValue().toUpperCase()); // UPDATED VALUE
        // intBox.getValue().toUpperCase(); // COMPILE ERROR — Integer doesn't have toUpperCase
    }
}
```

### Output
```
Box[Hello, Generics!] (type: String)
Box[42] (type: Integer)
Box[3.14] (type: Double)
UPDATED VALUE
```

---

### Example 2: Generic Method and Bounded Types

```java
public class GenericMethodDemo {

    // Generic method — works with any array type
    public static <T> void printArray(T[] array) {
        System.out.print("[ ");
        for (T element : array) {
            System.out.print(element + " ");
        }
        System.out.println("]");
    }

    // Bounded type — T must extend Number
    public static <T extends Number> double sum(T a, T b) {
        return a.doubleValue() + b.doubleValue();
    }

    // Find maximum — T must be Comparable
    public static <T extends Comparable<T>> T findMax(T a, T b, T c) {
        T max = a;
        if (b.compareTo(max) > 0) max = b;
        if (c.compareTo(max) > 0) max = c;
        return max;
    }

    public static void main(String[] args) {

        // Generic method with different array types
        Integer[] ints = {1, 2, 3, 4, 5};
        String[] strings = {"banana", "apple", "cherry"};
        Double[] doubles = {1.1, 2.2, 3.3};

        printArray(ints);     // [ 1 2 3 4 5 ]
        printArray(strings);  // [ banana apple cherry ]
        printArray(doubles);  // [ 1.1 2.2 3.3 ]

        // Bounded types
        System.out.println("Sum of 10 + 20 = " + sum(10, 20));          // 30.0
        System.out.println("Sum of 3.5 + 2.1 = " + sum(3.5, 2.1));     // 5.6

        // Find max
        System.out.println("Max of 3,7,5 = " + findMax(3, 7, 5));           // 7
        System.out.println("Max of strings = " + findMax("dog", "cat", "elephant")); // elephant
    }
}
```

### Output
```
[ 1 2 3 4 5 ]
[ banana apple cherry ]
[ 1.1 2.2 3.3 ]
Sum of 10 + 20 = 30.0
Sum of 3.5 + 2.1 = 5.6
Max of 3,7,5 = 7
Max of strings = elephant
```

---

### Example 3: Real-World Generic Class — Pair\<K, V\>

```java
// Generic class with two type parameters
class Pair<K, V> {
    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() { return key; }
    public V getValue() { return value; }

    @Override
    public String toString() {
        return "(" + key + " → " + value + ")";
    }
}

public class PairDemo {
    public static void main(String[] args) {

        // String key, Integer value (like a word count)
        Pair<String, Integer> wordCount = new Pair<>("hello", 42);
        System.out.println(wordCount);              // (hello → 42)
        System.out.println("Key: " + wordCount.getKey());   // hello
        System.out.println("Value: " + wordCount.getValue()); // 42

        // String key, String value (like a dictionary)
        Pair<String, String> dictionary = new Pair<>("Java", "A programming language");
        System.out.println(dictionary);  // (Java → A programming language)

        // Integer key, String value (like an ID → name map)
        Pair<Integer, String> student = new Pair<>(101, "Alice");
        System.out.println(student);     // (101 → Alice)

        // Array of pairs
        Pair<String, Double>[] grades = new Pair[3];
        grades[0] = new Pair<>("Alice", 95.5);
        grades[1] = new Pair<>("Bob", 88.0);
        grades[2] = new Pair<>("Charlie", 92.3);

        System.out.println("\nGrades:");
        for (Pair<String, Double> grade : grades) {
            System.out.println("  " + grade.getKey() + ": " + grade.getValue());
        }
    }
}
```

### Output
```
(hello → 42)
Key: hello
Value: 42
(Java → A programming language)
(101 → Alice)

Grades:
  Alice: 95.5
  Bob: 88.0
  Charlie: 92.3
```

---

## Common Mistakes

- ❌ **Mistake**: Using raw types like `Box` instead of `Box<String>` → ✅ **Fix**: Always specify type parameters; raw types lose all type safety
- ❌ **Mistake**: Trying to create a generic array: `T[] arr = new T[10]` → ✅ **Fix**: Use `(T[]) new Object[10]` or use `ArrayList<T>` instead
- ❌ **Mistake**: Trying to instantiate a type parameter: `new T()` → ✅ **Fix**: Pass a `Class<T>` and use `clazz.newInstance()` or change design
- ❌ **Mistake**: Confusing `? extends T` and `? super T` → ✅ **Fix**: Remember PECS: Extends for reading (Producer), Super for writing (Consumer)

---

## Best Practices

- Use meaningful type parameter names: `T` (Type), `E` (Element), `K` (Key), `V` (Value), `N` (Number)
- Use bounded types `<T extends Number>` whenever you need to call type-specific methods
- Prefer `List<String>` over raw `List` — always parameterize generics
- Remember PECS when using wildcards: Producer Extends, Consumer Super
- For utility methods that should accept various collection types, use wildcards

---

## Interview Questions

**Q: What are Java Generics and why were they introduced?**  
A: Generics allow classes, interfaces, and methods to be parameterized by type. They were introduced in Java 5 to provide type safety at compile time, eliminating the need for unsafe casts and catching type errors before runtime. Before generics, collections stored everything as `Object`, leading to potential `ClassCastException` at runtime.

**Q: What is type erasure in Java Generics?**  
A: Type erasure is the process by which the Java compiler removes all generic type information after compiling. At runtime, `List<String>` and `List<Integer>` are both just `List`. This was done to maintain backward compatibility with pre-generics Java code. As a result, you cannot use generics with `instanceof`, create arrays of generic types, or use type parameters in static contexts.

**Q: What is the difference between `<? extends T>` and `<? super T>`?**  
A: `? extends T` is an upper-bounded wildcard — it accepts `T` or any subclass. Used when you need to READ from a collection (producer). `? super T` is a lower-bounded wildcard — it accepts `T` or any superclass. Used when you need to WRITE to a collection (consumer). Remember PECS: Producer Extends, Consumer Super.

**Q: Can you use primitives as type parameters in Generics?**  
A: No. Generics work only with reference types (objects). You cannot write `Box<int>`. You must use wrapper classes: `Box<Integer>`, `Box<Double>`, etc. Java's autoboxing handles the conversion between `int` and `Integer` automatically.

---

## Quick Revision

✔ Generics provide compile-time type safety — errors caught before runtime  
✔ `<T>` is a type parameter placeholder — replaced by actual type when used  
✔ Bounded types: `<T extends Number>` restricts what types are allowed  
✔ Wildcards: `?` (any), `? extends T` (read/producer), `? super T` (write/consumer)  
✔ PECS: Producer Extends, Consumer Super — the wildcard golden rule  

---

## Related Topics

- Collections Framework (uses Generics everywhere)
- Comparable and Comparator (bounded types)
- Java Interfaces and Abstract Classes

---

## Next Lesson

**01 - Collections Overview**
