(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/personalInfo/js/personalInfo.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0f75972/31Pcrg9a93ABp9b', 'personalInfo', __filename);
// personalInfo/js/personalInfo.js

"use strict";

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

    onLoad: function onLoad() {
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

                self.expLabel.string = res.growth + '/' + res.growthCeiling; // 宠物成长值
                self.expBar.progress = parseInt(res.growth) / parseInt(res.growthCeiling);
                self.levelLabel.string = "LV." + res.growthLevel; // 宠物成长等级

                if (res.flagSleep == 1) {
                    self.statusLabel.string = "睡觉中";
                } else if (res.flagWork == 1) {
                    self.statusLabel.string = "工作中";
                    cc.loader.loadRes("page_personalInfo/working", cc.SpriteFrame, function (err, sp) {
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
                    self.statusLabel.string = "旅游中";
                    cc.loader.loadRes("page_personalInfo/tripping", cc.SpriteFrame, function (err, sp) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log("success");
                        if (self.statusImg) {
                            self.statusImg.spriteFrame = sp;
                        }
                    });
                } else if (parseInt(res.hunger) < 50 || parseInt(res.cleaness) < 50 || parseInt(res.thirst) < 50 || parseInt(res.energy) < 30) {
                    self.statusLabel.string = "不开心";
                    cc.loader.loadRes("page_personalInfo/hungryThirstyTiredDirty", cc.SpriteFrame, function (err, sp) {
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
                    self.statusLabel.string = "开心";
                    cc.loader.loadRes("page_personalInfo/happy", cc.SpriteFrame, function (err, sp) {
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


    onCloseBtnClick: function onCloseBtnClick() {
        cc.director.loadScene('mainPage');
    },

    start: function start() {}
}

// update (dt) {},
);

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
        //# sourceMappingURL=personalInfo.js.map
        