
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