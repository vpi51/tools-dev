/**
 * 常规Ajax请求
 * 需要IE7+
 * 需要Promise支持
 */

class XHRRequest {
    get(url = '', params = {}) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            let timer = setTimeout(() => {
                clearTimeout(timer);
                //请求中止
                req.abort();
                resolve({
                    code : 'N',
                    message : '服务器连接超时！',
                    err : 'timeout 10s!'
                });
            }, 10000);
            let urlData = '';
            if(!!params){
                // 当 params 参数存在时 那么将 拼接 url
                urlData = '?';
                for(let item in params){
                    urlData+= `${item}=${params[item]}&`
                }
            }
            if(urlData !== ''){
                // 当 urlData 不等于 空时 去除 字符串最后一位 & 符号
                urlData = urlData.substring(0, urlData.length - 1)
            }

            req.open('GET', url + urlData, true);
            req.send(null);
            req.onload = () => {
                clearTimeout(timer);
                if(!req.responseText || req.responseText === ''){
                    resolve({
                        code : 'N',
                        message : '服务端返回数据异常！',
                        err : 'responseText 不存在或为空！'
                    });
                    return;
                }
                try {
                    resolve(JSON.parse(req.responseText))
                }catch (e) {
                    resolve(req.responseText)
                }
            };
            req.onerror = err => {
                clearTimeout(timer);
                resolve({
                    code : 'N',
                    message : '服务器连接异常！',
                    err
                });
            };
        });
    };

    post(url, params) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            let timer = setTimeout(() => {
                clearTimeout(timer);
                //请求中止
                req.abort();
                resolve({
                    code : 'N',
                    message : '服务器连接超时！',
                    err : 'timeout 10s!'
                });
            }, 10000);
            req.open("POST", url, true);
            // POST方式需要自己设置http的请求头  fromData 格式 若不加 则为 body 格式
            req.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");//普通表单方式
            // 参数
            let urlData = '';
            if(!!params){
                // 当 params 参数存在时 那么将 拼接 url
                for(let item in params){
                    urlData+= `${item}=${params[item]}&`
                }
            }
            if(urlData !== ''){
                // 当 urlData 不等于 空时 去除 字符串最后一位 & 符号
                urlData = urlData.substring(0, urlData.length - 1)
            }
            req.send(urlData);
            // 回执
            req.onload = () => {
                clearTimeout(timer);
                if(!req.responseText || req.responseText === ''){
                    resolve({
                        code : 'N',
                        message : '服务端返回数据异常！',
                        err : 'responseText 不存在或为空！',
                    });
                    return;
                }
                resolve(JSON.parse(req.responseText))
            };
            // 错误
            req.onerror = err => {
                clearTimeout(timer);
                resolve({
                    code : 'N',
                    message : '服务器连接异常！',
                    err
                });
            };
        });
    };
}

module.exports = {
    XHRRequest : new XHRRequest()
};
