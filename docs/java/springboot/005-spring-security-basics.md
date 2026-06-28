---
id: spring-security-basics
title: Spring Security Basics
description: Learn authentication vs authorization, Spring Security auto-configuration, SecurityFilterChain, Basic Auth, @PreAuthorize, CORS, and JWT concepts.
sidebar_position: 5
keywords:
  - Java
  - Spring Security
  - Authentication
  - Authorization
  - JWT
  - Basic Auth
  - CORS
---

# Spring Security Basics

> **Reading Time:** 18 Minutes  
> **Difficulty:** Intermediate

---

## Topic Summary

Security is not optional — any real-world API needs to control who can access it and what they can do. Spring Security is the most powerful and widely used security framework for Java applications. It handles authentication (who are you?) and authorization (what are you allowed to do?) with a highly configurable filter chain. In this lesson you'll learn how to protect your REST API endpoints.

---

## What You'll Learn

- The difference between authentication and authorization
- How Spring Security auto-configures your app by default
- What the Security Filter Chain is
- How to configure HTTP Basic Authentication
- How to restrict endpoints by role using `@PreAuthorize`
- What CORS is and how to configure it
- What JWT (JSON Web Token) is at a high level

---

## Prerequisites

- Spring Boot Introduction
- REST API with Spring Boot
- Basic understanding of HTTP (headers, requests, responses)

---

## Explanation

### Authentication vs Authorization

These two terms are often confused — they are completely different:

| | Authentication | Authorization |
|---|---|---|
| **Question** | WHO are you? | WHAT can you do? |
| **Example** | Username + Password login | Can you access `/admin`? |
| **Happens** | First | After authentication |
| **Result** | You are identified | You are permitted (or denied) |
| **Spring** | `UserDetailsService`, login forms | `@PreAuthorize`, `hasRole()` |

**Analogy:** At a concert:
- **Authentication** = Showing your ticket at the gate (proves you're a valid ticket holder)
- **Authorization** = Your VIP pass that lets you into backstage (specific permissions)

---

### How Spring Security Works (The Filter Chain)

Spring Security intercepts **every HTTP request** through a chain of filters — this is called the **Security Filter Chain**. Each filter does one job:

```
Incoming Request
       ↓
[Filter 1: UsernamePasswordAuthenticationFilter]  ← Checks login credentials
       ↓
[Filter 2: BasicAuthenticationFilter]             ← Handles Basic Auth header
       ↓
[Filter 3: JwtAuthenticationFilter]               ← Handles JWT tokens (custom)
       ↓
[Filter 4: ExceptionTranslationFilter]            ← Handles auth errors
       ↓
[Filter 5: FilterSecurityInterceptor]             ← Checks authorization (roles)
       ↓
Your Controller
```

When you add `spring-boot-starter-security` to your project, Spring Security auto-configures:
1. All endpoints require authentication (login)
2. A login form is generated at `/login`
3. A default user is created: username = `user`, password = (printed in console on startup)
4. HTTP Basic Auth is enabled
5. CSRF protection is enabled

---

### Default Security Behavior

When you add Spring Security, this happens automatically:
```
Using generated security password: 3f5c89a1-3c8e-4d22-b3e4-8da3e1b2c123
```
Every request to your API returns 401 Unauthorized unless you authenticate.

---

### Configuring Spring Security — `SecurityFilterChain`

In modern Spring Boot (3.x), you configure security by creating a `SecurityFilterChain` bean:

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity  // Enables @PreAuthorize on methods
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Configure which endpoints require authentication
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()          // Anyone can access
                .requestMatchers("/api/admin/**").hasRole("ADMIN")  // Only ADMIN
                .requestMatchers("/api/students/**").hasAnyRole("USER", "ADMIN") // USER or ADMIN
                .anyRequest().authenticated()                        // Everything else requires login
            )
            // Enable HTTP Basic Authentication
            .httpBasic(Customizer.withDefaults())
            // Disable CSRF (needed for REST APIs — stateless)
            .csrf(csrf -> csrf.disable());

        return http.build();
    }
}
```

---

### Defining Users (In-Memory for Testing)

For testing/development, you can define users in memory:

```java
@Bean
public UserDetailsService userDetailsService() {
    // Create users with roles
    UserDetails adminUser = User.builder()
        .username("admin")
        .password(passwordEncoder().encode("admin123"))
        .roles("ADMIN", "USER")
        .build();

    UserDetails regularUser = User.builder()
        .username("john")
        .password(passwordEncoder().encode("john123"))
        .roles("USER")
        .build();

    return new InMemoryUserDetailsManager(adminUser, regularUser);
}

