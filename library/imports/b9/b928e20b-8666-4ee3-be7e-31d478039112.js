"use strict";
cc._RF.push(module, 'b928eILhmZO475+MdR4A5ES', 'net');
// Global/net.js

'use strict';

// 网络请求处理
// author：wang-c
// 三个函数，httpGet,httpPost,httpPostLogin
// httpPostLogin 还需要按照微信小游戏的登录模式修改
// 用法：全局变量window.HttpHelper,使用时只需HttpHelper.httpGet(url, callback) 即可

var HttpHelper = cc.Class({
    extends: cc.Component,

    statics: {},

    properties: {},

    /**
     * get请求
     * @param {string} url 访问的url
     * @param {function} callback 回调函数, 再函数结束后调用外部函数
     */
    httpGet: function httpGet(url, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            // cc.log("Get: readyState:" + xhr.readyState + " status:" + xhr.status);
            if (xhr.readyState === 4 && xhr.status == 200) {
                var respone = xhr.responseText;
                var rsp = JSON.parse(respone);
                callback(rsp);
            } else {
                callback(-1);
            }
        };
        xhr.withCredentials = true;
        xhr.open('GET', url, true);

        if (cc.sys.isNative) {
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
            xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type,authorization');
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader('Authorization', 'Bearer ' + cc.myGame.gameManager.getToken());
            xhr.setRequestHeader('Authorization', 'Bearer ' + "");
        }

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 8000; // 8 seconds for timeout

        xhr.send();
    },


    /**
     * post请求
     * @param {string} url 请求url
     * @param {object} params 请求参数
     * @param {function} callback 回调函数
     */
    httpPost: function httpPost(url, params, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            // cc.log('xhr.readyState=' + xhr.readyState + '  xhr.status=' + xhr.status);
            if (xhr.readyState === 4 && xhr.status == 200) {
                var respone = xhr.responseText;
                var rsp = JSON.parse(respone);
                callback(rsp);
            } else {
                callback(-1);
            }
        };
        xhr.open('POST', url, true);
        // if (cc.sys.isNative) {
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
        xhr.setRequestHeader("Content-Type", "application/json");
        // }

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 8000; // 8 seconds for timeout

        xhr.send(JSON.stringify(params));
    },


    /**
     * 登录专用
     * @param {string} url 
     * @param {object} params 
     * @param {function} callback 
     * @param {string} account 
     * @param {string} password 
     */
    httpPostLogin: function httpPostLogin(url, params, callback, account, password) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            // cc.log('xhr.readyState=' + xhr.readyState + '  xhr.status=' + xhr.status);
            if (xhr.readyState === 4 && xhr.status == 200) {
                var respone = xhr.responseText;
                var rsp = JSON.parse(respone);
                callback(rsp);
            } else {
                callback(-1);
            }
        };
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
        xhr.setRequestHeader("Content-Type", "application/json");
        var str = account + "@" + password;
        xhr.setRequestHeader('Authorization', 'Basic' + ' ' + window.btoa(str));

        xhr.timeout = 8000; // 8 seconds for timeout

        xhr.send(JSON.stringify(params));
    }
});

window.HttpHelper = new HttpHelper();

cc._RF.pop();