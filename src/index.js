const {getUuid} = require('./uuid');
const {request, xhr} = require('./XHR');

console.log('test');

function getTest () {
    return 'test';
}

console.log('fun', getTest(), '33333');
console.log('这是我新添加在 master 分支上的 log');
console.log('测试 commit -m 提交命令');

module.exports = {
    getUuid,
    request,
    xhr
};
console.log('这是我在 test_3 分支中添加的 log');
