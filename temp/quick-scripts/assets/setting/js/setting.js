(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/setting/js/setting.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3a79bcv4o1MEasxFtm6G1la', 'setting', __filename);
// setting/js/setting.js

'use strict';

var GlobalData = require('globalData');
cc.Class({
    extends: cc.Component,

    properties: {
        //音效
        btnSound: { //按键音
            default: null,
            url: cc.AudioClip
        },

        musicFrogBtn: cc.Node,
        // 背景音乐标志位
        isMusicOn: {
            get: function get() {
                return this._isMusicOn;
            },
            set: function set(value) {
                var self = this;
                if (value == false) {
                    //Disable bg music
                    this.musicFrogBtn.getComponent('frogBtn').status = 1;
                    console.log("Disable bg music");
                    var date = new Date();
                    var year = date.getFullYear(); //获取当前年份   
                    var month = date.getMonth() + 1; //获取当前月份   
                    var dat = date.getDate(); //获取当前日    
                    var hour = date.getHours(); //获取小时   
                    var minute = date.getMinutes(); //获取分钟   
                    var second = date.getSeconds(); //获取秒   
                    var timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
                    var flagValue = self._isMusicOn == false ? 0 : 1;
                    var data = {
                        "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
                        "operationTime": timeStr,
                        "flagBgMusic": flagValue,
                        "bgMusicVolume": self.bgMusicVolume,
                        "bgMusicNum": self.bgMusicNum,
                        "details": ""
                    };
                    var serverAddr = 'https://www.llquruc.top/petGame/php/setBgMusic.php';
                    HttpHelper.httpPost(serverAddr, data, function (res) {
                        if (res != -1) {
                            console.log("Disable bg music successfully");
                        }
                    });
                } else {
                    // Enable bg music
                    this.musicFrogBtn.getComponent('frogBtn').status = 0;
                    console.log("Enable bg music");
                }
                if (value != this._isMusicOn && this._isMusicOn == false) {
                    self.openBgMusicSetting(); //open bgMusic Setting
                }
                this._isMusicOn = value;
                GlobalData.flagBgMusic = this._isMusicOn == false ? 0 : 1;
            }
        },
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
        soundFrogBtn: cc.Node,
        // 音效标志位
        isSoundOn: {
            get: function get() {
                return this._isSoundOn;
            },
            set: function set(value) {
                var self = this;
                if (value == false) {
                    this.soundFrogBtn.getComponent('frogBtn').status = 1;
                    console.log("Disable sound");
                    var flagValue = self._isSoundOn == false ? 0 : 1;
                    var date = new Date();
                    var year = date.getFullYear(); //获取当前年份   
                    var month = date.getMonth() + 1; //获取当前月份   
                    var dat = date.getDate(); //获取当前日    
                    var hour = date.getHours(); //获取小时   
                    var minute = date.getMinutes(); //获取分钟   
                    var second = date.getSeconds(); //获取秒   
                    var timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
                    var data = {
                        "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
                        "operationTime": timeStr,
                        "flagSound": flagValue,
                        "soundVolume": self.soundVolume,
                        "details": ""
                    };
                    var serverAddr = 'https://www.llquruc.top/petGame/php/setSound.php';
                    HttpHelper.httpPost(serverAddr, data, function (res) {
                        if (res != -1) {
                            console.log("Disable sound successfully");
                        }
                    });
                } else {
                    this.soundFrogBtn.getComponent('frogBtn').status = 0;
                    console.log("Enable sound");
                }
                if (value != this._isSoundOn && this._isSoundOn == false) {
                    self.openSoundSetting(); //open Sound Setting
                }
                this._isSoundOn = value;
                GlobalData.flagSound = this._isSoundOn == false ? 0 : 1;
            }
        },
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
        vibrationFrogBtn: cc.Node,
        //震动标志位
        isVibrationOn: {
            get: function get() {
                return this._isVibrationOn;
            },
            set: function set(value) {
                var self = this;
                if (value == false) {
                    this.vibrationFrogBtn.getComponent('frogBtn').status = 1;
                    var date = new Date();
                    var year = date.getFullYear(); //获取当前年份   
                    var month = date.getMonth() + 1; //获取当前月份   
                    var dat = date.getDate(); //获取当前日    
                    var hour = date.getHours(); //获取小时   
                    var minute = date.getMinutes(); //获取分钟   
                    var second = date.getSeconds(); //获取秒   
                    var timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
                    var flagValue = self._isVibrationOn == false ? 0 : 1;
                    //向服务器传数据
                    var data = {
                        "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
                        "operationTime": timeStr,
                        "flagName": "flagVibration",
                        "flagValue": flagValue,
                        "details": ""
                    };
                    var serverAddr = 'https://www.llquruc.top/petGame/php/setting.php';
                    HttpHelper.httpPost(serverAddr, data, function (res) {
                        if (res != -1) {
                            console.log("Set vibration successfully");
                        }
                    });
                } else {
                    this.vibrationFrogBtn.getComponent('frogBtn').status = 0;
                }
                this._isVibrationOn = value;
                GlobalData.flagVibration = this._isVibrationOn == false ? 0 : 1;
            }
        },
        noticeFrogBtn: cc.Node,
        //通知标志位
        isNoticeOn: {
            get: function get() {
                return this._isNoticeOn;
            },
            set: function set(value) {
                var self = this;
                if (value == false) {
                    this.noticeFrogBtn.getComponent('frogBtn').status = 1;
                } else {
                    this.noticeFrogBtn.getComponent('frogBtn').status = 0;
                }
                this._isNoticeOn = value;
                GlobalData.flagNotice = this._isNoticeOn == false ? 0 : 1;
                var date = new Date();
                var year = date.getFullYear(); //获取当前年份   
                var month = date.getMonth() + 1; //获取当前月份   
                var dat = date.getDate(); //获取当前日    
                var hour = date.getHours(); //获取小时   
                var minute = date.getMinutes(); //获取分钟   
                var second = date.getSeconds(); //获取秒   
                var timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
                var flagValue = self._isNoticeOn == false ? 0 : 1;
                //向服务器传数据
                var data = {
                    "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
                    "operationTime": timeStr,
                    "flagName": "flagNotice",
                    "flagValue": flagValue,
                    "details": ""
                };
                var serverAddr = 'https://www.llquruc.top/petGame/php/setting.php';
                HttpHelper.httpPost(serverAddr, data, function (res) {
                    if (res != -1) {
                        console.log("Set Notice successfully");
                    }
                });
            }
        },

        promptBlock1: cc.Node, // 背景音乐框节点
        dropDownBox: cc.Node,

        promptBlock2: cc.Node, // 音效框节点
        soundVolumnLabel: cc.Label,

        promptBlock3: cc.Node, // 背景图片框节点
        bgToggleContainer: cc.ToggleContainer,
        bgPicText: cc.Label,
        //背景图片编号
        bgPicNum: {
            get: function get() {
                return this._bgPicNum;
            },
            set: function set(value) {
                if (value > 3 || value < 0) {
                    value = 0;
                }
                if (value == 0) {
                    this.bgPicText.string = "春意盎然";
                } else if (value == 1) {
                    this.bgPicText.string = "夏日炎炎";
                } else if (value == 2) {
                    this.bgPicText.string = "秋色宜人";
                } else if (value == 3) {
                    this.bgPicText.string = "冬日野趣";
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
        this.flagBgMusic = GlobalData.flagBgMusic; //标志位_是否开启背景音乐
        this.bgMusicVolume = GlobalData.bgMusicVolume; //背景音乐音量
        this.bgMusicNum = GlobalData.bgMusicNum; //背景音乐曲目编号
        this.bgPicNum = GlobalData.bgPicNum; //背景图片编号
        this.flagSound = GlobalData.flagSound; //标志位_是否开启音效
        this.soundVolume = GlobalData.soundVolume; //音效音量
        this.flagNotice = GlobalData.flagNotice; //标志位_是否开启推送通知
        this.flagVibration = GlobalData.flagVibration; //标志位_是否开启震动权限
    },


    //点击背景音乐标志位
    onMusicBtnClicked: function onMusicBtnClicked() {
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);

        this.isMusicOn = !this.isMusicOn;
        console.log("musicFlagBtn clicked");
    },

    //点击音效标志位
    onSoundBtnClicked: function onSoundBtnClicked() {
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);

        this.isSoundOn = !this.isSoundOn;
        console.log("soundFlagBtn clicked");
    },

    //点击震动标志位
    onVibrationBtnClicked: function onVibrationBtnClicked() {
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);

        this.isVibrationOn = !this.isVibrationOn;
        console.log("vibrationFlagBtn clicked");
    },

    //点击通知标志位
    onNoticeBtnClicked: function onNoticeBtnClicked() {
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);

        this.isNoticeOn = !this.isNoticeOn;
        console.log("noticeFlagBtn clicked");
    },

    //点击关闭设置页面
    onCloseBtnClick: function onCloseBtnClick() {
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        console.log("close setting");
        this.musicFrogBtn.getComponent('frogBtn').exit();
        this.soundFrogBtn.getComponent('frogBtn').exit();
        this.noticeFrogBtn.getComponent('frogBtn').exit();
        this.vibrationFrogBtn.getComponent('frogBtn').exit();
        cc.director.loadScene('mainPage');
    },

    //点击背景图片弹出框中的某个图片
    onBgToggleClick: function onBgToggleClick() {
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        var toggleArry = this.bgToggleContainer.getComponentsInChildren(cc.Toggle);
        for (var i = 0; i < toggleArry.length; i++) {
            var element = toggleArry[i];
            if (element.isChecked) {
                this.bgPicNum = i;
                console.log("set background image:" + (this.bgPicNum + 1));
            }
        }
    },
    // 点击背景图片按钮
    onBgBtnClick: function onBgBtnClick() {
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        var action = cc.moveTo(0.5, 0, 0);
        this.promptBlock3.runAction(action);
        console.log("bgPicBtn Clicked");
    },

    //点击背景图片弹出框的取消按钮
    onBgCloseBtnClick: function onBgCloseBtnClick() {
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        // console.log(this.promptBlock3.position);
        var action = cc.moveTo(0.5, this.promptBlock3.parent.width + 50, 0);
        this.promptBlock3.runAction(action);
        console.log("bgPicCloseBtn Clicked");
    },

    //点击背景图片弹出框的确认按钮
    onBgConfirmBtnClick: function onBgConfirmBtnClick() {
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        GlobalData.bgPicNum = this.bgPicNum;
        var action = cc.moveTo(0.5, this.promptBlock3.parent.width + 50, 0);
        this.promptBlock3.runAction(action);
        console.log("bgPicConfirmBtn Clicked");
        console.log("Set bg picture");
        var date = new Date();
        var year = date.getFullYear(); //获取当前年份   
        var month = date.getMonth() + 1; //获取当前月份   
        var dat = date.getDate(); //获取当前日    
        var hour = date.getHours(); //获取小时   
        var minute = date.getMinutes(); //获取分钟   
        var second = date.getSeconds(); //获取秒   
        var timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;

        var data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
            "operationTime": timeStr,
            "bgPicNum": this.bgPicNum,
            "details": ""
        };
        var serverAddr = 'https://www.llquruc.top/petGame/php/setBgPic.php';
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
                console.log("Set bg picture successfully");
            }
        });
    },
    // block1 背景音乐框按钮操作
    openBgMusicSetting: function openBgMusicSetting() {
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        var action = cc.moveTo(0.5, 0, 0);
        this.promptBlock1.runAction(action);
    },

    onBgMusicCloseBtnClick: function onBgMusicCloseBtnClick() {
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        var action = cc.moveTo(0.5, this.promptBlock1.parent.width + 50, 0);
        this.promptBlock1.runAction(action);
    },

    onBgMusicConfirmBtnClick: function onBgMusicConfirmBtnClick() {
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        this.bgMusicNum = parseInt(this.dropDownBox.getChildByName('captainLabel').getComponent(cc.Label).string);
        var action = cc.moveTo(0.5, this.promptBlock1.parent.width + 50, 0);
        this.promptBlock1.runAction(action);
        console.log("Set bg music");
        var date = new Date();
        var year = date.getFullYear(); //获取当前年份   
        var month = date.getMonth() + 1; //获取当前月份   
        var dat = date.getDate(); //获取当前日    
        var hour = date.getHours(); //获取小时   
        var minute = date.getMinutes(); //获取分钟   
        var second = date.getSeconds(); //获取秒   
        var timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var flagValue = this.isMusicOn == false ? 0 : 1;
        var data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
            "operationTime": timeStr,
            "flagBgMusic": flagValue,
            "bgMusicVolume": this.bgMusicVolume,
            "bgMusicNum": this.bgMusicNum,
            "details": ""
        };
        var self = this;
        var serverAddr = 'https://www.llquruc.top/petGame/php/setBgMusic.php';
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
                console.log("Set bg music successfully");
                self.bgMusicAddr = res.bgMusicAddr; //获得背景音乐地址
            }
        });
    },
    //点击背景音乐提示框中的降低音量按钮的事件处理器
    onClickBgMusicVolumeDownBtn: function onClickBgMusicVolumeDownBtn() {
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        this.bgMusicVolume = this.bgMusicVolume - 1;
    },

    //点击背景音乐提示框中的提高音量按钮的事件处理器
    onClickBgMusicVolumeUpBtn: function onClickBgMusicVolumeUpBtn() {
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        this.bgMusicVolume = this.bgMusicVolume + 1;
    },
    // block2 音效按钮操作
    openSoundSetting: function openSoundSetting() {
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        var action = cc.moveTo(0.5, 0, 0);
        this.promptBlock2.runAction(action);
    },

    onSoundCloseBtnClick: function onSoundCloseBtnClick() {
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        var action = cc.moveTo(0.5, this.promptBlock2.parent.width + 50, 0);
        this.promptBlock2.runAction(action);
        console.log("Set sound");
        var date = new Date();
        var year = date.getFullYear(); //获取当前年份   
        var month = date.getMonth() + 1; //获取当前月份   
        var dat = date.getDate(); //获取当前日    
        var hour = date.getHours(); //获取小时   
        var minute = date.getMinutes(); //获取分钟   
        var second = date.getSeconds(); //获取秒   
        var timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var flagValue = this.isSoundOn == false ? 0 : 1;
        var data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
            "operationTime": timeStr,
            "flagSound": flagValue,
            "soundVolume": this.soundVolume,
            "details": ""
        };
        var serverAddr = 'https://www.llquruc.top/petGame/php/setSound.php';
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
                console.log("Set sound successfully");
            }
        });
    },
    //点击音效提示框中的降低音量按钮的事件处理器
    onClickSoundVolumeDownBtn: function onClickSoundVolumeDownBtn() {
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        this.soundVolume = this.soundVolume - 1;
    },

    //点击音效提示框中的提高音量按钮的事件处理器
    onClickSoundVolumeUpBtn: function onClickSoundVolumeUpBtn() {
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        this.soundVolume = this.soundVolume + 1;
    },

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
        //# sourceMappingURL=setting.js.map
        