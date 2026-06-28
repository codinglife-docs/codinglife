---
id: linkedlist
title: LinkedList in Java
description: Learn Java LinkedList — doubly-linked list, key methods, ArrayList vs LinkedList comparison, and Queue operations.
sidebar_position: 3
keywords:
  - Java
  - LinkedList
  - doubly linked list
  - Queue
  - addFirst addLast
  - Deque
---

# LinkedList in Java

> **Reading Time:** 10 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

`LinkedList` is a **doubly-linked list** implementation of the `List` and `Deque` interfaces. Instead of storing elements in a contiguous array, each element (called a **node**) holds a value plus references to the previous and next node. This makes insertions and deletions at any position very fast, but random access by index is slow.

---

## What You'll Learn

- How a doubly-linked list works internally
- Key LinkedList methods: `addFirst()`, `addLast()`, `removeFirst()`, `removeLast()`
- When to use LinkedList over ArrayList
- How to use LinkedList as a Queue and Deque

---

## Prerequisites

- ArrayList (Lesson 02)
- Collections Overview (Lesson 01)
- Basic Java classes and interfaces

---

## Explanation

### How LinkedList Works Internally

A `LinkedList` consists of **nodes**. Each node is a small object containing three things:
1. The **data** (the element value)
2. A **reference to the next node**
3. A **reference to the previous node** (making it doubly-linked)

The LinkedList itself only stores references to the **first node** (head) and the **last node** (tail).

```
HEAD                                          TAIL
 ↓                                             ↓
[null | "Alice" | ●]→[● | "Bob" | ●]→[● | "Charlie" | null]
```

To add a new node at the beginning: just update the head pointer and link the new node to the old head. No shifting of other elements required — O(1).

To access element at index 5: Start from head and follow `next` pointers 5 times — O(n).

---

### LinkedList vs ArrayList

| Feature | ArrayList | LinkedList |
|---|---|---|
| Internal structure | Dynamic array | Doubly-linked list |
| `get(index)` — Random access | ⚡ O(1) | 🐢 O(n) |
| `add(end)` | O(1) amortized | O(1) |
| `add(beginning/middle)` | 🐢 O(n) shifting | ⚡ O(1) at known node |
| `remove(beginning/middle)` | 🐢 O(n) shifting | ⚡ O(1) at known node |
| Memory overhead | Low | Higher (next/prev pointers per node) |
| Cache performance | Better (contiguous memory) | Worse (scattered in memory) |
| Implements | List | List, Deque, Queue |

**Key rule:**
- Use `ArrayList` when you mostly **read by index** and rarely insert/delete
- Use `LinkedList` when you frequently **insert or delete at the beginning** or need Queue/Deque behaviour

In practice, `ArrayList` is faster for most use cases because modern CPUs cache contiguous memory efficiently. Only use `LinkedList` when you have a specific need for O(1) front insertions or Queue/Deque operations.

---

### LinkedList as a List

`LinkedList` implements `List`, so all standard List methods work:
- `add()`, `get()`, `remove()`, `size()`, `contains()`, `set()`

But it also has additional methods specific to linked lists:

---

### LinkedList-Specific Methods

#### `addFirst(element)` / `offerFirst(element)`
Adds an element to the **beginning** (head) of the list. O(1).

#### `addLast(element)` / `offerLast(element)`
Adds an element to the **end** (tail) of the list. O(1).

#### `removeFirst()` / `pollFirst()`
Removes and returns the **first** element. `removeFirst()` throws an exception if empty; `pollFirst()` returns `null`.

#### `removeLast()` / `pollLast()`
Removes and returns the **last** element.

#### `getFirst()` / `peekFirst()`
Returns (but does NOT remove) the first element. `getFirst()` throws exception if empty; `peekFirst()` returns `null`.

#### `getLast()` / `peekLast()`
Returns (but does NOT remove) the last element.

---

### LinkedList as a Queue (FIFO)

`LinkedList` implements the `Queue` interface. For Queue operations, use:
- `offer(element)` — add to tail
- `poll()` — remove from head (returns `null` if empty)
- `peek()` — look at head without removing

This gives you FIFO (First In, First Out) behaviour.

---

### LinkedList as a Deque (Double-Ended Queue)

