(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Global/globalData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd5ba64+0W1PPJ3o9JN/V8Mf', 'globalData', __filename);
// Global/globalData.js

'use strict';

var _globalData;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 游戏全局数据，分为全局控制数据、全局属性数据
// 全局控制数据，例如背景音乐开关、音效开关等等
// 全局属性数据，例如宠物性别、种类等
/*
  author: qll
  time: 2019/12/4
*/

window.SERVER_IP = "https://www.llquruc.top/"; // 服务器地址，全局变量，不会在游戏中修改

var globalData = (_globalData = {

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
    //用户的微信账户信息
    userName: {
        //用户昵称
        get: function get() {
            return this._userName;
        },
        set: function set(value) {
            this._userName = value;
        }
    },
    userGender: {
        //用户性别
        get: function get() {
            return this._userGender;
        },
        set: function set(value) {
            this._userGender = value;
        }
    },
    //全局属性数据
    serverAddr: {
        //服务器地址
        get: function get() {
            return this._serverAddr;
        },
        set: function set(value) {
            this._serverAddr = value;
        }
    }
}, _defineProperty(_globalData, 'userID', {
    //用户ID，游戏中的唯一标识
    get: function get() {
        return this._userID;
    },
    set: function set(value) {
        this._userID = value;
    }
}), _defineProperty(_globalData, 'flagNewUser', {
    //标志位_是否是新用户
    get: function get() {
        return this._flagNewUser;
    },
    set: function set(value) {
        this._flagNewUser = value;
    }
}), _defineProperty(_globalData, 'coin', {
    //金币值
    get: function get() {
        return this._coin;
    },
    set: function set(value) {
        this._coin = value;
    }
}), _defineProperty(_globalData, 'title', {
    //主人称呼
    get: function get() {
        return this._title;
    },
    set: function set(value) {
        this._title = value;
    }
}), _defineProperty(_globalData, 'lastLoginTime', {
    //上一次登录时间
    get: function get() {
        return this._lastLoginTime;
    },
    set: function set(value) {
        this._lastLoginTime = value;
    }
}), _defineProperty(_globalData, 'contLoginDays', {
    //连续登录天数
    get: function get() {
        return this._contLoginDays;
    },
    set: function set(value) {
        this._contLoginDays = value;
    }
}), _defineProperty(_globalData, 'species', {
    // 宠物种类
    get: function get() {
        return this._species;
    },
    set: function set(value) {
        this._species = value;
    }
}), _defineProperty(_globalData, 'name', {
    // 宠物名字
    get: function get() {
        return this._name;
    },
    set: function set(value) {
        this._name = value;
    }
}), _defineProperty(_globalData, 'gender', {
    //  宠物性别
    get: function get() {
        return this._gender;
    },
    set: function set(value) {
        this._gender = value;
    }
}), _defineProperty(_globalData, 'color', {
    // 宠物毛色
    get: function get() {
        return this._color;
    },
    set: function set(value) {
        this._color = value;
    }
}), _defineProperty(_globalData, 'hunger', {
    // 宠物饥饿值
    get: function get() {
        return this._hunger;
    },
    set: function set(value) {
        this._hunger = value;
    }
}), _defineProperty(_globalData, 'hungerCeiling', {
    // 宠物饥饿值上限
    get: function get() {
        return this._hungerCeiling;
    },
    set: function set(value) {
        this._hungerCeiling = value;
    }
}), _defineProperty(_globalData, 'cleaness', {
    // 宠物清洁值
    get: function get() {
        return this._cleaness;
    },
    set: function set(value) {
        this._cleaness = value;
    }
}), _defineProperty(_globalData, 'cleanessCeiling', {
    // 宠物清洁值上限
    get: function get() {
        return this._cleanessCeiling;
    },
    set: function set(value) {
        this._cleanessCeiling = value;
    }
}), _defineProperty(_globalData, 'thirst', {
    // 宠物口渴值
    get: function get() {
        return this._thirst;
    },
    set: function set(value) {
        this._thirst = value;
    }
}), _defineProperty(_globalData, 'thirstCeiling', {
    // 宠物口渴值上限
    get: function get() {
        return this._thirstCeiling;
    },
    set: function set(value) {
        this._thirstCeiling = value;
    }
}), _defineProperty(_globalData, 'mood', {
    // 宠物心情值
    get: function get() {
        return this._mood;
    },
    set: function set(value) {
        this._mood = value;
    }
}), _defineProperty(_globalData, 'moodCeiling', {
    // 宠物心情值上限
    get: function get() {
        return this._moodCeiling;
    },
    set: function set(value) {
        this._moodCeiling = value;
    }
}), _defineProperty(_globalData, 'energy', {
    // 宠物能量值
    get: function get() {
        return this._energy;
    },
    set: function set(value) {
        this._energy = value;
    }
}), _defineProperty(_globalData, 'energyCeiling', {
    // 宠物能量值上限
    get: function get() {
        return this._energyCeiling;
    },
    set: function set(value) {
        this._energyCeiling = value;
    }
}), _defineProperty(_globalData, 'growth', {
    // 宠物成长值
    get: function get() {
        return this._growth;
    },
    set: function set(value) {
        this._growth = value;
    }
}), _defineProperty(_globalData, 'growthLevel', {
    // 宠物成长等级
    get: function get() {
        return this._growthLevel;
    },
    set: function set(value) {
        this._growthLevel = value;
    }
}), _defineProperty(_globalData, 'flagAgeGroup', {
    // 标志位：幼年or成年
    get: function get() {
        return this._flagAgeGroup;
    },
    set: function set(value) {
        this._flagAgeGroup = value;
    }
}), _defineProperty(_globalData, 'flagSkipping', {
    //标志位_是否解锁“跳绳”操作
    get: function get() {
        return this._flagSkipping;
    },
    set: function set(value) {
        this._flagSkipping = value;
    }
}), _defineProperty(_globalData, 'flagStory', {
    //标志位_是否解锁“讲故事”操作
    get: function get() {
        return this._flagStory;
    },
    set: function set(value) {
        this._flagStory = value;
    }
}), _defineProperty(_globalData, 'flagSleep', {
    //标志位-是否正在睡觉
    get: function get() {
        return this._flagSleep;
    },
    set: function set(value) {
        this._flagSleep = value;
    }
}), _defineProperty(_globalData, 'sleepRemainTime', {
    //睡觉剩余时长
    get: function get() {
        return this._sleepRemainTime;
    },
    set: function set(value) {
        this._sleepRemainTime = value;
    }
}), _defineProperty(_globalData, 'flagWork', {
    //标志位-是否正在打工
    get: function get() {
        return this._flagWork;
    },
    set: function set(value) {
        this._flagWork = value;
    }
}), _defineProperty(_globalData, 'workRemainTime', {
    //打工剩余时长
    get: function get() {
        return this._workRemainTime;
    },
    set: function set(value) {
        this._workRemainTime = value;
    }
}), _defineProperty(_globalData, 'flagTrip', {
    //标志位-是否正在旅游
    get: function get() {
        return this._flagTrip;
    },
    set: function set(value) {
        this._flagTrip = value;
    }
}), _defineProperty(_globalData, 'tripRemainTime', {
    //旅游剩余时长
    get: function get() {
        return this._tripRemainTime;
    },
    set: function set(value) {
        this._tripRemainTime = value;
    }
}), _defineProperty(_globalData, 'flagRandomReward', {
    //随机奖励是否已生成
    get: function get() {
        return this._flagRandomReward;
    },
    set: function set(value) {
        this._flagRandomReward = value;
    }
}), _defineProperty(_globalData, 'flagUpgradeReward', {
    //升级奖励是否已生成
    get: function get() {
        return this._flagUpgradeReward;
    },
    set: function set(value) {
        this._flagUpgradeReward = value;
    }
}), _defineProperty(_globalData, 'loginRewardCoin', {
    //奖励金币值
    get: function get() {
        return this._loginRewardCoin;
    },
    set: function set(value) {
        this._loginRewardCoin = value;
    }
}), _defineProperty(_globalData, 'loginRewardGrowth', {
    //奖励成长值
    get: function get() {
        return this._loginRewardGrowth;
    },
    set: function set(value) {
        this._loginRewardGrowth = value;
    }
}), _defineProperty(_globalData, 'contLoginRewardCoin', {
    //奖励金币值
    get: function get() {
        return this._contLoginRewardCoin;
    },
    set: function set(value) {
        this._contLoginRewardCoin = value;
    }
}), _defineProperty(_globalData, 'contLoginRewardGrowth', {
    //奖励成长值
    get: function get() {
        return this._contLoginRewardGrowth;
    },
    set: function set(value) {
        this._contLoginRewardGrowth = value;
    }
}), _defineProperty(_globalData, 'upgradeRewardCoin', {
    //奖励金币值
    get: function get() {
        return this._upgradeRewardCoin;
    },
    set: function set(value) {
        this._upgradeRewardCoin = value;
    }
}), _defineProperty(_globalData, 'upgradeRewardItemID', {
    //奖励物品编号
    get: function get() {
        return this._upgradeRewardItemID;
    },
    set: function set(value) {
        this._upgradeRewardItemID = value;
    }
}), _defineProperty(_globalData, 'upgradeRewardItemCateID', {
    //奖励物品类别编号
    get: function get() {
        return this._upgradeRewardItemCateID;
    },
    set: function set(value) {
        this._upgradeRewardItemCateID = value;
    }
}), _defineProperty(_globalData, 'randomRewardItemID', {
    //奖励物品编号
    get: function get() {
        return this._randomRewardItemID;
    },
    set: function set(value) {
        this._randomRewardItemID = value;
    }
}), _defineProperty(_globalData, 'randomRewardItemCateID', {
    //奖励物品类别编号
    get: function get() {
        return this._randomRewardItemCateID;
    },
    set: function set(value) {
        this._randomRewardItemCateID = value;
    }
}), _defineProperty(_globalData, 'bag', {
    //背包内容（除小屋装饰）
    get: function get() {
        return this._bag;
    },
    set: function set(value) {
        this._bag = value;
    }
}), _defineProperty(_globalData, 'decorationBag', {
    //小屋装饰
    get: function get() {
        return this._decorationBag;
    },
    set: function set(value) {
        this._decorationBag = value;
    }
}), _defineProperty(_globalData, 'flagBgMusic', {
    //标志位_是否开启背景音乐
    get: function get() {
        return this._flagBgMusic;
    },
    set: function set(value) {
        this._flagBgMusic = value;
    }
}), _defineProperty(_globalData, 'bgMusicVolume', {
    //背景音乐音量
    get: function get() {
        return this._bgMusicVolume;
    },
    set: function set(value) {
        this._bgMusicVolume = value;
    }
}), _defineProperty(_globalData, 'bgMusicNum', {
    //背景音乐曲目编号
    get: function get() {
        return this._bgMusicNum;
    },
    set: function set(value) {
        this._bgMusicNum = value;
    }
}), _defineProperty(_globalData, 'bgPicNum', {
    //背景图片编号
    get: function get() {
        return this._bgPicNum;
    },
    set: function set(value) {
        this._bgPicNum = value;
    }
}), _defineProperty(_globalData, 'flagSound', {
    //标志位_是否开启音效
    get: function get() {
        return this._flagSound;
    },
    set: function set(value) {
        this._flagSound = value;
    }
}), _defineProperty(_globalData, 'soundVolume', {
    //音效音量
    get: function get() {
        return this._soundVolume;
    },
    set: function set(value) {
        this._soundVolume = value;
    }
}), _defineProperty(_globalData, 'flagNotice', {
    //标志位_是否开启推送通知
    get: function get() {
        return this._flagNotice;
    },
    set: function set(value) {
        this._flagNotice = value;
    }
}), _defineProperty(_globalData, 'flagLocation', {
    //标志位_是否开启摄像头权限
    get: function get() {
        return this._flagLocation;
    },
    set: function set(value) {
        this._flagLocation = value;
    }
}), _defineProperty(_globalData, 'flagVibration', {
    //标志位_是否开启震动
    get: function get() {
        return this._flagVibration;
    },
    set: function set(value) {
        this._flagVibration = value;
    }
}), _defineProperty(_globalData, 'init', function init() {
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
    this.flagVibration = 0; //标志位_是否开启震动权限  
}), _globalData);

module.exports = globalData;

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
        