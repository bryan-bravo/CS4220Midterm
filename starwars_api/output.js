const url = require('calls');

const parse = (result, category) => {
    if (category == 'films') {
        let grossArrayOfPromiseArrays = [];
        let peopleReqs = [],
            vehicleReqs = [],
            starShipsReqs = [],
            speciesReqs = [],
            planetsReqs = [];
        result.characters.forEach(characterUrl => {peopleReqs.push(url.link(characterUrl))});
        result.vehicles.forEach(vehicleUrl => vehicleReqs.push(url.link(vehicleUrl)));
        result.starships.forEach(starShipUrl => starShipsReqs.push(url.link(starShipUrl)));
        result.species.forEach(speciesUrl => speciesReqs.push(url.link(speciesUrl)));
        result.planets.forEach(planetUrl => planetsReqs.push(url.link(planetUrl)));

        grossArrayOfPromiseArrays.push(peopleReqs, vehicleReqs, starShipsReqs, speciesReqs, planetsReqs );

        const promiseForAll = Promise.all(
            grossArrayOfPromiseArrays.map(function (innerPromiseArray) {
                return Promise.all(innerPromiseArray);
            })
        );
        promiseForAll.then(results => {
            results.forEach(arrayOfCategory => {
                arrayOfCategory.forEach(itemInCategory => {
                    if (itemInCategory.url.includes('people')) {
                        result.characters.pop();
                        result.characters.unshift(itemInCategory.name)
                    } else if (itemInCategory.url.includes('vehicles')) {
                        result.vehicles.pop();
                        result.vehicles.unshift(itemInCategory.name)
                    } else if (itemInCategory.url.includes('starships')) {
                        result.starships.pop();
                        result.starships.unshift(itemInCategory.name)
                    } else if (itemInCategory.url.includes('species')) {
                        result.species.pop();
                        result.species.unshift(itemInCategory.name)
                    } else if (itemInCategory.url.includes('planets')) {
                        result.planets.pop();
                        result.planets.unshift(itemInCategory.name)
                    }
                });
            });
            printFilm(result)
        });
    } else if (category == 'people') {
        let grossArrayOfPromiseArrays = [];
        let filmReqs = [],
            vehicleReqs = [],
            starShipsReqs = [],
            speciesReqs = [],
            homeWorldReqs = [];
        result.films.forEach(filmUrl => filmReqs.push(url.link(filmUrl)));
        result.vehicles.forEach(vehicleUrl => vehicleReqs.push(url.link(vehicleUrl)));
        result.starships.forEach(starShipUrl => starShipsReqs.push(url.link(starShipUrl)));
        result.species.forEach(speciesUrl => speciesReqs.push(url.link(speciesUrl)));
        homeWorldReqs.push(url.link(result.homeworld));

        grossArrayOfPromiseArrays.push(filmReqs, vehicleReqs, starShipsReqs, speciesReqs, homeWorldReqs);

        const promiseForAll = Promise.all(
            grossArrayOfPromiseArrays.map(function (innerPromiseArray) {
                return Promise.all(innerPromiseArray);
            })
        );
        promiseForAll.then(results => {
            results.forEach(arrayOfCategory => {
                arrayOfCategory.forEach(itemInCategory => {
                    if (itemInCategory.url.includes('films')) {
                        result.films.pop();
                        result.films.unshift(itemInCategory.title)
                    } else if (itemInCategory.url.includes('vehicles')) {
                        result.vehicles.pop();
                        result.vehicles.unshift(itemInCategory.name)
                    } else if (itemInCategory.url.includes('starships')) {
                        result.starships.pop();
                        result.starships.unshift(itemInCategory.name)
                    } else if (itemInCategory.url.includes('species')) {
                        result.species.pop();
                        result.species.unshift(itemInCategory.name)
                    } else if (itemInCategory.url.includes('planets')) {
                        result.homeworld = itemInCategory.name;
                    }
                });
            });
            printPeople(result)
        });
    } else if (category == 'planets') {
        let grossArrayOfPromiseArrays = [];
        let filmReqs = [],
            peopleReqs = [];
        result.films.forEach(filmUrl => filmReqs.push(url.link(filmUrl)));
        result.residents.forEach(peopleUrl => peopleReqs.push(url.link(peopleUrl)));

        grossArrayOfPromiseArrays.push(filmReqs, peopleReqs);

        const promiseForAll = Promise.all(
            grossArrayOfPromiseArrays.map(function (innerPromiseArray) {
                return Promise.all(innerPromiseArray);
            })
        );
        promiseForAll.then(results => {
            results.forEach(arrayOfCategory => {
                arrayOfCategory.forEach(itemInCategory => {
                    if (itemInCategory.url.includes('films')) {
                        result.films.pop();
                        result.films.unshift(itemInCategory.title)
                    } else if (itemInCategory.url.includes('people')) {
                        result.residents.pop();
                        result.residents.unshift(itemInCategory.name)
                    }
                });
            });
            printPlanets(result)
        });
    } else if (category == 'species') {
        let grossArrayOfPromiseArrays = [];
        let filmReqs = [],
            peopleReqs = [],
            homeWorldReqs = [];
        result.films.forEach(filmUrl => filmReqs.push(url.link(filmUrl)));
        result.people.forEach(peopleUrl => peopleReqs.push(url.link(peopleUrl)));
        homeWorldReqs.push(url.link(result.homeworld));

        grossArrayOfPromiseArrays.push(filmReqs, peopleReqs, homeWorldReqs);

        const promiseForAll = Promise.all(
            grossArrayOfPromiseArrays.map(function (innerPromiseArray) {
                return Promise.all(innerPromiseArray);
            })
        );
        promiseForAll.then(results => {
            results.forEach(arrayOfCategory => {
                arrayOfCategory.forEach(itemInCategory => {
                    if (itemInCategory.url.includes('films')) {
                        result.films.pop();
                        result.films.unshift(itemInCategory.title)
                    } else if (itemInCategory.url.includes('people')) {
                        result.people.pop();
                        result.people.unshift(itemInCategory.name)
                    } else if (itemInCategory.url.includes('planets')) {
                        result.homeworld = itemInCategory.name;
                    }
                });
            });
            printSpecies(result)
        });
    } else if (category == 'vehicles' || category == 'starships') {
        let grossArrayOfPromiseArrays = [];
        let filmReqs = [],
            peopleReqs = [];
        result.films.forEach(filmUrl => filmReqs.push(url.link(filmUrl)));
        result.pilots.forEach(peopleUrl => peopleReqs.push(url.link(peopleUrl)));

        grossArrayOfPromiseArrays.push(filmReqs, peopleReqs);

        const promiseForAll = Promise.all(
            grossArrayOfPromiseArrays.map(function (innerPromiseArray) {
                return Promise.all(innerPromiseArray);
            })
        );
        promiseForAll.then(results => {
            results.forEach(arrayOfCategory => {
                arrayOfCategory.forEach(itemInCategory => {
                    if (itemInCategory.url.includes('films')) {
                        result.films.pop();
                        result.films.unshift(itemInCategory.title);
                    } else if (itemInCategory.url.includes('people')) {
                        result.pilots.pop();
                        result.pilots.unshift(itemInCategory.name);
                    }
                });
            });
            if (category == 'vehicles')
                printVehicles(result);
            else
                printStarships(result);
        });
    } else {}
}

