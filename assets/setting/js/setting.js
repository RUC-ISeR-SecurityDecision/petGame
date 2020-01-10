var GlobalData = require('globalData');
cc.Class({
    extends: cc.Component,

    properties: {
        //音效
        btnSound: {//按键音
            default: null,
            url: cc.AudioClip
        },

        musicOnButton: cc.Button,
        musicOffButton: cc.Button,
        // 背景音乐标志位
        isMusicOn: {
            get() {
                return this._isMusicOn;
            },
            set(value) {
                let self = this;
                let onNode = this.musicOnButton.node;
                let offNode = this.musicOffButton.node;
                if (value == false) {  //Disable bg music
                    let offEnd = cc.callFunc(function () {
                        // let onBtnOffAction = cc.moveTo(0.1, -48, 0);
                        // onNode.runAction(onBtnOffAction);
                        onNode.active = false;
                    }, self, null);
                    offNode.active = true;
                    onNode.zIndex = 0;
                    offNode.zIndex = 1;
                    
                    let offBtnOffAction = cc.sequence(cc.moveTo(0.3, -3, 0), offEnd);
                    
                    offNode.runAction(offBtnOffAction);
                    console.log("Disable bg music");
                    let date = new Date();
                    let year = date.getFullYear(); //获取当前年份   
                    let month = date.getMonth() + 1; //获取当前月份   
                    let dat = date.getDate(); //获取当前日    
                    let hour = date.getHours(); //获取小时   
                    let minute = date.getMinutes(); //获取分钟   
                    let second = date.getSeconds(); //获取秒   
                    let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
                    let flagValue = self._isMusicOn == false ? 0 : 1;
                    var data = {
                        "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
                        "operationTime": timeStr,
                        "flagBgMusic": flagValue,
                        "bgMusicVolume": self.bgMusicVolume,
                        "bgMusicNum": self.bgMusicNum,
                        "details": "",
                    };
                    var serverAddr = 'https://www.llquruc.top/petGame/php/setBgMusic.php';
                    HttpHelper.httpPost(serverAddr, data, function (res) {
                        if (res != -1) {
                            console.log("Disable bg music successfully");
                        }
                    });

                } else {   //Enable bg music
                    let onEnd = cc.callFunc(function () {
                        offNode.active = false;
                    }, self, null);
                    onNode.active = true;
                    onNode.zIndex = 1;
                    offNode.zIndex = 0;
                    let offBtnOnAction = cc.moveTo(0.3, 48, 0);
                    let onBtnOnAction = cc.sequence(cc.moveTo(0.3, 3, 0), onEnd);
                    offNode.runAction(offBtnOnAction);
                    onNode.runAction(onBtnOnAction);
                    console.log("Enable bg music");
                }
                if (value != this._isMusicOn && this._isMusicOn == false) {
                    self.openBgMusicSetting();  //open bgMusic Setting
                }
                this._isMusicOn = value;
                GlobalData.flagBgMusic = this._isMusicOn == false ? 0 : 1;
            }
        },
        // 背景音乐曲目编号
        bgMusicNum: {
            get() {
                return this._bgMusicNum;
            },
            set(value) {
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
            get() {
                return this._bgMusicVolume;
            },
            set(value) {
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
        soundOnButton: cc.Button,
        soundOffButton: cc.Button,
        // 音效标志位
        isSoundOn: {
            get() {
                return this._isSoundOn;
            },
            set(value) {
                let self = this;
                let onNode = this.soundOnButton.node;
                let offNode = this.soundOffButton.node;
                if (value == false) {
                    let offEnd = cc.callFunc(function () {
                        onNode.active = false;
                    }, self, null);
                    offNode.active = true;
                    onNode.zIndex = 0;
                    offNode.zIndex = 1;
                    let onBtnOffAction = cc.moveTo(0.3, -48, 0);
                    let offBtnOffAction = cc.sequence(cc.moveTo(0.3, -3, 0), offEnd);
                    onNode.runAction(onBtnOffAction);
                    offNode.runAction(offBtnOffAction);
                    console.log("Disable sound");
                    let flagValue = self._isSoundOn == false ? 0 : 1;
                    let date = new Date();
                    let year = date.getFullYear(); //获取当前年份   
                    let month = date.getMonth() + 1; //获取当前月份   
                    let dat = date.getDate(); //获取当前日    
                    let hour = date.getHours(); //获取小时   
                    let minute = date.getMinutes(); //获取分钟   
                    let second = date.getSeconds(); //获取秒   
                    let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
                    var data = {
                        "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
                        "operationTime": timeStr,
                        "flagSound": flagValue,
                        "soundVolume": self.soundVolume,
                        "details": "",
                    };
                    var serverAddr = 'https://www.llquruc.top/petGame/php/setSound.php';
                    HttpHelper.httpPost(serverAddr, data, function (res) {
                        if (res != -1) {
                            console.log("Disable sound successfully");
                        }
                    });
                } else {
                    let onEnd = cc.callFunc(function () {
                        offNode.active = false;
                    }, self, null);
                    onNode.active = true;
                    onNode.zIndex = 1;
                    offNode.zIndex = 0;
                    let offBtnOnAction = cc.moveTo(0.3, 48, 0);
                    let onBtnOnAction = cc.sequence(cc.moveTo(0.3, 3, 0), onEnd);
                    offNode.runAction(offBtnOnAction);
                    onNode.runAction(onBtnOnAction);
                    console.log("Enable sound");
                }
                if (value != this._isSoundOn && this._isSoundOn == false) {
                    self.openSoundSetting();  //open Sound Setting
                }
                this._isSoundOn = value;
                GlobalData.flagSound = this._isSoundOn == false ? 0 : 1;
            }
        },
        // 音效音量
        soundVolume: {
            get() {
                return this._soundVolume;
            },
            set(value) {
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
        vibrationOnButton: cc.Button,
        vibrationOffButton: cc.Button,
        //震动标志位
        isVibrationOn: {
            get() {
                return this._isVibrationOn;
            },
            set(value) {
                let self = this;
                let onNode = this.vibrationOnButton.node;
                let offNode = this.vibrationOffButton.node;
                if (value == false) {
                    let offEnd = cc.callFunc(function () {
                        onNode.active = false;
                    }, self, null);
                    offNode.active = true;
                    onNode.zIndex = 0;
                    offNode.zIndex = 1;
                    let onBtnOffAction = cc.moveTo(0.3, -48, 0);
                    let offBtnOffAction = cc.sequence(cc.moveTo(0.3, -3, 0), offEnd);
                    onNode.runAction(onBtnOffAction);
                    offNode.runAction(offBtnOffAction);

                } else {
                    let onEnd = cc.callFunc(function () {
                        offNode.active = false;
                    }, self, null);
                    onNode.active = true;
                    onNode.zIndex = 1;
                    offNode.zIndex = 0;
                    let offBtnOnAction = cc.moveTo(0.3, 48, 0);
                    let onBtnOnAction = cc.sequence(cc.moveTo(0.3, 3, 0), onEnd);
                    offNode.runAction(offBtnOnAction);
                    onNode.runAction(onBtnOnAction);
                }
                this._isVibrationOn = value;
                GlobalData.flagVibration = this._isVibrationOn == false ? 0 : 1;
                let date = new Date();
                let year = date.getFullYear(); //获取当前年份   
                let month = date.getMonth() + 1; //获取当前月份   
                let dat = date.getDate(); //获取当前日    
                let hour = date.getHours(); //获取小时   
                let minute = date.getMinutes(); //获取分钟   
                let second = date.getSeconds(); //获取秒   
                let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
                let flagValue = self._isVibrationOn == false ? 0 : 1;
                //向服务器传数据
                var data = {
                    "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
                    "operationTime": timeStr,
                    "flagName": "flagVibration",
                    "flagValue": flagValue,
                    "details": "",
                };
                var serverAddr = 'https://www.llquruc.top/petGame/php/setting.php';
                HttpHelper.httpPost(serverAddr, data, function (res) {
                    if (res != -1) {
                        console.log("Set vibration successfully");
                    }
                });
            },
        },
        noticeOnButton: cc.Button,
        noticeOffButton: cc.Button,
        //通知标志位
        isNoticeOn: {
            get() {
                return this._isNoticeOn;
            },
            set(value) {
                let self = this;
                let onNode = this.noticeOnButton.node;
                let offNode = this.noticeOffButton.node;
                if (value == false) {
                    let offEnd = cc.callFunc(function () {
                        onNode.active = false;
                    }, self, null);
                    offNode.active = true;
                    onNode.zIndex = 0;
                    offNode.zIndex = 1;
                    let onBtnOffAction = cc.moveTo(0.3, -48, 0);
                    let offBtnOffAction = cc.sequence(cc.moveTo(0.3, -3, 0), offEnd);
                    onNode.runAction(onBtnOffAction);
                    offNode.runAction(offBtnOffAction);

                } else {
                    let onEnd = cc.callFunc(function () {
                        offNode.active = false;
                    }, self, null);
                    onNode.active = true;
                    onNode.zIndex = 1;
                    offNode.zIndex = 0;
                    let offBtnOnAction = cc.moveTo(0.3, 48, 0);
                    let onBtnOnAction = cc.sequence(cc.moveTo(0.3, 3, 0), onEnd);
                    offNode.runAction(offBtnOnAction);
                    onNode.runAction(onBtnOnAction);
                }
                this._isNoticeOn = value;
                GlobalData.flagNotice = this._isNoticeOn == false ? 0 : 1;
                let date = new Date();
                let year = date.getFullYear(); //获取当前年份   
                let month = date.getMonth() + 1; //获取当前月份   
                let dat = date.getDate(); //获取当前日    
                let hour = date.getHours(); //获取小时   
                let minute = date.getMinutes(); //获取分钟   
                let second = date.getSeconds(); //获取秒   
                let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
                let flagValue = self._isNoticeOn == false ? 0 : 1;
                //向服务器传数据
                var data = {
                    "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
                    "operationTime": timeStr,
                    "flagName": "flagNotice",
                    "flagValue": flagValue,
                    "details": "",
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
        //背景图片编号
        bgPicNum: {
            get() {
                return this._bgPicNum;
            },
            set(value) {
                if (value > 3 || value < 0) {
                    value = 0;
                }
                this._bgPicNum = value;
            }
        },
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.isMusicOn = GlobalData.flagBgMusic == 0 ? false : true;
        this.isSoundOn = GlobalData.flagSound == 0 ? false : true;
        this.isVibrationOn = GlobalData.flagVibration == 0 ? false : true;
        this.isNoticeOn = GlobalData.flagNotice == 0 ? false : true;
        this.flagBgMusic = GlobalData.flagBgMusic;//标志位_是否开启背景音乐
        this.bgMusicVolume = GlobalData.bgMusicVolume;//背景音乐音量
        this.bgMusicNum = GlobalData.bgMusicNum;//背景音乐曲目编号
        this.bgPicNum = GlobalData.bgPicNum;//背景图片编号
        this.flagSound = GlobalData.flagSound;//标志位_是否开启音效
        this.soundVolume = GlobalData.soundVolume;//音效音量
        this.flagNotice = GlobalData.flagNotice;//标志位_是否开启推送通知
        this.flagVibration = GlobalData.flagVibration;//标志位_是否开启震动权限
    },

    //点击背景音乐标志位
    onMusicBtnClicked: function () {
        //播放按键音
        this.btnSound=cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);

        this.isMusicOn = !this.isMusicOn;
        console.log("musicFlagBtn clicked");
    },

    //点击音效标志位
    onSoundBtnClicked: function () {
        //播放按键音
        this.btnSound=cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        
        this.isSoundOn = !this.isSoundOn;
        console.log("soundFlagBtn clicked");
    },

    //点击震动标志位
    onVibrationBtnClicked: function () {
        //播放按键音
        this.btnSound=cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);

        this.isVibrationOn = !this.isVibrationOn;
        console.log("vibrationFlagBtn clicked");
    },

    //点击通知标志位
    onNoticeBtnClicked: function () {
        //播放按键音
        this.btnSound=cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);

        this.isNoticeOn = !this.isNoticeOn;
        console.log("noticeFlagBtn clicked");
    },

    //点击关闭设置页面
    onCloseBtnClick: function () {
        //播放按键音
        this.btnSound=cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        console.log("close setting");
        cc.director.loadScene('mainPage');

    },

    //点击背景图片弹出框中的某个图片
    onBgToggleClick: function () {
        //播放按键音
        this.btnSound=cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        let toggleArry = this.bgToggleContainer.getComponentsInChildren(cc.Toggle);
        for (let i = 0; i < toggleArry.length; i++) {
            const element = toggleArry[i];
            if (element.isChecked) {
                this.bgPicNum = i;
                console.log("set background image:" + (this.bgPicNum + 1));
            }
        }
    },
    // 点击背景图片按钮
    onBgBtnClick: function () {
        //播放按键音
        this.btnSound=cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        let action = cc.moveTo(0.5, 0, 0);
        this.promptBlock3.runAction(action);
        console.log("bgPicBtn Clicked");
    },

    //点击背景图片弹出框的取消按钮
    onBgCloseBtnClick: function () {
        //播放按键音
        this.btnSound=cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        // console.log(this.promptBlock3.position);
        let action = cc.moveTo(0.5, this.promptBlock3.parent.width + 50, 0);
        this.promptBlock3.runAction(action);
        console.log("bgPicCloseBtn Clicked");
    },

    //点击背景图片弹出框的确认按钮
    onBgConfirmBtnClick: function () {
        //播放按键音
        this.btnSound=cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        GlobalData.bgPicNum = this.bgPicNum;
        let action = cc.moveTo(0.5, this.promptBlock3.parent.width + 50, 0);
        this.promptBlock3.runAction(action);
        console.log("bgPicConfirmBtn Clicked");
        console.log("Set bg picture");
        let date = new Date();
        let year = date.getFullYear(); //获取当前年份   
        let month = date.getMonth() + 1; //获取当前月份   
        let dat = date.getDate(); //获取当前日    
        let hour = date.getHours(); //获取小时   
        let minute = date.getMinutes(); //获取分钟   
        let second = date.getSeconds(); //获取秒   
        let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;

        var data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
            "operationTime": timeStr,
            "bgPicNum": this.bgPicNum,
            "details": "",
        };
        var serverAddr = 'https://www.llquruc.top/petGame/php/setBgPic.php';
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
                console.log("Set bg picture successfully");
            }
        });
    },
    // block1 背景音乐框按钮操作
    openBgMusicSetting: function () {
        //播放按键音
        this.btnSound=cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        let action = cc.moveTo(0.5, 0, 0);
        this.promptBlock1.runAction(action);
    },

    onBgMusicCloseBtnClick: function () {
        //播放按键音
        this.btnSound=cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        let action = cc.moveTo(0.5, this.promptBlock1.parent.width + 50, 0);
        this.promptBlock1.runAction(action);
    },

    onBgMusicConfirmBtnClick: function () {
        //播放按键音
        this.btnSound=cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        this.bgMusicNum = parseInt(this.dropDownBox.getChildByName('captainLabel').getComponent(cc.Label).string);
        let action = cc.moveTo(0.5, this.promptBlock1.parent.width + 50, 0);
        this.promptBlock1.runAction(action);
        console.log("Set bg music");
        let date = new Date();
        let year = date.getFullYear(); //获取当前年份   
        let month = date.getMonth() + 1; //获取当前月份   
        let dat = date.getDate(); //获取当前日    
        let hour = date.getHours(); //获取小时   
        let minute = date.getMinutes(); //获取分钟   
        let second = date.getSeconds(); //获取秒   
        let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        let flagValue = this.isMusicOn == false ? 0 : 1;
        var data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
            "operationTime": timeStr,
            "flagBgMusic": flagValue,
            "bgMusicVolume": this.bgMusicVolume,
            "bgMusicNum": this.bgMusicNum,
            "details": "",
        };
        var self = this;
        var serverAddr = 'https://www.llquruc.top/petGame/php/setBgMusic.php';
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
                console.log("Set bg music successfully");
                self.bgMusicAddr = res.bgMusicAddr;  //获得背景音乐地址
            }
        });
    },
    //点击背景音乐提示框中的降低音量按钮的事件处理器
    onClickBgMusicVolumeDownBtn: function () {
        //播放按键音
        this.btnSound=cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        this.bgMusicVolume = this.bgMusicVolume - 1;
    },

    //点击背景音乐提示框中的提高音量按钮的事件处理器
    onClickBgMusicVolumeUpBtn: function () {
        //播放按键音
        this.btnSound=cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        this.bgMusicVolume = this.bgMusicVolume + 1;
    },
    // block2 音效按钮操作
    openSoundSetting: function () {
        //播放按键音
        this.btnSound=cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        let action = cc.moveTo(0.5, 0, 0);
        this.promptBlock2.runAction(action);
    },

    onSoundCloseBtnClick: function () {
        //播放按键音
        this.btnSound=cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        let action = cc.moveTo(0.5, this.promptBlock2.parent.width + 50, 0);
        this.promptBlock2.runAction(action);
        console.log("Set sound");
        let date = new Date();
        let year = date.getFullYear(); //获取当前年份   
        let month = date.getMonth() + 1; //获取当前月份   
        let dat = date.getDate(); //获取当前日    
        let hour = date.getHours(); //获取小时   
        let minute = date.getMinutes(); //获取分钟   
        let second = date.getSeconds(); //获取秒   
        let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        let flagValue = this.isSoundOn == false ? 0 : 1;
        var data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
            "operationTime": timeStr,
            "flagSound": flagValue,
            "soundVolume": this.soundVolume,
            "details": "",
        };
        var serverAddr = 'https://www.llquruc.top/petGame/php/setSound.php';
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
                console.log("Set sound successfully");
            }
        });
    },
    //点击音效提示框中的降低音量按钮的事件处理器
    onClickSoundVolumeDownBtn: function () {
        //播放按键音
        this.btnSound=cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        this.soundVolume = this.soundVolume - 1;
    },

    //点击音效提示框中的提高音量按钮的事件处理器
    onClickSoundVolumeUpBtn: function () {
        //播放按键音
        this.btnSound=cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        this.soundVolume = this.soundVolume + 1;
    },


    start() {

    },

    // update (dt) {},
});
