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
import Yunzai from './lib/bot.js'
import botAccountProcess from './lib/go-cqhttp/api/botAccount.js'
/** 全局变量 bot */
let botInfo = await botAccountProcess.getLoginInfo()
global.Bot = await Yunzai.run()

global.Bot.uin = botInfo.data.data.user_id
global.Bot.nickname = botInfo.data.data.nickname
