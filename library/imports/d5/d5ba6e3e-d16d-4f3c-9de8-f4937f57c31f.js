"use strict";
cc._RF.push(module, 'd5ba64+0W1PPJ3o9JN/V8Mf', 'globalData');
// Global/globalData.js

'use strict';

// 游戏全局数据，分为全局控制数据和全局属性数据
// 全局控制数据，例如背景音乐开关、音效开关等等，不需要从服务器获得数据，采用windows.的全局变量使用方式
//？？？需要啊，要获取用户以前的设置
// 全局属性数据，例如宠物性别、种类等，需要与服务器交互，采用require类型的全局变量，方便初始化
/*
  author: qll
  time: 2019/12/2
*/

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

};

module.exports = globalData;

cc._RF.pop();