// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Coding Life — Java Course',
  tagline: 'From Zero to Professional Java Developer. One Lesson at a Time.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  // Update this when deploying to GitHub Pages
  url: 'https://Raheem047.github.io',
  baseUrl: '/coding-life/',

  // Update organizationName and projectName when pushing to GitHub Pages
  organizationName: 'Raheem047',
  projectName: 'coding-life',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Remove editUrl to hide "Edit this page" links
        },
        // Blog disabled — this site is focused on the Java course
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Coding Life',
        logo: {
          alt: 'Coding Life Logo',
          src: 'img/logo.jpg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '📚 Java Course',
          },
          {
            to: '/docs/java/interview',
            label: '🎯 Interview Prep',
            position: 'left',
          },
          {
            href: 'https://instagram.com/codinglife.1',
            label: '📸 Instagram',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '🟢 Beginner',
            items: [
              { label: 'Java Fundamentals', to: '/docs/java/fundamentals' },
              { label: 'OOP Concepts', to: '/docs/java/oop' },
            ],
          },
          {
            title: '🟡 Intermediate',
            items: [
              { label: 'Core Java', to: '/docs/java/strings' },
              { label: 'Collections', to: '/docs/java/collections' },
              { label: 'Java 8+', to: '/docs/java/java8' },
            ],
          },
          {
            title: '🔴 Advanced',
            items: [
              { label: 'Multithreading', to: '/docs/java/multithreading' },
              { label: 'JVM Internals', to: '/docs/java/jvm' },
              { label: 'Design Patterns', to: '/docs/java/design-patterns' },
              { label: 'Spring Boot', to: '/docs/java/springboot' },
            ],
          },
          {
            title: 'Coding Life',
            items: [
              { label: 'Instagram', href: 'https://instagram.com/codinglife.1' },
              { label: 'Interview Q&A', to: '/docs/java/interview' },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Coding Life. All rights reserved.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['java', 'bash', 'json'],
      },
    }),
};

export default config;
