---
id: hashmap
title: HashMap in Java
description: Master Java HashMap — key-value pairs, core methods, iteration, word frequency counter, and how HashMap works internally.
sidebar_position: 4
keywords:
  - Java
  - HashMap
  - key-value
  - Map
  - put get remove
  - entrySet
  - word frequency
---

# HashMap in Java

> **Reading Time:** 12 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

`HashMap` is a key-value data structure — it maps unique **keys** to **values**, like a dictionary maps words to definitions. It provides O(1) average-time performance for `put()`, `get()`, and `remove()` operations. HashMap is the most widely used `Map` implementation in Java and is part of the `java.util` package.

---

## What You'll Learn

- What HashMap is and how it works internally
- Core methods: `put()`, `get()`, `remove()`, `containsKey()`, `keySet()`, `values()`, `entrySet()`
- How to iterate over a HashMap
- Why HashMap is unordered
- A real-world example: word frequency counter

---

## Prerequisites

- Collections Overview (Lesson 01)
- Java Generics (`<K, V>`)
- Basic Java classes and interfaces

---

## Explanation

### What Is a HashMap?

A `HashMap` stores data as **key-value pairs**. You store a value with a key, and later retrieve it using that same key. Think of it like a phone book — you look up a person's (key) phone number (value).

**Key characteristics:**
- Each key is **unique** — adding a duplicate key overwrites the old value
- Values **can repeat** — multiple keys can map to the same value
- **Unordered** — the order of entries is not guaranteed (use `LinkedHashMap` for insertion order)
- Allows **one null key** and **multiple null values**
- **NOT thread-safe** — use `ConcurrentHashMap` for multi-threaded code

---

### How HashMap Works Internally (Simple Version)

HashMap uses an array of **buckets** (slots) internally. When you call `put(key, value)`:

1. Java calls `key.hashCode()` to get a hash number
2. Uses the hash to calculate a bucket index: `index = hash % arraySize`
3. Stores the key-value pair in that bucket

When you call `get(key)`:
1. Java calls `key.hashCode()` again
2. Calculates the same bucket index
3. Finds and returns the value

This hash-based lookup is why `get()` and `put()` are O(1) on average — no need to scan the whole map.

**What is a collision?** Two different keys might hash to the same bucket index. Java handles this by storing multiple entries in the same bucket as a linked list (or a tree for 8+ entries). Good `hashCode()` implementations minimize collisions.

**Default capacity** is 16 buckets with a load factor of 0.75. When 75% full, the map resizes (doubles) and rehashes all entries.

---

### Creating a HashMap

```java
// Basic HashMap
Map<String, Integer> map = new HashMap<>();

// With initial capacity (avoids resizing)
Map<String, Integer> map2 = new HashMap<>(100);

// Copy constructor
Map<String, Integer> map3 = new HashMap<>(existingMap);
```

---

### Key Methods

#### `put(key, value)` — Insert or Update
If the key doesn't exist, adds the pair. If it does, **replaces** the old value. Returns the old value (or `null` if key was new).

#### `get(key)` — Retrieve Value
Returns the value for the given key, or `null` if the key doesn't exist.

#### `getOrDefault(key, defaultValue)` — Safe Retrieval
Returns the value if found, otherwise returns the provided default value (avoids null checks).

#### `remove(key)` — Delete Entry
Removes the key-value pair for the given key. Returns the removed value (or `null`).

#### `containsKey(key)` — Check Key Exists
Returns `true` if the key is in the map.

#### `containsValue(value)` — Check Value Exists
Returns `true` if any key maps to this value. O(n) operation.

#### `keySet()` — Get All Keys
Returns a `Set<K>` of all keys.

#### `values()` — Get All Values
Returns a `Collection<V>` of all values (may include duplicates).

#### `entrySet()` — Get All Key-Value Pairs
Returns a `Set<Map.Entry<K,V>>` — the most efficient way to iterate over a map.

#### `size()` — Number of Entries
Returns the number of key-value pairs.

#### `isEmpty()` — Check Empty
Returns `true` if the map has no entries.

#### `putIfAbsent(key, value)` — Conditional Insert
Adds the entry only if the key is NOT already present.

---

## Real-World Analogy

A `HashMap` is exactly like a **school locker room**:
- Each locker has a **unique number** (key)
- Inside the locker is the student's **stuff** (value)
- To find your locker, you don't check every locker (linear scan) — you go directly to locker #47 (hash lookup → O(1))
- Two students can't share the same locker number (unique keys)
- But two lockers could contain the same type of items (duplicate values are fine)

