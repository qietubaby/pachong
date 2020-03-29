// superagent 获取 html 内容
import superagent from 'superagent'

import cheerio from 'cheerio'

interface Course {
  title: string;
  type: string;
}

interface CourseResult {
  time: number;
  data: Course[];
}

class Crowller {
  private url = `http://www.kdxs.com/`


  getCourseInfo(html: string) {
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

    return result
  }

  // 获取html内容
  async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }

  generateJsonContent(courseInfo: CourseResult) {
    console.log(courseInfo)
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml()
    const courseInfo = this.getCourseInfo(html);
    this.generateJsonContent(courseInfo)
  }

  constructor() {
    this.initSpiderProcess()
  }
}

const crowller = new Crowller()
