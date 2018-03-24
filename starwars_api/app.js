//Patrick Flinner, Bryan Bravo, Gevorg K., Kevin Lam
//Midterm

const inquirer = require('inquirer'),
    url = require('calls'),
    output = require('./output'),

    categories = ['films', 'people', 'planets', 'species', 'starships', 'vehicles'];
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
//get input from the cli, pass to search function
const main = (id, term) => {

    //term is search term
    if (!id && term) {
        search('term', term)
    }
    //id
    else if (!term && id) {
        fetch('id', id)
        //neither
    } else if (!term && !id) {
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
            search('term', answer['search_term'])
        })
    }


}
//only for term search
const search = (selection, value) => {
    let results = [];
    //prompt the user what category they want to search
    choicesList(categories, 'Select a field to search', 'Catagories')
        .then(res => {
            //makes the request
            url.info(selection, res.Catagories, value)
                .then(result => {
                    result.results.forEach(element => {
                        results.push(element)
                    })
                    if (results.length < 1) {
                        console.log("No results were returned")
                    }
                    //there are results
                    else {
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
                                if (res.Catagories == 'films') {
                                    resultList = reduceChoicesFilm(results, result.Selection)
                                } else {
                                    resultList = reduceChoices(results, result.Selection)
                                }
                                resultList.forEach(result => {
                                    output.parse(result, res.Catagories);
                                })
                            })
                    }
                })
        })
}

const fetch = (selection, value) => {
    choicesList(categories, 'Select a field to search', 'Catagories').then(res => {
        url.info(selection, res.Catagories, value)
            .then(result => {
                if (result.detail == 'Not found')
                    console.log("No Results Were Found")
                else {
                    output.parse(result, res.Catagories);
                    // printSelection(res.Catagories,result)
                }
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