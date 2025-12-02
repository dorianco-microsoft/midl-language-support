import * as vscode from 'vscode';
import { midlDocumentation, MidlDocEntry } from './midlDocumentation';

export class MidlHoverProvider implements vscode.HoverProvider {
    
    provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.Hover> {
        
        const wordRange = document.getWordRangeAtPosition(position, /[a-zA-Z_][a-zA-Z0-9_]*/);
        if (!wordRange) {
            return null;
        }

        const word = document.getText(wordRange).toLowerCase();
        const docEntry = midlDocumentation[word];
        
        if (!docEntry) {
            return null;
        }

        const markdown = this.createHoverContent(docEntry);
        return new vscode.Hover(markdown, wordRange);
    }

    private createHoverContent(entry: MidlDocEntry): vscode.MarkdownString {
        const md = new vscode.MarkdownString();
        md.isTrusted = true;
        md.supportHtml = true;

        // Title with category badge
        md.appendMarkdown(`### ${entry.name}\n\n`);
        md.appendMarkdown(`**Category:** \`${entry.category}\`\n\n`);

        // Description
        md.appendMarkdown(`${entry.description}\n\n`);

        // Syntax if available
        if (entry.syntax) {
            md.appendMarkdown(`**Syntax:**\n\`\`\`midl\n${entry.syntax}\n\`\`\`\n\n`);
        }

        // Example if available
        if (entry.example) {
            md.appendMarkdown(`**Example:**\n\`\`\`midl\n${entry.example}\n\`\`\`\n\n`);
        }

        // Documentation link
        md.appendMarkdown(`---\n`);
        md.appendMarkdown(`[📖 View Documentation](${entry.docUrl})`);

        return md;
    }
}
