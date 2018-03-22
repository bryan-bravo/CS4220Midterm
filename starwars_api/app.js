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
            results.forEach(element=>{
                printFilm(element)
            })
        break;
        case 'people':
            results.forEach(element=>{
                printPeople(element)
            })
        break;
        case 'planets':
            results.forEach(element=>{
                printPlanets(element)
            })
            break;
        case 'species':
            results.forEach(element=>{
                printSpecies(element)
            })
            break;
        case 'starships':
            results.forEach(element=>{
                printStarships(element)
            })
        break;
        case 'vehicles':
            results.forEach(element=>{
                printVehicles(element)
            })
            break;
        default:
            console.log('Something went wrong with the request')
    }
}

const printFilm=(result)=>{
    let {title,episode_id,opening_crawl,director,producer,release_date,characters,planets,starships,vehicles,species}=result
    let information=
`
Star Wars 
Episode ${episode_id}
${title}

Directed by: ${director}
Produced by: ${producer}

Released: ${release_date}

------------------------
Notable Characters:
${characters}

------------------------
Planets:
${planets}

------------------------
Ships and Vehicles:
${starships}
${vehicles}

-----------------------
Species in the movie:
${species}

-----------------------
Extras:

${opening_crawl}
    `
    console.log(information)
}

const printPeople=(result)=>{
    let {name,height,mass,hair_color,skin_color,eye_color,birth_year,gender,homeworld,films,species,vehicles,starships}=result
    let information=
    `
    `
    console.log(information)
}

const printPlanets=(result)=>{
    let {name,rotation_period,orbital_period,diameter,climate,gravity,terrain,surface_water,population,residents,films}=result

    let information=
    `
    `
    console.log(information)
}

const printSpecies=(result)=>{
    let {name,classification,designation,average_height,skin_colors,hair_colors,eye_colors,average_lifespan,homeworld,language,people,films}=result
    
    let information=
    `
    `
    console.log(information)
}

const printStarships=(result)=>{
    let {name,model,manufacturer,cost_in_credits,length,max_atmosphering_speed,crew,passengers,cargo_capacity,
        consumables,hyperdrive_rating,MGLT,starship_class,pilots,films}=result
    
        let information=
        `
        `
        console.log(information)
}

const printVehicles=(result)=>{
    let {name,model,manufacturer,cost_in_credits,length,max_atmosphering_speed,crew,passengers,cargo_capacity,
    consumables,vehicle_class,pilots,films}=result
    
    let information=
    `
    ${name}
         
    Model: ${model}
    Manufacturer: ${manufacturer}
    Price: ${cost_in_credits} Credits
    Vehicle Class: ${vehicle_class}
    -------------------------
    Specifications:
    It can support a crew of ${crew} and can carry ${passengers} passengers
    Atmospheric Speed is ${max_atmosphering_speed} and is ${length} meters long
    -------------------------
    Films:
    ${films}
    -------------------------
    Famous Pilots:
    ${pilots}
    `
    console.log(information)
}

module.exports = {
    main
}