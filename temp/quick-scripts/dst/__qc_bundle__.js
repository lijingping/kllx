
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Script/GameLoad');
require('./assets/Script/GameMain');
require('./assets/Script/GameMenu');
require('./assets/Script/GameResult');
require('./assets/Script/GameStep');
require('./assets/Script/common/BgSetting');
require('./assets/Script/common/Common_CommonUtil');
require('./assets/Script/common/GameEndRank');
require('./assets/Script/common/GuideManager');
require('./assets/Script/common/PlatformCom');
require('./assets/Script/common/RankList');
require('./assets/Script/common/ReliveViewCtrl');
require('./assets/Script/common/ShareSdk');
require('./assets/Script/common/SubdomineDisplay');
require('./assets/Script/common/Utils');
require('./assets/Script/common/Wxlife');
require('./assets/Script/common/event_listener');
require('./assets/Script/common/launch');
require('./assets/Script/common/shader/EffectCommon');
require('./assets/Script/common/shader/Wave_VH');
require('./assets/Script/common/shader/ccShader_Default_Vert');
require('./assets/Script/common/shader/ccShader_Default_Vert_noMVP');
require('./assets/Script/common/shader/ccShader_Wave_VH_Frag');
require('./assets/Script/common/shader/ccShader_wave');
require('./assets/Script/dataStatistics/Data');
require('./assets/Script/item/BgItem');
require('./assets/Script/item/BigStepItem');
require('./assets/Script/item/BlockBGItem');
require('./assets/Script/item/BlockItem');
require('./assets/Script/item/BombEffectItem');
require('./assets/Script/item/GetBoxGiftItem');
require('./assets/Script/item/MonsterItem');
require('./assets/Script/item/RockItem');
require('./assets/Script/item/ShapeItem');
require('./assets/Script/item/ShareTipsItem');
require('./assets/Script/item/SkinItem');
require('./assets/Script/item/SkinPanel');
require('./assets/Script/item/StepViewItem');
require('./assets/Script/item/UseToolItem');
require('./assets/Script/newBie/NewBieGift');
require('./assets/migration/use_v2.0.x_cc.Toggle_event');

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameLoad.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c64f73DiYxHd7e8a+8ulTfg', 'GameLoad');
// Script/GameLoad.js

"use strict";

require("./common/Wxlife");

var ShareSdk = require("ShareSdk");

var Utils = require("Utils");

window.Utils = Utils;
cc.Class({
  "extends": cc.Component,
  properties: {
    m_n_logo: cc.Node,
    m_loaded: false,
    m_l_text: cc.Label
  },
  start: function start() {
    Utils.setDesignResolution();
    this.m_n_logo.opacity = 0;
    this.m_loaded = false;
    this.m_loaded2 = false;
    var self = this;
    this._loadnum = 0;

    if (typeof wx != 'undefined') {
      wx.cloud.init({
        env: window.ENV,
        traceUser: true,
        success: function success(res) {// console.log("init-", res);
        }
      });
    }

    this.m_n_logo.runAction(cc.sequence(cc.fadeIn(0.2), cc.callFunc(function () {
      self.loadres();
      self.loadconfig();
    }))); // cc.view.enableRetina(true);

    var boo = cc.sys.localStorage.getItem('music');
    var guideboo = cc.sys.localStorage.getItem('guideinfo');
    var change = cc.sys.localStorage.getItem('change');
    var gold = console.log('guideboo', guideboo);

    if (boo && boo != 'null') {
      window.MUSIC_SHOW_OFF = parseInt(boo);
    } else {
      window.MUSIC_SHOW_OFF = 1; //默认开启

      cc.sys.localStorage.setItem('music', '' + window.MUSIC_SHOW_OFF);
    }

    if (guideboo && guideboo != 'null') {
      window.GUIDE_LEVEL = 1;
    } else {
      window.GUIDE_LEVEL = 0; // cc.sys.localStorage.setItem('guideinfo', '1');
    }

    if (change && change != 'null') {
      window.CHANGE_BLOCK = 1;
    } else {
      window.CHANGE_BLOCK = 0;
    }

    ShareSdk.setShareMenuEnabled(true, true);
  },
  loadconfig: function loadconfig() {
    var this$1 = this;
    this$1._loadnum++;
    this$1.enterGame(); // let remoteUrl = 'https://gifen-1253495541.cosgz.myqcloud.com/KillMonster/share_config.json';
    // cc.loader.load(remoteUrl, function (err, netobj) {
    //     if (err) {
    //         console.error(err);
    //         this$1._loadnum++;
    //         this$1.enterGame();
    //     } else {
    //         window.BOX_SHARE = netobj.box_share;
    //         window.SKIN_SHARE = netobj.skin_share;
    //         window.MOVEGAME = netobj.moregame;
    //         window.NEWYEAR = netobj.newyear;
    //         console.warn(netobj);
    //     }
    // });
  },
  loadres: function loadres() {
    console.log("load res");
    var self = this;
    window.tempFileURL = [];

    for (var i = 1; i < 4; i++) {
      window.tempFileURL.push("");
    }

    if (typeof wx != 'undefined') {
      wx.showLoading({
        title: "登录中..."
      }); // wx.cloud.getTempFileURL({
      //     fileList: ['cloud://killmonster-test-df9a23.603e-killmonster-test-df9a23/game_config/level_config2.json',
      //         'cloud://killmonster-test-df9a23.603e-killmonster-test-df9a23/share_templates/share1.jpg',
      //         'cloud://killmonster-test-df9a23.603e-killmonster-test-df9a23/share_templates/share_normal.jpg',
      //         'cloud://killmonster-test-df9a23.603e-killmonster-test-df9a23/share_templates/share_result.jpg',
      //         'cloud://killmonster-test-df9a23.603e-killmonster-test-df9a23/share_templates/share_box.jpg'],
      //     success: (res) => {
      //         // console.log(res.fileList[0]);
      //         window.tempFileURL = [];
      //         let data = res.fileList[0];
      //         for (let i = 1; i < res.fileList.length; i++) {
      //             window.tempFileURL.push(res.fileList[i].tempFileURL);
      //         }
      //         if (data.status == 0) {
      //             cc.loader.load(data.tempFileURL, function (err, netobj) {
      //                 if (err) {
      //                     cc.loader.loadRes('level_config2', function (err, obj) {
      //                         if (err) {
      //                             cc.error(err.message || err);
      //                             return;
      //                         }
      //                         window.MAP_CONFIG = obj;
      //                         window.dailypointdata = obj.daily_step;
      //                         self._loadnum++;
      //                         self.enterGame();
      //                     });
      //                 } else {
      //                     window.MAP_CONFIG = netobj
      //                     self._loadnum++;
      //                     self.enterGame();
      //                 }
      //             });
      //         } else {
      //             cc.loader.loadRes('level_config2', function (err, obj) {
      //                 if (err) {
      //                     cc.error(err.message || err);
      //                     return;
      //                 }
      //                 window.MAP_CONFIG = obj;
      //                 self._loadnum++;
      //                 self.enterGame();
      //             });
      //         }
      //     },
      //     fail: () => {
      //         cc.loader.loadRes('level_config2', function (err, obj) {
      //             if (err) {
      //                 cc.error(err.message || err);
      //                 return;
      //             }
      //             window.MAP_CONFIG = obj;
      //             self._loadnum++;
      //             self.enterGame();
      //         });
      //     }
      // })

      cc.loader.loadRes('level_config2', function (err, obj) {
        if (err) {
          cc.error(err.message || err);
          return;
        }

        window.MAP_CONFIG = obj.json;
        self._loadnum++;
        self.enterGame();
      }); //登录

      wx.cloud.callFunction({
        // 云函数名称
        name: 'login',
        // 传给云函数的参数
        success: function success(res) {
          console.log(res.result.event.userInfo);
          window.userInfo = res.result.event.userInfo;
          Utils.getSaveData(function (res) {
            window.getdata = true;
            self._loadnum++;
            self.enterGame();
          });
        },
        fail: function fail(err) {
          console.error(err);
          wx.showModal({
            title: "提示",
            content: "登录异常，请稍后重试:" + err.Msg,
            showCancel: false,
            success: function success() {
              wx.exitMiniProgram();
            }
          });
        }
      });
    } else {
      self._loadnum = 1;
      cc.loader.loadRes('level_config2', function (err, obj) {
        if (err) {
          cc.error(err.message || err);
          return;
        }

        window.MAP_CONFIG = obj.json;
        self._loadnum++;
        self.enterGame();
      });
    }

    this.MyPreloadScene(window.MENU_SCENE_NAME, function (completedCount, totalCount, item) {
      self.m_l_text.string = "游戏加载中..." + Math.floor(completedCount / totalCount * 100) + "%";
    }, function () {
      console.log("preloadScene finish");
      self._loadnum++;
      self.enterGame();
    });
    Utils.getSaveData(function (res) {
      window.getdata = true;
      self._loadnum++;
      self.enterGame();
    });
  },
  MyPreloadScene: function MyPreloadScene(sceneName, onProgress, onLoaded) {
    if (onLoaded === undefined) {
      onLoaded = onProgress;
      onProgress = null;
    }

    var info = cc.director._getSceneUuid(sceneName);

    if (info) {
      cc.director.emit(cc.Director.EVENT_BEFORE_SCENE_LOADING, sceneName);
      cc.loader.load({
        uuid: info.uuid,
        type: 'uuid'
      }, onProgress, function (error, asset) {
        if (error) {
          cc.errorID(1210, sceneName, error.message);
        }

        if (onLoaded) {
          onLoaded(error, asset);
        }
      });
    } else {
      var error = 'Can not preload the scene "' + sceneName + '" because it is not in the build settings.';
      onLoaded(new Error(error));
      cc.error('preloadScene: ' + error);
    }
  },
  enterGame: function enterGame() {
    if (this._loadnum >= 4) {
      if (typeof wx != 'undefined') {
        wx.hideLoading();
      }

      cc.director.loadScene(window.MENU_SCENE_NAME);
    }
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZUxvYWQuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIlNoYXJlU2RrIiwiVXRpbHMiLCJ3aW5kb3ciLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm1fbl9sb2dvIiwiTm9kZSIsIm1fbG9hZGVkIiwibV9sX3RleHQiLCJMYWJlbCIsInN0YXJ0Iiwic2V0RGVzaWduUmVzb2x1dGlvbiIsIm9wYWNpdHkiLCJtX2xvYWRlZDIiLCJzZWxmIiwiX2xvYWRudW0iLCJ3eCIsImNsb3VkIiwiaW5pdCIsImVudiIsIkVOViIsInRyYWNlVXNlciIsInN1Y2Nlc3MiLCJyZXMiLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsImZhZGVJbiIsImNhbGxGdW5jIiwibG9hZHJlcyIsImxvYWRjb25maWciLCJib28iLCJzeXMiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZ3VpZGVib28iLCJjaGFuZ2UiLCJnb2xkIiwiY29uc29sZSIsImxvZyIsIk1VU0lDX1NIT1dfT0ZGIiwicGFyc2VJbnQiLCJzZXRJdGVtIiwiR1VJREVfTEVWRUwiLCJDSEFOR0VfQkxPQ0siLCJzZXRTaGFyZU1lbnVFbmFibGVkIiwidGhpcyQxIiwiZW50ZXJHYW1lIiwidGVtcEZpbGVVUkwiLCJpIiwicHVzaCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJsb2FkZXIiLCJsb2FkUmVzIiwiZXJyIiwib2JqIiwiZXJyb3IiLCJtZXNzYWdlIiwiTUFQX0NPTkZJRyIsImpzb24iLCJjYWxsRnVuY3Rpb24iLCJuYW1lIiwicmVzdWx0IiwiZXZlbnQiLCJ1c2VySW5mbyIsImdldFNhdmVEYXRhIiwiZ2V0ZGF0YSIsImZhaWwiLCJzaG93TW9kYWwiLCJjb250ZW50IiwiTXNnIiwic2hvd0NhbmNlbCIsImV4aXRNaW5pUHJvZ3JhbSIsIk15UHJlbG9hZFNjZW5lIiwiTUVOVV9TQ0VORV9OQU1FIiwiY29tcGxldGVkQ291bnQiLCJ0b3RhbENvdW50IiwiaXRlbSIsInN0cmluZyIsIk1hdGgiLCJmbG9vciIsInNjZW5lTmFtZSIsIm9uUHJvZ3Jlc3MiLCJvbkxvYWRlZCIsInVuZGVmaW5lZCIsImluZm8iLCJkaXJlY3RvciIsIl9nZXRTY2VuZVV1aWQiLCJlbWl0IiwiRGlyZWN0b3IiLCJFVkVOVF9CRUZPUkVfU0NFTkVfTE9BRElORyIsImxvYWQiLCJ1dWlkIiwidHlwZSIsImFzc2V0IiwiZXJyb3JJRCIsIkVycm9yIiwiaGlkZUxvYWRpbmciLCJsb2FkU2NlbmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE9BQU8sQ0FBQyxpQkFBRCxDQUFQOztBQUNBLElBQUlDLFFBQVEsR0FBR0QsT0FBTyxDQUFDLFVBQUQsQ0FBdEI7O0FBQ0EsSUFBSUUsS0FBSyxHQUFHRixPQUFPLENBQUMsT0FBRCxDQUFuQjs7QUFDQUcsTUFBTSxDQUFDRCxLQUFQLEdBQWVBLEtBQWY7QUFFQUUsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBRUosRUFBRSxDQUFDSyxJQURMO0FBRVJDLElBQUFBLFFBQVEsRUFBRSxLQUZGO0FBR1JDLElBQUFBLFFBQVEsRUFBRVAsRUFBRSxDQUFDUTtBQUhMLEdBSFA7QUFTTEMsRUFBQUEsS0FUSyxtQkFTRztBQUNKWCxJQUFBQSxLQUFLLENBQUNZLG1CQUFOO0FBQ0EsU0FBS04sUUFBTCxDQUFjTyxPQUFkLEdBQXdCLENBQXhCO0FBQ0EsU0FBS0wsUUFBTCxHQUFnQixLQUFoQjtBQUNBLFNBQUtNLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxRQUFJQyxJQUFJLEdBQUcsSUFBWDtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsQ0FBaEI7O0FBQ0EsUUFBSSxPQUFRQyxFQUFSLElBQWUsV0FBbkIsRUFBZ0M7QUFDNUJBLE1BQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTQyxJQUFULENBQWM7QUFDVkMsUUFBQUEsR0FBRyxFQUFFbkIs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RSxDQUFDbUQsTUFBSCxDQUFVdUMsSUFBVixDQUFlO0FBQUVDLFFBQUFBLElBQUksRUFBRVAsSUFBSSxDQUFDTyxJQUFiO0FBQW1CQyxRQUFBQSxJQUFJLEVBQUU7QUFBekIsT0FBZixFQUNJWCxVQURKLEVBRUksVUFBVTFCLEtBQVYsRUFBaUJzQyxLQUFqQixFQUF3QjtBQUNwQixZQUFJdEMsS0FBSixFQUFXO0FBQ1B2RCxVQUFBQSxFQUFFLENBQUM4RixPQUFILENBQVcsSUFBWCxFQUFpQmQsU0FBakIsRUFBNEJ6QixLQUFLLENBQUNDLE9BQWxDO0FBQ0g7O0FBQ0QsWUFBSTBCLFFBQUosRUFBYztBQUNWQSxVQUFBQSxRQUFRLENBQUMzQixLQUFELEVBQVFzQyxLQUFSLENBQVI7QUFDSDtBQUNKLE9BVEw7QUFVSCxLQVpELE1BYUs7QUFDRCxVQUFJdEMsS0FBSyxHQUFHLGdDQUFnQ3lCLFNBQWhDLEdBQTRDLDRDQUF4RDtBQUNBRSxNQUFBQSxRQUFRLENBQUMsSUFBSWEsS0FBSixDQUFVeEMsS0FBVixDQUFELENBQVI7QUFDQXZELE1BQUFBLEVBQUUsQ0FBQ3VELEtBQUgsQ0FBUyxtQkFBbUJBLEtBQTVCO0FBQ0g7QUFDSixHQTdPSTtBQThPTFYsRUFBQUEsU0FBUyxFQUFFLHFCQUFZO0FBQ25CLFFBQUksS0FBSy9CLFFBQUwsSUFBaUIsQ0FBckIsRUFBd0I7QUFDcEIsVUFBSSxPQUFRQyxFQUFSLElBQWUsV0FBbkIsRUFBK0I7QUFDM0JBLFFBQUFBLEVBQUUsQ0FBQ2lGLFdBQUg7QUFDSDs7QUFDRGhHLE1BQUFBLEVBQUUsQ0FBQ3FGLFFBQUgsQ0FBWVksU0FBWixDQUFzQmxHLE1BQU0sQ0FBQzBFLGVBQTdCO0FBQ0g7QUFDSjtBQXJQSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKFwiLi9jb21tb24vV3hsaWZlXCIpO1xudmFyIFNoYXJlU2RrID0gcmVxdWlyZShcIlNoYXJlU2RrXCIpO1xudmFyIFV0aWxzID0gcmVxdWlyZShcIlV0aWxzXCIpXG53aW5kb3cuVXRpbHMgPSBVdGlscztcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbV9uX2xvZ286IGNjLk5vZGUsXG4gICAgICAgIG1fbG9hZGVkOiBmYWxzZSxcbiAgICAgICAgbV9sX3RleHQ6IGNjLkxhYmVsLFxuICAgIH0sXG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgVXRpbHMuc2V0RGVzaWduUmVzb2x1dGlvbigpXG4gICAgICAgIHRoaXMubV9uX2xvZ28ub3BhY2l0eSA9IDA7XG4gICAgICAgIHRoaXMubV9sb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tX2xvYWRlZDIgPSBmYWxzZTtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLl9sb2FkbnVtID0gMDtcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB3eC5jbG91ZC5pbml0KHtcbiAgICAgICAgICAgICAgICBlbnY6IHdpbmRvdy5FTlYsXG4gICAgICAgICAgICAgICAgdHJhY2VVc2VyOiB0cnVlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJpbml0LVwiLCByZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubV9uX2xvZ28ucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmZhZGVJbigwLjIpLCBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICBzZWxmLmxvYWRyZXMoKTtcbiAgICAgICAgICAgIHNlbGYubG9hZGNvbmZpZygpO1xuICAgICAgICB9KSkpO1xuICAgICAgICAvLyBjYy52aWV3LmVuYWJsZVJldGluYSh0cnVlKTtcbiAgICAgICAgbGV0IGJvbyA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbXVzaWMnKTtcbiAgICAgICAgbGV0IGd1aWRlYm9vID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdndWlkZWluZm8nKTtcbiAgICAgICAgbGV0IGNoYW5nZSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2hhbmdlJyk7XG4gICAgICAgIGxldCBnb2xkID0gXG4gICAgICAgIGNvbnNvbGUubG9nKCdndWlkZWJvbycsIGd1aWRlYm9vKTtcbiAgICAgICAgaWYgKGJvbyAmJiBib28gIT0gJ251bGwnKSB7XG4gICAgICAgICAgICB3aW5kb3cuTVVTSUNfU0hPV19PRkYgPSBwYXJzZUludChib28pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2luZG93Lk1VU0lDX1NIT1dfT0ZGID0gMTsvL+m7mOiupOW8gOWQr1xuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtdXNpYycsICcnICsgd2luZG93Lk1VU0lDX1NIT1dfT0ZGKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChndWlkZWJvbyAmJiBndWlkZWJvbyAhPSAnbnVsbCcpIHtcbiAgICAgICAgICAgIHdpbmRvdy5HVUlERV9MRVZFTCA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3cuR1VJREVfTEVWRUwgPSAwO1xuICAgICAgICAgICAgLy8gY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdndWlkZWluZm8nLCAnMScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2UgJiYgY2hhbmdlICE9ICdudWxsJykge1xuICAgICAgICAgICAgd2luZG93LkNIQU5HRV9CTE9DSyA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3cuQ0hBTkdFX0JMT0NLID0gMDtcbiAgICAgICAgfVxuICAgICAgICBTaGFyZVNkay5zZXRTaGFyZU1lbnVFbmFibGVkKHRydWUsIHRydWUpO1xuXG4gICAgfSxcblxuICAgIGxvYWRjb25maWcoKSB7XG4gICAgICAgIGxldCB0aGlzJDEgPSB0aGlzO1xuICAgICAgICB0aGlzJDEuX2xvYWRudW0rKztcbiAgICAgICAgdGhpcyQxLmVudGVyR2FtZSgpO1xuICAgICAgICAvLyBsZXQgcmVtb3RlVXJsID0gJ2h0dHBzOi8vZ2lmZW4tMTI1MzQ5NTU0MS5jb3Nnei5teXFjbG91ZC5jb20vS2lsbE1vbnN0ZXIvc2hhcmVfY29uZmlnLmpzb24nO1xuICAgICAgICAvLyBjYy5sb2FkZXIubG9hZChyZW1vdGVVcmwsIGZ1bmN0aW9uIChlcnIsIG5ldG9iaikge1xuICAgICAgICAvLyAgICAgaWYgKGVycikge1xuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgLy8gICAgICAgICB0aGlzJDEuX2xvYWRudW0rKztcbiAgICAgICAgLy8gICAgICAgICB0aGlzJDEuZW50ZXJHYW1lKCk7XG4gICAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgIHdpbmRvdy5CT1hfU0hBUkUgPSBuZXRvYmouYm94X3NoYXJlO1xuICAgICAgICAvLyAgICAgICAgIHdpbmRvdy5TS0lOX1NIQVJFID0gbmV0b2JqLnNraW5fc2hhcmU7XG4gICAgICAgIC8vICAgICAgICAgd2luZG93Lk1PVkVHQU1FID0gbmV0b2JqLm1vcmVnYW1lO1xuICAgICAgICAvLyAgICAgICAgIHdpbmRvdy5ORVdZRUFSID0gbmV0b2JqLm5ld3llYXI7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS53YXJuKG5ldG9iaik7XG5cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSk7XG4gICAgfSxcblxuICAgIGxvYWRyZXMoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibG9hZCByZXNcIik7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgd2luZG93LnRlbXBGaWxlVVJMID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICB3aW5kb3cudGVtcEZpbGVVUkwucHVzaChcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLnmbvlvZXkuK0uLi5cIlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHd4LmNsb3VkLmdldFRlbXBGaWxlVVJMKHtcbiAgICAgICAgICAgIC8vICAgICBmaWxlTGlzdDogWydjbG91ZDovL2tpbGxtb25zdGVyLXRlc3QtZGY5YTIzLjYwM2Uta2lsbG1vbnN0ZXItdGVzdC1kZjlhMjMvZ2FtZV9jb25maWcvbGV2ZWxfY29uZmlnMi5qc29uJyxcbiAgICAgICAgICAgIC8vICAgICAgICAgJ2Nsb3VkOi8va2lsbG1vbnN0ZXItdGVzdC1kZjlhMjMuNjAzZS1raWxsbW9uc3Rlci10ZXN0LWRmOWEyMy9zaGFyZV90ZW1wbGF0ZXMvc2hhcmUxLmpwZycsXG4gICAgICAgICAgICAvLyAgICAgICAgICdjbG91ZDovL2tpbGxtb25zdGVyLXRlc3QtZGY5YTIzLjYwM2Uta2lsbG1vbnN0ZXItdGVzdC1kZjlhMjMvc2hhcmVfdGVtcGxhdGVzL3NoYXJlX25vcm1hbC5qcGcnLFxuICAgICAgICAgICAgLy8gICAgICAgICAnY2xvdWQ6Ly9raWxsbW9uc3Rlci10ZXN0LWRmOWEyMy42MDNlLWtpbGxtb25zdGVyLXRlc3QtZGY5YTIzL3NoYXJlX3RlbXBsYXRlcy9zaGFyZV9yZXN1bHQuanBnJyxcbiAgICAgICAgICAgIC8vICAgICAgICAgJ2Nsb3VkOi8va2lsbG1vbnN0ZXItdGVzdC1kZjlhMjMuNjAzZS1raWxsbW9uc3Rlci10ZXN0LWRmOWEyMy9zaGFyZV90ZW1wbGF0ZXMvc2hhcmVfYm94LmpwZyddLFxuICAgICAgICAgICAgLy8gICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIC8vICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLmZpbGVMaXN0WzBdKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgd2luZG93LnRlbXBGaWxlVVJMID0gW107XG4gICAgICAgICAgICAvLyAgICAgICAgIGxldCBkYXRhID0gcmVzLmZpbGVMaXN0WzBdO1xuICAgICAgICAgICAgLy8gICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHJlcy5maWxlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgd2luZG93LnRlbXBGaWxlVVJMLnB1c2gocmVzLmZpbGVMaXN0W2ldLnRlbXBGaWxlVVJMKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PSAwKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZChkYXRhLnRlbXBGaWxlVVJMLCBmdW5jdGlvbiAoZXJyLCBuZXRvYmopIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKCdsZXZlbF9jb25maWcyJywgZnVuY3Rpb24gKGVyciwgb2JqKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoZXJyLm1lc3NhZ2UgfHwgZXJyKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuTUFQX0NPTkZJRyA9IG9iajtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kYWlseXBvaW50ZGF0YSA9IG9iai5kYWlseV9zdGVwO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fbG9hZG51bSsrO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5lbnRlckdhbWUoKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgd2luZG93Lk1BUF9DT05GSUcgPSBuZXRvYmpcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgc2VsZi5fbG9hZG51bSsrO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBzZWxmLmVudGVyR2FtZSgpO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoJ2xldmVsX2NvbmZpZzInLCBmdW5jdGlvbiAoZXJyLCBvYmopIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKGVyci5tZXNzYWdlIHx8IGVycik7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgd2luZG93Lk1BUF9DT05GSUcgPSBvYmo7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgc2VsZi5fbG9hZG51bSsrO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHNlbGYuZW50ZXJHYW1lKCk7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgIH0sXG4gICAgICAgICAgICAvLyAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICAgICAgLy8gICAgICAgICBjYy5sb2FkZXIubG9hZFJlcygnbGV2ZWxfY29uZmlnMicsIGZ1bmN0aW9uIChlcnIsIG9iaikge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNjLmVycm9yKGVyci5tZXNzYWdlIHx8IGVycik7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgd2luZG93Lk1BUF9DT05GSUcgPSBvYmo7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBzZWxmLl9sb2FkbnVtKys7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBzZWxmLmVudGVyR2FtZSgpO1xuICAgICAgICAgICAgLy8gICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoJ2xldmVsX2NvbmZpZzInLCBmdW5jdGlvbiAoZXJyLCBvYmopIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKGVyci5tZXNzYWdlIHx8IGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB3aW5kb3cuTUFQX0NPTkZJRyA9IG9iai5qc29uO1xuICAgICAgICAgICAgICAgIHNlbGYuX2xvYWRudW0rKztcbiAgICAgICAgICAgICAgICBzZWxmLmVudGVyR2FtZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvL+eZu+W9lVxuICAgICAgICAgICAgd3guY2xvdWQuY2FsbEZ1bmN0aW9uKHtcbiAgICAgICAgICAgICAgICAvLyDkupHlh73mlbDlkI3np7BcbiAgICAgICAgICAgICAgICBuYW1lOiAnbG9naW4nLFxuICAgICAgICAgICAgICAgIC8vIOS8oOe7meS6keWHveaVsOeahOWPguaVsFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLnJlc3VsdC5ldmVudC51c2VySW5mbyk7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy51c2VySW5mbyA9IHJlcy5yZXN1bHQuZXZlbnQudXNlckluZm87XG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmdldFNhdmVEYXRhKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZ2V0ZGF0YSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9sb2FkbnVtKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmVudGVyR2FtZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDogKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLmj5DnpLpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwi55m75b2V5byC5bi477yM6K+356iN5ZCO6YeN6K+VOlwiICsgZXJyLk1zZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LmV4aXRNaW5pUHJvZ3JhbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLl9sb2FkbnVtID0gMTtcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKCdsZXZlbF9jb25maWcyJywgZnVuY3Rpb24gKGVyciwgb2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihlcnIubWVzc2FnZSB8fCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgd2luZG93Lk1BUF9DT05GSUcgPSBvYmouanNvbjtcbiAgICAgICAgICAgICAgICBzZWxmLl9sb2FkbnVtKys7XG4gICAgICAgICAgICAgICAgc2VsZi5lbnRlckdhbWUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5NeVByZWxvYWRTY2VuZSh3aW5kb3cuTUVOVV9TQ0VORV9OQU1FLCAoY29tcGxldGVkQ291bnQsIHRvdGFsQ291bnQsIGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHNlbGYubV9sX3RleHQuc3RyaW5nID0gXCLmuLjmiI/liqDovb3kuK0uLi5cIiArIE1hdGguZmxvb3IoKGNvbXBsZXRlZENvdW50IC8gdG90YWxDb3VudCkgKiAxMDApICsgXCIlXCI7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicHJlbG9hZFNjZW5lIGZpbmlzaFwiKTtcbiAgICAgICAgICAgIHNlbGYuX2xvYWRudW0rKztcbiAgICAgICAgICAgIHNlbGYuZW50ZXJHYW1lKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIFV0aWxzLmdldFNhdmVEYXRhKHJlcyA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuZ2V0ZGF0YSA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLl9sb2FkbnVtKys7XG4gICAgICAgICAgICBzZWxmLmVudGVyR2FtZSgpO1xuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBNeVByZWxvYWRTY2VuZShzY2VuZU5hbWUsIG9uUHJvZ3Jlc3MsIG9uTG9hZGVkKSB7XG4gICAgICAgIGlmIChvbkxvYWRlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvbkxvYWRlZCA9IG9uUHJvZ3Jlc3M7XG4gICAgICAgICAgICBvblByb2dyZXNzID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpbmZvID0gY2MuZGlyZWN0b3IuX2dldFNjZW5lVXVpZChzY2VuZU5hbWUpO1xuICAgICAgICBpZiAoaW5mbykge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IuZW1pdChjYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfU0NFTkVfTE9BRElORywgc2NlbmVOYW1lKTtcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkKHsgdXVpZDogaW5mby51dWlkLCB0eXBlOiAndXVpZCcgfSxcbiAgICAgICAgICAgICAgICBvblByb2dyZXNzLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlcnJvciwgYXNzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDEyMTAsIHNjZW5lTmFtZSwgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9uTG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkxvYWRlZChlcnJvciwgYXNzZXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgZXJyb3IgPSAnQ2FuIG5vdCBwcmVsb2FkIHRoZSBzY2VuZSBcIicgKyBzY2VuZU5hbWUgKyAnXCIgYmVjYXVzZSBpdCBpcyBub3QgaW4gdGhlIGJ1aWxkIHNldHRpbmdzLic7XG4gICAgICAgICAgICBvbkxvYWRlZChuZXcgRXJyb3IoZXJyb3IpKTtcbiAgICAgICAgICAgIGNjLmVycm9yKCdwcmVsb2FkU2NlbmU6ICcgKyBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGVudGVyR2FtZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fbG9hZG51bSA+PSA0KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7ICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUod2luZG93Lk1FTlVfU0NFTkVfTkFNRSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/Utils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'eb7ebzZ/c1Alap1sGhOsN/K', 'Utils');
// Script/common/Utils.js

"use strict";

var _Data = _interopRequireDefault(require("../dataStatistics/Data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 命名 node = n_  label = l_  sprite = sp_ button = btn_   scrollView = sc_
 */
var t = console.log;

console.log = function () {// t(...param);
};

var Utils = {
  //适配分辨率默认高度适配，iphonex宽度适配
  setDesignResolution: function setDesignResolution() {
    var canvas = cc.find("Canvas").getComponent(cc.Canvas);
    var winSize = cc.winSize;

    if (winSize.width / winSize.height > 9 / 16) {
      canvas.fitWidth = false;
      canvas.fitHeight = true;
    } else {
      canvas.fitWidth = true;
      canvas.fitHeight = false;
    }
  },

  /**
   * 
   * @param {String} key 保存的键值
   * @param {String} value  保存的值
   */
  setKVUserData: function setKVUserData(key, value, success, fail) {
    if (window.GAME_SAVE_TYPE === 1) {
      cc.sys.localStorage.setItem(key, value);
    } else {
      _Data["default"].setData(value, success, fail);
    }
  },

  /**
   * 
   * @param {String} key 获取对应内容的键值
   * @param {String} callback 存储服务端的话需要回调函数
   */
  getKVUserData: function getKVUserData(key, success, fail) {
    if (window.GAME_SAVE_TYPE === 1) {
      return cc.sys.localStorage.getItem(key);
    } else {
      _Data["default"].getData(success, fail);
    }
  },

  /**
   * 
   * @param {String} imagUrl 相对rescourse下的路径
   * @param {Number} type 加载资源类型
   * @param {*} callback 加载之后回调
   */
  loadRes: function loadRes(imagUrl, type, callback) {
    cc.loader.loadRes(imagUrl, type, function (err, obj) {
      if (err) {
        cc.error(err.message || err);
        return;
      }

      typeof callback == 'function' && callback(obj);
    });
  },

  /**
   * 
   * @param {*} node 淡入节点
   * @param {Number} time 淡入时间 默认1s
   */
  fadeIn: function fadeIn(node, time) {
    var fadetime = time ? time : 1;
    node.opacity = 0;
    node.runAction(cc.fadeIn(fadetime));
  },

  /**
   * 获取上传服务器的存储信息
   */
  getSaveData: function getSaveData(callback) {
    if (window.GAME_SAVE_TYPE === 1) {
      var data = cc.sys.localStorage.getItem(window.GAME_SAVE_HANDLER);

      if (data) {
        window.INIT_GAME_SAVE_DATA = JSON.parse(data);
      } else {
        cc.sys.localStorage.setItem(window.GAME_SAVE_HANDLER, JSON.stringify(window.INIT_GAME_SAVE_DATA));
        data = window.INIT_GAME_SAVE_DATA;
      }

      if (callback) {
        callback(data);
      }
    } else {
      var DB = wx.cloud.database({
        config: {
          env: window.ENV
        }
      });
      DB.collection("todos").doc(window.userInfo.openId).get({
        success: function success(res) {
          console.log(res.data);
          if (!res.data.skin) res.data.skin = window.SKIN_CONFIG_STATE;
          window.INIT_GAME_SAVE_DATA = res.data;

          if (callback) {
            callback(window.INIT_GAME_SAVE_DATA);
          }
        },
        fail: function fail(err) {
          console.log("fail", err);
          window.need_add = true;

          if (callback) {
            callback(window.INIT_GAME_SAVE_DATA);
          }
        },
        complete: function complete(res) {// console.log("complete", err);
        }
      });
    }
  },

  /**
   * 
   * @param {String} jsonobj 存储信息解析
   */
  setSaveData: function setSaveData() {
    if (window.GAME_SAVE_TYPE === 1) {
      // console.log("本地数据设置成功", JSON.stringify(window.INIT_GAME_SAVE_DATA));
      cc.sys.localStorage.setItem(window.GAME_SAVE_HANDLER, JSON.stringify(window.INIT_GAME_SAVE_DATA));
    } else {
      var DB = wx.cloud.database({
        config: {
          env: window.ENV
        }
      });
      window.INIT_GAME_SAVE_DATA._id = window.userInfo.openId;

      if (window.need_add) {
        DB.collection("todos").add({
          data: window.INIT_GAME_SAVE_DATA,
          success: function success(res) {
            // console.log(res, "add data good");
            window.need_add = false;
          },
          fail: function fail(err) {// console.log("fail ", err);
          }
        });
      } else {
        DB.collection("todos").doc(window.userInfo.openId).update({
          data: {
            gold_num: window.INIT_GAME_SAVE_DATA.gold_num,
            login_time: window.INIT_GAME_SAVE_DATA.login_time,
            tool: window.INIT_GAME_SAVE_DATA.tool,
            top_level: window.INIT_GAME_SAVE_DATA.top_level,
            top_score: window.INIT_GAME_SAVE_DATA.top_score,
            skin: window.INIT_GAME_SAVE_DATA.skin
          },
          success: function success(res) {// console.log(res, "add data good");
          },
          fail: function fail(err) {// console.log("fail ", err);
          }
        });
      }
    }
  },

  /**
   * @param {Number}min max随机数范围
   */
  random: function random(min, max) {
    return min + Math.floor(Math.random() * (max - min));
  },

  /**
   * 获取两个点的夹角
   */
  getAngle: function getAngle(x1, y1, x2, y2) {
    // 直角的边长
    var x = Math.abs(x1 - x2);
    var y = Math.abs(y1 - y2); // 斜边长

    var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)); // 余弦

    var cos = y / z; // 弧度

    var radina = Math.acos(cos); // 角度

    var angle = 180 / (Math.PI / radina);
    return angle;
  },

  /**
   * @desc 从给定整数范围内生成n个不重复的随机数 n不能超过给定范围
   * @param {Number} min 
   * @param {Number} max 
   */
  getRandomSDiff: function getRandomSDiff(min, max, n) {
    if (max - min + 1 < n) return [];
    var originalArray = new Array();
    var len = max - min + 1;

    for (var i = 0; i < len; i++) {
      originalArray[i] = min + i;
    }

    var randomArray = new Array();

    for (var _i = 0; _i < n; _i++) {
      var _t = this.random(0, len - 1 - _i);

      randomArray[_i] = originalArray[_t];
      var temp = originalArray[len - 1 - _i];
      originalArray[len - 1 - _i] = originalArray[_t];
      originalArray[_t] = temp;
    }

    return randomArray;
  },

  /**
   * 显示道具获得
   * @param {Number} num 
   * @param {Number} type 0 炸弹 1金币
   * @param {any} parentNode 
   * @param {Number} x 
   * @param {Number} y 
   */
  showGetItem: function showGetItem(num, type, parentNode, x, y) {
    this.loadRes("prefabs/textbg", cc.Prefab, function (obj) {
      var node = cc.instantiate(obj);
      node.zindex = 1000;
      var labelnode = node.getChildByName('l_num');
      var goldnode = node.getChildByName('sp_gold');
      var boomnode = node.getChildByName('sp_boom');

      if (type == 0) {
        labelnode.getComponent(cc.Label).string = cc.js.formatStr("终极轰炸x%d", num);
        goldnode.active = false;
        boomnode.active = true;
      } else {
        labelnode.getComponent(cc.Label).string = cc.js.formatStr("金币x%d", num);
        goldnode.active = true;
        boomnode.active = false;
      }

      var xx = x ? x : 0;
      var yy = y ? y : 0;

      if (parentNode && cc.isValid(parentNode)) {
        node.parent = parentNode;
      } else {
        node.parent = cc.find("Canvas");
      }

      node.setPosition(xx, yy);
      var movetime = 1.5;
      var dis = 70;
      node.setPosition(xx, yy);
      var action1 = cc.moveBy(movetime, cc.v2(0, dis));
      var action2 = cc.fadeOut(1);
      node.runAction(cc.sequence(action1, action2, cc.callFunc(function () {
        node.destroy();
      })));
    });
  },

  /**
   * 
   * @param {String} text 文字描述
   * @param {*} parentNode 父节点，默认cc.find("Canvas")
   * @param {Number} x *坐标x默认0
   * @param {Number} y *坐标y默认0
   * @param {Number} font_size*字体大小默认40
   * @param {*} color 字体颜色
   * @param {Number} time 飘字移动时间
   * @param {Number} ydis 移动距离
   */
  showTipsText: function showTipsText(text, parentNode, x, y, font_size, color, time, ydis) {
    var node = new cc.Node('tipstext');
    node.zindex = 1000;
    var label = node.addComponent(cc.Label);
    label.fontFamily = '黑体';
    label.string = text;
    var xx = x ? x : 0;
    var yy = y ? y : 0;
    label.fontSize = font_size ? font_size : 40;
    label.lineHeight = font_size ? font_size + 10 : 50;
    node.color = color ? color : cc.Color.WHITE;

    if (parentNode && cc.isValid(parentNode)) {
      node.parent = parentNode;
    } else {
      node.parent = cc.find("Canvas");
    }

    var movetime = time ? time : 0.5;
    var dis = ydis ? ydis : 70;
    node.setPosition(xx, yy);
    var action1 = cc.moveBy(movetime, cc.v2(0, dis));
    var action2 = cc.fadeOut(1);
    node.runAction(cc.sequence(action1, action2, cc.callFunc(function () {
      node.destroy();
    })));
  },

  /**
   * 
   * @param {String} text 文字描述
   * @param {*} parentNode 父节点，默认cc.find("Canvas")
   * @param {Number} x *坐标x默认0
   * @param {Number} y *坐标y默认0
   * @param {Number} font_size*字体大小默认40
   * @param {*} color 字体颜色
   * @param {Number} time 飘字移动时间
   * @param {Number} ydis 移动距离
   * @param {boolean} boo 是否不需要跳跃效果
   */
  showHurtText: function showHurtText(text, parentNode, x, y, font_size, color, time, ydis, boo) {
    var _this = this;

    this.loadRes("prefabs/l_hurt", cc.Prefab, function (obj) {
      var node = cc.instantiate(obj);
      node.zindex = 1000;
      var label = node.getComponent(cc.Label);
      label.string = text;
      var xx = x ? x : 0;
      var yy = y ? y : 0;
      label.fontSize = font_size ? font_size : 40;
      label.lineHeight = 80; //font_size ? font_size + 10 : 40;

      node.color = color ? color : cc.Color.WHITE;

      if (parentNode && cc.isValid(parentNode)) {
        node.parent = parentNode;
      } else {
        node.parent = cc.find("Canvas");
      }

      var movetime = time ? time : 0.5;
      var dis = ydis ? ydis : 1;
      node.setPosition(xx, yy);
      _this.dir = !_this.dir;
      var movex = _this.dir ? -1 : 1;
      if (boo) dis = 0;
      var action1 = cc.jumpBy(movetime, dis * 100 * movex, -30, 100, 1);
      var action2 = cc.fadeOut(0.8);
      node.runAction(cc.sequence(action1, action2, cc.callFunc(function () {
        node.destroy();
        node = null;
      })));
    });
  },

  /**
   *          
   * @param {string} sprite_name 资源路径
   * @param {*} parentNode 父节点 默认canvas
   * @param {Vec2} startpos 开始位置
   * @param {Vec2} targetpos 结束位置
   * @param {function} callback 回调
   * @param {Number} time 时间
   * @param {*} type 类型，是否需要添加一个jump
   */
  moveIcon: function moveIcon(sprite_name, parentNode, startpos, targetpos, callback, time, type) {
    var runtime = time ? time : 1; // this.loadRes(sprite_name, cc.SpriteFrame, (sprite) => {

    var node = new cc.Node('iconmove');
    var spritenode = node.addComponent(cc.Sprite);
    spritenode.spriteFrame = sprite_name;

    if (parentNode && cc.isValid(parentNode)) {
      node.parent = parentNode;
    } else {
      node.parent = cc.find("Canvas");
    }

    var dir = Utils.random(0, 1000);
    node.anchorY = 0;
    node.position = startpos;
    node.zindex = 1000;

    if (type && type > 0) {
      if (dir > 500) {
        type = -1 * type;
      }

      node.runAction(cc.sequence(cc.jumpBy(0.5, type, 0, 100, 1), cc.delayTime(0.5), cc.moveTo(runtime, targetpos).easing(cc.easeIn(3.0)), cc.callFunc(function () {
        if (callback) callback();
        node.destroy();
      })));
    } else {
      node.runAction(cc.sequence(cc.moveTo(runtime, targetpos).easing(cc.easeIn(3.0)), cc.callFunc(function () {
        if (callback) callback();
        node.destroy();
      })));
    } // })

  },

  /**
   * 添加音效
   * @param musicUrl 音效路径
   * @constructor
   */
  SetSoundEffect: function SetSoundEffect(musicUrl, boo, volum) {
    var voluem = volum ? volum : 1;

    if (window.MUSIC_SHOW_OFF) {
      cc.loader.loadRes(musicUrl, cc.AudioClip, function (err, clip) {
        window.bgmAudioID = cc.audioEngine.playEffect(clip, false);
      }); // var audioUrl = cc.url.raw("resources/" + musicUrl);
      // cc.audioEngine.play(audioUrl, boo, voluem);
    }
  },
  //播放背景音乐
  playBgmMusic: function playBgmMusic(musicUrl, volum) {
    this.resumBgmMusic(musicUrl, volum);
  },
  resumBgmMusic: function resumBgmMusic(musicUrl, volum) {
    var url = musicUrl ? musicUrl : window.BGM;
    var voice = volum ? volum : 0.8;

    try {
      if (window.MUSIC_SHOW_OFF) {
        if (window.bgmAudioID >= 0) {
          cc.audioEngine.resume(window.bgmAudioID);
        } // window.bgmAudioID = -1;
        else {
            setTimeout(function () {
              // var audioUrl = cc.url.raw("resources/" + url);
              cc.loader.loadRes(url, cc.AudioClip, function (err, clip) {
                window.bgmAudioID = cc.audioEngine.playMusic(clip, true);
              }); // console.error("window.bgmAudioID", window.bgmAudioID);
            }, 500);
          }
      }
    } catch (error) {
      console.error(error);
      setTimeout(function () {
        cc.loader.loadRes(url, cc.AudioClip, function (err, clip) {
          window.bgmAudioID = cc.audioEngine.playMusic(clip, true);
        }); // console.error("window.bgmAudioID", window.bgmAudioID);
      }, 500);
    }
  },
  //停止背景音乐
  stopBgmMusic: function stopBgmMusic() {
    try {
      if (typeof window.bgmAudioID != 'undefined') {
        cc.audioEngine.pause(window.bgmAudioID); // window.bgmAudioID = -1;
      }
    } catch (error) {
      console.warn(error);
    }
  },
  //格式化秒数

  /**
   * 
   * @param {Number} sec 秒数
   */
  formatSecToTime: function formatSecToTime(s) {
    var t;

    if (s > -1) {
      var hour = Math.floor(s / 3600);
      var min = Math.floor(s / 60) % 60;
      var sec = s % 60;

      if (hour < 10) {
        t = '0' + hour + ":";
      } else {
        t = hour + ":";
      }

      if (min < 10) {
        t += "0";
      }

      t += min + ":";

      if (sec < 10) {
        t += "0";
      }

      t += sec;
    }

    return t;
  },
  getMin: function getMin(a, b) {
    var min = a > b ? b : a;
    return min;
  },
  getMax: function getMax(x, i) {
    var max = x > i ? x : i;
    return max;
  },
  //type:type为1的时候更倾向于大这边
  getMiddleIndex: function getMiddleIndex(min, max, type) {
    var len = max - min;

    if (len % 2 == 0) {
      return len / 2 + min;
    } else {
      if (type) {
        return Math.ceil(len / 2) + min;
      } else {
        return Math.floor(len / 2) + min;
      }
    }
  }
};
module.exports = Utils;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29tbW9uL1V0aWxzLmpzIl0sIm5hbWVzIjpbInQiLCJjb25zb2xlIiwibG9nIiwiVXRpbHMiLCJzZXREZXNpZ25SZXNvbHV0aW9uIiwiY2FudmFzIiwiY2MiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiQ2FudmFzIiwid2luU2l6ZSIsIndpZHRoIiwiaGVpZ2h0IiwiZml0V2lkdGgiLCJmaXRIZWlnaHQiLCJzZXRLVlVzZXJEYXRhIiwia2V5IiwidmFsdWUiLCJzdWNjZXNzIiwiZmFpbCIsIndpbmRvdyIsIkdBTUVfU0FWRV9UWVBFIiwic3lzIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkRhdGEiLCJzZXREYXRhIiwiZ2V0S1ZVc2VyRGF0YSIsImdldEl0ZW0iLCJnZXREYXRhIiwibG9hZFJlcyIsImltYWdVcmwiLCJ0eXBlIiwiY2FsbGJhY2siLCJsb2FkZXIiLCJlcnIiLCJvYmoiLCJlcnJvciIsIm1lc3NhZ2UiLCJmYWRlSW4iLCJub2RlIiwidGltZSIsImZhZGV0aW1lIiwib3BhY2l0eSIsInJ1bkFjdGlvbiIsImdldFNhdmVEYXRhIiwiZGF0YSIsIkdBTUVfU0FWRV9IQU5ETEVSIiwiSU5JVF9HQU1FX1NBVkVfREFUQSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsIkRCIiwid3giLCJjbG91ZCIsImRhdGFiYXNlIiwiY29uZmlnIiwiZW52IiwiRU5WIiwiY29sbGVjdGlvbiIsImRvYyIsInVzZXJJbmZvIiwib3BlbklkIiwiZ2V0IiwicmVzIiwic2tpbiIsIlNLSU5fQ09ORklHX1NUQVRFIiwibmVlZF9hZGQiLCJjb21wbGV0ZSIsInNldFNhdmVEYXRhIiwiX2lkIiwiYWRkIiwidXBkYXRlIiwiZ29sZF9udW0iLCJsb2dpbl90aW1lIiwidG9vbCIsInRvcF9sZXZlbCIsInRvcF9zY29yZSIsInJhbmRvbSIsIm1pbiIsIm1heCIsIk1hdGgiLCJmbG9vciIsImdldEFuZ2xlIiwieDEiLCJ5MSIsIngyIiwieTIiLCJ4IiwiYWJzIiwieSIsInoiLCJzcXJ0IiwicG93IiwiY29zIiwicmFkaW5hIiwiYWNvcyIsImFuZ2xlIiwiUEkiLCJnZXRSYW5kb21TRGlmZiIsIm4iLCJvcmlnaW5hbEFycmF5IiwiQXJyYXkiLCJsZW4iLCJpIiwicmFuZG9tQXJyYXkiLCJ0ZW1wIiwic2hvd0dldEl0ZW0iLCJudW0iLCJwYXJlbnROb2RlIiwiUHJlZmFiIiwiaW5zdGFudGlhdGUiLCJ6aW5kZXgiLCJsYWJlbG5vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsImdvbGRub2RlIiwiYm9vbW5vZGUiLCJMYWJlbCIsInN0cmluZyIsImpzIiwiZm9ybWF0U3RyIiwiYWN0aXZlIiwieHgiLCJ5eSIsImlzVmFsaWQiLCJwYXJlbnQiLCJzZXRQb3NpdGlvbiIsIm1vdmV0aW1lIiwiZGlzIiwiYWN0aW9uMSIsIm1vdmVCeSIsInYyIiwiYWN0aW9uMiIsImZhZGVPdXQiLCJzZXF1ZW5jZSIsImNhbGxGdW5jIiwiZGVzdHJveSIsInNob3dUaXBzVGV4dCIsInRleHQiLCJmb250X3NpemUiLCJjb2xvciIsInlkaXMiLCJOb2RlIiwibGFiZWwiLCJhZGRDb21wb25lbnQiLCJmb250RmFtaWx5IiwiZm9udFNpemUiLCJsaW5lSGVpZ2h0IiwiQ29sb3IiLCJXSElURSIsInNob3dIdXJ0VGV4dCIsImJvbyIsImRpciIsIm1vdmV4IiwianVtcEJ5IiwibW92ZUljb24iLCJzcHJpdGVfbmFtZSIsInN0YXJ0cG9zIiwidGFyZ2V0cG9zIiwicnVudGltZSIsInNwcml0ZW5vZGUiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsImFuY2hvclkiLCJwb3NpdGlvbiIsImRlbGF5VGltZSIsIm1vdmVUbyIsImVhc2luZyIsImVhc2VJbiIsIlNldFNvdW5kRWZmZWN0IiwibXVzaWNVcmwiLCJ2b2x1bSIsInZvbHVlbSIsIk1VU0lDX1NIT1dfT0ZGIiwiQXVkaW9DbGlwIiwiY2xpcCIsImJnbUF1ZGlvSUQiLCJhdWRpb0VuZ2luZSIsInBsYXlFZmZlY3QiLCJwbGF5QmdtTXVzaWMiLCJyZXN1bUJnbU11c2ljIiwidXJsIiwiQkdNIiwidm9pY2UiLCJyZXN1bWUiLCJzZXRUaW1lb3V0IiwicGxheU11c2ljIiwic3RvcEJnbU11c2ljIiwicGF1c2UiLCJ3YXJuIiwiZm9ybWF0U2VjVG9UaW1lIiwicyIsImhvdXIiLCJzZWMiLCJnZXRNaW4iLCJhIiwiYiIsImdldE1heCIsImdldE1pZGRsZUluZGV4IiwiY2VpbCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7O0FBR0EsSUFBSUEsQ0FBQyxHQUFHQyxPQUFPLENBQUNDLEdBQWhCOztBQUNBRCxPQUFPLENBQUNDLEdBQVIsR0FBYyxZQUFvQixDQUM5QjtBQUNILENBRkQ7O0FBR0EsSUFBSUMsS0FBSyxHQUFHO0FBRVI7QUFDQUMsRUFBQUEsbUJBQW1CLEVBQUUsK0JBQVk7QUFDN0IsUUFBSUMsTUFBTSxHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUSxRQUFSLEVBQWtCQyxZQUFsQixDQUErQkYsRUFBRSxDQUFDRyxNQUFsQyxDQUFiO0FBQ0EsUUFBSUMsT0FBTyxHQUFHSixFQUFFLENBQUNJLE9BQWpCOztBQUNBLFFBQUlBLE9BQU8sQ0FBQ0MsS0FBUixHQUFnQkQsT0FBTyxDQUFDRSxNQUF4QixHQUFpQyxJQUFJLEVBQXpDLEVBQTZDO0FBQ3pDUCxNQUFBQSxNQUFNLENBQUNRLFFBQVAsR0FBa0IsS0FBbEI7QUFDQVIsTUFBQUEsTUFBTSxDQUFDUyxTQUFQLEdBQW1CLElBQW5CO0FBQ0gsS0FIRCxNQUdPO0FBQ0hULE1BQUFBLE1BQU0sQ0FBQ1EsUUFBUCxHQUFrQixJQUFsQjtBQUNBUixNQUFBQSxNQUFNLENBQUNTLFNBQVAsR0FBbUIsS0FBbkI7QUFDSDtBQUNKLEdBYk87O0FBZVI7Ozs7O0FBS0FDLEVBQUFBLGFBcEJRLHlCQW9CTUMsR0FwQk4sRUFvQldDLEtBcEJYLEVBb0JrQkMsT0FwQmxCLEVBb0IyQkMsSUFwQjNCLEVBb0JpQztBQUNyQyxRQUFJQyxNQUFN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LyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEYXRhIGZyb20gJy4uL2RhdGFTdGF0aXN0aWNzL0RhdGEnO1xuXG4vKipcbiAqIOWRveWQjSBub2RlID0gbl8gIGxhYmVsID0gbF8gIHNwcml0ZSA9IHNwXyBidXR0b24gPSBidG5fICAgc2Nyb2xsVmlldyA9IHNjX1xuICovXG5sZXQgdCA9IGNvbnNvbGUubG9nO1xuY29uc29sZS5sb2cgPSBmdW5jdGlvbiAoLi4ucGFyYW0pIHtcbiAgICAvLyB0KC4uLnBhcmFtKTtcbn1cbnZhciBVdGlscyA9IHtcblxuICAgIC8v6YCC6YWN5YiG6L6o546H6buY6K6k6auY5bqm6YCC6YWN77yMaXBob25leOWuveW6pumAgumFjVxuICAgIHNldERlc2lnblJlc29sdXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNhbnZhcyA9IGNjLmZpbmQoXCJDYW52YXNcIikuZ2V0Q29tcG9uZW50KGNjLkNhbnZhcyk7XG4gICAgICAgIGxldCB3aW5TaXplID0gY2Mud2luU2l6ZVxuICAgICAgICBpZiAod2luU2l6ZS53aWR0aCAvIHdpblNpemUuaGVpZ2h0ID4gOSAvIDE2KSB7XG4gICAgICAgICAgICBjYW52YXMuZml0V2lkdGggPSBmYWxzZTtcbiAgICAgICAgICAgIGNhbnZhcy5maXRIZWlnaHQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FudmFzLmZpdFdpZHRoID0gdHJ1ZTtcbiAgICAgICAgICAgIGNhbnZhcy5maXRIZWlnaHQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IOS/neWtmOeahOmUruWAvFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSAg5L+d5a2Y55qE5YC8XG4gICAgICovXG4gICAgc2V0S1ZVc2VyRGF0YShrZXksIHZhbHVlLCBzdWNjZXNzLCBmYWlsKSB7XG4gICAgICAgIGlmICh3aW5kb3cuR0FNRV9TQVZFX1RZUEUgPT09IDEpIHtcbiAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIERhdGEuc2V0RGF0YSh2YWx1ZSwgc3VjY2VzcywgZmFpbCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleSDojrflj5blr7nlupTlhoXlrrnnmoTplK7lgLxcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY2FsbGJhY2sg5a2Y5YKo5pyN5Yqh56uv55qE6K+d6ZyA6KaB5Zue6LCD5Ye95pWwXG4gICAgICovXG4gICAgZ2V0S1ZVc2VyRGF0YShrZXksIHN1Y2Nlc3MsIGZhaWwpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5HQU1FX1NBVkVfVFlQRSA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgRGF0YS5nZXREYXRhKHN1Y2Nlc3MsIGZhaWwpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpbWFnVXJsIOebuOWvuXJlc2NvdXJzZeS4i+eahOi3r+W+hFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0eXBlIOWKoOi9vei1hOa6kOexu+Wei1xuICAgICAqIEBwYXJhbSB7Kn0gY2FsbGJhY2sg5Yqg6L295LmL5ZCO5Zue6LCDXG4gICAgICovXG4gICAgbG9hZFJlcyhpbWFnVXJsLCB0eXBlLCBjYWxsYmFjaykge1xuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhpbWFnVXJsLCB0eXBlLCBmdW5jdGlvbiAoZXJyLCBvYmopIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcihlcnIubWVzc2FnZSB8fCBlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHR5cGVvZiAoY2FsbGJhY2spID09ICdmdW5jdGlvbicgJiYgY2FsbGJhY2sob2JqKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHsqfSBub2RlIOa3oeWFpeiKgueCuVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lIOa3oeWFpeaXtumXtCDpu5jorqQxc1xuICAgICAqL1xuICAgIGZhZGVJbihub2RlLCB0aW1lKSB7XG4gICAgICAgIGxldCBmYWRldGltZSA9IHRpbWUgPyB0aW1lIDogMVxuICAgICAgICBub2RlLm9wYWNpdHkgPSAwO1xuICAgICAgICBub2RlLnJ1bkFjdGlvbihjYy5mYWRlSW4oZmFkZXRpbWUpKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5LiK5Lyg5pyN5Yqh5Zmo55qE5a2Y5YKo5L+h5oGvXG4gICAgICovXG4gICAgZ2V0U2F2ZURhdGEoY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHdpbmRvdy5HQU1FX1NBVkVfVFlQRSA9PT0gMSkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0od2luZG93LkdBTUVfU0FWRV9IQU5ETEVSKTtcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKHdpbmRvdy5HQU1FX1NBVkVfSEFORExFUiwgSlNPTi5zdHJpbmdpZnkod2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEpKTtcbiAgICAgICAgICAgICAgICBkYXRhID0gd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihjYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgIGNvbnN0IERCID0gd3guY2xvdWQuZGF0YWJhc2Uoe1xuICAgICAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICAgICAgICBlbnY6IHdpbmRvdy5FTlYsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIERCLmNvbGxlY3Rpb24oXCJ0b2Rvc1wiKS5kb2Mod2luZG93LnVzZXJJbmZvLm9wZW5JZCkuZ2V0KHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzLmRhdGEuc2tpbikgcmVzLmRhdGEuc2tpbiA9IHdpbmRvdy5TS0lOX0NPTkZJR19TVEFURTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEgPSByZXMuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZhaWw6IChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmYWlsXCIsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5uZWVkX2FkZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sod2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNvbXBsZXRlXCIsIGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGpzb25vYmog5a2Y5YKo5L+h5oGv6Kej5p6QXG4gICAgICovXG4gICAgc2V0U2F2ZURhdGEoKSB7XG4gICAgICAgIGlmICh3aW5kb3cuR0FNRV9TQVZFX1RZUEUgPT09IDEpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5pys5Zyw5pWw5o2u6K6+572u5oiQ5YqfXCIsIEpTT04uc3RyaW5naWZ5KHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBKSk7XG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0od2luZG93LkdBTUVfU0FWRV9IQU5ETEVSLCBKU09OLnN0cmluZ2lmeSh3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgREIgPSB3eC5jbG91ZC5kYXRhYmFzZSh7XG4gICAgICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgICAgIGVudjogd2luZG93LkVOVixcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLl9pZCA9IHdpbmRvdy51c2VySW5mby5vcGVuSWQ7XG4gICAgICAgICAgICBpZiAod2luZG93Lm5lZWRfYWRkKSB7XG4gICAgICAgICAgICAgICAgREIuY29sbGVjdGlvbihcInRvZG9zXCIpLmFkZCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMsIFwiYWRkIGRhdGEgZ29vZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5uZWVkX2FkZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmYWlsOiAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImZhaWwgXCIsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBEQi5jb2xsZWN0aW9uKFwidG9kb3NcIikuZG9jKHdpbmRvdy51c2VySW5mby5vcGVuSWQpLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvbGRfbnVtOiB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS5nb2xkX251bSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2luX3RpbWU6IHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLmxvZ2luX3RpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sOiB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS50b29sLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wX2xldmVsOiB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS50b3BfbGV2ZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3Bfc2NvcmU6IHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLnRvcF9zY29yZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraW46IHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLnNraW4sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcywgXCJhZGQgZGF0YSBnb29kXCIpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmYWlsOiAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImZhaWwgXCIsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfW1pbiBtYXjpmo/mnLrmlbDojIPlm7RcbiAgICAgKi9cbiAgICByYW5kb20obWluLCBtYXgpIHtcbiAgICAgICAgcmV0dXJuIG1pbiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5Lik5Liq54K555qE5aS56KeSXG4gICAgICovXG4gICAgZ2V0QW5nbGUoeDEsIHkxLCB4MiwgeTIpIHtcbiAgICAgICAgLy8g55u06KeS55qE6L656ZW/XG4gICAgICAgIHZhciB4ID0gTWF0aC5hYnMoeDEgLSB4Mik7XG4gICAgICAgIHZhciB5ID0gTWF0aC5hYnMoeTEgLSB5Mik7XG4gICAgICAgIC8vIOaWnOi+uemVv1xuICAgICAgICB2YXIgeiA9IE1hdGguc3FydChNYXRoLnBvdyh4LCAyKSArIE1hdGgucG93KHksIDIpKTtcbiAgICAgICAgLy8g5L2Z5bymXG4gICAgICAgIHZhciBjb3MgPSB5IC8gejtcbiAgICAgICAgLy8g5byn5bqmXG4gICAgICAgIHZhciByYWRpbmEgPSBNYXRoLmFjb3MoY29zKTtcbiAgICAgICAgLy8g6KeS5bqmXG4gICAgICAgIHZhciBhbmdsZSA9IDE4MCAvIChNYXRoLlBJIC8gcmFkaW5hKTtcbiAgICAgICAgcmV0dXJuIGFuZ2xlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyDku47nu5nlrprmlbTmlbDojIPlm7TlhoXnlJ/miJBu5Liq5LiN6YeN5aSN55qE6ZqP5py65pWwIG7kuI3og73otoXov4fnu5nlrprojIPlm7RcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbWluIFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtYXggXG4gICAgICovXG4gICAgZ2V0UmFuZG9tU0RpZmYobWluLCBtYXgsIG4pIHtcbiAgICAgICAgaWYgKG1heCAtIG1pbiArIDEgPCBuKSByZXR1cm4gW107XG4gICAgICAgIHZhciBvcmlnaW5hbEFycmF5ID0gbmV3IEFycmF5O1xuICAgICAgICB2YXIgbGVuID0gbWF4IC0gbWluICsgMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgb3JpZ2luYWxBcnJheVtpXSA9IG1pbiArIGk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJhbmRvbUFycmF5ID0gbmV3IEFycmF5O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgbGV0IHQgPSB0aGlzLnJhbmRvbSgwLCBsZW4gLSAxIC0gaSlcbiAgICAgICAgICAgIHJhbmRvbUFycmF5W2ldID0gb3JpZ2luYWxBcnJheVt0XTtcbiAgICAgICAgICAgIHZhciB0ZW1wID0gb3JpZ2luYWxBcnJheVtsZW4gLSAxIC0gaV07XG4gICAgICAgICAgICBvcmlnaW5hbEFycmF5W2xlbiAtIDEgLSBpXSA9IG9yaWdpbmFsQXJyYXlbdF07XG4gICAgICAgICAgICBvcmlnaW5hbEFycmF5W3RdID0gdGVtcDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmFuZG9tQXJyYXk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIOaYvuekuumBk+WFt+iOt+W+l1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBudW0gXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHR5cGUgMCDngrjlvLkgMemHkeW4gVxuICAgICAqIEBwYXJhbSB7YW55fSBwYXJlbnROb2RlIFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB4IFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB5IFxuICAgICAqL1xuICAgIHNob3dHZXRJdGVtKG51bSwgdHlwZSwgcGFyZW50Tm9kZSwgeCwgeSkge1xuICAgICAgICB0aGlzLmxvYWRSZXMoXCJwcmVmYWJzL3RleHRiZ1wiLCBjYy5QcmVmYWIsIChvYmopID0+IHtcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUob2JqKTtcbiAgICAgICAgICAgIG5vZGUuemluZGV4ID0gMTAwMDtcbiAgICAgICAgICAgIGxldCBsYWJlbG5vZGUgPSBub2RlLmdldENoaWxkQnlOYW1lKCdsX251bScpO1xuICAgICAgICAgICAgbGV0IGdvbGRub2RlID0gbm9kZS5nZXRDaGlsZEJ5TmFtZSgnc3BfZ29sZCcpO1xuICAgICAgICAgICAgbGV0IGJvb21ub2RlID0gbm9kZS5nZXRDaGlsZEJ5TmFtZSgnc3BfYm9vbScpO1xuICAgICAgICAgICAgaWYgKHR5cGUgPT0gMCkge1xuICAgICAgICAgICAgICAgIGxhYmVsbm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGNjLmpzLmZvcm1hdFN0cihcIue7iOaegei9sOeCuHglZFwiLCBudW0pO1xuICAgICAgICAgICAgICAgIGdvbGRub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJvb21ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxhYmVsbm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGNjLmpzLmZvcm1hdFN0cihcIumHkeW4gXglZFwiLCBudW0pO1xuICAgICAgICAgICAgICAgIGdvbGRub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYm9vbW5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgeHggPSB4ID8geCA6IDA7XG4gICAgICAgICAgICBsZXQgeXkgPSB5ID8geSA6IDA7XG5cbiAgICAgICAgICAgIGlmIChwYXJlbnROb2RlICYmIGNjLmlzVmFsaWQocGFyZW50Tm9kZSkpIHtcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IGNjLmZpbmQoXCJDYW52YXNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKHh4LCB5eSk7XG4gICAgICAgICAgICBsZXQgbW92ZXRpbWUgPSAxLjU7XG4gICAgICAgICAgICBsZXQgZGlzID0gNzA7XG4gICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKHh4LCB5eSk7XG4gICAgICAgICAgICB2YXIgYWN0aW9uMSA9IGNjLm1vdmVCeShtb3ZldGltZSwgY2MudjIoMCwgZGlzKSlcbiAgICAgICAgICAgIHZhciBhY3Rpb24yID0gY2MuZmFkZU91dCgxKVxuICAgICAgICAgICAgbm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoYWN0aW9uMSwgYWN0aW9uMiwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgICAgIG5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgfSkpKTtcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRleHQg5paH5a2X5o+P6L+wXG4gICAgICogQHBhcmFtIHsqfSBwYXJlbnROb2RlIOeItuiKgueCue+8jOm7mOiupGNjLmZpbmQoXCJDYW52YXNcIilcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geCAq5Z2Q5qCHeOm7mOiupDBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geSAq5Z2Q5qCHeem7mOiupDBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZm9udF9zaXplKuWtl+S9k+Wkp+Wwj+m7mOiupDQwXG4gICAgICogQHBhcmFtIHsqfSBjb2xvciDlrZfkvZPpopzoibJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGltZSDpo5jlrZfnp7vliqjml7bpl7RcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geWRpcyDnp7vliqjot53nprtcbiAgICAgKi9cbiAgICBzaG93VGlwc1RleHQodGV4dCwgcGFyZW50Tm9kZSwgeCwgeSwgZm9udF9zaXplLCBjb2xvciwgdGltZSwgeWRpcykge1xuICAgICAgICB2YXIgbm9kZSA9IG5ldyBjYy5Ob2RlKCd0aXBzdGV4dCcpO1xuICAgICAgICBub2RlLnppbmRleCA9IDEwMDA7XG4gICAgICAgIHZhciBsYWJlbCA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgbGFiZWwuZm9udEZhbWlseSA9ICfpu5HkvZMnO1xuICAgICAgICBsYWJlbC5zdHJpbmcgPSB0ZXh0O1xuICAgICAgICBsZXQgeHggPSB4ID8geCA6IDA7XG4gICAgICAgIGxldCB5eSA9IHkgPyB5IDogMDtcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSBmb250X3NpemUgPyBmb250X3NpemUgOiA0MDtcbiAgICAgICAgbGFiZWwubGluZUhlaWdodCA9IGZvbnRfc2l6ZSA/IGZvbnRfc2l6ZSArIDEwIDogNTA7XG4gICAgICAgIG5vZGUuY29sb3IgPSBjb2xvciA/IGNvbG9yIDogY2MuQ29sb3IuV0hJVEU7XG4gICAgICAgIGlmIChwYXJlbnROb2RlICYmIGNjLmlzVmFsaWQocGFyZW50Tm9kZSkpIHtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZChcIkNhbnZhc1wiKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbW92ZXRpbWUgPSB0aW1lID8gdGltZSA6IDAuNTtcbiAgICAgICAgbGV0IGRpcyA9IHlkaXMgPyB5ZGlzIDogNzA7XG4gICAgICAgIG5vZGUuc2V0UG9zaXRpb24oeHgsIHl5KTtcbiAgICAgICAgdmFyIGFjdGlvbjEgPSBjYy5tb3ZlQnkobW92ZXRpbWUsIGNjLnYyKDAsIGRpcykpXG4gICAgICAgIHZhciBhY3Rpb24yID0gY2MuZmFkZU91dCgxKVxuICAgICAgICBub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShhY3Rpb24xLCBhY3Rpb24yLCBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICBub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgfSkpKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdGV4dCDmloflrZfmj4/ov7BcbiAgICAgKiBAcGFyYW0geyp9IHBhcmVudE5vZGUg54i26IqC54K577yM6buY6K6kY2MuZmluZChcIkNhbnZhc1wiKVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB4ICrlnZDmoId46buY6K6kMFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB5ICrlnZDmoId56buY6K6kMFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBmb250X3NpemUq5a2X5L2T5aSn5bCP6buY6K6kNDBcbiAgICAgKiBAcGFyYW0geyp9IGNvbG9yIOWtl+S9k+minOiJslxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lIOmjmOWtl+enu+WKqOaXtumXtFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB5ZGlzIOenu+WKqOi3neemu1xuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gYm9vIOaYr+WQpuS4jemcgOimgei3s+i3g+aViOaenFxuICAgICAqL1xuICAgIHNob3dIdXJ0VGV4dCh0ZXh0LCBwYXJlbnROb2RlLCB4LCB5LCBmb250X3NpemUsIGNvbG9yLCB0aW1lLCB5ZGlzLCBib28pIHtcbiAgICAgICAgdGhpcy5sb2FkUmVzKFwicHJlZmFicy9sX2h1cnRcIiwgY2MuUHJlZmFiLCAob2JqKSA9PiB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKG9iaik7XG4gICAgICAgICAgICBub2RlLnppbmRleCA9IDEwMDA7XG4gICAgICAgICAgICBsZXQgbGFiZWwgPSBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSB0ZXh0O1xuICAgICAgICAgICAgbGV0IHh4ID0geCA/IHggOiAwO1xuICAgICAgICAgICAgbGV0IHl5ID0geSA/IHkgOiAwO1xuICAgICAgICAgICAgbGFiZWwuZm9udFNpemUgPSBmb250X3NpemUgPyBmb250X3NpemUgOiA0MDtcbiAgICAgICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSA4MDsvL2ZvbnRfc2l6ZSA/IGZvbnRfc2l6ZSArIDEwIDogNDA7XG4gICAgICAgICAgICBub2RlLmNvbG9yID0gY29sb3IgPyBjb2xvciA6IGNjLkNvbG9yLldISVRFO1xuICAgICAgICAgICAgaWYgKHBhcmVudE5vZGUgJiYgY2MuaXNWYWxpZChwYXJlbnROb2RlKSkge1xuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY2MuZmluZChcIkNhbnZhc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBtb3ZldGltZSA9IHRpbWUgPyB0aW1lIDogMC41O1xuICAgICAgICAgICAgbGV0IGRpcyA9IHlkaXMgPyB5ZGlzIDogMTtcbiAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oeHgsIHl5KTtcbiAgICAgICAgICAgIHRoaXMuZGlyID0gIXRoaXMuZGlyO1xuICAgICAgICAgICAgbGV0IG1vdmV4ID0gdGhpcy5kaXIgPyAtMSA6IDE7XG4gICAgICAgICAgICBpZiAoYm9vKSBkaXMgPSAwO1xuICAgICAgICAgICAgdmFyIGFjdGlvbjEgPSBjYy5qdW1wQnkobW92ZXRpbWUsIGRpcyAqIDEwMCAqIG1vdmV4LCAtMzAsIDEwMCwgMSk7XG4gICAgICAgICAgICB2YXIgYWN0aW9uMiA9IGNjLmZhZGVPdXQoMC44KTtcbiAgICAgICAgICAgIG5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGFjdGlvbjEsIGFjdGlvbjIsIGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgICAgICAgICBub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBub2RlID0gbnVsbDtcbiAgICAgICAgICAgIH0pKSk7XG4gICAgICAgIH0pXG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogICAgICAgICAgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNwcml0ZV9uYW1lIOi1hOa6kOi3r+W+hFxuICAgICAqIEBwYXJhbSB7Kn0gcGFyZW50Tm9kZSDniLboioLngrkg6buY6K6kY2FudmFzXG4gICAgICogQHBhcmFtIHtWZWMyfSBzdGFydHBvcyDlvIDlp4vkvY3nva5cbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHRhcmdldHBvcyDnu5PmnZ/kvY3nva5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayDlm57osINcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGltZSDml7bpl7RcbiAgICAgKiBAcGFyYW0geyp9IHR5cGUg57G75Z6L77yM5piv5ZCm6ZyA6KaB5re75Yqg5LiA5LiqanVtcFxuICAgICAqL1xuICAgIG1vdmVJY29uKHNwcml0ZV9uYW1lLCBwYXJlbnROb2RlLCBzdGFydHBvcywgdGFyZ2V0cG9zLCBjYWxsYmFjaywgdGltZSwgdHlwZSkge1xuICAgICAgICBsZXQgcnVudGltZSA9IHRpbWUgPyB0aW1lIDogMTtcbiAgICAgICAgLy8gdGhpcy5sb2FkUmVzKHNwcml0ZV9uYW1lLCBjYy5TcHJpdGVGcmFtZSwgKHNwcml0ZSkgPT4ge1xuICAgICAgICB2YXIgbm9kZSA9IG5ldyBjYy5Ob2RlKCdpY29ubW92ZScpO1xuICAgICAgICB2YXIgc3ByaXRlbm9kZSA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIHNwcml0ZW5vZGUuc3ByaXRlRnJhbWUgPSBzcHJpdGVfbmFtZTtcbiAgICAgICAgaWYgKHBhcmVudE5vZGUgJiYgY2MuaXNWYWxpZChwYXJlbnROb2RlKSkge1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBjYy5maW5kKFwiQ2FudmFzXCIpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkaXIgPSBVdGlscy5yYW5kb20oMCwgMTAwMCk7XG4gICAgICAgIG5vZGUuYW5jaG9yWSA9IDA7XG4gICAgICAgIG5vZGUucG9zaXRpb24gPSBzdGFydHBvcztcbiAgICAgICAgbm9kZS56aW5kZXggPSAxMDAwO1xuICAgICAgICBpZiAodHlwZSAmJiB0eXBlID4gMCkge1xuICAgICAgICAgICAgaWYgKGRpciA+IDUwMCkge1xuICAgICAgICAgICAgICAgIHR5cGUgPSAtMSAqIHR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5qdW1wQnkoMC41LCB0eXBlLCAwLCAxMDAsIDEpLCBjYy5kZWxheVRpbWUoMC41KSwgY2MubW92ZVRvKHJ1bnRpbWUsIHRhcmdldHBvcykuZWFzaW5nKGNjLmVhc2VJbigzLjApKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICBub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH0pKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5tb3ZlVG8ocnVudGltZSwgdGFyZ2V0cG9zKS5lYXNpbmcoY2MuZWFzZUluKDMuMCkpLCBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIG5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgfSkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIH0pXG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICog5re75Yqg6Z+z5pWIXG4gICAgICogQHBhcmFtIG11c2ljVXJsIOmfs+aViOi3r+W+hFxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIFNldFNvdW5kRWZmZWN0KG11c2ljVXJsLCBib28sIHZvbHVtKSB7XG4gICAgICAgIGxldCB2b2x1ZW0gPSB2b2x1bSA/IHZvbHVtIDogMTtcbiAgICAgICAgaWYgKHdpbmRvdy5NVVNJQ19TSE9XX09GRikge1xuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMobXVzaWNVcmwsIGNjLkF1ZGlvQ2xpcCwoZXJyLGNsaXApPT57XG4gICAgICAgICAgICAgICAgd2luZG93LmJnbUF1ZGlvSUQgPSBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KGNsaXAsIGZhbHNlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyB2YXIgYXVkaW9VcmwgPSBjYy51cmwucmF3KFwicmVzb3VyY2VzL1wiICsgbXVzaWNVcmwpO1xuICAgICAgICAgICAgLy8gY2MuYXVkaW9FbmdpbmUucGxheShhdWRpb1VybCwgYm9vLCB2b2x1ZW0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8v5pKt5pS+6IOM5pmv6Z+z5LmQXG4gICAgcGxheUJnbU11c2ljKG11c2ljVXJsLCB2b2x1bSkge1xuICAgICAgICB0aGlzLnJlc3VtQmdtTXVzaWMobXVzaWNVcmwsIHZvbHVtKTtcbiAgICB9LFxuXG4gICAgcmVzdW1CZ21NdXNpYyhtdXNpY1VybCwgdm9sdW0pIHtcbiAgICAgICAgbGV0IHVybCA9IG11c2ljVXJsID8gbXVzaWNVcmwgOiB3aW5kb3cuQkdNO1xuICAgICAgICBsZXQgdm9pY2UgPSB2b2x1bSA/IHZvbHVtIDogMC44O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5NVVNJQ19TSE9XX09GRikge1xuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuYmdtQXVkaW9JRCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZSh3aW5kb3cuYmdtQXVkaW9JRCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHdpbmRvdy5iZ21BdWRpb0lEID0gLTE7XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmFyIGF1ZGlvVXJsID0gY2MudXJsLnJhdyhcInJlc291cmNlcy9cIiArIHVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyh1cmwsIGNjLkF1ZGlvQ2xpcCwgKGVyciwgY2xpcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5iZ21BdWRpb0lEID0gY2MuYXVkaW9FbmdpbmUucGxheU11c2ljKGNsaXAsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihcIndpbmRvdy5iZ21BdWRpb0lEXCIsIHdpbmRvdy5iZ21BdWRpb0lEKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHVybCwgY2MuQXVkaW9DbGlwLCAoZXJyLCBjbGlwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5iZ21BdWRpb0lEID0gY2MuYXVkaW9FbmdpbmUucGxheU11c2ljKGNsaXAsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihcIndpbmRvdy5iZ21BdWRpb0lEXCIsIHdpbmRvdy5iZ21BdWRpb0lEKTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvL+WBnOatouiDjOaZr+mfs+S5kFxuICAgIHN0b3BCZ21NdXNpYygpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKHdpbmRvdy5iZ21BdWRpb0lEKSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBhdXNlKHdpbmRvdy5iZ21BdWRpb0lEKVxuICAgICAgICAgICAgICAgIC8vIHdpbmRvdy5iZ21BdWRpb0lEID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8v5qC85byP5YyW56eS5pWwXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHNlYyDnp5LmlbBcbiAgICAgKi9cbiAgICBmb3JtYXRTZWNUb1RpbWUocykge1xuICAgICAgICB2YXIgdDtcbiAgICAgICAgaWYgKHMgPiAtMSkge1xuICAgICAgICAgICAgdmFyIGhvdXIgPSBNYXRoLmZsb29yKHMgLyAzNjAwKTtcbiAgICAgICAgICAgIHZhciBtaW4gPSBNYXRoLmZsb29yKHMgLyA2MCkgJSA2MDtcbiAgICAgICAgICAgIHZhciBzZWMgPSBzICUgNjA7XG4gICAgICAgICAgICBpZiAoaG91ciA8IDEwKSB7XG4gICAgICAgICAgICAgICAgdCA9ICcwJyArIGhvdXIgKyBcIjpcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdCA9IGhvdXIgKyBcIjpcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1pbiA8IDEwKSB7IHQgKz0gXCIwXCI7IH1cbiAgICAgICAgICAgIHQgKz0gbWluICsgXCI6XCI7XG4gICAgICAgICAgICBpZiAoc2VjIDwgMTApIHsgdCArPSBcIjBcIjsgfVxuICAgICAgICAgICAgdCArPSBzZWM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfSxcblxuICAgIGdldE1pbihhLCBiKSB7XG4gICAgICAgIGxldCBtaW4gPSBhID4gYiA/IGIgOiBhO1xuICAgICAgICByZXR1cm4gbWluO1xuICAgIH0sXG5cbiAgICBnZXRNYXgoeCwgaSkge1xuICAgICAgICBsZXQgbWF4ID0geCA+IGkgPyB4IDogaTtcbiAgICAgICAgcmV0dXJuIG1heDtcbiAgICB9LFxuXG4gICAgLy90eXBlOnR5cGXkuLox55qE5pe25YCZ5pu05YC+5ZCR5LqO5aSn6L+Z6L65XG4gICAgZ2V0TWlkZGxlSW5kZXgobWluLCBtYXgsIHR5cGUpIHtcbiAgICAgICAgbGV0IGxlbiA9IG1heCAtIG1pbjtcbiAgICAgICAgaWYgKGxlbiAlIDIgPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGxlbiAvIDIgKyBtaW47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwobGVuIC8gMikgKyBtaW47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKGxlbiAvIDIpICsgbWluO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVXRpbHM7Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/ShapeItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f7756iw0ZVBxpZpYOFetAz7', 'ShapeItem');
// Script/item/ShapeItem.js

"use strict";

var Utils = require("Utils");

var GameMain = require('GameMain');

var scaleParam = 0.5;
var colorlist = ['#ffffff', '#f9bd1d', '#003DFF', '#85d546', '#D6309A'];
cc.Class({
  "extends": cc.Component,
  properties: {
    m_spa_blocklist: cc.SpriteAtlas,
    GameLayer: {
      "default": null,
      type: GameMain
    }
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {
    this._bg_color = 0;
    this._type_index = 0;
    this._colorindex = 1; // this.updateIndex();

    if (window.INIT_GAME_SAVE_DATA.top_level < 1 && !window.GUIDE_LEVEL) {
      //showguai
      this.resetBlock(22);
      this.GameLayer.showGuide();
    } else {
      this.resetBlock();
    } // let oneNode = this.createItem();
    // this.node.addChild(oneNode);


    this.addTouchEvent();
    this._blockcount = 0; //5个循环，5个之后必定出现一个单个的
  },
  updateIndex: function updateIndex(boo) {
    var indexlist = window.INIT_GAME_SAVE_DATA.skin;

    for (var i = 0; i < indexlist.length; i++) {
      if (indexlist[i] >= 2) {
        this._type_index = i;
        break;
      }
    }

    this._data = window.SKIN_CONFIG[this._type_index];

    if (boo) {
      var node = this.node.getChildByName('n_shape');

      if (node) {
        for (var _i = 0; _i < node.childrenCount; _i++) {
          node.children[_i].getComponent(cc.Sprite).spriteFrame = this.m_spa_blocklist.getSpriteFrame(this._data.name + this._colorindex);
        }
      }
    }

    return this._type_index;
  },
  //获取方块配置
  getTheConfig: function getTheConfig() {
    var a = 109.77249200050075;
    var h = 110;
    var height = 95;
    var cos60 = Math.cos(60 * Math.PI / 180);
    var sin60 = Math.sin(60 * Math.PI / 180);
    var cos120 = Math.cos(120 * Math.PI / 180);
    var sin120 = Math.sin(120 * Math.PI / 180);
    var cos300 = Math.cos(300 * Math.PI / 180);
    var sin300 = Math.sin(300 * Math.PI / 180);
    var configLists = [//一个
    [cc.v2(0, 0)], //四个
    // [cc.v2(0, 0), cc.v2(cos60 * a, sin60 * a)],
    // [cc.v2(0, 0), cc.v2(cos120 * a, sin120 * a)],
    // [cc.v2(0, 0), cc.v2(h, 0), cc.v2(h * 2, 0)],
    [cc.v2(0, 0), cc.v2(h, 0), cc.v2(h * 2, 0), cc.v2(h * 3, 0)], //横摆1 ----
    [cc.v2(0, 0), cc.v2(h, 0), cc.v2(h * 2, 0), cc.v2(h + cos60 * a, sin60 * a)], //横摆2   --=-
    [cc.v2(0, 0), cc.v2(h, 0), cc.v2(h * 2, 0), cc.v2(h + cos300 * a, sin300 * a)], //横摆3 --T-
    [cc.v2(0, 0), cc.v2(h, 0), cc.v2(h * 2, 0), cc.v2(cos60 * a, sin60 * a)], //横摆4
    [cc.v2(0, 0), cc.v2(h, 0), cc.v2(h * 2, 0), cc.v2(cos300 * a, sin300 * a)], //横摆5
    [cc.v2(0, 0), cc.v2(cos60 * a, sin60 * a), cc.v2(cos60 * a * 2, sin60 * a * 2), cc.v2(cos120 * a, sin120 * a)], //斜上摆1
    [cc.v2(0, 0), cc.v2(cos60 * a, sin60 * a), cc.v2(cos60 * a * 2, sin60 * a * 2), cc.v2(cos120 * a + cos60 * a, sin120 * a + sin60 * a)], //斜上摆2
    [cc.v2(0, 0), cc.v2(cos60 * a, sin60 * a), cc.v2(cos60 * a * 2, sin60 * a * 2), cc.v2(h, 0)], //斜上摆3
    [cc.v2(0, 0), cc.v2(cos60 * a, sin60 * a), cc.v2(cos60 * a * 2, sin60 * a * 2), cc.v2(cos60 * a + h, sin60 * a)], //斜上摆4
    [cc.v2(0, 0), cc.v2(cos60 * a, sin60 * a), cc.v2(cos60 * a * 2, sin60 * a * 2), cc.v2(cos60 * a * 3, sin60 * a * 3)], //斜上直线
    [cc.v2(0, 0), cc.v2(cos120 * a, sin120 * a), cc.v2(cos120 * a * 2, sin120 * a * 2), cc.v2(cos120 * a * 2 + h, sin120 * a * 2)], //斜下摆1
    [cc.v2(0, 0), cc.v2(cos120 * a, sin120 * a), cc.v2(cos120 * a * 2, sin120 * a * 2), cc.v2(cos120 * a - h, sin120 * a)], //斜下摆2
    [cc.v2(0, 0), cc.v2(cos120 * a, sin120 * a), cc.v2(cos120 * a * 2, sin120 * a * 2), cc.v2(cos120 * a + h, sin120 * a)], //斜下摆3
    [cc.v2(0, 0), cc.v2(cos120 * a, sin120 * a), cc.v2(cos120 * a * 2, sin120 * a * 2), cc.v2(-h, 0)], //斜下摆4
    [cc.v2(0, 0), cc.v2(cos120 * a, sin120 * a), cc.v2(cos120 * a * 2, sin120 * a * 2), cc.v2(cos120 * a * 3, sin120 * a * 3)], //斜下直线
    [cc.v2(0, 0), cc.v2(cos60 * a, sin60 * a), cc.v2(cos60 * a + h, sin60 * a), cc.v2(2 * h, 0)], //拱桥1
    [cc.v2(0, 0), cc.v2(cos300 * a, sin300 * a), cc.v2(cos300 * a + h, sin300 * a), cc.v2(2 * h, 0)], //拱桥2
    [cc.v2(0, 0), cc.v2(cos120 * a, sin120 * a), cc.v2(0, 2 * height), cc.v2(h, 2 * height)], //拱桥3
    [cc.v2(0, 0), cc.v2(cos60 * a, sin60 * a), cc.v2(0, 2 * height), cc.v2(-h, 2 * height)], //拱桥4
    [cc.v2(0, 0), cc.v2(cos120 * a, sin120 * a), cc.v2(0, 2 * height), cc.v2(h, 0)], //拱桥5
    [cc.v2(0, 0), cc.v2(cos60 * a, sin60 * a), cc.v2(0, 2 * height), cc.v2(-h, 0)], //拱桥6
    [cc.v2(0, 0), cc.v2(cos120 * a, sin120 * a), cc.v2(0, 2 * height), cc.v2(cos300 * a, 2 * height + sin300 * a)], //四方四方
    [cc.v2(0, 0), cc.v2(cos60 * a, sin60 * a), cc.v2(h, 0), cc.v2(cos60 * a + h, sin60 * a)], //斜四方/
    [cc.v2(0, 0), cc.v2(cos120 * a, sin120 * a), cc.v2(-h, 0), cc.v2(cos120 * a - h, sin120 * a)] //斜四方\
    ];
    return configLists;
  },
  //创建单个六边形 colorIndex 颜色下标
  newOneK: function newOneK(colorIndex) {
    //创建一个块
    var node = new cc.Node("colorSpr");
    node.colorIndex = colorIndex;
    node.colorName = this._data.name;
    var sprite = node.addComponent(cc.Sprite);
    sprite.spriteFrame = this.m_spa_blocklist.getSpriteFrame(this._data.name + colorIndex);
    return node;
  },
  getCurColorIndex: function getCurColorIndex() {
    return this._colorindex;
  },
  createItem: function createItem(index) {
    this._blockcount++;

    if (this._blockcount >= 5) {
      // index = 0;
      this._next = 0;
      this._blockcount = 0;
    }

    if (typeof this._next == 'number' && !index) {
      index = this._next;
      this._next = null;

      if (index == 0) {
        this._blockcount = 0;
      }
    }

    var shapeitem = new cc.Node("n_shape");
    var config = this.getTheConfig();
    var randomIndex = Utils.random(0, config.length);

    if (typeof index == 'number' && index >= 0) {
      randomIndex = index;
    }

    if (randomIndex == 0) {
      //碰到一也重置
      this._blockcount = 0;
    }

    var posList = config[randomIndex];
    var randomIndexColor = Utils.random(1, 5);
    this._bg_color = colorlist[randomIndexColor];
    this._colorindex = randomIndexColor;
    var sumX = 0;
    var countX = 0;
    var sumY = 0;
    var countY = 0;

    for (var _index = 0; _index < posList.length; _index++) {
      var pos = posList[_index];
      var kuai = this.newOneK(randomIndexColor);
      kuai.x = pos.x;
      sumX += kuai.x;
      countX++;
      kuai.y = pos.y;
      sumY += kuai.y;
      countY++;
      shapeitem.addChild(kuai);
    }

    shapeitem.setScale(scaleParam);
    shapeitem.x = -sumX / countX * scaleParam;
    shapeitem.y = -sumY / countY * scaleParam;
    return shapeitem;
  },
  //添加触摸
  addTouchEvent: function addTouchEvent() {
    var upH = 130;
    var self = this;
    this.node.ox = this.node.x;
    this.node.oy = this.node.y;
    this.node.on(cc.Node.EventType.TOUCH_START, function () {
      this.node.y += upH;
      Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 0.8);
      this.node.getChildByName("n_shape").setScale(1);
    }, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
      var delta = event.touch.getDelta();
      this.node.x += delta.x;
      this.node.y += delta.y;
      self.collisionFunc(); // //变色处理

      if (!self.checkIsCanDrop()) {
        self.changeColorDeal(true);
      } else {
        self.changeColorDeal();
      }
    }, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
      this.dropDownFunc();
    }, this);
    this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
      this.dropDownFunc();
    }, this);
  },
  //检测是否能够放下
  checkIsCanDrop: function checkIsCanDrop() {
    //先判断数量是否一致，不一致说明有一个超出去了
    if (!this._checkFrameList || this._checkFrameList.length == 0 || this._checkFrameList.length != this.node.children[0].children.length) {
      return false;
    } //检测放下的格子是否已经有方块


    for (var i = 0; i < this._checkFrameList.length; i++) {
      if (this._checkFrameList[i].isHaveFK) {
        return false;
      }
    }

    return true;
  },
  //变色处理
  changeColorDeal: function changeColorDeal(isJustClearColor) {
    var children = this.GameLayer.m_maparray;

    for (var i = 0; i < children.length; i++) {
      children[i].getComponent("BlockBGItem").setBrightVisible(false);
    } //如果参数有值，直接返回，不做下面的


    if (isJustClearColor) {
      return;
    }

    for (var _i2 = 0; _i2 < this._checkFrameList.length; _i2++) {
      this._checkFrameList[_i2].getComponent("BlockBGItem").setBrightVisible(true, this._bg_color);
    }
  },
  //碰撞逻辑
  collisionFunc: function collisionFunc() {
    this._checkFrameList = []; //清空数组

    this._checkFKlist = []; //清空数组

    var children = this.node.children[0].children;

    for (var i = 0; i < children.length; i++) {
      var pianyiCPos = cc.v2(this.node.children[0].x, this.node.children[0].y).add(cc.v2(children[i].x, children[i].y));
      var childPos = this.node.position.add(pianyiCPos);
      var frame = this.checkPosFunc(childPos);

      if (frame) {
        this._checkFKlist.push(children[i]);

        this._checkFrameList.push(frame);
      }
    }
  },
  //一个点和棋盘的所有框检测
  checkPosFunc: function checkPosFunc(pos) {
    var len = 52; //碰撞距离

    var children = this.GameLayer.m_maparray;

    for (var i = 0; i < children.length; i++) {
      var frameNode = children[i];
      var dis = cc.v2(frameNode.x, frameNode.y).sub(pos).mag();

      if (dis <= len) {
        return frameNode;
      }
    }
  },
  //放下逻辑
  dropDownFunc: function dropDownFunc() {
    if (!this.checkIsCanDrop()) {
      //放回去
      this.takeBack();
      return;
    }

    for (var i = 0; i < this._checkFKlist.length; i++) {
      this._checkFKlist[i].x = 0;
      this._checkFKlist[i].y = 0;
      this._checkFKlist[i].parent = this._checkFrameList[i];
      this._checkFrameList[i].isHaveFK = true;

      this._checkFKlist[i].runAction(cc.sequence(cc.scaleTo(0.1, 1.1, 0.8), cc.scaleTo(0.15, 0.9, 1.1), cc.scaleTo(0.015, 1.1, 0.9), cc.scaleTo(0.2, 1, 1)));
    }

    this.GameLayer.hideGuide();
    this.node.removeAllChildren();
    var oneNode = this.createItem();
    this.node.addChild(oneNode);
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 0.8);
    this.GameLayer.addScore(this._checkFKlist.length, true);
    this.GameLayer.checkClearUp(); //放回去

    this.takeBack(); //直接用棋盘检测是不是输了

    this.GameLayer.checkIsLose();
  },
  //回到原位
  takeBack: function takeBack() {
    //变色处理
    this.checkFrameList = []; //清空数组

    this.changeColorDeal(true);
    this.node.getChildByName("n_shape").setScale(scaleParam);
    this.node.x = this.node.ox;
    this.node.y = this.node.oy;
  },
  checkIsLose: function checkIsLose() {
    var canDropCount = 0;
    var children = this.node.children[0].children; //一个个格子放试一下能不能放

    for (var i = 0; i < this.GameLayer.m_maparray.length; i++) {
      var frameNode = this.GameLayer.m_maparray[i];
      var srcPos = cc.v2(frameNode.x, frameNode.y);
      var count = 1;

      if (!frameNode.isHaveFK) {
        //这里做是否可以放的判断
        for (var j = 1; j < children.length; j++) {
          var len = 52; //碰撞距离

          var childPos = srcPos.add(cc.v2(children[j].x, children[j].y)); //碰撞检测

          for (var k = 0; k < this.GameLayer.m_maparray.length; k++) {
            var tFrameNode = this.GameLayer.m_maparray[k];
            var dis = cc.v2(tFrameNode.x, tFrameNode.y).sub(childPos).mag();

            if (dis <= len && !tFrameNode.isHaveFK) {
              count++; //可以放就要累加计数
            }
          }
        } //如果数量相等就说明这个方块在这个格子是可以放下的


        if (count == children.length) {
          canDropCount++;
        }
      }
    }

    if (canDropCount == 0) {
      return true;
    } else {
      return false;
    }
  },
  resetBlock: function resetBlock(index) {
    this.node.removeAllChildren();
    this.updateIndex();
    var oneNode = this.createItem(index);
    this.node.addChild(oneNode);
  },
  setNextBlock: function setNextBlock(index) {
    this._next = index;
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvaXRlbS9TaGFwZUl0ZW0uanMiXSwibmFtZXMiOlsiVXRpbHMiLCJyZXF1aXJlIiwiR2FtZU1haW4iLCJzY2FsZVBhcmFtIiwiY29sb3JsaXN0IiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJtX3NwYV9ibG9ja2xpc3QiLCJTcHJpdGVBdGxhcyIsIkdhbWVMYXllciIsInR5cGUiLCJzdGFydCIsIl9iZ19jb2xvciIsIl90eXBlX2luZGV4IiwiX2NvbG9yaW5kZXgiLCJ3aW5kb3ciLCJJTklUX0dBTUVfU0FWRV9EQVRBIiwidG9wX2xldmVsIiwiR1VJREVfTEVWRUwiLCJyZXNldEJsb2NrIiwic2hvd0d1aWRlIiwiYWRkVG91Y2hFdmVudCIsIl9ibG9ja2NvdW50IiwidXBkYXRlSW5kZXgiLCJib28iLCJpbmRleGxpc3QiLCJza2luIiwiaSIsImxlbmd0aCIsIl9kYXRhIiwiU0tJTl9DT05GSUciLCJub2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJjaGlsZHJlbkNvdW50IiwiY2hpbGRyZW4iLCJnZXRDb21wb25lbnQiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsImdldFNwcml0ZUZyYW1lIiwibmFtZSIsImdldFRoZUNvbmZpZyIsImEiLCJoIiwiaGVpZ2h0IiwiY29zNjAiLCJNYXRoIiwiY29zIiwiUEkiLCJzaW42MCIsInNpbiIsImNvczEyMCIsInNpbjEyMCIsImNvczMwMCIsInNpbjMwMCIsImNvbmZpZ0xpc3RzIiwidjIiLCJuZXdPbmVLIiwiY29sb3JJbmRleCIsIk5vZGUiLCJjb2xvck5hbWUiLCJzcHJpdGUiLCJhZGRDb21wb25lbnQiLCJnZXRDdXJDb2xvckluZGV4IiwiY3JlYXRlSXRlbSIsImluZGV4IiwiX25leHQiLCJzaGFwZWl0ZW0iLCJjb25maWciLCJyYW5kb21JbmRleCIsInJhbmRvbSIsInBvc0xpc3QiLCJyYW5kb21JbmRleENvbG9yIiwic3VtWCIsImNvdW50WCIsInN1bVkiLCJjb3VudFkiLCJwb3MiLCJrdWFpIiwieCIsInkiLCJhZGRDaGlsZCIsInNldFNjYWxlIiwidXBIIiwic2VsZiIsIm94Iiwib3kiLCJvbiIsIkV2ZW50VHlwZSIsIlRPVUNIX1NUQVJUIiwiU2V0U291bmRFZmZlY3QiLCJCVVRUT05fQ0xJQ0tfTVVTSUMiLCJUT1VDSF9NT1ZFIiwiZXZlbnQiLCJkZWx0YSIsInRvdWNoIiwiZ2V0RGVsdGEiLCJjb2xsaXNpb25GdW5jIiwiY2hlY2tJc0NhbkRyb3AiLCJjaGFuZ2VDb2xvckRlYWwiLCJUT1VDSF9DQU5DRUwiLCJkcm9wRG93bkZ1bmMiLCJUT1VDSF9FTkQiLCJfY2hlY2tGcmFtZUxpc3QiLCJpc0hhdmVGSyIsImlzSnVzdENsZWFyQ29sb3IiLCJtX21hcGFycmF5Iiwic2V0QnJpZ2h0VmlzaWJsZSIsIl9jaGVja0ZLbGlzdCIsInBpYW55aUNQb3MiLCJhZGQiLCJjaGlsZFBvcyIsInBvc2l0aW9uIiwiZnJhbWUiLCJjaGVja1Bvc0Z1bmMiLCJwdXNoIiwibGVuIiwiZnJhbWVOb2RlIiwiZGlzIiwic3ViIiwibWFnIiwidGFrZUJhY2siLCJwYXJlbnQiLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsInNjYWxlVG8iLCJoaWRlR3VpZGUiLCJyZW1vdmVBbGxDaGlsZHJlbiIsIm9uZU5vZGUiLCJhZGRTY29yZSIsImNoZWNrQ2xlYXJVcCIsImNoZWNrSXNMb3NlIiwiY2hlY2tGcmFtZUxpc3QiLCJjYW5Ecm9wQ291bnQiLCJzcmNQb3MiLCJjb3VudCIsImoiLCJrIiwidEZyYW1lTm9kZSIsInNldE5leHRCbG9jayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxPQUFELENBQW5COztBQUNBLElBQU1DLFFBQVEsR0FBR0QsT0FBTyxDQUFDLFVBQUQsQ0FBeEI7O0FBQ0EsSUFBTUUsVUFBVSxHQUFHLEdBQW5CO0FBQ0EsSUFBSUMsU0FBUyxHQUFHLENBQUMsU0FBRCxFQUFZLFNBQVosRUFBdUIsU0FBdkIs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QUNILEdBeldJO0FBMldMVyxFQUFBQSxZQTNXSyx3QkEyV1ExRSxLQTNXUixFQTJXZTtBQUNoQixTQUFLQyxLQUFMLEdBQWFELEtBQWI7QUFDSCxHQTdXSSxDQThXTDs7QUE5V0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsibGV0IFV0aWxzID0gcmVxdWlyZShcIlV0aWxzXCIpO1xuY29uc3QgR2FtZU1haW4gPSByZXF1aXJlKCdHYW1lTWFpbicpXG5jb25zdCBzY2FsZVBhcmFtID0gMC41O1xudmFyIGNvbG9ybGlzdCA9IFsnI2ZmZmZmZicsICcjZjliZDFkJywgJyMwMDNERkYnLCAnIzg1ZDU0NicsICcjRDYzMDlBJ107XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBtX3NwYV9ibG9ja2xpc3Q6IGNjLlNwcml0ZUF0bGFzLFxuICAgICAgICBHYW1lTGF5ZXI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBHYW1lTWFpblxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuX2JnX2NvbG9yID0gMDtcbiAgICAgICAgdGhpcy5fdHlwZV9pbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX2NvbG9yaW5kZXggPSAxO1xuICAgICAgICAvLyB0aGlzLnVwZGF0ZUluZGV4KCk7XG4gICAgICAgIGlmICh3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS50b3BfbGV2ZWwgPCAxICYmICF3aW5kb3cuR1VJREVfTEVWRUwpIHsgLy9zaG93Z3VhaVxuICAgICAgICAgICAgdGhpcy5yZXNldEJsb2NrKDIyKTtcbiAgICAgICAgICAgIHRoaXMuR2FtZUxheWVyLnNob3dHdWlkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXNldEJsb2NrKClcbiAgICAgICAgfVxuICAgICAgICAvLyBsZXQgb25lTm9kZSA9IHRoaXMuY3JlYXRlSXRlbSgpO1xuICAgICAgICAvLyB0aGlzLm5vZGUuYWRkQ2hpbGQob25lTm9kZSk7XG4gICAgICAgIHRoaXMuYWRkVG91Y2hFdmVudCgpO1xuICAgICAgICB0aGlzLl9ibG9ja2NvdW50ID0gMDsgLy815Liq5b6q546v77yMNeS4quS5i+WQjuW/heWumuWHuueOsOS4gOS4quWNleS4queahFxuICAgIH0sXG5cbiAgICB1cGRhdGVJbmRleChib28pIHtcbiAgICAgICAgbGV0IGluZGV4bGlzdCA9IHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLnNraW47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZXhsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXhsaXN0W2ldID49IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90eXBlX2luZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2RhdGEgPSB3aW5kb3cuU0tJTl9DT05GSUdbdGhpcy5fdHlwZV9pbmRleF07XG4gICAgICAgIGlmIChib28pIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCduX3NoYXBlJyk7XG4gICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbkNvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubV9zcGFfYmxvY2tsaXN0LmdldFNwcml0ZUZyYW1lKHRoaXMuX2RhdGEubmFtZSArIHRoaXMuX2NvbG9yaW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZV9pbmRleDtcbiAgICB9LFxuXG4gICAgLy/ojrflj5bmlrnlnZfphY3nva5cbiAgICBnZXRUaGVDb25maWcoKSB7XG4gICAgICAgIGxldCBhID0gMTA5Ljc3MjQ5MjAwMDUwMDc1O1xuICAgICAgICBsZXQgaCA9IDExMDtcbiAgICAgICAgbGV0IGhlaWdodCA9IDk1O1xuICAgICAgICBsZXQgY29zNjAgPSBNYXRoLmNvcyg2MCAqIE1hdGguUEkgLyAxODApO1xuICAgICAgICBsZXQgc2luNjAgPSBNYXRoLnNpbig2MCAqIE1hdGguUEkgLyAxODApO1xuICAgICAgICBsZXQgY29zMTIwID0gTWF0aC5jb3MoMTIwICogTWF0aC5QSSAvIDE4MCk7XG4gICAgICAgIGxldCBzaW4xMjAgPSBNYXRoLnNpbigxMjAgKiBNYXRoLlBJIC8gMTgwKTtcbiAgICAgICAgbGV0IGNvczMwMCA9IE1hdGguY29zKDMwMCAqIE1hdGguUEkgLyAxODApO1xuICAgICAgICBsZXQgc2luMzAwID0gTWF0aC5zaW4oMzAwICogTWF0aC5QSSAvIDE4MCk7XG4gICAgICAgIGxldCBjb25maWdMaXN0cyA9IFtcbiAgICAgICAgICAgIC8v5LiA5LiqXG4gICAgICAgICAgICBbY2MudjIoMCwgMCldLFxuICAgICAgICAgICAgLy/lm5vkuKpcbiAgICAgICAgICAgIC8vIFtjYy52MigwLCAwKSwgY2MudjIoY29zNjAgKiBhLCBzaW42MCAqIGEpXSxcbiAgICAgICAgICAgIC8vIFtjYy52MigwLCAwKSwgY2MudjIoY29zMTIwICogYSwgc2luMTIwICogYSldLFxuICAgICAgICAgICAgLy8gW2NjLnYyKDAsIDApLCBjYy52MihoLCAwKSwgY2MudjIoaCAqIDIsIDApXSxcbiAgICAgICAgICAgIFtjYy52MigwLCAwKSwgY2MudjIoaCwgMCksIGNjLnYyKGggKiAyLCAwKSwgY2MudjIoaCAqIDMsIDApXSwgLy/mqKrmkYYxIC0tLS1cbiAgICAgICAgICAgIFtjYy52MigwLCAwKSwgY2MudjIoaCwgMCksIGNjLnYyKGggKiAyLCAwKSwgY2MudjIoaCArIGNvczYwICogYSwgc2luNjAgKiBhKV0sIC8v5qiq5pGGMiAgIC0tPS1cbiAgICAgICAgICAgIFtjYy52MigwLCAwKSwgY2MudjIoaCwgMCksIGNjLnYyKGggKiAyLCAwKSwgY2MudjIoaCArIGNvczMwMCAqIGEsIHNpbjMwMCAqIGEpXSwgLy/mqKrmkYYzIC0tVC1cbiAgICAgICAgICAgIFtjYy52MigwLCAwKSwgY2MudjIoaCwgMCksIGNjLnYyKGggKiAyLCAwKSwgY2MudjIoY29zNjAgKiBhLCBzaW42MCAqIGEpXSwgLy/mqKrmkYY0XG4gICAgICAgICAgICBbY2MudjIoMCwgMCksIGNjLnYyKGgsIDApLCBjYy52MihoICogMiwgMCksIGNjLnYyKGNvczMwMCAqIGEsIHNpbjMwMCAqIGEpXSwgLy/mqKrmkYY1XG5cbiAgICAgICAgICAgIFtjYy52MigwLCAwKSwgY2MudjIoY29zNjAgKiBhLCBzaW42MCAqIGEpLCBjYy52Mihjb3M2MCAqIGEgKiAyLCBzaW42MCAqIGEgKiAyKSwgY2MudjIoY29zMTIwICogYSwgc2luMTIwICogYSldLCAvL+aWnOS4iuaRhjFcbiAgICAgICAgICAgIFtjYy52MigwLCAwKSwgY2MudjIoY29zNjAgKiBhLCBzaW42MCAqIGEpLCBjYy52Mihjb3M2MCAqIGEgKiAyLCBzaW42MCAqIGEgKiAyKSwgY2MudjIoY29zMTIwICogYSArIGNvczYwICogYSwgc2luMTIwICogYSArIHNpbjYwICogYSldLCAvL+aWnOS4iuaRhjJcbiAgICAgICAgICAgIFtjYy52MigwLCAwKSwgY2MudjIoY29zNjAgKiBhLCBzaW42MCAqIGEpLCBjYy52Mihjb3M2MCAqIGEgKiAyLCBzaW42MCAqIGEgKiAyKSwgY2MudjIoaCwgMCldLCAvL+aWnOS4iuaRhjNcbiAgICAgICAgICAgIFtjYy52MigwLCAwKSwgY2MudjIoY29zNjAgKiBhLCBzaW42MCAqIGEpLCBjYy52Mihjb3M2MCAqIGEgKiAyLCBzaW42MCAqIGEgKiAyKSwgY2MudjIoY29zNjAgKiBhICsgaCwgc2luNjAgKiBhKV0sIC8v5pac5LiK5pGGNFxuICAgICAgICAgICAgW2NjLnYyKDAsIDApLCBjYy52Mihjb3M2MCAqIGEsIHNpbjYwICogYSksIGNjLnYyKGNvczYwICogYSAqIDIsIHNpbjYwICogYSAqIDIpLCBjYy52Mihjb3M2MCAqIGEgKiAzLCBzaW42MCAqIGEgKiAzKV0sIC8v5pac5LiK55u057q/XG5cbiAgICAgICAgICAgIFtjYy52MigwLCAwKSwgY2MudjIoY29zMTIwICogYSwgc2luMTIwICogYSksIGNjLnYyKGNvczEyMCAqIGEgKiAyLCBzaW4xMjAgKiBhICogMiksIGNjLnYyKGNvczEyMCAqIGEgKiAyICsgaCwgc2luMTIwICogYSAqIDIpXSwgLy/mlpzkuIvmkYYxXG4gICAgICAgICAgICBbY2MudjIoMCwgMCksIGNjLnYyKGNvczEyMCAqIGEsIHNpbjEyMCAqIGEpLCBjYy52Mihjb3MxMjAgKiBhICogMiwgc2luMTIwICogYSAqIDIpLCBjYy52Mihjb3MxMjAgKiBhIC0gaCwgc2luMTIwICogYSldLCAvL+aWnOS4i+aRhjJcbiAgICAgICAgICAgIFtjYy52MigwLCAwKSwgY2MudjIoY29zMTIwICogYSwgc2luMTIwICogYSksIGNjLnYyKGNvczEyMCAqIGEgKiAyLCBzaW4xMjAgKiBhICogMiksIGNjLnYyKGNvczEyMCAqIGEgKyBoLCBzaW4xMjAgKiBhKV0sIC8v5pac5LiL5pGGM1xuICAgICAgICAgICAgW2NjLnYyKDAsIDApLCBjYy52Mihjb3MxMjAgKiBhLCBzaW4xMjAgKiBhKSwgY2MudjIoY29zMTIwICogYSAqIDIsIHNpbjEyMCAqIGEgKiAyKSwgY2MudjIoLSBoLCAwKV0sIC8v5pac5LiL5pGGNFxuICAgICAgICAgICAgW2NjLnYyKDAsIDApLCBjYy52Mihjb3MxMjAgKiBhLCBzaW4xMjAgKiBhKSwgY2MudjIoY29zMTIwICogYSAqIDIsIHNpbjEyMCAqIGEgKiAyKSwgY2MudjIoY29zMTIwICogYSAqIDMsIHNpbjEyMCAqIGEgKiAzKV0sIC8v5pac5LiL55u057q/XG5cbiAgICAgICAgICAgIFtjYy52MigwLCAwKSwgY2MudjIoY29zNjAgKiBhLCBzaW42MCAqIGEpLCBjYy52Mihjb3M2MCAqIGEgKyBoLCBzaW42MCAqIGEpLCBjYy52MigyICogaCwgMCldLCAvL+aLseahpTFcbiAgICAgICAgICAgIFtjYy52MigwLCAwKSwgY2MudjIoY29zMzAwICogYSwgc2luMzAwICogYSksIGNjLnYyKGNvczMwMCAqIGEgKyBoLCBzaW4zMDAgKiBhKSwgY2MudjIoMiAqIGgsIDApXSwgLy/mi7HmoaUyXG4gICAgICAgICAgICBbY2MudjIoMCwgMCksIGNjLnYyKGNvczEyMCAqIGEsIHNpbjEyMCAqIGEpLCBjYy52MigwLCAyICogaGVpZ2h0KSwgY2MudjIoaCwgMiAqIGhlaWdodCldLCAvL+aLseahpTNcbiAgICAgICAgICAgIFtjYy52MigwLCAwKSwgY2MudjIoY29zNjAgKiBhLCBzaW42MCAqIGEpLCBjYy52MigwLCAyICogaGVpZ2h0KSwgY2MudjIoLWgsIDIgKiBoZWlnaHQpXSwgLy/mi7HmoaU0XG4gICAgICAgICAgICBbY2MudjIoMCwgMCksIGNjLnYyKGNvczEyMCAqIGEsIHNpbjEyMCAqIGEpLCBjYy52MigwLCAyICogaGVpZ2h0KSwgY2MudjIoaCwgMCldLCAvL+aLseahpTVcbiAgICAgICAgICAgIFtjYy52MigwLCAwKSwgY2MudjIoY29zNjAgKiBhLCBzaW42MCAqIGEpLCBjYy52MigwLCAyICogaGVpZ2h0KSwgY2MudjIoLWgsIDApXSwgLy/mi7HmoaU2XG5cbiAgICAgICAgICAgIFtjYy52MigwLCAwKSwgY2MudjIoY29zMTIwICogYSwgc2luMTIwICogYSksIGNjLnYyKDAsIDIgKiBoZWlnaHQpLCBjYy52Mihjb3MzMDAgKiBhLCAyICogaGVpZ2h0ICsgc2luMzAwICogYSldLCAvL+Wbm+aWueWbm+aWuVxuICAgICAgICAgICAgW2NjLnYyKDAsIDApLCBjYy52Mihjb3M2MCAqIGEsIHNpbjYwICogYSksIGNjLnYyKGgsIDApLCBjYy52Mihjb3M2MCAqIGEgKyBoLCBzaW42MCAqIGEpXSwvL+aWnOWbm+aWuS9cbiAgICAgICAgICAgIFtjYy52MigwLCAwKSwgY2MudjIoY29zMTIwICogYSwgc2luMTIwICogYSksIGNjLnYyKC1oLCAwKSwgY2MudjIoY29zMTIwICogYSAtIGgsIHNpbjEyMCAqIGEpXSwvL+aWnOWbm+aWuVxcXG4gICAgICAgIF1cblxuICAgICAgICByZXR1cm4gY29uZmlnTGlzdHNcbiAgICB9LFxuXG4gICAgLy/liJvlu7rljZXkuKrlha3ovrnlvaIgY29sb3JJbmRleCDpopzoibLkuIvmoIdcbiAgICBuZXdPbmVLOiBmdW5jdGlvbiAoY29sb3JJbmRleCkge1xuICAgICAgICAvL+WIm+W7uuS4gOS4quWdl1xuICAgICAgICBsZXQgbm9kZSA9IG5ldyBjYy5Ob2RlKFwiY29sb3JTcHJcIilcbiAgICAgICAgbm9kZS5jb2xvckluZGV4ID0gY29sb3JJbmRleDtcbiAgICAgICAgbm9kZS5jb2xvck5hbWUgPSB0aGlzLl9kYXRhLm5hbWU7XG4gICAgICAgIGxldCBzcHJpdGUgPSBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLm1fc3BhX2Jsb2NrbGlzdC5nZXRTcHJpdGVGcmFtZSh0aGlzLl9kYXRhLm5hbWUgKyBjb2xvckluZGV4KTtcbiAgICAgICAgcmV0dXJuIG5vZGVcbiAgICB9LFxuXG4gICAgZ2V0Q3VyQ29sb3JJbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yaW5kZXg7XG4gICAgfSxcblxuICAgIGNyZWF0ZUl0ZW0oaW5kZXgpIHtcbiAgICAgICAgdGhpcy5fYmxvY2tjb3VudCsrO1xuICAgICAgICBpZiAodGhpcy5fYmxvY2tjb3VudCA+PSA1KSB7XG4gICAgICAgICAgICAvLyBpbmRleCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9uZXh0ID0gMDtcbiAgICAgICAgICAgIHRoaXMuX2Jsb2NrY291bnQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgKHRoaXMuX25leHQpID09ICdudW1iZXInICYmICFpbmRleCkge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLl9uZXh0O1xuICAgICAgICAgICAgdGhpcy5fbmV4dCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Jsb2NrY291bnQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBzaGFwZWl0ZW0gPSBuZXcgY2MuTm9kZShcIm5fc2hhcGVcIik7XG4gICAgICAgIGxldCBjb25maWcgPSB0aGlzLmdldFRoZUNvbmZpZygpO1xuICAgICAgICBsZXQgcmFuZG9tSW5kZXggPSBVdGlscy5yYW5kb20oMCwgY29uZmlnLmxlbmd0aCk7XG4gICAgICAgIGlmICh0eXBlb2YgKGluZGV4KSA9PSAnbnVtYmVyJyAmJiBpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICByYW5kb21JbmRleCA9IGluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJhbmRvbUluZGV4ID09IDApIHsvL+eisOWIsOS4gOS5n+mHjee9rlxuICAgICAgICAgICAgdGhpcy5fYmxvY2tjb3VudCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBvc0xpc3QgPSBjb25maWdbcmFuZG9tSW5kZXhdO1xuXG4gICAgICAgIGxldCByYW5kb21JbmRleENvbG9yID0gVXRpbHMucmFuZG9tKDEsIDUpO1xuICAgICAgICB0aGlzLl9iZ19jb2xvciA9IGNvbG9ybGlzdFtyYW5kb21JbmRleENvbG9yXTtcbiAgICAgICAgdGhpcy5fY29sb3JpbmRleCA9IHJhbmRvbUluZGV4Q29sb3I7XG4gICAgICAgIGxldCBzdW1YID0gMDtcbiAgICAgICAgbGV0IGNvdW50WCA9IDA7XG4gICAgICAgIGxldCBzdW1ZID0gMDtcbiAgICAgICAgbGV0IGNvdW50WSA9IDA7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBwb3NMaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgbGV0IHBvcyA9IHBvc0xpc3RbaW5kZXhdXG4gICAgICAgICAgICBsZXQga3VhaSA9IHRoaXMubmV3T25lSyhyYW5kb21JbmRleENvbG9yKVxuXG4gICAgICAgICAgICBrdWFpLnggPSBwb3MueFxuICAgICAgICAgICAgc3VtWCArPSBrdWFpLnhcbiAgICAgICAgICAgIGNvdW50WCsrXG5cbiAgICAgICAgICAgIGt1YWkueSA9IHBvcy55XG4gICAgICAgICAgICBzdW1ZICs9IGt1YWkueVxuICAgICAgICAgICAgY291bnRZKytcbiAgICAgICAgICAgIHNoYXBlaXRlbS5hZGRDaGlsZChrdWFpKVxuICAgICAgICB9XG5cbiAgICAgICAgc2hhcGVpdGVtLnNldFNjYWxlKHNjYWxlUGFyYW0pXG4gICAgICAgIHNoYXBlaXRlbS54ID0gKC1zdW1YIC8gY291bnRYKSAqIHNjYWxlUGFyYW1cbiAgICAgICAgc2hhcGVpdGVtLnkgPSAoLXN1bVkgLyBjb3VudFkpICogc2NhbGVQYXJhbVxuXG4gICAgICAgIHJldHVybiBzaGFwZWl0ZW07XG4gICAgfSxcblxuICAgIC8v5re75Yqg6Kem5pG4XG4gICAgYWRkVG91Y2hFdmVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgdXBIID0gMTMwXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLm5vZGUub3ggPSB0aGlzLm5vZGUueFxuICAgICAgICB0aGlzLm5vZGUub3kgPSB0aGlzLm5vZGUueVxuXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnkgKz0gdXBIO1xuICAgICAgICAgICAgVXRpbHMuU2V0U291bmRFZmZlY3Qod2luZG93LkJVVFRPTl9DTElDS19NVVNJQywgZmFsc2UsIDAuOCk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJuX3NoYXBlXCIpLnNldFNjYWxlKDEpXG4gICAgICAgIH0sIHRoaXMpXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgICAgICAgbGV0IGRlbHRhID0gZXZlbnQudG91Y2guZ2V0RGVsdGEoKVxuICAgICAgICAgICAgdGhpcy5ub2RlLnggKz0gZGVsdGEueFxuICAgICAgICAgICAgdGhpcy5ub2RlLnkgKz0gZGVsdGEueVxuICAgICAgICAgICAgc2VsZi5jb2xsaXNpb25GdW5jKClcblxuICAgICAgICAgICAgLy8gLy/lj5joibLlpITnkIZcbiAgICAgICAgICAgIGlmICghc2VsZi5jaGVja0lzQ2FuRHJvcCgpKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VDb2xvckRlYWwodHJ1ZSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VDb2xvckRlYWwoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKVxuXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdGhpcy5kcm9wRG93bkZ1bmMoKVxuICAgICAgICB9LCB0aGlzKVxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcERvd25GdW5jKClcbiAgICAgICAgfSwgdGhpcylcblxuICAgIH0sXG5cbiAgICAvL+ajgOa1i+aYr+WQpuiDveWkn+aUvuS4i1xuICAgIGNoZWNrSXNDYW5Ecm9wOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8v5YWI5Yik5pat5pWw6YeP5piv5ZCm5LiA6Ie077yM5LiN5LiA6Ie06K+05piO5pyJ5LiA5Liq6LaF5Ye65Y675LqGXG4gICAgICAgIGlmICghdGhpcy5fY2hlY2tGcmFtZUxpc3QgfHwgdGhpcy5fY2hlY2tGcmFtZUxpc3QubGVuZ3RoID09IDAgfHwgdGhpcy5fY2hlY2tGcmFtZUxpc3QubGVuZ3RoICE9IHRoaXMubm9kZS5jaGlsZHJlblswXS5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIC8v5qOA5rWL5pS+5LiL55qE5qC85a2Q5piv5ZCm5bey57uP5pyJ5pa55Z2XXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fY2hlY2tGcmFtZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaGVja0ZyYW1lTGlzdFtpXS5pc0hhdmVGSykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfSxcblxuICAgIC8v5Y+Y6Imy5aSE55CGXG4gICAgY2hhbmdlQ29sb3JEZWFsOiBmdW5jdGlvbiAoaXNKdXN0Q2xlYXJDb2xvcikge1xuICAgICAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLkdhbWVMYXllci5tX21hcGFycmF5XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNoaWxkcmVuW2ldLmdldENvbXBvbmVudChcIkJsb2NrQkdJdGVtXCIpLnNldEJyaWdodFZpc2libGUoZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy/lpoLmnpzlj4LmlbDmnInlgLzvvIznm7TmjqXov5Tlm57vvIzkuI3lgZrkuIvpnaLnmoRcbiAgICAgICAgaWYgKGlzSnVzdENsZWFyQ29sb3IpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jaGVja0ZyYW1lTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tGcmFtZUxpc3RbaV0uZ2V0Q29tcG9uZW50KFwiQmxvY2tCR0l0ZW1cIikuc2V0QnJpZ2h0VmlzaWJsZSh0cnVlLCB0aGlzLl9iZ19jb2xvcik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy/norDmkp7pgLvovpFcbiAgICBjb2xsaXNpb25GdW5jOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2NoZWNrRnJhbWVMaXN0ID0gW10gLy/muIXnqbrmlbDnu4RcbiAgICAgICAgdGhpcy5fY2hlY2tGS2xpc3QgPSBbXSAvL+a4heepuuaVsOe7hFxuXG4gICAgICAgIGxldCBjaGlsZHJlbiA9IHRoaXMubm9kZS5jaGlsZHJlblswXS5jaGlsZHJlblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcGlhbnlpQ1BvcyA9IGNjLnYyKHRoaXMubm9kZS5jaGlsZHJlblswXS54LCB0aGlzLm5vZGUuY2hpbGRyZW5bMF0ueSkuYWRkKGNjLnYyKGNoaWxkcmVuW2ldLngsIGNoaWxkcmVuW2ldLnkpKVxuICAgICAgICAgICAgbGV0IGNoaWxkUG9zID0gdGhpcy5ub2RlLnBvc2l0aW9uLmFkZChwaWFueWlDUG9zKTtcbiAgICAgICAgICAgIGxldCBmcmFtZSA9IHRoaXMuY2hlY2tQb3NGdW5jKGNoaWxkUG9zKVxuXG4gICAgICAgICAgICBpZiAoZnJhbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja0ZLbGlzdC5wdXNoKGNoaWxkcmVuW2ldKVxuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrRnJhbWVMaXN0LnB1c2goZnJhbWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy/kuIDkuKrngrnlkozmo4vnm5jnmoTmiYDmnInmoYbmo4DmtYtcbiAgICBjaGVja1Bvc0Z1bmM6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgICAgbGV0IGxlbiA9IDUyIC8v56Kw5pKe6Led56a7XG4gICAgICAgIGxldCBjaGlsZHJlbiA9IHRoaXMuR2FtZUxheWVyLm1fbWFwYXJyYXlcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGZyYW1lTm9kZSA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgbGV0IGRpcyA9IGNjLnYyKGZyYW1lTm9kZS54LCBmcmFtZU5vZGUueSkuc3ViKHBvcykubWFnKCk7XG4gICAgICAgICAgICBpZiAoZGlzIDw9IGxlbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmcmFtZU5vZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL+aUvuS4i+mAu+i+kVxuICAgIGRyb3BEb3duRnVuYzogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuY2hlY2tJc0NhbkRyb3AoKSkge1xuICAgICAgICAgICAgLy/mlL7lm57ljrtcbiAgICAgICAgICAgIHRoaXMudGFrZUJhY2soKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2NoZWNrRktsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9jaGVja0ZLbGlzdFtpXS54ID0gMFxuICAgICAgICAgICAgdGhpcy5fY2hlY2tGS2xpc3RbaV0ueSA9IDBcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrRktsaXN0W2ldLnBhcmVudCA9IHRoaXMuX2NoZWNrRnJhbWVMaXN0W2ldXG4gICAgICAgICAgICB0aGlzLl9jaGVja0ZyYW1lTGlzdFtpXS5pc0hhdmVGSyA9IHRydWVcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrRktsaXN0W2ldLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDAuMSwgMS4xLCAwLjgpLCBjYy5zY2FsZVRvKDAuMTUsIDAuOSwgMS4xKSwgY2Muc2NhbGVUbygwLjAxNSwgMS4xLCAwLjkpLCBjYy5zY2FsZVRvKDAuMiwgMSwgMSkpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLkdhbWVMYXllci5oaWRlR3VpZGUoKTtcblxuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKVxuICAgICAgICB2YXIgb25lTm9kZSA9IHRoaXMuY3JlYXRlSXRlbSgpO1xuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQob25lTm9kZSlcbiAgICAgICAgVXRpbHMuU2V0U291bmRFZmZlY3Qod2luZG93LkJVVFRPTl9DTElDS19NVVNJQywgZmFsc2UsIDAuOCk7XG4gICAgICAgIHRoaXMuR2FtZUxheWVyLmFkZFNjb3JlKHRoaXMuX2NoZWNrRktsaXN0Lmxlbmd0aCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuR2FtZUxheWVyLmNoZWNrQ2xlYXJVcCgpO1xuXG4gICAgICAgIC8v5pS+5Zue5Y67XG4gICAgICAgIHRoaXMudGFrZUJhY2soKVxuXG4gICAgICAgIC8v55u05o6l55So5qOL55uY5qOA5rWL5piv5LiN5piv6L6T5LqGXG4gICAgICAgIHRoaXMuR2FtZUxheWVyLmNoZWNrSXNMb3NlKClcbiAgICB9LFxuXG4gICAgLy/lm57liLDljp/kvY1cbiAgICB0YWtlQmFjazogZnVuY3Rpb24gKCkge1xuICAgICAgICAvL+WPmOiJsuWkhOeQhlxuICAgICAgICB0aGlzLmNoZWNrRnJhbWVMaXN0ID0gW10gLy/muIXnqbrmlbDnu4RcbiAgICAgICAgdGhpcy5jaGFuZ2VDb2xvckRlYWwodHJ1ZSlcblxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJuX3NoYXBlXCIpLnNldFNjYWxlKHNjYWxlUGFyYW0pXG5cbiAgICAgICAgdGhpcy5ub2RlLnggPSB0aGlzLm5vZGUub3hcbiAgICAgICAgdGhpcy5ub2RlLnkgPSB0aGlzLm5vZGUub3lcbiAgICB9LFxuXG4gICAgY2hlY2tJc0xvc2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNhbkRyb3BDb3VudCA9IDBcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmNoaWxkcmVuXG5cbiAgICAgICAgLy/kuIDkuKrkuKrmoLzlrZDmlL7or5XkuIDkuIvog73kuI3og73mlL5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLkdhbWVMYXllci5tX21hcGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZnJhbWVOb2RlID0gdGhpcy5HYW1lTGF5ZXIubV9tYXBhcnJheVtpXVxuICAgICAgICAgICAgdmFyIHNyY1BvcyA9IGNjLnYyKGZyYW1lTm9kZS54LCBmcmFtZU5vZGUueSlcbiAgICAgICAgICAgIHZhciBjb3VudCA9IDFcbiAgICAgICAgICAgIGlmICghZnJhbWVOb2RlLmlzSGF2ZUZLKSB7XG4gICAgICAgICAgICAgICAgLy/ov5nph4zlgZrmmK/lkKblj6/ku6XmlL7nmoTliKTmlq1cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IGNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsZW4gPSA1MiAvL+eisOaSnui3neemu1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGRQb3MgPSBzcmNQb3MuYWRkKGNjLnYyKGNoaWxkcmVuW2pdLngsIGNoaWxkcmVuW2pdLnkpKTtcbiAgICAgICAgICAgICAgICAgICAgLy/norDmkp7mo4DmtYtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLkdhbWVMYXllci5tX21hcGFycmF5Lmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdEZyYW1lTm9kZSA9IHRoaXMuR2FtZUxheWVyLm1fbWFwYXJyYXlba11cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaXMgPSBjYy52Mih0RnJhbWVOb2RlLngsIHRGcmFtZU5vZGUueSkuc3ViKGNoaWxkUG9zKS5tYWcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXMgPD0gbGVuICYmICF0RnJhbWVOb2RlLmlzSGF2ZUZLKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnQrKyAvL+WPr+S7peaUvuWwseimgee0r+WKoOiuoeaVsFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy/lpoLmnpzmlbDph4/nm7jnrYnlsLHor7TmmI7ov5nkuKrmlrnlnZflnKjov5nkuKrmoLzlrZDmmK/lj6/ku6XmlL7kuIvnmoRcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPT0gY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbkRyb3BDb3VudCsrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBpZiAoY2FuRHJvcENvdW50ID09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH0sXG5cblxuICAgIHJlc2V0QmxvY2soaW5kZXgpIHtcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgICAgIHRoaXMudXBkYXRlSW5kZXgoKTtcbiAgICAgICAgdmFyIG9uZU5vZGUgPSB0aGlzLmNyZWF0ZUl0ZW0oaW5kZXgpO1xuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQob25lTm9kZSk7XG4gICAgfSxcblxuICAgIHNldE5leHRCbG9jayhpbmRleCkge1xuICAgICAgICB0aGlzLl9uZXh0ID0gaW5kZXg7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameMenu.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5cb45NS+yZNLbHP815RF0Ab', 'GameMenu');
// Script/GameMenu.js

"use strict";

var Utils = require("Utils");

var ShareSdk = require("ShareSdk");

var RankList = require("RankList");

cc.Class({
  "extends": cc.Component,
  properties: {
    m_sp_logo: cc.Node,
    m_l_maingold: cc.Label,
    m_sp_off: cc.Node,
    m_spa_list: cc.SpriteAtlas,
    m_sp_mystepicon: cc.Sprite,
    m_l_mystepname: cc.Label,
    m_n_starlist: {
      type: cc.Node,
      "default": []
    },
    m_n_skinpanel: cc.Node,
    m_n_moregame: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    window.GAME_MENU = this;
    Utils.setDesignResolution();
  },
  start: function start() {
    var _this = this;

    // this.m_sp_logo.runAction(cc.repeatForever(cc.sequence(cc.moveBy(1, 0, 15), cc.moveBy(1, 0, -15))));
    EVENT_LISTENER.on(window.GAME_UPDATE_DATA, this.updateGold, this);
    this.m_l_maingold.string = window.INIT_GAME_SAVE_DATA.gold_num;
    this.showGameClubButton();
    this.updateMusicBtnSprite(window.MUSIC_SHOW_OFF);
    RankList.setScore(window.INIT_GAME_SAVE_DATA.top_score);

    if (typeof wx != "undefined") {
      wx.showShareMenu({
        withShareTicket: true
      });
      wx.onShareAppMessage(function () {
        return {
          title: "好玩又新奇，消磨时间好帮手",
          imageUrl: window.tempFileURL[1]
        };
      });
    }

    this.showAdBanner(true);

    if (!window.SHOWNEWYEAR && window.NEWYEAR) {
      Utils.loadRes("prefabs/happynewyear", cc.Prefab, function (obj) {
        var node = cc.instantiate(obj);
        node.zIndex = 1 << 10;
        node.parent = _this.node;
        window.SHOWNEWYEAR = true;
      });
    } else {
      Utils.playBgmMusic(window.BGM, 0.5);
    }

    this.initMyData();
    this.m_n_moregame.active = window.MOVEGAME;
    setInterval(function () {
      if (window.getdata) {
        window.Utils.setSaveData();
      }
    }, 6000);
  },
  playmuisc: function playmuisc() {
    Utils.playBgmMusic(window.BGM, 0.5);
  },
  initMyData: function initMyData() {
    var curlv = window.INIT_GAME_SAVE_DATA.top_level;
    var data = this.getMyStepData(curlv);

    if (data) {
      this.m_sp_mystepicon.spriteFrame = this.m_spa_list.getSpriteFrame(data.icon_path);
      this.m_l_mystepname.string = data.desc;

      for (var i = 0; i < this.m_n_starlist.length; i++) {
        this.m_n_starlist[i].active = i < data.star;
      }
    } else {
      this.m_sp_mystepicon.spriteFrame = this.m_spa_list.getSpriteFrame("stepicon6");
      this.m_l_mystepname.string = window.STEP_CONFIG[0].desc;

      for (var _i = 0; _i < this.m_n_starlist.length; _i++) {
        this.m_n_starlist[_i].active = _i < 3;
      }
    }

    this.m_n_skinpanel.getComponent("SkinPanel").initData();
  },
  getMyStepData: function getMyStepData(lv) {
    var index = Math.floor(lv / 10);

    if (index <= 0) {
      return null;
    } else {
      if (index > window.STEP_CONFIG.length) index = window.STEP_CONFIG.length;
      return window.STEP_CONFIG[index - 1];
    }
  },
  updateGold: function updateGold() {
    this.m_l_maingold.string = window.INIT_GAME_SAVE_DATA.gold_num;
  },
  onStartGame: function onStartGame() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    cc.director.loadScene(window.GAME_SCENE_NAME);
  },
  onCloseShare: function onCloseShare() {
    cc.director.loadScene(window.GAME_SCENE_NAME);
  },
  onShareStart: function onShareStart() {
    var self = this;
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    ShareSdk.shareAppMessage({
      title: "来助力我一起打怪兽吧",
      imageUrl: window.tempFileURL[1],
      success: function success(res) {
        cc.director.loadScene(window.GAME_SCENE_NAME);
      },
      fail: function fail(err) {},
      complate: function complate(msg) {}
    });
  },
  onOpenSkinPanel: function onOpenSkinPanel() {
    this.m_n_skinpanel.active = true;
  },
  onOpenStepRank: function onOpenStepRank() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    if (window.isWeChatPlatform) wx.showLoading({
      title: "加载中..."
    });
    cc.director.loadScene(window.STEP_SCENE_NAME, function () {
      if (window.isWeChatPlatform) wx.hideLoading();
    });
  },
  onMusicBtnClick: function onMusicBtnClick() {
    if (window.MUSIC_SHOW_OFF == 1) {
      window.MUSIC_SHOW_OFF = 0;
      Utils.stopBgmMusic();
      cc.sys.localStorage.setItem('music', '0');
    } else {
      window.MUSIC_SHOW_OFF = 1;
      Utils.playBgmMusic(window.BGM, 0.5);
      cc.sys.localStorage.setItem('music', '1');
    }

    this.updateMusicBtnSprite(window.MUSIC_SHOW_OFF);
  },
  updateMusicBtnSprite: function updateMusicBtnSprite(show_off) {
    if (show_off == 1) {
      this.m_sp_off.active = false;
    } else {
      this.m_sp_off.active = true;
    }
  },
  onShare: function onShare() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1); // console.log(cc.url.raw("resources/common/sharepic.85663.png"));

    ShareSdk.shareAppMessage({
      title: "今年最好玩最刺激的六边形快乐连消游戏，快来尝试下",
      imageUrl: window.tempFileURL[1],
      success: function success(res) {
        console.log("res", res);
      },
      fail: function fail(err) {
        console.log("res-err");
      },
      complate: function complate(msg) {
        console.log("complate");
      }
    });
  },
  onMoreGame: function onMoreGame() {
    if (typeof wx != 'undefined' && wx.navigateToMiniProgram) {
      wx.navigateToMiniProgram({
        appId: "wx7109309214f4c86e",
        //target: "wx6ee9cae077851dfa",
        success: function success(res) {
          console.log('跳转成功'); // successs && successs(res);
        },
        fail: function fail(err) {
          console.log("跳转失败：", err); // faill && faill(err);
        },
        complete: function complete(res) {
          console.log('跳转完成'); // completee && completee(res);
        }
      });
    } else {
      wxShortCut.showModal("提示", "暂未开放");
    }
  },
  showGameClubButton: function showGameClubButton() {
    if (typeof wx != 'undefined') {
      if (!this.clubbutton) {
        this.clubbutton = wx.createGameClubButton({
          icon: 'light',
          style: {
            left: 10,
            top: 300,
            width: 40,
            height: 40
          }
        });
      }

      this.clubbutton.show();
    }
  },
  hideGameClubButton: function hideGameClubButton() {
    if (this.clubbutton) {
      this.clubbutton.hide();
    }
  },
  onDestroy: function onDestroy() {
    if (this.clubbutton) {
      this.clubbutton.destroy();
      this.clubbutton = null;
    }

    if (this.m_bannerad) {
      this.m_bannerad.destroy();
      this.m_bannerad = null;
    }

    EVENT_LISTENER.off(window.GAME_UPDATE_DATA, this);
    window.GAME_MENU = null;
  },
  showAdBanner: function showAdBanner(boo) {
    if (typeof wx == 'undefined') return;
    var Size = cc.winSize;
    var Widthnode = cc.find("Canvas/n_funnymap/n_bannerpos");
    var pos = this.node.convertToWorldSpace(Widthnode);

    if (Size.height / Size.width > 2) {
      //适配全面屏 适用于FIXHeight
      pos.y += (Size.height - 1920) / 2;
    }

    var system = wx.getSystemInfoSync();
    var adaptScaleH = system.screenHeight / Size.height;
    var PosY = (Size.height - pos.y) * adaptScaleH;
    var self = this;

    if (!boo) {
      if (this.m_bannerad) {
        this.m_bannerad.hide();
      }
    } else {
      if (this.m_bannerad) this.m_bannerad.show();
    }

    if (!this.m_bannerad && boo) {
      if (system.SDKVersion < '2.0.4') {
        wx.showToast({
          title: "微信版本过低，无法创建广告banner",
          icon: "none",
          image: "",
          duration: 0
        });
        setTimeout(function () {
          return wx.hideToast();
        }, 3000);
      } else {
        self.m_bannerad = wx.createBannerAd({
          adUnitId: 'adunit-9dd057b6b514245a',
          style: {
            left: 0,
            top: PosY,
            width: system.screenWidth
          }
        });
        self.m_bannerad.onResize(function (res1) {
          try {
            if (self.m_bannerad && self.m_bannerad.style) {
              self.m_bannerad.style.top = PosY;
              self.m_bannerad.style.height = res1.height;
            }
          } catch (error) {
            console.log("onResize-error", error);
          }
        });
        self.m_bannerad.onLoad(function () {
          console.log('banner 广告加载成功');
        });
        self.m_bannerad.show().then(function () {
          console.log("广告显示成功");
        })["catch"](function (err) {
          console.error("广告加载失败", err);
        });
        self.m_bannerad.onError(function (err) {
          console.error(err);
        });
      }
    }
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZU1lbnUuanMiXSwibmFtZXMiOlsiVXRpbHMiLCJyZXF1aXJlIiwiU2hhcmVTZGsiLCJSYW5rTGlzdCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibV9zcF9sb2dvIiwiTm9kZSIsIm1fbF9tYWluZ29sZCIsIkxhYmVsIiwibV9zcF9vZmYiLCJtX3NwYV9saXN0IiwiU3ByaXRlQXRsYXMiLCJtX3NwX215c3RlcGljb24iLCJTcHJpdGUiLCJtX2xfbXlzdGVwbmFtZSIsIm1fbl9zdGFybGlzdCIsInR5cGUiLCJtX25fc2tpbnBhbmVsIiwibV9uX21vcmVnYW1lIiwib25Mb2FkIiwid2luZG93IiwiR0FNRV9NRU5VIiwic2V0RGVzaWduUmVzb2x1dGlvbiIsInN0YXJ0IiwiRVZFTlRfTElTVEVORVIiLCJvbiIsIkdBTUVfVVBEQVRFX0RBVEEiLCJ1cGRhdGVHb2xkIiwic3RyaW5nIiwiSU5JVF9HQU1FX1NBVkVfREFUQSIsImdvbGRfbnVtIiwic2hvd0dhbWVDbHViQnV0dG9uIiwidXBkYXRlTXVzaWNCdG5TcHJpdGUiLCJNVVNJQ19TSE9XX09GRiIsInNldFNjb3JlIiwidG9wX3Njb3JlIiwid3giLCJzaG93U2hhcmVNZW51Iiwid2l0aFNoYXJlVGlja2V0Iiwib25TaGFyZUFwcE1lc3NhZ2UiLCJ0aXRsZSIsImltYWdlVXJsIiwidGVtcEZpbGVVUkwiLCJzaG93QWRCYW5uZXIiLCJTSE9XTkVXWUVBUiIsIk5FV1lFQVIiLCJsb2FkUmVzIiwiUHJlZmFiIiwib2JqIiwibm9kZSIsImluc3RhbnRpYXRlIiwiekluZGV4IiwicGFyZW50IiwicGxheUJnbU11c2ljIiwiQkdNIiwiaW5pdE15RGF0YSIsImFjdGl2ZSIsIk1PVkVHQU1FIiwic2V0SW50ZXJ2YWwiLCJnZXRkYXRhIiwic2V0U2F2ZURhdGEiLCJwbGF5bXVpc2MiLCJjdXJsdiIsInRvcF9sZXZlbCIsImRhdGEiLCJnZXRNeVN0ZXBEYXRhIiwic3ByaXRlRnJhbWUiLCJnZXRTcHJpdGVGcmFtZSIsImljb25fcGF0aCIsImRlc2MiLCJpIiwibGVuZ3RoIiwic3RhciIsIlNURVBfQ09ORklHIiwiZ2V0Q29tcG9uZW50IiwiaW5pdERhdGEiLCJsdiIsImluZGV4IiwiTWF0aCIsImZsb29yIiwib25TdGFydEdhbWUiLCJTZXRTb3VuZEVmZmVjdCIsIkJVVFRPTl9DTElDS19NVVNJQyIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiR0FNRV9TQ0VORV9OQU1FIiwib25DbG9zZVNoYXJlIiwib25TaGFyZVN0YXJ0Iiwic2VsZiIsInNoYXJlQXBwTWVzc2FnZSIsInN1Y2Nlc3MiLCJyZXMiLCJmYWlsIiwiZXJyIiwiY29tcGxhdGUiLCJtc2ciLCJvbk9wZW5Ta2luUGFuZWwiLCJvbk9wZW5TdGVwUmFuayIsImlzV2VDaGF0UGxhdGZvcm0iLCJzaG93TG9hZGluZyIsIlNURVBfU0NFTkVfTkFNRSIsImhpZGVMb2FkaW5nIiwib25NdXNpY0J0bkNsaWNrIiwic3RvcEJnbU11c2ljIiwic3lzIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsInNob3dfb2ZmIiwib25TaGFyZSIsImNvbnNvbGUiLCJsb2ciLCJvbk1vcmVHYW1lIiwibmF2aWdhdGVUb01pbmlQcm9ncmFtIiwiYXBwSWQiLCJjb21wbGV0ZSIsInd4U2hvcnRDdXQiLCJzaG93TW9kYWwiLCJjbHViYnV0dG9uIiwiY3JlYXRlR2FtZUNsdWJCdXR0b24iLCJpY29uIiwic3R5bGUiLCJsZWZ0IiwidG9wIiwid2lkdGgiLCJoZWlnaHQiLCJzaG93IiwiaGlkZUdhbWVDbHViQnV0dG9uIiwiaGlkZSIsIm9uRGVzdHJveSIsImRlc3Ryb3kiLCJtX2Jhbm5lcmFkIiwib2ZmIiwiYm9vIiwiU2l6ZSIsIndpblNpemUiLCJXaWR0aG5vZGUiLCJmaW5kIiwicG9zIiwiY29udmVydFRvV29ybGRTcGFjZSIsInkiLCJzeXN0ZW0iLCJnZXRTeXN0ZW1JbmZvU3luYyIsImFkYXB0U2NhbGVIIiwic2NyZWVuSGVpZ2h0IiwiUG9zWSIsIlNES1ZlcnNpb24iLCJzaG93VG9hc3QiLCJpbWFnZSIsImR1cmF0aW9uIiwic2V0VGltZW91dCIsImhpZGVUb2FzdCIsImNyZWF0ZUJhbm5lckFkIiwiYWRVbml0SWQiLCJzY3JlZW5XaWR0aCIsIm9uUmVzaXplIiwicmVzMSIsImVycm9yIiwidGhlbiIsIm9uRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsT0FBRCxDQUFuQjs7QUFDQSxJQUFJQyxRQUFRLEdBQUdELE9BQU8sQ0FBQyxVQUFELENBQXRCOztBQUNBLElBQUlFLFFBQVEsR0FBR0YsT0FBTyxDQUFDLFVBQUQsQ0FBdEI7O0FBQ0FHLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUVKLEVBQUUsQ0FBQ0ssSUFETjtBQUVSQyxJQUFBQSxZQUFZLEVBQUVOLEVBQUUsQ0FBQ08sS0FGVDtBQUdSQyxJQUFBQSxRQUFRLEVBQUVSLEVBQUUsQ0FBQ0ssSUFITDtBQUlSSSxJQUFBQSxVQUFVLEVBQUVULEVBQUUsQ0FBQ1UsV0FKUDtBQUtSQyxJQUFBQSxlQUFlLEVBQUVYLEVBQUUsQ0FBQ1ksTUFMWjtBQU1SQyxJQUFBQSxjQUFjLEVBQUViLEVBQUUsQ0FBQ08sS0FOWDtBQU9STyxJQUFBQSxZQUFZLEVBQUU7QUFBRUMsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNLLElBQVg7QUFBaUIsaUJBQVM7QUFBMUIsS0FQTjtBQVFSVyxJQUFBQSxhQUFhLEVBQUVoQixFQUFFLENBQUNLLElBUlY7QUFTUlksSUFBQUEsWUFBWSxFQUFFakIsRUFBRSxDQUFDSztBQVRULEdBSFA7QUFlTDtBQUVBYSxFQUFBQSxNQWpCSyxvQkFpQkk7QUFDTEMsSUFBQUEsTUFBTSxDQUFDQyxTQUFQLEdBQW1CLElBQW5CO0FBQ0F4QixJQUFBQSxLQUFLLENBQUN5Qixt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VixLQUFoQixDQUFzQkUsR0FBdEIsR0FBNEJzQixJQUE1QjtBQUNBeEQsY0FBQUEsSUFBSSxDQUFDMEMsVUFBTCxDQUFnQlYsS0FBaEIsQ0FBc0JJLE1BQXRCLEdBQStCK0IsSUFBSSxDQUFDL0IsTUFBcEM7QUFDSDtBQUNKLFdBTkQsQ0FNRSxPQUFPZ0MsS0FBUCxFQUFjO0FBQ1ovQyxZQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBWixFQUE4QjhDLEtBQTlCO0FBQ0g7QUFDSixTQVZEO0FBV0FwRSxRQUFBQSxJQUFJLENBQUMwQyxVQUFMLENBQWdCL0csTUFBaEIsQ0FBdUIsWUFBTTtBQUN6QjBGLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGVBQVo7QUFFSCxTQUhEO0FBSUF0QixRQUFBQSxJQUFJLENBQUMwQyxVQUFMLENBQWdCTCxJQUFoQixHQUF1QmdDLElBQXZCLENBQTRCLFlBQU07QUFDOUJoRCxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxRQUFaO0FBQ0gsU0FGRCxXQUVTLFVBQUNqQixHQUFELEVBQVM7QUFDZGdCLFVBQUFBLE9BQU8sQ0FBQytDLEtBQVIsQ0FBYyxRQUFkLEVBQXdCL0QsR0FBeEI7QUFDSCxTQUpEO0FBS0FMLFFBQUFBLElBQUksQ0FBQzBDLFVBQUwsQ0FBZ0I0QixPQUFoQixDQUF3QixVQUFBakUsR0FBRyxFQUFJO0FBQzNCZ0IsVUFBQUEsT0FBTyxDQUFDK0MsS0FBUixDQUFjL0QsR0FBZDtBQUNILFNBRkQ7QUFJSDtBQUNKO0FBQ0o7QUF2VEksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFV0aWxzID0gcmVxdWlyZShcIlV0aWxzXCIpO1xudmFyIFNoYXJlU2RrID0gcmVxdWlyZShcIlNoYXJlU2RrXCIpO1xudmFyIFJhbmtMaXN0ID0gcmVxdWlyZShcIlJhbmtMaXN0XCIpO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbV9zcF9sb2dvOiBjYy5Ob2RlLFxuICAgICAgICBtX2xfbWFpbmdvbGQ6IGNjLkxhYmVsLFxuICAgICAgICBtX3NwX29mZjogY2MuTm9kZSxcbiAgICAgICAgbV9zcGFfbGlzdDogY2MuU3ByaXRlQXRsYXMsXG4gICAgICAgIG1fc3BfbXlzdGVwaWNvbjogY2MuU3ByaXRlLFxuICAgICAgICBtX2xfbXlzdGVwbmFtZTogY2MuTGFiZWwsXG4gICAgICAgIG1fbl9zdGFybGlzdDogeyB0eXBlOiBjYy5Ob2RlLCBkZWZhdWx0OiBbXSB9LFxuICAgICAgICBtX25fc2tpbnBhbmVsOiBjYy5Ob2RlLFxuICAgICAgICBtX25fbW9yZWdhbWU6IGNjLk5vZGUsXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB3aW5kb3cuR0FNRV9NRU5VID0gdGhpcztcbiAgICAgICAgVXRpbHMuc2V0RGVzaWduUmVzb2x1dGlvbigpO1xuICAgIH0sXG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgLy8gdGhpcy5tX3NwX2xvZ28ucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDEsIDAsIDE1KSwgY2MubW92ZUJ5KDEsIDAsIC0xNSkpKSk7XG4gICAgICAgIEVWRU5UX0xJU1RFTkVSLm9uKHdpbmRvdy5HQU1FX1VQREFURV9EQVRBLCB0aGlzLnVwZGF0ZUdvbGQsIHRoaXMpO1xuICAgICAgICB0aGlzLm1fbF9tYWluZ29sZC5zdHJpbmcgPSB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS5nb2xkX251bTtcbiAgICAgICAgdGhpcy5zaG93R2FtZUNsdWJCdXR0b24oKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZU11c2ljQnRuU3ByaXRlKHdpbmRvdy5NVVNJQ19TSE9XX09GRik7XG4gICAgICAgIFJhbmtMaXN0LnNldFNjb3JlKHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLnRvcF9zY29yZSk7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB3eC5zaG93U2hhcmVNZW51KHtcbiAgICAgICAgICAgICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHd4Lm9uU2hhcmVBcHBNZXNzYWdlKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLlpb3njqnlj4jmlrDlpYfvvIzmtojno6jml7bpl7Tlpb3luK7miYtcIixcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VVcmw6IHdpbmRvdy50ZW1wRmlsZVVSTFsxXSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2hvd0FkQmFubmVyKHRydWUpO1xuICAgICAgICBpZiAoIXdpbmRvdy5TSE9XTkVXWUVBUiAmJiB3aW5kb3cuTkVXWUVBUikge1xuICAgICAgICAgICAgVXRpbHMubG9hZFJlcyhcInByZWZhYnMvaGFwcHluZXd5ZWFyXCIsIGNjLlByZWZhYiwgKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUob2JqKTtcbiAgICAgICAgICAgICAgICBub2RlLnpJbmRleCA9IDEgPDwgMTA7XG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgICAgICAgICAgd2luZG93LlNIT1dORVdZRUFSID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBVdGlscy5wbGF5QmdtTXVzaWMod2luZG93LkJHTSwgMC41KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXRNeURhdGEoKTtcbiAgICAgICAgdGhpcy5tX25fbW9yZWdhbWUuYWN0aXZlID0gd2luZG93Lk1PVkVHQU1FO1xuICAgICAgICBcbiAgICAgICAgc2V0SW50ZXJ2YWwoKCk9PntcbiAgICAgICAgICAgIGlmICh3aW5kb3cuZ2V0ZGF0YSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5VdGlscy5zZXRTYXZlRGF0YSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCA2MDAwKTtcbiAgICB9LFxuXG4gICAgcGxheW11aXNjKCkge1xuICAgICAgICBVdGlscy5wbGF5QmdtTXVzaWMod2luZG93LkJHTSwgMC41KTtcbiAgICB9LFxuXG4gICAgaW5pdE15RGF0YSgpIHtcbiAgICAgICAgbGV0IGN1cmx2ID0gd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEudG9wX2xldmVsO1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0TXlTdGVwRGF0YShjdXJsdik7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLm1fc3BfbXlzdGVwaWNvbi5zcHJpdGVGcmFtZSA9IHRoaXMubV9zcGFfbGlzdC5nZXRTcHJpdGVGcmFtZShkYXRhLmljb25fcGF0aCk7XG4gICAgICAgICAgICB0aGlzLm1fbF9teXN0ZXBuYW1lLnN0cmluZyA9IGRhdGEuZGVzYztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tX25fc3Rhcmxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbl9zdGFybGlzdFtpXS5hY3RpdmUgPSBpIDwgZGF0YS5zdGFyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tX3NwX215c3RlcGljb24uc3ByaXRlRnJhbWUgPSB0aGlzLm1fc3BhX2xpc3QuZ2V0U3ByaXRlRnJhbWUoXCJzdGVwaWNvbjZcIik7XG4gICAgICAgICAgICB0aGlzLm1fbF9teXN0ZXBuYW1lLnN0cmluZyA9IHdpbmRvdy5TVEVQX0NPTkZJR1swXS5kZXNjO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1fbl9zdGFybGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMubV9uX3N0YXJsaXN0W2ldLmFjdGl2ZSA9IGkgPCAzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tX25fc2tpbnBhbmVsLmdldENvbXBvbmVudChcIlNraW5QYW5lbFwiKS5pbml0RGF0YSgpO1xuICAgIH0sXG5cbiAgICBnZXRNeVN0ZXBEYXRhKGx2KSB7XG4gICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IobHYgLyAxMCk7XG4gICAgICAgIGlmIChpbmRleCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA+IHdpbmRvdy5TVEVQX0NPTkZJRy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgaW5kZXggPSB3aW5kb3cuU1RFUF9DT05GSUcubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5TVEVQX0NPTkZJR1tpbmRleCAtIDFdO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZUdvbGQoKSB7XG4gICAgICAgIHRoaXMubV9sX21haW5nb2xkLnN0cmluZyA9IHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLmdvbGRfbnVtO1xuICAgIH0sXG5cbiAgICBvblN0YXJ0R2FtZSgpIHtcbiAgICAgICAgVXRpbHMuU2V0U291bmRFZmZlY3Qod2luZG93LkJVVFRPTl9DTElDS19NVVNJQywgZmFsc2UsIDEpO1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUod2luZG93LkdBTUVfU0NFTkVfTkFNRSk7XG4gICAgfSxcblxuICAgIG9uQ2xvc2VTaGFyZSgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKHdpbmRvdy5HQU1FX1NDRU5FX05BTUUpO1xuICAgIH0sXG5cbiAgICBvblNoYXJlU3RhcnQoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgVXRpbHMuU2V0U291bmRFZmZlY3Qod2luZG93LkJVVFRPTl9DTElDS19NVVNJQywgZmFsc2UsIDEpO1xuICAgICAgICBTaGFyZVNkay5zaGFyZUFwcE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdGl0bGU6IFwi5p2l5Yqp5Yqb5oiR5LiA6LW35omT5oCq5YW95ZCnXCIsXG4gICAgICAgICAgICBpbWFnZVVybDogd2luZG93LnRlbXBGaWxlVVJMWzFdLFxuICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUod2luZG93LkdBTUVfU0NFTkVfTkFNRSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbXBsYXRlOiBtc2cgPT4ge1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgb25PcGVuU2tpblBhbmVsKCkge1xuICAgICAgICB0aGlzLm1fbl9za2lucGFuZWwuYWN0aXZlID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgb25PcGVuU3RlcFJhbmsoKSB7XG4gICAgICAgIFV0aWxzLlNldFNvdW5kRWZmZWN0KHdpbmRvdy5CVVRUT05fQ0xJQ0tfTVVTSUMsIGZhbHNlLCAxKTtcbiAgICAgICAgaWYgKHdpbmRvdy5pc1dlQ2hhdFBsYXRmb3JtKVxuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoeyB0aXRsZTogXCLliqDovb3kuK0uLi5cIiB9KTtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKHdpbmRvdy5TVEVQX1NDRU5FX05BTUUsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cuaXNXZUNoYXRQbGF0Zm9ybSlcbiAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBvbk11c2ljQnRuQ2xpY2soKSB7XG4gICAgICAgIGlmICh3aW5kb3cuTVVTSUNfU0hPV19PRkYgPT0gMSkge1xuICAgICAgICAgICAgd2luZG93Lk1VU0lDX1NIT1dfT0ZGID0gMDtcbiAgICAgICAgICAgIFV0aWxzLnN0b3BCZ21NdXNpYygpO1xuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtdXNpYycsICcwJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3cuTVVTSUNfU0hPV19PRkYgPSAxO1xuICAgICAgICAgICAgVXRpbHMucGxheUJnbU11c2ljKHdpbmRvdy5CR00sIDAuNSk7XG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ211c2ljJywgJzEnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZU11c2ljQnRuU3ByaXRlKHdpbmRvdy5NVVNJQ19TSE9XX09GRik7XG4gICAgfSxcblxuXG4gICAgdXBkYXRlTXVzaWNCdG5TcHJpdGUoc2hvd19vZmYpIHtcbiAgICAgICAgaWYgKHNob3dfb2ZmID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMubV9zcF9vZmYuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1fc3Bfb2ZmLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25TaGFyZSgpIHtcbiAgICAgICAgVXRpbHMuU2V0U291bmRFZmZlY3Qod2luZG93LkJVVFRPTl9DTElDS19NVVNJQywgZmFsc2UsIDEpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjYy51cmwucmF3KFwicmVzb3VyY2VzL2NvbW1vbi9zaGFyZXBpYy44NTY2My5wbmdcIikpO1xuICAgICAgICBTaGFyZVNkay5zaGFyZUFwcE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdGl0bGU6IFwi5LuK5bm05pyA5aW9546p5pyA5Yi65r+A55qE5YWt6L655b2i5b+r5LmQ6L+e5raI5ri45oiP77yM5b+r5p2l5bCd6K+V5LiLXCIsXG4gICAgICAgICAgICBpbWFnZVVybDogd2luZG93LnRlbXBGaWxlVVJMWzFdLFxuICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc1wiLCByZXMpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlcy1lcnJcIilcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wbGF0ZTogbXNnID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbXBsYXRlXCIpXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgb25Nb3JlR2FtZSgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9ICd1bmRlZmluZWQnICYmIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSkge1xuICAgICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcbiAgICAgICAgICAgICAgICBhcHBJZDogXCJ3eDcxMDkzMDkyMTRmNGM4NmVcIixcbiAgICAgICAgICAgICAgICAvL3RhcmdldDogXCJ3eDZlZTljYWUwNzc4NTFkZmFcIixcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6Lez6L2s5oiQ5YqfJyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHN1Y2Nlc3NzICYmIHN1Y2Nlc3NzKHJlcyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOiBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui3s+i9rOWksei0pe+8mlwiLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICAvLyBmYWlsbCAmJiBmYWlsbChlcnIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfot7PovazlrozmiJAnKVxuICAgICAgICAgICAgICAgICAgICAvLyBjb21wbGV0ZWUgJiYgY29tcGxldGVlKHJlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3eFNob3J0Q3V0LnNob3dNb2RhbChcIuaPkOekulwiLCBcIuaaguacquW8gOaUvlwiKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzaG93R2FtZUNsdWJCdXR0b24oKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmNsdWJidXR0b24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsdWJidXR0b24gPSB3eC5jcmVhdGVHYW1lQ2x1YkJ1dHRvbih7XG4gICAgICAgICAgICAgICAgICAgIGljb246ICdsaWdodCcsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAxMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogMzAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDQwLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA0MFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNsdWJidXR0b24uc2hvdygpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBoaWRlR2FtZUNsdWJCdXR0b24oKSB7XG4gICAgICAgIGlmICh0aGlzLmNsdWJidXR0b24pIHtcbiAgICAgICAgICAgIHRoaXMuY2x1YmJ1dHRvbi5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5jbHViYnV0dG9uKSB7XG4gICAgICAgICAgICB0aGlzLmNsdWJidXR0b24uZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5jbHViYnV0dG9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5tX2Jhbm5lcmFkKSB7XG4gICAgICAgICAgICB0aGlzLm1fYmFubmVyYWQuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5tX2Jhbm5lcmFkID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBFVkVOVF9MSVNURU5FUi5vZmYod2luZG93LkdBTUVfVVBEQVRFX0RBVEEsIHRoaXMpO1xuICAgICAgICB3aW5kb3cuR0FNRV9NRU5VID0gbnVsbDtcbiAgICB9LFxuXG4gICAgc2hvd0FkQmFubmVyKGJvbykge1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgPT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICAgICAgbGV0IFNpemUgPSBjYy53aW5TaXplXG5cbiAgICAgICAgbGV0IFdpZHRobm9kZSA9IGNjLmZpbmQoXCJDYW52YXMvbl9mdW5ueW1hcC9uX2Jhbm5lcnBvc1wiKTtcbiAgICAgICAgdmFyIHBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlKFdpZHRobm9kZSk7XG5cbiAgICAgICAgaWYgKFNpemUuaGVpZ2h0IC8gU2l6ZS53aWR0aCA+IDIpIHsvL+mAgumFjeWFqOmdouWxjyDpgILnlKjkuo5GSVhIZWlnaHRcbiAgICAgICAgICAgIHBvcy55ICs9IChTaXplLmhlaWdodCAtIDE5MjApIC8gMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzeXN0ZW0gPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpO1xuXG4gICAgICAgIGxldCBhZGFwdFNjYWxlSCA9IHN5c3RlbS5zY3JlZW5IZWlnaHQgLyBTaXplLmhlaWdodDtcbiAgICAgICAgdmFyIFBvc1kgPSAoKFNpemUuaGVpZ2h0IC0gcG9zLnkpICogYWRhcHRTY2FsZUgpO1xuXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCFib28pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1fYmFubmVyYWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1fYmFubmVyYWQuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMubV9iYW5uZXJhZClcbiAgICAgICAgICAgICAgICB0aGlzLm1fYmFubmVyYWQuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5tX2Jhbm5lcmFkICYmIGJvbykge1xuICAgICAgICAgICAgaWYgKHN5c3RlbS5TREtWZXJzaW9uIDwgJzIuMC40Jykge1xuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIuW+ruS/oeeJiOacrOi/h+S9ju+8jOaXoOazleWIm+W7uuW5v+WRimJhbm5lclwiLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gd3guaGlkZVRvYXN0KCksIDMwMDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLm1fYmFubmVyYWQgPSB3eC5jcmVhdGVCYW5uZXJBZCh7XG4gICAgICAgICAgICAgICAgICAgIGFkVW5pdElkOiAnYWR1bml0LTlkZDA1N2I2YjUxNDI0NWEnLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogUG9zWSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBzeXN0ZW0uc2NyZWVuV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHNlbGYubV9iYW5uZXJhZC5vblJlc2l6ZSgocmVzMSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYubV9iYW5uZXJhZCAmJiBzZWxmLm1fYmFubmVyYWQuc3R5bGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubV9iYW5uZXJhZC5zdHlsZS50b3AgPSBQb3NZO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubV9iYW5uZXJhZC5zdHlsZS5oZWlnaHQgPSByZXMxLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib25SZXNpemUtZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2VsZi5tX2Jhbm5lcmFkLm9uTG9hZCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdiYW5uZXIg5bm/5ZGK5Yqg6L295oiQ5YqfJylcblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgc2VsZi5tX2Jhbm5lcmFkLnNob3coKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlub/lkYrmmL7npLrmiJDlip9cIik7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5bm/5ZGK5Yqg6L295aSx6LSlXCIsIGVycik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBzZWxmLm1fYmFubmVyYWQub25FcnJvcihlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycilcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxufSk7XG4iXX0=
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/shader/Wave_VH.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '47130Ahq4RMiql9ilrh/oye', 'Wave_VH');
// Script/common/shader/Wave_VH.js

"use strict";

var _default_vert = require("./ccShader_Default_Vert.js");

var _default_vert_no_mvp = require("./ccShader_Default_Vert_noMVP.js");

var _wave_vh_frag = require("./ccShader_Wave_VH_Frag.js");

cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    this._angle = 15;
    this._motion = 0;

    this._use();
  },
  _use: function _use() {
    this._program = new cc.GLProgram();

    if (cc.sys.isNative) {
      cc.log("use native GLProgram");

      this._program.initWithString(_default_vert_no_mvp, _wave_vh_frag);

      this._program.link();

      this._program.updateUniforms();
    } else {
      this._program.initWithVertexShaderByteArray(_default_vert, _wave_vh_frag);

      this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);

      this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);

      this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);

      this._program.link();

      this._program.updateUniforms();
    }

    this._uniMotion = this._program.getUniformLocationForName("motion");
    this._uniAngle = this._program.getUniformLocationForName("angle");
    this._mouse = this._program.getUniformLocationForName("mouse");

    if (cc.sys.isNative) {
      var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
      glProgram_state.setUniformFloat(this._uniAngle, this._angle);
    } else {
      this._program.setUniformLocationWith1f(this._uniAngle, this._angle); // this._program.setUniformLocationWith2f(this._mouse, this._mousepos.x, this._mousepos.y )

    }

    this.setProgram(this.node._sgNode, this._program);
  },
  setProgram: function setProgram(node, program) {
    if (cc.sys.isNative) {
      var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
      node.setGLProgramState(glProgram_state);
    } else {
      node.setShaderProgram(program);
    }

    var children = node.children;
    if (!children) return;

    for (var i = 0; i < children.length; i++) {
      this.setProgram(children[i], program);
    }
  },
  update: function update(dt) {
    if (this._program) {
      this._program.use();

      if (cc.sys.isNative) {
        var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
        glProgram_state.setUniformFloat(this._uniMotion, this._motion += 0.02);
      } else {
        this._program.setUniformLocationWith1f(this._uniMotion, this._motion += 0.02);

        this._program.updateUniforms();
      }

      if (1.0e20 < this._motion) {
        this._motion = 0;
      }
    }
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29tbW9uL3NoYWRlci9XYXZlX1ZILmpzIl0sIm5hbWVzIjpbIl9kZWZhdWx0X3ZlcnQiLCJyZXF1aXJlIiwiX2RlZmF1bHRfdmVydF9ub19tdnAiLCJfd2F2ZV92aF9mcmFnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJvbkxvYWQiLCJfYW5nbGUiLCJfbW90aW9uIiwiX3VzZSIsIl9wcm9ncmFtIiwiR0xQcm9ncmFtIiwic3lzIiwiaXNOYXRpdmUiLCJsb2ciLCJpbml0V2l0aFN0cmluZyIsImxpbmsiLCJ1cGRhdGVVbmlmb3JtcyIsImluaXRXaXRoVmVydGV4U2hhZGVyQnl0ZUFycmF5IiwiYWRkQXR0cmlidXRlIiwibWFjcm8iLCJBVFRSSUJVVEVfTkFNRV9QT1NJVElPTiIsIlZFUlRFWF9BVFRSSUJfUE9TSVRJT04iLCJBVFRSSUJVVEVfTkFNRV9DT0xPUiIsIlZFUlRFWF9BVFRSSUJfQ09MT1IiLCJBVFRSSUJVVEVfTkFNRV9URVhfQ09PUkQiLCJWRVJURVhfQVRUUklCX1RFWF9DT09SRFMiLCJfdW5pTW90aW9uIiwiZ2V0VW5pZm9ybUxvY2F0aW9uRm9yTmFtZSIsIl91bmlBbmdsZSIsIl9tb3VzZSIsImdsUHJvZ3JhbV9zdGF0ZSIsIkdMUHJvZ3JhbVN0YXRlIiwiZ2V0T3JDcmVhdGVXaXRoR0xQcm9ncmFtIiwic2V0VW5pZm9ybUZsb2F0Iiwic2V0VW5pZm9ybUxvY2F0aW9uV2l0aDFmIiwic2V0UHJvZ3JhbSIsIm5vZGUiLCJfc2dOb2RlIiwicHJvZ3JhbSIsInNldEdMUHJvZ3JhbVN0YXRlIiwic2V0U2hhZGVyUHJvZ3JhbSIsImNoaWxkcmVuIiwiaSIsImxlbmd0aCIsInVwZGF0ZSIsImR0IiwidXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLGFBQWEsR0FBR0MsT0FBTyxDQUFDLDRCQUFELENBQTNCOztBQUNBLElBQUlDLG9CQUFvQixHQUFHRCxPQUFP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RixPQUF0QjtBQUNIOztBQUdELFFBQUlHLFFBQVEsR0FBR0wsSUFBSSxDQUFDSyxRQUFwQjtBQUNBLFFBQUksQ0FBQ0EsUUFBTCxFQUNJOztBQUVKLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0QsUUFBUSxDQUFDRSxNQUE3QixFQUFxQ0QsQ0FBQyxFQUF0QztBQUNJLFdBQUtQLFVBQUwsQ0FBZ0JNLFFBQVEsQ0FBQ0MsQ0FBRCxDQUF4QixFQUE2QkosT0FBN0I7QUFESjtBQUVILEdBN0RJO0FBZ0VMTSxFQUFBQSxNQUFNLEVBQUUsZ0JBQVVDLEVBQVYsRUFBYztBQUNsQixRQUFJLEtBQUtwQyxRQUFULEVBQW1CO0FBRWYsV0FBS0EsUUFBTCxDQUFjcUMsR0FBZDs7QUFDQSxVQUFJN0MsRUFBRSxDQUFDVSxHQUFILENBQU9DLFFBQVgsRUFBcUI7QUFDakIsWUFBSWtCLGVBQWUsR0FBRzdCLEVBQUUsQ0FBQzhCLGNBQUgsQ0FBa0JDLHdCQUFsQixDQUEyQyxLQUFLdkIsUUFBaEQsQ0FBdEI7QUFDQXFCLFFBQUFBLGVBQWUsQ0FBQ0csZUFBaEIsQ0FBZ0MsS0FBS1AsVUFBckMsRUFBa0QsS0FBS25CLE9BQUwsSUFBZ0IsSUFBbEU7QUFDSCxPQUhELE1BR087QUFDSCxhQUFLRSxRQUFMLENBQWN5Qix3QkFBZCxDQUF1QyxLQUFLUixVQUE1QyxFQUF5RCxLQUFLbkIsT0FBTCxJQUFnQixJQUF6RTs7QUFDQSxhQUFLRSxRQUFMLENBQWNPLGNBQWQ7QUFDSDs7QUFDRCxVQUFJLFNBQVMsS0FBS1QsT0FBbEIsRUFBMkI7QUFBRSxhQUFLQSxPQUFMLEdBQWUsQ0FBZjtBQUFtQjtBQUNuRDtBQUNKO0FBN0VJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfZGVmYXVsdF92ZXJ0ID0gcmVxdWlyZShcIi4vY2NTaGFkZXJfRGVmYXVsdF9WZXJ0LmpzXCIpO1xudmFyIF9kZWZhdWx0X3ZlcnRfbm9fbXZwID0gcmVxdWlyZShcIi4vY2NTaGFkZXJfRGVmYXVsdF9WZXJ0X25vTVZQLmpzXCIpO1xudmFyIF93YXZlX3ZoX2ZyYWcgPSByZXF1aXJlKFwiLi9jY1NoYWRlcl9XYXZlX1ZIX0ZyYWcuanNcIik7XG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cbiAgICB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2FuZ2xlID0gMTU7XG4gICAgICAgIHRoaXMuX21vdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuX3VzZSgpO1xuICAgIH0sXG5cbiAgICBfdXNlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3Byb2dyYW0gPSBuZXcgY2MuR0xQcm9ncmFtKCk7XG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcbiAgICAgICAgICAgIGNjLmxvZyhcInVzZSBuYXRpdmUgR0xQcm9ncmFtXCIpXG4gICAgICAgICAgICB0aGlzLl9wcm9ncmFtLmluaXRXaXRoU3RyaW5nKF9kZWZhdWx0X3ZlcnRfbm9fbXZwLCBfd2F2ZV92aF9mcmFnKTtcbiAgICAgICAgICAgIHRoaXMuX3Byb2dyYW0ubGluaygpO1xuICAgICAgICAgICAgdGhpcy5fcHJvZ3JhbS51cGRhdGVVbmlmb3JtcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcHJvZ3JhbS5pbml0V2l0aFZlcnRleFNoYWRlckJ5dGVBcnJheShfZGVmYXVsdF92ZXJ0LCBfd2F2ZV92aF9mcmFnKTtcblxuICAgICAgICAgICAgdGhpcy5fcHJvZ3JhbS5hZGRBdHRyaWJ1dGUoY2MubWFjcm8uQVRUUklCVVRFX05BTUVfUE9TSVRJT04sIGNjLm1hY3JvLlZFUlRFWF9BVFRSSUJfUE9TSVRJT04pO1xuICAgICAgICAgICAgdGhpcy5fcHJvZ3JhbS5hZGRBdHRyaWJ1dGUoY2MubWFjcm8uQVRUUklCVVRFX05BTUVfQ09MT1IsIGNjLm1hY3JvLlZFUlRFWF9BVFRSSUJfQ09MT1IpO1xuICAgICAgICAgICAgdGhpcy5fcHJvZ3JhbS5hZGRBdHRyaWJ1dGUoY2MubWFjcm8uQVRUUklCVVRFX05BTUVfVEVYX0NPT1JELCBjYy5tYWNyby5WRVJURVhfQVRUUklCX1RFWF9DT09SRFMpO1xuICAgICAgICAgICAgdGhpcy5fcHJvZ3JhbS5saW5rKCk7XG4gICAgICAgICAgICB0aGlzLl9wcm9ncmFtLnVwZGF0ZVVuaWZvcm1zKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91bmlNb3Rpb24gPSB0aGlzLl9wcm9ncmFtLmdldFVuaWZvcm1Mb2NhdGlvbkZvck5hbWUoXCJtb3Rpb25cIik7XG4gICAgICAgIHRoaXMuX3VuaUFuZ2xlID0gdGhpcy5fcHJvZ3JhbS5nZXRVbmlmb3JtTG9jYXRpb25Gb3JOYW1lKFwiYW5nbGVcIik7XG4gICAgICAgIHRoaXMuX21vdXNlID0gdGhpcy5fcHJvZ3JhbS5nZXRVbmlmb3JtTG9jYXRpb25Gb3JOYW1lKFwibW91c2VcIik7XG5cblxuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XG4gICAgICAgICAgICB2YXIgZ2xQcm9ncmFtX3N0YXRlID0gY2MuR0xQcm9ncmFtU3RhdGUuZ2V0T3JDcmVhdGVXaXRoR0xQcm9ncmFtKHRoaXMuX3Byb2dyYW0pO1xuICAgICAgICAgICAgZ2xQcm9ncmFtX3N0YXRlLnNldFVuaWZvcm1GbG9hdCh0aGlzLl91bmlBbmdsZSwgdGhpcy5fYW5nbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcHJvZ3JhbS5zZXRVbmlmb3JtTG9jYXRpb25XaXRoMWYodGhpcy5fdW5pQW5nbGUsIHRoaXMuX2FuZ2xlKTtcbiAgICAgICAgICAgIC8vIHRoaXMuX3Byb2dyYW0uc2V0VW5pZm9ybUxvY2F0aW9uV2l0aDJmKHRoaXMuX21vdXNlLCB0aGlzLl9tb3VzZXBvcy54LCB0aGlzLl9tb3VzZXBvcy55IClcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5zZXRQcm9ncmFtKHRoaXMubm9kZS5fc2dOb2RlLCB0aGlzLl9wcm9ncmFtKTtcbiAgICB9LFxuICAgIHNldFByb2dyYW06IGZ1bmN0aW9uIChub2RlLCBwcm9ncmFtKSB7XG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcbiAgICAgICAgICAgIHZhciBnbFByb2dyYW1fc3RhdGUgPSBjYy5HTFByb2dyYW1TdGF0ZS5nZXRPckNyZWF0ZVdpdGhHTFByb2dyYW0ocHJvZ3JhbSk7XG4gICAgICAgICAgICBub2RlLnNldEdMUHJvZ3JhbVN0YXRlKGdsUHJvZ3JhbV9zdGF0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlLnNldFNoYWRlclByb2dyYW0ocHJvZ3JhbSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW47XG4gICAgICAgIGlmICghY2hpbGRyZW4pXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHRoaXMuc2V0UHJvZ3JhbShjaGlsZHJlbltpXSwgcHJvZ3JhbSk7XG4gICAgfSxcblxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcbiAgICAgICAgaWYgKHRoaXMuX3Byb2dyYW0pIHtcblxuICAgICAgICAgICAgdGhpcy5fcHJvZ3JhbS51c2UoKTtcbiAgICAgICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZ2xQcm9ncmFtX3N0YXRlID0gY2MuR0xQcm9ncmFtU3RhdGUuZ2V0T3JDcmVhdGVXaXRoR0xQcm9ncmFtKHRoaXMuX3Byb2dyYW0pO1xuICAgICAgICAgICAgICAgIGdsUHJvZ3JhbV9zdGF0ZS5zZXRVbmlmb3JtRmxvYXQodGhpcy5fdW5pTW90aW9uLCAodGhpcy5fbW90aW9uICs9IDAuMDIpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvZ3JhbS5zZXRVbmlmb3JtTG9jYXRpb25XaXRoMWYodGhpcy5fdW5pTW90aW9uLCAodGhpcy5fbW90aW9uICs9IDAuMDIpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wcm9ncmFtLnVwZGF0ZVVuaWZvcm1zKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiggMS4wZTIwIDwgdGhpcy5fbW90aW9uICl7IHRoaXMuX21vdGlvbiA9IDA7IH1cbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/dataStatistics/Data.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b846fNhcCFFZrE+CJj/eqje', 'Data');
// Script/dataStatistics/Data.js

"use strict";

var netErrorToast = function netErrorToast() {
  wx.showToast({
    title: "联网超时",
    icon: "none",
    image: "",
    duration: 0
  });
  setTimeout(function () {
    return wx.hideToast();
  }, 2000);
}; //被动转发（点击右上角转发菜单） 请勿重复注册回调事件，如不需要转发，请调用wx.hideShareMenu();


module.exports = {
  //onShow时调用 上报统计数据 
  onShow: function onShow(info, _success, _fail) {// dataStatistics.onShowInfo(info, _success, _fail);
  },
  //onHide时调用 上报统计数据
  onHide: function onHide() {// dataStatistics.onHideInfo();
  },

  /**
   * 主动转发
   * @param {EChannelPrefix} channelPrefix    分享渠道
   * @param {string} query                     onShow参数列表
   * @param {Function} netError               联网失败回调方法
   * @param {Function} success                分享成功回调 
   * @param {Function} fail                   分享失败回调 
   * @param {Function} complete               分享完成回调
   */
  share: function share(channelPrefix, query, netError, success, fail, complete, titlePrefix) {// dataStatistics.getShareInfo(channelPrefix, (res) => {
    //     console.log("获取分享数据成功：", res);
    //     dataStatistics.shareAppMsg({
    //         title: (titlePrefix || "") + res.data.data.title,
    //         imageUrl: res.data.data.image,
    //         query: query || "",
    //         success: (res) => {
    //             dataStatistics.shareSuccess(EChannelPrefix.invitation);
    //             if (success)
    //                 success(res);
    //         },
    //         fail: fail || null,
    //         complete: complete || null
    //     });
    // }, () => {
    //     netErrorToast();
    //     if (netError)
    //         netError();
    // });
  },
  //分享成绩
  shareScore: function shareScore(score, query, netError, success, fail, complete) {// this.share(EChannelPrefix.result, query, netError, success, fail, complete, "我的分数：" + score);
  },
  setData: function setData(value, success, fail) {// dataStatistics.setKVUserData(value, res => {
    //     //console.log("========保存数据成功：",res);
    //     if (success)
    //         success(res);
    // }, res => {
    //     console.log("========保存数据失败：", res);
    //     if (fail)
    //         fail(res);
    // });
  },
  getData: function getData(success, fail) {// dataStatistics.getKVUserData(res => {
    //     //console.log("========获取数据成功：",res);
    //     if (success)
    //         success(res);
    // }, err => {
    //     console.log("========获取数据失败：", err);
    //     if (fail)
    //         fail(err);
    // });
  },
  getGameConfigByAppkey: function getGameConfigByAppkey(_success, _fail) {// dataStatistics.getGameConfigByAppkey(_success, _fail);
  }
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvZGF0YVN0YXRpc3RpY3MvRGF0YS5qcyJdLCJuYW1lcyI6WyJuZXRFcnJvclRvYXN0Iiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJpbWFnZSIsImR1cmF0aW9uIiwic2V0VGltZW91dCIsImhpZGVUb2FzdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJvblNob3ciLCJpbmZvIiwiX3N1Y2Nlc3MiLCJfZmFpbCIsIm9uSGlkZSIsInNoYXJlIiwiY2hhbm5lbFByZWZpeCIsInF1ZXJ5IiwibmV0RXJyb3IiLCJzdWNjZXNzIiwiZmFpbCIsImNvbXBsZXRlIiwidGl0bGVQcmVmaXgiLCJzaGFyZVNjb3JlIiwic2NvcmUiLCJzZXREYXRhIiwidmFsdWUiLCJnZXREYXRhIiwiZ2V0R2FtZUNvbmZpZ0J5QXBwa2V5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsR0FBTTtBQUN0QkMsRUFBQUEsRUFBRSxDQUFDQyxTQUFILENBQWE7QUFDVEMsSUFBQUEsS0FBSyxFQUFFLE1BREU7QUFFVEMsSUFBQUEsSUFBSSxFQUFFLE1BRkc7QUFHVEMsSUFBQUEsS0FBSyxFQUFFLEVBSEU7QUFJVEMsSUFBQUEsUUFBUSxFQUFFO0FBSkQsR0FBYjtBQU1BQyxFQUFBQSxVQUFVLENBQUM7QUFBQSxXQUFNTixFQUFFLENBQUNPLFNBQUgsRUFBTjtBQUFBLEdBQUQsRUFBdUIsSUFBdkIsQ0FBVjtBQUNILENBUkQsRUFVQTs7O0FBR0FDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUViO0FBQ0FDLEVBQUFBLE1BSGEsa0JBR05DLElBSE0sRUFHQUMsUUFIQSxFQUdVQyxLQUhWLEVBR2lCLENBQzFCO0FBQ0gsR0FMWTtBQU9iO0FBQ0FDLEVBQUFBLE1BUmEsb0JBUUosQ0FDTDtBQUNILEdBVlk7O0FBWWI7Ozs7Ozs7OztBQVNBQyxFQUFBQSxLQXJCYSxpQkFxQlBDLGFBckJPLEVBcUJRQyxLQXJCUixFQXFCZUMsUUFyQmYsRUFxQnlCQyxPQXJCekIsRUFxQmtDQyxJQXJCbEMsRUFxQndDQyxRQXJCeEMsRUFxQmtEQyxXQXJCbEQsRUFxQitELENBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0gsR0F6Q1k7QUEyQ2I7QUFDQUMsRUFBQUEsVUE1Q2Esc0JBNENGQyxLQTVDRSxFQTRDS1AsS0E1Q0wsRUE0Q1lDLFFBNUNaLEVBNENzQkMsT0E1Q3RCLEVBNEMrQkMsSUE1Qy9CLEVBNENxQ0MsUUE1Q3JDLEVBNEMrQyxDQUN4RDtBQUNILEdBOUNZO0FBZ0RiSSxFQUFBQSxPQWhEYSxtQkFnRExDLEtBaERLLEVBZ0RFUCxPQWhERixFQWdEV0MsSUFoRFgsRUFnRGlCLENBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNILEdBMURZO0FBNERiTyxFQUFBQSxPQTVEYSxtQkE0RExSLE9BNURLLEVBNERJQyxJQTVESixFQTREVSxDQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSCxHQXRFWTtBQXdFYlEsRUFBQUEscUJBeEVhLGlDQXdFU2hCLFFBeEVULEVBd0VtQkMsS0F4RW5CLEVBd0UwQixDQUNuQztBQUNIO0FBMUVZLENBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcblxubGV0IG5ldEVycm9yVG9hc3QgPSAoKSA9PiB7XG4gICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgdGl0bGU6IFwi6IGU572R6LaF5pe2XCIsXG4gICAgICAgIGljb246IFwibm9uZVwiLFxuICAgICAgICBpbWFnZTogXCJcIixcbiAgICAgICAgZHVyYXRpb246IDAsXG4gICAgfSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB3eC5oaWRlVG9hc3QoKSwgMjAwMCk7XG59O1xuXG4vL+iiq+WKqOi9rOWPke+8iOeCueWHu+WPs+S4iuinkui9rOWPkeiPnOWNle+8iSDor7fli7/ph43lpI3ms6jlhozlm57osIPkuovku7bvvIzlpoLkuI3pnIDopoHovazlj5HvvIzor7fosIPnlKh3eC5oaWRlU2hhcmVNZW51KCk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICAvL29uU2hvd+aXtuiwg+eUqCDkuIrmiqXnu5/orqHmlbDmja4gXG4gICAgb25TaG93KGluZm8sIF9zdWNjZXNzLCBfZmFpbCkge1xuICAgICAgICAvLyBkYXRhU3RhdGlzdGljcy5vblNob3dJbmZvKGluZm8sIF9zdWNjZXNzLCBfZmFpbCk7XG4gICAgfSxcblxuICAgIC8vb25IaWRl5pe26LCD55SoIOS4iuaKpee7n+iuoeaVsOaNrlxuICAgIG9uSGlkZSgpIHtcbiAgICAgICAgLy8gZGF0YVN0YXRpc3RpY3Mub25IaWRlSW5mbygpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDkuLvliqjovazlj5FcbiAgICAgKiBAcGFyYW0ge0VDaGFubmVsUHJlZml4fSBjaGFubmVsUHJlZml4ICAgIOWIhuS6q+a4oOmBk1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeSAgICAgICAgICAgICAgICAgICAgIG9uU2hvd+WPguaVsOWIl+ihqFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG5ldEVycm9yICAgICAgICAgICAgICAg6IGU572R5aSx6LSl5Zue6LCD5pa55rOVXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gc3VjY2VzcyAgICAgICAgICAgICAgICDliIbkuqvmiJDlip/lm57osIMgXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZmFpbCAgICAgICAgICAgICAgICAgICDliIbkuqvlpLHotKXlm57osIMgXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGxldGUgICAgICAgICAgICAgICDliIbkuqvlrozmiJDlm57osINcbiAgICAgKi9cbiAgICBzaGFyZShjaGFubmVsUHJlZml4LCBxdWVyeSwgbmV0RXJyb3IsIHN1Y2Nlc3MsIGZhaWwsIGNvbXBsZXRlLCB0aXRsZVByZWZpeCkge1xuICAgICAgICAvLyBkYXRhU3RhdGlzdGljcy5nZXRTaGFyZUluZm8oY2hhbm5lbFByZWZpeCwgKHJlcykgPT4ge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCLojrflj5bliIbkuqvmlbDmja7miJDlip/vvJpcIiwgcmVzKTtcbiAgICAgICAgLy8gICAgIGRhdGFTdGF0aXN0aWNzLnNoYXJlQXBwTXNnKHtcbiAgICAgICAgLy8gICAgICAgICB0aXRsZTogKHRpdGxlUHJlZml4IHx8IFwiXCIpICsgcmVzLmRhdGEuZGF0YS50aXRsZSxcbiAgICAgICAgLy8gICAgICAgICBpbWFnZVVybDogcmVzLmRhdGEuZGF0YS5pbWFnZSxcbiAgICAgICAgLy8gICAgICAgICBxdWVyeTogcXVlcnkgfHwgXCJcIixcbiAgICAgICAgLy8gICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGRhdGFTdGF0aXN0aWNzLnNoYXJlU3VjY2VzcyhFQ2hhbm5lbFByZWZpeC5pbnZpdGF0aW9uKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcyk7XG4gICAgICAgIC8vICAgICAgICAgfSxcbiAgICAgICAgLy8gICAgICAgICBmYWlsOiBmYWlsIHx8IG51bGwsXG4gICAgICAgIC8vICAgICAgICAgY29tcGxldGU6IGNvbXBsZXRlIHx8IG51bGxcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9LCAoKSA9PiB7XG4gICAgICAgIC8vICAgICBuZXRFcnJvclRvYXN0KCk7XG4gICAgICAgIC8vICAgICBpZiAobmV0RXJyb3IpXG4gICAgICAgIC8vICAgICAgICAgbmV0RXJyb3IoKTtcbiAgICAgICAgLy8gfSk7XG4gICAgfSxcblxuICAgIC8v5YiG5Lqr5oiQ57upXG4gICAgc2hhcmVTY29yZShzY29yZSwgcXVlcnksIG5ldEVycm9yLCBzdWNjZXNzLCBmYWlsLCBjb21wbGV0ZSkge1xuICAgICAgICAvLyB0aGlzLnNoYXJlKEVDaGFubmVsUHJlZml4LnJlc3VsdCwgcXVlcnksIG5ldEVycm9yLCBzdWNjZXNzLCBmYWlsLCBjb21wbGV0ZSwgXCLmiJHnmoTliIbmlbDvvJpcIiArIHNjb3JlKTtcbiAgICB9LFxuXG4gICAgc2V0RGF0YSh2YWx1ZSwgc3VjY2VzcywgZmFpbCkge1xuICAgICAgICAvLyBkYXRhU3RhdGlzdGljcy5zZXRLVlVzZXJEYXRhKHZhbHVlLCByZXMgPT4ge1xuICAgICAgICAvLyAgICAgLy9jb25zb2xlLmxvZyhcIj09PT09PT095L+d5a2Y5pWw5o2u5oiQ5Yqf77yaXCIscmVzKTtcbiAgICAgICAgLy8gICAgIGlmIChzdWNjZXNzKVxuICAgICAgICAvLyAgICAgICAgIHN1Y2Nlc3MocmVzKTtcbiAgICAgICAgLy8gfSwgcmVzID0+IHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT3kv53lrZjmlbDmja7lpLHotKXvvJpcIiwgcmVzKTtcbiAgICAgICAgLy8gICAgIGlmIChmYWlsKVxuICAgICAgICAvLyAgICAgICAgIGZhaWwocmVzKTtcbiAgICAgICAgLy8gfSk7XG4gICAgfSxcblxuICAgIGdldERhdGEoc3VjY2VzcywgZmFpbCkge1xuICAgICAgICAvLyBkYXRhU3RhdGlzdGljcy5nZXRLVlVzZXJEYXRhKHJlcyA9PiB7XG4gICAgICAgIC8vICAgICAvL2NvbnNvbGUubG9nKFwiPT09PT09PT3ojrflj5bmlbDmja7miJDlip/vvJpcIixyZXMpO1xuICAgICAgICAvLyAgICAgaWYgKHN1Y2Nlc3MpXG4gICAgICAgIC8vICAgICAgICAgc3VjY2VzcyhyZXMpO1xuICAgICAgICAvLyB9LCBlcnIgPT4ge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCI9PT09PT09PeiOt+WPluaVsOaNruWksei0pe+8mlwiLCBlcnIpO1xuICAgICAgICAvLyAgICAgaWYgKGZhaWwpXG4gICAgICAgIC8vICAgICAgICAgZmFpbChlcnIpO1xuICAgICAgICAvLyB9KTtcbiAgICB9LFxuXG4gICAgZ2V0R2FtZUNvbmZpZ0J5QXBwa2V5KF9zdWNjZXNzLCBfZmFpbCkge1xuICAgICAgICAvLyBkYXRhU3RhdGlzdGljcy5nZXRHYW1lQ29uZmlnQnlBcHBrZXkoX3N1Y2Nlc3MsIF9mYWlsKTtcbiAgICB9LFxufSJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/newBie/NewBieGift.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ff138Fh57NHHqstEbjYQe72', 'NewBieGift');
// Script/newBie/NewBieGift.js

"use strict";

var Utils = require("Utils");

var ShareSdk = require("ShareSdk");

var GetTimeString = function GetTimeString() {
  var data = new Date();
  var time = data.getFullYear() + "/" + (data.getMonth() + 1) + "/" + data.getDate(); // var time = data.toLocaleDateString();

  var arr = time.split("/");
  return [time, arr];
};

cc.Class({
  "extends": cc.Component,
  properties: {
    m_n_newpanel: cc.Node,
    m_n_newpanel_success: cc.Node,
    m_btn_getreward: cc.Button,
    m_l_desc: cc.Label
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {
    this.m_n_newpanel.active = false;
    this.m_n_newpanel_success.active = false; // EVENT_LISTENER.on(window.GAME_SAVE_HANDLER, this.updateData, this);

    EVENT_LISTENER.on(window.ON_SHOW_BACK, this.onshowback, this);
    this.updateData();
  },
  // update (dt) {},
  onEnable: function onEnable() {},
  onDisable: function onDisable() {},
  onDestroy: function onDestroy() {
    // EVENT_LISTENER.off(window.GAME_SAVE_HANDLER, this);
    EVENT_LISTENER.off(window.ON_SHOW_BACK, this);
  },
  onshowback: function onshowback(time) {
    if (this._onshowback) {
      this._onshowback = false;

      if (this.m_n_newpanel_success.active) {
        this.m_n_newpanel_success.active = false;
      }
    }
  },
  autoShowRewardPage: function autoShowRewardPage() {
    // 上次领取的时间
    var state = this.getState();

    if (state == 1) {
      if (!window.firststart) {
        this.onBtnNewBieClick();
        window.firststart = true;
      }
    }
  },
  getState: function getState() {
    var state = 1;
    var getTime = window.INIT_GAME_SAVE_DATA.login_time; // console.log("getstate",getTime)

    if (getTime && getTime != 'null' && getTime != '') {
      var getArr = getTime.split("/");
      var temp = GetTimeString();
      var curTime = temp[0],
          curArr = temp[1]; // console.log(getArr, temp[1])

      state = this.judgeTime(getArr, curArr);
    }

    return state;
  },
  judgeTime: function judgeTime(t_a1, t_a2) {
    if (parseInt(t_a1[0]) < parseInt(t_a2[0])) return 1;
    if (parseInt(t_a1[0]) > parseInt(t_a2[0])) return -1;
    if (parseInt(t_a1[1]) < parseInt(t_a2[1])) return 1;
    if (parseInt(t_a1[1]) > parseInt(t_a2[1])) return -1;
    var res = 0;
    if (parseInt(t_a1[2]) < parseInt(t_a2[2])) res = 1;else if (parseInt(t_a1[2]) > parseInt(t_a2[2])) res = -1;
    return res;
  },
  updateData: function updateData() {
    // let state = window.INIT_GAME_SAVE_DATA.award_list % 10;
    // let tt = this.m_btn_getreward.node.getChildByName("l_newbconfirm");
    this.autoShowRewardPage();
    var state = this.getState();

    if (state == 1) {
      // this.m_btn_getreward.interactable = true;
      this.m_l_desc.string = "每天可领一次";
    } else {
      // this.m_btn_getreward.interactable = false;
      this.m_l_desc.string = "每天可领一次(已领取)";
    }

    this.m_btn_getreward.node.active = state == 1;
  },
  onBtnNewBieClick: function onBtnNewBieClick() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    this.m_n_newpanel.active = true; // let tt = this.m_btn_getreward.node.getChildByName("l_newbconfirm");

    var state = this.getState();

    if (state == 1) {
      // this.m_btn_getreward.interactable = true;
      this.m_l_desc.string = "每天可领一次";
    } else {
      // this.m_btn_getreward.interactable = false;
      this.m_l_desc.string = "每天可领一次(已领取)";
    }

    this.m_btn_getreward.node.active = state == 1;
  },
  onBackBtnClick: function onBackBtnClick() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    this.m_n_newpanel.active = false;
    this.m_n_newpanel_success.active = false;
  },
  onRewardBackBtnClick: function onRewardBackBtnClick() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    this.m_n_newpanel.active = false;
    this.m_n_newpanel_success.active = false;
  },
  onBtnGetRewardClick: function onBtnGetRewardClick() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    this.m_n_newpanel.active = false;
    this.m_n_newpanel_success.active = true;
    var temp = GetTimeString();
    var curTime = temp[0];
    this._onshowback = true;
    window.INIT_GAME_SAVE_DATA.login_time = curTime;
    window.INIT_GAME_SAVE_DATA.tool[0] += 1;
    window.INIT_GAME_SAVE_DATA.gold_num += 10;
    this.updateData();
    if (window.GAME_MENU) window.GAME_MENU.updateGold();
  },
  onShareBtnClick: function onShareBtnClick() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    var self = this;
    ShareSdk.shareAppMessage({
      title: "炸弹，金币每天领，快来领取吧",
      imageUrl: window.tempFileURL[0],
      success: function success(res) {
        // cc.director.loadScene(window.GAME_SCENE_NAME);
        self.m_n_sharenode.active = true;
      },
      fail: function fail(err) {},
      complate: function complate(msg) {}
    });
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvbmV3QmllL05ld0JpZUdpZnQuanMiXSwibmFtZXMiOlsiVXRpbHMiLCJyZXF1aXJlIiwiU2hhcmVTZGsiLCJHZXRUaW1lU3RyaW5nIiwiZGF0YSIsIkRhdGUiLCJ0aW1lIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJhcnIiLCJzcGxpdCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibV9uX25ld3BhbmVsIiwiTm9kZSIsIm1fbl9uZXdwYW5lbF9zdWNjZXNzIiwibV9idG5fZ2V0cmV3YXJkIiwiQnV0dG9uIiwibV9sX2Rlc2MiLCJMYWJlbCIsInN0YXJ0IiwiYWN0aXZlIiwiRVZFTlRfTElTVEVORVIiLCJvbiIsIndpbmRvdyIsIk9OX1NIT1dfQkFDSyIsIm9uc2hvd2JhY2siLCJ1cGRhdGVEYXRhIiwib25FbmFibGUiLCJvbkRpc2FibGUiLCJvbkRlc3Ryb3kiLCJvZmYiLCJfb25zaG93YmFjayIsImF1dG9TaG93UmV3YXJkUGFnZSIsInN0YXRlIiwiZ2V0U3RhdGUiLCJmaXJzdHN0YXJ0Iiwib25CdG5OZXdCaWVDbGljayIsImdldFRpbWUiLCJJTklUX0dBTUVfU0FWRV9EQVRBIiwibG9naW5fdGltZSIsImdldEFyciIsInRlbXAiLCJjdXJUaW1lIiwiY3VyQXJyIiwianVkZ2VUaW1lIiwidF9hMSIsInRfYTIiLCJwYXJzZUludCIsInJlcyIsInN0cmluZyIsIm5vZGUiLCJTZXRTb3VuZEVmZmVjdCIsIkJVVFRPTl9DTElDS19NVVNJQyIsIm9uQmFja0J0bkNsaWNrIiwib25SZXdhcmRCYWNrQnRuQ2xpY2siLCJvbkJ0bkdldFJld2FyZENsaWNrIiwidG9vbCIsImdvbGRfbnVtIiwiR0FNRV9NRU5VIiwidXBkYXRlR29sZCIsIm9uU2hhcmVCdG5DbGljayIsInNlbGYiLCJzaGFyZUFwcE1lc3NhZ2UiLCJ0aXRsZSIsImltYWdlVXJsIiwidGVtcEZpbGVVUkwiLCJzdWNjZXNzIiwi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Q0FBQ21DLFNBQVAsQ0FBaUJDLFVBQWpCO0FBQ1AsR0FsSkk7QUFvSkxDLEVBQUFBLGVBcEpLLDZCQW9KYTtBQUNkaEUsSUFBQUEsS0FBSyxDQUFDdUQsY0FBTixDQUFxQjVCLE1BQU0sQ0FBQzZCLGtCQUE1QixFQUFnRCxLQUFoRCxFQUF1RCxDQUF2RDtBQUNBLFFBQUlTLElBQUksR0FBRyxJQUFYO0FBQ0EvRCxJQUFBQSxRQUFRLENBQUNnRSxlQUFULENBQXlCO0FBQ3JCQyxNQUFBQSxLQUFLLEVBQUUsZ0JBRGM7QUFFckJDLE1BQUFBLFFBQVEsRUFBRXpDLE1BQU0sQ0FBQzBDLFdBQVAsQ0FBbUIsQ0FBbkIsQ0FGVztBQUdyQkMsTUFBQUEsT0FBTyxFQUFFLGlCQUFBbEIsR0FBRyxFQUFJO0FBQ1o7QUFDQWEsUUFBQUEsSUFBSSxDQUFDTSxhQUFMLENBQW1CL0MsTUFBbkIsR0FBNEIsSUFBNUI7QUFDSCxPQU5vQjtBQU9yQmdELE1BQUFBLElBQUksRUFBRSxjQUFBQyxHQUFHLEVBQUksQ0FFWixDQVRvQjtBQVVyQkMsTUFBQUEsUUFBUSxFQUFFLGtCQUFBQyxHQUFHLEVBQUksQ0FFaEI7QUFab0IsS0FBekI7QUFjSDtBQXJLSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgVXRpbHMgPSByZXF1aXJlKFwiVXRpbHNcIik7XG52YXIgU2hhcmVTZGsgPSByZXF1aXJlKFwiU2hhcmVTZGtcIik7XG52YXIgR2V0VGltZVN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZGF0YSA9IG5ldyBEYXRlKClcbiAgICB2YXIgdGltZSA9IGRhdGEuZ2V0RnVsbFllYXIoKSArIFwiL1wiICsgKGRhdGEuZ2V0TW9udGgoKSArIDEpICsgXCIvXCIgKyBkYXRhLmdldERhdGUoKTtcbiAgICAvLyB2YXIgdGltZSA9IGRhdGEudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gICAgbGV0IGFyciA9IHRpbWUuc3BsaXQoXCIvXCIpO1xuICAgIHJldHVybiBbdGltZSwgYXJyXTtcbn07XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBtX25fbmV3cGFuZWw6IGNjLk5vZGUsXG4gICAgICAgIG1fbl9uZXdwYW5lbF9zdWNjZXNzOiBjYy5Ob2RlLFxuICAgICAgICBtX2J0bl9nZXRyZXdhcmQ6IGNjLkJ1dHRvbixcbiAgICAgICAgbV9sX2Rlc2M6IGNjLkxhYmVsLFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIC8vIG9uTG9hZCAoKSB7fSxcblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLm1fbl9uZXdwYW5lbC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tX25fbmV3cGFuZWxfc3VjY2Vzcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgLy8gRVZFTlRfTElTVEVORVIub24od2luZG93LkdBTUVfU0FWRV9IQU5ETEVSLCB0aGlzLnVwZGF0ZURhdGEsIHRoaXMpO1xuICAgICAgICBFVkVOVF9MSVNURU5FUi5vbih3aW5kb3cuT05fU0hPV19CQUNLLCB0aGlzLm9uc2hvd2JhY2ssIHRoaXMpO1xuICAgICAgICB0aGlzLnVwZGF0ZURhdGEoKTtcbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG4gICAgb25FbmFibGUoKSB7XG5cbiAgICB9LFxuXG4gICAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICB9LFxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICAvLyBFVkVOVF9MSVNURU5FUi5vZmYod2luZG93LkdBTUVfU0FWRV9IQU5ETEVSLCB0aGlzKTtcbiAgICAgICAgRVZFTlRfTElTVEVORVIub2ZmKHdpbmRvdy5PTl9TSE9XX0JBQ0ssIHRoaXMpO1xuICAgIH0sXG5cbiAgICBvbnNob3diYWNrKHRpbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX29uc2hvd2JhY2spIHtcbiAgICAgICAgICAgIHRoaXMuX29uc2hvd2JhY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0aGlzLm1fbl9uZXdwYW5lbF9zdWNjZXNzLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubV9uX25ld3BhbmVsX3N1Y2Nlc3MuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXV0b1Nob3dSZXdhcmRQYWdlKCkge1xuICAgICAgICAvLyDkuIrmrKHpooblj5bnmoTml7bpl7RcbiAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpO1xuICAgICAgICBpZiAoc3RhdGUgPT0gMSkge1xuICAgICAgICAgICAgaWYgKCF3aW5kb3cuZmlyc3RzdGFydCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25CdG5OZXdCaWVDbGljaygpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5maXJzdHN0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRTdGF0ZSgpIHtcbiAgICAgICAgdmFyIHN0YXRlID0gMTtcblxuICAgICAgICB2YXIgZ2V0VGltZSA9IHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLmxvZ2luX3RpbWU7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZ2V0c3RhdGVcIixnZXRUaW1lKVxuICAgICAgICBpZiAoZ2V0VGltZSAmJiBnZXRUaW1lICE9ICdudWxsJyAmJiBnZXRUaW1lICE9ICcnKSB7XG4gICAgICAgICAgICB2YXIgZ2V0QXJyID0gZ2V0VGltZS5zcGxpdChcIi9cIik7XG4gICAgICAgICAgICB2YXIgdGVtcCA9IEdldFRpbWVTdHJpbmcoKTtcbiAgICAgICAgICAgIHZhciBjdXJUaW1lID0gdGVtcFswXSwgY3VyQXJyID0gdGVtcFsxXVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ2V0QXJyLCB0ZW1wWzFdKVxuICAgICAgICAgICAgc3RhdGUgPSB0aGlzLmp1ZGdlVGltZShnZXRBcnIsIGN1ckFycilcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfSxcblxuICAgIGp1ZGdlVGltZTogZnVuY3Rpb24gKHRfYTEsIHRfYTIpIHtcbiAgICAgICAgaWYgKHBhcnNlSW50KHRfYTFbMF0pIDwgcGFyc2VJbnQodF9hMlswXSkpXG4gICAgICAgICAgICByZXR1cm4gMVxuICAgICAgICBpZiAocGFyc2VJbnQodF9hMVswXSkgPiBwYXJzZUludCh0X2EyWzBdKSlcbiAgICAgICAgICAgIHJldHVybiAtMVxuICAgICAgICBpZiAocGFyc2VJbnQodF9hMVsxXSkgPCBwYXJzZUludCh0X2EyWzFdKSlcbiAgICAgICAgICAgIHJldHVybiAxXG4gICAgICAgIGlmIChwYXJzZUludCh0X2ExWzFdKSA+IHBhcnNlSW50KHRfYTJbMV0pKVxuICAgICAgICAgICAgcmV0dXJuIC0xXG4gICAgICAgIGxldCByZXMgPSAwXG4gICAgICAgIGlmIChwYXJzZUludCh0X2ExWzJdKSA8IHBhcnNlSW50KHRfYTJbMl0pKVxuICAgICAgICAgICAgcmVzID0gMVxuICAgICAgICBlbHNlIGlmIChwYXJzZUludCh0X2ExWzJdKSA+IHBhcnNlSW50KHRfYTJbMl0pKVxuICAgICAgICAgICAgcmVzID0gLTFcbiAgICAgICAgcmV0dXJuIHJlc1xuICAgIH0sXG5cbiAgICB1cGRhdGVEYXRhKCkge1xuICAgICAgICAvLyBsZXQgc3RhdGUgPSB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS5hd2FyZF9saXN0ICUgMTA7XG4gICAgICAgIC8vIGxldCB0dCA9IHRoaXMubV9idG5fZ2V0cmV3YXJkLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsX25ld2Jjb25maXJtXCIpO1xuICAgICAgICB0aGlzLmF1dG9TaG93UmV3YXJkUGFnZSgpO1xuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCk7XG4gICAgICAgIGlmIChzdGF0ZSA9PSAxKSB7XG4gICAgICAgICAgICAvLyB0aGlzLm1fYnRuX2dldHJld2FyZC5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tX2xfZGVzYy5zdHJpbmcgPSBcIuavj+WkqeWPr+mihuS4gOasoVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhpcy5tX2J0bl9nZXRyZXdhcmQuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm1fbF9kZXNjLnN0cmluZyA9IFwi5q+P5aSp5Y+v6aKG5LiA5qyhKOW3sumihuWPlilcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1fYnRuX2dldHJld2FyZC5ub2RlLmFjdGl2ZSA9IChzdGF0ZSA9PSAxKTtcbiAgICB9LFxuXG4gICAgb25CdG5OZXdCaWVDbGljaygpIHtcbiAgICAgICAgVXRpbHMuU2V0U291bmRFZmZlY3Qod2luZG93LkJVVFRPTl9DTElDS19NVVNJQywgZmFsc2UsIDEpO1xuICAgICAgICB0aGlzLm1fbl9uZXdwYW5lbC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAvLyBsZXQgdHQgPSB0aGlzLm1fYnRuX2dldHJld2FyZC5ub2RlLmdldENoaWxkQnlOYW1lKFwibF9uZXdiY29uZmlybVwiKTtcbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpO1xuICAgICAgICBpZiAoc3RhdGUgPT0gMSkge1xuICAgICAgICAgICAgLy8gdGhpcy5tX2J0bl9nZXRyZXdhcmQuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubV9sX2Rlc2Muc3RyaW5nID0gXCLmr4/lpKnlj6/poobkuIDmrKFcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoaXMubV9idG5fZ2V0cmV3YXJkLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5tX2xfZGVzYy5zdHJpbmcgPSBcIuavj+WkqeWPr+mihuS4gOasoSjlt7Lpooblj5YpXCI7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1fYnRuX2dldHJld2FyZC5ub2RlLmFjdGl2ZSA9IChzdGF0ZSA9PSAxKTtcbiAgICB9LFxuXG4gICAgb25CYWNrQnRuQ2xpY2soKSB7XG4gICAgICAgIFV0aWxzLlNldFNvdW5kRWZmZWN0KHdpbmRvdy5CVVRUT05fQ0xJQ0tfTVVTSUMsIGZhbHNlLCAxKTtcbiAgICAgICAgdGhpcy5tX25fbmV3cGFuZWwuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubV9uX25ld3BhbmVsX3N1Y2Nlc3MuYWN0aXZlID0gZmFsc2U7XG4gICAgfSxcblxuICAgIG9uUmV3YXJkQmFja0J0bkNsaWNrKCkge1xuICAgICAgICBVdGlscy5TZXRTb3VuZEVmZmVjdCh3aW5kb3cuQlVUVE9OX0NMSUNLX01VU0lDLCBmYWxzZSwgMSk7XG4gICAgICAgIHRoaXMubV9uX25ld3BhbmVsLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1fbl9uZXdwYW5lbF9zdWNjZXNzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBvbkJ0bkdldFJld2FyZENsaWNrKCkge1xuICAgICAgICBVdGlscy5TZXRTb3VuZEVmZmVjdCh3aW5kb3cuQlVUVE9OX0NMSUNLX01VU0lDLCBmYWxzZSwgMSk7XG4gICAgICAgIHRoaXMubV9uX25ld3BhbmVsLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1fbl9uZXdwYW5lbF9zdWNjZXNzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHZhciB0ZW1wID0gR2V0VGltZVN0cmluZygpO1xuICAgICAgICB2YXIgY3VyVGltZSA9IHRlbXBbMF07XG4gICAgICAgIHRoaXMuX29uc2hvd2JhY2sgPSB0cnVlO1xuICAgICAgICB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS5sb2dpbl90aW1lID0gY3VyVGltZTtcblxuICAgICAgICB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS50b29sWzBdICs9IDE7XG4gICAgICAgIHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLmdvbGRfbnVtICs9IDEwO1xuXG4gICAgICAgIHRoaXMudXBkYXRlRGF0YSgpO1xuICAgICAgICBpZiAod2luZG93LkdBTUVfTUVOVSlcbiAgICAgICAgICAgIHdpbmRvdy5HQU1FX01FTlUudXBkYXRlR29sZCgpO1xuICAgIH0sXG5cbiAgICBvblNoYXJlQnRuQ2xpY2soKSB7XG4gICAgICAgIFV0aWxzLlNldFNvdW5kRWZmZWN0KHdpbmRvdy5CVVRUT05fQ0xJQ0tfTVVTSUMsIGZhbHNlLCAxKTtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBTaGFyZVNkay5zaGFyZUFwcE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdGl0bGU6IFwi54K45by577yM6YeR5biB5q+P5aSp6aKG77yM5b+r5p2l6aKG5Y+W5ZCnXCIsXG4gICAgICAgICAgICBpbWFnZVVybDogd2luZG93LnRlbXBGaWxlVVJMWzBdLFxuICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjYy5kaXJlY3Rvci5sb2FkU2NlbmUod2luZG93LkdBTUVfU0NFTkVfTkFNRSk7XG4gICAgICAgICAgICAgICAgc2VsZi5tX25fc2hhcmVub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbXBsYXRlOiBtc2cgPT4ge1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9LFxufSk7XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/migration/use_v2.0.x_cc.Toggle_event.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8db9dNksYFKdZ2A52/Jnfo+', 'use_v2.0.x_cc.Toggle_event');
// migration/use_v2.0.x_cc.Toggle_event.js

"use strict";

/*
 * This script is automatically generated by Cocos Creator and is only compatible with projects prior to v2.1.0.
 * You do not need to manually add this script in any other project.
 * If you don't use cc.Toggle in your project, you can delete this script directly.
 * If your project is hosted in VCS such as git, submit this script together.
 *
 * 此脚本由 Cocos Creator 自动生成，仅用于兼容 v2.1.0 之前版本的工程，
 * 你无需在任何其它项目中手动添加此脚本。
 * 如果你的项目中没用到 Toggle，可直接删除该脚本。
 * 如果你的项目有托管于 git 等版本库，请将此脚本一并上传。
 */
if (cc.Toggle) {
  // Whether the 'toggle' and 'checkEvents' events are fired when 'toggle.check() / toggle.uncheck()' is called in the code
  // 在代码中调用 'toggle.check() / toggle.uncheck()' 时是否触发 'toggle' 与 'checkEvents' 事件
  cc.Toggle._triggerEventInScript_check = true;
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9taWdyYXRpb24vdXNlX3YyLjAueF9jYy5Ub2dnbGVfZXZlbnQuanMiXSwibmFtZXMiOlsiY2MiLCJUb2dnbGUiLCJfdHJpZ2dlckV2ZW50SW5TY3JpcHRfY2hlY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7O0FBWUEsSUFBSUEsRUFBRSxDQUFDQyxNQUFQLEVBQWU7QUFDWDtBQUNBO0FBQ0FELEVBQUFBLEVBQUUsQ0FBQ0MsTUFBSCxDQUFVQywyQkFBVixHQUF3QyxJQUF4QztBQUNIIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBUaGlzIHNjcmlwdCBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBDb2NvcyBDcmVhdG9yIGFuZCBpcyBvbmx5IGNvbXBhdGlibGUgd2l0aCBwcm9qZWN0cyBwcmlvciB0byB2Mi4xLjAuXHJcbiAqIFlvdSBkbyBub3QgbmVlZCB0byBtYW51YWxseSBhZGQgdGhpcyBzY3JpcHQgaW4gYW55IG90aGVyIHByb2plY3QuXHJcbiAqIElmIHlvdSBkb24ndCB1c2UgY2MuVG9nZ2xlIGluIHlvdXIgcHJvamVjdCwgeW91IGNhbiBkZWxldGUgdGhpcyBzY3JpcHQgZGlyZWN0bHkuXHJcbiAqIElmIHlvdXIgcHJvamVjdCBpcyBob3N0ZWQgaW4gVkNTIHN1Y2ggYXMgZ2l0LCBzdWJtaXQgdGhpcyBzY3JpcHQgdG9nZXRoZXIuXHJcbiAqXHJcbiAqIOatpOiEmuacrOeUsSBDb2NvcyBDcmVhdG9yIOiHquWKqOeUn+aIkO+8jOS7heeUqOS6juWFvOWuuSB2Mi4xLjAg5LmL5YmN54mI5pys55qE5bel56iL77yMXHJcbiAqIOS9oOaXoOmcgOWcqOS7u+S9leWFtuWug+mhueebruS4reaJi+WKqOa3u+WKoOatpOiEmuacrOOAglxyXG4gKiDlpoLmnpzkvaDnmoTpobnnm67kuK3msqHnlKjliLAgVG9nZ2xl77yM5Y+v55u05o6l5Yig6Zmk6K+l6ISa5pys44CCXHJcbiAqIOWmguaenOS9oOeahOmhueebruacieaJmOeuoeS6jiBnaXQg562J54mI5pys5bqT77yM6K+35bCG5q2k6ISa5pys5LiA5bm25LiK5Lyg44CCXHJcbiAqL1xyXG5cclxuaWYgKGNjLlRvZ2dsZSkge1xyXG4gICAgLy8gV2hldGhlciB0aGUgJ3RvZ2dsZScgYW5kICdjaGVja0V2ZW50cycgZXZlbnRzIGFyZSBmaXJlZCB3aGVuICd0b2dnbGUuY2hlY2soKSAvIHRvZ2dsZS51bmNoZWNrKCknIGlzIGNhbGxlZCBpbiB0aGUgY29kZVxyXG4gICAgLy8g5Zyo5Luj56CB5Lit6LCD55SoICd0b2dnbGUuY2hlY2soKSAvIHRvZ2dsZS51bmNoZWNrKCknIOaXtuaYr+WQpuinpuWPkSAndG9nZ2xlJyDkuI4gJ2NoZWNrRXZlbnRzJyDkuovku7ZcclxuICAgIGNjLlRvZ2dsZS5fdHJpZ2dlckV2ZW50SW5TY3JpcHRfY2hlY2sgPSB0cnVlO1xyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/GameEndRank.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '167feF+j91EO55DYgd2LPJO', 'GameEndRank');
// Script/common/GameEndRank.js

"use strict";

var RankList = require('RankList');

cc.Class({
  "extends": cc.Component,
  properties: {
    display: cc.Sprite
  },
  start: function start() {
    this.tex = new cc.Texture2D(); // var masScoreStr = window.INIT_GAME_SAVE_DATA.top_score;
    // RankList.setScore(masScoreStr,
    //     (info) => {
    //         console.log("保存游戏信息成功！", info);
    //     },
    //     () => {
    //         console.log("保存游戏信息失败！");
    //     },
    //     (info) => {
    //         console.log("保存游戏信息已完成！", info);
    //     }
    // );
  },
  _updaetSubDomainCanvas: function _updaetSubDomainCanvas() {
    if (!this.tex) {
      return;
    }

    this.tex.initWithElement(sharedCanvas);
    this.tex.handleLoadedTexture();
    this.display.spriteFrame = new cc.SpriteFrame(this.tex);
  },
  update: function update() {
    if (typeof wx != "undefined") this._updaetSubDomainCanvas();
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29tbW9uL0dhbWVFbmRSYW5rLmpzIl0sIm5hbWVzIjpbIlJhbmtMaXN0IiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiZGlzcGxheSIsIlNwcml0ZSIsInN0YXJ0IiwidGV4IiwiVGV4dHVyZTJEIiwiX3VwZGFldFN1YkRvbWFpbkNhbnZhcyIsImluaXRXaXRoRWxlbWVudCIsInNoYXJlZENhbnZhcyIsImhhbmRsZUxvYWRlZFRleHR1cmUiLCJzcHJpdGVGcmFtZSIsIlNwcml0ZUZyYW1lIiwidXBkYXRlIiwid3giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsUUFBUSxHQUFHQyxPQUFPLENBQUMsVUFBRCxDQUF0Qjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLE9BQU8sRUFBRUosRUFBRSxDQUFDSztBQURKLEdBSFA7QUFPTEMsRUFBQUEsS0FQSyxtQkFPRztBQUVKLFNBQUtDLEdBQUwsR0FBVyxJQUFJUCxFQUFFLENBQUNRLFNBQVAsRUFBWCxDQUZJLENBR0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0gsR0F0Qkk7QUF3QkxDLEVBQUFBLHNCQXhCSyxvQ0F3Qm9CO0FBQ3JCLFFBQUksQ0FBQyxLQUFLRixHQUFWLEVBQWU7QUFDWDtBQUNIOztBQUNELFNBQUtBLEdBQUwsQ0FBU0csZUFBVCxDQUF5QkMsWUFBekI7QUFDQSxTQUFLSixHQUFMLENBQVNLLG1CQUFUO0FBQ0EsU0FBS1IsT0FBTCxDQUFhUyxXQUFiLEdBQTJCLElBQUliLEVBQUUsQ0FBQ2MsV0FBUCxDQUFtQixLQUFLUCxHQUF4QixDQUEzQjtBQUNILEdBL0JJO0FBaUNMUSxFQUFBQSxNQWpDSyxvQkFpQ0k7QUFDTCxRQUFJLE9BQVFDLEVBQVIsSUFBZSxXQUFuQixFQUNJLEtBQUtQLHNCQUFMO0FBRVA7QUFyQ0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFJhbmtMaXN0ID0gcmVxdWlyZSgnUmFua0xpc3QnKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGRpc3BsYXk6IGNjLlNwcml0ZSxcbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICAgICAgdGhpcy50ZXggPSBuZXcgY2MuVGV4dHVyZTJEKCk7XG4gICAgICAgIC8vIHZhciBtYXNTY29yZVN0ciA9IHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLnRvcF9zY29yZTtcbiAgICAgICAgLy8gUmFua0xpc3Quc2V0U2NvcmUobWFzU2NvcmVTdHIsXG4gICAgICAgIC8vICAgICAoaW5mbykgPT4ge1xuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwi5L+d5a2Y5ri45oiP5L+h5oGv5oiQ5Yqf77yBXCIsIGluZm8pO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgICgpID0+IHtcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIuS/neWtmOa4uOaIj+S/oeaBr+Wksei0pe+8gVwiKTtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICAoaW5mbykgPT4ge1xuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwi5L+d5a2Y5ri45oiP5L+h5oGv5bey5a6M5oiQ77yBXCIsIGluZm8pO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyApO1xuICAgIH0sXG5cbiAgICBfdXBkYWV0U3ViRG9tYWluQ2FudmFzKCkge1xuICAgICAgICBpZiAoIXRoaXMudGV4KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50ZXguaW5pdFdpdGhFbGVtZW50KHNoYXJlZENhbnZhcyk7XG4gICAgICAgIHRoaXMudGV4LmhhbmRsZUxvYWRlZFRleHR1cmUoKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5LnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRoaXMudGV4KTtcbiAgICB9LFxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgICAgIHRoaXMuX3VwZGFldFN1YkRvbWFpbkNhbnZhcygpO1xuXG4gICAgfVxuXG59KTtcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/GuideManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '85665NaV6lFCY6zVqTLmHdP', 'GuideManager');
// Script/common/GuideManager.js

"use strict";

var Utils = require("Utils");

cc.Class({
  "extends": cc.Component,
  properties: {
    m_n_mask: cc.Node,
    m_n_guide_circle: cc.Node,
    m_n_bubble1: cc.Node,
    m_n_bubble2: cc.Node,
    m_n_confirm: cc.Node,
    m_sp_maskbg: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {
    this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
  },
  showGuide: function showGuide(tag, index) {
    // console.log("window.GUIDE_LEVEL", window.GUIDE_LEVEL);
    if (window.GUIDE_LEVEL >= tag) return; // console.log('shoGuide', tag, index);

    this.m_cur_tag = tag;
    this.m_cur_index = index;

    if (window.CONFIG_GUIDE[tag][index]) {
      this._guide_data = window.CONFIG_GUIDE[tag][index];
      this.setGuideInfo(this._guide_data);
    } else {
      this.node.active = false;
      window.GUIDE_LEVEL += 1;
      cc.sys.localStorage.setItem('guideinfo', '' + window.GUIDE_LEVEL);
      return;
    }

    if (!this.node.active) this.node.active = true;
  },
  touchStart: function touchStart(event) {
    if (this._guide_data.type == 2) {
      event.stopPropagation();
      return;
    } else {
      if (window.GAME_CONTROL) {
        var vec = event.touch.getLocation();
        var index = window.GAME_CONTROL.getTouchIndex(vec);

        if (index != this._guide_data.target) {
          this._confirm = false;
          event.stopPropagation();
          return;
        } else {
          this._confirm = true;
        }
      } else {
        this.node.active = false;
      }
    }
  },
  touchEnd: function touchEnd(event) {
    if (this._guide_data.type != 2) {
      if (this._confirm) {
        this.showNextGuide();
      }
    }

    this._confirm = false;
  },
  showNextGuide: function showNextGuide() {
    var _this = this;

    this._guide_data.target = -2;
    this._guide_data.type = -1;
    setTimeout(function () {
      _this.m_cur_index += 1;

      _this.showGuide(_this.m_cur_tag, _this.m_cur_index);
    }, window.CONFIG_GUIDE[this.m_cur_tag][this.m_cur_index].delaytime);
  },
  onConfirmClick: function onConfirmClick() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    this.showNextGuide();
  },
  setGuideInfo: function setGuideInfo(data) {
    this.m_n_bubble1.active = data.dir == 1;
    this.m_n_bubble2.active = data.dir == 2;
    var bubblenode = data.dir == 1 ? this.m_n_bubble1 : this.m_n_bubble2;
    var descnode = cc.find("l_guide_desc", bubblenode);
    var dirpos = data.dir == 1 ? -1 : 1;
    descnode.width = data.descsize[0];
    descnode.height = data.descsize[1];
    descnode.getComponent(cc.Label).string = data.desc;
    bubblenode.width = data.descsize[0] + 100;
    bubblenode.height = data.descsize[1] + 50;
    var monnode = cc.find("sp_mon", bubblenode);
    monnode.y = bubblenode.height / 2;

    if (typeof data.target === 'string') {
      //目标点
      var node = cc.find(data.target);
      this.m_n_mask.position = node.position;
      this.m_n_mask.width = node.width + 10;
      this.m_n_mask.height = node.height + 10;
      bubblenode.x = this.m_n_mask.x + dirpos * this.m_n_mask.width / 2;
      bubblenode.y = this.m_n_mask.y + this.m_n_mask.height / 2 + data.offsetY;
      this.m_n_guide_circle.width = this.m_n_mask.width + 30;
      this.m_n_guide_circle.height = this.m_n_mask.height + 30;
      this.m_n_guide_circle.getComponent(cc.Animation).play();
      this.m_n_guide_circle.position = this.m_n_mask.position;
      this.m_sp_maskbg.x = -this.m_n_mask.x;
      this.m_sp_maskbg.y = -this.m_n_mask.y;
    } else if (typeof data.target === 'number') {
      if (data.target == -1) {
        this.m_n_mask.width = 0;
        this.m_n_mask.height = 0;
        this.m_n_guide_circle.width = 0;
        bubblenode.y = 0;
        bubblenode.x = 0;
      } else {
        if (window.GAME_CONTROL) {
          var _node = window.GAME_CONTROL.getTargetGridInfo(data.target);

          this.m_n_mask.position = _node.position;
          this.m_n_mask.width = _node.width + 10;
          this.m_n_mask.height = _node.height + 10;
          bubblenode.x = this.m_n_mask.x + dirpos * this.m_n_mask.width / 2;
          bubblenode.y = this.m_n_mask.y + this.m_n_mask.height / 2 + data.offsetY;
          this.m_n_guide_circle.width = this.m_n_mask.width + 30;
          this.m_n_guide_circle.height = this.m_n_mask.height + 30;
          this.m_n_guide_circle.getComponent(cc.Animation).play();
          this.m_n_guide_circle.position = this.m_n_mask.position;
          this.m_sp_maskbg.x = -this.m_n_mask.x;
          this.m_sp_maskbg.y = -this.m_n_mask.y;
        }
      }
    }

    if (data.type == 2) {
      this.m_n_confirm.active = true;
      this.m_n_confirm.x = bubblenode.x + dirpos * bubblenode.width / 2;
      this.m_n_confirm.y = bubblenode.y - 40;
    } else {
      this.m_n_confirm.active = false;
    }
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29tbW9uL0d1aWRlTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJVdGlscyIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm1fbl9tYXNrIiwiTm9kZSIsIm1fbl9ndWlkZV9jaXJjbGUiLCJtX25fYnViYmxlMSIsIm1fbl9idWJibGUyIiwibV9uX2NvbmZpcm0iLCJtX3NwX21hc2tiZyIsInN0YXJ0Iiwibm9kZSIsIm9uIiwiRXZlbnRUeXBlIiwiVE9VQ0hfU1RBUlQiLCJ0b3VjaFN0YXJ0IiwiVE9VQ0hfRU5EIiwidG91Y2hFbmQiLCJzaG93R3VpZGUiLCJ0YWciLCJpbmRleCIsIndpbmRvdyIsIkdVSURFX0xFVkVMIiwibV9jdXJfdGFnIiwibV9jdXJfaW5kZXgiLCJDT05GSUdfR1VJREUiLCJfZ3VpZGVfZGF0YSIsInNldEd1aWRlSW5mbyIsImFjdGl2ZSIsInN5cyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJldmVudCIsInR5cGUiLCJzdG9wUHJvcGFnYXRpb24iLCJHQU1FX0NPTlRST0wiLCJ2ZWMiLCJ0b3VjaCIsImdldExvY2F0aW9uIiwiZ2V0VG91Y2hJbmRleCIsInRhcmdldCIsIl9jb25maXJtIiwic2hvd05leHRHdWlkZSIsInNldFRpbWVvdXQiLCJkZWxheXRpbWUiLCJvbkNvbmZpcm1DbGljayIsIlNldFNvdW5kRWZmZWN0IiwiQlVUVE9OX0NMSUNLX01VU0lDIiwiZGF0YSIsImRpciIsImJ1YmJsZW5vZGUiLCJkZXNjbm9kZSIsImZpbmQiLCJkaXJwb3MiLCJ3aWR0aCIsImRlc2NzaXplIiwiaGVpZ2h0IiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJzdHJpbmciLCJkZXNjIiwibW9ubm9kZSIsInkiLCJwb3NpdGlvbiIsIngiLCJvZmZzZXRZIiwiQW5pbWF0aW9uIiwicGxheSIsImdldFRhcmdldEdyaWRJbmZvIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztB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RSxTQUF0QyxFQUFpREMsSUFBakQ7QUFDQSxlQUFLOUQsZ0JBQUwsQ0FBc0IwRCxRQUF0QixHQUFpQyxLQUFLNUQsUUFBTCxDQUFjNEQsUUFBL0M7QUFDQSxlQUFLdEQsV0FBTCxDQUFpQnVELENBQWpCLEdBQXFCLENBQUMsS0FBSzdELFFBQUwsQ0FBYzZELENBQXBDO0FBQ0EsZUFBS3ZELFdBQUwsQ0FBaUJxRCxDQUFqQixHQUFxQixDQUFDLEtBQUszRCxRQUFMLENBQWMyRCxDQUFwQztBQUNIO0FBQ0o7QUFDSjs7QUFDRCxRQUFJZCxJQUFJLENBQUNmLElBQUwsSUFBYSxDQUFqQixFQUFvQjtBQUNoQixXQUFLekIsV0FBTCxDQUFpQm9CLE1BQWpCLEdBQTBCLElBQTFCO0FBQ0EsV0FBS3BCLFdBQUwsQ0FBaUJ3RCxDQUFqQixHQUFxQmQsVUFBVSxDQUFDYyxDQUFYLEdBQWVYLE1BQU0sR0FBR0gsVUFBVSxDQUFDSSxLQUFwQixHQUE0QixDQUFoRTtBQUNBLFdBQUs5QyxXQUFMLENBQWlCc0QsQ0FBakIsR0FBcUJaLFVBQVUsQ0FBQ1ksQ0FBWCxHQUFlLEVBQXBDO0FBQ0gsS0FKRCxNQUlPO0FBQ0gsV0FBS3RELFdBQUwsQ0FBaUJvQixNQUFqQixHQUEwQixLQUExQjtBQUNIO0FBQ0osR0E1SUksQ0E2SUw7O0FBN0lLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBVdGlscyA9IHJlcXVpcmUoXCJVdGlsc1wiKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG1fbl9tYXNrOiBjYy5Ob2RlLFxuICAgICAgICBtX25fZ3VpZGVfY2lyY2xlOiBjYy5Ob2RlLFxuICAgICAgICBtX25fYnViYmxlMTogY2MuTm9kZSxcbiAgICAgICAgbV9uX2J1YmJsZTI6IGNjLk5vZGUsXG4gICAgICAgIG1fbl9jb25maXJtOiBjYy5Ob2RlLFxuICAgICAgICBtX3NwX21hc2tiZzogY2MuTm9kZSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLnRvdWNoU3RhcnQsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLnRvdWNoRW5kLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgc2hvd0d1aWRlKHRhZywgaW5kZXgpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJ3aW5kb3cuR1VJREVfTEVWRUxcIiwgd2luZG93LkdVSURFX0xFVkVMKTtcbiAgICAgICAgaWYgKHdpbmRvdy5HVUlERV9MRVZFTCA+PSB0YWcpIHJldHVybjtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3Nob0d1aWRlJywgdGFnLCBpbmRleCk7XG4gICAgICAgIHRoaXMubV9jdXJfdGFnID0gdGFnO1xuICAgICAgICB0aGlzLm1fY3VyX2luZGV4ID0gaW5kZXg7XG4gICAgICAgIGlmICh3aW5kb3cuQ09ORklHX0dVSURFW3RhZ11baW5kZXhdKSB7XG4gICAgICAgICAgICB0aGlzLl9ndWlkZV9kYXRhID0gd2luZG93LkNPTkZJR19HVUlERVt0YWddW2luZGV4XTtcbiAgICAgICAgICAgIHRoaXMuc2V0R3VpZGVJbmZvKHRoaXMuX2d1aWRlX2RhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgd2luZG93LkdVSURFX0xFVkVMICs9IDE7XG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2d1aWRlaW5mbycsICcnICsgd2luZG93LkdVSURFX0xFVkVMKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMubm9kZS5hY3RpdmUpIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgIH0sXG5cbiAgICB0b3VjaFN0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLl9ndWlkZV9kYXRhLnR5cGUgPT0gMikge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAod2luZG93LkdBTUVfQ09OVFJPTCkge1xuICAgICAgICAgICAgICAgIGxldCB2ZWMgPSBldmVudC50b3VjaC5nZXRMb2NhdGlvbigpO1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHdpbmRvdy5HQU1FX0NPTlRST0wuZ2V0VG91Y2hJbmRleCh2ZWMpO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPSB0aGlzLl9ndWlkZV9kYXRhLnRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25maXJtID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29uZmlybSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdG91Y2hFbmQoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2d1aWRlX2RhdGEudHlwZSAhPSAyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY29uZmlybSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd05leHRHdWlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NvbmZpcm0gPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2hvd05leHRHdWlkZSgpIHtcbiAgICAgICAgdGhpcy5fZ3VpZGVfZGF0YS50YXJnZXQgPSAtMjtcbiAgICAgICAgdGhpcy5fZ3VpZGVfZGF0YS50eXBlID0gLTE7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tX2N1cl9pbmRleCArPSAxO1xuICAgICAgICAgICAgdGhpcy5zaG93R3VpZGUodGhpcy5tX2N1cl90YWcsIHRoaXMubV9jdXJfaW5kZXgpO1xuICAgICAgICB9LCB3aW5kb3cuQ09ORklHX0dVSURFW3RoaXMubV9jdXJfdGFnXVt0aGlzLm1fY3VyX2luZGV4XS5kZWxheXRpbWUpO1xuICAgIH0sXG5cbiAgICBvbkNvbmZpcm1DbGljaygpIHtcbiAgICAgICAgVXRpbHMuU2V0U291bmRFZmZlY3Qod2luZG93LkJVVFRPTl9DTElDS19NVVNJQywgZmFsc2UsIDEpO1xuICAgICAgICB0aGlzLnNob3dOZXh0R3VpZGUoKTtcbiAgICB9LFxuXG4gICAgc2V0R3VpZGVJbmZvKGRhdGEpIHtcbiAgICAgICAgdGhpcy5tX25fYnViYmxlMS5hY3RpdmUgPSAoZGF0YS5kaXIgPT0gMSk7XG4gICAgICAgIHRoaXMubV9uX2J1YmJsZTIuYWN0aXZlID0gKGRhdGEuZGlyID09IDIpO1xuICAgICAgICBsZXQgYnViYmxlbm9kZSA9IGRhdGEuZGlyID09IDEgPyB0aGlzLm1fbl9idWJibGUxIDogdGhpcy5tX25fYnViYmxlMjtcbiAgICAgICAgbGV0IGRlc2Nub2RlID0gY2MuZmluZChcImxfZ3VpZGVfZGVzY1wiLCBidWJibGVub2RlKTtcbiAgICAgICAgbGV0IGRpcnBvcyA9IGRhdGEuZGlyID09IDEgPyAtMSA6IDE7XG4gICAgICAgIGRlc2Nub2RlLndpZHRoID0gZGF0YS5kZXNjc2l6ZVswXTtcbiAgICAgICAgZGVzY25vZGUuaGVpZ2h0ID0gZGF0YS5kZXNjc2l6ZVsxXTtcbiAgICAgICAgZGVzY25vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhLmRlc2M7XG4gICAgICAgIGJ1YmJsZW5vZGUud2lkdGggPSBkYXRhLmRlc2NzaXplWzBdICsgMTAwO1xuICAgICAgICBidWJibGVub2RlLmhlaWdodCA9IGRhdGEuZGVzY3NpemVbMV0gKyA1MDtcbiAgICAgICAgbGV0IG1vbm5vZGUgPSBjYy5maW5kKFwic3BfbW9uXCIsIGJ1YmJsZW5vZGUpO1xuICAgICAgICBtb25ub2RlLnkgPSBidWJibGVub2RlLmhlaWdodCAvIDI7XG4gICAgICAgIGlmICh0eXBlb2YgKGRhdGEudGFyZ2V0KSA9PT0gJ3N0cmluZycpIHsvL+ebruagh+eCuVxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5maW5kKGRhdGEudGFyZ2V0KTtcbiAgICAgICAgICAgIHRoaXMubV9uX21hc2sucG9zaXRpb24gPSBub2RlLnBvc2l0aW9uO1xuICAgICAgICAgICAgdGhpcy5tX25fbWFzay53aWR0aCA9IG5vZGUud2lkdGggKyAxMDtcbiAgICAgICAgICAgIHRoaXMubV9uX21hc2suaGVpZ2h0ID0gbm9kZS5oZWlnaHQgKyAxMDtcbiAgICAgICAgICAgIGJ1YmJsZW5vZGUueCA9IHRoaXMubV9uX21hc2sueCArIGRpcnBvcyAqIHRoaXMubV9uX21hc2sud2lkdGggLyAyO1xuICAgICAgICAgICAgYnViYmxlbm9kZS55ID0gdGhpcy5tX25fbWFzay55ICsgdGhpcy5tX25fbWFzay5oZWlnaHQgLyAyICsgZGF0YS5vZmZzZXRZO1xuICAgICAgICAgICAgdGhpcy5tX25fZ3VpZGVfY2lyY2xlLndpZHRoID0gdGhpcy5tX25fbWFzay53aWR0aCArIDMwO1xuICAgICAgICAgICAgdGhpcy5tX25fZ3VpZGVfY2lyY2xlLmhlaWdodCA9IHRoaXMubV9uX21hc2suaGVpZ2h0ICsgMzA7XG4gICAgICAgICAgICB0aGlzLm1fbl9ndWlkZV9jaXJjbGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xuICAgICAgICAgICAgdGhpcy5tX25fZ3VpZGVfY2lyY2xlLnBvc2l0aW9uID0gdGhpcy5tX25fbWFzay5wb3NpdGlvbjtcbiAgICAgICAgICAgIHRoaXMubV9zcF9tYXNrYmcueCA9IC10aGlzLm1fbl9tYXNrLng7XG4gICAgICAgICAgICB0aGlzLm1fc3BfbWFza2JnLnkgPSAtdGhpcy5tX25fbWFzay55O1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiAoZGF0YS50YXJnZXQpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgaWYgKGRhdGEudGFyZ2V0ID09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tX25fbWFzay53aWR0aCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5tX25fbWFzay5oZWlnaHQgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMubV9uX2d1aWRlX2NpcmNsZS53aWR0aCA9IDA7XG4gICAgICAgICAgICAgICAgYnViYmxlbm9kZS55ID0gMDtcbiAgICAgICAgICAgICAgICBidWJibGVub2RlLnggPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LkdBTUVfQ09OVFJPTCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IHdpbmRvdy5HQU1FX0NPTlRST0wuZ2V0VGFyZ2V0R3JpZEluZm8oZGF0YS50YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fbl9tYXNrLnBvc2l0aW9uID0gbm9kZS5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tX25fbWFzay53aWR0aCA9IG5vZGUud2lkdGggKyAxMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tX25fbWFzay5oZWlnaHQgPSBub2RlLmhlaWdodCArIDEwO1xuICAgICAgICAgICAgICAgICAgICBidWJibGVub2RlLnggPSB0aGlzLm1fbl9tYXNrLnggKyBkaXJwb3MgKiB0aGlzLm1fbl9tYXNrLndpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgYnViYmxlbm9kZS55ID0gdGhpcy5tX25fbWFzay55ICsgdGhpcy5tX25fbWFzay5oZWlnaHQgLyAyICsgZGF0YS5vZmZzZXRZO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fbl9ndWlkZV9jaXJjbGUud2lkdGggPSB0aGlzLm1fbl9tYXNrLndpZHRoICsgMzA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9uX2d1aWRlX2NpcmNsZS5oZWlnaHQgPSB0aGlzLm1fbl9tYXNrLmhlaWdodCArIDMwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fbl9ndWlkZV9jaXJjbGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fbl9ndWlkZV9jaXJjbGUucG9zaXRpb24gPSB0aGlzLm1fbl9tYXNrLnBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fc3BfbWFza2JnLnggPSAtdGhpcy5tX25fbWFzay54O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fc3BfbWFza2JnLnkgPSAtdGhpcy5tX25fbWFzay55O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS50eXBlID09IDIpIHtcbiAgICAgICAgICAgIHRoaXMubV9uX2NvbmZpcm0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubV9uX2NvbmZpcm0ueCA9IGJ1YmJsZW5vZGUueCArIGRpcnBvcyAqIGJ1YmJsZW5vZGUud2lkdGggLyAyO1xuICAgICAgICAgICAgdGhpcy5tX25fY29uZmlybS55ID0gYnViYmxlbm9kZS55IC0gNDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1fbl9jb25maXJtLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/PlatformCom.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '80373H/aPBOV7m+lx9Wa0iH', 'PlatformCom');
// Script/common/PlatformCom.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
// var Utils = require("Utils");
// var ShareSdk = require("ShareSdk");
cc.Class({
  "extends": cc.Component,
  properties: {// foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },
    // m_rqcode: cc.Node,
    // m_maskbg: cc.Node,
    // m_tips: cc.Node,
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.node.zindex = 100; //设置z轴的位置

    var size = cc.view.getVisibleSize(); // this.m_maskbg.width = size.width;
    // this.m_maskbg.height = size.height;

    this.m_callbackobj = null;
  },
  start: function start() {},
  onImageBtnClick: function onImageBtnClick() {
    // this.m_rqcode.active = !this.m_rqcode.active;
    wx.previewImage({
      urls: ['https://h5game.gametall.com/chatgame/cocos_games_res/images/codeImage.jpg']
    });
  },
  onSaveImageBtnClick: function onSaveImageBtnClick() {
    if (window.isWeChatPlatform) {
      var self = this;
      wx.saveImageToPhotosAlbum({
        filePath: cc.url.raw('resources/common/saveImage.d2e1c.jpg'),
        success: function success(res) {
          self.showTipsView("二维码已保存成功");
        },
        fail: function fail(res) {
          wx.openSetting({
            authSetting: 'scope.writePhotosAlbum',
            success: function success() {// console.log("======openSetting success=============");
            },
            fail: function fail() {// console.log("======openSetting fail=============");
            }
          });
        }
      });
    }
  },
  onCloseBtnClick: function onCloseBtnClick() {
    this.m_rqcode.active = false;
  },
  hideTipsView: function hideTipsView() {
    this.m_tips.getChildByName("TipsTex").getComponent(cc.Label).string = '';
    this.m_tips.active = false;
  },
  showTipsView: function showTipsView(text) {
    this.m_tips.getChildByName("TipsTex").getComponent(cc.Label).string = text;
    this.m_tips.active = true;
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29tbW9uL1BsYXRmb3JtQ29tLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwibm9kZSIsInppbmRleCIsInNpemUiLCJ2aWV3IiwiZ2V0VmlzaWJsZVNpemUiLCJtX2NhbGxiYWNrb2JqIiwic3RhcnQiLCJvbkltYWdlQnRuQ2xpY2siLCJ3eCIsInByZXZpZXdJbWFnZSIsInVybHMiLCJvblNhdmVJbWFnZUJ0bkNsaWNrIiwid2luZG93IiwiaXNXZUNoYXRQbGF0Zm9ybSIsInNlbGYiLCJzYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtIiwiZmlsZVBhdGgiLCJ1cmwiLCJyYXciLCJzdWNjZXNzIiwicmVzIiwic2hvd1RpcHNWaWV3IiwiZmFpbCIsIm9wZW5TZXR0aW5nIiwiYXV0aFNldHRpbmciLCJvbkNsb3NlQnRuQ2xpY2siLCJtX3JxY29kZSIsImFjdGl2ZSIsImhpZGVUaXBzVmlldyIsIm1fdGlwcyIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJzdHJpbmciLCJ0ZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLENBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBbEJRLEdBSFA7QUF3Qkw7QUFFQUMsRUFBQUEsTUExQkssb0JBMEJJO0FBQ0wsU0FBS0MsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLEdBQW5CLENBREssQ0FDc0I7O0FBQzNCLFFBQUlDLElBQUksR0FBR1AsRUFBRSxDQUFDUSxJQUFILENBQVFDLGNBQVIsRUFBWCxDQUZLLENBR0w7QUFDQTs7QUFDQSxTQUFLQyxhQUFMLEdBQXFCLElBQXJCO0FBQ0gsR0FoQ0k7QUFrQ0xDLEVBQUFBLEtBbENLLG1CQWtDRyxDQUVQLENBcENJO0FBc0NMQyxFQUFBQSxlQXRDSyw2QkFzQ2E7QUFDZDtBQUNBQyxJQUFBQSxFQUFFLENBQUNDLFlBQUgsQ0FBZ0I7QUFDWkMsTUFBQUEsSUFBSSxFQUFDLENBQUMsMkVBQUQ7QUFETyxLQUFoQjtBQUdILEdBM0NJO0FBNkNMQyxFQUFBQSxtQkE3Q0ssaUNBNkNpQjtBQUNsQixRQUFJQyxNQUFNLENBQUNDLGdCQUFYLEVBQTZCO0FBQ3pCLFVBQUlDLElBQUksR0FBRyxJQUFYO0FBQ0FOLE1BQUFBLEVBQUUsQ0FBQ08sc0JBQUgsQ0FBMEI7QUFDdEJDLFFBQUFBLFFBQVEsRUFBRXJCLEVBQUUsQ0FBQ3NCLEdBQUgsQ0FBT0MsR0FBUCxDQUFXLHNDQUFYLENBRFk7QUFFdEJDLFFBQUFBLE9BRnNCLG1CQUVkQyxHQUZjLEVBRVQ7QUFDVE4sVUFBQUEsSUFBSSxDQUFDTyxZQUFMLENBQWtCLFVBQWxCO0FBQ0gsU0FKcUI7QUFLdEJDLFFBQUFBLElBTHNCLGdCQUtqQkYsR0FMaUIsRUFLWjtBQUNOWixVQUFBQSxFQUFFLENBQUNlLFdBQUgsQ0FBZTtBQUNYQyxZQUFBQSxXQUFXLEVBQUUsd0JBREY7QUFFWEwsWUFBQUEsT0FGVyxxQkFFRCxDQUNOO0FBQ0gsYUFKVTtBQUtYRyxZQUFBQSxJQUxXLGtCQUtKLENBQ0g7QUFDSDtBQVBVLFdBQWY7QUFTSDtBQWZxQixPQUExQjtBQWlCSDtBQUNKLEdBbEVJO0FBb0VMRyxFQUFBQSxlQXBFSyw2QkFvRWE7QUFDZCxTQUFLQyxRQUFMLENBQWNDLE1BQWQsR0FBdUIsS0FBdkI7QUFDSCxHQXRFSTtBQXdFTEMsRUFBQUEsWUFBWSxFQUFFLHdCQUFZO0FBQ3RCLFNBQUtDLE1BQUwsQ0FBWUMsY0FBWixDQUEyQixTQUEzQixFQUFzQ0MsWUFBdEMsQ0FBbURwQyxFQUFFLENBQUNxQyxLQUF0RCxFQUE2REMsTUFBN0QsR0FBc0UsRUFBdEU7QUFDQSxTQUFLSixNQUFMLENBQVlGLE1BQVosR0FBcUIsS0FBckI7QUFDSCxHQTNFSTtBQTZFTE4sRUFBQUEsWUFBWSxFQUFFLHNCQUFVYSxJQUFWLEVBQWdCO0FBQzFCLFNBQUtMLE1BQUwsQ0FBWUMsY0FBWixDQUEyQixTQUEzQixFQUFzQ0MsWUFBdEMsQ0FBbURwQyxFQUFFLENBQUNxQyxLQUF0RCxFQUE2REMsTUFBN0QsR0FBc0VDLElBQXRFO0FBQ0EsU0FBS0wsTUFBTCxDQUFZRixNQUFaLEdBQXFCLElBQXJCO0FBQ0gsR0FoRkksQ0FrRkw7O0FBbEZLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG4vLyB2YXIgVXRpbHMgPSByZXF1aXJlKFwiVXRpbHNcIik7XG4vLyB2YXIgU2hhcmVTZGsgPSByZXF1aXJlKFwiU2hhcmVTZGtcIik7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBtX3JxY29kZTogY2MuTm9kZSxcbiAgICAgICAgLy8gbV9tYXNrYmc6IGNjLk5vZGUsXG4gICAgICAgIC8vIG1fdGlwczogY2MuTm9kZSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMubm9kZS56aW5kZXggPSAxMDA7ICAgIC8v6K6+572ueui9tOeahOS9jee9rlxuICAgICAgICB2YXIgc2l6ZSA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKVxuICAgICAgICAvLyB0aGlzLm1fbWFza2JnLndpZHRoID0gc2l6ZS53aWR0aDtcbiAgICAgICAgLy8gdGhpcy5tX21hc2tiZy5oZWlnaHQgPSBzaXplLmhlaWdodDtcbiAgICAgICAgdGhpcy5tX2NhbGxiYWNrb2JqID0gbnVsbDtcbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgb25JbWFnZUJ0bkNsaWNrKCkge1xuICAgICAgICAvLyB0aGlzLm1fcnFjb2RlLmFjdGl2ZSA9ICF0aGlzLm1fcnFjb2RlLmFjdGl2ZTtcbiAgICAgICAgd3gucHJldmlld0ltYWdlKHtcbiAgICAgICAgICAgIHVybHM6WydodHRwczovL2g1Z2FtZS5nYW1ldGFsbC5jb20vY2hhdGdhbWUvY29jb3NfZ2FtZXNfcmVzL2ltYWdlcy9jb2RlSW1hZ2UuanBnJ10sXG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIG9uU2F2ZUltYWdlQnRuQ2xpY2soKSB7XG4gICAgICAgIGlmICh3aW5kb3cuaXNXZUNoYXRQbGF0Zm9ybSkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgd3guc2F2ZUltYWdlVG9QaG90b3NBbGJ1bSh7XG4gICAgICAgICAgICAgICAgZmlsZVBhdGg6IGNjLnVybC5yYXcoJ3Jlc291cmNlcy9jb21tb24vc2F2ZUltYWdlLmQyZTFjLmpwZycpLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd1RpcHNWaWV3KFwi5LqM57u056CB5bey5L+d5a2Y5oiQ5YqfXCIpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsKHJlcykge1xuICAgICAgICAgICAgICAgICAgICB3eC5vcGVuU2V0dGluZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRoU2V0dGluZzogJ3Njb3BlLndyaXRlUGhvdG9zQWxidW0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj09PT09PW9wZW5TZXR0aW5nIHN1Y2Nlc3M9PT09PT09PT09PT09XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCI9PT09PT1vcGVuU2V0dGluZyBmYWlsPT09PT09PT09PT09PVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25DbG9zZUJ0bkNsaWNrKCkge1xuICAgICAgICB0aGlzLm1fcnFjb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBoaWRlVGlwc1ZpZXc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5tX3RpcHMuZ2V0Q2hpbGRCeU5hbWUoXCJUaXBzVGV4XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gJyc7XG4gICAgICAgIHRoaXMubV90aXBzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBzaG93VGlwc1ZpZXc6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgIHRoaXMubV90aXBzLmdldENoaWxkQnlOYW1lKFwiVGlwc1RleFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRleHQ7XG4gICAgICAgIHRoaXMubV90aXBzLmFjdGl2ZSA9IHRydWU7XG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/RankList.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0dc77eqhXNCk68n5Q8vi7mz', 'RankList');
// Script/common/RankList.js

"use strict";

module.exports = {
  /**
   * 
   * @param {int} _score 设置游戏分数
   * @param {*} success  成功回调
   * @param {*} fail     失败回调
   * @param {*} complete 完成回调
   */
  setScore: function setScore(_score, success, fail, complete) {
    if (typeof wx != "undefined") {
      // console.log("_score=",_score);
      wx.setUserCloudStorage({
        KVDataList: [{
          key: "score",
          value: _score + ""
        }],
        success: success || null,
        fail: fail || null,
        complete: complete || null
      }); // console.log("set score== end");
    }
  },

  /**
   * 显示好友排行榜
   */
  showFriendList: function showFriendList() {
    if (typeof wx != "undefined") {
      wx.postMessage({
        rankType: 1
      });
    }
  },

  /**
   * 显示群排行
   * @param {string} shareTicket 群排行分享许可证
   */
  showGroupList: function showGroupList(shareTicket) {
    if (typeof wx != "undefined") {
      wx.postMessage({
        shareTicket: shareTicket,
        rankType: 0
      });
    }
  },

  /**
   * 游戏结束排行
   */
  showGameResultList: function showGameResultList() {
    if (typeof wx != "undefined") {
      wx.postMessage({
        rankType: 2
      });
    }
  },

  /**
   * 检查是否超越好友 并显示
   * @param {int} score 当前分数
   * @param {Number} x  显示位置pos.x
   * @param {Number} y  显示位置pos.y
   */
  checkSurpassFriend: function checkSurpassFriend(score, x, y) {
    if (typeof wx != "undefined") {
      wx.postMessage({
        rankType: 3,
        score: score,
        x: x || 0,
        y: y || 0
      });
    }
  },
  checkWillSurpass: function checkWillSurpass(score, y) {
    if (typeof wx != "undefined") {
      wx.postMessage({
        rankType: 4,
        score: score,
        y: y || 500
      });
    }
  }
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29tbW9uL1JhbmtMaXN0LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJzZXRTY29yZSIsIl9zY29yZSIsInN1Y2Nlc3MiLCJmYWlsIiwiY29tcGxldGUiLCJ3eCIsInNldFVzZXJDbG91ZFN0b3JhZ2UiLCJLVkRhdGFMaXN0Iiwia2V5IiwidmFsdWUiLCJzaG93RnJpZW5kTGlzdCIsInBvc3RNZXNzYWdlIiwicmFua1R5cGUiLCJzaG93R3JvdXBMaXN0Iiwic2hhcmVUaWNrZXQiLCJzaG93R2FtZVJlc3VsdExpc3QiLCJjaGVja1N1cnBhc3NGcmllbmQiLCJzY29yZSIsIngiLCJ5IiwiY2hlY2tXaWxsU3VycGFzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBR2I7Ozs7Ozs7QUFPQUMsRUFBQUEsUUFWYSxvQkFVSkMsTUFWSSxFQVVJQyxPQVZKLEVBVWFDLElBVmIsRUFVbUJDLFFBVm5CLEVBVTZCO0FBQ3RDLFFBQUksT0FBUUMsRUFBUixJQUFlLFdBQW5CLEVBQWdDO0FBQzVCO0FBQ0FBLE1BQUFBLEVBQUUsQ0FBQ0MsbUJBQUgsQ0FBdUI7QUFDbkJDLFFBQUFBLFVBQVUsRUFBRSxDQUFDO0FBQUVDLFVBQUFBLEdBQUcsRUFBRSxPQUFQO0FBQWdCQyxVQUFBQSxLQUFLLEVBQUVSLE1BQU0sR0FBRztBQUFoQyxTQUFELENBRE87QUFFbkJDLFFBQUFBLE9BQU8sRUFBRUEsT0FBTyxJQUFJLElBRkQ7QUFHbkJDLFFBQUFBLElBQUksRUFBRUEsSUFBSSxJQUFJLElBSEs7QUFJbkJDLFFBQUFBLFFBQVEsRUFBRUEsUUFBUSxJQUFJO0FBSkgsT0FBdkIsRUFGNEIsQ0FRNUI7QUFDSDtBQUNKLEdBckJZOztBQXVCYjs7O0FBR0FNLEVBQUFBLGNBMUJhLDRCQTBCSTtBQUNiLFFBQUksT0FBUUwsRUFBUixJQUFlLFdBQW5CLEVBQWdDO0FBQzVCQSxNQUFBQSxFQUFFLENBQUNNLFdBQUgsQ0FBZTtBQUNYQyxRQUFBQSxRQUFRLEVBQUU7QUFEQyxPQUFmO0FBR0g7QUFDSixHQWhDWTs7QUFrQ2I7Ozs7QUFJQUMsRUFBQUEsYUF0Q2EseUJBc0NDQyxXQXRDRCxFQXNDYztBQUN2QixRQUFJLE9BQVFULEVBQVIsSUFBZSxXQUFuQixFQUFnQztBQUM1QkEsTUFBQUEsRUFBRSxDQUFDTSxXQUFILENBQWU7QUFDWEcsUUFBQUEsV0FBVyxFQUFFQSxXQURGO0FBRVhGLFFBQUFBLFFBQVEsRUFBRTtBQUZDLE9BQWY7QUFJSDtBQUNKLEdBN0NZOztBQStDYjs7O0FBR0FHLEVBQUFBLGtCQWxEYSxnQ0FrRFE7QUFDakIsUUFBSSxPQUFRVixFQUFSLElBQWUsV0FBbkIsRUFBZ0M7QUFDNUJBLE1BQUFBLEVBQUUsQ0FBQ00sV0FBSCxDQUFlO0FBQ1hDLFFBQUFBLFFBQVEsRUFBRTtBQURDLE9BQWY7QUFHSDtBQUNKLEdBeERZOztBQTBEYjs7Ozs7O0FBTUFJLEVBQUFBLGtCQWhFYSw4QkFnRU1DLEtBaEVOLEVBZ0VhQyxDQWhFYixFQWdFZ0JDLENBaEVoQixFQWdFbUI7QUFDNUIsUUFBSSxPQUFRZCxFQUFSLElBQWUsV0FBbkIsRUFBZ0M7QUFDNUJBLE1BQUFBLEVBQUUsQ0FBQ00sV0FBSCxDQUFlO0FBQ1hDLFFBQUFBLFFBQVEsRUFBRSxDQURDO0FBRVhLLFFBQUFBLEtBQUssRUFBRUEsS0FGSTtBQUdYQyxRQUFBQSxDQUFDLEVBQUVBLENBQUMsSUFBSSxDQUhHO0FBSVhDLFFBQUFBLENBQUMsRUFBRUEsQ0FBQyxJQUFJO0FBSkcsT0FBZjtBQU1IO0FBQ0osR0F6RVk7QUE0RWJDLEVBQUFBLGdCQTVFYSw0QkE0RUlILEtBNUVKLEVBNEVXRSxDQTVFWCxFQTRFYztBQUN2QixRQUFJLE9BQVFkLEVBQVIsSUFBZSxXQUFuQixFQUFnQztBQUM1QkEsTUFBQUEsRUFBRSxDQUFDTSxXQUFILENBQWU7QUFDWEMsUUFBQUEsUUFBUSxFQUFFLENBREM7QUFFWEssUUFBQUEsS0FBSyxFQUFFQSxLQUZJO0FBR1hFLFFBQUFBLENBQUMsRUFBRUEsQ0FBQyxJQUFJO0FBSEcsT0FBZjtBQUtIO0FBQ0o7QUFwRlksQ0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtpbnR9IF9zY29yZSDorr7nva7muLjmiI/liIbmlbBcbiAgICAgKiBAcGFyYW0geyp9IHN1Y2Nlc3MgIOaIkOWKn+Wbnuiwg1xuICAgICAqIEBwYXJhbSB7Kn0gZmFpbCAgICAg5aSx6LSl5Zue6LCDXG4gICAgICogQHBhcmFtIHsqfSBjb21wbGV0ZSDlrozmiJDlm57osINcbiAgICAgKi9cbiAgICBzZXRTY29yZShfc2NvcmUsIHN1Y2Nlc3MsIGZhaWwsIGNvbXBsZXRlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9zY29yZT1cIixfc2NvcmUpO1xuICAgICAgICAgICAgd3guc2V0VXNlckNsb3VkU3RvcmFnZSh7XG4gICAgICAgICAgICAgICAgS1ZEYXRhTGlzdDogW3sga2V5OiBcInNjb3JlXCIsIHZhbHVlOiBfc2NvcmUgKyBcIlwiIH1dLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHN1Y2Nlc3MgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICBmYWlsOiBmYWlsIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGNvbXBsZXRlIHx8IG51bGwsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwic2V0IHNjb3JlPT0gZW5kXCIpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIOaYvuekuuWlveWPi+aOkuihjOamnFxuICAgICAqL1xuICAgIHNob3dGcmllbmRMaXN0KCkge1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgd3gucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHJhbmtUeXBlOiAxLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDmmL7npLrnvqTmjpLooYxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hhcmVUaWNrZXQg576k5o6S6KGM5YiG5Lqr6K645Y+v6K+BXG4gICAgICovXG4gICAgc2hvd0dyb3VwTGlzdChzaGFyZVRpY2tldCkge1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgd3gucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHNoYXJlVGlja2V0OiBzaGFyZVRpY2tldCxcbiAgICAgICAgICAgICAgICByYW5rVHlwZTogMCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICog5ri45oiP57uT5p2f5o6S6KGMXG4gICAgICovXG4gICAgc2hvd0dhbWVSZXN1bHRMaXN0KCkge1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgd3gucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHJhbmtUeXBlOiAyLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDmo4Dmn6XmmK/lkKbotoXotorlpb3lj4sg5bm25pi+56S6XG4gICAgICogQHBhcmFtIHtpbnR9IHNjb3JlIOW9k+WJjeWIhuaVsFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB4ICDmmL7npLrkvY3nva5wb3MueFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB5ICDmmL7npLrkvY3nva5wb3MueVxuICAgICAqL1xuICAgIGNoZWNrU3VycGFzc0ZyaWVuZChzY29yZSwgeCwgeSkge1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgd3gucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHJhbmtUeXBlOiAzLFxuICAgICAgICAgICAgICAgIHNjb3JlOiBzY29yZSxcbiAgICAgICAgICAgICAgICB4OiB4IHx8IDAsXG4gICAgICAgICAgICAgICAgeTogeSB8fCAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cblxuICAgIGNoZWNrV2lsbFN1cnBhc3Moc2NvcmUsIHkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHd4LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICByYW5rVHlwZTogNCxcbiAgICAgICAgICAgICAgICBzY29yZTogc2NvcmUsXG4gICAgICAgICAgICAgICAgeTogeSB8fCA1MDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/ReliveViewCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4d005XrCjBOra87fNF1fOrG', 'ReliveViewCtrl');
// Script/common/ReliveViewCtrl.js

"use strict";

var _Data = _interopRequireDefault(require("../dataStatistics/Data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import dataStatistics from '../dataStatistics/dataStatistics';
cc.Class({
  "extends": cc.Component,
  properties: {
    Score: cc.Label,
    TimeTex: cc.Label,
    m_cost_numlabel: cc.Label,
    TimeNum: null,
    skipBtn: cc.Node,
    //跳过按键
    m_cost_pic: cc.Sprite,
    //game
    m_bg: cc.Node,
    m_share_relive: cc.Node,
    m_btn_share: cc.Button,
    m_sp_all_gold: cc.Sprite,
    m_l_all_gold: cc.Label
  },
  start: function start() {
    this.node.zindex = 100; //设置z轴的位置

    this.TimeNum = 10;
    this.TimeTex.string = this.TimeNum;
    this.timeOut = false; // this.callbackobj = null;

    this.m_cost_num = window.RELIVE_COST_NUM; //设置节点的分辨率

    var size = cc.winSize;
    this.m_bg.width = size.width;
    this.m_bg.height = size.height;
    var self = this;
    cc.loader.loadRes(window.RELIVE_COST_PIC_PATH, cc.SpriteFrame, function (err, spriteFrame) {
      if (err) {
        cc.error(err.message || err);
        return;
      }

      self.m_cost_pic.spriteFrame = spriteFrame;
      self.m_sp_all_gold.spriteFrame = spriteFrame;
    });
    this.m_cost_numlabel.string = 'x' + window.RELIVE_COST_NUM;
    this.m_l_all_gold.string = ':' + window.INIT_GAME_SAVE_DATA.gold_num;

    if (window.isWeChatPlatform) {
      // dataStatistics.getGameConfigByAppkey(res => {
      //     console.log(res);
      //     let share = res.data.data.share;
      //     self.setShareReliveShow(share);
      // });
      self.setShareReliveShow(window.SHARE_RELIVE);
    }
  },
  setShareReliveShow: function setShareReliveShow(boo) {
    if (boo == 0) {
      this.m_share_relive.active = false;
    } else {
      this.m_share_relive.active = true;
    }
  },
  setCallBackObj: function setCallBackObj(obj) {
    this.callbackobj = obj;
  },
  //分享视图显示
  ShowView: function ShowView(IsShow) {
    this.node.active = IsShow;

    if (IsShow === true && this.callbackobj && this.callbackobj.shareObj) {
      if (this.callbackobj.shareObj.is_share_relive) {
        this.m_btn_share.interactable = false;
      } else {
        this.m_btn_share.interactable = true;
      }
    }

    if (IsShow === false) {
      // this.unschedule(this.DeleteTimeNum, this);
      this.node.destroy();
    }
  },
  //10秒倒计时 选择时间
  CountDownClick: function CountDownClick(time) {
    this.schedule(this.DeleteTimeNum, 1, time, 0, true);
  },
  DeleteTimeNum: function DeleteTimeNum() {
    this.TimeNum -= 1;
    this.TimeTex.string = this.TimeNum; //倒计时完成

    if (this.TimeNum <= -1) {
      this.TimeTex.string = 0;
      this.ShowView(false);

      if (this.callbackobj != null) {
        this.callbackobj.onSkipCallBack();
      }
    }
  },
  //点击分享 游戏继续
  CoinBtnClick: function CoinBtnClick() {
    if (this.callbackobj != null) {
      var relive = this.callbackobj.onCostRelive(this.m_cost_num);

      if (relive) {
        this.ShowView(false);
      }
    }
  },
  setScoreLabel: function setScoreLabel(score) {
    this.Score.string = score + "";
  },
  setCostNumLabel: function setCostNumLabel(costnum) {
    this.m_cost_numlabel.string = "x" + costnum;
    this.m_cost_num = parseInt(costnum);
  },
  //点击分享 游戏继续
  ShareBtnClick: function ShareBtnClick() {
    this.unschedule(this.DeleteTimeNum);

    if (!window.wx) {
      // console.log("=================不是微信平台===========");
      return;
    }

    var self = this;

    if (this.callbackobj != null) {
      var shareObj = this.callbackobj.shareObj;

      _Data["default"].share(EChannelPrefix.resurrection, "", null, function (res) {
        if (res.shareTickets) {
          if (shareObj.success) shareObj.success(res);
          self.ShowView(false);
        } else {
          Utils.showTipsText("分享失败，请分享到群", null, 0, 0, 80);
        }
      }, function () {
        if (shareObj.fail) shareObj.fail();
      }, function () {
        if (shareObj.complete) shareObj.complete();
      });
    }
  },
  //点击跳过 直接游戏结束
  cancelBtnClick: function cancelBtnClick() {
    // console.log("cancelBtnClick");
    this.unschedule(this.DeleteTimeNum);
    this.ShowView(false);

    if (this.callbackobj != null) {
      this.callbackobj.onSkipCallBack();
    }
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29tbW9uL1JlbGl2ZVZpZXdDdHJsLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiU2NvcmUiLCJMYWJlbCIsIlRpbWVUZXgiLCJtX2Nvc3RfbnVtbGFiZWwiLCJUaW1lTnVtIiwic2tpcEJ0biIsIk5vZGUiLCJtX2Nvc3RfcGljIiwiU3ByaXRlIiwibV9iZyIsIm1fc2hhcmVfcmVsaXZlIiwibV9idG5fc2hhcmUiLCJCdXR0b24iLCJtX3NwX2FsbF9nb2xkIiwibV9sX2FsbF9nb2xkIiwic3RhcnQiLCJub2RlIiwiemluZGV4Iiwic3RyaW5nIiwidGltZU91dCIsIm1fY29zdF9udW0iLCJ3aW5kb3ciLCJSRUxJVkVfQ09TVF9OVU0iLCJzaXplIiwid2luU2l6ZSIsIndpZHRoIiwiaGVpZ2h0Iiwic2VsZiIsImxvYWRlciIsImxvYWRSZXMiLCJSRUxJVkVfQ09TVF9QSUNfUEFUSCIsIlNwcml0ZUZyYW1lIiwiZXJyIiwic3ByaXRlRnJhbWUiLCJlcnJvciIsIm1lc3NhZ2UiLCJJTklUX0dBTUVfU0FWRV9EQVRBIiwiZ29sZF9udW0iLCJpc1dlQ2hhdFBsYXRmb3JtIiwic2V0U2hhcmVSZWxpdmVTaG93IiwiU0hBUkVfUkVMSVZFIiwiYm9vIiwiYWN0aXZlIiwic2V0Q2FsbEJhY2tPYmoiLCJvYmoiLCJjYWxsYmFja29iaiIsIlNob3dWaWV3IiwiSXNTaG93Iiwic2hhcmVPYmoiLCJpc19zaGFyZV9yZWxpdmUiLCJpbnRlcmFjdGFibGUiLCJkZXN0cm95IiwiQ291bnREb3duQ2xpY2siLCJ0aW1lIiwic2NoZWR1bGUiLCJEZWxldGVUaW1lTnVtIiwib25Ta2lwQ2FsbEJhY2siLCJDb2luQnRuQ2xpY2siLCJyZWxpdmUiLCJvbkNvc3RSZWxpdmUiLCJzZXRTY29yZUxhYmVsIiwic2NvcmUiLCJzZXRDb3N0TnVtTGFiZWwiLCJjb3N0bnVtIiwicGFyc2VJbnQiLCJTaGFyZUJ0bkNsaWNrIiwidW5zY2hlZHVsZSIsInd4IiwiRGF0YSIsInNoYXJlIiwiRUNoYW5uZWxQcmVmaXgiLCJyZXN1cnJlY3Rpb24iLCJyZXMiLCJzaGFyZVRpY2tldHMiLCJzdWNjZXNzIiwiVXRpbHMiLCJzaG93VGlwc1RleHQiLCJmYWlsIiwiY29tcGxldGUiLCJjYW5jZWxCdG5DbGljayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7OztBQURBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxLQUFLLEVBQUVKLEVBQUUsQ0FBQ0ssS0FERjtBQUVSQyxJQUFBQSxPQUFPLEVBQUVOLEVBQUUsQ0FBQ0ssS0FGSjtBQUdSRSxJQUFBQSxlQUFlLEVBQUVQLEVBQUUsQ0FBQ0ssS0FIWjtBQUlSRyxJQUFBQSxPQUFPLEVBQUUsSUFKRDtBQUtSQyxJQUFBQSxPQUFPLEVBQUVULEVBQUUsQ0FBQ1UsSUFMSjtBQUtvQjtBQUM1QkMsSUFBQUEsVUFBVSxFQUFFWCxFQUFFLENBQUNZLE1BTlA7QUFPUjtBQUNBQyxJQUFBQSxJQUFJLEVBQUViLEVBQUUsQ0FBQ1UsSUFSRDtBQVNSSSxJQUFBQSxjQUFjLEVBQUVkLEVBQUUsQ0FBQ1UsSUFUWDtBQVVSSyxJQUFBQSxXQUFXLEVBQUVmLEVBQUUsQ0FBQ2dCLE1BVlI7QUFXUkMsSUFBQUEsYUFBYSxFQUFFakIsRUFBRSxDQUFDWSxNQVhWO0FBWVJNLElBQUFBLFlBQVksRUFBRWxCLEVBQUUsQ0FBQ0s7QUFaVCxHQUhQO0FBa0JMYyxFQUFBQSxLQWxCSyxtQkFrQkc7QUFDSixTQUFLQyxJQUFMLENBQVVDLE1BQVYsR0FBbUIsR0FBbkIsQ0FESSxDQUN1Qjs7QUFDM0IsU0FBS2IsT0FBTCxHQUFlLEVBQWY7QUFDQSxTQUFLRixPQUFMLENBQWFnQixNQUFiLEdBQXNCLEtBQUtkLE9BQTNCO0FBQ0EsU0FBS2UsT0FBTCxHQUFlLEtBQWYsQ0FKSSxDQUtKOztB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QUtDLEtBQUwsQ0FBV0MsY0FBYyxDQUFDQyxZQUExQixFQUF3QyxFQUF4QyxFQUE0QyxJQUE1QyxFQUFrRCxVQUFDQyxHQUFELEVBQVM7QUFDdkQsWUFBSUEsR0FBRyxDQUFDQyxZQUFSLEVBQXNCO0FBQ2xCLGNBQUl6QixRQUFRLENBQUMwQixPQUFiLEVBQ0kxQixRQUFRLENBQUMwQixPQUFULENBQWlCRixHQUFqQjtBQUNKN0MsVUFBQUEsSUFBSSxDQUFDbUIsUUFBTCxDQUFjLEtBQWQ7QUFDSCxTQUpELE1BSU87QUFDSDZCLFVBQUFBLEtBQUssQ0FBQ0MsWUFBTixDQUFtQixZQUFuQixFQUFpQyxJQUFqQyxFQUF1QyxDQUF2QyxFQUEwQyxDQUExQyxFQUE2QyxFQUE3QztBQUNIO0FBQ0osT0FSRCxFQVFHLFlBQU07QUFDTCxZQUFJNUIsUUFBUSxDQUFDNkIsSUFBYixFQUNJN0IsUUFBUSxDQUFDNkIsSUFBVDtBQUNQLE9BWEQsRUFXRyxZQUFNO0FBQ0wsWUFBSTdCLFFBQVEsQ0FBQzhCLFFBQWIsRUFDSTlCLFFBQVEsQ0FBQzhCLFFBQVQ7QUFDUCxPQWREO0FBZUg7QUFDSixHQS9JSTtBQWdKTDtBQUNBQyxFQUFBQSxjQUFjLEVBQUUsMEJBQVk7QUFDeEI7QUFDQSxTQUFLYixVQUFMLENBQWdCLEtBQUtYLGFBQXJCO0FBQ0EsU0FBS1QsUUFBTCxDQUFjLEtBQWQ7O0FBQ0EsUUFBSSxLQUFLRCxXQUFMLElBQW9CLElBQXhCLEVBQThCO0FBQzFCLFdBQUtBLFdBQUwsQ0FBaUJXLGNBQWpCO0FBQ0g7QUFDSjtBQXhKSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgZGF0YVN0YXRpc3RpY3MgZnJvbSAnLi4vZGF0YVN0YXRpc3RpY3MvZGF0YVN0YXRpc3RpY3MnO1xuaW1wb3J0IERhdGEgZnJvbSAnLi4vZGF0YVN0YXRpc3RpY3MvRGF0YSc7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBTY29yZTogY2MuTGFiZWwsXG4gICAgICAgIFRpbWVUZXg6IGNjLkxhYmVsLFxuICAgICAgICBtX2Nvc3RfbnVtbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBUaW1lTnVtOiBudWxsLFxuICAgICAgICBza2lwQnRuOiBjYy5Ob2RlLCAgICAgICAgICAgLy/ot7Pov4fmjInplK5cbiAgICAgICAgbV9jb3N0X3BpYzogY2MuU3ByaXRlLFxuICAgICAgICAvL2dhbWVcbiAgICAgICAgbV9iZzogY2MuTm9kZSxcbiAgICAgICAgbV9zaGFyZV9yZWxpdmU6IGNjLk5vZGUsXG4gICAgICAgIG1fYnRuX3NoYXJlOiBjYy5CdXR0b24sXG4gICAgICAgIG1fc3BfYWxsX2dvbGQ6IGNjLlNwcml0ZSxcbiAgICAgICAgbV9sX2FsbF9nb2xkOiBjYy5MYWJlbCxcbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMubm9kZS56aW5kZXggPSAxMDA7ICAgIC8v6K6+572ueui9tOeahOS9jee9rlxuICAgICAgICB0aGlzLlRpbWVOdW0gPSAxMDtcbiAgICAgICAgdGhpcy5UaW1lVGV4LnN0cmluZyA9IHRoaXMuVGltZU51bTtcbiAgICAgICAgdGhpcy50aW1lT3V0ID0gZmFsc2U7XG4gICAgICAgIC8vIHRoaXMuY2FsbGJhY2tvYmogPSBudWxsO1xuICAgICAgICB0aGlzLm1fY29zdF9udW0gPSB3aW5kb3cuUkVMSVZFX0NPU1RfTlVNO1xuICAgICAgICAvL+iuvue9ruiKgueCueeahOWIhui+qOeOh1xuICAgICAgICB2YXIgc2l6ZSA9IGNjLndpblNpemVcbiAgICAgICAgdGhpcy5tX2JnLndpZHRoID0gc2l6ZS53aWR0aDtcbiAgICAgICAgdGhpcy5tX2JnLmhlaWdodCA9IHNpemUuaGVpZ2h0O1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHdpbmRvdy5SRUxJVkVfQ09TVF9QSUNfUEFUSCwgY2MuU3ByaXRlRnJhbWUsIGZ1bmN0aW9uIChlcnIsIHNwcml0ZUZyYW1lKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoZXJyLm1lc3NhZ2UgfHwgZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLm1fY29zdF9waWMuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZTtcbiAgICAgICAgICAgIHNlbGYubV9zcF9hbGxfZ29sZC5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5tX2Nvc3RfbnVtbGFiZWwuc3RyaW5nID0gJ3gnICsgd2luZG93LlJFTElWRV9DT1NUX05VTTtcbiAgICAgICAgdGhpcy5tX2xfYWxsX2dvbGQuc3RyaW5nID0gJzonICsgd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEuZ29sZF9udW07XG4gICAgICAgIGlmICh3aW5kb3cuaXNXZUNoYXRQbGF0Zm9ybSkge1xuICAgICAgICAgICAgLy8gZGF0YVN0YXRpc3RpY3MuZ2V0R2FtZUNvbmZpZ0J5QXBwa2V5KHJlcyA9PiB7XG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgIC8vICAgICBsZXQgc2hhcmUgPSByZXMuZGF0YS5kYXRhLnNoYXJlO1xuICAgICAgICAgICAgLy8gICAgIHNlbGYuc2V0U2hhcmVSZWxpdmVTaG93KHNoYXJlKTtcbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgc2VsZi5zZXRTaGFyZVJlbGl2ZVNob3cod2luZG93LlNIQVJFX1JFTElWRSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG5cbiAgICBzZXRTaGFyZVJlbGl2ZVNob3coYm9vKSB7XG4gICAgICAgIGlmIChib28gPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5tX3NoYXJlX3JlbGl2ZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubV9zaGFyZV9yZWxpdmUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc2V0Q2FsbEJhY2tPYmoob2JqKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tvYmogPSBvYmo7XG4gICAgfSxcblxuICAgIC8v5YiG5Lqr6KeG5Zu+5pi+56S6XG4gICAgU2hvd1ZpZXc6IGZ1bmN0aW9uIChJc1Nob3cpIHtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IElzU2hvdztcbiAgICAgICAgaWYgKElzU2hvdyA9PT0gdHJ1ZSAmJiB0aGlzLmNhbGxiYWNrb2JqICYmIHRoaXMuY2FsbGJhY2tvYmouc2hhcmVPYmopIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbGxiYWNrb2JqLnNoYXJlT2JqLmlzX3NoYXJlX3JlbGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubV9idG5fc2hhcmUuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubV9idG5fc2hhcmUuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoSXNTaG93ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgLy8gdGhpcy51bnNjaGVkdWxlKHRoaXMuRGVsZXRlVGltZU51bSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vMTDnp5LlgJLorqHml7Yg6YCJ5oup5pe26Ze0XG4gICAgQ291bnREb3duQ2xpY2s6IGZ1bmN0aW9uICh0aW1lKSB7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5EZWxldGVUaW1lTnVtLCAxLCB0aW1lLCAwLCB0cnVlKTtcbiAgICB9LFxuXG4gICAgRGVsZXRlVGltZU51bTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLlRpbWVOdW0gLT0gMTtcbiAgICAgICAgdGhpcy5UaW1lVGV4LnN0cmluZyA9IHRoaXMuVGltZU51bTtcblxuICAgICAgICAvL+WAkuiuoeaXtuWujOaIkFxuICAgICAgICBpZiAodGhpcy5UaW1lTnVtIDw9IC0xKSB7XG4gICAgICAgICAgICB0aGlzLlRpbWVUZXguc3RyaW5nID0gMDtcbiAgICAgICAgICAgIHRoaXMuU2hvd1ZpZXcoZmFsc2UpO1xuICAgICAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2tvYmogIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tvYmoub25Ta2lwQ2FsbEJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL+eCueWHu+WIhuS6qyDmuLjmiI/nu6fnu61cbiAgICBDb2luQnRuQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2tvYmogIT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IHJlbGl2ZSA9IHRoaXMuY2FsbGJhY2tvYmoub25Db3N0UmVsaXZlKHRoaXMubV9jb3N0X251bSk7XG4gICAgICAgICAgICBpZiAocmVsaXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5TaG93VmlldyhmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0U2NvcmVMYWJlbDogZnVuY3Rpb24gKHNjb3JlKSB7XG4gICAgICAgIHRoaXMuU2NvcmUuc3RyaW5nID0gc2NvcmUgKyBcIlwiO1xuICAgIH0sXG5cbiAgICBzZXRDb3N0TnVtTGFiZWw6IGZ1bmN0aW9uIChjb3N0bnVtKSB7XG4gICAgICAgIHRoaXMubV9jb3N0X251bWxhYmVsLnN0cmluZyA9IFwieFwiICsgY29zdG51bTtcbiAgICAgICAgdGhpcy5tX2Nvc3RfbnVtID0gcGFyc2VJbnQoY29zdG51bSk7XG4gICAgfSxcbiAgICAvL+eCueWHu+WIhuS6qyDmuLjmiI/nu6fnu61cbiAgICBTaGFyZUJ0bkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLkRlbGV0ZVRpbWVOdW0pO1xuXG4gICAgICAgIGlmICghd2luZG93Lnd4KSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT095LiN5piv5b6u5L+h5bmz5Y+wPT09PT09PT09PT1cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5jYWxsYmFja29iaiAhPSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgc2hhcmVPYmogPSB0aGlzLmNhbGxiYWNrb2JqLnNoYXJlT2JqO1xuICAgICAgICAgICAgRGF0YS5zaGFyZShFQ2hhbm5lbFByZWZpeC5yZXN1cnJlY3Rpb24sIFwiXCIsIG51bGwsIChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLnNoYXJlVGlja2V0cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hhcmVPYmouc3VjY2VzcylcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYXJlT2JqLnN1Y2Nlc3MocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5TaG93VmlldyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuc2hvd1RpcHNUZXh0KFwi5YiG5Lqr5aSx6LSl77yM6K+35YiG5Lqr5Yiw576kXCIsIG51bGwsIDAsIDAsIDgwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNoYXJlT2JqLmZhaWwpXG4gICAgICAgICAgICAgICAgICAgIHNoYXJlT2JqLmZhaWwoKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2hhcmVPYmouY29tcGxldGUpXG4gICAgICAgICAgICAgICAgICAgIHNoYXJlT2JqLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy/ngrnlh7vot7Pov4cg55u05o6l5ri45oiP57uT5p2fXG4gICAgY2FuY2VsQnRuQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJjYW5jZWxCdG5DbGlja1wiKTtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuRGVsZXRlVGltZU51bSk7XG4gICAgICAgIHRoaXMuU2hvd1ZpZXcoZmFsc2UpO1xuICAgICAgICBpZiAodGhpcy5jYWxsYmFja29iaiAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrb2JqLm9uU2tpcENhbGxCYWNrKCk7XG4gICAgICAgIH1cbiAgICB9LFxufSk7XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/SubdomineDisplay.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '041f3phw99Aorsmk3RdL7bG', 'SubdomineDisplay');
// Script/common/SubdomineDisplay.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SubdomineDisplay = /** @class */ (function (_super) {
    __extends(SubdomineDisplay, _super);
    function SubdomineDisplay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubdomineDisplay.prototype.start = function () {
        this.display = this.node.getComponent(cc.Sprite);
        this.tex = new cc.Texture2D();
        this.display.node.active = true;
        var self = this;
        this.schedule(function () {
            self._updateSubDomainCanvas();
        }, 1);
    };
    SubdomineDisplay.prototype._updateSubDomainCanvas = function () {
        if (!this.node.active)
            return;
        if (typeof (wx) == "undefined")
            return;
        if (!this.tex) {
            return;
        }
        this.tex.initWithElement(sharedCanvas);
        this.tex.handleLoadedTexture();
        this.display.spriteFrame = new cc.SpriteFrame(this.tex);
    };
    // update() {
    // }
    SubdomineDisplay.prototype.onDestroy = function () {
        this.unscheduleAllCallbacks();
    };
    SubdomineDisplay = __decorate([
        ccclass
    ], SubdomineDisplay);
    return SubdomineDisplay;
}(cc.Component));
exports.default = SubdomineDisplay;
;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29tbW9uL1N1YmRvbWluZURpc3BsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQThDLG9DQUFZO0lBQTFEOztJQWlDQSxDQUFDO0lBNUJHLGdDQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDVixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQTtRQUNqQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDVixDQUFDO0lBRUQsaURBQXNCLEdBQXRCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU87UUFDOUIsSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksV0FBVztZQUMxQixPQUFPO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDWCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsYUFBYTtJQUViLElBQUk7SUFDSixvQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDbEMsQ0FBQztJQWhDZ0IsZ0JBQWdCO1FBRHBDLE9BQU87T0FDYSxnQkFBZ0IsQ0FpQ3BDO0lBQUQsdUJBQUM7Q0FqQ0QsQUFpQ0MsQ0FqQzZDLEVBQUUsQ0FBQyxTQUFTLEdBaUN6RDtrQkFqQ29CLGdCQUFnQjtBQWlDcEMsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1YmRvbWluZURpc3BsYXkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgcHJpdmF0ZSBkaXNwbGF5OiBjYy5TcHJpdGU7XG4gICAgcHJpdmF0ZSB0ZXg6IGNjLlRleHR1cmUyRDtcblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIHRoaXMudGV4ID0gbmV3IGNjLlRleHR1cmUyRCgpO1xuICAgICAgICB0aGlzLmRpc3BsYXkubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xuICAgICAgICAgICAgc2VsZi5fdXBkYXRlU3ViRG9tYWluQ2FudmFzKClcbiAgICAgICAgfSwgMSk7XG4gICAgfVxuXG4gICAgX3VwZGF0ZVN1YkRvbWFpbkNhbnZhcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLm5vZGUuYWN0aXZlKSByZXR1cm47XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSA9PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoIXRoaXMudGV4KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50ZXguaW5pdFdpdGhFbGVtZW50KHNoYXJlZENhbnZhcyk7XG4gICAgICAgIHRoaXMudGV4LmhhbmRsZUxvYWRlZFRleHR1cmUoKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5LnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRoaXMudGV4KTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUoKSB7XG5cbiAgICAvLyB9XG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcbiAgICB9XG59OyJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/ShareSdk.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7d3cacY8olAOYvE5ne5QRwi', 'ShareSdk');
// Script/common/ShareSdk.js

"use strict";

var _Data = _interopRequireDefault(require("../dataStatistics/Data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isWeChat = cc.sys.platform == cc.sys.WECHAT_GAME;
var ShareSdk = {
  /**
   * desc:    设置设置页面是否显示分享按钮
   * param:   boo- true or false
   *          withShareTicket-是否使用带 shareTicket 的转发
   */
  setShareMenuEnabled: function setShareMenuEnabled(boo, withShareTicket) {
    if (isWeChat) {
      var withShare = withShareTicket ? true : false;

      if (boo) {
        wx.showShareMenu({
          withShareTicket: withShare
        });
      } else {
        wx.hideShareMenu({});
      }
    } else {// console.log("it's not wechat platform. setShareMenuEnabled faied!");
    }
  },

  /**
   * desc:    开启监听设置页面分享按钮
   * param:   
      * ShareOption-分享监听参数对象
      *  title		转发标题，不传则默认使用当前小游戏的昵称。	
      *   imageUrl	转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。	
      *   query		查询字符串，必须是 key1=val1&key2=val2 的格式。从这条转发消息进入后，可通过 wx.onLaunch() 或 wx.onShow 获取启动参数中的 query。	
      *   success		转发成功的回调函数	
      *   fail		转发失败的回调函数	
      *   complete	转发完成的回调函数
   */
  onShareAppMessage: function onShareAppMessage(object) {
    if (isWeChat) {
      wx.onShareAppMessage(object);
    } else {// console.log("it's not wechat platform. onShareAppMessage faied!");
    }
  },

  /**
   * desc:    转发分享
   * param:   
      * ShareOption-分享监听参数对象
      *  title		转发标题，不传则默认使用当前小游戏的昵称。	
      *   imageUrl	转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。	
      *   query		查询字符串，必须是 key1=val1&key2=val2 的格式。从这条转发消息进入后，可通过 wx.onLaunch() 或 wx.onShow 获取启动参数中的 query。	
      *   success(res)		转发成功的回调函数	res.shareTickets[0]成功转发参数
      *   fail		转发失败的回调函数	
      *   complete	转发完成的回调函数
   */
  shareAppMessage: function shareAppMessage(object) {
    if (isWeChat) {
      if (typeof object != "object") {
        console.log("param 'object' is not a js object ");
        return;
      }

      if (typeof object.title == "undefined") {
        console.log("param 'object' property title is undefined!");
        return;
      } // wx.showShareMenu({
      //     withShareTicket: true,
      // });


      wx.shareAppMessage(object);
    } else {// console.log("it's not wechat platform. onShareAppMessage faied!");
    }
  },

  /**
   * desc：   接入复活分享界面--需要配置参数config.js window.RELIVE_COST_PIC_PATH
   * param：  prefabs-复活界面预制体 object-回调参数对象{shareObj:{}, onSkipCallBack:function, onCostRelive:function, score: string, cost_num:number}
   *          parentNode-复活分享界面的父节点，空则以场景画布为父节点
   * @param onCostRelive 需要有返回值是否成功复活
   */
  openReliveView: function openReliveView(prefabs, obj, parentNode) {
    var node = cc.instantiate(prefabs);

    if (parentNode != null && cc.isValid(parentNode)) {
      node.parent = parentNode;
    } else {
      parentNode = cc.find("Canvas");
      node.parent = parentNode;
    }

    var compon = node.getComponent("ReliveViewCtrl");
    compon.setCallBackObj(obj);

    if (obj.cost_num) {
      compon.setCostNumLabel(obj.cost_num);
    }

    compon.setScoreLabel(obj.score);
    compon.ShowView(true); // compon.CountDownClick(10);
  },

  /**
   * desc：   分享成绩
   * param：  score-成绩   title-分享的文案   url-分享的图片路径
   * example: shareScoreMessage(10, "haha", "");
   */
  shareScoreMessage: function shareScoreMessage(score, title, url) {
    if (isWeChat) {
      // var shareCanvas = wx.createCanvas();
      // shareCanvas.width = 668;
      // shareCanvas.height = 501;
      // var context = shareCanvas.getContext('2d');
      // context.font = "bold 200px Verdana"; //粗体字
      // context.fillStyle = "Black";
      // context.textAlign = "center";
      // context.clearRect(0, 0, shareCanvas.width, shareCanvas.height);
      var self = this;
      var scoreNum = score + ""; // var shareImg = wx.createImage();
      // shareImg.src = cc.url.raw(url);

      var shareTitle = title ? title : "本局得了" + scoreNum + "分，没有办法，我就是这么强大！"; // shareImg.onload = function () {
      // context.drawImage(shareImg, 0, 0, shareCanvas.width, shareCanvas.height);
      // let timeid = setTimeout(() => {
      // let path = shareCanvas.toTempFilePathSysc();

      wx.shareAppMessage({
        title: shareTitle,
        imageUrl: cc.url.raw(url)
      }); // clearTimeout(timeid);
      // }, 0.2);
      // };
    } else {// console.log("it's not wechat platform. shareScoreMessage faied!");
      }
  },

  /**
   * desc: 添加二维码更多游戏界面
   * param： prefabs-二维码更多游戏界面预制体 parentNode-父节点，默认画布节点 x,y坐标
   */
  addRqCodeView: function addRqCodeView(prefabs, parentNode, x, y) {
    if (true || isWeChat) {
      var posx = x ? x : 0;
      var posy = y ? y : 0;
      var node = cc.instantiate(prefabs);

      if (parentNode != null && cc.isValid(parentNode)) {
        node.parent = parentNode;
      } else {
        parentNode = cc.find("Canvas");
        node.parent = parentNode;
      }

      node.setPosition(posx, posy);
    } else {// console.log("it's not wechat platform. addRqCodeView faied!");
    }

    ;
  },

  /**
   * desc:    显示最近排行榜信息
   * param:   parentNode-父节点  ranktype-排行榜类型, object-回调对象
   *  
   */
  showFriendRankView: function showFriendRankView(parentNode, ranktype, object) {},

  /**
   * 
   * @param parentNode {*父节点}
   * @param ranktype {*群排行榜类型，默认1，暂时只有1}
   * @param object {*回调对象} 
   */
  showGroupRankView: function showGroupRankView(parentNode, ranktype, object) {}
};
module.exports = ShareSdk;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29tbW9uL1NoYXJlU2RrLmpzIl0sIm5hbWVzIjpbImlzV2VDaGF0IiwiY2MiLCJzeXMiLCJwbGF0Zm9ybSIsIldFQ0hBVF9HQU1FIiwiU2hhcmVTZGsiLCJzZXRTaGFyZU1lbnVFbmFibGVkIiwiYm9vIiwid2l0aFNoYXJlVGlja2V0Iiwid2l0aFNoYXJlIiwid3giLCJzaG93U2hhcmVNZW51IiwiaGlkZVNoYXJlTWVudSIsIm9uU2hhcmVBcHBNZXNzYWdlIiwib2JqZWN0Iiwic2hhcmVBcHBNZXNzYWdlIiwiY29uc29sZSIsImxvZyIsInRpdGxlIiwib3BlblJlbGl2ZVZpZXciLCJwcmVmYWJzIiwib2JqIiwicGFyZW50Tm9kZSIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsImlzVmFsaWQiLCJwYXJlbnQiLCJmaW5kIiwiY29tcG9uIiwiZ2V0Q29tcG9uZW50Iiwic2V0Q2FsbEJhY2tPYmoiLCJjb3N0X251bSIsInNldENvc3ROdW1MYWJlbCIsInNldFNjb3JlTGFiZWwiLCJzY29yZSIsIlNob3dWaWV3Iiwic2hhcmVTY29yZU1lc3NhZ2UiLCJ1cmwiLCJzZWxmIiwic2NvcmVOdW0iLCJzaGFyZVRpdGxlIiwiaW1hZ2VVcmwiLCJyYXciLCJhZGRScUNvZGVWaWV3IiwieCIsInkiLCJwb3N4IiwicG9zeSIsInNldFBvc2l0aW9uIiwic2hvd0ZyaWVuZFJhbmtWaWV3IiwicmFua3R5cGUiLCJzaG93R3JvdXBSYW5rVmlldyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQSxJQUFJQSxRQUFRLEdBQUlDLEVBQUUsQ0FBQ0MsR0FBSCxDQUFPQyxRQUFQLElBQW1CRixFQUFFLENBQUNDLEdBQUgsQ0FBT0UsV0FBMUM7QUFDQSxJQUFJQyxRQUFRLEdBQUc7QUFFWDs7Ozs7QUFNQUMsRUFBQUEsbUJBUlcsK0JBUVNDLEdBUlQsRUFRY0MsZUFSZCxFQVErQjtBQUN0QyxRQUFJUixR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N0IsVUFyS1AsRUFxS21CNEIsUUFyS25CLEVBcUs2QnBDLE1Bcks3QixFQXFLcUMsQ0FFL0M7QUF2S1UsQ0FBZjtBQTBLQXNDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmhELFFBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGF0YSBmcm9tIFwiLi4vZGF0YVN0YXRpc3RpY3MvRGF0YVwiO1xubGV0IGlzV2VDaGF0ID0gKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuV0VDSEFUX0dBTUUpO1xudmFyIFNoYXJlU2RrID0ge1xuXG4gICAgLyoqXG4gICAgICogZGVzYzogICAg6K6+572u6K6+572u6aG16Z2i5piv5ZCm5pi+56S65YiG5Lqr5oyJ6ZKuXG4gICAgICogcGFyYW06ICAgYm9vLSB0cnVlIG9yIGZhbHNlXG4gICAgICogICAgICAgICAgd2l0aFNoYXJlVGlja2V0LeaYr+WQpuS9v+eUqOW4piBzaGFyZVRpY2tldCDnmoTovazlj5FcbiAgICAgKi9cblxuICAgIHNldFNoYXJlTWVudUVuYWJsZWQoYm9vLCB3aXRoU2hhcmVUaWNrZXQpIHtcbiAgICAgICAgaWYgKGlzV2VDaGF0KSB7XG4gICAgICAgICAgICBsZXQgd2l0aFNoYXJlID0gd2l0aFNoYXJlVGlja2V0ID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGJvbykge1xuICAgICAgICAgICAgICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgICAgICAgICAgICAgICB3aXRoU2hhcmVUaWNrZXQ6IHdpdGhTaGFyZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHd4LmhpZGVTaGFyZU1lbnUoe1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJpdCdzIG5vdCB3ZWNoYXQgcGxhdGZvcm0uIHNldFNoYXJlTWVudUVuYWJsZWQgZmFpZWQhXCIpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGRlc2M6ICAgIOW8gOWQr+ebkeWQrOiuvue9rumhtemdouWIhuS6q+aMiemSrlxuICAgICAqIHBhcmFtOiAgIFxuICAgICAgICAqIFNoYXJlT3B0aW9uLeWIhuS6q+ebkeWQrOWPguaVsOWvueixoVxuICAgICAgICAqICB0aXRsZVx0XHTovazlj5HmoIfpopjvvIzkuI3kvKDliJnpu5jorqTkvb/nlKjlvZPliY3lsI/muLjmiI/nmoTmmLXnp7DjgIJcdFxuICAgICAgICAqICAgaW1hZ2VVcmxcdOi9rOWPkeaYvuekuuWbvueJh+eahOmTvuaOpe+8jOWPr+S7peaYr+e9kee7nOWbvueJh+i3r+W+hOaIluacrOWcsOWbvueJh+aWh+S7tui3r+W+hOaIluebuOWvueS7o+eggeWMheagueebruW9leeahOWbvueJh+aWh+S7tui3r+W+hOOAglx0XG4gICAgICAgICogICBxdWVyeVx0XHTmn6Xor6LlrZfnrKbkuLLvvIzlv4XpobvmmK8ga2V5MT12YWwxJmtleTI9dmFsMiDnmoTmoLzlvI/jgILku47ov5nmnaHovazlj5Hmtojmga/ov5vlhaXlkI7vvIzlj6/pgJrov4cgd3gub25MYXVuY2goKSDmiJYgd3gub25TaG93IOiOt+WPluWQr+WKqOWPguaVsOS4reeahCBxdWVyeeOAglx0XG4gICAgICAgICogICBzdWNjZXNzXHRcdOi9rOWPkeaIkOWKn+eahOWbnuiwg+WHveaVsFx0XG4gICAgICAgICogICBmYWlsXHRcdOi9rOWPkeWksei0peeahOWbnuiwg+WHveaVsFx0XG4gICAgICAgICogICBjb21wbGV0ZVx06L2s5Y+R5a6M5oiQ55qE5Zue6LCD5Ye95pWwXG4gICAgICovXG5cbiAgICBvblNoYXJlQXBwTWVzc2FnZShvYmplY3QpIHtcbiAgICAgICAgaWYgKGlzV2VDaGF0KSB7XG4gICAgICAgICAgICB3eC5vblNoYXJlQXBwTWVzc2FnZShvYmplY3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJpdCdzIG5vdCB3ZWNoYXQgcGxhdGZvcm0uIG9uU2hhcmVBcHBNZXNzYWdlIGZhaWVkIVwiKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkZXNjOiAgICDovazlj5HliIbkuqtcbiAgICAgKiBwYXJhbTogICBcbiAgICAgICAgKiBTaGFyZU9wdGlvbi3liIbkuqvnm5HlkKzlj4LmlbDlr7nosaFcbiAgICAgICAgKiAgdGl0bGVcdFx06L2s5Y+R5qCH6aKY77yM5LiN5Lyg5YiZ6buY6K6k5L2/55So5b2T5YmN5bCP5ri45oiP55qE5pi156ew44CCXHRcbiAgICAgICAgKiAgIGltYWdlVXJsXHTovazlj5HmmL7npLrlm77niYfnmoTpk77mjqXvvIzlj6/ku6XmmK/nvZHnu5zlm77niYfot6/lvoTmiJbmnKzlnLDlm77niYfmlofku7bot6/lvoTmiJbnm7jlr7nku6PnoIHljIXmoLnnm67lvZXnmoTlm77niYfmlofku7bot6/lvoTjgIJcdFxuICAgICAgICAqICAgcXVlcnlcdFx05p+l6K+i5a2X56ym5Liy77yM5b+F6aG75pivIGtleTE9dmFsMSZrZXkyPXZhbDIg55qE5qC85byP44CC5LuO6L+Z5p2h6L2s5Y+R5raI5oGv6L+b5YWl5ZCO77yM5Y+v6YCa6L+HIHd4Lm9uTGF1bmNoKCkg5oiWIHd4Lm9uU2hvdyDojrflj5blkK/liqjlj4LmlbDkuK3nmoQgcXVlcnnjgIJcdFxuICAgICAgICAqICAgc3VjY2VzcyhyZXMpXHRcdOi9rOWPkeaIkOWKn+eahOWbnuiwg+WHveaVsFx0cmVzLnNoYXJlVGlja2V0c1swXeaIkOWKn+i9rOWPkeWPguaVsFxuICAgICAgICAqICAgZmFpbFx0XHTovazlj5HlpLHotKXnmoTlm57osIPlh73mlbBcdFxuICAgICAgICAqICAgY29tcGxldGVcdOi9rOWPkeWujOaIkOeahOWbnuiwg+WHveaVsFxuICAgICAqL1xuXG4gICAgc2hhcmVBcHBNZXNzYWdlKG9iamVjdCkge1xuICAgICAgICBpZiAoaXNXZUNoYXQpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKG9iamVjdCkgIT0gXCJvYmplY3RcIikgeyBjb25zb2xlLmxvZyhcInBhcmFtICdvYmplY3QnIGlzIG5vdCBhIGpzIG9iamVjdCBcIik7IHJldHVybjsgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiAob2JqZWN0LnRpdGxlKSA9PSBcInVuZGVmaW5lZFwiKSB7IGNvbnNvbGUubG9nKFwicGFyYW0gJ29iamVjdCcgcHJvcGVydHkgdGl0bGUgaXMgdW5kZWZpbmVkIVwiKTsgcmV0dXJuOyB9XG4gICAgICAgICAgICAvLyB3eC5zaG93U2hhcmVNZW51KHtcbiAgICAgICAgICAgIC8vICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWUsXG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIHd4LnNoYXJlQXBwTWVzc2FnZShvYmplY3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJpdCdzIG5vdCB3ZWNoYXQgcGxhdGZvcm0uIG9uU2hhcmVBcHBNZXNzYWdlIGZhaWVkIVwiKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkZXNj77yaICAg5o6l5YWl5aSN5rS75YiG5Lqr55WM6Z2iLS3pnIDopoHphY3nva7lj4LmlbBjb25maWcuanMgd2luZG93LlJFTElWRV9DT1NUX1BJQ19QQVRIXG4gICAgICogcGFyYW3vvJogIHByZWZhYnMt5aSN5rS755WM6Z2i6aKE5Yi25L2TIG9iamVjdC3lm57osIPlj4LmlbDlr7nosaF7c2hhcmVPYmo6e30sIG9uU2tpcENhbGxCYWNrOmZ1bmN0aW9uLCBvbkNvc3RSZWxpdmU6ZnVuY3Rpb24sIHNjb3JlOiBzdHJpbmcsIGNvc3RfbnVtOm51bWJlcn1cbiAgICAgKiAgICAgICAgICBwYXJlbnROb2RlLeWkjea0u+WIhuS6q+eVjOmdoueahOeItuiKgueCue+8jOepuuWImeS7peWcuuaZr+eUu+W4g+S4uueItuiKgueCuVxuICAgICAqIEBwYXJhbSBvbkNvc3RSZWxpdmUg6ZyA6KaB5pyJ6L+U5Zue5YC85piv5ZCm5oiQ5Yqf5aSN5rS7XG4gICAgICovXG4gICAgb3BlblJlbGl2ZVZpZXcocHJlZmFicywgb2JqLCBwYXJlbnROb2RlKSB7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUocHJlZmFicyk7XG4gICAgICAgIGlmIChwYXJlbnROb2RlICE9IG51bGwgJiYgY2MuaXNWYWxpZChwYXJlbnROb2RlKSkge1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50Tm9kZSA9IGNjLmZpbmQoXCJDYW52YXNcIik7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbXBvbiA9IG5vZGUuZ2V0Q29tcG9uZW50KFwiUmVsaXZlVmlld0N0cmxcIik7XG4gICAgICAgIGNvbXBvbi5zZXRDYWxsQmFja09iaihvYmopO1xuICAgICAgICBpZiAob2JqLmNvc3RfbnVtKSB7XG4gICAgICAgICAgICBjb21wb24uc2V0Q29zdE51bUxhYmVsKG9iai5jb3N0X251bSk7XG4gICAgICAgIH1cbiAgICAgICAgY29tcG9uLnNldFNjb3JlTGFiZWwob2JqLnNjb3JlKTtcbiAgICAgICAgY29tcG9uLlNob3dWaWV3KHRydWUpO1xuICAgICAgICAvLyBjb21wb24uQ291bnREb3duQ2xpY2soMTApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkZXNj77yaICAg5YiG5Lqr5oiQ57upXG4gICAgICogcGFyYW3vvJogIHNjb3JlLeaIkOe7qSAgIHRpdGxlLeWIhuS6q+eahOaWh+ahiCAgIHVybC3liIbkuqvnmoTlm77niYfot6/lvoRcbiAgICAgKiBleGFtcGxlOiBzaGFyZVNjb3JlTWVzc2FnZSgxMCwgXCJoYWhhXCIsIFwiXCIpO1xuICAgICAqL1xuICAgIHNoYXJlU2NvcmVNZXNzYWdlKHNjb3JlLCB0aXRsZSwgdXJsKSB7XG4gICAgICAgIGlmIChpc1dlQ2hhdCkge1xuICAgICAgICAgICAgLy8gdmFyIHNoYXJlQ2FudmFzID0gd3guY3JlYXRlQ2FudmFzKCk7XG4gICAgICAgICAgICAvLyBzaGFyZUNhbnZhcy53aWR0aCA9IDY2ODtcbiAgICAgICAgICAgIC8vIHNoYXJlQ2FudmFzLmhlaWdodCA9IDUwMTtcbiAgICAgICAgICAgIC8vIHZhciBjb250ZXh0ID0gc2hhcmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgICAgIC8vIGNvbnRleHQuZm9udCA9IFwiYm9sZCAyMDBweCBWZXJkYW5hXCI7IC8v57KX5L2T5a2XXG4gICAgICAgICAgICAvLyBjb250ZXh0LmZpbGxTdHlsZSA9IFwiQmxhY2tcIjtcbiAgICAgICAgICAgIC8vIGNvbnRleHQudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgICAgICAgIC8vIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHNoYXJlQ2FudmFzLndpZHRoLCBzaGFyZUNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIHNjb3JlTnVtID0gc2NvcmUgKyBcIlwiO1xuICAgICAgICAgICAgLy8gdmFyIHNoYXJlSW1nID0gd3guY3JlYXRlSW1hZ2UoKTtcbiAgICAgICAgICAgIC8vIHNoYXJlSW1nLnNyYyA9IGNjLnVybC5yYXcodXJsKTtcbiAgICAgICAgICAgIHZhciBzaGFyZVRpdGxlID0gdGl0bGUgPyB0aXRsZSA6IFwi5pys5bGA5b6X5LqGXCIgKyBzY29yZU51bSArIFwi5YiG77yM5rKh5pyJ5Yqe5rOV77yM5oiR5bCx5piv6L+Z5LmI5by65aSn77yBXCI7XG4gICAgICAgICAgICAvLyBzaGFyZUltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBjb250ZXh0LmRyYXdJbWFnZShzaGFyZUltZywgMCwgMCwgc2hhcmVDYW52YXMud2lkdGgsIHNoYXJlQ2FudmFzLmhlaWdodCk7XG4gICAgICAgICAgICAvLyBsZXQgdGltZWlkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBsZXQgcGF0aCA9IHNoYXJlQ2FudmFzLnRvVGVtcEZpbGVQYXRoU3lzYygpO1xuICAgICAgICAgICAgd3guc2hhcmVBcHBNZXNzYWdlKHsgdGl0bGU6IHNoYXJlVGl0bGUsIGltYWdlVXJsOiBjYy51cmwucmF3KHVybCksIH0pO1xuICAgICAgICAgICAgLy8gY2xlYXJUaW1lb3V0KHRpbWVpZCk7XG4gICAgICAgICAgICAvLyB9LCAwLjIpO1xuICAgICAgICAgICAgLy8gfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaXQncyBub3Qgd2VjaGF0IHBsYXRmb3JtLiBzaGFyZVNjb3JlTWVzc2FnZSBmYWllZCFcIik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZGVzYzog5re75Yqg5LqM57u056CB5pu05aSa5ri45oiP55WM6Z2iXG4gICAgICogcGFyYW3vvJogcHJlZmFicy3kuoznu7TnoIHmm7TlpJrmuLjmiI/nlYzpnaLpooTliLbkvZMgcGFyZW50Tm9kZS3niLboioLngrnvvIzpu5jorqTnlLvluIPoioLngrkgeCx55Z2Q5qCHXG4gICAgICovXG5cbiAgICBhZGRScUNvZGVWaWV3KHByZWZhYnMsIHBhcmVudE5vZGUsIHgsIHkpIHtcbiAgICAgICAgaWYgKHRydWUgfHwgaXNXZUNoYXQpIHtcbiAgICAgICAgICAgIGxldCBwb3N4ID0geCA/IHggOiAwO1xuICAgICAgICAgICAgbGV0IHBvc3kgPSB5ID8geSA6IDA7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYnMpO1xuICAgICAgICAgICAgaWYgKHBhcmVudE5vZGUgIT0gbnVsbCAmJiBjYy5pc1ZhbGlkKHBhcmVudE5vZGUpKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlID0gY2MuZmluZChcIkNhbnZhc1wiKTtcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKHBvc3gsIHBvc3kpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJpdCdzIG5vdCB3ZWNoYXQgcGxhdGZvcm0uIGFkZFJxQ29kZVZpZXcgZmFpZWQhXCIpO1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkZXNjOiAgICDmmL7npLrmnIDov5HmjpLooYzmppzkv6Hmga9cbiAgICAgKiBwYXJhbTogICBwYXJlbnROb2RlLeeItuiKgueCuSAgcmFua3R5cGUt5o6S6KGM5qac57G75Z6LLCBvYmplY3Qt5Zue6LCD5a+56LGhXG4gICAgICogIFxuICAgICAqL1xuICAgIHNob3dGcmllbmRSYW5rVmlldyhwYXJlbnROb2RlLCByYW5rdHlwZSwgb2JqZWN0KSB7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHBhcmVudE5vZGUgeyrniLboioLngrl9XG4gICAgICogQHBhcmFtIHJhbmt0eXBlIHsq576k5o6S6KGM5qac57G75Z6L77yM6buY6K6kMe+8jOaaguaXtuWPquaciTF9XG4gICAgICogQHBhcmFtIG9iamVjdCB7KuWbnuiwg+WvueixoX0gXG4gICAgICovXG4gICAgc2hvd0dyb3VwUmFua1ZpZXcocGFyZW50Tm9kZSwgcmFua3R5cGUsIG9iamVjdCkge1xuXG4gICAgfSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2hhcmVTZGs7XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/Wxlife.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8fd3eIEt5VPG7r1OkVzTLWV', 'Wxlife');
// Script/common/Wxlife.js

"use strict";

var _event_listener = _interopRequireDefault(require("./event_listener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import data from '../dataStatistics/Data';
var Utils = require("Utils");

window.EVENT_LISTENER = (0, _event_listener["default"])({});
var wxIsBackGround = false;
window.firstGame = true;
window.firststart = false;
window.getdata = false;
window.need_add = false;
window.firstshare = false;
window.firstvideo = false;
var time = 0;
cc.view.enableRetina(true);

if (typeof wx != "undefined") {
  wx.onHide(function () {
    // console.log("==========wx HIDE==============");
    wxIsBackGround = true;

    if (window.getdata) {
      Utils.setSaveData();
    }

    time = new Date().getTime();
  });
  wx.onShow(function (res) {
    // console.log("==========wx SHOW==============");
    if (!wxIsBackGround) {} else {
      //其他时间隐藏显示更新界
      Utils.resumBgmMusic();
      var endtime = new Date().getTime();
      EVENT_LISTENER.fire(window.ON_SHOW_BACK, endtime - time);
    }

    if (res.query.group) {
      window.SHOW_RES = res;
      EVENT_LISTENER.fire(window.GAME_RANK_LISTENER);
    }
  });
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29tbW9uL1d4bGlmZS5qcyJdLCJuYW1lcyI6WyJVdGlscyIsInJlcXVpcmUiLCJ3aW5kb3ciLCJFVkVOVF9MSVNURU5FUiIsInd4SXNCYWNrR3JvdW5kIiwiZmlyc3RHYW1lIiwiZmlyc3RzdGFydCIsImdldGRhdGEiLCJuZWVkX2FkZCIsImZpcnN0c2hhcmUiLCJmaXJzdHZpZGVvIiwidGltZSIsImNjIiwidmlldyIsImVuYWJsZVJldGluYSIsInd4Iiwib25IaWRlIiwic2V0U2F2ZURhdGEiLCJEYXRlIiwiZ2V0VGltZSIsIm9uU2hvdyIsInJlcyIsInJlc3VtQmdtTXVzaWMiLCJlbmR0aW1lIiwiZmlyZSIsIk9OX1NIT1dfQkFDSyIsInF1ZXJ5IiwiZ3JvdXAiLCJTSE9XX1JFUyIsIkdBTUVfUkFOS19MSVNURU5FUiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBO0FBQ0EsSUFBSUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsT0FBRCxDQUFuQjs7QUFDQUMsTUFBTSxDQUFDQyxjQUFQLEdBQXdCLGdDQUFjLEVBQWQsQ0FBeEI7QUFDQSxJQUFJQyxjQUFjLEdBQUcsS0FBckI7QUFDQUYsTUFBTSxDQUFDRyxTQUFQLEdBQW1CLElBQW5CO0FBQ0FILE1BQU0sQ0FBQ0ksVUFBUCxHQUFvQixLQUFwQjtBQUNBSixNQUFNLENBQUNLLE9BQVAsR0FBaUIsS0FBakI7QUFDQUwsTUFBTSxDQUFDTSxRQUFQLEdBQWtCLEtBQWxCO0FBQ0FOLE1BQU0sQ0FBQ08sVUFBUCxHQUFvQixLQUFwQjtBQUNBUCxNQUFNLENBQUNRLFVBQVAsR0FBb0IsS0FBcEI7QUFDQSxJQUFJQyxJQUFJLEdBQUcsQ0FBWDtBQUNBQyxFQUFFLENBQUNDLElBQUgsQ0FBUUMsWUFBUixDQUFxQixJQUFyQjs7QUFDQSxJQUFJLE9BQVFDLEVBQVIsSUFBZSxXQUFuQixFQUFnQztBQUM1QkEsRUFBQUEsRUFBRSxDQUFDQyxNQUFILENBQVUsWUFBTTtBQUNaO0FBQ0FaLElBQUFBLGNBQWMsR0FBRyxJQUFqQjs7QUFDQSxRQUFJRixNQUFNLENBQUNLLE9BQVgsRUFBb0I7QUFDaEJQLE1BQUFBLEtBQUssQ0FBQ2lCLFdBQU47QUFDSDs7QUFDRE4sSUFBQUEsSUFBSSxHQUFHLElBQUlPLElBQUosR0FBV0MsT0FBWCxFQUFQO0FBQ0gsR0FQRDtBQVNBSixFQUFBQSxFQUFFLENBQUNLLE1BQUgsQ0FBVSxVQUFDQyxHQUFELEVBQVM7QUFDZjtBQUNBLFFBQUksQ0FBQ2pCLGNBQUwsRUFBcUIsQ0FFcEIsQ0FGRCxNQUVPO0FBQUM7QUFDSkosTUFBQUEsS0FBSyxDQUFDc0IsYUFBTjtBQUNBLFVBQUlDLE9BQU8sR0FBRyxJQUFJTCxJQUFKLEdBQVdDLE9BQVgsRUFBZDtBQUNBaEIsTUFBQUEsY0FBYyxDQUFDcUIsSUFBZixDQUFvQnRCLE1BQU0sQ0FBQ3VCLFlBQTNCLEVBQXlDRixPQUFPLEdBQUdaLElBQW5EO0FBQ0g7O0FBRUQsUUFBSVUsR0FBRyxDQUFDSyxLQUFKLENBQVVDLEtBQWQsRUFBcUI7QUFDakJ6QixNQUFBQSxNQUFNLENBQUMwQixRQUFQLEdBQWtCUCxHQUFsQjtBQUNBbEIsTUFBQUEsY0FBYyxDQUFDcUIsSUFBZixDQUFvQnRCLE1BQU0sQ0FBQzJCLGtCQUEzQjtBQUNIO0FBQ0osR0FkRDtBQWVIIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRMaXN0ZW5lciBmcm9tICcuL2V2ZW50X2xpc3RlbmVyJztcbi8vIGltcG9ydCBkYXRhIGZyb20gJy4uL2RhdGFTdGF0aXN0aWNzL0RhdGEnO1xudmFyIFV0aWxzID0gcmVxdWlyZShcIlV0aWxzXCIpO1xud2luZG93LkVWRU5UX0xJU1RFTkVSID0gRXZlbnRMaXN0ZW5lcih7fSk7XG5sZXQgd3hJc0JhY2tHcm91bmQgPSBmYWxzZTtcbndpbmRvdy5maXJzdEdhbWUgPSB0cnVlO1xud2luZG93LmZpcnN0c3RhcnQgPSBmYWxzZTtcbndpbmRvdy5nZXRkYXRhID0gZmFsc2U7XG53aW5kb3cubmVlZF9hZGQgPSBmYWxzZTtcbndpbmRvdy5maXJzdHNoYXJlID0gZmFsc2U7XG53aW5kb3cuZmlyc3R2aWRlbyA9IGZhbHNlO1xubGV0IHRpbWUgPSAwO1xuY2Mudmlldy5lbmFibGVSZXRpbmEodHJ1ZSk7XG5pZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHd4Lm9uSGlkZSgoKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiPT09PT09PT09PXd4IEhJREU9PT09PT09PT09PT09PVwiKTtcbiAgICAgICAgd3hJc0JhY2tHcm91bmQgPSB0cnVlO1xuICAgICAgICBpZiAod2luZG93LmdldGRhdGEpIHtcbiAgICAgICAgICAgIFV0aWxzLnNldFNhdmVEYXRhKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIH0pO1xuXG4gICAgd3gub25TaG93KChyZXMpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCI9PT09PT09PT09d3ggU0hPVz09PT09PT09PT09PT09XCIpO1xuICAgICAgICBpZiAoIXd4SXNCYWNrR3JvdW5kKSB7XG5cbiAgICAgICAgfSBlbHNlIHsvL+WFtuS7luaXtumXtOmakOiXj+aYvuekuuabtOaWsOeVjFxuICAgICAgICAgICAgVXRpbHMucmVzdW1CZ21NdXNpYygpO1xuICAgICAgICAgICAgbGV0IGVuZHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIEVWRU5UX0xJU1RFTkVSLmZpcmUod2luZG93Lk9OX1NIT1dfQkFDSywgZW5kdGltZSAtIHRpbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlcy5xdWVyeS5ncm91cCkge1xuICAgICAgICAgICAgd2luZG93LlNIT1dfUkVTID0gcmVzO1xuICAgICAgICAgICAgRVZFTlRfTElTVEVORVIuZmlyZSh3aW5kb3cuR0FNRV9SQU5LX0xJU1RFTkVSKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/event_listener.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c0e844NcElKPp+0tkp+hKuL', 'event_listener');
// Script/common/event_listener.js

"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var EventListenr = function EventListenr(obj) {
  var that = {};

  obj.on = function (name, method, target) {
    if (!that.hasOwnProperty(name)) {
      that[name] = [];
    }

    var handler = {};
    handler.func = method;
    handler.target = target;
    that[name].push(handler); // console.log("global on-",name, that);
  };

  obj.fire = function (name) {
    if (that.hasOwnProperty(name)) {
      var handlerList = that[name];

      for (var i = 0; i < handlerList.length; i++) {
        var handler = handlerList[i];
        var args = [];

        for (var j = 1; j < arguments.length; j++) {
          args.push(arguments[j]);
        }

        if (handler.func) handler.func.apply(handler.target, args);else trace("[Warn] 没有对应的回调事件类型 - " + name);
      }
    }
  };

  obj.off = function (name, target) {
    // console.log("try to off "+ name, that)
    if (that.hasOwnProperty(name)) {
      var handlerList = that[name]; // console.log("try to off "+ name + "have num"+handlerList.length);

      for (var i = 0; i < handlerList.length; i++) {
        var handler = handlerList[i];

        if (handler.target === target) {
          // console.log("delete -" + target + name);
          handlerList.splice(i, 1);
        }
      }
    }
  };

  return obj;
};

var _default = EventListenr;
exports["default"] = _default;
module.exports = exports["default"];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29tbW9uL2V2ZW50X2xpc3RlbmVyLmpzIl0sIm5hbWVzIjpbIkV2ZW50TGlzdGVuciIsIm9iaiIsInRoYXQiLCJvbiIsIm5hbWUiLCJtZXRob2QiLCJ0YXJnZXQiLCJoYXNPd25Qcm9wZXJ0eSIsImhhbmRsZXIiLCJmdW5jIiwicHVzaCIsImZpcmUiLCJoYW5kbGVyTGlzdCIsImkiLCJsZW5ndGgiLCJhcmdzIiwiaiIsImFyZ3VtZW50cyIsImFwcGx5IiwidHJhY2UiLCJvZmYiLCJzcGxpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBVUMsR0FBVixFQUFlO0FBQ2hDLE1BQUlDLElBQUksR0FBRyxFQUFYOztBQUNBRCxFQUFBQSxHQUFHLENBQUNFLEVBQUosR0FBUyxVQUFVQyxJQUFWLEVBQWdCQyxNQUFoQixFQUF3QkMsTUFBeEIsRUFBZ0M7QUFDckMsUUFBSSxDQUFDSixJQUFJLENBQUNLLGNBQUwsQ0FBb0JILElBQXBCLENBQUwsRUFBZ0M7QUFDNUJGLE1BQUFBLElBQUksQ0FBQ0UsSUFBRCxDQUFKLEdBQWEsRUFBYjtBQUNIOztBQUNELFFBQUlJLE9BQU8sR0FBRyxFQUFkO0FBQ0FBLElBQUFBLE9BQU8sQ0FBQ0MsSUFBUixHQUFlSixNQUFmO0FBQ0FHLElBQUFBLE9BQU8sQ0FBQ0YsTUFBUixHQUFpQkEsTUFBakI7QUFFQUosSUFBQUEsSUFBSSxDQUFDRSxJQUFELENBQUosQ0FBV00sSUFBWCxDQUFnQkYsT0FBaEIsRUFScUMsQ0FTckM7QUFDSCxHQVZEOztBQVdBUCxFQUFBQSxHQUFHLENBQUNVLElBQUosR0FBVyxVQUFVUCxJQUFWLEVBQWdCO0FBQ3ZCLFFBQUlGLElBQUksQ0FBQ0ssY0FBTCxDQUFvQkgsSUFBcEIsQ0FBSixFQUErQjtBQUMzQixVQUFJUSxXQUFXLEdBQUdWLElBQUksQ0FBQ0UsSUFBRCxDQUF0Qjs7QUFDQSxXQUFLLElBQUlTLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdELFdBQVcsQ0FBQ0UsTUFBaEMsRUFBd0NELENBQUMsRUFBekMsRUFBNkM7QUFDekMsWUFBSUwsT0FBTyxHQUFHSSxXQUFXLENBQUNDLENBQUQsQ0FBekI7QUFDQSxZQUFJRSxJQUFJLEdBQUcsRUFBWDs7QUFDQSxhQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdDLFNBQVMsQ0FBQ0gsTUFBOUIsRUFBc0NFLENBQUMsRUFBdkMsRUFBMkM7QUFDdkNELFVBQUFBLElBQUksQ0FBQ0wsSUFBTCxDQUFVTyxTQUFTLENBQUNELENBQUQsQ0FBbkI7QUFDSDs7QUFDRCxZQUFJUixPQUFPLENBQUNDLElBQVosRUFDSUQsT0FBTyxDQUFDQyxJQUFSLENBQWFTLEtBQWIsQ0FBbUJWLE9BQU8sQ0FBQ0YsTUFBM0IsRUFBbUNTLElBQW5DLEVBREosS0FHSUksS0FBSyxDQUFDLDBCQUEwQmYsSUFBM0IsQ0FBTDtBQUVQO0FBQ0o7QUFDSixHQWhCRDs7QUFpQkFILEVBQUFBLEdBQUcsQ0FBQ21CLEdBQUosR0FBVSxVQUFVaEIsSUFBVixFQUFlRSxNQUFmLEVBQXVCO0FBQzdCO0FBQ0EsUUFBSUosSUFBSSxDQUFDSyxjQUFMLENBQW9CSCxJQUFwQixDQUFKLEVBQStCO0FBQzNCLFVBQUlRLFdBQVcsR0FBR1YsSUFBSSxDQUFDRSxJQUFELENBQXRCLENBRDJCLENBRTNCOztBQUNBLFdBQUssSUFBSVMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0QsV0FBVyxDQUFDRSxNQUFoQyxFQUF3Q0QsQ0FBQyxFQUF6QyxFQUE2QztBQUN6QyxZQUFJTCxPQUFPLEdBQUdJLFdBQVcsQ0FBQ0MsQ0FBRCxDQUF6Qjs7QUFDQSxZQUFHTCxPQUFPLENBQUNGLE1BQVIsS0FBbUJBLE1BQXRCLEVBQTZCO0FBQ3pCO0FBQ0FNLFVBQUFBLFdBQVcsQ0FBQ1MsTUFBWixDQUFtQlIsQ0FBbkIsRUFBcUIsQ0FBckI7QUFDSDtBQUNKO0FBQ0o7QUFDSixHQWJEOztBQWNBLFNBQU9aLEdBQVA7QUFDSCxDQTdDRDs7ZUE4Q2VEIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBFdmVudExpc3RlbnIgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBvYmoub24gPSBmdW5jdGlvbiAobmFtZSwgbWV0aG9kLCB0YXJnZXQpIHtcbiAgICAgICAgaWYgKCF0aGF0Lmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgICB0aGF0W25hbWVdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhhbmRsZXIgPSB7fTtcbiAgICAgICAgaGFuZGxlci5mdW5jID0gbWV0aG9kO1xuICAgICAgICBoYW5kbGVyLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgXG4gICAgICAgIHRoYXRbbmFtZV0ucHVzaChoYW5kbGVyKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJnbG9iYWwgb24tXCIsbmFtZSwgdGhhdCk7XG4gICAgfTtcbiAgICBvYmouZmlyZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIGlmICh0aGF0Lmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgICBsZXQgaGFuZGxlckxpc3QgPSB0aGF0W25hbWVdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoYW5kbGVyTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBoYW5kbGVyID0gaGFuZGxlckxpc3RbaV07XG4gICAgICAgICAgICAgICAgbGV0IGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IGFyZ3VtZW50cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2pdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGhhbmRsZXIuZnVuYylcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlci5mdW5jLmFwcGx5KGhhbmRsZXIudGFyZ2V0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRyYWNlKFwiW1dhcm5dIOayoeacieWvueW6lOeahOWbnuiwg+S6i+S7tuexu+WeiyAtIFwiICsgbmFtZSlcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBvYmoub2ZmID0gZnVuY3Rpb24gKG5hbWUsdGFyZ2V0KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwidHJ5IHRvIG9mZiBcIisgbmFtZSwgdGhhdClcbiAgICAgICAgaWYgKHRoYXQuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICAgIGxldCBoYW5kbGVyTGlzdCA9IHRoYXRbbmFtZV07XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInRyeSB0byBvZmYgXCIrIG5hbWUgKyBcImhhdmUgbnVtXCIraGFuZGxlckxpc3QubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGFuZGxlckxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgaGFuZGxlciA9IGhhbmRsZXJMaXN0W2ldXG4gICAgICAgICAgICAgICAgaWYoaGFuZGxlci50YXJnZXQgPT09IHRhcmdldCl7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZGVsZXRlIC1cIiArIHRhcmdldCArIG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyTGlzdC5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBvYmo7XG59O1xuZXhwb3J0IGRlZmF1bHQgRXZlbnRMaXN0ZW5yOyJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/launch.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '258ccpxWURAypXp2UAOUMHy', 'launch');
// Script/common/launch.js

"use strict";

// import Data from './Common_Data';
var ShareSdk = require("ShareSdk");

var Utils = require("Utils");

var RankList = require('RankList');

cc.Class({
  "extends": cc.Component,
  properties: {
    m_sp_rank_mask: cc.Node,
    display: cc.Sprite,
    //刷新排行榜显示的sprite
    rankCloseBtn: cc.Node,
    //返回主视图按钮
    playGameBtn: cc.Node,
    //开始游戏按钮
    groudGameBtn: cc.Node //查看群排行按钮

  },
  start: function start() {
    // this.isGroudBtn = true;
    this.tex = new cc.Texture2D();
    this.display.node.active = false;
    this.m_sp_rank_mask.active = false;
    this.isShow = false;
    EVENT_LISTENER.on(window.GAME_RANK_LISTENER, this.rankUpdate, this);
    this.isshowtrue = true;
    this.rankUpdate();
  },
  onEnable: function onEnable() {
    this.rankUpdate();
  },
  onDisable: function onDisable() {
    window.SHOW_RES = null;
  },
  onDestroy: function onDestroy() {
    EVENT_LISTENER.off(window.GAME_RANK_LISTENER, this);
  },
  rankUpdate: function rankUpdate() {
    if (window.SHOW_RES && window.SHOW_RES.query.group) {
      this.ShowGroudRankClick({
        query: window.SHOW_RES.query,
        shareTicket: window.SHOW_RES.shareTicket
      });
      if (this.isshowtrue) window.SHOW_RES = null;
    }
  },
  //查看好友排行按键事件
  onClick: function onClick() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    this.rankCloseBtn.active = true;
    this.groudGameBtn.active = true;
    this.isShow = true;
    if (window.GAME_MENU) window.GAME_MENU.showAdBanner(false); // console.log("点击，发消息给子域");

    this.display.node.active = this.isShow;
    this.m_sp_rank_mask.active = this.isShow; // var masScoreStr = window.INIT_GAME_SAVE_DATA.top_level;
    // RankList.setScore(masScoreStr,
    //     (info) => {
    //         console.log("保存游戏信息成功！", info);
    //     },
    //     () => {
    //         console.log("保存游戏信息失败！");
    //     },
    //     (info) => {
    //         console.log("保存游戏信息已完成！", info);
    //     }
    // );

    RankList.showFriendList();
  },
  //查看群排行按键事件
  onGroudBtnClick: function onGroudBtnClick() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1); // Data.share(EChannelPrefix.grouprank, "group=2");

    ShareSdk.shareAppMessage({
      title: "我已经消灭了N个怪兽了，你呢？快来看看排名",
      imageUrl: window.tempFileURL[1],
      query: "group=2",
      success: function success(res) {},
      fail: function fail(err) {},
      complate: function complate(msg) {}
    });
  },
  //返回主视图事件
  onCloseClick: function onCloseClick() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    this.isShow = false;
    this.display.node.active = false;
    this.m_sp_rank_mask.active = this.isShow;
    this.playGameBtn.active = false;
    this.groudGameBtn.active = false;
    this.rankCloseBtn.active = false;
    if (window.GAME_MENU) window.GAME_MENU.showAdBanner(true);
  },
  //开始游戏按键
  onPlayGameClick: function onPlayGameClick() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1); // console.log("===============onPlayGameClick================");

    this.isShow = false;
    cc.director.loadScene(window.GAME_SCENE_NAME);
  },
  //刷新排行榜显示
  _updaetSubDomainCanvas: function _updaetSubDomainCanvas() {
    if (!this.tex) {
      return;
    }

    this.tex.initWithElement(sharedCanvas);
    this.tex.handleLoadedTexture();
    this.display.spriteFrame = new cc.SpriteFrame(this.tex);
  },
  update: function update(dt) {
    // this.ShowGroudRankClick();
    if (typeof wx != "undefined") this._updaetSubDomainCanvas();
  },
  ShowGroudRankClick: function ShowGroudRankClick(event) {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    if (window.GAME_MENU) window.GAME_MENU.showAdBanner(false);

    if (event.query && event.shareTicket) {
      // console.log("=============ShowGroudRankClick================");
      // var masScoreStr = window.INIT_GAME_SAVE_DATA.top;
      // RankList.setScore(masScoreStr,
      //     (info) => {
      //         console.log("保存游戏信息成功！", info);
      //     },
      //     () => {
      //         console.log("保存游戏信息失败！");
      //     },
      //     (info) => {
      //         console.log("保存游戏信息已完成！", info);
      //     }
      // );
      RankList.showGroupList(event.shareTicket);
      this.isShow = true;
      this.display.node.active = this.isShow;
      this.m_sp_rank_mask.active = this.isShow;
      this.rankCloseBtn.active = true;
      this.playGameBtn.active = false;
      this.groudGameBtn.active = false;
    }
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29tbW9uL2xhdW5jaC5qcyJdLCJuYW1lcyI6WyJTaGFyZVNkayIsInJlcXVpcmUiLCJVdGlscyIsIlJhbmtMaXN0IiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJtX3NwX3JhbmtfbWFzayIsIk5vZGUiLCJkaXNwbGF5IiwiU3ByaXRlIiwicmFua0Nsb3NlQnRuIiwicGxheUdhbWVCdG4iLCJncm91ZEdhbWVCdG4iLCJzdGFydCIsInRleCIsIlRleHR1cmUyRCIsIm5vZGUiLCJhY3RpdmUiLCJpc1Nob3ciLCJFVkVOVF9MSVNURU5FUiIsIm9uIiwid2luZG93IiwiR0FNRV9SQU5LX0xJU1RFTkVSIiwicmFua1VwZGF0ZSIsImlzc2hvd3RydWUiLCJvbkVuYWJsZSIsIm9uRGlzYWJsZSIsIlNIT1dfUkVTIiwib25EZXN0cm95Iiwib2ZmIiwicXVlcnkiLCJncm91cCIsIlNob3dHcm91ZFJhbmtDbGljayIsInNoYXJlVGlja2V0Iiwib25DbGljayIsIlNldFNvdW5kRWZmZWN0IiwiQlVUVE9OX0NMSUNLX01VU0lDIiwiR0FNRV9NRU5VIiwic2hvd0FkQmFubmVyIiwic2hvd0ZyaWVuZExpc3QiLCJvbkdyb3VkQnRuQ2xpY2siLCJzaGFyZUFwcE1lc3NhZ2UiLCJ0aXRsZSIsImltYWdlVXJsIiwidGVtcEZpbGVVUkwiLCJzdWNjZXNzIiwicmVzIiwiZmFpbCIsImVyciIsImNvbXBsYXRlIiwibXNnIiwib25DbG9zZUNsaWNrIiwib25QbGF5R2FtZUNsaWNrIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJHQU1FX1NDRU5FX05BTUUiLCJfdXBkYWV0U3ViRG9tYWluQ2FudmFzIiwiaW5pdFdpdGhFbGVtZW50Iiwic2hhcmVkQ2FudmFzIiwiaGFuZGxlTG9hZGVkVGV4dHVyZSIsInNwcml0ZUZyYW1lIiwiU3ByaXRlRnJhbWUiLCJ1cGRhdGUiLCJkdCIsInd4IiwiZXZlbnQiLCJzaG93R3JvdXBMaXN0Il0sIm1h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QztBQUVsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBaEMsTUFBQUEsUUFBUSxDQUFDaUUsYUFBVCxDQUF1QkQsS0FBSyxDQUFDaEMsV0FBN0I7QUFDQSxXQUFLZixNQUFMLEdBQWMsSUFBZDtBQUNBLFdBQUtWLE9BQUwsQ0FBYVEsSUFBYixDQUFrQkMsTUFBbEIsR0FBMkIsS0FBS0MsTUFBaEM7QUFDQSxXQUFLWixjQUFMLENBQW9CVyxNQUFwQixHQUE2QixLQUFLQyxNQUFsQztBQUNBLFdBQUtSLFlBQUwsQ0FBa0JPLE1BQWxCLEdBQTJCLElBQTNCO0FBQ0EsV0FBS04sV0FBTCxDQUFpQk0sTUFBakIsR0FBMEIsS0FBMUI7QUFDQSxXQUFLTCxZQUFMLENBQWtCSyxNQUFsQixHQUEyQixLQUEzQjtBQUNIO0FBQ0o7QUF0SkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IERhdGEgZnJvbSAnLi9Db21tb25fRGF0YSc7XG52YXIgU2hhcmVTZGsgPSByZXF1aXJlKFwiU2hhcmVTZGtcIik7XG52YXIgVXRpbHMgPSByZXF1aXJlKFwiVXRpbHNcIik7XG52YXIgUmFua0xpc3QgPSByZXF1aXJlKCdSYW5rTGlzdCcpO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbV9zcF9yYW5rX21hc2s6IGNjLk5vZGUsXG4gICAgICAgIGRpc3BsYXk6IGNjLlNwcml0ZSwgICAgICAgIC8v5Yi35paw5o6S6KGM5qac5pi+56S655qEc3ByaXRlXG4gICAgICAgIHJhbmtDbG9zZUJ0bjogY2MuTm9kZSwgICAgIC8v6L+U5Zue5Li76KeG5Zu+5oyJ6ZKuXG4gICAgICAgIHBsYXlHYW1lQnRuOiBjYy5Ob2RlLCAgICAgIC8v5byA5aeL5ri45oiP5oyJ6ZKuXG4gICAgICAgIGdyb3VkR2FtZUJ0bjogY2MuTm9kZSwgICAgIC8v5p+l55yL576k5o6S6KGM5oyJ6ZKuXG4gICAgfSxcblxuICAgIHN0YXJ0KCkge1xuICAgICAgICAvLyB0aGlzLmlzR3JvdWRCdG4gPSB0cnVlO1xuXG4gICAgICAgIHRoaXMudGV4ID0gbmV3IGNjLlRleHR1cmUyRCgpO1xuICAgICAgICB0aGlzLmRpc3BsYXkubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tX3NwX3JhbmtfbWFzay5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1Nob3cgPSBmYWxzZTtcbiAgICAgICAgRVZFTlRfTElTVEVORVIub24od2luZG93LkdBTUVfUkFOS19MSVNURU5FUiwgdGhpcy5yYW5rVXBkYXRlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5pc3Nob3d0cnVlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yYW5rVXBkYXRlKCk7XG4gICAgfSxcblxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICB0aGlzLnJhbmtVcGRhdGUoKTtcbiAgICB9LFxuXG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIHdpbmRvdy5TSE9XX1JFUyA9IG51bGw7XG4gICAgfSxcblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgRVZFTlRfTElTVEVORVIub2ZmKHdpbmRvdy5HQU1FX1JBTktfTElTVEVORVIsIHRoaXMpO1xuICAgIH0sXG5cbiAgICByYW5rVXBkYXRlKCkge1xuICAgICAgICBpZiAod2luZG93LlNIT1dfUkVTICYmIHdpbmRvdy5TSE9XX1JFUy5xdWVyeS5ncm91cCkge1xuICAgICAgICAgICAgdGhpcy5TaG93R3JvdWRSYW5rQ2xpY2soeyBxdWVyeTogd2luZG93LlNIT1dfUkVTLnF1ZXJ5LCBzaGFyZVRpY2tldDogd2luZG93LlNIT1dfUkVTLnNoYXJlVGlja2V0IH0pO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNzaG93dHJ1ZSlcbiAgICAgICAgICAgICAgICB3aW5kb3cuU0hPV19SRVMgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8v5p+l55yL5aW95Y+L5o6S6KGM5oyJ6ZSu5LqL5Lu2XG4gICAgb25DbGljaygpIHtcbiAgICAgICAgVXRpbHMuU2V0U291bmRFZmZlY3Qod2luZG93LkJVVFRPTl9DTElDS19NVVNJQywgZmFsc2UsIDEpO1xuICAgICAgICB0aGlzLnJhbmtDbG9zZUJ0bi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmdyb3VkR2FtZUJ0bi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzU2hvdyA9IHRydWU7XG4gICAgICAgIGlmKHdpbmRvdy5HQU1FX01FTlUpIHdpbmRvdy5HQU1FX01FTlUuc2hvd0FkQmFubmVyKGZhbHNlKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLngrnlh7vvvIzlj5Hmtojmga/nu5nlrZDln59cIik7XG4gICAgICAgIHRoaXMuZGlzcGxheS5ub2RlLmFjdGl2ZSA9IHRoaXMuaXNTaG93O1xuICAgICAgICB0aGlzLm1fc3BfcmFua19tYXNrLmFjdGl2ZSA9IHRoaXMuaXNTaG93O1xuICAgICAgICAvLyB2YXIgbWFzU2NvcmVTdHIgPSB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS50b3BfbGV2ZWw7XG4gICAgICAgIC8vIFJhbmtMaXN0LnNldFNjb3JlKG1hc1Njb3JlU3RyLFxuICAgICAgICAvLyAgICAgKGluZm8pID0+IHtcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIuS/neWtmOa4uOaIj+S/oeaBr+aIkOWKn++8gVwiLCBpbmZvKTtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICAoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCLkv53lrZjmuLjmiI/kv6Hmga/lpLHotKXvvIFcIik7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgKGluZm8pID0+IHtcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIuS/neWtmOa4uOaIj+S/oeaBr+W3suWujOaIkO+8gVwiLCBpbmZvKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gKTtcblxuICAgICAgICBSYW5rTGlzdC5zaG93RnJpZW5kTGlzdCgpO1xuICAgIH0sXG4gICAgLy/mn6XnnIvnvqTmjpLooYzmjInplK7kuovku7ZcbiAgICBvbkdyb3VkQnRuQ2xpY2soKSB7XG4gICAgICAgIFV0aWxzLlNldFNvdW5kRWZmZWN0KHdpbmRvdy5CVVRUT05fQ0xJQ0tfTVVTSUMsIGZhbHNlLCAxKTtcbiAgICAgICAgLy8gRGF0YS5zaGFyZShFQ2hhbm5lbFByZWZpeC5ncm91cHJhbmssIFwiZ3JvdXA9MlwiKTtcbiAgICAgICAgU2hhcmVTZGsuc2hhcmVBcHBNZXNzYWdlKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIuaIkeW3sue7j+a2iOeBreS6hk7kuKrmgKrlhb3kuobvvIzkvaDlkaLvvJ/lv6vmnaXnnIvnnIvmjpLlkI1cIixcbiAgICAgICAgICAgIGltYWdlVXJsOiB3aW5kb3cudGVtcEZpbGVVUkxbMV0sXG4gICAgICAgICAgICBxdWVyeTogXCJncm91cD0yXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbXBsYXRlOiBtc2cgPT4ge1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgLy/ov5Tlm57kuLvop4blm77kuovku7ZcbiAgICBvbkNsb3NlQ2xpY2soKSB7XG4gICAgICAgIFV0aWxzLlNldFNvdW5kRWZmZWN0KHdpbmRvdy5CVVRUT05fQ0xJQ0tfTVVTSUMsIGZhbHNlLCAxKTtcbiAgICAgICAgdGhpcy5pc1Nob3cgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kaXNwbGF5Lm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubV9zcF9yYW5rX21hc2suYWN0aXZlID0gdGhpcy5pc1Nob3c7XG4gICAgICAgIHRoaXMucGxheUdhbWVCdG4uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ3JvdWRHYW1lQnRuLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJhbmtDbG9zZUJ0bi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaWYod2luZG93LkdBTUVfTUVOVSkgd2luZG93LkdBTUVfTUVOVS5zaG93QWRCYW5uZXIodHJ1ZSk7XG4gICAgfSxcbiAgICAvL+W8gOWni+a4uOaIj+aMiemUrlxuICAgIG9uUGxheUdhbWVDbGljaygpIHtcbiAgICAgICAgVXRpbHMuU2V0U291bmRFZmZlY3Qod2luZG93LkJVVFRPTl9DTElDS19NVVNJQywgZmFsc2UsIDEpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PW9uUGxheUdhbWVDbGljaz09PT09PT09PT09PT09PT1cIik7XG4gICAgICAgIHRoaXMuaXNTaG93ID0gZmFsc2U7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSh3aW5kb3cuR0FNRV9TQ0VORV9OQU1FKTtcbiAgICB9LFxuICAgIC8v5Yi35paw5o6S6KGM5qac5pi+56S6XG4gICAgX3VwZGFldFN1YkRvbWFpbkNhbnZhcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRleCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGV4LmluaXRXaXRoRWxlbWVudChzaGFyZWRDYW52YXMpO1xuICAgICAgICB0aGlzLnRleC5oYW5kbGVMb2FkZWRUZXh0dXJlKCk7XG4gICAgICAgIHRoaXMuZGlzcGxheS5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0aGlzLnRleCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICAvLyB0aGlzLlNob3dHcm91ZFJhbmtDbGljaygpO1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgICAgIHRoaXMuX3VwZGFldFN1YkRvbWFpbkNhbnZhcygpO1xuICAgIH0sXG5cblxuICAgIFNob3dHcm91ZFJhbmtDbGljayhldmVudCkge1xuICAgICAgICBVdGlscy5TZXRTb3VuZEVmZmVjdCh3aW5kb3cuQlVUVE9OX0NMSUNLX01VU0lDLCBmYWxzZSwgMSk7XG4gICAgICAgIGlmKHdpbmRvdy5HQU1FX01FTlUpIHdpbmRvdy5HQU1FX01FTlUuc2hvd0FkQmFubmVyKGZhbHNlKTtcbiAgICAgICAgaWYgKGV2ZW50LnF1ZXJ5ICYmIGV2ZW50LnNoYXJlVGlja2V0KSB7XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PVNob3dHcm91ZFJhbmtDbGljaz09PT09PT09PT09PT09PT1cIik7XG4gICAgICAgICAgICAvLyB2YXIgbWFzU2NvcmVTdHIgPSB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS50b3A7XG4gICAgICAgICAgICAvLyBSYW5rTGlzdC5zZXRTY29yZShtYXNTY29yZVN0cixcbiAgICAgICAgICAgIC8vICAgICAoaW5mbykgPT4ge1xuICAgICAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIuS/neWtmOa4uOaIj+S/oeaBr+aIkOWKn++8gVwiLCBpbmZvKTtcbiAgICAgICAgICAgIC8vICAgICB9LFxuICAgICAgICAgICAgLy8gICAgICgpID0+IHtcbiAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCLkv53lrZjmuLjmiI/kv6Hmga/lpLHotKXvvIFcIik7XG4gICAgICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgICAgIC8vICAgICAoaW5mbykgPT4ge1xuICAgICAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIuS/neWtmOa4uOaIj+S/oeaBr+W3suWujOaIkO+8gVwiLCBpbmZvKTtcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyApO1xuICAgICAgICAgICAgUmFua0xpc3Quc2hvd0dyb3VwTGlzdChldmVudC5zaGFyZVRpY2tldCk7XG4gICAgICAgICAgICB0aGlzLmlzU2hvdyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkubm9kZS5hY3RpdmUgPSB0aGlzLmlzU2hvdztcbiAgICAgICAgICAgIHRoaXMubV9zcF9yYW5rX21hc2suYWN0aXZlID0gdGhpcy5pc1Nob3c7XG4gICAgICAgICAgICB0aGlzLnJhbmtDbG9zZUJ0bi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wbGF5R2FtZUJ0bi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZ3JvdWRHYW1lQnRuLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxufSk7Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/Common_CommonUtil.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ebb13d72ThG1bdnQlyELKRv', 'Common_CommonUtil');
// Script/common/Common_CommonUtil.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Common_CommonUtil = /** @class */ (function () {
    function Common_CommonUtil() {
    }
    Common_CommonUtil.isWeChat = function () {
        return cc.sys.platform == cc.sys.WECHAT_GAME;
    };
    Common_CommonUtil.showTips = function (content, hideCallback) {
        cc.loader.loadRes("common/prefabs/h5game_Tips", function (err, prefab) {
            if (err) {
                cc.error(err);
                return;
            }
            var obj = cc.instantiate(prefab);
            obj.getComponent("h5game_Tips").setText(content, hideCallback);
            obj.parent = cc.director.getScene();
            //obj.position = cc.v2(0,0);
        });
    };
    Common_CommonUtil.showShareFailTips = function () {
        Common_CommonUtil.getPrefab("prefabs/n_sharebubble", function (obj) {
            obj.parent = cc.find("Canvas") || cc.director.getScene().children[0];
            obj.zIndex = 1 << 11;
        });
    };
    Common_CommonUtil.shakeScreen = function (targetNode, deltaTime, offset) {
        if (deltaTime === void 0) { deltaTime = 0.02; }
        if (offset === void 0) { offset = 10; }
        var camera = targetNode;
        camera.stopAllActions();
        //camera.position = cc.Vec2.ZERO;
        camera.runAction(cc.sequence(cc.moveBy(deltaTime, cc.v2(offset * 2, 0)), cc.moveBy(deltaTime * 2, cc.v2(-offset * 4)), cc.moveBy(deltaTime, cc.v2(offset * 2)), cc.moveBy(deltaTime, cc.v2(0, offset * 2)), cc.moveBy(deltaTime * 2, cc.v2(0, -offset * 4)), cc.moveBy(deltaTime, cc.v2(0, offset * 2)), cc.moveBy(deltaTime, cc.v2(offset, 0)), cc.moveBy(deltaTime * 2, cc.v2(-offset * 2, 0)), cc.moveBy(deltaTime, cc.v2(offset, 0)), cc.moveBy(deltaTime, cc.v2(0, offset)), cc.moveBy(deltaTime * 2, cc.v2(0, -offset * 2)), cc.moveBy(deltaTime, cc.v2(0, offset))));
    };
    Common_CommonUtil.fitScreen = function () {
        var canvas = cc.director.getScene().getComponentInChildren(cc.Canvas);
        var screenSize = cc.view.getVisibleSize();
        if (screenSize.width / screenSize.height < 9 / 16) {
            canvas.fitWidth = true;
            canvas.fitHeight = false;
        }
        else {
            canvas.fitWidth = false;
            canvas.fitHeight = true;
        }
    };
    Common_CommonUtil.resetScale = function (targetNode) {
        var screenSize = cc.view.getVisibleSize();
        if (screenSize.width / screenSize.height < 9 / 16) {
            targetNode.scale = screenSize.width / 1080; //适配宽度
        }
        else {
            targetNode.scale = screenSize.height / 1920; //适配高度
        }
    };
    Common_CommonUtil.imgStr = function (str) {
        return str;
    };
    Common_CommonUtil.txtStr = function (str) {
        return str;
    };
    //获取启动参数
    Common_CommonUtil.getLaunchParams = function () {
        var parseParams = function (str) {
            if (!str)
                return null;
            str = str.substr(1);
            var params = {};
            var arr = str.split("&");
            for (var i = 0; i < arr.length; i++) {
                var kv = arr[i].split("=");
                params[kv[0]] = kv[1];
            }
            if (params.token && params.userId && params.gameId && params.serverHost)
                return params;
            else
                return null;
        };
        if (cc.sys.isNative) { //内生平台
            return null;
        }
        else if (Common_CommonUtil.isWeChat()) { //微信平台
            var params = wx.getLaunchOptionsSync().query;
            if (params.token && params.userId && params.gameId && params.serverHost)
                return params;
            return null;
        }
        else //h5通过url获取
         {
            var url = window.location.href;
            var paramStr = null;
            var startIndex = url.lastIndexOf("?");
            if (startIndex >= 0)
                paramStr = url.substring(startIndex);
            return parseParams(paramStr);
        }
    };
    Common_CommonUtil.preview = function () {
        if (!Common_CommonUtil.isWeChat())
            return;
        wx.previewImage({
            urls: ["https://h5gameres.kuaiyugo.com/chatgame/cocos_games_res/images/codeImage.jpg"]
        });
    };
    /**
    * 为节点或sprite设置SpriteFrame
    * @param {string|cc.Node|cc.Sprite} obj node，sprite或其路径
    * @param {string } imageUrl 资源路径
    */
    Common_CommonUtil.setSprite = function (obj, imageUrl, callback) {
        if (imageUrl === void 0) { imageUrl = ""; }
        if (callback === void 0) { callback = null; }
        if (!obj)
            throw new Error("请传入正确的节点名称");
        if (!imageUrl)
            throw new Error("请传入正确的资源路径");
        var spr;
        if (obj instanceof cc.Sprite) //参数为Sprite
            spr = obj;
        else if (obj instanceof cc.Node) //参数为Node
            spr = obj.getComponent(cc.Sprite);
        else if (Object.prototype.toString.call(obj) === "[object String]") //参数为string(sprite所在Node的路径)
            spr = cc.find(obj).getComponent(cc.Sprite);
        else
            throw new Error("传入节点资源类型不正确");
        if (!spr)
            throw new Error("未找到正确的Sprite");
        if (!spr || !spr.spriteFrame)
            return;
        var opacity = spr.node.opacity;
        spr.node.opacity = 0;
        // cc.loader.loadRes(imageUrl, function (err, obj) {
        //     if (err) {
        //         cc.error(err.message || err);
        //         return;
        //     }
        //     spr.spriteFrame = new cc.SpriteFrame(obj);
        //     spr.node.opacity = opacity;
        // });
        var methodName = "load";
        if (imageUrl.indexOf("http") != 0)
            methodName += "Res";
        cc.loader[methodName](imageUrl, function (err, obj) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            spr.spriteFrame = new cc.SpriteFrame(obj);
            spr.node.opacity = opacity;
            if (callback)
                callback();
        });
    };
    Common_CommonUtil.getPrefab = function (url, callback) {
        cc.loader.loadRes(url, function (err, prefab) {
            if (err)
                throw err;
            callback(cc.instantiate(prefab));
        });
    };
    Common_CommonUtil.setAvatarSprite = function (spriteOrNode, imgUrl) {
        var sprite = null;
        if (spriteOrNode instanceof cc.Sprite)
            sprite = spriteOrNode;
        else if (spriteOrNode instanceof cc.Node)
            sprite = spriteOrNode.getComponent(cc.Sprite);
        if (!sprite)
            throw new Error("CommonUtil.setSprite:  无法找到正确的Sprite");
        var image = wx.createImage();
        image.onload = function () {
            var texture = new cc.Texture2D();
            texture.initWithElement(image);
            texture.handleLoadedTexture();
            sprite.spriteFrame = new cc.SpriteFrame(texture);
        };
        image.src = imgUrl;
    };
    return Common_CommonUtil;
}());
exports.default = Common_CommonUtil;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29tbW9uL0NvbW1vbl9Db21tb25VdGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtJQUFBO0lBb05BLENBQUM7SUFsTlUsMEJBQVEsR0FBZjtRQUNJLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7SUFDakQsQ0FBQztJQUVNLDBCQUFRLEdBQWYsVUFBZ0IsT0FBTyxFQUFFLFlBQVk7UUFDakMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsNEJBQTRCLEVBQUUsVUFBQyxHQUFHLEVBQUUsTUFBTTtZQUN4RCxJQUFJLEdBQUcsRUFBRTtnQkFDTCxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLE9BQU87YUFDVjtZQUNELElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakMsR0FBRyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQy9ELEdBQUcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQyw0QkFBNEI7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sbUNBQWlCLEdBQXhCO1FBQ0ksaUJBQWlCLENBQUMsU0FBUyxDQUFDLHVCQUF1QixFQUFFLFVBQUMsR0FBRztZQUNyRCxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckUsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLDZCQUFXLEdBQWxCLFVBQW1CLFVBQVUsRUFBRSxTQUF3QixFQUFFLE1BQW1CO1FBQTdDLDBCQUFBLEVBQUEsZ0JBQXdCO1FBQUUsdUJBQUEsRUFBQSxXQUFtQjtRQUN4RSxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUM7UUFDeEIsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLGlDQUFpQztRQUNqQyxNQUFNLENBQUMsU0FBUyxDQUNaLEVBQUUsQ0FBQyxRQUFRLENBQ1AsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQzFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQzVDLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBRXZDLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUMxQyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDL0MsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBRTFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQ3RDLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUMvQyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUV0QyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUN0QyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDL0MsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FDekMsQ0FDSixDQUFBO0lBQ0wsQ0FBQztJQUVNLDJCQUFTLEdBQWhCO1FBQ0ksSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEUsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMxQyxJQUFJLFVBQVUsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQy9DLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1NBQzVCO2FBQ0k7WUFDRCxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN4QixNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFYSw0QkFBVSxHQUF4QixVQUF5QixVQUFtQjtRQUN4QyxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFDLElBQUksVUFBVSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDL0MsVUFBVSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFBLE1BQU07U0FDcEQ7YUFDSTtZQUNELFVBQVUsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQSxNQUFNO1NBQ3JEO0lBQ0wsQ0FBQztJQVVNLHdCQUFNLEdBQWIsVUFBYyxHQUFHO1FBQ2IsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRU0sd0JBQU0sR0FBYixVQUFjLEdBQUc7UUFDYixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRCxRQUFRO0lBQ0QsaUNBQWUsR0FBdEI7UUFDSSxJQUFJLFdBQVcsR0FBRyxVQUFDLEdBQUc7WUFDbEIsSUFBSSxDQUFDLEdBQUc7Z0JBQ0osT0FBTyxJQUFJLENBQUM7WUFDaEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDekIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pDLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDekI7WUFDRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxVQUFVO2dCQUNuRSxPQUFPLE1BQU0sQ0FBQzs7Z0JBRWQsT0FBTyxJQUFJLENBQUM7UUFDcEIsQ0FBQyxDQUFDO1FBRUYsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFDLE1BQU07WUFDeEIsT0FBTyxJQUFJLENBQUM7U0FDZjthQUNJLElBQUksaUJBQWlCLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBQyxNQUFNO1lBQzFDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUM3QyxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxVQUFVO2dCQUNuRSxPQUFPLE1BQU0sQ0FBQztZQUNsQixPQUFPLElBQUksQ0FBQztTQUNmO2FBQ0csV0FBVztTQUNmO1lBQ0ksSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDL0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEMsSUFBSSxVQUFVLElBQUksQ0FBQztnQkFDZixRQUFRLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN6QyxPQUFPLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNoQztJQUNMLENBQUM7SUFFTSx5QkFBTyxHQUFkO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRTtZQUM3QixPQUFPO1FBQ1gsRUFBRSxDQUFDLFlBQVksQ0FBQztZQUNaLElBQUksRUFBRSxDQUFDLDhFQUE4RSxDQUFDO1NBQ3pGLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7OztNQUlFO0lBQ0ssMkJBQVMsR0FBaEIsVUFBaUIsR0FBRyxFQUFFLFFBQXFCLEVBQUUsUUFBeUI7UUFBaEQseUJBQUEsRUFBQSxhQUFxQjtRQUFFLHlCQUFBLEVBQUEsZUFBeUI7UUFDbEUsSUFBSSxDQUFDLEdBQUc7WUFDSixNQUFNLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRO1lBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsQyxJQUFJLEdBQUcsQ0FBQztRQUNSLElBQUksR0FBRyxZQUFZLEVBQUUsQ0FBQyxNQUFNLEVBQXdCLFdBQVc7WUFDM0QsR0FBRyxHQUFHLEdBQUcsQ0FBQzthQUNULElBQUksR0FBRyxZQUFZLEVBQUUsQ0FBQyxJQUFJLEVBQXFCLFNBQVM7WUFDekQsR0FBRyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2pDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGlCQUFpQixFQUFDLDRCQUE0QjtZQUMzRixHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztZQUUzQyxNQUFNLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxHQUFHO1lBQ0osTUFBTSxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVc7WUFDeEIsT0FBTztRQUNYLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQy9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNyQixvREFBb0Q7UUFDcEQsaUJBQWlCO1FBQ2pCLHdDQUF3QztRQUN4QyxrQkFBa0I7UUFDbEIsUUFBUTtRQUNSLGlEQUFpRDtRQUNqRCxrQ0FBa0M7UUFDbEMsTUFBTTtRQUVOLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQztRQUN4QixJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUM3QixVQUFVLElBQUksS0FBSyxDQUFDO1FBQ3hCLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxFQUFFLFVBQVUsR0FBRyxFQUFFLEdBQUc7WUFDOUMsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QixPQUFPO2FBQ1Y7WUFDRCxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDM0IsSUFBSSxRQUFRO2dCQUNSLFFBQVEsRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVhLDJCQUFTLEdBQXZCLFVBQXdCLEdBQVcsRUFBRSxRQUFrQjtRQUNuRCxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsVUFBQyxHQUFHLEVBQUUsTUFBTTtZQUMvQixJQUFJLEdBQUc7Z0JBQ0gsTUFBTSxHQUFHLENBQUM7WUFDZCxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVhLGlDQUFlLEdBQTdCLFVBQThCLFlBQVksRUFBRSxNQUFNO1FBQzlDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLFlBQVksWUFBWSxFQUFFLENBQUMsTUFBTTtZQUNqQyxNQUFNLEdBQUcsWUFBWSxDQUFDO2FBQ3JCLElBQUksWUFBWSxZQUFZLEVBQUUsQ0FBQyxJQUFJO1lBQ3BDLE1BQU0sR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsTUFBTTtZQUNQLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUU1RCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0IsS0FBSyxDQUFDLE1BQU0sR0FBRztZQUNYLElBQUksT0FBTyxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsT0FBTyxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDOUIsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDO1FBQ0YsS0FBSyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FwTkEsQUFvTkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbW9uX0NvbW1vblV0aWwge1xuXG4gICAgc3RhdGljIGlzV2VDaGF0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5XRUNIQVRfR0FNRTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2hvd1RpcHMoY29udGVudCwgaGlkZUNhbGxiYWNrKSB7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwiY29tbW9uL3ByZWZhYnMvaDVnYW1lX1RpcHNcIiwgKGVyciwgcHJlZmFiKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgb2JqID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcbiAgICAgICAgICAgIG9iai5nZXRDb21wb25lbnQoXCJoNWdhbWVfVGlwc1wiKS5zZXRUZXh0KGNvbnRlbnQsIGhpZGVDYWxsYmFjayk7XG4gICAgICAgICAgICBvYmoucGFyZW50ID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKTtcbiAgICAgICAgICAgIC8vb2JqLnBvc2l0aW9uID0gY2MudjIoMCwwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNob3dTaGFyZUZhaWxUaXBzKCkge1xuICAgICAgICBDb21tb25fQ29tbW9uVXRpbC5nZXRQcmVmYWIoXCJwcmVmYWJzL25fc2hhcmVidWJibGVcIiwgKG9iaikgPT4ge1xuICAgICAgICAgICAgb2JqLnBhcmVudCA9IGNjLmZpbmQoXCJDYW52YXNcIikgfHwgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5jaGlsZHJlblswXTtcbiAgICAgICAgICAgIG9iai56SW5kZXggPSAxIDw8IDExO1xuICAgICAgICB9KVxuICAgIH1cbiAgICBcbiAgICBzdGF0aWMgc2hha2VTY3JlZW4odGFyZ2V0Tm9kZSwgZGVsdGFUaW1lOiBudW1iZXIgPSAwLjAyLCBvZmZzZXQ6IG51bWJlciA9IDEwKSB7XG4gICAgICAgIHZhciBjYW1lcmEgPSB0YXJnZXROb2RlO1xuICAgICAgICBjYW1lcmEuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgLy9jYW1lcmEucG9zaXRpb24gPSBjYy5WZWMyLlpFUk87XG4gICAgICAgIGNhbWVyYS5ydW5BY3Rpb24oXG4gICAgICAgICAgICBjYy5zZXF1ZW5jZShcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoZGVsdGFUaW1lLCBjYy52MihvZmZzZXQgKiAyLCAwKSksXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KGRlbHRhVGltZSAqIDIsIGNjLnYyKC1vZmZzZXQgKiA0KSksXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KGRlbHRhVGltZSwgY2MudjIob2Zmc2V0ICogMikpLFxuXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KGRlbHRhVGltZSwgY2MudjIoMCwgb2Zmc2V0ICogMikpLFxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeShkZWx0YVRpbWUgKiAyLCBjYy52MigwLCAtb2Zmc2V0ICogNCkpLFxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeShkZWx0YVRpbWUsIGNjLnYyKDAsIG9mZnNldCAqIDIpKSxcblxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeShkZWx0YVRpbWUsIGNjLnYyKG9mZnNldCwgMCkpLFxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeShkZWx0YVRpbWUgKiAyLCBjYy52Migtb2Zmc2V0ICogMiwgMCkpLFxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeShkZWx0YVRpbWUsIGNjLnYyKG9mZnNldCwgMCkpLFxuXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KGRlbHRhVGltZSwgY2MudjIoMCwgb2Zmc2V0KSksXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KGRlbHRhVGltZSAqIDIsIGNjLnYyKDAsIC1vZmZzZXQgKiAyKSksXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KGRlbHRhVGltZSwgY2MudjIoMCwgb2Zmc2V0KSksXG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICB9XG5cbiAgICBzdGF0aWMgZml0U2NyZWVuKCkge1xuICAgICAgICB2YXIgY2FudmFzID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkNhbnZhcyk7XG4gICAgICAgIHZhciBzY3JlZW5TaXplID0gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpO1xuICAgICAgICBpZiAoc2NyZWVuU2l6ZS53aWR0aCAvIHNjcmVlblNpemUuaGVpZ2h0IDwgOSAvIDE2KSB7XG4gICAgICAgICAgICBjYW52YXMuZml0V2lkdGggPSB0cnVlO1xuICAgICAgICAgICAgY2FudmFzLmZpdEhlaWdodCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2FudmFzLmZpdFdpZHRoID0gZmFsc2U7XG4gICAgICAgICAgICBjYW52YXMuZml0SGVpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmVzZXRTY2FsZSh0YXJnZXROb2RlOiBjYy5Ob2RlKSB7XG4gICAgICAgIHZhciBzY3JlZW5TaXplID0gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpO1xuICAgICAgICBpZiAoc2NyZWVuU2l6ZS53aWR0aCAvIHNjcmVlblNpemUuaGVpZ2h0IDwgOSAvIDE2KSB7XG4gICAgICAgICAgICB0YXJnZXROb2RlLnNjYWxlID0gc2NyZWVuU2l6ZS53aWR0aCAvIDEwODA7Ly/pgILphY3lrr3luqZcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldE5vZGUuc2NhbGUgPSBzY3JlZW5TaXplLmhlaWdodCAvIDE5MjA7Ly/pgILphY3pq5jluqZcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5pi+56S65bm/5ZGKKOS8oOWFpeW9k+WJjea4uOaIj+WQjeensO+8jOS+v+S6jue7n+iuoeWIhuexuylcbiAgICAgKi9cbiAgICBzdGF0aWMgc2hvd0FEOiAoZ2FtZU5hbWUpID0+IHtcblxuICAgIH1cblxuICAgIHN0YXRpYyBpbWdTdHIoc3RyKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgc3RhdGljIHR4dFN0cihzdHIpIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICAvL+iOt+WPluWQr+WKqOWPguaVsFxuICAgIHN0YXRpYyBnZXRMYXVuY2hQYXJhbXMoKSB7XG4gICAgICAgIGxldCBwYXJzZVBhcmFtcyA9IChzdHIpID0+IHtcbiAgICAgICAgICAgIGlmICghc3RyKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgc3RyID0gc3RyLnN1YnN0cigxKTtcbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSB7fTtcbiAgICAgICAgICAgIGxldCBhcnIgPSBzdHIuc3BsaXQoXCImXCIpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQga3YgPSBhcnJbaV0uc3BsaXQoXCI9XCIpO1xuICAgICAgICAgICAgICAgIHBhcmFtc1trdlswXV0gPSBrdlsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJhbXMudG9rZW4gJiYgcGFyYW1zLnVzZXJJZCAmJiBwYXJhbXMuZ2FtZUlkICYmIHBhcmFtcy5zZXJ2ZXJIb3N0KVxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkgey8v5YaF55Sf5bmz5Y+wXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChDb21tb25fQ29tbW9uVXRpbC5pc1dlQ2hhdCgpKSB7Ly/lvq7kv6HlubPlj7BcbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSB3eC5nZXRMYXVuY2hPcHRpb25zU3luYygpLnF1ZXJ5O1xuICAgICAgICAgICAgaWYgKHBhcmFtcy50b2tlbiAmJiBwYXJhbXMudXNlcklkICYmIHBhcmFtcy5nYW1lSWQgJiYgcGFyYW1zLnNlcnZlckhvc3QpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UvL2g16YCa6L+HdXJs6I635Y+WXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgICAgICAgIHZhciBwYXJhbVN0ciA9IG51bGw7XG4gICAgICAgICAgICBsZXQgc3RhcnRJbmRleCA9IHVybC5sYXN0SW5kZXhPZihcIj9cIik7XG4gICAgICAgICAgICBpZiAoc3RhcnRJbmRleCA+PSAwKVxuICAgICAgICAgICAgICAgIHBhcmFtU3RyID0gdXJsLnN1YnN0cmluZyhzdGFydEluZGV4KTtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZVBhcmFtcyhwYXJhbVN0cik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgcHJldmlldygpIHtcbiAgICAgICAgaWYgKCFDb21tb25fQ29tbW9uVXRpbC5pc1dlQ2hhdCgpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xuICAgICAgICAgICAgdXJsczogW1wiaHR0cHM6Ly9oNWdhbWVyZXMua3VhaXl1Z28uY29tL2NoYXRnYW1lL2NvY29zX2dhbWVzX3Jlcy9pbWFnZXMvY29kZUltYWdlLmpwZ1wiXVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIOS4uuiKgueCueaIlnNwcml0Zeiuvue9rlNwcml0ZUZyYW1lXG4gICAgKiBAcGFyYW0ge3N0cmluZ3xjYy5Ob2RlfGNjLlNwcml0ZX0gb2JqIG5vZGXvvIxzcHJpdGXmiJblhbbot6/lvoRcbiAgICAqIEBwYXJhbSB7c3RyaW5nIH0gaW1hZ2VVcmwg6LWE5rqQ6Lev5b6EXG4gICAgKi9cbiAgICBzdGF0aWMgc2V0U3ByaXRlKG9iaiwgaW1hZ2VVcmw6IHN0cmluZyA9IFwiXCIsIGNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGwpIHtcbiAgICAgICAgaWYgKCFvYmopXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCLor7fkvKDlhaXmraPnoa7nmoToioLngrnlkI3np7BcIik7XG4gICAgICAgIGlmICghaW1hZ2VVcmwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCLor7fkvKDlhaXmraPnoa7nmoTotYTmupDot6/lvoRcIik7XG4gICAgICAgIHZhciBzcHI7XG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBjYy5TcHJpdGUpICAgICAgICAgICAgICAgICAgICAgICAvL+WPguaVsOS4ulNwcml0ZVxuICAgICAgICAgICAgc3ByID0gb2JqO1xuICAgICAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBjYy5Ob2RlKSAgICAgICAgICAgICAgICAgICAgLy/lj4LmlbDkuLpOb2RlXG4gICAgICAgICAgICBzcHIgPSBvYmouZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSBcIltvYmplY3QgU3RyaW5nXVwiKS8v5Y+C5pWw5Li6c3RyaW5nKHNwcml0ZeaJgOWcqE5vZGXnmoTot6/lvoQpXG4gICAgICAgICAgICBzcHIgPSBjYy5maW5kKG9iaikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIuS8oOWFpeiKgueCuei1hOa6kOexu+Wei+S4jeato+ehrlwiKTtcbiAgICAgICAgaWYgKCFzcHIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCLmnKrmib7liLDmraPnoa7nmoRTcHJpdGVcIik7XG4gICAgICAgIGlmICghc3ByIHx8ICFzcHIuc3ByaXRlRnJhbWUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBvcGFjaXR5ID0gc3ByLm5vZGUub3BhY2l0eTtcbiAgICAgICAgc3ByLm5vZGUub3BhY2l0eSA9IDA7XG4gICAgICAgIC8vIGNjLmxvYWRlci5sb2FkUmVzKGltYWdlVXJsLCBmdW5jdGlvbiAoZXJyLCBvYmopIHtcbiAgICAgICAgLy8gICAgIGlmIChlcnIpIHtcbiAgICAgICAgLy8gICAgICAgICBjYy5lcnJvcihlcnIubWVzc2FnZSB8fCBlcnIpO1xuICAgICAgICAvLyAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIHNwci5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZShvYmopO1xuICAgICAgICAvLyAgICAgc3ByLm5vZGUub3BhY2l0eSA9IG9wYWNpdHk7XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIGxldCBtZXRob2ROYW1lID0gXCJsb2FkXCI7XG4gICAgICAgIGlmIChpbWFnZVVybC5pbmRleE9mKFwiaHR0cFwiKSAhPSAwKVxuICAgICAgICAgICAgbWV0aG9kTmFtZSArPSBcIlJlc1wiO1xuICAgICAgICBjYy5sb2FkZXJbbWV0aG9kTmFtZV0oaW1hZ2VVcmwsIGZ1bmN0aW9uIChlcnIsIG9iaikge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNjLmVycm9yKGVyci5tZXNzYWdlIHx8IGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3ByLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKG9iaik7XG4gICAgICAgICAgICBzcHIubm9kZS5vcGFjaXR5ID0gb3BhY2l0eTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYih1cmw6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHVybCwgKGVyciwgcHJlZmFiKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIGNhbGxiYWNrKGNjLmluc3RhbnRpYXRlKHByZWZhYikpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc2V0QXZhdGFyU3ByaXRlKHNwcml0ZU9yTm9kZSwgaW1nVXJsKSB7XG4gICAgICAgIGxldCBzcHJpdGUgPSBudWxsO1xuICAgICAgICBpZiAoc3ByaXRlT3JOb2RlIGluc3RhbmNlb2YgY2MuU3ByaXRlKVxuICAgICAgICAgICAgc3ByaXRlID0gc3ByaXRlT3JOb2RlO1xuICAgICAgICBlbHNlIGlmIChzcHJpdGVPck5vZGUgaW5zdGFuY2VvZiBjYy5Ob2RlKVxuICAgICAgICAgICAgc3ByaXRlID0gc3ByaXRlT3JOb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuXG4gICAgICAgIGlmICghc3ByaXRlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29tbW9uVXRpbC5zZXRTcHJpdGU6ICDml6Dms5Xmib7liLDmraPnoa7nmoRTcHJpdGVcIik7XG5cbiAgICAgICAgbGV0IGltYWdlID0gd3guY3JlYXRlSW1hZ2UoKTtcbiAgICAgICAgaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IHRleHR1cmUgPSBuZXcgY2MuVGV4dHVyZTJEKCk7XG4gICAgICAgICAgICB0ZXh0dXJlLmluaXRXaXRoRWxlbWVudChpbWFnZSk7XG4gICAgICAgICAgICB0ZXh0dXJlLmhhbmRsZUxvYWRlZFRleHR1cmUoKTtcbiAgICAgICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcbiAgICAgICAgfTtcbiAgICAgICAgaW1hZ2Uuc3JjID0gaW1nVXJsO1xuICAgIH1cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/BgSetting.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '49ca5JK7uVAzoTD1isE+1TU', 'BgSetting');
// Script/common/BgSetting.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  start: function start() {
    var size = cc.winSize;
    var content = this.node.getContentSize();
    this.node.scaleX = size.width / content.width;
    this.node.scaleY = size.height / content.height; // this.node.position = cc.v2(0,0);

    window.adapt_scaleX = this.node.scaleX;
    window.adapt_scaleY = this.node.scaleY;
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29tbW9uL0JnU2V0dGluZy5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInN0YXJ0Iiwic2l6ZSIsIndpblNpemUiLCJjb250ZW50Iiwibm9kZSIsImdldENvbnRlbnRTaXplIiwic2NhbGVYIiwid2lkdGgiLCJzY2FsZVkiLCJoZWlnaHQiLCJ3aW5kb3ciLCJhZGFwdF9zY2FsZVgiLCJhZGFwdF9zY2FsZVkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRSxFQUhQO0FBTUxDLEVBQUFBLEtBTkssbUJBTUU7QUFDSCxRQUFJQyxJQUFJLEdBQUdMLEVBQUUsQ0FBQ00sT0FBZDtBQUNBLFFBQUlDLE9BQU8sR0FBRyxLQUFLQyxJQUFMLENBQVVDLGNBQVYsRUFBZDtBQUNBLFNBQUtELElBQUwsQ0FBVUUsTUFBVixHQUFtQkwsSUFBSSxDQUFDTSxLQUFMLEdBQWFKLE9BQU8sQ0FBQ0ksS0FBeEM7QUFDQSxTQUFLSCxJQUFMLENBQVVJLE1BQVYsR0FBbUJQLElBQUksQ0FBQ1EsTUFBTCxHQUFjTixPQUFPLENBQUNNLE1BQXpDLENBSkcsQ0FLSDs7QUFDQUMsSUFBQUEsTUFBTSxDQUFDQyxZQUFQLEdBQXNCLEtBQUtQLElBQUwsQ0FBVUUsTUFBaEM7QUFDQUksSUFBQUEsTUFBTSxDQUFDRSxZQUFQLEdBQXNCLEtBQUtSLElBQUwsQ0FBVUksTUFBaEM7QUFDSDtBQWRJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICB9LFxuXG4gICAgc3RhcnQoKXtcbiAgICAgICAgbGV0IHNpemUgPSBjYy53aW5TaXplXG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCk7XG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSBzaXplLndpZHRoIC8gY29udGVudC53aWR0aDtcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWSA9IHNpemUuaGVpZ2h0IC8gY29udGVudC5oZWlnaHQ7XG4gICAgICAgIC8vIHRoaXMubm9kZS5wb3NpdGlvbiA9IGNjLnYyKDAsMCk7XG4gICAgICAgIHdpbmRvdy5hZGFwdF9zY2FsZVggPSB0aGlzLm5vZGUuc2NhbGVYO1xuICAgICAgICB3aW5kb3cuYWRhcHRfc2NhbGVZID0gdGhpcy5ub2RlLnNjYWxlWTtcbiAgICB9LFxufSk7XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/shader/ccShader_wave.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ba386OeeWFMXZpyuzJR95fV', 'ccShader_wave');
// Script/common/shader/ccShader_wave.js

"use strict";

module.exports = "\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\nvarying vec2 v_texCoord;\nuniform float time;\nuniform vec2 mouse;\nfloat PI = 3.1415926;\n\nfloat _distanceFactor = 100.0;  \nfloat _timeFactor = -30.0;  \nfloat _totalFactor = 1.0;  \nfloat _waveWidth = 0.1;  \nfloat waveSpeed = 0.3;\nvoid main() {\n\tfloat _curWaveDis = time*waveSpeed;\n\t//\u8BA1\u7B97uv\u5230\u9F20\u6807\u70B9\u51FB\u70B9\u7684\u5411\u91CF(\u5411\u5916\u6269\uFF0C\u53CD\u8FC7\u6765\u5C31\u662F\u5411\u91CC\u7F29) \n\tvec2 dv = mouse.xy - v_texCoord.xy;\n\t//\u6309\u7167\u5C4F\u5E55\u957F\u5BBD\u6BD4\u8FDB\u884C\u7F29\u653E\n\tdv = dv*vec2(0.5625,1.0);\n\tfloat dis = sqrt(dv.x * dv.x + dv.y * dv.y);  \n\tfloat sinFactor = sin(dis * _distanceFactor + time * _timeFactor) * _totalFactor * 0.005;  \n\tfloat discardFactor = clamp(_waveWidth - abs(_curWaveDis - dis), 0.0, 1.0) / _waveWidth;\n\tvec2 dv1 = normalize(dv);  \n\t//\u8BA1\u7B97\u6BCF\u4E2A\u50CF\u7D20uv\u7684\u504F\u79FB\u503C  \n\tvec2 offset = dv1  * sinFactor * discardFactor;\n\tvec2 uv = offset+v_texCoord.xy;\n\tgl_FragColor = texture2D(CC_Texture0, uv);\n}\n";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29tbW9uL3NoYWRlci9jY1NoYWRlcl93YXZlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsT0FBUCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPVxuXHRgXG4jaWZkZWYgR0xfRVNcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xuI2VuZGlmXG5cbnZhcnlpbmcgdmVjMiB2X3RleENvb3JkO1xudW5pZm9ybSBmbG9hdCB0aW1lO1xudW5pZm9ybSB2ZWMyIG1vdXNlO1xuZmxvYXQgUEkgPSAzLjE0MTU5MjY7XG5cbmZsb2F0IF9kaXN0YW5jZUZhY3RvciA9IDEwMC4wOyAgXG5mbG9hdCBfdGltZUZhY3RvciA9IC0zMC4wOyAgXG5mbG9hdCBfdG90YWxGYWN0b3IgPSAxLjA7ICBcbmZsb2F0IF93YXZlV2lkdGggPSAwLjE7ICBcbmZsb2F0IHdhdmVTcGVlZCA9IDAuMztcbnZvaWQgbWFpbigpIHtcblx0ZmxvYXQgX2N1cldhdmVEaXMgPSB0aW1lKndhdmVTcGVlZDtcblx0Ly/orqHnrpd1duWIsOm8oOagh+eCueWHu+eCueeahOWQkemHjyjlkJHlpJbmianvvIzlj43ov4fmnaXlsLHmmK/lkJHph4znvKkpIFxuXHR2ZWMyIGR2ID0gbW91c2UueHkgLSB2X3RleENvb3JkLnh5O1xuXHQvL+aMieeFp+Wxj+W5lemVv+WuveavlOi/m+ihjOe8qeaUvlxuXHRkdiA9IGR2KnZlYzIoMC41NjI1LDEuMCk7XG5cdGZsb2F0IGRpcyA9IHNxcnQoZHYueCAqIGR2LnggKyBkdi55ICogZHYueSk7ICBcblx0ZmxvYXQgc2luRmFjdG9yID0gc2luKGRpcyAqIF9kaXN0YW5jZUZhY3RvciArIHRpbWUgKiBfdGltZUZhY3RvcikgKiBfdG90YWxGYWN0b3IgKiAwLjAwNTsgIFxuXHRmbG9hdCBkaXNjYXJkRmFjdG9yID0gY2xhbXAoX3dhdmVXaWR0aCAtIGFicyhfY3VyV2F2ZURpcyAtIGRpcyksIDAuMCwgMS4wKSAvIF93YXZlV2lkdGg7XG5cdHZlYzIgZHYxID0gbm9ybWFsaXplKGR2KTsgIFxuXHQvL+iuoeeul+avj+S4quWDj+e0oHV255qE5YGP56e75YC8ICBcblx0dmVjMiBvZmZzZXQgPSBkdjEgICogc2luRmFjdG9yICogZGlzY2FyZEZhY3Rvcjtcblx0dmVjMiB1diA9IG9mZnNldCt2X3RleENvb3JkLnh5O1xuXHRnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQoQ0NfVGV4dHVyZTAsIHV2KTtcbn1cbmAiXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/shader/ccShader_Default_Vert_noMVP.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0644fQ5ZXFCqq9x2DCKfyIi', 'ccShader_Default_Vert_noMVP');
// Script/common/shader/ccShader_Default_Vert_noMVP.js

"use strict";

module.exports = "\nattribute vec4 a_position;\n attribute vec2 a_texCoord;\n attribute vec4 a_color;\n varying vec2 v_texCoord;\n varying vec4 v_fragmentColor;\n void main()\n {\n     gl_Position = CC_PMatrix  * a_position;\n     v_fragmentColor = a_color;\n     v_texCoord = a_texCoord;\n }\n";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29tbW9uL3NoYWRlci9jY1NoYWRlcl9EZWZhdWx0X1ZlcnRfbm9NVlAuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxPQUFQIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9XG5gXG5hdHRyaWJ1dGUgdmVjNCBhX3Bvc2l0aW9uO1xuIGF0dHJpYnV0ZSB2ZWMyIGFfdGV4Q29vcmQ7XG4gYXR0cmlidXRlIHZlYzQgYV9jb2xvcjtcbiB2YXJ5aW5nIHZlYzIgdl90ZXhDb29yZDtcbiB2YXJ5aW5nIHZlYzQgdl9mcmFnbWVudENvbG9yO1xuIHZvaWQgbWFpbigpXG4ge1xuICAgICBnbF9Qb3NpdGlvbiA9IENDX1BNYXRyaXggICogYV9wb3NpdGlvbjtcbiAgICAgdl9mcmFnbWVudENvbG9yID0gYV9jb2xvcjtcbiAgICAgdl90ZXhDb29yZCA9IGFfdGV4Q29vcmQ7XG4gfVxuYFxuXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/shader/EffectCommon.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0e4batwDktDsKv2pkukBcXZ', 'EffectCommon');
// Script/common/shader/EffectCommon.js

"use strict";

var _default_vert = require("ccShader_Default_Vert");

var _default_vert_no_mvp = require("ccShader_Default_Vert_noMVP");

var _wave = require("ccShader_wave");

var Utils = require("Utils");

cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    var self = this;
    this.parameters = {
      time: 0.0,
      mouse: {
        x: 0.5,
        y: 0.5
      },
      resolution: {
        x: 0.0,
        y: 0.0
      },
      wavewidth: 6 / 108
    };
    this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
      var delta = event.touch.getLocation();
      delta = this.node.convertToNodeSpace(delta);
      this.parameters.mouse.x = delta.x / this.node.getContentSize().width;
      this.parameters.mouse.y = delta.y / this.node.getContentSize().height; // console.log(this.parameters.mouse);

      this.parameters.time = 0.0;
      this.parameters.wavewidth = 40 / this.node.getContentSize().width;
      this.showWave();
    }, this);
    this._show_wave = false;

    self._use();
  },
  showWave: function showWave() {
    this._show_wave = true;
  },
  update: function update(dt) {
    if (this._program && this._show_wave) {
      this._program.use();

      this.updateGLParameters(dt);

      if (cc.sys.isNative) {
        var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
        glProgram_state.setUniformFloat("time", this.parameters.time);
        glProgram_state.setUniformVec2("mouse", this.parameters.mouse);
      } else {
        // this._program.setUniformLocationWith2f(this._resolution, this.parameters.resolution.x, this.parameters.resolution.y);
        this._program.setUniformLocationWith1f(this._time, this.parameters.time);

        this._program.setUniformLocationWith2f(this._mouse, this.parameters.mouse.x, 1.0 - this.parameters.mouse.y);
      }
    }
  },
  updateGLParameters: function updateGLParameters(dt) {
    this.parameters.time += dt; // console.log(this.parameters.time)
    // if (this.parameters.time >= 0.1) this._show_wave = false;
  },
  _use: function _use() {
    this._program = new cc.GLProgram();

    if (cc.sys.isNative) {
      cc.log("use native GLProgram");

      this._program.initWithString(_default_vert_no_mvp, _wave);

      this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);

      this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);

      this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);

      this._program.link();

      this._program.updateUniforms();
    } else {
      this._program.initWithVertexShaderByteArray(_default_vert, _wave);

      this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);

      this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);

      this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);

      this._program.link();

      this._program.updateUniforms();
    }

    if (cc.sys.isNative) {
      var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
      glProgram_state.setUniformFloat("time", this.parameters.time);
      glProgram_state.setUniformVec2("mouse", this.parameters.mouse);
    } else {
      this._time = this._program.getUniformLocationForName("time");
      this._mouse = this._program.getUniformLocationForName("mouse");

      this._program.setUniformLocationWith1f(this._time, this.parameters.time);

      this._program.setUniformLocationWith2f(this._mouse, this.parameters.mouse.x, this.parameters.mouse.y);
    }

    this.setProgram(this.node._sgNode, this._program);
  },
  setProgram: function setProgram(node, program) {
    if (cc.sys.isNative) {
      var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
      node.setGLProgramState(glProgram_state);
    } else {
      node.setShaderProgram(program);
    }

    var children = node.children;
    if (!children) return;

    for (var i = 0; i < children.length; i++) {
      this.setProgram(children[i], program);
    }
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29tbW9uL3NoYWRlci9FZmZlY3RDb21tb24uanMiXSwibmFtZXMiOlsiX2RlZmF1bHRfdmVydCIsInJlcXVpcmUiLCJfZGVmYXVsdF92ZXJ0X25vX212cCIsIl93YXZlIiwiVXRpbHMiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm9uTG9hZCIsInNlbGYiLCJwYXJhbWV0ZXJzIiwidGltZSIsIm1vdXNlIiwieCIsInkiLCJyZXNvbHV0aW9uIiwid2F2ZXdpZHRoIiwibm9kZSIsIm9uIiwiTm9kZSIsIkV2ZW50VHlwZSIsIlRPVUNIX0VORCIsImV2ZW50IiwiZGVsdGEiLCJ0b3VjaCIsImdldExvY2F0aW9uIiwiY29udmVydFRvTm9kZVNwYWNlIiwiZ2V0Q29udGVudFNpemUiLCJ3aWR0aCIsImhlaWdodCIsInNob3dXYXZlIiwiX3Nob3dfd2F2ZSIsIl91c2UiLCJ1cGRhdGUiLCJkdCIsIl9wcm9ncmFtIiwidXNlIiwidXBkYXRlR0xQYXJhbWV0ZXJzIiwic3lzIiwiaXNOYXRpdmUiLCJnbFByb2dyYW1fc3RhdGUiLCJHTFByb2dyYW1TdGF0ZSIsImdldE9yQ3JlYXRlV2l0aEdMUHJvZ3JhbSIsInNldFVuaWZvcm1GbG9hdCIsInNldFVuaWZvcm1WZWMyIiwic2V0VW5pZm9ybUxvY2F0aW9uV2l0aDFmIiwiX3RpbWUiLCJzZXRVbmlmb3JtTG9jYXRpb25XaXRoMmYiLCJfbW91c2UiLCJHTFByb2dyYW0iLCJsb2ciLCJpbml0V2l0aFN0cmluZyIsImFkZEF0dHJpYnV0ZSIsIm1hY3JvIiwiQVRUUklCVVRFX05BTUVfUE9TSVRJT04iLCJWRVJURVhfQVRUUklCX1BPU0lUSU9OIiwiQVRUUklCVVRFX05BTUVfQ09MT1IiLCJWRVJURVhfQVRUUklCX0NPTE9SIiwiQVRUUklCVVRFX05BTUVfVEVYX0NPT1JEIiwiVkVSVEVYX0FUVFJJQl9URVhfQ09PUkRTIiwibGluayIsInVwZGF0ZVVuaWZvcm1zIiwiaW5pdFdpdGhWZXJ0ZXhTaGFkZXJCeXRlQXJyYXkiLCJnZXRVbmlmb3JtTG9jYXRpb25Gb3JOYW1lIiwic2V0UHJvZ3JhbSIsIl9zZ05vZGUiLCJwcm9ncmFtIiwic2V0R0xQcm9ncmFtU3RhdGUiLCJzZXRTaGFkZXJQcm9ncmFtIiwiY2hpbGRyZW4iLCJpIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLGFBQWEsR0FBR0MsT0FBTyxDQUFDLHVCQUFELENBQTNCOztBQUNBLElBQUlDLG9CQUFvQixHQUFHRCxPQUFPLENBQUMsNkJBQUQsQ0FBbEM7O0FBQ0EsSUFBSUUsS0FBSyxHQUFHRixPQUFPLENBQUMsZUFBRCxDQUFuQjs7QUFHQSxJQUFJRyxLQUFLLEdBQUdILE9BQU8sQ0FBQyxPQUFELENBQW5COztBQUNBSSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsRUFIUDtBQU1MQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVk7QUFDaEIsUUFBSUMsSUFBSSxHQUFHLElBQVg7QUFDQSxTQUFLQyxVQUFMLEdBQWtCO0FBQ2RDLE1BQUFBLElBQUksRUFBRSxHQURRO0FBRWRDLE1BQUFBLEtBQUssRUFBRTtBQUNIQyxRQUFBQSxDQUFDLEVBQUUsR0FEQTtBQUVIQyxRQUFBQSxDQUFDLEVBQUU7QUFGQSxPQUZPO0FBTWRDLE1BQUFBLFVBQVUsRUFBRTtBQUNSRixRQUFBQSxDQUFDLEVBQUUsR0FESztBQUVSQyxRQUFBQSxDQUFDLEVBQUU7QUFGSyxPQU5FO0FBVWRFLE1BQUFBLFNBQVMsRUFBRSxJQUFJO0FBVkQsS0FBbEI7QUFZQSxTQUFLQyxJQUFMLENBQVVDLEVBQVYsQ0FBYWQsRUFBRSxDQUFDZSxJQUFILENBQVFDLFNBQVIsQ0FBa0JDLFNBQS9CLEVBQTBDLFVBQVVDLEtBQVYsRUFBaUI7QUFDdkQsVUFBSUMsS0FBSyxHQUFHRCxLQUFLLENBQUNFLEtBQU4sQ0FBWUMsV0FBWixFQUFaO0FB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LENBQUNDLENBQUQsQ0FBeEIsRUFBNkJKLE9BQTdCO0FBREo7QUFFSDtBQS9HSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX2RlZmF1bHRfdmVydCA9IHJlcXVpcmUoXCJjY1NoYWRlcl9EZWZhdWx0X1ZlcnRcIik7XG52YXIgX2RlZmF1bHRfdmVydF9ub19tdnAgPSByZXF1aXJlKFwiY2NTaGFkZXJfRGVmYXVsdF9WZXJ0X25vTVZQXCIpO1xudmFyIF93YXZlID0gcmVxdWlyZShcImNjU2hhZGVyX3dhdmVcIik7XG5cblxudmFyIFV0aWxzID0gcmVxdWlyZShcIlV0aWxzXCIpO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzID0ge1xuICAgICAgICAgICAgdGltZTogMC4wLFxuICAgICAgICAgICAgbW91c2U6IHtcbiAgICAgICAgICAgICAgICB4OiAwLjUsXG4gICAgICAgICAgICAgICAgeTogMC41LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc29sdXRpb246IHtcbiAgICAgICAgICAgICAgICB4OiAwLjAsXG4gICAgICAgICAgICAgICAgeTogMC4wLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdhdmV3aWR0aDogNiAvIDEwOCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBsZXQgZGVsdGEgPSBldmVudC50b3VjaC5nZXRMb2NhdGlvbigpO1xuICAgICAgICAgICAgZGVsdGEgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlKGRlbHRhKTtcbiAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5tb3VzZS54ID0gZGVsdGEueCAvIHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpLndpZHRoO1xuICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLm1vdXNlLnkgPSBkZWx0YS55IC8gdGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCkuaGVpZ2h0O1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wYXJhbWV0ZXJzLm1vdXNlKTtcbiAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy50aW1lID0gMC4wO1xuICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLndhdmV3aWR0aCA9IDQwIC8gdGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCkud2lkdGg7XG4gICAgICAgICAgICB0aGlzLnNob3dXYXZlKCk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB0aGlzLl9zaG93X3dhdmUgPSBmYWxzZTtcbiAgICAgICAgc2VsZi5fdXNlKCk7XG5cbiAgICB9LFxuXG4gICAgc2hvd1dhdmUoKSB7XG4gICAgICAgIHRoaXMuX3Nob3dfd2F2ZSA9IHRydWU7XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLl9wcm9ncmFtICYmIHRoaXMuX3Nob3dfd2F2ZSkge1xuICAgICAgICAgICAgdGhpcy5fcHJvZ3JhbS51c2UoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlR0xQYXJhbWV0ZXJzKGR0KTtcbiAgICAgICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZ2xQcm9ncmFtX3N0YXRlID0gY2MuR0xQcm9ncmFtU3RhdGUuZ2V0T3JDcmVhdGVXaXRoR0xQcm9ncmFtKHRoaXMuX3Byb2dyYW0pO1xuICAgICAgICAgICAgICAgIGdsUHJvZ3JhbV9zdGF0ZS5zZXRVbmlmb3JtRmxvYXQoXCJ0aW1lXCIsIHRoaXMucGFyYW1ldGVycy50aW1lKTtcbiAgICAgICAgICAgICAgICBnbFByb2dyYW1fc3RhdGUuc2V0VW5pZm9ybVZlYzIoXCJtb3VzZVwiLCB0aGlzLnBhcmFtZXRlcnMubW91c2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9wcm9ncmFtLnNldFVuaWZvcm1Mb2NhdGlvbldpdGgyZih0aGlzLl9yZXNvbHV0aW9uLCB0aGlzLnBhcmFtZXRlcnMucmVzb2x1dGlvbi54LCB0aGlzLnBhcmFtZXRlcnMucmVzb2x1dGlvbi55KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wcm9ncmFtLnNldFVuaWZvcm1Mb2NhdGlvbldpdGgxZih0aGlzLl90aW1lLCB0aGlzLnBhcmFtZXRlcnMudGltZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvZ3JhbS5zZXRVbmlmb3JtTG9jYXRpb25XaXRoMmYodGhpcy5fbW91c2UsIHRoaXMucGFyYW1ldGVycy5tb3VzZS54LCAxLjAtdGhpcy5wYXJhbWV0ZXJzLm1vdXNlLnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICB1cGRhdGVHTFBhcmFtZXRlcnMoZHQpIHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnRpbWUgKz0gZHQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucGFyYW1ldGVycy50aW1lKVxuICAgICAgICAvLyBpZiAodGhpcy5wYXJhbWV0ZXJzLnRpbWUgPj0gMC4xKSB0aGlzLl9zaG93X3dhdmUgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgX3VzZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9wcm9ncmFtID0gbmV3IGNjLkdMUHJvZ3JhbSgpO1xuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XG4gICAgICAgICAgICBjYy5sb2coXCJ1c2UgbmF0aXZlIEdMUHJvZ3JhbVwiKTtcbiAgICAgICAgICAgIHRoaXMuX3Byb2dyYW0uaW5pdFdpdGhTdHJpbmcoX2RlZmF1bHRfdmVydF9ub19tdnAsIF93YXZlKTtcbiAgICAgICAgICAgIHRoaXMuX3Byb2dyYW0uYWRkQXR0cmlidXRlKGNjLm1hY3JvLkFUVFJJQlVURV9OQU1FX1BPU0lUSU9OLCBjYy5tYWNyby5WRVJURVhfQVRUUklCX1BPU0lUSU9OKTtcbiAgICAgICAgICAgIHRoaXMuX3Byb2dyYW0uYWRkQXR0cmlidXRlKGNjLm1hY3JvLkFUVFJJQlVURV9OQU1FX0NPTE9SLCBjYy5tYWNyby5WRVJURVhfQVRUUklCX0NPTE9SKTtcbiAgICAgICAgICAgIHRoaXMuX3Byb2dyYW0uYWRkQXR0cmlidXRlKGNjLm1hY3JvLkFUVFJJQlVURV9OQU1FX1RFWF9DT09SRCwgY2MubWFjcm8uVkVSVEVYX0FUVFJJQl9URVhfQ09PUkRTKTtcblxuICAgICAgICAgICAgdGhpcy5fcHJvZ3JhbS5saW5rKCk7XG4gICAgICAgICAgICB0aGlzLl9wcm9ncmFtLnVwZGF0ZVVuaWZvcm1zKCk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuX3Byb2dyYW0uaW5pdFdpdGhWZXJ0ZXhTaGFkZXJCeXRlQXJyYXkoX2RlZmF1bHRfdmVydCwgX3dhdmUpO1xuICAgICAgICAgICAgdGhpcy5fcHJvZ3JhbS5hZGRBdHRyaWJ1dGUoY2MubWFjcm8uQVRUUklCVVRFX05BTUVfUE9TSVRJT04sIGNjLm1hY3JvLlZFUlRFWF9BVFRSSUJfUE9TSVRJT04pO1xuICAgICAgICAgICAgdGhpcy5fcHJvZ3JhbS5hZGRBdHRyaWJ1dGUoY2MubWFjcm8uQVRUUklCVVRFX05BTUVfQ09MT1IsIGNjLm1hY3JvLlZFUlRFWF9BVFRSSUJfQ09MT1IpO1xuICAgICAgICAgICAgdGhpcy5fcHJvZ3JhbS5hZGRBdHRyaWJ1dGUoY2MubWFjcm8uQVRUUklCVVRFX05BTUVfVEVYX0NPT1JELCBjYy5tYWNyby5WRVJURVhfQVRUUklCX1RFWF9DT09SRFMpO1xuXG4gICAgICAgICAgICB0aGlzLl9wcm9ncmFtLmxpbmsoKTtcbiAgICAgICAgICAgIHRoaXMuX3Byb2dyYW0udXBkYXRlVW5pZm9ybXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcbiAgICAgICAgICAgIHZhciBnbFByb2dyYW1fc3RhdGUgPSBjYy5HTFByb2dyYW1TdGF0ZS5nZXRPckNyZWF0ZVdpdGhHTFByb2dyYW0odGhpcy5fcHJvZ3JhbSk7XG4gICAgICAgICAgICBnbFByb2dyYW1fc3RhdGUuc2V0VW5pZm9ybUZsb2F0KFwidGltZVwiLCB0aGlzLnBhcmFtZXRlcnMudGltZSk7XG4gICAgICAgICAgICBnbFByb2dyYW1fc3RhdGUuc2V0VW5pZm9ybVZlYzIoXCJtb3VzZVwiLCB0aGlzLnBhcmFtZXRlcnMubW91c2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdGltZSA9IHRoaXMuX3Byb2dyYW0uZ2V0VW5pZm9ybUxvY2F0aW9uRm9yTmFtZShcInRpbWVcIik7XG4gICAgICAgICAgICB0aGlzLl9tb3VzZSA9IHRoaXMuX3Byb2dyYW0uZ2V0VW5pZm9ybUxvY2F0aW9uRm9yTmFtZShcIm1vdXNlXCIpO1xuICAgICAgICAgICAgdGhpcy5fcHJvZ3JhbS5zZXRVbmlmb3JtTG9jYXRpb25XaXRoMWYodGhpcy5fdGltZSwgdGhpcy5wYXJhbWV0ZXJzLnRpbWUpO1xuICAgICAgICAgICAgdGhpcy5fcHJvZ3JhbS5zZXRVbmlmb3JtTG9jYXRpb25XaXRoMmYodGhpcy5fbW91c2UsIHRoaXMucGFyYW1ldGVycy5tb3VzZS54LCB0aGlzLnBhcmFtZXRlcnMubW91c2UueSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFByb2dyYW0odGhpcy5ub2RlLl9zZ05vZGUsIHRoaXMuX3Byb2dyYW0pO1xuICAgIH0sXG5cbiAgICBzZXRQcm9ncmFtOiBmdW5jdGlvbiAobm9kZSwgcHJvZ3JhbSkge1xuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XG4gICAgICAgICAgICB2YXIgZ2xQcm9ncmFtX3N0YXRlID0gY2MuR0xQcm9ncmFtU3RhdGUuZ2V0T3JDcmVhdGVXaXRoR0xQcm9ncmFtKHByb2dyYW0pO1xuICAgICAgICAgICAgbm9kZS5zZXRHTFByb2dyYW1TdGF0ZShnbFByb2dyYW1fc3RhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5zZXRTaGFkZXJQcm9ncmFtKHByb2dyYW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbjtcbiAgICAgICAgaWYgKCFjaGlsZHJlbilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgdGhpcy5zZXRQcm9ncmFtKGNoaWxkcmVuW2ldLCBwcm9ncmFtKVxuICAgIH1cblxufSk7XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/shader/ccShader_Wave_VH_Frag.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c1487nMlJ5MI52WhD6w5kod', 'ccShader_Wave_VH_Frag');
// Script/common/shader/ccShader_Wave_VH_Frag.js

"use strict";

/* 全局波浪 */
module.exports = "\n#ifdef GL_ES\nprecision mediump float;\n#endif\nvarying vec2 v_texCoord;\nuniform float motion;\nuniform float angle;\nvoid main()\n{\n    vec2 tmp = v_texCoord;\n    tmp.x = tmp.x + 0.01 * sin(motion +  tmp.x * angle);\n    // tmp.y = tmp.y + 0.01 * sin(motion +  tmp.y * angle);\n    gl_FragColor = texture2D(CC_Texture0, tmp);\n    \n}\n";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29tbW9uL3NoYWRlci9jY1NoYWRlcl9XYXZlX1ZIX0ZyYWcuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVBQSxNQUFNLENBQUNDLE9BQVAiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qIOWFqOWxgOazoua1qiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gICAgYFxuI2lmZGVmIEdMX0VTXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcbiNlbmRpZlxudmFyeWluZyB2ZWMyIHZfdGV4Q29vcmQ7XG51bmlmb3JtIGZsb2F0IG1vdGlvbjtcbnVuaWZvcm0gZmxvYXQgYW5nbGU7XG52b2lkIG1haW4oKVxue1xuICAgIHZlYzIgdG1wID0gdl90ZXhDb29yZDtcbiAgICB0bXAueCA9IHRtcC54ICsgMC4wMSAqIHNpbihtb3Rpb24gKyAgdG1wLnggKiBhbmdsZSk7XG4gICAgLy8gdG1wLnkgPSB0bXAueSArIDAuMDEgKiBzaW4obW90aW9uICsgIHRtcC55ICogYW5nbGUpO1xuICAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRChDQ19UZXh0dXJlMCwgdG1wKTtcbiAgICBcbn1cbmAiXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/BlockBGItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1f50fDEmn1NhKZ+3jOght5I', 'BlockBGItem');
// Script/item/BlockBGItem.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    m_n_bright: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {},
  start: function start() {},
  setBrightVisible: function setBrightVisible(boo, color) {
    this.m_n_bright.active = boo;

    if (color) {
      this.m_n_bright.color = cc.Color.WHITE.fromHEX(color);
    }
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvaXRlbS9CbG9ja0JHSXRlbS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm1fbl9icmlnaHQiLCJOb2RlIiwib25Mb2FkIiwic3RhcnQiLCJzZXRCcmlnaHRWaXNpYmxlIiwiYm9vIiwiY29sb3IiLCJhY3RpdmUiLCJDb2xvciIsIldISVRFIiwiZnJvbUhFWCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBRVJDLElBQUFBLFVBQVUsRUFBRUosRUFBRSxDQUFDSztBQUZQLEdBSFA7QUFRTDtBQUVBQyxFQUFBQSxNQVZLLG9CQVVJLENBRVIsQ0FaSTtBQWNMQyxFQUFBQSxLQWRLLG1CQWNHLENBRVAsQ0FoQkk7QUFrQkxDLEVBQUFBLGdCQWxCSyw0QkFrQllDLEdBbEJaLEVBa0JpQkMsS0FsQmpCLEVBa0J3QjtBQUN6QixTQUFLTixVQUFMLENBQWdCTyxNQUFoQixHQUF5QkYsR0FBekI7O0FBQ0EsUUFBR0MsS0FBSCxFQUFTO0FBQ0wsV0FBS04sVUFBTCxDQUFnQk0sS0FBaEIsR0FBd0JWLEVBQUUsQ0FBQ1ksS0FBSCxDQUFTQyxLQUFULENBQWVDLE9BQWYsQ0FBdUJKLEtBQXZCLENBQXhCO0FBQ0g7QUFDSixHQXZCSSxDQXdCTDs7QUF4QkssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuXG4gICAgICAgIG1fbl9icmlnaHQ6IGNjLk5vZGUsXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkKCkge1xuXG4gICAgfSxcblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfSxcblxuICAgIHNldEJyaWdodFZpc2libGUoYm9vLCBjb2xvcikge1xuICAgICAgICB0aGlzLm1fbl9icmlnaHQuYWN0aXZlID0gYm9vO1xuICAgICAgICBpZihjb2xvcil7XG4gICAgICAgICAgICB0aGlzLm1fbl9icmlnaHQuY29sb3IgPSBjYy5Db2xvci5XSElURS5mcm9tSEVYKGNvbG9yKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/BlockItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e7b1eTTmSVB34RRUkqvGDNv', 'BlockItem');
// Script/item/BlockItem.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    _hp: 0,
    _type: 0,
    _tag: 0,
    m_sp_strong: cc.Node,
    m_sp_hurt: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {},
  start: function start() {},
  initType: function initType(type, tag) {
    this._type = type;
    this._tag = tag;

    if (window.BLOCKLIST[type][tag]) {
      this._hp = window.BLOCKLIST[type][tag].hp;
    }

    this.node.scale = 1;
    this.node.opacity = 255;
    this._tostrong = false;
    this.m_sp_strong.active = false;
    this.m_sp_hurt.active = false;
  },
  showHurt: function showHurt(hurt) {
    if (this._type == 1) {
      this.m_sp_hurt.active = true;
      this.m_sp_hurt.getComponent(cc.Sprite).spriteFrame = hurt;
    }
  },
  setSpriteFrame: function setSpriteFrame(sf) {
    this.node.getComponent(cc.Sprite).spriteFrame = sf;
  },
  getHp: function getHp() {
    return this._hp;
  },
  getTag: function getTag() {
    return this._tag;
  },
  addStrong: function addStrong() {
    var _this = this;

    if (this._tostrong) return false;
    this._tostrong = true;
    this._hp = this._hp + this._hp;
    this.m_sp_strong.scale = 0;
    this.m_sp_strong.active = true;
    this.m_sp_strong.stopAllActions();
    this.m_sp_strong.runAction(cc.sequence(cc.scaleTo(0.5, 1, 1).easing(cc.easeIn(2.0)), cc.callFunc(function () {
      _this.m_sp_strong.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 0.9, 0.9), cc.scaleTo(0.5, 1.0, 1.0))));
    })));
    return true;
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvaXRlbS9CbG9ja0l0ZW0uanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJfaHAiLCJfdHlwZSIsIl90YWciLCJtX3NwX3N0cm9uZyIsIk5vZGUiLCJtX3NwX2h1cnQiLCJvbkxvYWQiLCJzdGFydCIsImluaXRUeXBlIiwidHlwZSIsInRhZyIsIndpbmRvdyIsIkJMT0NLTElTVCIsImhwIiwibm9kZSIsInNjYWxlIiwib3BhY2l0eSIsIl90b3N0cm9uZyIsImFjdGl2ZSIsInNob3dIdXJ0IiwiaHVydCIsImdldENvbXBvbmVudCIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwic2V0U3ByaXRlRnJhbWUiLCJzZiIsImdldEhwIiwiZ2V0VGFnIiwiYWRkU3Ryb25nIiwic3RvcEFsbEFjdGlvbnMiLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsInNjYWxlVG8iLCJlYXNpbmciLCJlYXNlSW4iLCJjYWxsRnVuYyIsInJlcGVhdEZvcmV2ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxHQUFHLEVBQUUsQ0FERztBQUVSQyxJQUFBQSxLQUFLLEVBQUUsQ0FGQztBQUdSQyxJQUFBQSxJQUFJLEVBQUUsQ0FIRTtBQUlSQyxJQUFBQSxXQUFXLEVBQUVQLEVBQUUsQ0FBQ1EsSUFKUjtBQUtSQyxJQUFBQSxTQUFTLEVBQUVULEVBQUUsQ0FBQ1E7QUFMTixHQUhQO0FBV0w7QUFFQUUsRUFBQUEsTUFiSyxvQkFhSSxDQUVSLENBZkk7QUFpQkxDLEVBQUFBLEtBakJLLG1CQWlCRyxDQUVQLENBbkJJO0FBcUJMQyxFQUFBQSxRQXJCSyxvQkFxQklDLElBckJKLEVBcUJVQyxHQXJCVixFQXFCZTtBQUNoQixTQUFLVCxLQUFMLEdBQWFRLElBQWI7QUFDQSxTQUFLUCxJQUFMLEdBQVlRLEdBQVo7O0FBQ0EsUUFBSUMsTUFBTSxDQUFDQyxTQUFQLENBQWlCSCxJQUFqQixFQUF1QkMsR0FBdkIsQ0FBSixFQUFpQztBQUM3QixXQUFLVixHQUFMLEdBQVdXLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkgsSUFBakIsRUFBdUJDLEdBQXZCLEVBQTRCRyxFQUF2QztBQUNIOztBQUNELFNBQUtDLElBQUwsQ0FBVUMsS0FBVixHQUFrQixDQUFsQjtBQUNBLFNBQUtELElBQUwsQ0FBVUUsT0FBVixHQUFvQixHQUFwQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxTQUFLZCxXQUFMLENBQWlCZSxNQUFqQixHQUEwQixLQUExQjtBQUNBLFNBQUtiLFNBQUwsQ0FBZWEsTUFBZixHQUF3QixLQUF4QjtBQUNILEdBaENJO0FBa0NMQyxFQUFBQSxRQWxDSyxvQkFrQ0lDLElBbENKLEVBa0NVO0FBQ1gsUUFBSSxLQUFLbkIsS0FBTCxJQUFjLENBQWxCLEVBQXFCO0FBQ2pCLFdBQUtJLFNBQUwsQ0FBZWEsTUFBZixHQUF3QixJQUF4QjtBQUNBLFdBQUtiLFNBQUwsQ0FBZWdCLFlBQWYsQ0FBNEJ6QixFQUFFLENBQUMwQixNQUEvQixFQUF1Q0MsV0FBdkMsR0FBcURILElBQXJEO0FBQ0g7QUFDSixHQXZDSTtBQXlDTEksRUFBQUEsY0F6Q0ssMEJBeUNVQyxFQXpDVixFQXlDYztBQUNmLFNBQUtYLElBQUwsQ0FBVU8sWUFBVixDQUF1QnpCLEVBQUUsQ0FBQzBCLE1BQTFCLEVBQWtDQyxXQUFsQyxHQUFnREUsRUFBaEQ7QUFDSCxHQTNDSTtBQTZDTEMsRUFBQUEsS0E3Q0ssbUJBNkNHO0FBQ0osV0FBTyxLQUFLMUIsR0FBWjtBQUNILEdBL0NJO0FBaURMMkIsRUFBQUEsTUFqREssb0JBaURJO0FBQ0wsV0FBTyxLQUFLekIsSUFBWjtBQUNILEdBbkRJO0FBcURMMEIsRUFBQUEsU0FyREssdUJBcURPO0FBQUE7O0FBQ1IsUUFBSSxLQUFLWCxTQUFULEVBQW9CLE9BQU8sS0FBUDtBQUNwQixTQUFLQSxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsU0FBS2pCLEdBQUwsR0FBVyxLQUFLQSxHQUFMLEdBQVcsS0FBS0EsR0FBM0I7QUFDQSxTQUFLRyxXQUFMLENBQWlCWSxLQUFqQixHQUF5QixDQUF6QjtBQUNBLFNBQUtaLFdBQUwsQ0FBaUJlLE1BQWpCLEdBQTBCLElBQTFCO0FBQ0EsU0FBS2YsV0FBTCxDQUFpQjBCLGNBQWpCO0FBQ0EsU0FBSzFCLFdBQUwsQ0FBaUIyQixTQUFqQixDQUEyQmxDLEVBQUUsQ0FBQ21DLFFBQUgsQ0FBWW5DLEVBQUUsQ0FBQ29DLE9BQUgsQ0FBVyxHQUFYLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCQyxNQUF0QixDQUE2QnJDLEVBQUUsQ0FBQ3NDLE1BQUgsQ0FBVSxHQUFWLENBQTdCLENBQVosRUFBMER0QyxFQUFFLENBQUN1QyxRQUFILENBQVksWUFBTTtBQUNuRyxNQUFBLEtBQUksQ0FBQ2hDLFdBQUwsQ0FBaUIyQixTQUFqQixDQUEyQmxDLEVBQUUsQ0FBQ3dDLGFBQUgsQ0FBaUJ4QyxFQUFFLENBQUNtQyxRQUFILENBQVluQyxFQUFFLENBQUNvQyxPQUFILENBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFxQixHQUFyQixDQUFaLEVBQXVDcEMsRUFBRSxDQUFDb0MsT0FBSCxDQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsQ0FBdkMsQ0FBakIsQ0FBM0I7QUFDSCxLQUZvRixDQUExRCxDQUEzQjtBQUdBLFdBQU8sSUFBUDtBQUNILEdBaEVJLENBaUVMOztBQWpFSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBfaHA6IDAsXG4gICAgICAgIF90eXBlOiAwLFxuICAgICAgICBfdGFnOiAwLFxuICAgICAgICBtX3NwX3N0cm9uZzogY2MuTm9kZSxcbiAgICAgICAgbV9zcF9odXJ0OiBjYy5Ob2RlLFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCgpIHtcblxuICAgIH0sXG5cbiAgICBzdGFydCgpIHtcblxuICAgIH0sXG5cbiAgICBpbml0VHlwZSh0eXBlLCB0YWcpIHtcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuX3RhZyA9IHRhZztcbiAgICAgICAgaWYgKHdpbmRvdy5CTE9DS0xJU1RbdHlwZV1bdGFnXSkge1xuICAgICAgICAgICAgdGhpcy5faHAgPSB3aW5kb3cuQkxPQ0tMSVNUW3R5cGVdW3RhZ10uaHA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMTtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgIHRoaXMuX3Rvc3Ryb25nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubV9zcF9zdHJvbmcuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubV9zcF9odXJ0LmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBzaG93SHVydChodXJ0KSB7XG4gICAgICAgIGlmICh0aGlzLl90eXBlID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMubV9zcF9odXJ0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1fc3BfaHVydC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IGh1cnQ7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0U3ByaXRlRnJhbWUoc2YpIHtcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc2Y7XG4gICAgfSxcblxuICAgIGdldEhwKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faHA7XG4gICAgfSxcblxuICAgIGdldFRhZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RhZztcbiAgICB9LFxuXG4gICAgYWRkU3Ryb25nKCkge1xuICAgICAgICBpZiAodGhpcy5fdG9zdHJvbmcpIHJldHVybiBmYWxzZTtcbiAgICAgICAgdGhpcy5fdG9zdHJvbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLl9ocCA9IHRoaXMuX2hwICsgdGhpcy5faHA7XG4gICAgICAgIHRoaXMubV9zcF9zdHJvbmcuc2NhbGUgPSAwO1xuICAgICAgICB0aGlzLm1fc3Bfc3Ryb25nLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMubV9zcF9zdHJvbmcuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgdGhpcy5tX3NwX3N0cm9uZy5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjUsIDEsIDEpLmVhc2luZyhjYy5lYXNlSW4oMi4wKSksIGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubV9zcF9zdHJvbmcucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjUsIDAuOSwgMC45KSwgY2Muc2NhbGVUbygwLjUsIDEuMCwgMS4wKSkpKTtcbiAgICAgICAgfSkpKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/BigStepItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'be69aicp1VM956W/yG6BxJU', 'BigStepItem');
// Script/item/BigStepItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BigStepItem = /** @class */ (function (_super) {
    __extends(BigStepItem, _super);
    function BigStepItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_sp_stepicon = null;
        _this.m_sp_stepname = null;
        _this.m_n_lock = null;
        _this.m_l_condition = null;
        _this.m_n_starlist = [];
        return _this;
        // update (dt) {}
    }
    BigStepItem.prototype.start = function () {
    };
    BigStepItem.prototype.updateData = function (data, spframe, spframe1, curlv, color) {
        if (color === void 0) { color = 0; }
        var colorlist = ['#33ABEE', '#33EEEE', '#33EE94', '#BAE789'];
        if (data) {
            this.node.color = cc.Color.WHITE.fromHEX(colorlist[color]);
            this.m_sp_stepicon.spriteFrame = spframe;
            this.m_sp_stepname.spriteFrame = spframe1;
            for (var i = 0; i < this.m_n_starlist.length; i++) {
                this.m_n_starlist[i].active = i < data.star;
            }
            this.m_n_lock.active = data.lv > curlv;
            if (data.lv > curlv) {
                this.m_l_condition.node.y = -33;
                this.m_l_condition.string = cc.js.formatStr("需通关%d关", data.lv);
            }
            else {
                this.m_l_condition.node.y = 0;
                this.m_l_condition.string = "已获得";
            }
        }
    };
    __decorate([
        property(cc.Sprite)
    ], BigStepItem.prototype, "m_sp_stepicon", void 0);
    __decorate([
        property(cc.Sprite)
    ], BigStepItem.prototype, "m_sp_stepname", void 0);
    __decorate([
        property(cc.Node)
    ], BigStepItem.prototype, "m_n_lock", void 0);
    __decorate([
        property(cc.Label)
    ], BigStepItem.prototype, "m_l_condition", void 0);
    __decorate([
        property([cc.Node])
    ], BigStepItem.prototype, "m_n_starlist", void 0);
    BigStepItem = __decorate([
        ccclass
    ], BigStepItem);
    return BigStepItem;
}(cc.Component));
exports.default = BigStepItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvaXRlbS9CaWdTdGVwSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUEyQ0M7UUF2Q0csbUJBQWEsR0FBYyxJQUFJLENBQUM7UUFHaEMsbUJBQWEsR0FBYyxJQUFJLENBQUM7UUFHaEMsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixtQkFBYSxHQUFhLElBQUksQ0FBQztRQUcvQixrQkFBWSxHQUFjLEVBQUUsQ0FBQzs7UUEwQjdCLGlCQUFpQjtJQUNyQixDQUFDO0lBekJHLDJCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQsZ0NBQVUsR0FBVixVQUFXLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFpQjtRQUFqQixzQkFBQSxFQUFBLFNBQWlCO1FBQ3hELElBQUksU0FBUyxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDN0QsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztZQUMxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9DLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQy9DO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7WUFDdkMsSUFBSSxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssRUFBRTtnQkFDakIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ2xFO2lCQUFNO2dCQUNILElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUNyQztTQUNKO0lBQ0wsQ0FBQztJQXBDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3NEQUNZO0lBR2hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7c0RBQ1k7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDTztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3NEQUNZO0lBRy9CO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO3FEQUNTO0lBaEJaLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0EyQy9CO0lBQUQsa0JBQUM7Q0EzQ0QsQUEyQ0MsQ0EzQ3dDLEVBQUUsQ0FBQyxTQUFTLEdBMkNwRDtrQkEzQ29CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaWdTdGVwSXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgbV9zcF9zdGVwaWNvbjogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgbV9zcF9zdGVwbmFtZTogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIG1fbl9sb2NrOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBtX2xfY29uZGl0aW9uOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoW2NjLk5vZGVdKVxuICAgIG1fbl9zdGFybGlzdDogY2MuTm9kZVtdID0gW107XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIHVwZGF0ZURhdGEoZGF0YSwgc3BmcmFtZSwgc3BmcmFtZTEsIGN1cmx2LCBjb2xvcjogbnVtYmVyID0gMCkge1xuICAgICAgICBsZXQgY29sb3JsaXN0ID0gWycjMzNBQkVFJywgJyMzM0VFRUUnLCAnIzMzRUU5NCcsICcjQkFFNzg5J107XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuY29sb3IgPSBjYy5Db2xvci5XSElURS5mcm9tSEVYKGNvbG9ybGlzdFtjb2xvcl0pO1xuICAgICAgICAgICAgdGhpcy5tX3NwX3N0ZXBpY29uLnNwcml0ZUZyYW1lID0gc3BmcmFtZTtcbiAgICAgICAgICAgIHRoaXMubV9zcF9zdGVwbmFtZS5zcHJpdGVGcmFtZSA9IHNwZnJhbWUxO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1fbl9zdGFybGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMubV9uX3N0YXJsaXN0W2ldLmFjdGl2ZSA9IGkgPCBkYXRhLnN0YXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1fbl9sb2NrLmFjdGl2ZSA9IGRhdGEubHYgPiBjdXJsdjtcbiAgICAgICAgICAgIGlmIChkYXRhLmx2ID4gY3VybHYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbF9jb25kaXRpb24ubm9kZS55ID0gLTMzO1xuICAgICAgICAgICAgICAgIHRoaXMubV9sX2NvbmRpdGlvbi5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIoXCLpnIDpgJrlhbMlZOWFs1wiLCBkYXRhLmx2KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tX2xfY29uZGl0aW9uLm5vZGUueSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5tX2xfY29uZGl0aW9uLnN0cmluZyA9IFwi5bey6I635b6XXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/BombEffectItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a6be8ualqNKkaH/idVFnw5y', 'BombEffectItem');
// Script/item/BombEffectItem.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {// foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {},
  bombFinish: function bombFinish() {
    // console.log('bombFinish');
    if (window.GAME_CONTROL) {
      window.GAME_CONTROL.bombFinish();
    }
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvaXRlbS9Cb21iRWZmZWN0SXRlbS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInN0YXJ0IiwiYm9tYkZpbmlzaCIsIndpbmRvdyIsIkdBTUVfQ09OVFJPTCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLENBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBZlEsR0FIUDtBQXFCTDtBQUVBO0FBRUFDLEVBQUFBLEtBekJLLG1CQXlCSSxDQUVSLENBM0JJO0FBNkJMQyxFQUFBQSxVQTdCSyx3QkE2QlE7QUFDVDtBQUNBLFFBQUdDLE1BQU0sQ0FBQ0MsWUFBVixFQUF1QjtBQUNuQkQsTUFBQUEsTUFBTSxDQUFDQyxZQUFQLENBQW9CRixVQUFwQjtBQUNIO0FBQ0osR0FsQ0ksQ0FvQ0w7O0FBcENLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBiYXI6IHtcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0sXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfSxcblxuICAgIGJvbWJGaW5pc2goKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdib21iRmluaXNoJyk7XG4gICAgICAgIGlmKHdpbmRvdy5HQU1FX0NPTlRST0wpe1xuICAgICAgICAgICAgd2luZG93LkdBTUVfQ09OVFJPTC5ib21iRmluaXNoKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/MonsterItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cd58clmrdZOZpvuvyzBbabD', 'MonsterItem');
// Script/item/MonsterItem.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var Utils = require("Utils");

cc.Class({
  "extends": cc.Component,
  properties: {
    _mon_id: 0,
    _hp: 0,
    m_n_talk: cc.Node,
    m_l_talk: cc.Label,
    m_n_bloodmask: cc.Node,
    m_sp_blood: cc.Node,
    m_l_blood: cc.Label,
    m_n_behit: cc.Node,
    m_n_stand: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {// this.m_n_talk.active = false;
  },
  initType: function initType(monsterid, hp, level) {
    this._mon_id = monsterid;
    this._hp = hp;
    this._all_hp = hp;
    this.m_l_blood.string = this._hp;
    this.m_n_bloodmask.width = this.m_sp_blood.width;
    this._noangry = true;
    this.node.getComponent(cc.Animation).play("monster" + this._mon_id + "stand");

    if (typeof window.MONSTER_CONFIG[monsterid] != "undefined") {
      this.node.scale = window.MONSTER_CONFIG[monsterid].scale;

      if (level % 5 == 0) {
        this.node.scale = window.MONSTER_CONFIG[monsterid].scale + 0.8;
      }

      this.m_n_bloodmask.parent.y = window.MONSTER_CONFIG[monsterid].bloodheight + 10; // console.log(this.m_n_bloodmask.parent.y);
    }
  },
  reduceHp: function reduceHp(hp) {
    this._hp -= hp;
    if (this._hp < 0) this._hp = 0;
    this.m_l_blood.string = this._hp;
    this.m_n_bloodmask.width = this._hp / this._all_hp * this.m_sp_blood.width;
    return this._hp;
  },
  addHp: function addHp(hp) {
    this._hp += hp;

    if (this._hp > this._all_hp) {
      this._all_hp = this._hp;
    }

    this.m_l_blood.string = this._hp;
    this.m_n_bloodmask.width = this._hp / this._all_hp * this.m_sp_blood.width;
    return this._hp;
  },
  playBeHitEffect: function playBeHitEffect() {
    this.m_n_behit.getComponent(cc.Animation).play("behit_effect");
  },
  playBeHit: function playBeHit() {
    this.node.getComponent(cc.Animation).play("monster" + this._mon_id + "hit");
    this.playBeHitEffect();
  },
  playBeHapply: function playBeHapply() {
    var suff = "move";

    if (this._mon_id == 0) {
      suff = "stand";
    }

    this.node.getComponent(cc.Animation).play("monster" + this._mon_id + suff);
  },
  beHitFinish: function beHitFinish() {
    this.node.getComponent(cc.Animation).play("monster" + this._mon_id + "stand");
  },
  playNormal: function playNormal() {
    this.talkNormal();
  },
  playAttack: function playAttack() {
    this.playBeHapply();
    this.talkAttack();
  },
  playDead: function playDead() {
    this.node.runAction(cc.fadeOut(3.0));
    this.m_n_stand.runAction(cc.fadeOut(3.0));
    this.schedule(function () {
      // 这里的 this 指向 component
      this.playBeHit();
    }, 0.3, 2, 0);
    this.talkFail();
    return 3000;
  },
  playStartTalk: function playStartTalk() {
    this.playBeHapply();
    this.talkStart();
    this.m_n_stand.opacity = 100;
  },
  playMonsterVictory: function playMonsterVictory() {
    this.playBeHapply();
    this.talkVictory();
  },
  playHappyTalk: function playHappyTalk() {
    this.talkHappy();
    this.playBeHapply();
  },
  playAngry: function playAngry() {
    if (this._noangry) {
      this.talkAngry();
      this._noangry = false;
    }
  },
  talkHappy: function talkHappy(id) {
    if (window.MONSTER_CONFIG[this._mon_id]) {
      this.m_n_talk.active = true;

      if (typeof id != 'number') {
        id = Utils.random(0, window.MONSTER_CONFIG[this._mon_id].happy_talk.length);
      }

      var talktext = window.MONSTER_CONFIG[this._mon_id].happy_talk[id];
      this.m_l_talk.string = talktext;
      this.m_n_talk.getComponent(cc.Animation).play('bubbleanim');
    }
  },
  talkStart: function talkStart(id) {
    // console.log("talkStart", id, this._mon_id);
    if (window.MONSTER_CONFIG[this._mon_id]) {
      this.m_n_talk.active = true;

      if (typeof id != 'number') {
        id = Utils.random(0, window.MONSTER_CONFIG[this._mon_id].start_talk.length);
      }

      var talktext = window.MONSTER_CONFIG[this._mon_id].start_talk[id]; // console.log("talktext", talktext);

      this.m_l_talk.string = talktext;
      this.m_n_talk.getComponent(cc.Animation).play('bubbleanim');
    }
  },
  talkAngry: function talkAngry(id) {
    if (window.MONSTER_CONFIG[this._mon_id]) {
      this.m_n_talk.active = true;

      if (typeof id != 'number') {
        id = Utils.random(0, window.MONSTER_CONFIG[this._mon_id].angry_talk.length);
      }

      var talktext = window.MONSTER_CONFIG[this._mon_id].angry_talk[id];
      this.m_l_talk.string = talktext;
      this.m_n_talk.getComponent(cc.Animation).play('bubbleanim');
    }
  },
  talkFail: function talkFail(id) {
    if (window.MONSTER_CONFIG[this._mon_id]) {
      this.m_n_talk.active = true;

      if (typeof id != 'number') {
        id = Utils.random(0, window.MONSTER_CONFIG[this._mon_id].fail_talk.length);
      }

      var talktext = window.MONSTER_CONFIG[this._mon_id].fail_talk[id];
      this.m_l_talk.string = talktext;
      this.m_n_talk.getComponent(cc.Animation).play('bubbleanim');
    }
  },
  talkVictory: function talkVictory(id) {
    if (window.MONSTER_CONFIG[this._mon_id]) {
      this.m_n_talk.active = true;

      if (typeof id != 'number') {
        id = Utils.random(0, window.MONSTER_CONFIG[this._mon_id].victoy_talk.length);
      }

      var talktext = window.MONSTER_CONFIG[this._mon_id].victoy_talk[id];
      this.m_l_talk.string = talktext;
      this.m_n_talk.getComponent(cc.Animation).play('bubbleanim');
    }
  },
  talkNormal: function talkNormal(id) {
    if (window.MONSTER_CONFIG[this._mon_id]) {
      this.m_n_talk.active = true;

      if (typeof id != 'number') {
        id = Utils.random(0, window.MONSTER_CONFIG[this._mon_id].normal_talk.length);
      }

      var talktext = window.MONSTER_CONFIG[this._mon_id].normal_talk[id];
      this.m_l_talk.string = talktext;
      this.m_n_talk.getComponent(cc.Animation).play('bubbleanim');
    }
  },
  talkAttack: function talkAttack(id) {
    if (window.MONSTER_CONFIG[this._mon_id]) {
      this.m_n_talk.active = true;

      if (typeof id != 'number') {
        id = Utils.random(0, window.MONSTER_CONFIG[this._mon_id].attack_talk.length);
      }

      var talktext = window.MONSTER_CONFIG[this._mon_id].attack_talk[id];
      this.m_l_talk.string = talktext;
      this.m_n_talk.getComponent(cc.Animation).play('bubbleanim');
    }
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvaXRlbS9Nb25zdGVySXRlbS5qcyJdLCJuYW1lcyI6WyJVdGlscyIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIl9tb25faWQiLCJfaHAiLCJtX25fdGFsayIsIk5vZGUiLCJtX2xfdGFsayIsIkxhYmVsIiwibV9uX2Jsb29kbWFzayIsIm1fc3BfYmxvb2QiLCJtX2xfYmxvb2QiLCJtX25fYmVoaXQiLCJtX25fc3RhbmQiLCJzdGFydCIsImluaXRUeXBlIiwibW9uc3RlcmlkIiwiaHAiLCJsZXZlbCIsIl9hbGxfaHAiLCJzdHJpbmciLCJ3aWR0aCIsIl9ub2FuZ3J5Iiwibm9kZSIsImdldENvbXBvbmVudCIsIkFuaW1hdGlvbiIsInBsYXkiLCJ3aW5kb3ciLCJNT05TVEVSX0NPTkZJRyIsInNjYWxlIiwicGFyZW50IiwieSIsImJsb29kaGVpZ2h0IiwicmVkdWNlSHAiLCJhZGRIcCIsInBsYXlCZUhpdEVmZmVjdCIsInBsYXlCZUhpdCIsInBsYXlCZUhhcHBseSIsInN1ZmYiLCJiZUhpdEZpbmlzaCIsInBsYXlOb3JtYWwiLCJ0YWxrTm9ybWFsIiwicGxheUF0dGFjayIsInRhbGtBdHRhY2siLCJwbGF5RGVhZCIsInJ1bkFjdGlvbiIsImZhZGVPdXQiLCJzY2hlZHVsZSIsInRhbGtGYWlsIiwicGxheVN0YXJ0VGFsayIsInRhbGtTdGFydCIsIm9wYWNpdHkiLCJwbGF5TW9uc3RlclZpY3RvcnkiLCJ0YWxrVmljdG9yeSIsInBsYXlIYXBweVRhbGsiLCJ0YWxrSGFwcHkiLCJwbGF5QW5ncnkiLCJ0YWxrQW5ncnkiLCJpZCIsImFjdGl2ZSIsInJhbmRvbSIsImhhcHB5X3RhbGsiLCJsZW5ndGgiLCJ0YWxrdGV4dCIsInN0YXJ0X3RhbGsiLCJhbmdyeV90YWxrIiwiZmFpbF90YWxrIiwidmljdG95X3RhbGsiLCJub3JtYWxfdGFsayIsImF0dGFja190YWxrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7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OEMsWUFBOUM7QUFDSDtBQUNKLEdBL01JLENBZ05MOztBQWhOSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxudmFyIFV0aWxzID0gcmVxdWlyZShcIlV0aWxzXCIpO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgX21vbl9pZDogMCxcbiAgICAgICAgX2hwOiAwLFxuICAgICAgICBtX25fdGFsazogY2MuTm9kZSxcbiAgICAgICAgbV9sX3RhbGs6IGNjLkxhYmVsLFxuICAgICAgICBtX25fYmxvb2RtYXNrOiBjYy5Ob2RlLFxuICAgICAgICBtX3NwX2Jsb29kOiBjYy5Ob2RlLFxuICAgICAgICBtX2xfYmxvb2Q6IGNjLkxhYmVsLFxuICAgICAgICBtX25fYmVoaXQ6IGNjLk5vZGUsXG4gICAgICAgIG1fbl9zdGFuZDogY2MuTm9kZSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgLy8gdGhpcy5tX25fdGFsay5hY3RpdmUgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgaW5pdFR5cGUobW9uc3RlcmlkLCBocCwgbGV2ZWwpIHtcbiAgICAgICAgdGhpcy5fbW9uX2lkID0gbW9uc3RlcmlkO1xuICAgICAgICB0aGlzLl9ocCA9IGhwO1xuICAgICAgICB0aGlzLl9hbGxfaHAgPSBocDtcbiAgICAgICAgdGhpcy5tX2xfYmxvb2Quc3RyaW5nID0gdGhpcy5faHA7XG4gICAgICAgIHRoaXMubV9uX2Jsb29kbWFzay53aWR0aCA9IHRoaXMubV9zcF9ibG9vZC53aWR0aDtcbiAgICAgICAgdGhpcy5fbm9hbmdyeSA9IHRydWU7XG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KFwibW9uc3RlclwiICsgdGhpcy5fbW9uX2lkICsgXCJzdGFuZFwiKTtcbiAgICAgICAgaWYgKHR5cGVvZiAod2luZG93Lk1PTlNURVJfQ09ORklHW21vbnN0ZXJpZF0pICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IHdpbmRvdy5NT05TVEVSX0NPTkZJR1ttb25zdGVyaWRdLnNjYWxlO1xuICAgICAgICAgICAgaWYgKGxldmVsICUgNSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gd2luZG93Lk1PTlNURVJfQ09ORklHW21vbnN0ZXJpZF0uc2NhbGUgKyAwLjg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1fbl9ibG9vZG1hc2sucGFyZW50LnkgPSB3aW5kb3cuTU9OU1RFUl9DT05GSUdbbW9uc3RlcmlkXS5ibG9vZGhlaWdodCArIDEwO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5tX25fYmxvb2RtYXNrLnBhcmVudC55KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZWR1Y2VIcChocCkge1xuICAgICAgICB0aGlzLl9ocCAtPSBocDtcbiAgICAgICAgaWYgKHRoaXMuX2hwIDwgMCkgdGhpcy5faHAgPSAwO1xuICAgICAgICB0aGlzLm1fbF9ibG9vZC5zdHJpbmcgPSB0aGlzLl9ocDtcbiAgICAgICAgdGhpcy5tX25fYmxvb2RtYXNrLndpZHRoID0gdGhpcy5faHAgLyB0aGlzLl9hbGxfaHAgKiB0aGlzLm1fc3BfYmxvb2Qud2lkdGg7XG4gICAgICAgIHJldHVybiB0aGlzLl9ocDtcbiAgICB9LFxuXG4gICAgYWRkSHAoaHApIHtcbiAgICAgICAgdGhpcy5faHAgKz0gaHA7XG4gICAgICAgIGlmICh0aGlzLl9ocCA+IHRoaXMuX2FsbF9ocCkge1xuICAgICAgICAgICAgdGhpcy5fYWxsX2hwID0gdGhpcy5faHA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tX2xfYmxvb2Quc3RyaW5nID0gdGhpcy5faHA7XG4gICAgICAgIHRoaXMubV9uX2Jsb29kbWFzay53aWR0aCA9IHRoaXMuX2hwIC8gdGhpcy5fYWxsX2hwICogdGhpcy5tX3NwX2Jsb29kLndpZHRoO1xuICAgICAgICByZXR1cm4gdGhpcy5faHA7XG4gICAgfSxcblxuICAgIHBsYXlCZUhpdEVmZmVjdCgpIHtcbiAgICAgICAgdGhpcy5tX25fYmVoaXQuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheShcImJlaGl0X2VmZmVjdFwiKTtcbiAgICB9LFxuXG4gICAgcGxheUJlSGl0KCkge1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheShcIm1vbnN0ZXJcIiArIHRoaXMuX21vbl9pZCArIFwiaGl0XCIpO1xuICAgICAgICB0aGlzLnBsYXlCZUhpdEVmZmVjdCgpO1xuICAgIH0sXG5cbiAgICBwbGF5QmVIYXBwbHkoKSB7XG4gICAgICAgIGxldCBzdWZmID0gXCJtb3ZlXCI7XG4gICAgICAgIGlmICh0aGlzLl9tb25faWQgPT0gMCkge1xuICAgICAgICAgICAgc3VmZiA9IFwic3RhbmRcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheShcIm1vbnN0ZXJcIiArIHRoaXMuX21vbl9pZCArIHN1ZmYpO1xuICAgIH0sXG5cbiAgICBiZUhpdEZpbmlzaCgpIHtcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoXCJtb25zdGVyXCIgKyB0aGlzLl9tb25faWQgKyBcInN0YW5kXCIpO1xuICAgIH0sXG5cbiAgICBwbGF5Tm9ybWFsKCkge1xuICAgICAgICB0aGlzLnRhbGtOb3JtYWwoKTtcbiAgICB9LFxuXG4gICAgcGxheUF0dGFjaygpIHtcbiAgICAgICAgdGhpcy5wbGF5QmVIYXBwbHkoKTtcbiAgICAgICAgdGhpcy50YWxrQXR0YWNrKCk7XG4gICAgfSxcblxuICAgIHBsYXlEZWFkKCkge1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLmZhZGVPdXQoMy4wKSk7XG4gICAgICAgIHRoaXMubV9uX3N0YW5kLnJ1bkFjdGlvbihjYy5mYWRlT3V0KDMuMCkpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIOi/memHjOeahCB0aGlzIOaMh+WQkSBjb21wb25lbnRcbiAgICAgICAgICAgIHRoaXMucGxheUJlSGl0KCk7XG4gICAgICAgIH0sIDAuMywgMiwgMCk7XG4gICAgICAgIHRoaXMudGFsa0ZhaWwoKTtcbiAgICAgICAgcmV0dXJuIDMwMDA7XG4gICAgfSxcblxuICAgIHBsYXlTdGFydFRhbGsoKSB7XG4gICAgICAgIHRoaXMucGxheUJlSGFwcGx5KCk7XG4gICAgICAgIHRoaXMudGFsa1N0YXJ0KCk7XG4gICAgICAgIHRoaXMubV9uX3N0YW5kLm9wYWNpdHkgPSAxMDA7XG4gICAgfSxcblxuICAgIHBsYXlNb25zdGVyVmljdG9yeSgpIHtcbiAgICAgICAgdGhpcy5wbGF5QmVIYXBwbHkoKTtcbiAgICAgICAgdGhpcy50YWxrVmljdG9yeSgpO1xuICAgIH0sXG5cbiAgICBwbGF5SGFwcHlUYWxrKCkge1xuICAgICAgICB0aGlzLnRhbGtIYXBweSgpO1xuICAgICAgICB0aGlzLnBsYXlCZUhhcHBseSgpO1xuICAgIH0sXG5cbiAgICBwbGF5QW5ncnkoKSB7XG4gICAgICAgIGlmICh0aGlzLl9ub2FuZ3J5KSB7XG4gICAgICAgICAgICB0aGlzLnRhbGtBbmdyeSgpO1xuICAgICAgICAgICAgdGhpcy5fbm9hbmdyeSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHRhbGtIYXBweShpZCkge1xuICAgICAgICBpZiAod2luZG93Lk1PTlNURVJfQ09ORklHW3RoaXMuX21vbl9pZF0pIHtcbiAgICAgICAgICAgIHRoaXMubV9uX3RhbGsuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKGlkKSAhPSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGlkID0gVXRpbHMucmFuZG9tKDAsIHdpbmRvdy5NT05TVEVSX0NPTkZJR1t0aGlzLl9tb25faWRdLmhhcHB5X3RhbGsubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB0YWxrdGV4dCA9IHdpbmRvdy5NT05TVEVSX0NPTkZJR1t0aGlzLl9tb25faWRdLmhhcHB5X3RhbGtbaWRdO1xuICAgICAgICAgICAgdGhpcy5tX2xfdGFsay5zdHJpbmcgPSB0YWxrdGV4dDtcbiAgICAgICAgICAgIHRoaXMubV9uX3RhbGsuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgnYnViYmxlYW5pbScpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHRhbGtTdGFydChpZCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInRhbGtTdGFydFwiLCBpZCwgdGhpcy5fbW9uX2lkKTtcbiAgICAgICAgaWYgKHdpbmRvdy5NT05TVEVSX0NPTkZJR1t0aGlzLl9tb25faWRdKSB7XG4gICAgICAgICAgICB0aGlzLm1fbl90YWxrLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIChpZCkgIT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBpZCA9IFV0aWxzLnJhbmRvbSgwLCB3aW5kb3cuTU9OU1RFUl9DT05GSUdbdGhpcy5fbW9uX2lkXS5zdGFydF90YWxrLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdGFsa3RleHQgPSB3aW5kb3cuTU9OU1RFUl9DT05GSUdbdGhpcy5fbW9uX2lkXS5zdGFydF90YWxrW2lkXTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidGFsa3RleHRcIiwgdGFsa3RleHQpO1xuICAgICAgICAgICAgdGhpcy5tX2xfdGFsay5zdHJpbmcgPSB0YWxrdGV4dDtcbiAgICAgICAgICAgIHRoaXMubV9uX3RhbGsuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgnYnViYmxlYW5pbScpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHRhbGtBbmdyeShpZCkge1xuICAgICAgICBpZiAod2luZG93Lk1PTlNURVJfQ09ORklHW3RoaXMuX21vbl9pZF0pIHtcbiAgICAgICAgICAgIHRoaXMubV9uX3RhbGsuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKGlkKSAhPSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGlkID0gVXRpbHMucmFuZG9tKDAsIHdpbmRvdy5NT05TVEVSX0NPTkZJR1t0aGlzLl9tb25faWRdLmFuZ3J5X3RhbGsubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB0YWxrdGV4dCA9IHdpbmRvdy5NT05TVEVSX0NPTkZJR1t0aGlzLl9tb25faWRdLmFuZ3J5X3RhbGtbaWRdO1xuICAgICAgICAgICAgdGhpcy5tX2xfdGFsay5zdHJpbmcgPSB0YWxrdGV4dDtcbiAgICAgICAgICAgIHRoaXMubV9uX3RhbGsuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgnYnViYmxlYW5pbScpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHRhbGtGYWlsKGlkKSB7XG4gICAgICAgIGlmICh3aW5kb3cuTU9OU1RFUl9DT05GSUdbdGhpcy5fbW9uX2lkXSkge1xuICAgICAgICAgICAgdGhpcy5tX25fdGFsay5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAoaWQpICE9ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgaWQgPSBVdGlscy5yYW5kb20oMCwgd2luZG93Lk1PTlNURVJfQ09ORklHW3RoaXMuX21vbl9pZF0uZmFpbF90YWxrLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdGFsa3RleHQgPSB3aW5kb3cuTU9OU1RFUl9DT05GSUdbdGhpcy5fbW9uX2lkXS5mYWlsX3RhbGtbaWRdO1xuICAgICAgICAgICAgdGhpcy5tX2xfdGFsay5zdHJpbmcgPSB0YWxrdGV4dDtcbiAgICAgICAgICAgIHRoaXMubV9uX3RhbGsuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgnYnViYmxlYW5pbScpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHRhbGtWaWN0b3J5KGlkKSB7XG4gICAgICAgIGlmICh3aW5kb3cuTU9OU1RFUl9DT05GSUdbdGhpcy5fbW9uX2lkXSkge1xuICAgICAgICAgICAgdGhpcy5tX25fdGFsay5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAoaWQpICE9ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgaWQgPSBVdGlscy5yYW5kb20oMCwgd2luZG93Lk1PTlNURVJfQ09ORklHW3RoaXMuX21vbl9pZF0udmljdG95X3RhbGsubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB0YWxrdGV4dCA9IHdpbmRvdy5NT05TVEVSX0NPTkZJR1t0aGlzLl9tb25faWRdLnZpY3RveV90YWxrW2lkXTtcbiAgICAgICAgICAgIHRoaXMubV9sX3RhbGsuc3RyaW5nID0gdGFsa3RleHQ7XG4gICAgICAgICAgICB0aGlzLm1fbl90YWxrLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoJ2J1YmJsZWFuaW0nKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB0YWxrTm9ybWFsKGlkKSB7XG4gICAgICAgIGlmICh3aW5kb3cuTU9OU1RFUl9DT05GSUdbdGhpcy5fbW9uX2lkXSkge1xuICAgICAgICAgICAgdGhpcy5tX25fdGFsay5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAoaWQpICE9ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgaWQgPSBVdGlscy5yYW5kb20oMCwgd2luZG93Lk1PTlNURVJfQ09ORklHW3RoaXMuX21vbl9pZF0ubm9ybWFsX3RhbGsubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB0YWxrdGV4dCA9IHdpbmRvdy5NT05TVEVSX0NPTkZJR1t0aGlzLl9tb25faWRdLm5vcm1hbF90YWxrW2lkXTtcbiAgICAgICAgICAgIHRoaXMubV9sX3RhbGsuc3RyaW5nID0gdGFsa3RleHQ7XG4gICAgICAgICAgICB0aGlzLm1fbl90YWxrLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoJ2J1YmJsZWFuaW0nKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB0YWxrQXR0YWNrKGlkKSB7XG4gICAgICAgIGlmICh3aW5kb3cuTU9OU1RFUl9DT05GSUdbdGhpcy5fbW9uX2lkXSkge1xuICAgICAgICAgICAgdGhpcy5tX25fdGFsay5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAoaWQpICE9ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgaWQgPSBVdGlscy5yYW5kb20oMCwgd2luZG93Lk1PTlNURVJfQ09ORklHW3RoaXMuX21vbl9pZF0uYXR0YWNrX3RhbGsubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB0YWxrdGV4dCA9IHdpbmRvdy5NT05TVEVSX0NPTkZJR1t0aGlzLl9tb25faWRdLmF0dGFja190YWxrW2lkXTtcbiAgICAgICAgICAgIHRoaXMubV9sX3RhbGsuc3RyaW5nID0gdGFsa3RleHQ7XG4gICAgICAgICAgICB0aGlzLm1fbl90YWxrLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoJ2J1YmJsZWFuaW0nKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/RockItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '80ebb/V4PBKUao1TiZ5JV+M', 'RockItem');
// Script/item/RockItem.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    m_partice: cc.ParticleSystem
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {},
  resetSytem: function resetSytem() {
    this.m_partice.resetSystem();
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvaXRlbS9Sb2NrSXRlbS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm1fcGFydGljZSIsIlBhcnRpY2xlU3lzdGVtIiwic3RhcnQiLCJyZXNldFN5dGVtIiwicmVzZXRTeXN0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUVKLEVBQUUsQ0FBQ0s7QUFETixHQUhQO0FBT0w7QUFFQTtBQUVBQyxFQUFBQSxLQVhLLG1CQVdJLENBRVIsQ0FiSTtBQWVMQyxFQUFBQSxVQWZLLHdCQWVPO0FBQ1IsU0FBS0gsU0FBTCxDQUFlSSxXQUFmO0FBQ0gsR0FqQkksQ0FrQkw7O0FBbEJLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbV9wYXJ0aWNlOiBjYy5QYXJ0aWNsZVN5c3RlbSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9LFxuXG4gICAgcmVzZXRTeXRlbSgpe1xuICAgICAgICB0aGlzLm1fcGFydGljZS5yZXNldFN5c3RlbSgpO1xuICAgIH1cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/SkinItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8d8bfr8qONJh5sm29g/5CCH', 'SkinItem');
// Script/item/SkinItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Common_CommonUtil_1 = require("../common/Common_CommonUtil");
var ShareSdk = require("../common/ShareSdk");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SkinItem = /** @class */ (function (_super) {
    __extends(SkinItem, _super);
    function SkinItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_l_goldlabel = null;
        _this.m_sp_blockstyle = null;
        _this.m_n_isready = null;
        _this.m_btn_suitup = null;
        _this.m_l_sharetext = null;
        _this._data = null;
        _this._state = 0;
        _this._index = 0;
        _this._onshowback = false;
        return _this;
    }
    SkinItem.prototype.start = function () {
        EVENT_LISTENER.on(window.ON_SHOW_BACK, this.onshowback, this);
    };
    SkinItem.prototype.onDestroy = function () {
        EVENT_LISTENER.off(window.ON_SHOW_BACK, this);
    };
    SkinItem.prototype.updateData = function (index, data, sframe) {
        this._index = index;
        this._data = data;
        var state = window.INIT_GAME_SAVE_DATA.skin[index];
        this._state = state ? state : 0;
        this.m_sp_blockstyle.spriteFrame = sframe;
        this.m_n_isready.active = this._state >= 2;
        this.m_btn_suitup.node.active = this._state < 2;
        this.m_l_goldlabel.string = data.price;
        if (this._state == 0) { //未获得
            if (data.way == 1 && window.SKIN_SHARE) { //分享获得且开关开启
                this.m_l_sharetext.node.active = true;
                this.m_l_goldlabel.node.parent.active = false;
                this.m_btn_suitup.interactable = true;
            }
            else {
                this.m_l_sharetext.node.active = false;
                this.m_l_goldlabel.node.parent.active = true;
                this.m_btn_suitup.interactable = window.INIT_GAME_SAVE_DATA.gold_num >= data.price;
            }
            this.m_btn_suitup.node.y = -145;
        }
        else if (this._state == 1) {
            this.m_l_sharetext.node.active = false;
            this.m_l_goldlabel.node.parent.active = false;
            this.m_btn_suitup.interactable = true;
            this.m_btn_suitup.node.y = -74;
        }
        else {
            this.m_l_sharetext.node.active = false;
            this.m_l_goldlabel.node.parent.active = false;
        }
    };
    SkinItem.prototype.onshowback = function (time) {
        if (this._onshowback) {
            if (time >= window.SHARE_TIME) {
                this.onSuitUp();
            }
            else {
                Common_CommonUtil_1.default.showShareFailTips();
            }
            this._onshowback = false;
        }
    };
    SkinItem.prototype.onSuitUp = function () {
        if (!this.m_btn_suitup.interactable)
            return;
        var skin_config = window.INIT_GAME_SAVE_DATA.skin;
        for (var i = 0; i < skin_config.length; i++) {
            if (skin_config[i] == 2) {
                window.INIT_GAME_SAVE_DATA.skin[i] = 1;
                window.INIT_GAME_SAVE_DATA.skin[this._index] = 2;
                break;
            }
        }
        if (this._state == 0) {
            if (this._data.way == 0 || !window.SKIN_SHARE) {
                window.INIT_GAME_SAVE_DATA.gold_num -= this._data.price;
                EVENT_LISTENER.fire(window.GAME_UPDATE_DATA);
            }
            else {
                this._onshowback = true;
                ShareSdk.shareAppMessage({
                    title: "获得了一个怪兽皮肤，快来看看吧",
                    imageUrl: window.tempFileURL[1],
                });
            }
        }
        // console.log(window.INIT_GAME_SAVE_DATA.skin)
        EVENT_LISTENER.fire(window.GAME_SAVE_HANDLER);
    };
    __decorate([
        property(cc.Label)
    ], SkinItem.prototype, "m_l_goldlabel", void 0);
    __decorate([
        property(cc.Sprite)
    ], SkinItem.prototype, "m_sp_blockstyle", void 0);
    __decorate([
        property(cc.Node)
    ], SkinItem.prototype, "m_n_isready", void 0);
    __decorate([
        property(cc.Button)
    ], SkinItem.prototype, "m_btn_suitup", void 0);
    __decorate([
        property(cc.Label)
    ], SkinItem.prototype, "m_l_sharetext", void 0);
    SkinItem = __decorate([
        ccclass
    ], SkinItem);
    return SkinItem;
}(cc.Component));
exports.default = SkinItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvaXRlbS9Ta2luSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUVBQTREO0FBQzVELDZDQUFnRDtBQUMxQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUk1QztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQWtHQztRQS9GRyxtQkFBYSxHQUFhLElBQUksQ0FBQztRQUcvQixxQkFBZSxHQUFjLElBQUksQ0FBQztRQUdsQyxpQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixtQkFBYSxHQUFhLElBQUksQ0FBQztRQUV2QixXQUFLLEdBQVEsSUFBSSxDQUFDO1FBQ2xCLFlBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsWUFBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixpQkFBVyxHQUFZLEtBQUssQ0FBQzs7SUE4RXpDLENBQUM7SUE1RUcsd0JBQUssR0FBTDtRQUNJLGNBQWMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCw0QkFBUyxHQUFUO1FBQ0ksY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCw2QkFBVSxHQUFWLFVBQVcsS0FBYSxFQUFFLElBQVMsRUFBRSxNQUFNO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FB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R0QsQUFrR0MsQ0FsR3FDLEVBQUUsQ0FBQyxTQUFTLEdBa0dqRDtrQkFsR29CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tbW9uX0NvbW1vblV0aWwgZnJvbSBcIi4uL2NvbW1vbi9Db21tb25fQ29tbW9uVXRpbFwiO1xuaW1wb3J0IFNoYXJlU2RrID0gcmVxdWlyZSgnLi4vY29tbW9uL1NoYXJlU2RrJyk7XG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuZGVjbGFyZSB2YXIgd2luZG93OiBhbnk7XG5kZWNsYXJlIHZhciBFVkVOVF9MSVNURU5FUjogYW55O1xuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNraW5JdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBtX2xfZ29sZGxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIG1fc3BfYmxvY2tzdHlsZTogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIG1fbl9pc3JlYWR5OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgbV9idG5fc3VpdHVwOiBjYy5CdXR0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIG1fbF9zaGFyZXRleHQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIHByaXZhdGUgX2RhdGE6IGFueSA9IG51bGw7XG4gICAgcHJpdmF0ZSBfc3RhdGU6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfaW5kZXg6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfb25zaG93YmFjazogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIEVWRU5UX0xJU1RFTkVSLm9uKHdpbmRvdy5PTl9TSE9XX0JBQ0ssIHRoaXMub25zaG93YmFjaywgdGhpcyk7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBFVkVOVF9MSVNURU5FUi5vZmYod2luZG93Lk9OX1NIT1dfQkFDSywgdGhpcyk7XG4gICAgfVxuXG4gICAgdXBkYXRlRGF0YShpbmRleDogbnVtYmVyLCBkYXRhOiBhbnksIHNmcmFtZSkge1xuICAgICAgICB0aGlzLl9pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgICAgICAgbGV0IHN0YXRlID0gd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEuc2tpbltpbmRleF07XG4gICAgICAgIHRoaXMuX3N0YXRlID0gc3RhdGUgPyBzdGF0ZSA6IDA7XG4gICAgICAgIHRoaXMubV9zcF9ibG9ja3N0eWxlLnNwcml0ZUZyYW1lID0gc2ZyYW1lO1xuICAgICAgICB0aGlzLm1fbl9pc3JlYWR5LmFjdGl2ZSA9IHRoaXMuX3N0YXRlID49IDI7XG4gICAgICAgIHRoaXMubV9idG5fc3VpdHVwLm5vZGUuYWN0aXZlID0gdGhpcy5fc3RhdGUgPCAyO1xuICAgICAgICB0aGlzLm1fbF9nb2xkbGFiZWwuc3RyaW5nID0gZGF0YS5wcmljZTtcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlID09IDApIHsvL+acquiOt+W+l1xuICAgICAgICAgICAgaWYgKGRhdGEud2F5ID09IDEgJiYgd2luZG93LlNLSU5fU0hBUkUpIHsgLy/liIbkuqvojrflvpfkuJTlvIDlhbPlvIDlkK9cbiAgICAgICAgICAgICAgICB0aGlzLm1fbF9zaGFyZXRleHQubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubV9sX2dvbGRsYWJlbC5ub2RlLnBhcmVudC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLm1fYnRuX3N1aXR1cC5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbF9zaGFyZXRleHQubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbF9nb2xkbGFiZWwubm9kZS5wYXJlbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm1fYnRuX3N1aXR1cC5pbnRlcmFjdGFibGUgPSB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS5nb2xkX251bSA+PSBkYXRhLnByaWNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tX2J0bl9zdWl0dXAubm9kZS55ID0gLTE0NTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zdGF0ZSA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLm1fbF9zaGFyZXRleHQubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubV9sX2dvbGRsYWJlbC5ub2RlLnBhcmVudC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubV9idG5fc3VpdHVwLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1fYnRuX3N1aXR1cC5ub2RlLnkgPSAtNzQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1fbF9zaGFyZXRleHQubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubV9sX2dvbGRsYWJlbC5ub2RlLnBhcmVudC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uc2hvd2JhY2sodGltZSkge1xuICAgICAgICBpZiAodGhpcy5fb25zaG93YmFjaykge1xuICAgICAgICAgICAgaWYgKHRpbWUgPj0gd2luZG93LlNIQVJFX1RJTUUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU3VpdFVwKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIENvbW1vbl9Db21tb25VdGlsLnNob3dTaGFyZUZhaWxUaXBzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9vbnNob3diYWNrID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblN1aXRVcCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1fYnRuX3N1aXR1cC5pbnRlcmFjdGFibGUpIHJldHVybjtcbiAgICAgICAgbGV0IHNraW5fY29uZmlnID0gd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEuc2tpbjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBza2luX2NvbmZpZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNraW5fY29uZmlnW2ldID09IDIpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS5za2luW2ldID0gMTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS5za2luW3RoaXMuX2luZGV4XSA9IDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlID09IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhLndheSA9PSAwIHx8ICF3aW5kb3cuU0tJTl9TSEFSRSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLmdvbGRfbnVtIC09IHRoaXMuX2RhdGEucHJpY2U7XG4gICAgICAgICAgICAgICAgRVZFTlRfTElTVEVORVIuZmlyZSh3aW5kb3cuR0FNRV9VUERBVEVfREFUQSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbnNob3diYWNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBTaGFyZVNkay5zaGFyZUFwcE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLojrflvpfkuobkuIDkuKrmgKrlhb3nmq7ogqTvvIzlv6vmnaXnnIvnnIvlkKdcIixcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VVcmw6IHdpbmRvdy50ZW1wRmlsZVVSTFsxXSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLnNraW4pXG4gICAgICAgIEVWRU5UX0xJU1RFTkVSLmZpcmUod2luZG93LkdBTUVfU0FWRV9IQU5ETEVSKTtcbiAgICB9XG5cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/ShareTipsItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1f2f9a3C/VEPKUtTZG0WhFn', 'ShareTipsItem');
// Script/item/ShareTipsItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShareTipsItem = /** @class */ (function (_super) {
    __extends(ShareTipsItem, _super);
    function ShareTipsItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    ShareTipsItem.prototype.start = function () {
    };
    ShareTipsItem.prototype.onClose = function () {
        this.node.destroy();
    };
    ShareTipsItem = __decorate([
        ccclass
    ], ShareTipsItem);
    return ShareTipsItem;
}(cc.Component));
exports.default = ShareTipsItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvaXRlbS9TaGFyZVRpcHNJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEyQyxpQ0FBWTtJQUF2RDs7SUFjQSxDQUFDO0lBWkcsd0JBQXdCO0lBRXhCLGVBQWU7SUFFZiw2QkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVELCtCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFaZ0IsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQWNqQztJQUFELG9CQUFDO0NBZEQsQUFjQyxDQWQwQyxFQUFFLENBQUMsU0FBUyxHQWN0RDtrQkFkb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFyZVRpcHNJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy8gb25Mb2FkICgpIHt9XG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9XG5cbiAgICBvbkNsb3NlKCl7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/GetBoxGiftItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '30339KHDKlNjZMtkkI4Lrhs', 'GetBoxGiftItem');
// Script/item/GetBoxGiftItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ShareSdk = require("../common/ShareSdk");
var Utils = require("../common/Utils");
var Common_CommonUtil_1 = require("../common/Common_CommonUtil");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GetBoxGiftItem = /** @class */ (function (_super) {
    __extends(GetBoxGiftItem, _super);
    function GetBoxGiftItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_n_freebtn = null;
        _this.m_n_sharebtn = null;
        _this.m_n_box = null;
        _this._onshowback = false;
        _this._callback = null;
        return _this;
        // update (dt) {}
    }
    GetBoxGiftItem.prototype.start = function () {
        EVENT_LISTENER.on(window.ON_SHOW_BACK, this.onshowback, this);
    };
    GetBoxGiftItem.prototype.showView = function (callback) {
        this._callback = callback;
        this.m_n_freebtn.active = !window.BOX_SHARE;
        this.m_n_sharebtn.active = window.BOX_SHARE;
        this.m_n_box.runAction(cc.sequence(cc.repeat(cc.sequence(cc.rotateTo(0.1, -10), cc.rotateTo(0.1, 10)), 3), cc.rotateTo(0.1, 0)));
    };
    GetBoxGiftItem.prototype.onDestroy = function () {
        EVENT_LISTENER.off(window.ON_SHOW_BACK, this);
    };
    GetBoxGiftItem.prototype.onshowback = function (time) {
        if (this._onshowback) {
            if (time >= window.SHARE_TIME) {
                this.onFreeGet();
            }
            else {
                Common_CommonUtil_1.default.showShareFailTips();
            }
            this._onshowback = false;
        }
    };
    GetBoxGiftItem.prototype.onClose = function () {
        if (this._callback) {
            this._callback();
            this._callback = null;
        }
        this.node.active = false;
    };
    GetBoxGiftItem.prototype.onFreeGet = function () {
        // Utils.showGetItem();
        var numlist = [1, 20];
        var index = 0;
        var ran = Utils.random(0, 1500);
        index = ran > 750 ? 0 : 1;
        Utils.showGetItem(numlist[index], index, null, 0, 0);
        if (index == 0) {
            window.INIT_GAME_SAVE_DATA.tool[0] += numlist[index];
        }
        else {
            window.INIT_GAME_SAVE_DATA.gold_num += numlist[index];
        }
        if (window.GAME_CONTROL) {
            window.GAME_CONTROL.BoxReward(index);
        }
        this.onClose();
    };
    GetBoxGiftItem.prototype.onShareGet = function () {
        this._onshowback = true;
        ShareSdk.shareAppMessage({
            title: "我就看着你，直到你打开宝箱为止",
            imageUrl: window.tempFileURL[3],
        });
    };
    __decorate([
        property(cc.Node)
    ], GetBoxGiftItem.prototype, "m_n_freebtn", void 0);
    __decorate([
        property(cc.Node)
    ], GetBoxGiftItem.prototype, "m_n_sharebtn", void 0);
    __decorate([
        property(cc.Node)
    ], GetBoxGiftItem.prototype, "m_n_box", void 0);
    GetBoxGiftItem = __decorate([
        ccclass
    ], GetBoxGiftItem);
    return GetBoxGiftItem;
}(cc.Component));
exports.default = GetBoxGiftItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvaXRlbS9HZXRCb3hHaWZ0SXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQWdEO0FBQ2hELHVDQUEwQztBQUMxQyxpRUFBNEQ7QUFDdEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFJNUM7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUF3RUM7UUFyRUcsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0IsYUFBTyxHQUFZLElBQUksQ0FBQztRQUNoQixpQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixlQUFTLEdBQVEsSUFBSSxDQUFDOztRQTREOUIsaUJBQWlCO0lBQ3JCLENBQUM7SUE1REcsOEJBQUssR0FBTDtRQUNJLGNBQWMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxpQ0FBUSxHQUFSLFVBQVMsUUFBUTtRQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckksQ0FBQztJQUVELGtDQUFTLEdBQVQ7UUFDSSxjQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELG1DQUFVLEdBQVYsVUFBVyxJQUFJO1FBQ1gsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNwQjtpQkFBTTtnQkFDSCwyQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQ3pDO1lBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBRUQsZ0NBQU8sR0FBUDtRQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDekI7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVELGtDQUFTLEdBQVQ7UUFDSSx1QkFBdUI7UUFDdkIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEMsS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtZQUNaLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hEO2FBQU07WUFDSCxNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6RDtRQUNELElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtZQUNyQixNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QztRQUNELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsbUNBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxlQUFlLENBQUM7WUFDckIsS0FBSyxFQUFFLGlCQUFpQjtZQUN4QixRQUFRLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7U0FDbEMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQW5FRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VEQUNVO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7d0RBQ1c7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzttREFDTTtJQVRQLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0F3RWxDO0lBQUQscUJBQUM7Q0F4RUQsQUF3RUMsQ0F4RTJDLEVBQUUsQ0FBQyxTQUFTLEdBd0V2RDtrQkF4RW9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hhcmVTZGsgPSByZXF1aXJlKCcuLi9jb21tb24vU2hhcmVTZGsnKTtcbmltcG9ydCBVdGlscyA9IHJlcXVpcmUoJy4uL2NvbW1vbi9VdGlscycpO1xuaW1wb3J0IENvbW1vbl9Db21tb25VdGlsIGZyb20gJy4uL2NvbW1vbi9Db21tb25fQ29tbW9uVXRpbCc7XG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuZGVjbGFyZSB2YXIgd2luZG93OiBhbnk7XG5kZWNsYXJlIHZhciBFVkVOVF9MSVNURU5FUjogYW55O1xuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdldEJveEdpZnRJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIG1fbl9mcmVlYnRuOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIG1fbl9zaGFyZWJ0bjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBtX25fYm94OiBjYy5Ob2RlID0gbnVsbDtcbiAgICBwcml2YXRlIF9vbnNob3diYWNrOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfY2FsbGJhY2s6IGFueSA9IG51bGw7XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIEVWRU5UX0xJU1RFTkVSLm9uKHdpbmRvdy5PTl9TSE9XX0JBQ0ssIHRoaXMub25zaG93YmFjaywgdGhpcyk7XG4gICAgfVxuXG4gICAgc2hvd1ZpZXcoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgdGhpcy5tX25fZnJlZWJ0bi5hY3RpdmUgPSAhd2luZG93LkJPWF9TSEFSRTtcbiAgICAgICAgdGhpcy5tX25fc2hhcmVidG4uYWN0aXZlID0gd2luZG93LkJPWF9TSEFSRTtcbiAgICAgICAgdGhpcy5tX25fYm94LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5yZXBlYXQoY2Muc2VxdWVuY2UoY2Mucm90YXRlVG8oMC4xLCAtMTApLCBjYy5yb3RhdGVUbygwLjEsIDEwKSksIDMpLCBjYy5yb3RhdGVUbygwLjEsIDApKSk7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBFVkVOVF9MSVNURU5FUi5vZmYod2luZG93Lk9OX1NIT1dfQkFDSywgdGhpcyk7XG4gICAgfVxuXG4gICAgb25zaG93YmFjayh0aW1lKSB7XG4gICAgICAgIGlmICh0aGlzLl9vbnNob3diYWNrKSB7XG4gICAgICAgICAgICBpZiAodGltZSA+PSB3aW5kb3cuU0hBUkVfVElNRSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25GcmVlR2V0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIENvbW1vbl9Db21tb25VdGlsLnNob3dTaGFyZUZhaWxUaXBzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9vbnNob3diYWNrID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNsb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5fY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrKCk7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFjayA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uRnJlZUdldCgpIHtcbiAgICAgICAgLy8gVXRpbHMuc2hvd0dldEl0ZW0oKTtcbiAgICAgICAgbGV0IG51bWxpc3QgPSBbMSwgMjBdO1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBsZXQgcmFuID0gVXRpbHMucmFuZG9tKDAsIDE1MDApO1xuICAgICAgICBpbmRleCA9IHJhbiA+IDc1MCA/IDAgOiAxO1xuICAgICAgICBVdGlscy5zaG93R2V0SXRlbShudW1saXN0W2luZGV4XSwgaW5kZXgsIG51bGwsIDAsIDApO1xuICAgICAgICBpZiAoaW5kZXggPT0gMCkge1xuICAgICAgICAgICAgd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEudG9vbFswXSArPSBudW1saXN0W2luZGV4XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLmdvbGRfbnVtICs9IG51bWxpc3RbaW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aW5kb3cuR0FNRV9DT05UUk9MKSB7XG4gICAgICAgICAgICB3aW5kb3cuR0FNRV9DT05UUk9MLkJveFJld2FyZChpbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgfVxuXG4gICAgb25TaGFyZUdldCgpIHtcbiAgICAgICAgdGhpcy5fb25zaG93YmFjayA9IHRydWU7XG4gICAgICAgIFNoYXJlU2RrLnNoYXJlQXBwTWVzc2FnZSh7XG4gICAgICAgICAgICB0aXRsZTogXCLmiJHlsLHnnIvnnYDkvaDvvIznm7TliLDkvaDmiZPlvIDlrp3nrrHkuLrmraJcIixcbiAgICAgICAgICAgIGltYWdlVXJsOiB3aW5kb3cudGVtcEZpbGVVUkxbM10sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/SkinPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7d7b7KFR5ZEOL77nMnw9U+A', 'SkinPanel');
// Script/item/SkinPanel.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SkinPanel = /** @class */ (function (_super) {
    __extends(SkinPanel, _super);
    function SkinPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_n_content = null;
        _this.m_pre_skinitem = null;
        _this["m_star0"] = null;
        _this["m_star1"] = null;
        _this["m_star2"] = null;
        _this["m_star3"] = null;
        _this["m_star4"] = null;
        _this.m_n_list = [];
        return _this;
        // update (dt) {}
    }
    SkinPanel.prototype.start = function () {
        EVENT_LISTENER.on(window.GAME_SAVE_HANDLER, this.updateData, this);
    };
    SkinPanel.prototype.initData = function () {
        var data = window.SKIN_CONFIG;
        for (var i = 0; i < data.length; i++) {
            var node = cc.instantiate(this.m_pre_skinitem);
            node.parent = this.m_n_content;
            node.getComponent('SkinItem').updateData(i, data[i], this['m_star' + i]);
            this.m_n_list.push(node);
        }
    };
    SkinPanel.prototype.updateData = function () {
        var data = window.SKIN_CONFIG;
        for (var i = 0; i < data.length; i++) {
            var node = this.m_n_list[i];
            node.getComponent('SkinItem').updateData(i, data[i], this['m_star' + i]);
        }
    };
    SkinPanel.prototype.onDestroy = function () {
        EVENT_LISTENER.off(window.GAME_SAVE_HANDLER, this);
    };
    SkinPanel.prototype.onClose = function () {
        this.node.active = false;
    };
    __decorate([
        property(cc.Node)
    ], SkinPanel.prototype, "m_n_content", void 0);
    __decorate([
        property(cc.Prefab)
    ], SkinPanel.prototype, "m_pre_skinitem", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SkinPanel.prototype, "m_star0", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SkinPanel.prototype, "m_star1", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SkinPanel.prototype, "m_star2", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SkinPanel.prototype, "m_star3", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SkinPanel.prototype, "m_star4", void 0);
    SkinPanel = __decorate([
        ccclass
    ], SkinPanel);
    return SkinPanel;
}(cc.Component));
exports.default = SkinPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvaXRlbS9Ta2luUGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBSzVDO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBbURDO1FBaERHLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLG9CQUFjLEdBQWMsSUFBSSxDQUFDO1FBR2pDLE1BQUMsU0FBUyxDQUFDLEdBQW1CLElBQUksQ0FBQztRQUVuQyxNQUFDLFNBQVMsQ0FBQyxHQUFtQixJQUFJLENBQUM7UUFFbkMsTUFBQyxTQUFTLENBQUMsR0FBbUIsSUFBSSxDQUFDO1FBRW5DLE1BQUMsU0FBUyxDQUFDLEdBQW1CLElBQUksQ0FBQztRQUVuQyxNQUFDLFNBQVMsQ0FBQyxHQUFtQixJQUFJLENBQUM7UUFFM0IsY0FBUSxHQUFRLEVBQUUsQ0FBQzs7UUErQjNCLGlCQUFpQjtJQUNyQixDQUFDO0lBOUJHLHlCQUFLLEdBQUw7UUFDSSxjQUFjLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCw0QkFBUSxHQUFSO1FBQ0ksSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUM5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBRUQsOEJBQVUsR0FBVjtRQUNJLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1RTtJQUNMLENBQUM7SUFFRCw2QkFBUyxHQUFUO1FBQ0ksY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELDJCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQTlDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNVO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7cURBQ2E7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzs0QkFDeEIsU0FBUyxTQUF5QjtJQUVuQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOzRCQUN4QixTQUFTLFNBQXlCO0lBRW5DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7NEJBQ3hCLFNBQVMsU0FBeUI7SUFFbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzs0QkFDeEIsU0FBUyxTQUF5QjtJQUVuQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOzRCQUN4QixTQUFTLFNBQXlCO0lBakJsQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBbUQ3QjtJQUFELGdCQUFDO0NBbkRELEFBbURDLENBbkRzQyxFQUFFLENBQUMsU0FBUyxHQW1EbEQ7a0JBbkRvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuZGVjbGFyZSB2YXIgd2luZG93OiBhbnk7XG5kZWNsYXJlIHZhciBFVkVOVF9MSVNURU5FUjogYW55O1xuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNraW5QYW5lbCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBtX25fY29udGVudDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIG1fcHJlX3NraW5pdGVtOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIFtcIm1fc3RhcjBcIl06IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gICAgW1wibV9zdGFyMVwiXTogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBbXCJtX3N0YXIyXCJdOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIFtcIm1fc3RhcjNcIl06IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gICAgW1wibV9zdGFyNFwiXTogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBtX25fbGlzdDogYW55ID0gW107XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgRVZFTlRfTElTVEVORVIub24od2luZG93LkdBTUVfU0FWRV9IQU5ETEVSLCB0aGlzLnVwZGF0ZURhdGEsIHRoaXMpO1xuICAgIH1cblxuICAgIGluaXREYXRhKCkge1xuICAgICAgICBsZXQgZGF0YSA9IHdpbmRvdy5TS0lOX0NPTkZJRztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubV9wcmVfc2tpbml0ZW0pO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm1fbl9jb250ZW50O1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ1NraW5JdGVtJykudXBkYXRlRGF0YShpLCBkYXRhW2ldLCB0aGlzWydtX3N0YXInICsgaV0pO1xuICAgICAgICAgICAgdGhpcy5tX25fbGlzdC5wdXNoKG5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlRGF0YSgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB3aW5kb3cuU0tJTl9DT05GSUc7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLm1fbl9saXN0W2ldO1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ1NraW5JdGVtJykudXBkYXRlRGF0YShpLCBkYXRhW2ldLCB0aGlzWydtX3N0YXInICsgaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBFVkVOVF9MSVNURU5FUi5vZmYod2luZG93LkdBTUVfU0FWRV9IQU5ETEVSLCB0aGlzKTtcbiAgICB9XG5cbiAgICBvbkNsb3NlKCkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/UseToolItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fb269ugEF5GsaQCUfIigkE3', 'UseToolItem');
// Script/item/UseToolItem.js

"use strict";

var _Common_CommonUtil = _interopRequireDefault(require("../common/Common_CommonUtil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Utils = require("Utils");

var ShareSdk = require('ShareSdk');

cc.Class({
  "extends": cc.Component,
  properties: {
    m_sp_tool: cc.Sprite,
    m_n_get: cc.Node,
    _tag: 0,
    m_sp_desclist: {
      type: cc.Node,
      "default": []
    },
    m_n_shareget: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {
    EVENT_LISTENER.on(window.ON_SHOW_BACK, this.onshowback, this);
    this.m_n_shareget.active = window.BOX_SHARE && !window.firstshare;
  },
  initToolInfo: function initToolInfo(tag, num, sp) {
    // console.log(tag, num)
    this._tag = tag;
    this.m_n_get.active = num <= 0;
  },
  onCloseClick: function onCloseClick() {
    this.node.active = false;
  },
  onUseClick: function onUseClick() {
    if (this._tag == 0) {} else if (this._tag == 1) {
      if (window.GAME_CONTROL) {
        window.GAME_CONTROL.onUseStrong();
        this.onCloseClick();
      }
    }
  },
  onAdBtnClick: function onAdBtnClick(event, custom) {
    if (typeof wx != 'undefined') {
      var VersionToast = function VersionToast() {
        wx.showToast({
          title: "微信版本过低，无法看广告",
          icon: "none",
          image: "",
          duration: 0
        });
        setTimeout(function () {
          return wx.hideToast();
        }, 2000);
      };

      var info = wx.getSystemInfoSync();

      if (info.SDKVersion >= '2.0.4') {
        this.showAd(custom);
      } else {
        VersionToast();
      }
    } else {
      // console.log('it is not wechat');
      this.videoReward(custom);
    }
  },
  showAd: function showAd(custom) {
    var self = this;

    if (!this.m_videoAd) {
      this.m_videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-e573e466be94d7f5'
      });
    }

    this.m_videoAd.onError(function (err) {});
    this.m_videoAd.load().then(function () {
      self.m_videoAd.show();
      self.m_videoAd.onClose(function (status) {
        self.m_videoAd.offClose();

        if (status && status.isEnded || status === undefined) {
          self.videoReward(custom);
        } else {}
      });
    })["catch"](function (err) {
      return Utils.showTipsText("拉去视频广告失败，请稍候重试", null, null, null, 60, cc.Color.BLACK, 1.2);
    });
  },
  videoReward: function videoReward(custom) {
    window.INIT_GAME_SAVE_DATA.tool[this._tag] += 1;
    Utils.showGetItem(1, 0, null, 0, 0);

    if (window.GAME_CONTROL) {
      window.GAME_CONTROL.updateToolsNum();
    }
  },
  onshowback: function onshowback(time) {
    if (this._onshowback) {
      if (time >= window.SHARE_TIME) {
        window.firstshare = true;
        this.m_n_shareget.active = window.BOX_SHARE && !window.firstshare;
        this.videoReward();
      } else {
        _Common_CommonUtil["default"].showShareFailTips();
      }

      this._onshowback = false;
    }
  },
  onGetClick: function onGetClick() {
    if (window.INIT_GAME_SAVE_DATA.gold_num >= 20) {
      // Utils.showTipsText("购买成功", null, 0, 0, 60, cc.Color.WHITE, );
      Utils.showGetItem(1, 0, null, 0, 0);
      window.INIT_GAME_SAVE_DATA.gold_num -= 20;
      window.INIT_GAME_SAVE_DATA.tool[this._tag] += 1;

      if (window.GAME_CONTROL) {
        window.GAME_CONTROL.updateToolsNum();
      }
    } else {
      Utils.showTipsText("金币不足", null, 0, 0, 60, cc.Color.WHITE);
    }
  },
  onDestroy: function onDestroy() {
    EVENT_LISTENER.off(window.ON_SHOW_BACK, this);

    if (this.m_videoAd) {
      this.m_videoAd.destroy();
      this.m_videoAd = null;
    }
  },
  onShareGet: function onShareGet() {
    this._onshowback = true;
    ShareSdk.shareAppMessage({
      title: "快扶着这个炸弹，要爆啦！要爆啦！",
      imageUrl: window.tempFileURL[3]
    });
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvaXRlbS9Vc2VUb29sSXRlbS5qcyJdLCJuYW1lcyI6WyJVdGlscyIsInJlcXVpcmUiLCJTaGFyZVNkayIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibV9zcF90b29sIiwiU3ByaXRlIiwibV9uX2dldCIsIk5vZGUiLCJfdGFnIiwibV9zcF9kZXNjbGlzdCIsInR5cGUiLCJtX25fc2hhcmVnZXQiLCJzdGFydCIsIkVWRU5UX0xJU1RFTkVSIiwib24iLCJ3aW5kb3ciLCJPTl9TSE9XX0JBQ0siLCJvbnNob3diYWNrIiwiYWN0aXZlIiwiQk9YX1NIQVJFIiwiZmlyc3RzaGFyZSIsImluaXRUb29sSW5mbyIsInRhZyIsIm51bSIsInNwIiwib25DbG9zZUNsaWNrIiwibm9kZSIsIm9uVXNlQ2xpY2siLCJHQU1FX0NPTlRST0wiLCJvblVzZVN0cm9uZyIsIm9uQWRCdG5DbGljayIsImV2ZW50IiwiY3VzdG9tIiwid3giLCJWZXJzaW9uVG9hc3QiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJpbWFnZSIsImR1cmF0aW9uIiwic2V0VGltZW91dCIsImhpZGVUb2FzdCIsImluZm8iLCJnZXRTeXN0ZW1JbmZvU3luYyIsIlNES1ZlcnNpb24iLCJzaG93QWQiLCJ2aWRlb1Jld2FyZCIsInNlbGYiLCJtX3ZpZGVvQWQiLCJjcmVhdGVSZXdhcmRlZFZpZGVvQWQiLCJhZFVuaXRJZCIsIm9uRXJyb3IiLCJlcnIiLCJsb2FkIiwidGhlbiIsInNob3ciLCJvbkNsb3NlIiwic3RhdHVzIiwib2ZmQ2xvc2UiLCJpc0VuZGVkIiwidW5kZWZpbmVkIiwic2hvd1RpcHNUZXh0IiwiQ29sb3IiLCJCTEFDSyIsIklOSVRfR0FNRV9TQVZFX0RBVEEiLCJ0b29sIiwic2hvd0dldEl0ZW0iLCJ1cGRhdGVUb29sc051bSIsInRpbWUiLCJfb25zaG93YmFjayIsIlNIQVJFX1RJTUUiLCJDb21tb25fQ29tbW9uVXRpbCIsInNob3dTaGFyZUZhaWxUaXBzIiwib25HZXRDbGljayIsImdvbGRfbnVtIiwiV0hJVEUiLCJvbkRlc3Ryb3kiLCJvZmYiLCJkZXN0cm95Iiwib25TaGFyZUdldCIsInNoYXJlQXBwTWVzc2FnZSIsImltYWdlVXJsIiwidGVtcEZpbGVVUkwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQSxJQUFJQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxPQUFELENBQW5COztBQUNBLElBQUlDLFFBQVEsR0FBR0QsT0FBTyxDQUFDLFVBQUQsQ0FBdEI7O0FBQ0FFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUVKLEVBQUUsQ0FBQ0ssTUFETjtBQUVSQyxJQUFBQSxPQUFPLEVBQUVOLEVBQUUsQ0FBQ08sSUFGSjtBQUdSQyxJQUFBQSxJQUFJLEVBQUUsQ0FIRTtBQUlSQyxJQUFBQSxhQUFhLEVBQUU7QUFBRUMsTUFBQUEsSUFBSSxFQUFFVixFQUFFLENBQUNPLElBQVg7QUFBaUIsaUJBQVM7QUFBMUIsS0FKUDtBQUtSSSxJQUFBQSxZQUFZLEVBQUVYLEVBQUUsQ0FBQ087QUFMVCxHQUhQO0FBV0w7QUFFQTtBQUVBSyxFQUFBQSxLQWZLLG1CQWVHO0FBQ0pDLElBQUFBLGNBQWMsQ0FBQ0MsRUFBZixDQUFrQkMsTUFBTSxDQUFDQyxZQUF6QixFQUF1QyxLQUFLQyxVQUE1QyxFQUF3RCxJQUF4RDtBQUNBLFNBQUtOLFlBQUwsQ0FBa0JPLE1BQWxCLEdBQTJCSCxNQUFNLENBQUNJLFNBQVAsSUFBb0IsQ0FBQ0osTUFBTSxDQUFDSyxVQUF2RDtBQUNILEdBbEJJO0FBcUJMQyxFQUFBQSxZQXJCSyx3QkFxQlFDLEdBckJSLEVBcUJhQyxHQXJCYixFQXFCa0JDLEVBckJsQixFQXFCc0I7QUFDdkI7QUFDQSxTQUFLaEIsSUFBTCxHQUFZYyxHQUFaO0FBQ0EsU0FBS2hCLE9BQUwsQ0FBYVksTUFBYixH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UUFBQUEsTUFBTSxDQUFDYSxZQUFQLENBQW9CdUMsY0FBcEI7QUFDSDtBQUNKLEtBUkQsTUFRTztBQUNIdEUsTUFBQUEsS0FBSyxDQUFDZ0UsWUFBTixDQUFtQixNQUFuQixFQUEyQixJQUEzQixFQUFpQyxDQUFqQyxFQUFvQyxDQUFwQyxFQUF1QyxFQUF2QyxFQUEyQzdELEVBQUUsQ0FBQzhELEtBQUgsQ0FBU2EsS0FBcEQ7QUFDSDtBQUNKLEdBNUhJO0FBOEhMQyxFQUFBQSxTQTlISyx1QkE4SE87QUFDUi9ELElBQUFBLGNBQWMsQ0FBQ2dFLEdBQWYsQ0FBbUI5RCxNQUFNLENBQUNDLFlBQTFCLEVBQXdDLElBQXhDOztBQUNBLFFBQUksS0FBS2dDLFNBQVQsRUFBb0I7QUFDaEIsV0FBS0EsU0FBTCxDQUFlOEIsT0FBZjtBQUNBLFdBQUs5QixTQUFMLEdBQWlCLElBQWpCO0FBQ0g7QUFDSixHQXBJSTtBQXNJTCtCLEVBQUFBLFVBdElLLHdCQXNJUTtBQUNULFNBQUtWLFdBQUwsR0FBbUIsSUFBbkI7QUFDQXRFLElBQUFBLFFBQVEsQ0FBQ2lGLGVBQVQsQ0FBeUI7QUFDckI1QyxNQUFBQSxLQUFLLEVBQUUsa0JBRGM7QUFFckI2QyxNQUFBQSxRQUFRLEVBQUVsRSxNQUFNLENBQUNtRSxXQUFQLENBQW1CLENBQW5CO0FBRlcsS0FBekI7QUFJSCxHQTVJSSxDQTZJTDs7QUE3SUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbW1vbl9Db21tb25VdGlsIGZyb20gJy4uL2NvbW1vbi9Db21tb25fQ29tbW9uVXRpbCdcbnZhciBVdGlscyA9IHJlcXVpcmUoXCJVdGlsc1wiKTtcbnZhciBTaGFyZVNkayA9IHJlcXVpcmUoJ1NoYXJlU2RrJyk7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBtX3NwX3Rvb2w6IGNjLlNwcml0ZSxcbiAgICAgICAgbV9uX2dldDogY2MuTm9kZSxcbiAgICAgICAgX3RhZzogMCxcbiAgICAgICAgbV9zcF9kZXNjbGlzdDogeyB0eXBlOiBjYy5Ob2RlLCBkZWZhdWx0OiBbXSB9LFxuICAgICAgICBtX25fc2hhcmVnZXQ6IGNjLk5vZGUsXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIEVWRU5UX0xJU1RFTkVSLm9uKHdpbmRvdy5PTl9TSE9XX0JBQ0ssIHRoaXMub25zaG93YmFjaywgdGhpcyk7XG4gICAgICAgIHRoaXMubV9uX3NoYXJlZ2V0LmFjdGl2ZSA9IHdpbmRvdy5CT1hfU0hBUkUgJiYgIXdpbmRvdy5maXJzdHNoYXJlO1xuICAgIH0sXG5cblxuICAgIGluaXRUb29sSW5mbyh0YWcsIG51bSwgc3ApIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGFnLCBudW0pXG4gICAgICAgIHRoaXMuX3RhZyA9IHRhZztcbiAgICAgICAgdGhpcy5tX25fZ2V0LmFjdGl2ZSA9IG51bSA8PSAwO1xuICAgIH0sXG5cbiAgICBvbkNsb3NlQ2xpY2soKSB7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgb25Vc2VDbGljaygpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RhZyA9PSAwKSB7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl90YWcgPT0gMSkge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5HQU1FX0NPTlRST0wpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuR0FNRV9DT05UUk9MLm9uVXNlU3Ryb25nKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsb3NlQ2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkFkQnRuQ2xpY2soZXZlbnQsIGN1c3RvbSkge1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGxldCBWZXJzaW9uVG9hc3QgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi5b6u5L+h54mI5pys6L+H5L2O77yM5peg5rOV55yL5bm/5ZGKXCIsXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDAsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB3eC5oaWRlVG9hc3QoKSwgMjAwMCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IGluZm8gPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgICAgICAgICAgaWYgKGluZm8uU0RLVmVyc2lvbiA+PSAnMi4wLjQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93QWQoY3VzdG9tKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgVmVyc2lvblRvYXN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaXQgaXMgbm90IHdlY2hhdCcpO1xuICAgICAgICAgICAgdGhpcy52aWRlb1Jld2FyZChjdXN0b20pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNob3dBZChjdXN0b20pIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMubV92aWRlb0FkKSB7XG4gICAgICAgICAgICB0aGlzLm1fdmlkZW9BZCA9IHd4LmNyZWF0ZVJld2FyZGVkVmlkZW9BZCh7XG4gICAgICAgICAgICAgICAgYWRVbml0SWQ6ICdhZHVuaXQtZTU3M2U0NjZiZTk0ZDdmNSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubV92aWRlb0FkLm9uRXJyb3IoZXJyID0+IHtcblxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1fdmlkZW9BZC5sb2FkKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLm1fdmlkZW9BZC5zaG93KCk7XG4gICAgICAgICAgICAgICAgc2VsZi5tX3ZpZGVvQWQub25DbG9zZSgoc3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubV92aWRlb0FkLm9mZkNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgJiYgc3RhdHVzLmlzRW5kZWQgfHwgc3RhdHVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudmlkZW9SZXdhcmQoY3VzdG9tKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBVdGlscy5zaG93VGlwc1RleHQoXCLmi4nljrvop4bpopHlub/lkYrlpLHotKXvvIzor7fnqI3lgJnph43or5VcIiwgbnVsbCwgbnVsbCwgbnVsbCwgNjAsIGNjLkNvbG9yLkJMQUNLLCAxLjIpKTtcbiAgICB9LFxuXG4gICAgdmlkZW9SZXdhcmQoY3VzdG9tKSB7XG4gICAgICAgIHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLnRvb2xbdGhpcy5fdGFnXSArPSAxO1xuICAgICAgICBVdGlscy5zaG93R2V0SXRlbSgxLCAwLCBudWxsLCAwLCAwKTtcbiAgICAgICAgaWYgKHdpbmRvdy5HQU1FX0NPTlRST0wpIHtcbiAgICAgICAgICAgIHdpbmRvdy5HQU1FX0NPTlRST0wudXBkYXRlVG9vbHNOdW0oKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbnNob3diYWNrKHRpbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX29uc2hvd2JhY2spIHtcbiAgICAgICAgICAgIGlmICh0aW1lID49IHdpbmRvdy5TSEFSRV9USU1FKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmZpcnN0c2hhcmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubV9uX3NoYXJlZ2V0LmFjdGl2ZSA9IHdpbmRvdy5CT1hfU0hBUkUgJiYgIXdpbmRvdy5maXJzdHNoYXJlO1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9SZXdhcmQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgQ29tbW9uX0NvbW1vblV0aWwuc2hvd1NoYXJlRmFpbFRpcHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX29uc2hvd2JhY2sgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkdldENsaWNrKCkge1xuICAgICAgICBpZiAod2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEuZ29sZF9udW0gPj0gMjApIHtcbiAgICAgICAgICAgIC8vIFV0aWxzLnNob3dUaXBzVGV4dChcIui0reS5sOaIkOWKn1wiLCBudWxsLCAwLCAwLCA2MCwgY2MuQ29sb3IuV0hJVEUsICk7XG4gICAgICAgICAgICBVdGlscy5zaG93R2V0SXRlbSgxLCAwLCBudWxsLCAwLCAwKTtcbiAgICAgICAgICAgIHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLmdvbGRfbnVtIC09IDIwO1xuICAgICAgICAgICAgd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEudG9vbFt0aGlzLl90YWddICs9IDE7XG4gICAgICAgICAgICBpZiAod2luZG93LkdBTUVfQ09OVFJPTCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5HQU1FX0NPTlRST0wudXBkYXRlVG9vbHNOdW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFV0aWxzLnNob3dUaXBzVGV4dChcIumHkeW4geS4jei2s1wiLCBudWxsLCAwLCAwLCA2MCwgY2MuQ29sb3IuV0hJVEUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgRVZFTlRfTElTVEVORVIub2ZmKHdpbmRvdy5PTl9TSE9XX0JBQ0ssIHRoaXMpO1xuICAgICAgICBpZiAodGhpcy5tX3ZpZGVvQWQpIHtcbiAgICAgICAgICAgIHRoaXMubV92aWRlb0FkLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMubV92aWRlb0FkID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvblNoYXJlR2V0KCkge1xuICAgICAgICB0aGlzLl9vbnNob3diYWNrID0gdHJ1ZTtcbiAgICAgICAgU2hhcmVTZGsuc2hhcmVBcHBNZXNzYWdlKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIuW/q+aJtuedgOi/meS4queCuOW8ue+8jOimgeeIhuWVpu+8geimgeeIhuWVpu+8gVwiLFxuICAgICAgICAgICAgaW1hZ2VVcmw6IHdpbmRvdy50ZW1wRmlsZVVSTFszXSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/BgItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '36677ltfcNFbZGeI09kkTxO', 'BgItem');
// Script/item/BgItem.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    m_n_bgday: cc.Node,
    m_n_bgnight: cc.Node
  },
  start: function start() {
    var myDate = new Date(); //获取系统当前时间

    var hours = myDate.getHours();
    this.m_n_bgday.active = hours >= 8 && hours <= 18;
    this.m_n_bgnight.active = hours < 8 || hours > 18;
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvaXRlbS9CZ0l0ZW0uanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJtX25fYmdkYXkiLCJOb2RlIiwibV9uX2JnbmlnaHQiLCJzdGFydCIsIm15RGF0ZSIsIkRhdGUiLCJob3VycyIsImdldEhvdXJzIiwiYWN0aXZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsU0FBUyxFQUFFSixFQUFFLENBQUNLLElBRE47QUFFUkMsSUFBQUEsV0FBVyxFQUFFTixFQUFFLENBQUNLO0FBRlIsR0FIUDtBQVNMRSxFQUFBQSxLQVRLLG1CQVNHO0FBQ0osUUFBSUMsTUFBTSxHQUFHLElBQUlDLElBQUosRUFBYixDQURJLENBQ29COztBQUN4QixRQUFJQyxLQUFLLEdBQUdGLE1BQU0sQ0FBQ0csUUFBUCxFQUFaO0FBQ0EsU0FBS1AsU0FBTCxDQUFlUSxNQUFmLEdBQXdCRixLQUFLLElBQUksQ0FBVCxJQUFjQSxLQUFLLElBQUksRUFBL0M7QUFDQSxTQUFLSixXQUFMLENBQWlCTSxNQUFqQixHQUEwQkYsS0FBSyxHQUFHLENBQVIsSUFBYUEsS0FBSyxHQUFHLEVBQS9DO0FBQ0gsR0FkSSxDQWdCTDs7QUFoQkssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBtX25fYmdkYXk6IGNjLk5vZGUsXG4gICAgICAgIG1fbl9iZ25pZ2h0OiBjYy5Ob2RlLFxuICAgIH0sXG5cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB2YXIgbXlEYXRlID0gbmV3IERhdGUoKTsvL+iOt+WPluezu+e7n+W9k+WJjeaXtumXtFxuICAgICAgICBsZXQgaG91cnMgPSBteURhdGUuZ2V0SG91cnMoKTtcbiAgICAgICAgdGhpcy5tX25fYmdkYXkuYWN0aXZlID0gaG91cnMgPj0gOCAmJiBob3VycyA8PSAxODtcbiAgICAgICAgdGhpcy5tX25fYmduaWdodC5hY3RpdmUgPSBob3VycyA8IDggfHwgaG91cnMgPiAxODtcbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/StepViewItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7c6faZ4BVRBNJ+xBP+ShYY7', 'StepViewItem');
// Script/item/StepViewItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Common_CommonUtil_1 = require("../common/Common_CommonUtil");
var Utils = require("../common/Utils");
var ShareSDk = require("../common/ShareSdk");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var StepViewItem = /** @class */ (function (_super) {
    __extends(StepViewItem, _super);
    function StepViewItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // onLoad () {}
        _this._callback = null;
        _this.m_sp_stepicon = null;
        _this.m_sp_stepname = null;
        _this.m_n_starlist = [];
        _this.m_n_bg = null;
        _this.m_l_steptitle = null;
        _this.m_spa_list = null;
        _this._stepname = "";
        _this._onshowback = false;
        return _this;
        // update (dt) {}
    }
    StepViewItem.prototype.start = function () {
        EVENT_LISTENER.on(window.ON_SHOW_BACK, this.onshowback, this);
    };
    StepViewItem.prototype.onDestroy = function () {
        EVENT_LISTENER.off(window.ON_SHOW_BACK, this);
    };
    StepViewItem.prototype.setCloseCallback = function (callback) {
        this._callback = callback;
    };
    StepViewItem.prototype.onClose = function () {
        if (this._callback)
            this._callback();
        this.node.active = false;
    };
    StepViewItem.prototype.onshowback = function (time) {
        if (this._onshowback) {
            this._onshowback = false;
            this.onClose();
        }
    };
    /**
     * 显示获得段位信息
     * @param lv 等级
     */
    StepViewItem.prototype.showStep = function (lv) {
        var _this = this;
        var num = this.updateData(lv);
        for (var i = 0; i < this.m_n_starlist.length; i++) {
            this.m_n_starlist[i].active = false;
        }
        this.m_sp_stepicon.node.getComponent(cc.Animation).play('playstep');
        this.m_sp_stepname.node.getComponent(cc.Animation).play('playstep');
        this.scheduleOnce(function () {
            Common_CommonUtil_1.default.shakeScreen(_this.m_n_bg);
        }, 0.4);
        var _loop_1 = function (i) {
            this_1.m_n_starlist[i].active = true;
            this_1.m_n_starlist[i].scale = 0;
            this_1.scheduleOnce(function () {
                _this.m_n_starlist[i].runAction(cc.sequence(cc.scaleTo(0.2, 1.4, 1.4).easing(cc.easeIn(3.0)), cc.scaleTo(0.1, 1, 1)));
                Utils.SetSoundEffect(window.GET_GOLD, false, 1);
            }, 0.54 + (i + 1) * 0.3);
        };
        var this_1 = this;
        for (var i = 0; i < num; i++) {
            _loop_1(i);
        }
    };
    StepViewItem.prototype.updateData = function (lv) {
        if (lv === void 0) { lv = 0; }
        var index = Math.floor(lv / 10);
        var stepdata = window.STEP_CONFIG[index - 1];
        var num = 0;
        if (stepdata) {
            num = stepdata.star;
            this._stepname = stepdata.desc;
            this.m_l_steptitle.string = cc.js.formatStr("完成%d关 段位提升", lv);
            this.m_sp_stepicon.spriteFrame = this.m_spa_list.getSpriteFrame(stepdata.icon_path);
            this.m_sp_stepname.spriteFrame = this.m_spa_list.getSpriteFrame(stepdata.desc_path);
        }
        return num;
    };
    StepViewItem.prototype.setShowBtnVisible = function (boo) {
        for (var i = 0; i < this.m_n_starlist.length; i++) {
            this.m_n_starlist[i].active = boo;
        }
        this.m_sp_stepicon.node.active = boo;
        this.m_sp_stepname.node.active = boo;
    };
    StepViewItem.prototype.onShareStep = function () {
        this._onshowback = true;
        ShareSDk.shareAppMessage({
            title: "消除段位升级到【" + this._stepname + "】,一起来见证吧",
            imageUrl: window.tempFileURL[1],
        });
    };
    __decorate([
        property(cc.Sprite)
    ], StepViewItem.prototype, "m_sp_stepicon", void 0);
    __decorate([
        property(cc.Sprite)
    ], StepViewItem.prototype, "m_sp_stepname", void 0);
    __decorate([
        property([cc.Node])
    ], StepViewItem.prototype, "m_n_starlist", void 0);
    __decorate([
        property(cc.Node)
    ], StepViewItem.prototype, "m_n_bg", void 0);
    __decorate([
        property(cc.Label)
    ], StepViewItem.prototype, "m_l_steptitle", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], StepViewItem.prototype, "m_spa_list", void 0);
    StepViewItem = __decorate([
        ccclass
    ], StepViewItem);
    return StepViewItem;
}(cc.Component));
exports.default = StepViewItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvaXRlbS9TdGVwVmlld0l0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlFQUE0RDtBQUM1RCx1Q0FBMEM7QUFDMUMsNkNBQWdEO0FBQzFDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBSTVDO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBdUdDO1FBdEdHLGVBQWU7UUFDUCxlQUFTLEdBQUcsSUFBSSxDQUFDO1FBR3pCLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBR2hDLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBR2hDLGtCQUFZLEdBQWMsRUFBRSxDQUFDO1FBRzdCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFHdkIsbUJBQWEsR0FBYSxJQUFJLENBQUM7UUFHL0IsZ0JBQVUsR0FBbUIsSUFBSSxDQUFDO1FBRTFCLGVBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixpQkFBVyxHQUFZLEtBQUssQ0FBQzs7UUErRXJDLGlCQUFpQjtJQUNyQixDQUFDO0lBL0VHLDRCQUFLLEdBQUw7UUFDSSxjQUFjLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsZ0NBQVMsR0FBVDtRQUNJLGNBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsdUNBQWdCLEdBQWhCLFVBQWlCLFFBQVE7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDOUIsQ0FBQztJQUVELDhCQUFPLEdBQVA7UUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTO1lBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtB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QUMsS0FBSyxDQUFDO3VEQUNZO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7b0RBQ1M7SUFwQmpCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0F1R2hDO0lBQUQsbUJBQUM7Q0F2R0QsQUF1R0MsQ0F2R3lDLEVBQUUsQ0FBQyxTQUFTLEdBdUdyRDtrQkF2R29CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tbW9uX0NvbW1vblV0aWwgZnJvbSBcIi4uL2NvbW1vbi9Db21tb25fQ29tbW9uVXRpbFwiO1xuaW1wb3J0IFV0aWxzID0gcmVxdWlyZShcIi4uL2NvbW1vbi9VdGlsc1wiKTtcbmltcG9ydCBTaGFyZVNEayA9IHJlcXVpcmUoXCIuLi9jb21tb24vU2hhcmVTZGtcIik7XG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuZGVjbGFyZSB2YXIgd2luZG93OiBhbnk7XG5kZWNsYXJlIHZhciBFVkVOVF9MSVNURU5FUjogYW55O1xuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0ZXBWaWV3SXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgLy8gb25Mb2FkICgpIHt9XG4gICAgcHJpdmF0ZSBfY2FsbGJhY2sgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBtX3NwX3N0ZXBpY29uOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBtX3NwX3N0ZXBuYW1lOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KFtjYy5Ob2RlXSlcbiAgICBtX25fc3Rhcmxpc3Q6IGNjLk5vZGVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbV9uX2JnOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBtX2xfc3RlcHRpdGxlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlQXRsYXMpXG4gICAgbV9zcGFfbGlzdDogY2MuU3ByaXRlQXRsYXMgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfc3RlcG5hbWUgPSBcIlwiO1xuICAgIHByaXZhdGUgX29uc2hvd2JhY2s6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBzdGFydCgpIHtcbiAgICAgICAgRVZFTlRfTElTVEVORVIub24od2luZG93Lk9OX1NIT1dfQkFDSywgdGhpcy5vbnNob3diYWNrLCB0aGlzKTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIEVWRU5UX0xJU1RFTkVSLm9mZih3aW5kb3cuT05fU0hPV19CQUNLLCB0aGlzKTtcbiAgICB9XG5cbiAgICBzZXRDbG9zZUNhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgfVxuXG4gICAgb25DbG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NhbGxiYWNrKSB0aGlzLl9jYWxsYmFjaygpO1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25zaG93YmFjayh0aW1lKSB7XG4gICAgICAgIGlmICh0aGlzLl9vbnNob3diYWNrKSB7XG4gICAgICAgICAgICB0aGlzLl9vbnNob3diYWNrID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaYvuekuuiOt+W+l+auteS9jeS/oeaBr1xuICAgICAqIEBwYXJhbSBsdiDnrYnnuqdcbiAgICAgKi9cbiAgICBzaG93U3RlcChsdjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBudW0gPSB0aGlzLnVwZGF0ZURhdGEobHYpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubV9uX3N0YXJsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLm1fbl9zdGFybGlzdFtpXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1fc3Bfc3RlcGljb24ubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCdwbGF5c3RlcCcpO1xuICAgICAgICB0aGlzLm1fc3Bfc3RlcG5hbWUubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCdwbGF5c3RlcCcpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICBDb21tb25fQ29tbW9uVXRpbC5zaGFrZVNjcmVlbih0aGlzLm1fbl9iZyk7XG4gICAgICAgIH0sIDAuNCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMubV9uX3N0YXJsaXN0W2ldLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1fbl9zdGFybGlzdFtpXS5zY2FsZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tX25fc3Rhcmxpc3RbaV0ucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4yLCAxLjQsIDEuNCkuZWFzaW5nKGNjLmVhc2VJbigzLjApKSwgY2Muc2NhbGVUbygwLjEsIDEsIDEpKSk7XG4gICAgICAgICAgICAgICAgVXRpbHMuU2V0U291bmRFZmZlY3Qod2luZG93LkdFVF9HT0xELCBmYWxzZSwgMSk7XG4gICAgICAgICAgICB9LCAwLjU0ICsgKGkgKyAxKSAqIDAuMyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVEYXRhKGx2OiBudW1iZXIgPSAwKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcihsdiAvIDEwKTtcbiAgICAgICAgbGV0IHN0ZXBkYXRhID0gd2luZG93LlNURVBfQ09ORklHW2luZGV4IC0gMV07XG4gICAgICAgIGxldCBudW0gPSAwO1xuICAgICAgICBpZiAoc3RlcGRhdGEpIHtcbiAgICAgICAgICAgIG51bSA9IHN0ZXBkYXRhLnN0YXI7XG4gICAgICAgICAgICB0aGlzLl9zdGVwbmFtZSA9IHN0ZXBkYXRhLmRlc2M7XG4gICAgICAgICAgICB0aGlzLm1fbF9zdGVwdGl0bGUuc3RyaW5nID0gY2MuanMuZm9ybWF0U3RyKFwi5a6M5oiQJWTlhbMg5q615L2N5o+Q5Y2HXCIsIGx2KTtcbiAgICAgICAgICAgIHRoaXMubV9zcF9zdGVwaWNvbi5zcHJpdGVGcmFtZSA9IHRoaXMubV9zcGFfbGlzdC5nZXRTcHJpdGVGcmFtZShzdGVwZGF0YS5pY29uX3BhdGgpO1xuICAgICAgICAgICAgdGhpcy5tX3NwX3N0ZXBuYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5tX3NwYV9saXN0LmdldFNwcml0ZUZyYW1lKHN0ZXBkYXRhLmRlc2NfcGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bTtcbiAgICB9XG5cbiAgICBzZXRTaG93QnRuVmlzaWJsZShib28pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1fbl9zdGFybGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5tX25fc3Rhcmxpc3RbaV0uYWN0aXZlID0gYm9vO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubV9zcF9zdGVwaWNvbi5ub2RlLmFjdGl2ZSA9IGJvbztcbiAgICAgICAgdGhpcy5tX3NwX3N0ZXBuYW1lLm5vZGUuYWN0aXZlID0gYm9vO1xuICAgIH1cblxuICAgIG9uU2hhcmVTdGVwKCkge1xuICAgICAgICB0aGlzLl9vbnNob3diYWNrID0gdHJ1ZTtcbiAgICAgICAgU2hhcmVTRGsuc2hhcmVBcHBNZXNzYWdlKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIua2iOmZpOauteS9jeWNh+e6p+WIsOOAkFwiICsgdGhpcy5fc3RlcG5hbWUgKyBcIuOAkSzkuIDotbfmnaXop4Hor4HlkKdcIixcbiAgICAgICAgICAgIGltYWdlVXJsOiB3aW5kb3cudGVtcEZpbGVVUkxbMV0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/shader/ccShader_Default_Vert.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '82ac0wtVkVK/K0KFo+pzlyg', 'ccShader_Default_Vert');
// Script/common/shader/ccShader_Default_Vert.js

"use strict";

module.exports = " \nattribute vec4 a_position;\nattribute vec2 a_texCoord;\nattribute vec4 a_color;\nvarying vec4 v_color;\nvarying vec2 v_texCoord;\nvoid main()\n{\n    gl_Position = CC_PMatrix * a_position;\n    v_texCoord = a_texCoord;\n    v_color = a_color;\n}\n";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29tbW9uL3NoYWRlci9jY1NoYWRlcl9EZWZhdWx0X1ZlcnQuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxPQUFQIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9XG5gIFxuYXR0cmlidXRlIHZlYzQgYV9wb3NpdGlvbjtcbmF0dHJpYnV0ZSB2ZWMyIGFfdGV4Q29vcmQ7XG5hdHRyaWJ1dGUgdmVjNCBhX2NvbG9yO1xudmFyeWluZyB2ZWM0IHZfY29sb3I7XG52YXJ5aW5nIHZlYzIgdl90ZXhDb29yZDtcbnZvaWQgbWFpbigpXG57XG4gICAgZ2xfUG9zaXRpb24gPSBDQ19QTWF0cml4ICogYV9wb3NpdGlvbjtcbiAgICB2X3RleENvb3JkID0gYV90ZXhDb29yZDtcbiAgICB2X2NvbG9yID0gYV9jb2xvcjtcbn1cbmAgXG5cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e108aAONHJBsKqEpmBpBRLe', 'GameMain');
// Script/GameMain.js

"use strict";

var Utils = require("Utils");

var ShareSdk = require("ShareSdk");

var RankList = require("RankList");

cc.Class({
  "extends": cc.Component,
  properties: {
    m_n_gamenode: cc.Node,
    m_n_bg_panel: cc.Node,
    m_pre_blockbg: cc.Prefab,
    m_pre_light: cc.Prefab,
    m_pre_boomeffect: cc.Prefab,
    m_pre_boom: cc.Prefab,
    m_l_boomnum: cc.Label,
    m_l_score: cc.Label,
    m_sp_monster: cc.Sprite,
    m_l_level: cc.Label,
    m_n_result_panel: cc.Node,
    m_btn_tool2: cc.Node,
    m_n_guidemask: cc.Node,
    m_n_tooluse: cc.Node,
    m_n_showtime: {
      type: cc.Node,
      "default": []
    },
    m_spf_gold: cc.SpriteFrame,
    m_n_askpanel: cc.Node,
    m_n_boss: cc.Node,
    m_spriteAtlas: cc.SpriteAtlas,
    m_n_bglist: cc.Node,
    m_l_gold: cc.Label,
    m_pre_rock: cc.Prefab,
    m_n_kuai: {
      type: cc.Node,
      "default": []
    },
    m_n_displaycheck: cc.Node,
    m_n_displayrank: cc.Node,
    m_n_stepview: cc.Node,
    m_n_reliveview: cc.Node,
    m_n_video: cc.Node,
    m_n_lookvideo: cc.Node,
    m_n_luckyvideo: cc.Node,
    m_n_doublevideo: cc.Node,
    m_n_doublescore: cc.Node,
    m_n_sharegift: cc.Node,
    m_n_skinpanel: cc.Node,
    m_n_guidenode: cc.Node,
    m_l_asktype: cc.Label,
    m_n_guidefiger: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    window.GAME_CONTROL = this;
    Utils.setDesignResolution();
  },
  onDestroy: function onDestroy() {
    this.m_block_pool.clear();
    this.m_light_pool.clear();
    window.GAME_CONTROL = null;

    if (this.m_bannerad) {
      this.m_bannerad.destroy();
      this.m_bannerad = null;
    }

    EVENT_LISTENER.off(window.GAME_UPDATE_DATA, this);
    EVENT_LISTENER.off(window.GAME_SAVE_HANDLER, this);
  },
  start: function start() {
    if (window.firstGame) window.firstGame = false;
    this.createMap();
    this.initData();
    this.initMonster(this.m_cur_level);
    this.showAdBanner(false);
    this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    EVENT_LISTENER.on(window.GAME_UPDATE_DATA, this.updateGold, this);
    EVENT_LISTENER.on(window.GAME_SAVE_HANDLER, this.updateSkin, this);
    setInterval(function () {
      if (window.getdata) {
        window.Utils.setSaveData();
      }
    }, 6000);
  },
  initData: function initData() {
    var _this = this;

    this.m_n_skinpanel.getComponent("SkinPanel").initData();
    this.m_n_displaycheck.active = true;
    this.m_n_displayrank.active = false;
    this.m_n_lookvideo.active = false;
    this.m_n_doublescore.active = false;
    this.m_gamestate = 0;
    this.m_cur_score = 0;
    this.m_cur_level = window.INIT_GAME_SAVE_DATA.top_level + 1;
    this.m_normal_talktime = 4; //怪物说话间隔

    this.m_normal_curtime = -1;
    this.m_target_block = [];
    this.m_mapblink = false;
    this.m_touch_boom = false;
    this._relivenum = 0;
    this._videonum = 0;
    this._killnum = 0;
    this.m_l_score.string = this.m_cur_score;
    this.m_doublescore = 1; // this.m_l_solidernum.string = "X" + this.m_solidernum;

    this.m_l_level.string = "LV." + this.m_cur_level;
    this.m_l_gold.string = window.INIT_GAME_SAVE_DATA.gold_num;
    this._isdeleting = false; //判断是否正在消除的依据

    this._isbless = false; //是否已经恩赐过

    this.m_block_pool = new cc.NodePool();
    this.m_light_pool = new cc.NodePool();
    this.updateToolsNum();
    this.schedule(function () {
      this.m_btn_tool2.runAction(cc.sequence(cc.repeat(cc.sequence(cc.rotateTo(0.1, -10), cc.rotateTo(0.1, 10)), 3), cc.rotateTo(0.1, 0)));
      this.m_n_video.runAction(cc.sequence(cc.delayTime(1.0), cc.repeat(cc.sequence(cc.rotateTo(0.1, -10), cc.rotateTo(0.1, 10)), 3), cc.rotateTo(0.1, 0)));
      this.m_n_doublevideo.runAction(cc.sequence(cc.delayTime(2.0), cc.repeat(cc.sequence(cc.rotateTo(0.1, -10), cc.rotateTo(0.1, 10)), 3), cc.rotateTo(0.1, 0)));
    }, 5);
    this._configlist = this.m_n_kuai[0].getComponent("ShapeItem").getTheConfig();
    RankList.checkWillSurpass(this.m_cur_score);
    var rand = Utils.random(0, 1000);
    this.m_n_luckyvideo.active = rand <= 500 && this.m_cur_level > 1;

    if (this.m_n_luckyvideo.active) {
      //第一关不出现
      this.m_n_luckyvideo.scale = 0;
      this.m_n_luckyvideo.runAction(cc.sequence(cc.scaleTo(0.2, 1.2, 1.2).easing(cc.easeIn(3.0)), cc.scaleTo(0.1, 1, 1)));

      if (window.SKIN_SHARE) {
        var node = cc.find("btn_cancel", this.m_n_luckyvideo);
        node.y = -570;
        this.scheduleOnce(function () {
          node.y = -514;
          if (_this.m_n_luckyvideo.active && !_this.showAdb) _this.showAdBanner(true);
        }, 1.8);
      }
    }
  },
  hideGuide: function hideGuide() {
    if (this.m_cur_level == 1) {
      this.m_n_guidenode.active = false;
      this.m_n_guidefiger.stopAllActions();
      this.m_n_guidefiger.active = false;
      window.GUIDE_LEVEL = 1;
      cc.sys.localStorage.setItem('guideinfo', '1');
    }
  },
  showGuide: function showGuide() {
    var _this2 = this;

    if (!this._tempguide) {
      this._tempguide = true;
    } else {
      return;
    }

    var typeindex = 0;
    var indexlist = window.INIT_GAME_SAVE_DATA.skin;

    for (var i = 0; i < indexlist.length; i++) {
      if (indexlist[i] >= 2) {
        typeindex = i;
        break;
      }
    }

    var data = window.SKIN_CONFIG[typeindex];
    this.m_n_guidenode.active = true;
    this.m_n_guidefiger.active = true;
    this.m_n_guidefiger.position = this.m_n_kuai[1].position;
    this.m_n_guidefiger.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function () {
      _this2.m_n_guidefiger.position = _this2.m_n_kuai[1].position;
    }), cc.moveTo(1.0, this.m_n_kuai[1].x, this.m_n_kuai[1].y + 350))));
    var index = this.m_n_kuai[0].getComponent("ShapeItem").getCurColorIndex();
    var blockindex = [];
    blockindex[46] = 1;
    blockindex[52] = 1;
    blockindex[53] = 1;
    blockindex[58] = 1;

    for (var _i = 43; _i < 61; _i++) {
      if (blockindex[_i]) {// this.m_maparray[i].getComponent("BlockBGItem").setBrightVisible(true, '#000000');
      } else {
        var node = new cc.Node("colorSpr");
        node.colorIndex = index;
        node.colorName = data.name;
        var sprite = node.addComponent(cc.Sprite);
        console.log(data.name, index);
        sprite.spriteFrame = this.m_spriteAtlas.getSpriteFrame(data.name + index);
        node.position = cc.Vec2.ZERO;
        node.parent = this.m_maparray[_i];
        this.m_maparray[_i].isHaveFK = true;
      }
    }
  },
  onKeepGoing: function onKeepGoing() {
    this.m_n_luckyvideo.active = false;
    this.showAdBanner(false);
  },
  touchEnd: function touchEnd(event) {
    if (this.m_gamestate == 0 && this.m_touch_boom) {
      this.m_gamestate = 2;
      var vec = event.touch.getLocation();
      vec = this.m_n_gamenode.convertToNodeSpace(vec);
      var index = this.backIndexofList(vec);

      if (index >= 0) {
        if (!this.m_maparray[index].isHaveFK) {
          this.m_maparray[index].isHaveFK = true;
          var node = cc.instantiate(this.m_pre_boom);
          node.parent = this.m_maparray[index];
          window.INIT_GAME_SAVE_DATA.tool[0] -= 1;
          this.updateToolsNum();
          this.doBoomAction(this.m_maparray[index].position, index);
        }
      }

      this.m_n_guidemask.active = !this.m_mapblink;
      this.m_touch_boom = !this.m_mapblink;
      this.setMapBlink(!this.m_mapblink);
      this.m_gamestate = 0;

      for (var i = 0; i < this.m_n_kuai.length; i++) {
        var shapeitem = this.m_n_kuai[i].getComponent("ShapeItem");

        if (shapeitem.checkIsLose()) {
          this.m_n_kuai[i].opacity = 125;
        } else {
          this.m_n_kuai[i].opacity = 255;
        }
      }
    }
  },
  doBoomAction: function doBoomAction(pos, index) {
    var _this3 = this;

    var FKNode = this.m_maparray[index].getChildByName("colorSpr"); //这个假方块变大并且渐隐掉

    FKNode.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.5, 2), cc.fadeOut(0.5)), cc.removeSelf(true)));
    this.m_maparray[index].isHaveFK = null;
    this.scheduleOnce(function () {
      var node = cc.instantiate(_this3.m_pre_boomeffect);
      node.parent = _this3.m_n_gamenode;
      node.position = pos;
      node.y -= 100;
      node.zIndex = 1 << 8;
      node.getComponent(cc.Animation).play("bombeffect");
      Utils.SetSoundEffect(window.BOOM_EFFECT, false, 1);
    }, 0.4);
    var list = this.getBoomIndexList(index);
    console.log(list);
    var count = 0;
    var actionAry = [];
    actionAry.push(cc.delayTime(0.4));

    for (var i = 0; i < list.length; i++) {
      var oneList = list[i];

      for (var j = 0; j < oneList.length; j++) {
        var xIndex = oneList[j];

        if (this.m_maparray[xIndex].isHaveFK) {
          actionAry.push(cc.callFunc(function () {
            var xIndex = arguments[1][0];
            var count = arguments[1][1];
            var score = this.getAddScoreCal(count);
            Utils.showHurtText("+" + score, this.m_n_gamenode, this.m_maparray[xIndex].x, this.m_maparray[xIndex].y, 20, null, null, null, true);
            this.updateScore(score);
          }, this, [xIndex, count]));
          actionAry.push(cc.callFunc(function () {
            var xIndex = arguments[1];
            this.m_maparray[xIndex].isHaveFK = null;
            var FKNode = this.m_maparray[xIndex].getChildByName("colorSpr");

            if (!FKNode) {
              return; //防止没有这个方块的时候
            }

            this.attackMonster(FKNode.colorIndex, this.m_maparray[xIndex].x, this.m_maparray[xIndex].y); //这个假方块变大并且渐隐掉

            FKNode.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.5, 2), cc.fadeOut(0.5)), cc.removeSelf(true)));
          }, this, xIndex));
          count++;
        }
      }

      actionAry.push(cc.delayTime(0.3));
    }

    if (actionAry.length > 0) {
      // Utils.SetSoundEffect(window.GET_GOLD, false, 1);
      actionAry.push(cc.callFunc(function () {
        this._isdeleting = false;
        this.checkIsLose();
      }, this));
      this._isdeleting = true;
      var action = cc.sequence(actionAry);
      this.node.runAction(action);
    }
  },

  /**
   * 根据炸弹下标获取范围引爆范围
   * @param {炸弹下标} index 
   */
  getBoomIndexList: function getBoomIndexList(index) {
    return window.boomrange[index];
  },
  bombFinish: function bombFinish() {},

  /**
   * 获取可以放置的方格 3个
   */
  getCanDropBlocks: function getCanDropBlocks() {
    var canDroplsit = [0, 0, 0];

    for (var k = this._configlist.length - 1; k >= 1; k--) {
      //一个个格子放试一下能不能放
      for (var i = 0; i < this.m_maparray.length; i++) {
        var frameNode = this.m_maparray[i];
        var srcPos = cc.v2(frameNode.x, frameNode.y);
        var count = 1;

        if (!frameNode.isHaveFK) {
          //这里做是否可以放的判断
          var children = this._configlist[k];

          for (var j = 1; j < children.length; j++) {
            var len = 52; //碰撞距离

            var childPos = srcPos.add(cc.v2(children[j].x, children[j].y)); //碰撞检测

            for (var s = 0; s < this.m_maparray.length; s++) {
              var tFrameNode = this.m_maparray[s];
              var dis = cc.v2(tFrameNode.x, tFrameNode.y).sub(childPos).mag();

              if (dis <= len && !tFrameNode.isHaveFK) {
                count++; //可以放就要累加计数
              }
            }
          } //如果数量相等就说明这个方块在这个格子是可以放下的


          if (count == children.length) {
            canDroplsit.push(k);
            break;
          }
        }
      }
    }

    if (canDroplsit.length > 3) {
      var arr = Utils.getRandomSDiff(0, canDroplsit.length - 1, 3);
      return [canDroplsit[arr[0]], canDroplsit[arr[1]], canDroplsit[arr[2]]];
    } else {
      return [canDroplsit[0], canDroplsit[1], canDroplsit[2]];
    }
  },
  backIndexofList: function backIndexofList(pos) {
    for (var i = 0; i < window.INDEX_TO_POINT.length; i++) {
      if (pos.sub(cc.v2(window.INDEX_TO_POINT[i][0], window.INDEX_TO_POINT[i][1])).mag() <= 50) {
        return i;
      }
    }

    return -1;
  },
  updateToolsNum: function updateToolsNum() {
    this.m_boomnum = window.INIT_GAME_SAVE_DATA.tool[0];
    this.m_l_boomnum.string = "x" + this.m_boomnum;
    this.setAddVisible(this.m_btn_tool2, this.m_boomnum);
    this.updateGold();
  },
  updateGold: function updateGold() {
    this.m_l_gold.string = window.INIT_GAME_SAVE_DATA.gold_num;
  },
  updateSkin: function updateSkin() {
    console.log('updateskin');
    var data_index = 0;

    for (var i = 0; i < this.m_n_kuai.length; i++) {
      data_index = this.m_n_kuai[i].getComponent("ShapeItem").updateIndex(true);
    }

    var data = window.SKIN_CONFIG[data_index];

    for (var j = 0; j < this.m_maparray.length; j++) {
      var FKNode = this.m_maparray[j].getChildByName("colorSpr");

      if (FKNode) {
        FKNode.getComponent(cc.Sprite).spriteFrame = this.m_spriteAtlas.getSpriteFrame(data.name + FKNode.colorIndex);
      }
    }
  },
  setAddVisible: function setAddVisible(node, num) {
    var addbtn = cc.find("sp_add", node);
    addbtn.active = num <= 0;
  },
  updateScore: function updateScore(score) {
    this.m_cur_score += score;
    this.m_l_score.string = this.m_cur_score;
    if (!this.m_n_result_panel.active) RankList.checkWillSurpass(this.m_cur_score);

    if (this.m_cur_score > window.INIT_GAME_SAVE_DATA.top_score) {
      window.INIT_GAME_SAVE_DATA.top_score = this.m_cur_score;
      RankList.setScore(window.INIT_GAME_SAVE_DATA.top_score);
    }
  },
  createMap: function createMap() {
    this.m_maparray = [];
    var frameList = [];

    for (var index = 0; index < window.INDEX_TO_POINT.length; index++) {
      var node = cc.instantiate(this.m_pre_blockbg);
      node.x = window.INDEX_TO_POINT[index][0];
      node.y = window.INDEX_TO_POINT[index][1];
      node.parent = this.m_n_bglist;
      node.FKIndex = index;
      frameList.push(node);
    }

    this.m_maparray = frameList;
  },
  //创建糖果
  initMonster: function initMonster(level) {
    var self = this;
    var lv = level % 100;
    if (lv <= 0) lv += 1;
    var data = window.MAP_CONFIG[lv - 1];
    this.m_sp_monster.node.getComponent("MonsterItem").initType(data.mon_id, data.mon_hp, level); // this.m_sp_monster.node.color = window.MON_COLOR[data.color];

    this.m_sp_monster.node.active = true;
    this.m_sp_monster.node.opacity = 255;
    this.m_sp_monster.node.y = 300;
    var y = 0;
    this.m_sp_monster.node.getComponent("MonsterItem").playStartTalk();

    if (data.mon_id == 0) {
      // this.m_sp_monster.node.y = -10;
      y = -10;
    } else {// this.m_sp_monster.node.y = 0;
    }

    this.m_sp_monster.node.runAction(cc.moveTo(0.4, 0, y).easing(cc.easeIn(3.0)));

    if (level % 5 == 0) {
      this.m_n_boss.active = true;
      this.m_n_boss.opacity = 50;
      this.m_n_boss.scale = 2.5;
      var offset = 10;
      var deltaTime = 0.02;
      this.m_n_boss.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.8, 1.0).easing(cc.easeBackIn(3.0)), cc.fadeTo(0.8, 255)), cc.moveBy(deltaTime, cc.v2(offset * 2, 0)), cc.moveBy(deltaTime * 2, cc.v2(-offset * 4)), cc.moveBy(deltaTime, cc.v2(offset * 2)), cc.moveBy(deltaTime, cc.v2(0, offset * 2)), cc.moveBy(deltaTime * 2, cc.v2(0, -offset * 4)), cc.moveBy(deltaTime, cc.v2(0, offset * 2)), cc.moveBy(deltaTime, cc.v2(offset, 0)), cc.moveBy(deltaTime * 2, cc.v2(-offset * 2, 0)), cc.moveBy(deltaTime, cc.v2(offset, 0)), cc.moveBy(deltaTime, cc.v2(0, offset)), cc.moveBy(deltaTime * 2, cc.v2(0, -offset * 2)), cc.moveBy(deltaTime, cc.v2(0, offset)), cc.fadeOut(1.5)));
    }
  },
  //加分，参数是消除的总数,isDropAdd是是否是放下的单纯加分
  addScore: function addScore(XCCount, isDropAdd) {
    var addScoreCount = this.getAddScoreCal(XCCount, isDropAdd);
    Utils.showHurtText("+" + addScoreCount, null, 0, 0, 30);
    this.updateScore(addScoreCount);
  },
  //计算加分的公式
  getAddScoreCal: function getAddScoreCal(XCCount, isDropAdd) {
    var x = XCCount + 1;
    var addScoreCount = isDropAdd ? x : x * x; //数量的平方

    return addScoreCount * this.m_doublescore;
  },
  //检测是不是输了
  checkIsLose: function checkIsLose() {
    //如果正在消除中，那就不判断输赢，因为消除后会再判断
    if (this._isdeleting) return;
    this.m_normal_curtime = 0;
    var count = 0;

    for (var i = 0; i < 3; i++) {
      var node = cc.find('n_kuai' + (i + 1), this.m_n_gamenode);
      var script = node.getComponent('ShapeItem');

      if (script.checkIsLose()) {
        count++;
        node.opacity = 125;
      } else {
        node.opacity = 255;
      }
    }

    if (count >= 2 && !this._isbless) {
      this._isbless = true;

      for (var _i2 = 0; _i2 < 3; _i2++) {
        var _node = cc.find('n_kuai' + (_i2 + 1), this.m_n_gamenode);

        _node.getComponent('ShapeItem').setNextBlock(0); //设置下一个必定是某个形状

      }
    }

    if (count == 3) {
      //没地方放了
      this.judgeGame(false);
    }
  },
  //检查是否有可消除
  checkClearUp: function checkClearUp() {
    var haveFKIndexList = [];

    for (var i = 0; i < this.m_maparray.length; i++) {
      if (this.m_maparray[i].isHaveFK) {
        haveFKIndexList.push(this.m_maparray[i].FKIndex);
      }
    }

    haveFKIndexList.sort(function (a, b) {
      return a - b;
    });
    var xcList = []; //要消除的方块列表

    for (var _i3 = 0; _i3 < window.DISLIST.length; _i3++) {
      var oneXCList = window.DISLIST[_i3];
      var intersectAry = this.get2AryIntersect(haveFKIndexList, oneXCList); //求数组交集

      if (intersectAry.length > 0) {
        var isXC = this.check2AryIsEqual(oneXCList, intersectAry); //数组相同，消除

        if (isXC) {
          xcList.push(oneXCList);
        }
      }
    }

    var actionAry = []; //消除

    var count = 0;
    var clearnum = 0;

    for (var _i4 = 0; _i4 < xcList.length; _i4++) {
      var oneList = xcList[_i4];
      clearnum += oneList.length;

      for (var j = 0; j < oneList.length; j++) {
        var xIndex = oneList[j];
        actionAry.push(cc.callFunc(function () {
          var xIndex = arguments[1][0];
          var count = arguments[1][1];
          var score = this.getAddScoreCal(count); // Utils.showTipsText("+" + score, this.m_n_gamenode, this.m_maparray[xIndex].x, this.m_maparray[xIndex].y, 60);

          Utils.showHurtText("+" + score, this.m_n_gamenode, this.m_maparray[xIndex].x, this.m_maparray[xIndex].y, 20, null, null, null, true);
          this.updateScore(score);
        }, this, [xIndex, count]));
        actionAry.push(cc.callFunc(function () {
          var xIndex = arguments[1];
          this.m_maparray[xIndex].isHaveFK = null;
          var FKNode = this.m_maparray[xIndex].getChildByName("colorSpr");

          if (!FKNode) {
            return; //防止没有这个方块的时候
          }

          this.attackMonster(FKNode.colorIndex, this.m_maparray[xIndex].x, this.m_maparray[xIndex].y); //这个假方块变大并且渐隐掉

          FKNode.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.5, 2), cc.fadeOut(0.5)), cc.removeSelf(true)));
        }, this, xIndex));
        actionAry.push(cc.delayTime(0.1));
        count++;
      }
    }

    if (actionAry.length > 0) {
      Utils.SetSoundEffect(window.GET_GOLD, false, 1);
      actionAry.push(cc.callFunc(function () {
        this._isdeleting = false;
        this.checkIsLose();
      }, this));
      this.handlerShowTime(clearnum);
      this._isdeleting = true;
      var action = cc.sequence(actionAry);
      this.node.runAction(action);
    }
  },
  //获得两个数组的交集
  get2AryIntersect: function get2AryIntersect(ary1, ary2) {
    var intersectAry = [];

    for (var i = 0; i < ary1.length; i++) {
      for (var j = 0; j < ary2.length; j++) {
        if (ary2[j] == ary1[i]) {
          intersectAry.push(ary2[j]);
        }
      }
    }

    return intersectAry;
  },

  /**
   * 获得两个数组的交集
   * @param  {array}数组1
   * @param  {array}数组2
   * @return {boolean}是否相交
   */
  check2AryIsEqual: function check2AryIsEqual(ary1, ary2) {
    for (var i = 0; i < ary1.length; i++) {
      if (ary2[i] != ary1[i]) {
        return false;
      }
    }

    return true;
  },
  handlerShowTime: function handlerShowTime(num) {
    var _this4 = this;

    console.log("handlerShowTime", num);
    var index = -1;

    if (num > 9 && num <= 12) {
      index = 0;
    } else if (num > 12 && num <= 15) {
      index = 1;
    } else if (num > 15) {
      index = 2;
    }

    if (index >= 0) {
      if (index == 2) {
        Utils.SetSoundEffect(window.SAY_3, false, 1);
      } else {
        Utils.SetSoundEffect(window.GET_GOLD, false, 1);
      }

      this.m_n_showtime[index].active = true;
      this.m_n_showtime[index].getComponent(cc.Animation).play();
      setTimeout(function () {
        _this4.m_n_showtime[index].active = false;
      }, 1500);
    }
  },
  //增加金币数
  addGold: function addGold(gold, spos, epos) {
    var this$1 = this;
    var spritefram = this.m_spf_gold;
    window.INIT_GAME_SAVE_DATA.gold_num += gold;

    for (var i = 0; i < gold; i++) {
      Utils.moveIcon(spritefram, this.m_n_gamenode, spos, epos, function () {
        Utils.SetSoundEffect(window.GET_GOLD, false, 0.4);
        this$1.m_l_gold.string = window.INIT_GAME_SAVE_DATA.gold_num;
      }, 0.5, 60 * (i + 1));
    } // })

  },
  //展示宝箱
  showBox: function showBox(spos, epos, lv) {
    var this$1 = this;

    var callback = function callback() {
      if (lv % 10 == 0 && lv <= 370) {
        this$1.m_n_stepview.scale = 0;
        this$1.m_n_stepview.active = true;
        this$1.m_n_stepview.runAction(cc.sequence(cc.scaleTo(0.2, 1.2, 1.2).easing(cc.easeIn(3.0)), cc.scaleTo(0.1, 1, 1)));
        this$1.m_n_stepview.getComponent("StepViewItem").showStep(lv);
      }
    };

    Utils.loadRes('sprite/getshare_box', cc.SpriteFrame, function (obj) {
      Utils.moveIcon(obj, this$1.m_n_gamenode, spos, epos, function () {
        this$1.m_n_sharegift.active = true;
        this$1.m_n_sharegift.getComponent('GetBoxGiftItem').showView(callback);
      }, 0.8, 100);
    });
  },
  attackMonster: function attackMonster(hurt, x, y) {
    var self = this;
    var realhurt = hurt ? 2 * hurt : 2;
    var blocknode = this.m_block_pool.get();

    if (!blocknode) {
      blocknode = cc.instantiate(this.m_pre_rock);
    }

    var angle = Utils.getAngle(this.m_sp_monster.node.parent.x, this.m_sp_monster.node.parent.y, x, y);

    if (this.m_sp_monster.node.parent.x <= x) {
      angle = -angle;
    }

    blocknode.rotation = angle;
    blocknode.getComponent("RockItem").resetSytem();
    blocknode.zIndex = 1 << 5;
    blocknode.parent = this.m_n_gamenode;
    blocknode.x = x;
    blocknode.y = y;
    blocknode.runAction(cc.sequence(cc.callFunc(function () {}), cc.moveTo(1.0, cc.v2(this.m_sp_monster.node.parent.x, this.m_sp_monster.node.parent.y)).easing(cc.easeIn(2.0)), cc.callFunc(function () {
      self.m_block_pool.put(blocknode);
      blocknode = null;
      self.monsterbeHit(realhurt);
    })));
  },
  destroyBlockByHitMonster: function destroyBlockByHitMonster() {
    var _this5 = this;

    var self = this;
    var arr = [];
    var len = 4;

    for (var i = 0; i < this.m_maparray.length; i++) {
      if (this.m_maparray[i].isHaveFK) {
        arr.push(i);
        len--;
        if (len <= 0) break;
      }
    }

    var _loop = function _loop(_i5) {
      var blocknode = _this5.m_light_pool.get();

      if (!blocknode) {
        blocknode = cc.instantiate(_this5.m_pre_light);
      }

      var pos = _this5.m_maparray[arr[_i5]].position;
      blocknode.parent = _this5.m_n_gamenode;
      blocknode.position = cc.v2(_this5.m_sp_monster.node.parent.x, _this5.m_sp_monster.node.parent.y);
      blocknode.runAction(cc.sequence(cc.callFunc(function () {
        Utils.SetSoundEffect(window.GET_GOLD, false, 1);
      }), cc.moveTo(0.8, pos).easing(cc.easeIn(2.0)), cc.callFunc(function () {
        self.m_light_pool.put(blocknode);
        blocknode = null;
        self.blockBeHit(arr[_i5]);
      })));
    };

    for (var _i5 = 0; _i5 < arr.length; _i5++) {
      _loop(_i5);
    }
  },
  blockBeHit: function blockBeHit(index) {
    this.m_maparray[index].isHaveFK = null;

    for (var i = 0; i < this.m_n_kuai.length; i++) {
      var shapeitem = this.m_n_kuai[i].getComponent("ShapeItem");

      if (shapeitem.checkIsLose()) {
        this.m_n_kuai[i].opacity = 125;
      } else {
        this.m_n_kuai[i].opacity = 255;
      }
    }

    var FKNode = this.m_maparray[index].getChildByName("colorSpr");

    if (!FKNode) {
      return; //防止没有这个方块的时候
    }

    FKNode.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.5, 2), cc.fadeOut(0.5)), cc.removeSelf(true)));
  },
  monsterbeHit: function monsterbeHit(hurt) {
    Utils.SetSoundEffect(window.BE_HIT, false, 0.3);
    Utils.showHurtText('-' + hurt, this.m_sp_monster.node.parent, 0, 100, 30, new cc.Color(230, 71, 21), 0.8);
    this.updateScore(hurt);
    var hp = this.m_sp_monster.node.getComponent("MonsterItem").reduceHp(hurt);

    if (hp <= 0) {
      this.m_normal_curtime = -1;
      this.judgeGame(true);
    } else {
      this.m_normal_curtime = 0;

      if (this.m_solidernum <= 0 && this.m_cur_attack_num <= 0) {
        this.judgeGame(false);
      } else if (this.m_cur_attack_num <= 0 && hp <= 20) {
        this.m_sp_monster.node.getComponent("MonsterItem").playAngry();
      } else {
        this.m_sp_monster.node.getComponent("MonsterItem").playBeHit();
      }
    }
  },
  onOpenSkinPanel: function onOpenSkinPanel() {
    this.m_n_skinpanel.active = true;
  },
  onCancelVideo: function onCancelVideo() {
    var _this6 = this;

    this.m_n_lookvideo.active = false;

    if (this._relivenum <= 0) {
      this.m_n_reliveview.active = true;
      this.m_n_reliveview.scale = 0;
      this.m_n_reliveview.runAction(cc.sequence(cc.scaleTo(0.2, 1.2, 1.2).easing(cc.easeIn(3.0)), cc.scaleTo(0.1, 1, 1)));

      if (window.SKIN_SHARE) {
        this.showAdBanner(false);
        var node = cc.find("btn_close", this.m_n_reliveview);
        node.y = -585;
        this.scheduleOnce(function () {
          node.y = -514;
          if (!_this6.showAdb) _this6.showAdBanner(true);
        }, 1.3);
      } else {
        this.showAdBanner(true);
      }
    } else {
      this.m_n_displaycheck.active = false;
      this.m_n_displayrank.active = true;
      console.log("this._relivenum++", this._relivenum);
      this.m_n_result_panel.getComponent("GameResult").showFail(this._relivenum, this.m_cur_score, this._killnum);
      this.showAdBanner(true);
      RankList.setScore(window.INIT_GAME_SAVE_DATA.top_score);
      Utils.SetSoundEffect(window.CHALLENG_FAIL_MUSIC, false, 1);
    }

    this._relivenum++;
  },
  onAdBtnClick: function onAdBtnClick(event, custom) {
    if (typeof wx != 'undefined') {
      if (!window.firstvideo && custom == 3) {
        // window.CHANGE_BLOCK = 1;
        // cc.sys.localStorage.setItem('change', '1');
        window.firstvideo = true;
        this.videoReward(1);
        return;
      }

      var VersionToast = function VersionToast() {
        wx.showToast({
          title: "微信版本过低，无法看广告",
          icon: "none",
          image: "",
          duration: 0
        });
        setTimeout(function () {
          return wx.hideToast();
        }, 2000);
      };

      var info = wx.getSystemInfoSync();

      if (info.SDKVersion >= '2.0.4') {
        this.showAd(custom);
      } else {
        VersionToast();
      }
    } else {
      console.log('it is not wechat');
      this.videoReward(custom);
    }
  },
  showAd: function showAd(custom) {
    var self = this;

    if (!this.m_videoAd) {
      this.m_videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-e573e466be94d7f5'
      });
    }

    this.m_videoAd.onError(function (err) {// Utils.showTipsText("error:" + err.errMsg);
    });
    this.m_videoAd.load().then(function () {
      self.m_videoAd.show();
      self.showAdb = true;
      self.m_videoAd.onClose(function (status) {
        self.m_videoAd.offClose();
        self.showAdb = false;
        self.showAdBanner(false);

        if (status && status.isEnded || status === undefined) {
          self.videoReward(custom);
        } else {}
      });
    })["catch"](function (err) {
      return Utils.showTipsText("拉去视频广告失败，请稍候重试", null, null, null, 60, cc.Color.BLACK, 1.2);
    });
  },
  videoReward: function videoReward(custom) {
    if (custom == 1 || custom == 3) {
      var list = this.getCanDropBlocks(); // console.log('list=',list);

      for (var i = 0; i < this.m_n_kuai.length; i++) {
        var shapeitem = this.m_n_kuai[i].getComponent("ShapeItem");
        this.m_n_kuai[i].opacity = 255;
        shapeitem.resetBlock(list[i] || 0);
      }

      this.m_in_judge = false;
      this.m_n_lookvideo.active = false;
    } else if (custom == 2) {
      this.m_doublescore = 2;
      this.m_n_doublescore.active = true;
      Utils.showTipsText("得分双倍", null, 0, 0, 60);
      this.m_n_luckyvideo.active = false;
    }
  },
  judgeGame: function judgeGame(boo) {
    if (this.m_in_judge) return;
    this.m_in_judge = true;

    if (boo) {
      //胜利
      console.log('胜利');
      this._killnum++;
      var time = this.m_sp_monster.node.getComponent("MonsterItem").playDead();
      Utils.SetSoundEffect(window.CHALLENG_VICTORY_MUSIC, false, 1);
      var gold = 3;
      var pos = this.m_sp_monster.node.parent.position;

      if (this.m_cur_level % 5 == 0) {
        this.showBox(cc.v2(pos.x, pos.y - 100), cc.Vec2.ZERO, this.m_cur_level);
      } else {
        this.addGold(gold, cc.v2(pos.x, pos.y - 10), this.m_l_gold.node.position);
      }

      window.INIT_GAME_SAVE_DATA.top_level += 1;
      var self = this;
      this.scheduleOnce(function () {
        self.onNextLevel();
      }, time / 1000);
      this.destroyBlockByHitMonster();
      RankList.setScore(window.INIT_GAME_SAVE_DATA.top_score);
    } else {
      if (this._videonum <= 0) {
        console.log('失败');
        this.m_sp_monster.node.getComponent("MonsterItem").playMonsterVictory();
        this.m_n_lookvideo.active = true;
        this.m_n_lookvideo.scale = 0;
        this.m_n_lookvideo.runAction(cc.sequence(cc.scaleTo(0.2, 1.2, 1.2).easing(cc.easeIn(3.0)), cc.scaleTo(0.1, 1, 1)));

        if (window.firstvideo) {
          this.m_l_asktype.string = "看视频换一批";
        } else {
          this.m_l_asktype.string = "免费换一批"; // window.firstvideo = true;
        }

        this._videonum++;
      } else {
        this.onCancelVideo();
      }
    }
  },

  /**
   * @description 宝箱奖励获取处理
   * @author 吴建奋
   * @param {Number} type
   */
  BoxReward: function BoxReward(type) {
    if (type == 0) {
      this.updateToolsNum();
    } else {
      this.updateGold();
    }
  },
  onVideoClose: function onVideoClose() {
    this.m_n_reliveview.active = false;
    this.m_n_displaycheck.active = false;
    this.m_n_displayrank.active = true;
    this.m_n_result_panel.getComponent("GameResult").showFail(this._relivenum, this.m_cur_score, this._killnum);
    this.showAdBanner(true);
    RankList.setScore(window.INIT_GAME_SAVE_DATA.top_score);
    Utils.SetSoundEffect(window.CHALLENG_FAIL_MUSIC, false, 1);
  },
  onReliveBtnClick: function onReliveBtnClick() {
    if (typeof wx != 'undefined') {
      var VersionToast = function VersionToast() {
        wx.showToast({
          title: "微信版本过低，无法看广告",
          icon: "none",
          image: "",
          duration: 0
        });
        setTimeout(function () {
          return wx.hideToast();
        }, 2000);
      };

      var info = wx.getSystemInfoSync();

      if (info.SDKVersion >= '2.0.4') {
        this.showReliveAd();
      } else {
        VersionToast();
      }
    } else {
      console.log('it is not wechat');
      this.onReliveGameVideo();
    }
  },
  showReliveAd: function showReliveAd() {
    var self = this;

    if (!this.m_videoAd2) {
      this.m_videoAd2 = wx.createRewardedVideoAd({
        adUnitId: 'adunit-5187ffc3ab571318'
      });
    }

    this.m_videoAd2.onError(function (err) {// Utils.showTipsText("error:" + err.errMsg);
    });
    this.m_videoAd2.load().then(function () {
      self.m_videoAd2.show();
      self.showAdBanner(false);
      self.m_videoAd2.onClose(function (status) {
        self.m_videoAd2.offClose();

        if (status && status.isEnded || status === undefined) {
          self.onReliveGameVideo();
        } else {}
      });
    })["catch"](function (err) {
      return Utils.showTipsText("视频拉取失败，请稍后重试", null, null, null, 60, cc.Color.BLACK, 1.2);
    });
  },
  onNextLevel: function onNextLevel() {
    this.m_n_result_panel.active = false;
    this.showAdBanner(false);
    this.m_cur_level = window.INIT_GAME_SAVE_DATA.top_level + 1;
    console.log("this.m_cur", this.m_cur_level);
    this.m_in_judge = false;
    this.m_l_level.string = "LV." + this.m_cur_level;
    this.initMonster(this.m_cur_level);
    this.checkIsLose();
  },
  onBackToMenu: function onBackToMenu() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    cc.director.loadScene(window.MENU_SCENE_NAME);
  },
  onBoomClick: function onBoomClick(event) {
    // this.judgeGame(false);
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);

    if (this.m_gamestate == 0 && !this._isdeleting) {
      if (this.m_boomnum <= 0) {
        this.m_n_tooluse.active = true;
        this.m_n_tooluse.getComponent("UseToolItem").initToolInfo(0, this.m_boomnum, this.m_spriteAtlas.getSpriteFrame(window.TOOL_CONFIG[0].name));
      } else {
        this.m_n_guidemask.active = !this.m_mapblink;
        this.m_touch_boom = !this.m_mapblink;
        this.setMapBlink(!this.m_mapblink);
      }
    }
  },
  onStrongClick: function onStrongClick(event) {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);

    if (this.m_gamestate == 0) {
      this.m_n_tooluse.active = true;
      this.m_n_tooluse.getComponent("UseToolItem").initToolInfo(1, this.m_strongnum, this.m_spriteAtlas.getSpriteFrame(window.TOOL_CONFIG[1].name));
      this.guideMaskClick();
    }
  },
  onUseStrong: function onUseStrong() {
    var t = false;

    for (var i = 0; i < this.m_row; i++) {
      for (var j = 0; j < this.m_col; j++) {
        if (this.m_grid_array[i][j].type == 1) {
          var a = this.m_grid_array[i][j].obj.getComponent("BlockItem").addStrong();

          if (a) {
            t = true;
          }
        }
      }
    }

    if (t) {
      window.INIT_GAME_SAVE_DATA.tool[1] -= 1;
      this.updateToolsNum();
    }
  },
  //设置背景闪烁
  setMapBlink: function setMapBlink(boo) {
    if (boo === this.m_mapblink) {
      return;
    }

    this.m_mapblink = boo;

    if (boo) {
      for (var i = 0; i < this.m_maparray.length; i++) {
        if (!this.m_maparray[i].isHaveFK) {
          var action = cc.repeatForever(cc.sequence(cc.scaleTo(0.8, 0.8, 0.8), cc.scaleTo(0.8, 1, 1)));
          action.setTag(1);
          this.m_maparray[i].runAction(action);
        }
      }
    } else {
      for (var _i6 = 0; _i6 < this.m_maparray.length; _i6++) {
        if (!this.m_maparray[_i6].isHaveFK) {
          this.m_maparray[_i6].stopActionByTag(1);

          this.m_maparray[_i6].scale = 1;
        }
      }
    }
  },
  getTargetGridInfo: function getTargetGridInfo(target) {
    var i = Math.floor(target / this.m_row);
    var j = target % this.m_col;
    return this.m_maparray[i][j];
  },
  onReliveGameVideo: function onReliveGameVideo() {
    Utils.showTipsText("复活成功");
    this.m_in_judge = false;

    for (var i = 0; i < this.m_n_kuai.length; i++) {
      this.m_n_kuai[i].getComponent("ShapeItem").resetBlock();
      this.m_n_kuai[i].opacity = 255;
    }

    this.m_sp_monster.node.getComponent("MonsterItem").playAngry();
    this.m_n_result_panel.active = false;
    this.m_n_reliveview.active = false;
    this.m_maparray.forEach(function (element) {
      element.getChildByName("colorSpr");
    });

    for (var index = 0; index < this.m_maparray.length; index++) {
      var FKNode = this.m_maparray[index].getChildByName("colorSpr"); //这个假方块变大并且渐隐掉

      if (FKNode) {
        FKNode.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.5, 2), cc.fadeOut(0.5)), cc.removeSelf(true)));
      }

      this.m_maparray[index].isHaveFK = null;
    }

    RankList.checkWillSurpass(this.m_cur_score);
    this.m_n_displaycheck.active = true;
    this.m_n_displayrank.active = false;
    this.m_gamestate = 0;
  },
  onReliveGame: function onReliveGame() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);

    if (window.INIT_GAME_SAVE_DATA.gold_num >= 20) {
      Utils.showTipsText("复活成功");
      this.m_in_judge = false;
      window.INIT_GAME_SAVE_DATA.gold_num -= 20;
      this.updateGold();

      for (var i = 0; i < this.m_n_kuai.length; i++) {
        this.m_n_kuai[i].getComponent("ShapeItem").resetBlock(0);
        this.m_n_kuai[i].opacity = 255;
      }

      this.m_sp_monster.node.getComponent("MonsterItem").playAngry();
      this.m_n_result_panel.active = false;
      RankList.checkWillSurpass(this.m_cur_score);
      this.m_n_displaycheck.active = true;
      this.m_n_displayrank.active = false;
      this.m_gamestate = 0;
    } else {
      // Utils.showTipsText("金币不足")
      ShareSdk.shareAppMessage({
        title: "来帮帮我，我被怪兽消灭了",
        imageUrl: window.tempFileURL[1],
        success: function success(res) {},
        fail: function fail(err) {},
        complate: function complate(msg) {}
      });
    }
  },
  showAdBanner: function showAdBanner(boo) {
    if (typeof wx == 'undefined') return;
    var Size = cc.winSize;
    var Widthnode = cc.find("Canvas/n_funnymap/n_bannerpos");
    var pos = this.node.convertToWorldSpace(Widthnode);

    if (Size.height / Size.width > 2) {
      //适配全面屏 适用于FIXHeight
      pos.y += (Size.height - 1920) / 2;
    }

    var system = wx.getSystemInfoSync();
    var adaptScaleH = system.screenHeight / Size.height;
    var PosY = (Size.height - pos.y) * adaptScaleH;
    var self = this;

    if (this.m_bannerad) {
      this.m_bannerad.destroy();
      this.m_bannerad = null;
    }

    if (!this.m_bannerad && boo) {
      if (system.SDKVersion < '2.0.4') {
        wx.showToast({
          title: "微信版本过低，无法创建广告banner",
          icon: "none",
          image: "",
          duration: 0
        });
        setTimeout(function () {
          return wx.hideToast();
        }, 3000);
      } else {
        self.m_bannerad = wx.createBannerAd({
          adUnitId: 'adunit-9dd057b6b514245a',
          style: {
            left: 0,
            top: PosY,
            width: system.screenWidth
          }
        });
        self.m_bannerad.onResize(function (res1) {
          try {
            if (self.m_bannerad && self.m_bannerad.style) {
              self.m_bannerad.style.top = PosY;
              self.m_bannerad.style.height = res1.height;
            }
          } catch (error) {
            console.log("onResize-error", error);
          }
        });
        self.m_bannerad.onLoad(function () {// console.log('banner 广告加载成功')
        });
        self.m_bannerad.show().then(function () {// console.log("广告显示成功");
        })["catch"](function (err) {// console.error("广告加载失败", err);
        });
        self.m_bannerad.onError(function (err) {// console.error(err)
        });
      }
    }
  },
  onOpenAskPanel: function onOpenAskPanel() {
    this.m_n_askpanel.active = true;
  },
  onCloseAskPanel: function onCloseAskPanel() {
    this.m_n_askpanel.active = false;
  },
  update: function update(dt) {
    if (this.m_normal_curtime != -1) {
      this.m_normal_curtime += dt;

      if (this.m_normal_curtime >= this.m_normal_talktime && this.m_gamestate == 0) {
        this.m_normal_curtime = 0;
        this.m_sp_monster.node.getComponent("MonsterItem").playNormal();
      }
    }
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZU1haW4uanMiXSwibmFtZXMiOlsiVXRpbHMiLCJyZXF1aXJlIiwiU2hhcmVTZGsiLCJSYW5rTGlzdCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibV9uX2dhbWVub2RlIiwiTm9kZSIsIm1fbl9iZ19wYW5lbCIsIm1fcHJlX2Jsb2NrYmciLCJQcmVmYWIiLCJtX3ByZV9saWdodCIsIm1fcHJlX2Jvb21lZmZlY3QiLCJtX3ByZV9ib29tIiwibV9sX2Jvb21udW0iLCJMYWJlbCIsIm1fbF9zY29yZSIsIm1fc3BfbW9uc3RlciIsIlNwcml0ZSIsIm1fbF9sZXZlbCIsIm1fbl9yZXN1bHRfcGFuZWwiLCJtX2J0bl90b29sMiIsIm1fbl9ndWlkZW1hc2siLCJtX25fdG9vbHVzZSIsIm1fbl9zaG93dGltZSIsInR5cGUiLCJtX3NwZl9nb2xkIiwiU3ByaXRlRnJhbWUiLCJtX25fYXNrcGFuZWwiLCJtX25fYm9zcyIsIm1fc3ByaXRlQXRsYXMiLCJTcHJpdGVBdGxhcyIsIm1fbl9iZ2xpc3QiLCJtX2xfZ29sZCIsIm1fcHJlX3JvY2siLCJtX25fa3VhaSIsIm1fbl9kaXNwbGF5Y2hlY2siLCJtX25fZGlzcGxheXJhbmsiLCJtX25fc3RlcHZpZXciLCJtX25fcmVsaXZldmlldyIsIm1fbl92aWRlbyIsIm1fbl9sb29rdmlkZW8iLCJtX25fbHVja3l2aWRlbyIsIm1fbl9kb3VibGV2aWRlbyIsIm1fbl9kb3VibGVzY29yZSIsIm1fbl9zaGFyZWdpZnQiLCJtX25fc2tpbnBhbmVsIiwibV9uX2d1aWRlbm9kZSIsIm1fbF9hc2t0eXBlIiwibV9uX2d1aWRlZmlnZXIiLCJvbkxvYWQiLCJ3aW5kb3ciLCJHQU1FX0NPTlRST0wiLCJzZXREZXNpZ25SZXNvbHV0aW9uIiwib25EZXN0cm95IiwibV9ibG9ja19wb29sIiwiY2xlYXIiLCJtX2xpZ2h0X3Bvb2wiLCJtX2Jhbm5lcmFkIiwiZGVzdHJveSIsIkVWRU5UX0xJU1RFTkVSIiwib2ZmIiwiR0FNRV9VUERBVEVfREFUQSIsIkdBTUVfU0FWRV9IQU5ETEVSIiwic3RhcnQiLCJmaXJzdEdhbWUiLCJjcmVhdGVNYXAiLCJpbml0RGF0YSIsImluaXRNb25zdGVyIiwibV9jdXJfbGV2ZWwiLCJzaG93QWRCYW5uZXIiLCJub2RlIiwib24iLCJFdmVudFR5cGUiLCJUT1VDSF9FTkQiLCJ0b3VjaEVuZCIsInVwZGF0ZUdvbGQiLCJ1cGRhdGVTa2luIiwic2V0SW50ZXJ2YWwiLCJnZXRkYXRhIiwic2V0U2F2ZURhdGEiLCJnZXRDb21wb25lbnQiLCJhY3RpdmUiLCJtX2dhbWVzdGF0ZSIsIm1fY3VyX3Njb3JlIiwiSU5JVF9HQU1FX1NBVkVfREFUQSIsInRvcF9sZXZlbCIsIm1fbm9ybWFsX3RhbGt0aW1lIiwibV9ub3JtYWxfY3VydGltZSIsIm1fdGFyZ2V0X2Jsb2NrIiwibV9tYXBibGluayIsIm1fdG91Y2hfYm9vbSIsIl9yZWxpdmVudW0iLCJfdmlkZW9udW0iLCJfa2lsbG51bSIsInN0cmluZyIsIm1fZG91Ymxlc2NvcmUiLCJnb2xkX251bSIsIl9pc2RlbGV0aW5nIiwiX2lzYmxlc3MiLCJOb2RlUG9vbCIsInVwZGF0ZVRvb2xzTnVtIiwic2NoZWR1bGUiLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsInJlcGVhdCIsInJvdGF0ZVRvIiwiZGVsYXlUaW1lIiwiX2NvbmZpZ2xpc3QiLCJnZXRUaGVDb25maWciLCJjaGVja1dpbGxTdXJwYXNzIiwicmFuZCIsInJhbmRvbSIsInNjYWxlIiwic2NhbGVUbyIsImVhc2luZyIsImVhc2VJbiIsIlNLSU5fU0hBUkUiLCJmaW5kIiwieSIsInNjaGVkdWxlT25jZSIsInNob3dBZGIiLCJoaWRlR3VpZGUiLCJzdG9wQWxsQWN0aW9ucyIsIkdVSURFX0xFVkVMIiwic3lzIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsInNob3dHdWlkZSIsIl90ZW1wZ3VpZGUiLCJ0eXBlaW5kZXgiLCJpbmRleGxpc3QiLCJza2luIiwiaSIsImxlbmd0aCIsImRhdGEiLCJTS0lOX0NPTkZJRyIsInBvc2l0aW9uIiwicmVwZWF0Rm9yZXZlciIsImNhbGxGdW5jIiwibW92ZVRvIiwieCIsImluZGV4IiwiZ2V0Q3VyQ29sb3JJbmRleCIsImJsb2NraW5kZXgiLCJjb2xvckluZGV4IiwiY29sb3JOYW1lIiwibmFtZSIsInNwcml0ZSIsImFkZENvbXBvbmVudCIsImNvbnNvbGUiLCJsb2ciLCJzcHJpdGVGcmFtZSIsImdldFNwcml0ZUZyYW1lIiwiVmVjMiIsIlpFUk8iLCJwYXJlbnQiLCJtX21hcGFycmF5IiwiaXNIYXZlRksiLCJvbktlZXBHb2luZyIsImV2ZW50IiwidmVjIiwidG91Y2giLCJnZXRMb2NhdGlvbiIsImNvbnZlcnRUb05vZGVTcGFjZSIsImJhY2tJbmRleG9mTGlzdCIsImluc3RhbnRpYXRlIiwidG9vbCIsImRvQm9vbUFjdGlvbiIsInNldE1hcEJsaW5rIiwic2hhcGVpdGVtIiwiY2hlY2tJc0xvc2UiLCJvcGFjaXR5IiwicG9zIiwiRktOb2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJzcGF3biIsImZhZGVPdXQiLCJyZW1vdmVTZWxmIiwiekluZGV4IiwiQW5pbWF0aW9uIiwicGxheSIsIlNldFNvdW5kRWZmZWN0IiwiQk9PTV9FRkZFQ1QiLCJsaXN0IiwiZ2V0Qm9vbUluZGV4TGlzdCIsImNvdW50IiwiYWN0aW9uQXJ5IiwicHVzaCIsIm9uZUxpc3QiLCJqIiwieEluZGV4IiwiYXJndW1lbnRzIiwic2NvcmUiLCJnZXRBZGRTY29yZUNhbCIsInNob3dIdXJ0VGV4dCIsInVwZGF0ZVNjb3JlIiwiYXR0YWNrTW9uc3RlciIsImFjdGlvbiIsImJvb21yYW5nZSIsImJvbWJGaW5pc2giLCJnZXRDYW5Ecm9wQmxvY2tzIiwiY2FuRHJvcGxzaXQiLCJrIiwiZnJhbWVOb2RlIiwic3JjUG9zIiwidjIiLCJjaGlsZHJlbiIsImxlbiIsImNoaWxkUG9zIiwiYWRkIiwicyIsInRGcmFtZU5vZGUiLCJkaXMiLCJzdWIiLCJtYWciLCJhcnIiLCJnZXRSYW5kb21TRGlmZiIsIklOREVYX1RPX1BPSU5UIiwibV9ib29tbnVtIiwic2V0QWRkVmlzaWJsZSIsImRhdGFfaW5kZXgiLCJ1cGRhdGVJbmRleCIsIm51bSIsImFkZGJ0biIsInRvcF9zY29yZSIsInNldFNjb3JlIiwiZnJhbWVMaXN0IiwiRktJbmRleCIsImxldmVsIiwic2VsZiIsImx2IiwiTUFQX0NPTkZJRyIsImluaXRUeXBlIiwibW9uX2lkIiwibW9uX2hwIiwicGxheVN0YXJ0VGFsayIsIm9mZnNldCIsImRlbHRhVGltZSIsImVhc2VCYWNrSW4iLCJmYWRlVG8iLCJtb3ZlQnkiLCJhZGRTY29yZSIsIlhDQ291bnQiLCJpc0Ryb3BBZGQiLCJhZGRTY29yZUNvdW50Iiwic2NyaXB0Iiwic2V0TmV4dEJsb2NrIiwianVkZ2VHYW1lIiwiY2hlY2tDbGVhclVwIiwiaGF2ZUZLSW5kZXhMaXN0Iiwic29ydCIsImEiLCJiIiwieGNMaXN0IiwiRElTTElTVCIsIm9uZVhDTGlzdCIsImludGVyc2VjdEFyeSIsImdldDJBcnlJbnRlcnNlY3QiLCJpc1hDIiwiY2hlY2syQXJ5SXNFcXVhbCIsImNsZWFybnVtIiwiR0VUX0dPTEQiLCJoYW5kbGVyU2hvd1RpbWUiLCJhcnkxIiwiYXJ5MiIsIlNBWV8zIiwic2V0VGltZW91dCIsImFkZEdvbGQiLCJnb2xkIiwic3BvcyIsImVwb3MiLCJ0aGlzJDEiLCJzcHJpdGVmcmFtIiwibW92ZUljb24iLCJzaG93Qm94IiwiY2FsbGJhY2siLCJzaG93U3RlcCIsImxvYWRSZXMiLCJvYmoiLCJzaG93VmlldyIsImh1cnQiLCJyZWFsaHVydCIsImJsb2Nrbm9kZSIsImdldCIsImFuZ2xlIiwiZ2V0QW5nbGUiLCJyb3RhdGlvbiIsInJlc2V0U3l0ZW0iLCJwdXQiLCJtb25zdGVyYmVIaXQiLCJkZXN0cm95QmxvY2tCeUhpdE1vbnN0ZXIiLCJibG9ja0JlSGl0IiwiQkVfSElUIiwiQ29sb3IiLCJocCIsInJlZHVjZUhwIiwibV9zb2xpZGVybnVtIiwibV9jdXJfYXR0YWNrX251bSIsInBsYXlBbmdyeSIsInBsYXlCZUhpdCIsIm9uT3BlblNraW5QYW5lbCIsIm9uQ2FuY2VsVmlkZW8iLCJzaG93RmFpbCIsIkNIQUxMRU5HX0ZBSUxfTVVTSUMiLCJvbkFkQnRuQ2xpY2siLCJjdXN0b20iLCJ3eCIsImZpcnN0dmlkZW8iLCJ2aWRlb1Jld2FyZCIsIlZlcnNpb25Ub2FzdCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImltYWdlIiwiZHVyYXRpb24iLCJoaWRlVG9hc3QiLCJpbmZvIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJTREtWZXJzaW9uIiwic2hvd0FkIiwibV92aWRlb0FkIiwiY3JlYXRlUmV3YXJkZWRWaWRlb0FkIiwiYWRVbml0SWQiLCJvbkVycm9yIiwiZXJyIiwibG9hZCIsInRoZW4iLCJzaG93Iiwib25DbG9zZSIsInN0YXR1cyIsIm9mZkNsb3NlIiwiaXNFbmRlZCIsInVuZGVmaW5lZCIsInNob3dUaXBzVGV4dCIsIkJMQUNLIiwicmVzZXRCbG9jayIsIm1faW5fanVkZ2UiLCJib28iLCJ0aW1lIiwicGxheURlYWQiLCJDSEFMTEVOR19WSUNUT1JZX01VU0lDIiwib25OZXh0TGV2ZWwiLCJwbGF5TW9uc3RlclZpY3RvcnkiLCJCb3hSZXdhcmQiLCJvblZpZGVvQ2xvc2UiLCJvblJlbGl2ZUJ0bkNsaWNrIiwic2hvd1JlbGl2ZUFkIiwib25SZWxpdmVHYW1lVmlkZW8iLCJtX3ZpZGVvQWQyIiwib25CYWNrVG9NZW51IiwiQlVUVE9OX0NMSUNLX01VU0lDIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJNRU5VX1NDRU5FX05BTUUiLCJvbkJvb21DbGljayIsImluaXRUb29sSW5mbyIsIlRPT0xfQ09ORklHIiwib25TdHJvbmdDbGljayIsIm1fc3Ryb25nbnVtIiwiZ3VpZGVNYXNrQ2xpY2siLCJvblVzZVN0cm9uZyIsInQiLCJtX3JvdyIsIm1fY29sIiwibV9ncmlkX2FycmF5IiwiYWRkU3Ryb25nIiwic2V0VGFnIiwic3RvcEFjdGlvbkJ5VGFnIiwiZ2V0VGFyZ2V0R3JpZEluZm8iLCJ0YXJnZXQiLCJNYXRoIiwiZmxvb3IiLCJmb3JFYWNoIiwiZWxlbWVudCIsIm9uUmVsaXZlR2FtZSIsInNoYXJlQXBwTWVzc2FnZSIsImltYWdlVXJsIiwidGVtcEZpbGVVUkwiLCJzdWNjZXNzIiwicmVzIiwiZmFpbCIsImNvbXBsYXRlIiwibXNnIiwiU2l6ZSIsIndpblNpemUiLCJXaWR0aG5vZGUiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlIiwiaGVpZ2h0Iiwid2lkdGgiLCJzeXN0ZW0iLCJhZGFwdFNjYWxlSCIsInNjcmVlbkhlaWdodCIsIlBvc1kiLCJjcmVhdGVCYW5uZXJBZCIsInN0eWxlIiwibGVmdCIsInRvcCIsInNjcmVlbldpZHRoIiwib25SZXNpemUiLCJyZXMxIiwiZXJyb3IiLCJvbk9wZW5Bc2tQYW5lbCIsIm9uQ2xvc2VBc2tQYW5lbCIsInVwZGF0ZSIsImR0IiwicGxheU5vcm1hbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxPQUFELENBQW5COztBQUNBLElBQUlDLFFBQVEsR0FBR0QsT0FBTyxDQUFDLFVBQUQsQ0FBdEI7O0FBQ0EsSUFBSUUsUUFBUSxHQUFHRixPQUFPLENBQUMsVUFBRCxDQUF0Qjs7QUFDQUcsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFlBQVksRUFBRUosRUFBRSxDQUFDSyxJQURUO0FBRVJDLElBQUFBLFlBQVksRUFBRU4sRUFBRSxDQUFDSyxJQUZUO0FBR1JFLElBQUFBLGFBQWEsRUFBRVAsRUFBRSxDQUFDUSxNQUhWO0FBSVJDLElBQUFBLFdBQVcsRUFBRVQsRUFBRSxDQUFDUSxNQUpSO0FBS1JFLElBQUFBLGdCQUFnQixFQUFFVixFQUFFLENBQUNRLE1BTGI7QUFNUkcsSUFBQUEsVUFBVSxFQUFFWCxFQUFFLENBQUNRLE1BTlA7QUFPUkksSUFBQUEsV0FBVyxFQUFFWixF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Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgVXRpbHMgPSByZXF1aXJlKFwiVXRpbHNcIik7XG5sZXQgU2hhcmVTZGsgPSByZXF1aXJlKFwiU2hhcmVTZGtcIik7XG5sZXQgUmFua0xpc3QgPSByZXF1aXJlKFwiUmFua0xpc3RcIik7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBtX25fZ2FtZW5vZGU6IGNjLk5vZGUsXG4gICAgICAgIG1fbl9iZ19wYW5lbDogY2MuTm9kZSxcbiAgICAgICAgbV9wcmVfYmxvY2tiZzogY2MuUHJlZmFiLFxuICAgICAgICBtX3ByZV9saWdodDogY2MuUHJlZmFiLFxuICAgICAgICBtX3ByZV9ib29tZWZmZWN0OiBjYy5QcmVmYWIsXG4gICAgICAgIG1fcHJlX2Jvb206IGNjLlByZWZhYixcbiAgICAgICAgbV9sX2Jvb21udW06IGNjLkxhYmVsLFxuICAgICAgICBtX2xfc2NvcmU6IGNjLkxhYmVsLFxuICAgICAgICBtX3NwX21vbnN0ZXI6IGNjLlNwcml0ZSxcbiAgICAgICAgbV9sX2xldmVsOiBjYy5MYWJlbCxcbiAgICAgICAgbV9uX3Jlc3VsdF9wYW5lbDogY2MuTm9kZSxcbiAgICAgICAgbV9idG5fdG9vbDI6IGNjLk5vZGUsXG4gICAgICAgIG1fbl9ndWlkZW1hc2s6IGNjLk5vZGUsXG4gICAgICAgIG1fbl90b29sdXNlOiBjYy5Ob2RlLFxuICAgICAgICBtX25fc2hvd3RpbWU6IHtcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgICAgICAgICBkZWZhdWx0OiBbXVxuICAgICAgICB9LFxuICAgICAgICBtX3NwZl9nb2xkOiBjYy5TcHJpdGVGcmFtZSxcbiAgICAgICAgbV9uX2Fza3BhbmVsOiBjYy5Ob2RlLFxuICAgICAgICBtX25fYm9zczogY2MuTm9kZSxcbiAgICAgICAgbV9zcHJpdGVBdGxhczogY2MuU3ByaXRlQXRsYXMsXG4gICAgICAgIG1fbl9iZ2xpc3Q6IGNjLk5vZGUsXG4gICAgICAgIG1fbF9nb2xkOiBjYy5MYWJlbCxcbiAgICAgICAgbV9wcmVfcm9jazogY2MuUHJlZmFiLFxuICAgICAgICBtX25fa3VhaToge1xuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdXG4gICAgICAgIH0sXG4gICAgICAgIG1fbl9kaXNwbGF5Y2hlY2s6IGNjLk5vZGUsXG4gICAgICAgIG1fbl9kaXNwbGF5cmFuazogY2MuTm9kZSxcbiAgICAgICAgbV9uX3N0ZXB2aWV3OiBjYy5Ob2RlLFxuICAgICAgICBtX25fcmVsaXZldmlldzogY2MuTm9kZSxcbiAgICAgICAgbV9uX3ZpZGVvOiBjYy5Ob2RlLFxuICAgICAgICBtX25fbG9va3ZpZGVvOiBjYy5Ob2RlLFxuICAgICAgICBtX25fbHVja3l2aWRlbzogY2MuTm9kZSxcbiAgICAgICAgbV9uX2RvdWJsZXZpZGVvOiBjYy5Ob2RlLFxuICAgICAgICBtX25fZG91Ymxlc2NvcmU6IGNjLk5vZGUsXG4gICAgICAgIG1fbl9zaGFyZWdpZnQ6IGNjLk5vZGUsXG4gICAgICAgIG1fbl9za2lucGFuZWw6IGNjLk5vZGUsXG4gICAgICAgIG1fbl9ndWlkZW5vZGU6IGNjLk5vZGUsXG4gICAgICAgIG1fbF9hc2t0eXBlOiBjYy5MYWJlbCxcbiAgICAgICAgbV9uX2d1aWRlZmlnZXI6IGNjLk5vZGUsXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB3aW5kb3cuR0FNRV9DT05UUk9MID0gdGhpcztcbiAgICAgICAgVXRpbHMuc2V0RGVzaWduUmVzb2x1dGlvbigpO1xuICAgIH0sXG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMubV9ibG9ja19wb29sLmNsZWFyKCk7XG4gICAgICAgIHRoaXMubV9saWdodF9wb29sLmNsZWFyKCk7XG4gICAgICAgIHdpbmRvdy5HQU1FX0NPTlRST0wgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5tX2Jhbm5lcmFkKSB7XG4gICAgICAgICAgICB0aGlzLm1fYmFubmVyYWQuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5tX2Jhbm5lcmFkID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBFVkVOVF9MSVNURU5FUi5vZmYod2luZG93LkdBTUVfVVBEQVRFX0RBVEEsIHRoaXMpO1xuICAgICAgICBFVkVOVF9MSVNURU5FUi5vZmYod2luZG93LkdBTUVfU0FWRV9IQU5ETEVSLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGlmICh3aW5kb3cuZmlyc3RHYW1lKVxuICAgICAgICAgICAgd2luZG93LmZpcnN0R2FtZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNyZWF0ZU1hcCgpO1xuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdE1vbnN0ZXIodGhpcy5tX2N1cl9sZXZlbCk7XG4gICAgICAgIHRoaXMuc2hvd0FkQmFubmVyKGZhbHNlKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy50b3VjaEVuZCwgdGhpcyk7XG4gICAgICAgIEVWRU5UX0xJU1RFTkVSLm9uKHdpbmRvdy5HQU1FX1VQREFURV9EQVRBLCB0aGlzLnVwZGF0ZUdvbGQsIHRoaXMpO1xuICAgICAgICBFVkVOVF9MSVNURU5FUi5vbih3aW5kb3cuR0FNRV9TQVZFX0hBTkRMRVIsIHRoaXMudXBkYXRlU2tpbiwgdGhpcyk7XG5cbiAgICAgICAgc2V0SW50ZXJ2YWwoKCk9PntcbiAgICAgICAgICAgIGlmICh3aW5kb3cuZ2V0ZGF0YSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5VdGlscy5zZXRTYXZlRGF0YSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCA2MDAwKTtcbiAgICB9LFxuXG4gICAgaW5pdERhdGEoKSB7XG4gICAgICAgIHRoaXMubV9uX3NraW5wYW5lbC5nZXRDb21wb25lbnQoXCJTa2luUGFuZWxcIikuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5tX25fZGlzcGxheWNoZWNrLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMubV9uX2Rpc3BsYXlyYW5rLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1fbl9sb29rdmlkZW8uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubV9uX2RvdWJsZXNjb3JlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1fZ2FtZXN0YXRlID0gMDtcbiAgICAgICAgdGhpcy5tX2N1cl9zY29yZSA9IDA7XG4gICAgICAgIHRoaXMubV9jdXJfbGV2ZWwgPSB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS50b3BfbGV2ZWwgKyAxO1xuICAgICAgICB0aGlzLm1fbm9ybWFsX3RhbGt0aW1lID0gNDsgLy/mgKrnianor7Tor53pl7TpmpRcbiAgICAgICAgdGhpcy5tX25vcm1hbF9jdXJ0aW1lID0gLTE7XG4gICAgICAgIHRoaXMubV90YXJnZXRfYmxvY2sgPSBbXTtcbiAgICAgICAgdGhpcy5tX21hcGJsaW5rID0gZmFsc2U7XG4gICAgICAgIHRoaXMubV90b3VjaF9ib29tID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3JlbGl2ZW51bSA9IDA7XG4gICAgICAgIHRoaXMuX3ZpZGVvbnVtID0gMDtcbiAgICAgICAgdGhpcy5fa2lsbG51bSA9IDA7XG4gICAgICAgIHRoaXMubV9sX3Njb3JlLnN0cmluZyA9IHRoaXMubV9jdXJfc2NvcmU7XG4gICAgICAgIHRoaXMubV9kb3VibGVzY29yZSA9IDE7XG4gICAgICAgIC8vIHRoaXMubV9sX3NvbGlkZXJudW0uc3RyaW5nID0gXCJYXCIgKyB0aGlzLm1fc29saWRlcm51bTtcbiAgICAgICAgdGhpcy5tX2xfbGV2ZWwuc3RyaW5nID0gXCJMVi5cIiArIHRoaXMubV9jdXJfbGV2ZWw7XG4gICAgICAgIHRoaXMubV9sX2dvbGQuc3RyaW5nID0gd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEuZ29sZF9udW07XG4gICAgICAgIHRoaXMuX2lzZGVsZXRpbmcgPSBmYWxzZSAvL+WIpOaWreaYr+WQpuato+WcqOa2iOmZpOeahOS+neaNrlxuICAgICAgICB0aGlzLl9pc2JsZXNzID0gZmFsc2U7IC8v5piv5ZCm5bey57uP5oGp6LWQ6L+HXG4gICAgICAgIHRoaXMubV9ibG9ja19wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHRoaXMubV9saWdodF9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHRoaXMudXBkYXRlVG9vbHNOdW0oKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLm1fYnRuX3Rvb2wyLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5yZXBlYXQoY2Muc2VxdWVuY2UoY2Mucm90YXRlVG8oMC4xLCAtMTApLCBjYy5yb3RhdGVUbygwLjEsIDEwKSksIDMpLCBjYy5yb3RhdGVUbygwLjEsIDApKSk7XG4gICAgICAgICAgICB0aGlzLm1fbl92aWRlby5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDEuMCksIGNjLnJlcGVhdChjYy5zZXF1ZW5jZShjYy5yb3RhdGVUbygwLjEsIC0xMCksIGNjLnJvdGF0ZVRvKDAuMSwgMTApKSwgMyksIGNjLnJvdGF0ZVRvKDAuMSwgMCkpKTtcbiAgICAgICAgICAgIHRoaXMubV9uX2RvdWJsZXZpZGVvLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoMi4wKSwgY2MucmVwZWF0KGNjLnNlcXVlbmNlKGNjLnJvdGF0ZVRvKDAuMSwgLTEwKSwgY2Mucm90YXRlVG8oMC4xLCAxMCkpLCAzKSwgY2Mucm90YXRlVG8oMC4xLCAwKSkpXG4gICAgICAgIH0sIDUpO1xuICAgICAgICB0aGlzLl9jb25maWdsaXN0ID0gdGhpcy5tX25fa3VhaVswXS5nZXRDb21wb25lbnQoXCJTaGFwZUl0ZW1cIikuZ2V0VGhlQ29uZmlnKCk7XG4gICAgICAgIFJhbmtMaXN0LmNoZWNrV2lsbFN1cnBhc3ModGhpcy5tX2N1cl9zY29yZSk7XG5cbiAgICAgICAgbGV0IHJhbmQgPSBVdGlscy5yYW5kb20oMCwgMTAwMCk7XG5cbiAgICAgICAgdGhpcy5tX25fbHVja3l2aWRlby5hY3RpdmUgPSByYW5kIDw9IDUwMCAmJiB0aGlzLm1fY3VyX2xldmVsID4gMTtcbiAgICAgICAgaWYgKHRoaXMubV9uX2x1Y2t5dmlkZW8uYWN0aXZlKSB7Ly/nrKzkuIDlhbPkuI3lh7rnjrBcbiAgICAgICAgICAgIHRoaXMubV9uX2x1Y2t5dmlkZW8uc2NhbGUgPSAwO1xuICAgICAgICAgICAgdGhpcy5tX25fbHVja3l2aWRlby5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjIsIDEuMiwgMS4yKS5lYXNpbmcoY2MuZWFzZUluKDMuMCkpLCBjYy5zY2FsZVRvKDAuMSwgMSwgMSkpKTtcbiAgICAgICAgICAgIGlmICh3aW5kb3cuU0tJTl9TSEFSRSkge1xuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuZmluZChcImJ0bl9jYW5jZWxcIiwgdGhpcy5tX25fbHVja3l2aWRlbyk7XG4gICAgICAgICAgICAgICAgbm9kZS55ID0gLTU3MDtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUueSA9IC01MTQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1fbl9sdWNreXZpZGVvLmFjdGl2ZSAmJiAhdGhpcy5zaG93QWRiKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93QWRCYW5uZXIodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSwgMS44KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGhpZGVHdWlkZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubV9jdXJfbGV2ZWwgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5tX25fZ3VpZGVub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5tX25fZ3VpZGVmaWdlci5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5tX25fZ3VpZGVmaWdlci5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHdpbmRvdy5HVUlERV9MRVZFTCA9IDE7XG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2d1aWRlaW5mbycsICcxJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvd0d1aWRlKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3RlbXBndWlkZSkge1xuICAgICAgICAgICAgdGhpcy5fdGVtcGd1aWRlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHsgcmV0dXJuOyB9XG4gICAgICAgIGxldCB0eXBlaW5kZXggPSAwO1xuICAgICAgICBsZXQgaW5kZXhsaXN0ID0gd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEuc2tpbjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRleGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpbmRleGxpc3RbaV0gPj0gMikge1xuICAgICAgICAgICAgICAgIHR5cGVpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGF0YSA9IHdpbmRvdy5TS0lOX0NPTkZJR1t0eXBlaW5kZXhdO1xuICAgICAgICB0aGlzLm1fbl9ndWlkZW5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5tX25fZ3VpZGVmaWdlci5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLm1fbl9ndWlkZWZpZ2VyLnBvc2l0aW9uID0gdGhpcy5tX25fa3VhaVsxXS5wb3NpdGlvbjtcbiAgICAgICAgdGhpcy5tX25fZ3VpZGVmaWdlci5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1fbl9ndWlkZWZpZ2VyLnBvc2l0aW9uID0gdGhpcy5tX25fa3VhaVsxXS5wb3NpdGlvbjtcbiAgICAgICAgfSksIGNjLm1vdmVUbygxLjAsIHRoaXMubV9uX2t1YWlbMV0ueCwgdGhpcy5tX25fa3VhaVsxXS55ICsgMzUwKSkpKTtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5tX25fa3VhaVswXS5nZXRDb21wb25lbnQoXCJTaGFwZUl0ZW1cIikuZ2V0Q3VyQ29sb3JJbmRleCgpO1xuICAgICAgICBsZXQgYmxvY2tpbmRleCA9IFtdO1xuICAgICAgICBibG9ja2luZGV4WzQ2XSA9IDE7XG4gICAgICAgIGJsb2NraW5kZXhbNTJdID0gMTtcbiAgICAgICAgYmxvY2tpbmRleFs1M10gPSAxO1xuICAgICAgICBibG9ja2luZGV4WzU4XSA9IDE7XG4gICAgICAgIGZvciAobGV0IGkgPSA0MzsgaSA8IDYxOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChibG9ja2luZGV4W2ldKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5tX21hcGFycmF5W2ldLmdldENvbXBvbmVudChcIkJsb2NrQkdJdGVtXCIpLnNldEJyaWdodFZpc2libGUodHJ1ZSwgJyMwMDAwMDAnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBuZXcgY2MuTm9kZShcImNvbG9yU3ByXCIpO1xuICAgICAgICAgICAgICAgIG5vZGUuY29sb3JJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICAgIG5vZGUuY29sb3JOYW1lID0gZGF0YS5uYW1lO1xuICAgICAgICAgICAgICAgIGxldCBzcHJpdGUgPSBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEubmFtZSwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMubV9zcHJpdGVBdGxhcy5nZXRTcHJpdGVGcmFtZShkYXRhLm5hbWUgKyBpbmRleCk7XG4gICAgICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IGNjLlZlYzIuWkVSTztcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubV9tYXBhcnJheVtpXTtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbWFwYXJyYXlbaV0uaXNIYXZlRksgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uS2VlcEdvaW5nKCkge1xuICAgICAgICB0aGlzLm1fbl9sdWNreXZpZGVvLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNob3dBZEJhbm5lcihmYWxzZSk7XG4gICAgfSxcblxuICAgIHRvdWNoRW5kKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLm1fZ2FtZXN0YXRlID09IDAgJiYgdGhpcy5tX3RvdWNoX2Jvb20pIHtcbiAgICAgICAgICAgIHRoaXMubV9nYW1lc3RhdGUgPSAyO1xuICAgICAgICAgICAgbGV0IHZlYyA9IGV2ZW50LnRvdWNoLmdldExvY2F0aW9uKCk7XG4gICAgICAgICAgICB2ZWMgPSB0aGlzLm1fbl9nYW1lbm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2UodmVjKTtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuYmFja0luZGV4b2ZMaXN0KHZlYyk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tX21hcGFycmF5W2luZGV4XS5pc0hhdmVGSykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fbWFwYXJyYXlbaW5kZXhdLmlzSGF2ZUZLID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm1fcHJlX2Jvb20pO1xuICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubV9tYXBhcnJheVtpbmRleF07XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLnRvb2xbMF0gLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUb29sc051bSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvQm9vbUFjdGlvbih0aGlzLm1fbWFwYXJyYXlbaW5kZXhdLnBvc2l0aW9uLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tX25fZ3VpZGVtYXNrLmFjdGl2ZSA9ICF0aGlzLm1fbWFwYmxpbms7XG4gICAgICAgICAgICB0aGlzLm1fdG91Y2hfYm9vbSA9ICF0aGlzLm1fbWFwYmxpbms7XG4gICAgICAgICAgICB0aGlzLnNldE1hcEJsaW5rKCF0aGlzLm1fbWFwYmxpbmspO1xuICAgICAgICAgICAgdGhpcy5tX2dhbWVzdGF0ZSA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubV9uX2t1YWkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc2hhcGVpdGVtID0gdGhpcy5tX25fa3VhaVtpXS5nZXRDb21wb25lbnQoXCJTaGFwZUl0ZW1cIik7XG4gICAgICAgICAgICAgICAgaWYgKHNoYXBlaXRlbS5jaGVja0lzTG9zZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9uX2t1YWlbaV0ub3BhY2l0eSA9IDEyNTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fbl9rdWFpW2ldLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGRvQm9vbUFjdGlvbihwb3MsIGluZGV4KSB7XG4gICAgICAgIGxldCBGS05vZGUgPSB0aGlzLm1fbWFwYXJyYXlbaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiY29sb3JTcHJcIilcbiAgICAgICAgLy/ov5nkuKrlgYfmlrnlnZflj5jlpKflubbkuJTmuJDpmpDmjolcbiAgICAgICAgRktOb2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcbiAgICAgICAgICAgIGNjLnNwYXduKGNjLnNjYWxlVG8oMC41LCAyKSwgY2MuZmFkZU91dCgwLjUpKSxcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYodHJ1ZSlcbiAgICAgICAgKSk7XG4gICAgICAgIHRoaXMubV9tYXBhcnJheVtpbmRleF0uaXNIYXZlRksgPSBudWxsO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubV9wcmVfYm9vbWVmZmVjdCk7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubV9uX2dhbWVub2RlO1xuICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IHBvcztcbiAgICAgICAgICAgIG5vZGUueSAtPSAxMDA7XG4gICAgICAgICAgICBub2RlLnpJbmRleCA9IDEgPDwgODtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheShcImJvbWJlZmZlY3RcIik7XG4gICAgICAgICAgICBVdGlscy5TZXRTb3VuZEVmZmVjdCh3aW5kb3cuQk9PTV9FRkZFQ1QsIGZhbHNlLCAxKTtcbiAgICAgICAgfSwgMC40KTtcbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLmdldEJvb21JbmRleExpc3QoaW5kZXgpO1xuICAgICAgICBjb25zb2xlLmxvZyhsaXN0KTtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgbGV0IGFjdGlvbkFyeSA9IFtdO1xuICAgICAgICBhY3Rpb25BcnkucHVzaChjYy5kZWxheVRpbWUoMC40KSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG9uZUxpc3QgPSBsaXN0W2ldO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBvbmVMaXN0Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHhJbmRleCA9IG9uZUxpc3Rbal07XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubV9tYXBhcnJheVt4SW5kZXhdLmlzSGF2ZUZLKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbkFyeS5wdXNoKGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB4SW5kZXggPSBhcmd1bWVudHNbMV1bMF1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IGFyZ3VtZW50c1sxXVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzY29yZSA9IHRoaXMuZ2V0QWRkU2NvcmVDYWwoY291bnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuc2hvd0h1cnRUZXh0KFwiK1wiICsgc2NvcmUsIHRoaXMubV9uX2dhbWVub2RlLCB0aGlzLm1fbWFwYXJyYXlbeEluZGV4XS54LCB0aGlzLm1fbWFwYXJyYXlbeEluZGV4XS55LCAyMCwgbnVsbCwgbnVsbCwgbnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjb3JlKHNjb3JlKVxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLCBbeEluZGV4LCBjb3VudF0pKVxuXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbkFyeS5wdXNoKGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB4SW5kZXggPSBhcmd1bWVudHNbMV1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubV9tYXBhcnJheVt4SW5kZXhdLmlzSGF2ZUZLID0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IEZLTm9kZSA9IHRoaXMubV9tYXBhcnJheVt4SW5kZXhdLmdldENoaWxkQnlOYW1lKFwiY29sb3JTcHJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghRktOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC8v6Ziy5q2i5rKh5pyJ6L+Z5Liq5pa55Z2X55qE5pe25YCZXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja01vbnN0ZXIoRktOb2RlLmNvbG9ySW5kZXgsIHRoaXMubV9tYXBhcnJheVt4SW5kZXhdLngsIHRoaXMubV9tYXBhcnJheVt4SW5kZXhdLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/ov5nkuKrlgYfmlrnlnZflj5jlpKflubbkuJTmuJDpmpDmjolcbiAgICAgICAgICAgICAgICAgICAgICAgIEZLTm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Muc3Bhd24oY2Muc2NhbGVUbygwLjUsIDIpLCBjYy5mYWRlT3V0KDAuNSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYodHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICkpXG5cbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcywgeEluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50KytcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhY3Rpb25BcnkucHVzaChjYy5kZWxheVRpbWUoMC4zKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhY3Rpb25BcnkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gVXRpbHMuU2V0U291bmRFZmZlY3Qod2luZG93LkdFVF9HT0xELCBmYWxzZSwgMSk7XG4gICAgICAgICAgICBhY3Rpb25BcnkucHVzaChjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNkZWxldGluZyA9IGZhbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0lzTG9zZSgpXG4gICAgICAgICAgICB9LCB0aGlzKSlcbiAgICAgICAgICAgIHRoaXMuX2lzZGVsZXRpbmcgPSB0cnVlXG4gICAgICAgICAgICBsZXQgYWN0aW9uID0gY2Muc2VxdWVuY2UoYWN0aW9uQXJ5KVxuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIOagueaNrueCuOW8ueS4i+agh+iOt+WPluiMg+WbtOW8leeIhuiMg+WbtFxuICAgICAqIEBwYXJhbSB754K45by55LiL5qCHfSBpbmRleCBcbiAgICAgKi9cbiAgICBnZXRCb29tSW5kZXhMaXN0KGluZGV4KSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuYm9vbXJhbmdlW2luZGV4XTtcbiAgICB9LFxuXG4gICAgYm9tYkZpbmlzaCgpIHtcblxuICAgIH0sXG4gICAgLyoqXG4gICAgICog6I635Y+W5Y+v5Lul5pS+572u55qE5pa55qC8IDPkuKpcbiAgICAgKi9cbiAgICBnZXRDYW5Ecm9wQmxvY2tzKCkge1xuICAgICAgICBsZXQgY2FuRHJvcGxzaXQgPSBbMCwgMCwgMF07XG4gICAgICAgIGZvciAobGV0IGsgPSB0aGlzLl9jb25maWdsaXN0Lmxlbmd0aCAtIDE7IGsgPj0gMTsgay0tKSB7XG4gICAgICAgICAgICAvL+S4gOS4quS4quagvOWtkOaUvuivleS4gOS4i+iDveS4jeiDveaUvlxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1fbWFwYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZnJhbWVOb2RlID0gdGhpcy5tX21hcGFycmF5W2ldXG4gICAgICAgICAgICAgICAgdmFyIHNyY1BvcyA9IGNjLnYyKGZyYW1lTm9kZS54LCBmcmFtZU5vZGUueSlcbiAgICAgICAgICAgICAgICB2YXIgY291bnQgPSAxXG4gICAgICAgICAgICAgICAgaWYgKCFmcmFtZU5vZGUuaXNIYXZlRkspIHtcbiAgICAgICAgICAgICAgICAgICAgLy/ov5nph4zlgZrmmK/lkKblj6/ku6XmlL7nmoTliKTmlq1cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5fY29uZmlnbGlzdFtrXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCBjaGlsZHJlbi5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxlbiA9IDUyIC8v56Kw5pKe6Led56a7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGRQb3MgPSBzcmNQb3MuYWRkKGNjLnYyKGNoaWxkcmVuW2pdLngsIGNoaWxkcmVuW2pdLnkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLy/norDmkp7mo4DmtYtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5tX21hcGFycmF5Lmxlbmd0aDsgcysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRGcmFtZU5vZGUgPSB0aGlzLm1fbWFwYXJyYXlbc11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGlzID0gY2MudjIodEZyYW1lTm9kZS54LCB0RnJhbWVOb2RlLnkpLnN1YihjaGlsZFBvcykubWFnKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpcyA8PSBsZW4gJiYgIXRGcmFtZU5vZGUuaXNIYXZlRkspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnQrKyAvL+WPr+S7peaUvuWwseimgee0r+WKoOiuoeaVsFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL+WmguaenOaVsOmHj+ebuOetieWwseivtOaYjui/meS4quaWueWdl+WcqOi/meS4quagvOWtkOaYr+WPr+S7peaUvuS4i+eahFxuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPT0gY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5Ecm9wbHNpdC5wdXNoKGspO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhbkRyb3Bsc2l0Lmxlbmd0aCA+IDMpIHtcbiAgICAgICAgICAgIGxldCBhcnIgPSBVdGlscy5nZXRSYW5kb21TRGlmZigwLCBjYW5Ecm9wbHNpdC5sZW5ndGggLSAxLCAzKTtcbiAgICAgICAgICAgIHJldHVybiBbY2FuRHJvcGxzaXRbYXJyWzBdXSwgY2FuRHJvcGxzaXRbYXJyWzFdXSwgY2FuRHJvcGxzaXRbYXJyWzJdXV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW2NhbkRyb3Bsc2l0WzBdLCBjYW5Ecm9wbHNpdFsxXSwgY2FuRHJvcGxzaXRbMl1dO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGJhY2tJbmRleG9mTGlzdChwb3MpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aW5kb3cuSU5ERVhfVE9fUE9JTlQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwb3Muc3ViKGNjLnYyKHdpbmRvdy5JTkRFWF9UT19QT0lOVFtpXVswXSwgd2luZG93LklOREVYX1RPX1BPSU5UW2ldWzFdKSkubWFnKCkgPD0gNTApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfSxcblxuICAgIHVwZGF0ZVRvb2xzTnVtKCkge1xuICAgICAgICB0aGlzLm1fYm9vbW51bSA9IHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLnRvb2xbMF07XG4gICAgICAgIHRoaXMubV9sX2Jvb21udW0uc3RyaW5nID0gXCJ4XCIgKyB0aGlzLm1fYm9vbW51bTtcbiAgICAgICAgdGhpcy5zZXRBZGRWaXNpYmxlKHRoaXMubV9idG5fdG9vbDIsIHRoaXMubV9ib29tbnVtKTtcbiAgICAgICAgdGhpcy51cGRhdGVHb2xkKCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZUdvbGQoKSB7XG4gICAgICAgIHRoaXMubV9sX2dvbGQuc3RyaW5nID0gd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEuZ29sZF9udW07XG4gICAgfSxcblxuICAgIHVwZGF0ZVNraW4oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGVza2luJylcbiAgICAgICAgbGV0IGRhdGFfaW5kZXggPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubV9uX2t1YWkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRhdGFfaW5kZXggPSB0aGlzLm1fbl9rdWFpW2ldLmdldENvbXBvbmVudChcIlNoYXBlSXRlbVwiKS51cGRhdGVJbmRleCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGF0YSA9IHdpbmRvdy5TS0lOX0NPTkZJR1tkYXRhX2luZGV4XTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLm1fbWFwYXJyYXkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGxldCBGS05vZGUgPSB0aGlzLm1fbWFwYXJyYXlbal0uZ2V0Q2hpbGRCeU5hbWUoXCJjb2xvclNwclwiKTtcbiAgICAgICAgICAgIGlmIChGS05vZGUpIHtcbiAgICAgICAgICAgICAgICBGS05vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLm1fc3ByaXRlQXRsYXMuZ2V0U3ByaXRlRnJhbWUoZGF0YS5uYW1lICsgRktOb2RlLmNvbG9ySW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldEFkZFZpc2libGUobm9kZSwgbnVtKSB7XG4gICAgICAgIGxldCBhZGRidG4gPSBjYy5maW5kKFwic3BfYWRkXCIsIG5vZGUpO1xuICAgICAgICBhZGRidG4uYWN0aXZlID0gbnVtIDw9IDA7XG4gICAgfSxcblxuICAgIHVwZGF0ZVNjb3JlKHNjb3JlKSB7XG4gICAgICAgIHRoaXMubV9jdXJfc2NvcmUgKz0gc2NvcmU7XG4gICAgICAgIHRoaXMubV9sX3Njb3JlLnN0cmluZyA9IHRoaXMubV9jdXJfc2NvcmU7XG4gICAgICAgIGlmICghdGhpcy5tX25fcmVzdWx0X3BhbmVsLmFjdGl2ZSlcbiAgICAgICAgICAgIFJhbmtMaXN0LmNoZWNrV2lsbFN1cnBhc3ModGhpcy5tX2N1cl9zY29yZSk7XG4gICAgICAgIGlmICh0aGlzLm1fY3VyX3Njb3JlID4gd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEudG9wX3Njb3JlKSB7XG4gICAgICAgICAgICB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS50b3Bfc2NvcmUgPSB0aGlzLm1fY3VyX3Njb3JlO1xuICAgICAgICAgICAgUmFua0xpc3Quc2V0U2NvcmUod2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEudG9wX3Njb3JlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjcmVhdGVNYXAoKSB7XG4gICAgICAgIHRoaXMubV9tYXBhcnJheSA9IFtdO1xuICAgICAgICBsZXQgZnJhbWVMaXN0ID0gW107XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB3aW5kb3cuSU5ERVhfVE9fUE9JTlQubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubV9wcmVfYmxvY2tiZyk7XG4gICAgICAgICAgICBub2RlLnggPSB3aW5kb3cuSU5ERVhfVE9fUE9JTlRbaW5kZXhdWzBdO1xuICAgICAgICAgICAgbm9kZS55ID0gd2luZG93LklOREVYX1RPX1BPSU5UW2luZGV4XVsxXTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5tX25fYmdsaXN0O1xuICAgICAgICAgICAgbm9kZS5GS0luZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICBmcmFtZUxpc3QucHVzaChub2RlKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubV9tYXBhcnJheSA9IGZyYW1lTGlzdDtcbiAgICB9LFxuXG4gICAgLy/liJvlu7rns5bmnpxcbiAgICBpbml0TW9uc3RlcihsZXZlbCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBsdiA9IGxldmVsICUgMTAwO1xuICAgICAgICBpZiAobHYgPD0gMCkgbHYgKz0gMTtcbiAgICAgICAgbGV0IGRhdGEgPSB3aW5kb3cuTUFQX0NPTkZJR1tsdiAtIDFdO1xuXG4gICAgICAgIHRoaXMubV9zcF9tb25zdGVyLm5vZGUuZ2V0Q29tcG9uZW50KFwiTW9uc3Rlckl0ZW1cIikuaW5pdFR5cGUoZGF0YS5tb25faWQsIGRhdGEubW9uX2hwLCBsZXZlbCk7XG4gICAgICAgIC8vIHRoaXMubV9zcF9tb25zdGVyLm5vZGUuY29sb3IgPSB3aW5kb3cuTU9OX0NPTE9SW2RhdGEuY29sb3JdO1xuICAgICAgICB0aGlzLm1fc3BfbW9uc3Rlci5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMubV9zcF9tb25zdGVyLm5vZGUub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgdGhpcy5tX3NwX21vbnN0ZXIubm9kZS55ID0gMzAwO1xuICAgICAgICBsZXQgeSA9IDA7XG4gICAgICAgIHRoaXMubV9zcF9tb25zdGVyLm5vZGUuZ2V0Q29tcG9uZW50KFwiTW9uc3Rlckl0ZW1cIikucGxheVN0YXJ0VGFsaygpO1xuICAgICAgICBpZiAoZGF0YS5tb25faWQgPT0gMCkge1xuICAgICAgICAgICAgLy8gdGhpcy5tX3NwX21vbnN0ZXIubm9kZS55ID0gLTEwO1xuICAgICAgICAgICAgeSA9IC0xMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoaXMubV9zcF9tb25zdGVyLm5vZGUueSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1fc3BfbW9uc3Rlci5ub2RlLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC40LCAwLCB5KS5lYXNpbmcoY2MuZWFzZUluKDMuMCkpKTtcblxuICAgICAgICBpZiAobGV2ZWwgJSA1ID09IDApIHtcbiAgICAgICAgICAgIHRoaXMubV9uX2Jvc3MuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubV9uX2Jvc3Mub3BhY2l0eSA9IDUwO1xuICAgICAgICAgICAgdGhpcy5tX25fYm9zcy5zY2FsZSA9IDIuNTtcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSAxMDtcbiAgICAgICAgICAgIGxldCBkZWx0YVRpbWUgPSAwLjAyO1xuICAgICAgICAgICAgdGhpcy5tX25fYm9zcy5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc3Bhd24oY2Muc2NhbGVUbygwLjgsIDEuMCkuZWFzaW5nKGNjLmVhc2VCYWNrSW4oMy4wKSksIGNjLmZhZGVUbygwLjgsIDI1NSkpLCBjYy5tb3ZlQnkoZGVsdGFUaW1lLCBjYy52MihvZmZzZXQgKiAyLCAwKSksXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KGRlbHRhVGltZSAqIDIsIGNjLnYyKC1vZmZzZXQgKiA0KSksXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KGRlbHRhVGltZSwgY2MudjIob2Zmc2V0ICogMikpLFxuXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KGRlbHRhVGltZSwgY2MudjIoMCwgb2Zmc2V0ICogMikpLFxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeShkZWx0YVRpbWUgKiAyLCBjYy52MigwLCAtb2Zmc2V0ICogNCkpLFxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeShkZWx0YVRpbWUsIGNjLnYyKDAsIG9mZnNldCAqIDIpKSxcblxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeShkZWx0YVRpbWUsIGNjLnYyKG9mZnNldCwgMCkpLFxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeShkZWx0YVRpbWUgKiAyLCBjYy52Migtb2Zmc2V0ICogMiwgMCkpLFxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeShkZWx0YVRpbWUsIGNjLnYyKG9mZnNldCwgMCkpLFxuXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KGRlbHRhVGltZSwgY2MudjIoMCwgb2Zmc2V0KSksXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KGRlbHRhVGltZSAqIDIsIGNjLnYyKDAsIC1vZmZzZXQgKiAyKSksXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KGRlbHRhVGltZSwgY2MudjIoMCwgb2Zmc2V0KSksXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgxLjUpKSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvL+WKoOWIhu+8jOWPguaVsOaYr+a2iOmZpOeahOaAu+aVsCxpc0Ryb3BBZGTmmK/mmK/lkKbmmK/mlL7kuIvnmoTljZXnuq/liqDliIZcbiAgICBhZGRTY29yZTogZnVuY3Rpb24gKFhDQ291bnQsIGlzRHJvcEFkZCkge1xuICAgICAgICBsZXQgYWRkU2NvcmVDb3VudCA9IHRoaXMuZ2V0QWRkU2NvcmVDYWwoWENDb3VudCwgaXNEcm9wQWRkKVxuICAgICAgICBVdGlscy5zaG93SHVydFRleHQoXCIrXCIgKyBhZGRTY29yZUNvdW50LCBudWxsLCAwLCAwLCAzMCk7XG4gICAgICAgIHRoaXMudXBkYXRlU2NvcmUoYWRkU2NvcmVDb3VudCk7XG4gICAgfSxcblxuICAgIC8v6K6h566X5Yqg5YiG55qE5YWs5byPXG4gICAgZ2V0QWRkU2NvcmVDYWw6IGZ1bmN0aW9uIChYQ0NvdW50LCBpc0Ryb3BBZGQpIHtcbiAgICAgICAgbGV0IHggPSBYQ0NvdW50ICsgMVxuICAgICAgICBsZXQgYWRkU2NvcmVDb3VudCA9IGlzRHJvcEFkZCA/IHggOiB4ICogeCAvL+aVsOmHj+eahOW5s+aWuVxuICAgICAgICByZXR1cm4gYWRkU2NvcmVDb3VudCAqIHRoaXMubV9kb3VibGVzY29yZTtcbiAgICB9LFxuXG4gICAgLy/mo4DmtYvmmK/kuI3mmK/ovpPkuoZcbiAgICBjaGVja0lzTG9zZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAvL+WmguaenOato+WcqOa2iOmZpOS4re+8jOmCo+WwseS4jeWIpOaWrei+k+i1ou+8jOWboOS4uua2iOmZpOWQjuS8muWGjeWIpOaWrVxuICAgICAgICBpZiAodGhpcy5faXNkZWxldGluZykgcmV0dXJuXG4gICAgICAgIHRoaXMubV9ub3JtYWxfY3VydGltZSA9IDA7XG4gICAgICAgIGxldCBjb3VudCA9IDBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuZmluZCgnbl9rdWFpJyArIChpICsgMSksIHRoaXMubV9uX2dhbWVub2RlKVxuICAgICAgICAgICAgbGV0IHNjcmlwdCA9IG5vZGUuZ2V0Q29tcG9uZW50KCdTaGFwZUl0ZW0nKTtcbiAgICAgICAgICAgIGlmIChzY3JpcHQuY2hlY2tJc0xvc2UoKSkge1xuICAgICAgICAgICAgICAgIGNvdW50KytcbiAgICAgICAgICAgICAgICBub2RlLm9wYWNpdHkgPSAxMjVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZS5vcGFjaXR5ID0gMjU1XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvdW50ID49IDIgJiYgIXRoaXMuX2lzYmxlc3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzYmxlc3MgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmZpbmQoJ25fa3VhaScgKyAoaSArIDEpLCB0aGlzLm1fbl9nYW1lbm9kZSlcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnU2hhcGVJdGVtJykuc2V0TmV4dEJsb2NrKDApOyAvL+iuvue9ruS4i+S4gOS4quW/heWumuaYr+afkOS4quW9oueKtlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjb3VudCA9PSAzKSB7IC8v5rKh5Zyw5pa55pS+5LqGXG4gICAgICAgICAgICB0aGlzLmp1ZGdlR2FtZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy/mo4Dmn6XmmK/lkKbmnInlj6/mtojpmaRcbiAgICBjaGVja0NsZWFyVXAoKSB7XG4gICAgICAgIGxldCBoYXZlRktJbmRleExpc3QgPSBbXVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubV9tYXBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMubV9tYXBhcnJheVtpXS5pc0hhdmVGSykge1xuICAgICAgICAgICAgICAgIGhhdmVGS0luZGV4TGlzdC5wdXNoKHRoaXMubV9tYXBhcnJheVtpXS5GS0luZGV4KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGhhdmVGS0luZGV4TGlzdC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYSAtIGJcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCB4Y0xpc3QgPSBbXSAvL+imgea2iOmZpOeahOaWueWdl+WIl+ihqFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdpbmRvdy5ESVNMSVNULmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgb25lWENMaXN0ID0gd2luZG93LkRJU0xJU1RbaV1cbiAgICAgICAgICAgIGxldCBpbnRlcnNlY3RBcnkgPSB0aGlzLmdldDJBcnlJbnRlcnNlY3QoaGF2ZUZLSW5kZXhMaXN0LCBvbmVYQ0xpc3QpIC8v5rGC5pWw57uE5Lqk6ZuGXG4gICAgICAgICAgICBpZiAoaW50ZXJzZWN0QXJ5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgaXNYQyA9IHRoaXMuY2hlY2syQXJ5SXNFcXVhbChvbmVYQ0xpc3QsIGludGVyc2VjdEFyeSkgLy/mlbDnu4Tnm7jlkIzvvIzmtojpmaRcbiAgICAgICAgICAgICAgICBpZiAoaXNYQykge1xuICAgICAgICAgICAgICAgICAgICB4Y0xpc3QucHVzaChvbmVYQ0xpc3QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBhY3Rpb25BcnkgPSBbXTtcbiAgICAgICAgLy/mtojpmaRcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgbGV0IGNsZWFybnVtID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB4Y0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBvbmVMaXN0ID0geGNMaXN0W2ldO1xuICAgICAgICAgICAgY2xlYXJudW0gKz0gb25lTGlzdC5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG9uZUxpc3QubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgeEluZGV4ID0gb25lTGlzdFtqXVxuICAgICAgICAgICAgICAgIGFjdGlvbkFyeS5wdXNoKGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHhJbmRleCA9IGFyZ3VtZW50c1sxXVswXVxuICAgICAgICAgICAgICAgICAgICBsZXQgY291bnQgPSBhcmd1bWVudHNbMV1bMV07XG4gICAgICAgICAgICAgICAgICAgIGxldCBzY29yZSA9IHRoaXMuZ2V0QWRkU2NvcmVDYWwoY291bnQpO1xuICAgICAgICAgICAgICAgICAgICAvLyBVdGlscy5zaG93VGlwc1RleHQoXCIrXCIgKyBzY29yZSwgdGhpcy5tX25fZ2FtZW5vZGUsIHRoaXMubV9tYXBhcnJheVt4SW5kZXhdLngsIHRoaXMubV9tYXBhcnJheVt4SW5kZXhdLnksIDYwKTtcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuc2hvd0h1cnRUZXh0KFwiK1wiICsgc2NvcmUsIHRoaXMubV9uX2dhbWVub2RlLCB0aGlzLm1fbWFwYXJyYXlbeEluZGV4XS54LCB0aGlzLm1fbWFwYXJyYXlbeEluZGV4XS55LCAyMCwgbnVsbCwgbnVsbCwgbnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NvcmUoc2NvcmUpXG4gICAgICAgICAgICAgICAgfSwgdGhpcywgW3hJbmRleCwgY291bnRdKSlcblxuICAgICAgICAgICAgICAgIGFjdGlvbkFyeS5wdXNoKGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHhJbmRleCA9IGFyZ3VtZW50c1sxXVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fbWFwYXJyYXlbeEluZGV4XS5pc0hhdmVGSyA9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgbGV0IEZLTm9kZSA9IHRoaXMubV9tYXBhcnJheVt4SW5kZXhdLmdldENoaWxkQnlOYW1lKFwiY29sb3JTcHJcIilcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFGS05vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAvL+mYsuatouayoeaciei/meS4quaWueWdl+eahOaXtuWAmVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrTW9uc3RlcihGS05vZGUuY29sb3JJbmRleCwgdGhpcy5tX21hcGFycmF5W3hJbmRleF0ueCwgdGhpcy5tX21hcGFycmF5W3hJbmRleF0ueSk7XG4gICAgICAgICAgICAgICAgICAgIC8v6L+Z5Liq5YGH5pa55Z2X5Y+Y5aSn5bm25LiU5riQ6ZqQ5o6JXG4gICAgICAgICAgICAgICAgICAgIEZLTm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zcGF3bihjYy5zY2FsZVRvKDAuNSwgMiksIGNjLmZhZGVPdXQoMC41KSksXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5yZW1vdmVTZWxmKHRydWUpXG4gICAgICAgICAgICAgICAgICAgICkpXG5cbiAgICAgICAgICAgICAgICB9LCB0aGlzLCB4SW5kZXgpKVxuXG4gICAgICAgICAgICAgICAgYWN0aW9uQXJ5LnB1c2goY2MuZGVsYXlUaW1lKDAuMSkpXG4gICAgICAgICAgICAgICAgY291bnQrK1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFjdGlvbkFyeS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBVdGlscy5TZXRTb3VuZEVmZmVjdCh3aW5kb3cuR0VUX0dPTEQsIGZhbHNlLCAxKTtcbiAgICAgICAgICAgIGFjdGlvbkFyeS5wdXNoKGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc2RlbGV0aW5nID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrSXNMb3NlKClcbiAgICAgICAgICAgIH0sIHRoaXMpKVxuICAgICAgICAgICAgdGhpcy5oYW5kbGVyU2hvd1RpbWUoY2xlYXJudW0pO1xuICAgICAgICAgICAgdGhpcy5faXNkZWxldGluZyA9IHRydWVcbiAgICAgICAgICAgIGxldCBhY3Rpb24gPSBjYy5zZXF1ZW5jZShhY3Rpb25BcnkpXG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy/ojrflvpfkuKTkuKrmlbDnu4TnmoTkuqTpm4ZcbiAgICBnZXQyQXJ5SW50ZXJzZWN0OiBmdW5jdGlvbiAoYXJ5MSwgYXJ5Mikge1xuICAgICAgICBsZXQgaW50ZXJzZWN0QXJ5ID0gW11cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnkxLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFyeTIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJ5MltqXSA9PSBhcnkxW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGludGVyc2VjdEFyeS5wdXNoKGFyeTJbal0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnRlcnNlY3RBcnlcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiDojrflvpfkuKTkuKrmlbDnu4TnmoTkuqTpm4ZcbiAgICAgKiBAcGFyYW0gIHthcnJheX3mlbDnu4QxXG4gICAgICogQHBhcmFtICB7YXJyYXl95pWw57uEMlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW595piv5ZCm55u45LqkXG4gICAgICovXG4gICAgY2hlY2syQXJ5SXNFcXVhbDogZnVuY3Rpb24gKGFyeTEsIGFyeTIpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnkxLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYXJ5MltpXSAhPSBhcnkxW2ldKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9LFxuXG4gICAgaGFuZGxlclNob3dUaW1lKG51bSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImhhbmRsZXJTaG93VGltZVwiLCBudW0pO1xuICAgICAgICBsZXQgaW5kZXggPSAtMTtcbiAgICAgICAgaWYgKG51bSA+IDkgJiYgbnVtIDw9IDEyKSB7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAobnVtID4gMTIgJiYgbnVtIDw9IDE1KSB7XG4gICAgICAgICAgICBpbmRleCA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAobnVtID4gMTUpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09IDIpIHtcbiAgICAgICAgICAgICAgICBVdGlscy5TZXRTb3VuZEVmZmVjdCh3aW5kb3cuU0FZXzMsIGZhbHNlLCAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgVXRpbHMuU2V0U291bmRFZmZlY3Qod2luZG93LkdFVF9HT0xELCBmYWxzZSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1fbl9zaG93dGltZVtpbmRleF0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubV9uX3Nob3d0aW1lW2luZGV4XS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbl9zaG93dGltZVtpbmRleF0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAxNTAwKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL+WinuWKoOmHkeW4geaVsFxuICAgIGFkZEdvbGQoZ29sZCwgc3BvcywgZXBvcykge1xuICAgICAgICBsZXQgdGhpcyQxID0gdGhpcztcbiAgICAgICAgbGV0IHNwcml0ZWZyYW0gPSB0aGlzLm1fc3BmX2dvbGQ7XG4gICAgICAgIHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLmdvbGRfbnVtICs9IGdvbGQ7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ29sZDsgaSsrKSB7XG4gICAgICAgICAgICBVdGlscy5tb3ZlSWNvbihzcHJpdGVmcmFtLCB0aGlzLm1fbl9nYW1lbm9kZSwgc3BvcywgZXBvcywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIFV0aWxzLlNldFNvdW5kRWZmZWN0KHdpbmRvdy5HRVRfR09MRCwgZmFsc2UsIDAuNCk7XG4gICAgICAgICAgICAgICAgdGhpcyQxLm1fbF9nb2xkLnN0cmluZyA9IHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLmdvbGRfbnVtO1xuICAgICAgICAgICAgfSwgMC41LCA2MCAqIChpICsgMSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIH0pXG4gICAgfSxcblxuICAgIC8v5bGV56S65a6d566xXG4gICAgc2hvd0JveChzcG9zLCBlcG9zLCBsdikge1xuICAgICAgICBsZXQgdGhpcyQxID0gdGhpcztcbiAgICAgICAgbGV0IGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGx2ICUgMTAgPT0gMCAmJiBsdiA8PSAzNzApIHtcbiAgICAgICAgICAgICAgICB0aGlzJDEubV9uX3N0ZXB2aWV3LnNjYWxlID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzJDEubV9uX3N0ZXB2aWV3LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcyQxLm1fbl9zdGVwdmlldy5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjIsIDEuMiwgMS4yKS5lYXNpbmcoY2MuZWFzZUluKDMuMCkpLCBjYy5zY2FsZVRvKDAuMSwgMSwgMSkpKTtcbiAgICAgICAgICAgICAgICB0aGlzJDEubV9uX3N0ZXB2aWV3LmdldENvbXBvbmVudChcIlN0ZXBWaWV3SXRlbVwiKS5zaG93U3RlcChsdik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgVXRpbHMubG9hZFJlcygnc3ByaXRlL2dldHNoYXJlX2JveCcsIGNjLlNwcml0ZUZyYW1lLCAob2JqKSA9PiB7XG4gICAgICAgICAgICBVdGlscy5tb3ZlSWNvbihvYmosIHRoaXMkMS5tX25fZ2FtZW5vZGUsIHNwb3MsIGVwb3MsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzJDEubV9uX3NoYXJlZ2lmdC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMkMS5tX25fc2hhcmVnaWZ0LmdldENvbXBvbmVudCgnR2V0Qm94R2lmdEl0ZW0nKS5zaG93VmlldyhjYWxsYmFjayk7XG4gICAgICAgICAgICB9LCAwLjgsIDEwMCk7XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIGF0dGFja01vbnN0ZXIoaHVydCwgeCwgeSkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCByZWFsaHVydCA9IGh1cnQgPyAyICogaHVydCA6IDI7XG4gICAgICAgIGxldCBibG9ja25vZGUgPSB0aGlzLm1fYmxvY2tfcG9vbC5nZXQoKTtcbiAgICAgICAgaWYgKCFibG9ja25vZGUpIHtcbiAgICAgICAgICAgIGJsb2Nrbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubV9wcmVfcm9jayk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGFuZ2xlID0gVXRpbHMuZ2V0QW5nbGUodGhpcy5tX3NwX21vbnN0ZXIubm9kZS5wYXJlbnQueCwgdGhpcy5tX3NwX21vbnN0ZXIubm9kZS5wYXJlbnQueSwgeCwgeSk7XG4gICAgICAgIGlmICh0aGlzLm1fc3BfbW9uc3Rlci5ub2RlLnBhcmVudC54IDw9IHgpIHtcbiAgICAgICAgICAgIGFuZ2xlID0gLWFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIGJsb2Nrbm9kZS5yb3RhdGlvbiA9IGFuZ2xlO1xuICAgICAgICBibG9ja25vZGUuZ2V0Q29tcG9uZW50KFwiUm9ja0l0ZW1cIikucmVzZXRTeXRlbSgpO1xuICAgICAgICBibG9ja25vZGUuekluZGV4ID0gMSA8PCA1O1xuICAgICAgICBibG9ja25vZGUucGFyZW50ID0gdGhpcy5tX25fZ2FtZW5vZGU7XG4gICAgICAgIGJsb2Nrbm9kZS54ID0geDtcbiAgICAgICAgYmxvY2tub2RlLnkgPSB5O1xuICAgICAgICBibG9ja25vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgfSksIGNjLm1vdmVUbygxLjAsIGNjLnYyKHRoaXMubV9zcF9tb25zdGVyLm5vZGUucGFyZW50LngsIHRoaXMubV9zcF9tb25zdGVyLm5vZGUucGFyZW50LnkpKS5lYXNpbmcoY2MuZWFzZUluKDIuMCkpLCBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICBzZWxmLm1fYmxvY2tfcG9vbC5wdXQoYmxvY2tub2RlKTtcbiAgICAgICAgICAgIGJsb2Nrbm9kZSA9IG51bGw7XG4gICAgICAgICAgICBzZWxmLm1vbnN0ZXJiZUhpdChyZWFsaHVydCk7XG4gICAgICAgIH0pKSk7XG4gICAgfSxcblxuICAgIGRlc3Ryb3lCbG9ja0J5SGl0TW9uc3RlcigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgYXJyID0gW107XG4gICAgICAgIGxldCBsZW4gPSA0O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubV9tYXBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMubV9tYXBhcnJheVtpXS5pc0hhdmVGSykge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIGxlbi0tO1xuICAgICAgICAgICAgICAgIGlmIChsZW4gPD0gMCkgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBibG9ja25vZGUgPSB0aGlzLm1fbGlnaHRfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIGlmICghYmxvY2tub2RlKSB7XG4gICAgICAgICAgICAgICAgYmxvY2tub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5tX3ByZV9saWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcG9zID0gdGhpcy5tX21hcGFycmF5W2FycltpXV0ucG9zaXRpb247XG4gICAgICAgICAgICBibG9ja25vZGUucGFyZW50ID0gdGhpcy5tX25fZ2FtZW5vZGU7XG4gICAgICAgICAgICBibG9ja25vZGUucG9zaXRpb24gPSBjYy52Mih0aGlzLm1fc3BfbW9uc3Rlci5ub2RlLnBhcmVudC54LCB0aGlzLm1fc3BfbW9uc3Rlci5ub2RlLnBhcmVudC55KTtcbiAgICAgICAgICAgIGJsb2Nrbm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgICAgIFV0aWxzLlNldFNvdW5kRWZmZWN0KHdpbmRvdy5HRVRfR09MRCwgZmFsc2UsIDEpO1xuICAgICAgICAgICAgfSksIGNjLm1vdmVUbygwLjgsIHBvcykuZWFzaW5nKGNjLmVhc2VJbigyLjApKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYubV9saWdodF9wb29sLnB1dChibG9ja25vZGUpO1xuICAgICAgICAgICAgICAgIGJsb2Nrbm9kZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgc2VsZi5ibG9ja0JlSGl0KGFycltpXSk7XG4gICAgICAgICAgICB9KSkpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGJsb2NrQmVIaXQoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5tX21hcGFycmF5W2luZGV4XS5pc0hhdmVGSyA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tX25fa3VhaS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNoYXBlaXRlbSA9IHRoaXMubV9uX2t1YWlbaV0uZ2V0Q29tcG9uZW50KFwiU2hhcGVJdGVtXCIpO1xuICAgICAgICAgICAgaWYgKHNoYXBlaXRlbS5jaGVja0lzTG9zZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tX25fa3VhaVtpXS5vcGFjaXR5ID0gMTI1O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbl9rdWFpW2ldLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IEZLTm9kZSA9IHRoaXMubV9tYXBhcnJheVtpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJjb2xvclNwclwiKVxuICAgICAgICBpZiAoIUZLTm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIC8v6Ziy5q2i5rKh5pyJ6L+Z5Liq5pa55Z2X55qE5pe25YCZXG4gICAgICAgIH1cbiAgICAgICAgRktOb2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcbiAgICAgICAgICAgIGNjLnNwYXduKGNjLnNjYWxlVG8oMC41LCAyKSwgY2MuZmFkZU91dCgwLjUpKSxcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYodHJ1ZSlcbiAgICAgICAgKSk7XG4gICAgfSxcblxuICAgIG1vbnN0ZXJiZUhpdChodXJ0KSB7XG4gICAgICAgIFV0aWxzLlNldFNvdW5kRWZmZWN0KHdpbmRvdy5CRV9ISVQsIGZhbHNlLCAwLjMpO1xuICAgICAgICBVdGlscy5zaG93SHVydFRleHQoJy0nICsgaHVydCwgdGhpcy5tX3NwX21vbnN0ZXIubm9kZS5wYXJlbnQsIDAsIDEwMCwgMzAsIG5ldyBjYy5Db2xvcigyMzAsIDcxLCAyMSksIDAuOCk7XG4gICAgICAgIHRoaXMudXBkYXRlU2NvcmUoaHVydCk7XG4gICAgICAgIGxldCBocCA9IHRoaXMubV9zcF9tb25zdGVyLm5vZGUuZ2V0Q29tcG9uZW50KFwiTW9uc3Rlckl0ZW1cIikucmVkdWNlSHAoaHVydCk7XG4gICAgICAgIGlmIChocCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm1fbm9ybWFsX2N1cnRpbWUgPSAtMTtcbiAgICAgICAgICAgIHRoaXMuanVkZ2VHYW1lKHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tX25vcm1hbF9jdXJ0aW1lID0gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLm1fc29saWRlcm51bSA8PSAwICYmIHRoaXMubV9jdXJfYXR0YWNrX251bSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5qdWRnZUdhbWUoZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1fY3VyX2F0dGFja19udW0gPD0gMCAmJiBocCA8PSAyMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubV9zcF9tb25zdGVyLm5vZGUuZ2V0Q29tcG9uZW50KFwiTW9uc3Rlckl0ZW1cIikucGxheUFuZ3J5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubV9zcF9tb25zdGVyLm5vZGUuZ2V0Q29tcG9uZW50KFwiTW9uc3Rlckl0ZW1cIikucGxheUJlSGl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25PcGVuU2tpblBhbmVsKCkge1xuICAgICAgICB0aGlzLm1fbl9za2lucGFuZWwuYWN0aXZlID0gdHJ1ZTtcbiAgICB9LFxuXG5cblxuICAgIG9uQ2FuY2VsVmlkZW8oKSB7XG4gICAgICAgIHRoaXMubV9uX2xvb2t2aWRlby5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuX3JlbGl2ZW51bSA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm1fbl9yZWxpdmV2aWV3LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1fbl9yZWxpdmV2aWV3LnNjYWxlID0gMDtcbiAgICAgICAgICAgIHRoaXMubV9uX3JlbGl2ZXZpZXcucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4yLCAxLjIsIDEuMikuZWFzaW5nKGNjLmVhc2VJbigzLjApKSwgY2Muc2NhbGVUbygwLjEsIDEsIDEpKSk7XG4gICAgICAgICAgICBpZiAod2luZG93LlNLSU5fU0hBUkUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dBZEJhbm5lcihmYWxzZSk7XG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5maW5kKFwiYnRuX2Nsb3NlXCIsIHRoaXMubV9uX3JlbGl2ZXZpZXcpO1xuICAgICAgICAgICAgICAgIG5vZGUueSA9IC01ODU7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnkgPSAtNTE0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2hvd0FkYilcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FkQmFubmVyKHRydWUpO1xuICAgICAgICAgICAgICAgIH0sIDEuMylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93QWRCYW5uZXIodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1fbl9kaXNwbGF5Y2hlY2suYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm1fbl9kaXNwbGF5cmFuay5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLl9yZWxpdmVudW0rK1wiLCB0aGlzLl9yZWxpdmVudW0pO1xuICAgICAgICAgICAgdGhpcy5tX25fcmVzdWx0X3BhbmVsLmdldENvbXBvbmVudChcIkdhbWVSZXN1bHRcIikuc2hvd0ZhaWwodGhpcy5fcmVsaXZlbnVtLCB0aGlzLm1fY3VyX3Njb3JlLCB0aGlzLl9raWxsbnVtKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0FkQmFubmVyKHRydWUpO1xuICAgICAgICAgICAgUmFua0xpc3Quc2V0U2NvcmUod2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEudG9wX3Njb3JlKTtcbiAgICAgICAgICAgIFV0aWxzLlNldFNvdW5kRWZmZWN0KHdpbmRvdy5DSEFMTEVOR19GQUlMX01VU0lDLCBmYWxzZSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVsaXZlbnVtKys7XG4gICAgfSxcblxuICAgIG9uQWRCdG5DbGljayhldmVudCwgY3VzdG9tKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKCF3aW5kb3cuZmlyc3R2aWRlbyAmJiBjdXN0b20gPT0gMykge1xuICAgICAgICAgICAgICAgIC8vIHdpbmRvdy5DSEFOR0VfQkxPQ0sgPSAxO1xuICAgICAgICAgICAgICAgIC8vIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2hhbmdlJywgJzEnKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZmlyc3R2aWRlbyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb1Jld2FyZCgxKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgVmVyc2lvblRvYXN0ID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIuW+ruS/oeeJiOacrOi/h+S9ju+8jOaXoOazleeci+W5v+WRilwiLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gd3guaGlkZVRvYXN0KCksIDIwMDApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxldCBpbmZvID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbiAgICAgICAgICAgIGlmIChpbmZvLlNES1ZlcnNpb24gPj0gJzIuMC40Jykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FkKGN1c3RvbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFZlcnNpb25Ub2FzdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2l0IGlzIG5vdCB3ZWNoYXQnKTtcbiAgICAgICAgICAgIHRoaXMudmlkZW9SZXdhcmQoY3VzdG9tKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzaG93QWQoY3VzdG9tKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLm1fdmlkZW9BZCkge1xuICAgICAgICAgICAgdGhpcy5tX3ZpZGVvQWQgPSB3eC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xuICAgICAgICAgICAgICAgIGFkVW5pdElkOiAnYWR1bml0LWU1NzNlNDY2YmU5NGQ3ZjUnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1fdmlkZW9BZC5vbkVycm9yKGVyciA9PiB7XG4gICAgICAgICAgICAvLyBVdGlscy5zaG93VGlwc1RleHQoXCJlcnJvcjpcIiArIGVyci5lcnJNc2cpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1fdmlkZW9BZC5sb2FkKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLm1fdmlkZW9BZC5zaG93KCk7XG4gICAgICAgICAgICAgICAgc2VsZi5zaG93QWRiID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzZWxmLm1fdmlkZW9BZC5vbkNsb3NlKChzdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5tX3ZpZGVvQWQub2ZmQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93QWRiID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd0FkQmFubmVyKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1cyAmJiBzdGF0dXMuaXNFbmRlZCB8fCBzdGF0dXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi52aWRlb1Jld2FyZChjdXN0b20pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IFV0aWxzLnNob3dUaXBzVGV4dChcIuaLieWOu+inhumikeW5v+WRiuWksei0pe+8jOivt+eojeWAmemHjeivlVwiLCBudWxsLCBudWxsLCBudWxsLCA2MCwgY2MuQ29sb3IuQkxBQ0ssIDEuMikpO1xuICAgIH0sXG5cbiAgICB2aWRlb1Jld2FyZChjdXN0b20pIHtcbiAgICAgICAgaWYgKGN1c3RvbSA9PSAxIHx8IGN1c3RvbSA9PSAzKSB7XG4gICAgICAgICAgICBsZXQgbGlzdCA9IHRoaXMuZ2V0Q2FuRHJvcEJsb2NrcygpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2xpc3Q9JyxsaXN0KTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tX25fa3VhaS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBzaGFwZWl0ZW0gPSB0aGlzLm1fbl9rdWFpW2ldLmdldENvbXBvbmVudChcIlNoYXBlSXRlbVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbl9rdWFpW2ldLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgICAgICAgICAgc2hhcGVpdGVtLnJlc2V0QmxvY2sobGlzdFtpXSB8fCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubV9pbl9qdWRnZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5tX25fbG9va3ZpZGVvLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKGN1c3RvbSA9PSAyKSB7XG4gICAgICAgICAgICB0aGlzLm1fZG91Ymxlc2NvcmUgPSAyO1xuICAgICAgICAgICAgdGhpcy5tX25fZG91Ymxlc2NvcmUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIFV0aWxzLnNob3dUaXBzVGV4dChcIuW+l+WIhuWPjOWAjVwiLCBudWxsLCAwLCAwLCA2MCk7XG4gICAgICAgICAgICB0aGlzLm1fbl9sdWNreXZpZGVvLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGp1ZGdlR2FtZShib28pIHtcbiAgICAgICAgaWYgKHRoaXMubV9pbl9qdWRnZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLm1faW5fanVkZ2UgPSB0cnVlO1xuXG4gICAgICAgIGlmIChib28pIHsgLy/og5zliKlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfog5zliKknKTtcbiAgICAgICAgICAgIHRoaXMuX2tpbGxudW0rKztcbiAgICAgICAgICAgIGxldCB0aW1lID0gdGhpcy5tX3NwX21vbnN0ZXIubm9kZS5nZXRDb21wb25lbnQoXCJNb25zdGVySXRlbVwiKS5wbGF5RGVhZCgpO1xuICAgICAgICAgICAgVXRpbHMuU2V0U291bmRFZmZlY3Qod2luZG93LkNIQUxMRU5HX1ZJQ1RPUllfTVVTSUMsIGZhbHNlLCAxKTtcbiAgICAgICAgICAgIGxldCBnb2xkID0gMztcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLm1fc3BfbW9uc3Rlci5ub2RlLnBhcmVudC5wb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLm1fY3VyX2xldmVsICUgNSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Qm94KGNjLnYyKHBvcy54LCBwb3MueSAtIDEwMCksIGNjLlZlYzIuWkVSTywgdGhpcy5tX2N1cl9sZXZlbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkR29sZChnb2xkLCBjYy52Mihwb3MueCwgcG9zLnkgLSAxMCksIHRoaXMubV9sX2dvbGQubm9kZS5wb3NpdGlvbilcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEudG9wX2xldmVsICs9IDE7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi5vbk5leHRMZXZlbCgpO1xuICAgICAgICAgICAgfSwgdGltZSAvIDEwMDApXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lCbG9ja0J5SGl0TW9uc3RlcigpO1xuICAgICAgICAgICAgUmFua0xpc3Quc2V0U2NvcmUod2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEudG9wX3Njb3JlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb251bSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+Wksei0pScpO1xuICAgICAgICAgICAgICAgIHRoaXMubV9zcF9tb25zdGVyLm5vZGUuZ2V0Q29tcG9uZW50KFwiTW9uc3Rlckl0ZW1cIikucGxheU1vbnN0ZXJWaWN0b3J5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tX25fbG9va3ZpZGVvLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5tX25fbG9va3ZpZGVvLnNjYWxlID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbl9sb29rdmlkZW8ucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4yLCAxLjIsIDEuMikuZWFzaW5nKGNjLmVhc2VJbigzLjApKSwgY2Muc2NhbGVUbygwLjEsIDEsIDEpKSk7XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5maXJzdHZpZGVvKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9sX2Fza3R5cGUuc3RyaW5nID0gXCLnnIvop4bpopHmjaLkuIDmiblcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fbF9hc2t0eXBlLnN0cmluZyA9IFwi5YWN6LS55o2i5LiA5om5XCI7XG4gICAgICAgICAgICAgICAgICAgIC8vIHdpbmRvdy5maXJzdHZpZGVvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9udW0rKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNhbmNlbFZpZGVvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOWuneeuseWlluWKseiOt+WPluWkhOeQhlxuICAgICAqIEBhdXRob3Ig5ZC05bu65aWLXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHR5cGVcbiAgICAgKi9cbiAgICBCb3hSZXdhcmQodHlwZSkge1xuICAgICAgICBpZiAodHlwZSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRvb2xzTnVtKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUdvbGQoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvblZpZGVvQ2xvc2UoKSB7XG4gICAgICAgIHRoaXMubV9uX3JlbGl2ZXZpZXcuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubV9uX2Rpc3BsYXljaGVjay5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tX25fZGlzcGxheXJhbmsuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5tX25fcmVzdWx0X3BhbmVsLmdldENvbXBvbmVudChcIkdhbWVSZXN1bHRcIikuc2hvd0ZhaWwodGhpcy5fcmVsaXZlbnVtLCB0aGlzLm1fY3VyX3Njb3JlLCB0aGlzLl9raWxsbnVtKTtcbiAgICAgICAgdGhpcy5zaG93QWRCYW5uZXIodHJ1ZSk7XG4gICAgICAgIFJhbmtMaXN0LnNldFNjb3JlKHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLnRvcF9zY29yZSk7XG4gICAgICAgIFV0aWxzLlNldFNvdW5kRWZmZWN0KHdpbmRvdy5DSEFMTEVOR19GQUlMX01VU0lDLCBmYWxzZSwgMSk7XG4gICAgfSxcblxuICAgIG9uUmVsaXZlQnRuQ2xpY2soKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgbGV0IFZlcnNpb25Ub2FzdCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLlvq7kv6HniYjmnKzov4fkvY7vvIzml6Dms5XnnIvlub/lkYpcIixcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHd4LmhpZGVUb2FzdCgpLCAyMDAwKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZXQgaW5mbyA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XG4gICAgICAgICAgICBpZiAoaW5mby5TREtWZXJzaW9uID49ICcyLjAuNCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSZWxpdmVBZCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBWZXJzaW9uVG9hc3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpdCBpcyBub3Qgd2VjaGF0Jyk7XG4gICAgICAgICAgICB0aGlzLm9uUmVsaXZlR2FtZVZpZGVvKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvd1JlbGl2ZUFkKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5tX3ZpZGVvQWQyKSB7XG4gICAgICAgICAgICB0aGlzLm1fdmlkZW9BZDIgPSB3eC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xuICAgICAgICAgICAgICAgIGFkVW5pdElkOiAnYWR1bml0LTUxODdmZmMzYWI1NzEzMTgnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1fdmlkZW9BZDIub25FcnJvcihlcnIgPT4ge1xuICAgICAgICAgICAgLy8gVXRpbHMuc2hvd1RpcHNUZXh0KFwiZXJyb3I6XCIgKyBlcnIuZXJyTXNnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tX3ZpZGVvQWQyLmxvYWQoKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYubV92aWRlb0FkMi5zaG93KCk7XG4gICAgICAgICAgICAgICAgc2VsZi5zaG93QWRCYW5uZXIoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNlbGYubV92aWRlb0FkMi5vbkNsb3NlKChzdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5tX3ZpZGVvQWQyLm9mZkNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgJiYgc3RhdHVzLmlzRW5kZWQgfHwgc3RhdHVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYub25SZWxpdmVHYW1lVmlkZW8oKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBVdGlscy5zaG93VGlwc1RleHQoXCLop4bpopHmi4nlj5blpLHotKXvvIzor7fnqI3lkI7ph43or5VcIiwgbnVsbCwgbnVsbCwgbnVsbCwgNjAsIGNjLkNvbG9yLkJMQUNLLCAxLjIpKTtcbiAgICB9LFxuXG4gICAgb25OZXh0TGV2ZWwoKSB7XG4gICAgICAgIHRoaXMubV9uX3Jlc3VsdF9wYW5lbC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93QWRCYW5uZXIoZmFsc2UpO1xuICAgICAgICB0aGlzLm1fY3VyX2xldmVsID0gd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEudG9wX2xldmVsICsgMTtcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLm1fY3VyXCIsIHRoaXMubV9jdXJfbGV2ZWwpO1xuICAgICAgICB0aGlzLm1faW5fanVkZ2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tX2xfbGV2ZWwuc3RyaW5nID0gXCJMVi5cIiArIHRoaXMubV9jdXJfbGV2ZWw7XG4gICAgICAgIHRoaXMuaW5pdE1vbnN0ZXIodGhpcy5tX2N1cl9sZXZlbCk7XG4gICAgICAgIHRoaXMuY2hlY2tJc0xvc2UoKTtcbiAgICB9LFxuXG4gICAgb25CYWNrVG9NZW51KCkge1xuICAgICAgICBVdGlscy5TZXRTb3VuZEVmZmVjdCh3aW5kb3cuQlVUVE9OX0NMSUNLX01VU0lDLCBmYWxzZSwgMSk7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSh3aW5kb3cuTUVOVV9TQ0VORV9OQU1FKTtcbiAgICB9LFxuXG4gICAgb25Cb29tQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgLy8gdGhpcy5qdWRnZUdhbWUoZmFsc2UpO1xuICAgICAgICBVdGlscy5TZXRTb3VuZEVmZmVjdCh3aW5kb3cuQlVUVE9OX0NMSUNLX01VU0lDLCBmYWxzZSwgMSk7XG4gICAgICAgIGlmICh0aGlzLm1fZ2FtZXN0YXRlID09IDAgJiYgIXRoaXMuX2lzZGVsZXRpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1fYm9vbW51bSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tX25fdG9vbHVzZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubV9uX3Rvb2x1c2UuZ2V0Q29tcG9uZW50KFwiVXNlVG9vbEl0ZW1cIikuaW5pdFRvb2xJbmZvKDAsIHRoaXMubV9ib29tbnVtLCB0aGlzLm1fc3ByaXRlQXRsYXMuZ2V0U3ByaXRlRnJhbWUod2luZG93LlRPT0xfQ09ORklHWzBdLm5hbWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tX25fZ3VpZGVtYXNrLmFjdGl2ZSA9ICF0aGlzLm1fbWFwYmxpbms7XG4gICAgICAgICAgICAgICAgdGhpcy5tX3RvdWNoX2Jvb20gPSAhdGhpcy5tX21hcGJsaW5rO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TWFwQmxpbmsoIXRoaXMubV9tYXBibGluayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25TdHJvbmdDbGljayhldmVudCkge1xuICAgICAgICBVdGlscy5TZXRTb3VuZEVmZmVjdCh3aW5kb3cuQlVUVE9OX0NMSUNLX01VU0lDLCBmYWxzZSwgMSk7XG4gICAgICAgIGlmICh0aGlzLm1fZ2FtZXN0YXRlID09IDApIHtcbiAgICAgICAgICAgIHRoaXMubV9uX3Rvb2x1c2UuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubV9uX3Rvb2x1c2UuZ2V0Q29tcG9uZW50KFwiVXNlVG9vbEl0ZW1cIikuaW5pdFRvb2xJbmZvKDEsIHRoaXMubV9zdHJvbmdudW0sIHRoaXMubV9zcHJpdGVBdGxhcy5nZXRTcHJpdGVGcmFtZSh3aW5kb3cuVE9PTF9DT05GSUdbMV0ubmFtZSkpO1xuICAgICAgICAgICAgdGhpcy5ndWlkZU1hc2tDbGljaygpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uVXNlU3Ryb25nKCkge1xuICAgICAgICBsZXQgdCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubV9yb3c7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLm1fY29sOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tX2dyaWRfYXJyYXlbaV1bal0udHlwZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhID0gdGhpcy5tX2dyaWRfYXJyYXlbaV1bal0ub2JqLmdldENvbXBvbmVudChcIkJsb2NrSXRlbVwiKS5hZGRTdHJvbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0KSB7XG4gICAgICAgICAgICB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS50b29sWzFdIC09IDE7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRvb2xzTnVtKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy/orr7nva7og4zmma/pl6rng4FcbiAgICBzZXRNYXBCbGluayhib28pIHtcbiAgICAgICAgaWYgKGJvbyA9PT0gdGhpcy5tX21hcGJsaW5rKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1fbWFwYmxpbmsgPSBib287XG4gICAgICAgIGlmIChib28pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tX21hcGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1fbWFwYXJyYXlbaV0uaXNIYXZlRkspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFjdGlvbiA9IGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjgsIDAuOCwgMC44KSwgY2Muc2NhbGVUbygwLjgsIDEsIDEpKSk7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5zZXRUYWcoMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9tYXBhcnJheVtpXS5ydW5BY3Rpb24oYWN0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubV9tYXBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tX21hcGFycmF5W2ldLmlzSGF2ZUZLKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9tYXBhcnJheVtpXS5zdG9wQWN0aW9uQnlUYWcoMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9tYXBhcnJheVtpXS5zY2FsZSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldFRhcmdldEdyaWRJbmZvKHRhcmdldCkge1xuICAgICAgICBsZXQgaSA9IE1hdGguZmxvb3IodGFyZ2V0IC8gdGhpcy5tX3Jvdyk7XG4gICAgICAgIGxldCBqID0gdGFyZ2V0ICUgdGhpcy5tX2NvbDtcbiAgICAgICAgcmV0dXJuIHRoaXMubV9tYXBhcnJheVtpXVtqXTtcbiAgICB9LFxuXG4gICAgb25SZWxpdmVHYW1lVmlkZW8oKSB7XG4gICAgICAgIFV0aWxzLnNob3dUaXBzVGV4dChcIuWkjea0u+aIkOWKn1wiKTtcbiAgICAgICAgdGhpcy5tX2luX2p1ZGdlID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tX25fa3VhaS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5tX25fa3VhaVtpXS5nZXRDb21wb25lbnQoXCJTaGFwZUl0ZW1cIikucmVzZXRCbG9jaygpO1xuICAgICAgICAgICAgdGhpcy5tX25fa3VhaVtpXS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubV9zcF9tb25zdGVyLm5vZGUuZ2V0Q29tcG9uZW50KFwiTW9uc3Rlckl0ZW1cIikucGxheUFuZ3J5KCk7XG4gICAgICAgIHRoaXMubV9uX3Jlc3VsdF9wYW5lbC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tX25fcmVsaXZldmlldy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tX21hcGFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LmdldENoaWxkQnlOYW1lKFwiY29sb3JTcHJcIilcbiAgICAgICAgfSk7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLm1fbWFwYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBsZXQgRktOb2RlID0gdGhpcy5tX21hcGFycmF5W2luZGV4XS5nZXRDaGlsZEJ5TmFtZShcImNvbG9yU3ByXCIpXG4gICAgICAgICAgICAvL+i/meS4quWBh+aWueWdl+WPmOWkp+W5tuS4lOa4kOmakOaOiVxuICAgICAgICAgICAgaWYgKEZLTm9kZSkge1xuICAgICAgICAgICAgICAgIEZLTm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICAgICAgICAgIGNjLnNwYXduKGNjLnNjYWxlVG8oMC41LCAyKSwgY2MuZmFkZU91dCgwLjUpKSxcbiAgICAgICAgICAgICAgICAgICAgY2MucmVtb3ZlU2VsZih0cnVlKVxuICAgICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tX21hcGFycmF5W2luZGV4XS5pc0hhdmVGSyA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBSYW5rTGlzdC5jaGVja1dpbGxTdXJwYXNzKHRoaXMubV9jdXJfc2NvcmUpO1xuICAgICAgICB0aGlzLm1fbl9kaXNwbGF5Y2hlY2suYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5tX25fZGlzcGxheXJhbmsuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubV9nYW1lc3RhdGUgPSAwO1xuICAgIH0sXG5cbiAgICBvblJlbGl2ZUdhbWUoKSB7XG4gICAgICAgIFV0aWxzLlNldFNvdW5kRWZmZWN0KHdpbmRvdy5CVVRUT05fQ0xJQ0tfTVVTSUMsIGZhbHNlLCAxKTtcbiAgICAgICAgaWYgKHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLmdvbGRfbnVtID49IDIwKSB7XG4gICAgICAgICAgICBVdGlscy5zaG93VGlwc1RleHQoXCLlpI3mtLvmiJDlip9cIik7XG4gICAgICAgICAgICB0aGlzLm1faW5fanVkZ2UgPSBmYWxzZTtcbiAgICAgICAgICAgIHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLmdvbGRfbnVtIC09IDIwO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVHb2xkKCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubV9uX2t1YWkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbl9rdWFpW2ldLmdldENvbXBvbmVudChcIlNoYXBlSXRlbVwiKS5yZXNldEJsb2NrKDApO1xuICAgICAgICAgICAgICAgIHRoaXMubV9uX2t1YWlbaV0ub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubV9zcF9tb25zdGVyLm5vZGUuZ2V0Q29tcG9uZW50KFwiTW9uc3Rlckl0ZW1cIikucGxheUFuZ3J5KCk7XG4gICAgICAgICAgICB0aGlzLm1fbl9yZXN1bHRfcGFuZWwuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBSYW5rTGlzdC5jaGVja1dpbGxTdXJwYXNzKHRoaXMubV9jdXJfc2NvcmUpO1xuICAgICAgICAgICAgdGhpcy5tX25fZGlzcGxheWNoZWNrLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1fbl9kaXNwbGF5cmFuay5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubV9nYW1lc3RhdGUgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVXRpbHMuc2hvd1RpcHNUZXh0KFwi6YeR5biB5LiN6LazXCIpXG4gICAgICAgICAgICBTaGFyZVNkay5zaGFyZUFwcE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuadpeW4ruW4ruaIke+8jOaIkeiiq+aAquWFvea2iOeBreS6hlwiLFxuICAgICAgICAgICAgICAgIGltYWdlVXJsOiB3aW5kb3cudGVtcEZpbGVVUkxbMV0sXG4gICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29tcGxhdGU6IG1zZyA9PiB7XG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvd0FkQmFubmVyKGJvbykge1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgPT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICAgICAgbGV0IFNpemUgPSBjYy53aW5TaXplXG5cbiAgICAgICAgbGV0IFdpZHRobm9kZSA9IGNjLmZpbmQoXCJDYW52YXMvbl9mdW5ueW1hcC9uX2Jhbm5lcnBvc1wiKTtcbiAgICAgICAgdmFyIHBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlKFdpZHRobm9kZSk7XG5cbiAgICAgICAgaWYgKFNpemUuaGVpZ2h0IC8gU2l6ZS53aWR0aCA+IDIpIHsvL+mAgumFjeWFqOmdouWxjyDpgILnlKjkuo5GSVhIZWlnaHRcbiAgICAgICAgICAgIHBvcy55ICs9IChTaXplLmhlaWdodCAtIDE5MjApIC8gMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzeXN0ZW0gPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpO1xuXG4gICAgICAgIGxldCBhZGFwdFNjYWxlSCA9IHN5c3RlbS5zY3JlZW5IZWlnaHQgLyBTaXplLmhlaWdodDtcbiAgICAgICAgdmFyIFBvc1kgPSAoKFNpemUuaGVpZ2h0IC0gcG9zLnkpICogYWRhcHRTY2FsZUgpO1xuXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMubV9iYW5uZXJhZCkge1xuICAgICAgICAgICAgdGhpcy5tX2Jhbm5lcmFkLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMubV9iYW5uZXJhZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLm1fYmFubmVyYWQgJiYgYm9vKSB7XG4gICAgICAgICAgICBpZiAoc3lzdGVtLlNES1ZlcnNpb24gPCAnMi4wLjQnKSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi5b6u5L+h54mI5pys6L+H5L2O77yM5peg5rOV5Yib5bu65bm/5ZGKYmFubmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDAsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB3eC5oaWRlVG9hc3QoKSwgMzAwMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYubV9iYW5uZXJhZCA9IHd4LmNyZWF0ZUJhbm5lckFkKHtcbiAgICAgICAgICAgICAgICAgICAgYWRVbml0SWQ6ICdhZHVuaXQtOWRkMDU3YjZiNTE0MjQ1YScsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBQb3NZLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHN5c3RlbS5zY3JlZW5XaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgc2VsZi5tX2Jhbm5lcmFkLm9uUmVzaXplKChyZXMxKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5tX2Jhbm5lcmFkICYmIHNlbGYubV9iYW5uZXJhZC5zdHlsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5tX2Jhbm5lcmFkLnN0eWxlLnRvcCA9IFBvc1k7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5tX2Jhbm5lcmFkLnN0eWxlLmhlaWdodCA9IHJlczEuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJvblJlc2l6ZS1lcnJvclwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzZWxmLm1fYmFubmVyYWQub25Mb2FkKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2Jhbm5lciDlub/lkYrliqDovb3miJDlip8nKVxuXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBzZWxmLm1fYmFubmVyYWQuc2hvdygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuW5v+WRiuaYvuekuuaIkOWKn1wiKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCLlub/lkYrliqDovb3lpLHotKVcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHNlbGYubV9iYW5uZXJhZC5vbkVycm9yKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbk9wZW5Bc2tQYW5lbCgpIHtcbiAgICAgICAgdGhpcy5tX25fYXNrcGFuZWwuYWN0aXZlID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgb25DbG9zZUFza1BhbmVsKCkge1xuICAgICAgICB0aGlzLm1fbl9hc2twYW5lbC5hY3RpdmUgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLm1fbm9ybWFsX2N1cnRpbWUgIT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMubV9ub3JtYWxfY3VydGltZSArPSBkdDtcbiAgICAgICAgICAgIGlmICh0aGlzLm1fbm9ybWFsX2N1cnRpbWUgPj0gdGhpcy5tX25vcm1hbF90YWxrdGltZSAmJiB0aGlzLm1fZ2FtZXN0YXRlID09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbm9ybWFsX2N1cnRpbWUgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMubV9zcF9tb25zdGVyLm5vZGUuZ2V0Q29tcG9uZW50KFwiTW9uc3Rlckl0ZW1cIikucGxheU5vcm1hbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbn0pOyJdfQ==
//------QC-SOURCE-SPLIT------
