---
id: stream-api
title: Stream API
description: Master Java 8 Stream API — learn to create streams, use filter/map/sorted and collect/reduce terminal operations with real examples.
sidebar_position: 3
keywords:
  - Java
  - Stream API
  - Java 8
  - filter
  - map
  - collect
  - reduce
---

# Stream API

> **Reading Time:** 12 Minutes  
> **Difficulty:** Intermediate

---

## Topic Summary

The Stream API lets you process collections of data in a clean, pipeline-style way. Instead of writing loops and if-statements manually, you describe *what* you want — filter, transform, sort, collect — and Java does the *how*. Think of it like an assembly line for your data.

---

## What You'll Learn

- What a Stream is and how it differs from a Collection
- How to create streams from different sources
- Intermediate operations: `filter()`, `map()`, `sorted()`, `distinct()`, `limit()`
- Terminal operations: `collect()`, `forEach()`, `count()`, `reduce()`, `findFirst()`
- Real-world example: filtering students with marks > 80

---

## Prerequisites

- Lambda Expressions (Lesson 1)
- Functional Interfaces (Lesson 2)
- Basic Java Collections (List, Set)

---

## Explanation

### What is a Stream?

A **Stream** is a sequence of elements that you can process one by one, using a pipeline of operations. Streams:
- Do **not** store data (unlike a List or Array)
- Do **not** modify the original data source
- Are **lazy** — intermediate operations don't run until a terminal operation is called
- Can only be **consumed once** — after a terminal operation, the stream is closed

---

### Stream vs Collection

| Feature | Collection | Stream |
|---------|-----------|--------|
| Stores data? | ✅ Yes | ❌ No |
| Modifies source? | ✅ Can | ❌ Never |
| Iteration | External (you write the loop) | Internal (stream handles it) |
| Reusable? | ✅ Yes | ❌ No (one-time use) |
| Lazy evaluation? | ❌ No | ✅ Yes |

---

### Creating Streams

**From a List:**
```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
Stream<String> stream = names.stream();
```

**From an Array:**
```java
int[] numbers = {1, 2, 3, 4, 5};
IntStream stream = Arrays.stream(numbers);
```

**Using Stream.of():**
```java
Stream<String> stream = Stream.of("Java", "Python", "Go");
```

**Infinite stream (with limit):**
```java
Stream<Integer> naturals = Stream.iterate(1, n -> n + 1);
```

---

### Intermediate Operations (Lazy — return a new Stream)

Intermediate operations transform the stream and return another stream. They don't do anything until a terminal operation is called.

#### `filter(Predicate)` — Keep elements that match

```java
list.stream()
    .filter(n -> n > 10)  // keep only numbers > 10
```

#### `map(Function)` — Transform each element

```java
list.stream()
    .map(s -> s.toUpperCase())  // convert each to uppercase
```

#### `sorted()` — Sort elements (natural order or custom)

```java
list.stream()
    .sorted()                        // alphabetical / natural
    .sorted((a, b) -> b - a)         // custom: descending
```

#### `distinct()` — Remove duplicates

```java
Stream.of(1, 2, 2, 3, 3, 3).distinct()  // → 1, 2, 3
```

#### `limit(n)` — Take only first N elements

```java
stream.limit(5)  // take only 5 elements
```

#### `skip(n)` — Skip first N elements

```java
stream.skip(2)  // skip first 2, take rest
```

#### `peek()` — Debug without consuming (look but don't change)

```java
stream.peek(e -> System.out.println("Seeing: " + e))
```

---

### Terminal Operations (Eager — consume the Stream)

Terminal operations trigger the pipeline to run and produce a result.

#### `collect(Collectors.toList())` — Gather results into a List

```java
List<String> result = stream.collect(Collectors.toList());
```

#### `forEach(Consumer)` — Do something with each element

```java
stream.forEach(s -> System.out.println(s));
```

#### `count()` — Count elements

```java
long count = stream.count();
```

