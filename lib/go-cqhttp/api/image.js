import axios from 'axios'
import cfg from '../../config/config.js'
class imageProcess {
    bot = cfg.bot
    constructor(e) {
        this.e = e
    }
    /**
     * 
     * @param {string} file 图片缓存文件名
     * @returns 
     * 参数
        字段	类型	说明
        file	string	图片缓存文件名
        响应数据

        字段	类型	说明
        size	int32	图片源文件大小
        filename	string	图片文件原名
        url	string	图片下载地址
     */
    async get_image(file) {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/get_image",
            data: {
                file
            }
        })
        return data

    }

    async can_send_image() {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/can_send_image",

        })
        return data

    }
    /** 参数
        字段	类型	说明
        image	string	图片ID
        响应数据

        字段	类型	说明
        texts	TextDetection[]	OCR结果
        language	string	语言 
    */
    async ocr_image(image) {
        const data = await axios({
            method: "post",
            url: this.bot.http + "/ocr_image",
            data: {
                image
            }
        })
        return data

    }
}
export default new imageProcess()