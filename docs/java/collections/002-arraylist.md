---
id: arraylist
title: ArrayList in Java
description: Master ArrayList — dynamic arrays, key methods, iteration, sorting, and comparing ArrayList with regular arrays.
sidebar_position: 2
keywords:
  - Java
  - ArrayList
  - dynamic array
  - List
  - Collections
  - add remove get sort
---

# ArrayList in Java

> **Reading Time:** 10 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

`ArrayList` is a **resizable array** implementation of the `List` interface. Unlike regular Java arrays whose size is fixed at creation, `ArrayList` can grow and shrink automatically as you add or remove elements. It is the most commonly used collection in Java and is backed by an internal `Object[]` array.

---

## What You'll Learn

- What ArrayList is and how it differs from a regular array
- How to create and use an ArrayList
- Key methods: `add()`, `remove()`, `get()`, `size()`, `contains()`, `sort()`
- How to iterate over an ArrayList
- A real-world example: managing a student list

---

## Prerequisites

- Java Arrays basics
- Collections Framework Overview (Lesson 01)
- Generics (`<E>` type parameters)

---

## Explanation

### ArrayList vs Regular Array

| Feature | Array | ArrayList |
|---|---|---|
| Size | Fixed at creation | Dynamic — grows/shrinks |
| Syntax | `int[] arr = new int[5]` | `ArrayList<Integer> list = new ArrayList<>()` |
| Primitives | Supports `int`, `double`, etc. | Stores only objects (`Integer`, `Double`) |
| Built-in methods | None | `add()`, `remove()`, `sort()`, many more |
| Performance | Slightly faster | Slight overhead from resizing |
| Part of | Language | `java.util` package |

**When to use ArrayList over arrays:**
- When you don't know the final size in advance
- When you need to add/remove elements frequently
- When you need built-in methods like `sort()`, `contains()`, `indexOf()`

---

### How ArrayList Works Internally

`ArrayList` internally uses an `Object[]` array. Its default initial capacity is **10**. When you add the 11th element:
1. ArrayList creates a new array with capacity = `old capacity × 1.5` (approximately)
2. Copies all existing elements to the new array
3. Adds the new element

This **resizing** process is called "growing" and takes O(n) time when it happens, but it happens rarely enough that `add()` is amortized O(1).

---

### Creating an ArrayList

```java
// Empty ArrayList — can hold Strings
List<String> names = new ArrayList<>();

// With initial capacity (avoid resizing if you know roughly how many)
List<String> names2 = new ArrayList<>(100);

// Initialize from another collection
List<Integer> numbers = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
```

---

### Key Methods

#### `add(element)` — Add to End
Adds an element to the end. O(1) amortized.

#### `add(index, element)` — Insert at Position
Inserts at the given index, shifting all elements after it right. O(n).

#### `get(index)` — Access by Index
Returns the element at the given index. O(1) — this is ArrayList's strength.

#### `set(index, element)` — Replace at Position
Replaces the element at the given index with a new value.

#### `remove(index)` — Remove by Index
Removes and returns the element at the given index. Elements after shift left.

#### `remove(Object)` — Remove by Value
Removes the FIRST occurrence of the given value. Returns `true` if removed.

#### `size()` — Count Elements
Returns the current number of elements.

#### `isEmpty()` — Check if Empty
Returns `true` if the list has no elements.

#### `contains(element)` — Check Membership
Returns `true` if the list contains the given element. O(n).

#### `indexOf(element)` — Find Position
Returns the index of the first occurrence, or `-1` if not found.

#### `clear()` — Remove All
Removes all elements from the list.

#### `Collections.sort(list)` — Sort
Sorts the list in natural order (ascending for numbers, alphabetical for strings).

#### `iterator()` / enhanced for-loop — Iteration
Iterates through all elements one by one.

---

### Time Complexity Summary

| Operation | Complexity |
|---|---|
| `get(index)` | O(1) |
| `add(end)` | O(1) amortized |
| `add(index)` | O(n) |
| `remove(index)` | O(n) |
| `contains()` | O(n) |
| `size()` | O(1) |

---

## Real-World Analogy

Think of `ArrayList` as a **shopping list** on a piece of paper.

A regular Java array is like a **fixed-size grid** on the paper — you draw 5 boxes and can only write 5 things. If you need a 6th item, you have to start over on a new piece of paper with 6 boxes.

