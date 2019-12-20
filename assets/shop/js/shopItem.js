// 商店物品预制体模板组件绑定
// author:wang-c

cc.Class({
    extends: cc.Component,

    properties: {
        price: cc.Label,
        itemPic: cc.Sprite,
        soldOutPic: cc.Node,
        itemNode: cc.Node
    },
    /**
     * 加载后初始化预制体
     * @param {string} price 商品价格
     * @param {cc.SpriteFrame} itemPic 商品图片
     */
    init: function(price, itemPic, isSoldOut) {
        this.price.string = price;
        this.itemPic.spriteFrame = itemPic;
        this.soldOutPic.active = false;
        if (isSoldOut) {
            this.soldOutPic.active = true;
            this.itemNode.targetOff();
        } 
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
