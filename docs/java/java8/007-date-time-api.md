---
id: date-time-api
title: Date and Time API
description: Master Java 8's new Date-Time API with LocalDate, LocalDateTime, ZonedDateTime, DateTimeFormatter, Period, and Duration — replacing the broken old API.
sidebar_position: 7
keywords:
  - Java
  - Date Time API
  - LocalDate
  - LocalDateTime
  - Java 8
  - DateTimeFormatter
  - Period
  - Duration
---

# Date and Time API

> **Reading Time:** 10 Minutes  
> **Difficulty:** Beginner

---

## Topic Summary

Java 8 introduced a completely new Date and Time API (`java.time` package) to replace the old, buggy `java.util.Date` and `java.util.Calendar` classes. The new API is immutable, thread-safe, and much easier to understand. You can now work with dates and times clearly without confusion about month indexing or time zones.

---

## What You'll Learn

- What was wrong with the old `Date`/`Calendar` API
- The new key classes: `LocalDate`, `LocalTime`, `LocalDateTime`, `ZonedDateTime`
- Formatting dates with `DateTimeFormatter`
- Calculating differences with `Period` and `Duration`
- Practical examples: age calculator, days between dates

---

## Prerequisites

- Basic Java (classes, methods)
- No special prerequisites

---

## Explanation

### What Was Wrong with the Old API?

The old `java.util.Date` and `java.util.Calendar` had several problems:

- **Month indexing starts at 0**: January = 0, December = 11 — constant source of bugs
- **Not immutable**: Date objects could be modified — dangerous in multi-threaded apps
- **Not thread-safe**: Multiple threads accessing a Calendar was problematic
- **Poor design**: `Date` also stores time, but the name implies only date — confusing
- **Time zones**: Handling was a nightmare with the old API

```java
// Old API — confusing and error-prone
Calendar cal = Calendar.getInstance();
cal.set(2024, 0, 15); // January is 0, not 1! Easy to get wrong
Date date = cal.getTime();
```

---

### The New `java.time` Package

Java 8's new API is in `java.time`. Key classes:

| Class | What it represents |
|-------|-------------------|
| `LocalDate` | Date only (year, month, day) — no time, no timezone |
| `LocalTime` | Time only (hour, minute, second, nanosecond) |
| `LocalDateTime` | Date + Time, no timezone |
| `ZonedDateTime` | Date + Time + Timezone |
| `Instant` | A point in time (like a timestamp) |
| `Period` | Amount of time in years/months/days |
| `Duration` | Amount of time in hours/minutes/seconds/nanoseconds |
| `DateTimeFormatter` | Format/parse date-time objects |

---

### LocalDate

`LocalDate` = date without time. Most common for business logic.

```java
// Get today's date
LocalDate today = LocalDate.now();

// Specific date
LocalDate birthday = LocalDate.of(2000, 3, 15);  // March 15, 2000
// Month enum is cleaner:
LocalDate birthday = LocalDate.of(2000, Month.MARCH, 15);

// Accessing parts
int year = today.getYear();
Month month = today.getMonth();        // JANUARY, FEBRUARY...
int monthValue = today.getMonthValue(); // 1-12 (not 0-11!)
int day = today.getDayOfMonth();
DayOfWeek dow = today.getDayOfWeek(); // MONDAY, TUESDAY...

// Arithmetic
LocalDate nextWeek = today.plusDays(7);
LocalDate lastMonth = today.minusMonths(1);
LocalDate nextYear = today.plusYears(1);
```

---

### LocalTime

`LocalTime` = time without date.

```java
LocalTime now = LocalTime.now();
LocalTime noon = LocalTime.of(12, 0, 0); // 12:00:00
LocalTime meeting = LocalTime.of(14, 30); // 14:30

int hour = now.getHour();
int minute = now.getMinute();

LocalTime later = now.plusHours(2);
LocalTime earlier = now.minusMinutes(30);
```

---

### LocalDateTime

`LocalDateTime` = date + time, no timezone.

```java
LocalDateTime now = LocalDateTime.now();
LocalDateTime event = LocalDateTime.of(2025, 12, 25, 18, 0); // Christmas at 6 PM

// Combine LocalDate and LocalTime
LocalDate date = LocalDate.of(2025, 1, 1);
LocalTime time = LocalTime.of(9, 30);
LocalDateTime dt = LocalDateTime.of(date, time);
```

---

### ZonedDateTime

`ZonedDateTime` = date + time + timezone.

