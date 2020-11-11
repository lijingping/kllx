
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