@Bean
public PasswordEncoder passwordEncoder() {
    // BCrypt is the standard password hashing algorithm
    return new BCryptPasswordEncoder();
}
```

**Important:** Never store passwords in plain text! Always hash with `BCryptPasswordEncoder`.

---

### HTTP Basic Authentication

With Basic Auth, the client sends credentials in every request as a Base64-encoded header:

```
Authorization: Basic dXNlcjpwYXNzd29yZA==
```
(This decodes to `user:password`)

**Test with curl:**
```bash
curl -u admin:admin123 http://localhost:8080/api/students
```

**Test with Postman:**
- Authorization tab → Type: Basic Auth → Enter username + password

Basic Auth is simple but sends credentials with every request. For production, use JWT.

---

### Method-Level Security with `@PreAuthorize`

Instead of only protecting URLs, you can protect individual methods:

```java
@RestController
@RequestMapping("/api/students")
public class StudentController {

    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")  // Both roles can read
    public List<Student> getAll() { ... }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")  // Only ADMIN can create
    public Student create(@RequestBody Student student) { ... }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")  // Only ADMIN can delete
    public void delete(@PathVariable Long id) { ... }
}
```

You must enable this with `@EnableMethodSecurity` on your config class.

---

### CORS (Cross-Origin Resource Sharing)

**CORS** is a browser security mechanism. By default, a web page at `http://localhost:3000` (React frontend) **cannot** call an API at `http://localhost:8080` (Spring Boot backend) — browsers block cross-origin requests.

Configure CORS in Spring Security:

```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .anyRequest().authenticated()
        );
    return http.build();
}

@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));  // Your frontend URL
    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(Arrays.asList("*"));
    config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
}
```

Or use `@CrossOrigin` on individual controllers:
```java
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class StudentController { ... }
```

---

### JWT — JSON Web Token (High-Level Introduction)

**JWT** is the modern standard for securing REST APIs. Instead of sending username+password with every request (Basic Auth), the client:

1. **Logs in** once (POST `/auth/login` with username+password)
2. **Server** verifies credentials and returns a **JWT token**
3. **Client** stores the token and sends it with every subsequent request in the `Authorization` header:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. **Server** validates the token on each request (no database lookup needed!)

**JWT Structure** — a JWT has three Base64-encoded parts separated by dots:
```
eyJhbGciOiJIUzI1NiJ9         ← Header (algorithm)
.
eyJzdWIiOiJqb2huIiwicm9sZXMiOlsiVVNFUiJdfQ==  ← Payload (user data)
.
SflKxwRJSMeKKF2QT4fwpMeJf36P    ← Signature (verifies authenticity)
```

**Why JWT is better than Basic Auth for REST APIs:**
- Stateless — server doesn't store session data
- Self-contained — token has user info (roles, expiry) inside it
- Scalable — works great for microservices
- Secure — signature prevents tampering

---

## Real-World Analogy

Think of Spring Security as the **security system of a bank building:**

- **Authentication** = You show your employee ID card at the entrance (the system verifies you are who you say you are)
- **Security Filter Chain** = Multiple security checkpoints you pass through before reaching your desk
- **Authorization** = Your ID badge determines which rooms you can enter (only bank managers can enter the vault)
- **CORS** = The rule that says visitors from outside the building need special visitor badges (cross-origin requests need permission)
- **JWT** = A temporary pass card given to you each morning (valid for 8 hours), so you don't have to prove your identity at every single door

---

## Code Example

### Complete Spring Security Configuration

```java
package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // CORS configuration
            .cors(Customizer.withDefaults())

            // Disable CSRF (REST APIs are stateless — no CSRF needed)
            .csrf(csrf -> csrf.disable())

            // URL-based authorization
            .authorizeHttpRequests(auth -> auth
                // Public endpoints — no login needed
                .requestMatchers("/api/public/**", "/health").permitAll()
                // Admin-only endpoints
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                // Student endpoints — any authenticated user
                .requestMatchers("/api/students/**").hasAnyRole("USER", "ADMIN")
                // Everything else requires authentication
                .anyRequest().authenticated()
            )

            // HTTP Basic Auth for simplicity
            .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails admin = User.builder()
            .username("admin")
            .password(passwordEncoder().encode("admin123"))
            .roles("ADMIN", "USER")
            .build();

        UserDetails user = User.builder()
            .username("john")
            .password(passwordEncoder().encode("john123"))
            .roles("USER")
            .build();

        System.out.println("Users configured: admin (ADMIN+USER), john (USER)");
        return new InMemoryUserDetailsManager(admin, user);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

### Protected Controller with `@PreAuthorize`

```java
package com.example.demo.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DemoController {

    // Public endpoint — anyone can access (no auth needed)
    @GetMapping("/public/hello")
    public String publicHello() {
        return "This is public — no login needed!";
    }

    // Authenticated users only
    @GetMapping("/students")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<Map<String, Object>> getStudents() {
        // Get info about the logged-in user
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        System.out.println("Request by: " + username);

        return List.of(
            Map.of("id", 1, "name", "Alice"),
            Map.of("id", 2, "name", "Bob")
        );
    }

    // Admin only — normal users get 403 Forbidden
    @DeleteMapping("/students/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteStudent(@PathVariable Long id) {
        return "Student " + id + " deleted by ADMIN";
    }

    // Admin dashboard
    @GetMapping("/admin/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminDashboard() {
        return "Welcome to the Admin Dashboard!";
    }

    // Show current user's info
    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public Map<String, Object> currentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return Map.of(
            "username", auth.getName(),
            "roles", auth.getAuthorities().toString()
        );
    }
}
```

### Test Outputs

```bash
# Public endpoint — works without credentials
curl http://localhost:8080/api/public/hello
# Response: This is public — no login needed!

