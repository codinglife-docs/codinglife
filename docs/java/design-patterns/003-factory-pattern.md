---
id: factory-pattern
title: Factory Pattern
description: Learn the Factory Method and Abstract Factory design patterns in Java — how to create objects without specifying the exact class, with a Shape factory and notification factory example.
sidebar_position: 3
keywords:
  - Java
  - Factory Pattern
  - Factory Method
  - Abstract Factory
  - Design Patterns
  - Creational Patterns
---

# Factory Pattern

> **Reading Time:** 10 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

The Factory pattern is a creational design pattern that provides a way to create objects without specifying their exact class. Instead of using `new SomeClass()` everywhere, you ask a "factory" to create the right object for you. This makes your code more flexible — you can add new types without changing the code that uses them.

---

## What You'll Learn

- What the Factory pattern is and why it's useful
- Factory Method pattern with a Shape example
- Abstract Factory pattern for creating families of objects
- How to decouple object creation from object usage

---

## Prerequisites

- Introduction to Design Patterns (Lesson 1)
- Java interfaces and polymorphism

---

## Explanation

### The Problem Factory Solves

Imagine you're writing a notification system. You send notifications by Email, SMS, and Push. Without Factory:

```java
// BAD: Caller must know which class to instantiate
if (type.equals("EMAIL")) {
    Notification n = new EmailNotification();
    n.send(message);
} else if (type.equals("SMS")) {
    Notification n = new SmsNotification();
    n.send(message);
} else if (type.equals("PUSH")) {
    Notification n = new PushNotification();
    n.send(message);
}
// Adding a new type means hunting for every if-else block in the codebase
```

Problems:
1. The caller must know all notification classes
2. Adding a new type requires modifying every place that creates notifications
3. Violates the Open/Closed Principle (open for extension, closed for modification)

**The Factory pattern moves this decision to one central place.**

---

### Factory Method Pattern

**Intent**: Define an interface for creating an object, but let the factory method decide which class to instantiate.

#### Step 1: Create a common interface or abstract class

```java
// All shapes implement this
public interface Shape {
    void draw();
    double area();
}
```

#### Step 2: Create concrete implementations

```java
public class Circle implements Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public void draw() {
        System.out.println("Drawing Circle with radius: " + radius);
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}

public class Rectangle implements Shape {
    private double width, height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public void draw() {
        System.out.println("Drawing Rectangle " + width + "x" + height);
    }

    @Override
    public double area() {
        return width * height;
    }
}

public class Triangle implements Shape {
    private double base, height;

    public Triangle(double base, double height) {
        this.base = base;
        this.height = height;
    }

    @Override
    public void draw() {
        System.out.println("Drawing Triangle with base: " + base + ", height: " + height);
    }

    @Override
    public double area() {
        return 0.5 * base * height;
    }
}
```

#### Step 3: Create the Factory

```java
public class ShapeFactory {

    // The factory method — creates the right shape based on the type string
    public static Shape createShape(String type) {
        switch (type.toLowerCase()) {
            case "circle":
                return new Circle(5.0);       // default radius
            case "rectangle":
                return new Rectangle(4.0, 6.0); // default dimensions
            case "triangle":
                return new Triangle(3.0, 4.0);  // default dimensions
            default:
                throw new IllegalArgumentException("Unknown shape type: " + type);
        }
    }

    // Overloaded: create with custom parameters
    public static Shape createCircle(double radius) {
        return new Circle(radius);
    }

    public static Shape createRectangle(double width, double height) {
        return new Rectangle(width, height);
    }
}
```

#### Step 4: Use the Factory

```java
public class FactoryDemo {
    public static void main(String[] args) {
        // Client doesn't know or care which class is instantiated
        Shape circle = ShapeFactory.createShape("circle");
        Shape rect = ShapeFactory.createShape("rectangle");
        Shape triangle = ShapeFactory.createShape("triangle");

        circle.draw();
        System.out.println("Area: " + String.format("%.2f", circle.area()));

        rect.draw();
        System.out.println("Area: " + String.format("%.2f", rect.area()));

        triangle.draw();
        System.out.println("Area: " + String.format("%.2f", triangle.area()));

        // Adding a new shape type? Just add it to the factory.
        // No change needed in this client code!
    }
}
```

