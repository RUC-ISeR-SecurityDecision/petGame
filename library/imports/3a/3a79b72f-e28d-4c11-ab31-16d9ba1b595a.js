"use strict";
cc._RF.push(module, '3a79bcv4o1MEasxFtm6G1la', 'setting');
// setting/js/setting.js

"use strict";

var GlobalData = require('globalData');
cc.Class({
    extends: cc.Component,

    properties: {
        promptBlock3: cc.Node,

        musicOnButton: cc.Button,
        musicOffButton: cc.Button,
        isMusicOn: {
            get: function get() {
                return this._isMusicOn;
            },
            set: function set(value) {
                var self = this;
                var onNode = this.musicOnButton.node;
                var offNode = this.musicOffButton.node;
                if (value == true) {
                    var offEnd = cc.callFunc(function () {
                        console.log("music is end off");
                        onNode.active = false;
                    }, self, null);
                    offNode.active = true;
                    onNode.zIndex = 1;
                    offNode.zIndex = 0;
                    var onBtnOffAction = cc.moveBy(0.3, -51, 0);
                    var offBtnOffAction = cc.sequence(cc.moveBy(0.3, -51, 0), offEnd);
                    onNode.runAction(onBtnOffAction);
                    offNode.runAction(offBtnOffAction);
                } else {
                    var onEnd = cc.callFunc(function () {
                        console.log("music is end on");
                        offNode.active = false;
                    }, self, null);
                    onNode.active = true;
                    onNode.zIndex = 0;
                    offNode.zIndex = 1;
                    var offBtnOnAction = cc.moveBy(0.3, 51, 0);
                    var onBtnOnAction = cc.sequence(cc.moveBy(0.3, 51, 0), onEnd);
                    offNode.runAction(offBtnOnAction);
                    onNode.runAction(onBtnOnAction);
                }
                this._isMusicOn = value;
                GlobalData.flagBgMusic = this._isMusicOn == false ? 0 : 1;
            }
        },
        soundOnButton: cc.Button,
        soundOffButton: cc.Button,
        isSoundOn: {
            get: function get() {
                return this._isSoundOn;
            },
            set: function set(value) {
                var self = this;
                var onNode = this.soundOnButton.node;
                var offNode = this.soundOffButton.node;
                if (value == true) {
                    var offEnd = cc.callFunc(function () {
                        console.log("music is end off");
                        onNode.active = false;
                    }, self, null);
                    offNode.active = true;
                    onNode.zIndex = 1;
                    offNode.zIndex = 0;
                    var onBtnOffAction = cc.moveBy(0.3, -51, 0);
                    var offBtnOffAction = cc.sequence(cc.moveBy(0.3, -51, 0), offEnd);
                    onNode.runAction(onBtnOffAction);
                    offNode.runAction(offBtnOffAction);
                } else {
                    var onEnd = cc.callFunc(function () {
                        console.log("music is end on");
                        offNode.active = false;
                    }, self, null);
                    onNode.active = true;
                    onNode.zIndex = 0;
                    offNode.zIndex = 1;
                    var offBtnOnAction = cc.moveBy(0.3, 51, 0);
                    var onBtnOnAction = cc.sequence(cc.moveBy(0.3, 51, 0), onEnd);
                    offNode.runAction(offBtnOnAction);
                    onNode.runAction(onBtnOnAction);
                }
                this._isSoundOn = value;
                GlobalData.flagSound = this._isSoundOn == false ? 0 : 1;
            }
        },
        vibrationOnButton: cc.Button,
        vibrationOffButton: cc.Button,
        isVibrationOn: {
            get: function get() {
                return this._isVibrationOn;
            },
            set: function set(value) {
                var self = this;
                var onNode = this.vibrationOnButton.node;
                var offNode = this.vibrationOffButton.node;
                if (value == true) {
                    var offEnd = cc.callFunc(function () {
                        console.log("music is end off");
                        onNode.active = false;
                    }, self, null);
                    offNode.active = true;
                    onNode.zIndex = 1;
                    offNode.zIndex = 0;
                    var onBtnOffAction = cc.moveBy(0.3, -51, 0);
                    var offBtnOffAction = cc.sequence(cc.moveBy(0.3, -51, 0), offEnd);
                    onNode.runAction(onBtnOffAction);
                    offNode.runAction(offBtnOffAction);
                } else {
                    var onEnd = cc.callFunc(function () {
                        console.log("music is end on");
                        offNode.active = false;
                    }, self, null);
                    onNode.active = true;
                    onNode.zIndex = 0;
                    offNode.zIndex = 1;
                    var offBtnOnAction = cc.moveBy(0.3, 51, 0);
                    var onBtnOnAction = cc.sequence(cc.moveBy(0.3, 51, 0), onEnd);
                    offNode.runAction(offBtnOnAction);
                    onNode.runAction(onBtnOnAction);
                }
                this._isVibrationOn = value;
                GlobalData.flagVibration = this._isVibrationOn == false ? 0 : 1;
            }
        },
        noticeOnButton: cc.Button,
        noticeOffButton: cc.Button,
        isNoticeOn: {
            get: function get() {
                return this._isNoticeOn;
            },
            set: function set(value) {
                var self = this;
                var onNode = this.noticeOnButton.node;
                var offNode = this.noticeOffButton.node;
                if (value == true) {
                    var offEnd = cc.callFunc(function () {
                        console.log("music is end off");
                        onNode.active = false;
                    }, self, null);
                    offNode.active = true;
                    onNode.zIndex = 1;
                    offNode.zIndex = 0;
                    var onBtnOffAction = cc.moveBy(0.3, -51, 0);
                    var offBtnOffAction = cc.sequence(cc.moveBy(0.3, -51, 0), offEnd);
                    onNode.runAction(onBtnOffAction);
                    offNode.runAction(offBtnOffAction);
                } else {
                    var onEnd = cc.callFunc(function () {
                        console.log("music is end on");
                        offNode.active = false;
                    }, self, null);
                    onNode.active = true;
                    onNode.zIndex = 0;
                    offNode.zIndex = 1;
                    var offBtnOnAction = cc.moveBy(0.3, 51, 0);
                    var onBtnOnAction = cc.sequence(cc.moveBy(0.3, 51, 0), onEnd);
                    offNode.runAction(offBtnOnAction);
                    onNode.runAction(onBtnOnAction);
                }
                this._isNoticeOn = value;
                GlobalData.flagNotice = this._isNoticeOn == false ? 0 : 1;
            }
        },

        bgToggleContainer: cc.ToggleContainer,
        bgPickNum: {
            get: function get() {
                return this._bgPickNum;
            },
            set: function set(value) {
                if (value > 3 || value < 0) {
                    value = 0;
                }
                this._bgPickNum = value;
                this._bgPickNum = GlobalData.bgPickNum;
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.isMusicOn = GlobalData.flagBgMusic == 0 ? false : true;
        this.isSoundOn = GlobalData.flagSound == 0 ? false : true;
        this.isVibrationOn = GlobalData.flagVibration == 0 ? false : true;
        this.isNoticeOn = GlobalData.flagNotice == 0 ? false : true;
        this.bgPickNum = GlobalData.bgPickNum;
    },


    onMusicBtnClicked: function onMusicBtnClicked() {
        this.isMusicOn = !this.isMusicOn;
        console.log("music clicked");
    },

    onSoundBtnClicked: function onSoundBtnClicked() {
        this.isSoundOn = !this.isSoundOn;
        console.log("sound clicked");
    },

    onVibrationBtnClicked: function onVibrationBtnClicked() {
        this.isVibrationOn = !this.isVibrationOn;
        console.log("Vibration clicked");
    },

    onNoticeBtnClicked: function onNoticeBtnClicked() {
        this.isNoticeOn = !this.isNoticeOn;
        console.log("Notice clicked");
    },

    onCloseBtnClick: function onCloseBtnClick() {
        cc.director.loadScene('mainPage');
    },

    onBgToggleClick: function onBgToggleClick() {
        var toggleArry = this.bgToggleContainer.getComponentsInChildren(cc.Toggle);
        for (var i = 0; i < toggleArry.length; i++) {
            var element = toggleArry[i];
            if (element.isChecked) {
                this.bgPickNum = i;
                console.log("set background image:" + (i + 1));
            }
        }
    },

    onBgBtnClick: function onBgBtnClick() {
        var action = cc.moveTo(0.5, 0, 0);
        this.promptBlock3.runAction(action);
    },

    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();