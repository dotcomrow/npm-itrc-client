#! /usr/bin/env node
const { program } = require('commander')
const query = require('./commands/query')

program
    .command('query')
    .option('-a, --api <ITRC API Endpoint>', 'HTTPS ITRC API Endpoint').requiredOption(true)
    .option('-u, --user <ITRC User>', 'ITRC API Enpoint User').requiredOption(true)
    .option('-p, --password <ITRC Password>', 'ITRC API Password').requiredOption(true)
    .option('-q, --query <ITRC Query String>', 'ITRC API Query string').requiredOption(true)
    .description('query ITRC system and return values in query string')
    .action(query)

program
    .command('version')
    .description('Return program version')
    .action(() => {
        var pjson = require('./package.json');
        console.log(pjson.version)  
    })
program.parse()