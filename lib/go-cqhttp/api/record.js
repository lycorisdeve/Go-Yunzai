import axios from 'axios'
import cfg from '../../config/config.js'
class recordProcess {
    bot = cfg.bot
    constructor(e) {
        this.e = e
    }
    /**
     * 
     * @param {string} file 
     * @param {string} out_format 
     * @returns 
     * 参数
        字段名	数据类型	默认值	说明
        file	string	-	收到的语音文件名（消息段的 file 参数）, 如 0B38145AA44505000B38145AA4450500.silk
        out_format	string	-	要转换到的格式, 目前支持 mp3、amr、wma、m4a、spx、ogg、wav、flac
        响应数据
        字段名	数据类型	说明
        file	string	转换后的语音文件路径, 如 /home/somebody/cqhttp/data/record/0B38145AA44505000B38145AA4450500.mp3
     */
    async get_record(file,out_format) {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/get_record",
            data: {
                file,
                out_format
            }
        })
        return data

    }
    async can_send_record() {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/can_send_record",
           
        })
        return data

    }

}
export default new recordProcess()