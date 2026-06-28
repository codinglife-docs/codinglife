---
id: intro-design-patterns
title: Introduction to Design Patterns
description: Learn what design patterns are, the Gang of Four (GoF), the three categories of patterns (Creational, Structural, Behavioral), and why every Java developer should know them.
sidebar_position: 1
keywords:
  - Java
  - Design Patterns
  - Gang of Four
  - Creational Patterns
  - Structural Patterns
  - Behavioral Patterns
---

# Introduction to Design Patterns

> **Reading Time:** 8 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

Design patterns are reusable solutions to commonly occurring problems in software design. They are not finished code — they are templates or blueprints that you can adapt to solve a recurring problem in your project. Learning design patterns makes you a better programmer by giving you a shared vocabulary with other developers and proven solutions to common challenges.

---

## What You'll Learn

- What design patterns are and why they exist
- Who the "Gang of Four" are and why they matter
- The three categories of patterns: Creational, Structural, and Behavioral
- The difference between patterns and algorithms
- Common design patterns used in Java

---

## Prerequisites

- No prerequisites, but solid understanding of Java OOP (classes, interfaces, inheritance) is recommended

---

## Explanation

### What Are Design Patterns?

Imagine you're building a house. Every house needs doors, windows, and a foundation — problems that have been solved thousands of times. Instead of reinventing how a door frame works, you follow an established design.

In software, **design patterns** are the same idea. They are **well-tested, named solutions to common design problems**. They've been discovered, refined, and documented by experienced programmers over decades.

A design pattern:
- Is **not a library** — you can't import it and use it. You implement it yourself.
- Is **not a finished design** — it's a template you adapt to your situation.
- Is a **shared vocabulary** — when you say "this uses the Singleton pattern," every programmer immediately understands the structure.

---

### The Gang of Four (GoF)

In 1994, four computer scientists — **Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides** — wrote the landmark book:

> *"Design Patterns: Elements of Reusable Object-Oriented Software"*

They catalogued **23 design patterns** organized into three categories. These authors became known as the **Gang of Four (GoF)**, and their patterns are still the foundation of software design today.

---

### The Three Categories

#### Creational Patterns — How objects are created

These patterns deal with **object creation mechanisms**. Instead of creating objects directly with `new`, creational patterns provide smarter ways to create objects based on the situation.

| Pattern | Purpose |
|---|---|
| Singleton | Ensure only one instance exists |
| Factory Method | Let subclasses decide which object to create |
| Abstract Factory | Create families of related objects |
| Builder | Construct complex objects step by step |
| Prototype | Clone existing objects |

**Example scenario**: You want to ensure your database connection object is created only once and reused everywhere → **Singleton**.

---

#### Structural Patterns — How objects are composed

These patterns deal with **how classes and objects are assembled** into larger structures, making it easier to compose interfaces and implementations.

| Pattern | Purpose |
|---|---|
| Adapter | Make incompatible interfaces work together |
| Bridge | Separate abstraction from implementation |
| Composite | Treat individual objects and groups uniformly |
| Decorator | Add behavior to objects without changing their class |
| Facade | Provide a simplified interface to a complex system |
| Flyweight | Share fine-grained objects to save memory |
| Proxy | Provide a surrogate or placeholder for another object |

**Example scenario**: You have a legacy library with an incompatible interface → **Adapter**.

---

#### Behavioral Patterns — How objects communicate

These patterns deal with **algorithms and the assignment of responsibilities** between objects — how they interact and divide work.

| Pattern | Purpose |
|---|---|
| Chain of Responsibility | Pass requests along a chain of handlers |
| Command | Encapsulate a request as an object |
| Interpreter | Implement a language's grammar |
| Iterator | Traverse elements without exposing structure |
| Mediator | Reduce coupling by having objects communicate via a mediator |
| Memento | Save and restore object state |
| Observer | Notify multiple objects about state changes |
| State | Change object behavior based on its state |
| Strategy | Define interchangeable algorithms |
| Template Method | Define skeleton of algorithm in base class |
| Visitor | Add operations to objects without changing them |

**Example scenario**: You have multiple algorithms for sorting and want to switch them at runtime → **Strategy**.

---

### Design Patterns vs Algorithms

People often confuse patterns with algorithms:

| Aspect | Design Pattern | Algorithm |
|---|---|---|
| What it is | High-level template for structure | Step-by-step procedure for computation |
| Level | Architecture / OOP design level | Code / logic level |
| Example | Strategy pattern | QuickSort implementation |
| Language-specific? | No — applies to any OOP language | Often yes |
| Solves | Recurring design problems | Specific computational problems |

An **algorithm** is like a recipe — it tells you exactly what steps to follow. A **pattern** is like an architectural blueprint — it tells you how to structure your solution, but you fill in the details.

---

### Why Patterns Matter

1. **Proven solutions**: Patterns have been tested in real projects by thousands of developers.
2. **Shared vocabulary**: "Use Observer here" instantly communicates a complex design idea.
3. **Avoid reinventing the wheel**: Instead of designing from scratch, start with a known good solution.
4. **Better code**: Patterns tend to produce more maintainable, flexible, and extensible code.
5. **Interview advantage**: Design patterns are a core topic in software engineering interviews.

---

### Common Patterns in Java Standard Library

You don't need to look far to see patterns in action — the Java standard library uses them everywhere:

