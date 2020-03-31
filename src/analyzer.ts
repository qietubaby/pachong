import cheerio from 'cheerio'
import fs from 'fs'
import { Analyzerr } from './crowller'

interface Course {
  title: string
  type: string
}

interface CourseResult {
  time: number
  data: Course[]
}

interface Content {
  [propName: number]: Course[]
}

class Analyzer implements Analyzerr {

  private static instance: Analyzer;

  static getInstance() {
    if(!Analyzer.instance) {
      Analyzer.instance = new Analyzer()
    }
    return Analyzer.instance;
  }


  private getCourseInfo(html: string) {
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

  // 存储到本地
  private generateJsonContent(courseInfo: CourseResult, filePath: string) {
    let fileContent: Content = {}

    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    fileContent[courseInfo.time] = courseInfo.data
    return fileContent
  }

  public analyze(html: string, filePath: string) {
    const courseInfo = this.getCourseInfo(html)
    const fileContent = this.generateJsonContent(courseInfo, filePath)
    return JSON.stringify(fileContent)
  }

  private constructor() {
    
  }

}

export default Analyzer
