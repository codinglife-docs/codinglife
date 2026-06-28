---
id: rest-api
title: Building REST APIs with Spring Boot
description: Learn how to build a complete CRUD REST API using Spring Boot with @RestController, @GetMapping, @PostMapping, @PathVariable, @RequestBody, and @RequestParam.
sidebar_position: 3
keywords:
  - Java
  - REST API
  - Spring Boot
  - "@RestController"
  - CRUD
  - HTTP methods
---

# Building REST APIs with Spring Boot

> **Reading Time:** 18 Minutes  
> **Difficulty:** Beginner to Intermediate

---

## Topic Summary

REST (Representational State Transfer) is the standard way apps talk to each other over the internet. When your phone app loads data from a server, it's using a REST API. Spring Boot makes building REST APIs incredibly simple — you add a few annotations and your Java methods become internet-accessible endpoints. In this lesson, you'll build a complete Student CRUD API from scratch.

---

## What You'll Learn

- What REST is and how HTTP methods work
- Key Spring Boot annotations: `@RestController`, `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`
- How to use `@PathVariable`, `@RequestBody`, and `@RequestParam`
- How to build a complete CRUD API for a Student resource
- How to test your API with curl or Postman

---

## Prerequisites

- Spring Boot Introduction (auto-configuration, project setup)
- Basic Java (classes, lists, generics)
- Understanding of what HTTP is (requests and responses)

---

## Explanation

### What is REST?

REST is an architectural style for building APIs (Application Programming Interfaces). An API following REST principles is called a RESTful API.

**Key REST Principles:**
1. **Resources** — Everything is a resource (a Student, a Product, an Order). Resources are identified by URLs.
2. **HTTP Methods** — Actions are expressed using HTTP methods (GET, POST, PUT, DELETE)
3. **Stateless** — Each request is independent; the server doesn't remember previous requests
4. **JSON** — Data is typically sent and received as JSON (JavaScript Object Notation)

---

### HTTP Methods Explained

| Method | Purpose | Example |
|---|---|---|
| **GET** | Retrieve data | Get all students / Get student by ID |
| **POST** | Create new data | Create a new student |
| **PUT** | Update existing data (full update) | Update all fields of a student |
| **PATCH** | Partial update | Update only the student's email |
| **DELETE** | Delete data | Delete a student by ID |

---

### REST URL Design (Best Practices)

```
GET    /students          → Get all students
GET    /students/{id}     → Get one student by ID
POST   /students          → Create a new student
PUT    /students/{id}     → Update a student completely
DELETE /students/{id}     → Delete a student
```

**URL design rules:**
- Use **nouns**, not verbs (`/students` not `/getStudents`)
- Use **plural** for collections (`/students` not `/student`)
- Use `{id}` for specific resources (`/students/42`)

---

### Spring Boot REST Annotations

#### `@RestController`
Marks a class as a REST controller. It combines `@Controller` (marks it as a Spring MVC controller) and `@ResponseBody` (every method returns data directly to the response body, not a view name).

```java
@RestController
@RequestMapping("/students")  // Base path for all methods in this class
public class StudentController {
    // all endpoints here
}
```

#### `@RequestMapping`
Maps HTTP requests to handler methods. Can be used at class level (base path) or method level.

#### Shortcut Mapping Annotations
```java
@GetMapping("/")       // maps GET requests
@PostMapping("/")      // maps POST requests
@PutMapping("/{id}")   // maps PUT requests
@DeleteMapping("/{id}")// maps DELETE requests
@PatchMapping("/{id}") // maps PATCH requests
```

#### `@PathVariable`
Extracts a value from the URL path.
```java
@GetMapping("/{id}")
public Student getById(@PathVariable Long id) {
    // id comes from the URL: /students/42 → id = 42
}
```

#### `@RequestBody`
Reads the HTTP request body and converts it to a Java object (JSON → Java using Jackson).
```java
@PostMapping
public Student create(@RequestBody Student student) {
    // JSON body is automatically converted to a Student object
}
```

#### `@RequestParam`
Reads query parameters from the URL.
```java
@GetMapping("/search")
public List<Student> search(@RequestParam String name) {
    // URL: /students/search?name=John → name = "John"
}
```

---

### HTTP Response Status Codes

| Code | Meaning | When to Use |
|---|---|---|
| 200 OK | Success | GET, PUT requests |
| 201 Created | Resource created | POST requests |
| 204 No Content | Success, no body | DELETE requests |
| 400 Bad Request | Client sent bad data | Validation errors |
| 404 Not Found | Resource doesn't exist | GET/PUT/DELETE on non-existent resource |
| 500 Internal Server Error | Server crashed | Unexpected errors |

Use `ResponseEntity<T>` to control the response status code.

---

## Real-World Analogy

Think of a REST API like a restaurant:

