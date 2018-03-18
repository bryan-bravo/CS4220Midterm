const
    app = require('./app'),
    yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: 'give a search term',
        builder: (yargs) => {
            return yargs.option('f', {
                alias: 'films',
                describe: 'searchs within films'
            }).option('ppl', {
                alias: 'people',
                describe: 'searches within people'
            }).option('pl',{
                alias:'planets',
                describe: 'searches within planets'
            }).option('sp',{
                alias:'species',
                describe:'searches within species'
            }).option('st',{
                alias:'starships',
                describe:'searches within starships'
            }).option('v',{
                alias:'vehicles',
                describe:'searches within vehicles'
            })
        },
        handler: (argv) => { app.search(argv.films,argv.people,argv.planets,argv.species,argv.starships,argv.vehicles) }
    })
    .command({
        command: 'id',
        desc: 'search using an identification number',
        builder:(yargs)=>{
            return yargs.option('f', {
                alias: 'films',
                describe: 'searchs within films'
            }).option('ppl', {
                alias: 'people',
                describe: 'searches within people'
            }).option('pl',{
                alias:'planets',
                describe: 'searches within planets'
            }).option('sp',{
                alias:'species',
                describe:'searches within species'
            }).option('st',{
                alias:'starships',
                describe:'searches within starships'
            }).option('v',{
                alias:'vehicles',
                describe:'searches within vehicles'
            })
        },
        handler:(argv) =>{ app.searchID(argv.films,argv.people,argv.planets,argv.species,argv.starships,argv.vehicles)}
    })
    .help('help')
    .argv