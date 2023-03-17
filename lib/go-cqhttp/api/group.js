/*
 * @description: 
 * @author: 名字
 * @date: Do not edit
 */
/*
 * @description: 
 * @author: 名字
 * @date: Do not edit
 */
import axios from 'axios'
import cfg from '../../config/config.js'
class groupProcess {
    bot = cfg.bot
    constructor(e) {
        this.e = e
    }

    async get_group_info(group_id, no_cache) {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/get_group_info",
            data: {
                group_id,
                no_cache
            }
        })
        return data

    }
    async get_group_list(no_cache) {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/get_group_list",
            params: {
                no_cache
            }

        })
        return data

    }
    async get_group_member_info(group_id, user_id, no_cache=false) {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/get_group_member_info",
            params: {
                group_id,
                user_id,
                no_cache
            }

        })
        return data

    }
    async get_group_member_list(group_id, no_cache) {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/get_group_member_list",
            params: {
                group_id,
                no_cache
            }

        })
        return data

    }
    /**
     * 
     * @param {int} group_id 
     * @param {string} type 
     * @returns 
     * 参数

字段名	数据类型	默认值	说明
group_id	int64	-	群号
type	string	-	要获取的群荣誉类型, 可传入 talkative performer legend strong_newbie emotion 以分别获取单个类型的群荣誉数据, 或传入 all 获取所有数据
响应数据

字段名	数据类型	说明
group_id	int64	群号
current_talkative	object	当前龙王, 仅 type 为 talkative 或 all 时有数据
talkative_list	array	历史龙王, 仅 type 为 talkative 或 all 时有数据
performer_list	array	群聊之火, 仅 type 为 performer 或 all 时有数据
legend_list	array	群聊炽焰, 仅 type 为 legend 或 all 时有数据
strong_newbie_list	array	冒尖小春笋, 仅 type 为 strong_newbie 或 all 时有数据
emotion_list	array	快乐之源, 仅 type 为 emotion 或 all 时有数据
其中 current_talkative 字段的内容如下：

字段名	数据类型	说明
user_id	int64	QQ 号
nickname	string	昵称
avatar	string	头像 URL
day_count	int32	持续天数
其它各 *_list 的每个元素是一个 json 对象, 内容如下：

字段名	数据类型	说明
user_id	int64	QQ 号
nickname	string	昵称
avatar	string	头像 URL
description	string	荣誉描述
     */
    async get_group_honor_info(group_id, type) {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/get_group_honor_info",
            params: {
                group_id,
                type
            }

        })
        return data

    }
    async get_group_system_msg() {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/get_group_system_msg",
        })
        return data

    }
    async get_essence_msg_list(group_id) {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/get_group_system_msg",
            params: {
                group_id
            }
        })
        return data

    }
    async get_group_at_all_remain(group_id) {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/get_group_at_all_remain",
            params: {
                group_id
            }
        })
        return data

    }

    //----------------群设置------------------
    /**
     * 
     * @param {int} group_id 
     * @param {int} group_name 新群名
     * @returns 
     */
    async set_group_name(group_id, group_name) {
        await axios({
            method: "post",
            url: this.bot.http + "/set_group_name",
            params: {
                group_id,
                group_name
            }
        })

    }

    async set_group_portrait(group_id, file, cache) {
        await axios({
            method: "post",
            url: this.bot.http + "/set_group_portrait",
            params: {
                group_id,
                file,//图片文件名
                cache
            }
        })

    }
    async set_group_admin(group_id, user_id, enable) {
        await axios({
            method: "post",
            url: this.bot.http + "/set_group_admin",
            params: {
                group_id,
                user_id,
                enable  //true 为设置, false 为取消
            }
        })

    }
    async set_group_card(group_id, user_id, card) {
        await axios({
            method: "post",
            url: this.bot.http + "/set_group_card",
            params: {
                group_id,
                user_id,
                card  //群名片内容, 不填或空字符串表示删除群名片
            }
        })

    }
    async set_group_special_title(group_id, user_id, special_title, duration) {
        await axios({
            method: "post",
            url: this.bot.http + "/set_group_special_title",
            params: {
                group_id,
                user_id,
                special_title,  //专属头衔, 不填或空字符串表示删除专属头衔
                duration //专属头衔有效期, 单位秒, -1 表示永久, 不过此项似乎没有效果, 可能是只有某些特殊的时间长度有效, 有待测试
            }
        })

    }

    /*--------------------群操作----------------------  */

    async set_group_ban(group_id, user_id, duration) {
        await axios({
            method: "post",
            url: this.bot.http + "/set_group_ban",
            params: {
                group_id,
                user_id,
                duration  //禁言时长, 单位秒, 0 表示取消禁言
            }
        })

    }
    async set_group_whole_ban(group_id, enable) {
        await axios({
            method: "post",
            url: this.bot.http + "/set_group_whole_ban",
            params: {
                group_id,
                enable  //是否禁言
            }
        })

    }
    /**
     * 
     * @param {*} group_id 
     * @param {*} anonymous 要禁言的匿名用户对象（群消息上报的 anonymous 字段）
     * @param {*} duration 禁言时长, 单位秒, 无法取消匿名用户禁言
     */
    async set_group_anonymous_ban(group_id, anonymous, duration) {
        await axios({
            method: "post",
            url: this.bot.http + "/set_group_anonymous_ban",
            params: {
                group_id,
                anonymous,
                duration
            }
        })

    }
    async set_essence_msg(message_id) {
        await axios({
            method: "post",
            url: this.bot.http + "/set_essence_msg",
            params: {
                message_id
            }
        })

    }
    async delete_essence_msg(message_id) {
        await axios({
            method: "post",
            url: this.bot.http + "/delete_essence_msg",
            params: {
                message_id
            }
        })

    }
    async send_group_sign(group_id) {
        await axios({
            method: "post",
            url: this.bot.http + "/send_group_sign",
            params: {
                group_id
            }
        })

    }
    async set_group_anonymous(group_id, enable) {
        await axios({
            method: "post",
            url: this.bot.http + "/set_group_anonymous",
            params: {
                group_id,
                enable
            }
        })

    }
    /**
     * 
     * @param {int} group_id 群号
     * @param {string} content 公告内容
     * @param {string} image 图片路径（可选）
     */
    async _send_group_notice(group_id, content, image) {
        await axios({
            method: "post",
            url: this.bot.http + "/_send_group_notice",
            params: {
                group_id,
                content,
                image
            }
        })

    }
    async _get_group_notice(group_id) {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/_get_group_notice",
            params: {
                group_id,

            }
        })
        return data

    }
    /**
     * 
     * @param {int} group_id 群号
     * @param {int} user_id 要踢的 QQ 号
     * @param {boolean} reject_add_request 拒绝此人的加群请求
     * @returns 
     */
    async set_group_kick(group_id, user_id, reject_add_request) {
        await axios({
            method: "post",
            url: this.bot.http + "/set_group_kick",
            params: {
                group_id,
                user_id,
                reject_add_request

            }
        })


    }
    /**
     * 
     * @param {int} group_id 
     * @param {boolean} is_dismiss 是否解散, 如果登录号是群主, 则仅在此项为 true 时能够解散
     * @returns 
     */
    async set_group_leave(group_id, is_dismiss) {
        await axios({
            method: "post",
            url: this.bot.http + "/set_group_leave",
            params: {
                group_id,
                is_dismiss

            }
        })


    }
   




}
export default new groupProcess()