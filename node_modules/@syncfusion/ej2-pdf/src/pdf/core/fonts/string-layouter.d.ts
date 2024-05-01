import { PdfStringFormat } from './pdf-string-format';
import { PdfFont } from './pdf-standard-font';
import { _PdfWordWrapType } from './../enumerator';
export declare class _PdfStringLayouter {
    _font: PdfFont;
    _format: PdfStringFormat;
    _size: number[];
    _rectangle: number[];
    _pageHeight: number;
    _reader: _StringTokenizer;
    _layout(text: string, font: PdfFont, format: PdfStringFormat, size: number[]): _PdfStringLayoutResult;
    _initialize(text: string, font: PdfFont, format: PdfStringFormat, size: number[]): void;
    _clear(): void;
    _doLayout(): _PdfStringLayoutResult;
    _getLineIndent(firstLine: boolean): number;
    _getLineHeight(): number;
    _getLineWidth(line: string): number;
    _layoutLine(line: string, lineIndent: number): _PdfStringLayoutResult;
    _addToLineResult(lineResult: _PdfStringLayoutResult, lines: _LineInfo[], line: string, lineWidth: number, breakType: _LineType): void;
    _copyToResult(result: _PdfStringLayoutResult, lineResult: _PdfStringLayoutResult, lines: _LineInfo[], flag: number): {
        success: boolean;
        flag: number;
    };
    _finalizeResult(result: _PdfStringLayoutResult, lines: _LineInfo[]): void;
    _trimLine(info: _LineInfo, firstLine: boolean): _LineInfo;
    _getWrapType(): _PdfWordWrapType;
}
export declare class _PdfStringLayoutResult {
    _layoutLines: _LineInfo[];
    _remainder: string;
    _size: number[];
    _lineHeight: number;
    readonly _actualSize: number[];
    readonly _lines: _LineInfo[];
    readonly _empty: boolean;
    readonly _lineCount: number;
}
export declare class _LineInfo {
    _text: string;
    _width: number;
    _lineType: _LineType;
}
export declare enum _LineType {
    none = 0,
    newLineBreak = 1,
    layoutBreak = 2,
    firstParagraphLine = 4,
    lastParagraphLine = 8
}
export declare class _StringTokenizer {
    _text: string;
    _position: number;
    static readonly _whiteSpace: string;
    static readonly _tab: string;
    static readonly _spaces: string[];
    constructor(textValue: string);
    readonly _length: number;
    readonly _end: boolean;
    _readLine(): string;
    _peekLine(): string;
    _readWord(): string;
    _peekWord(): string;
    _read(): string;
    _read(count: number): string;
    _peek(): string;
    _close(): void;
    _readToEnd(): string;
}
