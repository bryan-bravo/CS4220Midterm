const
    app = require('./app'),
    yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search <query>',
        desc: 'Search for query',
        handler: (argv) => { 
            app.main("SEARCH", argv.query) 
        }
    })
    .command({
        command: 'fetch <id>',
        desc:'Fetch data using an id number',
        handler: (argv) => { 
            app.main("FETCH", argv.id) 
        }
    })
    .showHelpOnFail(true)
    .demandCommand(1, '') // show help if no commands given
    .help('help')
    .argv