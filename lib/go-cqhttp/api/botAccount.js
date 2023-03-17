/*
 * @Author: lycoris
 * @Date: 2023-03-16 11:16:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-03-17 14:35:28
 * @Description: 
 *获取登录号信息
 *设置登录号资料
 *获取企点账号信息
 *获取在线机型
 *设置在线机型
 *获取当前账号在线客户端列表
 */
import axios from 'axios'
import cfg from '../../config/config.js'
class botAccountProcess {
    bot = cfg.bot
    constructor(e) {
        this.e = e
    }
     /**
     * @description: 获取登录机器人信息
     * @return {*}
     */    
    async getLoginInfo() {
      const data=  await axios({
            method: "post",
            url: this.bot.http + "/get_login_info",

        }).catch(error => {
            logger.error(error)
        })
        return data
    }
    /**
     * @description: 设置登录机器人信息
     * @param {*} nickname 昵称
     * @param {*} company 公司
     * @param {*} email 邮箱
     * @param {*} college 学校
     * @param {*} personal_note 个性签名
     * @return {*}
     */    
    async setQQProfile(nickname, company,email,college,personal_note) {
      await axios({
            method: "post",
            url: this.bot.http + "/set_qq_profile",
            data: {
                nickname,
                company,
                email,
                college,
                personal_note,
            }

        }).catch(error => {
            logger.error(error)
        })

    }
    /**
     * #获取企点账号信息
     * 注意
     * 该API只有企点协议可用
      */
    async qidian_get_account_info() {
      const data=  await axios({
            method: "post",
            url: this.bot.http + "/qidian_get_account_info",
        }).catch(error => {
            logger.error( error)
        })
        return data
    }
    /**
     * @description 获取在线机型
     * @param {*} model 机型名称
     * @returns variants array
     * 响应内容为 JSON 数组，每个元素如下：
     * 字段名	数据类型	说明
     * model_show	string	-
     * need_pay	    boolean	-
     */
    async _get_model_show(model) {
      const data=  await axios({
            method: "post",
            url: this.bot.http + "/_get_model_show",
            params:{
                model
            }
        }).catch(error => {
            logger.error( error)
        })
        return data
    }
    /**
     * 设置在线机型
     */
    async _set_model_show(model,model_show) {
      await axios({
            method: "post",
            url: this.bot.http + "/_set_model_show",
            params:{
                model,
                model_show
            }
        }).catch(error => {
            logger.error( error)
        })

    }
    /**
     * @description 获取当前账号在线客户端列表
     * @param boolean no_cache  是否无视缓存
     * @returns clients Device[]	
     */
    async get_online_clients(no_cache) {
        const data=  await axios({
              method: "post",
              url: this.bot.http + "/get_online_clients",
              params:{
                no_cache
              }
          }).catch(error => {
              logger.error( error)
          })
          return data
      }



}
export default new botAccountProcess()