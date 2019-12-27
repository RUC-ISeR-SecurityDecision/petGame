var GlobalData = require('globalData');
cc.Class({
    extends: cc.Component,

    properties: {
        promptBlock3:cc.Node,

        musicOnButton: cc.Button,
        musicOffButton: cc.Button,
        isMusicOn: {
            get() {
                return this._isMusicOn;
            },
            set(value) {
                let self = this;
                let onNode = this.musicOnButton.node;
                let offNode = this.musicOffButton.node;
                if (value == true) {
                    let offEnd = cc.callFunc(function () {
                        console.log("music is end off");
                        onNode.active = false;
                    }, self, null);
                    offNode.active = true;
                    onNode.zIndex = 1;
                    offNode.zIndex = 0;
                    let onBtnOffAction = cc.moveBy(0.3, -51, 0);
                    let offBtnOffAction = cc.sequence(cc.moveBy(0.3, -51, 0), offEnd);
                    onNode.runAction(onBtnOffAction);
                    offNode.runAction(offBtnOffAction);

                } else {
                    let onEnd = cc.callFunc(function () {
                        console.log("music is end on");
                        offNode.active = false;
                    }, self, null);
                    onNode.active = true;
                    onNode.zIndex = 0;
                    offNode.zIndex = 1;
                    let offBtnOnAction = cc.moveBy(0.3, 51, 0);
                    let onBtnOnAction = cc.sequence(cc.moveBy(0.3, 51, 0), onEnd);
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
            get() {
                return this._isSoundOn;
            },
            set(value) {
                let self = this;
                let onNode = this.soundOnButton.node;
                let offNode = this.soundOffButton.node;
                if (value == true) {
                    let offEnd = cc.callFunc(function () {
                        console.log("music is end off");
                        onNode.active = false;
                    }, self, null);
                    offNode.active = true;
                    onNode.zIndex = 1;
                    offNode.zIndex = 0;
                    let onBtnOffAction = cc.moveBy(0.3, -51, 0);
                    let offBtnOffAction = cc.sequence(cc.moveBy(0.3, -51, 0), offEnd);
                    onNode.runAction(onBtnOffAction);
                    offNode.runAction(offBtnOffAction);

                } else {
                    let onEnd = cc.callFunc(function () {
                        console.log("music is end on");
                        offNode.active = false;
                    }, self, null);
                    onNode.active = true;
                    onNode.zIndex = 0;
                    offNode.zIndex = 1;
                    let offBtnOnAction = cc.moveBy(0.3, 51, 0);
                    let onBtnOnAction = cc.sequence(cc.moveBy(0.3, 51, 0), onEnd);
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
            get() {
                return this._isVibrationOn;
            },
            set(value) {
                let self = this;
                let onNode = this.vibrationOnButton.node;
                let offNode = this.vibrationOffButton.node;
                if (value == true) {
                    let offEnd = cc.callFunc(function () {
                        console.log("music is end off");
                        onNode.active = false;
                    }, self, null);
                    offNode.active = true;
                    onNode.zIndex = 1;
                    offNode.zIndex = 0;
                    let onBtnOffAction = cc.moveBy(0.3, -51, 0);
                    let offBtnOffAction = cc.sequence(cc.moveBy(0.3, -51, 0), offEnd);
                    onNode.runAction(onBtnOffAction);
                    offNode.runAction(offBtnOffAction);

                } else {
                    let onEnd = cc.callFunc(function () {
                        console.log("music is end on");
                        offNode.active = false;
                    }, self, null);
                    onNode.active = true;
                    onNode.zIndex = 0;
                    offNode.zIndex = 1;
                    let offBtnOnAction = cc.moveBy(0.3, 51, 0);
                    let onBtnOnAction = cc.sequence(cc.moveBy(0.3, 51, 0), onEnd);
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
            get() {
                return this._isNoticeOn;
            },
            set(value) {
                let self = this;
                let onNode = this.noticeOnButton.node;
                let offNode = this.noticeOffButton.node;
                if (value == true) {
                    let offEnd = cc.callFunc(function () {
                        console.log("music is end off");
                        onNode.active = false;
                    }, self, null);
                    offNode.active = true;
                    onNode.zIndex = 1;
                    offNode.zIndex = 0;
                    let onBtnOffAction = cc.moveBy(0.3, -51, 0);
                    let offBtnOffAction = cc.sequence(cc.moveBy(0.3, -51, 0), offEnd);
                    onNode.runAction(onBtnOffAction);
                    offNode.runAction(offBtnOffAction);

                } else {
                    let onEnd = cc.callFunc(function () {
                        console.log("music is end on");
                        offNode.active = false;
                    }, self, null);
                    onNode.active = true;
                    onNode.zIndex = 0;
                    offNode.zIndex = 1;
                    let offBtnOnAction = cc.moveBy(0.3, 51, 0);
                    let onBtnOnAction = cc.sequence(cc.moveBy(0.3, 51, 0), onEnd);
                    offNode.runAction(offBtnOnAction);
                    onNode.runAction(onBtnOnAction);
                }
                this._isNoticeOn = value;
                GlobalData.flagNotice = this._isNoticeOn == false ? 0 : 1;
            }
        },

        bgToggleContainer: cc.ToggleContainer,
        bgPickNum: {
            get() {
                return this._bgPickNum;
            },
            set(value) {
                if (value > 3 || value < 0) {
                    value = 0;
                }
                this._bgPickNum = value;
                this._bgPickNum = GlobalData.bgPickNum;
            }
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.isMusicOn = GlobalData.flagBgMusic == 0 ? false : true;
        this.isSoundOn = GlobalData.flagSound == 0 ? false : true;
        this.isVibrationOn = GlobalData.flagVibration == 0 ? false : true;
        this.isNoticeOn = GlobalData.flagNotice == 0 ? false : true;
        this.bgPickNum = GlobalData.bgPickNum;
    },

    onMusicBtnClicked: function () {
        this.isMusicOn = !this.isMusicOn;
        console.log("music clicked");
    },

    onSoundBtnClicked: function () {
        this.isSoundOn = !this.isSoundOn;
        console.log("sound clicked");
    },

    onVibrationBtnClicked: function () {
        this.isVibrationOn = !this.isVibrationOn;
        console.log("Vibration clicked");
    },

    onNoticeBtnClicked: function () {
        this.isNoticeOn = !this.isNoticeOn;
        console.log("Notice clicked");
    },

    onCloseBtnClick: function () {
        cc.director.loadScene('mainPage');
    },

    onBgToggleClick: function () {
        let toggleArry = this.bgToggleContainer.getComponentsInChildren(cc.Toggle);
        for (let i = 0; i < toggleArry.length; i++) {
            const element = toggleArry[i];
            if (element.isChecked) {
                this.bgPickNum = i;
                console.log("set background image:" + (i+1));
            }
        }
    },

    onBgBtnClick: function () {
        let action = cc.moveTo(0.5, 0, 0);
        this.promptBlock3.runAction(action);
    },

    start() {

    },

    // update (dt) {},
});
