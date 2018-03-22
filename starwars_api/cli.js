const
    app = require('./app'),
    yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: 'Search using a term',
        builder: (yargs) => {
            return yargs.option('t', {
                alias: 'term',
                describe: 'search using a term'
            })
            // .demandOption('t')
        },
        handler: (argv) => { app.main(false,argv.term) }
    })
    .command({
        command: 'fetch',
        desc:'Fetch data using an id number',
        builder: (yargs)=>{
            return yargs.option('i',{
                alias:'id',
                describe: 'fetch data using an id number'
            })
        },
        handler: (argv) => {app.main(argv.id,false)}
    })
    .showHelpOnFail(true)
    .demandCommand(1, '') // show help if no commands given
    .help('help')
    .argv