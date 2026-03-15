const { spawn } = require('child_process');
const { createLogger } = require('./logger');

const allProcesses = [];
let cleanupRegistered = false;

function runProcesses(packages, scriptName, verbose) {
    const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

    // Determine max length for uniform padding across prefixes
    const maxNameLen = Math.max(...packages.map(p => p.name.length));

    // Register cleanup handlers ONCE
    if (!cleanupRegistered) {
        cleanupRegistered = true;
        const cleanup = () => {
            console.log('\nrootrun: shutting down...');
            allProcesses.forEach(p => {
                try {
                    p.kill();
                } catch (e) {
                    // ignore error if already killed
                }
            });
            process.exit(0);
        };
        process.on('SIGINT', cleanup);
        process.on('SIGTERM', cleanup);
    }

    packages.forEach(pkg => {
        // We pad the name so the tags align nicely in the terminal
        const paddedName = pkg.name.padEnd(maxNameLen);
        const log = createLogger(paddedName);

        const activeScript = pkg.script;

        if (verbose) {
            console.log(`Spawning ${npmCmd} run ${activeScript} in ${pkg.cwd}`);
        }

        const child = spawn(npmCmd, ['run', activeScript], {
            cwd: pkg.cwd,
            stdio: 'pipe',
            shell: process.platform === 'win32'
        });

        allProcesses.push(child);

        child.stdout.on('data', log);
        child.stderr.on('data', log); // tools often log to stderr normally

        child.on('error', (err) => {
            console.log(`[${pkg.name}] Failed to start: ${err.message}`);
        });

        child.on('close', (code) => {
            console.log(`[${pkg.name}] Exited with code ${code}`);
        });
    });
}

module.exports = {
    runProcesses
};
