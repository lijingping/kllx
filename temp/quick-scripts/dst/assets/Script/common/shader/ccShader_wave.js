
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