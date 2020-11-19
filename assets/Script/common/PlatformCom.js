
// var Utils = require("Utils");
// var ShareSdk = require("ShareSdk");
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
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

    onLoad() {
        this.node.zindex = 100;    //设置z轴的位置
        var size = cc.view.getVisibleSize()
        // this.m_maskbg.width = size.width;
        // this.m_maskbg.height = size.height;
        this.m_callbackobj = null;
    },

    start() {

    },

    onImageBtnClick() {
        // this.m_rqcode.active = !this.m_rqcode.active;
    },

    onSaveImageBtnClick() {
    },

    onCloseBtnClick() {
        this.m_rqcode.active = false;
    },

    hideTipsView: function () {
        this.m_tips.getChildByName("TipsTex").getComponent(cc.Label).string = '';
        this.m_tips.active = false;
    },

    showTipsView: function (text) {
        this.m_tips.getChildByName("TipsTex").getComponent(cc.Label).string = text;
        this.m_tips.active = true;
    },

    // update (dt) {},
});