#### `reduce(identity, BinaryOperator)` — Combine all elements into one

```java
int sum = Stream.of(1,2,3,4,5).reduce(0, (a, b) -> a + b);
// sum = 15
```

#### `findFirst()` — Get the first element (returns Optional)

```java
Optional<String> first = stream.findFirst();
```

#### `anyMatch()`, `allMatch()`, `noneMatch()` — Test conditions

```java
boolean anyOver80 = marks.stream().anyMatch(m -> m > 80);
boolean allPassed = marks.stream().allMatch(m -> m >= 40);
```

#### `min()` and `max()` — Find smallest or largest

```java
Optional<Integer> min = numbers.stream().min(Integer::compareTo);
Optional<Integer> max = numbers.stream().max(Integer::compareTo);
```

---

### The Stream Pipeline

A typical stream pipeline looks like:

```
source → intermediate ops → intermediate ops → terminal op
```

```java
list.stream()           // source
    .filter(...)        // intermediate
    .map(...)           // intermediate
    .sorted()           // intermediate
    .collect(...)       // terminal → kicks everything off
```

---

## Real-World Analogy

Think of a Stream pipeline like a **water treatment plant**:
- Water enters from a source (river/lake = your list)
- It passes through filters (remove dirt = `filter()`)
- It gets treated/transformed (purified = `map()`)
- It gets sorted into bottles (sorted = `sorted()`)
- Finally it's collected in tanks (`collect()`)

Each stage works on the water flowing through — it doesn't store it.

---

## Code Example

### Example 1: Filter Students with Marks > 80

```java
import java.util.*;
import java.util.stream.*;

public class StreamDemo {
    public static void main(String[] args) {
        List<String> students = Arrays.asList("Alice", "Bob", "Charlie", "Diana", "Eve");
        List<Integer> marks = Arrays.asList(92, 45, 83, 67, 95);

        // Find students with marks > 80
        System.out.println("=== Students with marks > 80 ===");
        for (int i = 0; i < students.size(); i++) {
            int mark = marks.get(i);
            String name = students.get(i);
            if (mark > 80) {
                System.out.println(name + ": " + mark);
            }
        }
    }
}
```

### Output
```
=== Students with marks > 80 ===
Alice: 92
Charlie: 83
Eve: 95
```

---

### Example 2: Full Stream Pipeline

```java
import java.util.*;
import java.util.stream.*;

public class FullStreamPipeline {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(5, 3, 8, 1, 9, 2, 7, 4, 6, 8, 3);

        // Pipeline: filter evens, square them, sort descending, take top 3
        List<Integer> result = numbers.stream()
                .filter(n -> n % 2 == 0)           // keep even: 8, 2, 4, 6, 8
                .map(n -> n * n)                    // square: 64, 4, 16, 36, 64
                .sorted((a, b) -> b - a)            // sort descending: 64, 64, 36, 16, 4
                .distinct()                         // remove duplicates: 64, 36, 16, 4
                .limit(3)                           // take first 3: 64, 36, 16
                .collect(Collectors.toList());      // collect to list

        System.out.println("Top 3 unique squared even numbers: " + result);

        // Count of odd numbers
        long oddCount = numbers.stream()
                .filter(n -> n % 2 != 0)
                .count();
        System.out.println("Count of odd numbers: " + oddCount);

        // Sum all numbers using reduce
        int total = numbers.stream()
                .reduce(0, Integer::sum);
        System.out.println("Sum of all numbers: " + total);

        // Find any number greater than 7
        Optional<Integer> bigNumber = numbers.stream()
                .filter(n -> n > 7)
                .findFirst();
        bigNumber.ifPresent(n -> System.out.println("First number > 7: " + n));
    }
}
```

### Output
```
Top 3 unique squared even numbers: [64, 36, 16]
Count of odd numbers: 5
Sum of all numbers: 56
First number > 7: 8
```

---

### Example 3: Working with Strings