```java
ZonedDateTime nowIndia = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
ZonedDateTime nowNY = ZonedDateTime.now(ZoneId.of("America/New_York"));

// Convert between zones
ZonedDateTime converted = nowIndia.withZoneSameInstant(ZoneId.of("America/New_York"));
```

---

### DateTimeFormatter

Format and parse date-time objects as strings.

```java
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
LocalDate date = LocalDate.of(2025, 3, 15);

// Format date → String
String formatted = date.format(formatter); // "15-03-2025"

// Parse String → date
LocalDate parsed = LocalDate.parse("15-03-2025", formatter);

// Built-in formatters
String iso = date.format(DateTimeFormatter.ISO_LOCAL_DATE); // "2025-03-15"
```

---

### Period — Date Differences

`Period` measures time in years, months, and days (between dates).

```java
LocalDate birthDate = LocalDate.of(2000, 5, 20);
LocalDate today = LocalDate.now();

Period age = Period.between(birthDate, today);
System.out.println("Age: " + age.getYears() + " years, "
    + age.getMonths() + " months, " + age.getDays() + " days");
```

---

### Duration — Time Differences

`Duration` measures time in hours, minutes, seconds (between times/datetimes).

```java
LocalTime start = LocalTime.of(9, 0);
LocalTime end = LocalTime.of(17, 30);

Duration workDay = Duration.between(start, end);
System.out.println("Work hours: " + workDay.toHours());      // 8
System.out.println("Work minutes: " + workDay.toMinutes());  // 510
```

---

## Real-World Analogy

The old Date API was like a **Swiss Army knife with no labels** — confusing, everything was in one messy tool. The new `java.time` API is like a **professional toolkit where every tool has a clear purpose**: `LocalDate` is your calendar page, `LocalTime` is your clock, `LocalDateTime` is your appointment diary, `ZonedDateTime` is an international meeting scheduler.

---

## Code Example

### Example 1: Age Calculator

```java
import java.time.*;

public class AgeCalculator {
    public static void main(String[] args) {
        // Birth date
        LocalDate birthDate = LocalDate.of(2000, 8, 15);
        LocalDate today = LocalDate.now();

        // Calculate age using Period
        Period age = Period.between(birthDate, today);
        System.out.println("Birth Date: " + birthDate);
        System.out.println("Today: " + today);
        System.out.println("Age: " + age.getYears() + " years, "
                + age.getMonths() + " months, "
                + age.getDays() + " days");

        // Days until next birthday
        LocalDate nextBirthday = birthDate.withYear(today.getYear());
        if (nextBirthday.isBefore(today) || nextBirthday.isEqual(today)) {
            nextBirthday = nextBirthday.plusYears(1);
        }
        long daysUntilBirthday = nextBirthday.toEpochDay() - today.toEpochDay();
        System.out.println("Days until next birthday: " + daysUntilBirthday);
    }
}
```

### Output (approximate)
```
Birth Date: 2000-08-15
Today: 2025-06-28
Age: 24 years, 10 months, 13 days
Days until next birthday: 48
```

---

### Example 2: Days Between Dates and Formatting

```java
import java.time.*;
import java.time.format.*;
import java.time.temporal.ChronoUnit;

public class DateTimeFormatting {
    public static void main(String[] args) {
        // Different formatters
        LocalDate date = LocalDate.of(2025, 12, 25);
        DateTimeFormatter f1 = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        DateTimeFormatter f2 = DateTimeFormatter.ofPattern("MMMM dd, yyyy");
        DateTimeFormatter f3 = DateTimeFormatter.ofPattern("EEE, MMM d yyyy");

        System.out.println(date.format(f1));  // 25/12/2025
        System.out.println(date.format(f2));  // December 25, 2025
        System.out.println(date.format(f3));  // Thu, Dec 25 2025

        // Parse a date string
        String dateStr = "28-06-2025";
        LocalDate parsed = LocalDate.parse(dateStr,
                DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        System.out.println("Parsed: " + parsed);  // 2025-06-28

        // Days between two dates
        LocalDate from = LocalDate.of(2025, 1, 1);
        LocalDate to = LocalDate.of(2025, 12, 31);
        long daysBetween = ChronoUnit.DAYS.between(from, to);
        System.out.println("Days in 2025: " + daysBetween);  // 364

        // LocalDateTime formatting
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter dtFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        System.out.println("Now: " + now.format(dtFormatter));
    }
}
```

### Output
```
25/12/2025
December 25, 2025
Thu, Dec 25 2025
Parsed: 2025-06-28
Days in 2025: 364
Now: 2025-06-28 13:45:22
```

