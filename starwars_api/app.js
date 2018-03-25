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

const search = (query) => {
    url.fetchURL(categoryURL).then(result => {
        let catArray = Object.keys(result)

        let results = [];
        choicesList(catArray, 'Select a field to search', 'Catagories').then(res => {
            url.search(res.Catagories, query)
                .then(result => {
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
                        choicesCheckbox(nameList, 'Select what to examine in detail', 'Selection')
                            .then(result => {
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

const fetch = (id) => {
    url.fetchURL(categoryURL).then(result => {
        let catArray = Object.keys(result)

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