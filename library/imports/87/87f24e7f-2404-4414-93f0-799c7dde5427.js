"use strict";
cc._RF.push(module, '87f245/JAREFJPweZx93lQn', 'main');
// main/js/main.js

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

var GlobalData = require('globalData');

cc.Class({
    extends: cc.Component,

    properties: {
        profile: cc.Sprite,
        pet: cc.Sprite,
        shop: cc.Sprite,
        tripBtn: cc.Sprite,
        workBtn: cc.Sprite,
        homeBtn: cc.Sprite,
        sleepBtn: cc.Sprite,
        functionBtn: cc.Button,

        //以下为页面中需要展示的值
        hunger: cc.Label, // 饥饿值
        hungerCeiling: cc.Label, // 饥饿值上限
        cleaness: cc.Label, // 清洁值
        cleanessCeiling: cc.Label, // 清洁值上限
        thirst: cc.Label, // 口渴值
        thirstCeiling: cc.Label, // 口渴值上限
        mood: cc.Label, // 心情值
        moodCeiling: cc.Label, // 心情值上限
        energy: cc.Label, // 能量值
        energyCeiling: cc.Label, // 能量值上限
        growth: cc.Label, // 成长值
        growthLevel: cc.Label, // 成长值等级
        coin: cc.Label, // 金币值

        _isFunctionShow: true,
        //author:qll
        //time:2019.12.4
        _isBagShow: false, //标志位_是否展示背包
        _isSleepSettingShow: false, //标志位_是否展示睡觉设置框
        _isWorkSettingShow: false, //标志位_是否展示工作设置框
        _isTripSettingShow: false, //标志位_是否展示旅游设置框
        _isPlaySettingShow: false, //标志位_是否展示玩耍子操作框
        _isClockShow: false, //标志位_是否显示倒计时（用于睡觉、打工和旅游）

        _isLoginRewardShow: false, //标志位_是否显示登录奖励
        _isContLoginRewardShow: false, //标志位_是否显示连续登录奖励
        _isRandomRewardShow: false, //标志位_是否显示随机奖励
        _isUpgradeRewardShow: false, //标志位_是否显示升级奖励

        timeIndex: [0, 30, 40, 50, 60], //不同的时间ID对应的具体秒数（适用于旅游、打工和睡觉操作）P.S. ID0是无效的

        workTypeID: 0, //工种设置
        workTimeID: 0, //工时设置

        tripLocID: 0, //旅游地点设置
        tripTimeID: 0, //旅游时长设置

        sleepTimeID: 0, //睡觉时间设置

        updateID: 0 //用于退出该页面时清除interval
    },

    //生成登录奖励
    genLoginReward: function genLoginReward() {
        var date = new Date();
        var year = date.getFullYear(); //获取当前年份   
        var month = date.getMonth() + 1; //获取当前月份   
        var dat = date.getDate(); //获取当前日    
        var hour = date.getHours(); //获取小时   
        var minute = date.getMinutes(); //获取分钟   
        var second = date.getSeconds(); //获取秒   
        var timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var serverAddr = GlobalData.serverAddr + "php/genReward.php";
        var instance = this;
        $.ajax({
            url: serverAddr,
            type: 'POST',
            dataType: json,
            data: {
                userID: GlobalData.userID,
                genTime: timeStr,
                rewardCategoryID: 1,
                rewardLevel: 1
            },
            success: function success(res) {
                console.log(res);
                GlobalData.loginRewardCoin = res.rewardCoin; //奖励金币数
                GlobalData.loginRewardGrowth = res.rewardGrowth; //奖励成长值
                instance._isLoginRewardShow = true;
            }
        });
    },

    //生成连续登录奖励
    genContLoginReward: function genContLoginReward() {
        var date = new Date();
        var year = date.getFullYear(); //获取当前年份   
        var month = date.getMonth() + 1; //获取当前月份   
        var dat = date.getDate(); //获取当前日    
        var hour = date.getHours(); //获取小时   
        var minute = date.getMinutes(); //获取分钟   
        var second = date.getSeconds(); //获取秒   
        var timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var serverAddr = GlobalData.serverAddr + "php/genReward.php";
        var instance = this;
        $.ajax({
            url: serverAddr,
            type: 'POST',
            dataType: json,
            data: {
                userID: GlobalData.userID,
                genTime: timeStr,
                rewardCategoryID: 2,
                rewardLevel: GlobalData.contLoginDays
            },
            success: function success(res) {
                console.log(res);
                GlobalData.contLoginRewardCoin = res.rewardCoin; //奖励金币数
                GlobalData.contLoginRewardGrowth = res.rewardGrowth; //奖励成长值
                instance._isContLoginRewardShow = true;
            }
        });
    },

    /**
     *  登录函数
     *  需要微信接口，测试时可以先注释掉
     *  author: qll
     *  time: 2019/12/2
     */
    login: function login() {
        var flagContLoginReward = 0;
        var flagLoginReward = 0;
        wx.login({
            success: function success(res) {
                // 发送 res.code 到后台并收取生成的userID，
                var js_code = res.code;
                console.log(js_code);
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
                $.ajax({
                    url: serverAddr,
                    type: 'POST',
                    dataType: json,
                    data: {
                        js_code: js_code,
                        loginTime: timeStr,
                        flagLocation: flagLocation
                    },
                    success: function success(res) {
                        console.log(res);
                        GlobalData.userID = res.userID;
                        GlobalData.flagNewUser = Number(res.flagNewUser);
                        GlobalData.contLoginDays = Number(res.contLoginDays);
                        flagContLoginReward = Number(res.flagContLoginReward);
                        flagLoginReward = Number(res.flagLoginReward);
                    }
                });
            }
        });
        console.log('登录完成');

        if (GlobalData.flagNewUser == 1) //新用户，跳到领养界面
            {
                cc.director.loadScene("adopt");
            } else //老用户，查询属性信息，恢复场景，生成奖励
            {
                this.queryAttribute();
                if (flagLoginReward == 1) {
                    this.genLoginReward();
                }
                if (flagContLoginReward == 1) {
                    this.genContLoginReward();
                }
            }
    },

    autoUpdate: function autoUpdate() {
        this.hunger.string = GlobalData.hunger; // 饥饿值
        this.cleaness.string = GlobalData.cleaness; // 清洁值
        this.thirst.string = GlobalData.thirst; // 口渴值
        this.mood.string = GlobalData.mood; // 心情值
        this.energy.string = GlobalData.energy; // 能量值
        this.growth.string = GlobalData.growth; // 成长值
        this.growthLevel.string = GlobalData.growthLevel; // 成长值等级
        this.coin.string = GlobalData.coin; // 金币值
        //检查是否有奖励生成（仅限随机和升级）
        if (GlobalData.flagRandomReward == true) {
            this._isRandomRewardShow = true; //在主界面某处出现随机奖励
        }
        if (GlobalData.flagUpgradeReward == true) {
            this._isUpgradeRewardShow = true; //弹出升级奖励框
        }
    },

    init: function init() {
        var _this = this;

        //进入该页面时调用此函数
        // 初始化宠物形象
        var sprite = this.pet;
        if (GlobalData.species == 0) {
            cc.loader.loadRes("owl-simple", cc.SpriteFrame, function (err, sp) {
                console.log(err);
                if (err) return;
                if (_this.node) {
                    console.log("success");
                    if (sprite) {
                        sprite.spriteFrame = sp;
                    }
                }
            });
        } else if (GlobalData.species == 1) {
            cc.loader.loadRes("penguin-simple", cc.SpriteFrame, function (err, sp) {
                console.log(err);
                if (err) return;
                if (_this.node) {
                    console.log("success");
                    if (sprite) {
                        sprite.spriteFrame = sp;
                    }
                }
            });
        } else if (GlobalData.species == 2) {
            cc.loader.loadRes("cat-simple", cc.SpriteFrame, function (err, sp) {
                console.log(err);
                if (err) return;
                if (_this.node) {
                    console.log("success");
                    if (sprite) {
                        sprite.spriteFrame = sp;
                    }
                }
            });
        } else if (GlobalData.species == 3) {
            cc.loader.loadRes("dog-simple", cc.SpriteFrame, function (err, sp) {
                console.log(err);
                if (err) return;
                if (_this.node) {
                    console.log("success");
                    if (sprite) {
                        sprite.spriteFrame = sp;
                    }
                }
            });
        }
        //开始实时更新宠物属性值
        var interval = 1000; //1秒
        this.updateID = setInterval(this.autoUpdate, interval);
        this._isFunctionShow = true;
    },

    exit: function exit() {
        //退出该页面时调用此函数
        clearInterval(this.updateID);
    },

    onPlusBtnClicked: function onPlusBtnClicked() {
        // 动作期间禁用功能按钮
        this.functionBtn.interactable = false;
        this.showFunction();
    },

    showFunction: function showFunction() {
        this._isFunctionShow = !this._isFunctionShow;
        var actionSleepBtn = null;
        var actionWorkBtn = null;
        var actionTripBtn = null;
        // 动作结束时触发回调函数，让功能按钮恢复使用
        var funcBtnEnd = cc.callFunc(function () {
            this.functionBtn.interactable = true;
        }, this, null);
        var actionPlusBtn = cc.sequence(cc.rotateBy(0.7, 360), funcBtnEnd);
        if (!this._isFunctionShow) {
            actionTripBtn = cc.spawn(cc.moveBy(0.5, cc.v2(0, -100)), cc.fadeOut(0.7));
            actionWorkBtn = cc.spawn(cc.moveBy(0.6, cc.v2(0, -194)), cc.fadeOut(0.7));
            actionSleepBtn = cc.spawn(cc.moveBy(0.7, cc.v2(0, -288)), cc.fadeOut(0.7));
        } else {
            actionTripBtn = cc.spawn(cc.moveBy(0.5, cc.v2(0, 100)), cc.fadeIn(0.5));
            actionWorkBtn = cc.spawn(cc.moveBy(0.6, cc.v2(0, 194)), cc.fadeIn(0.5));
            actionSleepBtn = cc.spawn(cc.moveBy(0.7, cc.v2(0, 288)), cc.fadeIn(0.5));
        }
        this.tripBtn.node.runAction(actionTripBtn);
        this.workBtn.node.runAction(actionWorkBtn);
        this.sleepBtn.node.runAction(actionSleepBtn);
        this.functionBtn.node.runAction(actionPlusBtn);
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        console.log(GlobalData);
        this.init();
    },
    start: function start() {},


    /**
     * 进入游戏”按键所对应的事件处理函数，在用户的授权下获得并更新一些用户信息
     * 需要微信接口，测试时可以先注释掉
     * author: qll
     * time: 2019/12/4
     */
    bindEnter: function bindEnter(e) {
        var instance = this;
        if (e.detail.userInfo) {
            //获得用户的微信账户信息
            console.log(e.detail.userInfo);
            GlobalData.userGender = e.detail.userInfo.gender;
            GlobalData.userName = e.detail.userInfo.nickName;
        } else {
            wx.showModal({
                title: '用户未授权',
                content: '拒绝授权将不能体验小游戏完整功能，点击确定开启授权',
                success: function success(res) {
                    console.log(res);
                    if (res.confirm) {
                        wx.openSetting({});
                    }
                }
            });
        }
        //询问用户是否授权位置信息（一个实际上不必要的授权，用来测试用户的安全意识）
        wx.getSetting({
            success: function success(res) {
                if (res.authSetting['scope.userLocation'] != true) {
                    wx.showModal({
                        title: '定位授权',
                        content: '萌宠物语请求获得您的位置信息，请确认授权',
                        success: function success(res) {
                            console.log(res);
                            if (res.confirm) {
                                wx.openSetting({
                                    success: function success(settingdata) {
                                        console.log(settingdata);
                                        if (settingdata.authSetting['scope.userLocation']) {
                                            GlobalData.flagLocation = 1;
                                            console.log("位置授权成功");
                                            instance.login();
                                        } else {
                                            GlobalData.flagLocation = 0;
                                            console.log("取消位置授权");
                                            instance.login();
                                        }
                                    }
                                });
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

    queryAttribute: function queryAttribute() {
        var serverAddr = GlobalData.serverAddr + "php/queryUserAttribute.php";
        $.ajax({
            url: serverAddr,
            type: 'POST',
            dataType: json,
            data: {
                userID: GlobalData.userID
            },
            success: function success(res) {
                console.log(res);
                GlobalData.coin = res.coin; //金币值
                GlobalData.title = res.title; //主人称呼
            }
        });
        serverAddr = GlobalData.serverAddr + "php/queryPetAttribute.php";
        $.ajax({
            url: serverAddr,
            type: 'POST',
            dataType: json,
            data: {
                userID: GlobalData.userID
            },
            success: function success(res) {
                console.log(res);
                GlobalData.lastLoginTime = res.lastLoginTime; //上一次登录时间
                GlobalData.contLoginDays = res.contLoginDays; //连续登录天数
                GlobalData.species = res.species; // 宠物种类
                GlobalData.name = res.name; // 宠物名字
                GlobalData.gender = res.gender; //  宠物性别
                GlobalData.color = res.color; // 宠物毛色
                GlobalData.hunger = res.hunger; // 宠物饥饿值
                GlobalData.hungerCeiling = res.hungerCeiling; // 宠物饥饿值上限
                GlobalData.cleaness = res.cleaness; // 宠物清洁值
                GlobalData.cleanessCeiling = res.cleanessCeiling; // 宠物清洁值上限
                GlobalData.thirst = res.thirst; // 宠物口渴值
                GlobalData.thirstCeiling = res.thirstCeiling; // 宠物口渴值上限
                GlobalData.mood = res.mood; // 宠物心情值
                GlobalData.moodCeiling = res.moodCeiling; // 宠物心情值上限
                GlobalData.energy = res.energy; // 宠物能量值
                GlobalData.energyCeiling = res.energyCeiling; // 宠物能量值上限
                GlobalData.growth = res.growth; // 宠物成长值
                GlobalData.growthLevel = res.growthLevel; // 宠物成长等级
                GlobalData.flagAgeGroup = res.flagAgeGroup; // 标志位：幼年or成年
                GlobalData.flagSkipping = res.flagSkipping; //标志位_是否解锁“跳绳”操作
                GlobalData.flagStory = res.flagStory; //标志位_是否解锁“讲故事”操作
                GlobalData.flagSleep = res.flagSleep; //标志位-是否正在睡觉
                GlobalData.sleepRemainTime = res.sleepRemainTime; //睡觉剩余时长
                GlobalData.flagWork = res.flagWork; //标志位-是否正在打工
                GlobalData.workRemainTime = res.workRemainTime; //打工剩余时长
                GlobalData.flagTrip = res.flagTrip; //标志位-是否正在旅游
                GlobalData.tripRemainTime = res.tripRemainTime; //旅游剩余时长
            }
        });
        serverAddr = GlobalData.serverAddr + "php/querySetting.php";
        $.ajax({
            url: serverAddr,
            type: 'POST',
            dataType: json,
            data: {
                userID: GlobalData.userID
            },
            success: function success(res) {
                console.log(res);
                GlobalData.flagBgMusic = res.flagBgMusic; //标志位_是否开启背景音乐
                GlobalData.bgMusicVolume = res.bgMusicVolume; //背景音乐音量
                GlobalData.bgMusicNum = res.bgMusicNum; //背景音乐曲目编号
                GlobalData.bgPicNum = res.bgPicNum; //背景图片编号
                GlobalData.flagSound = res.flagSound; //标志位_是否开启音效
                GlobalData.soundVolume = res.soundVolume; //音效音量
                GlobalData.flagNotice = res.flagNotice; //标志位_是否开启推送通知
                GlobalData.flagLocation = res.flagLocation; //标志位_是否开启摄像头权限
                GlobalData.flagVibration = res.flagVibration; //标志位_是否开启震动
            }
        });
        serverAddr = GlobalData.serverAddr + "php/queryBag.php";
        $.ajax({
            url: serverAddr,
            type: 'POST',
            dataType: json,
            data: {
                userID: GlobalData.userID
            },
            success: function success(res) {
                console.log(res);
                GlobalData.bag.itemIDArrayStr = res.itemIDArray; //物品ID数组
                GlobalData.bag.itemNameArrayStr = res.itemNameArray; //物品名称数组（英文）
                GlobalData.bag.categoryIDArrayStr = res.categoryIDArray; //物品类别ID数组
                GlobalData.bag.categoryNameArrayStr = res.categoryNameArray; //物品类别名称数组
                GlobalData.bag.numberArrayStr = res.numberArray; //物品数量数组
            }
        });
        serverAddr = GlobalData.serverAddr + "php/queryDecBag.php";
        $.ajax({
            url: serverAddr,
            type: 'POST',
            dataType: json,
            data: {
                userID: GlobalData.userID
            },
            success: function success(res) {
                console.log(res);
                GlobalData.bag.itemIDArrayStr = res.itemIDArray; //物品ID数组
                GlobalData.bag.itemNameArrayStr = res.itemNameArray; //物品名称数组（英文）
                GlobalData.bag.categoryIDArrayStr = res.categoryArray; //物品类别ID数组
                GlobalData.bag.categoryNameArrayStr = res.categoryNameArray; //物品类别名称数组
                GlobalData.bag.flagEnableArrayStr = res.flagEnableArray; //物品是否启用的标志位数组
            }
        });
    },

    //点击获取奖励
    //参数说明：1：登录奖励；2：连续登录奖励；3：升级奖励；4：随机奖励
    onClickGetReward: function onClickGetReward(rewardCategoryID) {
        var date = new Date();
        var year = date.getFullYear(); //获取当前年份   
        var month = date.getMonth() + 1; //获取当前月份   
        var dat = date.getDate(); //获取当前日    
        var hour = date.getHours(); //获取小时   
        var minute = date.getMinutes(); //获取分钟   
        var second = date.getSeconds(); //获取秒   
        var timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var serverAddr = GlobalData.serverAddr + "php/getReward.php";
        var details = 'Category:' + rewardCategoryID.toString();
        var rewardCoin = 0;
        var rewardGrowth = 0;
        var rewardItemID = 0;
        var rewardItemCateID = 0;
        if (rewardCategoryID == 1) {
            //登录奖励
            rewardCoin = GlobalData.loginRewardCoin;
            rewardGrowth = GlobalData.loginRewardGrowth;
        } else if (rewardCategoryID == 2) {
            //连续登录奖励
            rewardCoin = GlobalData.contLoginRewardCoin;
            rewardGrowth = GlobalData.contLoginRewardGrowth;
        } else if (rewardCategoryID == 3) {
            //升级奖励
            rewardCoin = GlobalData.upgradeRewardCoin;
            rewardItemID = GlobalData.upgradeRewardItemID;
            rewardItemCateID = GlobalData.upgradeRewardItemCateID;
        } else {
            //随机奖励
            rewardItemID = GlobalData.randomRewardItemID;
            rewardItemCateID = GlobalData.randomRewardItemCateID;
        }
        $.ajax({
            url: serverAddr,
            type: 'POST',
            dataType: json,
            data: {
                userID: GlobalData.userID,
                getTime: timeStr,
                rewardCoin: rewardCoin,
                rewardGrowth: rewardGrowth,
                rewardItemID: rewardItemID,
                rewardItemCateID: rewardItemCateID,
                details: details
            },
            success: function success(res) {
                console.log(res);
            }
        });
    },

    onClickEatBtn: function onClickEatBtn() {
        //点击吃饭按钮
        console.log("点击吃饭");
        this._isBagShow = true; //显示背包
    },

    onClickFood: function onClickFood(foodID) {
        //点击食物
        var date = new Date();
        var year = date.getFullYear(); //获取当前年份   
        var month = date.getMonth() + 1; //获取当前月份   
        var dat = date.getDate(); //获取当前日    
        var hour = date.getHours(); //获取小时   
        var minute = date.getMinutes(); //获取分钟   
        var second = date.getSeconds(); //获取秒   
        var timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var serverAddr = GlobalData.serverAddr + "php/eat.php";
        var details = '';
        $.ajax({
            url: serverAddr,
            type: 'POST',
            dataType: json,
            data: {
                userID: GlobalData.userID,
                operationTime: timeStr,
                foodID: foodID,
                details: details
            },
            success: function success(res) {
                console.log(res);
                //无需更新属性值，后台会自动更新
            }
        });
    },

    onClickShowerBtn: function onClickShowerBtn() {
        //点击洗澡按钮
        console.log("点击洗澡");
        this._isBagShow = true; //显示背包
    },

    onClickShowerTool: function onClickShowerTool(toolID) {
        //点击洗澡工具
        var date = new Date();
        var year = date.getFullYear(); //获取当前年份   
        var month = date.getMonth() + 1; //获取当前月份   
        var dat = date.getDate(); //获取当前日    
        var hour = date.getHours(); //获取小时   
        var minute = date.getMinutes(); //获取分钟   
        var second = date.getSeconds(); //获取秒   
        var timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var serverAddr = GlobalData.serverAddr + "php/shower.php";
        var details = '';
        $.ajax({
            url: serverAddr,
            type: 'POST',
            dataType: json,
            data: {
                userID: GlobalData.userID,
                operationTime: timeStr,
                bathToolID: toolID,
                details: details
            },
            success: function success(res) {
                console.log(res);
                //无需更新属性值，后台会自动更新
            }
        });
    },

    onClickDrinkBtn: function onClickDrinkBtn() {
        //点击喝水按钮
        console.log("点击喝水");
        var date = new Date();
        var year = date.getFullYear(); //获取当前年份   
        var month = date.getMonth() + 1; //获取当前月份   
        var dat = date.getDate(); //获取当前日    
        var hour = date.getHours(); //获取小时   
        var minute = date.getMinutes(); //获取分钟   
        var second = date.getSeconds(); //获取秒   
        var timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var serverAddr = GlobalData.serverAddr + "php/drink.php";
        var details = '';
        $.ajax({
            url: serverAddr,
            type: 'POST',
            dataType: json,
            data: {
                userID: GlobalData.userID,
                operationTime: timeStr,
                details: details
            },
            success: function success(res) {
                console.log(res);
                //无需更新属性值，后台会自动更新
            }
        });
    },

    onClickPlayBtn: function onClickPlayBtn() {
        //点击玩耍按钮
        console.log("点击玩耍");
        this._isPlaySettingShow = true; //显示玩耍子类别按钮
    },

    onClickSubPlayBtn: function onClickSubPlayBtn(playID) {
        //点击玩耍子类别按钮
        var date = new Date();
        var year = date.getFullYear(); //获取当前年份   
        var month = date.getMonth() + 1; //获取当前月份   
        var dat = date.getDate(); //获取当前日    
        var hour = date.getHours(); //获取小时   
        var minute = date.getMinutes(); //获取分钟   
        var second = date.getSeconds(); //获取秒   
        var timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var serverAddr = GlobalData.serverAddr + "php/play.php";
        var details = '';
        $.ajax({
            url: serverAddr,
            type: 'POST',
            dataType: json,
            data: {
                userID: GlobalData.userID,
                operationTime: timeStr,
                playID: playID,
                details: details
            },
            success: function success(res) {
                console.log(res);
                //无需更新属性值，后台会自动更新
            }
        });
    },

    startCountDown: function startCountDown(operationName, time, question, answer, picAddr) {//该函数待实现
        //参数的意义：operationName表示到底是为了什么操作而进行倒计时（work或trip或sleep）
        //time表示时间
        //question和answer分别表示结束后问答环节的问题和答案
        //picAddr表示提供的图片
    },

    onClickWorkBtn: function onClickWorkBtn() {
        //点击主界面上的打工按钮
        console.log("点击打工");
        if (GlobalData.energy >= 50 && GlobalData.mood >= 30) {
            this._isWorkSettingShow = true; //显示打工设置框
        } else {
            var promptStr = '宠物能量值不低于50且心情值不低于30才可以去打工哟~~';
            alert(promptStr);
        }
    },

    onClickWorkTypeBtn: function onClickWorkTypeBtn(workTypeID) {
        //点击工种设置按钮
        console.log('设置工种为：', workTypeID);
        this.workTypeID = workTypeID;
    },

    onClickWorkTimeBtn: function onClickWorkTimeBtn(workTimeID) {
        //点击工时设置按钮
        console.log('设置工时为：', workTimeID);
        this.workTimeID = workTimeID;
    },

    onClickConfirmWork: function onClickConfirmWork() {
        //完成所有设置后，点击“去打工”
        console.log("确认打工");
        var date = new Date();
        var year = date.getFullYear(); //获取当前年份   
        var month = date.getMonth() + 1; //获取当前月份   
        var dat = date.getDate(); //获取当前日    
        var hour = date.getHours(); //获取小时   
        var minute = date.getMinutes(); //获取分钟   
        var second = date.getSeconds(); //获取秒   
        var timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var serverAddr = GlobalData.serverAddr + "php/work.php";
        var details = '';
        var instance = this;
        $.ajax({
            url: serverAddr,
            type: 'POST',
            dataType: json,
            data: {
                userID: GlobalData.userID,
                operationTime: timeStr,
                workTimeID: instance.workTimeID,
                workTypeID: instance.workTypeID,
                details: details
            },
            success: function success(res) {
                console.log(res);
                //无需更新属性值，后台会自动更新，但可以根据这些属性值对用户做出提示
                instance.startCountDown('work', instance.timeIndex[instance.workTimeID], res.question, res.answer, res.picAddr);
            }
        });
    },

    onClickTripBtn: function onClickTripBtn() {
        //点击主界面上的旅游按钮
        console.log("点击旅游");
        if (GlobalData.energy >= 50) {
            this._isTripSettingShow = true; //显示旅游设置框
        } else {
            var promptStr = '宠物能量值不低于50才可以去旅游哟~~';
            alert(promptStr);
        }
    },

    onClickTripLocBtn: function onClickTripLocBtn(tripLocID) {
        //点击旅游地点设置按钮
        console.log('设置旅游地点为：', tripLocID);
        this.tripLocID = tripLocID;
    },

    onClickTripTimeBtn: function onClickTripTimeBtn(tripTimeID) {
        //点击旅游时间设置按钮
        console.log('设置旅游时间为：', tripTimeID);
        this.tripTimeID = tripTimeID;
    },

    onClickConfirmTrip: function onClickConfirmTrip() {
        //完成所有设置后，点击“去旅游”
        var date = new Date();
        var year = date.getFullYear(); //获取当前年份   
        var month = date.getMonth() + 1; //获取当前月份   
        var dat = date.getDate(); //获取当前日    
        var hour = date.getHours(); //获取小时   
        var minute = date.getMinutes(); //获取分钟   
        var second = date.getSeconds(); //获取秒   
        var timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var serverAddr = GlobalData.serverAddr + "php/trip.php";
        var details = '';
        var instance = this;
        $.ajax({
            url: serverAddr,
            type: 'POST',
            dataType: json,
            data: {
                userID: GlobalData.userID,
                operationTime: timeStr,
                tripTimeID: instance.tripTimeID,
                tripLocID: instance.tripLocID,
                details: details
            },
            success: function success(res) {
                console.log(res);
                //无需更新属性值，后台会自动更新，但可以根据这些属性值对用户做出提示
                instance.startCountDown('trip', instance.timeIndex[instance.tripTimeID], res.question, res.answer, res.picAddr);
            }
        });
    },

    onClickSleepBtn: function onClickSleepBtn() {
        //点击主界面上的睡觉按钮
        console.log("点击睡觉");
        this._isSleepSettingShow = true; //显示睡觉设置框
    },

    onClickSleepTimeBtn: function onClickSleepTimeBtn(sleepTimeID) {
        //点击睡觉时间设置按钮
        console.log('设置睡觉时间为：', sleepTimeID);
        this.sleepTimeID = sleepTimeID;
    },

    onClickConfirmSleep: function onClickConfirmSleep() {
        //完成所有设置后，点击“去睡觉”
        var date = new Date();
        var year = date.getFullYear(); //获取当前年份   
        var month = date.getMonth() + 1; //获取当前月份   
        var dat = date.getDate(); //获取当前日    
        var hour = date.getHours(); //获取小时   
        var minute = date.getMinutes(); //获取分钟   
        var second = date.getSeconds(); //获取秒   
        var timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var serverAddr = GlobalData.serverAddr + "php/sleep.php";
        var details = '';
        var instance = this;
        $.ajax({
            url: serverAddr,
            type: 'POST',
            dataType: json,
            data: {
                userID: GlobalData.userID,
                operationTime: timeStr,
                sleepTimeID: instance.sleepTimeID,
                details: details
            },
            success: function success(res) {
                console.log(res);
                //无需更新属性值，后台会自动更新，但可以根据这些属性值对用户做出提示
                instance.startCountDown('sleep', instance.timeIndex[instance.sleepTimeID], null, null, null);
            }
        });
    },

    onClickHomeBtn: function onClickHomeBtn() {
        //跳转到小屋界面
        this.exit();
        cc.director.loadScene('home');
    },

    onClickSettingBtn: function onClickSettingBtn() {
        //跳转到设置界面
        this.exit();
        cc.director.loadScene('setting');
    },

    onClickShopBtn: function onClickShopBtn() {
        //跳转到商店界面  P.S.这个按钮应该在两个地方都有出现：主界面and背包框
        this.exit();
        cc.director.loadScene('shop');
    },

    onClickUserInfoBtn: function onClickUserInfoBtn() {
        //跳转到个人信息界面
        this.exit();
        cc.director.loadScene('userInfo');
    }

    // update (dt) {},
});

cc._RF.pop();