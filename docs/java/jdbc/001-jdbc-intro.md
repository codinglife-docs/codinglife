---
id: jdbc-intro
title: Java Database Connectivity (JDBC)
description: Learn JDBC fundamentals — drivers, Connection, Statement, PreparedStatement, ResultSet — and how to perform CRUD operations on MySQL safely.
sidebar_position: 1
keywords:
  - Java
  - JDBC
  - MySQL
  - PreparedStatement
  - SQL injection
  - Database
---

# Java Database Connectivity (JDBC)

> **Reading Time:** 16 Minutes  
> **Difficulty:** Beginner to Intermediate

---

## Topic Summary

JDBC (Java Database Connectivity) is the standard Java API that lets your Java programs connect to and interact with databases. It's the foundation layer that all Java database frameworks (Spring Data JPA, Hibernate, MyBatis) are built on top of. Understanding JDBC teaches you exactly what happens "under the hood" when Java talks to a database. Every Java developer should know the basics of JDBC.

---

## What You'll Learn

- What JDBC is and how it fits in the Java ecosystem
- JDBC driver types (what they are)
- Core JDBC classes: `Connection`, `Statement`, `PreparedStatement`, `ResultSet`
- How to connect to MySQL from Java
- How to execute SELECT, INSERT, UPDATE, DELETE
- Why PreparedStatement is better than Statement (SQL injection)
- How to properly close database resources

---

## Prerequisites

- Basic Java (classes, objects, exceptions)
- Basic SQL (SELECT, INSERT, UPDATE, DELETE)
- MySQL installed locally
- JDBC driver JAR (MySQL Connector/J) on classpath

---

## Explanation

### What is JDBC?

JDBC is a Java API (a set of interfaces and classes in the `java.sql` package) that provides a standard way for Java programs to connect to relational databases.

Without JDBC, every database vendor (MySQL, Oracle, PostgreSQL, SQLite) would require completely different Java code to connect. JDBC creates a **unified API** — you write the same Java code regardless of which database you use. Only the driver changes.

**JDBC's role in the Java stack:**

```
Your Java Code
      ↓ (uses java.sql API)
JDBC API (java.sql.*)
      ↓ (calls driver)
JDBC Driver (vendor-specific)
      ↓ (network connection)
Database (MySQL / Oracle / PostgreSQL)
```

---

### JDBC Driver Types

A **JDBC Driver** is the bridge between your Java code and the actual database. There are 4 types:

| Type | Name | How It Works | Use Today? |
|---|---|---|---|
| Type 1 | JDBC-ODBC Bridge | Converts JDBC calls to ODBC calls | ❌ Obsolete |
| Type 2 | Native API Driver | Uses native database client libraries | ❌ Rarely used |
| Type 3 | Network Protocol Driver | Sends to middleware server | ❌ Rare |
| **Type 4** | **Thin Driver (Pure Java)** | Directly talks to database over network | ✅ **Used today** |

**Type 4 (Thin Driver)** is what everyone uses. For MySQL, it's the **MySQL Connector/J** JAR file.

Add to `pom.xml`:
```xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <version>8.3.0</version>
</dependency>
```

