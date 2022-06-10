import * as fs from 'fs'
import xmind from 'xmind'

const inquirer = require('inquirer')
import {writeFileSyncRecursive} from './lib/writeFileSyncRecursive'
import {MdSyntax} from './lib/mdSyntax'

const mdSyntax = new MdSyntax()
const mdContent = [];

main()

// ['text.xmind', 'hoge.xmind']のようなファイルが返ってくることを示す型をつけたい
async function localFiles() {
  const files = await fs.promises.readdir(process.cwd())
  return files.filter(file => file.includes('.xmind'))
}

async function main() {
  // inquirerの型をつけたい
  const {xmindFile, destination} = await inquirer.prompt([
    {
      type: 'list',
      name: 'xmindFile',
      message: 'Which Xmind File Convert Markdown?',
      choices: await localFiles()
    },
    {
      type: 'input',
      name: 'destination',
      message: 'Where is Convert File Destination? (default is ./tmp/output.md)',
      default: './tmp/output.md'
    }
  ])

  const workbook = xmind.open(xmindFile)
  const sheets = workbook.getSheets()

  // Read XMind data
  sheets.forEach((sheet) => {
    mdContent.push(mdSyntax.sheetName(sheet.getTitle()));
    mdContent.push(mdSyntax.centralTopic(sheet.getRootTopic().getTitle()));

    getXmindData(sheet.rootTopic, mdContent, 1)
  })

  // Connect XMind data
  const resultContent = mdContent.join("")

  // Convert XMind data to Markdown File
  writeFileSyncRecursive(destination, resultContent);
}

function getXmindData(node, mdContent, depth) {
  node.children.forEach((node) => {
    let title = node.getTitle()

    mdContent.push(mdSyntax.header(depth, title.replace(/(\r\n|\n|\r)/gm, '\\n')));

    getXmindData(node, mdContent, ++depth)
    depth--
  })
}
