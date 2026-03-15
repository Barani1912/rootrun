#!/usr/bin/env node

const { program } = require('commander');
const pkg = require('../package.json');
const { scanDirectories } = require('../src/scanner');
const { runProcesses } = require('../src/runner');

program
    .name('rootrun')
    .description(pkg.description)
    .version(pkg.version);

program
    .argument('[scriptName]', 'Name of the script to run in subdirectories', 'dev')
    .option('-v, --verbose', 'Output extra debugging information')
    .action((scriptName, options) => {
        console.log(`\nrootrun — running script "${scriptName}"\n`);

        const packages = scanDirectories(process.cwd(), scriptName, options.verbose);

        if (packages.length === 0) {
            console.log(`No folders found to scan. Exiting.`);
            process.exit(1);
        }

        console.log('Detected packages:');
        packages.forEach(pkg => {
            if (pkg.skipped) {
                console.log(`  ✗ ${pkg.name.padEnd(8)} (${pkg.skipReason})`);
            } else {
                console.log(`  ✔ ${pkg.name}`);
            }
        });
        console.log('');

        const startedPackages = packages.filter(p => !p.skipped);

        if (startedPackages.length === 0) {
            console.log(`No packages found with script "${scriptName}" or fallback. Exiting.`);
            process.exit(1);
        }

        // Determine max length for uniform padding across prefixes
        const maxNameLen = Math.max(...startedPackages.map(p => p.name.length));

        console.log('Starting scripts:');
        startedPackages.forEach(p => {
            console.log(`  ➜ ${p.name.padEnd(maxNameLen)} : npm run ${p.script}`);
        });
        console.log('────────────────────────────────────────');

        // Run the processes concurrently
        runProcesses(startedPackages, scriptName, options.verbose);
    });

program.parse(process.argv);
