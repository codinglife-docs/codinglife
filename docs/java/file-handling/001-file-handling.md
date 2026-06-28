---
id: file-handling
title: File Handling in Java
description: Learn to read and write files in Java using File, FileWriter, FileReader, BufferedWriter, BufferedReader, and try-with-resources.
sidebar_position: 1
keywords:
  - Java
  - file handling
  - FileWriter
  - FileReader
  - BufferedWriter
  - BufferedReader
  - File class
---

# File Handling in Java

> **Reading Time:** 12 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

File handling in Java allows programs to **read from** and **write to** files on your computer's storage. Java provides a set of classes in the `java.io` package — `File`, `FileWriter`, `FileReader`, `BufferedWriter`, and `BufferedReader` — to work with files efficiently. Using `try-with-resources` ensures files are automatically closed after use.

---

## What You'll Learn

- How to use the `File` class to check, create, and delete files
- How to write text to a file using `FileWriter` and `BufferedWriter`
- How to read text from a file using `FileReader` and `BufferedReader`
- Why `Buffered` versions are faster
- How `try-with-resources` prevents resource leaks

---

## Prerequisites

- Custom Exceptions and try-with-resources (Lesson 02)
- Basic Java syntax and loops

---

## Explanation

### The `File` Class — Working with File Metadata

The `File` class in `java.io` represents a **file or directory path** on your system. It does NOT read or write content — it gives you information about the file and lets you perform operations like:

- Check if a file/directory exists
- Create a new empty file
- Delete a file
- Get the file name, size, path
- List files in a directory

**Important:** Creating a `File` object does NOT create a file on disk. You must call `createNewFile()` explicitly.

---

### Writing to Files

#### FileWriter — Basic Writing

`FileWriter` writes text to a file character by character. It creates the file if it doesn't exist and overwrites it by default.

```java
FileWriter writer = new FileWriter("output.txt");
writer.write("Hello, File!");
writer.close(); // IMPORTANT — always close!
```

To **append** (add to existing content instead of overwriting):
```java
FileWriter writer = new FileWriter("output.txt", true); // true = append mode
```

#### BufferedWriter — Faster Writing

`BufferedWriter` wraps around `FileWriter` and adds an **internal buffer** (a temporary memory block). Instead of writing one character at a time to disk (slow), it collects many characters in memory and writes them all at once (fast).

```java
BufferedWriter bw = new BufferedWriter(new FileWriter("output.txt"));
bw.write("Line 1");
bw.newLine();  // Adds OS-appropriate line separator
bw.write("Line 2");
bw.close();
```

`bw.newLine()` is preferred over `\n` because it uses the correct line ending for the operating system (`\r\n` on Windows, `\n` on Unix).

---

### Reading from Files

#### FileReader — Basic Reading

`FileReader` reads characters from a file, one at a time. This works but is slow for large files.

```java
FileReader reader = new FileReader("output.txt");
int character;
while ((character = reader.read()) != -1) {
    System.out.print((char) character);
}
reader.close();
```

`reader.read()` returns `-1` when the end of the file is reached.

#### BufferedReader — Reading Line by Line (Recommended)

`BufferedReader` wraps around `FileReader` and reads larger chunks into a buffer. The key method is `readLine()` which reads an entire line at once.

```java
BufferedReader br = new BufferedReader(new FileReader("output.txt"));
String line;
while ((line = br.readLine()) != null) {
    System.out.println(line);
}
br.close();
```

`readLine()` returns `null` when the end of file is reached.

---

### Why Use Buffered Versions?

Disk I/O (reading/writing to hard drives/SSDs) is **100x to 1000x slower** than reading from RAM. Without buffering:
- Each `write()` call goes directly to disk = slow
- Each `read()` call reads one character from disk = very slow

With buffering:
- `BufferedWriter` collects writes in a 8192-character buffer, then flushes to disk in one go
- `BufferedReader` reads 8192 characters at once into memory, serves them from there

**Always prefer Buffered versions for any file larger than a few bytes.**

---

### try-with-resources — Automatic File Closing

Both `FileWriter`, `FileReader`, `BufferedWriter`, and `BufferedReader` implement `AutoCloseable`. Using them inside `try-with-resources` guarantees they are closed automatically — even if an exception occurs:

