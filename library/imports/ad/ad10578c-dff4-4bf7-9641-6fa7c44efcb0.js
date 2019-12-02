"use strict";
cc._RF.push(module, 'ad105eM3/RL95ZBb6fETvyw', 'load');
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