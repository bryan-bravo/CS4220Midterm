// Patrick Flinner, Bryan Bravo, Gevorg Khachatrian, Kevin Lam
// CS4220
// Midterm

const inquirer = require('inquirer'),
    url = require('calls'),
    chalk = require('chalk'),
    ora = require('ora'),
    output = require('./output'),
    categoryURL = 'https://swapi.co/api/'
    //catArray = ['films', 'people', 'planets', 'species', 'starships', 'vehicles']


//Creates inquire prompts 
const choicesList = (choiceArray, message, name) => {
    return inquirer.prompt([{
        type: 'list',
        message: message,
        name: name,
        choices: choiceArray,
        validate: (input) => {
            return true
        }
    }])
}

const choicesCheckbox = (choiceArray, message, name) => {
    return inquirer.prompt([{
        type: 'checkbox',
        message: message,
        name: name,
        choices: choiceArray,
        validate: (input) => {
            if (input.length < 1)
                console.log('Please select at least one option')
            else
                return true
        }
    }])
}

const main = (type, query) => {
    // type is either "SEARCH" or "FETCH"
    // query is either search query or id to fetch
    if (!type && !query) {
        console.log("Bad parameters.")
        return;
    }
    if (type == "SEARCH") {
        if (query) {
            search(query)
        } else {
            // should normally provide query in cli but for the future, prompt for query if not provided
            inquirer.prompt([{
                type: 'input',
                name: 'search_term',
                message: 'Enter a term to search for.',
                validate: (input) => {
                    if (input.length < 1)
                        console.log('Please enter a term to search for. (Cannot be blank)')
                    else
                        return true
                }
            }]).then(answer => {
                search(answer['search_term'])
            })
        }
    } else if (type == "FETCH") {
        fetch(query)
    }
}

//Begins the process of finding search results
const search = (query) => {
    
    //Dynamically gather the categories to search from
    url.fetchURL(categoryURL).then(result => {
        let catArray = Object.keys(result)

        let results = [];

        //Sends the categories to a inquire list prompt
        choicesList(catArray, 'Select a field to search', 'Catagories').then(res => {

            //Searches based off the selected category
            url.search(res.Catagories, query)
                .then(result => {
                    //Creates two arrays. One with the results, and one with just the name
                    result.results.forEach(element => {
                        results.push(element)
                    })
                    if (results.length < 1) {
                        console.log("No results were returned")
                    } else {
                        let nameList = []
                        let resultList = []

                        results.forEach(element => {
                            if (res.Catagories == 'films')
                                nameList.push(element.title)
                            else
                                nameList.push(element.name)
                        })

                        //Passes the result names to the checkbox prompt
                        choicesCheckbox(nameList, 'Select what to examine in detail', 'Selection')
                            .then(result => {

                                //Reduces the choices to the selected results and sends it to be printed
                                if (res.Catagories == 'films')
                                    resultList = reduceChoicesFilm(results, result.Selection)
                                else
                                    resultList = reduceChoices(results, result.Selection)
                                resultList.forEach(element => {
                                    output.printSelection(res.Catagories, element)
                                })
                            })
                    }
                })
        })
    })
}

//Fetches a result using an id
const fetch = (id) => {
    //Dynamically creates the category array
    url.fetchURL(categoryURL).then(result => {
        let catArray = Object.keys(result)

        //User selects what to find and then it is sent to the print function
        choicesList(catArray, 'Select a field to search', 'Catagories').then(res => {
            url.fetch(res.Catagories, id)
                .then(result => {
                    if (result.detail == 'Not found')
                        console.log("No Results Were Found")
                    else {
                        output.printSelection(res.Catagories, result)
                    }
                })
        })
    })
}


//Reduces the choices for everything but films
const reduceChoices = (current, reduce) => {
    let reducedList = []
    reduce.forEach(element => {
        index = current.findIndex(remove => {
            return (element === remove.name)
        })
        if (index != -1) {
            reducedList.push(current[index])
        }
    })
    return reducedList
}

const reduceChoicesFilm = (current, reduce) => {
    let reducedList = []
    reduce.forEach(element => {
        index = current.findIndex(remove => {
            return (element === remove.title)
        })
        if (index != -1) {
            reducedList.push(current[index])
        }
    })
    return reducedList
}

module.exports = {
    main
}