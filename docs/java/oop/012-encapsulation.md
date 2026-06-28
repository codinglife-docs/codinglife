---
id: encapsulation
title: Encapsulation
description: Learn Java encapsulation — how private fields with public getters and setters protect data and enable validation in classes like BankAccount.
sidebar_position: 12
keywords:
  - Java
  - Encapsulation
  - Private Fields
  - Getters
  - Setters
  - Data Hiding
---

# Encapsulation

> **Reading Time:** 9 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

**Encapsulation** is the practice of hiding an object's internal data (fields) from the outside world and controlling access through public methods (getters and setters). It's like putting your data in a protective capsule — the data is safe inside, and you control what gets in and out. This is one of the four pillars of OOP and is critical for writing secure, maintainable code.

---

## What You'll Learn

- Why exposing fields directly is dangerous
- How to make fields private and expose them through getters/setters
- How to add data validation in setters
- A complete BankAccount example with encapsulated balance

---

## Prerequisites

- Classes and Objects (Lesson 02)
- Access Modifiers (coming in Lesson 15 — `private` and `public` basics needed)

---

## Explanation

### The Problem with Public Fields

Imagine a `BankAccount` class with a `balance` field that's publicly accessible:

```java
class BankAccount {
    double balance;  // public by default (no modifier)
}

BankAccount account = new BankAccount();
account.balance = -99999;  // ANYONE can set any value — even invalid ones!
```

Nothing stops someone from setting a balance to a negative number, or zero, or accidentally assigning a completely wrong value. The data is completely unprotected.

---

### The Solution: Private Fields + Public Methods

Encapsulation says: **make fields `private`, and provide controlled access through `public` methods.**

```java
class BankAccount {
    private double balance;  // PRIVATE — no one outside can touch this directly

    // Public getter — allows reading the balance
    public double getBalance() {
        return balance;
    }

    // Public setter — allows changing balance, with validation
    public void setBalance(double balance) {
        if (balance >= 0) {  // VALIDATION!
            this.balance = balance;
        } else {
            System.out.println("Error: Balance cannot be negative!");
        }
    }
}
```

Now:
```java
BankAccount account = new BankAccount();
account.balance = -500;      // COMPILE ERROR — private!
account.setBalance(-500);    // Runs, but prints error and rejects it
account.setBalance(1000);    // OK — valid value accepted
System.out.println(account.getBalance()); // 1000.0
```

---

### Getters and Setters

**Getter** — a `public` method that returns the value of a private field:
```java
public String getName() {
    return name;  // just returns the field
}
```

Naming convention: `get` + field name with capital first letter → `getName()`, `getAge()`, `getBalance()`

**Setter** — a `public` method that sets the value of a private field (usually with validation):
```java
public void setAge(int age) {
    if (age > 0 && age < 150) {
        this.age = age;
    } else {
        System.out.println("Invalid age!");
    }
}
```

Naming convention: `set` + field name with capital first letter → `setName()`, `setAge()`, `setBalance()`

---

### Read-Only and Write-Only Fields

Encapsulation lets you make fields read-only (getter, no setter) or write-only (setter, no getter):

```java
class Student {
    private int id;
    private String name;

    // Read-only: id is set once (constructor) and can't be changed
    public int getId() { return id; }
    // No setId() — prevents changing the ID after creation

    // Normal read-write
    public String getName() { return name; }
    public void setName(String name) {
        if (name != null && !name.isEmpty()) {
            this.name = name;
        }
    }
}
```

---

### Why Encapsulation Matters

1. **Data Validation** — setters can reject invalid values (negative balance, null name, etc.)
2. **Security** — internal data can't be tampered with directly
3. **Flexibility** — you can change the internal implementation without affecting code that uses the class
4. **Maintainability** — all data access goes through one point (the setter), making it easy to add logging, caching, or other logic later

---

### Encapsulation and IDEs

Modern IDEs (IntelliJ, Eclipse, VS Code) can generate getters and setters automatically. In IntelliJ: right-click → Generate → Getter and Setter.

---

## Real-World Analogy

Think of an **ATM machine**.

Your bank account has money (private field). You can't reach into the ATM and grab cash directly. Instead:
- You use "Withdraw" (a controlled setter-like method) — and the ATM validates you have enough funds
- You use "Check Balance" (a getter-like method) — and the ATM shows you the balance without letting you change it directly

The ATM **encapsulates** the bank account. It controls what you can do and ensures all operations are valid.

---

## Code Example

