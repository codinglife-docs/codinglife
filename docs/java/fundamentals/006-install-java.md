---
id: install-java
title: Installing Java (JDK 21)
description: Step-by-step guide to install Java JDK 21 on Windows, verify the installation, and set up VS Code or IntelliJ IDEA for Java development.
sidebar_position: 6
keywords:
  - Java
  - Install Java
  - JDK 21
  - Java Setup Windows
  - VS Code Java
  - IntelliJ IDEA
---

# Installing Java (JDK 21)

> **Reading Time:** 8 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

Before you write a single line of Java, you need to install the JDK (Java Development Kit) on your computer. This lesson walks you through installing JDK 21 (the latest LTS version) on Windows, setting the PATH environment variable, and choosing an editor — VS Code or IntelliJ IDEA.

---

## What You'll Learn

- How to download and install JDK 21 on Windows
- What the JAVA_HOME environment variable is
- How to verify Java is installed correctly with `java -version`
- How to set up VS Code with Java extensions
- How to set up IntelliJ IDEA Community Edition

---

## Prerequisites

- Lesson 004 — JDK vs JRE vs JVM (understand what JDK is)
- A Windows computer with internet access
- Basic knowledge of navigating Windows (Control Panel, Environment Variables)

---

## Explanation

### Why JDK 21?

Java 21 is the latest **LTS (Long-Term Support)** version released in September 2023. LTS means:
- Security updates for years to come
- Stable, production-ready
- Supported by all major frameworks (Spring Boot, Quarkus, etc.)

Always use an LTS version for learning and projects.

---

### Step 1: Download JDK 21

You have two options — both are free:

#### Option A: Oracle JDK 21 (Recommended for beginners)
1. Go to: **https://www.oracle.com/java/technologies/downloads/**
2. Click on **Java 21**
3. Under the **Windows** tab, download the **x64 Installer** (`.exe` file)
4. File will be named something like: `jdk-21_windows-x64_bin.exe`

#### Option B: OpenJDK 21 (100% open source)
1. Go to: **https://adoptium.net/** (Eclipse Temurin — trusted OpenJDK build)
2. Select: **Temurin 21 (LTS)**
3. Choose: **Windows x64 JDK**
4. Download the `.msi` installer

> **Tip**: For learning, both work identically. OpenJDK/Adoptium is what most developers use professionally.

---

### Step 2: Install JDK 21

1. **Run the installer** (double-click the `.exe` or `.msi` file)
2. Click **Next** through the installation wizard
3. Note the installation path — usually: `C:\Program Files\Java\jdk-21` or `C:\Program Files\Eclipse Adoptium\jdk-21.x.x.x-hotspot`
4. Click **Install**
5. Click **Finish** when done

---

### Step 3: Set JAVA_HOME Environment Variable

This tells Windows (and other tools like Maven, Gradle, IDEs) where Java is installed.

#### Method: Using Windows Settings

1. Press **Windows key + S**, search for **"Environment Variables"**
2. Click **"Edit the system environment variables"**
3. Click the **"Environment Variables..."** button
4. Under **"System Variables"**, click **New**:
   - Variable name: `JAVA_HOME`
   - Variable value: `C:\Program Files\Java\jdk-21` *(your actual install path)*
5. Click **OK**

#### Add Java to PATH

1. In the same Environment Variables window, find **Path** under System Variables
2. Click **Edit** → **New**
3. Add: `%JAVA_HOME%\bin`
4. Click **OK** → **OK** → **OK** to close all windows

---

### Step 4: Verify Installation

Open a **new** Command Prompt or PowerShell window (important — reopen it to load new environment variables):

```bash
# Check Java version
java -version

# Check compiler version
javac -version

# Check JAVA_HOME
echo %JAVA_HOME%
```

#### Expected Output:
```
java version "21.0.1" 2023-10-17 LTS
Java(TM) SE Runtime Environment (build 21.0.1+12-LTS-29)
Java HotSpot(TM) 64-Bit Server VM (build 21.0.1+12-LTS-29, mixed mode, sharing)

javac 21.0.1

C:\Program Files\Java\jdk-21
```

If you see the version numbers — **Java is installed! 🎉**

---

### Step 5: Choose Your Code Editor/IDE

You have two great free options:

---

#### Option A: VS Code + Extension Pack for Java ⭐ (Recommended for beginners)

**Why VS Code?**
- Free and lightweight
- Works for all programming languages
- Great Java support with Microsoft's extension pack

**Installation:**
1. Download VS Code: **https://code.visualstudio.com/**
2. Install VS Code
3. Open VS Code
4. Press `Ctrl + Shift + X` to open Extensions
5. Search for: **"Extension Pack for Java"** (by Microsoft)
6. Click **Install**

This installs 6 extensions:
- Language Support for Java (by Red Hat)
- Debugger for Java
- Test Runner for Java
- Maven for Java
- Project Manager for Java
- IntelliCode

