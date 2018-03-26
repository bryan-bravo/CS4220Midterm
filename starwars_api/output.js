// Patrick Flinner, Bryan Bravo, Gevorg Khachatrian, Kevin Lam
// CS4220
// Midterm

const inquirer = require('inquirer'),
    url = require('calls'),
    chalk = require('chalk'),
    ora = require('ora'),
    outdent = require('outdent'),
    indentString = require('indent-string')

//Switch statement to send results to correct print function
const printSelection = (catagory, result) => {
    switch (catagory) {
        case 'films':
            printFilm(result)
            break
        case 'people':
            printPeople(result)
            break
        case 'planets':
            printPlanets(result)
            break
        case 'species':
            printSpecies(result)
            break
        case 'starships':
            printStarships(result)
            break
        case 'vehicles':
            printVehicles(result)
            break
        default:
            console.log('Something went wrong with the request')
    }
}

/* Below functions all work the same, but each has a different template*/
const printFilm = (result) => {
    let { title, episode_id, opening_crawl, director, producer, release_date, characters, planets, starships, vehicles, species } = result
    /*
        Sadly, the following arrays are returned as URLs, so we must resolve them before displaying.
        As each is an array of endpoint URLs, we remap them to be promises to fetch the URL data
    */
    
    characters = characters.map((charURL) => {
        return url.fetchURL(charURL)
    })
    planets = planets.map((planetURL) => {
        return url.fetchURL(planetURL)
    })
    starships = starships.map((starshipsURL) => {
        return url.fetchURL(starshipsURL)
    })
    vehicles = vehicles.map((mapURL) => {
        return url.fetchURL(mapURL)
    })
    species = species.map(speciesURL => {
        return url.fetchURL(speciesURL)
    })

    // Define a new array of promise arrays (an array of arrays of promises)
    const promiseArray = [characters, planets, starships, vehicles, species]

    // Show nice spinner while resolving this relative data
    const spinner = ora('Fetching detailed information...').start();

    /* 
        Overexplanation for the following Promise.all line:
        We map each element of this promise-array-array (which are each a promise-array), 
        calling Promise.all on each element. Thus, each of these promise-arrays are now represented
        by the single Promise.all.
        Now we have an array of promises (each element being a Promise.all statement for the previous arrays).
        We call Promise.all on this, to resolve all promises in all arrays.
        Then we return the results, containing the full data.
    */
    Promise.all(promiseArray.map(Promise.all, Promise)).then(([characters, planets, starships, vehicles, species]) => {
        spinner.stop()

        // Use outdent to remove leading whitespace
        // Not-ideal alternative would be to manually remove whitespace in our backticks, which would impact readability
        let information = outdent
            `
        ${chalk.bgBlue('Star Wars')}
        ${chalk.bgBlue('Episode ' + episode_id)}
        ${chalk.bgBlue(title)}
        
        ${chalk.cyan('Directed by:')} ${director}
        ${chalk.cyan('Produced by:')} ${producer}
        ${chalk.cyan('Released:')} ${release_date}
        
        ------------------------
        ${chalk.bgWhite.black('Notable Characters:')}
        ${characters.length == 0 ? `No Notable Characters` : `${characters.map((character) => { return character.name }).join('\r\n')}`}
        
        ------------------------
        ${chalk.bgWhite.black('Planets:')}
        ${planets.length == 0 ? `No Recorded Planets` : `${planets.map((planet) => { return planet.name }).join('\r\n')}`}
        
        ------------------------
        ${chalk.bgWhite.black('Ships and Vehicles:')}
        ${starships.length == 0 ? `No Notable Ships` : `${starships.map((starship) => { return starship.name }).join('\r\n')}`}
        ${vehicles.length == 0 ? `No Notable Vehicles` : `${vehicles.map((vehicle) => { return vehicle.name }).join('\r\n')}`}
        
        -----------------------
        ${chalk.bgWhite.black('Species in the movie:')}
        ${species.length == 0 ? `No Notable Species` : `${species.map((species) => { return species.name }).join('\r\n')}`}
        
        -----------------------
        ${chalk.bgWhite.black('Opening Crawl:')}
        ${opening_crawl}
        
        `
        // Since we used outdent, everything is already aligned on the first column
        // Use indentString to indent each line
        console.log(indentString(information, 8))
    })
}

