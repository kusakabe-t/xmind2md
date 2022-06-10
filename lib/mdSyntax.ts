const END_LINE_SEPARATE = '\r\n';

export class MdSyntax {
  header(depth: number, txt: string) {
    const headerSpace = new Array(depth).join('  ')
    return this.mdHeader(headerSpace, txt);
  }

  mdHeader(headerSpace: string, txt: string) {
    return headerSpace + '- ' + txt + END_LINE_SEPARATE;
  }

  sheetName(txt: string) {
    return '# ' + txt + END_LINE_SEPARATE;
  }

  centralTopic(txt: string) {
    return '## ' + txt + END_LINE_SEPARATE;
  }
}
