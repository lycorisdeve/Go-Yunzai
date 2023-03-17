
import * as querystring_1 from "querystring";
import friendProcess from "./api/friend.js";

class messageUtil {
    constructor(e) {
        this.e = e
    }

    /** 
     * 转换为CQ码 
     * 
    */
    toCqcode(msg) {
        const mCQInside = {
            "&": "&amp;",
            ",": "&#44;",
            "[": "&#91;",
            "]": "&#93;",
        };
        let cqcode = "";
        if (msg.source) {
            const quote = { ...msg.source, flag: 1 };
            const mid = genDmMessageId(msg.user_id, quote.seq, quote.rand, quote.time, quote.flag);
            cqcode += `[CQ:reply,id=${mid}]`;
        }

        if (Array.isArray(msg)) {
            (msg || []).forEach((c) => {
                if ("text" === c.type) {
                    if (c.data) {
                        cqcode += c.data.text;
                    } else if (c.text) {
                        cqcode += c.text
                    } else {
                        logger.error('消息传入错误！！！')
                    }

                    return;
                }
                if (typeof (c) === 'string') {
                    cqcode += c;
                    return;
                }
                if (c.data) {
                    c.data.type = c.type
                    c = c.data
                    if (c.tpye === 'image') {
                        c.file = c.url
                    }
                }

                const s = querystring_1.stringify(c, ",", "=", {
                    encodeURIComponent: (s) => s.replace(new RegExp(Object.keys(mCQInside).join("|"), "g"), ((s) => mCQInside[s] || "")),
                });
                const cq = `[CQ:${c.type}${s ? "," : ""}${s}]`;
                cqcode += cq;
            });
        } else {
            if ("text" === msg.type) {
                cqcode += msg.text;
                return;
            }
            const s = querystring_1.stringify(msg, ",", "=", {
                encodeURIComponent: (s) => s.replace(new RegExp(Object.keys(mCQInside).join("|"), "g"), ((s) => mCQInside[s] || "")),
            });
            const cq = `[CQ:${msg.type}${s ? "," : ""}${s}]`;
            cqcode += cq;
        }

        return cqcode;
    }

    async messageChainToStr(msg) {
        let dealedMsg = ''
        if (Array.isArray(msg)) {
            (msg || []).forEach(async (c) => {
                if (typeof (c) === 'string') {
                    dealedMsg += c;

                }
                if ("text" === c.type) {
                    dealedMsg += c.data.text;

                }
                if ("image" === c.type) {
                    dealedMsg += c.data.file;

                }
                if ("at" === c.type) {
                    let info = await friendProcess.get_stranger_info(c.data.qq)
                    dealedMsg += `@${info.nickname} `;
                }

            });


        } else {
            if (typeof (msg) === 'string') {
                dealedMsg += msg;

            }
            if ("text" === msg.type) {
                dealedMsg += msg.data.text;

            }
            if ("image" === msg.type) {
                dealedMsg += msg.data.file;

            }
            if ("at" === msg.type) {
                let info = await friendProcess.get_stranger_info(msg.data.qq)
                dealedMsg += `@${info.nickname} `;
            }

        }
        return dealedMsg

    }
    

}

export default new messageUtil()


