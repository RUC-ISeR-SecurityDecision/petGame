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
        selectIndex: 0,
    },

    init: function(data) {
        this.captainLabel.string = data[0];
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            let newListNode = cc.instantiate(this.listTemp);
            let self = this;
            newListNode.getChildByName('itemLabel').getComponent(cc.Label).string = element;
            newListNode.on(cc.Node.EventType.TOUCH_START , function() {
                self.captainLabel.string = element;
                self.selectIndex = i;
                self.dropMenu.active = false;
            }, self);
            self.listTemp.parent.addChild(newListNode);
        }
        this.listTemp.active = false;
    },

    onDropBtnClick: function() {
        //播放按键音
        this.btnSound=cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        self.dropMenu.active = true;
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let self = this; 
        self.dropMenu.active = false;
        self.dropBtn.node.on(cc.Node.EventType.TOUCH_START , function() {
            self.dropMenu.active = !self.dropMenu.active;
        }, self);
    },

    start () {

    },

    // update (dt) {},
});
