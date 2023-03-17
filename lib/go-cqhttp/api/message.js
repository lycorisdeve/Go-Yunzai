import axios from 'axios'
import cfg from '../../config/config.js'
/** 
 *消息处理类
 *接口功能
 *发送私聊消息
 *发送群聊消息
 *发送消息
 *获取消息
 *撤回消息
 *标记消息已读
 *获取合并转发内容
 *发送合并转发 ( 群聊 )
 *发送合并转发 ( 好友 )
 *获取群消息历史记录
*/
class messageProcess {
    bot = cfg.bot
    constructor(e) {
        this.e = e
        this.msg = ''
    }
    async sendPrivateMsg(msg, id) {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/send_private_msg",
            data: {
                user_id: id,
                message: msg,
                auto_escape: false,
            }

        }).catch(error => {
            logger.error('消息发送失败：' + error)
        })
        return data
    }
    async sendGroupMsg(msg, id) {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/send_group_msg",
            data: {
                group_id: id,
                message: msg,
                auto_escape: false,
            }
        }).catch(error => {
            logger.error('群消息发送失败：' + error)
        })
        return data
    }

    async sendMsg(message_type, user_id, group_id, msg) {
        const data=  await axios({
            method: "post",
            url: this.bot.http + "/send_msg",
            data: {
                message_type,
                user_id,
                group_id,
                message: msg,
                auto_escape: false,
            }

        })
        return data

    }
    async getMsg(message_id) {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/get_msg",
            data: {
                message_id
            }
        })
        return data

    }
    async deleteMsg(message_id) {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/delete_msg",
            data: {
                message_id
            }
        })
    }
    async markMsgAsRead(message_id) {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/mark_msg_as_read",
            data: {
                message_id
            }
        })
    }
    async getForwardMsg(message_id) {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/get_forward_msg",
            data: {
                message_id
            }
        })
        return data

    }
    async sendGroupForwardMsg(group_id, msg) {

        const data = await axios({
            method: "post",
            url: this.bot.http + "/send_group_forward_msg",
            data: {
                group_id,
                messages: msg
            }
        })
        return data.data
    }
    async sendPrivateForwardMsg(user_id, msg) {

        const data = await axios({
            method: "post",
            url: this.bot.http + "/send_private_forward_msg",
            data: {
                user_id,
                message: msg
            }
        })
        return data
    }
    async getGroupMsgHistory(message_seq, group_id) {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/get_group_msg_history",
            data: {
                message_seq,
                group_id
            }
        })
        return data
    }

}

export default new messageProcess()