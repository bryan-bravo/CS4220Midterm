//Patrick Flinner, Bryan Bravo, Gevorg K., Kevin Lam
//Midterm

const inquirer = require('inquirer'),
      url=require('calls'),
      catArray=['films','people','planets','species','starships','vehicles']

const choices=(choiceArray,message,name)=>{
    return inquirer.prompt([{
        type: 'list',
        message:message,
        name:name,
        choices:choiceArray,
        validate: (input) =>{
            return true
        }
    }])
}

const main = (id, term) => {
    let results=[];
    let selection='';
    let value='';
    
    if(!id && term){
        value=term
        selection='term'
    }
    else if(!term && id){
        selection='id'
        value=id;
    }
    
    choices(catArray,'Select a field to search','Catagories').then(res=>{
        url.info(selection,res.Catagories,value)
        .then(result =>{
            result.results.forEach(element=>{
                results.push(element)
            })
            if(results.length<1){
                console.log("No results were returned")
            }
            else{
                printSelection(res.Catagories,results)
            }
        })        
    })
}

const printSelection = (catagory,results) => {
    switch(catagory){
        case 'films':
            printFilm(results)
            break;
        case 'people':
            printPeople(results)
            break;
        case 'planets':
            printPlanets(results)
            break;
        case 'species':
            printSpecies(results)
            break;
        case 'starships':
            printStarships(results)
            break;
        case 'vehicles':
            printVehicles(results)
            break;
        default:
            console.log('Something went wrong with the request')
    }
}

const printFilm=(results)=>{
    console.log(results)
}

const printPeople=(results)=>{
    console.log(results)
}

const printPlanets=(results)=>{
    console.log(results)
}

const printSpecies=(results)=>{
    console.log(results)
}

const printStarships=(results)=>{
    console.log(results)
}

const printVehicles=(results)=>{
    console.log(results)
}

module.exports = {
    main
}