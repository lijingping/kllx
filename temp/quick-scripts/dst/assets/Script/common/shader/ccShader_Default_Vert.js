
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