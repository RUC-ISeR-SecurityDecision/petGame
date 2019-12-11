// 宠物脚本

var GlobalData = require('globalData');

cc.Class({
    extends: cc.Component,

    properties: {
        image: cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init();
    },

    init: function () {
        let petImagePath = GlobalData.gender == 0 ? "pet/male_" : "pet/female_";
        let self = this;
        if (GlobalData.species == 0) {
            petImagePath += 'owl';
        } else if (GlobalData.species == 1) {
            petImagePath += 'penguins';
        } else if (GlobalData.species == 2) {
            petImagePath += 'cat';
        } else if (GlobalData.species == 3) {
            petImagePath += 'dog';
        }
        petImagePath += (GlobalData.color + 1) + '';

        cc.loader.loadRes(petImagePath, cc.SpriteFrame, (err, sp) => {
            if (err) {
                console.log(err);
                return;
            }
            if (this.node) {
                console.log("success");
                if (self.image) {
                    self.image.spriteFrame = sp;
                }
            }
        })
    },

    /**
     * 宠物喂食操作，根据食物的属性改变宠物相应的属性和动作
     * @param { shopItem } food 
     */
    eat: function (toiletries) {

    },

    /**
     * 宠物洗澡操作，根据洗澡用品的属性改变宠物相应的属性和动作
     * @param { shopItem } toiletries
     */
    shower: function (toiletries) {

    },

    /**
     * 宠物睡觉操作
     * @param { Number } time
     */
    sleep: function (time) {

    },

    /**
     * 宠物工作操作
     * @param { Number } time 工作时长
     * @param { Number } type 工种
     */
    work: function (time, type) {

    },

    /**
     * 宠物工作操作
     * @param { Number } time 旅游时长
     * @param { Number } place 地点
     */
    travel: function (time, place) {

    },

    // 宠物空闲时间的属性变化及动作
    waiting: function () {
        GlobalData.hunger -= 1;
        GlobalData.cleaness -= 1;
        GlobalData.energy -= 1;
        GlobalData.thirst -= 1;
        GlobalData.growth += 1;
    },

    // 宠物动作
    walk: function () {

    },

    jump: function () {

    },

    happy: function () {

    },

    sad: function () {

    },

    skip: function () {

    },

    sleepAction: function () {

    },


    start() {

    },

    // 需要时刻刷新宠物状态，但是需要区别宠物正在进行的操作，还需要在update里添加一个计时器函数，
    // update (dt) {
    //     this.waiting();
    // },
});
