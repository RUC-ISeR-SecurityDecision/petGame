// 游戏全局数据，分为全局控制数据、全局属性数据
// 全局控制数据，例如背景音乐开关、音效开关等等
// 全局属性数据，例如宠物性别、种类等
/*
  author: qll
  time: 2019/12/4
*/

window.SERVER_IP = "https://www.llquruc.top/"; // 服务器地址，全局变量，不会在游戏中修改

var globalData = {

    //用户ID，游戏中的唯一标识
    userID: {
        get() {
            return this._userID;
        },
        set(value) {
            this._userID = value;
        }
    },
    //金币值
    coin: {
        get() {
            return this._coin;
        },
        set(value) {
            this._coin = value;
        }
    },
    // 宠物种类
    species: {
        get() {
            return this._species;
        },
        set(value) {
            this._species = value;
        }
    },
    // 宠物名字
    name: {
        get() {
            return this._name;
        },
        set(value) {
            this._name = value;
        }
    },
    //  宠物性别
    gender: {
        get() {
            return this._gender;
        },
        set(value) {
            this._gender = value;
        }
    },
    // 宠物毛色
    color: {
        get() {
            return this._color;
        },
        set(value) {
            this._color = value;
        }
    },
    //主人称呼
    title: {
        get() {
            return this._title;
        },
        set(value) {
            this._title = value;
        }
    },
    //上一次登录时间
    lastLoginTime: {
        get() {
            return this._lastLoginTime;
        },
        set(value) {
            this._lastLoginTime = value;
        }
    },
    //连续登录天数
    contLoginDays: {
        get() {
            return this._contLoginDays;
        },
        set(value) {
            this._contLoginDays = value;
        }
    },
    //标志位_是否开启背景音乐
    flagBgMusic: {
        get() {
            return this._flagBgMusic;
        },
        set(value) {
            this._flagBgMusic = value;
        }
    },
    //背景音乐音量
    bgMusicVolume: {
        get() {
            return this._bgMusicVolume;
        },
        set(value) {
            this._bgMusicVolume = value;
        }
    },
    //背景音乐曲目编号
    bgMusicNum: {
        get() {
            return this._bgMusicNum;
        },
        set(value) {
            this._bgMusicNum = value;
        }
    },
    //背景图片编号
    bgPicNum: {
        get() {
            return this._bgPicNum;
        },
        set(value) {
            this._bgPicNum = value;
        }
    },
    //标志位_是否开启音效
    flagSound: {
        get() {
            return this._flagSound;
        },
        set(value) {
            this._flagSound = value;
        }
    },
    //音效音量
    soundVolume: {
        get() {
            return this._soundVolume;
        },
        set(value) {
            this._soundVolume = value;
        }
    },
    //标志位_是否开启推送通知
    flagNotice: {
        get() {
            return this._flagNotice;
        },
        set(value) {
            this._flagNotice = value;
        }
    },
    //标志位_是否开启摄像头权限
    flagCamera: {
        get() {
            return this._flagCamera;
        },
        set(value) {
            this._flagCamera = value;
        }
    },
    //标志位_是否开启震动
    flagVibration: {
        get() {
            return this._flagVibration;
        },
        set(value) {
            this._flagVibration = value;
        }
    },
    //背包内容（除小屋装饰）
    bag: {
        get() {
            return this._bag;
        },
        set(value) {
            this._bag = value;
        }
    },
    //小屋装饰
    decorationBag: {
        get() {
            return this._decorationBag;
        },
        set(value) {
            this._decorationBag = value;
        }
    },
    //用户的微信账户信息
    userName: {//用户昵称
        get() {
            return this._userName;
        },
        set(value) {
            this._userName = value;
        }
    },
    userGender: {//用户性别
        get() {
            return this._userGender;
        },
        set(value) {
            this._userGender = value;
        }
    },
    //全局属性数据
    serverAddr: {//服务器地址
        get() {
            return this._serverAddr;
        },
        set(value) {
            this._serverAddr = value;
        }
    },
    flagNewUser: {//标志位_是否是新用户
        get() {
            return this._flagNewUser;
        },
        set(value) {
            this._flagNewUser = value;
        }
    },
    flagRandomReward: {  //随机奖励是否已生成
        get() {
            return this._flagRandomReward;
        },
        set(value) {
            this._flagRandomReward = value;
        }
    },
    flagUpgradeReward: {  //升级奖励是否已生成
        get() {
            return this._flagUpgradeReward;
        },
        set(value) {
            this._flagUpgradeReward = value;
        }
    },
    //登录奖励信息
    loginRewardCoin: {//奖励金币值
        get() {
            return this._loginRewardCoin;
        },
        set(value) {
            this._loginRewardCoin = value;
        }
    },
    loginRewardGrowth: {//奖励成长值
        get() {
            return this._loginRewardGrowth;
        },
        set(value) {
            this._loginRewardGrowth = value;
        }
    },
    //连续登录奖励信息
    contLoginRewardCoin: {//奖励金币值
        get() {
            return this._contLoginRewardCoin;
        },
        set(value) {
            this._contLoginRewardCoin = value;
        }
    },
    contLoginRewardGrowth: {//奖励成长值
        get() {
            return this._contLoginRewardGrowth;
        },
        set(value) {
            this._contLoginRewardGrowth = value;
        }
    },
    //升级奖励信息
    upgradeRewardCoin: {//奖励金币值
        get() {
            return this._upgradeRewardCoin;
        },
        set(value) {
            this._upgradeRewardCoin = value;
        }
    },
    upgradeRewardItemID: {//奖励物品编号
        get() {
            return this._upgradeRewardItemID;
        },
        set(value) {
            this._upgradeRewardItemID = value;
        }
    },
    upgradeRewardItemCateID: {//奖励物品类别编号
        get() {
            return this._upgradeRewardItemCateID;
        },
        set(value) {
            this._upgradeRewardItemCateID = value;
        }
    },
    //随机奖励信息
    randomRewardItemID: {//奖励物品编号
        get() {
            return this._randomRewardItemID;
        },
        set(value) {
            this._randomRewardItemID = value;
        }
    },
    randomRewardItemCateID: {//奖励物品类别编号
        get() {
            return this._randomRewardItemCateID;
        },
        set(value) {
            this._randomRewardItemCateID = value;
        }
    },
    flagLocation: {//标志位_是否开启摄像头权限
        get() {
            return this._flagLocation;
        },
        set(value) {
            this._flagLocation = value;
        }
    },

    init: function () {
        //用户的微信账户信息
        this.userName = '';//用户昵称
        this.userGender = '';//用户性别
        //全局属性数据
        this.serverAddr = 'https://www.llquruc.top/petGame/';//服务器地址
        this.userID = '';//用户ID，游戏中的唯一标识
        this.flagNewUser = '';//标志位_是否是新用户
        this.coin = 0;//金币值
        this.title = '';//主人称呼
        this.lastLoginTime = '';//上一次登录时间
        this.contLoginDays = 0; //连续登录天数
        this.species = 0;// 宠物种类
        this.name = '';// 宠物名字
        this.gender = 0;//  宠物性别
        this.color = 0;// 宠物毛色
        this.flagRandomReward = false;  //随机奖励是否已生成
        this.flagUpgradeReward = false;  //升级奖励是否已生成
        //登录奖励信息
        this.loginRewardCoin = 0;//奖励金币值
        this.loginRewardGrowth = 0;//奖励成长值
        //连续登录奖励信息
        this.contLoginRewardCoin = 0;//奖励金币值
        this.contLoginRewardGrowth = 0;//奖励成长值
        //升级奖励信息
        this.upgradeRewardCoin = 0;//奖励金币值
        this.upgradeRewardItemID = 0;//奖励物品编号
        this.upgradeRewardItemCateID = 0;//奖励物品类别编号
        //随机奖励信息
        this.randomRewardItemID = 0;//奖励物品编号
        this.randomRewardItemCateID = 0;//奖励物品类别编号
        this.bag = {  //背包内容（除小屋装饰）
            itemIDArrayStr: '',
            itemNameArrayStr: '',
            categoryIDArrayStr: '',
            categoryNameArrayStr: '',
            numberArrayStr: ''
        };
        this.decorationBag = {//小屋装饰
            itemIDStrArrayStr: '',
            itemNameArrayStr: '',
            categoryIDArrayStr: '',
            categoryNameArrayStr: '',
            flagEnableArrayStr: ''
        };
        //全局控制数据
        this.flagBgMusic = 0;//标志位_是否开启背景音乐
        this.bgMusicVolume = 0;//背景音乐音量
        this.bgMusicNum = 0;//背景音乐曲目编号
        this.bgPicNum = 0;//背景图片编号
        this.flagSound = 0;//标志位_是否开启音效
        this.soundVolume = 0;//音效音量
        this.flagNotice = 0;//标志位_是否开启推送通知
        this.flagLocation = 0;//标志位_是否开启摄像头权限
        this.flagVibration = 0;//标志位_是否开启震动权限  
    },
}

module.exports = globalData;



