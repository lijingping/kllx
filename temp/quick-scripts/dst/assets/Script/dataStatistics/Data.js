
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