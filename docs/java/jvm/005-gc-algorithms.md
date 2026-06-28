---
id: gc-algorithms
title: Garbage Collection Algorithms
description: Compare all major Java GC algorithms — Serial, Parallel, G1 GC, ZGC, and Shenandoah — and learn when to use each and how to configure them with JVM flags.
sidebar_position: 5
keywords:
  - Java
  - GC Algorithms
  - G1 GC
  - ZGC
  - Serial GC
  - Parallel GC
  - Shenandoah
  - JVM Flags
---

# Garbage Collection Algorithms

> **Reading Time:** 12 Minutes  
> **Difficulty:** Intermediate

---

## Topic Summary

Java offers several Garbage Collection algorithms, each with different trade-offs between pause time and throughput. From the simple Serial GC to the modern low-latency ZGC, each algorithm is designed for different application needs. Choosing the right GC can dramatically improve your application's performance.

---

## What You'll Learn

- The five major GC algorithms and how each works
- The key trade-off: pause time vs. throughput
- Which GC to use for different application types
- JVM flags to select and tune GC algorithms

---

## Prerequisites

- JVM Memory Areas (Lesson 3)
- Garbage Collection Basics (Lesson 4)

---

## Explanation

### The Core Trade-off: Pause Time vs Throughput

Before diving into algorithms, understand the fundamental GC trade-off:

- **Throughput**: The percentage of total time spent doing actual work (vs. GC). A GC with high throughput runs less frequently and collects larger amounts at once.
- **Pause Time (Latency)**: How long your application is paused during GC ("Stop-the-World"). Low pause time = more responsive application.

You generally cannot maximize both — you have to choose based on your application's needs.

```
Low Latency ◄────────────────────────► High Throughput
   ZGC         Shenandoah    G1     Parallel     Serial
  (<1ms)        (<10ms)    (<200ms)  (seconds)   (seconds)
```

---

### Algorithm 1: Serial GC

**Flag**: `-XX:+UseSerialGC`

The simplest GC. Uses a **single thread** for all GC operations. When GC runs, the entire application stops ("Stop-the-World" pause) until GC completes.

```
Application: ████████████▒▒▒▒▒▒▒▒▒▒▒▒████████████▒▒▒▒▒▒▒▒
GC Thread:              [═══GC═══]              [═══GC═══]
             ← working →← pause →← working →← pause →
```

**How it works**:
- Young Generation: Copying (Mark + Copy to Survivor)
- Old Generation: Mark-Sweep-Compact

**Use when**:
- Single-core machines or VMs
- Small heap sizes (< 100MB)
- Command-line tools, batch jobs where pause time doesn't matter
- Embedded systems with very limited resources

**Don't use when**: You have a multi-core server or need low latency.

---

### Algorithm 2: Parallel GC (Throughput Collector)

**Flag**: `-XX:+UseParallelGC` (default in Java 8)

Uses **multiple threads** for GC operations, significantly reducing pause time on multi-core machines. Still Stop-the-World, but because multiple threads work in parallel, pauses are shorter.

```
Thread 1:  ████████████▒▒▒████████████▒▒▒████████████
Thread 2:  ████████████▒▒▒████████████▒▒▒████████████
GC Threads:            [═GC═]          [═GC═]
                       (multiple GC threads run in parallel)
```

**How it works**:
- Young Generation: Parallel Copy (multiple threads do Minor GC)
- Old Generation: Parallel Mark-Sweep-Compact (multiple threads do Major GC)

**Use when**:
- Batch processing, data analytics, scientific computing
- Maximum throughput is more important than low pause times
- Multi-core machines where you can dedicate CPU to GC
- Applications that can tolerate occasional long pauses

**Configuration**:
```bash
-XX:+UseParallelGC
-XX:ParallelGCThreads=8     # number of GC threads
-XX:GCTimeRatio=19          # target: 95% app time, 5% GC time
-XX:MaxGCPauseMillis=200    # target max pause (best effort)
```

---

### Algorithm 3: G1 GC (Garbage First)

**Flag**: `-XX:+UseG1GC` (**default since Java 9**)

G1 is a modern, mostly concurrent GC designed to provide **predictable, low pause times** while maintaining good throughput. It's the default for most Java applications today.

**Key innovation**: G1 divides the Heap into equal-sized **regions** (typically 1MB–32MB each) instead of fixed Young/Old generations. It still logically has Young and Old generations, but they are sets of regions rather than contiguous memory zones.

```
Heap divided into regions:
┌────┬────┬────┬────┬────┬────┬────┬────┐
│ E  │ E  │ S  │ O  │ O  │ E  │ H  │ O  │
├────┼────┼────┼────┼────┼────┼────┼────┤
│ O  │ E  │ O  │ S  │ O  │ O  │ E  │ O  │
└────┴────┴────┴────┴────┴────┴────┴────┘
E=Eden, S=Survivor, O=Old, H=Humongous (large objects)
```

