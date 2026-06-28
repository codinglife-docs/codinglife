---
id: classloader
title: ClassLoader in Java
description: Learn how the Java ClassLoader works, the three built-in ClassLoaders, the parent delegation model, and how to write a custom ClassLoader.
sidebar_position: 2
keywords:
  - Java
  - ClassLoader
  - Bootstrap ClassLoader
  - Delegation Model
  - Custom ClassLoader
---

# ClassLoader in Java

> **Reading Time:** 10 Minutes  
> **Difficulty:** Intermediate

---

## Topic Summary

The ClassLoader is the part of the JVM that finds and loads `.class` files into memory. Java has three built-in ClassLoaders arranged in a parent-child hierarchy, and they use a "parent-first" delegation model to decide which ClassLoader actually loads a class. You can also write your own custom ClassLoader for special use cases.

---

## What You'll Learn

- The three built-in ClassLoaders and what each loads
- How the parent delegation model works (and why it's important)
- The three phases of class loading: Loading, Linking, Initialization
- How to write a simple custom ClassLoader

---

## Prerequisites

- JVM Architecture (Lesson 1)
- Basic understanding of Java classes and packages

---

## Explanation

### What Does a ClassLoader Do?

When you run a Java program, the JVM doesn't load all classes upfront. Classes are loaded **lazily** — only when they are first needed. When a class is needed, the ClassLoader:

1. Finds the `.class` file (on disk, in a JAR, over a network, etc.)
2. Reads the bytecode
3. Creates a `Class` object in the JVM's Method Area
4. Makes it available for the program to use

---

### The Three Built-in ClassLoaders

```
┌─────────────────────────────────────────────┐
│         Bootstrap ClassLoader               │
│   Loads: java.lang.*, java.util.*, etc.     │
│   Source: rt.jar / JDK core modules         │
│   Written in: C/C++ (not Java!)             │
└─────────────────────┬───────────────────────┘
                      │ parent of
                      ▼
┌─────────────────────────────────────────────┐
│         Extension ClassLoader               │
│   Loads: javax.*, java extensions           │
│   Source: $JAVA_HOME/lib/ext/*.jar          │
│   (Called Platform ClassLoader in Java 9+)  │
└─────────────────────┬───────────────────────┘
                      │ parent of
                      ▼
┌─────────────────────────────────────────────┐
│        Application ClassLoader              │
│   Loads: Your code + classpath JARs         │
│   Source: -classpath / CLASSPATH env var    │
│   Also called: System ClassLoader           │
└─────────────────────────────────────────────┘
```

#### Bootstrap ClassLoader
- The **root** of the hierarchy. It has no parent.
- Loads the **core Java classes**: `java.lang.String`, `java.lang.Object`, `java.util.ArrayList`, etc.
- These classes live in `rt.jar` (Java 8) or the JDK modules (Java 9+).
- Written in native C/C++, not Java — so it has no corresponding Java object.

#### Extension ClassLoader (Platform ClassLoader in Java 9+)
- Child of Bootstrap ClassLoader.
- Loads **extension libraries** — optional Java features like `javax.*`.
- Looks in `$JAVA_HOME/lib/ext` directory.
- In Java 9+ modules, this is renamed **Platform ClassLoader**.

#### Application ClassLoader (System ClassLoader)
- Child of Extension ClassLoader.
- Loads **your application classes** — everything you write, plus third-party JARs on the classpath.
- This is the ClassLoader your code normally runs with.

---

### The Three Phases of Class Loading

```
Phase 1: LOADING
  → Find and read the .class file bytes
  → Create a java.lang.Class object

Phase 2: LINKING
  ├── Verification  → Is the bytecode valid and safe?
  ├── Preparation  → Allocate memory for static variables (default values)
  └── Resolution   → Replace symbolic references with actual memory references

Phase 3: INITIALIZATION
  → Execute static {} blocks top-to-bottom
  → Assign actual values to static variables
```

Example of initialization:
```java
class Demo {
    static int x = 10;       // assigned during Initialization
    static {
        System.out.println("Static block runs during Initialization!");
    }
}
```

---

### The Parent Delegation Model (Parent-First)

This is the most important concept to understand about ClassLoaders.

**Rule**: When a ClassLoader is asked to load a class, it does NOT try to load it itself first. Instead, it **delegates to its parent** first. Only if the parent cannot find the class does the child try to load it.

```
Request to load: "com.myapp.MyClass"
         ↓
Application ClassLoader
  → "Let me ask my parent first..."
         ↓
Extension ClassLoader
  → "Let me ask my parent first..."
         ↓
Bootstrap ClassLoader
  → "I don't have 'com.myapp.MyClass'. Failed."
         ↑
Extension ClassLoader
  → "I don't have it either. Failed."
         ↑
Application ClassLoader
  → "OK, I'll load it myself from classpath." ✓
```

**Why parent delegation?** Security and consistency. It prevents malicious or accidental replacement of core classes. For example, if you tried to create your own `java.lang.String`, the Bootstrap ClassLoader would load the real one first, and your fake version would never be used.

---

### Checking ClassLoaders at Runtime

```java
public class ClassLoaderDemo {
    public static void main(String[] args) {
        // Check which ClassLoader loaded String (a core class)
        Class<String> stringClass = String.class;
        System.out.println("String's ClassLoader: " + stringClass.getClassLoader());
        // Output: null (Bootstrap ClassLoader has no Java object)

        // Check which ClassLoader loaded our class
        Class<ClassLoaderDemo> myClass = ClassLoaderDemo.class;
        System.out.println("Our ClassLoader: " + myClass.getClassLoader());
        // Output: sun.misc.Launcher$AppClassLoader@... (Application ClassLoader)

        // Get the parent of our ClassLoader
        ClassLoader appLoader = ClassLoaderDemo.class.getClassLoader();
        System.out.println("Parent: " + appLoader.getParent());
        // Output: Extension/Platform ClassLoader
    }
}
```

---

### Custom ClassLoader

You can extend `ClassLoader` to load classes from unusual places — encrypted files, databases, remote URLs, etc.

```java
import java.io.*;

public class MyCustomClassLoader extends ClassLoader {

    private String classPath;

    public MyCustomClassLoader(String classPath) {
        this.classPath = classPath;
    }

    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        try {
            // Convert class name to file path
            String filePath = classPath + name.replace('.', '/') + ".class";
            byte[] classBytes = readClassBytes(filePath);
            // Define the class from the byte array
            return defineClass(name, classBytes, 0, classBytes.length);
        } catch (IOException e) {
            throw new ClassNotFoundException("Cannot load class: " + name, e);
        }
    }

    private byte[] readClassBytes(String filePath) throws IOException {
        File file = new File(filePath);
        FileInputStream fis = new FileInputStream(file);
        byte[] bytes = new byte[(int) file.length()];
        fis.read(bytes);
        fis.close();
        return bytes;
    }
}
```

Usage:
```java
public class Main {
    public static void main(String[] args) throws Exception {
        MyCustomClassLoader loader = new MyCustomClassLoader("C:/myclasses/");
        Class<?> clazz = loader.loadClass("com.example.MyClass");
        Object instance = clazz.getDeclaredConstructor().newInstance();
        System.out.println("Loaded: " + instance.getClass().getName());
    }
}
```

Custom ClassLoaders are used by:
- **Application Servers** (Tomcat, JBoss) — to isolate web app classes
- **OSGi frameworks** — to load plugins dynamically
- **Testing frameworks** — to reload classes between tests

---

## Real-World Analogy

Imagine a library system with three librarians: the **Head Librarian** (Bootstrap), the **Senior Librarian** (Extension), and the **Junior Librarian** (Application). When you ask the Junior Librarian for a book, they always check with the Senior Librarian first, who checks with the Head Librarian. Only if the Head Librarian and Senior Librarian both say "we don't have it" does the Junior Librarian search their own shelf. This ensures the most authoritative source always answers first.

---

## Code Example

```java
public class ClassLoaderHierarchy {
    public static void main(String[] args) {
        // Walk up the ClassLoader hierarchy
        ClassLoader loader = ClassLoaderHierarchy.class.getClassLoader();

        System.out.println("=== ClassLoader Hierarchy ===");
        while (loader != null) {
            System.out.println(loader.getClass().getName());
            loader = loader.getParent();
        }
        System.out.println("null (Bootstrap ClassLoader — written in C/C++)");

        System.out.println("\n=== Different ClassLoaders ===");
        // Core Java class — loaded by Bootstrap
        System.out.println("String: " + String.class.getClassLoader());

        // Our class — loaded by Application ClassLoader
        System.out.println("This class: " +
            ClassLoaderHierarchy.class.getClassLoader());
    }
}
```

### Output
```
=== ClassLoader Hierarchy ===
jdk.internal.loader.ClassLoaders$AppClassLoader
jdk.internal.loader.ClassLoaders$PlatformClassLoader
null (Bootstrap ClassLoader — written in C/C++)

=== Different ClassLoaders ===
String: null
This class: jdk.internal.loader.ClassLoaders$AppClassLoader@...
```

---

## Common Mistakes

- ❌ **Mistake**: Assuming `getClassLoader()` returns non-null for all classes → ✅ **Fix**: Core Java classes loaded by Bootstrap ClassLoader return `null` from `getClassLoader()` because Bootstrap is not a Java object.
- ❌ **Mistake**: Overriding `loadClass()` in a custom ClassLoader → ✅ **Fix**: Override `findClass()` instead. This preserves the delegation model automatically.
- ❌ **Mistake**: Creating the same class with two different ClassLoaders and expecting them to be equal → ✅ **Fix**: They will NOT be equal. Same class name + different ClassLoader = different `Class` objects in JVM. This causes `ClassCastException`.

---

## Best Practices

- Always override `findClass()` (not `loadClass()`) in custom ClassLoaders to preserve the delegation model.
- Pass the parent ClassLoader explicitly to the super constructor when writing custom ClassLoaders.
- Be aware that classes loaded by different ClassLoaders are incompatible even if they have the same name.
- Use the Thread's context ClassLoader (`Thread.currentThread().getContextClassLoader()`) in framework code for proper class resolution.

---

## Interview Questions

**Q: What is the parent delegation model in ClassLoader?**  
A: When a ClassLoader receives a request to load a class, it first delegates the request to its parent ClassLoader. The parent delegates to its parent, and so on up to the Bootstrap ClassLoader. Only if the parent cannot find the class does the child attempt to load it. This ensures core Java classes are always loaded by Bootstrap, preventing class duplication or malicious replacement.

**Q: Why does `String.class.getClassLoader()` return null?**  
A: `String` is a core Java class loaded by the Bootstrap ClassLoader. The Bootstrap ClassLoader is written in native C/C++ code and has no Java object representation, so `getClassLoader()` returns `null` for classes loaded by it.

**Q: What happens if two ClassLoaders load the same class?**  
A: The JVM considers them different classes. Even if they have the same fully qualified name and identical bytecode, they are incompatible — assigning one to a variable of the other type will throw a `ClassCastException`.

**Q: What is the difference between `loadClass()` and `findClass()` in ClassLoader?**  
A: `loadClass()` implements the full delegation model (checks parent first, then calls `findClass()`). `findClass()` is only the local lookup part. When writing a custom ClassLoader, you should override `findClass()` to add your custom loading logic while keeping the delegation model intact. Overriding `loadClass()` risks breaking the delegation model.

---

## Quick Revision

✔ Bootstrap ClassLoader loads core Java classes; it's written in C/C++ and has no Java object  
✔ Extension/Platform ClassLoader loads Java extensions  
✔ Application ClassLoader loads your application classes from the classpath  
✔ Parent delegation model: always ask parent first; child loads only if parent fails  
✔ Class loading has 3 phases: Loading → Linking (Verify/Prepare/Resolve) → Initialization  
✔ Custom ClassLoaders should override `findClass()`, not `loadClass()`  

---

## Related Topics

- JVM Architecture (Lesson 1)
- JVM Memory Areas (Lesson 3)
- Reflection API

---

## Next Lesson

**Lesson 3 — JVM Memory Areas: Heap, Stack, Method Area and More**
