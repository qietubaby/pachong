// superagent 获取 html 内容
import superagent from 'superagent'

class Crowller {
  private secret = 'secretKey'
  private url = `https://www.yanyue.cn/tobacco`
  private rawHtml = ''

  async getRawHtml() {
    const result = await superagent.get(this.url)
    this.rawHtml = result.text
  }

  constructor() {
    this.getRawHtml()
  }
}

const crowller = new Crowller()
