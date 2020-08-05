
/*
*
*
*   TODO 生成 16 进制 UUID
*
*   TODO f304cd96-d045-4f5c-875e-8dfb0328df82
*
*
* */

const getUuid = _ => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

module.exports = {
    getUuid
};
