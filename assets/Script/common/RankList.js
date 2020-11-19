

module.exports = {


    /**
     * 
     * @param {int} _score 设置游戏分数
     * @param {*} success  成功回调
     * @param {*} fail     失败回调
     * @param {*} complete 完成回调
     */
    setScore(_score, success, fail, complete) {
    },

    /**
     * 显示好友排行榜
     */
    showFriendList() {
    },

    /**
     * 显示群排行
     * @param {string} shareTicket 群排行分享许可证
     */
    showGroupList(shareTicket) {
    },

    /**
     * 游戏结束排行
     */
    showGameResultList() {
    },

    /**
     * 检查是否超越好友 并显示
     * @param {int} score 当前分数
     * @param {Number} x  显示位置pos.x
     * @param {Number} y  显示位置pos.y
     */
    checkSurpassFriend(score, x, y) {
    },


    checkWillSurpass(score, y) {
    }
}