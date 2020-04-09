// superagent 获取 html 内容
import superagent from 'superagent'
import fs from 'fs'
import path from 'path'
const url = `http://www.kdxs.com/`;

export interface Analyzerr {
  analyze: (html: string, filePath: string) => string
}

class Crowller {
  private filePath = path.resolve(__dirname, '../data/course.json')

  // 获取html内容
  private async getRawHtml() {
    const result = await superagent.get(url)
    return result.text
  }

  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content)
  }

  private async initSpiderProcess() {
    const html = await this.getRawHtml()
    const fileContent = this.analyzer.analyze(html, this.filePath)
    this.writeFile(fileContent)
  }

  constructor(private url: string, private analyzer: Analyzerr) {
    this.initSpiderProcess()
  }
}

export default Crowller



