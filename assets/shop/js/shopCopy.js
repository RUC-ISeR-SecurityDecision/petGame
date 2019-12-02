/*
  author: qll
  time: 2019/12/2
*/
// 加载数据
var globalData = require("globalData");

cc.Class({
    extends: cc.Component,

    properties: {
      commodityArray : [],  //全部商品对象数组
      cart : [],  //购物车中商品对象数组
      showedCommodityArray : [],  //框中展示出的商品对象数组
      selectedCategory : 0,//选定的类别ID
      selectedSubCategory : 0,//选定的子类别ID
      selectedCommodity : null, //选定的商品对象
      _isPromptHidden: true,  //标志位：提示框是否隐藏
      _isSubCateHidden: true,  //标志位：子类别标签是否隐藏
      
      //以下为对页面的控制数据
      coin: cc.Label, //用户金币值
      growthLevel: cc.Label, //用户等级

      number : cc.Label, //购买数量
      cost : cc.Label, //一次购买操作的花费

      cateBtn1: cc.Button, // 商品类别1按钮
      cateBtn2: cc.Button, // 商品类别2按钮
      cateBtn3: cc.Button, // 商品类别3按钮
      cateBtn4: cc.Button, // 商品类别4按钮

      subCateBtn1: cc.Button, // 小屋装饰子类别1按钮
      subCateBtn2: cc.Button, // 小屋装饰子类别2按钮
      subCateBtn3: cc.Button, // 小屋装饰子类别3按钮
      subCateBtn4: cc.Button, // 小屋装饰子类别4按钮
      subCateBtn5: cc.Button, // 小屋装饰子类别5按钮
      subCateBtn6: cc.Button, // 小屋装饰子类别6按钮

      exitBtn: cc.Button, // 退出按钮

      promptExitBtn: cc.Button, // 退出提示框按钮
      promptCancelBtn: cc.Button, // 提示框取消按钮
      promptConfirmBtn: cc.Button, // 提示框确认按钮
      promptIncreaseBtn: cc.Button, // 提示框增加数量按钮
      promptDecreaseBtn: cc.Button, // 提示框减少数量按钮

      commoditySpriteArray: cc.Sprite * 25, //商店中展示的商品
      cartSpriteArray: cc.Sprite * 25, //商店中展示的商品
      
    },

    //点击类别按钮的事件处理函数
    onClickCategory: function(categoryID){
      this.selectedCategory = categoryID;
      let showedCommodityArrayCopy = [];
      if(categoryID == 1 || categoryID == 2  || categoryID == 10){  //普通商品没有子分类
        let len = this.commodityArray.length;
        for (let i=0; i<len; i++)
        {
          if (this.commodityArray[i].categoryID == categoryID)
          {
            showedCommodityArrayCopy.push(commodityArray[i]);
          }      
        }
      }
      else{
        this._isSubCatetHidden = false;//子分类显现     
        let defaultSubCategoryID = 3;   //小屋装饰有子分类，需要设置默认子分类
        let len = this.commodityArray.length;
        for (let i=0; i<len; i++)
        {
          if (this.commodityArray[i].categoryID == defaultSubCategoryID)
          {
            showedCommodityArrayCopy.push(commodityArray[i]);
          }      
        }
      }
      this.showedCommodityArray = showedCommodityArrayCopy;
    },

    //点击子类别按钮的事件处理函数
    onClickSubCategory: function(categoryID){
      let showedCommodityArrayCopy = [];
      let len = this.commodityArray.length;
      for (let i=0; i<len; i++)
      {
        if (this.commodityArray[i].categoryID == categoryID)
        {
          showedCommodityArrayCopy.push(commodityArray[i]);
        }      
      }
      this.selectedSubCategory = categoryID;
      this.showedCommodityArray = showedCommodityArrayCopy;
    },

    //点击商品按钮的事件处理函数
    onClickCommodity: function(commodityID){
      this.selectedCommodity = this.commodityArray[commodityID];
      this._isPromptHidden = false;  //提示框显现
      //设置弹出框中的一些默认值
      this.number.string = 1;
      this.cost.string = 0;
    },

    //点击减少数量按钮的事件处理函数
    reduceNumber: function(){
      if(this.number.string != 0){
        this.number.string = this.number.string - 1;
      }
      else{
        wx.showToast({
          title: '不能再减啦~~',
          icon: 'none',
          duration: 3000
        });
      }
    },

    //点击增加数量按钮的事件处理函数
    increaseNumber: function(){
      if (this.selectedCommodity.categoryID == 1 || this.selectedCommodity.categoryID == 2){   //只有食品和洗澡用品可以买多个
        this.number.string = this.number.string + 1;
      }
      else{
        wx.showToast({
          title: '同一个小屋装饰只能买一个哟~',
          icon: 'none',
          duration: 3000
        });
      }
      
    },

    //点击取消或者退出按钮的事件处理函数
    cancel: function(){
      //退出提示框，恢复默认值
      this.number.string = 1;
      this._isPromptHidden = true;
    },

    //点击确认按钮的事件处理函数
    confirm: function(){
      let date = new Date();   
		  let year = date.getFullYear(); //获取当前年份   
		  let month = date.getMonth()+1; //获取当前月份   
		  let dat = date.getDate(); //获取当前日    
		  let hour = date.getHours(); //获取小时   
		  let minute = date.getMinutes(); //获取分钟   
		  let second = date.getSeconds(); //获取秒   
      let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
      var serverAddr = globalData.serverAddr.get() + "php/buy.php"; //服务器接口地址
      var ins = this;
      wx.request({
        url: serverAddr,
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {  
          userID : globalData.userID.get(),
          operationTime : timeStr,
          categoryID : ins.selectedCommodity.categoryID,
          itemID : ins.selectedCommodity.itemID,
          number : ins.number,
        },
        success(res) {
          globalData.flagStory.set(res.data.flagStory);
          globalData.flagSkipping.set(res.data.flagSkipping);
          ins.cost.string = res.data.cost;
          console.log(res.data);
          let title = "花费:" + res.data.cost;
          wx.showToast({
            title: title,
            icon: 'none',
            duration: 3000
          });
          //退出提示框，恢复默认值
          ins.number.string = 1;
          ins.cost.string = 0;
          ins._isPromptHidden = true;
        }
      })
    },


    //点击关闭商店按钮的事件处理函数，返回主界面
    exit: function(){
      //退出清空
      this.cart = [];
      this.showedCommodityArra = [];
      this.selectedCategory = 0;
      this.selectedSubCategory = 0;
      cc.director.loadScene("mainPage");
    },

    //点击小屋按钮的事件处理函数，去到小屋
    goHome: function(){
      //退出清空
      this.cart = [];
      this.showedCommodityArra = [];
      this.selectedCategory = 0;
      this.selectedSubCategory = 0;
      cc.director.loadScene("home");
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      
      //初始化
      this.growthLevel.string = globalData.growthLevel.get();
      this.coin.string = globalData.coin.get();
      this.number.string = 1;
      this.cost.string = 1;

      //函数：创建商品对象
      function commodity(commodityID, itemID, itemName, categoryID, categoryName, price, ownFlag){
        this.commodityID = commodityID;
        this.itemID = itemID;
        this.itemName = itemName;
        this.categoryID = categoryID;
        this.categoryName = categoryName;
        this.price = price;
        this.ownFlag = ownFlag;
        this.picAddr = globalData.serverAddr.get() + 'material/shopPic/' + categoryID + '/' + itemID;
        console.log(this);
      }

      //与服务器交互，获得所有的商品信息
      var serverAddr = globalData.serverAddr.get() + "php/queryShop.php"; //服务器接口地址
      wx.request({
        url: serverAddr,
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {  
          
        },
        success(res) {
          //成功获得返回后，执行以下语句
          let itemIDArray = res.data.itemIDArray.split("+");
          delete itemIDArray[0];
          let itemNameArray = res.data.itemNameArray.split("+");
          delete itemNameArray[0];
          let categoryIDArray = res.data.categoryIDArray.split("+");
          delete categoryIDArray[0];
          let categoryNameArray = res.data.categoryNameArray.split("+");
          delete categoryNameArray[0];
          let priceArray = res.data.priceArray.split("+");
          delete priceArray[0];
          let ownFlagArray = res.data.ownFlagArray.split("+");
          delete ownFlagArray[0];

          //设置最开始进入页面时，默认展示食品类别商品
          let commodityArrayCopy = [];         
          let len = itemIDArray.length;
          for (let i=0; i<len; i++)
          {
            let newCommodity = new commodity(i, itemIDArray[i], itemNameArray[i], categoryIDArray[i], categoryNameArray[i], priceArray[i], ownFlagArray[i]);
            commodityArrayCopy.push(newCommodity);
          }
          this.commodityArray = commodityArrayCopy;
          console.log(res.data);
          let showedCommodityArrayCopy = [];
          len = this.commodityArray.length;
          let defaultCategoryID = 1;
          for (let i=0; i<len; i++)
          {
            if (this.commodityArray[i].categoryID == defaultCategoryID)
            {
              showedCommodityArrayCopy.push(commodityArray[i]);
            }      
          }
          this.showedCommodityArray = showedCommodityArrayCopy;
          this.selectedCategory = defaultCategoryID;
        }
      })

      
      
      
      
    },

    start () {

    },

    // update (dt) {},
});
