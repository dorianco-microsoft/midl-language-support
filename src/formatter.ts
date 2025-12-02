import * as vscode from 'vscode';

/**
 * MIDL Document Formatter following Microsoft C++ Style (Clang-format Microsoft preset)
 * 
 * Key formatting rules:
 * - 4 spaces indentation
 * - Allman brace style (braces on new line)
 * - Space after control keywords (if, for, while, etc.)
 * - Space after commas
 * - No space before function parentheses
 * - Pointer/reference aligned left (int* ptr, not int *ptr)
 * - Attributes formatted on separate lines when multiple
 * - Maximum 80-100 column width preference
 */

const INDENT = '    '; // 4 spaces (Microsoft style)

interface Token {
    type: 'comment' | 'preprocessor' | 'attribute' | 'brace-open' | 'brace-close' | 
          'statement' | 'declaration' | 'semicolon' | 'keyword' | 'whitespace';
    value: string;
    raw?: string;
}

export class MidlDocumentFormatter implements vscode.DocumentFormattingEditProvider {
    
    provideDocumentFormattingEdits(
        document: vscode.TextDocument,
        options: vscode.FormattingOptions,
        token: vscode.CancellationToken
    ): vscode.TextEdit[] {
        
        const text = document.getText();
        const formatted = this.formatMidl(text);
        
        const fullRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(text.length)
        );
        