// See comments for printFilm
const printPeople = (result) => {
    let { name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, homeworld, films, species, vehicles, starships } = result
    films = films.map((filmURL) => {
        return url.fetchURL(filmURL)
    })

    homeworldPr = []
    homeworldPr.push(url.fetchURL(homeworld))
    starships = starships.map((starshipsURL) => {
        return url.fetchURL(starshipsURL)
    })

    vehicles = vehicles.map((mapURL) => {
        return url.fetchURL(mapURL)
    })
    species = species.map(speciesURL => {
        return url.fetchURL(speciesURL)
    })
    const promiseArray = [films, homeworldPr, starships, vehicles, species]

    const spinner = ora('Fetching detailed information...').start();
    Promise.all(promiseArray.map(Promise.all, Promise)).then(([films, homeworld, starships, vehicles, species]) => {
        spinner.stop()
        let information = outdent
            `
        ${chalk.bgBlue(name)}
        ------------
        ${chalk.cyan('Height:')}  ${hair_color.length < 8 ? `${height} cm` : `${height} cm\t`}\t${chalk.cyan('Weight:')} ${mass} kg\t${chalk.cyan('Gender:')} ${gender}
        ${chalk.cyan('Hair:')} ${hair_color}\t${chalk.cyan('Eye:')} ${eye_color}\t${chalk.cyan('Skin:')} ${skin_color}
        ${chalk.cyan('Born:')} ${birth_year}
        ${chalk.cyan('Species:')} ${species.map(species => { return species.name }).join(', ')}
        ${chalk.cyan('Home World:')} ${homeworld.map(planet => { return planet.name }).join(', ')}

        ---------------------------------------------------------------
        ${chalk.bgWhite.black('Vehicles Used:')}
        ${starships.length == 0 ? `No Notable Ships` : `${starships.map((starship) => { return starship.name }).join('\r\n')}`}
        ${vehicles.length == 0 ? `No Notable Vehicles` : `${vehicles.map((vehicle) => { return vehicle.name }).join('\r\n')}`}
        
        ---------------------------------------------------------------
        ${chalk.bgWhite.black('Film Appearances:')}
        ${films.length == 0 ? `No Film Appearances` : `${films.map((film) => { return film.title }).join('\r\n')}`}
        `
        console.log(indentString(information, 8))
        console.log()
        console.log()
    })
}

// See comments for printFilm
const printPlanets = (result) => {
    let { name, rotation_period, orbital_period, diameter, climate, gravity, terrain, surface_water, population, residents, films } = result

    films = films.map((filmURL) => {
        return url.fetchURL(filmURL)
    })
    residents = residents.map(characterURL => {
        return url.fetchURL(characterURL)
    })
    const promiseArray = [films, residents]

    const spinner = ora('Fetching detailed information...').start();
    Promise.all(promiseArray.map(Promise.all, Promise)).then(([films, residents]) => {
        spinner.stop();
        let information = outdent
            `
    ${chalk.bgBlue(name)}
    ----------------------------------------------
    ${chalk.bgWhite.black('Characteristics:')}
    ${chalk.cyan('Day Length:')} ${rotation_period} Earth Hours
    ${chalk.cyan('Year Length:')} ${orbital_period} Earth Days
    ${chalk.cyan('Climate:')} ${climate} 
    ${chalk.cyan('Terrain:')} ${terrain}
    ${chalk.cyan('Water:')} ${surface_water}% Water 
    ${chalk.cyan('Planet Diameter:')} ${diameter} km
    ${chalk.cyan('Population:')} ${population} Citizens

    ----------------------------------------------
    ${chalk.bgWhite.black('Notable Residents:')}
    ${residents.length == 0 ? `No Notable Residents Reside on ${name}` : `${residents.map((character) => { return character.name }).join('\r\n')}`}

    ----------------------------------------------
    ${chalk.bgWhite.black('Film Appearances:')}
    ${films.length == 0 ? `No Film Appearances` : `${films.map((film) => { return film.title }).join('\r\n')}`}

    `
        console.log(indentString(information, 8))
    })
}

// See comments for printFilm
const printSpecies = (result) => {

    let { name, classification, designation, average_height, skin_colors, hair_colors, eye_colors, average_lifespan, homeworld, language, people, films } = result

    people = people.map((peopleURL) => {
        return url.fetchURL(peopleURL)
    })
    films = films.map((filmURL) => {
        return url.fetchURL(filmURL)
    })


    homeworldPr = []
    homeworldPr.push(url.fetchURL(homeworld))

    const promiseArray = [homeworldPr, people, films]



    const spinner = ora('Fetching detailed information...').start();
    Promise.all(promiseArray.map(Promise.all, Promise)).then(([homeworld, people, films]) => {
        spinner.stop()

        let information = outdent
            `
        ${chalk.bgBlue(name)}
        ----------------------------
        ${chalk.bgWhite.black('Statistics:')}
        ${chalk.cyan('Avg. Height:')}   ${average_height}
        ${chalk.cyan('Avg. LifeSpan:')} ${average_lifespan}

        ----------------------------
        ${chalk.bgWhite.black('Colorings:')}
        ${chalk.cyan('Skin Colors:')} ${skin_colors}
        ${chalk.cyan('Hair Colors:')} ${hair_colors}
        ${chalk.cyan('Eye  Colors:')} ${eye_colors}

        ----------------------------
        ${chalk.bgWhite.black('World:')}
        ${homeworld.map(planet => { return planet.name }).join(', ')}
        ${chalk.cyan('Language:')} ${language}

        ----------------------------
        ${chalk.bgWhite.black('Taxonomy:')}
        ${chalk.cyan('Designation:')} ${designation}
        ${chalk.cyan('Classification:')} ${classification}

        ----------------------------------------------
        ${chalk.bgWhite.black('Notable Characters:')}
        ${people.length == 0 ? `No Notable Characters` : `${people.map((person) => { return person.name }).join('\r\n')}`}
        
        -------------------------
        ${chalk.bgWhite.black('Film Appearances:')}
        ${films.length == 0 ? `No Film Appearances` : `${films.map((movie) => { return movie.title }).join('\r\n')}`}
        `
        console.log(indentString(information, 8))
    })
}

