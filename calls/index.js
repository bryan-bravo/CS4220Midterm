const 
    superagent = require('superagent'),
    url=require('./config.json').url

const _fetch = (command) => {
    return _fetchURL(`${url}/${command}`)
}

const _fetchURL = (fullUrl) => {
    return superagent.get(`${fullUrl}`)
    .then(response => response.body)
    .catch(error => error.response.body)
}

exports.search = (category,term) => {
    return _fetch(`${category}/?search=${term}`)
}

exports.fetch = (category,id) => {
    return _fetch(`${category}/${id}`)
}

exports.fetchURL = (url) => {
    return _fetchURL(url)
}