```java
class BankAccount {
    // Private fields — protected from direct access
    private String owner;
    private double balance;
    private String accountNumber;

    // Constructor
    BankAccount(String owner, String accountNumber, double initialBalance) {
        this.owner = owner;
        this.accountNumber = accountNumber;
        if (initialBalance >= 0) {
            this.balance = initialBalance;
        } else {
            this.balance = 0;
            System.out.println("Initial balance can't be negative. Set to 0.");
        }
    }

    // Getter for owner (read-only)
    public String getOwner() {
        return owner;
    }

    // Getter for balance (read-only — no setter, balance changes via deposit/withdraw)
    public double getBalance() {
        return balance;
    }

    // Getter for account number (shows masked version — extra protection!)
    public String getAccountNumber() {
        // Only show last 4 digits
        return "****" + accountNumber.substring(accountNumber.length() - 4);
    }

    // Controlled deposit method (no direct setter for balance)
    public void deposit(double amount) {
        if (amount <= 0) {
            System.out.println("Deposit amount must be positive!");
            return;
        }
        balance += amount;
        System.out.printf("Deposited: $%.2f | New Balance: $%.2f%n", amount, balance);
    }

    // Controlled withdraw method
    public void withdraw(double amount) {
        if (amount <= 0) {
            System.out.println("Withdrawal amount must be positive!");
        } else if (amount > balance) {
            System.out.println("Insufficient funds! Balance: $" + balance);
        } else {
            balance -= amount;
            System.out.printf("Withdrawn: $%.2f | New Balance: $%.2f%n", amount, balance);
        }
    }

    // Display account summary
    public void displaySummary() {
        System.out.println("=== Account Summary ===");
        System.out.println("Owner: " + owner);
        System.out.println("Account: " + getAccountNumber());  // masked
        System.out.printf("Balance: $%.2f%n", balance);
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("Alice", "123456789", 1000.0);

        account.displaySummary();
        System.out.println();

        account.deposit(500);
        account.deposit(-100);    // Invalid — rejected with message
        account.withdraw(200);
        account.withdraw(2000);   // Invalid — insufficient funds
        account.withdraw(0);      // Invalid — zero amount

        System.out.println();
        account.displaySummary();

        // These would be COMPILE ERRORS — fields are private!
        // account.balance = 999999;
        // account.accountNumber = "hacked";
    }
}
```

### Output
```
=== Account Summary ===
Owner: Alice
Account: ****6789
Balance: $1000.00

Deposited: $500.00 | New Balance: $1500.00
Deposit amount must be positive!
Withdrawn: $200.00 | New Balance: $1300.00
Insufficient funds! Balance: $1300.0
Withdrawal amount must be positive!

=== Account Summary ===
Owner: Alice
Account: ****6789
Balance: $1300.00
```

---

## Common Mistakes

- ❌ **Mistake**: Making fields `public` for "convenience" → ✅ **Fix**: Always make fields `private`. There's no upside to public fields — only risk.
- ❌ **Mistake**: Writing a setter that does no validation (just `this.x = x`) → ✅ **Fix**: Even basic null checks are better than nothing. Use setters as a place to validate.
- ❌ **Mistake**: Returning a reference to a mutable private object from a getter (exposes the internal object) → ✅ **Fix**: Return a copy: `return new ArrayList<>(this.items)` instead of `return this.items`.

---

## Best Practices

- Always make fields `private` — that's the default rule
- Provide getters for fields that need to be read
- Provide setters ONLY if the field needs to be changed after construction — and add validation
- Don't blindly generate getters/setters for every field — think about what should be accessible
- Use constructor to set required fields — not every field needs a setter

---

## Interview Questions

**Q: What is encapsulation in Java?**  
A: Encapsulation is the OOP practice of hiding internal data (making fields `private`) and providing controlled access through `public` getter and setter methods. This protects data from invalid or unauthorized access and lets you add validation logic in one centralized place.

**Q: Why should fields be private?**  
A: Private fields prevent external code from directly reading or modifying internal state. This protects data integrity (can't set an invalid value), allows you to change internal implementation without breaking callers, and gives you control over how data is accessed (e.g., read-only, write-only, or with validation).

**Q: What is the difference between a getter and a setter?**  
A: A getter (`getFieldName()`) returns the value of a private field — it provides read access. A setter (`setFieldName(value)`) accepts a value and assigns it to the private field — it provides write access, usually with validation. Together they control how private fields are accessed.

---

## Quick Revision

✔ Encapsulation = private fields + public getters/setters  
✔ Private fields can't be accessed directly from outside the class  
✔ Getters provide **read** access; Setters provide **write** access with **validation**  
✔ Enables data integrity, security, and flexibility  
✔ Naming convention: `getFieldName()` / `setFieldName(value)`  

---

## Related Topics

- Access Modifiers
- this Keyword (used in setters)
- Constructors

---

## Next Lesson

**13 - The static Keyword**