- The **menu** = your API documentation (what resources are available)
- **Ordering food** = POST request (creating something new)
- **Checking your order** = GET request (reading data)
- **Changing your order** = PUT/PATCH request (updating data)
- **Cancelling your order** = DELETE request (removing data)
- The **waiter** = the HTTP protocol (takes your request to the kitchen and brings back the response)
- The **kitchen** = your Spring Boot application (processes the request)

---

## Code Example

### Complete Student CRUD REST API

#### 1. Student Model Class
```java
package com.example.demo.model;

// Simple POJO (Plain Old Java Object) — no database yet
public class Student {
    private Long id;
    private String name;
    private String email;
    private int age;

    // Default constructor (required for JSON deserialization)
    public Student() {}

    public Student(Long id, String name, String email, int age) {
        this.id = id;
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

#### 2. Student Service (Business Logic)
```java
package com.example.demo.service;

import com.example.demo.model.Student;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Service  // Marks this as a Spring service bean
public class StudentService {

    // In-memory storage (no database in this example)
    private final Map<Long, Student> studentStore = new HashMap<>();
    private final AtomicLong idCounter = new AtomicLong(1);

    // Pre-populate with some data
    public StudentService() {
        Student s1 = new Student(idCounter.getAndIncrement(), "Alice Johnson", "alice@example.com", 20);
        Student s2 = new Student(idCounter.getAndIncrement(), "Bob Smith", "bob@example.com", 22);
        Student s3 = new Student(idCounter.getAndIncrement(), "Carol White", "carol@example.com", 19);
        studentStore.put(s1.getId(), s1);
        studentStore.put(s2.getId(), s2);
        studentStore.put(s3.getId(), s3);
    }

    // Get all students
    public List<Student> getAllStudents() {
        return new ArrayList<>(studentStore.values());
    }

    // Get student by ID
    public Optional<Student> getStudentById(Long id) {
        return Optional.ofNullable(studentStore.get(id));
    }

    // Create new student
    public Student createStudent(Student student) {
        student.setId(idCounter.getAndIncrement());
        studentStore.put(student.getId(), student);
        return student;
    }

    // Update existing student
    public Optional<Student> updateStudent(Long id, Student updatedStudent) {
        if (!studentStore.containsKey(id)) {
            return Optional.empty();
        }
        updatedStudent.setId(id);
        studentStore.put(id, updatedStudent);
        return Optional.of(updatedStudent);
    }

    // Delete student
    public boolean deleteStudent(Long id) {
        return studentStore.remove(id) != null;
    }

    // Search by name
    public List<Student> searchByName(String name) {
        List<Student> result = new ArrayList<>();
        for (Student s : studentStore.values()) {
            if (s.getName().toLowerCase().contains(name.toLowerCase())) {
                result.add(s);
            }
        }
        return result;
    }
}
```

#### 3. Student Controller (REST Endpoints)
```java
package com.example.demo.controller;

import com.example.demo.model.Student;
import com.example.demo.service.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/students")  // All endpoints in this class start with /students
public class StudentController {

    private final StudentService studentService;

    // Constructor injection — Spring injects StudentService automatically
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // ===== GET ALL STUDENTS =====
    // URL: GET /students
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);  // 200 OK
    }

    // ===== GET STUDENT BY ID =====
    // URL: GET /students/1
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Optional<Student> student = studentService.getStudentById(id);
        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());  // 200 OK
        } else {
            return ResponseEntity.notFound().build();  // 404 Not Found
        }
    }

    // ===== CREATE NEW STUDENT =====
    // URL: POST /students
    // Body: {"name": "John", "email": "john@example.com", "age": 21}
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student created = studentService.createStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);  // 201 Created
    }

    // ===== UPDATE STUDENT =====
    // URL: PUT /students/1
    // Body: {"name": "John Updated", "email": "john@example.com", "age": 22}
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id,
                                                  @RequestBody Student student) {
        Optional<Student> updated = studentService.updateStudent(id, student);
        if (updated.isPresent()) {
            return ResponseEntity.ok(updated.get());  // 200 OK
        } else {
            return ResponseEntity.notFound().build();  // 404 Not Found
        }
    }

    // ===== DELETE STUDENT =====
    // URL: DELETE /students/1
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        boolean deleted = studentService.deleteStudent(id);
        if (deleted) {
            return ResponseEntity.noContent().build();  // 204 No Content
        } else {
            return ResponseEntity.notFound().build();  // 404 Not Found
        }
    }

    // ===== SEARCH BY NAME =====
    // URL: GET /students/search?name=Alice
    @GetMapping("/search")
    public ResponseEntity<List<Student>> searchStudents(@RequestParam String name) {
        List<Student> results = studentService.searchByName(name);
        return ResponseEntity.ok(results);  // 200 OK
    }
}
```

#### 4. Main Application Class
```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

---

### Testing with curl

```bash
# GET all students
curl http://localhost:8080/students

# GET student by ID
curl http://localhost:8080/students/1

# POST — create new student
curl -X POST http://localhost:8080/students \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","age":21}'

# PUT — update student with ID 1
curl -X PUT http://localhost:8080/students/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Updated","email":"alice@new.com","age":21}'

# DELETE — delete student with ID 2
curl -X DELETE http://localhost:8080/students/2

# GET — search by name
curl "http://localhost:8080/students/search?name=Alice"
```

