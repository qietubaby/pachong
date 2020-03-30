// superagent 获取 html 内容
import superagent from 'superagent'
import fs from 'fs'
import path from 'path'
import Analyze from './analyzer'

export interface Analyzer {
  analyze: (html: string, filePath: string) => string
}

class Crowller {
  private filePath = path.resolve(__dirname, '../data/course.json')

  // 获取html内容
  async getRawHtml() {
    const result = await superagent.get(url)
    return result.text
  }

  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content)
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml()
    const fileContent = this.analyzer.analyze(html, this.filePath)
    this.writeFile(JSON.stringify(fileContent))
  }

  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess()
  }
}

const url = `http://www.kdxs.com/`

const analyzer = new Analyze()
new Crowller(url, analyzer)
