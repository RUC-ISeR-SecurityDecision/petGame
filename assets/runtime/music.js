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
        audio1: {
            default: null,
            type: cc.AudioClip
        },
        audio2: {
            default: null,
            type: cc.AudioClip
        },
        audio3: {
            default: null,
            type: cc.AudioClip
        },
        audio4: {
            default: null,
            type: cc.AudioClip
        },
        audio5: {
            default: null,
            type: cc.AudioClip
        },
        audio6: {
            default: null,
            type: cc.AudioClip
        },
        flagBgMusic: {
            default: 0,
            type: cc.Integer
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        //获得标志位、曲目编号和音量
        //var bgMusicNum = str(GlobalData.bgMusicNum);
        //var bgMusicVolume = GlobalData.bgMusicVolume;
        //this.flagBgMusic = GlobalData.flagBgMusic;
        this.flagBgMusic = 1;
        var bgMusicNum = 3;
        var bgMusicVolume = 1;
        var audioPlayed = null;
        switch(bgMusicNum)
        {
            case 1:
                audioPlayed = this.audio1;
                break;
            case 2:
                audioPlayed = this.audio2;
                break;
            case 3:
                audioPlayed = this.audio3;
                break;
            case 4:
                audioPlayed = this.audio4;
                break;
            case 5:
                audioPlayed = this.audio5;
                break;
            case 6:
                audioPlayed = this.audio6;
                break;
            default:
                console.log("Wrong bgmusic number")
        }
        if(this.flagBgMusic == 1)
        {
            this.current = cc.audioEngine.play(audioPlayed, true, bgMusicVolume);
        }
    },

    onDestroy: function () {
        if(this.flagBgMusic == 1)
        {
            cc.audioEngine.stop(this.current);
        }
    },

    start () {

    },

    // update (dt) {},
});
