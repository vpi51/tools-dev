/*
*
*
*   TODO XMLHttpRequest 请求封装
*
*   TODO request 直接使用 类似 jQuery ajax
*
*   TODO xhr 需要 new 并允许传递 headers、timeout、base、timestamp 参数
*
*   headers ==> 请求头参数 object
*   timeout ==> 请求最大可停留时长 int(ms单位) 默认 10000ms
*   base ==> 主请求地址，会与 get、post方法中参数 url 进行拼接
*   timestamp ==> 请求连接的时间戳（强制使服务器认为非同一请求参数） bool
*
*
* */

class XHRRequest {
    constructor(props) {
        this.config = props || {};
    }

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
                    err : `timeout ${this.config.timeout || 10000}ms!`
                });
            }, this.config.timeout || 10000);
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
                urlData = urlData.substring(0, urlData.length - 1);
                url = url + urlData;
            }

            // 若主请求地址存在 那么 将 base 与 url 进行合并
            if(this.config.base){
                url = this.config.base + url;
            }

            // 若 timestamp 存在 为当前请求地址 添加时间戳
            if(this.config.timestamp){
                url = url + '&' + 'timestamp=' + new Date().getTime();
            }

            req.open('GET', url, true);

            // 添加请求头
            if(this.config && this.config.headers){
                for(let key in this.config.headers){
                    req.setRequestHeader(key, this.config.headers[key]);
                }
            }

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
                    err : `timeout ${this.config.timeout || 10000}ms!`
                });
            }, this.config.timeout || 10000);

            // 若主请求地址存在 那么 将 base 与 url 进行合并
            if(this.config.base){
                url = this.config.base + url;
            }

            // 若 timestamp 存在 为当前请求地址 添加时间戳
            if(this.config.timestamp){
                url = url + '&' + 'timestamp=' + new Date().getTime();
            }

            req.open("POST", url, true);

            // POST方式需要自己设置http的请求头  fromData 格式 若不加 则为 body 格式
            req.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");//普通表单方式

            // 添加请求头
            if(this.config && this.config.headers){
                for(let key in this.config.headers){
                    req.setRequestHeader(key, this.config.headers[key]);
                }
            }

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
    request : new XHRRequest(),
    xhr : XHRRequest
};
