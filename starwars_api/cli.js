const
    app = require('./app'),
    yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: 'give a search term',
        builder: (yargs) => {
            return yargs.option('i', {
                alias: 'id',
                describe: 'search using a id number'
            }).option('t', {
                alias: 'term',
                describe: 'search using a term'
            })
        },
        handler: (argv) => { app.main(argv.id,argv.term) }
    })
    .help('help')
    .argv