const END_LINE_SEPARATE = '\r\n';

export class MdSyntax {
		header(depth, txt): string {
				const headerSpace = new Array(depth).join('  ')
				return this.mdHeader(headerSpace, txt);
		}

		mdHeader(headerSpace, txt): string {
				return headerSpace + '- ' + txt + END_LINE_SEPARATE;
		}

		sheetName(txt): string {
				return '# ' + txt + END_LINE_SEPARATE;
		}

		centralTopic(txt): string {
				return '## ' + txt + END_LINE_SEPARATE;
		}
}
