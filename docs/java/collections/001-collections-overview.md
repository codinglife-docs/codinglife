---
id: collections-overview
title: Collections Framework Overview
description: A complete overview of the Java Collections Framework — hierarchy, interfaces, and when to use List, Set, Queue, and Map.
sidebar_position: 1
keywords:
  - Java
  - Collections Framework
  - List
  - Set
  - Map
  - Queue
  - Collection hierarchy
---

# Collections Framework Overview

> **Reading Time:** 10 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

The **Java Collections Framework** is a set of classes and interfaces that provide ready-made data structures for storing, organising, and manipulating groups of objects. Instead of writing your own linked list or hash table from scratch, Java gives you `ArrayList`, `HashMap`, `HashSet`, and many others — all part of the `java.util` package.

---

## What You'll Learn

- What the Collections Framework is and why it exists
- The hierarchy of collection interfaces (ASCII diagram)
- The difference between `Collection` (interface) and `Collections` (utility class)
- When to use `List`, `Set`, `Queue`, and `Map`
- Overview of the most important implementations

---

## Prerequisites

- Java Generics (type parameters like `<E>`)
- Java Interfaces and classes
- Basic Java syntax

---

## Explanation

### What Is the Collections Framework?

Before the Collections Framework (pre-Java 2), Java had `Vector`, `Stack`, `Hashtable`, and arrays — inconsistent, poorly designed, and hard to use together. Java 2 introduced a unified framework with consistent interfaces and implementations.

The Collections Framework gives you:
- **Data structures**: Lists, Sets, Queues, Maps (Trees, Hash tables, Linked lists...)
- **Algorithms**: Sorting, searching, shuffling (via the `Collections` utility class)
- **Interoperability**: All collections work together through common interfaces

---

### The Hierarchy — ASCII Diagram

```
java.lang.Iterable
    └── java.util.Collection (interface)
            ├── java.util.List (interface)
            │       ├── ArrayList
            │       ├── LinkedList
            │       └── Vector (legacy)
            │           └── Stack (legacy)
            │
            ├── java.util.Set (interface)
            │       ├── HashSet
            │       │   └── LinkedHashSet
            │       └── SortedSet (interface)
            │           └── TreeSet
            │
            └── java.util.Queue (interface)
                    ├── LinkedList
                    ├── PriorityQueue
                    └── Deque (interface)
                        ├── ArrayDeque
                        └── LinkedList

java.util.Map (interface)  ← NOT a Collection!
        ├── HashMap
        │   └── LinkedHashMap
        ├── SortedMap (interface)
        │   └── TreeMap
        └── Hashtable (legacy)
            └── Properties
```

**Key observation:** `Map` is NOT part of the `Collection` interface hierarchy — it stands alone because it stores key-value pairs rather than individual elements.

---

### `Collection` vs `Collections` — Don't Confuse Them!

| | `Collection` | `Collections` |
|---|---|---|
| Type | Interface | Class |
| Package | java.util | java.util |
| Purpose | Root interface for List, Set, Queue | Utility class with static methods |
| Examples | `Collection<String> c = new ArrayList<>()` | `Collections.sort(list)`, `Collections.shuffle(list)` |

`Collection` (singular) defines what collections CAN DO.  
`Collections` (plural) provides HELPER METHODS that work on collections.

---

### List Interface — Ordered, Allows Duplicates

`List` is an ordered collection that preserves insertion order and allows duplicate elements. Each element has an index (position).

**Use when:** Order matters, duplicates are allowed, you need index-based access.

Key implementations:
- **`ArrayList`** — Fast random access by index, slow insertion/deletion in middle
- **`LinkedList`** — Fast insertion/deletion anywhere, slow random access by index
- **`Vector`** — Legacy; like ArrayList but synchronized (use `ArrayList` instead)

```java
List<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");
names.add("Alice"); // duplicates allowed!
System.out.println(names.get(0)); // Alice — index access
```

---

### Set Interface — No Duplicates, No Guaranteed Order

`Set` is a collection that **does not allow duplicate elements**. Most implementations do NOT preserve insertion order.

