const {getUuid} = require('./uuid');
const {request, xhr} = require('./XHR');

console.log('test');

function getTest () {
    return 'test';
}
// 合并 test1
console.log('fun', getTest(), '33333');

module.exports = {
    getUuid,
    request,
    xhr
};