---

### Example 3: Duration and Time Zones

```java
import java.time.*;

public class DurationAndZones {
    public static void main(String[] args) {
        // Duration — work hours
        LocalTime workStart = LocalTime.of(9, 0);
        LocalTime workEnd = LocalTime.of(18, 30);
        Duration workDuration = Duration.between(workStart, workEnd);
        System.out.println("Work duration: " + workDuration.toHours() + "h "
                + (workDuration.toMinutesPart()) + "m");  // 9h 30m

        // Time zones
        ZoneId indiaZone = ZoneId.of("Asia/Kolkata");
        ZoneId nyZone = ZoneId.of("America/New_York");

        ZonedDateTime indiaTime = ZonedDateTime.now(indiaZone);
        ZonedDateTime nyTime = indiaTime.withZoneSameInstant(nyZone);

        System.out.println("India time:    " + indiaTime.toLocalTime());
        System.out.println("New York time: " + nyTime.toLocalTime());
    }
}
```

### Output
```
Work duration: 9h 30m
India time:    13:45:22
New York time: 04:15:22
```

---

## Common Mistakes

- ❌ **Mistake**: Using `new Date()` or `Calendar` in new code → ✅ **Fix**: Always use the new `java.time` API — it's cleaner, immutable, and thread-safe
- ❌ **Mistake**: Confusing `Period` and `Duration` → ✅ **Fix**: `Period` is for date differences (days/months/years); `Duration` is for time differences (hours/minutes/seconds)
- ❌ **Mistake**: Thinking `LocalDate.now()` returns a different value each time it's called in the same second → ✅ **Fix**: It does return today's date — just note it depends on system clock
- ❌ **Mistake**: Forgetting that all `java.time` objects are **immutable** — `date.plusDays(1)` doesn't change `date` → ✅ **Fix**: Always assign the result: `date = date.plusDays(1)`
- ❌ **Mistake**: Using wrong pattern letter in `DateTimeFormatter` (e.g., `YYYY` instead of `yyyy`) → ✅ **Fix**: `yyyy` = calendar year, `YYYY` = week-based year — use `yyyy` for standard dates

---

## Best Practices

- Use `LocalDate` when you only care about the date (no time component needed)
- Use `LocalDateTime` for date + time but no timezone; use `ZonedDateTime` for timezone-aware apps
- Always use `DateTimeFormatter.ofPattern()` to format — don't string-concatenate date parts manually
- Store dates as `LocalDate`/`LocalDateTime` in code; convert to string only for display
- Use `ChronoUnit.DAYS.between(d1, d2)` for simple day-count differences

---

## Interview Questions

**Q: What problems did the old Java `Date` API have?**  
A: Months were 0-indexed (January = 0), `Date` was mutable and not thread-safe, date and time were mixed in one class, and timezone handling was confusing. `Calendar` was overly complex. The new `java.time` API in Java 8 fixed all of these issues.

**Q: What is the difference between `LocalDate`, `LocalDateTime`, and `ZonedDateTime`?**  
A: `LocalDate` has only date (year, month, day). `LocalDateTime` has date and time but no timezone. `ZonedDateTime` has date, time, and timezone information. Use the simplest one that meets your needs.

**Q: What is the difference between `Period` and `Duration`?**  
A: `Period` represents an amount of time in date units (years, months, days) and is used between two `LocalDate` objects. `Duration` represents time in seconds and nanoseconds (hours, minutes, seconds) and is used between `LocalTime` or `LocalDateTime` objects.

**Q: How do you format a `LocalDate` to a string in Java 8?**  
A: Use `DateTimeFormatter.ofPattern("your-pattern")` and call `date.format(formatter)`. For example: `date.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"))`.

---

## Quick Revision

✔ Old Date API: mutable, months 0-indexed, not thread-safe  
✔ `LocalDate` = date only; `LocalTime` = time only; `LocalDateTime` = both; `ZonedDateTime` = with timezone  
✔ All `java.time` objects are **immutable** — operations return new objects  
✔ `Period.between(d1, d2)` = date difference in years/months/days  
✔ `Duration.between(t1, t2)` = time difference in hours/minutes/seconds  
✔ `DateTimeFormatter.ofPattern("dd-MM-yyyy")` for formatting/parsing  

---

## Related Topics

- Java 8 Stream API
- Optional Class
- Immutable Objects in Java
- Java Threads and Thread Safety

---

## Next Lesson

**Lesson 8 — var Keyword (Local Variable Type Inference)**