**Use when:** You need unique elements, you're checking membership, order doesn't matter.

Key implementations:
- **`HashSet`** — Fastest; no order guaranteed; uses hash table
- **`LinkedHashSet`** — Preserves insertion order; slightly slower than HashSet
- **`TreeSet`** — Sorted in natural order; uses a Red-Black tree; slowest but sorted

```java
Set<String> fruits = new HashSet<>();
fruits.add("apple");
fruits.add("banana");
fruits.add("apple"); // silently ignored — already exists!
System.out.println(fruits.size()); // 2
```

---

### Queue Interface — FIFO (First In, First Out)

`Queue` is designed for holding elements prior to processing. Elements are added at the tail and removed from the head.

**Use when:** You need FIFO processing (tasks, print queues, breadth-first search).

Key implementations:
- **`LinkedList`** — General-purpose queue
- **`PriorityQueue`** — Elements sorted by priority (smallest first by default)
- **`ArrayDeque`** — Double-ended queue (deque); can add/remove from both ends

```java
Queue<String> queue = new LinkedList<>();
queue.offer("First");
queue.offer("Second");
queue.offer("Third");
System.out.println(queue.poll()); // First (removed from head)
System.out.println(queue.peek()); // Second (looked at without removing)
```

---

### Map Interface — Key-Value Pairs

`Map` stores data as key-value pairs. Each key is unique; values can repeat. It's like a dictionary — look up a value by its key.

**Use when:** You need to associate one thing with another (name → phone number, word → count).

Key implementations:
- **`HashMap`** — Fastest; no order on keys; allows one null key
- **`LinkedHashMap`** — Preserves insertion order of keys
- **`TreeMap`** — Keys sorted in natural order
- **`Hashtable`** — Legacy; synchronized; don't use (use `ConcurrentHashMap` for threads)

```java
Map<String, Integer> phoneBook = new HashMap<>();
phoneBook.put("Alice", 12345);
phoneBook.put("Bob", 67890);
System.out.println(phoneBook.get("Alice")); // 12345
```

---

### When to Use Which?

| Need | Use |
|---|---|
| Ordered list with duplicates | `ArrayList` |
| Frequent insert/delete in middle | `LinkedList` |
| Unique elements, fast lookup | `HashSet` |
| Unique elements, sorted | `TreeSet` |
| Unique elements, insertion order | `LinkedHashSet` |
| FIFO queue | `LinkedList` or `ArrayDeque` |
| Priority-based processing | `PriorityQueue` |
| Key-value pairs, fast lookup | `HashMap` |
| Key-value pairs, sorted by key | `TreeMap` |
| Key-value pairs, insertion order | `LinkedHashMap` |

---

## Real-World Analogy

Think of the Collections Framework as different types of **storage solutions** at a supermarket:

- **`List`** (ArrayList) = A **numbered shelf** — each item has a position, duplicates OK, you can grab item #5 directly
- **`Set`** (HashSet) = A **unique product catalogue** — no two identical entries; only one "Apple" listing
- **`Queue`** = A **checkout line** — first customer in gets served first (FIFO)
- **`Map`** (HashMap) = A **phone book** — look up any person's number by their name instantly

---

## Code Example

```java
import java.util.*;

public class CollectionsOverviewDemo {
    public static void main(String[] args) {

        // === LIST — ordered, duplicates allowed ===
        List<String> shoppingList = new ArrayList<>();
        shoppingList.add("Milk");
        shoppingList.add("Bread");
        shoppingList.add("Milk");  // Duplicate allowed
        System.out.println("List: " + shoppingList);         // [Milk, Bread, Milk]
        System.out.println("Item at index 1: " + shoppingList.get(1)); // Bread

        // === SET — no duplicates ===
        Set<String> uniqueFruits = new HashSet<>();
        uniqueFruits.add("Apple");
        uniqueFruits.add("Banana");
        uniqueFruits.add("Apple");  // Ignored — already exists
        System.out.println("Set: " + uniqueFruits);  // [Apple, Banana] (order may vary)
        System.out.println("Set size: " + uniqueFruits.size()); // 2

        // === QUEUE — FIFO ===
        Queue<String> printJobs = new LinkedList<>();
        printJobs.offer("Document1.pdf");
        printJobs.offer("Photo.jpg");
        printJobs.offer("Report.docx");
        System.out.println("Next print job: " + printJobs.poll()); // Document1.pdf
        System.out.println("Remaining queue: " + printJobs);

        // === MAP — key-value pairs ===
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 88);
        scores.put("Charlie", 92);
        System.out.println("Alice's score: " + scores.get("Alice")); // 95
        System.out.println("Map: " + scores);

        // === Collections utility class ===
        List<Integer> numbers = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9, 3));
        System.out.println("Before sort: " + numbers);
        Collections.sort(numbers);
        System.out.println("After sort: " + numbers);
        System.out.println("Max: " + Collections.max(numbers));
        System.out.println("Min: " + Collections.min(numbers));
    }
}
```

