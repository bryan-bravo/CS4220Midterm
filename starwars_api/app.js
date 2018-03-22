//Patrick Flinner, Bryan Bravo, Gevorg K., Kevin Lam
//Midterm

const inquirer = require('inquirer'),
      url=require('calls'),
      catArray=['films','people','planets','species','starships','vehicles']

const choicesList=(choiceArray,message,name)=>{
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

const choicesCheckbox=(choiceArray,message,name)=>{
    return inquirer.prompt([{
        type: 'checkbox',
        message:message,
        name:name,
        choices:choiceArray,
        validate: (input) =>{
            if(input.length<1)
                console.log('Please select at least one option')
            else
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
    
    choicesList(catArray,'Select a field to search','Catagories').then(res=>{
        url.info(selection,res.Catagories,value)
        .then(result =>{
            result.results.forEach(element=>{
                results.push(element)
            })
            if(results.length<1){
                console.log("No results were returned")
            }
            else{
                let nameList=[]
                let resultList=[]
                
                results.forEach(element=>{
                    if(res.Catagories=='films')
                        nameList.push(element.title)    
                    else
                        nameList.push(element.name)
                })
                choicesCheckbox(nameList,'Select what to examine in detail','Selection')
                .then(result=>{
                    if(res.Catagories=='films')
                        resultList=reduceChoicesFilm(results,result.Selection)
                    else
                        resultList=reduceChoices(results,result.Selection)
                    printSelection(res.Catagories,resultList)    
                })
            }
        })        
    })
}

const reduceChoices=(current,reduce)=>{
    let reducedList=[]
    reduce.forEach(element=>{
        index=current.findIndex(remove=>{
            return (element===remove.name)
        })
        if(index!=-1){
            reducedList.push(current[index])
        }
    })
    return reducedList
}

const reduceChoicesFilm=(current,reduce)=>{
    let reducedList=[]
    reduce.forEach(element=>{
        index=current.findIndex(remove=>{
            return (element===remove.title)
        })
        if(index!=-1){
            reducedList.push(current[index])
        }
    })
    return reducedList
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
${characters.length==0 ? `No Notable Characters` : `${characters}`}

------------------------
Planets:
${planets.length==0 ? `No Recorded Planets` :`${planets}` }

------------------------
Ships and Vehicles:
${starships.length==0 ? `No Notable Ships` :`${starships}` }
${vehicles.length==0 ? `No Notable Vehicles` : `${vehicles}`}

-----------------------
Species in the movie:
${species.length==0 ? `No Notable Species` : `${species}` }

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
    ${name}
    ------------
    Height:  ${hair_color.length < 8 ? `${height} cm` : `${height} cm\t`}\tWeight: ${mass} kg\tGender: ${gender}
    Hair:    ${hair_color}\tEye: ${eye_color}\tSkin: ${skin_color}
    Born:    ${birth_year}
    Species: ${species}
    Home World: ${homeworld}

    ---------------------------------------------------------------
    Vehicles Used:
    ${starships.length==0 ? `No Notable Ships` :`${starships}` }
    ${vehicles.length==0 ? `No Notable Vehicles` : `${vehicles}`}
    ---------------------------------------------------------------
    Film Appearances:
    ${films.length==0 ? `No Film Appearances` : `${films}`}

    `
    console.log(information)
}

const printPlanets=(result)=>{
    let {name,rotation_period,orbital_period,diameter,climate,gravity,terrain,surface_water,population,residents,films}=result

    let information=
    `
    ${name}
    ----------------------------------------------
    Characteristics:

    Day Length: ${rotation_period} Earth Hours
    Year Length:${orbital_period} Earth Days
    Climate: ${climate} 
    Terrain: ${terrain}
    Water: ${surface_water}% Water 
    Planet Diameter: ${diameter} km
    Population: ${population} Citizens

    ----------------------------------------------
    Notable Residents:

    ${residents.length==0 ? `No Notable Residents Reside on ${name}` : `${residents}`}

    ----------------------------------------------
    Film Appearances:
    
    ${films.length==0 ? `No Film Appearances` : `${films}`}

    `
    console.log(information)
}

const printSpecies=(result)=>{
    let {name,classification,designation,average_height,skin_colors,hair_colors,eye_colors,average_lifespan,homeworld,language,people,films}=result
    
    let information=
    `
    ${name}
    ----------------------------
    Statistics

    Avg. Height:   ${average_height}
    Avg. LifeSpan: ${average_lifespan}
    ----------------------------
    Colorings

    Skin Colors: ${skin_colors}
    Hair Colors: ${hair_colors}
    Eye  Colors: ${eye_colors}
    ----------------------------
    World

    Home World: ${homeworld}
    Language: ${language}
    ----------------------------
    Taxonomy
    
    Designation: ${designation}
    Classification: ${classification}
    ----------------------------------------------
    Notable Characters:

    ${people.length==0 ? `No Notable Characters are ${name}` : `${people}`}
    -------------------------
    Film Appearances:

    ${films.length==0 ? `No Film Appearances` : `${films}`}
    `
    console.log(information)
}

const printStarships=(result)=>{
    let {name,model,manufacturer,cost_in_credits,length,max_atmosphering_speed,crew,passengers,cargo_capacity,
        consumables,hyperdrive_rating,MGLT,starship_class,pilots,films}=result
    
        let information=
        `
        ${name}
         
        Model: ${model}
        Manufacturer: ${manufacturer}
        Price: ${cost_in_credits} Credits
        Starship Class: ${starship_class}
        -------------------------
        Specifications:
        It can support a crew of ${crew} and can carry ${passengers} passengers
        Atmospheric Speed is ${max_atmosphering_speed} and is ${length} meters long
        Hyperdrive Rating: ${hyperdrive_rating}
        MegaLight Speed: ${MGLT}
        -------------------------
        Film Appearances:
        ${films.length==0 ? `No Film Appearances` : `${films}`}
        -------------------------
        Famous Pilots:
        ${pilots.length==0 ? `No famous pilots have used  the ${name}` : `${pilots}`}
    
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
    Film Appearances:
    ${films.length==0 ? `No Film Appearances` : `${films}`}
    -------------------------
    Famous Pilots:
    ${pilots.length==0 ? `No Famous Pilots Have Used the ${name}` : `${pilots}`}

    `
    console.log(information)
}

module.exports = {
    main
}