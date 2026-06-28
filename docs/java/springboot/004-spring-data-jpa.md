---
id: spring-data-jpa
title: Spring Data JPA
description: Learn ORM, JPA, Hibernate, and Spring Data JPA to persist data in MySQL with @Entity, @Id, JpaRepository, and a complete Student CRUD example.
sidebar_position: 4
keywords:
  - Java
  - Spring Data JPA
  - JPA
  - Hibernate
  - ORM
  - MySQL
  - "@Entity"
---

# Spring Data JPA

> **Reading Time:** 20 Minutes  
> **Difficulty:** Intermediate

---

## Topic Summary

Databases are where your data lives permanently. Spring Data JPA is the technology that lets your Java code talk to databases — without writing SQL queries for basic operations. It uses JPA (Java Persistence API) and Hibernate under the hood to map Java objects to database tables automatically. In this lesson you'll connect to MySQL and build a complete, database-backed Student application.

---

## What You'll Learn

- What ORM (Object-Relational Mapping) is and why it exists
- The difference between JPA and Hibernate
- What Spring Data JPA adds on top
- Key annotations: `@Entity`, `@Id`, `@GeneratedValue`, `@Column`, `@Table`
- The `JpaRepository` interface and its built-in methods
- How to configure MySQL in `application.properties`
- Complete 4-layer architecture: Entity → Repository → Service → Controller

---

## Prerequisites

- Spring Boot Introduction and REST API lesson
- Basic SQL knowledge (SELECT, INSERT, UPDATE, DELETE)
- MySQL installed locally (or use H2 in-memory database for practice)
- Understanding of Java interfaces and generics

---

## Explanation

### What is ORM?

**ORM (Object-Relational Mapping)** is the technique of mapping Java objects to database tables automatically.

Without ORM, you write SQL manually:
```java
// Without ORM — painful!
Connection conn = DriverManager.getConnection(url, user, pass);
PreparedStatement ps = conn.prepareStatement(
    "INSERT INTO students (name, email, age) VALUES (?, ?, ?)"
);
ps.setString(1, student.getName());
ps.setString(2, student.getEmail());
ps.setInt(3, student.getAge());
ps.executeUpdate();
```

With ORM:
```java
// With Spring Data JPA — beautiful!
studentRepository.save(student);
```

ORM handles all the SQL for you — creating tables, converting objects to rows, converting rows back to objects.

---

### JPA vs Hibernate

| | JPA | Hibernate |
|---|---|---|
| **What it is** | A Java specification (a set of rules/interface) | An implementation of JPA |
| **Who made it** | Oracle (part of Java EE/Jakarta EE) | Red Hat |
| **Role** | Defines HOW ORM should work | Actually DOES the work |
| **Code** | Annotations like `@Entity`, `@Id` | SQL generation, caching, transactions |

**Analogy:** JPA is like JDBC (a specification). Hibernate is like the MySQL JDBC driver (the actual implementation). You write JPA code; Hibernate executes it.

Spring Boot automatically configures Hibernate as the JPA implementation.

---

### What is Spring Data JPA?

**Spring Data JPA** sits on top of JPA/Hibernate and makes database access even simpler. It provides:

1. **Repository interfaces** — Extend `JpaRepository` and get 20+ methods free (save, find, delete, count, etc.)
2. **Query methods** — Just name your method and Spring auto-generates the SQL! (`findByName`, `findByEmailAndAge`, etc.)
3. **JPQL queries** — Write queries using Java class names, not table names
4. **Pagination** — Built-in support for paginating large result sets

---

### Key JPA Annotations

#### `@Entity`
Marks a Java class as a JPA entity — it will be mapped to a database table.
```java
@Entity
public class Student { ... }
```

#### `@Table`
Optionally specify the exact table name (defaults to the class name).
```java
@Entity
@Table(name = "students")
public class Student { ... }
```

#### `@Id`
Marks the field that is the primary key.
```java
@Id
private Long id;
```

#### `@GeneratedValue`
Tells JPA to auto-generate the primary key value.
```java
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
// IDENTITY = uses database auto-increment (best for MySQL)
private Long id;
```

#### `@Column`
Customize column mapping (name, nullable, length, unique).
```java
@Column(name = "student_name", nullable = false, length = 100)
private String name;

@Column(unique = true)
private String email;
```

#### `@Transient`
This field is NOT stored in the database (only in the Java object).
```java
@Transient
private String temporaryField;
```

---

### JpaRepository — Your Swiss Army Knife