### Output
```
List: [Milk, Bread, Milk]
Item at index 1: Bread
Set: [Apple, Banana]
Set size: 2
Next print job: Document1.pdf
Remaining queue: [Photo.jpg, Report.docx]
Alice's score: 95
Map: {Alice=95, Bob=88, Charlie=92}
Before sort: [5, 2, 8, 1, 9, 3]
After sort: [1, 2, 3, 5, 8, 9]
Max: 9
Min: 1
```

---

## Common Mistakes

- ❌ **Mistake**: Confusing `Collection` (interface) with `Collections` (utility class) → ✅ **Fix**: Remember — one is a type, the other has static methods like `sort()` and `shuffle()`
- ❌ **Mistake**: Using `Map` as if it extends `Collection` → ✅ **Fix**: `Map` is a separate hierarchy — it doesn't implement `Collection`
- ❌ **Mistake**: Choosing the wrong data structure (e.g., `ArrayList` when uniqueness matters) → ✅ **Fix**: Think about requirements first — ordered? unique? key-value? frequency?
- ❌ **Mistake**: Using legacy classes (`Vector`, `Hashtable`) → ✅ **Fix**: Use `ArrayList`, `HashMap`, or `ConcurrentHashMap` for threads

---

## Best Practices

- Program to the interface: use `List<String> list = new ArrayList<>()` not `ArrayList<String> list = new ArrayList<>()`
- Choose the data structure based on your needs before writing code
- Use `Collections.unmodifiableList()` to create read-only views of collections
- Set initial capacity when you know approximate size: `new ArrayList<>(1000)` avoids resizing
- Prefer `isEmpty()` over `size() == 0` for checking empty collections

---

## Interview Questions

**Q: What is the difference between `Collection` and `Collections` in Java?**  
A: `Collection` (singular) is a root interface in the Java Collections Framework that is extended by `List`, `Set`, and `Queue`. `Collections` (plural) is a utility class in `java.util` that provides static methods for operating on collections, like `sort()`, `shuffle()`, `max()`, `min()`, `frequency()`, and `unmodifiableList()`.

**Q: Is `Map` a part of the `Collection` interface?**  
A: No. `Map` is NOT part of the `Collection` interface hierarchy. While `List`, `Set`, and `Queue` all extend `Collection`, `Map` is completely separate because it stores key-value pairs rather than individual elements. However, `Map` is still part of the Java Collections Framework.

**Q: What are the key differences between List, Set, and Map?**  
A: `List` is ordered, allows duplicates, supports index-based access. `Set` does not allow duplicates, most implementations have no guaranteed order. `Map` stores key-value pairs where each key is unique — it's not a collection of individual elements but of entries.

---

## Quick Revision

✔ Collections Framework = unified library of data structures in `java.util`  
✔ `Collection` is an interface; `Collections` is a utility class with static methods  
✔ `Map` is NOT a `Collection` — separate hierarchy  
✔ List = ordered + duplicates; Set = unique; Queue = FIFO; Map = key-value  
✔ Program to interfaces: `List<T>`, not `ArrayList<T>` on the left side  

---

## Related Topics

- ArrayList (Lesson 02)
- HashMap (Lesson 04)
- Generics — used everywhere in collections

---

## Next Lesson

**02 - ArrayList**