---

### Adding a New Shape Without Changing Client Code

If we add a `Pentagon` shape, we only need to:
1. Create the `Pentagon` class implementing `Shape`
2. Add `"pentagon"` to the factory's `switch`

The client code (`FactoryDemo`) doesn't change at all! This is the **Open/Closed Principle** in action.

---

### Abstract Factory Pattern

**Intent**: Create families of related objects without specifying their concrete classes.

The Abstract Factory is like a "factory of factories." Instead of one factory creating one type of object, an Abstract Factory creates a **suite of related objects** that work together.

**Real-world example**: A UI toolkit factory. A Windows factory creates Windows-style buttons and checkboxes. A Mac factory creates Mac-style buttons and checkboxes. The app asks the factory for a button — and gets the right style automatically.

```java
// Abstract products
interface Button {
    void render();
    void onClick();
}

interface Checkbox {
    void render();
    void onCheck();
}

// Windows implementations
class WindowsButton implements Button {
    @Override public void render() { System.out.println("Rendering Windows-style button"); }
    @Override public void onClick() { System.out.println("Windows button clicked!"); }
}

class WindowsCheckbox implements Checkbox {
    @Override public void render() { System.out.println("Rendering Windows-style checkbox"); }
    @Override public void onCheck() { System.out.println("Windows checkbox checked!"); }
}

// Mac implementations
class MacButton implements Button {
    @Override public void render() { System.out.println("Rendering Mac-style button"); }
    @Override public void onClick() { System.out.println("Mac button clicked!"); }
}

class MacCheckbox implements Checkbox {
    @Override public void render() { System.out.println("Rendering Mac-style checkbox"); }
    @Override public void onCheck() { System.out.println("Mac checkbox checked!"); }
}

// Abstract Factory interface
interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

// Concrete factories
class WindowsFactory implements GUIFactory {
    @Override public Button createButton() { return new WindowsButton(); }
    @Override public Checkbox createCheckbox() { return new WindowsCheckbox(); }
}

class MacFactory implements GUIFactory {
    @Override public Button createButton() { return new MacButton(); }
    @Override public Checkbox createCheckbox() { return new MacCheckbox(); }
}

// Client: works with any factory without knowing the concrete types
class Application {
    private Button button;
    private Checkbox checkbox;

    public Application(GUIFactory factory) {
        // Get appropriate components from the factory
        this.button = factory.createButton();
        this.checkbox = factory.createCheckbox();
    }

    public void renderUI() {
        button.render();
        checkbox.render();
    }
}
```

**Usage:**
```java
// Change one line to switch the entire UI style
GUIFactory factory = System.getProperty("os.name").contains("Windows")
    ? new WindowsFactory()
    : new MacFactory();

Application app = new Application(factory);
app.renderUI();
```

---

### Factory Method vs Abstract Factory

| Aspect | Factory Method | Abstract Factory |
|---|---|---|
| Creates | One type of object | Families of related objects |
| Uses | Single factory method | Multiple factory methods |
| Complexity | Simpler | More complex |
| Use case | Creating one kind of product | Creating a suite of products |
| Example | ShapeFactory.create("circle") | GUIFactory for buttons + checkboxes + menus |

---

## Real-World Analogy

Think of a **car dealership** as a factory. You walk in and say "I want an SUV." You don't know or care which factory built it, what specific assembly line was used, or which workers assembled it. The dealership (factory) figures it out and hands you the right car. If the dealership adds a new car model, they just add it to their catalog — you don't change how you request a car.

---

## Code Example

