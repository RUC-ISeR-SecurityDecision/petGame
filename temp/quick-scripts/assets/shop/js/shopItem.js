(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/shop/js/shopItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '39b4du/dsJLQKtkwsgDOFIW', 'shopItem', __filename);
// shop/js/shopItem.js

"use strict";

// 商店物品预制体模板组件绑定
// author:wang-c

cc.Class({
    extends: cc.Component,

    properties: {
        price: cc.Label,
        itemPic: cc.Sprite
    },
    /**
     * 加载后初始化预制体
     * @param {string} price 商品价格
     * @param {cc.SpriteFrame} itemPic 商品图片
     */
    init: function init(price, itemPic) {
        this.price.string = price;
        this.itemPic.spriteFrame = itemPic;
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

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
        //# sourceMappingURL=shopItem.js.map
        