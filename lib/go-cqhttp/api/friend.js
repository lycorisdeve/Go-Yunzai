
import axios from 'axios'
import cfg from '../../config/config.js'
class friendProcess {
    bot = cfg.bot
    constructor(e) {
        this.e = e
    }
    /**
     * 
     * @param {int} user_id 
     * @param {boolean} no_cache 
     * @returns 
     * 参数
     * 字段名	数据类型	默认值	说明
     * user_id	int64	-	QQ 号
     * no_cache	boolean	false	是否不使用缓存（使用缓存可能更新不及时, 但响应更快）
     * 响应数据
     * 
     * 字段名	数据类型	说明
     * user_id	int64	QQ 号
     * nickname	string	昵称
     * sex	string	性别, male 或 female 或 unknown
     * age	int32	年龄
     * qid	string	qid ID身份卡
     * level	int32	等级
     * login_days	int32	等级
     */
    async get_stranger_info(user_id,no_cache) {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/get_stranger_info",
            data: {
                user_id,
                no_cache
            }
        })
        return data

    }
    /**
     * 获取好友列表
     * @returns 响应内容为 json 数组, 每个元素如下：
                    字段名	数据类型	说明
                    user_id	int64	QQ 号
                    nickname	string	昵称
                    remark	string	备注名
     */
    async get_friend_list() {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/get_friend_list"
           
        })
        return data

    }
    /**
     * 获取单向好友列表
     * @returns 同上
     */
    async get_unidirectional_friend_list() {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/get_unidirectional_friend_list"
           
        })
        return data

    }

    /* -----------------好友操作--------------------- */
     /**
     * 删除好友
     * @param {int} user_id  QQ
     */
     async delete_friend(user_id) {
        await axios({
            method: "post",
            url: this.bot.http + "/delete_friend",
            data: {
                user_id
            }
        })


    }
    async delete_unidirectional_friend(user_id) {
        await axios({
            method: "post",
            url: this.bot.http + "/delete_unidirectional_friend",
            data: {
                user_id
            }
        })
    }


}

export default new friendProcess()