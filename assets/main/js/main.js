// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

let GlobalData = require('globalData');
function BagItem(id, name, categoryID, categoryName, number) {
    this.id = id;
    this.name = name;
    this.categoryID = categoryID;
    this.categoryName = categoryName;
    this.number = number;
};

cc.Class({
    extends: cc.Component,

    properties: {
        //音效
        btnSound: {//按键音
            default: null,
            url: cc.AudioClip
        },
        sleepSound: {//睡觉的声音
            default: null,
            url: cc.AudioClip
        },
        hiSound: {//打招呼的声音
            default: null,
            url: cc.AudioClip
        },

        theme: {
            get() {
                return this._theme;
            },
            set(value) {
                if (value < 0) {
                    value = 0;
                }
                if (value > 3) {
                    value = 3
                }
                if (value != this._theme) {
                    let resPath = "bgPic/" + (value + 1);
                    let self = this;
                    cc.loader.loadRes(resPath, cc.SpriteFrame, (err, sp) => {
                        if (err) {
                            console.log('failed to load sprite ' + resPath);
                        } else {
                            self.background.spriteFrame = sp;
                        }
                    });
                    let color = new cc.Color();
                    if (value == 0) {
                        color.fromHEX("#ACE6BF");
                        this.statusLayout.color = color;
                        let status = this.statusLayout.children;
                        for (let i = 0; i < status.length; i++) {
                            const element = status[i];
                            color.fromHEX('#7BFFABB4');
                            if (element.getChildByName('level')) {
                                element.getChildByName('level').color = color;
                            }
                        }
                    } else if (value == 1) {
                        color.fromHEX("#E2F0AD");
                        this.statusLayout.color = color;
                        let status = this.statusLayout.children;
                        for (let i = 0; i < status.length; i++) {
                            const element = status[i];
                            color.fromHEX('#CBFA66B4');
                            if (element.getChildByName('level')) {
                                element.getChildByName('level').color = color;
                            }
                        }
                    } else if (value == 2) {
                        color.fromHEX("#FA972C");
                        this.statusLayout.color = color;
                        let status = this.statusLayout.children;
                        for (let i = 0; i < status.length; i++) {
                            const element = status[i];
                            color.fromHEX('#FFB803B4');
                            if (element.getChildByName('level')) {
                                element.getChildByName('level').color = color;
                            }
                        }
                    } else if (value == 3) {
                        color.fromHEX("#B9D6E4");
                        this.statusLayout.color = color;
                        let status = this.statusLayout.children;
                        for (let i = 0; i < status.length; i++) {
                            const element = status[i];
                            color.fromHEX('#5ED4F1B4');
                            if (element.getChildByName('level')) {
                                element.getChildByName('level').color = color;
                            }
                        }
                    }
                }
                this._theme = value;
            }
        },
        background: cc.Sprite,
        statusLayout: cc.Node,
        profile: cc.Sprite,
        shop: cc.Sprite,
        tripBtn: cc.Button,
        workBtn: cc.Button,
        homeBtn: cc.Sprite,
        sleepBtn: cc.Button,
        settingBtn: cc.Sprite,
        functionBtn: cc.Button,
        bag: cc.Node, // 背包节点
        bagContent: cc.Layout, // 背包物品添加的父节点
        bagCloseBtn: cc.Sprite, // 背包关闭按钮
        bagItemArray: [],

        pet: cc.Node, // 宠物
        petCtrl: cc.Component, // 通过petCtrl关联pet.js

        //以下为页面中需要展示的值
        coin: cc.Label, // 金币值

        _isFunctionShow: true,
        //author:qll
        //time:2019.12.4
        isBagShow: {
            get() {
                return this._isBagShow;
            },
            set(value) {
                if (typeof (value) != 'number') { // 如果非法值，不调用背包控制函数
                    value = 0;
                    this._isBagShow = value;
                }
                if (this._isBagShow > 0) { // 背包被打开的情况下
                    this.closeBag(); // 不管什么值都要先关闭背包
                    if (this._isBagShow != value && value > 0) { // 如果点击不同背包，需要重新打开，例如打开食物背包的情况下，点击了洗澡背包
                        this._isBagShow = value;
                        this.bag.stopAllActions();
                        this.openBag();
                    } else { // 如果是相同背包，则背包显示置为0，表示现在处于关闭状态   
                        this._isBagShow = 0;
                    }
                } else { // 背包关闭的情况下
                    if (value > 0) { // 正常打开背包
                        this._isBagShow = value;
                        this.openBag();
                    } else { // 关闭的情况不能再次关闭，置为关闭状态即可
                        this._isBagShow = 0;
                    }
                }
            }
        },  // 标志位_是否展示背包,根据值判断打开哪个背包

        sleepPrompt: cc.Node, // 睡觉设置提示框
        isSleepSettingShow: {
            get() {
                return this._isSleepSettingShow;
            },
            set(value) {
                if (value != true && value != false) {
                    value = false;
                }
                this.sleepPrompt.active = value;
                this._isSleepSettingShow = value;
            }
        }, //标志位_是否展示睡觉设置框
        workPrompt: cc.Node, // 工作设置提示框
        isWorkSettingShow: {
            get() {
                return this._isWorkSettingShow;
            },
            set(value) {
                if (value != true && value != false) {
                    value = false;
                }
                this.workPrompt.active = value;
                this._isWorkSettingShow = value;
            }
        },  //标志位_是否展示工作设置框
        tripPrompt: cc.Node, // 旅游设置提示框
        isTripSettingShow: {
            get() {
                return this._isTripSettingShow;
            },
            set(value) {
                if (value != true && value != false) {
                    value = false;
                }
                this.tripPrompt.active = value;
                this._isTripSettingShow = value;
            }
        },  //标志位_是否展示旅游设置框
        _isPlaySettingShow: false,  //标志位_是否展示玩耍子操作框
        _isClockShow: false,  //标志位_是否显示倒计时（用于睡觉、打工和旅游）

        _isLoginRewardShow: false,  //标志位_是否显示登录奖励
        _isContLoginRewardShow: false,  //标志位_是否显示连续登录奖励
        _isRandomRewardShow: false,  //标志位_是否显示随机奖励
        _isUpgradeRewardShow: false,  //标志位_是否显示升级奖励

        timeIndex: [],  //不同的时间ID对应的具体秒数（适用于旅游、打工和睡觉操作）P.S. ID0是无效的
        placeIndex: [],
        workTypeIndex: [],

        workTypeID: 0,  //工种设置
        workTimeID: 0,  //工时设置

        tripLocID: 0,  //旅游地点设置
        tripTimeID: 0,  //旅游时长设置
        sleepTimeID: 0,  //睡觉时间设置

        updateID: 0,  //用于退出该页面时清除interval
        selectBagItemIndex: 0,

        // clock
        clockCanvas: cc.Graphics,
        sleepTimeLabel: cc.Label,

        // question prompt
        questionPrompt: cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // console.log(GlobalData);
        this.init();
        //播放打招呼的声音
        switch (GlobalData.species) {
            case 1:
                this.hiSound = cc.url.raw('resources/sound/hi/cat.mp3');
                break;
            case 2:
                this.hiSound = cc.url.raw('resources/sound/hi/dog.mp3');
                break;
            case 3:
                this.hiSound = cc.url.raw('resources/sound/hi/owl.mp3');
                break;
            case 4:
                this.hiSound = cc.url.raw('resources/sound/hi/penguin.mp3');
                break;
            default:
                console.log("Wrong species number")
        }
        var soundVolume = 0.8;
        var hiSoundID = cc.audioEngine.play(this.hiSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        // this.drawClock();
    },

    start() {

    },

    loadBag: function () {
        //  changed by qll on 20191226
        let date = new Date();
        let year = date.getFullYear(); //获取当前年份   
        let month = date.getMonth() + 1; //获取当前月份   
        let dat = date.getDate(); //获取当前日    
        let hour = date.getHours(); //获取小时   
        let minute = date.getMinutes(); //获取分钟   
        let second = date.getSeconds(); //获取秒   
        let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        let data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
            "operationTime": timeStr,
            "details": "user",
        };
        let self = this;
        let serverAddr = 'https://www.llquruc.top/petGame/php/queryBag.php';
        HttpHelper.httpPost(serverAddr, data, function (_data) {
            if (_data != -1) {
                // console.log(_data);
                let itemIDArray = _data.itemIDArray.split('+');
                let itemNameArray = _data.itemNameArray.split('+');
                let categoryIDArray = _data.categoryIDArray.split('+');
                let categoryNameArray = _data.categoryNameArray.split('+');
                let numberArray = _data.numberArray.split('+');
                for (let index = 0; index < itemIDArray.length; index++) {
                    let item = new BagItem(itemIDArray[index], itemNameArray[index], categoryIDArray[index], categoryNameArray[index], numberArray[index]);
                    self.bagItemArray.push(item);
                }
            }
        });
    },
    // 关闭背包,根据isBagShow的值自己调用，不要单独调用
    closeBag: function () {
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        console.log("close bag");
        this.bagContent.node.destroyAllChildren();
        let hide = cc.moveTo(0.2, cc.v2(0, 600));
        this.bag.runAction(hide);
    },
    /**
     * 打开背包,根据isBagShow的值自己调用，不要单独调用，逻辑查看isBagShow的注释
     */
    openBag: function () {
        let self = this;
        console.log("open bag");
        for (let i = 0; i < self.bagItemArray.length; i++) {
            let element = self.bagItemArray[i];
            console.log("-----------debug log----------");
            console.log("now load bag item: " + (i + 1));
            if (element.categoryID == this.isBagShow) {
                console.log("item: " + i + ' will be loaded.');
                let picName = 'shopPic/cate' + element.categoryID + '/' + element.id;
                cc.loader.loadRes(picName, cc.SpriteFrame, (err, sp) => {
                    if (err) {
                        console.log('failed to load sprite ' + picName);
                    }
                    cc.loader.loadRes("prefab/bagItem", cc.Prefab, (err, prf) => {
                        console.log(element);
                        if (err) {
                            console.log('error: get prefab' + err + "prefab/bagItem");
                        }
                        if (!(prf instanceof cc.Prefab)) {
                            console.log("not a prefab");
                        }
                        let bagItem = cc.instantiate(prf);
                        bagItem.zIndex = i;
                        bagItem.name = element.categoryID + '_' + element.id;
                        bagItem.getComponent('bagItem').init(element.number, sp);
                        self.bagContent.node.addChild(bagItem);
                        bagItem.getChildByName('itemPic').on(cc.Node.EventType.TOUCH_START, function () {
                            // 选中物品
                            let selectNode = bagItem.getChildByName('itemPic');
                            // 阴影复制物品
                            let copyNode = cc.instantiate(selectNode);
                            // 阴影物品代替选中物品的位置
                            selectNode.parent.addChild(copyNode);
                            copyNode.opacity = 100;
                            let pos = selectNode.parent.convertToWorldSpaceAR(copyNode.position);
                            pos = self.bag.parent.convertToNodeSpaceAR(pos);
                            // 被选中的物品进入与宠物同一个层级  
                            self.bag.parent.addChild(selectNode);
                            selectNode.position = pos;
                            self.selectBagItemIndex = i; // 记录背包里选中的物品
                            // console.log(selectNode, copyNode)
                            selectNode.on(cc.Node.EventType.TOUCH_MOVE, self.onTouchMove, self);
                            selectNode.on(cc.Node.EventType.TOUCH_END, self.onTouchEnd, self);
                            selectNode.on(cc.Node.EventType.TOUCH_CANCEL, self.onTouchCancel, self);
                        });
                    })
                })
            }
        }
        // 提示框打开动作部分：
        let show = cc.moveTo(0.2, cc.v2(0, 100));
        self.bag.runAction(show);
    },

    //触摸移动；
    onTouchMove: function (event) {
        let self = this;
        console.log("touch move");
        let selectItemName = self.bagItemArray[self.selectBagItemIndex].categoryID + '_' + self.bagItemArray[self.selectBagItemIndex].id;
        let copyNode = self.bagContent.node.getChildByName(selectItemName).getChildByName('itemPic');
        let selectNode = self.bag.parent.getChildByName('itemPic');
        // 转换为世界坐标
        let pos = copyNode.parent.convertToWorldSpaceAR(copyNode.position);
        pos = self.bag.parent.convertToNodeSpaceAR(pos);
        let nodeP = pos;
        let touches = event.getTouches();
        //触摸刚开始的位置
        let oldPos = selectNode.parent.convertToNodeSpaceAR(touches[0].getStartLocation());

        //触摸时不断变更的位置
        let newPos = selectNode.parent.convertToNodeSpaceAR(touches[0].getLocation());
        let subPos = oldPos.sub(newPos); // 2.X版本是 p1.sub(p2);

        selectNode.x = nodeP.x - subPos.x;
        selectNode.y = nodeP.y - subPos.y;

        // 控制节点移不出屏幕; 
        let minX = -selectNode.parent.width / 2 + selectNode.width / 2; //最小X坐标；
        let maxX = Math.abs(minX);
        let minY = -selectNode.parent.height / 2 + selectNode.height / 2; //最小Y坐标；
        let maxY = Math.abs(minY);
        let nPos = selectNode.getPosition(); //节点实时坐标；

        if (nPos.x < minX) {
            nPos.x = minX;
        };
        if (nPos.x > maxX) {
            nPos.x = maxX;
        };
        if (nPos.y < minY) {
            nPos.y = minY;
        };
        if (nPos.y > maxY) {
            nPos.y = maxY;
        };
        selectNode.setPosition(nPos);
    },
    // 背包物品触摸结束
    onTouchEnd() {
        let self = this;
        // 宠物矩形框
        let petRect = new cc.Rect(self.pet.x, self.pet.y, self.pet.width, self.pet.height);
        // 找到所选物品所在的物品块的名字
        let selectItemName = self.bagItemArray[self.selectBagItemIndex].categoryID + '_' + self.bagItemArray[self.selectBagItemIndex].id
        // 留下的阴影复制物品
        let copyNode = self.bagContent.node.getChildByName(selectItemName).getChildByName('itemPic');
        // 选中的物品
        let selectNode = self.bag.parent.getChildByName('itemPic');
        selectNode.pauseSystemEvents(true);
        // 物品矩形框
        let pos = copyNode.parent.convertToWorldSpaceAR(copyNode.position);
        pos = self.bag.parent.convertToNodeSpaceAR(pos);
        let useRect = new cc.Rect(selectNode.x, selectNode.y, selectNode.width, selectNode.height);
        console.log("touch end");
        if (petRect.intersects(useRect) && self.petCtrl.flagPetOperBtnEnable == true) { // 判断两个矩形框是否重叠 并且 宠物处于可操作状态
            // 矩形重叠说明进行喂食等操作
            // console.log(self.testNode.parent.parent.getChildByName('pet'));
            if (self.bagItemArray[self.selectBagItemIndex].categoryID == 1) {
                // selectNode.parent.parent.getChildByName('pet').getComponent('pet').eat(self.bagItemArray[self.selectBagItemIndex].id);
                self.petCtrl.eat(self.bagItemArray[self.selectBagItemIndex].id);
            } else if (self.bagItemArray[self.selectBagItemIndex].categoryID == 2) {
                self.petCtrl.shower(self.bagItemArray[self.selectBagItemIndex].id);
            } else if (self.bagItemArray[self.selectBagItemIndex].categoryID == 10) {
                self.petCtrl.play(self.bagItemArray[self.selectBagItemIndex].id);
            }
            selectNode.setPosition(copyNode.position);
            copyNode.destroy();
            self.bagContent.node.getChildByName(selectItemName).addChild(selectNode);
            if (self.bagItemArray[self.selectBagItemIndex].number == 1) { // 该物品将用完，动态在背包中删除
                self.bagContent.node.getChildByName(selectItemName).destroy();
            } else {
                self.bagItemArray[self.selectBagItemIndex].number -= 1;
                console.log(self.bagContent.node.getChildByName(selectItemName).getChildByName('numberBlock').getChildByName('number'));
                self.bagContent.node.getChildByName(selectItemName).getChildByName('numberBlock').getChildByName('number').getComponent(cc.Label).string = self.bagItemArray[self.selectBagItemIndex].number;
            }

        } else {
            let backEnd = cc.callFunc(function () {
                selectNode.setPosition(copyNode.position);
                copyNode.destroy();
                self.bagContent.node.getChildByName(selectItemName).addChild(selectNode);
                selectNode.resumeSystemEvents(true);
            }, self, null);
            console.log(pos, selectNode.position);
            let back = cc.sequence(cc.moveTo(0.2, pos.x, pos.y), backEnd);
            selectNode.runAction(back);
            console.log("touch end second");
            console.log(selectNode);
        }
    },
    // 背包物品触摸取消，同触摸结束的操作
    onTouchCancel: function () {
        let self = this;
        // 宠物矩形框
        let petRect = new cc.Rect(self.pet.x, self.pet.y, self.pet.width, self.pet.height);
        // 找到所选物品所在的物品块的名字
        let selectItemName = self.bagItemArray[self.selectBagItemIndex].categoryID + '_' + self.bagItemArray[self.selectBagItemIndex].id
        // 留下的阴影复制物品
        let copyNode = self.bagContent.node.getChildByName(selectItemName).getChildByName('itemPic');
        // 选中的物品
        let selectNode = self.bag.parent.getChildByName('itemPic');
        selectNode.pauseSystemEvents(true);
        // 物品矩形框
        let pos = copyNode.parent.convertToWorldSpaceAR(copyNode.position);
        pos = self.bag.parent.convertToNodeSpaceAR(pos);
        let useRect = new cc.Rect(selectNode.x, selectNode.y, selectNode.width, selectNode.height);
        console.log("touch end");
        if (petRect.intersects(useRect) && self.petCtrl.flagPetOperBtnEnable == true) { // 判断两个矩形框是否重叠
            // 矩形重叠说明进行喂食等操作
            // console.log(self.testNode.parent.parent.getChildByName('pet'));
            if (self.bagItemArray[self.selectBagItemIndex].categoryID == 1) {
                self.petCtrl.eat(self.bagItemArray[self.selectBagItemIndex].id);
            } else if (self.bagItemArray[self.selectBagItemIndex].categoryID == 2) {
                self.petCtrl.shower(self.bagItemArray[self.selectBagItemIndex].id);
            } else if (self.bagItemArray[self.selectBagItemIndex].categoryID == 10) {
                self.petCtrl.play(self.bagItemArray[self.selectBagItemIndex].id);
            }
            selectNode.setPosition(copyNode.position);
            copyNode.destroy();
            self.bagContent.node.getChildByName(selectItemName).addChild(selectNode);
            if (self.bagItemArray[self.selectBagItemIndex].number == 1) { // 该物品将用完，动态在背包中删除
                self.bagContent.node.getChildByName(selectItemName).destroy();
            } else {
                self.bagItemArray[self.selectBagItemIndex].number -= 1;
                console.log(self.bagContent.node.getChildByName(selectItemName).getChildByName('numberBlock').getChildByName('number'));
                self.bagContent.node.getChildByName(selectItemName).getChildByName('numberBlock').getChildByName('number').getComponent(cc.Label).string = self.bagItemArray[self.selectBagItemIndex].number;
            }

        } else {
            let backEnd = cc.callFunc(function () {
                selectNode.setPosition(copyNode.position);
                copyNode.destroy();
                self.bagContent.node.getChildByName(selectItemName).addChild(selectNode);
                selectNode.resumeSystemEvents(true);
            }, self, null);
            console.log(pos, selectNode.position);
            let back = cc.sequence(cc.moveTo(0.2, pos.x, pos.y), backEnd);
            selectNode.runAction(back);
            console.log("touch cancel second");
            console.log(selectNode);
        }
    },

    //生成登录奖励
    genLoginReward: function () {//  changed by qll on 20191226
        let date = new Date();
        let year = date.getFullYear(); //获取当前年份   
        let month = date.getMonth() + 1; //获取当前月份   
        let dat = date.getDate(); //获取当前日    
        let hour = date.getHours(); //获取小时   
        let minute = date.getMinutes(); //获取分钟   
        let second = date.getSeconds(); //获取秒   
        let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        let serverAddr = GlobalData.serverAddr + "php/genReward.php";
        let instance = this;
        // 调用自定义网路接口获取登录奖励
        let data = {
            "userID": GlobalData.userID,
            "genTime": timeStr,
            "rewardCategoryID": 1,
            "rewardLevel": 1,
        };
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
                console.log(res);
                GlobalData.loginRewardCoin = res.rewardCoin;//奖励金币数
                GlobalData.loginRewardGrowth = res.rewardGrowth;//奖励成长值
                instance._isLoginRewardShow = true;
            }
        });
    },

    //生成连续登录奖励
    genContLoginReward: function () {//  changed by qll on 20191226
        let date = new Date();
        let year = date.getFullYear(); //获取当前年份   
        let month = date.getMonth() + 1; //获取当前月份   
        let dat = date.getDate(); //获取当前日    
        let hour = date.getHours(); //获取小时   
        let minute = date.getMinutes(); //获取分钟   
        let second = date.getSeconds(); //获取秒   
        let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        let serverAddr = GlobalData.serverAddr + "php/genReward.php";
        let instance = this;
        // 调用自定义网路接口获取连续登录奖励
        let data = {
            "userID": GlobalData.userID,
            "genTime": timeStr,
            "rewardCategoryID": 2,
            "rewardLevel": GlobalData.contLoginDays,
        };
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
                console.log(res);
                GlobalData.contLoginRewardCoin = res.rewardCoin;//奖励金币数
                GlobalData.contLoginRewardGrowth = res.rewardGrowth;//奖励成长值
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
    login: function () {//  changed by qll on 20191226
        let flagContLoginReward = 0;
        let flagLoginReward = 0;
        // wx.login({
        //     success: res => {
        //         // 发送 res.code 到后台并收取生成的userID，
        //         let js_code = res.code;
        //         console.log(js_code);
        //         let date = new Date();
        //         let year = date.getFullYear(); //获取当前年份   
        //         let month = date.getMonth() + 1; //获取当前月份   
        //         let dat = date.getDate(); //获取当前日    
        //         let hour = date.getHours(); //获取小时   
        //         let minute = date.getMinutes(); //获取分钟   
        //         let second = date.getSeconds(); //获取秒   
        //         let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        //         let flagLocation = GlobalData.flagLocation;
        //         let serverAddr = GlobalData.serverAddr + "php/login.php";
        //         // 调用自定义网路接口进行登录操作
        //         let data = {
        //             "js_code": js_code,
        //             "loginTime": timeStr,
        //             "flagLocation": flagLocation,
        //         };
        //         HttpHelper.httpPost(serverAddr, data, function(res) {
        // 	        if (res != -1) {
        // 		           console.log(res);
        //                 GlobalData.userID = res.userID;
        //                 GlobalData.flagNewUser = Number(res.flagNewUser);
        //                 GlobalData.contLoginDays = Number(res.contLoginDays);
        //                 flagContLoginReward = Number(res.flagContLoginReward);
        //                 flagLoginReward = Number(res.flagLoginReward);
        // 	        }
        //         });
        //     }
        // })

        console.log('登录完成');

        if (GlobalData.flagNewUser == 1)//新用户，跳到领养界面
        {
            cc.director.loadScene("adopt");
        }
        else   //老用户，查询属性信息，恢复场景，生成奖励
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

    autoUpdate: function () {
        this.hunger.string = GlobalData.hunger;  // 饥饿值
        this.cleaness.string = GlobalData.cleaness; // 清洁值
        this.thirst.string = GlobalData.thirst; // 口渴值
        this.mood.string = GlobalData.mood; // 心情值
        this.energy.string = GlobalData.energy; // 能量值
        this.growth.string = GlobalData.growth; // 成长值
        this.growthLevel.string = GlobalData.growthLevel; // 成长值等级
        this.coin.string = GlobalData.coin; // 金币值
        //检查是否有奖励生成（仅限随机和升级）
        if (GlobalData.flagRandomReward == true) {
            this._isRandomRewardShow = true;  //在主界面某处出现随机奖励
        }
        if (GlobalData.flagUpgradeReward == true) {
            this._isUpgradeRewardShow = true;  //弹出升级奖励框
        }
    },

    init: function () {   //进入该页面时调用此函数
        // let interval = 1000;  //1秒
        // this.updateID = setInterval(this.autoUpdate, interval);
        this._isFunctionShow = true;
        this.timeIndex = [0, 30, 40, 50, 60];
        this.placeIndex = [
            "安徽", "澳门", "北京", "重庆", "福建", "甘肃", "广东", "广西",
            "贵州", "海南", "河北", "河南", "黑龙江", "湖北", "湖南", "吉林",
            "江苏", "江西", "辽宁", "内蒙古", "宁夏", "青海", "山东", "山西",
            "陕西", "上海", "四川", "台湾", "天津", "西藏", "香港", "新疆",
            "云南", "浙江"
        ];
        this.workTypeIndex = [
            "种花", "野外勘探", "画漫画", "当导游", "发广告", "算账"
        ];
        this.loadBag();
        this.theme = GlobalData.bgPicNum;
        this.queryAttribute();
        this.petCtrl = this.node.parent.getChildByName('pet').getComponent('pet');
        console.log(this.petCtrl);
    },

    exit: function () {  //退出该页面时调用此函数
        clearInterval(this.updateID);
    },

    onPlusBtnClicked: function () {
        //播放按键音效
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        // 动作期间禁用功能按钮
        this.functionBtn.interactable = false;
        this.showFunction();
    },

    showFunction: function () {
        this._isFunctionShow = !this._isFunctionShow;
        let actionSleepBtn = null;
        let actionWorkBtn = null;
        let actionTripBtn = null;
        let actionSettingBtn = null;
        // 动作结束时触发回调函数，让功能按钮恢复使用
        let funcBtnEnd = cc.callFunc(function () {
            this.functionBtn.interactable = true;
        }, this, null);
        let actionPlusBtn = cc.sequence(cc.rotateBy(0.7, 360), funcBtnEnd);
        if (!this._isFunctionShow) {
            actionSleepBtn = cc.spawn(cc.moveBy(0.5, cc.v2(0, 60)), cc.fadeOut(0.7));
            actionWorkBtn = cc.spawn(cc.moveBy(0.6, cc.v2(0, 120)), cc.fadeOut(0.7));
            actionTripBtn = cc.spawn(cc.moveBy(0.7, cc.v2(0, 180)), cc.fadeOut(0.7));
            actionSettingBtn = cc.spawn(cc.moveBy(0.8, cc.v2(0, 240)), cc.fadeOut(0.7));
        } else {
            actionSleepBtn = cc.spawn(cc.moveBy(0.5, cc.v2(0, -60)), cc.fadeIn(0.5));
            actionWorkBtn = cc.spawn(cc.moveBy(0.5, cc.v2(0, -120)), cc.fadeIn(0.5));
            actionTripBtn = cc.spawn(cc.moveBy(0.5, cc.v2(0, -180)), cc.fadeIn(0.5));
            actionSettingBtn = cc.spawn(cc.moveBy(0.5, cc.v2(0, -240)), cc.fadeIn(0.5));
        }
        this.tripBtn.node.runAction(actionTripBtn);
        this.workBtn.node.runAction(actionWorkBtn);
        this.sleepBtn.node.runAction(actionSleepBtn);
        this.settingBtn.node.runAction(actionSettingBtn);
        this.functionBtn.node.runAction(actionPlusBtn);
    },

    /**
     * 进入游戏”按键所对应的事件处理函数，在用户的授权下获得并更新一些用户信息
     * 需要微信接口，测试时可以先注释掉
     * author: qll
     * time: 2019/12/4
     */
    bindEnter: function (e) {
        let instance = this;
        if (e.detail.userInfo) {   //获得用户的微信账户信息
            console.log(e.detail.userInfo);
            GlobalData.userGender = e.detail.userInfo.gender;
            GlobalData.userName = e.detail.userInfo.nickName;
        }
        else {
            wx.showModal({
                title: '用户未授权',
                content: '拒绝授权将不能体验小游戏完整功能，点击确定开启授权',
                success: (res) => {
                    console.log(res);
                    if (res.confirm) {
                        wx.openSetting({});
                    }
                }
            });
        }
        //询问用户是否授权位置信息（一个实际上不必要的授权，用来测试用户的安全意识）
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userLocation'] != true) {
                    wx.showModal({
                        title: '定位授权',
                        content: '萌宠物语请求获得您的位置信息，请确认授权',
                        success: (res) => {
                            console.log(res);
                            if (res.confirm) {
                                wx.openSetting({
                                    success(settingdata) {
                                        console.log(settingdata);
                                        if (settingdata.authSetting['scope.userLocation']) {
                                            GlobalData.flagLocation = 1;
                                            console.log("位置授权成功");
                                            instance.login();
                                        }
                                        else {
                                            GlobalData.flagLocation = 0;
                                            console.log("取消位置授权");
                                            instance.login();
                                        }
                                    }
                                })
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

    queryAttribute: function () {//  changed by qll on 20191226
        let serverAddr = GlobalData.serverAddr + "php/queryUserAttribute.php";
        // 调用自定义网路接口进行查询
        let data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1"
        };
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
                console.log(res);
                GlobalData.coin = res.coin;//金币值
                GlobalData.title = res.title;//主人称呼
            }
        });
        serverAddr = GlobalData.serverAddr + "php/queryPetAttribute.php";
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
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
                GlobalData.growthLevel = res.growthLevel;// 宠物成长等级
                GlobalData.flagAgeGroup = res.flagAgeGroup;// 标志位：幼年or成年
                GlobalData.flagSkipping = res.flagSkipping;// 标志位_是否解锁“跳绳”操作
                GlobalData.flagStory = res.flagStory;// 标志位_是否解锁“讲故事”操作
                GlobalData.flagSleep = res.flagSleep;// 标志位-是否正在睡觉
                GlobalData.sleepRemainTime = res.sleepRemainTime;// 睡觉剩余时长
                GlobalData.flagWork = res.flagWork;// 标志位-是否正在打工
                GlobalData.workRemainTime = res.workRemainTime;// 打工剩余时长
                GlobalData.flagTrip = res.flagTrip;// 标志位-是否正在旅游
                GlobalData.tripRemainTime = res.tripRemainTime;// 旅游剩余时长
            }
        });
        serverAddr = GlobalData.serverAddr + "php/querySetting.php";
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
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
            }
        });
        serverAddr = GlobalData.serverAddr + "php/queryDecBag.php";
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
                console.log(res);
                GlobalData.bag.itemIDArrayStr = res.itemIDArray;//物品ID数组
                GlobalData.bag.itemNameArrayStr = res.itemNameArray;//物品名称数组（英文）
                GlobalData.bag.categoryIDArrayStr = res.categoryArray;//物品类别ID数组
                GlobalData.bag.categoryNameArrayStr = res.categoryNameArray;//物品类别名称数组
                GlobalData.bag.flagEnableArrayStr = res.flagEnableArray;//物品是否启用的标志位数组
            }
        });

    },

    //点击获取奖励
    //参数说明：1：登录奖励；2：连续登录奖励；3：升级奖励；4：随机奖励
    onClickGetReward: function (rewardCategoryID) {//  changed by qll on 20191226
        let date = new Date();
        let year = date.getFullYear(); //获取当前年份   
        let month = date.getMonth() + 1; //获取当前月份   
        let dat = date.getDate(); //获取当前日    
        let hour = date.getHours(); //获取小时   
        let minute = date.getMinutes(); //获取分钟   
        let second = date.getSeconds(); //获取秒   
        let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        let serverAddr = GlobalData.serverAddr + "php/getReward.php";
        let details = 'Category:' + rewardCategoryID.toString();
        let rewardCoin = 0;
        let rewardGrowth = 0;
        let rewardItemID = 0;
        let rewardItemCateID = 0;
        if (rewardCategoryID == 1) {  //登录奖励
            rewardCoin = GlobalData.loginRewardCoin;
            rewardGrowth = GlobalData.loginRewardGrowth;
        }
        else if (rewardCategoryID == 2) {  //连续登录奖励
            rewardCoin = GlobalData.contLoginRewardCoin;
            rewardGrowth = GlobalData.contLoginRewardGrowth;
        }
        else if (rewardCategoryID == 3) {  //升级奖励
            rewardCoin = GlobalData.upgradeRewardCoin;
            rewardItemID = GlobalData.upgradeRewardItemID;
            rewardItemCateID = GlobalData.upgradeRewardItemCateID;
        }
        else {  //随机奖励
            rewardItemID = GlobalData.randomRewardItemID;
            rewardItemCateID = GlobalData.randomRewardItemCateID;
        }
        // 调用自定义网路接口领取奖励
        let data = {
            "userID": GlobalData.userID,
            "getTime": timeStr,
            "rewardCoin": rewardCoin,
            "rewardGrowth": rewardGrowth,
            "rewardItemID": rewardItemID,
            "rewardItemCateID": rewardItemCateID,
            "details": details,
        };
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
                console.log(res);
            }
        });
    },


    onClickEatBtn: function () {  //点击吃饭按钮
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        console.log("点击吃饭");
        this.isBagShow = 1;
    },

    onClickShowerBtn: function () {  //点击洗澡按钮
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        console.log("点击洗澡");
        this.isBagShow = 2;
    },

    onClickDrinkBtn: function () {  //点击喝水按钮 //  changed by qll on 20191226
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        console.log("点击喝水");
        let date = new Date();
        let year = date.getFullYear(); //获取当前年份   
        let month = date.getMonth() + 1; //获取当前月份   
        let dat = date.getDate(); //获取当前日    
        let hour = date.getHours(); //获取小时   
        let minute = date.getMinutes(); //获取分钟   
        let second = date.getSeconds(); //获取秒   
        let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        let serverAddr = GlobalData.serverAddr + "php/drink.php";
        let details = '';
        // 调用自定义网路接口
        let data = {
            "userID": GlobalData.userID,
            "operationTime": timeStr,
            "details": details,
        };
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
                console.log(res);
                //无需更新属性值，后台会自动更新
            }
        });
    },


    onClickPlayBtn: function () {  //点击玩耍按钮
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        console.log("点击玩耍");
        this._isPlaySettingShow = true;  //显示玩耍子类别按钮
    },

    //  changed by qll on 20191226
    onClickSubPlayBtn: function (playID) {  //点击玩耍子类别按钮
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        let date = new Date();
        let year = date.getFullYear(); //获取当前年份   
        let month = date.getMonth() + 1; //获取当前月份   
        let dat = date.getDate(); //获取当前日    
        let hour = date.getHours(); //获取小时   
        let minute = date.getMinutes(); //获取分钟   
        let second = date.getSeconds(); //获取秒   
        let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        let serverAddr = GlobalData.serverAddr + "php/play.php";
        let details = '';
        // 调用自定义网路接口
        let data = {
            "userID": GlobalData.userID,
            "operationTime": timeStr,
            "playID": playID,
            "details": details,
        };
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
                console.log(res);
                //无需更新属性值，后台会自动更新
            }
        });
    },


    startCountDown: function(operationName, id) {  
        //参数的意义：operationName表示到底是为了什么操作而进行倒计时（work或trip或sleep）
        if (operationName == 'trip') {
            this.questionPrompt.getComponent('questionPrompt').init(0, 1);
        } else if (operationName == 'work') {
            this.questionPrompt.getComponent('questionPrompt').init(1, 1);
        }
        this.questionPrompt.active = true;
    },

    onClickCloseBagBtn: function () {  //点击主界面上的关闭背包按钮
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        console.log("关闭背包");
        this.isBagShow = 0;
    },

    onClickTripCloseBtn: function () {
        // 音效尚未添加 -- need audio
        this.isTripSettingShow = false;
    },

    onClickTripBtn: function () {  //点击主界面上的旅游按钮
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        if (this.petCtrl.flagPetOperBtnEnable == true) {
            if (GlobalData.energy >= 0 && GlobalData.mood >= 0) {
                console.log("打开旅游提示框");
                this.isTripSettingShow = true;  //显示旅游设置框
                // 初始化提示框下拉框的值
                let dropdownData = ['30s', '40s', '50s', '60s']; // 四个值，不能与timeIndex数组对应
                this.tripPrompt.getChildByName('timeDropDownBox').getComponent('dropdown').init(dropdownData);  // 时间下拉框
                dropdownData = this.placeIndex;
                this.tripPrompt.getChildByName('placeDropDownBox').getComponent('dropdown').init(dropdownData); // 地点下拉框
            } else {
                let promptStr = '宠物能量值不低于50且心情值不低于30才可以去旅游哟~~';
                // 失败提示，待写
            }
        } else {
            let promptStr = '您的宠物现在正忙哟~~';
            // 失败提示，待写
        }

    },

    //  changed by qll on 20191226
    onClickConfirmTrip: function () {//完成所有设置后，点击“去旅游”
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);

        // 游戏里需要完成的操作
        this.tripPrompt.active = false; // 关闭提示框
        this.pet.active = false; // 隐藏宠物
        this.petCtrl.goTrip();
        this.tripTimeID = this.tripPrompt.getChildByName('timeDropDownBox').getComponent('dropdown').selectIndex + 1; // 加1是为了与timeIndex对应起来
        this.tripTypeID = this.tripPrompt.getChildByName('placeDropDownBox').getComponent('dropdown').selectIndex + 1;
        this.clockCanvas.counter = parseInt(this.timeIndex[this.tripTimeID]); // 旅游计数器
        let self = this;
        // 计数函数
        this.clockCanvas.callback = function () {
            this.counter--;
            if (this.counter < 1) {
                this.unschedule(this.callback);
                this.node.parent.active = false;
                self.pet.active = true;
                self.startCountDown('trip', self.tripTypeID);
                self.petCtrl.tripEnd() //  宠物状态开锁
            }
            this.node.parent.getChildByName('time').getComponent(cc.Label).string = this.counter;
            // this.circle(0, 0, 75);
            // this.fill();
            this.arc(0, 0, 60, Math.PI / 2, Math.PI / 2 - 2 * this.counter / self.timeIndex[self.tripTimeID] * Math.PI, false);
            this.stroke();
        }
        // 计时函数，每一秒执行一次
        this.clockCanvas.node.parent.active = true; //打开工作倒计时
        this.clockCanvas.schedule(this.clockCanvas.callback, 1);

        // http post
        let date = new Date();
        let year = date.getFullYear(); //获取当前年份   
        let month = date.getMonth() + 1; //获取当前月份   
        let dat = date.getDate(); //获取当前日    
        let hour = date.getHours(); //获取小时   
        let minute = date.getMinutes(); //获取分钟   
        let second = date.getSeconds(); //获取秒   
        let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        let serverAddr = GlobalData.serverAddr + "php/trip.php";
        let details = '';
        let instance = this;
        // 调用自定义网路接口
        let data = {
            "userID": GlobalData.userID,
            "operationTime": timeStr,
            "tripTimeID": instance.tripTimeID,
            "tripTypeID": instance.tripTypeID,
            "details": details,
        };
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
                console.log(res);
                //无需更新属性值，后台会自动更新，但可以根据这些属性值对用户做出提示
                let moodChangedValue = res.moodChangedValue;
                let energyChangedValue = res.energyChangedValue;
                let coinChangedValue = res.coinChangedValue;
                let growthChangedValue = res.growthChangedValue;
                let QANum = res.QANum;  //题目文件编号
                let picNum = res.picNum;  //旅游照片编号 
                instance.startCountDown('trip', instance.timeIndex[instance.tripTimeID], res.question, res.answer, res.picAddr);
            }
        });
    },

    onClickWorkCloseBtn: function () {
        // 音效尚未添加 -- need audio
        this.isWorkSettingShow = false;
    },

    onClickWorkBtn: function () {  //点击主界面上的工作按钮
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        console.log(this.petCtrl.flagPetOperBtnEnable);
        if (this.petCtrl.flagPetOperBtnEnable == true) {
            if (GlobalData.energy >= 0) {
                console.log("打开工作提示框");
                this.isWorkSettingShow = true;  //显示工作设置框
                // 初始化提示框下拉框的值
                let dropdownData = ['30s', '40s', '50s', '60s']; // 四个值，不能与timeIndex数组对应
                this.workPrompt.getChildByName('timeDropDownBox').getComponent('dropdown').init(dropdownData);  // 时间下拉框
                dropdownData = this.workTypeIndex;
                this.workPrompt.getChildByName('typeDropDownBox').getComponent('dropdown').init(dropdownData);  // 时间下拉框
            } else {
                let promptStr = '宠物能量值不低于50才可以去工作哟~~';
                // 失败提示框！未设置
            }
        } else {
            let promptStr = '您的宠物正忙';
            // 失败提示框！未设置
        }
    },

    //  changed by qll on 20191226
    onClickConfirmWork: function () {//完成所有设置后，点击“去工作”
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        // 游戏里需要完成的操作
        this.workPrompt.active = false; // 关闭提示框
        this.pet.active = false; // 隐藏宠物
        this.petCtrl.goWork() //  宠物状态上锁
        this.workTimeID = this.workPrompt.getChildByName('timeDropDownBox').getComponent('dropdown').selectIndex + 1; // 加1是为了与timeIndex对应起来
        this.workTypeID = this.workPrompt.getChildByName('typeDropDownBox').getComponent('dropdown').selectIndex + 1;
        this.clockCanvas.counter = parseInt(this.timeIndex[this.workTimeID]); // 工作计数器
        let self = this;
        // 计数函数
        this.clockCanvas.callback = function () {
            this.counter--;
            if (this.counter < 1) {
                this.unschedule(this.callback);
                this.node.parent.active = false;
                self.pet.active = true;
                self.startCountDown('work', self.workTypeID);
                self.petCtrl.workEnd(); // 宠物状态开锁
            }
            this.node.parent.getChildByName('time').getComponent(cc.Label).string = this.counter;
            this.circle(0, 0, 75);
            this.fill();
            this.arc(0, 0, 60, Math.PI / 2, Math.PI / 2 - 2 * this.counter / self.timeIndex[self.workTimeID] * Math.PI, false);
            this.stroke();
        }
        // 计时函数，每一秒执行一次
        this.clockCanvas.node.parent.active = true; //打开工作倒计时
        this.clockCanvas.schedule(this.clockCanvas.callback, 1);

        // http post
        let date = new Date();
        let year = date.getFullYear(); //获取当前年份   
        let month = date.getMonth() + 1; //获取当前月份   
        let dat = date.getDate(); //获取当前日    
        let hour = date.getHours(); //获取小时   
        let minute = date.getMinutes(); //获取分钟   
        let second = date.getSeconds(); //获取秒   
        let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        let serverAddr = GlobalData.serverAddr + "php/work.php";
        let details = '';
        let instance = this;
        // 调用自定义网路接口
        let data = {
            "userID": GlobalData.userID,
            "operationTime": timeStr,
            "workTimeID": instance.workTimeID,
            "workLocID": instance.workLocID,
            "details": details,
        };
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
                console.log(res);
                //无需更新属性值，后台会自动更新，但可以根据这些属性值对用户做出提示
                let hungerChangedValue = res.hungerChangedValue;
                let cleanessChangedValue = res.cleanessChangedValue;
                let thirstChangedValue = res.thirstChangedValue;
                let moodChangedValue = res.moodChangedValue;
                let energyChangedValue = res.energyChangedValue;
                let coinChangedValue = res.coinChangedValue;
                let growthChangedValue = res.growthChangedValue;
                let flagCAPTCHA = res.flagCAPTCHA; //是否出现验证码题目
                let QANum = res.QANum;  //题目文件编号
                let picNum = res.picNum;  //打工照片编号              
                instance.startCountDown('work', instance.timeIndex[instance.workTimeID]);
            }
        });
    },

    onClickSleepCloseBtn: function () {
        // 音效尚未添加 -- need audio
        this.isSleepSettingShow = false;
    },
    //  changed by wang-c on 20200103
    onClickSleepBtn: function () {  //点击主界面上的睡觉按钮
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        //var btnSoundID = cc.audioEngine.play(this.btnSound, false, GlobalData.soundVolume);
        console.log(this.petCtrl.flagPetOperBtnEnable);
        if (this.petCtrl.flagPetOperBtnEnable == true) {
            console.log("打开睡觉提示框");
            this.isSleepSettingShow = true;  //显示睡觉设置框
            // 初始化提示框下拉框的值
            let dropdownData = ['30s', '40s', '50s', '60s']; // 四个值，不能与timeIndex数组对应
            this.sleepPrompt.getChildByName('dropDownBox').getComponent('dropdown').init(dropdownData);
        } else {
            let promptStr = "您的宠物正忙哟~~~";
            // 失败提示框，待写
        }

    },

    //  changed by qll on 20191226
    onClickConfirmSleep: function () {//完成所有设置后，点击“去睡觉”
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);

        // 游戏里需要完成的操作
        this.sleepPrompt.active = false; // 关闭提示框
        this.pet.active = false; // 隐藏宠物
        this.petCtrl.goSleep() // 宠物状态上锁
        this.sleepTimeID = this.sleepPrompt.getChildByName('dropDownBox').getComponent('dropdown').selectIndex + 1; // 加1是为了与timeIndex对应起来
        this.clockCanvas.counter = parseInt(this.timeIndex[this.sleepTimeID]); // 睡觉计数器
        let self = this;
        // 计数函数
        this.clockCanvas.callback = function () {
            this.counter--;
            if (this.counter < 1) {
                this.unschedule(this.callback);
                this.node.parent.active = false;
                self.pet.active = true;
                cc.audioEngine.stop(sleepSoundID);
                self.petCtrl.sleepEnd(); // 宠物状态开锁
            }
            this.node.parent.getChildByName('time').getComponent(cc.Label).string = this.counter;
            this.circle(0, 0, 75);
            this.fill();
            this.arc(0, 0, 60, Math.PI / 2, Math.PI / 2 - 2 * this.counter / self.timeIndex[self.sleepTimeID] * Math.PI, false);
            this.stroke();
        }
        //播放睡觉的声音
        this.sleepSound = cc.url.raw('resources/sound/sleep/6.mp3');
        var soundVolume = 0.5;
        var sleepSoundID = cc.audioEngine.play(this.sleepSound, false, soundVolume);
        //var sleepSoundID = cc.audioEngine.play(this.sleepSound, false, GlobalData.soundVolume);
        // 计时函数，每一秒执行一次
        this.clockCanvas.node.parent.active = true; //打开睡觉倒计时
        this.clockCanvas.schedule(this.clockCanvas.callback, 1);

        // http post
        let date = new Date();
        let year = date.getFullYear(); //获取当前年份   
        let month = date.getMonth() + 1; //获取当前月份   
        let dat = date.getDate(); //获取当前日    
        let hour = date.getHours(); //获取小时   
        let minute = date.getMinutes(); //获取分钟   
        let second = date.getSeconds(); //获取秒   
        let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        let serverAddr = GlobalData.serverAddr + "php/sleep.php";
        let details = "";
        let instance = this;
        // 调用自定义网路接口
        let data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
            "operationTime": timeStr,
            "sleepTimeID": instance.sleepTimeID,
            "details": details,
        };
        HttpHelper.httpPost(serverAddr, data, function (res) {
            if (res != -1) {
                console.log(res);
                //无需更新属性值，后台会自动更新，但可以根据这些属性值对用户做出提示
                let energyChangedValue = res.energyChangedValue;
                let growthChangedValue = res.growthChangedValue;
                instance.startCountDown('sleep', instance.timeIndex[instance.sleepTimeID]);
            }
        });
    },

    onClickHomeBtn: function () {  //跳转到小屋界面
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        this.exit();
        cc.director.loadScene('house');
    },

    onClickSettingBtn: function () {  //跳转到设置界面
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        this.exit();
        cc.director.loadScene('setting');
    },

    onClickShopBtn: function () {  //跳转到商店界面  P.S.这个按钮应该在两个地方都有出现：主界面and背包框
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        this.exit();
        cc.director.loadScene('shop');
    },

    onClickUserInfoBtn: function () {  //跳转到个人信息界面
        //播放按键音
        this.btnSound = cc.url.raw('resources/sound/button/1.mp3');
        var soundVolume = 0.5;
        var btnSoundID = cc.audioEngine.play(this.btnSound, false, soundVolume);
        this.exit();
        cc.director.loadScene('personalInfo');
    },

    // update (dt) {},
});