# Without credentials — 401 Unauthorized
curl http://localhost:8080/api/students
# Response: {"status":401,"error":"Unauthorized"}

# With USER credentials — 200 OK
curl -u john:john123 http://localhost:8080/api/students
# Response: [{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]

# USER tries admin action — 403 Forbidden
curl -u john:john123 -X DELETE http://localhost:8080/api/students/1
# Response: {"status":403,"error":"Forbidden"}

# ADMIN can do everything
curl -u admin:admin123 -X DELETE http://localhost:8080/api/students/1
# Response: Student 1 deleted by ADMIN

# Get current user info
curl -u john:john123 http://localhost:8080/api/me
# Response: {"username":"john","roles":"[ROLE_USER]"}
```

---

## Common Mistakes

- ❌ **Mistake**: Using plain-text passwords → ✅ **Fix**: Always use `BCryptPasswordEncoder` — never store plain passwords
- ❌ **Mistake**: Keeping CSRF enabled for REST APIs → ✅ **Fix**: Disable CSRF for stateless REST APIs — CSRF protection is for browser-based form submissions
- ❌ **Mistake**: Forgetting `@EnableMethodSecurity` → ✅ **Fix**: Add it to your config class or `@PreAuthorize` annotations will be silently ignored
- ❌ **Mistake**: Roles with and without "ROLE_" prefix confusion → ✅ **Fix**: When using `hasRole("ADMIN")`, Spring automatically adds `ROLE_` prefix. Store roles as `ROLE_ADMIN` in DB but check with `hasRole("ADMIN")`
- ❌ **Mistake**: Not disabling CORS for local development → ✅ **Fix**: Configure CORS explicitly when your frontend is on a different port

---

## Best Practices

- Always hash passwords with `BCryptPasswordEncoder` — never MD5 or SHA1
- Use JWT for stateless REST API authentication in production
- Keep `permitAll()` endpoints to the minimum necessary
- Use method-level security (`@PreAuthorize`) for fine-grained control
- Never commit credentials to source code — use environment variables
- Test your security configuration with unit tests using `@WithMockUser`

---

## Interview Questions

**Q: What is the difference between authentication and authorization?**  
A: Authentication verifies WHO you are (e.g., login with username/password). Authorization determines WHAT you're allowed to do after you've been authenticated (e.g., can this user access the admin panel?). Authentication always happens first.

**Q: What is a Security Filter Chain in Spring Security?**  
A: The Security Filter Chain is a series of servlet filters that every HTTP request passes through before reaching your controller. Each filter handles one security concern — authentication, authorization, CSRF protection, etc. In Spring Boot 3.x, you configure it by creating a `SecurityFilterChain` bean.

**Q: What is CSRF and why is it disabled for REST APIs?**  
A: CSRF (Cross-Site Request Forgery) is an attack where a malicious site tricks an authenticated user's browser into making unauthorized requests. Spring Security adds CSRF tokens by default to protect browser-based form submissions. For stateless REST APIs, CSRF is not needed because: (1) REST clients (mobile, Postman) don't use browser cookies, (2) JWT/token-based auth is inherently CSRF-safe.

**Q: What is JWT and how does it work?**  
A: JWT (JSON Web Token) is a compact, self-contained token for securely transmitting information. It has three Base64-encoded parts: Header (algorithm), Payload (user data, roles, expiry), and Signature (verifies the token wasn't tampered with). The client gets a JWT on login and sends it in the `Authorization: Bearer <token>` header with each request. The server validates the signature without needing a database lookup.

**Q: What does `@PreAuthorize("hasRole('ADMIN')")` do?**  
A: It's a method-level security annotation that restricts access to the annotated method to users with the ADMIN role. If a user without this role calls the endpoint, Spring Security returns 403 Forbidden before the method is even executed. It requires `@EnableMethodSecurity` to be active.

---

## Quick Revision

✔ Authentication = WHO are you? (identity check) | Authorization = WHAT can you do? (permissions)  
✔ Spring Security uses a Filter Chain — every request passes through multiple security filters  
✔ `SecurityFilterChain` bean is where you configure URL rules and auth methods  
✔ Basic Auth = username:password in every request header (simple but limited)  
✔ `@PreAuthorize("hasRole('ADMIN')")` = method-level authorization  
✔ CORS = browser security; must configure explicitly for cross-origin frontend requests  
✔ JWT = stateless, self-contained token — the modern standard for REST API security  

---

## Related Topics

- Spring Boot REST API
- Spring Data JPA
- Microservices with Spring Cloud
- OAuth2 and SSO

---

## Next Lesson

**Lesson 6 — Introduction to Microservices**
