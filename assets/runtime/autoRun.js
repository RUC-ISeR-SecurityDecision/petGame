// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        querySetIntervalID: 0,
        genRandomRewardSetIntervalID: 0,
    },

    genUpgradeReward: function(newGrowthLevel){
        let date = new Date();
        let year = date.getFullYear(); //获取当前年份   
        let month = date.getMonth() + 1; //获取当前月份   
        let dat = date.getDate(); //获取当前日    
        let hour = date.getHours(); //获取小时   
        let minute = date.getMinutes(); //获取分钟   
        let second = date.getSeconds(); //获取秒   
        let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var serverAddr = GlobalData.serverAddr + "php/genReward.php";
        var rewardLevel = newGrowthLevel;
        $.ajax({
            url: serverAddr,
            type: 'POST',
            dataType: json,
            data: {
                userID: GlobalData.userID,
                genTime: timeStr,
                rewardCategoryID: 3,
                rewardLevel: rewardLevel,
            },
            success(res) {
                console.log(res);
                GlobalData.upgradeRewardCoin = res.rewardCoin;//奖励金币数
                GlobalData.upgradeRewardItemID = res.rewardItemID;//奖励物品编号
                GlobalData.upgradeRewardItemCateID = res.rewardItemCateID;//奖励物品类别编号
                GlobalData.flagUpgradeReward = true;
            },
        });
    },

    queryAttribute: function (){
        var instance = this;
        var serverAddr = GlobalData.serverAddr + "php/queryUserAttribute.php";
        $.ajax({
            url: serverAddr,
            type: 'POST',
            dataType: json,
            data: {
                userID: GlobalData.userID
            },
            success(res) {
                console.log(res);
                GlobalData.coin = res.coin;//金币值
                GlobalData.title = res.title;//主人称呼
            },
        });
        serverAddr = GlobalData.serverAddr + "php/queryPetAttribute.php";
        $.ajax({
            url: serveAddr,
            type: 'POST',
            dataType: json,
            data: {
                userID: GlobalData.userID
            },
            success(res) {
                console.log(res);
                GlobalData.lastLoginTime = res.lastLoginTime;//上一次登录时间
                GlobalData.contLoginDays = res.contLoginDays; //连续登录天数
                GlobalData.species = res.species;// 宠物种类
                GlobalData.name = res.name;// 宠物名字
                GlobalData.gender = res.gender;//  宠物性别
                GlobalData.color = res.color;// 宠物毛色
                GlobalData.hunger = res.hunger;// 宠物饥饿值
                GlobalData.hungerCeiling = res.hungerCeiling;// 宠物饥饿值上限
                GlobalData.cleaness = res.cleaness;// 宠物清洁值
                GlobalData.cleanessCeiling = res.cleanessCeiling;// 宠物清洁值上限
                GlobalData.thirst = res.thirst;// 宠物口渴值
                GlobalData.thirstCeiling = res.thirstCeiling;// 宠物口渴值上限
                GlobalData.mood = res.mood;// 宠物心情值
                GlobalData.moodCeiling = res.moodCeiling;// 宠物心情值上限
                GlobalData.energy = res.energy;// 宠物能量值
                GlobalData.energyCeiling = res.energyCeiling;// 宠物能量值上限
                GlobalData.growth = res.growth;// 宠物成长值
                if(GlobalData.growthLevel != res.growthLevel){   //宠物等级发生改变，说明该升级了
                    instance.genUpgradeReward(GlobalData.growthLevel);
                }
                GlobalData.growthLevel = res.growthLevel;// 宠物成长等级
                GlobalData.flagAgeGroup = res.flagAgeGroup;// 标志位：幼年or成年
                GlobalData.flagSkipping = res.flagSkipping;//标志位_是否解锁“跳绳”操作
                GlobalData.flagStory = res.flagStory;//标志位_是否解锁“讲故事”操作
                GlobalData.flagSleep = res.flagSleep;//标志位-是否正在睡觉
                GlobalData.sleepRemainTime = res.sleepRemainTime;//睡觉剩余时长
                GlobalData.flagWork = res.flagWork;//标志位-是否正在打工
                GlobalData.workRemainTime = res.workRemainTime;//打工剩余时长
                GlobalData.flagTrip = res.flagTrip;//标志位-是否正在旅游
                GlobalData.tripRemainTime = res.tripRemainTime;//旅游剩余时长
            },
        });
        serverAddr = GlobalData.serverAddr + "php/querySetting.php";
        $.ajax({
            url: serveAddr,
            type: 'POST',
            dataType: json,
            data: {
                userID: GlobalData.userID
            },
            success(res) {
                console.log(res);
                GlobalData.flagBgMusic = res.flagBgMusic;//标志位_是否开启背景音乐
                GlobalData.bgMusicVolume = res.bgMusicVolume;//背景音乐音量
                GlobalData.bgMusicNum = res.bgMusicNum;//背景音乐曲目编号
                GlobalData.bgPicNum = res.bgPicNum;//背景图片编号
                GlobalData.flagSound = res.flagSound;//标志位_是否开启音效
                GlobalData.soundVolume = res.soundVolume;//音效音量
                GlobalData.flagNotice = res.flagNotice;//标志位_是否开启推送通知
                GlobalData.flagLocation = res.flagLocation;//标志位_是否开启摄像头权限
                GlobalData.flagVibration = res.flagVibration;//标志位_是否开启震动
            },
        });
        serverAddr = GlobalData.serverAddr + "php/queryBag.php";
        $.ajax({
            url: serveAddr,
            type: 'POST',
            dataType: json,
            data: {
                userID: GlobalData.userID
            },
            success(res) {
                console.log(res);
                GlobalData.bag.itemIDArrayStr = res.itemIDArray;//物品ID数组
                GlobalData.bag.itemNameArrayStr = res.itemNameArray;//物品名称数组（英文）
                GlobalData.bag.categoryIDArrayStr = res.categoryIDArray;//物品类别ID数组
                GlobalData.bag.categoryNameArrayStr = res.categoryNameArray;//物品类别名称数组
                GlobalData.bag.numberArrayStr = res.numberArray;//物品数量数组
            },
        });
        serverAddr = GlobalData.serverAddr + "php/queryDecBag.php";
        $.ajax({
            url: serveAddr,
            type: 'POST',
            dataType: json,
            data: {
                userID: GlobalData.userID
            },
            success(res) {
                console.log(res);
                GlobalData.bag.itemIDArrayStr = res.itemIDArray;//物品ID数组
                GlobalData.bag.itemNameArrayStr = res.itemNameArray;//物品名称数组（英文）
                GlobalData.bag.categoryIDArrayStr = res.categoryArray;//物品类别ID数组
                GlobalData.bag.categoryNameArrayStr = res.categoryNameArray;//物品类别名称数组
                GlobalData.bag.flagEnableArrayStr = res.flagEnableArray;//物品是否启用的标志位数组
            },
        });
    },

    genRandomReward: function(){
        var luckyNum = 7;  
        var number = Math.floor(Math.random() * 10);
        //以十分之一的概率生成奖励
        if (number == luckyNum){
            let date = new Date();
            let year = date.getFullYear(); //获取当前年份   
            let month = date.getMonth() + 1; //获取当前月份   
            let dat = date.getDate(); //获取当前日    
            let hour = date.getHours(); //获取小时   
            let minute = date.getMinutes(); //获取分钟   
            let second = date.getSeconds(); //获取秒   
            let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
            var serverAddr = GlobalData.serverAddr + "php/genReward.php";
            var rewardLevel = Math.ceil(Math.random() * 20);
            $.ajax({
                url: serverAddr,
                type: 'POST',
                dataType: json,
                data: {
                    userID: GlobalData.userID,
                    genTime: timeStr,
                    rewardCategoryID: 4,
                    rewardLevel: rewardLevel,
                },
                success(res) {
                    console.log(res);
                    GlobalData.randomRewardItemID = res.rewardItemID;//奖励物品编号
                    GlobalData.randomRewardItemCateID = res.rewardItemCateID;//奖励物品类别编号
                    GlobalData.flagRandomReward = true;
                },
            });
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var queryInterval = 1000;  //时间间隔为1s，每1秒刷新一次属性值
        var genRandomRewardInterval = 180000;  //时间间隔为3分钟，每3分钟生成一次随机奖励
        this.querySetIntervalID = setInterval(queryAttribute, queryInterval);
        this.genRandomRewardSetIntervalID = setInterval(genRandomReward, genRandomRewardInterval);
    },

    exit (){
        clearInterval(this.querySetIntervalID);
        clearInterval(this.genRandomRewardSetIntervalID);
    },

    

    // update (dt) {},
});