const printFilm = (result) => {
    let {
        title,
        episode_id,
        opening_crawl,
        director,
        producer,
        release_date,
        characters,
        planets,
        starships,
        vehicles,
        species
    } = result
    let information =
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

const printPeople = (result) => {
    let {
        name,
        height,
        mass,
        hair_color,
        skin_color,
        eye_color,
        birth_year,
        gender,
        homeworld,
        films,
        species,
        vehicles,
        starships
    } = result

    let information =
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

const printPlanets = (result) => {
    let {
        name,
        rotation_period,
        orbital_period,
        diameter,
        climate,
        gravity,
        terrain,
        surface_water,
        population,
        residents,
        films
    } = result

    let information =
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

const printSpecies = (result) => {
    let {
        name,
        classification,
        designation,
        average_height,
        skin_colors,
        hair_colors,
        eye_colors,
        average_lifespan,
        homeworld,
        language,
        people,
        films
    } = result

    let information =
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

const printStarships = (result) => {
    let {
        name,
        model,
        manufacturer,
        cost_in_credits,
        length,
        max_atmosphering_speed,
        crew,
        passengers,
        cargo_capacity,
        consumables,
        hyperdrive_rating,
        MGLT,
        starship_class,
        pilots,
        films
    } = result

    let information =
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

const printVehicles = (result) => {
    let {
        name,
        model,
        manufacturer,
        cost_in_credits,
        length,
        max_atmosphering_speed,
        crew,
        passengers,
        cargo_capacity,
        consumables,
        vehicle_class,
        pilots,
        films
    } = result

    let information =
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
    parse
}