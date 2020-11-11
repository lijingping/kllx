
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