`LinkedList` also implements `Deque` (Double-Ended Queue). A Deque allows adding and removing elements from BOTH ends efficiently. This is useful for:
- Implementing stacks (LIFO) — add/remove from same end
- Implementing queues (FIFO) — add to one end, remove from other
- Sliding window problems
- Undo/redo functionality

---

## Real-World Analogy

Imagine a **train** where each carriage is a node:
- Each carriage knows which carriage is in **front of it** and which is **behind it**
- Adding a new carriage at the **front** = just attach to the engine → instant (O(1))
- Getting carriage number 50 = you have to walk through 50 carriages to find it → slow (O(n))

`ArrayList` is more like a **numbered seat chart** on paper — you can instantly jump to seat 50 (O(1)), but inserting a new seat in the middle means renumbering everything after it (O(n)).

---

## Code Example

### Example 1: LinkedList as a List

```java
import java.util.LinkedList;
import java.util.List;

public class LinkedListDemo {
    public static void main(String[] args) {

        LinkedList<String> list = new LinkedList<>();

        // Regular list operations
        list.add("B");
        list.add("C");
        list.add("D");

        // LinkedList-specific: add to front and back
        list.addFirst("A");   // [A, B, C, D]
        list.addLast("E");    // [A, B, C, D, E]

        System.out.println("List: " + list);             // [A, B, C, D, E]
        System.out.println("First: " + list.getFirst()); // A
        System.out.println("Last: " + list.getLast());   // E
        System.out.println("Size: " + list.size());      // 5

        // Remove from front and back
        String first = list.removeFirst();
        String last = list.removeLast();
        System.out.println("Removed first: " + first);  // A
        System.out.println("Removed last: " + last);    // E
        System.out.println("Remaining: " + list);       // [B, C, D]

        // Standard List access (slower — O(n))
        System.out.println("Element at index 1: " + list.get(1)); // C
    }
}
```

### Output
```
List: [A, B, C, D, E]
First: A
Last: E
Size: 5
Removed first: A
Removed last: E
Remaining: [B, C, D]
Element at index 1: C
```

---

### Example 2: LinkedList as a Queue (FIFO)

```java
import java.util.LinkedList;
import java.util.Queue;

public class QueueDemo {
    public static void main(String[] args) {

        // Customer service queue
        Queue<String> serviceQueue = new LinkedList<>();

        // Customers arrive (offer adds to tail)
        serviceQueue.offer("Customer: Alice");
        serviceQueue.offer("Customer: Bob");
        serviceQueue.offer("Customer: Charlie");
        serviceQueue.offer("Customer: Diana");

        System.out.println("Queue: " + serviceQueue);
        System.out.println("Queue size: " + serviceQueue.size());

        // Serve customers (poll removes from head — FIFO)
        System.out.println("\nServing customers:");
        while (!serviceQueue.isEmpty()) {
            String customer = serviceQueue.poll();
            System.out.println("  Serving: " + customer);
            System.out.println("  Remaining in queue: " + serviceQueue.size());
        }

        // poll() on empty queue returns null (no exception)
        System.out.println("\nPoll from empty queue: " + serviceQueue.poll()); // null
        System.out.println("Peek from empty queue: " + serviceQueue.peek()); // null
    }
}
```

### Output
```
Queue: [Customer: Alice, Customer: Bob, Customer: Charlie, Customer: Diana]
Queue size: 4

Serving customers:
  Serving: Customer: Alice
  Remaining in queue: 3
  Serving: Customer: Bob
  Remaining in queue: 2
  Serving: Customer: Charlie
  Remaining in queue: 1
  Serving: Customer: Diana
  Remaining in queue: 0

Poll from empty queue: null
Peek from empty queue: null
```

---

### Example 3: LinkedList as a Deque (Both Ends)

