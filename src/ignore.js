const fs = require('fs');
const path = require('path');

function getIgnoredFolders(cwd) {
    const ignoreFilePath = path.join(cwd, '.rootrunignore');
    const ignoreSet = new Set(['node_modules', '.git']); // defaults

    if (fs.existsSync(ignoreFilePath)) {
        let content = fs.readFileSync(ignoreFilePath, 'utf8');
        // Handle BOM
        if (content.charCodeAt(0) === 0xFEFF) {
            content = content.slice(1);
        }
        const lines = content.split(/\r?\n/);
        lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                ignoreSet.add(trimmed);
            }
        });
    }

    return ignoreSet;
}

module.exports = {
    getIgnoredFolders
};
