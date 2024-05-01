import { PdfStringFormat } from './pdf-string-format';
export declare class _PdfFontMetrics {
    _ascent: number;
    _descent: number;
    _name: string;
    _postScriptName: string;
    _size: number;
    _height: number;
    _firstChar: number;
    _lastChar: number;
    _lineGap: number;
    _subScriptSizeFactor: number;
    _superscriptSizeFactor: number;
    _widthTable: _WidthTable;
    _isUnicodeFont: boolean;
    _isBold: boolean;
    _getAscent(format: PdfStringFormat): number;
    _getDescent(format: PdfStringFormat): number;
    _getLineGap(format: PdfStringFormat): number;
    _getHeight(): number;
    _getHeight(format: PdfStringFormat): number;
    _getSize(format: PdfStringFormat): number;
}
export declare abstract class _WidthTable {
    abstract _itemAt(index: number): number;
    abstract _toArray(): number[];
}
export declare class _StandardWidthTable extends _WidthTable {
    widths: number[];
    constructor(widths: number[]);
    _itemAt(index: number): number;
    _toArray(): number[];
}
export declare class _CjkWidthTable extends _WidthTable {
    widths: _CjkWidth[];
    _defaultWidth: number;
    constructor(defaultWidth: number);
    _itemAt(index: number): number;
    _toArray(): number[];
    _add(width: _CjkWidth): void;
}
export declare abstract class _CjkWidth {
    abstract readonly _from: number;
    abstract readonly _to: number;
    abstract _itemAt(index: number): number;
    abstract _appendToArray(array: number[]): void;
}
export declare class _CjkSameWidth extends _CjkWidth {
    _widthFrom: number;
    _widthTo: number;
    _width: number;
    constructor(from: number, to: number, width: number);
    readonly _from: number;
    readonly _to: number;
    _itemAt(index: number): number;
    _appendToArray(array: number[]): void;
}
export declare class _CjkDifferentWidth extends _CjkWidth {
    _widthFrom: number;
    _widths: number[];
    constructor(from: number, widths: number[]);
    readonly _from: number;
    readonly _to: number;
    _itemAt(index: number): number;
    _appendToArray(array: number[]): void;
}
