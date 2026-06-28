---
id: history-of-java
title: History of Java
description: Learn the complete history of Java — from James Gosling's Oak language in 1991 to Java 21 LTS, covering Sun Microsystems, Oracle acquisition, and major versions.
sidebar_position: 2
keywords:
  - Java
  - History of Java
  - James Gosling
  - Sun Microsystems
  - Oracle Java
---

# History of Java

> **Reading Time:** 6 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

Java was created in the early 1990s by a small team at Sun Microsystems. It started as a language for smart devices but became one of the most popular programming languages in the world. Understanding Java's history helps you appreciate *why* Java works the way it does today.

---

## What You'll Learn

- Who created Java and why
- How Java evolved from "Oak" to Java 21
- Why key versions like Java 8, 17, and 21 matter
- How Oracle fits into the Java story

---

## Prerequisites

- Lesson 001 — What is Java (basic idea of what Java is)

---

## Explanation

### The Birth of Java — The Green Project (1991)

In **1991**, a team at **Sun Microsystems** led by **James Gosling** started a secret project called the **Green Project**. The goal was NOT to make a programming language for computers — it was to make a language for **smart electronic devices** like TVs, cable boxes, and remote controls.

James Gosling (often called the **"Father of Java"**) and his team — which included **Mike Sheridan** and **Patrick Naughton** — wanted a language that could run on any device without being rewritten for each one.

The first version of this language was called **Oak** — named after an oak tree that stood outside James Gosling's office window.

---

### Why the Name Changed from Oak to Java (1995)

When the team tried to trademark the name "Oak," they discovered it was already taken by another company. So they needed a new name.

The team brainstormed over coffee (legend says!) and landed on **Java** — inspired by Java coffee, which comes from the island of Java in Indonesia. This is also why the Java logo is a coffee cup! ☕

On **May 23, 1995**, Sun Microsystems officially announced Java to the world. The internet was growing fast at this time, and Java fit perfectly because it could run inside web browsers as small programs called **applets**.

---

### The Famous Slogan — "Write Once, Run Anywhere"

The most powerful idea Java introduced was **platform independence**. Before Java, if you wrote a program for Windows, it wouldn't work on a Mac or Linux without rewriting it. Java changed that with its famous slogan:

> **"Write Once, Run Anywhere" (WORA)**

You write your code once → compile it into **bytecode** → and it runs on ANY device that has the **Java Virtual Machine (JVM)** installed. This was revolutionary.

---

### Sun Microsystems Era (1995–2010)

Sun Microsystems owned and developed Java for 15 years. During this time:

- Java became massively popular for building **web applications**, **desktop software**, and **enterprise systems**
- Companies like IBM, Google, and Amazon used Java heavily
- Java became the #1 teaching language in universities worldwide
- Android (launched in 2008) chose Java as its primary programming language

---

### Oracle Acquires Java (2010)

In **2010**, tech giant **Oracle Corporation** acquired Sun Microsystems for **$7.4 billion**. With this acquisition, Oracle became the new owner and steward of Java.

Oracle has continued to develop Java and made some important changes:
- Moved to a **6-month release cycle** (new version every 6 months)
- Introduced **Long-Term Support (LTS)** versions that are stable and supported for years
- Made OpenJDK (the open-source version of Java) the reference implementation

---

### Major Java Versions — The Timeline

| Year | Version | Highlights |
|------|---------|-----------|
| 1996 | Java 1.0 | First official release |
| 1997 | Java 1.1 | Inner classes, JavaBeans |
| 1998 | Java 1.2 (Java 2) | Swing GUI, Collections Framework |
| 2000 | Java 1.3 | Performance improvements |
| 2002 | Java 1.4 | assert keyword, NIO |
| 2004 | Java 5 | Generics, Enums, for-each loop, Autoboxing |
| 2006 | Java 6 | Scripting support, performance boost |
| 2011 | Java 7 | try-with-resources, diamond operator |
| **2014** | **Java 8 ⭐ LTS** | **Lambda expressions, Stream API, Optional — MASSIVE update** |
| 2017 | Java 9 | Module system |
| 2018 | Java 10 | Local variable type inference (`var`) |
| 2018 | Java 11 ⭐ LTS | HTTP Client API, string methods |
| 2021 | Java 16 | Records, sealed classes (preview) |
| **2021** | **Java 17 ⭐ LTS** | **Sealed classes, pattern matching — modern Java** |
| 2023 | Java 21 ⭐ LTS | Virtual threads, record patterns — cutting edge |

