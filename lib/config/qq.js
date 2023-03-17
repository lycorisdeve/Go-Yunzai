/*
 * @description: 
 * @author: 名字
 * @date: Do not edit
 */
import fs from 'fs'
import inquirer from 'inquirer'
import cfg from './config.js'
import common from '../common/common.js'
import chalk from 'chalk'
import botAccountProcess from '../../lib/go-cqhttp/api/botAccount.js'

/**
 * 创建qq配置文件 `config/bot/qq.yaml`
 * Git Bash 运行npm命令会无法选择列表
 */
export default async function createQQ () {
  if (cfg.qq && !process.argv.includes('login')) {
    return
  }
  console.log(`欢迎使用${chalk.green('Yunzai-Bot v' + cfg.package.version)}\n请按提示输入完成QQ配置`)
  let propmtList = [
    {
      type: 'Input',
      message: '请输入机器人QQ号(请用小号)：',
      name: 'QQ',
      validate (value) {
        if (/^[1-9][0-9]{4,14}$/.test(value)) return true
        return '请输入正确的QQ号'
      }
    },
    
    // ,{
    //   type: 'Input',
    //   message: '代理服务器地址,无需代理服务器请直接按下Enter：',
    //   name: 'proxyAddress',
    //   default: 'http://0.0.0.0:0'
    // }
  ]

  if (!process.argv.includes('login')) {
    propmtList.push({
      type: 'Input',
      message: '请输入主人QQ号：',
      name: 'masterQQ'
    })
  }
  const ret = await inquirer.prompt(propmtList)

  let file = './config/config/'
  let fileDef = './config/default_config/'

  let qq = fs.readFileSync(`${fileDef}qq.yaml`, 'utf8')


  qq = qq.replace(/qq:/g, 'qq: ' + ret.QQ)
  fs.writeFileSync(`${file}qq.yaml`, qq, 'utf8')

  let bot = fs.readFileSync(`${fileDef}bot.yaml`, 'utf8')
  // bot = bot.replace(/proxyAddress:/g, `proxyAddress:  ${ret.proxyAddress}`)

  if (ret.masterQQ) {
    let other = fs.readFileSync(`${fileDef}other.yaml`, 'utf8')
    other = other.replace(/masterQQ:/g, `masterQQ:\n  - ${ret.masterQQ}`)
    fs.writeFileSync(`${file}other.yaml`, other, 'utf8')
  }

  fs.writeFileSync(`${file}bot.yaml`, bot, 'utf8')

  console.log(`\nQQ配置完成，正在登录\n后续修改账号可以运行命令： ${chalk.green('npm run login')}\n`)

  await common.sleep(2000)
}
