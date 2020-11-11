
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