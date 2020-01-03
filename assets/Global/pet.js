// 宠物脚本

var GlobalData = require('globalData');
cc.Class({
    extends: cc.Component,

    properties: {
        image: cc.Sprite,
        hungerLabel: cc.Node,
        cleanessLabel: cc.Node,
        thirstLabel: cc.Node,
        moodLabel: cc.Node,
        energyLabel: cc.Node,

        species: null,
        gender: null,
        color: null,
        // 宠物饥饿值
        hunger: {
            type: cc.Integer,
            get() {
                return this._hunger;
            },
            set(value) {
                if (value < 0) {
                    value = 0;
                    console.log("pet hunger is minimum");
                } else if (value > this.hungerCeiling) {
                    value = this.hungerCeiling;
                    console.log("pet hunger is max");
                }
                this._hunger = value;
                this.hungerLabel.height = this._hunger / this.hungerCeiling * this.hungerLabel.width;
            }
        },
        // 宠物饥饿值上限
        hungerCeiling: {
            type: cc.Integer,
            get() {
                return this._hungerCeiling;
            },
            set(value) {
                this._hungerCeiling = value;
            }
        },
        // 宠物清洁值
        cleaness: {
            type: cc.Integer,
            get() {
                return this._cleaness;
            },
            set(value) {
                if (value < 0) {
                    value = 0;
                    console.log("pet's cleanness is too low!");
                } else if (value > this.cleanessCeiling) {
                    value = this.cleanessCeiling;
                    console.log("pet cleaness is full!");
                }
                this._cleaness = value;
                this.cleanessLabel.height = this._cleaness / this.cleanessCeiling * this.cleanessLabel.width;
            }
        },
        // 宠物清洁值上限
        cleanessCeiling: {
            type: cc.Integer,
            get() {
                return this._cleanessCeiling;
            },
            set(value) {
                this._cleanessCeiling = value;;
            }
        },
        // 宠物口渴值
        thirst: {
            type: cc.Integer,
            get() {
                return this._thirst;
            },
            set(value) {
                if (value < 0) {
                    value = 0;
                    console.log("pet's thirst is too low");
                } else if (value > this.thirstCeiling) {
                    value = this.thirstCeiling;
                    console.log("pet's thirst is full");
                }
                this._thirst = value;
                this.thirstLabel.height = this._thirst / this.thirstCeiling * this.thirstLabel.width;
            }
        },
        // 宠物口渴值上限
        thirstCeiling: {
            type: cc.Integer,
            get() {
                return this._thirstCeiling;
            },
            set(value) {
                this._thirstCeiling = value;;
            }
        },
        // 宠物心情值
        mood: {
            type: cc.Integer,
            get() {
                return this._mood;
            },
            set(value) {
                if (value < 0) {
                    value = 0;
                    console.log("pet's mood is too low");
                } else if (value > this.moodCeiling) {
                    value = this.moodCeiling;
                    console.log("pet's mood is full");
                }
                this._mood = value;
                this.moodLabel.height = this._mood / this.moodCeiling * this.moodLabel.width;
            }
        },
        // 宠物心情值上限
        moodCeiling: {
            type: cc.Integer,
            get() {
                return this._moodCeiling;
            },
            set(value) {
                this._moodCeiling = value;
            }
        },
        // 宠物能量值
        energy: {
            type: cc.Integer,
            get() {
                return this._energy;
            },
            set(value) {
                if (value < 0) {
                    value = 0;
                    console.log("pet's energy is too low");
                } else if (value > this.energyCeiling) {
                    value = this.energyCeiling;
                    console.log("pet's energy is full");
                }
                this._energy = value;
                this.energyLabel.height = this._energy / this.energyCeiling * this.energyLabel.width;
            }
        },
        // 宠物能量值上限
        energyCeiling: {
            type: cc.Integer,
            get() {
                return this._energyCeiling;
            },
            set(value) {
                this._energyCeiling = value;
            }
        },
        // 宠物成长值
        growth: {
            default: 0,
            type: cc.Integer,
        },
        // 宠物成长等级
        growthLevel: {
            default: 0,
            type: cc.Integer,
        },
        // 标志位：幼年or成年
        flagAgeGroup: {
            get() {
                return this._flagAgeGroup;
            },
            set(value) {
                this._flagAgeGroup = value;
            }
        },
        //标志位_是否解锁“跳绳”操作
        flagSkipping: {
            get() {
                return this._flagSkipping;
            },
            set(value) {
                this._flagSkipping = value;
            }
        },
        //标志位_是否解锁“讲故事”操作
        flagStory: {
            get() {
                return this._flagStory;
            },
            set(value) {
                this._flagStory = value;
            }
        },
        //标志位-是否正在睡觉
        flagSleep: {
            get() {
                return this._flagSleep;
            },
            set(value) {
                this._flagSleep = value;
                if (value) {
                    this.flagWork == false;
                    this.flagTrip == false;
                }
            }
        },
        //睡觉剩余时长
        sleepRemainTime: {
            get() {
                return this._sleepRemainTime;
            },
            set(value) {
                this._sleepRemainTime = value;
            }
        },
        //标志位-是否正在打工
        flagWork: {
            get() {
                return this._flagWork;
            },
            set(value) {
                this._flagWork = value;
                if (value) {
                    this.flagSleep == false;
                    this.flagTrip == false;
                }
            }
        },
        //打工剩余时长
        workRemainTime: {
            get() {
                return this._workRemainTime;
            },
            set(value) {
                this._workRemainTime = value;
            }
        },
        //标志位-是否正在旅游
        flagTrip: {
            get() {
                return this._flagTrip;
            },
            set(value) {
                this._flagTrip = value;
                if (value) {
                    this.flagWork == false;
                    this.flagSleep == false;
                }
            }
        },
        //旅游剩余时长
        tripRemainTime: {
            get() {
                return this._tripRemainTime;
            },
            set(value) {
                this._tripRemainTime = value;
            }
        },
        updateID: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1"
        };
        var self = this;
        var serverAddr = 'https://www.llquruc.top/petGame/php/queryPetAttribute.php';
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
                console.log(res);
                self.species = parseInt(res.species);
                self.gender = parseInt(res.gender);
                self.color = parseInt(res.color);
                console.log(self.species);
                self.hungerCeiling = parseInt(res.hungerCeiling);// 宠物饥饿值上限
                self.cleanessCeiling = parseInt(res.cleanessCeiling);// 宠物清洁值上限
                self.thirstCeiling = parseInt(res.thirstCeiling);// 宠物口渴值上限
                self.moodCeiling = parseInt(res.moodCeiling);// 宠物心情值上限
                self.energyCeiling = parseInt(res.energyCeiling);// 宠物能量值上限

                self.hunger = parseInt(res.hunger);// 宠物饥饿值
                self.cleaness = parseInt(res.cleaness);// 宠物清洁值
                self.thirst = parseInt(res.thirst);// 宠物口渴值
                self.mood = parseInt(res.mood);// 宠物心情值
                self.energy = parseInt(res.energy);// 宠物能量值
                self.growth = res.growth;// 宠物成长值
                self.growthLevel = res.growthLevel;// 宠物成长等级
                self.flagAgeGroup = res.flagAgeGroup;// 标志位：幼年or成年
                self.flagSkipping = res.flagSkipping;// 标志位_是否解锁“跳绳”操作
                self.flagStory = res.flagStory;// 标志位_是否解锁“讲故事”操作
                self.flagSleep = res.flagSleep;// 标志位-是否正在睡觉
                self.sleepRemainTime = res.sleepRemainTime;// 睡觉剩余时长
                self.flagWork = res.flagWork;// 标志位-是否正在打工
                self.workRemainTime = res.workRemainTime;// 打工剩余时长
                self.flagTrip = res.flagTrip;// 标志位-是否正在旅游
                self.tripRemainTime = res.tripRemainTime;// 旅游剩余时长
                self.init();
            }
        });
    },

    init: function () {
        let interval = 6000;  //6秒
        let petImagePath = this.gender == 0 ? "pet/male_" : "pet/female_";
        let self = this;
        console.log(self.species);
        if (self.species == 0) {
            petImagePath += 'owl';
        } else if (self.species == 1) {
            petImagePath += 'penguins';
        } else if (self.species == 2) {
            petImagePath += 'cat';
        } else if (self.species == 3) {
            petImagePath += 'dog';
        }
        petImagePath += (self.color + 1) + '';

        cc.loader.loadRes(petImagePath, cc.SpriteFrame, (err, sp) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("success");
            if (self.image) {
                self.image.spriteFrame = sp;
            }
        });
        // this.updateID = setInterval(this.queryPetStatus, interval);
    },

    /**
     * 宠物喂食操作，根据食物的属性改变宠物相应的属性和动作
     * @param { number } foodID 
     */
    eat: function (foodID) {
        console.log("eat");
        let date = new Date();
        let year = date.getFullYear(); //获取当前年份   
        let month = date.getMonth() + 1; //获取当前月份   
        let dat = date.getDate(); //获取当前日    
        let hour = date.getHours(); //获取小时   
        let minute = date.getMinutes(); //获取分钟   
        let second = date.getSeconds(); //获取秒   
        let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
            "operationTime": timeStr,
            "foodID": foodID,
            "details": ""
        };
        var self = this;
        var serverAddr = 'https://www.llquruc.top/petGame/php/eat.php';
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
                console.log("eat food: " + foodID);
                self.queryPetStatus();
            }
        });

    },

    /**
     * 宠物洗澡操作，根据洗澡用品的属性改变宠物相应的属性和动作
     * @param { number } bathToolID
     */
    shower: function (bathToolID) {
        console.log("shower");
        let date = new Date();
        let year = date.getFullYear(); //获取当前年份   
        let month = date.getMonth() + 1; //获取当前月份   
        let dat = date.getDate(); //获取当前日    
        let hour = date.getHours(); //获取小时   
        let minute = date.getMinutes(); //获取分钟   
        let second = date.getSeconds(); //获取秒   
        let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
            "operationTime": timeStr,
            "bathToolID": bathToolID,
            "details": ""
        };
        var self = this;
        var serverAddr = 'https://www.llquruc.top/petGame/php/shower.php';
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
                console.log("take a shower with bathToolID:" + bathToolID);
                self.queryPetStatus();
            }
        });

    },

    /**
     * 宠物睡觉操作
     * @param { Number } time
     */
    sleep: function (time) {

    },

    /**
     * 宠物工作操作
     * @param { Number } time 工作时长
     * @param { Number } type 工种
     */
    work: function (time, type) {

    },

    /**
     * 宠物工作操作
     * @param { Number } time 旅游时长
     * @param { Number } place 地点
     */
    travel: function (time, place) {

    },

    // 宠物动作
    walk: function () {

    },

    jump: function () {

    },

    happy: function () {

    },

    sad: function () {

    },

    skip: function () {

    },

    sleepAction: function () {

    },


    start() {

    },

    queryPetStatus: function () {
        var data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1"
        };
        var self = this;
        var serverAddr = 'https://www.llquruc.top/petGame/php/queryPetAttribute.php';
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
                // console.log(res);
                self.hunger = parseInt(res.hunger);// 宠物饥饿值
                console.log(self.hunger, res.hunger);
                self.cleaness = parseInt(res.cleaness);// 宠物清洁值
                self.thirst = parseInt(res.thirst);// 宠物口渴值
                self.mood = parseInt(res.mood);// 宠物心情值
                self.energy = parseInt(res.energy);// 宠物能量值
                self.growth = res.growth;// 宠物成长值
                self.growthLevel = res.growthLevel;// 宠物成长等级
                self.flagAgeGroup = res.flagAgeGroup;// 标志位：幼年or成年
                self.flagSkipping = res.flagSkipping;// 标志位_是否解锁“跳绳”操作
                self.flagStory = res.flagStory;// 标志位_是否解锁“讲故事”操作
                self.flagSleep = res.flagSleep;// 标志位-是否正在睡觉
                self.sleepRemainTime = res.sleepRemainTime;// 睡觉剩余时长
                self.flagWork = res.flagWork;// 标志位-是否正在打工
                self.workRemainTime = res.workRemainTime;// 打工剩余时长
                self.flagTrip = res.flagTrip;// 标志位-是否正在旅游
                self.tripRemainTime = res.tripRemainTime;// 旅游剩余时长
            }
        });
    },

    exit: function () {  //退出该页面时调用此函数
        clearInterval(this.updateID);
    },
    // 需要时刻刷新宠物状态，但是需要区别宠物正在进行的操作，还需要在update里添加一个计时器函数，
    // update ( dt ) {
    //     this.queryPetStatus();
    // },
});
