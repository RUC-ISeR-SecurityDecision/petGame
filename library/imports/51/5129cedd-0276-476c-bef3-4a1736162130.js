"use strict";
cc._RF.push(module, '5129c7dAnZHbL7zShc2FiEw', 'dropdown');
// setting/js/dropdown.js

'use strict';

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        captainLabel: cc.Label,
        dropBtn: cc.Button,

        dropMenu: cc.Node,
        listTemp: cc.Node,
        selectIndex: 0
    },

    init: function init(data) {
        var _this = this;

        this.captainLabel.string = data[0];

        var _loop = function _loop(i) {
            var element = data[i];
            var newListNode = cc.instantiate(_this.listTemp);
            var self = _this;
            newListNode.getChildByName('itemLabel').getComponent(cc.Label).string = element;
            newListNode.on(cc.Node.EventType.TOUCH_START, function () {
                self.captainLabel.string = element;
                self.selectIndex = i;
                self.dropMenu.active = false;
            }, self);
            self.listTemp.parent.addChild(newListNode);
        };

        for (var i = 0; i < data.length; i++) {
            _loop(i);
        }
        this.listTemp.active = false;
    },

    onDropBtnClick: function onDropBtnClick() {
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        self.dropMenu.active = true;
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var self = this;
        self.dropMenu.active = false;
        self.dropBtn.node.on(cc.Node.EventType.TOUCH_START, function () {
            self.dropMenu.active = !self.dropMenu.active;
        }, self);
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();