```java
import java.util.Deque;
import java.util.LinkedList;

public class DequeDemo {
    public static void main(String[] args) {

        // Browser history — recent pages at front
        Deque<String> browserHistory = new LinkedList<>();

        browserHistory.addFirst("google.com");
        browserHistory.addFirst("youtube.com");
        browserHistory.addFirst("github.com");
        browserHistory.addFirst("stackoverflow.com");

        System.out.println("Browser history (most recent first):");
        for (String page : browserHistory) {
            System.out.println("  " + page);
        }

        // Go back (remove from front)
        System.out.println("\nGoing back from: " + browserHistory.removeFirst());
        System.out.println("Current page: " + browserHistory.peekFirst());

        // Using as Stack (LIFO) — push/pop at same end
        System.out.println("\n--- Using as Stack ---");
        Deque<String> stack = new LinkedList<>();
        stack.push("Item 1");  // push = addFirst
        stack.push("Item 2");
        stack.push("Item 3");

        System.out.println("Stack: " + stack);
        System.out.println("Pop: " + stack.pop());  // pop = removeFirst (LIFO)
        System.out.println("Stack after pop: " + stack);
    }
}
```

### Output
```
Browser history (most recent first):
  stackoverflow.com
  github.com
  youtube.com
  google.com

Going back from: stackoverflow.com
Current page: github.com

--- Using as Stack ---
Stack: [Item 3, Item 2, Item 1]
Pop: Item 3
Stack after pop: [Item 2, Item 1]
```

---

## Common Mistakes

- ❌ **Mistake**: Using LinkedList when mostly doing `get(index)` → ✅ **Fix**: Use ArrayList — `get(index)` is O(1) for ArrayList but O(n) for LinkedList
- ❌ **Mistake**: Calling `removeFirst()` on an empty LinkedList (throws `NoSuchElementException`) → ✅ **Fix**: Use `pollFirst()` which returns `null` instead
- ❌ **Mistake**: Defaulting to LinkedList thinking it's always "better" than ArrayList → ✅ **Fix**: ArrayList is usually faster due to CPU cache; use LinkedList only for specific patterns
- ❌ **Mistake**: Not using LinkedList as a Queue when you need FIFO → ✅ **Fix**: `LinkedList` implements `Queue` — use `offer()`/`poll()`/`peek()` for proper queue semantics

---

## Best Practices

- Use `Queue<T> queue = new LinkedList<>()` (not `LinkedList<T>`) when using for queue operations — program to interface
- Use `pollFirst()` / `peekFirst()` (null-safe) over `removeFirst()` / `getFirst()` (exception-throwing) when list might be empty
- Prefer `ArrayDeque` over `LinkedList` for pure stack/queue operations — it's faster (no node object overhead)
- Only use `LinkedList` when you're doing a mix of List, Queue, and Deque operations

---

## Interview Questions

**Q: What is the difference between ArrayList and LinkedList?**  
A: ArrayList uses a dynamic array — O(1) random access by index, but O(n) for insertions/deletions in the middle (due to shifting). LinkedList uses a doubly-linked list — O(n) for random access (must traverse), but O(1) for insertions/deletions at the head/tail or at a known node. ArrayList is generally faster for most use cases due to better CPU cache utilization.

**Q: What interfaces does LinkedList implement?**  
A: LinkedList implements `List`, `Deque`, and `Queue` interfaces. This makes it versatile — it can be used as a list, a stack (via Deque), a queue (via Queue), or a double-ended queue (via Deque).

**Q: When would you choose LinkedList over ArrayList?**  
A: Choose LinkedList when: (1) You frequently add/remove elements from the beginning (O(1) vs O(n) for ArrayList), (2) You need Queue or Deque operations, (3) You don't need frequent random access by index. In most other situations, ArrayList is preferable.

**Q: What is the difference between `remove()` and `poll()` in LinkedList?**  
A: Both remove the head element. `remove()` and `removeFirst()` throw `NoSuchElementException` if the list is empty. `poll()` and `pollFirst()` return `null` if the list is empty. For safer code, prefer `poll()` when there's a chance the list could be empty.

---

## Quick Revision

✔ LinkedList = doubly-linked nodes; each node has prev + data + next references  
✔ O(1) add/remove at head/tail; O(n) random access by index  
✔ Implements List + Deque + Queue — very versatile  
✔ Use `offer()`/`poll()`/`peek()` for Queue operations (null-safe)  
✔ Prefer `ArrayDeque` for pure stack/queue — LinkedList has more object overhead  

---

## Related Topics

- ArrayList (Lesson 02)
- Iterator (Lesson 07)
- Comparable and Comparator for sorting (Lesson 08)

---

## Next Lesson

**04 - HashMap**
