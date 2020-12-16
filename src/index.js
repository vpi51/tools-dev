const {getUuid} = require('./uuid');
const {request, xhr} = require('./XHR');

console.log('test');

function getTest () {
    return 'test';
}

console.log('fun', getTest(), '33333');

// test2 合并

module.exports = {
    getUuid,
    request,
    xhr
};