| Pattern | Example in Java |
|---|---|
| Singleton | `Runtime.getRuntime()`, `System.console()` |
| Iterator | `java.util.Iterator` interface |
| Observer | `java.util.EventListener`, `java.util.Observable` |
| Decorator | `java.io.InputStream` wrapping chain |
| Factory Method | `Calendar.getInstance()`, `NumberFormat.getInstance()` |
| Builder | `StringBuilder`, `java.util.stream.Stream.Builder` |
| Strategy | `java.util.Comparator` |
| Adapter | `java.util.Arrays.asList()` |
| Proxy | `java.lang.reflect.Proxy` |
| Template Method | `java.io.InputStream.read()` |

---

### Anti-Patterns: When Patterns Go Wrong

Patterns are tools — not mandatory laws. Using a pattern where it doesn't fit is called an **anti-pattern**:
- **Over-engineering**: Applying complex patterns to simple problems.
- **Singleton abuse**: Using Singleton for everything, creating hidden global state.
- **Pattern-matching for its own sake**: Forcing a pattern just to sound sophisticated.

> *"A pattern is a solution to a problem in a context."* — GoF

Always ask: **does this pattern solve a real problem in my code?**

---

## Real-World Analogy

Design patterns are like **furniture assembly instructions**. IKEA has figured out the best way to assemble a bookshelf. You don't invent a new way — you follow the proven pattern. But you still choose the wood color, size, and placement. Similarly, design patterns tell you the structure; you fill in the specifics for your application.

---

## Code Example

```java
// Without patterns: tightly coupled, hard to extend
public class ReportGenerator {
    public void generate(String type) {
        if (type.equals("PDF")) {
            // PDF generation logic
            System.out.println("Generating PDF report...");
        } else if (type.equals("EXCEL")) {
            // Excel generation logic
            System.out.println("Generating Excel report...");
        }
        // Adding a new type means modifying this class = bad!
    }
}

// With Strategy pattern: open for extension, closed for modification
interface ReportStrategy {
    void generate();
}

class PdfReport implements ReportStrategy {
    @Override
    public void generate() {
        System.out.println("Generating PDF report...");
    }
}

class ExcelReport implements ReportStrategy {
    @Override
    public void generate() {
        System.out.println("Generating Excel report...");
    }
}

class CsvReport implements ReportStrategy {
    @Override
    public void generate() {
        System.out.println("Generating CSV report...");
    }
}

class ReportGeneratorWithPattern {
    private ReportStrategy strategy;

    public ReportGeneratorWithPattern(ReportStrategy strategy) {
        this.strategy = strategy;
    }

    public void setStrategy(ReportStrategy strategy) {
        this.strategy = strategy;
    }

    public void generate() {
        strategy.generate();
    }
}

public class DesignPatternIntro {
    public static void main(String[] args) {
        ReportGeneratorWithPattern generator =
            new ReportGeneratorWithPattern(new PdfReport());
        generator.generate();

        // Switch strategy at runtime — no code change needed
        generator.setStrategy(new ExcelReport());
        generator.generate();

        generator.setStrategy(new CsvReport());
        generator.generate();
    }
}
```

### Output
```
Generating PDF report...
Generating Excel report...
Generating CSV report...
```

---

## Common Mistakes

- ❌ **Mistake**: Memorizing patterns without understanding the problem they solve → ✅ **Fix**: Always learn the "problem context" first, then the solution.
- ❌ **Mistake**: Applying patterns to every piece of code → ✅ **Fix**: Use patterns when they genuinely reduce complexity or improve flexibility. Simple code is often better.
- ❌ **Mistake**: Thinking patterns are Java-specific → ✅ **Fix**: GoF patterns apply to any object-oriented language (Java, C++, Python, C#).

---

## Best Practices

- Learn the problem each pattern solves before memorizing its structure.
- Recognize patterns in the Java standard library to see them in real use.
- Don't force a pattern — if the code is simple and clear without one, keep it simple.
- Use patterns to communicate intent to other developers, not to show off knowledge.
- Practice implementing each pattern from scratch at least once.

---

## Interview Questions

**Q: What is a design pattern?**  
A: A design pattern is a reusable, named solution template to a commonly occurring problem in software design. It's not code you copy-paste — it's a blueprint you adapt. Patterns were popularized by the Gang of Four (GoF) in their 1994 book and are organized into three categories: Creational, Structural, and Behavioral.

**Q: What are the three categories of GoF design patterns?**  
A: (1) **Creational** — deal with object creation: Singleton, Factory, Builder, Prototype, Abstract Factory. (2) **Structural** — deal with object composition: Adapter, Decorator, Proxy, Facade, Composite. (3) **Behavioral** — deal with object communication: Observer, Strategy, Command, Iterator, Template Method.

**Q: Can you give an example of a design pattern used in the Java standard library?**  
A: Many examples exist: `java.io.InputStream` and its wrappers (`BufferedInputStream`, `DataInputStream`) use the **Decorator pattern**. `java.util.Iterator` is an example of the **Iterator pattern**. `Calendar.getInstance()` is a **Factory Method**. `java.lang.Runtime.getRuntime()` is **Singleton**.

---

## Quick Revision

✔ Design patterns are reusable solution templates for recurring OOP design problems  
✔ Gang of Four (GoF) catalogued 23 patterns in their 1994 book  
✔ Creational: how objects are created (Singleton, Factory, Builder)  
✔ Structural: how objects are composed (Adapter, Decorator, Proxy)  
✔ Behavioral: how objects communicate (Observer, Strategy, Iterator)  
✔ Patterns are not algorithms — they operate at the architectural/design level  

---

## Related Topics

- Singleton Pattern (Lesson 2)
- Factory Pattern (Lesson 3)
- Strategy Pattern (Lesson 6)

---

## Next Lesson

**Lesson 2 — Singleton Pattern: Ensuring Only One Instance**
