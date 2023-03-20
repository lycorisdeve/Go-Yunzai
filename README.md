# Go-Yunzai

#### 介绍
狗崽机器人，云崽机器人适配go-cqhttp版！需要一定的捣鼓、编程经验才能搞懂。本领低微，维护是不可能维护的，下次一定！！！

#### 说明
云崽改编版，简单适应了go-cqhttp！

#### 安装教程

##### 第一步

##### 1. 启动Go-cqhttp

启动Go-cqhttp，选择通信方式为 0  3，生成config.yml文件

​         uin: xxxxxxxx  # QQ账号  
​         password: xxxxxx # 密码为空时使用扫码登录

##### 2. 修改config

修改config.yml中-address  改成你所需要的端口号或者地址

```yaml
 - http: # HTTP 通信设置
      address: 127.0.0.1:8090 # HTTP监听地址
 - ws-reverse:
      # 反向WS Universal 地址
      # 注意 设置了此项地址后下面两项将会被忽略
      universal: ws://127.0.0.1:9090
#############如果你缺少某项那肯定是你少选了0 3 其中一个##############
```

大致配置如下：

```yaml
# go-cqhttp 默认配置文件

account: # 账号相关
  uin: 123456789 # QQ账号
  password: '' # 密码为空时使用扫码登录
  encrypt: false  # 是否开启密码加密
  status: 0      # 在线状态 请参考 https://docs.go-cqhttp.org/guide/config.html#在线状态
  relogin: # 重连设置
    delay: 3   # 首次重连延迟, 单位秒
    interval: 3   # 重连间隔
    max-times: 0  # 最大重连次数, 0为无限制

  # 是否使用服务器下发的新地址进行重连
  # 注意, 此设置可能导致在海外服务器上连接情况更差
  use-sso-address: true
  # 是否允许发送临时会话消息
  allow-temp-session: false

heartbeat:
  # 心跳频率, 单位秒
  # -1 为关闭心跳
  interval: 5

message:
  # 上报数据类型
  # 可选: string,array
  post-format: array
  # 是否忽略无效的CQ码, 如果为假将原样发送
  ignore-invalid-cqcode: false
  # 是否强制分片发送消息
  # 分片发送将会带来更快的速度
  # 但是兼容性会有些问题
  force-fragment: false
  # 是否将url分片发送
  fix-url: false
  # 下载图片等请求网络代理
  proxy-rewrite: ''
  # 是否上报自身消息
  report-self-message: false
  # 移除服务端的Reply附带的At
  remove-reply-at: false
  # 为Reply附加更多信息
  extra-reply-data: false
  # 跳过 Mime 扫描, 忽略错误数据
  skip-mime-scan: false

output:
  # 日志等级 trace,debug,info,warn,error
  log-level: debug
  # 日志时效 单位天. 超过这个时间之前的日志将会被自动删除. 设置为 0 表示永久保留.
  log-aging: 15
  # 是否在每次启动时强制创建全新的文件储存日志. 为 false 的情况下将会在上次启动时创建的日志文件续写
  log-force-new: true
  # 是否启用日志颜色
  log-colorful: true
  # 是否启用 DEBUG
  debug: false # 开启调试模式

# 默认中间件锚点
default-middlewares: &default
  # 访问密钥, 强烈推荐在公网的服务器设置
  access-token: ''
  # 事件过滤器文件目录
  filter: ''
  # API限速设置
  # 该设置为全局生效
  # 原 cqhttp 虽然启用了 rate_limit 后缀, 但是基本没插件适配
  # 目前该限速设置为令牌桶算法, 请参考:
  # https://baike.baidu.com/item/%E4%BB%A4%E7%89%8C%E6%A1%B6%E7%AE%97%E6%B3%95/6597000?fr=aladdin
  rate-limit:
    enabled: false # 是否启用限速
    frequency: 1  # 令牌回复频率, 单位秒
    bucket: 1     # 令牌桶大小

database: # 数据库相关设置
  leveldb:
    # 是否启用内置leveldb数据库
    # 启用将会增加10-20MB的内存占用和一定的磁盘空间
    # 关闭将无法使用 撤回 回复 get_msg 等上下文相关功能
    enable: true
  sqlite3:
    # 是否启用内置sqlite3数据库
    # 启用将会增加一定的内存占用和一定的磁盘空间
    # 关闭将无法使用 撤回 回复 get_msg 等上下文相关功能
    enable: false
    cachettl: 3600000000000 # 1h

# 连接服务列表
servers:
  # 添加方式，同一连接方式可添加多个，具体配置说明请查看文档
  #- http: # http 通信
  #- ws:   # 正向 Websocket
  #- ws-reverse: # 反向 Websocket
  #- pprof: #性能分析服务器

  - http: # HTTP 通信设置
      address: 127.0.0.1:8090 # HTTP监听地址
      timeout: 5      # 反向 HTTP 超时时间, 单位秒，<5 时将被忽略
      long-polling:   # 长轮询拓展
        enabled: false       # 是否开启
        max-queue-size: 2000 # 消息队列大小，0 表示不限制队列大小，谨慎使用
      middlewares:
        <<: *default # 引用默认中间件
      post:           # 反向HTTP POST地址列表
      #- url: ''                # 地址
      #  secret: ''             # 密钥
      #  max-retries: 3         # 最大重试，0 时禁用
      #  retries-interval: 1500 # 重试时间，单位毫秒，0 时立即
      #- url: http://127.0.0.1:5701/ # 地址
      #  secret: ''                  # 密钥
      #  max-retries: 10             # 最大重试，0 时禁用
      #  retries-interval: 1000      # 重试时间，单位毫秒，0 时立即
  # 反向WS设置
  - ws-reverse:
      # 反向WS Universal 地址
      # 注意 设置了此项地址后下面两项将会被忽略
      universal: ws://127.0.0.1:9090
      # 反向WS API 地址
      api: ws://your_websocket_api.server
      # 反向WS Event 地址
      event: ws://your_websocket_event.server
      # 重连间隔 单位毫秒
      reconnect-interval: 3000
      middlewares:
        <<: *default # 引用默认中间件

```