```java
public interface StudentRepository extends JpaRepository<Student, Long> {
    // You get all these methods FOR FREE:
    // save(S entity)          — insert or update
    // findById(ID id)         — find by primary key → Optional<T>
    // findAll()               — get all records → List<T>
    // deleteById(ID id)       — delete by primary key
    // count()                 — total number of records
    // existsById(ID id)       — check if record exists → boolean
    // saveAll(Iterable<S>)    — save multiple records
    // findAll(Sort sort)      — find all with sorting
    // findAll(Pageable)       — find all with pagination
}
```

`JpaRepository<Student, Long>` means:
- `Student` = the entity type
- `Long` = the type of the primary key

#### Custom Query Methods (Spring Data Magic!)
```java
public interface StudentRepository extends JpaRepository<Student, Long> {
    // Spring generates SQL automatically from method names!
    List<Student> findByName(String name);
    List<Student> findByAge(int age);
    Optional<Student> findByEmail(String email);
    List<Student> findByAgeGreaterThan(int age);
    List<Student> findByNameContaining(String keyword);
    List<Student> findByAgeAndName(int age, String name);
    long countByAge(int age);
}
```

Spring reads `findByName` and generates: `SELECT * FROM students WHERE name = ?`  
Spring reads `findByAgeGreaterThan` and generates: `SELECT * FROM students WHERE age > ?`

---

### MySQL Configuration in application.properties

```properties
# ===== MySQL Database Configuration =====
spring.datasource.url=jdbc:mysql://localhost:3306/studentdb?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# ===== JPA / Hibernate Configuration =====
# create         — drop and recreate tables every time app starts (use in development only!)
# create-drop    — create on startup, drop on shutdown
# update         — update schema if needed, never drops data (good for development)
# validate       — just validate schema, don't change anything (good for production)
# none           — do nothing (production default)
spring.jpa.hibernate.ddl-auto=update

# Show SQL queries in console (useful for debugging)
spring.jpa.show-sql=true

# Format the SQL so it's easier to read
spring.jpa.properties.hibernate.format_sql=true

# Hibernate dialect for MySQL 8
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

---

### Using H2 In-Memory Database (For Quick Practice)

If you don't have MySQL, use H2 — a tiny in-memory database that Spring Boot configures automatically:

Add to `pom.xml`:
```xml
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

`application.properties`:
```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=create-drop
spring.h2.console.enabled=true   # Access H2 console at /h2-console
```

---

## Real-World Analogy

Think of ORM as a **universal translator** between two different languages — Java (objects) and SQL (tables).

- Your Java `Student` object with fields `name`, `email`, `age` is translated into a table row with columns `name`, `email`, `age`
- JPA is the **grammar rules** of the translator
- Hibernate is the **actual translator** doing the work
- Spring Data JPA is like having an **AI assistant translator** — you just say "find me the student named Alice" (`findByName("Alice")`) and it writes the SQL for you

---

## Code Example

### Complete Student Application with MySQL

#### pom.xml Dependencies
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```

#### Student Entity
```java
package com.example.studentapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private int age;

    // Default constructor (required by JPA)
    public Student() {}

    public Student(String name, String email, int age) {
        this.name = name;
        this.email = email;
        this.age = age;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    @Override
    public String toString() {
        return "Student{id=" + id + ", name='" + name + "', email='" + email + "', age=" + age + "}";
    }
}
```

#### Student Repository
```java
package com.example.studentapp.repository;

import com.example.studentapp.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    // Spring auto-generates SQL from method name
    List<Student> findByName(String name);
    Optional<Student> findByEmail(String email);
    List<Student> findByAgeGreaterThanEqual(int age);
    List<Student> findByNameContainingIgnoreCase(String keyword);

    // Custom JPQL query (use class name, not table name)
    @Query("SELECT s FROM Student s WHERE s.name LIKE %:name%")
    List<Student> searchByName(@Param("name") String name);

    // Custom native SQL query
    @Query(value = "SELECT * FROM students WHERE age BETWEEN :minAge AND :maxAge",
           nativeQuery = true)
    List<Student> findByAgeBetween(@Param("minAge") int minAge, @Param("maxAge") int maxAge);
}
```

#### Student Service
```java
package com.example.studentapp.service;

import com.example.studentapp.model.Student;
import com.example.studentapp.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    public Student createStudent(Student student) {
        return studentRepository.save(student);  // INSERT
    }

    public Student updateStudent(Long id, Student updatedStudent) {
        Student existing = studentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        existing.setName(updatedStudent.getName());
        existing.setEmail(updatedStudent.getEmail());
        existing.setAge(updatedStudent.getAge());
        return studentRepository.save(existing);  // UPDATE (save with existing ID)
    }

    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new RuntimeException("Student not found with id: " + id);
        }
        studentRepository.deleteById(id);
    }

    public List<Student> searchStudents(String keyword) {
        return studentRepository.findByNameContainingIgnoreCase(keyword);
    }

    public long countStudents() {
        return studentRepository.count();
    }
}
```

#### Student Controller
```java
package com.example.studentapp.controller;