**How G1 works**:
1. **Minor GC (Young)**: Collects Eden regions. Survivors moved to Survivor regions. Stop-the-World but short.
2. **Concurrent Marking**: Runs concurrently with the application. Marks live objects in Old regions without full pause.
3. **Mixed GC**: Collects some Old regions along with Young. G1 picks the regions with the most garbage first (hence "Garbage First").
4. **Full GC** (fallback): Only if concurrent marking can't keep up. Rare if tuned properly.

**Use when**:
- Most server applications (this is the default — good starting point)
- Heap sizes from 4GB to 64GB
- You need predictable pause times (< 200ms typically)
- Balanced latency and throughput requirements

**Configuration**:
```bash
-XX:+UseG1GC
-XX:MaxGCPauseMillis=200       # target max pause (G1 tries to meet this)
-XX:G1HeapRegionSize=16m       # region size (1MB to 32MB)
-XX:G1NewSizePercent=20        # min % of heap for Young gen
-XX:G1MaxNewSizePercent=60     # max % of heap for Young gen
-XX:ConcGCThreads=4            # concurrent marking threads
```

---

### Algorithm 4: ZGC (Z Garbage Collector)

**Flag**: `-XX:+UseZGC` (production-ready since Java 15)

ZGC is designed for **ultra-low latency** applications. Its goal is to keep pause times under **1 millisecond**, regardless of heap size (even for terabyte heaps). It achieves this by doing almost all work concurrently with the application.

**How ZGC achieves sub-millisecond pauses**:
- **Colored pointers**: ZGC stores metadata bits in object references, allowing it to track object state without scanning.
- **Load barriers**: Small code inserted at object reads to handle concurrent relocation.
- **Concurrent relocation**: Objects are moved to new locations *while the application runs*, using the colored pointer technique.

```
Application:  ████████████████████████████████████████
GC Thread:    ┌── Concurrent Mark ──┬─ Concurrent Relocate ─┐
              │                     │                        │
Pause:                          [<<1ms>]              [<<1ms>]
              (only tiny pauses at start/end of phases)
```

**Use when**:
- Low-latency, real-time applications (financial trading, gaming, APIs)
- Very large heaps (100GB to TB range)
- Java 15+ applications
- Response time SLAs are critical (e.g., 99th percentile latency requirements)

**Configuration**:
```bash
-XX:+UseZGC
-XX:SoftMaxHeapSize=16g    # soft limit (ZGC expands beyond this under pressure)
-XX:ZCollectionInterval=5  # GC interval in seconds
```

---

### Algorithm 5: Shenandoah GC

**Flag**: `-XX:+UseShenandoahGC` (available in OpenJDK, not in Oracle JDK)

Similar goal to ZGC — ultra-low pause times. Shenandoah was developed by Red Hat and is available in OpenJDK distributions. Like ZGC, it does concurrent compaction.

**Key difference from ZGC**:
- Uses **Brooks pointers** (forwarding pointers) instead of colored pointers
- Available in Java 12+ (OpenJDK)
- Slightly different performance characteristics — comparable to ZGC

