var Utils = require("Utils");
var ShareSdk = require("ShareSdk");
var RankList = require("RankList");
cc.Class({
    extends: cc.Component,

    properties: {
        m_sp_logo: cc.Node,
        m_l_maingold: cc.Label,
        m_sp_off: cc.Node,
        m_spa_list: cc.SpriteAtlas,
        m_sp_mystepicon: cc.Sprite,
        m_l_mystepname: cc.Label,
        m_n_starlist: { type: cc.Node, default: [] },
        m_n_skinpanel: cc.Node,
        m_n_moregame: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        window.GAME_MENU = this;
        Utils.setDesignResolution();
    },

    start() {
        // this.m_sp_logo.runAction(cc.repeatForever(cc.sequence(cc.moveBy(1, 0, 15), cc.moveBy(1, 0, -15))));
        EVENT_LISTENER.on(window.GAME_UPDATE_DATA, this.updateGold, this);
        this.m_l_maingold.string = window.INIT_GAME_SAVE_DATA.gold_num;
        this.showGameClubButton();

        this.updateMusicBtnSprite(window.MUSIC_SHOW_OFF);
        RankList.setScore(window.INIT_GAME_SAVE_DATA.top_score);

        this.showAdBanner(true);
        if (!window.SHOWNEWYEAR && window.NEWYEAR) {
            Utils.loadRes("prefabs/happynewyear", cc.Prefab, (obj) => {
                let node = cc.instantiate(obj);
                node.zIndex = 1 << 10;
                node.parent = this.node;
                window.SHOWNEWYEAR = true;
            })
        } else {
            Utils.playBgmMusic(window.BGM, 0.5);
        }
        this.initMyData();
        this.m_n_moregame.active = window.MOVEGAME;
        
        setInterval(()=>{
            if (window.getdata) {
                window.Utils.setSaveData();
            }
        }, 6000);
    },

    playmuisc() {
        Utils.playBgmMusic(window.BGM, 0.5);
    },

    initMyData() {
        let curlv = window.INIT_GAME_SAVE_DATA.top_level;
        let data = this.getMyStepData(curlv);
        if (data) {
            this.m_sp_mystepicon.spriteFrame = this.m_spa_list.getSpriteFrame(data.icon_path);
            this.m_l_mystepname.string = data.desc;
            for (let i = 0; i < this.m_n_starlist.length; i++) {
                this.m_n_starlist[i].active = i < data.star;
            }
        } else {
            this.m_sp_mystepicon.spriteFrame = this.m_spa_list.getSpriteFrame("stepicon6");
            this.m_l_mystepname.string = window.STEP_CONFIG[0].desc;
            for (let i = 0; i < this.m_n_starlist.length; i++) {
                this.m_n_starlist[i].active = i < 3;
            }
        }

        this.m_n_skinpanel.getComponent("SkinPanel").initData();
    },

    getMyStepData(lv) {
        let index = Math.floor(lv / 10);
        if (index <= 0) {
            return null;
        } else {
            if (index > window.STEP_CONFIG.length)
                index = window.STEP_CONFIG.length;
            return window.STEP_CONFIG[index - 1];
        }
    },

    updateGold() {
        this.m_l_maingold.string = window.INIT_GAME_SAVE_DATA.gold_num;
    },

    onStartGame() {
        Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        cc.director.loadScene(window.GAME_SCENE_NAME);
    },

    onCloseShare() {
        cc.director.loadScene(window.GAME_SCENE_NAME);
    },

    onShareStart() {
        let self = this;
        Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        ShareSdk.shareAppMessage({
            title: "来助力我一起打怪兽吧",
            imageUrl: window.tempFileURL[1],
            success: res => {
                cc.director.loadScene(window.GAME_SCENE_NAME);
            },
            fail: err => {

            },
            complate: msg => {

            },
        });
    },

    onOpenSkinPanel() {
        this.m_n_skinpanel.active = true;
    },

    onOpenStepRank() {
        Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        cc.director.loadScene(window.STEP_SCENE_NAME, () => {
        })
    },

    onMusicBtnClick() {
        if (window.MUSIC_SHOW_OFF == 1) {
            window.MUSIC_SHOW_OFF = 0;
            Utils.stopBgmMusic();
            cc.sys.localStorage.setItem('music', '0');
        }
        else {
            window.MUSIC_SHOW_OFF = 1;
            Utils.playBgmMusic(window.BGM, 0.5);
            cc.sys.localStorage.setItem('music', '1');
        }
        this.updateMusicBtnSprite(window.MUSIC_SHOW_OFF);
    },


    updateMusicBtnSprite(show_off) {
        if (show_off == 1) {
            this.m_sp_off.active = false;
        } else {
            this.m_sp_off.active = true;
        }
    },

    onShare() {
        Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        // console.log(cc.url.raw("resources/common/sharepic.85663.png"));
        ShareSdk.shareAppMessage({
            title: "今年最好玩最刺激的六边形快乐连消游戏，快来尝试下",
            imageUrl: window.tempFileURL[1],
            success: res => {
                console.log("res", res)
            },
            fail: err => {
                console.log("res-err")
            },
            complate: msg => {
                console.log("complate")
            },
        });
    },

    onMoreGame() {
        wxShortCut.showModal("提示", "暂未开放");
    },

    showGameClubButton() {
    },
    hideGameClubButton() {
        if (this.clubbutton) {
            this.clubbutton.hide();
        }
    },

    onDestroy() {
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

    showAdBanner(boo) {
    },
    openPrivateUrl(even, custom){
        cc.sys.openURL(custom);
    }
});
