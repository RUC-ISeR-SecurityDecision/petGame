"use strict";
cc._RF.push(module, '27dcalXpnxJ66dT1nU/AwGd', 'petPortray');
// adopt/petPortray/JS/petPortray.js

'use strict';

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var globalData = require('globalData');

cc.Class({
    extends: cc.Component,

    properties: {
        speciesBtn: cc.Button, // 切换至物种选择页面
        skinBtn: cc.Button, // 切换至毛色选择页面
        genderBtn: cc.Button, // 切换至性别选择页面
        nameBtn: cc.Button, // 切换至命名页面

        portray: cc.PageView, // 整个页面
        title: cc.Label, // 可改变页面标题
        curPage: 0,

        speciesPage: cc.ScrollView, // 物种选择页面
        genderPage: cc.ToggleContainer, // 性别选择页面
        skinPage: cc.ToggleContainer, // 毛色选择页面
        namePage: cc.Sprite, // 命名页面
        _isNamePageShow: false // 是否显示命名页面

    },

    // 监听button点击事件
    onSpeciesBtnClicked: function onSpeciesBtnClicked() {
        console.log('change to species view');
        this.portray.setCurrentPageIndex(0);
        this.portray.scrollToPage(0);
        this.changeTitle(0);
    },

    onGenderBtnClicked: function onGenderBtnClicked() {
        console.log('change to gender view');
        this.portray.setCurrentPageIndex(1);
        this.portray.scrollToPage(1);
        this.changeTitle(1);
    },

    onSkinBtnClicked: function onSkinBtnClicked() {
        console.log('change to skin view');
        this.portray.setCurrentPageIndex(2);
        this.portray.scrollToPage(2);
        this.changeTitle(2);
    },

    onNameBtnClicked: function onNameBtnClicked() {
        console.log('change to name view');
        this.showNamePage();
    },

    // 改变标题颜色及内容
    changeTitle: function changeTitle(value) {
        if (value == 0) {
            this.title.string = "宠物种类";
        } else if (value == 1) {
            this.title.string = "宠物性别";
        } else if (value == 2) {
            this.title.string = "宠物毛色";
        } else {
            console.log("petPortray/function:changeTile wrong parameter");
            return RangeError;
        }
        var pageNode = this.portray.content.children;
        console.log(pageNode[value].color);
        this.title.node.color = pageNode[value].color;
    },
    // 改变用户物种选择
    changeSpecies: function changeSpecies(value) {
        var _this = this;

        if (value > 3 || value < 0) {
            console.log("species value error");
            return RangeError;
        }
        globalData.species = value;
        console.log(globalData);
        // this.species = value;

        // 修改skin页面的物种精灵
        var sprite = this.portray.content.children[2].getChildByName("pickedPet").getComponent(cc.Sprite);
        console.log(sprite);
        if (value == 0) {
            console.log("user choose owl");
            cc.loader.loadRes("owl-simple", cc.SpriteFrame, function (err, sp) {
                console.log(err);
                if (err) return;
                if (_this.node) {
                    console.log("success" + sp);
                    if (sprite) {
                        sprite.spriteFrame = sp;
                    }
                }
            });
        } else if (value == 1) {
            console.log("user choose penguin");
            cc.loader.loadRes("penguin-simple", cc.SpriteFrame, function (err, sp) {
                console.log(err);
                if (err) return;
                if (_this.node) {
                    console.log("success");
                    if (sprite) {
                        sprite.spriteFrame = sp;
                    }
                }
            });
        } else if (value == 2) {
            console.log("user choose cat");
            cc.loader.loadRes("cat-simple", cc.SpriteFrame, function (err, sp) {
                console.log(err);
                if (err) return;
                if (_this.node) {
                    console.log("success");
                    if (sprite) {
                        sprite.spriteFrame = sp;
                    }
                }
            });
        } else if (value == 3) {
            console.log("user choose dog");
            cc.loader.loadRes("dog-simple", cc.SpriteFrame, function (err, sp) {
                console.log(err);
                if (err) return;
                if (_this.node) {
                    console.log("success");
                    if (sprite) {
                        sprite.spriteFrame = sp;
                    }
                }
            });
        }
    },
    // 监听物种选择页面的滚动事件，判断用户物种选择
    onScrollingEvent: function onScrollingEvent() {
        // console.log(this.speciesPage.getScrollOffset(), this.items[this.species]);
        for (var i = 0; i < this.items.length; i++) {
            var element = this.items[i];
            var worldPos = element.parent.convertToWorldSpaceAR(element.position);
            var viewPos = this.content.parent.convertToNodeSpaceAR(worldPos);
            // console.log(element.name, this.content.getParent().name)
            // console.log(worldPos, viewPos, this.speciesPage.node.convertToWorldSpaceAR(this.content.getParent().position));

            if (viewPos.y < element.height / 2 && viewPos.y >= -element.height / 2) {
                // scroll滑动到相应的宠物种类时，进行处理
                if (globalData.species != i) {
                    // 判断滑动是否使种类发生改变，发生改变进行以下处理
                    this.items[globalData.species].scale = 0.8;
                    this.changeSpecies(i);
                    this.items[globalData.species].scale = 1.25;
                }
            }
        }

        // console.log(this.content.height,this.speciesPage.getContentPosition());
    },
    // 监听性别选择页面的复选框事件
    onGenderToggleEvent: function onGenderToggleEvent() {
        var toggleArry = this.genderPage.getComponentsInChildren(cc.Toggle);
        for (var i = 0; i < toggleArry.length; i++) {
            var element = toggleArry[i];
            if (element.isChecked) {
                globalData.gender = i;
                if (globalData.gender == 0) {
                    console.log("user choose boy pet");
                } else {
                    console.log("user choose girl pet");
                }
            }
        }
    },
    // 监听毛色选择页面的复选框事件
    onSkinToggleEvent: function onSkinToggleEvent() {
        var toggleArry = this.skinPage.getComponentsInChildren(cc.Toggle);
        for (var i = 0; i < toggleArry.length; i++) {
            var element = toggleArry[i];
            if (element.isChecked) {
                globalData.skin = i;
                console.log("user choose skin" + (i + 1));
            }
        }
    },
    // 监听输入事件
    // textChanged 事件的回调函数的参数模型
    // onTextChanged: function(text, editbox, customEventData) {
    //     // 这里的 text 表示 修改完后的 EditBox 的文本内容
    //     // 这里 editbox 是一个 cc.EditBox 对象
    //     // 这里的 customEventData 参数就等于你之前设置的 "foobar"
    // }
    onInputEvent: function onInputEvent(text, editbox, customEventData) {
        console.log(editbox);
        if (editbox.node.name == 'petNameInput') {
            globalData.petName = text;
            console.log("user set pet name", globalData.petName);
        } else if (editbox.node.name == 'masterNameInput') {
            globalData.masterName = text;
            console.log("user set master name", globalData.masterName);
        }
    },
    onCompleteClicked: function onCompleteClicked() {
        console.log('turn to main page');
        cc.director.loadScene("mainPage");
    },
    // 显示命名页面
    showNamePage: function showNamePage() {
        this._isNamePageShow = !this._isNamePageShow;
        var action = null;
        if (this._isNamePageShow) {
            action = cc.moveBy(0.5, cc.v2(0, -800));
        } else {
            action = cc.moveBy(0.5, cc.v2(0, 800));
        }
        // console.log(this.namePage.node);
        this.namePage.node.runAction(action);
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.content = this.speciesPage.content;
        this.items = this.content.children; // content的四个子节点，四个宠物选项node

        // ------- 初始化宠物选项 -------       
        // 宠物种类
        this.changeSpecies(0);
        this.items[globalData.species].scale = 1.25;
        this.changeTitle(0);

        this._isNamePageShow = false;
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();