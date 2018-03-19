const 
    superagent = require('superagent'),
    url='https://swapi.co/api'

const _fetch = (command) => {
    return superagent.get(`${url}/${command}`)
        .then(response => response.body)
        .catch(error => error.response.body)
}

exports.info = (selection,category,term) => {
    
    if(selection=='id')
        return _fetch(`${category}/${term}`)
    else if(selection=='term')
        return _fetch(`${category}/?search=${term}`)
    else
        return null;
}




