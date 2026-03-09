# rootrun

A zero-config concurrent script runner for Node.js monorepos. 

If you have a backend and a frontend directory in your project, you'd normally need two terminals to start your development servers. With `rootrun`, you just open one terminal at the root and type `npx rootrun dev`.

`rootrun` will look for subdirectories, check their `package.json` for the requested script, and spawn concurrent processes. It prefixes terminal output with each folder's name using distinct colors so you can read logs comfortably in one place.

## Installation

```bash
# Globablly install:
npm install -g rootrun

# Or run it without installing using npx:
npx rootrun dev
```

## Usage

```bash
rootrun           # defaults to script name "dev"
rootrun dev
rootrun start
rootrun build
rootrun dev --verbose
```

### Example Project Structure
```
my-project/
  frontend/
    package.json    (has "dev" script installed - Vite)
  backend/
    package.json    (has "dev" script installed - Express)
```

Run `rootrun dev` in the `my-project/` directory:

```
[frontend] VITE ready at http://localhost:5173
[backend ] Server running on port 5000
```

### Ignoring directories
You can ignore particular directories by placing a `.monostartignore` file at the root. Standard ignore patterns apply:

```text
# .monostartignore
node_modules
dist
docs
```

## Options
- `-v, --verbose`: Print extra debugging information (useful for checking missing / skipped packages).

## Publishing to NPM
1. Login to NPM: `npm login`
2. Verify package name availability on https://npmjs.com
3. Run `npm publish`
4. Test locally with `npx rootrun dev`