### Sample Responses

**GET /students** response:
```json
[
  {"id": 1, "name": "Alice Johnson", "email": "alice@example.com", "age": 20},
  {"id": 2, "name": "Bob Smith", "email": "bob@example.com", "age": 22},
  {"id": 3, "name": "Carol White", "email": "carol@example.com", "age": 19}
]
```

**POST /students** response (201 Created):
```json
{"id": 4, "name": "John Doe", "email": "john@example.com", "age": 21}
```

**GET /students/99** response (404 Not Found):
```
(empty body with 404 status)
```

---

### Testing with Postman

1. Download Postman from [postman.com](https://postman.com)
2. Create a new request
3. Set method (GET/POST/PUT/DELETE) and URL
4. For POST/PUT: Click Body → raw → JSON → paste your JSON
5. Click Send
6. View response in the bottom panel

---

## Common Mistakes

- ❌ **Mistake**: Returning plain Java objects when using `@Controller` (not `@RestController`) → ✅ **Fix**: Use `@RestController` for REST APIs, or add `@ResponseBody` to each method
- ❌ **Mistake**: Forgetting `Content-Type: application/json` header in POST requests → ✅ **Fix**: Always include `Content-Type: application/json` when sending JSON body
- ❌ **Mistake**: Using `@RequestParam` when you should use `@PathVariable` and vice versa → ✅ **Fix**: Use `@PathVariable` for `/students/{id}` (part of URL path), `@RequestParam` for `/students?name=Alice` (query string)
- ❌ **Mistake**: Always returning 200 OK regardless of what happened → ✅ **Fix**: Return correct HTTP status codes — 201 for creation, 204 for deletion, 404 when not found
- ❌ **Mistake**: Putting all logic inside the controller → ✅ **Fix**: Move business logic to a `@Service` class; keep controllers thin

---

## Best Practices

- Follow REST URL naming conventions: nouns, plural, lowercase (`/students` not `/getStudents`)
- Always use `ResponseEntity<T>` for full control over HTTP status codes and headers
- Separate concerns: Controller → Service → Repository (3-layer architecture)
- Validate request data using `@Valid` and Bean Validation (`@NotNull`, `@Email`, etc.)
- Return meaningful error messages (create a proper error response body)
- Use `@RequestMapping` at class level to define the base path

---

## Interview Questions

**Q: What is the difference between `@Controller` and `@RestController`?**  
A: `@Controller` is used in Spring MVC for traditional web apps — methods return view names (like HTML templates). `@RestController` = `@Controller` + `@ResponseBody`, meaning every method's return value is serialized directly into the HTTP response body as JSON/XML. For REST APIs, always use `@RestController`.

**Q: What is the difference between `@PathVariable` and `@RequestParam`?**  
A: `@PathVariable` extracts values from the URL path itself (e.g., `/students/{id}` where `/students/42` gives `id=42`). `@RequestParam` extracts values from the query string (e.g., `/students?name=Alice` gives `name="Alice"`). Path variables are used for resource identifiers; query params for filtering/sorting.

**Q: What HTTP status code should a POST endpoint return when a resource is successfully created?**  
A: 201 Created (not 200 OK). Use `ResponseEntity.status(HttpStatus.CREATED).body(createdObject)`. 200 OK means the request succeeded but does not specifically indicate creation.

**Q: What does `@RequestBody` do?**  
A: It tells Spring to read the HTTP request body and deserialize it into a Java object. Spring uses Jackson (included with `spring-boot-starter-web`) to convert JSON to the Java type specified in the parameter. For example, `@RequestBody Student student` reads the JSON body and maps it to a `Student` object.

**Q: What is `ResponseEntity` and why use it?**  
A: `ResponseEntity<T>` is a wrapper around your response that lets you control the HTTP status code, headers, and body. Without it, Spring returns 200 OK for everything. With it, you can return `ResponseEntity.notFound().build()` for 404 or `ResponseEntity.status(HttpStatus.CREATED).body(obj)` for 201.

---

## Quick Revision

✔ REST = Resources accessed via URLs + HTTP methods (GET, POST, PUT, DELETE)  
✔ `@RestController` = `@Controller` + `@ResponseBody` → returns JSON  
✔ `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping` map HTTP methods  
✔ `@PathVariable` → extracts from URL path (`/students/{id}`)  
✔ `@RequestBody` → reads JSON from request body → Java object  
✔ `@RequestParam` → reads query parameters (`?name=Alice`)  
✔ Use `ResponseEntity` to control HTTP status codes (200, 201, 204, 404)  

---

## Related Topics

- Spring Data JPA (persisting data to a real database)
- Spring Security (protecting your REST endpoints)
- Bean Validation with `@Valid`
- Exception Handling with `@ExceptionHandler`

---

## Next Lesson

**Lesson 4 — Spring Data JPA**
