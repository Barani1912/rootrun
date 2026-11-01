# 🚀 rootrun

**The Zero-Config Concurrent Script Runner for Modern Monorepos**

[![npm version](https://img.shields.io/npm/v/rootrun.svg?style=flat-square)](https://www.npmjs.com/package/rootrun)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

`rootrun` is a lightweight, high-performance CLI tool designed to simplify the development workflow in projects with multiple subdirectories (monorepos). Instead of opening multiple terminal tabs to start your backend, frontend, and documentation servers, `rootrun` allows you to launch them all with a single, elegant command.

---

## ✨ Key Features

- **Zero Configuration**: Works out of the box. No complex config files required.
- **Concurrent Execution**: Spawns multiple child processes simultaneously.
- **Selective Folder Filtering**: Run only specific folders by passing folder name keywords.
- **Smart Prefixing**: Automatically prefixes every line of output with the folder name.
- **Color-Coded Logs**: Assigns a unique, rotating color to each folder for easy readability.
- **Graceful Cleanup**: Kills all child processes cleanly when you press `Ctrl+C`.
- **Intelligent Scanning**: Only runs scripts in folders that actually contain them.
- **Script Fallbacks**: Automatically falls back to `start` if the requested `dev` script is missing.

---

## 🛠️ Installation

You can run `rootrun` instantly without installation using `npx`, or install it globally for faster access.

### Use with npx (Recommended)
```bash
npx rootrun dev
```

### Install Globally
```bash
npm install -g rootrun
```

---

## 📖 How to Use

Simply navigate to the root of your project and run:

```bash
rootrun [script-name] [folder-filters...]
```

### Commands & Examples

| Command | Description |
| :--- | :--- |
| `rootrun` | Runs the `dev` script in **all** subdirectories. Falls back to `start` if `dev` is missing. |
| `rootrun dev` | Same as above — runs `dev` in all subdirectories. |
| `rootrun dev api dashboard` | Runs `dev` only in folders whose name contains `api` or `dashboard`. |
| `rootrun build` | Runs the `build` script concurrently in all packages. |
| `rootrun start` | Starts all your production processes at once. |
| `rootrun test` | Executes unit tests across your entire repository. |
| `rootrun --verbose` | Displays extra debugging info (including active scripts and skips). |

> **Note on Fallbacks**: When running `rootrun dev` (the default), if a subdirectory contains a `start` script but no `dev` script, `rootrun` will intelligently execute `npm run start` instead of skipping the folder.

---

## 🎯 Selective Folder Filtering

Sometimes you don't need to run every package — maybe you're only working on two out of five services. With **folder filtering**, you can pass keywords after the script name and `rootrun` will only run folders whose name **contains** any of those keywords (case-insensitive).

### Example

Given this project structure:

```text
ecommerce-app/
├── storefront-web/        # React frontend
├── storefront-mobile/     # React Native app
├── inventory-api/         # Inventory microservice
├── payment-gateway/       # Payment service
├── notification-worker/   # Background jobs
└── package.json
```

**Run everything:**
```bash
rootrun dev
```
→ Starts all 5 services.

**Run only the frontends:**
```bash
rootrun dev storefront
```
→ Starts `storefront-web` and `storefront-mobile` (both contain "storefront").

**Run specific services:**
```bash
rootrun dev web inventory payment
```
→ Starts `storefront-web`, `inventory-api`, and `payment-gateway`.

**Run a single service:**
```bash
rootrun dev gateway
```
→ Starts only `payment-gateway`.

> **Tip**: The filter is a substring match, so you only need to type enough of the folder name to uniquely identify it. `web` matches `storefront-web`, `api` matches `inventory-api`, etc.

---

## 📂 Example Project Structure

Imagine a project like this:

```text
my-awesome-app/
├── backend/        # Node.js Express Server
├── frontend/       # React (Vite) App
├── docs/           # Docusaurus Site
└── package.json
```

Running `rootrun dev` from the `my-awesome-app` folder will produce beautifully organized logs:

```text
[backend ] Server listening on port 5000...
[frontend] VITE v5.1.0  ready in 450 ms
[docs    ] Docusaurus started on http://localhost:3000
[backend ] Connected to MongoDB.
```

Want to skip the docs site and only work on the core app?

```bash
rootrun dev backend frontend
```

---

## 🛡️ Ignoring Directories

If you want to permanently skip certain folders, create a `.rootrunignore` file in your project root.

```text
# .rootrunignore
node_modules
dist
temp-logs
legacy-backup
```

By default, `rootrun` always ignores `node_modules` and `.git`.

---

## ⚙️ Requirements

- **Node.js**: `v14.0.0` or higher.
- **NPM**: Works with standard npm-based projects.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

*Made with ❤️ for developers who love clean terminals.*
