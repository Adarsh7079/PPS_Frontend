import { PdfStringFormat } from './../../fonts/pdf-string-format';
import { PdfTrueTypeFont, _UnicodeLine } from './../../fonts/pdf-standard-font';
export declare class _RtlRenderer {
    _openBracket: string;
    _closeBracket: string;
    _layout(line: string, font: PdfTrueTypeFont, rtl: boolean, wordSpace: boolean, format: PdfStringFormat): string[];
    _splitLayout(line: string, font: PdfTrueTypeFont, rtl: boolean, wordSpace: boolean, format: PdfStringFormat): string[];
    _getGlyphIndex(line: string, font: PdfTrueTypeFont, glyphs: number[]): _UnicodeLine;
    _customLayout(line: string, rtl: boolean, format: PdfStringFormat): string;
    _customLayout(line: string, rtl: boolean, format: PdfStringFormat, font: PdfTrueTypeFont, wordSpace: boolean): string[];
    _addCharacter(font: PdfTrueTypeFont, glyphs: string): string;
    _customSplitLayout(line: string, font: PdfTrueTypeFont, rtl: boolean, wordSpace: boolean, format: PdfStringFormat): string[];
}