**Create and run your first Java file in VS Code:**
1. Create a folder: `C:\JavaProjects`
2. Open VS Code → File → Open Folder → select `C:\JavaProjects`
3. Create file: `HelloWorld.java`
4. Write your code
5. Click the **▶ Run** button (top right) — VS Code compiles and runs automatically!

---

#### Option B: IntelliJ IDEA Community Edition (Recommended when you're more comfortable)

**Why IntelliJ?**
- The most popular Java IDE in the industry
- Community Edition is completely FREE
- Smart code completion, refactoring, debugging

**Installation:**
1. Go to: **https://www.jetbrains.com/idea/download/**
2. Download **Community** edition (NOT Ultimate — that's paid)
3. Run the installer
4. Open IntelliJ IDEA
5. Click **"New Project"**
6. Select **Java** on the left
7. Under SDK, select your installed JDK 21
8. Click **Next** → **Finish**

---

### Comparison: VS Code vs IntelliJ

| Feature | VS Code | IntelliJ IDEA Community |
|---------|---------|------------------------|
| **Price** | Free | Free |
| **Weight** | Lightweight (~80 MB) | Heavy (~600 MB) |
| **Languages** | All languages | Mainly Java/JVM |
| **Java Support** | Good (with extensions) | Excellent (built-in) |
| **Beginner friendly** | ✅ Yes | Moderate |
| **Industry use** | Very common | Most common for Java |
| **Recommended for** | Beginners | Intermediate+ |

> **Recommendation**: Start with **VS Code** while learning the basics. Move to **IntelliJ** when you start building real projects.

---

## Real-World Analogy

Installing Java is like setting up a **workshop**:

- **JDK** = Your complete tool set (hammer, screwdriver, drill)
- **JAVA_HOME** = Telling everyone where the toolbox is stored
- **PATH** = Like labeling the hallway so anyone can find the toolbox quickly
- **VS Code / IntelliJ** = Your workbench where you actually build things

Without knowing where the tools are (JAVA_HOME & PATH), nothing can use them!

---

## Code Example

Once installed, open your terminal, navigate to a folder, and try this:

```bash
# In PowerShell or Command Prompt

# 1. Create a test file
# Open Notepad, write the code below, save as HelloWorld.java

# 2. Compile it
javac HelloWorld.java

# 3. Run it
java HelloWorld
```

```java
// HelloWorld.java — Your very first Java program!
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Java is installed and working!");
        System.out.println("Java version: " + System.getProperty("java.version"));
    }
}
```

### Output
```
Java is installed and working!
Java version: 21.0.1
```

---

## Common Mistakes

- ❌ **Mistake**: `java` command not found after installing → ✅ **Fix**: Close and reopen the terminal. If still not working, check PATH has `%JAVA_HOME%\bin`.
- ❌ **Mistake**: Multiple Java versions causing conflicts → ✅ **Fix**: Check `java -version`. If wrong version shows, update JAVA_HOME and PATH to point to JDK 21.
- ❌ **Mistake**: Downloading JRE instead of JDK → ✅ **Fix**: Always download **JDK** (has javac compiler). JRE alone can't compile.
- ❌ **Mistake**: File saved as `HelloWorld.java.txt` in Notepad → ✅ **Fix**: In Notepad's "Save As" dialog, change "Save as type" to "All Files (*.*)" and name it `HelloWorld.java`.

---

## Best Practices

- Always install the latest **LTS version** of JDK (currently 21)
- Set **JAVA_HOME** properly — many tools depend on it
- Use VS Code or IntelliJ — avoid writing Java in Notepad for real projects
- If you work on multiple projects needing different Java versions, use **SDKMAN** (Linux/Mac) or **jEnv** to manage multiple JDK versions

---

## Interview Questions

**Q: What is JAVA_HOME and why is it needed?**  
A: `JAVA_HOME` is an environment variable that points to the JDK installation directory. Many Java tools, IDEs, and build systems (Maven, Gradle) use `JAVA_HOME` to find the JDK they need to compile and run Java programs.

**Q: What is the difference between the java and javac commands?**  
A: `javac` is the **Java compiler** — it compiles `.java` source files into `.class` bytecode files. `java` is the **Java launcher** — it starts the JVM and runs the compiled `.class` file.

**Q: Why should I use JDK 21 instead of JDK 8?**  
A: JDK 21 is the latest LTS version with modern features (virtual threads, records, pattern matching), better performance, and active security support. JDK 8 is old (2014) and while still maintained, lacks modern improvements.

---

## Quick Revision

✔ Download JDK 21 from **oracle.com** or **adoptium.net**  
✔ Set `JAVA_HOME` to JDK installation path  
✔ Add `%JAVA_HOME%\bin` to system **PATH**  
✔ Verify: `java -version` and `javac -version`  
✔ Use **VS Code + Extension Pack for Java** (beginners) or **IntelliJ IDEA Community** (intermediate)  

---

## Related Topics

- JDK vs JRE vs JVM (Lesson 004)
- Java Program Execution (Lesson 005)
- Your First Java Program (Lesson 007)

---

## Next Lesson

**Lesson 007 — Your First Java Program**
