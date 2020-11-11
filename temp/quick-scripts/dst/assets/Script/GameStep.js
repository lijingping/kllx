
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameStep.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cf803qligpD3LYrN7Q/987O', 'GameStep');
// Script/GameStep.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Utils = require("./common/Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameStep = /** @class */ (function (_super) {
    __extends(GameStep, _super);
    function GameStep() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_spa_list = null;
        _this.m_n_bigstepcontent = null;
        _this.m_sp_mystepicon = null;
        _this.m_sp_mystepname = null;
        _this.m_n_mystarlist = [];
        _this.m_pre_bigstep = null;
        _this.m_nodepoll = null;
        return _this;
        // update (dt) {}
    }
    /**当前最后排名数 */
    GameStep.prototype.start = function () {
        var len = window.STEP_CONFIG.length;
        this.m_n_bigstepcontent.height = len * 115 + (len - 1) * 20;
        var k = 0;
        for (var i = len - 1; i >= 0; i--) {
            var node = cc.instantiate(this.m_pre_bigstep);
            node.x = 0;
            node.y = -62 - (len - i - 1) * (node.height + 20);
            this.m_n_bigstepcontent.addChild(node);
            var data = window.STEP_CONFIG[i];
            var index = k % 4;
            node.getComponent("BigStepItem").updateData(data, this.m_spa_list.getSpriteFrame(data.icon_path), this.m_spa_list.getSpriteFrame(data.desc_path), window.INIT_GAME_SAVE_DATA.top_level, index);
            k++;
        }
        this.m_n_bigstepcontent.parent.parent.getComponent(cc.ScrollView).scrollToOffset(cc.v2(0, this.m_n_bigstepcontent.height));
        this.initMyData();
    };
    GameStep.prototype.onToggleClick = function (event) {
    };
    GameStep.prototype.initMyData = function () {
        var curlv = window.INIT_GAME_SAVE_DATA.top_level;
        var data = this.getMyStepData(curlv);
        if (data) {
            this.m_sp_mystepicon.spriteFrame = this.m_spa_list.getSpriteFrame(data.icon_path);
            this.m_sp_mystepname.spriteFrame = this.m_spa_list.getSpriteFrame(data.desc_path);
            for (var i = 0; i < this.m_n_mystarlist.length; i++) {
                this.m_n_mystarlist[i].active = i < data.star;
            }
            // this.m_n_mybigstep.getComponent("BigStepItem").updateData(data, this.m_spa_list.getSpriteFrame(data.icon_path), curlv);
        }
        else {
            this.m_sp_mystepicon.spriteFrame = this.m_spa_list.getSpriteFrame("stepicon6");
            this.m_sp_mystepname.spriteFrame = this.m_spa_list.getSpriteFrame("stepname6");
            for (var i = 0; i < this.m_n_mystarlist.length; i++) {
                this.m_n_mystarlist[i].active = i <= 0;
            }
            // this.m_n_mybigstep.getComponent("BigStepItem").updateData(window.STEP_CONFIG[0], this.m_spa_list.getSpriteFrame("stepicon1"), curlv);
        }
    };
    GameStep.prototype.onBackHome = function () {
        Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        cc.director.loadScene(window.MENU_SCENE_NAME);
    };
    /**
     * @description 根据等级获取我的段位数据
     * @author 吴建奋
     * @param {number} lv 等级
     * @memberof GameStep
     */
    GameStep.prototype.getMyStepData = function (lv) {
        var index = Math.floor(lv / 10);
        if (index <= 0) {
            return null;
        }
        else {
            if (index > window.STEP_CONFIG.length)
                index = window.STEP_CONFIG.length;
            return window.STEP_CONFIG[index - 1];
        }
    };
    GameStep.prototype.onDestroy = function () {
        if (this.m_nodepoll) {
            this.m_nodepoll.clear();
        }
    };
    __decorate([
        property(cc.SpriteAtlas)
    ], GameStep.prototype, "m_spa_list", void 0);
    __decorate([
        property(cc.Node)
    ], GameStep.prototype, "m_n_bigstepcontent", void 0);
    __decorate([
        property(cc.Sprite)
    ], GameStep.prototype, "m_sp_mystepicon", void 0);
    __decorate([
        property(cc.Sprite)
    ], GameStep.prototype, "m_sp_mystepname", void 0);
    __decorate([
        property([cc.Node])
    ], GameStep.prototype, "m_n_mystarlist", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameStep.prototype, "m_pre_bigstep", void 0);
    GameStep = __decorate([
        ccclass
    ], GameStep);
    return GameStep;
}(cc.Component));
exports.default = GameStep;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZVN0ZXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHNDQUF5QztBQUVuQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQW1HQztRQWhHRyxnQkFBVSxHQUFtQixJQUFJLENBQUM7UUFJbEMsd0JBQWtCLEdBQVksSUFBSSxDQUFDO1FBR25DLHFCQUFlLEdBQWMsSUFBSSxDQUFDO1FBR2xDLHFCQUFlLEdBQWMsSUFBSSxDQUFDO1FBR2xDLG9CQUFjLEdBQWMsRUFBRSxDQUFDO1FBRy9CLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBRXhCLGdCQUFVLEdBQUcsSUFBSSxDQUFDOztRQTZFMUIsaUJBQWlCO0lBQ3JCLENBQUM7SUE3RUcsYUFBYTtJQUtiLHdCQUFLLEdBQUw7UUFFSSxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUNwQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzVELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQy9CLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJ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RUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtZQUNaLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7YUFBTTtZQUNILElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTTtnQkFDakMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQ3RDLE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRUQsNEJBQVMsR0FBVDtRQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQTlGRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO2dEQUNTO0lBSWxDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7d0RBQ2lCO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7cURBQ2M7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztxREFDYztJQUdsQztRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztvREFDVztJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNZO0lBbkJmLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FtRzVCO0lBQUQsZUFBQztDQW5HRCxBQW1HQyxDQW5HcUMsRUFBRSxDQUFDLFNBQVMsR0FtR2pEO2tCQW5Hb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IFV0aWxzID0gcmVxdWlyZShcIi4vY29tbW9uL1V0aWxzXCIpO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuZGVjbGFyZSB2YXIgd2luZG93OiBhbnk7XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0ZXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUF0bGFzKVxuICAgIG1fc3BhX2xpc3Q6IGNjLlNwcml0ZUF0bGFzID0gbnVsbDtcblxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbV9uX2JpZ3N0ZXBjb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgbV9zcF9teXN0ZXBpY29uOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBtX3NwX215c3RlcG5hbWU6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoW2NjLk5vZGVdKVxuICAgIG1fbl9teXN0YXJsaXN0OiBjYy5Ob2RlW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgbV9wcmVfYmlnc3RlcDogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIHByaXZhdGUgbV9ub2RlcG9sbCA9IG51bGw7XG4gICAgLyoq5b2T5YmN5pyA5ZCO5o6S5ZCN5pWwICovXG5cblxuXG5cbiAgICBzdGFydCgpIHtcblxuICAgICAgICBsZXQgbGVuID0gd2luZG93LlNURVBfQ09ORklHLmxlbmd0aDtcbiAgICAgICAgdGhpcy5tX25fYmlnc3RlcGNvbnRlbnQuaGVpZ2h0ID0gbGVuICogMTE1ICsgKGxlbiAtIDEpICogMjA7XG4gICAgICAgIGxldCBrID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IGxlbiAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubV9wcmVfYmlnc3RlcCk7XG4gICAgICAgICAgICBub2RlLnggPSAwO1xuICAgICAgICAgICAgbm9kZS55ID0gLTYyIC0gKGxlbiAtIGkgLSAxKSAqIChub2RlLmhlaWdodCArIDIwKTtcbiAgICAgICAgICAgIHRoaXMubV9uX2JpZ3N0ZXBjb250ZW50LmFkZENoaWxkKG5vZGUpO1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB3aW5kb3cuU1RFUF9DT05GSUdbaV07XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBrICUgNDtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiQmlnU3RlcEl0ZW1cIikudXBkYXRlRGF0YShkYXRhLCB0aGlzLm1fc3BhX2xpc3QuZ2V0U3ByaXRlRnJhbWUoZGF0YS5pY29uX3BhdGgpLCB0aGlzLm1fc3BhX2xpc3QuZ2V0U3ByaXRlRnJhbWUoZGF0YS5kZXNjX3BhdGgpLCB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS50b3BfbGV2ZWwsIGluZGV4KTtcbiAgICAgICAgICAgIGsrKztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1fbl9iaWdzdGVwY29udGVudC5wYXJlbnQucGFyZW50LmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5zY3JvbGxUb09mZnNldChjYy52MigwLCB0aGlzLm1fbl9iaWdzdGVwY29udGVudC5oZWlnaHQpKTtcbiAgICAgICAgdGhpcy5pbml0TXlEYXRhKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblRvZ2dsZUNsaWNrKGV2ZW50KSB7XG5cbiAgICB9XG5cbiAgICBpbml0TXlEYXRhKCkge1xuICAgICAgICBsZXQgY3VybHYgPSB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS50b3BfbGV2ZWw7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXRNeVN0ZXBEYXRhKGN1cmx2KTtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMubV9zcF9teXN0ZXBpY29uLnNwcml0ZUZyYW1lID0gdGhpcy5tX3NwYV9saXN0LmdldFNwcml0ZUZyYW1lKGRhdGEuaWNvbl9wYXRoKTtcbiAgICAgICAgICAgIHRoaXMubV9zcF9teXN0ZXBuYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5tX3NwYV9saXN0LmdldFNwcml0ZUZyYW1lKGRhdGEuZGVzY19wYXRoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tX25fbXlzdGFybGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMubV9uX215c3Rhcmxpc3RbaV0uYWN0aXZlID0gaSA8IGRhdGEuc3RhcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRoaXMubV9uX215Ymlnc3RlcC5nZXRDb21wb25lbnQoXCJCaWdTdGVwSXRlbVwiKS51cGRhdGVEYXRhKGRhdGEsIHRoaXMubV9zcGFfbGlzdC5nZXRTcHJpdGVGcmFtZShkYXRhLmljb25fcGF0aCksIGN1cmx2KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubV9zcF9teXN0ZXBpY29uLnNwcml0ZUZyYW1lID0gdGhpcy5tX3NwYV9saXN0LmdldFNwcml0ZUZyYW1lKFwic3RlcGljb242XCIpO1xuICAgICAgICAgICAgdGhpcy5tX3NwX215c3RlcG5hbWUuc3ByaXRlRnJhbWUgPSB0aGlzLm1fc3BhX2xpc3QuZ2V0U3ByaXRlRnJhbWUoXCJzdGVwbmFtZTZcIik7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubV9uX215c3Rhcmxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbl9teXN0YXJsaXN0W2ldLmFjdGl2ZSA9IGkgPD0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRoaXMubV9uX215Ymlnc3RlcC5nZXRDb21wb25lbnQoXCJCaWdTdGVwSXRlbVwiKS51cGRhdGVEYXRhKHdpbmRvdy5TVEVQX0NPTkZJR1swXSwgdGhpcy5tX3NwYV9saXN0LmdldFNwcml0ZUZyYW1lKFwic3RlcGljb24xXCIpLCBjdXJsdik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIG9uQmFja0hvbWUoKSB7XG4gICAgICAgIFV0aWxzLlNldFNvdW5kRWZmZWN0KHdpbmRvdy5CVVRUT05fQ0xJQ0tfTVVTSUMsIGZhbHNlLCAxKTtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKHdpbmRvdy5NRU5VX1NDRU5FX05BTUUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDmoLnmja7nrYnnuqfojrflj5bmiJHnmoTmrrXkvY3mlbDmja5cbiAgICAgKiBAYXV0aG9yIOWQtOW7uuWli1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsdiDnrYnnuqdcbiAgICAgKiBAbWVtYmVyb2YgR2FtZVN0ZXBcbiAgICAgKi9cbiAgICBnZXRNeVN0ZXBEYXRhKGx2OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcihsdiAvIDEwKTtcbiAgICAgICAgaWYgKGluZGV4IDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGluZGV4ID4gd2luZG93LlNURVBfQ09ORklHLmxlbmd0aClcbiAgICAgICAgICAgICAgICBpbmRleCA9IHdpbmRvdy5TVEVQX0NPTkZJRy5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LlNURVBfQ09ORklHW2luZGV4IC0gMV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLm1fbm9kZXBvbGwpIHtcbiAgICAgICAgICAgIHRoaXMubV9ub2RlcG9sbC5jbGVhcigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=