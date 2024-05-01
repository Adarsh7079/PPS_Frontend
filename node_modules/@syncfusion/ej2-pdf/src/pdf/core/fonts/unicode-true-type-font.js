import { _TrueTypeReader } from './ttf-reader';
import { _PdfDictionary, _PdfName, Dictionary } from './../pdf-primitives';
import { _PdfFontMetrics } from './pdf-font-metrics';
import { _StandardWidthTable } from './pdf-font-metrics';
import { _FontDescriptorFlag } from '../enumerator';
import { _decode } from '../utils';
import { _PdfStream } from './../base-stream';
var _UnicodeTrueTypeFont = /** @class */ (function () {
    function _UnicodeTrueTypeFont(base64String, size) {
        this._nameString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this._isEmbedFont = false;
        this._cmapPrefix = '/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap' + '\r\n' + '/CIDSystemInfo << /Registry (Adobe)/Ordering (UCS)/Supplement 0>> def\n/CMapName ' + '/Adobe-Identity-UCS def\n/CMapType 2 def\n1 beginCodeSpacerange' + '\r\n';
        this._cmapEndCodeSpaceRange = 'endCodeSpacerange' + '\r\n';
        this._cmapBeginRange = 'beginbfrange' + '\r\n';
        this._cmapEndRange = 'endbfrange' + '\r\n';
        this._cmapSuffix = 'endbfrange\nendcmap\nCMapName currentdict ' + '/CMap defineresource pop\nend end' + '\r\n';
        if (base64String === null || typeof base64String === 'undefined') {
            throw new Error('ArgumentNullException:base64String');
        }
        this._fontSize = size;
        this._fontString = base64String;
        this._Initialize();
    }
    _UnicodeTrueTypeFont.prototype._beginSave = function () {
        this._descendantFontBeginSave();
        this._cmapBeginSave();
        this._fontDictionaryBeginSave();
        this._fontProgramBeginSave();
        if (this._fontDescriptor) {
            this._fontDescriptor.update('FontFile2', this._fontProgram);
            this._fontDescriptor._updated = true;
            this._fontDescriptor._isFont = true;
        }
    };
    _UnicodeTrueTypeFont.prototype._descendantFontBeginSave = function () {
        if (this._usedChars !== null && typeof this._usedChars !== 'undefined' && this._usedChars._size() > 0) {
            var width = this._getDescendantWidth(); // eslint-disable-line
            if (width !== null) {
                this._descendantFont.set('W', width);
            }
        }
    };
    _UnicodeTrueTypeFont.prototype._fontDictionaryBeginSave = function () {
        if (this._usedChars !== null && typeof this._usedChars !== 'undefined' && this._usedChars._size() > 0) {
            this._fontDictionary.update('ToUnicode', this._cmap);
        }
    };
    _UnicodeTrueTypeFont.prototype._Initialize = function () {
        var byteArray = _decode(this._fontString);
        this._fontData = byteArray;
        this._ttfReader = new _TrueTypeReader(this._fontData);
        this._ttfMetrics = this._ttfReader._metrics;
    };
    _UnicodeTrueTypeFont.prototype._createInternals = function () {
        this._fontDictionary = new _PdfDictionary();
        this._descendantFont = new _PdfDictionary();
        this._metrics = new _PdfFontMetrics();
        this._ttfReader._createInternals();
        this._usedChars = null;
        var data = []; // eslint-disable-line
        this._fontProgram = new _PdfStream(data, new _PdfDictionary());
        this._cmap = new _PdfStream(data, new _PdfDictionary());
        this._ttfMetrics = this._ttfReader._metrics;
        this._initializeMetrics();
        this._subsetName = this._getFontName();
        this._createDescendantFont();
        this._createFontDictionary();
    };
    _UnicodeTrueTypeFont.prototype._getInternals = function () {
        return this._fontDictionary;
    };
    _UnicodeTrueTypeFont.prototype._initializeMetrics = function () {
        var ttfMetrics = this._ttfReader._metrics;
        this._metrics._ascent = ttfMetrics._macAscent;
        this._metrics._descent = ttfMetrics._macDescent;
        this._metrics._height = ttfMetrics._macAscent - ttfMetrics._macDescent + ttfMetrics._lineGap;
        this._metrics._name = ttfMetrics._fontFamily;
        this._metrics._postScriptName = ttfMetrics._postScriptName;
        this._metrics._size = this._fontSize;
        this._metrics._widthTable = new _StandardWidthTable(ttfMetrics._widthTable);
        this._metrics._lineGap = ttfMetrics._lineGap;
        this._metrics._subScriptSizeFactor = ttfMetrics._subScriptSizeFactor;
        this._metrics._superscriptSizeFactor = ttfMetrics._superscriptSizeFactor;
        this._metrics._isBold = ttfMetrics._isBold;
    };
    _UnicodeTrueTypeFont.prototype._getFontName = function () {
        var builder = '';
        for (var i = 0; i < 6; i++) {
            var index = Math.floor(Math.random() * (25 - 0 + 1)) + 0;
            builder += this._nameString[Number.parseInt(index.toString(), 10)];
        }
        builder += '+';
        builder += this._ttfReader._metrics._postScriptName;
        return builder.toString();
    };
    _UnicodeTrueTypeFont.prototype._createDescendantFont = function () {
        this._descendantFont = new _PdfDictionary();
        this._descendantFont._updated = true;
        this._descendantFont.set('Type', new _PdfName('Font'));
        this._descendantFont.set('Subtype', new _PdfName('CIDFontType2'));
        this._descendantFont.set('BaseFont', new _PdfName(this._subsetName));
        this._descendantFont.set('CIDToGIDMap', new _PdfName('Identity'));
        this._descendantFont.set('DW', 1000);
        this._fontDescriptor = this._createFontDescriptor();
        this._descendantFont.set('FontDescriptor', this._fontDescriptor);
        var systemInfo = this._createSystemInfo();
        this._descendantFont.set('CIDSystemInfo', systemInfo);
        this._descendantFont._isFont = true;
    };
    _UnicodeTrueTypeFont.prototype._createFontDescriptor = function () {
        var descriptor = new _PdfDictionary();
        var metrics = this._ttfReader._metrics;
        descriptor.set('Type', new _PdfName('FontDescriptor'));
        descriptor.set('FontName', new _PdfName(this._subsetName));
        descriptor.set('Flags', this._getDescriptorFlags());
        descriptor.set('FontBBox', this._getBoundBox());
        descriptor.set('MissingWidth', metrics._widthTable[32]);
        descriptor.set('StemV', metrics._stemV);
        descriptor.set('ItalicAngle', metrics._italicAngle);
        descriptor.set('CapHeight', metrics._capHeight);
        descriptor.set('Ascent', metrics._winAscent);
        descriptor.set('Descent', metrics._winDescent);
        descriptor.set('Leading', metrics._leading);
        descriptor.set('AvgWidth', metrics._widthTable[32]);
        descriptor.set('MaxWidth', metrics._widthTable[32]);
        descriptor.set('XHeight', 0);
        descriptor.set('StemH', 0);
        descriptor._updated = true;
        return descriptor;
    };
    _UnicodeTrueTypeFont.prototype._generateFontProgram = function () {
        var fontProgram = [];
        this._usedChars = (this._usedChars === null || typeof this._usedChars === 'undefined') ? new Dictionary()
            : this._usedChars;
        this._ttfReader._setOffset(0);
        fontProgram = this._ttfReader._readFontProgram(this._usedChars);
        this._fontProgram._clearStream();
        this._fontProgram._writeBytes(fontProgram);
    };
    _UnicodeTrueTypeFont.prototype._getBoundBox = function () {
        var rect = this._ttfReader._metrics._fontBox;
        var width = Math.abs(rect[2] - rect[0]);
        var height = Math.abs(rect[1] - rect[3]);
        var rectangle = [rect[0], rect[3], width, height];
        return rectangle;
    };
    _UnicodeTrueTypeFont.prototype._cmapBeginSave = function () {
        this._generateCmap();
    };
    _UnicodeTrueTypeFont.prototype._fontProgramBeginSave = function () {
        this._generateFontProgram();
    };
    _UnicodeTrueTypeFont.prototype._toHexString = function (n, isCaseChange) {
        var s = n.toString(16);
        if (isCaseChange) {
            s = s.toUpperCase();
        }
        return '<0000'.substring(0, 5 - s.length) + s + '>';
    };
    _UnicodeTrueTypeFont.prototype._generateCmap = function () {
        if (this._usedChars !== null && typeof this._usedChars !== 'undefined' && this._usedChars._size() > 0) {
            var glyphChars = this._ttfReader._getGlyphChars(this._usedChars);
            if (glyphChars._size() > 0) {
                var keys = glyphChars.keys().sort();
                var first = keys[0];
                var last = keys[keys.length - 1];
                var middlePart = this._toHexString(first, false) + this._toHexString(last, false) + '\r\n';
                var builder = '';
                builder += this._cmapPrefix;
                builder += middlePart;
                builder += this._cmapEndCodeSpaceRange;
                var nextRange = 0;
                for (var i = 0; i < keys.length; i++) {
                    if (nextRange === 0) {
                        if (i !== 0) {
                            builder += this._cmapEndRange;
                        }
                        nextRange = Math.min(100, keys.length - i);
                        builder += nextRange;
                        builder += ' ';
                        builder += this._cmapBeginRange;
                    }
                    nextRange -= 1;
                    var key = keys[Number.parseInt(i.toString(), 10)];
                    builder += this._toHexString(key, true) + this._toHexString(key, true);
                    builder += this._toHexString(glyphChars.getValue(key), true) + '\n';
                }
                builder += this._cmapSuffix;
                this._cmap._clearStream();
                this._cmap._write(builder);
            }
        }
    };
    _UnicodeTrueTypeFont.prototype._createFontDictionary = function () {
        this._fontDictionary._updated = true;
        this._fontDictionary.set('Type', _PdfName.get('Font'));
        this._fontDictionary.set('Subtype', _PdfName.get('Type0'));
        this._fontDictionary.set('BaseFont', new _PdfName(this._subsetName));
        this._fontDictionary.set('Encoding', _PdfName.get('Identity-H'));
        this._fontDictionary.set('DescendantFonts', this._descendantFont);
        this._fontDictionary._isFont = true;
        this._fontDictionary._currentObj = this;
    };
    _UnicodeTrueTypeFont.prototype._createSystemInfo = function () {
        var systemInfo = new _PdfDictionary();
        systemInfo._updated = true;
        systemInfo.set('Registry', 'Adobe');
        systemInfo.set('Ordering', 'Identity');
        systemInfo.set('Supplement', 0);
        return systemInfo;
    };
    _UnicodeTrueTypeFont.prototype._getDescriptorFlags = function () {
        var flags = 0;
        var metrics = this._ttfReader._metrics;
        if (metrics._isFixedPitch) {
            flags |= _FontDescriptorFlag.fixedPitch;
        }
        if (metrics._isSymbol) {
            flags |= _FontDescriptorFlag.symbolic;
        }
        else {
            flags |= _FontDescriptorFlag.nonSymbolic;
        }
        if (metrics._isItalic) {
            flags |= _FontDescriptorFlag.italic;
        }
        if (metrics._isBold) {
            flags |= _FontDescriptorFlag.forceBold;
        }
        return flags;
    };
    _UnicodeTrueTypeFont.prototype._getCharacterWidth = function (charCode) {
        var codeWidth = this._ttfReader._getCharacterWidth(charCode);
        return codeWidth;
    };
    _UnicodeTrueTypeFont.prototype._setSymbols = function (text) {
        if (text !== null && typeof text !== 'undefined') {
            if (this._usedChars === null || typeof this._usedChars === 'undefined') {
                this._usedChars = new Dictionary();
            }
            for (var i = 0; i < text.length; i++) {
                var ch = text[Number.parseInt(i.toString(), 10)];
                this._usedChars.setValue(ch, String.fromCharCode(0));
            }
        }
    };
    _UnicodeTrueTypeFont.prototype._getDescendantWidth = function () {
        var array = new Array(); // eslint-disable-line
        if (this._usedChars !== null && typeof this._usedChars !== 'undefined' && this._usedChars._size() > 0) {
            var glyphInfo = [];
            var keys = this._usedChars.keys();
            for (var i = 0; i < keys.length; i++) {
                var chLen = keys[Number.parseInt(i.toString(), 10)];
                var glyph = this._ttfReader._getGlyph(chLen);
                glyphInfo.push(glyph);
            }
            glyphInfo.sort(function (a, b) { return a._index - b._index; });
            var firstGlyphIndex = 0;
            var lastGlyphIndex = 0;
            var firstGlyphIndexWasSet = false;
            var widthDetails = new Array(); // eslint-disable-line
            for (var i = 0; i < glyphInfo.length; i++) {
                var glyph = glyphInfo[Number.parseInt(i.toString(), 10)];
                if (!firstGlyphIndexWasSet) {
                    firstGlyphIndexWasSet = true;
                    firstGlyphIndex = glyph._index;
                    lastGlyphIndex = glyph._index - 1;
                }
                if ((lastGlyphIndex + 1 !== glyph._index || (i + 1 === glyphInfo.length)) && glyphInfo.length > 1) {
                    array.push(Number(firstGlyphIndex));
                    if (i !== 0) {
                        array.push(widthDetails);
                    }
                    firstGlyphIndex = glyph._index;
                    widthDetails = new Array(); // eslint-disable-line
                }
                widthDetails.push(Number(glyph._width));
                if ((i + 1) === glyphInfo.length) {
                    array.push(Number(firstGlyphIndex));
                    array.push(widthDetails);
                }
                lastGlyphIndex = glyph._index;
            }
        }
        return array;
    };
    return _UnicodeTrueTypeFont;
}());
export { _UnicodeTrueTypeFont };
