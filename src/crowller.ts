// superagent 获取 html 内容
import superagent from 'superagent'

import cheerio from 'cheerio'

interface Course {
  title: string
  type: string
}

class Crowller {
  private url = `http://www.kdxs.com/`
  private rawHtml = ''

  getJsonInfo(html: string) {
    const $ = cheerio.load(html)
    const courseItems = $('.pt-new-recomment-list li')
    const courseInfos: Course[] = []

    courseItems.map((index, element) => {
      const descs = $(element).find('a')
      const title = descs.eq(1).text()
      const type = descs.eq(0).text()

      courseInfos.push({
        title,
        type
      })
    })

    const result = {
      time: new Date().getTime(),
      data: courseInfos
    }

    console.log(result)
  }

  async getRawHtml() {
    const result = await superagent.get(this.url)
    this.rawHtml = result.text
    this.getJsonInfo(this.rawHtml)
  }

  constructor() {
    this.getRawHtml()
  }
}

const crowller = new Crowller()