##### 3.开启服务

​      win   双击go-cqhttp.bat 运行

​	linux  ./go-cqhttp  运行

#### 第二步

>环境准备： Windows or Linux，Node.js（[版本至少v16以上](http://nodejs.cn/download/)），[Redis](https://redis.io/docs/getting-started/installation/)

1.克隆项目
```sh
git clone --depth=1 -b main https://gitee.com/aurora-love/Go-Yunzai.git
cd Go-Yunzai #进入Yunzai目录
```
2.安装[pnpm](https://pnpm.io/zh/installation)，已安装的可以跳过

```sh
npm install pnpm -g
```
3.安装依赖

```sh
pnpm install -P
```
4.运行（首次运行按提示输入登录）

```shell
node app
```

#### 问题

插件适配：很多插件中调用了oicq或icqq中的方法，如e.group.makeForwardMsg

```javascript
  if (e.isGroup) {
            e.reply(
              await e.group.makeForwardMsg(data_msg),
              false,
              { recallMsg: current_group_policy.isRecall ? current_group_policy.recallDelay : 0 }
            );
          }
------------------------------------------------------------------------------------------------------------if (res.isnsfw) {
          if (current_group_policy.isTellMaster) {
            let msg = [
              "【aiPainting】不合规图片：\n",
              segment.image(`base64://${res.base64}`),
              `\n来自${e.isGroup ? `群【${(await Bot.getGroupInfo(e.group_id)).group_name}】(${e.group_id})的` : ""}用户【${await getuserName(e)}】(${e.user_id})`,
              `\n【Tags】：${paramdata.rawtag.tags}`,
              `\n【nTags】：${paramdata.rawtag.ntags}`,
            ]
            Bot.pickUser(cfg.masterQQ[0]).sendMsg(msg);
          }