import com.example.studentapp.model.Student;
import com.example.studentapp.service.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public ResponseEntity<List<Student>> getAll() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getById(@PathVariable Long id) {
        return studentService.getStudentById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Student> create(@RequestBody Student student) {
        Student saved = studentService.createStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> update(@PathVariable Long id, @RequestBody Student student) {
        try {
            Student updated = studentService.updateStudent(id, student);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            studentService.deleteStudent(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Student>> search(@RequestParam String keyword) {
        return ResponseEntity.ok(studentService.searchStudents(keyword));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(studentService.countStudents());
    }
}
```

#### application.properties
```properties
# MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/studentdb?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.application.name=student-app
server.port=8080
```

### Output (Console when starting)
```
Hibernate: 
    create table if not exists students (
        id bigint not null auto_increment,
        age integer not null,
        email varchar(255) not null,
        name varchar(100) not null,
        primary key (id)
    ) engine=InnoDB

Started StudentApp in 3.421 seconds
```

---

## Common Mistakes

- ❌ **Mistake**: Forgetting the no-arg constructor on `@Entity` classes → ✅ **Fix**: JPA requires a public or protected no-arg constructor to create instances via reflection
- ❌ **Mistake**: Using `ddl-auto=create` in production → ✅ **Fix**: Use `validate` or `none` in production — `create` drops and recreates tables on every start, destroying all data!
- ❌ **Mistake**: Calling `.get()` on Optional without checking → ✅ **Fix**: Use `.isPresent()`, `.orElse()`, `.orElseThrow()` instead of just `.get()`
- ❌ **Mistake**: Not understanding that `save()` does both INSERT and UPDATE → ✅ **Fix**: If entity has an ID that exists in the DB, `save()` does UPDATE; if ID is null or doesn't exist, it does INSERT

---

## Best Practices

- Always use `Optional` return type for `findById` results — never assume the record exists
- Use `@Transactional` on service methods that modify data for proper transaction management
- Prefer Spring Data JPA query methods over native SQL for portability
- Never expose your entity class directly in the API — use DTOs (Data Transfer Objects)
- Use `Pageable` for endpoints that return lists to avoid loading millions of records

---

## Interview Questions

**Q: What is the difference between JPA and Hibernate?**  
A: JPA (Jakarta Persistence API) is a specification — a set of rules defined in Java EE for how ORM should work. It defines annotations like `@Entity`, `@Id`, and the `EntityManager` interface. Hibernate is a specific implementation of JPA that actually does the work. Spring Boot uses Hibernate as the default JPA provider.

**Q: What is Spring Data JPA?**  
A: Spring Data JPA is a Spring module that simplifies database access by providing repository abstractions on top of JPA. By extending `JpaRepository`, you automatically get CRUD methods without writing any implementation. It also supports query derivation from method names (e.g., `findByName`) and JPQL queries with `@Query`.

**Q: What does `@GeneratedValue(strategy = GenerationType.IDENTITY)` mean?**  
A: It tells JPA to let the database generate the primary key value automatically using the database's auto-increment feature. `GenerationType.IDENTITY` is the best choice for MySQL. Other strategies include `SEQUENCE` (for Oracle, PostgreSQL) and `TABLE` (database-agnostic but slower).

**Q: What is the difference between `save()` for insert vs update?**  
A: Spring Data's `save()` method checks if the entity is new (ID is null or entity doesn't exist in DB) — if new, it calls INSERT; if existing, it calls UPDATE (merge). This is determined by the `isNew()` method in `SimpleJpaRepository`.

**Q: What does `spring.jpa.hibernate.ddl-auto=update` do?**  
A: It tells Hibernate to automatically update the database schema to match your entity classes when the application starts. It adds new columns or tables but never drops existing ones. For production, use `validate` (just checks schema) or `none` (does nothing).

---

## Quick Revision

✔ ORM maps Java objects to database tables automatically — no manual SQL for basic CRUD  
✔ JPA = specification, Hibernate = implementation, Spring Data JPA = convenience layer  
✔ `@Entity` marks a class as a DB table, `@Id` marks the primary key  
✔ `@GeneratedValue(strategy = GenerationType.IDENTITY)` = auto-increment  
✔ Extend `JpaRepository<Entity, IdType>` to get 20+ free CRUD methods  
✔ Spring generates SQL from method names: `findByName`, `findByAgeGreaterThan`  
✔ Use `ddl-auto=update` for development, `validate` or `none` for production  

---

## Related Topics

- REST API with Spring Boot
- Spring Security (protecting your API)
- JDBC (lower-level database access)
- Bean Validation with `@Valid`

---

## Next Lesson

**Lesson 5 — Spring Security Basics**
