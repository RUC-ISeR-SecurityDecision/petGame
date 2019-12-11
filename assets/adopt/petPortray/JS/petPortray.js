// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var GlobalData = require('globalData');

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
        _isNamePageShow: false, // 是否显示命名页面

        boyPetImage: cc.Sprite, // 性别选择页面男宠物形象
        girlPetImage: cc.Sprite, // 性别选择页面女宠物形象

        petColor1Image: cc.Sprite, // 毛色选择页面的选项1图片 
        petColor2Image: cc.Sprite, // 毛色选择页面的选项2图片
        petColor3Image: cc.Sprite, // 毛色选择页面的选项3图片
        
    },

    // 监听button点击事件
    onSpeciesBtnClicked: function() {
        console.log('change to species view');
        this.portray.setCurrentPageIndex(0);
        this.portray.scrollToPage(0);
        this.changeTitle(0);
    },

    onGenderBtnClicked: function() {
        console.log('change to gender view');
        this.portray.setCurrentPageIndex(1);
        this.portray.scrollToPage(1);
        this.changeTitle(1);
    },

    onSkinBtnClicked: function() {
        console.log('change to skin view');
        this.portray.setCurrentPageIndex(2);
        this.portray.scrollToPage(2);
        this.changeTitle(2);
    },

    onNameBtnClicked: function() {
        console.log('change to name view');
        this.showNamePage();
    },

    // 改变标题颜色及内容
    changeTitle: function(value){
        if (value == 0) {
            this.title.string = "宠物种类";
        } else if (value == 1) {
            this.title.string = "宠物性别";
        } else if (value == 2) {
            this.title.string = "宠物毛色";
        } else {
            console.log("petPortray/function:changeTile wrong parameter");
            return RangeError
        }
        let pageNode = this.portray.content.children;
        console.log(pageNode[value].color);
        this.title.node.color = pageNode[value].color;
    },
    /**
     * 用户做出物种和性别选择时需要更新性别页面和毛色页面的形象
     * @param choiceType 玩家在领养界面做出的选择类型
     */
    changeImage: function(choiceType) {
        if (!choiceType) {
            console.log("petPortray.js error: changeImage() has incorrect param!");
            return RangeError;
        } 
        let boyPetImagePath = "pet/male_" ;
        let girlPetImagePath = "pet/female_" ;
        let petColor1ImagePath = GlobalData.gender == 0 ? "pet/male_" : "pet/female_"; 
        let petColor2ImagePath = GlobalData.gender == 0 ? "pet/male_" : "pet/female_";
        let petColor3ImagePath = GlobalData.gender == 0 ? "pet/male_" : "pet/female_";
        let self = this;
        if (GlobalData.species == 0) {
            boyPetImagePath += 'owl';
            girlPetImagePath += 'owl';
            petColor1ImagePath += 'owl'; 
            petColor2ImagePath += 'owl';
            petColor3ImagePath += 'owl';
        } else if (GlobalData.species == 1) {
            boyPetImagePath += 'penguins';
            girlPetImagePath += 'penguins';
            petColor1ImagePath += 'penguins'; 
            petColor2ImagePath += 'penguins';
            petColor3ImagePath += 'penguins';
        } else if (GlobalData.species == 2) {
            boyPetImagePath += 'cat';
            girlPetImagePath += 'cat';
            petColor1ImagePath += 'cat'; 
            petColor2ImagePath += 'cat';
            petColor3ImagePath += 'cat';
        } else if (GlobalData.species == 3) {
            boyPetImagePath += 'dog';
            girlPetImagePath += 'dog';
            petColor1ImagePath += 'dog'; 
            petColor2ImagePath += 'dog';
            petColor3ImagePath += 'dog';
        }
        boyPetImagePath += (GlobalData.color + 1) + '';
        girlPetImagePath += (GlobalData.color + 1) + '';
        petColor1ImagePath += 1; 
        petColor2ImagePath += 2;
        petColor3ImagePath += 3; 
        if (choiceType == 'species') {
            cc.loader.loadRes(boyPetImagePath, cc.SpriteFrame, (err, sp) => {
                console.log(err);
                if (err) return;
                if (this.node) {
                    console.log("success");
                    if(self.boyPetImage){
                        self.boyPetImage.spriteFrame = sp;
                    }
                }
            })
            cc.loader.loadRes(girlPetImagePath, cc.SpriteFrame, (err, sp) => {
                console.log(err);
                if (err) return;
                if (this.node) {
                    console.log("success");
                    if(self.girlPetImage){
                        self.girlPetImage.spriteFrame = sp;
                    }
                }
            })
            cc.loader.loadRes(petColor1ImagePath, cc.SpriteFrame, (err, sp) => {
                console.log(err);
                if (err) return;
                if (this.node) {
                    console.log("success");
                    if(self.petColor1Image){
                        self.petColor1Image.spriteFrame = sp;
                    }
                }
            })
            cc.loader.loadRes(petColor2ImagePath, cc.SpriteFrame, (err, sp) => {
                console.log(err);
                if (err) return;
                if (this.node) {
                    console.log("success");
                    if(self.petColor2Image){
                        self.petColor2Image.spriteFrame = sp;
                    }
                }
            })
            cc.loader.loadRes(petColor3ImagePath, cc.SpriteFrame, (err, sp) => {
                console.log(err);
                if (err) return;
                if (this.node) {
                    console.log("success");
                    if(self.petColor3Image){
                        self.petColor3Image.spriteFrame = sp;
                    }
                }
            })
        } else if (choiceType == 'gender') {
            cc.loader.loadRes(petColor1ImagePath, cc.SpriteFrame, (err, sp) => {
                console.log(err);
                if (err) return;
                if (this.node) {
                    console.log("success");
                    if(self.petColor1Image){
                        self.petColor1Image.spriteFrame = sp;
                    }
                }
            })
            cc.loader.loadRes(petColor2ImagePath, cc.SpriteFrame, (err, sp) => {
                console.log(err);
                if (err) return;
                if (this.node) {
                    console.log("success");
                    if(self.petColor2Image){
                        self.petColor2Image.spriteFrame = sp;
                    }
                }
            })
            cc.loader.loadRes(petColor3ImagePath, cc.SpriteFrame, (err, sp) => {
                console.log(err);
                if (err) return;
                if (this.node) {
                    console.log("success");
                    if(self.petColor3Image){
                        self.petColor3Image.spriteFrame = sp;
                    }
                }
            })
        } else if (choiceType == 'skin') {
            cc.loader.loadRes(boyPetImagePath, cc.SpriteFrame, (err, sp) => {
                console.log(err);
                if (err) return;
                if (this.node) {
                    console.log("success");
                    if(self.boyPetImage){
                        self.boyPetImage.spriteFrame = sp;
                    }
                }
            })
            cc.loader.loadRes(girlPetImagePath, cc.SpriteFrame, (err, sp) => {
                console.log(err);
                if (err) return;
                if (this.node) {
                    console.log("success");
                    if(self.girlPetImage){
                        self.girlPetImage.spriteFrame = sp;
                    }
                }
            })
        }        
    },
    // 监听物种选择页面的滚动事件，判断用户物种选择
    onScrollingEvent: function(){
        // console.log(this.speciesPage.getScrollOffset(), this.items[this.species]);
        for (let i = 0; i < this.items.length; i++) {
            const element = this.items[i];
            let worldPos = element.parent.convertToWorldSpaceAR(element.position);
            let viewPos = this.content.parent.convertToNodeSpaceAR(worldPos);
            // console.log(element.name, this.content.getParent().name)
            // console.log(worldPos, viewPos, this.speciesPage.node.convertToWorldSpaceAR(this.content.getParent().position));
            
            if (viewPos.y < element.height/2 && viewPos.y >= -element.height/2) {
                // scroll滑动到相应的宠物种类时，进行处理
                if (GlobalData.species != i) {
                    // 判断滑动是否使种类发生改变，发生改变进行以下处理
                    console.log("choose " + element.name)
                    this.items[GlobalData.species].scale = 0.8;
                    GlobalData.species = i;
                    this.items[GlobalData.species].scale = 1.25; 
                    this.changeImage('species');
                }     
            } 
              
        }
        // console.log(this.content.height,this.speciesPage.getContentPosition());
    },
    // 监听性别选择页面的复选框事件
    onGenderToggleEvent: function() {
        let toggleArry = this.genderPage.getComponentsInChildren(cc.Toggle);
        for (let i = 0; i < toggleArry.length; i++) {
            const element = toggleArry[i];
            if (element.isChecked) {
                GlobalData.gender = i;
                if (GlobalData.gender == 0) {
                    console.log("user choose boy pet");
                } else {
                    console.log("user choose girl pet");
                }
            }
        }
        this.changeImage('gender');
    },
    // 监听毛色选择页面的复选框事件
    onSkinToggleEvent : function() {
        let toggleArry = this.skinPage.getComponentsInChildren(cc.Toggle);
        for (let i = 0; i < toggleArry.length; i++) {
            const element = toggleArry[i];
            if (element.isChecked) {
                GlobalData.color = i;
                console.log("user choose color" + (i + 1) )
            }
        }
        this.changeImage('skin');
    },
    // 监听输入事件
    // textChanged 事件的回调函数的参数模型
    // onTextChanged: function(text, editbox, customEventData) {
    //     // 这里的 text 表示 修改完后的 EditBox 的文本内容
    //     // 这里 editbox 是一个 cc.EditBox 对象
    //     // 这里的 customEventData 参数就等于你之前设置的 "foobar"
    // }
    onInputEvent: function(text, editbox, customEventData){
        console.log(editbox);
        if (editbox.node.name == 'petNameInput') {
            GlobalData.name = text;
            console.log("user set pet name", GlobalData.petName);
        } else if(editbox.node.name == 'masterNameInput'){
            GlobalData.title = text;
            console.log("user set master name", GlobalData.masterName);
        }
    },

    onCompleteClicked: function() {  //命名完成，提交结果，跳转到主界面
        console.log('turn to main page');
        // var serverAddr = GlobalData.serverAddr + "php/adopt.php";
        // $.ajax({
        //     url: serverAddr,
        //     type: 'POST',
        //     dataType: json,
        //     data: {
        //         userID: GlobalData.userID,
        //         species: GlobalData.species,
        //         gender: GlobalData.gender,
        //         color: GlobalData.color,
        //         userTitle: GlobalData.title,
        //         petName: GlobalData.name,
        //     },
        //     success(res) {
        //         console.log('领养成功');
        //     },
        // });
        // var serverAddr = GlobalData.serverAddr + "php/autoUpdate.php";
        // $.ajax({
        //     url: serverAddr,
        //     type: 'POST',
        //     dataType: json,
        //     data: {
        //         userID: GlobalData.userID,
        //     },
        //     complete() {
        //         console.log('后台自动更新进程开始运行');
        //     },
        // });
        cc.director.loadScene("mainPage");
    },

    // 显示命名页面
    showNamePage: function() {
        this._isNamePageShow = !this._isNamePageShow;
        let action = null;
        if (this._isNamePageShow) {
            action = cc.moveBy(0.5, cc.v2(0, -800));
        } else {
            action = cc.moveBy(0.5, cc.v2(0, 800));
        }
        // console.log(this.namePage.node);
        this.namePage.node.runAction(action);
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.content = this.speciesPage.content;
        this.items = this.content.children;// content的四个子节点，四个宠物选项node

        // ------- 初始化宠物选项 -------       
        // 宠物种类
        this.changeImage('species');
        this.items[GlobalData.species].scale = 1.25;
        this.changeTitle(0);

        this._isNamePageShow = false;
    },

    start () {

    },



    // update (dt) {},
});