Or download the JAR from [dev.mysql.com](https://dev.mysql.com/downloads/connector/j/) and add it to your classpath.

---

### Core JDBC Classes

#### 1. `DriverManager`
The entry point — used to get a `Connection` to the database.
```java
Connection conn = DriverManager.getConnection(url, username, password);
```

#### 2. `Connection`
Represents an active connection to the database. All database operations require a connection.
```java
Connection conn = DriverManager.getConnection(url, username, password);
// Use the connection...
conn.close();  // Always close when done!
```

#### 3. `Statement`
Used to execute SQL queries. **Vulnerable to SQL injection** (use PreparedStatement instead for user input).
```java
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery("SELECT * FROM students");
```

#### 4. `PreparedStatement`
Pre-compiled SQL with placeholders (`?`) for parameters. Prevents SQL injection. **Always use this for user input.**
```java
PreparedStatement ps = conn.prepareStatement("SELECT * FROM students WHERE id = ?");
ps.setLong(1, userId);  // Set the ? at position 1
ResultSet rs = ps.executeQuery();
```

#### 5. `ResultSet`
Contains the rows returned by a SELECT query. You iterate through it row by row.
```java
while (rs.next()) {  // Move to next row; returns false when no more rows
    long id = rs.getLong("id");
    String name = rs.getString("name");
    int age = rs.getInt("age");
}
```

---

### Statement Methods

| Method | Used For | Returns |
|---|---|---|
| `executeQuery(sql)` | SELECT | `ResultSet` |
| `executeUpdate(sql)` | INSERT, UPDATE, DELETE | `int` (rows affected) |
| `execute(sql)` | Any SQL | `boolean` |
| `executeBatch()` | Multiple statements at once | `int[]` |

---

### Statement vs PreparedStatement — SQL Injection!

**The danger with `Statement`:**

```java
// DANGEROUS! User input goes directly into SQL
String userInput = "'; DROP TABLE students; --";  // Malicious input
String sql = "SELECT * FROM students WHERE name = '" + userInput + "'";
// This becomes: SELECT * FROM students WHERE name = ''; DROP TABLE students; --'
// The attacker just deleted your table!
Statement stmt = conn.createStatement();
stmt.executeQuery(sql);  // DISASTER!
```

**The safe way with `PreparedStatement`:**

```java
// SAFE! Parameters are escaped automatically
String userInput = "'; DROP TABLE students; --";
String sql = "SELECT * FROM students WHERE name = ?";
PreparedStatement ps = conn.prepareStatement(sql);
ps.setString(1, userInput);  // Treated as data, not SQL
ResultSet rs = ps.executeQuery();
// SQL injection attempt is neutralized!
```

**Why PreparedStatement is better:**
1. **Security** — Prevents SQL injection (parameters are sanitized)
2. **Performance** — SQL is compiled once, parameters can change (for repeated queries)
3. **Readability** — Cleaner code with placeholders instead of string concatenation

**Rule: ALWAYS use PreparedStatement when dealing with user input or dynamic values.**

---

### Closing Resources — Try-With-Resources

Database connections are expensive resources. If you don't close them, you'll get connection leaks and your database will eventually refuse new connections.

**Old way (verbose, easy to forget):**
```java
Connection conn = null;
Statement stmt = null;
ResultSet rs = null;
try {
    conn = DriverManager.getConnection(url, user, pass);
    // ... use resources
} catch (SQLException e) {
    e.printStackTrace();
} finally {
    // Close in reverse order, each in its own try-catch
    try { if (rs != null) rs.close(); } catch (SQLException e) {}
    try { if (stmt != null) stmt.close(); } catch (SQLException e) {}
    try { if (conn != null) conn.close(); } catch (SQLException e) {}
}
```

**Modern way (try-with-resources — RECOMMENDED):**
```java
// Resources are closed automatically when the try block exits!
try (Connection conn = DriverManager.getConnection(url, user, pass);
     PreparedStatement ps = conn.prepareStatement(sql);
     ResultSet rs = ps.executeQuery()) {
    // Use resources here
} catch (SQLException e) {
    e.printStackTrace();
}
// conn, ps, rs are all closed automatically — even if exception occurs
```

---

### Database Setup

Create the MySQL database and table:
```sql
CREATE DATABASE studentdb;
USE studentdb;

CREATE TABLE students (
    id    BIGINT AUTO_INCREMENT PRIMARY KEY,
    name  VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age   INT NOT NULL
);

INSERT INTO students (name, email, age) VALUES
    ('Alice Johnson', 'alice@example.com', 20),
    ('Bob Smith', 'bob@example.com', 22),
    ('Carol White', 'carol@example.com', 19);
```

---

## Real-World Analogy

JDBC is like a **universal adapter plug**.

Imagine you have a laptop charger (your Java code) that works with one plug type. If you travel to a different country (use a different database), the socket shape is different (MySQL vs Oracle vs PostgreSQL).

**JDBC** is the universal adapter in between — your charger (Java code) always connects to JDBC, and JDBC has adapters (drivers) for every socket type (database). You don't change your charger; you just swap the adapter.

**PreparedStatement** is like a **form with labeled fields** — "Name: _____, Age: _____". No matter what the user writes in those fields, it's treated as data, not instructions. Without it (using Statement), it's like letting users write directly on the contract — they could insert clauses that change the whole meaning!

---

## Code Example

### Complete JDBC CRUD Example

```java
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class StudentJdbcExample {

    // Database connection details
    private static final String URL      = "jdbc:mysql://localhost:3306/studentdb" +
                                           "?useSSL=false&serverTimezone=UTC";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "yourpassword";

    // ===== 1. GET ALL STUDENTS (SELECT) =====
    public static void getAllStudents() throws SQLException {
        String sql = "SELECT id, name, email, age FROM students ORDER BY id";

        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            System.out.println("=== All Students ===");
            while (rs.next()) {
                long id     = rs.getLong("id");
                String name = rs.getString("name");
                String email= rs.getString("email");
                int age     = rs.getInt("age");
                System.out.printf("ID: %d | Name: %-20s | Email: %-25s | Age: %d%n",
                        id, name, email, age);
            }
        }
    }

    // ===== 2. GET STUDENT BY ID (SELECT with PreparedStatement) =====
    public static void getStudentById(long id) throws SQLException {
        String sql = "SELECT id, name, email, age FROM students WHERE id = ?";

        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setLong(1, id);  // Set the ? parameter

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    System.out.println("Found: " + rs.getString("name") +
                            " (age " + rs.getInt("age") + ")");
                } else {
                    System.out.println("No student found with ID: " + id);
                }
            }
        }
    }

    // ===== 3. INSERT NEW STUDENT =====
    public static long insertStudent(String name, String email, int age) throws SQLException {
        // RETURN_GENERATED_KEYS lets us get the auto-generated ID
        String sql = "INSERT INTO students (name, email, age) VALUES (?, ?, ?)";

        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            ps.setString(1, name);
            ps.setString(2, email);
            ps.setInt(3, age);

            int rowsAffected = ps.executeUpdate();
            System.out.println("Rows inserted: " + rowsAffected);

            // Get the auto-generated ID
            try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    long newId = generatedKeys.getLong(1);
                    System.out.println("New student ID: " + newId);
                    return newId;
                }
            }
        }
        return -1;
    }

    // ===== 4. UPDATE STUDENT =====
    public static void updateStudent(long id, String newName, int newAge) throws SQLException {
        String sql = "UPDATE students SET name = ?, age = ? WHERE id = ?";

        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, newName);
            ps.setInt(2, newAge);
            ps.setLong(3, id);

            int rowsAffected = ps.executeUpdate();
            System.out.println("Rows updated: " + rowsAffected);
        }
    }

    // ===== 5. DELETE STUDENT =====
    public static void deleteStudent(long id) throws SQLException {
        String sql = "DELETE FROM students WHERE id = ?";

        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setLong(1, id);

            int rowsAffected = ps.executeUpdate();
            System.out.println("Rows deleted: " + rowsAffected);
        }
    }

    // ===== 6. SEARCH STUDENTS (LIKE) =====
    public static void searchStudents(String keyword) throws SQLException {
        String sql = "SELECT id, name, email FROM students WHERE name LIKE ?";

        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, "%" + keyword + "%");  // % = wildcard

            try (ResultSet rs = ps.executeQuery()) {
                System.out.println("=== Search Results for: " + keyword + " ===");
                while (rs.next()) {
                    System.out.println(rs.getLong("id") + " | " +
                            rs.getString("name") + " | " + rs.getString("email"));
                }
            }
        }
    }

    // ===== MAIN METHOD — Test all operations =====
    public static void main(String[] args) {
        try {
            // 1. Display all students
            getAllStudents();
            System.out.println();

            // 2. Get specific student
            getStudentById(1);
            System.out.println();

            // 3. Insert new student
            long newId = insertStudent("David Brown", "david@example.com", 21);
            System.out.println();

            // 4. Update the student we just created
            updateStudent(newId, "David Brown Jr.", 22);
            System.out.println();

            // 5. Show all students again to verify
            getAllStudents();
            System.out.println();

            // 6. Search
            searchStudents("Alice");
            System.out.println();

            // 7. Delete the new student
            deleteStudent(newId);
            System.out.println("Deleted student with ID: " + newId);

        } catch (SQLException e) {
            System.err.println("Database error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
```

### Output
```
=== All Students ===
ID: 1 | Name: Alice Johnson          | Email: alice@example.com           | Age: 20
ID: 2 | Name: Bob Smith              | Email: bob@example.com             | Age: 22
ID: 3 | Name: Carol White            | Email: carol@example.com           | Age: 19

Found: Alice Johnson (age 20)

Rows inserted: 1
New student ID: 4

Rows updated: 1

=== All Students ===
ID: 1 | Name: Alice Johnson          | Email: alice@example.com           | Age: 20
ID: 2 | Name: Bob Smith              | Email: bob@example.com             | Age: 22
ID: 3 | Name: Carol White            | Email: carol@example.com           | Age: 19
ID: 4 | Name: David Brown Jr.        | Email: david@example.com           | Age: 22

=== Search Results for: Alice ===
1 | Alice Johnson | alice@example.com

Rows deleted: 1
Deleted student with ID: 4
```

---

## Common Mistakes

- ❌ **Mistake**: Using `Statement` with user-provided input → ✅ **Fix**: Always use `PreparedStatement` with `?` placeholders for any dynamic values — this prevents SQL injection
- ❌ **Mistake**: Not closing `Connection`, `Statement`, `ResultSet` → ✅ **Fix**: Always use try-with-resources (`try(Connection c = ...) {}`) to auto-close resources
- ❌ **Mistake**: Opening a new connection for every database operation → ✅ **Fix**: Use a Connection Pool (like HikariCP) to reuse connections — Spring Boot uses HikariCP by default
- ❌ **Mistake**: Hardcoding database credentials in Java code → ✅ **Fix**: Use properties files, environment variables, or `application.properties` for credentials
- ❌ **Mistake**: Not handling `SQLException` → ✅ **Fix**: Always catch and properly log/handle `SQLException`

---

## Best Practices

- Always use `PreparedStatement` — never `Statement` for user input
- Always use **try-with-resources** to ensure connections are closed
- Use a **Connection Pool** (HikariCP, Apache DBCP) in production — don't open new connections every request
- Keep SQL queries in **constants** or a separate configuration — don't scatter SQL strings everywhere
- For complex apps, use **Spring Data JPA** or **MyBatis** instead of raw JDBC — they handle connection management for you
- Always use **transactions** for operations that should either all succeed or all fail

---

## Interview Questions

**Q: What is JDBC and what are its core components?**  
A: JDBC (Java Database Connectivity) is the standard Java API for connecting to relational databases. Core components are: `DriverManager` (gets connections), `Connection` (represents a DB connection), `Statement`/`PreparedStatement` (executes SQL), and `ResultSet` (holds query results). It provides a database-independent interface so the same Java code works with any JDBC-compliant database.

**Q: What is the difference between Statement and PreparedStatement?**  
A: `Statement` executes SQL as a plain string — dangerous with user input because it's vulnerable to SQL injection. `PreparedStatement` uses parameterized queries with `?` placeholders — parameters are automatically escaped, preventing SQL injection. PreparedStatement is also more efficient for repeated queries as it's pre-compiled. You should always use PreparedStatement for any query involving user input.

**Q: What is SQL injection and how does PreparedStatement prevent it?**  
A: SQL injection is an attack where malicious input alters the SQL query structure (e.g., inputting `' OR '1'='1` to bypass authentication). PreparedStatement prevents this by separating SQL code from data — the `?` placeholders are never interpreted as SQL code; they're always treated as data values. The database driver escapes the values before including them in the query.

**Q: Why should you use try-with-resources for JDBC?**  
A: Database connections, statements, and result sets implement `AutoCloseable`. Using try-with-resources ensures they are closed automatically when the block exits — even if an exception occurs. Without this, if an exception is thrown before `close()` is called, you get connection leaks that eventually exhaust the connection pool.

**Q: What is a Connection Pool and why is it needed?**  
A: Creating a new database connection is expensive (network handshake, authentication, resource allocation — can take 100ms+). A Connection Pool maintains a set of pre-created, reusable connections. When your code needs a connection, it borrows one from the pool; when done, it returns it. This dramatically improves performance. HikariCP is the most popular connection pool, used by Spring Boot by default.

---

## Quick Revision

✔ JDBC = Java API for database connectivity; uses drivers to talk to specific databases  
✔ JDBC Driver Type 4 (Pure Java/Thin) is what everyone uses today  
✔ `DriverManager.getConnection(url, user, pass)` → opens a DB connection  
✔ `Statement` for static SQL, `PreparedStatement` for dynamic/user-input SQL  
✔ `ResultSet` → holds SELECT results; iterate with `while(rs.next())`  
✔ `PreparedStatement` + `?` parameters = SQL injection prevention  
✔ Always use try-with-resources to auto-close Connection, Statement, ResultSet  

---

## Related Topics

- Spring Data JPA (abstraction over JDBC)
- Hibernate (ORM framework that uses JDBC underneath)
- Connection Pooling (HikariCP)
- SQL Basics

---

## Next Section

**Interview Preparation — Top 100 Java Interview Questions**
