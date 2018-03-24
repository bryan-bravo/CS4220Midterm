const 
    superagent = require('superagent'),
    url=require('./config.json').url

const _fetch = (command) => {
    return superagent.get(`${url}/${command}`)
        .then(response => response.body)
        .catch(error => error.response.body)
}

exports.search = (category,term) => {
    return _fetch(`${category}/?search=${term}`)
}

exports.fetch = (category,id) => {
    return _fetch(`${category}/${id}`)
}

exports.link = (apiURL)=>{
    return superagent.get(`${apiURL}`)
    .then(response=>response.body)
    .catch(error=>error.response.body)
}




