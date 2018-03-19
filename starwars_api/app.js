//Patrick Flinner, Bryan Bravo, Gevorg K., Kevin Lam
//Midterm

const inquirer = require('inquirer'),
      url=require('calls')

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
    
    catArray.forEach(category=>{
        url.info(selection,category,value)
        .then(result =>{
            results.push(result)
            console.log(result)
        })
    })
}

const print = (results) => {

}

const search = (url) => {

}

const catArray=['films','people','planets','species','starships','vehicles'];

module.exports = {
    main
}