        return [vscode.TextEdit.replace(fullRange, formatted)];
    }

    private formatMidl(text: string): string {
        // Normalize line endings
        text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        
        // Tokenize the input
        const tokens = this.tokenize(text);
        
        // Format tokens following Microsoft C++ style
        const formatted = this.formatTokens(tokens);
        
        return formatted;
    }

    /**
     * Tokenize MIDL code into structured tokens
     */
    private tokenize(text: string): Token[] {
        const tokens: Token[] = [];
        let i = 0;
        
        while (i < text.length) {
            // Skip whitespace but preserve blank lines
            let whitespaceStart = i;
            let newlineCount = 0;
            while (i < text.length && /\s/.test(text[i])) {
                if (text[i] === '\n') newlineCount++;
                i++;
            }
            
            if (i >= text.length) break;
            
            // Line comment
            if (text.substring(i, i + 2) === '//') {
                const start = i;
                let end = text.indexOf('\n', i);
                if (end === -1) end = text.length;
                tokens.push({ type: 'comment', value: text.substring(start, end) });
                i = end;
                continue;
            }
            
            // Block comment
            if (text.substring(i, i + 2) === '/*') {
                const start = i;
                let end = text.indexOf('*/', i + 2);
                if (end === -1) end = text.length;
                else end += 2;
                tokens.push({ type: 'comment', value: text.substring(start, end), raw: text.substring(start, end) });
                i = end;
                continue;
            }
            
            // Preprocessor directive
            if (text[i] === '#') {
                const start = i;
                let end = i;
                while (end < text.length && text[end] !== '\n') {
                    if (text[end] === '\\' && end + 1 < text.length && text[end + 1] === '\n') {
                        end += 2; // Line continuation
                    } else {
                        end++;
                    }
                }
                tokens.push({ type: 'preprocessor', value: text.substring(start, end) });
                i = end;
                continue;
            }
            
            // Attribute block [...]
            if (text[i] === '[') {
                const start = i;
                let depth = 0;
                while (i < text.length) {
                    if (text[i] === '[') depth++;
                    else if (text[i] === ']') {
                        depth--;
                        if (depth === 0) {
                            i++;
                            break;
                        }
                    }
                    i++;
                }
                tokens.push({ type: 'attribute', value: text.substring(start, i) });
                continue;
            }
            
            // Opening brace
            if (text[i] === '{') {
                tokens.push({ type: 'brace-open', value: '{' });
                i++;
                continue;
            }
            
            // Closing brace
            if (text[i] === '}') {
                tokens.push({ type: 'brace-close', value: '}' });
                i++;
                // Check for semicolon or typedef aliases after closing brace
                let j = i;
                while (j < text.length && /[ \t]/.test(text[j])) j++;
                
                if (j < text.length && text[j] === ';') {
                    // Simple closing with semicolon
                    tokens[tokens.length - 1].value = '};';
                    i = j + 1;
                } else if (j < text.length && text[j] !== '\n' && text[j] !== '\r') {
                    // There's content after the closing brace (typedef aliases)
                    // Read until semicolon
                    const aliasStart = j;
                    while (j < text.length && text[j] !== ';') {
                        j++;
                    }
                    if (j < text.length && text[j] === ';') {
                        j++; // Include the semicolon
                    }
                    const aliases = text.substring(aliasStart, j).trim();
                    if (aliases) {
                        // Combine closing brace with aliases
                        tokens[tokens.length - 1].value = '} ' + aliases;
                        i = j;
                    }
                }
                continue;
            }
            
            // Statement or declaration
            const start = i;
            let parenDepth = 0;
            let angleDepth = 0;
            while (i < text.length) {
                if (text[i] === '(') parenDepth++;
                else if (text[i] === ')') parenDepth--;
                else if (text[i] === '<') angleDepth++;
                else if (text[i] === '>') angleDepth--;
                else if (text[i] === '[') {
                    // Skip embedded attributes
                    let bracketDepth = 0;
                    while (i < text.length) {
                        if (text[i] === '[') bracketDepth++;
                        else if (text[i] === ']') {
                            bracketDepth--;
                            if (bracketDepth === 0) break;
                        }
                        i++;
                    }
                }
                else if (parenDepth === 0 && angleDepth === 0 && (text[i] === ';' || text[i] === '{' || text[i] === '}')) {
                    if (text[i] === ';') i++;
                    break;
                }
                i++;
            }
            
            const stmt = text.substring(start, i);
            if (stmt.trim()) {
                const normalized = this.normalizeStatement(stmt);
                const isDecl = this.isDeclaration(normalized);
                
                // Check if we're inside an enum and this is enum members
                if (this.isInsideEnum(tokens) && !isDecl) {
                    // Split comma-separated enum members into individual statements
                    const enumMembers = this.splitEnumMembers(normalized);
                    for (const member of enumMembers) {
                        tokens.push({ 
                            type: 'statement', 
                            value: member 
                        });
                    }
                } else {
                    tokens.push({ 
                        type: isDecl ? 'declaration' : 'statement', 
                        value: normalized 
                    });
                }
            }
        }
        
        return tokens;
    }

    /**
     * Check if we're currently inside an enum definition
     */
    private isInsideEnum(tokens: Token[]): boolean {
        let braceDepth = 0;
        for (let i = tokens.length - 1; i >= 0; i--) {
            const token = tokens[i];
            if (token.type === 'brace-close') {
                braceDepth++;
            } else if (token.type === 'brace-open') {
                braceDepth--;
                if (braceDepth < 0) {
                    // Found the opening brace, check if it's for an enum
                    if (i > 0 && tokens[i - 1].type === 'declaration' && 
                        /\benum\b/.test(tokens[i - 1].value)) {
                        return true;
                    }
                    return false;
                }
            }
        }
        return false;
    }

    /**
     * Split comma-separated enum members into individual members
     */
    private splitEnumMembers(stmt: string): string[] {
        const members: string[] = [];
        let current = '';
        let parenDepth = 0;
        let angleDepth = 0;
        
        for (let i = 0; i < stmt.length; i++) {
            const char = stmt[i];
            
            if (char === '(') parenDepth++;
            else if (char === ')') parenDepth--;
            else if (char === '<') angleDepth++;
            else if (char === '>') angleDepth--;
            
            if (char === ',' && parenDepth === 0 && angleDepth === 0) {
                const trimmed = current.trim();
                if (trimmed) members.push(trimmed + ',');
                current = '';
            } else {
                current += char;
            }
        }
        
        // Last member (no trailing comma in source, but we add it for consistency)
        const trimmed = current.trim();
        if (trimmed) {
            // Remove trailing comma/semicolon if present
            const cleaned = trimmed.replace(/[,;]\s*$/, '');
            members.push(cleaned);
        }
        
        return members;
    }

    /**
     * Normalize a statement: collapse whitespace, format operators, etc.
     */
    private normalizeStatement(stmt: string): string {
        // Preserve string literals and comments
        const strings: string[] = [];
        let result = stmt.replace(/"([^"\\]|\\.)*"/g, (match) => {
            strings.push(match);
            return `__STRING_${strings.length - 1}__`;
        });
        
        // Normalize whitespace
        result = result.replace(/\s+/g, ' ').trim();
        
        // Space after commas
        result = result.replace(/,(?!\s)/g, ', ');
        
        // Space around operators (but not for pointer/reference)
        result = result.replace(/\s*([+\-=<>!&|])\s*/g, ' $1 ');
        result = result.replace(/\s+/g, ' ');
        
        // No space before semicolon
        result = result.replace(/\s*;/g, ';');
        
        // Space after keywords
        const keywords = ['if', 'for', 'while', 'switch', 'catch', 'return', 'typedef', 'struct', 'union', 'enum'];
        for (const kw of keywords) {
            result = result.replace(new RegExp(`\\b${kw}\\(`, 'g'), `${kw} (`);
        }
        
        // Restore strings
        result = result.replace(/__STRING_(\d+)__/g, (_, idx) => strings[parseInt(idx)]);
        
        return result;
    }

    /**
     * Check if a statement is a declaration
     */
    private isDeclaration(stmt: string): boolean {
        const declKeywords = [
            'interface', 'library', 'coclass', 'dispinterface', 'module',
            'struct', 'union', 'enum', 'typedef', 'import', 'importlib'
        ];
        
        for (const kw of declKeywords) {
            if (new RegExp(`^${kw}\\b`).test(stmt)) {
                return true;
            }
        }
        
        return false;
    }

    /**
     * Format tokens into formatted output following Microsoft C++ style
     */
    private formatTokens(tokens: Token[]): string {
        const lines: string[] = [];
        let indentLevel = 0;
        
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            const indent = INDENT.repeat(indentLevel);
            const nextToken = i + 1 < tokens.length ? tokens[i + 1] : null;
            const prevToken = i > 0 ? tokens[i - 1] : null;
            
            switch (token.type) {
                case 'preprocessor':
                    // Preprocessor directives at column 0
                    lines.push(token.value);
                    // Add blank line after preprocessor unless next is also preprocessor or comment
                    if (nextToken && nextToken.type !== 'preprocessor' && nextToken.type !== 'comment') {
                        lines.push('');
                    }
                    break;
                    
                case 'comment':
                    // Comments maintain current indentation
                    if (token.raw && token.raw.includes('\n')) {
                        // Multi-line block comment
                        lines.push(this.formatBlockComment(token.raw, indent));
                    } else {
                        lines.push(indent + token.value.trim());
                    }
                    // Add blank line after comment if it's before a declaration/attribute at top level
                    if (indentLevel === 0 && nextToken && (nextToken.type === 'attribute' || nextToken.type === 'declaration')) {
                        lines.push('');
                    }
                    break;
                    
                case 'attribute':
                    // Add blank line before attribute if it's a member (not the first) and previous wasn't brace-open
                    if (indentLevel > 0 && prevToken && prevToken.type === 'statement' && this.isMemberDeclaration(prevToken.value)) {
                        lines.push('');
                    }
                    // Format attribute blocks
                    const attrLines = this.formatAttributeBlock(token.value, indentLevel);
                    lines.push(...attrLines);
                    // Don't add blank line - attribute is typically followed by its declaration
                    break;
                    
                case 'declaration':
                    // Declarations at current indent
                    lines.push(indent + token.value);
                    // Add blank line after declaration unless followed by brace or we're inside a block
                    if (nextToken && nextToken.type !== 'brace-open' && indentLevel === 0) {
                        lines.push('');
                    }
                    break;
                    
                case 'statement':
                    // Statements at current indent
                    lines.push(indent + token.value);
                    // No automatic blank lines - handled by attribute logic
                    break;
                    
                case 'brace-open':
                    // Allman style: brace on new line at current indent
                    lines.push(indent + '{');
                    indentLevel++;
                    // No blank line after opening brace
                    break;
                    
                case 'brace-close':
                    // Closing brace dedented
                    indentLevel = Math.max(0, indentLevel - 1);
                    const closeIndent = INDENT.repeat(indentLevel);
                    
                    // Format typedef aliases (e.g., "} RECT, *PRECT;")
                    if (token.value.includes(' ')) {
                        const parts = token.value.split(/\s+/, 2);
                        const brace = parts[0]; // "}" or "};"
                        const aliases = token.value.substring(parts[0].length).trim();
                        
                        // Format comma-separated aliases with proper spacing
                        const formattedAliases = aliases.replace(/\s*,\s*/g, ', ');
                        lines.push(closeIndent + brace + ' ' + formattedAliases);
                    } else {
                        lines.push(closeIndent + token.value);
                    }
                    
                    // Add blank line after closing brace at top level
                    if (indentLevel === 0 && nextToken) {
                        lines.push('');
                    }
                    break;
            }
        }
        
        // Post-process cleanup
        let result = lines.join('\n');
        
        // Remove excessive blank lines (max 1)
        result = result.replace(/\n\n\n+/g, '\n\n');
        
        // Remove trailing whitespace
        result = result.replace(/[ \t]+$/gm, '');
        
        // Remove leading blank lines
        result = result.replace(/^\n+/, '');
        
        // Ensure single trailing newline
        result = result.trimEnd() + '\n';
        
        return result;
    }

    /**
     * Format block comment preserving internal structure
     */
    private formatBlockComment(comment: string, indent: string): string {
        const lines = comment.split('\n');
        if (lines.length === 1) {
            return indent + comment.trim();
        }
        
        // Multi-line: indent all lines
        const formatted = lines.map((line, idx) => {
            if (idx === 0) return indent + line.trim();
            // Subsequent lines: preserve internal indentation structure
            const trimmed = line.trimEnd();
            if (trimmed.startsWith('*') || trimmed.startsWith('*/')) {
                return indent + ' ' + trimmed;
            }
            return indent + trimmed;
        });
        
        return formatted.join('\n');
    }

    /**
     * Format attribute block following Microsoft style
     * 
     * Rules:
     * - Single short attribute: [attribute] on one line
     * - Multiple attributes or long attributes: one per line with 4-space indent
     * - Align attribute names for readability
     */
    private formatAttributeBlock(attrBlock: string, baseIndentLevel: number): string[] {
        const baseIndent = INDENT.repeat(baseIndentLevel);
        const innerIndent = INDENT.repeat(baseIndentLevel + 1);
        
        // Remove outer brackets and normalize
        const content = attrBlock.slice(1, -1).trim();
        
        // Parse individual attributes
        const attrs = this.parseAttributes(content);
        
        if (attrs.length === 0) {
            return [baseIndent + '[]'];
        }
        
        // Single short attribute on one line
        if (attrs.length === 1 && attrs[0].length < 60) {
            const formatted = this.formatAttribute(attrs[0]);
            return [baseIndent + '[' + formatted + ']'];
        }
        
        // Multiple attributes or long single attribute: one per line
        const lines: string[] = [];
        lines.push(baseIndent + '[');
        
        for (let i = 0; i < attrs.length; i++) {
            const isLast = i === attrs.length - 1;
            const formatted = this.formatAttribute(attrs[i]);
            lines.push(innerIndent + formatted + (isLast ? '' : ','));
        }
        
        lines.push(baseIndent + ']');
        
        return lines;
    }

    /**
     * Parse comma-separated attributes from attribute block content
     */
    private parseAttributes(content: string): string[] {
        const attrs: string[] = [];
        let current = '';
        let parenDepth = 0;
        let angleDepth = 0;
        let bracketDepth = 0;
        
        for (let i = 0; i < content.length; i++) {
            const char = content[i];
            
            if (char === '(') parenDepth++;
            else if (char === ')') parenDepth--;
            else if (char === '<') angleDepth++;
            else if (char === '>') angleDepth--;
            else if (char === '[') bracketDepth++;
            else if (char === ']') bracketDepth--;
            
            if (char === ',' && parenDepth === 0 && angleDepth === 0 && bracketDepth === 0) {
                const trimmed = current.trim();
                if (trimmed) attrs.push(trimmed);
                current = '';
            } else {
                current += char;
            }
        }
        
        const trimmed = current.trim();
        if (trimmed) attrs.push(trimmed);
        
        return attrs;
    }

    /**
     * Format a single attribute with proper spacing
     */
    private formatAttribute(attr: string): string {
        // Normalize whitespace
        attr = attr.replace(/\s+/g, ' ').trim();
        
        // Space after commas in parameter lists
        attr = attr.replace(/,(?!\s)/g, ', ');
        
        // Handle attributes with parentheses: uuid(...)
        const parenMatch = attr.match(/^(\w+)\s*\((.*)\)$/);
        if (parenMatch) {
            const name = parenMatch[1];
            const params = parenMatch[2].trim();
            
            // Format nested content
            const formattedParams = this.formatAttributeParams(params);
            return `${name}(${formattedParams})`;
        }
        
        return attr;
    }

    /**
     * Format attribute parameters
     */
    private formatAttributeParams(params: string): string {
        // Handle GUIDs specially - keep them compact
        if (/^[0-9a-fA-F-]+$/.test(params.replace(/\s/g, ''))) {
            return params.replace(/\s+/g, '');
        }
        
        // Handle nested arrays/lists
        if (params.includes('[')) {
            return params.replace(/\s+/g, ' ').trim();
        }
        
        // Space after commas
        return params.replace(/,/g, ', ').replace(/\s+/g, ' ').trim();
    }

    /**
     * Check if a statement is a member declaration (method, property, field)
     */
    private isMemberDeclaration(stmt: string): boolean {
        // Check for HRESULT, void, property attributes, or type names followed by identifier
        return /^(HRESULT|void|long|short|int|double|float|byte|boolean|char|wchar_t|error_status_t)\b/.test(stmt) ||
               /\b(propget|propput|propputref)\b/.test(stmt);
    }
}

export class MidlRangeFormatter implements vscode.DocumentRangeFormattingEditProvider {
    private formatter: MidlDocumentFormatter;
    
    constructor() {
        this.formatter = new MidlDocumentFormatter();
    }
    
    provideDocumentRangeFormattingEdits(
        document: vscode.TextDocument,
        range: vscode.Range,
        options: vscode.FormattingOptions,
        token: vscode.CancellationToken
    ): vscode.TextEdit[] {
        // For range formatting, format the entire document for consistency
        // (partial formatting can lead to inconsistent indentation)
        return this.formatter.provideDocumentFormattingEdits(document, options, token);
    }
}
