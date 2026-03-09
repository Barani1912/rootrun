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
            console.log(`No packages found with script "${scriptName}". Exiting.`);
            process.exit(1);
        }

        const startedNames = startedPackages.map(p => p.name).join(', ');
        console.log(`Starting "${scriptName}" in: ${startedNames}`);
        console.log('────────────────────────────────────────');

        // Run the processes concurrently
        runProcesses(startedPackages, scriptName, options.verbose);
    });

program.parse(process.argv);
