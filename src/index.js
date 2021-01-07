const {getUuid} = require('./uuid');
const {request, xhr} = require('./XHR');

console.log('test');

function getTest () {
    return 'test';
}

console.log('fun', getTest(), '33333');

module.exports = {
    getUuid,
    request,
    xhr
};
console.log('这是我在 test_3 分支中添加的 log');
