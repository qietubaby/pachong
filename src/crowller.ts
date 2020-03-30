// superagent 获取 html 内容
import superagent from 'superagent'

import cheerio from 'cheerio'

import fs from 'fs';
import path from 'path';

interface Course {
  title: string;
  type: string;
}

interface CourseResult {
  time: number;
  data: Course[];
}

interface Content {
  [propName: number]: Course[]
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


  // 存储到本地
  generateJsonContent(courseInfo: CourseResult) {

    const filePath = path.resolve(__dirname, '../data/course.json');
    let fileContent: Content = {};
    
    if(fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath,'utf-8'));
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
    
  }

  async initSpiderProcess() {
    const filePath = path.resolve(__dirname, '../data/course.json');
    const html = await this.getRawHtml()
    const courseInfo = this.getCourseInfo(html);
    const fileContent = this.generateJsonContent(courseInfo)
    fs.writeFileSync(filePath, JSON.stringify(fileContent));

  }

  constructor() {
    this.initSpiderProcess()
  }
}

const crowller = new Crowller()
