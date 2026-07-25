<div align="center">
  <img src="https://codevkit.com/icon.svg" alt="CodevKit Logo" width="80" height="80" />

  # CodevKit

  <p><strong>Free · Privacy-first · All-in-one developer toolkit</strong></p>

  <p>
    <a href="https://codevkit.com">codevkit.com</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/license-proprietary-red.svg" alt="License" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite" alt="Vite 8" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS 4" />
  </p>
</div>

---

**CodevKit** is a free, privacy-first, all-in-one online developer toolkit. It provides 12+ client-side developer tools — all running entirely in your browser with **no backend, no tracking, and no sign-up required**. Data never leaves your device.

## Features

- ✅ **100% client-side** — nothing is sent to any server
- 🔒 **Privacy-first** — no analytics, no cookies, no tracking
- 🎨 **Dark & light themes** — with system-aware toggle
- ⌨️ **Keyboard shortcuts** — Ctrl+K command palette, `?` for shortcuts
- ⭐ **Favorites & recents** — your most-used tools are always at hand
- 📱 **Responsive** — works on desktop, tablet, and mobile

## Tools

### 🔧 Utilities

| Tool | Description |
|---|---|
| **Hash Generator** | Generate MD5, SHA-1, SHA-256, SHA-512 hashes |
| **Color Converter** | Convert between HEX, RGB, HSL with WCAG contrast checking |
| **UUID / NanoID Generator** | Generate UUID v4 and NanoIDs with custom options |

### 🔄 Converters

| Tool | Description |
|---|---|
| **JSON ↔ YAML** | Bidirectional conversion between JSON and YAML |
| **cURL Converter** | Convert cURL commands to JavaScript fetch, Python, Axios |
| **Unix Timestamp** | Convert between Unix epoch and human-readable dates |

### ✏️ Formatters

| Tool | Description |
|---|---|
| **JSON Formatter** | Format, minify, and validate JSON with adjustable indentation |
| **Markdown Editor** | Write and preview Markdown with syntax highlighting |

### 🔐 Encode / Decode

| Tool | Description |
|---|---|
| **Base64 Encode/Decode** | Encode and decode Base64 with URL-safe variant |
| **URL Encoder/Decoder** | Encode and decode URLs and URI components |
| **JWT Decoder** | Decode JWT header, payload, and signature without verification |

### 🧪 Testers

| Tool | Description |
|---|---|
| **Regex Tester** | Live regex matching with flags and match highlighting |

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 8](https://vite.dev/) |
| **Package Manager** | [pnpm](https://pnpm.io/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives) |
| **Routing** | [wouter](https://github.com/molefrog/wouter) |
| **Code Editors** | [CodeMirror 6](https://codemirror.net/) |
| **Icons** | [lucide-react](https://lucide.dev/) |
| **Animation** | [framer-motion](https://www.framer.com/motion/) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [pnpm](https://pnpm.io/installation)

### Install

```bash
pnpm install
```

### Development

Start the dev server (defaults to port `5173`):

```bash
pnpm dev
```

### Build

Create a production build:

```bash
pnpm build
```

### Preview

Preview the production build locally:

```bash
pnpm serve
```

### Type Check

```bash
pnpm typecheck
```

## Architecture

CodevKit uses a **plugin system** where each tool is a self-contained module conforming to a standard `Plugin` interface. Tools are registered in a central registry and dynamically loaded via URL routing (`/tools/:slug`).

```
src/
├── tools/              # Tool plugins (self-contained modules)
│   ├── json-formatter/
│   ├── base64/
│   ├── hash-generator/
│   └── ...
├── components/         # Shared UI components
│   ├── ui/             # shadcn/ui primitives
│   ├── app-shell.tsx
│   ├── sidebar.tsx
│   ├── command-palette.tsx
│   └── tool-shell.tsx
├── pages/              # Route pages (home, tool, settings, 404)
├── contexts/           # React contexts (favorites, recents, command palette)
├── hooks/              # Custom React hooks
├── lib/                # Utilities and plugin registry
└── App.tsx             # Root component
```

## Configuration

| File | Purpose |
|---|---|
| `vite.config.ts` | Vite build configuration |
| `tsconfig.json` | TypeScript configuration |
| `pnpm-workspace.yaml` | pnpm workspace and catalog configuration |
| `components.json` | shadcn/ui configuration |

## License

Proprietary. All rights reserved.

---

<p align="center">
  <a href="https://codevkit.com">codevkit.com</a>
</p>
