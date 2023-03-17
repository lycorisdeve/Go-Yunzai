import { WebSocketServer } from "ws";
import PluginsLoader from '../plugins/loader.js'
import cfg from '../config/config.js'

const bot= cfg.bot

const wss = new WebSocketServer({ port: bot.ws });

export function connectWSClient() {
    wss.on('connection', (socket) => {
        logger.mark('go-cqhttp连接成功！！！')
        // 监听对方发送的消息
        socket.on('message', async res => {
            let data = JSON.parse(res)
            PluginsLoader.load()

            if (data.post_type === 'meta_event') {
                return
            } else {
                await PluginsLoader.deal(data)
                //    console.log(data)
            }
        });
    })
    wss.on("close", () => {
        logger.info('go-cqhttp断开连接！！！')
    })
}

