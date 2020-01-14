(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Global/frogBtn.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1c021O0ftBJXK9Y0qmLXPhs', 'frogBtn', __filename);
// Global/frogBtn.js

'use strict';

var frog = {
    bodyWidth: 45,
    bodyHeight: 33,
    eyeRadius: 15,
    closeEyeRadius: 8,
    innerEyeRadius: 12,
    pupilRadius: 8,
    eyePosX: 20,
    eyePosY: 32,
    mouthPosX: 0,
    mouthPosY: 15,
    mouthLength: 12, // 按钮打开时候的嘴长度
    mouthHeight: 12,
    mouthCloseRadius: 12, // 按钮关闭时候的嘴半径
    bodyColor: '#A3D768',
    eyeColor: '#ffffff',
    innerEyeColor: '#3F6A34',
    mouthColor: '#ec7977',
    tongueColor: '#C71F1C',
    salivaColor: '#01f3d3'
};

cc.Class({
    extends: cc.Component,

    properties: {
        ctx: cc.Graphics,
        updateTime: 800,
        status: {
            get: function get() {
                return this._status;
            },
            set: function set(value) {
                if (this._status == 2 && value == 1) {
                    this._status = 1;
                    console.log(this.ctx.node.getComponent(cc.Button));
                    this.ctx.node.getComponent(cc.Button).interactable = true;
                } else if (this._status == 3 && value == 0) {
                    this._status = 0;
                    this.ctx.node.getComponent(cc.Button).interactable = true;
                } else if (this._status == 1 && value == 0) {
                    this._status = 3;
                    this.ctx.node.getComponent(cc.Button).interactable = false;
                } else if (this._status == 0 && value == 1) {
                    this._status = 2;
                    this.ctx.node.getComponent(cc.Button).interactable = false;
                } else {
                    // 初始赋值
                    this._status = value;
                    if (value == 0) {
                        frog.innerEyeRadius = 12;
                        frog.pupilRadius = 8;
                    } else if (value == 1) {
                        frog.innerEyeRadius = 6;
                        frog.pupilRadius = 4;
                    }
                }
            }
        }
    },

    drawFrogBack: function drawFrogBack() {
        this.ctx.fillColor = new cc.Color().fromHEX(frog.bodyColor);
        this.ctx.ellipse(0, 0, frog.bodyWidth, frog.bodyHeight);
        this.ctx.fill();
        this.ctx.circle(frog.eyePosX, frog.eyePosY, frog.eyeRadius);
        this.ctx.fill();
        this.ctx.circle(-frog.eyePosX, frog.eyePosY, frog.eyeRadius);
        this.ctx.fill();
    },

    drawFrogOpenEye: function drawFrogOpenEye(offsetX, offsetY) {
        this.ctx.fillColor = new cc.Color().fromHEX(frog.eyeColor);
        this.ctx.circle(frog.eyePosX, frog.eyePosY, frog.innerEyeRadius);
        this.ctx.fill();
        this.ctx.circle(-frog.eyePosX, frog.eyePosY, frog.innerEyeRadius);
        this.ctx.fill();

        this.ctx.fillColor = new cc.Color().fromHEX(frog.innerEyeColor);
        this.ctx.circle(frog.eyePosX, frog.eyePosY, frog.pupilRadius);
        this.ctx.fill();
        this.ctx.circle(-frog.eyePosX, frog.eyePosY, frog.pupilRadius);
        this.ctx.fill();

        this.ctx.fillColor = new cc.Color().fromHEX(frog.eyeColor);
        this.ctx.circle(frog.eyePosX + offsetX, frog.eyePosY + offsetY, 3);
        // this.ctx.circle(frog.eyePosX - 5, frog.eyePosY + 1, 2.5);
        this.ctx.fill();
        this.ctx.circle(-frog.eyePosX + offsetX, frog.eyePosY + offsetY, 3);
        // this.ctx.circle(-frog.eyePosX - 5, frog.eyePosY + 1, 2.5);
        this.ctx.fill();
    },

    drawFrogCloseEye: function drawFrogCloseEye() {
        this.ctx.strokeColor = new cc.Color().fromHEX(frog.innerEyeColor);
        this.ctx.lineWidth = 3;
        this.ctx.moveTo(frog.eyePosX - frog.closeEyeRadius, frog.eyePosY);
        this.ctx.quadraticCurveTo(frog.eyePosX, frog.eyePosY - frog.closeEyeRadius, frog.eyePosX + frog.closeEyeRadius, frog.eyePosY);
        this.ctx.stroke();

        this.ctx.moveTo(-frog.eyePosX - frog.closeEyeRadius, frog.eyePosY);
        this.ctx.quadraticCurveTo(-frog.eyePosX, frog.eyePosY - frog.closeEyeRadius, -frog.eyePosX + frog.closeEyeRadius, frog.eyePosY);
        this.ctx.stroke();
    },

    drawFrogOpenMouth: function drawFrogOpenMouth() {
        this.ctx.fillColor = new cc.Color().fromHEX(frog.mouthColor);
        this.ctx.moveTo(0 - frog.mouthHeight, frog.mouthPosY);
        this.ctx.lineTo(0 - frog.mouthHeight, frog.mouthPosY - frog.mouthLength);
        this.ctx.quadraticCurveTo(0, frog.mouthPosY - frog.mouthLength - 10, frog.mouthHeight, frog.mouthPosY - frog.mouthLength);
        this.ctx.lineTo(frog.mouthHeight, frog.mouthPosY);
        this.ctx.close();
        this.ctx.fill();
    },

    drawFrogCloseMouth: function drawFrogCloseMouth() {
        this.ctx.fillColor = new cc.Color().fromHEX(frog.innerEyeColor);
        this.ctx.ellipse(frog.mouthPosX, frog.mouthPosY - 10, frog.mouthCloseRadius * 2 / 3, frog.mouthCloseRadius);
        this.ctx.fill();
    },

    drawFrog: function drawFrog(self) {
        var pos1 = cc.v2(-5, 0);
        var pos2 = cc.v2(0, 5);
        var pos3 = cc.v2(5, 0);

        self.drawFrogBack();
        if (self.status == 0) {
            var flag = parseInt(Math.random() * 3);
            if (flag == 0) {
                // button is open
                self.drawFrogOpenEye(pos1.x, pos1.y);
            } else if (flag == 1) {
                self.drawFrogOpenEye(pos2.x, pos2.y);
            } else if (flag == 2) {
                self.drawFrogOpenEye(pos3.x, pos3.y);
            }
            self.drawFrogOpenMouth();
        } else if (self.status == 1) {
            // button is close
            self.drawFrogCloseEye();
            frog.mouthCloseRadius--;
            if (frog.mouthCloseRadius < 8) {
                frog.mouthCloseRadius = 12;
            }
            self.drawFrogCloseMouth();
        } else if (self.status == 2) {
            // button turn off
            self.drawFrogOpenEye(5, 0);
            self.drawFrogOpenMouth();
            frog.innerEyeRadius -= 3;
            frog.pupilRadius -= 2;
            if (frog.pupilRadius <= 4 || frog.innerEyeRadius <= 6) {
                frog.innerEyeRadius = 6;
                frog.pupilRadius = 4;
                self.status = 1;
            }
        } else if (self.status == 3) {
            // button turn on
            frog.innerEyeRadius += 3;
            frog.pupilRadius += 2;
            self.drawFrogOpenEye(5, 0);
            self.drawFrogCloseMouth();
            if (frog.pupilRadius >= 8 || frog.innerEyeRadius >= 12) {
                frog.innerEyeRadius = 12;
                frog.pupilRadius = 8;
                self.status = 0;
            }
        }
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var self = this;
        this.updateID = setInterval(self.drawFrog, self.updateTime, self);
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
        //# sourceMappingURL=frogBtn.js.map
        