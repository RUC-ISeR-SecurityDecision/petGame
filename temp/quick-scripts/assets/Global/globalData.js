(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Global/globalData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd5ba64+0W1PPJ3o9JN/V8Mf', 'globalData', __filename);
// Global/globalData.js

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 游戏全局数据，分为全局控制数据、全局属性数据
// 全局控制数据，例如背景音乐开关、音效开关等等
// 全局属性数据，例如宠物性别、种类等
/*
  author: qll
  time: 2019/12/4
*/
<<<<<<< HEAD

window.SERVER_IP = "https://www.llquruc.top/"; // 服务器地址，全局变量，不会在游戏中修改

var globalData = {

    //用户ID，游戏中的唯一标识
    userID: {
        get: function get() {
            return this._userID;
        },
        set: function set(value) {
            this._userID = value;
        }
    },
    //金币值
    coin: {
        get: function get() {
            return this._coin;
        },
        set: function set(value) {
            this._coin = value;
        }
    },
    //主人称呼
    title: {
        get: function get() {
            return this._title;
        },
        set: function set(value) {
            this._title = value;
        }
    },
    //上一次登录时间
    lastLoginTime: {
        get: function get() {
            return this._lastLoginTime;
        },
        set: function set(value) {
            this._lastLoginTime = value;
        }
    },
    //连续登录天数
    contLoginDays: {
        get: function get() {
            return this._contLoginDays;
        },
        set: function set(value) {
            this._contLoginDays = value;
        }
    },
    // 宠物种类
    species: {
        get: function get() {
            return this._species;
        },
        set: function set(value) {
            this._species = value;
        }
    },
    // 宠物名字
    name: {
        get: function get() {
            return this._name;
        },
        set: function set(value) {
            this._name = value;
        }
    },
    //  宠物性别
    gender: {
        get: function get() {
            return this._gender;
        },
        set: function set(value) {
            this._gender = value;
        }
    },
    // 宠物毛色
    color: {
        get: function get() {
            return this._color;
        },
        set: function set(value) {
            this._color = value;
        }
    },
    // 宠物饥饿值
    hunger: {
        get: function get() {
            return this._hunger;
        },
        set: function set(value) {
            this._hunger = value;
        }
    },
    // 宠物饥饿值上限
    hungerCeiling: {
        get: function get() {
            return this._hungerCeiling;
        },
        set: function set(value) {
            this._hungerCeiling = value;
        }
    },
    // 宠物清洁值
    cleaness: {
        get: function get() {
            return this._cleaness;
        },
        set: function set(value) {
            this._cleaness = value;
        }
    },
    // 宠物清洁值上限
    cleanessCeiling: {
        get: function get() {
            return this._cleanessCeiling;
        },
        set: function set(value) {
            this._cleanessCeiling = value;
        }
    },
    // 宠物口渴值
    thirst: {
        get: function get() {
            return this._thirst;
        },
        set: function set(value) {
            this._thirst = value;
        }
    },
    // 宠物口渴值上限
    thirstCeiling: {
        get: function get() {
            return this._thirstCeiling;
        },
        set: function set(value) {
            this._thirstCeiling = value;
        }
    },
    // 宠物心情值
    mood: {
        get: function get() {
            return this._mood;
        },
        set: function set(value) {
            this._mood = value;
        }
    },
    // 宠物心情值上限
    moodCeiling: {
        get: function get() {
            return this._moodCeiling;
        },
        set: function set(value) {
            this._moodCeiling = value;
        }
    },
    // 宠物能量值
    energy: {
        get: function get() {
            return this._energy;
        },
        set: function set(value) {
            this._energy = value;
        }
    },
    // 宠物能量值上限
    energyCeiling: {
        get: function get() {
            return this._energyCeiling;
        },
        set: function set(value) {
            this._energyCeiling = value;
        }
    },
    // 宠物成长值
    growth: {
        get: function get() {
            return this._growth;
        },
        set: function set(value) {
            this._growth = value;
        }
    },
    // 宠物成长等级
    growthLevel: {
        get: function get() {
            return this._growthLevel;
        },
        set: function set(value) {
            this._growthLevel = value;
        }
    },
    // 标志位：幼年or成年
    flagAgeGroup: {
        get: function get() {
            return this._flagAgeGroup;
        },
        set: function set(value) {
            this._flagAgeGroup = value;
        }
    },
    //标志位_是否解锁“跳绳”操作
    flagSkipping: {
        get: function get() {
            return this._flagSkipping;
        },
        set: function set(value) {
            this._flagSkipping = value;
        }
    },
    //标志位_是否解锁“讲故事”操作
    flagStory: {
        get: function get() {
            return this._flagStory;
        },
        set: function set(value) {
            this._flagStory = value;
        }
    },
    //标志位-是否正在睡觉
    flagSleep: {
        get: function get() {
            return this._flagSleep;
        },
        set: function set(value) {
            this._flagSleep = value;
        }
    },
    //睡觉剩余时长
    sleepRemainTime: {
        get: function get() {
            return this._sleepRemainTime;
        },
        set: function set(value) {
            this._sleepRemainTime = value;
        }
    },
    //标志位-是否正在打工
    flagWork: {
        get: function get() {
            return this._flagWork;
        },
        set: function set(value) {
            this._flagWork = value;
        }
    },
    //打工剩余时长
    workRemainTime: {
        get: function get() {
            return this._workRemainTime;
        },
        set: function set(value) {
            this._workRemainTime = value;
        }
    },
    //标志位-是否正在旅游
    flagTrip: {
        get: function get() {
            return this._flagTrip;
        },
        set: function set(value) {
            this._flagTrip = value;
        }
    },
    //旅游剩余时长
    tripRemainTime: {
        get: function get() {
            return this._tripRemainTime;
        },
        set: function set(value) {
            this._tripRemainTime = value;
        }
    },
    //标志位_是否开启背景音乐
    flagBgMusic: {
        get: function get() {
            return this._flagBgMusic;
        },
        set: function set(value) {
            this._flagBgMusic = value;
        }
    },
    //背景音乐音量
    bgMusicVolume: {
        get: function get() {
            return this._bgMusicVolume;
        },
        set: function set(value) {
            this._bgMusicVolume = value;
        }
    },
    //背景音乐曲目编号
    bgMusicNum: {
        get: function get() {
            return this._bgMusicNum;
        },
        set: function set(value) {
            this._bgMusicNum = value;
        }
    },
    //背景图片编号
    bgPicNum: {
        get: function get() {
            return this._bgPicNum;
        },
        set: function set(value) {
            this._bgPicNum = value;
        }
    },
    //标志位_是否开启音效
    flagSound: {
        get: function get() {
            return this._flagSound;
        },
        set: function set(value) {
            this._flagSound = value;
        }
    },
    //音效音量
    soundVolume: {
        get: function get() {
            return this._soundVolume;
        },
        set: function set(value) {
            this._soundVolume = value;
        }
    },
    //标志位_是否开启推送通知
    flagNotice: {
        get: function get() {
            return this._flagNotice;
        },
        set: function set(value) {
            this._flagNotice = value;
        }
    },
    //标志位_是否开启摄像头权限
    flagCamera: {
        get: function get() {
            return this._flagCamera;
        },
        set: function set(value) {
            this._flagCamera = value;
        }
    },
    //标志位_是否开启震动
    flagVibration: {
        get: function get() {
            return this._flagVibration;
        },
        set: function set(value) {
            this._flagVibration = value;
        }
    },
    //背包内容（除小屋装饰）
    bag: {
        get: function get() {
            return this._bag;
        },
        set: function set(value) {
            this._bag = value;
        }
    },
    //小屋装饰
    decorationBag: {
        get: function get() {
            return this._decorationBag;
        },
        set: function set(value) {
            this._decorationBag = value;
        }
    },

    init: function init() {
        this.species = 0;
        this.skin = 0;
        this.gender = 0;
        this.petName = '小白';
        this.masterName = '小新';
    }
=======
var GlobalData = function GlobalData() {
  _classCallCheck(this, GlobalData);
>>>>>>> 83f085b8aff4651f3259adc33fd23ad1cf0d050d

  //用户的微信账户信息
  this.userName = ''; //用户昵称
  this.userGender = ''; //用户性别
  //全局属性数据
  this.serverAddr = 'https://www.llquruc.top/petGame/'; //服务器地址
  this.userID = ''; //用户ID，游戏中的唯一标识
  this.flagNewUser = ''; //标志位_是否是新用户
  this.coin = 0; //金币值
  this.title = ''; //主人称呼
  this.lastLoginTime = ''; //上一次登录时间
  this.contLoginDays = 0; //连续登录天数
  this.species = 0; // 宠物种类
  this.name = ''; // 宠物名字
  this.gender = 0; //  宠物性别
  this.color = 0; // 宠物毛色
  this.hunger = 0; // 宠物饥饿值
  this.hungerCeiling = 0; // 宠物饥饿值上限
  this.cleaness = 0; // 宠物清洁值
  this.cleanessCeiling = 0; // 宠物清洁值上限
  this.thirst = 0; // 宠物口渴值
  this.thirstCeiling = 0; // 宠物口渴值上限
  this.mood = 0; // 宠物心情值
  this.moodCeiling = 0; // 宠物心情值上限
  this.energy = 0; // 宠物能量值
  this.energyCeiling = 0; // 宠物能量值上限
  this.growth = 0; // 宠物成长值
  this.growthLevel = 0; // 宠物成长等级
  this.flagAgeGroup = 0; // 标志位：幼年or成年
  this.flagSkipping = 0; //标志位_是否解锁“跳绳”操作
  this.flagStory = 0; //标志位_是否解锁“讲故事”操作
  this.flagSleep = 0; //标志位-是否正在睡觉
  this.sleepRemainTime = 0; //睡觉剩余时长
  this.flagWork = 0; //标志位-是否正在打工
  this.workRemainTime = 0; //打工剩余时长
  this.flagTrip = 0; //标志位-是否正在旅游
  this.tripRemainTime = 0; //旅游剩余时长
  this.flagRandomReward = false; //随机奖励是否已生成
  this.flagUpgradeReward = false; //升级奖励是否已生成
  //登录奖励信息
  this.loginRewardCoin = 0; //奖励金币值
  this.loginRewardGrowth = 0; //奖励成长值
  //连续登录奖励信息
  this.contLoginRewardCoin = 0; //奖励金币值
  this.contLoginRewardGrowth = 0; //奖励成长值
  //升级奖励信息
  this.upgradeRewardCoin = 0; //奖励金币值
  this.upgradeRewardItemID = 0; //奖励物品编号
  this.upgradeRewardItemCateID = 0; //奖励物品类别编号
  //随机奖励信息
  this.randomRewardItemID = 0; //奖励物品编号
  this.randomRewardItemCateID = 0; //奖励物品类别编号
  this.bag = { //背包内容（除小屋装饰）
    itemIDArrayStr: '',
    itemNameArrayStr: '',
    categoryIDArrayStr: '',
    categoryNameArrayStr: '',
    numberArrayStr: ''
  };
  this.decorationBag = { //小屋装饰
    itemIDStrArrayStr: '',
    itemNameArrayStr: '',
    categoryIDArrayStr: '',
    categoryNameArrayStr: '',
    flagEnableArrayStr: ''
  };
  //全局控制数据
  this.flagBgMusic = 0; //标志位_是否开启背景音乐
  this.bgMusicVolume = 0; //背景音乐音量
  this.bgMusicNum = 0; //背景音乐曲目编号
  this.bgPicNum = 0; //背景图片编号
  this.flagSound = 0; //标志位_是否开启音效
  this.soundVolume = 0; //音效音量
  this.flagNotice = 0; //标志位_是否开启推送通知
  this.flagLocation = 0; //标志位_是否开启摄像头权限
  this.flagVibration = 0; //标志位_是否开启震动
};

exports.default = GlobalData;
module.exports = exports['default'];

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
        //# sourceMappingURL=globalData.js.map
        