> **LTS** = Long-Term Support. These versions get security updates and bug fixes for many years. Most companies use LTS versions in production.

---

### Why Java 8, 17, and 21 Matter Most

**Java 8 (2014)** — This was a game-changer. It introduced **lambda expressions** and the **Stream API**, which made Java feel like a modern language. Many companies still run Java 8 today.

**Java 17 (2021)** — This is the recommended LTS version for new projects. It has modern features like sealed classes and pattern matching.

**Java 21 (2023)** — The latest LTS version. Introduces **virtual threads** which make building fast servers much easier.

---

## Real-World Analogy

Think of Java like a car model — say, the **Toyota Corolla**.

- It was **invented** in 1966 (like Java in 1995)
- Over the years, each new model got **better features** — better engine, better safety, better tech
- But it still feels like a Corolla — **backward compatible**
- The **old models still work** — people still drive 2005 Corollas (like companies still running Java 8)
- **New models (Java 17, 21)** are better and recommended for new buyers

Java has evolved constantly but stayed true to its original design. Code written in Java 1.0 still mostly runs on Java 21!

---

## Code Example

```java
// This simple code would have worked in Java 1.0 (1996)
// and still works perfectly in Java 21 (2023)!
// That's backward compatibility.

public class JavaHistory {
    public static void main(String[] args) {
        System.out.println("Java was born in 1995!");
        System.out.println("Creator: James Gosling");
        System.out.println("Original name: Oak");
        System.out.println("Company: Sun Microsystems (now Oracle)");
        System.out.println("Slogan: Write Once, Run Anywhere");

        String latestLTS = "Java 21";
        int releaseYear = 2023;
        System.out.println("Latest LTS: " + latestLTS + " (" + releaseYear + ")");
    }
}
```

### Output
```
Java was born in 1995!
Creator: James Gosling
Original name: Oak
Company: Sun Microsystems (now Oracle)
Slogan: Write Once, Run Anywhere
Latest LTS: Java 21 (2023)
```

---

## Common Mistakes

- ❌ **Mistake**: Thinking Java and JavaScript are the same → ✅ **Fix**: They are completely different languages. Java is to JavaScript as Car is to Carpet — they just share some letters!
- ❌ **Mistake**: Thinking Java is old and dying → ✅ **Fix**: Java is in the top 3 most used languages worldwide and powers Android, Netflix, Amazon, and more.
- ❌ **Mistake**: Confusing Java 1.8 with Java 18 → ✅ **Fix**: Java 1.8 = Java 8 (old naming). From Java 9 onward the number IS the version. Java 18 is a different, later release.

---

## Best Practices

- For new projects, always use the latest **LTS version** (currently Java 21)
- If working on an existing project, check which Java version it uses before installing
- Keep track of Java's 6-month release cycle — new features arrive fast

---

## Interview Questions

**Q: Who created Java and when?**  
A: Java was created by **James Gosling** and his team at **Sun Microsystems**. It was publicly released on **May 23, 1995**.

**Q: What was Java originally called?**  
A: Java was originally called **Oak**, named after an oak tree outside James Gosling's office. It was renamed to Java in 1995 because "Oak" was already trademarked.

**Q: What does "Write Once, Run Anywhere" mean?**  
A: It means you write Java code once, compile it into **bytecode**, and it can run on any device or operating system that has a **JVM (Java Virtual Machine)** installed — without rewriting the code.

**Q: Which company currently owns Java?**  
A: **Oracle Corporation** has owned Java since 2010 when it acquired Sun Microsystems.

**Q: What is an LTS version in Java?**  
A: LTS stands for **Long-Term Support**. These versions receive security patches and bug fixes for many years, making them safe for use in production environments. Current LTS versions are Java 8, 11, 17, and 21.

---

## Quick Revision

✔ Java was created by **James Gosling** at **Sun Microsystems** in **1991** (released publicly in **1995**)  
✔ Originally named **Oak**, renamed Java after Java coffee ☕  
✔ Key slogan: **"Write Once, Run Anywhere"** — platform independence  
✔ **Oracle** acquired Java in **2010**  
✔ Most important LTS versions: **Java 8, 11, 17, 21**  
✔ Latest LTS as of 2024: **Java 21**  

---

## Related Topics

- What is Java (Lesson 001)
- Features of Java (Lesson 003)
- JDK vs JRE vs JVM (Lesson 004)

---

## Next Lesson

**Lesson 003 — Features of Java**
