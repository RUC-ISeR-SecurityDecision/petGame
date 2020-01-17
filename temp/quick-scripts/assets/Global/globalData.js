(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Global/globalData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd5ba64+0W1PPJ3o9JN/V8Mf', 'globalData', __filename);
// Global/globalData.js

'use strict';

// 游戏全局数据，分为全局控制数据、全局属性数据
// 全局控制数据，例如背景音乐开关、音效开关等等
// 全局属性数据，例如宠物性别、种类等
/*
  author: qll
  time: 2019/12/4
*/

window.SERVER_IP = "https://www.llquruc.top/"; // 服务器地址，全局变量，不会在游戏中修改


var globalData = {

    // 用户的微信账户信息
    userName: '', // 用户昵称
    userGender: '', // 用户性别
    userAvatarUrl: '', //用户头像地址---added by qll on 20200116
    // 全局属性数据
    serverAddr: 'https://www.llquruc.top/petGame/', // 服务器地址
    userID: '', // 用户ID，游戏中的唯一标识
    flagNewUser: '', // 标志位_是否是新用户
    coin: 0, //金币值
    title: '', //主人称呼
    lastLoginTime: '', //上一次登录时间
    contLoginDays: 0, //连续登录天数
    species: 0, // 宠物种类
    name: '', // 宠物名字
    gender: 0, //  宠物性别
    color: 0, // 宠物毛色
    flagLoginReward: false, //登录奖励是否已生成---added by qll on 20200116
    flagContLoginReward: false, //连续登录奖励是否已生成---added by qll on 20200116
    flagRandomReward: false, //随机奖励是否已生成
    flagUpgradeReward: false, //升级奖励是否已生成
    //登录奖励信息
    loginRewardCoin: 0, //奖励金币值
    loginRewardGrowth: 0, //奖励成长值
    //连续登录奖励信息
    contLoginRewardCoin: 0, //奖励金币值
    contLoginRewardGrowth: 0, //奖励成长值
    //升级奖励信息
    upgradeRewardCoin: 0, //奖励金币值
    upgradeRewardItemID: 0, //奖励物品编号
    upgradeRewardItemCateID: 0, //奖励物品类别编号
    //随机奖励信息
    randomRewardItemID: 0, //奖励物品编号
    randomRewardItemCateID: 0, //奖励物品类别编号
    bag: { //背包内容（除小屋装饰）
        itemIDArrayStr: '',
        itemNameArrayStr: '',
        categoryIDArrayStr: '',
        categoryNameArrayStr: '',
        numberArrayStr: ''
    },
    decorationBag: { //小屋装饰
        itemIDStrArrayStr: '',
        itemNameArrayStr: '',
        categoryIDArrayStr: '',
        categoryNameArrayStr: '',
        flagEnableArrayStr: ''
    },
    //全局控制数据
    flagBgMusic: 0, //标志位_是否开启背景音乐
    bgMusicVolume: 0, //背景音乐音量
    bgMusicNum: 0, //背景音乐曲目编号
    bgPicNum: 0, //背景图片编号
    flagSound: 0, //标志位_是否开启音效
    soundVolume: 0, //音效音量
    flagNotice: 0, //标志位_是否开启推送通知
    flagLocation: 0, //标志位_是否开启定位权限
    flagVibration: 0 //标志位_是否开启震动权限  

};
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
        