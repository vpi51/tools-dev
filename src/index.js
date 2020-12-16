const {getUuid} = require('./uuid');
const {request, xhr} = require('./XHR');

console.log('test');

function getTest () {
    return 'test';
}

console.log('fun', getTest());

module.exports = {
    getUuid,
    request,
    xhr
};
