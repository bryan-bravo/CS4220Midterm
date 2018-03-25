const inquirer = require('inquirer'),
    url = require('calls'),
    chalk = require('chalk'),
    ora = require('ora'),
    outdent = require('outdent'),
    indentString = require('indent-string')

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

const printFilm = (result) => {
    let { title, episode_id, opening_crawl, director, producer, release_date, characters, planets, starships, vehicles, species } = result
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
    const promiseArray = [characters, planets, starships, vehicles, species]

    const spinner = ora('Fetching detailed information...').start();
    Promise.all(promiseArray.map(Promise.all, Promise)).then(([characters, planets, starships, vehicles, species]) => {
        spinner.stop()

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
        console.log(indentString(information, 8))
    })



}

const printPeople = (result) => {
    let { name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, homeworld, films, species, vehicles, starships } = result
    films = films.map((filmURL) => {
        return url.fetchURL(filmURL)
    })

    // homeworld = url.fetchURL(homeworld)
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
    ${residents.length == 0 ? `No Notable Residents Reside on ${name}` : `${residents.map((character) => { return character.name }).join('\r\n')}`}

    ----------------------------------------------
    Film Appearances:
    ${films.length == 0 ? `No Film Appearances` : `${films.map((film) => { return film.title }).join('\r\n')}`}

    `
        console.log(indentString(information, 8))
    })
}

const printSpecies = (result) => {

    let { name, classification, designation, average_height, skin_colors, hair_colors, eye_colors, average_lifespan, homeworld, language, people, films } = result
    // homeworld = homeworld.map((homeURL) => {
    //     return url.fetchURL(homeURL)
    // })
    people = people.map((peopleURL) => {
        return url.fetchURL(peopleURL)
    })
    films = films.map((filmURL) => {
        return url.fetchURL(filmURL)
    })


    homeworldPr = []
    homeworldPr.push(url.link(homeworld))

    const promiseArray = [homeworldPr, people, films]



    const spinner = ora('Fetching detailed information...').start();
    Promise.all(promiseArray.map(Promise.all, Promise)).then(([homeworld, people, films]) => {
        spinner.stop()

        let information = outdent
            `
        ${chalk.bgBlue(name)}
        ----------------------------
        ${chalk.bgWhite.black('Statistics:')}
        Avg. Height:   ${average_height}
        Avg. LifeSpan: ${average_lifespan}

        ----------------------------
        ${chalk.bgWhite.black('Colorings:')}
        Skin Colors: ${skin_colors}
        Hair Colors: ${hair_colors}
        Eye  Colors: ${eye_colors}

        ----------------------------
        ${chalk.bgWhite.black('World:')}
        ${homeworld.map(planet => { return planet.name }).join(', ')}
        Language: ${language}

        ----------------------------
        ${chalk.bgWhite.black('Taxonomy:')}
        Designation: ${designation}
        Classification: ${classification}

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
         
        Model: ${model}
        Manufacturer: ${manufacturer}
        Price: ${cost_in_credits} Credits
        Starship Class: ${starship_class}
        
        -------------------------
        ${chalk.bgWhite.black('Specifications:')}
        It can support a crew of ${crew} and can carry ${passengers} passengers
        Atmospheric Speed is ${max_atmosphering_speed} and is ${length} meters long
        Hyperdrive Rating: ${hyperdrive_rating}
        MegaLight Speed: ${MGLT}
        
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
         
        Model: ${model}
        Manufacturer: ${manufacturer}
        Price: ${cost_in_credits} Credits
        Vehicle Class: ${vehicle_class}
        
        -------------------------
        ${chalk.bgWhite.black('Specifications:')}
        It can support a crew of ${crew} and can carry ${passengers} passengers
        Atmospheric Speed is ${max_atmosphering_speed} and is ${length} meters long
        
        -------------------------
        Film Appearances:
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