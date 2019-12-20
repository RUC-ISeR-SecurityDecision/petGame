// 背包物品预制体模板组件绑定
// author:wang-c

cc.Class({
    extends: cc.Component,

    properties: {
        numberLabel: cc.Label,
        itemPic: cc.Sprite
    },
    /**
     * 加载后初始化预制体
     * @param {integer} number 数量
     * @param {cc.SpriteFrame} itemPic 商品图片
     */
    init: function(number, itemPic) {
        this.numberLabel.string = number;
        this.itemPic.spriteFrame = itemPic;
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
