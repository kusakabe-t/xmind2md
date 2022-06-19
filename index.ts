import * as fs from 'fs'
// @ts-expect-error TODO: XMindの型定義ファイルを準備する
import xmind from 'xmind'
import * as inquirer from "inquirer";
import { writeFileSyncRecursive } from './lib/writeFileSyncRecursive'
import { MdSyntax } from './lib/mdSyntax'
import * as Core from 'xmind-model'

const mdSyntax = new MdSyntax()
const mdContent: string[] = [];

main()

async function localFiles() {
  const files = await fs.promises.readdir(process.cwd())
  return files.filter(file => file.includes('.xmind'))
}

async function main() {
  const { xmindFile, destination } = await inquirer.prompt([
    {
      type: 'list',
      name: 'xmindFile',
      message: 'Which XMind File Convert Markdown?',
      choices: await localFiles()
    },
    {
      type: 'input',
      name: 'destination',
      message: 'Where is Convert File Destination? (default is ./tmp/output.md)',
      default: './tmp/output.md'
    }
  ])

  const workbook: Core.Workbook = xmind.open(xmindFile)
  const sheets = workbook.getSheets()

  // Read XMind data
  sheets.forEach((sheet) => {
    mdContent.push(mdSyntax.sheetName(sheet.getTitle()));
    mdContent.push(mdSyntax.centralTopic(sheet.getRootTopic().getTitle()));

    getXmindData(sheet.getRootTopic(), mdContent, 1)
  })

  // Connect XMind data
  const resultContent = mdContent.join("")

  // Convert XMind data to Markdown File
  writeFileSyncRecursive(destination, resultContent);
}

interface XMindNode extends Core.Topic {
  children?: Core.Topic[]
}

function getXmindData(node: XMindNode, mdContent: string[], depth: number) {
  node.children && node.children.forEach((_node) => {
    const title = _node.getTitle()

    mdContent.push(mdSyntax.header(depth, title.replace(/(\r\n|\n|\r)/gm, '\\n')));

    getXmindData(_node, mdContent, ++depth)
    depth--
  })
}
