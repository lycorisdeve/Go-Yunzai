/*
 * @description: 
 * @author: 名字
 * @date: Do not edit
 */
import axios from 'axios'
import cfg from '../../config/config.js'
class requestProcess {
    bot = cfg.bot
    constructor(e) {
        this.e = e
    }

    async set_friend_add_request(flag,approve,remark) {
        await axios({
            method: "post",
            url: this.bot.http + "/set_friend_add_request",
            data: {
                flag,
                approve,
                remark
            }
        })

    }
    async set_group_add_request(flag,sub_type,approve,reason) {
        
       const data= await axios({
            method: "post",
            url: this.bot.http + "/set_group_add_request",
            data: {
                flag,
                sub_type,
                approve,
                reason
                
            }
        })
        return data

    }


}
export default new requestProcess()