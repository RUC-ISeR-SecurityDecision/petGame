"use strict";
cc._RF.push(module, '39b4du/dsJLQKtkwsgDOFIW', 'shopItem');
// shop/js/shopItem.js

"use strict";

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
    init: function init(price, itemPic, isSoldOut) {
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

    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();