// See comments for printFilm
const printStarships = (result) => {
    let { name, model, manufacturer, cost_in_credits, length, max_atmosphering_speed, crew, passengers, cargo_capacity,
        consumables, hyperdrive_rating, MGLT, starship_class, pilots, films } = result

    films = films.map((filmURL) => {
        return url.fetchURL(filmURL)
    })

    pilots = pilots.map((pilotURL) => {
        return url.fetchURL(pilotURL)
    })

    const promiseArray = [films, pilots]

    const spinner = ora('Fetching detailed information...').start();
    Promise.all(promiseArray.map(Promise.all, Promise)).then(([films, pilots]) => {
        spinner.stop()

        let information = outdent
            `
        ${chalk.bgBlue(name)}
         
        ${chalk.cyan('Model:')} ${model}
        ${chalk.cyan('Manufacturer:')} ${manufacturer}
        ${chalk.cyan('Price:')} ${cost_in_credits} Credits
        ${chalk.cyan('Starship Class:')} ${starship_class}
        
        -------------------------
        ${chalk.bgWhite.black('Specifications:')}
        It can support a crew of ${crew} and can carry ${passengers} passengers
        Atmospheric Speed is ${max_atmosphering_speed} and is ${length} meters long
        ${chalk.cyan('Hyperdrive Rating:')} ${hyperdrive_rating}
        ${chalk.cyan('MegaLight Speed:')} ${MGLT}
        
        -------------------------
        ${chalk.bgWhite.black('Film Appearances:')}
        ${films.length == 0 ? `No Film Appearances` : `${films.map((movie) => { return movie.title }).join('\r\n')}`}
        
        -------------------------
        ${chalk.bgWhite.black('Famous Pilots:')}
        ${pilots.length == 0 ? `No famous pilots have used the ${name}` : `${pilots.map((pilot) => { return pilot.name }).join('\r\n')}`}
    
        `
        console.log(indentString(information, 8))
    })
}

// See comments for printFilm
const printVehicles = (result) => {
    let { name, model, manufacturer, cost_in_credits, length, max_atmosphering_speed, crew, passengers, cargo_capacity,
        consumables, vehicle_class, pilots, films } = result

    films = films.map((filmURL) => {
        return url.fetchURL(filmURL)
    })

    pilots = pilots.map((pilotURL) => {
        return url.fetchURL(pilotURL)
    })

    const promiseArray = [films, pilots]

    const spinner = ora('Fetching detailed information...').start();
    Promise.all(promiseArray.map(Promise.all, Promise)).then(([films, pilots]) => {
        spinner.stop()

        let information = outdent
            `
        ${chalk.bgBlue(name)}
         
        ${chalk.cyan('Model:')} ${model}
        ${chalk.cyan('Manufacturer:')} ${manufacturer}
        ${chalk.cyan('Price:')} ${cost_in_credits} Credits
        ${chalk.cyan('Vehicle Class:')} ${vehicle_class}
        
        -------------------------
        ${chalk.bgWhite.black('Specifications:')}
        It can support a crew of ${crew} and can carry ${passengers} passengers
        Atmospheric Speed is ${max_atmosphering_speed} and is ${length} meters long
        
        -------------------------
        ${chalk.bgWhite.black('Film Appearances:')}
        ${chalk.bgWhite.black('Film Appreances:')}
        ${films.length == 0 ? `No Film Appearances` : `${films.map((movie) => { return movie.title }).join('\r\n')}`}
        
        -------------------------
        ${chalk.bgWhite.black('Famous Pilots:')}
        ${pilots.length == 0 ? `No famous pilots have used the ${name}` : `${pilots.map((pilot) => { return pilot.name }).join('\r\n')}`}

        `
        console.log(indentString(information, 8))
    })
}

module.exports = {
    printSelection
}