```java
try (BufferedWriter bw = new BufferedWriter(new FileWriter("output.txt"))) {
    bw.write("Auto-closed when done!");
}
// bw.close() called automatically here
```

Forgetting to close a file causes:
- **Data loss** — buffered content may not be flushed to disk
- **Resource leaks** — the file stays locked/open
- **FileNotFoundException** — other code cannot access a locked file

---

### Key File Class Operations

| Method | Purpose |
|---|---|
| `file.exists()` | Check if file/directory exists |
| `file.createNewFile()` | Create empty file; returns false if already exists |
| `file.delete()` | Delete the file; returns true/false |
| `file.getName()` | Get filename only |
| `file.getAbsolutePath()` | Get full path |
| `file.length()` | Get file size in bytes |
| `file.isFile()` | Returns true if it's a file (not a directory) |
| `file.isDirectory()` | Returns true if it's a directory |
| `file.mkdir()` | Create a directory |
| `file.listFiles()` | List files inside a directory |

---

## Real-World Analogy

Think of file handling like a post office:

- **`File`** class = The **envelope** — it has the address and information, but doesn't carry content yet
- **`FileWriter` / `FileReader`** = A person **hand-delivering** each letter one by one (slow)
- **`BufferedWriter` / `BufferedReader`** = A **delivery van** that collects many letters and delivers them all at once (fast and efficient)
- **`try-with-resources`** = The post office's policy of automatically **locking the mailbox** when the delivery is done, so nothing leaks out

---

## Code Example

### Example 1: File Class — Check, Create, Delete

```java
import java.io.File;
import java.io.IOException;

public class FileClassDemo {
    public static void main(String[] args) throws IOException {

        // Create a File object (doesn't create file on disk yet)
        File file = new File("mydata.txt");

        // Check if it exists
        System.out.println("Exists before: " + file.exists());  // false

        // Create the file on disk
        boolean created = file.createNewFile();
        System.out.println("File created: " + created);         // true

        System.out.println("Exists after: " + file.exists());   // true
        System.out.println("File name: " + file.getName());     // mydata.txt
        System.out.println("Absolute path: " + file.getAbsolutePath());
        System.out.println("File size: " + file.length() + " bytes"); // 0

        // Delete the file
        boolean deleted = file.delete();
        System.out.println("File deleted: " + deleted);         // true
        System.out.println("Exists after delete: " + file.exists()); // false
    }
}
```

### Output
```
Exists before: false
File created: true
Exists after: true
File name: mydata.txt
Absolute path: C:\Users\rahee\coding-life\mydata.txt
File size: 0 bytes
File deleted: true
Exists after delete: false
```

---

### Example 2: Writing to a File with BufferedWriter

```java
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class WriteFileDemo {
    public static void main(String[] args) {

        String filename = "students.txt";

        // try-with-resources — file closed automatically
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(filename))) {

            bw.write("Student List");
            bw.newLine();
            bw.write("============");
            bw.newLine();

            String[] students = {"Alice", "Bob", "Charlie", "Diana"};
            for (int i = 0; i < students.length; i++) {
                bw.write((i + 1) + ". " + students[i]);
                bw.newLine();
            }

            System.out.println("File written successfully: " + filename);

        } catch (IOException e) {
            System.out.println("Error writing file: " + e.getMessage());
        }

        // Appending to existing file
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(filename, true))) {
            bw.newLine();
            bw.write("Total students: 4");
            System.out.println("Appended to file successfully.");
        } catch (IOException e) {
            System.out.println("Error appending to file: " + e.getMessage());
        }
    }
}
```

### Output
```
File written successfully: students.txt
Appended to file successfully.
```
*File contents of students.txt:*
```
Student List
============
1. Alice
2. Bob
3. Charlie
4. Diana

Total students: 4
```

---

