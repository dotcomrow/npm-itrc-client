#! /usr/bin/env node
const { program } = require('commander')
const query = require('./commands/query')

program
    .command('query')
    .option('-a, --api <ITRC API Endpoint>', 'HTTPS ITRC API Endpoint')
    .option('-u, --user <ITRC User>', 'ITRC API Enpoint User')
    .option('-p, --password <ITRC Password>', 'ITRC API Password')
    .option('-q, --query <ITRC Query String>', 'ITRC API Query string')
    .option('-l, --logswitch <Log switch>', 'Enable debug logs')
    .description('query ITRC system and return values in query string')
    .action((args) => {
        var logVal = (args.logswitch === 'true');
        // if (
        //     /[\S\s]+[\S]+/.test(args.api) ||
        //     /[\S\s]+[\S]+/.test(args.user) ||
        //     /[\S\s]+[\S]+/.test(args.password) ||
        //     /[\S\s]+[\S]+/.test(args.query)
        // ) {
        //     process.exitCode=2;
        //     process.exit();
        // } else {
            query(args)
        // }
    })

program
    .command('version')
    .description('Return program version')
    .action(() => {
        var pjson = require('./package.json');
        console.log(pjson.version)  
    })
program.parse()