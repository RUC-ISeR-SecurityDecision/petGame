"use strict";
cc._RF.push(module, '902fanufHNJFqbXcu0NW6fy', 'questionPrompt');
// resources/questionPrompt.js

"use strict";

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
            get: function get() {
                return this._type;
            },
            set: function set(value) {
                if (value == 0) {
                    // 旅游
                    this.title.string = "您的宠物旅游回来啦，还带回来了...";
                    this.picPath = "tripPic/";
                    this.QAPath = "tripQA/";
                } else if (value == 1) {
                    // 打工
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
        correctPrompt: cc.Node,

        //added by qll on 20200114
        QAindex: null,
        QAquestion: null,
        QAanswer: null,
        work_indexArray: null,
        work_questionArray: null,
        work_answerArray: null,
        trip_indexArray: null,
        trip_questionArray: null,
        trip_answerArray: null
    },

    // LIFE-CYCLE CALLBACKS:
    //added by qll on 20200114
    getQAArray: function getQAArray() {
        var work_indexArrayString = '3/3.txt - 4/5.txt - 1/1.txt - 3/5.txt - 2/2.txt - 4/2.txt - 3/4.txt - 1/3.txt - 1/2.txt - 5/5.txt - 2/5.txt - 1/4.txt - 2/1.txt - 5/2.txt - 4/4.txt - 2/3.txt - 2/4.txt - 1/5.txt - 5/3.txt - 3/2.txt - 4/3.txt - 5/1.txt - 3/1.txt - 5/4.txt - 4/1.txt';
        var work_questionArrayString = '请问下列选项中哪一个是漫画《百变小樱》中人物小樱不喜欢的科目？ - 请问莫斯科的气候特点是什么？ - 请问我国的国花是？ - 请问漫画《秦时明月》的时代背景是我国哪个朝代？ - 请问我国地形主要分为几个阶梯？ - 请问以下哪座建筑不属于巴黎？ - 请问漫画《美少女战士》中的主角叫什么？ - 请问经常被女孩子们用来染指甲的是下面哪一种花？ - 请问映山红指的是下面哪种花？ - 请问以下哪位不是微软的创始人？ - 请问2008年北京奥运会会徽徽宝“中国印”所用材料为以下哪种玉？ - 请问“岁寒三友”不包含下列哪一种植物？ - 请问神秘的罗布泊位于我国哪个地区？ - 请问蛋糕店好利来的创始人是？ - 请问以下哪个不是纽约市的别称？ - 请问野生保护动物藏羚羊主要分布于我国哪个区域？ - 请问以下哪个城市位于我国华北平原？ - 请问享有“月下美人”美誉的是下列哪一种花？ - 请问雅诗兰黛的这一品牌名称来源于？ - 请问下列选项中哪一个不是日本的漫画？ - 请问伦敦位于英国的哪个区域？ - 请问“蝌蝌啃蜡”指的是下列哪种饮料？ - 请问下列哪位不是漫画《海贼王》中的人物？ - 请问格力电器的董事长叫什么？ - 请问东京将于2020年举办第几届夏季奥运会？';
        var work_answerArrayString = '算术+音乐+体育 - 温带大陆性气候+温带海洋性气候+温带季风性气候 - 牡丹+月季+玫瑰 - 秦朝+汉朝+奏朝 - 三个+四个+五个 - 大本钟+埃菲尔铁塔+巴黎圣母院 - 月野兔+小小兔+火野丽 - 凤仙花+玫瑰花+水仙花 - 杜鹃+梅花+荷包牡丹 - 史蒂夫·鲍尔默+比尔·盖茨+保罗·艾伦 - 和田玉+蓝田玉+独山玉 - 菊花+竹子+梅花 - 新疆+西藏+青海 - 罗红+罗紫+罗兰 - 雾都+不夜城+哥谭市 - 青藏高原+大兴安岭+华北平原 - 天津+西安+苏州 - 昙花+百合+鸢尾 - 创始人的姓名+创始人的家乡+创始人爱人的姓名 - 秦时明月+海贼王+火影忍者 - 英格兰+苏格兰+威尔士 - 可口可乐+百事可乐+白花蛇草水 - 小樱+路飞+乔巴 - 董明珠+董金珠+董银珠 - 第34届+第33届+第35届';
        this.work_indexArray = work_indexArrayString.split(" - ");
        this.work_questionArray = work_questionArrayString.split(" - ");
        this.work_answerArray = work_answerArrayString.split(" - ");
        var trip_indexArrayString = '6/2/1.txt - 13/1/4.txt - 14/2/3.txt - 1/1/1.txt - 3/2/1.txt - 24/2/4.txt - 8/2/4.txt - 11/2/3.txt - 7/1/4.txt - 25/1/2.txt - 27/2/2.txt - 7/2/4.txt - 10/2/1.txt - 4/2/4.txt - 23/2/2.txt - 8/2/1.txt - 32/1/2.txt - 30/1/2.txt - 21/2/2.txt - 9/2/4.txt - 12/2/1.txt - 21/2/4.txt - 13/1/3.txt - 31/1/2.txt - 3/1/3.txt - 27/1/1.txt - 3/2/2.txt - 31/1/1.txt - 32/2/4.txt - 22/1/3.txt - 15/2/2.txt - 18/2/2.txt - 26/2/4.txt - 31/2/3.txt - 29/1/4.txt - 10/2/2.txt - 18/2/3.txt - 22/2/1.txt - 19/2/4.txt - 16/1/1.txt - 1/2/2.txt - 30/1/4.txt - 13/1/2.txt - 1/1/2.txt - 7/2/2.txt - 11/1/2.txt - 27/2/4.txt - 5/2/1.txt - 26/2/3.txt - 27/2/3.txt - 33/2/2.txt - 27/2/1.txt - 25/1/4.txt - 12/1/2.txt - 19/2/3.txt - 32/2/2.txt - 18/1/4.txt - 29/1/1.txt - 4/2/1.txt - 9/1/4.txt - 20/1/1.txt - 32/1/4.txt - 17/1/2.txt - 1/1/3.txt - 2/2/2.txt - 16/2/3.txt - 2/2/4.txt - 1/1/4.txt - 7/1/1.txt - 14/1/3.txt - 32/2/3.txt - 1/2/4.txt - 12/1/3.txt - 2/2/1.txt - 12/1/4.txt - 28/1/1.txt - 1/2/3.txt - 14/2/1.txt - 19/2/1.txt - 14/1/1.txt - 3/1/1.txt - 24/1/2.txt - 29/2/4.txt - 6/1/1.txt - 9/1/1.txt - 13/2/3.txt - 14/1/4.txt - 2/1/3.txt - 17/2/4.txt - 25/1/1.txt - 22/2/2.txt - 8/2/3.txt - 31/2/1.txt - 17/1/1.txt - 10/1/4.txt - 13/2/1.txt - 34/2/2.txt - 10/2/3.txt - 23/2/3.txt - 31/1/4.txt - 7/2/1.txt - 33/2/1.txt - 28/2/1.txt - 18/1/1.txt - 21/1/3.txt - 13/2/4.txt - 9/2/1.txt - 29/2/1.txt - 27/1/4.txt - 24/2/2.txt - 28/2/3.txt - 12/2/2.txt - 24/1/4.txt - 26/1/2.txt - 25/1/3.txt - 5/2/3.txt - 24/2/1.txt - 19/2/2.txt - 29/2/2.txt - 4/1/2.txt - 6/2/2.txt - 21/1/4.txt - 29/1/2.txt - 15/2/1.txt - 4/1/4.txt - 22/1/4.txt - 28/2/2.txt - 22/1/1.txt - 22/2/3.txt - 26/2/1.txt - 18/2/4.txt - 8/2/2.txt - 2/2/3.txt - 8/1/4.txt - 16/2/4.txt - 10/2/4.txt - 33/1/3.txt - 17/2/1.txt - 5/1/3.txt - 34/2/1.txt - 3/1/2.txt - 6/2/3.txt - 21/2/1.txt - 25/2/2.txt - 21/1/2.txt - 33/1/2.txt - 23/1/2.txt - 6/2/4.txt - 5/1/2.txt - 2/1/1.txt - 20/1/4.txt - 12/1/1.txt - 12/2/4.txt - 26/1/3.txt - 34/1/4.txt - 4/2/2.txt - 12/2/3.txt - 28/2/4.txt - 7/1/2.txt - 20/2/1.txt - 14/2/2.txt - 18/1/2.txt - 23/2/1.txt - 20/1/3.txt - 15/1/1.txt - 11/1/3.txt - 26/2/2.txt - 7/1/3.txt - 17/1/4.txt - 29/2/3.txt - 33/1/4.txt - 25/2/4.txt - 5/1/4.txt - 30/1/3.txt - 2/1/4.txt - 31/2/2.txt - 28/1/4.txt - 9/2/2.txt - 19/1/3.txt - 23/1/4.txt - 10/1/3.txt - 7/2/3.txt - 6/1/2.txt - 16/1/3.txt - 25/2/1.txt - 15/2/3.txt - 9/2/3.txt - 31/2/4.txt - 15/2/4.txt - 4/1/3.txt - 4/1/1.txt - 10/1/1.txt - 17/2/2.txt - 18/2/1.txt - 18/1/3.txt - 20/1/2.txt - 24/1/3.txt - 20/2/2.txt - 28/1/2.txt - 4/2/3.txt - 32/2/1.txt - 32/1/3.txt - 23/1/1.txt - 33/1/1.txt - 11/2/2.txt - 19/1/4.txt - 19/1/2.txt - 34/2/3.txt - 11/1/4.txt - 6/1/4.txt - 34/1/2.txt - 30/2/1.txt - 20/2/3.txt - 11/2/1.txt - 23/1/3.txt - 20/2/4.txt - 3/1/4.txt - 6/1/3.txt - 11/1/1.txt - 32/1/1.txt - 3/2/3.txt - 5/2/4.txt - 30/2/2.txt - 23/2/4.txt - 34/1/3.txt - 9/1/3.txt - 17/2/3.txt - 26/1/4.txt - 13/1/1.txt - 13/2/2.txt - 5/1/1.txt - 22/1/2.txt - 21/2/3.txt - 3/2/4.txt - 34/1/1.txt - 19/1/1.txt - 16/2/2.txt - 29/1/3.txt - 33/2/4.txt - 30/2/4.txt - 28/1/3.txt - 9/1/2.txt - 2/1/2.txt - 27/1/3.txt - 11/2/4.txt - 26/1/1.txt - 5/2/2.txt - 14/1/2.txt - 1/2/1.txt - 16/1/2.txt - 10/1/2.txt - 21/1/1.txt - 31/1/3.txt - 8/1/1.txt - 8/1/3.txt - 14/2/4.txt - 24/1/1.txt - 33/2/3.txt - 22/2/4.txt - 15/1/4.txt - 8/1/2.txt - 16/2/1.txt - 24/2/3.txt - 15/1/3.txt - 30/1/1.txt - 17/1/3.txt - 15/1/2.txt - 16/1/4.txt - 34/2/4.txt - 30/2/3.txt - 27/1/2.txt - 25/2/3.txt';
        var trip_questionArrayString = '请问下列石窟中哪一个不位于甘肃省？ - 请问以下景致哪个属于漠河？ - 请问神农架林区的最高峰是哪座山？ - 请问“黄山五绝”不包括下列哪个选项？ - 请问以下选项中的长城关隘哪个在北京？ - 请问下列选项是云冈石窟的主要文物？ - 请问象鼻山得名于？ - 请问承德避暑山庄建于我国古代哪个朝代？ - 请问广州市的简称是？ - 请问秦始皇陵是由谁主持规划设计的？ - 请问乐山大佛位于大渡河、青衣江和另外哪条江的三江汇流之处？ - 请问广东省的主要气候类型为？ - 请问五指山中的最高峰是哪一“指”？ - 请问“长江三峡---夔门”是第五套人民币中哪一面值纸币背面的风景图案？ - 请问下列哪座山被称为“五岳之尊”？ - 请问象鼻山位于下列哪条江与漓江的汇流处？ - 请问喀纳斯湖位于新疆的哪个地区？ - 请问文成公主嫁给了谁？ - 请问西夏末主是以下哪位皇帝？ - 请问我国首个国家级大数据综合试验区位于下列哪个省级行政单位？ - 请问少林寺始建于哪一朝代？ - 请问西夏王陵中一共有几座帝陵？ - 请问与黑龙江省漠河市隔江相邻的是哪个国家？ - 请问下列哪一选项不是香港的别称？ - 请问故宫是由哪位皇帝始建的？ - 请问九寨沟得名于？ - 请问司马台长城位于北京哪个区？ - 请问香港是全球第几大金融中心？ - 请问伊犁将军府修建于哪一时期？ - 请问青海的省会城市是以下哪个选项？ - 请问张家界原名为？ - 请问下列哪一书院位于庐山附近？ - 请问下列哪一位伟人出生于上海？ - 请问香港廉政公署的英文简称是？ - 请问“九河下梢天津卫”中的“九河”是远古时代哪条河下游支流的总称？ - 请问五指山是下列哪一剧目故事背景的发生地？ - 请问电影《庐山恋》中的男主角叫什么？ - 请问中国最大的内陆湖是？ - 请问有“共和国长子”之称的城市是哪一个？ - 请问伪满皇宫曾是以下哪位皇帝的居所？ - 请问皖南古村落是哪一年被列入世界文化遗产名录的？ - 布达拉宫主体分为两个部分，请问这两部分分别是？ - 请问在地球北极圈以内的区域，什么时间最有可能体验到极昼？ - 请问以下哪个选项是黄山“三大名瀑”之一？ - 请问下列选项中哪个是广东省的简称？ - 请问北戴河位于河北省哪个市？ - 请问下列选项中哪个不是四川省的简称？ - 请问武夷山的地貌属于下列哪种地貌类型？ - 请问外滩位于上海市的哪一辖区？ - 请问乐山大佛高约？ - 请问下列古城哪个未被列入世界文化遗产名录？ - 请问乐山大佛位于四川省哪一城市？ - 请问以下古称哪个指的不是西安？ - 请问龙门石窟位于洛阳市伊河岸边哪座山上？ - 下列选项哪个不是沈阳的旧称？ - 请问我国陆地最低点位于哪里？ - 请问景德镇四大传统名瓷不包含下列哪个选项？ - 请问下列哪个选项是天津特色小吃？ - 请问“三峡”不包括下列哪一选项？ - 请问黄果树风景区位于贵州省哪个城市？ - 请问成吉思汗陵位于哪一城市？ - 请问新疆维吾尔自治区的首府是哪座城市？ - 请问夫子庙位于以下哪条河流附近？ - 请问黄山位于我国哪个省？ - 请问“大三巴”之名源于下列哪种语言？ - 请问长白山山脉在中国境内的部分中，最高峰是下列哪个选项？ - 请问澳门于哪年回归？ - 请问“黄山”之名得名于我国古代哪位名人？ - 请问广东最高峰是？ - 请问“黄鹤一去不复返，白云千载空悠悠”这一名句出自于哪位诗人之手？ - 请问以下景点哪个不在吐鲁番？ - 请问皖南古村落的景区评级是几个A？ - 请问龙门石窟最初开凿于我国古代哪个朝代？ - 请问大三巴牌坊是以下哪个建筑的遗址？ - 请问与龙门石窟西山窟区隔河相望的香山寺得名于此处盛产的什么植物？ - 请问阿里山位于台湾省哪一区域？ - 请问皖南古村落主要体现了我国哪一时期的民居特色？ - 请问神农架地处汉水与另外哪条河流之间？ - 请问沈阳故宫始建于哪位清朝皇帝执政时期？ - 请问“故人西辞黄鹤楼，烟花三月下扬州”这一名句出自于哪位诗人之手？ - 请问以下哪个不是故宫“三大殿”之一？ - 请问著名晋商乔致庸字什么？ - 请问以下哪个城市未曾担任过河北省的省会？ - 请问甘肃省的丹霞地貌主要位于哪个市？ - 请问“水由溪上石，如烟雾腾空，势其雄厉，所谓珠帘钩不卷，匹练挂遥峰，具不足拟其状也”是描写下列哪一景区的美景？ - 请问大兴安岭不出现在以下哪个地区？ - 请问享有“天下江山第一楼”之美誉的是以下哪座建筑？ - 请问妈祖原名叫什么？ - 请问拙政园始建于哪一时期？ - 请问兵马俑是以下哪位皇帝的殉葬品？ - 请问青海湖位于以下哪个自治州境内？ - 请问象鼻山的古称是？ - 请问维多利亚港是香港岛与哪一区域之间的海港？ - 请问夫子庙位于江苏省哪一城市？ - 请问海南省的主要气候类型为？ - 请问大兴安岭地区最高峰是？ - 请问西湖上的苏堤是哪位诗人主持修建的？ - 请问《五指山歌》是下列哪一少数民族的民歌？ - 请问自秦汉至明清，历代皇帝到泰山封禅一共多少次？ - 请问香港特别行政区区旗中央是什么图案？ - 请问长隆欢乐世界坐落在下列哪个城市？ - 请问玉龙雪山位于哪个城市？ - 请问日月潭中央划分南北半湖的小岛叫什么？ - 请问江西景德镇又被称为？ - 请问宁夏是哪一少数民族的自治区？ - 请问大兴安岭地区的主要气候类型是？ - 请问西江千户苗寨位于贵州省哪一地区？ - 请问“天津之眼”实际上是一个什么设施？ - 请问九寨沟的主要气候类型是？ - 请问云冈石窟是哪一年被列入世界遗产名录的？ - 请问日月潭位于台湾省哪一县境内？ - 请问少林寺最初是为了安置哪位高僧所建？ - 请问乔家大院位于山西省哪一区域？ - 请问上海的简称是？ - 请问兵马俑位于陕西省哪一市境内？ - 请问“朱子孝母饼”是下列哪位名人创造的？ - 请问云冈石窟位于山西省哪一城市？ - 请问沈阳故宫建成于哪位清朝皇帝执政时期？ - 请问“天津之眼”位于天津市哪座桥上？ - 请问以下哪个历史事件不是发生在重庆？ - 请问敦煌莫高窟始建于哪一时期？ - 请问被称为“世界枸杞之都”的是以下哪个城市？ - 请问“泥人张”的创始人叫什么？ - 请问我国的第一个国家森林公园是？ - 请问洪崖洞一共有多少层？ - 请问青海省不与以下哪个省份接壤？ - 请问日月潭两个半湖中，哪一个半湖形状像弯月？ - 请问可可西里自然保护区位于青海省哪一地区？ - 请问以下哪一鱼类是青海湖的特产？ - 请问1844年，外滩一带被划为哪一国家的租界？ - 请问名句“飞流直下三千尺，疑是银河落九天”出自于哪位诗人之手？ - 请问象鼻山的地貌类型是？ - 请问大三巴牌坊建于哪一年？ - 请问漓江不流经下列哪一区域？ - 请问长白山在《山海经》中被称为什么？ - 请问节日“三月三”不是下列哪一少数民族的传统节日？ - 请问云南省的省会城市是？ - 请问拙政园的第一任主人是？ - 请问鼓浪屿得名于下列哪一选项？ - 请问名句“最爱湖东行不足，绿杨荫里白沙堤”出自哪位诗人之手？ - 请问故宫是哪一年被列为世界文化遗产的？ - 请问敦煌莫高窟藏经洞的发现者从事什么职业？ - 请问西夏王朝的开国君主是谁？ - 请问大雁塔最初是谁主持修建？ - 请问沙坡头毗邻哪一沙漠？ - 请问云南红河哈尼族彝族自治州与哪一国家接壤？ - 请问下列景点哪个不在济南？ - 请问敦煌莫高窟是为哪一宗教所建立？ - 请问下列名人中哪一位出生于鼓浪屿？ - 请问妈祖阁是为了纪念谁而建的？ - 请问元朝首都“大都”位于如今哪一城市？ - 请问龙门石窟位于河南省哪一市？ - 请问少林寺位于哪座山中？ - 请问下列选项哪一个不是上海市的别称？ - 请问京杭大运河连接的是北京和哪里（终点城市）？ - 请问下列哪一选项不在重庆境内？ - 请问少林寺位于河南省哪一市？ - 请问郑成功是在哪个世纪完成的收复台湾？ - 请问元朝的“羊城八景”中，哪一项在白云山？ - 请问呼伦贝尔草原得名于？ - 神农架是中国首个获得联合国教科文组织三大保护制度共同录入的“三冠王”名录遗产地。请问这三个保护制度之中，除了“世界地质公园”和“世界遗产”之外，另一个是什么？ - 请问景德镇毗邻下列哪一湖？ - 请问“岱宗夫如何”中的“岱宗”指的是以下哪座山？ - 请问元朝的开国皇帝是？ - 请问名篇《岳阳楼记》出自于哪位名家之手？ - 请问下列选项哪一个是秦皇岛历史上第一座公园？ - 请问外滩的正式路名是什么？ - 请问下列选项中哪一个不是广州市的别称？ - 请问乌衣巷以前是哪位名人所居住之地？ - 请问“天津之眼”下方是哪条河？ - 请问中国第一条国际铁路是下列哪个选项？ - 请问珍贵的贝叶经是由哪种语言书写而成的？ - 请问鼓浪屿是我国第几项世界遗产？ - 请问布达拉宫是世界上海拔第几高的宫殿建筑？ - 请问妈祖的故乡在哪里？ - 请问维多利亚港最深的航道是？ - 请问歌曲《高山青》的第一句歌词是什么？ - 请问西江千户苗寨是哪一少数民族的聚居区？ - 请问著名的棒棰岛国宾馆原名是什么？ - 请问名句“四面荷花三面柳，一城山色半城湖”描写的是下列哪个城市？ - 请问三亚市的主要海湾不包括下列哪个选项？ - 请问1917年孙中山先生是在哪里就任军政府大元帅的？ - 请问以下哪个选项不是甘肃省特有的三个少数民族之一？ - 请问伪满皇宫位于吉林省的哪一城市？ - 请问大雁塔位于哪个寺内？ - 请问张家界地区内有玻璃栈道的是以下哪座山？ - 请问西江千户苗寨的民居建筑类型不包含下列哪一选项？ - 请问香港于哪一年回归祖国？ - 请问以下哪部电影曾取景张家界？ - 下列哪个选项是重庆的简称？ - 请问以下哪个选项不是重庆的别称？ - 请问海南省著名旅游景点“天涯海角”位于哪个市？ - 请问拙政园位于以下哪座城市？ - 请问庐山位于下列哪一市境内？ - 请问景德镇“景德”之名起源于？ - 请问成吉思汗的名字是什么？ - 请问2006年上映的电视连续剧《乔家大院》中男主角乔致庸是由谁扮演的？ - 请问世界四大草原有几个位于中国境内？ - 请问阿里山之名来源于哪一部族族长之名？ - 三峡地跨两省市，请问下列哪个选项不是这两省市之一？ - 请问葡萄沟位于哪座城市？ - 请问新疆约占我国国土面积的几分之一？ - 请问以下哪位皇帝曾册封趵突泉为“天下第一泉”？ - 请问红河哈尼梯田位于哪一地区境内？ - 请问中国三大古建筑群不包括下列哪个选项？ - 请问大连市的名称来源于什么语言的音译？ - 请问棒棰岛位于下列哪座城市？ - 请问名句“欲把西湖比西子，淡妆浓抹总相宜”中的“西子”指的是谁？ - 请问下列景点哪一个不在秦皇岛？ - 请问张掖丹霞地貌群不包括下列哪个区域？ - 请问世界互联网大会的永久会址是？ - 请问珠穆朗玛峰位于我国和哪一国家的边境线上？ - 请问翰日切舞是哪一少数民族的民间舞蹈形式？ - 请问承德避暑山庄的建造历时多少年？ - 请问乾隆皇帝是在下面哪个地方遇到夏雨荷的？ - 以下哪一省级行政单位不与内蒙古自治区接壤？ - 请问故宫的正门叫什么？ - 请问甘肃省张掖市古称？ - 请问北戴河位于戴河的哪个方位？ - 请问喀纳斯湖的“喀纳斯”来自于哪种语言？ - 请问被称为“天下第一关”的是以下哪个选项？ - 请问“不临溪而能尽九溪之胜，此峰固应第一也”称赞的是武夷山中哪一处景点？ - 请问珠穆朗玛峰是哪一座山的主峰？ - 请问赞颂泰山的名篇《望岳》出自哪位诗人之手？ - 请问中国第四大岛是哪个？ - 请问贵州省的省会城市是哪一个？ - 请问苏州最大的古典园林是？ - 请问崇明岛是中国第几大岛？ - 请问我国最北点位于哪个城市？ - 请问“大兴安岭”中的“兴安”来自于哪一少数民族语言？ - 请问鼓浪屿位于福建省哪个市？ - 请问以下哪种野生动物最不可能出现在可可西里？ - 请问西夏王陵在以下哪座山附近？ - 请问“不到长城非好汉”一句出自于哪位伟人的诗词？ - 请问乌镇位于浙江省哪一城市？ - 请问以下哪位国家领导人未曾去过大连棒棰岛？ - 请问长白山是我国与哪一国家之间的界山？ - 请问“桂发祥”是什么天津特色小吃的店家？ - 请问大理“风花雪月”四景中哪个在洱海？ - 请问世界十大高峰中有几座属于喜马拉雅山脉？ - 请问台湾最高峰是下列哪座山？ - 请问贵州省的简称是？ - 请问妈祖生于何月何日？ - 请问九寨沟国家级自然保护区主要保护对象不包括下列哪种动物？ - 请问承德避暑山庄又名？ - 请问东方明珠电视塔位于上海市的哪一区域？ - 请问以下哪种茶叶不产于武夷山？ - 请问黄鹤楼位于哪座山的山顶上？ - 请问以下哪个选项不是皖南古村落的一员？ - 请问溥仪是在伪满皇宫中的哪一处举行的“登基大典”？ - 请问被誉为“东方夏威夷”的是下列哪个城市？ - 请问沙坡头位于宁夏哪一城市？ - 请问香港现任行政长官是？ - 请问漓江位于属于下列哪一流域？ - 漓江风景区的“两洞”不包含下列哪个选项？ - 请问“神农”指的是哪位上古部落首领？ - 请问乔家大院又名？ - 请问中国唯一仍存在的母系氏族社会存在于哪一人群中？ - 请问青海湖在青藏高原的哪一区域？ - 请问岳阳楼位于湖南省哪一城市？ - 请问漓江属于珠江流域哪一水系？ - 请问长白山不是下列哪条河流的发源地？ - 请问云冈石窟始建于哪一朝代？ - 请问岳阳楼中的三醉亭得名于以下哪位人物？ - 请问布达拉宫是第五套人民币哪一面值纸币的背面图案？ - 请问名句“旧时王谢堂前燕，飞入寻常百姓家”出自于哪位诗人之手？ - 请问名句“气蒸云梦泽，波撼岳阳城”中的“云梦泽”指的是？ - 请问末代皇帝溥仪的生父叫什么？ - 请问产于杭州西湖附近的名茶是下列哪种茶？ - 请问世界第二高峰是？ - 请问九寨沟位于四川省哪一区域？ - 请问名句“慈恩塔下题名处，十七人中最少年”出自于哪位诗人之手？';
        var trip_answerArrayString = '龙门石窟+莫高窟+麦积山石窟 - 北极村+天涯海角+喀纳斯湖 - 神农顶+神农鼎+神农定 - 云雾+奇松+冬雪 - 居庸关+山海关+嘉峪关 - 昙耀五窟+昙耀四窟+昙耀六窟 - 山形+强行命名+水势 - 清朝+明朝+元朝 - 穗+羊+蓉 - 李斯+赵高+章邯 - 岷江+汉水+金沙江 - 亚热带季风气候+热带季风气候+温带季风气候 - 二指+三指+四指 - 10元+5元+1元 - 泰山+嵩山+恒山 - 桃花江+梨花江+杏花江 - 阿勒泰+喀什+和田 - 松赞干布+朗日松赞+贡松贡赞 - 李晛+李德旺+李元昊 - 贵州+广西+云南 - 北魏+西汉+东汉 - 9+8+7 - 俄罗斯+哈萨克斯坦+朝鲜 - 妈港+香岛+东方之珠 - 朱棣+朱允炆+朱由校 - 九座村寨+九个湖泊+九座山峰 - 密云+海淀+大兴 - 三+二+一 - 光绪+康熙+乾隆 - 西宁+海东+格尔木 - 大庸+大勇+大雍 - 白鹿洞书院+岳麓书院+天府书院 - 宋庆龄+毛泽东+邓小平 - ICAC+ACIC+ICBC - 黄河+长江+海河 - 《红色娘子军》+《白毛女》+《狼牙山五壮士》 - 耿华+耿秋+耿强 - 青海湖+洞庭湖+鄱阳湖 - 沈阳+天津+北京 - 溥仪+光绪+同治 - 2000年+1999年+1998年 - 白宫和红宫+白宫和蓝宫+红宫和蓝宫 - 夏至+冬至+春分 - 九龙瀑+八龙瀑+七龙瀑 - 粤+港+澳 - 秦皇岛+石家庄+张家口 - 渝+川+蜀 - 丹霞地貌+喀斯特地貌+雅丹地貌 - 黄浦区+浦东新区+静安区 - 71米+100米+82米 - 大理古城+丽江古城+平遥古城 - 乐山+成都+绵阳 - 汴京+长安+镐京 - 两山都有+龙门山+香山 - 燕京+奉天+盛京 - 吐鲁番盆地+塔里木盆地+准噶尔盆地 - 青彩瓷+青花瓷+玲珑瓷 - 狗不理包子+豆汁+烤全羊 - 东陵峡+瞿塘峡+巫峡 - 安顺+贵阳+遵义 - 鄂尔多斯+呼和浩特+二连浩特 - 乌鲁木齐+伊宁+克拉玛依 - 秦淮河+汉水+钱塘江 - 安徽+湖北+江西 - 葡萄牙语+英语+西班牙语 - 白云峰+将军峰+少女峰 - 1999年+1998年+1997年 - 黄帝+炎帝+蚩尤 - 九连山+八连山+七连山 - 崔颢+崔颐+崔项 - 巴音布鲁克大草原+火焰山+葡萄沟 - 5个+4个+3个 - 北魏+北宋+北汉 - 圣保罗教堂+圣保罗饭店+圣保罗餐厅 - 香葛+香瓜+香蕉 - 嘉义+台北+台中 - 明清+唐宋+元明 - 长江+黄河+嘉陵江 - 努尔哈赤+皇太极+顺治 - 李白+杜甫+孟浩然 - 交泰殿+太和殿+中和殿 - 仲登+伯登+叔登 - 沧州+保定+天津 - 张掖+天水+兰州 - 黄果树瀑布+赤水+壶口瀑布 - 吉林+黑龙江+内蒙古 - 黄鹤楼+滕王阁+岳阳楼 - 林默+林夕+林觉 - 明朝+清朝+民国 - 秦始皇+秦二世+汉高祖 - 海南藏族自治州+海北藏族自治州+玉树藏族自治州 - 漓山+离山+丽山 - 九龙半岛+新界+深圳 - 南京+苏州+无锡 - 热带季风性气候+温带大陆性气候+温带季风性气候 - 黄岗峰+红岗峰+蓝岗峰 - 苏轼+苏辙+苏洵 - 黎族+傈僳族+壮族 - 27次+28次+29次 - 洋紫荆花+莲花+梅花 - 广州+深圳+汕头 - 丽江+大理+昆明 - 拉鲁岛+赫鲁岛+尼鲁岛 - 瓷都+古都+鬼都 - 回族+壮族+维吾尔族 - 寒温带季风性气候+寒带季风性气候+温带季风性气候 - 黔东南+贵州+毕节 - 摩天轮+摄像头+过山车 - 高原湿润气候+温带大陆性气候+寒带大陆性气候 - 2001年+2002年+2000年 - 南投+垦丁+屏东 - 跋陀+佛陀+弥陀 - 祁县+平遥县+灵石县 - 沪+宁+杭 - 西安+宝鸡+延安 - 朱熹+朱棣+朱由检 - 大同+晋中+太原 - 皇太极+努尔哈赤+顺治 - 永乐桥+金刚桥+狮子林桥 - 双十二事变+大隧道惨案+重庆谈判 - 十六国+秦朝+汉朝 - 中卫+银川+兰州 - 张明山+张阴山+张庐山 - 张家界+神农架+九嶷山 - 11层+12层+10层 - 云南+四川+西藏 - 南半湖+北半湖+西半湖 - 玉树+西宁+海北 - 裸鲤+锦鲤+江豚 - 英国+法国+德国 - 李白+刘禹锡+白居易 - 喀斯特地貌+雅丹地貌+丹霞地貌 - 1580年+1480年+1780年 - 洛阳市+桂林市+阳朔县 - 不咸山+不甜山+不苦山 - 回族+黎族+苗族 - 昆明+大理+丽江 - 王献臣+陈之遴+徐灿 - 石头+名人+植被 - 白居易+贺知章+高适 - 1987年+1985年+1986年 - 道士+科学家+和尚 - 李元昊+李谅祚+李世民 - 玄奘+李治+武则天 - 腾格里沙漠+塔克拉玛干沙漠+撒哈拉沙漠 - 越南+缅甸+老挝 - 台儿庄古城+趵突泉+大明湖 - 佛教+道教+伊斯兰教 - 林巧稚+陈嘉庚+马约翰 - 妈祖+娘祖+爹祖 - 北京+天津+洛阳 - 洛阳+开封+郑州 - 嵩山+泰山+华山 - 帝都+魔都+申城 - 杭州+宁波+温州 - 西陵峡+瞿塘峡+巫峡 - 登封+开封+洛阳 - 17世纪+18世纪+16世纪 - 白云晚望+粤台秋月+石门返照 - 两者都有+呼伦湖+贝尔湖 - 人与生物圈自然保护区+人与生物自然保护区+生物圈与人自然保护区 - 鄱阳湖+洞庭湖+太湖 - 泰山+衡山+华山 - 忽必烈+铁木真+托雷 - 范仲淹+辛弃疾+欧阳修 - 联峰山公园+老虎石海上公园+鸽子窝公园 - 中山东一路+南京路+九江路 - 春城+羊城+花城 - 谢安+谢晋+谢霆锋 - 海河+永定河+黄河 - 滇越铁路+兰新铁路+青藏铁路 - 梵文+拉丁文+希伯来文 - 52+51+50 - 第一+第二+第三 - 福建莆田+澳门+香港 - 鲤鱼门+鲫鱼门+锦鲤门 - 高山青，涧水蓝+高山青，湖水蓝+高山青，河水蓝 - 苗族+侗族+傈僳族 - 东山宾馆+西山宾馆+南山宾馆 - 济南+青岛+威海 - 太阳湾+亚龙湾+月亮湾 - 广州+深圳+珠海 - 回族+裕固族+保安族 - 长春+吉林+白城 - 慈恩寺+法门寺+少林寺 - 天门山+地门山+大庸山 - 窑洞+平地吊脚楼+斜坡吊脚楼 - 1997年+1998年+1999年 - 阿凡达+阿丽达+阿骨打 - 渝+川+庆 - 蓉城+山城+雾都 - 三亚+海口+三沙 - 苏州+无锡+常州 - 九江+南昌+吉安 - 皇帝年号+皇帝名讳+皇帝爱妃名讳 - 铁木真+元太祖+成吉思汗 - 陈建斌+张铁林+张国立 - 三个+两个+四个 - 邹族+阿美族+布农族 - 湖南+重庆+湖北 - 吐鲁番+乌鲁木齐+奎屯 - 六分之一+十分之一+八分之一 - 乾隆+康熙+雍正 - 元阳县+腾冲市+石林县 - 沈阳故宫+曲阜孔庙+承德避暑山庄 - 俄语+日语+英语 - 大连+沈阳+青岛 - 西施+西门庆+西瓜 - 避暑山庄+北戴河+山海关 - 赤水丹霞+七彩丹霞+冰沟丹霞 - 乌镇+古北水镇+周庄 - 尼泊尔+不丹+缅甸 - 鄂温克族+蒙古族+藏族 - 89年+90年+91年 - 大明湖+千佛洞+趵突泉 - 青海+甘肃+山西 - 午门+神武门+东华门 - 甘州+肃州+西域 - 戴河以北+戴河以南+戴河以东 - 蒙古语+藏语+维吾尔语 - 山海关+居庸关+雁门关 - 天游峰+九曲溪+水帘洞 - 喜马拉雅山+昆仑山+天山 - 杜甫+李白+白居易 - 舟山岛+台湾岛+海南岛 - 贵阳+凯里+遵义 - 拙政园+留园+豫园 - 三+二+一 - 漠河+黑河+哈尔滨 - 满语+朝鲜语+蒙语 - 厦门+福州+泉州 - 长颈鹿+藏羚羊+野牦牛 - 贺兰山+阴山+天山 - 毛泽东+康有为+泰戈尔 - 嘉兴+杭州+绍兴 - 毛泽东+周恩来+叶剑英 - 朝鲜+韩国+俄罗斯 - 麻花+炸糕+包子 - 月+风+花 - 九+十+七 - 玉山+阿里山+台东山 - 黔+黑+阳 - 农历三月廿三+农历二月初二+农历一月十八 - 翠鸟+大熊猫+金丝猴 - 热河行宫+冷河行宫+温河行宫 - 陆家嘴+南京路+静安寺 - 普洱+大红袍+金骏眉 - 蛇山+龙山+虎山 - 运村+宏村+西递 - 勤民楼+缉熙楼+同德殿 - 三亚+海口+琼州 - 中卫+银川+吴忠 - 林郑月娥+梁振英+曾荫权 - 珠江流域+长江流域+黄河流域 - 八星岩+芦笛岩+七星岩 - 炎帝+黄帝+蚩尤 - 在中堂+在西堂+在东堂 - 摩梭人+白族人+黎族人 - 东北部+西北部+西南部 - 岳阳+衡阳+长沙 - 西江水系+北江水系+东江水系 - 黑龙江+松花江+鸭绿江 - 北魏+西汉+唐朝 - 吕洞宾+何仙姑+欧阳修 - 50元+100元+20元 - 刘禹锡+李白+白居易 - 洞庭湖+鄱阳湖+巢湖 - 载沣+载湉+载洵 - 龙井+碧螺春+铁观音 - 乔戈里峰+珠穆朗玛峰+慕士塔格峰 - 阿坝藏族羌族自治州+成都市+甘孜藏族自治州 - 白居易+孟浩然+刘禹锡';
        this.trip_indexArray = trip_indexArrayString.split(" - ");
        this.trip_questionArray = trip_questionArrayString.split(" - ");
        this.trip_answerArray = trip_answerArrayString.split(" - ");
    },

    //added by qll on 20200114
    getQAIndex: function getQAIndex(type, QAPath) {
        if (type == 0) //旅游
            {
                var len = this.trip_indexArray.length;
                for (var i = 0; i < len; i++) {
                    if (this.trip_indexArray[i] == QAPath) {
                        return i;
                    }
                }
            }
        if (type == 1) //打工
            {
                var len = this.work_indexArray.length;
                for (var _i = 0; _i < len; _i++) {
                    if (this.work_indexArray[_i] == QAPath) {
                        return _i;
                    }
                }
            }
    },

    onLoad: function onLoad() {
        this.getQAArray(); //added by qll on 20200114
        this.confirmBtn.node.on('click', this.onClickConfirmBtn, this);
        this.wrongPrompt.getChildByName('closeButton').on('click', this.onClickCloseBtn, this.wrongPrompt);
        this.correctPrompt.getChildByName('closeButton').on('click', this.onClickCloseBtn, this.correctPrompt);
    },

    /**
     * 答题提示框初始化
     * @param {integer} type 0,1 分别代表旅游或者工作
     * @param {integer} id 代表旅游地点或者工作种类
     */
    init: function init(type, id, QANum, picNum) {
        this.getQAArray(); //added by qll on 20200114
        this.type = type;
        if (type == 0) //旅游
            {
                this.picPath += id + '/' + picNum;
                this.QAPath = id + '/' + picNum + '/' + QANum + '.txt';
                console.log(this.QAPath);
                console.log(this.picPath);
            }
        if (type == 1) //打工
            {
                this.picPath += id + '/' + picNum;
                this.QAPath = id + '/' + QANum + '.txt';
                console.log(this.QAPath);
                console.log(this.picPath);
            }
        this.QAIndex = this.getQAIndex(type, this.QAPath);
        if (type == 0) //旅游
            {
                this.QAquestion = this.trip_questionArray[this.QAIndex];
                this.QAanswer = this.trip_answerArray[this.QAIndex].split('+');
            }
        if (type == 1) //打工
            {
                this.QAquestion = this.work_questionArray[this.QAIndex];
                this.QAanswer = this.work_answerArray[this.QAIndex].split('+');
            }
        this.question.string = this.QAquestion;
        this.choice1.string = this.QAanswer[0];
        this.choice2.string = this.QAanswer[1];
        this.choice3.string = this.QAanswer[2];

        var self = this;
        cc.loader.loadRes(self.picPath, cc.SpriteFrame, function (err, sp) {
            if (err) {
                console.log("failed to load picture");
            }
            self.picture.spriteFrame = sp;
        });
    },

    onClickConfirmBtn: function onClickConfirmBtn() {
        var choiceArray = this.choiceContainer.getComponentsInChildren(cc.Toggle);
        for (var i = 0; i < choiceArray.length; i++) {
            var element = choiceArray[i];
            if (element.isChecked) {
                if (i == 0) {
                    // 判断是否是正确答案，答案选项尚未随机
                    this.title.node.parent.active = false; // 关闭提示框
                    this.correctPrompt.active = true;
                } else {
                    this.title.node.parent.active = false; // 关闭提示框
                    this.wrongPrompt.active = true;
                    var correctAnswer = this.choice1.string;
                    this.wrongPrompt.getChildByName('promptText').getComponent(cc.Label).string += correctAnswer;
                }
            }
        }
    },

    onClickCloseBtn: function onClickCloseBtn() {
        this.active = false;
    },

    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();