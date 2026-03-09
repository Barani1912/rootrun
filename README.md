# 🚀 rootrun

**The Zero-Config Concurrent Script Runner for Modern Monorepos**

[![npm version](https://img.shields.io/npm/v/rootrun.svg?style=flat-square)](https://www.npmjs.com/package/rootrun)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

`rootrun` is a lightweight, high-performance CLI tool designed to simplify the development workflow in projects with multiple subdirectories (monorepos). Instead of opening multiple terminal tabs to start your backend, frontend, and documentation servers, `rootrun` allows you to launch them all with a single, elegant command.

---

## ✨ Key Features

- **Zero Configuration**: Works out of the box. No complex config files required.
- **Concurrent Execution**: Spawns multiple child processes simultaneously.
- **Smart Prefixing**: Automatically prefixes every line of output with the folder name.
- **Color-Coded Logs**: Assigns a unique, rotating color to each folder for easy readability.
- **Graceful Cleanup**: Kills all child processes cleanly when you press `Ctrl+C`.
- **Intelligent Scanning**: Only runs scripts in folders that actually contain them.

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
rootrun [script-name]
```

### Commands & Examples

| Command | Description |
| :--- | :--- |
| `rootrun` | Runs the `dev` script in all subdirectories (default). |
| `rootrun build` | Runs the `build` script concurrently in all packages. |
| `rootrun start` | Starts all your production processes at once. |
| `rootrun test` | Executes unit tests across your entire repository. |
| `rootrun --verbose` | Displays extra debugging info (which scripts were skipped and why). |

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

---

## 🛡️ Ignoring Directories

If you want to skip certain folders, create a `.rootrunignore` file in your project root.

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
