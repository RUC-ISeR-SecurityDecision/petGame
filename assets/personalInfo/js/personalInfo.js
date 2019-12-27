// personal information page js
// author: wang-c

cc.Class({
    extends: cc.Component,

    properties: {
        userProfile: cc.Sprite,
        petProfile: cc.Sprite,
        levelLabel: cc.Label,
        coinLabel: cc.Label,
        titleLabel: cc.Label,
        statusImg: cc.Sprite,
        statusLabel: cc.Label,
        expLabel: cc.Label,
        expBar: cc.ProgressBar,
        hungerBar: cc.ProgressBar,
        thirstBar: cc.ProgressBar,
        cleanessBar: cc.ProgressBar,
        energyBar: cc.ProgressBar,
        moodBar: cc.ProgressBar,
        hungerLabel: cc.Label,
        thirstLabel: cc.Label,
        cleanessLabel: cc.Label,
        energyLabel: cc.Label,
        moodLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1"
        };
        var self = this;
        var serverAddr = 'https://www.llquruc.top/petGame/php/queryPetAttribute.php';
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
                console.log(res);
                self.hungerBar.progress = parseInt(res.hunger) / parseInt(res.hungerCeiling);
                self.hungerLabel.string = res.hunger + '/' + res.hungerCeiling;
                self.cleanessBar.progress = parseInt(res.cleaness) / parseInt(res.cleanessCeiling);
                self.cleanessLabel.string = res.cleaness + '/' + res.cleanessCeiling;
                self.thirstBar.progress = parseInt(res.thirst) / parseInt(res.thirstCeiling);
                self.thirstLabel.string = res.thirst + '/' + res.thirstCeiling;
                self.energyBar.progress = parseInt(res.energy) / parseInt(res.energyCeiling);
                self.energyLabel.string = res.energy + '/' + res.energyCeiling;
                self.moodBar.progress = parseInt(res.mood) / parseInt(res.moodCeiling);
                self.moodLabel.string = res.mood + '/' + res.moodCeiling;
                
                self.expLabel = res.growth + '/' + res.growthCeiling;// 宠物成长值
                self.levelLabel.string = "LV." + res.growthLevel;// 宠物成长等级

                if (res.flagSleep == 1) {
                    
                } else if (res.flagWork == 1) {
                    cc.loader.loadRes("page_personalInfo/working", cc.SpriteFrame, (err, sp) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log("success");
                        if (self.statusImg) {
                            self.statusImg.spriteFrame = sp;
                        }
                    });
                } else if (res.flagTrip == 1) {
                    cc.loader.loadRes("page_personalInfo/tripping", cc.SpriteFrame, (err, sp) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log("success");
                        if (self.statusImg) {
                            self.statusImg.spriteFrame = sp;
                        }
                    });
                } else if (parseInt(res.hunger) < 50 || parseInt(res.cleaness) < 50 || parseInt(res.thirst) < 50  || parseInt(res.energy) < 30) {
                    cc.loader.loadRes("page_personalInfo/hungryThirstyTiredDirty", cc.SpriteFrame, (err, sp) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log("success");
                        if (self.statusImg) {
                            self.statusImg.spriteFrame = sp;
                        }
                    });
                } else {
                    cc.loader.loadRes("page_personalInfo/happy", cc.SpriteFrame, (err, sp) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log("success");
                        if (self.statusImg) {
                            self.statusImg.spriteFrame = sp;
                        }
                    });
                }
                
            }
        });
        var serverAddr = 'https://www.llquruc.top/petGame/php/queryUserAttribute.php';
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
                console.log(res);
                self.coinLabel.string = res.coin;
                self.titleLabel.string = res.title;
            }
        });
    },

    onCloseBtnClick: function() {
        cc.director.loadScene('mainPage');
    },

    start () {

    },

    // update (dt) {},
});
