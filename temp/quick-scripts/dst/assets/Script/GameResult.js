
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameResult.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '837bfcDQspAUrwybQW0KLaf', 'GameResult');
// Script/GameResult.js

"use strict";

var RankList = require("RankList");

var Utils = require("Utils");

var ShareSdk = require("ShareSdk");

cc.Class({
  "extends": cc.Component,
  properties: {
    m_n_fail: cc.Node,
    m_sp_titlef: cc.Node,
    m_btn_again: cc.Node,
    m_btn_share: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {},
  showVictory: function showVictory(score) {},
  showFail: function showFail(num, score, monster_num) {
    this._score = score;
    this._monster_num = monster_num;
    this.node.active = true;
    this.m_n_fail.active = true;
    this.m_n_fail.y = -cc.winSize.height / 2;
    this.m_n_fail.runAction(cc.sequence(cc.moveTo(0.5, 0, 0).easing(cc.easeIn(3.0)), cc.callFunc(function () {})));
    this.m_sp_titlef.stopAllActions();
    this.m_sp_titlef.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.5, 0, 10), cc.moveBy(0.5, 0, -10))));
    this.m_btn_again.active = true;
    this.m_btn_share.active = true;
    RankList.showGameResultList();
  },
  onBackToMenu: function onBackToMenu() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    cc.director.loadScene(window.MENU_SCENE_NAME);
  },
  onAgainPlay: function onAgainPlay() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    cc.director.loadScene(window.GAME_SCENE_NAME);
  },
  onResultShare: function onResultShare() {
    var text = "\u5B9D\u5B9D\u8981\u54ED\u6655\u5728\u5C71\u4E0A\u4E86\uFF0C\u5FEB\u6765\u5E2E\u5E2E\u5B83\uFF01";
    ShareSdk.shareAppMessage({
      title: text,
      imageUrl: window.tempFileURL[2],
      success: function success(res) {},
      fail: function fail(err) {},
      complate: function complate(msg) {}
    });
  } // onEnable(){
  // },
  // update (dt) {},

});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZVJlc3VsdC5qcyJdLCJuYW1lcyI6WyJSYW5rTGlzdCIsInJlcXVpcmUiLCJVdGlscyIsIlNoYXJlU2RrIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJtX25fZmFpbCIsIk5vZGUiLCJtX3NwX3RpdGxlZiIsIm1fYnRuX2FnYWluIiwibV9idG5fc2hhcmUiLCJzdGFydCIsInNob3dWaWN0b3J5Iiwic2NvcmUiLCJzaG93RmFpbCIsIm51bSIsIm1vbnN0ZXJfbnVtIiwiX3Njb3JlIiwiX21vbnN0ZXJfbnVtIiwibm9kZSIsImFjdGl2ZSIsInkiLCJ3aW5TaXplIiwiaGVpZ2h0IiwicnVuQWN0aW9uIiwic2VxdWVuY2UiLCJtb3ZlVG8iLCJlYXNpbmciLCJlYXNlSW4iLCJjYWxsRnVuYyIsInN0b3BBbGxBY3Rpb25zIiwicmVwZWF0Rm9yZXZlciIsIm1vdmVCeSIsInNob3dHYW1lUmVzdWx0TGlzdCIsIm9uQmFja1RvTWVudSIsIlNldFNvdW5kRWZmZWN0Iiwid2luZG93IiwiQlVUVE9OX0NMSUNLX01VU0lDIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJNRU5VX1NDRU5FX05BTUUiLCJvbkFnYWluUGxheSIsIkdBTUVfU0NFTkVfTkFNRSIsIm9uUmVzdWx0U2hhcmUiLCJ0ZXh0Iiwic2hhcmVBcHBNZXNzYWdlIiwidGl0bGUiLCJpbWFnZVVybCIsInRlbXBGaWxlVVJMIiwic3VjY2VzcyIsInJlcyIsImZhaWwiLCJlcnIiLCJjb21wbGF0ZSIsIm1zZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxRQUFRLEdBQUdDLE9BQU8sQ0FBQyxVQUFELENBQXRCOztBQUNBLElBQUlDLEtBQUssR0FBR0QsT0FBTyxDQUFDLE9BQUQsQ0FBbkI7O0FBQ0EsSUFBSUUsUUFBUSxHQUFHRixPQUFPLENBQUMsVUFBRCxDQUF0Qjs7QUFDQUcsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxh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R0FBRyxFQUFJLENBRVosQ0FSb0I7QUFTckJDLE1BQUFBLFFBQVEsRUFBRSxrQkFBQUMsR0FBRyxFQUFJLENBRWhCO0FBWG9CLEtBQXpCO0FBYUgsR0EvREksQ0FpRUw7QUFFQTtBQUVBOztBQXJFSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUmFua0xpc3QgPSByZXF1aXJlKFwiUmFua0xpc3RcIik7XG52YXIgVXRpbHMgPSByZXF1aXJlKFwiVXRpbHNcIik7XG52YXIgU2hhcmVTZGsgPSByZXF1aXJlKFwiU2hhcmVTZGtcIik7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBtX25fZmFpbDogY2MuTm9kZSxcbiAgICAgICAgbV9zcF90aXRsZWY6IGNjLk5vZGUsXG4gICAgICAgIG1fYnRuX2FnYWluOiBjYy5Ob2RlLFxuICAgICAgICBtX2J0bl9zaGFyZTogY2MuTm9kZSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCgpIHtcblxuICAgIH0sXG5cbiAgICBzaG93VmljdG9yeShzY29yZSkge1xuXG4gICAgfSxcblxuICAgIHNob3dGYWlsKG51bSwgc2NvcmUsIG1vbnN0ZXJfbnVtKSB7XG4gICAgICAgIHRoaXMuX3Njb3JlID0gc2NvcmU7XG4gICAgICAgIHRoaXMuX21vbnN0ZXJfbnVtID0gbW9uc3Rlcl9udW07XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLm1fbl9mYWlsLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMubV9uX2ZhaWwueSA9IC1jYy53aW5TaXplLmhlaWdodCAvIDI7XG4gICAgICAgIHRoaXMubV9uX2ZhaWwucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVUbygwLjUsIDAsIDApLmVhc2luZyhjYy5lYXNlSW4oMy4wKSksIGNjLmNhbGxGdW5jKCgpID0+IHtcblxuICAgICAgICB9KSkpO1xuICAgICAgICB0aGlzLm1fc3BfdGl0bGVmLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgIHRoaXMubV9zcF90aXRsZWYucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuNSwgMCwgMTApLCBjYy5tb3ZlQnkoMC41LCAwLCAtMTApKSkpO1xuICAgICAgICB0aGlzLm1fYnRuX2FnYWluLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMubV9idG5fc2hhcmUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgUmFua0xpc3Quc2hvd0dhbWVSZXN1bHRMaXN0KCk7XG4gICAgfSxcblxuICAgIG9uQmFja1RvTWVudSgpIHtcbiAgICAgICAgVXRpbHMuU2V0U291bmRFZmZlY3Qod2luZG93LkJVVFRPTl9DTElDS19NVVNJQywgZmFsc2UsIDEpO1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUod2luZG93Lk1FTlVfU0NFTkVfTkFNRSk7XG4gICAgfSxcblxuICAgIG9uQWdhaW5QbGF5KCkge1xuICAgICAgICBVdGlscy5TZXRTb3VuZEVmZmVjdCh3aW5kb3cuQlVUVE9OX0NMSUNLX01VU0lDLCBmYWxzZSwgMSk7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSh3aW5kb3cuR0FNRV9TQ0VORV9OQU1FKTtcbiAgICB9LFxuXG4gICAgb25SZXN1bHRTaGFyZSgpIHtcbiAgICAgICAgbGV0IHRleHQgPSBg5a6d5a6d6KaB5ZOt5pmV5Zyo5bGx5LiK5LqG77yM5b+r5p2l5biu5biu5a6D77yBYDtcbiAgICAgICAgU2hhcmVTZGsuc2hhcmVBcHBNZXNzYWdlKHtcbiAgICAgICAgICAgIHRpdGxlOiB0ZXh0LFxuICAgICAgICAgICAgaW1hZ2VVcmw6IHdpbmRvdy50ZW1wRmlsZVVSTFsyXSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsOiBlcnIgPT4ge1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tcGxhdGU6IG1zZyA9PiB7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvLyBvbkVuYWJsZSgpe1xuXG4gICAgLy8gfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=