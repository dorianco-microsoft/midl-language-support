import * as vscode from 'vscode';
import { MidlHoverProvider } from './hoverProvider';
import { MidlDocumentFormatter, MidlRangeFormatter } from './formatter';

export function activate(context: vscode.ExtensionContext) {
    console.log('MIDL Language Support extension is now active');

    // Register hover provider for MIDL files
    const hoverProvider = new MidlHoverProvider();
    const hoverDisposable = vscode.languages.registerHoverProvider(
        { language: 'midl', scheme: 'file' },
        hoverProvider
    );
    context.subscriptions.push(hoverDisposable);

    // Register document formatter
    const documentFormatter = new MidlDocumentFormatter();
    const formatterDisposable = vscode.languages.registerDocumentFormattingEditProvider(
        { language: 'midl', scheme: 'file' },
        documentFormatter
    );
    context.subscriptions.push(formatterDisposable);

    // Register range formatter
    const rangeFormatter = new MidlRangeFormatter();
    const rangeFormatterDisposable = vscode.languages.registerDocumentRangeFormattingEditProvider(
        { language: 'midl', scheme: 'file' },
        rangeFormatter
    );
    context.subscriptions.push(rangeFormatterDisposable);
}

export function deactivate() {
    console.log('MIDL Language Support extension is now deactivated');
}
