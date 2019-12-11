"use strict";
cc._RF.push(module, '093d5p6zI5MF6bpUEqprTnK', 'shopCopy');
// shop/js/shopCopy.js

'use strict';

/*
  author: qll
  time: 2019/12/2
*/
// 加载数据
var globalData = require("globalData");

function Commodity(id, name, categoryID, categoryName, price, isOwnFlag) {
	this.id = id;
	this.name = name;
	this.categoryID = categoryID;
	this.categoryName = categoryName;
	this.price = price;
	this._isShow = false;
	this._isOwn = isOwnFlag; // 需要服务器传值才能确定，现在先按照单机的写
	this.cartAmount = 0;

	this.showCategory = function (categoryID) {
		if (this.categoryID == categoryID) {
			this._isShow = true;
		} else {
			this._isShow = false;
		}
		this.isSelling();
	};
	// 判断是否商店是否继续销售
	this.isSelling = function () {
		if (this._isOwn && this.categoryID != 1 && this.categoryID != 2) {
			this._isShow = false;
		}
	};
};

cc.Class({
	extends: cc.Component,

	properties: {
		commodityArray: [], // 全部商品对象数组
		cart: [], // 购物车中商品对象数组
		showedCommodityArray: [], // 框中展示出的商品对象数组
		selectedCommodityIndex: 0, // 选中的商品在商品数组中的序列
		selectedCategory: 0, //选定的类别ID
		selectedSubCategory: 0, //选定的子类别ID

		subCategory: cc.Node, // 子类标签节点
		_isSubCateHidden: true, //标志位：子类别标签是否隐藏

		//以下为对页面的控制数据
		coin: cc.Label, //用户金币值
		growthLevel: cc.Label, //用户等级

		cost: cc.Label, //一次购买操作的花费

		shopListView: cc.ScrollView,

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
		subCateBtn7: cc.Button, // 小屋装饰子类别7按钮

		exitBtn: cc.Button, // 退出按钮

		prompt: cc.Node, // 提示框节点
		_isPromptHidden: true, // 标志位：提示框是否隐藏
		promptUnitPrice: { // 提示框显示单价
			get: function get() {
				return this._promptUnitPrice;
			},
			set: function set(value) {
				this._promptUnitPrice = value;
				this.promptUnitPriceLabel.string = this._promptUnitPrice + '';
			}
		},
		promptQuantity: { // 提示框显示数量
			get: function get() {
				return this._promptQuantity;
			},
			set: function set(value) {
				if (value < 0) {
					value = 0;
				}
				this._promptQuantity = value;
				this.promptQuantityLabel.string = this._promptQuantity + '';
			}
		},
		promptTotalPrice: { // 提示框显示总价
			get: function get() {
				return this._promptTotalPrice;
			},
			set: function set() {
				this._promptTotalPrice = this._promptUnitPrice * this.promptQuantity;
				this.promptTotalPriceLabel.string = this._promptTotalPrice + '';
			}
		},
		promptShowPic: cc.Sprite, // 提示框展示的商品图片
		promptUnitPriceLabel: cc.Label, // 提示框单价显示标签
		promptTotalPriceLabel: cc.Label, // 提示框总价显示标签
		promptQuantityLabel: cc.Label, // 提示框数量显示标签
		promptExitBtn: cc.Button, // 退出提示框按钮
		promptCancelBtn: cc.Button, // 提示框取消按钮
		promptConfirmBtn: cc.Button, // 提示框确认按钮
		promptIncreaseBtn: cc.Button, // 提示框增加数量按钮
		promptDecreaseBtn: cc.Button, // 提示框减少数量按钮

		commodityShowBlock: cc.Layout, //商店中商品展示框
		cartSpriteArray: cc.Sprite * 25 //商店中展示的商品

	},

	//点击类别按钮的事件处理函数
	onClickCategory: function onClickCategory(event) {
		this.subCategory.active = false;
		console.log('category ' + event.target.name + ' was clicked!');
		if (event.target.name == 'btn1') {
			this.selectedCategory = 1;
			this.modifyShopItemType(1);
			this.loadShopItem();
		} else if (event.target.name == 'btn2') {
			this.selectedCategory = 2;
			this.modifyShopItemType(2);
			this.loadShopItem();
		} else if (event.target.name == 'btn3') {
			this.selectedCategory = 3;
			this.modifyShopItemType(3);
			this.loadShopItem();
			this.subCategory.active = true;
		} else {
			this.selectedCategory = 4;
			this.modifyShopItemType(10);
			this.loadShopItem();
		}
	},

	//点击子类别按钮的事件处理函数
	onClickSubCategory: function onClickSubCategory(event) {
		console.log('sub category ' + event.target.name + ' was clicked!');
		if (event.target.name == 'btn1') {
			this.modifyShopItemType(3);
			this.loadShopItem();
		} else if (event.target.name == 'btn2') {
			this.modifyShopItemType(4);
			this.loadShopItem();
		} else if (event.target.name == 'btn3') {
			this.modifyShopItemType(5);
			this.loadShopItem();
		} else if (event.target.name == 'btn4') {
			this.modifyShopItemType(6);
			this.loadShopItem();
		} else if (event.target.name == 'btn5') {
			this.modifyShopItemType(7);
			this.loadShopItem();
		} else if (event.target.name == 'btn6') {
			this.modifyShopItemType(8);
			this.loadShopItem();
		} else {
			this.modifyShopItemType(9);
			this.loadShopItem();
		}
	},

	//点击确认按钮的事件处理函数
	confirm: function confirm() {
		if (this.promptQuantity > 0) {
			console.log("buy " + this.commodityArray[this.selectedCommodityIndex].name + ' ' + this.commodityArray[this.selectedCommodityIndex].cartAmount);
			// 选中商品的加入购物车
			this.commodityArray[this.selectedCommodityIndex]._isOwn = true;

			this.commodityArray[this.selectedCommodityIndex].cartAmount = this.promptQuantity;
			this.commodityArray[this.selectedCommodityIndex].isSelling(); // 购买该商品之后重新判断能否出现在商店
			this.cart.push(this.commodityArray[this.selectedCommodityIndex]);
			this.openPrompt();
			this.loadShopItem();
		}
		console.log("--------fellows are in cart--------");
		for (var i = 0; i < this.cart.length; i++) {
			var element = this.cart[i];
			console.log("shop name: " + element.name + ",amount: " + element.cartAmount);
		}

		// let date = new Date();
		// let year = date.getFullYear(); //获取当前年份   
		// let month = date.getMonth() + 1; //获取当前月份   
		// let dat = date.getDate(); //获取当前日    
		// let hour = date.getHours(); //获取小时   
		// let minute = date.getMinutes(); //获取分钟   
		// let second = date.getSeconds(); //获取秒   
		// let timeStr = year + '-' + month + '-' + dat + ' ' + hour + ':' + minute + ':' + second;
		// var serverAddr = globalData.serverAddr.get() + "php/buy.php"; //服务器接口地址
		// var ins = this;
		// wx.request({
		// 	url: serverAddr,
		// 	method: "POST",
		// 	header: {
		// 		"content-type": "application/x-www-form-urlencoded"
		// 	},
		// 	data: {
		// 		userID: globalData.userID.get(),
		// 		operationTime: timeStr,
		// 		categoryID: ins.selectedCommodity.categoryID,
		// 		itemID: ins.selectedCommodity.itemID,
		// 		number: ins.number,
		// 	},
		// 	success(res) {
		// 		globalData.flagStory.set(res.data.flagStory);
		// 		globalData.flagSkipping.set(res.data.flagSkipping);
		// 		ins.cost.string = res.data.cost;
		// 		console.log(res.data);
		// 		let title = "花费:" + res.data.cost;
		// 		wx.showToast({
		// 			title: title,
		// 			icon: 'none',
		// 			duration: 3000
		// 		});
		// 		//退出提示框，恢复默认值
		// 		ins.number.string = 1;
		// 		ins.cost.string = 0;
		// 		ins._isPromptHidden = true;
		// 	}
		// })
	},

	//点击关闭商店按钮的事件处理函数，返回主界面
	exit: function exit() {
		//退出清空
		this.cart = [];
		this.showedCommodityArra = [];
		this.selectedCategory = 0;
		this.selectedSubCategory = 0;
		cc.director.loadScene("mainPage");
	},

	//点击小屋按钮的事件处理函数，去到小屋
	goHome: function goHome() {
		//退出清空
		this.cart = [];
		this.showedCommodityArra = [];
		this.selectedCategory = 0;
		this.selectedSubCategory = 0;
		cc.director.loadScene("home");
	},

	/**
     * 打开或者关闭提示框
     * @param {Commodity} promptItem 提示框显示的商品对象
  * @param {cc.SpriteFrame} promptSp 提示框显示的商品图片
     */
	openPrompt: function openPrompt(promptItem, promptSp) {
		this._isPromptHidden = !this._isPromptHidden;
		var action = null;
		if (this.selectedCategory == 1 || this.selectedCategory == 2) {
			this.promptIncreaseBtn.node.active = true;
			this.promptDecreaseBtn.node.active = true;
		} else {
			this.promptIncreaseBtn.node.active = false;
			this.promptDecreaseBtn.node.active = true;
		}
		if (!this._isPromptHidden) {
			console.log("open prompt");
			// 将提示框的信息替换为点击的商品
			this.promptUnitPrice = promptItem.price;
			this.promptShowPic.spriteFrame = promptSp;
			// 初始购买值设为1
			this.promptQuantity = 1;
			this.promptTotalPrice = 0;
			// 打开购买提示框
			this.prompt.active = true;

			// 提示框打开动作部分：
			// mask 渐变出来;
			var fin = cc.fadeTo(0.3, 255);
			this.prompt.runAction(fin);
			// dlg由小到大
			this.prompt.scale = 0;
			var s = cc.scaleTo(0.4, 1).easing(cc.easeBackOut());
			this.prompt.runAction(s);
		} else {
			console.log("close prompt");
			// 提示框关闭动作部分：
			var fout = cc.fadeOut(0.3);
			this.prompt.runAction(fout);
			var s = cc.scaleTo(0.3, 0).easing(cc.easeBackIn());
			var end_func = cc.callFunc(function () {
				this.prompt.active = false;
			}.bind(this));
			var seq = cc.sequence([s, end_func]);
			this.prompt.runAction(seq);
		}
		// console.log(this.namePage.node);
		this.prompt.runAction(action);
	},

	/**
     * 提示框减少按钮被点击
     */
	onPromptDecreaseBtnClicked: function onPromptDecreaseBtnClicked() {
		this.promptQuantity -= 1;
		this.promptTotalPrice = 0;
		if (this.selectedCategory == 1 || this.selectedCategory == 2) {
			this.promptIncreaseBtn.node.active = true;
			this.promptDecreaseBtn.node.active = true;
		} else {
			this.promptIncreaseBtn.node.active = true;
			this.promptDecreaseBtn.node.active = false;
		}
	},

	/**
     * 提示框增加按钮被点击
     */
	onPromptIncreaseBtnClicked: function onPromptIncreaseBtnClicked() {
		this.promptQuantity += 1;
		this.promptTotalPrice = 0;
		if (this.selectedCategory == 1 || this.selectedCategory == 2) {
			this.promptIncreaseBtn.node.active = true;
			this.promptDecreaseBtn.node.active = true;
		} else {
			this.promptIncreaseBtn.node.active = false;
			this.promptDecreaseBtn.node.active = true;
		}
	},

	/**
  * 初始化商店信息
  * @param {object} _data 服务器请求数据经过json转换后的对象
  */
	initShop: function initShop(_data) {
		if (_data) {
			console.log(_data);
			var itemIDArray = _data.itemIDArray.split('+');
			var itemNameArray = _data.itemNameArray.split('+');
			var categoryIDArray = _data.categoryIDArray.split('+');
			var categoryNameArray = _data.categoryNameArray.split('+');
			var priceArray = _data.priceArray.split('+');
			var isOwnArray = _data.ownFlagArray.split('+');
			for (var index = 0; index < itemIDArray.length; index++) {
				var element = itemIDArray[index];
				var commodity = new Commodity(itemIDArray[index], itemNameArray[index], categoryIDArray[index], categoryNameArray[index], priceArray[index]);
				commodity.showCategory(1);
				this.commodityArray.push(commodity);
				// console.log(commodity);
			}
		}
	},

	/**
     * 修改商店加载商品类别
     * @param { Number } type 加载商品类别 
     */
	modifyShopItemType: function modifyShopItemType(type) {
		console.log('commodity ' + type + ' will be loaded!');
		for (var i = 0; i < this.commodityArray.length; i++) {
			var element = this.commodityArray[i];
			element.showCategory(type);
		}
	},

	/**
     * 加载商店商品
     * @param { Number } type 加载商品类别 
     */
	loadShopItem: function loadShopItem() {
		var self = this;
		self.commodityShowBlock.node.destroyAllChildren();
		var itemNum = 0;

		var _loop = function _loop(i) {
			var element = self.commodityArray[i];
			console.log("-----------debug log----------");
			console.log("now load shop item: " + i);
			if (element._isShow) {
				itemNum += 1;
				console.log("item: " + i + ' will be loaded');
				var picName = 'shop/' + element.id;
				cc.loader.loadRes(picName, cc.SpriteFrame, function (err, sp) {
					if (err) {
						console.log('failed to load sprite ' + picName);
					}
					cc.loader.loadRes("prefab/shopItem", cc.Prefab, function (err, prf) {
						if (err) {
							console.log('error: get prefab' + err + "prefab/shopItem");
						}
						if (!(prf instanceof cc.Prefab)) {
							console.log("not a prefab");
						}
						var commodityItem = cc.instantiate(prf);
						commodityItem.getComponent('shopItem').init(element.price, sp);
						commodityItem.on("touchstart", function () {
							console.log(element.name + ' was clicked');
							self.selectedCommodityIndex = i;
							self.openPrompt(element, sp);
							console.log(self.commodityArray[self.selectedCommodityIndex].name + ' was clicked,order ' + i);
						});
						commodityItem.zIndex = i;
						self.commodityShowBlock.node.addChild(commodityItem);
						console.log(self.commodityArray[i].name + ' is loading... item: ' + i);
					});
				});
			}
		};

		for (var i = 0; i < self.commodityArray.length; i++) {
			_loop(i);
		}
		self.commodityShowBlock.node.height = itemNum % 3 ? ((itemNum - itemNum % 3) / 3 + 1) * 130 + (itemNum - itemNum % 3) / 3 * 20 : itemNum / 3 * 130 + itemNum / 3 * 20;
		self.shopListView.scrollToTop(0.5);
	},

	// LIFE-CYCLE CALLBACKS:

	onLoad: function onLoad() {

		//初始化
		// this.growthLevel.string = globalData.growthLevel.get();
		// this.coin.string = globalData.coin.get();
		// this.number.string = 1;
		// this.cost.string = 1;
		this.prompt.active = false;
		this.selectedCategory = 1;
		this.subCategory.active = false;
		//与服务器交互，获得所有的商品信息

		var url = "https://www.llquruc.top/petGame/" + "php/queryShop.php"; //服务器接口地址
		// 调用自定义网路接口获取商品信息
		var self = this;
		HttpHelper.httpPost(url, null, function (data) {
			if (data == -1) {
				console.log("访问失败");
			} else {
				self.initShop(data);
				self.loadShopItem();
			}
		});
	},
	start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();