```

​	注：代码来自ap插件的 app/ai_painting.js 中201行与263行

这些方法可替换为Go-Yunzai\lib\go-cqhttp\api 中简单封装的方法，方法参数及详情请参考[Go-cqhttp文档][https://docs.go-cqhttp.org/api/#%E5%9F%BA%E7%A1%80%E4%BC%A0%E8%BE%93]，例：

```js
await Bot.getGroupInfo(e.group_id))
=====================================================================================================
await  groupProcess.get_group_info(group_id)
```

转发消息可参考 add.js中制作转发消息的思路，以及查看go-cqhttp的文档

```js
/* add.js*/
async list() {
    this.isGlobal = this.e?.msg.includes("全局");

    let page = 1
    let pageSize = 100
    let type = 'list'

    await this.getGroupId()
    if (!this.group_id) return false

    this.initTextArr()

    let search = this.e.msg.replace(/#|＃|表情|词条|全局/g, '')

    if (search.includes('列表')) {
      page = search.replace(/列表/g, '') || 1
    } else {
      type = 'search'
    }

    let list = textArr[this.group_id]

    if (lodash.isEmpty(list)) {
      await this.e.reply('暂无表情')
      return
    }

    let arr = []
    for (let [k, v] of textArr[this.group_id]) {
      if (type == 'list') {
        arr.push({ key: k, val: v, num: arr.length + 1 })
      } else if (k.includes(search)) {
        /** 搜索表情 */
        arr.push({ key: k, val: v, num: arr.length + 1 })
      }
    }

    let count = arr.length
    arr = arr.reverse()

    if (type == 'list') {
      arr = this.pagination(page, pageSize, arr)
    }

    if (lodash.isEmpty(arr)) {
      return
    }

    let msg = []
    let num = 0
    for (let i in arr) {
      if (num >= page * pageSize) break

      let keyWord = await this.keyWordTran(arr[i].key)
      if (!keyWord) continue

      if (Array.isArray(keyWord)) {
        keyWord.unshift(`${arr[i].num}、`)
        keyWord.push('\n')
        keyWord.forEach(v => msg.push(v))
      } else if (keyWord.type) {
        msg.push(`\n${arr[i].num}、`, keyWord, '\n\n')
      } else {
        msg.push(`${arr[i].num}、${keyWord}\n`)
      }
      num++
    }

    let end = ''
    if (type == 'list' && count > 100) {
      end = `更多内容请翻页查看\n如：#表情列表${Number(page) + 1}`
    }

    let title = `表情列表，第${page}页，共${count}条`
    if (type == 'search') {
      title = `表情${search}，${count}条`
    }

    let forwardMsg = await this.makeForwardMsg(Bot.uin, title, msg, end)

    this.e.reply(forwardMsg)
  }
async makeForwardMsg(qq, title, msg, end = '') {
    let nickname = Bot.nickname
    if (this.e.isGroup) {
      let info = await groupProcess.get_group_member_info(this.e.group_id, qq)
      info = info.data.data
      nickname = info.card === '' ? info.nickname : info.card
    }
    let userInfo = {
      name: nickname,
      uin: Bot.uin
    }

    let forwardMsg = [{
      type: "node",
      data: {
        ...userInfo,
        content: title
      }
    }
    ]

    let msgArr = lodash.chunk(msg, 40)
    msgArr.forEach(v => {
      v[v.length - 1] = lodash.trim(v[v.length - 1], '\n')
      forwardMsg.push({
        type: "node",
        data: {
          ...userInfo, content: messageUtil.toCqcode(v)
        }
      })
    })

    if (end) {
      forwardMsg.push({
        type: "node",
        data: { ...userInfo, content: end }
      })
    }

    return forwardMsg
  }

```

神特么那么长的代码，总结就是转行成对应格式的数组，直接调用go-cqhttp的api 发出去就行

其余的CQ码问题，去看[go-cqhttp文档][https://docs.go-cqhttp.org/cqcode/#%E6%B6%88%E6%81%AF%E7%B1%BB%E5%9E%8B]吧



##  致谢

| Nickname                                                     | Contribution         |
| ------------------------------------------------------------ | -------------------- |
| [GardenHamster](https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2FGardenHamster%2FGenshinPray) | 模拟抽卡背景素材来源 |
| [西风驿站](https://gitee.com/link?target=https%3A%2F%2Fbbs.mihoyo.com%2Fys%2Fcollection%2F839181) | 角色攻略图来源       |
| [米游社友人A](https://gitee.com/link?target=https%3A%2F%2Fbbs.mihoyo.com%2Fys%2Fcollection%2F428421) | 角色突破素材图来源   |
| [云崽Bot][https://gitee.com/yoimiya-kokomi/Yunzai-Bot]       | 喵佬的云崽仓库       |

## 其他

- 最后给个star或者爱发电，你的支持是不维护本项目的动力~~
- 图片素材来源于网络，仅供交流学习使用
- 严禁用于任何商业用途和非法行为
