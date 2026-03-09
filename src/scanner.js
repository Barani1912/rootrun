const fs = require('fs');
const path = require('path');
const { getIgnoredFolders } = require('./ignore');

function scanDirectories(cwd, scriptName, verbose) {
    const packages = [];
    const ignoredFolders = getIgnoredFolders(cwd);

    // Read all items in the current directory
    let items;
    try {
        items = fs.readdirSync(cwd, { withFileTypes: true });
    } catch (err) {
        if (verbose) console.log(`Failed to read directory ${cwd}: ${err.message}`);
        return [];
    }

    // Only first-level subdirectories
    const directories = items.filter(item => item.isDirectory());

    for (const dir of directories) {
        const name = dir.name;

        // Skip hidden and ignored ones
        if (name.startsWith('.') || ignoredFolders.has(name)) {
            if (verbose) console.log(`Skipping ignored/hidden folder: ${name}`);
            continue;
        }

        const dirPath = path.join(cwd, name);
        const packageJsonPath = path.join(dirPath, 'package.json');

        if (!fs.existsSync(packageJsonPath)) {
            if (verbose) console.log(`Skipping folder: ${name} (no package.json)`);
            continue;
        }

        let content, parsedPkg;
        try {
            content = fs.readFileSync(packageJsonPath, 'utf8');
            if (content.charCodeAt(0) === 0xFEFF) {
                content = content.slice(1);
            }
            parsedPkg = JSON.parse(content);
        } catch (err) {
            if (verbose) console.log(`Warning: Invalid JSON in ${packageJsonPath} - ${err.message}`);
            packages.push({ name, cwd: dirPath, skipped: true, skipReason: 'invalid package.json' });
            continue;
        }

        if (!parsedPkg.scripts || !parsedPkg.scripts[scriptName]) {
            packages.push({ name, cwd: dirPath, skipped: true, skipReason: `script "${scriptName}" not found` });
            continue;
        }

        packages.push({ name, cwd: dirPath, skipped: false });
    }

    return packages;
}

module.exports = {
    scanDirectories
};
