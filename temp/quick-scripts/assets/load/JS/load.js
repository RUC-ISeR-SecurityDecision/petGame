(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/load/JS/load.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ad105eM3/RL95ZBb6fETvyw', 'load', __filename);
// load/JS/load.js

"use strict";

// 加载数据
var GlobalData = require("globalData");
// 加载框水波对象
var wave = {
    canvasHeight: 200, // 画面高度
    canvasWidth: 300, // 画面宽度
    waveHeight: 10, // 水波高度
    waveWidth: 0.02, // 水波宽度
    xOffset: 0, // 波浪的横坐标偏移
    speed: 0.1, // 波浪速度
    levelHeight: 10 // 水平线
};

cc.Class({
    extends: cc.Component,

    properties: {
        //音效
        btnSound: { //按键音
            default: null,
            url: cc.AudioClip
        },
        loadingBar: cc.Graphics,
        startBtn: cc.Button
    },

    init: function init() {
        console.log("init", GlobalData);
        GlobalData.init();

        // test for login: wangc
        var date = new Date();
        var year = date.getFullYear(); //获取当前年份   
        var month = date.getMonth() + 1; //获取当前月份   
        var dat = date.getDate(); //获取当前日    
        var hour = date.getHours(); //获取小时   
        var minute = date.getMinutes(); //获取分钟   
        var second = date.getSeconds(); //获取秒   
        var timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var flagLocation = GlobalData.flagLocation;
        var serverAddr = GlobalData.serverAddr + "php/login.php";
        // 调用自定义网路接口进行登录操作
        var data = {
            loginTime: timeStr,
            flagLocation: flagLocation
        };
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res == -1) {
                console.log("访问失败");
            } else {
                console.log(res);
                GlobalData.userID = res.userID;
                GlobalData.flagNewUser = Number(res.flagNewUser);
                GlobalData.contLoginDays = Number(res.contLoginDays);
            }
        });

        console.log('登录完成');

        // console.log(globalData.species);
    },

    drawWave: function drawWave() {
        var ctx = this.loadingBar;
        var startX = 0;
        ctx.clear();

        this.time += 1;
        wave.xOffset += wave.speed;
        wave.levelHeight += 1;
        ctx.moveTo(0, 0);
        for (var x = startX; x < startX + wave.canvasWidth; x += 20 / wave.canvasWidth) {
            var y = wave.waveHeight * Math.sin((startX + x) * wave.waveWidth + wave.xOffset) + wave.levelHeight;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(wave.canvasWidth, 0);
        ctx.lineTo(startX, 0);
        ctx.fill();
    },

    onStartBtnClicked: function onStartBtnClicked() {
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        console.log('turn to adopt page');
        cc.director.loadScene("portrayPage");
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.init();
        this.time = 0;
        this.startBtn.node.active = false;
    },
    start: function start() {
        cc.director.preloadScene("portrayPage", function () {
            cc.log("Next scene preloaded");
        });
    },
    update: function update() {
        if (wave.levelHeight < 150) {
            this.drawWave();
        } else {
            this.startBtn.node.active = true;
        }
    }
});

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
        //# sourceMappingURL=load.js.map
        