An `ArrayList` is like a **scrollable shopping list** on your phone — you can keep adding items as long as you want. The app automatically gives you more space. You can insert an item anywhere, delete any item, and the list automatically adjusts.

---

## Code Example

### Example 1: ArrayList Basics

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ArrayListBasics {
    public static void main(String[] args) {

        // Create an ArrayList
        List<String> fruits = new ArrayList<>();

        // add() — add elements
        fruits.add("Mango");
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Cherry");

        System.out.println("Fruits: " + fruits);           // [Mango, Apple, Banana, Cherry]
        System.out.println("Size: " + fruits.size());      // 4

        // get() — access by index
        System.out.println("Index 1: " + fruits.get(1));   // Apple

        // set() — update at index
        fruits.set(1, "Kiwi");
        System.out.println("After set: " + fruits);        // [Mango, Kiwi, Banana, Cherry]

        // add(index, element) — insert at position
        fruits.add(2, "Grapes");
        System.out.println("After insert: " + fruits);     // [Mango, Kiwi, Grapes, Banana, Cherry]

        // remove by index
        fruits.remove(0);
        System.out.println("After remove index 0: " + fruits); // [Kiwi, Grapes, Banana, Cherry]

        // remove by value
        fruits.remove("Grapes");
        System.out.println("After remove 'Grapes': " + fruits); // [Kiwi, Banana, Cherry]

        // contains() and indexOf()
        System.out.println("Contains 'Banana': " + fruits.contains("Banana")); // true
        System.out.println("Index of 'Cherry': " + fruits.indexOf("Cherry"));  // 2

        // Sort
        Collections.sort(fruits);
        System.out.println("Sorted: " + fruits);           // [Banana, Cherry, Kiwi]

        // isEmpty() and clear()
        System.out.println("Is empty: " + fruits.isEmpty()); // false
        fruits.clear();
        System.out.println("After clear: " + fruits);      // []
        System.out.println("Is empty: " + fruits.isEmpty()); // true
    }
}
```

### Output
```
Fruits: [Mango, Apple, Banana, Cherry]
Size: 4
Index 1: Apple
After set: [Mango, Kiwi, Banana, Cherry]
After insert: [Mango, Kiwi, Grapes, Banana, Cherry]
After remove index 0: [Kiwi, Grapes, Banana, Cherry]
After remove 'Grapes': [Kiwi, Banana, Cherry]
Contains 'Banana': true
Index of 'Cherry': 2
Sorted: [Banana, Cherry, Kiwi]
Is empty: false
After clear: []
Is empty: true
```

---

### Example 2: Real-World — Student List Manager

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class StudentListManager {

    public static void main(String[] args) {

        List<String> students = new ArrayList<>();

        // Enroll students
        students.add("Alice Johnson");
        students.add("Bob Smith");
        students.add("Charlie Brown");
        students.add("Diana Prince");
        students.add("Eve Wilson");

        System.out.println("=== Student List ===");
        printRoster(students);

        // Add a late enrollment
        students.add(2, "Frank Castle");  // Insert at position 2
        System.out.println("\n=== After Late Enrollment ===");
        printRoster(students);

        // Remove a student who withdrew
        students.remove("Charlie Brown");
        System.out.println("\n=== After Withdrawal ===");
        printRoster(students);

        // Search
        String searchStudent = "Diana Prince";
        if (students.contains(searchStudent)) {
            System.out.println("\n" + searchStudent + " is enrolled at position: "
                + (students.indexOf(searchStudent) + 1));
        }

        // Sort alphabetically
        Collections.sort(students);
        System.out.println("\n=== Alphabetical Order ===");
        printRoster(students);

        System.out.println("\nTotal students: " + students.size());
    }

    static void printRoster(List<String> students) {
        for (int i = 0; i < students.size(); i++) {
            System.out.println("  " + (i + 1) + ". " + students.get(i));
        }
    }
}
```

### Output
```
=== Student List ===
  1. Alice Johnson
  2. Bob Smith
  3. Charlie Brown
  4. Diana Prince
  5. Eve Wilson

=== After Late Enrollment ===
  1. Alice Johnson
  2. Bob Smith
  3. Frank Castle
  4. Charlie Brown
  5. Diana Prince
  6. Eve Wilson

=== After Withdrawal ===
  1. Alice Johnson
  2. Bob Smith
  3. Frank Castle
  4. Diana Prince
  5. Eve Wilson

Diana Prince is enrolled at position: 4

=== Alphabetical Order ===
  1. Alice Johnson
  2. Bob Smith
  3. Diana Prince
  4. Eve Wilson
  5. Frank Castle

Total students: 5
```