The hash function is like the locker numbering system — it tells you exactly where to look.

---

## Code Example

### Example 1: HashMap Basics

```java
import java.util.HashMap;
import java.util.Map;

public class HashMapDemo {
    public static void main(String[] args) {

        Map<String, Integer> phoneBook = new HashMap<>();

        // put() — insert entries
        phoneBook.put("Alice", 12345);
        phoneBook.put("Bob", 67890);
        phoneBook.put("Charlie", 11111);
        phoneBook.put("Diana", 22222);

        System.out.println("Phone Book: " + phoneBook);
        System.out.println("Size: " + phoneBook.size());             // 4

        // get() — retrieve value
        System.out.println("Alice's number: " + phoneBook.get("Alice")); // 12345

        // get() for non-existent key returns null
        System.out.println("Eve's number: " + phoneBook.get("Eve"));     // null

        // getOrDefault() — safe retrieval
        System.out.println("Eve's number (safe): " +
            phoneBook.getOrDefault("Eve", 00000));                       // 0

        // put() with existing key — UPDATES value
        phoneBook.put("Alice", 99999);
        System.out.println("Alice updated: " + phoneBook.get("Alice"));  // 99999

        // containsKey() and containsValue()
        System.out.println("Has 'Bob': " + phoneBook.containsKey("Bob")); // true
        System.out.println("Has number 67890: " + phoneBook.containsValue(67890)); // true

        // remove()
        phoneBook.remove("Charlie");
        System.out.println("After removing Charlie: " + phoneBook);

        // putIfAbsent() — only adds if key not present
        phoneBook.putIfAbsent("Bob", 55555);  // Bob already exists — no change
        phoneBook.putIfAbsent("Frank", 33333); // Frank is new — added
        System.out.println("After putIfAbsent: " + phoneBook.get("Bob"));   // 67890 (unchanged)
        System.out.println("Frank's number: " + phoneBook.get("Frank"));    // 33333
    }
}
```

### Output
```
Phone Book: {Bob=67890, Alice=12345, Charlie=11111, Diana=22222}
Size: 4
Alice's number: 12345
Eve's number: null
Eve's number (safe): 0
Alice updated: 99999
Has 'Bob': true
Has number 67890: true
After removing Charlie: {Bob=67890, Alice=99999, Diana=22222}
After putIfAbsent: 67890
Frank's number: 33333
```

---

### Example 2: Iterating a HashMap

```java
import java.util.*;

public class HashMapIterationDemo {
    public static void main(String[] args) {

        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 88);
        scores.put("Charlie", 92);
        scores.put("Diana", 78);

        // Method 1: keySet() — iterate over keys
        System.out.println("Method 1 — keySet():");
        for (String name : scores.keySet()) {
            System.out.println("  " + name + " → " + scores.get(name));
        }

        // Method 2: values() — iterate over values only
        System.out.println("\nMethod 2 — values():");
        for (int score : scores.values()) {
            System.out.print(score + " ");
        }
        System.out.println();

        // Method 3: entrySet() — MOST EFFICIENT (key + value together)
        System.out.println("\nMethod 3 — entrySet() [RECOMMENDED]:");
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            System.out.printf("  %-10s scored: %d%n",
                entry.getKey(), entry.getValue());
        }

        // Method 4: forEach with lambda (Java 8+)
        System.out.println("\nMethod 4 — forEach lambda:");
        scores.forEach((name, score) ->
            System.out.println("  " + name + ": " + score));
    }
}
```

### Output
```
Method 1 — keySet():
  Bob → 88
  Alice → 95
  Charlie → 92
  Diana → 78

Method 2 — values():
88 95 92 78 

Method 3 — entrySet() [RECOMMENDED]:
  Bob        scored: 88
  Alice      scored: 95
  Charlie    scored: 92
  Diana      scored: 78

Method 4 — forEach lambda:
  Bob: 88
  Alice: 95
  Charlie: 92
  Diana: 78
```

---

### Example 3: Word Frequency Counter

