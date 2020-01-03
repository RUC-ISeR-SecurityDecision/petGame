"use strict";
cc._RF.push(module, '3a79bcv4o1MEasxFtm6G1la', 'setting');
// setting/js/setting.js

"use strict";

var GlobalData = require('globalData');
cc.Class({
    extends: cc.Component,

    properties: {
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
                if (value == false) {
                    var offEnd = cc.callFunc(function () {
                        onNode.active = false;
                    }, self, null);
                    offNode.active = true;
                    onNode.zIndex = 0;
                    offNode.zIndex = 1;
                    var onBtnOffAction = cc.moveTo(0.3, -48, 0);
                    var offBtnOffAction = cc.sequence(cc.moveTo(0.3, -3, 0), offEnd);
                    onNode.runAction(onBtnOffAction);
                    offNode.runAction(offBtnOffAction);
                } else {
                    var onEnd = cc.callFunc(function () {
                        offNode.active = false;
                    }, self, null);
                    onNode.active = true;
                    onNode.zIndex = 1;
                    offNode.zIndex = 0;
                    var offBtnOnAction = cc.moveTo(0.3, 48, 0);
                    var onBtnOnAction = cc.sequence(cc.moveTo(0.3, 3, 0), onEnd);
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
                if (value == false) {
                    var offEnd = cc.callFunc(function () {
                        onNode.active = false;
                    }, self, null);
                    offNode.active = true;
                    onNode.zIndex = 0;
                    offNode.zIndex = 1;
                    var onBtnOffAction = cc.moveTo(0.3, -48, 0);
                    var offBtnOffAction = cc.sequence(cc.moveTo(0.3, -3, 0), offEnd);
                    onNode.runAction(onBtnOffAction);
                    offNode.runAction(offBtnOffAction);
                } else {
                    var onEnd = cc.callFunc(function () {
                        offNode.active = false;
                    }, self, null);
                    onNode.active = true;
                    onNode.zIndex = 1;
                    offNode.zIndex = 0;
                    var offBtnOnAction = cc.moveTo(0.3, 48, 0);
                    var onBtnOnAction = cc.sequence(cc.moveTo(0.3, 3, 0), onEnd);
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
                if (value == false) {
                    var offEnd = cc.callFunc(function () {
                        onNode.active = false;
                    }, self, null);
                    offNode.active = true;
                    onNode.zIndex = 0;
                    offNode.zIndex = 1;
                    var onBtnOffAction = cc.moveTo(0.3, -48, 0);
                    var offBtnOffAction = cc.sequence(cc.moveTo(0.3, -3, 0), offEnd);
                    onNode.runAction(onBtnOffAction);
                    offNode.runAction(offBtnOffAction);
                } else {
                    var onEnd = cc.callFunc(function () {
                        offNode.active = false;
                    }, self, null);
                    onNode.active = true;
                    onNode.zIndex = 1;
                    offNode.zIndex = 0;
                    var offBtnOnAction = cc.moveTo(0.3, 48, 0);
                    var onBtnOnAction = cc.sequence(cc.moveTo(0.3, 3, 0), onEnd);
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
                if (value == false) {
                    var offEnd = cc.callFunc(function () {
                        onNode.active = false;
                    }, self, null);
                    offNode.active = true;
                    onNode.zIndex = 0;
                    offNode.zIndex = 1;
                    var onBtnOffAction = cc.moveTo(0.3, -48, 0);
                    var offBtnOffAction = cc.sequence(cc.moveTo(0.3, -3, 0), offEnd);
                    onNode.runAction(onBtnOffAction);
                    offNode.runAction(offBtnOffAction);
                } else {
                    var onEnd = cc.callFunc(function () {
                        offNode.active = false;
                    }, self, null);
                    onNode.active = true;
                    onNode.zIndex = 1;
                    offNode.zIndex = 0;
                    var offBtnOnAction = cc.moveTo(0.3, 48, 0);
                    var onBtnOnAction = cc.sequence(cc.moveTo(0.3, 3, 0), onEnd);
                    offNode.runAction(offBtnOnAction);
                    onNode.runAction(onBtnOnAction);
                }
                this._isNoticeOn = value;
                GlobalData.flagNotice = this._isNoticeOn == false ? 0 : 1;
            }
        },

        promptBlock1: cc.Node, // 背景音乐框节点
        dropDownBox: cc.Node,
        // 背景音乐曲目编号
        bgMusicNum: {
            get: function get() {
                return this._bgMusicNum;
            },
            set: function set(value) {
                if (value > 6) {
                    value = 6;
                }
                if (value < 1) {
                    value = 1;
                }
                this._bgMusicNum = value;
                GlobalData.bgMusicNum = value; //同时更新全局变量
            }
        },
        bgMusicVolumeLabel: cc.Label,
        // 背景音乐音量
        bgMusicVolume: {
            get: function get() {
                return this._bgMusicVolume;
            },
            set: function set(value) {
                if (value < 1) {
                    value = 1;
                    console.log("min bgMusic volume");
                }
                if (value > 10) {
                    value = 10;
                    console.log("max bgMusic volumn");
                }
                this._bgMusicVolume = value;
                this.bgMusicVolumeLabel.string = this._bgMusicVolume;
                GlobalData.bgMusicVolume = value; //同时更新全局变量
            }
        },
        promptBlock2: cc.Node, // 音效框节点
        soundVolumnLabel: cc.Label,
        // 音效音量
        soundVolume: {
            get: function get() {
                return this._soundVolume;
            },
            set: function set(value) {
                if (value < 1) {
                    value = 1;
                    console.log("min soundVolume");
                }
                if (value > 10) {
                    value = 10;
                    console.log("max soundVolume");
                }
                this._soundVolume = value;
                this.soundVolumnLabel.string = this._soundVolume;
                GlobalData.soundVolume = value; //同时更新全局变量
            }
        },
        promptBlock3: cc.Node, // 背景图片框节点
        bgToggleContainer: cc.ToggleContainer,
        bgPicNum: {
            get: function get() {
                return this._bgPicNum;
            },
            set: function set(value) {
                if (value > 3 || value < 0) {
                    value = 0;
                }
                this._bgPicNum = value;
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.isMusicOn = GlobalData.flagBgMusic == 0 ? false : true;
        this.isSoundOn = GlobalData.flagSound == 0 ? false : true;
        this.isVibrationOn = GlobalData.flagVibration == 0 ? false : true;
        this.isNoticeOn = GlobalData.flagNotice == 0 ? false : true;
        this.bgPicNum = GlobalData.bgPicNum;
        this.bgMusicNum = GlobalData.bgMusicNum;
        this.bgMusicVolume = GlobalData.bgMusicVolume;
        this.soundVolume = GlobalData.soundVolume;
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
                this.bgPicNum = i;
                console.log("set background image:" + (this.bgPicNum + 1));
            }
        }
    },
    // block3 背景框按钮
    onBgBtnClick: function onBgBtnClick() {
        var action = cc.moveTo(0.5, 0, 0);
        this.promptBlock3.runAction(action);
    },

    onBgCloseBtnClick: function onBgCloseBtnClick() {
        // console.log(this.promptBlock3.position);
        var action = cc.moveTo(0.5, this.promptBlock3.parent.width + 50, 0);
        this.promptBlock3.runAction(action);
    },

    onBgConfirmBtnClick: function onBgConfirmBtnClick() {
        GlobalData.bgPicNum = this.bgPicNum;
        var action = cc.moveTo(0.5, this.promptBlock3.parent.width + 50, 0);
        this.promptBlock3.runAction(action);
    },
    // block1 背景音乐框按钮操作
    openBgMusicSetting: function openBgMusicSetting() {
        var action = cc.moveTo(0.5, 0, 0);
        this.promptBlock1.runAction(action);
    },

    onBgMusicCloseBtnBlick: function onBgMusicCloseBtnBlick() {
        var action = cc.moveTo(0.5, this.promptBlock1.parent.width + 50, 0);
        this.promptBlock1.runAction(action);
    },

    onBgMusicConfirmBtnBlick: function onBgMusicConfirmBtnBlick() {
        this.bgMusicNum = parseInt(this.dropDownBox.getChildByName('captainLabel').getComponent(cc.Label).string);
        var action = cc.moveTo(0.5, this.promptBlock1.parent.width + 50, 0);
        this.promptBlock1.runAction(action);
    },
    //点击背景音乐提示框中的降低音量按钮的事件处理器
    onClickBgMusicVolumeDownBtn: function onClickBgMusicVolumeDownBtn() {
        this.bgMusicVolume = this.bgMusicVolume - 1;
    },

    //点击背景音乐提示框中的提高音量按钮的事件处理器
    onClickBgMusicVolumeUpBtn: function onClickBgMusicVolumeUpBtn() {
        this.bgMusicVolume = this.bgMusicVolume + 1;
    },
    // block2 音效按钮操作
    openSoundSetting: function openSoundSetting() {
        var action = cc.moveTo(0.5, 0, 0);
        this.promptBlock2.runAction(action);
    },

    onSoundCloseBtnBlick: function onSoundCloseBtnBlick() {
        var action = cc.moveTo(0.5, this.promptBlock2.parent.width + 50, 0);
        this.promptBlock2.runAction(action);
    },
    //点击音效提示框中的降低音量按钮的事件处理器
    onClickSoundVolumeDownBtn: function onClickSoundVolumeDownBtn() {
        this.soundVolume = this.soundVolume - 1;
    },

    //点击音效提示框中的提高音量按钮的事件处理器
    onClickSoundVolumeUpBtn: function onClickSoundVolumeUpBtn() {
        this.soundVolume = this.soundVolume + 1;
    },

    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();