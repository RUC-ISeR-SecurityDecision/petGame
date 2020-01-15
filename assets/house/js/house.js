function DecItem(id, name, categoryID, categoryName, price, isOwnFlag) {
    this.id = id;
    this.name = name;
    this.categoryID = categoryID;
    this.categoryName = categoryName;
    this.price = price;
    this._isUse = false;
    this._isOwn = isOwnFlag;
};

cc.Class({
    extends: cc.Component,

    properties: {
        decItemArray: [],

        // sofa
        sofaPic: cc.Sprite,
        sofaBtn: cc.Button,
        sofaCell: cc.Node,
        sofa: {
            get() {
                return this._sofa;
            },
            set(value) {
                if (value == 0) {
                    this.sofaPic.node.active = false;
                    this.sofaBtn.node.active = true;
                } else {
                    this.sofaPic.node.active = true;
                    this.sofaBtn.node.active = false;
                    if (value != this._sofa) {
                        console.log('user change sofa');
                        let picPath = "shopPic/cate3/" + value;
                        let self = this;
                        cc.loader.loadRes(picPath, cc.SpriteFrame, (err, sp) => {
                            if (err) {
                                console.log("house.js " + err);
                            }
                            self.sofaPic.spriteFrame = sp;
                        })
                    }
                }
                this._sofa = value;
            }
        },
        // table
        tablePic: cc.Sprite,
        tableCell: cc.Node,
        tableBtn: cc.Button,
        table: {
            get() {
                return this._table;
            },
            set(value) {
                if (value == 0) {
                    this.tablePic.node.active = false;
                    this.tableBtn.node.active = true;
                } else {
                    this.tablePic.node.active = true;
                    this.tableBtn.node.active = false;
                    if (value != this._table) {
                        console.log('user change table');
                        let picPath = "shopPic/cate4/" + value;
                        let self = this;
                        cc.loader.loadRes(picPath, cc.SpriteFrame, (err, sp) => {
                            if (err) {
                                console.log("house.js " + err);
                            }
                            self.tablePic.spriteFrame = sp;
                        })
                    }
                }
                this._table = value;
            }
        },
        // wall operation
        wallPic: cc.Sprite,
        wallCell: cc.Node,
        wallBtn: cc.Button,
        wall: {
            get() {
                return this._wall;
            },
            set(value) {
                if (value == 0) {
                    this.wallPic.node.active = false;
                    this.wallBtn.node.active = true;
                } else {
                    this.wallPic.node.active = true;
                    this.wallBtn.node.active = false;
                    if (value != this._wall) {
                        console.log('user change wall');
                        let picPath = "shopPic/cate5/" + value + "-cover";
                        let self = this;
                        cc.loader.loadRes(picPath, cc.SpriteFrame, (err, sp) => {
                            if (err) {
                                console.log("house.js " + err);
                            }
                            self.wallPic.spriteFrame = sp;
                        })
                    }
                }
                this._wall = value;
            }
        },
        // floor
        floorPic: cc.Sprite,
        floorCell: cc.Node,
        floorBtn: cc.Button,
        floor: {
            get() {
                return this._floor;
            },
            set(value) {
                if (value == 0) {
                    this.floorPic.node.active = false;
                    this.floorBtn.node.active = true;
                } else {
                    this.floorPic.node.active = true;
                    this.floorBtn.node.active = false;
                    if (value != this._floor) {
                        console.log('user change floor');
                        let picPath = "shopPic/cate6/" + value + "-cover";
                        let self = this;
                        cc.loader.loadRes(picPath, cc.SpriteFrame, (err, sp) => {
                            if (err) {
                                console.log("house.js " + err);
                            }
                            self.floorPic.spriteFrame = sp;
                        })
                    }
                }
                this._floor = value;
            }
        },
        // carpet operation
        carpetPic: cc.Sprite,
        carpetCell: cc.Node,
        carpetBtn: cc.Button,
        carpet: {
            get() {
                return this._carpet;
            },
            set(value) {
                if (value == 0) {
                    this.carpetPic.node.active = false;
                    this.carpetBtn.node.active = true;
                } else {
                    this.carpetPic.node.active = true;
                    this.carpetBtn.node.active = false;
                    if (value != this._carpet) {
                        console.log('user change carpet');
                        let picPath = "shopPic/cate7/" + value;
                        let self = this;
                        cc.loader.loadRes(picPath, cc.SpriteFrame, (err, sp) => {
                            if (err) {
                                console.log("house.js " + err);
                            }
                            self.carpetPic.spriteFrame = sp;
                        })
                    }
                }
                this._carpet = value;
            }
        },
        // curtain operation
        curtainPic: cc.Sprite,
        curtainCell: cc.Node,
        curtainBtn: cc.Button,
        curtain: {
            get() {
                return this._curtain;
            },
            set(value) {
                if (value == 0) {
                    this.curtainPic.node.active = false;
                    this.curtainBtn.node.active = true;
                } else {
                    this.curtainPic.node.active = true;
                    this.curtainBtn.node.active = false;
                    if (value != this._curtain) {
                        console.log('user change curtain');
                        let picPath = "shopPic/cate8/" + value;
                        let self = this;
                        cc.loader.loadRes(picPath, cc.SpriteFrame, (err, sp) => {
                            if (err) {
                                console.log("house.js " + err);
                            }
                            self.curtainPic.spriteFrame = sp;
                        })
                    }
                }
                this._curtain = value;
            }
        },
        // garniture operation
        garniturePic: cc.Sprite,
        garnitureCell: cc.Node,
        garnitureBtn: cc.Button,
        garniture: {
            get() {
                return this._garniture;
            },
            set(value) {
                if (value == 0) {
                    this.garniturePic.node.active = false;
                    this.garnitureBtn.node.active = true;
                } else {
                    this.garniturePic.node.active = true;
                    this.garnitureBtn.node.active = false;
                    if (value != this._garniture) {
                        console.log('user change garniture');
                        let picPath = "shopPic/cate9/" + value;
                        let self = this;
                        cc.loader.loadRes(picPath, cc.SpriteFrame, (err, sp) => {
                            if (err) {
                                console.log("house.js " + err);
                            }
                            self.garniturePic.spriteFrame = sp;
                        })
                    }
                }
                this._garniture = value;
            }
        },

        choosePrompt: cc.Node,
        choosePromptShowStatus: {
            // 根据装饰品的categoryID修改状态值，0表示不显示选择提示框
            get() {
                return this._choosePromptShowStatus;
            },
            set(value) {
                let choiceNodeArray = this.choosePrompt.getChildByName('Layout').children;
                if (value == 0) {
                    this.choosePrompt.active = false;
                } else if (value == 10) { // tool
                } else {
                    this.choosePrompt.active = true;
                    for (let i = 0; i < choiceNodeArray.length; i++) {
                        const element = choiceNodeArray[i].getComponent(cc.Sprite);
                        let picPath = "shopPic/cate" + value + "/";
                        let index = this.findItem((i + 1), value);
                        let self = this;
                        element.node.targetOff(self);
                        if (self.decItemArray[index]._isOwn == 0) {
                            if (value == 5 || value == 6) {
                                picPath += "shadow";
                            } else {
                                picPath = picPath + (i + 1) + '-shadow';
                            }
                            element.node.on(cc.Node.EventType.TOUCH_START, function () {
                                self.openBuyPrompt(index);
                            }, self);
                        } else {
                            picPath = picPath + (i + 1);
                            element.node.on(cc.Node.EventType.TOUCH_START, function () {
                                self.openUsePrompt(index);
                            }, self);
                        }
                        // console.log(picPath);
                        cc.loader.loadRes(picPath, cc.SpriteFrame, (err, sp) => {
                            if (err) {
                                console.log("house.js " + err);
                            }
                            element.spriteFrame = sp;
                        })

                    }
                }
            }
        },
        buyPrompt: cc.Node,
        buyPromptItemPic: cc.Sprite,
        buyPromptPrice: cc.Label,
        buyIndex: 0,
        // use prompt
        usePrompt: cc.Node,
        useIndex: 0,
        // album
        listContainer: cc.Node,
        album: cc.Node,
        picAddrArray: [],
    },

    viewWorkAlbum: function () {
        // 首先清除缓存图片
        for (let i = 0; i < this.picAddrArray.length; i++) {
            const element = this.picAddrArray[i];
            cc.loader.releaseRes(element, cc.SpriteFrame);             
        }
        let date = new Date();
        let year = date.getFullYear(); //获取当前年份   
        let month = date.getMonth() + 1; //获取当前月份   
        let dat = date.getDate(); //获取当前日    
        let hour = date.getHours(); //获取小时   
        let minute = date.getMinutes(); //获取分钟   
        let second = date.getSeconds(); //获取秒   
        let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var self = this;
        var data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
            "operationTime": timeStr,
            "workORtrip": 1,
            "details": "user",
        };
        var serverAddr = 'https://www.llquruc.top/petGame/php/queryAlbum.php';
        HttpHelper.httpPost(serverAddr, data, function (_data) {
            if (_data != -1) {
                console.log(_data);
                let picAddrArray = _data.picAddrArray.split('+');
                console.log(picAddrArray);
                for (let i = 0; i < picAddrArray.length; i++) {
                    const element = picAddrArray[i];
                    picAddrArray[i] = element.replace(/.png/, '');
                    picAddrArray[i] = picAddrArray[i].replace(/resources\//, '')
                    console.log(picAddrArray[i]);

                    self.listContainer.destroyAllChildren();
                    let newListNode = new cc.Node('list');
                    let newSp = newListNode.addComponent(cc.Sprite);
                    cc.loader.loadRes(picAddrArray[i], cc.SpriteFrame, (err, sp) => {
                        if (err) {
                            console.log("house.js " + err);
                        }
                        newSp.spriteFrame = sp;
                        newListNode.width = 175;
                        newListNode.height = 140;
                        self.listContainer.addChild(newListNode);
                    })
                    
                    newListNode.on(cc.Node.EventType.TOUCH_START, function () {

                    }, self);
                }
                self.picAddrArray = picAddrArray;
                self.album.active = true;
            }
        });
    },

    viewTripAlbum: function () {
        // 首先清除缓存图片
        for (let i = 0; i < this.picAddrArray.length; i++) {
            const element = this.picAddrArray[i];
            cc.loader.releaseRes(element, cc.SpriteFrame);             
        }

        let date = new Date();
        let year = date.getFullYear(); //获取当前年份   
        let month = date.getMonth() + 1; //获取当前月份   
        let dat = date.getDate(); //获取当前日    
        let hour = date.getHours(); //获取小时   
        let minute = date.getMinutes(); //获取分钟   
        let second = date.getSeconds(); //获取秒   
        let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var self = this;
        var data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
            "operationTime": timeStr,
            "workORtrip": 2,
            "details": "user",
        };
        var serverAddr = 'https://www.llquruc.top/petGame/php/queryAlbum.php';
        HttpHelper.httpPost(serverAddr, data, function (_data) {
            if (_data != -1) {
                console.log(_data);
                let picAddrArray = _data.picAddrArray.split('+');
                console.log(picAddrArray);
                for (let i = 0; i < picAddrArray.length; i++) {
                    const element = picAddrArray[i];
                    picAddrArray[i] = element.replace(/.png/, '');
                    picAddrArray[i] = picAddrArray[i].replace(/resources\//, '')
                    console.log(picAddrArray[i]);

                    self.listContainer.destroyAllChildren();
                    let newListNode = new cc.Node('list');
                    let newSp = newListNode.addComponent(cc.Sprite);
                    newListNode.on(cc.Node.EventType.TOUCH_START, function () {

                    }, self);
                    cc.loader.loadRes(picAddrArray[i], cc.SpriteFrame, (err, sp) => {
                        if (err) {
                            console.log("house.js " + err);
                        }
                        newSp.spriteFrame = sp;
                        newListNode.width = 175;
                        newListNode.height = 140;
                        self.listContainer.addChild(newListNode);
                    })                    
                }
                self.picAddrArray = picAddrArray;
                self.album.active = true;
            }            
        });
    },

    onClickAlbum: function () {
        this.viewWorkAlbum();
    },
    onClickCloseAlbum: function () {
        // 首先清除缓存图片
        for (let i = 0; i < this.picAddrArray.length; i++) {
            const element = this.picAddrArray[i];
            cc.loader.releaseRes(element, cc.SpriteFrame);             
        }
        this.picAddrArray = [];
        this.listContainer.destroyAllChildren();
        this.album.active = false;
    },

    onClickSofa: function () {
        this.choosePromptShowStatus = 3; // 3表示选择提示框显示沙发 sofa的categoryID是3
    },
    onClickTable: function () {
        this.choosePromptShowStatus = 4; // 5表示选择提示框显示桌子 table的categoryID是4
    },
    onClickWall: function () {
        this.choosePromptShowStatus = 5; // 5表示选择提示框显示墙纸 wall的categoryID是5
    },
    onClickFloor: function () {
        this.choosePromptShowStatus = 6; // 5表示选择提示框显示地板 floor的categoryID是6
    },
    onClickCarpet: function () {
        this.choosePromptShowStatus = 7; // 5表示选择提示框显示地毯 carpet的categoryID是7
    },
    onClickCurtain: function () {
        this.choosePromptShowStatus = 8; // 5表示选择提示框显示窗帘 curtain的categoryID是8
    },
    onClickDecoration: function () {
        this.choosePromptShowStatus = 9; // 5表示选择提示框显示装饰品 decoration的categoryID是9
    },

    findItem: function (itemID, categoryID) {
        for (let i = 0; i < this.decItemArray.length; i++) {
            const element = this.decItemArray[i];

            if (element._isOwn == 1) {
                console.log(element, itemID, categoryID);
            }
            if (element.id == itemID && element.categoryID == categoryID) {
                return i;
            }
        }
    },
    onClickChoosePromptClose: function () {
        this.closeBuyPrompt();
        this.closeUsePrompt();
        this.choosePromptShowStatus = 0;
    },
    openBuyPrompt: function (index) {
        let self = this;
        self.buyIndex = index;
        self.buyPromptPrice.string = self.decItemArray[index].price;
        let path = "shopPic/cate" + self.decItemArray[self.buyIndex].categoryID + "/" + self.decItemArray[self.buyIndex].id;
        cc.loader.loadRes(path, cc.SpriteFrame, (err, sp) => {
            if (err) {
                console.log("house.js " + err);
            }
            self.buyPromptItemPic.spriteFrame = sp;
            self.buyPrompt.active = true;
        })
    },
    closeBuyPrompt: function () {
        let self = this;
        self.buyPrompt.active = false;
    },
    onClickBuyPromptClose: function () {
        this.closeBuyPrompt();
    },
    onClickBuyComfirm: function () {
        let date = new Date();
        let year = date.getFullYear(); //获取当前年份   
        let month = date.getMonth() + 1; //获取当前月份   
        let dat = date.getDate(); //获取当前日    
        let hour = date.getHours(); //获取小时   
        let minute = date.getMinutes(); //获取分钟   
        let second = date.getSeconds(); //获取秒   
        let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var self = this;
        var data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
            "operationTime": timeStr,
            "categoryID": self.decItemArray[self.buyIndex].categoryID,
            "itemID": self.decItemArray[self.buyIndex].id,
            "number": 1,
        };
        var serverAddr = 'https://www.llquruc.top/petGame/php/buy.php';
        HttpHelper.httpPost(serverAddr, data, function (_data) {
            if (_data != -1) {
                console.log("success!");
                self.decItemArray[self.buyIndex]._isOwn = 1;
                self.choosePromptShowStatus = self.decItemArray[self.buyIndex].categoryID;
                self.closeBuyPrompt();
                // 未处理返回值，
            }
        });
    },

    openUsePrompt: function (index) {
        let self = this;
        self.usePrompt.active = true;
        self.useIndex = index;
    },
    closeUsePrompt: function () {
        let self = this;
        self.usePrompt.active = false;
    },
    onClickUsePromptClose: function () {
        this.closeUsePrompt();
    },
    onClickUseComfirm: function () {
        let date = new Date();
        let year = date.getFullYear(); //获取当前年份   
        let month = date.getMonth() + 1; //获取当前月份   
        let dat = date.getDate(); //获取当前日    
        let hour = date.getHours(); //获取小时   
        let minute = date.getMinutes(); //获取分钟   
        let second = date.getSeconds(); //获取秒   
        let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var self = this;
        var data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
            "operationTime": timeStr,
            "categoryID": self.decItemArray[self.buyIndex].categoryID,
            "itemID": self.decItemArray[self.buyIndex].id,
            "details": "",
        };
        var serverAddr = 'https://www.llquruc.top/petGame/php/decorate.php';
        HttpHelper.httpPost(serverAddr, data, function (_data) {
            if (_data != -1) {
                console.log("success!");
                if (self.decItemArray[self.useIndex].categoryID == 3) { // sofa
                    self.sofa = self.decItemArray[self.useIndex].id;
                } else if (self.decItemArray[self.useIndex].categoryID == 4) { // table
                    self.table = self.decItemArray[self.useIndex].id;
                } else if (self.decItemArray[self.useIndex].categoryID == 5) { // wall
                    self.wall = self.decItemArray[self.useIndex].id;
                } else if (self.decItemArray[self.useIndex].categoryID == 6) { // floor
                    self.floor = self.decItemArray[self.useIndex].id;
                } else if (self.decItemArray[self.useIndex].categoryID == 7) { // carpet
                    self.carpet = self.decItemArray[self.useIndex].id;
                } else if (self.decItemArray[self.useIndex].categoryID == 8) { // curtain
                    self.curtain = self.decItemArray[self.useIndex].id;
                } else if (self.decItemArray[self.useIndex].categoryID == 9) { // garniture
                    self.garniture = self.decItemArray[self.useIndex].id;
                } else if (self.decItemArray[self.useIndex].categoryID == 10) { // tool

                }
                self.closeUsePrompt();
                // 未处理返回值，
            }
        });
    },
    /**
     * 初始化装饰品背包信息
     * @param {object} _data 服务器请求数据经过json转换后的对象
     */
    initDecBag: function (_data) {
        if (_data) {
            console.log(_data);
            let itemIDArray = _data.itemIDArray.split('+');
            let itemNameArray = _data.itemNameArray.split('+');
            let categoryIDArray = _data.categoryIDArray.split('+');
            let categoryNameArray = _data.categoryNameArray.split('+');
            let priceArray = _data.priceArray.split('+');
            let isOwnArray = _data.ownFlagArray.split('+');
            for (let index = 0; index < itemIDArray.length; index++) {
                let item = new DecItem(itemIDArray[index], itemNameArray[index], categoryIDArray[index], categoryNameArray[index], priceArray[index], isOwnArray[index]);
                if (item.categoryID > 2) {
                    this.decItemArray.push(item);
                }

            }
        }
    },

    initHome: function () {
        var url = "https://www.llquruc.top/petGame/" + "php/queryDecBag.php"; //服务器接口地址
        // 调用自定义网路接口获取商品信息
        var self = this;
        var data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1"
        };
        HttpHelper.httpPost(url, data, function (data) {
            if (data != -1) {
                console.log(data);
                let itemIDArray = data.itemIDArray.split('+');
                let categoryIDArray = data.categoryIDArray.split('+');
                let flagEnableArray = data.flagEnableArray.split('+');

                for (let i = 0; i < flagEnableArray.length; i++) {
                    if (flagEnableArray[i] == 1) { // 正在使用
                        if (categoryIDArray[i] == 3) { // sofa
                            self.sofa = itemIDArray[i];
                        } else if (categoryIDArray[i] == 4) { // table
                            self.table = itemIDArray[i];
                        } else if (categoryIDArray[i] == 5) { // wall
                            self.wall = itemIDArray[i];
                        } else if (categoryIDArray[i] == 6) { // floor
                            self.floor = itemIDArray[i];
                        } else if (categoryIDArray[i] == 7) { // carpet
                            self.carpet = itemIDArray[i];
                        } else if (categoryIDArray[i] == 8) { // curtain
                            self.curtain = itemIDArray[i];
                        } else if (categoryIDArray[i] == 9) { // garniture
                            self.garniture = itemIDArray[i];
                        } else if (categoryIDArray[i] == 10) { // tool

                        }
                    }
                }

            }
        });
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let self = this;
        self.sofa = 0;
        self.table = 0;
        self.wall = 0;
        self.floor = 0;
        self.carpet = 0;
        self.curtain = 0;
        self.garniture = 0;
        var url = "https://www.llquruc.top/petGame/" + "php/queryShop.php"; //服务器接口地址
        // 调用自定义网路接口获取商品信息
        var data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1"
        };
        HttpHelper.httpPost(url, data, function (data) {
            if (data != -1) {
                self.initDecBag(data);
                self.initHome();
            }
        });
    },

    start() {

    },

    // update (dt) {},
});
