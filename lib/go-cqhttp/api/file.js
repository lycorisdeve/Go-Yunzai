/*
 * @description: 
 * @author: 名字
 * @date: Do not edit
 */
import axios from 'axios'
import cfg from '../../config/config.js'
class fileProcess {
    bot = cfg.bot
    constructor(e) {
        this.e = e
    }
     /**
     * 
     * @param {*} group_id 
     * @param {*} file 本地文件路径
     * @param {*} name 储存名称
     * @param {*} folder 父目录ID
     * @returns 
     */
     async upload_group_file(group_id, file, name, folder) {
        await axios({
            method: "post",
            url: this.bot.http + "/upload_group_file",
            params: {
                group_id,
                file,
                name,
                folder

            }
        })


    }
    async delete_group_file(group_id, file_id, busid) {
        await axios({
            method: "post",
            url: this.bot.http + "/delete_group_file",
            params: {
                group_id,
                file_id,
                busid
            }
        })
    }
    async create_group_file_folder(group_id, name, parent_id) {
        parent_id = parent_id === '/' ? parent_id : '/'
        await axios({
            method: "post",
            url: this.bot.http + "/create_group_file_folder",
            params: {
                group_id,
                name,
                parent_id: parent_id
            }
        })
    }
    async delete_group_folder(group_id, folder_id) {
       
        await axios({
            method: "post",
            url: this.bot.http + "/delete_group_folder",
            params: {
                group_id,
                folder_id
            }
        })
    }
    async get_group_file_system_info(group_id) {
       
       const data= await axios({
            method: "post",
            url: this.bot.http + "/get_group_file_system_info",
            params: {
                group_id,
            }
        })
        return data
    }
    async get_group_root_files(group_id) {
       
       const data= await axios({
            method: "post",
            url: this.bot.http + "/get_group_root_files",
            params: {
                group_id,
            }
        })
        return data
    }
    async get_group_files_by_folder(group_id,folder_id) {
       
       const data= await axios({
            method: "post",
            url: this.bot.http + "/get_group_files_by_folder",
            params: {
                group_id,
                folder_id
            }
        })
        return data
    }
    async get_group_file_url(group_id,file_id,busid) {
       
       const data= await axios({
            method: "post",
            url: this.bot.http + "/get_group_file_url",
            params: {
                group_id,
                file_id,
                busid
            }
        })
        return data
    }
    async upload_private_file(user_id,file,name) {
       await axios({
            method: "post",
            url: this.bot.http + "/upload_private_file",
            params: {
                user_id,
                file,
                name
            }
        })
    }
}
export default new fileProcess()