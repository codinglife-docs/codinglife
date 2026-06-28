import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/core/lib/client/exports/useDocusaurusContext";
import Layout from "@theme/Layout";

// ─── Course Syllabus Directory Data ──────────────────────────────────────────
const COURSE_GROUPS = [
  {
    title: "Java Fundamentals",
    desc: "Start your journey here with the absolute basics of core Java development.",
    items: [
      {
        title: "Introduction to Java",
        desc: "Setting up JDK, compiling source code, and understanding the JVM structure.",
        path: "/docs/java/fundamentals/what-is-java",
        icon: "☕"
      },
      {
        title: "First Java Program",
        desc: "Anatomy of a Java class, compile processes, and print output commands.",
        path: "/docs/java/fundamentals/first-java-program",
        icon: "💻"
      },
      {
        title: "Variables & Data Types",
        desc: "Primitives, reference types, constant constants, and variable declarations.",
        path: "/docs/java/fundamentals/variables",
        icon: "📊"
      },
      {
        title: "Type Casting",
        desc: "Widening and narrowing casting conversions, data safety, and operations.",
        path: "/docs/java/fundamentals/type-casting",
        icon: "⚡"
      },
      {
        title: "Object-Oriented Java (OOP)",
        desc: "Classes, objects, constructors, inheritance, interfaces, and polymorphism.",
        path: "/docs/java/oop",
        icon: "🧩"
      },
      {
        title: "Strings & Manipulation",
        desc: "String memory management, StringBuilder pool, and mutable buffers.",
        path: "/docs/java/strings",
        icon: "📝"
      }
    ]
  },
  {
    title: "Advanced Core Java",
    desc: "Delve deeper into robust data structures, execution logic, and JVM performance.",
    items: [
      {
        title: "Java Collections Framework",
        desc: "Store and manage groups of objects with Lists, Sets, and Maps structures.",
        path: "/docs/java/collections",
        icon: "📦"
      },
      {
        title: "Exception Handling & I/O",
        desc: "try/catch/finally structures, custom exceptions, and buffered file access.",
        path: "/docs/java/exception-handling",
        icon: "⚠️"
      },
      {
        title: "Advanced Features (Java 8+)",
        desc: "Lambdas, Stream API transformations, Optionals, and sealed classes.",
        path: "/docs/java/java8",
        icon: "⚡"
      },
      {
        title: "JVM Architecture & Memory",
        desc: "ClassLoader subsystem, memory partitions, and Garbage Collection routines.",
        path: "/docs/java/jvm",
        icon: "⚙️"
      },
      {
        title: "Java Multithreading",
        desc: "Processes, threads, execution cycles, sync locks, and concurrent code.",
        path: "/docs/java/multithreading",
        icon: "🔌"
      }
    ]
  },
  {
    title: "Enterprise & Career Readiness",
    desc: "Connect to databases, apply design solutions, and prepare for interviews.",
    items: [
      {
        title: "Database Access (JDBC)",
        desc: "Connect to databases, execute statement queries, and parse result sets.",
        path: "/docs/java/jdbc",
        icon: "🗄️"
      },
      {
        title: "Design Patterns",
        desc: "Implementing Singleton, Factory, and Builder design solutions in Java.",
        path: "/docs/java/design-patterns",
        icon: "📐"
      },
      {
        title: "Spring Boot & APIs",
        desc: "Build REST APIs, manage entities with JPA, and build microservices.",
        path: "/docs/java/springboot",
        icon: "🌱"
      },
      {
        title: "Interview Prep Guide",
        desc: "Core technical questions and conceptual deep-dives for job readiness.",
        path: "/docs/java/interview",
        icon: "🎓"
      }
    ]
  }
];

const STATS = [
  { value: "12+", label: "Learning Modules" },
  { value: "60+", label: "Step-by-Step Lessons" },
  { value: "100+", label: "Technical Q&As" },
  { value: "Free", label: "No Sign-Up Required" }
];

