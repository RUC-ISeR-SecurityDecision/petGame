// 加载数据
var globalData = require("globalData");
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    init: function(){
        console.log("init", globalData);
        globalData.init();
        console.log(globalData.species);
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init();
        
        console.log('turn to adopt page');
        cc.director.loadScene("portrayPage");
    },

    start () {

    },

    // update (dt) {},
});
