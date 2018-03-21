//Patrick Flinner, Bryan Bravo, Gevorg K., Kevin Lam
//Midterm

const inquirer = require('inquirer'),
      url=require('calls')

const choices=()=>{
    return inquirer.prompt([{
        type: 'list',
        message:'Select a field to search',
        name:'Catagories',
        choices:catArray,
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
    
    choices().then(res=>{
        url.info(selection,res.Catagories,value)
        .then(result =>{
            result.results.forEach(element=>{
                results.push(element)
            })
            print(results)
        })
        
    // })
    // catArray.forEach(category=>{
    //     url.info(selection,category,value)
    //     .then(result =>{
    //         results.push(result)
    //         console.log(result)
    //     })
    })
}

const print = (results) => {
    console.log(results)
}

const search = (url) => {

}

const catArray=['films','people','planets','species','starships','vehicles'];

module.exports = {
    main
}