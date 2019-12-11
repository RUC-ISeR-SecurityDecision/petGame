"use strict";
cc._RF.push(module, '1b4aeUPPPVBJritkQmMe9gJ', 'pet');
// Global/pet.js

"use strict";

// 宠物脚本

var GlobalData = require('globalData');

cc.Class({
    extends: cc.Component,

    properties: {
        image: cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.init();
    },


    init: function init() {
        var _this = this;

        var petImagePath = GlobalData.gender == 0 ? "pet/male_" : "pet/female_";
        var self = this;
        if (GlobalData.species == 0) {
            petImagePath += 'owl';
        } else if (GlobalData.species == 1) {
            petImagePath += 'penguins';
        } else if (GlobalData.species == 2) {
            petImagePath += 'cat';
        } else if (GlobalData.species == 3) {
            petImagePath += 'dog';
        }
        petImagePath += GlobalData.color + 1 + '';

        cc.loader.loadRes(petImagePath, cc.SpriteFrame, function (err, sp) {
            if (err) {
                console.log(err);
                return;
            }
            if (_this.node) {
                console.log("success");
                if (self.image) {
                    self.image.spriteFrame = sp;
                }
            }
        });
    },

    /**
     * 宠物喂食操作，根据食物的属性改变宠物相应的属性和动作
     * @param { shopItem } food 
     */
    eat: function eat(toiletries) {},

    /**
     * 宠物洗澡操作，根据洗澡用品的属性改变宠物相应的属性和动作
     * @param { shopItem } toiletries
     */
    shower: function shower(toiletries) {},

    /**
     * 宠物睡觉操作
     * @param { Number } time
     */
    sleep: function sleep(time) {},

    /**
     * 宠物工作操作
     * @param { Number } time 工作时长
     * @param { Number } type 工种
     */
    work: function work(time, type) {},

    /**
     * 宠物工作操作
     * @param { Number } time 旅游时长
     * @param { Number } place 地点
     */
    travel: function travel(time, place) {},

    // 宠物空闲时间的属性变化及动作
    waiting: function waiting() {
        GlobalData.hunger -= 1;
        GlobalData.cleaness -= 1;
        GlobalData.energy -= 1;
        GlobalData.thirst -= 1;
        GlobalData.growth += 1;
    },

    // 宠物动作
    walk: function walk() {},

    jump: function jump() {},

    happy: function happy() {},

    sad: function sad() {},

    skip: function skip() {},

    sleepAction: function sleepAction() {},

    start: function start() {}
}

// 需要时刻刷新宠物状态，但是需要区别宠物正在进行的操作，还需要在update里添加一个计时器函数，
// update (dt) {
//     this.waiting();
// },
);

cc._RF.pop();