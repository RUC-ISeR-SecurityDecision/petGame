// 加载数据
var GlobalData = require("globalData");
// 加载框水波对象
var wave = {
    canvasHeight: 200,  // 画面高度
    canvasWidth: 300, // 画面宽度
    waveHeight: 10, // 水波高度
    waveWidth: 0.02,// 水波宽度
    xOffset: 0, // 波浪的横坐标偏移
    speed: 0.1, // 波浪速度
    levelHeight: 10 // 水平线
}

cc.Class({
    extends: cc.Component,

    properties: {
        //音效
        btnSound: {//按键音
            default: null,
            url: cc.AudioClip
        },
        loadingBar: cc.Graphics,
        startBtn: cc.Button
    },

    init: function(){
        console.log("init", GlobalData);

        // test for login: wangc
        let date = new Date();
        let year = date.getFullYear(); //获取当前年份   
        let month = date.getMonth() + 1; //获取当前月份   
        let dat = date.getDate(); //获取当前日    
        let hour = date.getHours(); //获取小时   
        let minute = date.getMinutes(); //获取分钟   
        let second = date.getSeconds(); //获取秒   
        let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        let flagLocation = GlobalData.flagLocation;
        let serverAddr = GlobalData.serverAddr + "php/login.php";
        // 调用自定义网路接口进行登录操作
        var data = {
            loginTime: timeStr,
            flagLocation: flagLocation,
        };
        HttpHelper.httpPost(serverAddr, data, function (res) { //---
            if (res != -1) { 
                console.log(res);
                GlobalData.userID = res.userID;
                GlobalData.flagNewUser = Number(res.flagNewUser);
                GlobalData.contLoginDays = Number(res.contLoginDays);
            }
        });

        console.log('登录完成');

        // console.log(globalData.species);
    },

    drawWave: function() {
        var ctx = this.loadingBar;
        const startX = 0;
        ctx.clear();

        this.time += 1;
        wave.xOffset += wave.speed;
        wave.levelHeight += 1;
        ctx.moveTo(0, 0);
        for (let x = startX; x < startX + wave.canvasWidth; x += 20 / wave.canvasWidth) {
            const y = wave.waveHeight * Math.sin((startX + x) * wave.waveWidth + wave.xOffset) + wave.levelHeight;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(wave.canvasWidth, 0);
        ctx.lineTo(startX, 0);
        ctx.fill();
    },

    onStartBtnClicked: function() {
        //播放按键音
        this.btnSound=cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        console.log('turn to adopt page');
        cc.director.loadScene("portrayPage");
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init();
        this.time = 0;
        this.startBtn.node.active = false;
    },

    start () {
        cc.director.preloadScene("portrayPage", function () {
            cc.log("Next scene preloaded");
        });
    },

    update () {
        if (wave.levelHeight < 150) {
            this.drawWave();
        }
        else {
            this.startBtn.node.active = true;
        }
    },

    /**
     * 进入游戏”按键所对应的事件处理函数，在用户的授权下获得并更新一些用户信息
     * 需要微信接口，测试时可以先注释掉
     * author: qll
     * time: 2020/1/16
     */
    bindEnter: function (e) {
        let instance = this;
        if (e.detail.userInfo) {   //获得用户的微信账户信息
            console.log(e.detail.userInfo);
            GlobalData.userGender = e.detail.userInfo.gender;
            GlobalData.userName = e.detail.userInfo.nickName;
            GlobalData.userAvatarUrl = e.detail.userInfo.userAvatarUrl;
        }
        else {
            wx.showModal({
                title: '用户未授权',
                content: '拒绝授权将不能体验小游戏完整功能，点击确定开启授权',
                success: (res) => {
                    console.log(res);
                    if (res.confirm) {
                        wx.openSetting({});
                    }
                }
            });
        }
        //询问用户是否授权位置信息（一个实际上不必要的授权，用来测试用户的安全意识）
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userLocation'] != true) {
                    wx.showModal({
                        title: '定位授权',
                        content: '萌宠物语请求获得您的位置信息，请确认授权',
                        success: (res) => {
                            console.log(res);
                            if (res.confirm) {
                                wx.openSetting({
                                    success(settingdata) {
                                        console.log(settingdata);
                                        if (settingdata.authSetting['scope.userLocation']) {
                                            GlobalData.flagLocation = 1;
                                            console.log("位置授权成功");
                                            instance.login();
                                        }
                                        else {
                                            GlobalData.flagLocation = 0;
                                            console.log("取消位置授权");
                                            instance.login();
                                        }
                                    }
                                })
                            }
                            if (res.cancel) {
                                GlobalData.flagLocation = 0;
                                console.log("位置授权失败");
                                instance.login();
                            }
                        }
                    });
                }
            }
        });
    },

     /**
     *  登录函数
     *  需要微信接口，测试时可以先注释掉
     *  author: qll
     *  time: 2020/01/16
     */
    login: function () {
        // wx.login({
        //     success: res => {
        //         // 发送 res.code 到后台并收取生成的userID，
        //         let js_code = res.code;
        //         console.log(js_code);
        //         let date = new Date();
        //         let year = date.getFullYear(); //获取当前年份   
        //         let month = date.getMonth() + 1; //获取当前月份   
        //         let dat = date.getDate(); //获取当前日    
        //         let hour = date.getHours(); //获取小时   
        //         let minute = date.getMinutes(); //获取分钟   
        //         let second = date.getSeconds(); //获取秒   
        //         let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        //         let flagLocation = GlobalData.flagLocation;
        //         let serverAddr = GlobalData.serverAddr + "php/login.php";
        //         // 调用自定义网路接口进行登录操作
        //         let data = {
        //             "js_code": js_code,
        //             "loginTime": timeStr,
        //             "flagLocation": flagLocation,
        //         };
        //         HttpHelper.httpPost(serverAddr, data, function(res) {
        //          if (res != -1) {
        //                 console.log(res);
        //                 GlobalData.userID = res.userID;
        //                 GlobalData.flagNewUser = Number(res.flagNewUser);
        //                 GlobalData.contLoginDays = Number(res.contLoginDays);
        //                 GlobalData.flagContLoginReward = Number(res.flagContLoginReward);
        //                 GlobalData.flagLoginReward = Number(res.flagLoginReward);
        //          }
        //         });
        //     }
        // })

        console.log('登录完成');

        if (GlobalData.flagNewUser == 1)//新用户，跳到领养界面
        {
            cc.director.loadScene("portrayPage");
        }
        else   //老用户，查询属性信息，恢复场景，生成奖励
        {
            cc.director.loadScene("main");
        }
    },
});