```java
import java.util.*;
import java.util.stream.*;

public class StringStreamDemo {
    public static void main(String[] args) {
        List<String> cities = Arrays.asList(
            "Mumbai", "Delhi", "Bangalore", "Chennai", "Mumbai", "Pune", "Delhi"
        );

        // Unique cities starting with 'M', uppercased, sorted
        List<String> result = cities.stream()
                .distinct()                                   // remove duplicates
                .filter(c -> c.startsWith("M"))               // starts with M
                .map(String::toUpperCase)                     // uppercase
                .sorted()                                     // alphabetical
                .collect(Collectors.toList());

        System.out.println("Result: " + result);

        // Join all unique cities with comma
        String joined = cities.stream()
                .distinct()
                .sorted()
                .collect(Collectors.joining(", "));
        System.out.println("All cities: " + joined);
    }
}
```

### Output
```
Result: [MUMBAI]
All cities: Bangalore, Chennai, Delhi, Mumbai, Pune
```

---

## Common Mistakes

- ❌ **Mistake**: Reusing a stream after a terminal operation → ✅ **Fix**: Streams can only be consumed once. Create a new stream each time
- ❌ **Mistake**: Expecting intermediate operations to run without a terminal operation → ✅ **Fix**: Streams are lazy — nothing runs until a terminal op (`collect`, `forEach`, `count` etc.) is called
- ❌ **Mistake**: Modifying the source list inside a stream lambda → ✅ **Fix**: Never modify the source collection inside stream operations — it causes `ConcurrentModificationException`
- ❌ **Mistake**: Using `stream()` on `null` → ✅ **Fix**: Always check for null before calling `.stream()`, or use `Optional`
- ❌ **Mistake**: Forgetting that `findFirst()` returns `Optional<T>`, not `T` → ✅ **Fix**: Use `.get()`, `.orElse()`, or `.ifPresent()` to access the value

---

## Best Practices

- Prefer streams over manual `for` loops for data processing — they're cleaner and more readable
- Keep stream pipelines readable — one operation per line
- Use `parallelStream()` for large datasets (but measure performance before using it)
- Avoid side effects inside `map()` — keep transformations pure
- Use `Collectors.joining()`, `Collectors.groupingBy()`, `Collectors.toMap()` for powerful aggregations

---

## Interview Questions

**Q: What is the difference between `map()` and `filter()` in streams?**  
A: `filter()` takes a Predicate and keeps only elements that match — it doesn't change elements, just removes some. `map()` takes a Function and transforms each element into something new — every element stays but is converted.

**Q: What is the difference between intermediate and terminal operations?**  
A: Intermediate operations (like `filter`, `map`, `sorted`) return a new Stream and are lazy — they don't execute until a terminal operation triggers the pipeline. Terminal operations (like `collect`, `forEach`, `count`) produce a result and consume the stream.

**Q: Can you reuse a Stream?**  
A: No. Once a terminal operation is called on a stream, the stream is closed and cannot be reused. You need to create a new stream from the source each time.

**Q: What is the difference between `findFirst()` and `findAny()`?**  
A: `findFirst()` always returns the first element in encounter order. `findAny()` may return any element — it's designed for parallel streams where order doesn't matter and performance matters more.

**Q: What is `reduce()` in streams?**  
A: `reduce()` combines all stream elements into a single result using a `BinaryOperator`. For example, `reduce(0, Integer::sum)` adds all numbers together. It takes an identity value (starting point) and an accumulator function.

---

## Quick Revision

✔ Stream = pipeline for processing data, not a data store  
✔ Intermediate ops are **lazy** (filter, map, sorted, distinct, limit)  
✔ Terminal ops **trigger execution** (collect, forEach, count, reduce, findFirst)  
✔ Streams are **single-use** — create a new one each time  
✔ Use `Collectors.toList()` to collect results back into a list  

---

## Related Topics

- Functional Interfaces
- Lambda Expressions
- Optional Class
- Method References
- Collectors API

---

## Next Lesson

**Lesson 4 — Optional Class**