---

### Example 3: Iterating an ArrayList

```java
import java.util.*;

public class IterationDemo {
    public static void main(String[] args) {

        List<Integer> numbers = new ArrayList<>(Arrays.asList(10, 20, 30, 40, 50));

        // Method 1: for loop with index
        System.out.println("For loop:");
        for (int i = 0; i < numbers.size(); i++) {
            System.out.print(numbers.get(i) + " ");
        }

        // Method 2: enhanced for-each loop (most common)
        System.out.println("\nFor-each loop:");
        for (int num : numbers) {
            System.out.print(num + " ");
        }

        // Method 3: Iterator
        System.out.println("\nIterator:");
        Iterator<Integer> it = numbers.iterator();
        while (it.hasNext()) {
            System.out.print(it.next() + " ");
        }

        // Method 4: forEach with lambda (Java 8+)
        System.out.println("\nforEach lambda:");
        numbers.forEach(n -> System.out.print(n + " "));
        System.out.println();
    }
}
```

### Output
```
For loop:
10 20 30 40 50 
For-each loop:
10 20 30 40 50 
Iterator:
10 20 30 40 50 
forEach lambda:
10 20 30 40 50 
```

---

## Common Mistakes

- ❌ **Mistake**: Calling `remove(1)` thinking it removes the value `1` from an `ArrayList<Integer>` → ✅ **Fix**: `remove(1)` removes the element at index 1. Use `remove(Integer.valueOf(1))` to remove the value 1
- ❌ **Mistake**: Modifying an ArrayList while iterating with for-each → ✅ **Fix**: Use `Iterator.remove()` or collect items to remove then do `list.removeAll(toRemove)` 
- ❌ **Mistake**: Using ArrayList when frequent insertion/deletion in the middle is needed → ✅ **Fix**: Use `LinkedList` for frequent middle insertions
- ❌ **Mistake**: Comparing ArrayList elements with `==` → ✅ **Fix**: Use `.equals()` for content comparison; `==` only checks reference equality

---

## Best Practices

- Declare with the `List` interface: `List<String> list = new ArrayList<>()` for flexibility
- Provide an initial capacity when you know approximate size: `new ArrayList<>(500)`
- Use `isEmpty()` instead of `size() == 0` — more readable
- Use enhanced for-each loop for simple iteration; use index-based loop only when index is needed
- Prefer `Collections.sort()` or `list.sort(Comparator)` for sorting

---

## Interview Questions

**Q: How does ArrayList grow internally?**  
A: ArrayList starts with a default capacity of 10. When the 11th element is added, it creates a new array with approximately 1.5x the old capacity (`oldCapacity + (oldCapacity >> 1)`), copies all elements to the new array, and adds the new element. This is called resizing or growing.

**Q: What is the difference between ArrayList and LinkedList?**  
A: ArrayList uses a dynamic array — O(1) for index-based access but O(n) for insertion/deletion in the middle. LinkedList uses a doubly-linked list — O(n) for index-based access but O(1) for insertion/deletion at known positions. Use ArrayList for most cases; LinkedList when you frequently insert/delete at the beginning or middle.

**Q: How do you remove an element by value (not index) from `ArrayList<Integer>`?**  
A: You must use `remove(Integer.valueOf(value))` or cast: `list.remove((Integer) value)`. If you call `list.remove(5)`, Java treats `5` as an index and removes the element at position 5, not the value 5.

**Q: Is ArrayList thread-safe?**  
A: No. `ArrayList` is not synchronized. If multiple threads access and modify an `ArrayList` simultaneously, it can cause data corruption. Use `Collections.synchronizedList(new ArrayList<>())` or `CopyOnWriteArrayList` for thread-safe operations.

---

## Quick Revision

✔ ArrayList = resizable array; grows automatically (default capacity 10, grows 1.5x)  
✔ `get()` is O(1); `add(index)` and `remove()` are O(n) due to shifting  
✔ `remove(int)` removes by INDEX; `remove(Object)` removes by VALUE  
✔ Allows duplicates and null values; maintains insertion order  
✔ Not thread-safe — use `Collections.synchronizedList()` if needed  

---

## Related Topics

- LinkedList (Lesson 03)
- Collections Overview (Lesson 01)
- Comparable and Comparator for sorting (Lesson 08)

---

## Next Lesson

**03 - LinkedList**