```java
import java.util.*;

public class WordFrequencyCounter {
    public static void main(String[] args) {

        String text = "the cat sat on the mat the cat is fat the mat is flat";
        String[] words = text.split(" ");

        // Count frequency of each word
        Map<String, Integer> frequency = new HashMap<>();

        for (String word : words) {
            // getOrDefault avoids null check
            frequency.put(word, frequency.getOrDefault(word, 0) + 1);
        }

        // Print all word frequencies
        System.out.println("Word Frequencies:");
        for (Map.Entry<String, Integer> entry : frequency.entrySet()) {
            System.out.printf("  %-8s → %d time(s)%n",
                entry.getKey(), entry.getValue());
        }

        // Find the most frequent word
        String mostFrequent = "";
        int maxCount = 0;
        for (Map.Entry<String, Integer> entry : frequency.entrySet()) {
            if (entry.getValue() > maxCount) {
                maxCount = entry.getValue();
                mostFrequent = entry.getKey();
            }
        }

        System.out.println("\nMost frequent word: '" + mostFrequent
            + "' appears " + maxCount + " times");

        System.out.println("Total unique words: " + frequency.size());
        System.out.println("Total words: " + words.length);
    }
}
```

### Output
```
Word Frequencies:
  the      → 4 time(s)
  cat      → 2 time(s)
  sat      → 1 time(s)
  on       → 1 time(s)
  mat      → 2 time(s)
  is       → 2 time(s)
  fat      → 1 time(s)
  flat     → 1 time(s)

Most frequent word: 'the' appears 4 times
Total unique words: 8
Total words: 12
```

---

## Common Mistakes

- ❌ **Mistake**: Relying on HashMap to maintain insertion order → ✅ **Fix**: Use `LinkedHashMap` for insertion order, `TreeMap` for sorted order
- ❌ **Mistake**: Using `get()` without checking for null first → ✅ **Fix**: Use `getOrDefault()` or `containsKey()` before `get()`
- ❌ **Mistake**: Iterating with `keySet()` then calling `get()` for each key (2 lookups) → ✅ **Fix**: Use `entrySet()` — gives you key and value together in one lookup
- ❌ **Mistake**: Using mutable objects as keys without overriding `hashCode()` and `equals()` → ✅ **Fix**: Keys should be immutable or at least have stable `hashCode()` implementations (Strings are perfect keys)

---

## Best Practices

- Use `entrySet()` for iteration — it's more efficient than `keySet()` + `get()`
- Use `getOrDefault(key, default)` to avoid null checks for missing keys
- Use `putIfAbsent()` for "add if not present" logic — cleaner than checking and then putting
- Prefer `String` or wrapper types (`Integer`, `Long`) as HashMap keys — they have correct `hashCode()` and `equals()` implementations
- Set initial capacity if you know the approximate size: `new HashMap<>(expectedSize * 2)` to avoid resizing

---

## Interview Questions

**Q: How does HashMap work internally?**  
A: HashMap uses an array of "buckets". When you call `put(key, value)`, Java computes `key.hashCode()`, maps it to a bucket index, and stores the entry there. On `get(key)`, it computes the same hash, goes to the same bucket, and retrieves the value. When two keys hash to the same bucket (collision), entries are stored as a linked list (or tree for 8+ entries from Java 8). Average O(1) for get/put.

**Q: What happens when two keys have the same hash code in a HashMap?**  
A: This is called a **hash collision**. Both entries are stored in the same bucket as a linked list. When retrieving, Java uses `equals()` to find the correct entry within the bucket. From Java 8 onwards, when a bucket has 8+ entries, the linked list is converted to a balanced BST (red-black tree) for O(log n) lookup instead of O(n).

**Q: Why is HashMap unordered?**  
A: HashMap stores entries based on their hash codes, not insertion order. Hash codes determine the bucket index, which bears no relation to the order entries were added. Use `LinkedHashMap` (insertion order) or `TreeMap` (key sort order) if ordering matters.

**Q: What is the difference between `HashMap` and `Hashtable`?**  
A: Both store key-value pairs, but: `Hashtable` is synchronized (thread-safe) and was introduced in Java 1.0. `HashMap` is not synchronized and was introduced in Java 2. `HashMap` is faster (no synchronization overhead), allows one null key and null values, while `Hashtable` allows neither. For thread safety, use `ConcurrentHashMap` instead of `Hashtable`.

---

## Quick Revision

✔ HashMap stores key-value pairs; each key is unique; values can repeat  
✔ Average O(1) for `put()`, `get()`, `remove()` — uses hash codes  
✔ HashMap is UNORDERED — don't rely on key order  
✔ `entrySet()` is the most efficient way to iterate (key + value together)  
✔ Use `getOrDefault()` to avoid NPE when key might be missing  

---

## Related Topics

- HashSet (Lesson 05) — uses HashMap internally for uniqueness
- TreeMap and TreeSet (Lesson 06) — sorted order
- Comparable and Comparator (Lesson 08)

---

## Next Lesson

**05 - HashSet**