```java
// Notification Factory — full example
interface Notification {
    void send(String message, String recipient);
    String getType();
}

class EmailNotification implements Notification {
    @Override
    public void send(String message, String recipient) {
        System.out.println("[EMAIL to " + recipient + "]: " + message);
    }
    @Override public String getType() { return "Email"; }
}

class SmsNotification implements Notification {
    @Override
    public void send(String message, String recipient) {
        System.out.println("[SMS to " + recipient + "]: " + message);
    }
    @Override public String getType() { return "SMS"; }
}

class PushNotification implements Notification {
    @Override
    public void send(String message, String recipient) {
        System.out.println("[PUSH to " + recipient + "]: " + message);
    }
    @Override public String getType() { return "Push"; }
}

class NotificationFactory {
    public static Notification create(String type) {
        return switch (type.toUpperCase()) {
            case "EMAIL" -> new EmailNotification();
            case "SMS"   -> new SmsNotification();
            case "PUSH"  -> new PushNotification();
            default -> throw new IllegalArgumentException("Unknown type: " + type);
        };
    }
}

public class FactoryPatternDemo {
    public static void main(String[] args) {
        String[] types = {"EMAIL", "SMS", "PUSH"};
        String message = "Your order has been shipped!";
        String recipient = "Alice";

        for (String type : types) {
            Notification notification = NotificationFactory.create(type);
            notification.send(message, recipient);
        }
    }
}
```

### Output
```
[EMAIL to Alice]: Your order has been shipped!
[SMS to Alice]: Your order has been shipped!
[PUSH to Alice]: Your order has been shipped!
```

---

## Common Mistakes

- ❌ **Mistake**: Returning concrete types from the factory instead of the interface → ✅ **Fix**: Always return the interface/abstract type (`Shape`, not `Circle`). This maintains the decoupling.
- ❌ **Mistake**: Putting business logic inside factory methods → ✅ **Fix**: Factories should only create and configure objects, not process them.
- ❌ **Mistake**: Using Factory for simple, stable object creation → ✅ **Fix**: If you only ever create one type with no variation, `new` is fine. Use Factory when the type varies.

---

## Best Practices

- Return interfaces from factory methods, never concrete types.
- Use Factory when the object to create depends on configuration, user input, or runtime conditions.
- Consider Java's built-in patterns: `Calendar.getInstance()`, `NumberFormat.getInstance()` are factory methods in the JDK.
- For modern Java, you can use factory methods on interfaces (Java 8+): `List.of()`, `Map.of()`.
- Name factory methods clearly: `create()`, `build()`, `getInstance()`, `newInstance()`, `of()`.

---

## Interview Questions

**Q: What is the Factory Method pattern and why is it useful?**  
A: The Factory Method pattern defines an interface for creating an object but lets a factory method decide which concrete class to instantiate. It's useful because it decouples object creation from usage — the client code works with the interface and doesn't need to know or import concrete classes. Adding new types only requires adding to the factory, not modifying client code.

**Q: What is the difference between Factory Method and Abstract Factory?**  
A: Factory Method creates **one type of object** through a single factory method and is simpler. Abstract Factory creates **families of related objects** through multiple factory methods and ensures the created objects work together. Example: Factory Method creates a `Button`; Abstract Factory creates a `Button + Checkbox + Menu` that all have consistent Windows or Mac styling.

**Q: Where is the Factory pattern used in the Java standard library?**  
A: Many places: `Calendar.getInstance()` returns the right `Calendar` subclass for the locale. `NumberFormat.getInstance()` returns a locale-specific formatter. `java.util.Collections.singletonList()`, `List.of()`, `Map.of()` are factory methods. JDBC's `DriverManager.getConnection()` is a factory for database connections.

---

## Quick Revision

✔ Factory pattern creates objects without specifying the exact class  
✔ Client uses the interface, factory decides which concrete class to instantiate  
✔ Adding new types: add to factory + new class; no change in client code  
✔ Factory Method: one factory, one product type  
✔ Abstract Factory: one factory, a family of related products  
✔ Always return interface/abstract type from factory methods, not concrete types  

---

## Related Topics

- Singleton Pattern (Lesson 2)
- Builder Pattern (Lesson 4)
- Strategy Pattern (Lesson 6)

---

## Next Lesson

**Lesson 4 — Builder Pattern: Constructing Complex Objects Step by Step**
