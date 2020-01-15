(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/house/js/house.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4fcf8Wv8cNHR52LzbWwUNzg', 'house', __filename);
// house/js/house.js

"use strict";

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
            get: function get() {
                return this._sofa;
            },
            set: function set(value) {
                if (value == 0) {
                    this.sofaPic.node.active = false;
                    this.sofaBtn.node.active = true;
                } else {
                    this.sofaPic.node.active = true;
                    this.sofaBtn.node.active = false;
                    if (value != this._sofa) {
                        console.log('user change sofa');
                        var picPath = "shopPic/cate3/" + value;
                        var self = this;
                        cc.loader.loadRes(picPath, cc.SpriteFrame, function (err, sp) {
                            if (err) {
                                console.log("house.js " + err);
                            }
                            self.sofaPic.spriteFrame = sp;
                        });
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
            get: function get() {
                return this._table;
            },
            set: function set(value) {
                if (value == 0) {
                    this.tablePic.node.active = false;
                    this.tableBtn.node.active = true;
                } else {
                    this.tablePic.node.active = true;
                    this.tableBtn.node.active = false;
                    if (value != this._table) {
                        console.log('user change table');
                        var picPath = "shopPic/cate4/" + value;
                        var self = this;
                        cc.loader.loadRes(picPath, cc.SpriteFrame, function (err, sp) {
                            if (err) {
                                console.log("house.js " + err);
                            }
                            self.tablePic.spriteFrame = sp;
                        });
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
            get: function get() {
                return this._wall;
            },
            set: function set(value) {
                if (value == 0) {
                    this.wallPic.node.active = false;
                    this.wallBtn.node.active = true;
                } else {
                    this.wallPic.node.active = true;
                    this.wallBtn.node.active = false;
                    if (value != this._wall) {
                        console.log('user change wall');
                        var picPath = "shopPic/cate5/" + value + "-cover";
                        var self = this;
                        cc.loader.loadRes(picPath, cc.SpriteFrame, function (err, sp) {
                            if (err) {
                                console.log("house.js " + err);
                            }
                            self.wallPic.spriteFrame = sp;
                        });
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
            get: function get() {
                return this._floor;
            },
            set: function set(value) {
                if (value == 0) {
                    this.floorPic.node.active = false;
                    this.floorBtn.node.active = true;
                } else {
                    this.floorPic.node.active = true;
                    this.floorBtn.node.active = false;
                    if (value != this._floor) {
                        console.log('user change floor');
                        var picPath = "shopPic/cate6/" + value + "-cover";
                        var self = this;
                        cc.loader.loadRes(picPath, cc.SpriteFrame, function (err, sp) {
                            if (err) {
                                console.log("house.js " + err);
                            }
                            self.floorPic.spriteFrame = sp;
                        });
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
            get: function get() {
                return this._carpet;
            },
            set: function set(value) {
                if (value == 0) {
                    this.carpetPic.node.active = false;
                    this.carpetBtn.node.active = true;
                } else {
                    this.carpetPic.node.active = true;
                    this.carpetBtn.node.active = false;
                    if (value != this._carpet) {
                        console.log('user change carpet');
                        var picPath = "shopPic/cate7/" + value;
                        var self = this;
                        cc.loader.loadRes(picPath, cc.SpriteFrame, function (err, sp) {
                            if (err) {
                                console.log("house.js " + err);
                            }
                            self.carpetPic.spriteFrame = sp;
                        });
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
            get: function get() {
                return this._curtain;
            },
            set: function set(value) {
                if (value == 0) {
                    this.curtainPic.node.active = false;
                    this.curtainBtn.node.active = true;
                } else {
                    this.curtainPic.node.active = true;
                    this.curtainBtn.node.active = false;
                    if (value != this._curtain) {
                        console.log('user change curtain');
                        var picPath = "shopPic/cate8/" + value;
                        var self = this;
                        cc.loader.loadRes(picPath, cc.SpriteFrame, function (err, sp) {
                            if (err) {
                                console.log("house.js " + err);
                            }
                            self.curtainPic.spriteFrame = sp;
                        });
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
            get: function get() {
                return this._garniture;
            },
            set: function set(value) {
                if (value == 0) {
                    this.garniturePic.node.active = false;
                    this.garnitureBtn.node.active = true;
                } else {
                    this.garniturePic.node.active = true;
                    this.garnitureBtn.node.active = false;
                    if (value != this._garniture) {
                        console.log('user change garniture');
                        var picPath = "shopPic/cate9/" + value;
                        var self = this;
                        cc.loader.loadRes(picPath, cc.SpriteFrame, function (err, sp) {
                            if (err) {
                                console.log("house.js " + err);
                            }
                            self.garniturePic.spriteFrame = sp;
                        });
                    }
                }
                this._garniture = value;
            }
        },

        choosePrompt: cc.Node,
        choosePromptShowStatus: {
            // 根据装饰品的categoryID修改状态值，0表示不显示选择提示框
            get: function get() {
                return this._choosePromptShowStatus;
            },
            set: function set(value) {
                var _this = this;

                var choiceNodeArray = this.choosePrompt.getChildByName('Layout').children;
                if (value == 0) {
                    this.choosePrompt.active = false;
                } else if (value == 10) {// tool
                } else {
                    this.choosePrompt.active = true;

                    var _loop = function _loop(i) {
                        var element = choiceNodeArray[i].getComponent(cc.Sprite);
                        var picPath = "shopPic/cate" + value + "/";
                        var index = _this.findItem(i + 1, value);
                        var self = _this;
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
                        cc.loader.loadRes(picPath, cc.SpriteFrame, function (err, sp) {
                            if (err) {
                                console.log("house.js " + err);
                            }
                            element.spriteFrame = sp;
                        });
                    };

                    for (var i = 0; i < choiceNodeArray.length; i++) {
                        _loop(i);
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
        picAddrArray: []
    },

    viewWorkAlbum: function viewWorkAlbum() {
        // 首先清除缓存图片
        for (var i = 0; i < this.picAddrArray.length; i++) {
            var _element = this.picAddrArray[i];
            cc.loader.releaseRes(_element, cc.SpriteFrame);
        }
        var date = new Date();
        var year = date.getFullYear(); //获取当前年份   
        var month = date.getMonth() + 1; //获取当前月份   
        var dat = date.getDate(); //获取当前日    
        var hour = date.getHours(); //获取小时   
        var minute = date.getMinutes(); //获取分钟   
        var second = date.getSeconds(); //获取秒   
        var timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var self = this;
        var data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
            "operationTime": timeStr,
            "workORtrip": 1,
            "details": "user"
        };
        var serverAddr = 'https://www.llquruc.top/petGame/php/queryAlbum.php';
        HttpHelper.httpPost(serverAddr, data, function (_data) {
            if (_data != -1) {
                console.log(_data);
                var picAddrArray = _data.picAddrArray.split('+');
                console.log(picAddrArray);

                var _loop2 = function _loop2(_i) {
                    var element = picAddrArray[_i];
                    picAddrArray[_i] = element.replace(/.png/, '');
                    picAddrArray[_i] = picAddrArray[_i].replace(/resources\//, '');
                    console.log(picAddrArray[_i]);

                    self.listContainer.destroyAllChildren();
                    var newListNode = new cc.Node('list');
                    var newSp = newListNode.addComponent(cc.Sprite);
                    cc.loader.loadRes(picAddrArray[_i], cc.SpriteFrame, function (err, sp) {
                        if (err) {
                            console.log("house.js " + err);
                        }
                        newSp.spriteFrame = sp;
                        newListNode.width = 175;
                        newListNode.height = 140;
                        self.listContainer.addChild(newListNode);
                    });

                    newListNode.on(cc.Node.EventType.TOUCH_START, function () {}, self);
                };

                for (var _i = 0; _i < picAddrArray.length; _i++) {
                    _loop2(_i);
                }
                self.picAddrArray = picAddrArray;
                self.album.active = true;
            }
        });
    },

    viewTripAlbum: function viewTripAlbum() {
        // 首先清除缓存图片
        for (var i = 0; i < this.picAddrArray.length; i++) {
            var _element2 = this.picAddrArray[i];
            cc.loader.releaseRes(_element2, cc.SpriteFrame);
        }

        var date = new Date();
        var year = date.getFullYear(); //获取当前年份   
        var month = date.getMonth() + 1; //获取当前月份   
        var dat = date.getDate(); //获取当前日    
        var hour = date.getHours(); //获取小时   
        var minute = date.getMinutes(); //获取分钟   
        var second = date.getSeconds(); //获取秒   
        var timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var self = this;
        var data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
            "operationTime": timeStr,
            "workORtrip": 2,
            "details": "user"
        };
        var serverAddr = 'https://www.llquruc.top/petGame/php/queryAlbum.php';
        HttpHelper.httpPost(serverAddr, data, function (_data) {
            if (_data != -1) {
                console.log(_data);
                var picAddrArray = _data.picAddrArray.split('+');
                console.log(picAddrArray);

                var _loop3 = function _loop3(_i2) {
                    var element = picAddrArray[_i2];
                    picAddrArray[_i2] = element.replace(/.png/, '');
                    picAddrArray[_i2] = picAddrArray[_i2].replace(/resources\//, '');
                    console.log(picAddrArray[_i2]);

                    self.listContainer.destroyAllChildren();
                    var newListNode = new cc.Node('list');
                    var newSp = newListNode.addComponent(cc.Sprite);
                    newListNode.on(cc.Node.EventType.TOUCH_START, function () {}, self);
                    cc.loader.loadRes(picAddrArray[_i2], cc.SpriteFrame, function (err, sp) {
                        if (err) {
                            console.log("house.js " + err);
                        }
                        newSp.spriteFrame = sp;
                        newListNode.width = 175;
                        newListNode.height = 140;
                        self.listContainer.addChild(newListNode);
                    });
                };

                for (var _i2 = 0; _i2 < picAddrArray.length; _i2++) {
                    _loop3(_i2);
                }
                self.picAddrArray = picAddrArray;
                self.album.active = true;
            }
        });
    },

    onClickAlbum: function onClickAlbum() {
        this.viewWorkAlbum();
    },
    onClickCloseAlbum: function onClickCloseAlbum() {
        // 首先清除缓存图片
        for (var i = 0; i < this.picAddrArray.length; i++) {
            var _element3 = this.picAddrArray[i];
            cc.loader.releaseRes(_element3, cc.SpriteFrame);
        }
        this.picAddrArray = [];
        this.listContainer.destroyAllChildren();
        this.album.active = false;
    },

    onClickSofa: function onClickSofa() {
        this.choosePromptShowStatus = 3; // 3表示选择提示框显示沙发 sofa的categoryID是3
    },
    onClickTable: function onClickTable() {
        this.choosePromptShowStatus = 4; // 5表示选择提示框显示桌子 table的categoryID是4
    },
    onClickWall: function onClickWall() {
        this.choosePromptShowStatus = 5; // 5表示选择提示框显示墙纸 wall的categoryID是5
    },
    onClickFloor: function onClickFloor() {
        this.choosePromptShowStatus = 6; // 5表示选择提示框显示地板 floor的categoryID是6
    },
    onClickCarpet: function onClickCarpet() {
        this.choosePromptShowStatus = 7; // 5表示选择提示框显示地毯 carpet的categoryID是7
    },
    onClickCurtain: function onClickCurtain() {
        this.choosePromptShowStatus = 8; // 5表示选择提示框显示窗帘 curtain的categoryID是8
    },
    onClickDecoration: function onClickDecoration() {
        this.choosePromptShowStatus = 9; // 5表示选择提示框显示装饰品 decoration的categoryID是9
    },

    findItem: function findItem(itemID, categoryID) {
        for (var i = 0; i < this.decItemArray.length; i++) {
            var _element4 = this.decItemArray[i];

            if (_element4._isOwn == 1) {
                console.log(_element4, itemID, categoryID);
            }
            if (_element4.id == itemID && _element4.categoryID == categoryID) {
                return i;
            }
        }
    },
    onClickChoosePromptClose: function onClickChoosePromptClose() {
        this.closeBuyPrompt();
        this.closeUsePrompt();
        this.choosePromptShowStatus = 0;
    },
    openBuyPrompt: function openBuyPrompt(index) {
        var self = this;
        self.buyIndex = index;
        self.buyPromptPrice.string = self.decItemArray[index].price;
        var path = "shopPic/cate" + self.decItemArray[self.buyIndex].categoryID + "/" + self.decItemArray[self.buyIndex].id;
        cc.loader.loadRes(path, cc.SpriteFrame, function (err, sp) {
            if (err) {
                console.log("house.js " + err);
            }
            self.buyPromptItemPic.spriteFrame = sp;
            self.buyPrompt.active = true;
        });
    },
    closeBuyPrompt: function closeBuyPrompt() {
        var self = this;
        self.buyPrompt.active = false;
    },
    onClickBuyPromptClose: function onClickBuyPromptClose() {
        this.closeBuyPrompt();
    },
    onClickBuyComfirm: function onClickBuyComfirm() {
        var date = new Date();
        var year = date.getFullYear(); //获取当前年份   
        var month = date.getMonth() + 1; //获取当前月份   
        var dat = date.getDate(); //获取当前日    
        var hour = date.getHours(); //获取小时   
        var minute = date.getMinutes(); //获取分钟   
        var second = date.getSeconds(); //获取秒   
        var timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var self = this;
        var data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
            "operationTime": timeStr,
            "categoryID": self.decItemArray[self.buyIndex].categoryID,
            "itemID": self.decItemArray[self.buyIndex].id,
            "number": 1
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

    openUsePrompt: function openUsePrompt(index) {
        var self = this;
        self.usePrompt.active = true;
        self.useIndex = index;
    },
    closeUsePrompt: function closeUsePrompt() {
        var self = this;
        self.usePrompt.active = false;
    },
    onClickUsePromptClose: function onClickUsePromptClose() {
        this.closeUsePrompt();
    },
    onClickUseComfirm: function onClickUseComfirm() {
        var date = new Date();
        var year = date.getFullYear(); //获取当前年份   
        var month = date.getMonth() + 1; //获取当前月份   
        var dat = date.getDate(); //获取当前日    
        var hour = date.getHours(); //获取小时   
        var minute = date.getMinutes(); //获取分钟   
        var second = date.getSeconds(); //获取秒   
        var timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
        var self = this;
        var data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1",
            "operationTime": timeStr,
            "categoryID": self.decItemArray[self.buyIndex].categoryID,
            "itemID": self.decItemArray[self.buyIndex].id,
            "details": ""
        };
        var serverAddr = 'https://www.llquruc.top/petGame/php/decorate.php';
        HttpHelper.httpPost(serverAddr, data, function (_data) {
            if (_data != -1) {
                console.log("success!");
                if (self.decItemArray[self.useIndex].categoryID == 3) {
                    // sofa
                    self.sofa = self.decItemArray[self.useIndex].id;
                } else if (self.decItemArray[self.useIndex].categoryID == 4) {
                    // table
                    self.table = self.decItemArray[self.useIndex].id;
                } else if (self.decItemArray[self.useIndex].categoryID == 5) {
                    // wall
                    self.wall = self.decItemArray[self.useIndex].id;
                } else if (self.decItemArray[self.useIndex].categoryID == 6) {
                    // floor
                    self.floor = self.decItemArray[self.useIndex].id;
                } else if (self.decItemArray[self.useIndex].categoryID == 7) {
                    // carpet
                    self.carpet = self.decItemArray[self.useIndex].id;
                } else if (self.decItemArray[self.useIndex].categoryID == 8) {
                    // curtain
                    self.curtain = self.decItemArray[self.useIndex].id;
                } else if (self.decItemArray[self.useIndex].categoryID == 9) {
                    // garniture
                    self.garniture = self.decItemArray[self.useIndex].id;
                } else if (self.decItemArray[self.useIndex].categoryID == 10) {// tool

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
    initDecBag: function initDecBag(_data) {
        if (_data) {
            console.log(_data);
            var itemIDArray = _data.itemIDArray.split('+');
            var itemNameArray = _data.itemNameArray.split('+');
            var categoryIDArray = _data.categoryIDArray.split('+');
            var categoryNameArray = _data.categoryNameArray.split('+');
            var priceArray = _data.priceArray.split('+');
            var isOwnArray = _data.ownFlagArray.split('+');
            for (var _index = 0; _index < itemIDArray.length; _index++) {
                var item = new DecItem(itemIDArray[_index], itemNameArray[_index], categoryIDArray[_index], categoryNameArray[_index], priceArray[_index], isOwnArray[_index]);
                if (item.categoryID > 2) {
                    this.decItemArray.push(item);
                }
            }
        }
    },

    initHome: function initHome() {
        var url = "https://www.llquruc.top/petGame/" + "php/queryDecBag.php"; //服务器接口地址
        // 调用自定义网路接口获取商品信息
        var self = this;
        var data = {
            "userID": "nqEsLYOCtdRUkx4Ovn8bhDUmnBHB3DdEncp0z7ApU1"
        };
        HttpHelper.httpPost(url, data, function (data) {
            if (data != -1) {
                console.log(data);
                var itemIDArray = data.itemIDArray.split('+');
                var categoryIDArray = data.categoryIDArray.split('+');
                var flagEnableArray = data.flagEnableArray.split('+');

                for (var i = 0; i < flagEnableArray.length; i++) {
                    if (flagEnableArray[i] == 1) {
                        // 正在使用
                        if (categoryIDArray[i] == 3) {
                            // sofa
                            self.sofa = itemIDArray[i];
                        } else if (categoryIDArray[i] == 4) {
                            // table
                            self.table = itemIDArray[i];
                        } else if (categoryIDArray[i] == 5) {
                            // wall
                            self.wall = itemIDArray[i];
                        } else if (categoryIDArray[i] == 6) {
                            // floor
                            self.floor = itemIDArray[i];
                        } else if (categoryIDArray[i] == 7) {
                            // carpet
                            self.carpet = itemIDArray[i];
                        } else if (categoryIDArray[i] == 8) {
                            // curtain
                            self.curtain = itemIDArray[i];
                        } else if (categoryIDArray[i] == 9) {
                            // garniture
                            self.garniture = itemIDArray[i];
                        } else if (categoryIDArray[i] == 10) {// tool

                        }
                    }
                }
            }
        });
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var self = this;
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
        //# sourceMappingURL=house.js.map
        