// ─── Component Sections ──────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      style={{
        padding: "80px 24px 60px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid var(--card-border)"
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          maxWidth: 900,
          height: 350,
          background: "var(--hero-glow)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 840, margin: "0 auto" }}>
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(37, 99, 235, 0.05)",
            border: "1px solid var(--card-border)",
            borderRadius: 999,
            padding: "6px 18px",
            marginBottom: 24,
            color: "var(--ifm-color-primary)",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.05em"
          }}
        >
          🎓 Free Online Tutorials & Interview Preparation
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.2rem)",
            fontWeight: 800,
            lineHeight: 1.15,
            margin: "0 0 16px"
          }}
        >
          Coding Life
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
            color: "var(--ifm-color-emphasis-700)",
            maxWidth: 580,
            margin: "0 auto 36px",
            lineHeight: 1.6
          }}
        >
          From Zero to Professional Java Developer. Master core concepts, advanced frameworks, and interview prep in one structured roadmap.
        </p>

        {/* CTA Button */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
          <Link
            to="/docs/intro"
            style={{
              display: "inline-block",
              background: "var(--ifm-color-primary)",
              color: "#fff",
              padding: "14px 36px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: "1rem",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(37, 99, 235, 0.25)"
            }}
          >
            Start Learning Now 🚀
          </Link>
          <Link
            to="/docs/java-roadmap"
            style={{
              display: "inline-block",
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              color: "var(--ifm-heading-color)",
              padding: "14px 36px",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: "1rem",
              textDecoration: "none"
            }}
          >
            View Roadmap 🗺️
          </Link>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section style={{ padding: "40px 24px", borderBottom: "1px solid var(--card-border)", background: "var(--card-hover-bg)" }}>
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 24,
          textAlign: "center"
        }}
      >
        {STATS.map((s) => (
          <div key={s.label}>
            <div
              style={{
                fontSize: "1.8rem",
                fontWeight: 800,
                color: "var(--ifm-color-primary)",
                lineHeight: 1.2
              }}
            >
              {s.value}
            </div>
            <div style={{ color: "var(--ifm-color-emphasis-600)", fontSize: "0.875rem", marginTop: 4 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LearningDirectory() {
  return (
    <section style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ color: "var(--ifm-color-primary)", fontWeight: 600, letterSpacing: "0.08em", fontSize: 13 }}>
            TUTORIAL DIRECTORY
          </span>
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.4rem)", fontWeight: 800, margin: "8px 0 12px" }}>
            Explore Our Learning Modules
          </h2>
          <p style={{ color: "var(--ifm-color-emphasis-700)", maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
            Jump into any core module below. Each contains structured lessons, practical code examples, and high-yield interview questions.
          </p>
        </div>

        {/* Groups Column */}
        {COURSE_GROUPS.map((group) => (
          <div key={group.title} style={{ marginBottom: 60 }}>
            {/* Group Header */}
            <div style={{ borderLeft: "3px solid var(--ifm-color-primary)", paddingLeft: 16, marginBottom: 24 }}>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 4px" }}>
                {group.title}
              </h3>
              <p style={{ color: "var(--ifm-color-emphasis-600)", fontSize: "0.9rem", margin: 0 }}>
                {group.desc}
              </p>
            </div>

            {/* Cards Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 20
              }}
            >
              {group.items.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    background: "var(--card-bg)",
                    border: "1px solid var(--card-border)",
                    borderRadius: 12,
                    padding: "24px 20px",
                    boxShadow: "var(--card-shadow)",
                    transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
                    position: "relative"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = "var(--ifm-color-primary)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(37, 99, 235, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "var(--card-border)";
                    e.currentTarget.style.boxShadow = "var(--card-shadow)";
                  }}
                >
                  <div style={{ display: "flex", gap: 16, alignItems: "start" }}>
                    <div
                      style={{
                        fontSize: "2rem",
                        lineHeight: 1,
                        background: "var(--card-hover-bg)",
                        padding: 10,
                        borderRadius: 8
                      }}
                    >
                      {item.icon}
                    </div>
                    <div style={{ flex: 1, paddingRight: 12 }}>
                      <h4 style={{ margin: "0 0 6px", fontSize: "1.05rem", fontWeight: 700, color: "var(--ifm-heading-color)" }}>
                        {item.title}
                      </h4>
                      <p style={{ margin: 0, color: "var(--ifm-color-emphasis-700)", fontSize: "0.85rem", lineHeight: 1.6 }}>
                        {item.desc}
                      </p>
                    </div>
                    {/* Small link arrow */}
                    <div
                      style={{
                        position: "absolute",
                        right: 18,
                        top: 20,
                        color: "var(--ifm-color-primary)",
                        fontSize: "1.1rem"
                      }}
                    >
                      →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="From Zero to Professional Java Developer. Structured online tutorials, roadmap, and interview prep."
    >
      <div style={{ minHeight: "100vh" }}>
        <HeroSection />
        <StatsBar />
        <LearningDirectory />
      </div>
    </Layout>
  );
}
