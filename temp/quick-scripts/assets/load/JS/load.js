(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/load/JS/load.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ad105eM3/RL95ZBb6fETvyw', 'load', __filename);
// load/JS/load.js

"use strict";

// 加载数据
var globalData = require("globalData");
cc.Class({
    extends: cc.Component,

    properties: {},

    init: function init() {
        console.log("init", globalData);
        globalData.init();
        console.log(globalData.species);
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.init();

        console.log('turn to adopt page');
        cc.director.loadScene("portrayPage");
    },
    start: function start() {}
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
        //# sourceMappingURL=load.js.map
        