### Example 3: Reading from a File with BufferedReader

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class ReadFileDemo {
    public static void main(String[] args) {

        String filename = "students.txt";

        System.out.println("Reading file: " + filename);
        System.out.println("-------------------");

        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {

            String line;
            int lineNumber = 1;

            while ((line = br.readLine()) != null) {
                System.out.printf("Line %2d: %s%n", lineNumber, line);
                lineNumber++;
            }

        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
    }
}
```

### Output
```
Reading file: students.txt
-------------------
Line  1: Student List
Line  2: ============
Line  3: 1. Alice
Line  4: 2. Bob
Line  5: 3. Charlie
Line  6: 4. Diana
Line  7: 
Line  8: Total students: 4
```

---

### Example 4: Complete File Handling — Write Then Read

```java
import java.io.*;

public class CompleteFileDemo {
    public static void main(String[] args) throws IOException {

        String filename = "notes.txt";

        // --- WRITE ---
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(filename))) {
            bw.write("Java is awesome!");
            bw.newLine();
            bw.write("File handling is easy.");
            bw.newLine();
            bw.write("Always use try-with-resources.");
        }

        // Check file info
        File file = new File(filename);
        System.out.println("File exists: " + file.exists());
        System.out.println("File size: " + file.length() + " bytes");

        // --- READ ---
        System.out.println("\n--- File Contents ---");
        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        }

        // --- DELETE ---
        file.delete();
        System.out.println("\nFile deleted: " + !file.exists());
    }
}
```

### Output
```
File exists: true
File size: 72 bytes

--- File Contents ---
Java is awesome!
File handling is easy.
Always use try-with-resources.

File deleted: true
```

---

## Common Mistakes

- ❌ **Mistake**: Not closing the file after writing → ✅ **Fix**: Always use try-with-resources or call `close()` explicitly; unflushed data can be lost
- ❌ **Mistake**: Using `FileWriter` without `BufferedWriter` for large files → ✅ **Fix**: Always wrap with `BufferedWriter` — it's dramatically faster
- ❌ **Mistake**: Using `\n` instead of `bw.newLine()` → ✅ **Fix**: `newLine()` uses the correct line ending for the OS
- ❌ **Mistake**: Not checking `file.exists()` before reading → ✅ **Fix**: The `FileReader` will throw `FileNotFoundException` — wrap in try-catch or check first
- ❌ **Mistake**: Opening a file in write mode (overwrite) when you wanted to append → ✅ **Fix**: Use `new FileWriter(filename, true)` for append mode

---

## Best Practices

- Always use try-with-resources for file I/O — it's safer and cleaner
- Wrap `FileReader`/`FileWriter` with `BufferedReader`/`BufferedWriter` for better performance
- Use `readLine()` instead of character-by-character reading for text files
- Specify absolute file paths in production code; relative paths depend on where the program is run from
- Always handle `IOException` — file operations can fail for many reasons (permissions, disk full, file not found)

---

## Interview Questions

**Q: What is the difference between FileWriter and BufferedWriter?**  
A: `FileWriter` writes directly to disk one character at a time — this is slow for large writes. `BufferedWriter` wraps around `FileWriter` and uses an internal buffer (8192 chars by default). It collects writes in memory and flushes them to disk in chunks, making it much faster.

**Q: What happens if you forget to close a FileWriter?**  
A: The buffered data may not be flushed to disk (data loss). The file handle stays open (resource leak). Other programs might not be able to access the file. This is why try-with-resources is so important.

**Q: How do you append to an existing file instead of overwriting it?**  
A: Use the two-argument constructor of `FileWriter` with `true` as the second argument: `new FileWriter("file.txt", true)`. Without this, `FileWriter` overwrites the file's contents by default.

**Q: What is the File class used for?**  
A: The `File` class represents a file or directory path. It is used for file metadata operations — checking if a file exists, getting its size, creating or deleting files, listing directory contents, etc. It does NOT directly read or write file content.

---

## Quick Revision

✔ `File` class — represents path/metadata; use to check exists, create, delete  
✔ `FileWriter` + `BufferedWriter` — write text to a file; Buffered is faster  
✔ `FileReader` + `BufferedReader` — read text; use `readLine()` for line-by-line  
✔ `true` as second argument to `FileWriter` = append mode  
✔ Always use try-with-resources to auto-close files and prevent leaks  

---

## Related Topics

- Custom Exceptions (Lesson 02) — IOException handling
- try-with-resources and AutoCloseable
- Java NIO (java.nio) — modern alternative for file handling

---

## Next Lesson

**01 - Generics**
