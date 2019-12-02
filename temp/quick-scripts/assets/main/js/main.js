(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/main/js/main.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '87f245/JAREFJPweZx93lQn', 'main', __filename);
// main/js/main.js

"use strict";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var globalData = require('globalData');

cc.Class({
    extends: cc.Component,

    properties: {
        profile: cc.Sprite,
        pet: cc.Sprite,
        shop: cc.Sprite,
        travel: cc.Sprite,
        work: cc.Sprite,
        home: cc.Sprite,

        _isFunctionShow: true

    },

    init: function init() {
        var _this = this;

        // 初始化宠物形象
        var sprite = this.pet;
        if (globalData.species == 0) {
            cc.loader.loadRes("owl-simple", cc.SpriteFrame, function (err, sp) {
                console.log(err);
                if (err) return;
                if (_this.node) {
                    console.log("success");
                    if (sprite) {
                        sprite.spriteFrame = sp;
                    }
                }
            });
        } else if (globalData.species == 1) {
            cc.loader.loadRes("penguin-simple", cc.SpriteFrame, function (err, sp) {
                console.log(err);
                if (err) return;
                if (_this.node) {
                    console.log("success");
                    if (sprite) {
                        sprite.spriteFrame = sp;
                    }
                }
            });
        } else if (globalData.species == 2) {
            cc.loader.loadRes("cat-simple", cc.SpriteFrame, function (err, sp) {
                console.log(err);
                if (err) return;
                if (_this.node) {
                    console.log("success");
                    if (sprite) {
                        sprite.spriteFrame = sp;
                    }
                }
            });
        } else if (globalData.species == 3) {
            cc.loader.loadRes("dog-simple", cc.SpriteFrame, function (err, sp) {
                console.log(err);
                if (err) return;
                if (_this.node) {
                    console.log("success");
                    if (sprite) {
                        sprite.spriteFrame = sp;
                    }
                }
            });
        }
    },

    onPlusBtnClicked: function onPlusBtnClicked() {
        this.showFunction();
    },

    showFunction: function showFunction() {
        this._isFunctionShow = !this._isFunctionShow;
        var actionShop = null;
        var actionWork = null;
        var actionTravel = null;
        if (this._isFunctionShow) {
            actionTravel = cc.spawn(cc.moveBy(0.5, cc.v2(0, -94)), cc.fadeOut(0.5));
            actionWork = cc.spawn(cc.moveBy(0.6, cc.v2(0, -188)), cc.fadeOut(0.6));
            actionShop = cc.spawn(cc.moveBy(0.7, cc.v2(0, -282)), cc.fadeOut(0.7));
        } else {
            actionTravel = cc.spawn(cc.moveBy(0.5, cc.v2(0, 94)), cc.fadeIn(0.5));
            actionWork = cc.spawn(cc.moveBy(0.6, cc.v2(0, 188)), cc.fadeIn(0.6));
            actionShop = cc.spawn(cc.moveBy(0.7, cc.v2(0, 282)), cc.fadeIn(0.7));
        }
        this.travel.node.runAction(actionTravel);
        this.work.node.runAction(actionWork);
        this.shop.node.runAction(actionShop);
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        console.log(globalData);
        this.init();
    },
    start: function start() {},


    /* 登录函数
    author: qll
    time: 2019/12/2
    */
    login: function login() {

        wx.login({
            success: function success(res) {
                // 发送 res.code 到后台并收取生成的userID，
                var js_code = res.code;
                console.log(js_code);
                var date = new Date();
                var year = date.getFullYear(); //获取当前年份   
                var month = date.getMonth() + 1; //获取当前月份   
                var dat = date.getDate(); //获取当前日    
                var hour = date.getHours(); //获取小时   
                var minute = date.getMinutes(); //获取分钟   
                var second = date.getSeconds(); //获取秒   
                var timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
                var flagCamera = globalData.flagCamera.get();
                var serverAddr = globalData.serverAddr.get() + "login.php";
                wx.request({
                    url: serveAddr,
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        js_code: js_code,
                        loginTime: timeStr,
                        flagCamera: flagCamera
                    },
                    success: function success(res) {
                        console.log(res.data);
                        app.globalData.userID = res.data.userID;
                        app.globalData.flag_userID = true;
                        if (Number(res.data.flag_prompt) == 1) {
                            app.globalData.flag_prompt = true;
                        }
                    }
                });
            }
        });
        console.log('登录完成');
    }
}

// update (dt) {},
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=main.js.map
        