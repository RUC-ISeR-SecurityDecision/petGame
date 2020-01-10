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
        type: {
            get() {
                return this._type;
            },
            set(value) {
                if (value == 0) { // 旅游
                    this.title.string = "您的宠物旅游回来啦，还带回来了...";
                    this.picPath = "tripPic/";
                    this.QAPath = "tripQA/";
                } else if (value == 1) { // 打工
                    this.title.string = "您的宠物打工回来啦，还带回来了...";
                    this.picPath = "workPic/";
                    this.QAPath = "workQA/";
                } else {
                    console.log("wrong type error: questionPrompt.js type.set()");
                }
                this._type = value;
            }
        },
        title: cc.Label,
        picture: cc.Sprite,
        info: cc.Label,
        question: cc.Label,
        choiceContainer: cc.ToggleContainer,
        choice1: cc.Label,
        choice2: cc.Label,
        choice3: cc.Label,
        confirmBtn: cc.Button,
        picPath: null,
        QAPath: null,
        wrongPrompt: cc.Node,
        correctPrompt: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.confirmBtn.node.on('click', this.onClickConfirmBtn, this);
        this.wrongPrompt.getChildByName('closeButton').on('click', this.onClickCloseBtn, this.wrongPrompt);
        this.correctPrompt.getChildByName('closeButton').on('click', this.onClickCloseBtn, this.correctPrompt);
    },
    /**
     * 答题提示框初始化
     * @param {integer} type 0,1 分别代表旅游或者工作
     * @param {integer} id 代表旅游地点或者工作种类
     */
    init: function (type, id) {
        this.type = type;
        this.picPath += '3/1';
        this.QAPath += '3/1/1';
        let self = this;
        cc.loader.loadRes(self.picPath, cc.SpriteFrame, (err, sp) => {
            if (err) {
                console.log("failed to load picture");
            }
            self.picture.spriteFrame = sp;
        });
        cc.loader.loadRes(self.QAPath, cc.JsonAsset, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data.json);
                let rsp = JSON.parse(data.json);
                self.question.string = rsp.question;
                let choiceArray = rsp.answer.split('+');
                self.choice1.string = choiceArray[0];
                self.choice2.string = choiceArray[1];
                self.choice3.string = choiceArray[2];
            }
        });
    },

    onClickConfirmBtn: function () {
        let choiceArray = this.choiceContainer.getComponentsInChildren(cc.Toggle);
        for (let i = 0; i < choiceArray.length; i++) {
            const element = choiceArray[i];
            if (element.isChecked) {
                if (i == 0) { // 判断是否是正确答案，答案选项尚未随机
                    this.title.node.parent.active = false; // 关闭提示框
                    this.correctPrompt.active = true;
                } else {
                    this.title.node.parent.active = false; // 关闭提示框
                    this.wrongPrompt.active = true;
                    let correctAnswer = this.choice1.string;
                    this.wrongPrompt.getChildByName('promptText').getComponent(cc.Label).string += correctAnswer;
                }
            }
        }
    },

    onClickCloseBtn: function () {
        this.active = false;
    },

    start() {

    },

    // update (dt) {},
});