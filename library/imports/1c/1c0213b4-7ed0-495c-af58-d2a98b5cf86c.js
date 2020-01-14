"use strict";
cc._RF.push(module, '1c021O0ftBJXK9Y0qmLXPhs', 'frogBtn');
// Global/frogBtn.js

'use strict';

var frog = {
    bodyWidth: 45,
    bodyHeight: 33,
    eyeRadius: 15,
    innerEyeRadius: 12,
    pupilRadius: 8,
    eyePosX: 20,
    eyePosY: 32,
    mouthPosX: 0,
    mouthPosY: 15,
    mouthLength: 12, // 按钮打开时候的嘴长度
    mouthCloseRadius: 12, // 按钮关闭时候的嘴半径
    status: 1,
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
        ctx: cc.Graphics
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
        this.ctx.moveTo(frog.eyePosX - frog.pupilRadius, frog.eyePosY);
        this.ctx.quadraticCurveTo(frog.eyePosX, frog.eyePosY - frog.pupilRadius, frog.eyePosX + frog.pupilRadius, frog.eyePosY);
        this.ctx.stroke();

        this.ctx.moveTo(-frog.eyePosX - frog.pupilRadius, frog.eyePosY);
        this.ctx.quadraticCurveTo(-frog.eyePosX, frog.eyePosY - frog.pupilRadius, -frog.eyePosX + frog.pupilRadius, frog.eyePosY);
        this.ctx.stroke();
    },

    drawFrogOpenMouth: function drawFrogOpenMouth() {
        this.ctx.fillColor = new cc.Color().fromHEX(frog.mouthColor);
        this.ctx.moveTo(0 - frog.innerEyeRadius, frog.mouthPosY);
        this.ctx.lineTo(0 - frog.innerEyeRadius, frog.mouthPosY - frog.mouthLength);
        this.ctx.quadraticCurveTo(0, frog.mouthPosY - frog.mouthLength - 10, frog.innerEyeRadius, frog.mouthPosY - frog.mouthLength);
        this.ctx.lineTo(frog.innerEyeRadius, frog.mouthPosY);
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
        if (frog.status == 0) {
            var flag = parseInt(Math.random() * 3);
            if (flag == 0) {
                self.drawFrogOpenEye(pos1.x, pos1.y);
            } else if (flag == 1) {
                self.drawFrogOpenEye(pos2.x, pos2.y);
            } else if (flag == 2) {
                self.drawFrogOpenEye(pos3.x, pos3.y);
            }
            self.drawFrogOpenMouth();
        } else {
            self.drawFrogCloseEye();
            if (frog.mouthCloseRadius < 8) {
                frog.mouthCloseRadius++;
            } else if (frog.mouthCloseRadius >= 12) {
                frog.mouthCloseRadius--;
            }
            self.drawFrogCloseMouth();
        }
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var self = this;
        this.updateID = setInterval(self.drawFrog, 400, self);
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();