**Use when**:
- Same use cases as ZGC (low latency, large heaps)
- Running OpenJDK on RHEL/Fedora systems (Shenandoah is Red Hat's GC)
- Java 12+ with OpenJDK

```bash
-XX:+UseShenandoahGC
-XX:ShenandoahGCHeuristics=adaptive  # adaptive, static, compact, aggressive
```

---

### GC Comparison Table

| GC | Default? | Threads | Pause Time | Throughput | Best For |
|---|---|---|---|---|---|
| Serial GC | No | 1 | High | Low | Single-core, small apps |
| Parallel GC | Java 8 default | Many | Medium | **High** | Batch processing |
| G1 GC | **Java 9+ default** | Many | Low (< 200ms) | Medium-High | Most server apps |
| ZGC | No | Many | **Ultra-low (< 1ms)** | Medium | Low-latency, large heaps |
| Shenandoah | No | Many | **Ultra-low (< 10ms)** | Medium | OpenJDK, low-latency |

---

### How to Select and Monitor GC

```bash
# Check which GC your JVM is using
java -XX:+PrintCommandLineFlags -version

# Enable GC logging (Java 9+ unified logging)
java -Xlog:gc*:gc.log:time,uptime,level,tags MyApp

# Common flags to enable GC stats
java -XX:+PrintGCDetails -XX:+PrintGCDateStamps MyApp  # Java 8
java -Xlog:gc:stdout:time MyApp                         # Java 9+
```

---

## Real-World Analogy

Think of different GC algorithms like different cleaning staff strategies in a busy restaurant:

- **Serial GC** — One cleaner stops all operations, cleans everything, then work resumes. Simple, works in a tiny café.
- **Parallel GC** — Many cleaners all stop operations together and clean fast. Great for a banquet with a break between courses.
- **G1 GC** — Cleaners work in sections. Most cleaning happens during breaks; they prioritize the dirtiest sections. Good for a busy buffet.
- **ZGC/Shenandoah** — Cleaners work while the restaurant is open, so guests never notice. Perfect for a 24/7 hotel restaurant with strict service standards.

---

## Code Example

```java
public class GCAlgorithmDemo {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("GC Algorithm in use: " + getGCName());

        // Simulate object creation to trigger GC
        System.out.println("Creating 10 million short-lived objects...");
        long start = System.currentTimeMillis();

        for (int i = 0; i < 10_000_000; i++) {
            // Short-lived string objects — GC must collect these
            String s = "Object-" + i;
        }

        long elapsed = System.currentTimeMillis() - start;
        System.out.println("Done in: " + elapsed + "ms");
        System.out.println("(GC ran in background to handle objects)");
    }

    private static String getGCName() {
        // Get GC name via MXBeans
        java.util.List<java.lang.management.GarbageCollectorMXBean> gcBeans =
            java.lang.management.ManagementFactory.getGarbageCollectorMXBeans();
        StringBuilder sb = new StringBuilder();
        for (java.lang.management.GarbageCollectorMXBean gc : gcBeans) {
            sb.append(gc.getName()).append(" ");
        }
        return sb.toString().trim();
    }
}
```

### Output (with G1 GC — Java 9+ default)
```
GC Algorithm in use: G1 Young Generation G1 Old Generation
Creating 10 million short-lived objects...
Done in: 847ms
(GC ran in background to handle objects)
```

### Running with Different GC Algorithms
```bash
# Serial GC
java -XX:+UseSerialGC GCAlgorithmDemo

# Parallel GC
java -XX:+UseParallelGC -XX:ParallelGCThreads=4 GCAlgorithmDemo

# G1 GC (default Java 9+)
java -XX:+UseG1GC -XX:MaxGCPauseMillis=100 GCAlgorithmDemo

# ZGC (Java 15+)
java -XX:+UseZGC GCAlgorithmDemo
```

---

## Common Mistakes

- ❌ **Mistake**: Using Parallel GC for a latency-sensitive REST API → ✅ **Fix**: Use G1 or ZGC for APIs where individual response time matters.
- ❌ **Mistake**: Setting `-XX:MaxGCPauseMillis` too low (e.g., 10ms) with G1 → ✅ **Fix**: G1 treats this as a target, not a guarantee. Setting it too low may cause G1 to collect less garbage per cycle, leading to more frequent GCs.
- ❌ **Mistake**: Not setting `-Xms` equal to `-Xmx` in production → ✅ **Fix**: Setting them equal prevents heap resizing overhead during runtime.
- ❌ **Mistake**: Using ZGC on Java 11 (experimental) in production → ✅ **Fix**: Use ZGC only from Java 15+, where it became production-ready.

---

## Best Practices

- **Default is good**: For most applications, stick with G1 GC (the Java 9+ default) until profiling shows you need something different.
- **Measure before tuning**: Use GC logs to understand your GC behavior before changing algorithms.
- **Match GC to workload**: Batch jobs → Parallel GC; APIs/microservices → G1 or ZGC; ultra-low latency → ZGC.
- **Set heap bounds**: Always set `-Xms` and `-Xmx` to prevent JVM from requesting/releasing OS memory constantly.
- **Monitor in production**: Use tools like JVM Flight Recorder, VisualVM, or GCEasy to analyze GC performance.

---

## Interview Questions

**Q: What is the default GC in Java 8 vs Java 9+?**  
A: In Java 8, the default GC is **Parallel GC** (also called Throughput Collector). Starting Java 9, the default changed to **G1 GC** (Garbage First), which provides better balance between throughput and latency for most server applications.

**Q: What is the key advantage of G1 GC over Parallel GC?**  
A: G1 GC provides more predictable pause times by dividing the heap into small regions and collecting the regions with the most garbage first. It runs some phases concurrently with the application. Parallel GC focuses purely on throughput and can have longer, less predictable Stop-the-World pauses. G1 is better for latency-sensitive applications.

**Q: How does ZGC achieve sub-millisecond pause times?**  
A: ZGC uses colored pointers (storing GC metadata in the reference bits) and load barriers (code inserted at object reads). This allows it to perform most GC work — including object relocation — concurrently while the application runs. Only tiny initial/final mark phases require short pauses, keeping them under 1ms regardless of heap size.

**Q: What JVM flag enables G1 GC and how do you set a pause time target?**  
A: `-XX:+UseG1GC` enables G1 GC. The pause time target is set with `-XX:MaxGCPauseMillis=200` (200ms is the default target). Note this is a goal, not a hard guarantee — G1 will try to meet it but may exceed it if necessary.

---

## Quick Revision

✔ Serial GC: 1 thread, highest pauses — for small/single-core apps  
✔ Parallel GC: multi-thread, Stop-the-World — for batch/throughput workloads (Java 8 default)  
✔ G1 GC: regions-based, predictable pauses — for most server apps (Java 9+ default)  
✔ ZGC: concurrent, sub-millisecond pauses — for low-latency, large heaps (Java 15+)  
✔ Shenandoah: like ZGC, from Red Hat, available in OpenJDK  
✔ Select GC with `-XX:+UseG1GC`, `-XX:+UseZGC`, etc.  

---

## Related Topics

- Garbage Collection Basics (Lesson 4)
- JVM Performance Tuning (Lesson 6)
- JVM Memory Areas (Lesson 3)

---

## Next Lesson

**Lesson 6 — JVM Performance Tuning: Flags, Profiling, and Common Mistakes**
