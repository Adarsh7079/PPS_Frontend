import { _UnicodeLine } from './../../fonts/pdf-standard-font';
import { _ArabicShapeRenderer } from './../../graphics/rightToLeft/text-shape';
import { _Bidirectional } from './../../graphics/rightToLeft/bidirectional';
import { PdfTextDirection } from './../../enumerator';
import { _stringToUnicodeArray, _bytesToString } from './../../utils';
var _RtlRenderer = /** @class */ (function () {
    function _RtlRenderer() {
        this._openBracket = '(';
        this._closeBracket = ')';
    }
    _RtlRenderer.prototype._layout = function (line, font, rtl, wordSpace, format) {
        var result = [];
        if (font !== null && typeof font !== 'undefined' && line !== null && typeof line !== 'undefined') {
            if (font._isUnicode) {
                result = this._customLayout(line, rtl, format, font, wordSpace);
            }
            else {
                result = [];
                result[0] = line;
            }
        }
        return result;
    };
    _RtlRenderer.prototype._splitLayout = function (line, font, rtl, wordSpace, format) {
        var words = [];
        if (font !== null && typeof font !== 'undefined' && line !== null && typeof line !== 'undefined') {
            var system = false;
            if (!system) {
                words = this._customSplitLayout(line, font, rtl, wordSpace, format);
            }
        }
        return words;
    };
    _RtlRenderer.prototype._getGlyphIndex = function (line, font, glyphs) {
        glyphs = [];
        if (font !== null && typeof font !== 'undefined' && line !== null && typeof line !== 'undefined') {
            if (line.length === 0) {
                return { _result: false, _glyphIndex: glyphs };
            }
            var renderer = new _ArabicShapeRenderer();
            var text = renderer._shape(line);
            var internalFont = font._fontInternal;
            var ttfReader = internalFont._ttfReader;
            glyphs = [text.length];
            var i = 0;
            for (var k = 0, len = text.length; k < len; k++) {
                var ch = text[Number.parseInt(k.toString(), 10)];
                var glyphInfo = ttfReader._getGlyph(ch);
                if (glyphInfo !== null && typeof glyphInfo !== 'undefined') {
                    glyphs[i++] = (glyphInfo)._index;
                }
            }
        }
        var unicodeLine = new _UnicodeLine();
        unicodeLine._result = true;
        unicodeLine._glyphIndex = glyphs;
        return unicodeLine;
    };
    _RtlRenderer.prototype._customLayout = function (line, rtl, format, font, wordSpace) {
        if (wordSpace === null || typeof wordSpace === 'undefined') {
            var result = null;
            if (line !== null && typeof line !== 'undefined') {
                if (format !== null && typeof format !== 'undefined' && format.textDirection !== PdfTextDirection.none) {
                    var bidi = new _Bidirectional();
                    result = bidi._getLogicalToVisualString(line, rtl);
                }
            }
            return result;
        }
        else {
            var layouted = '';
            var result = [];
            if (line !== null && typeof line !== 'undefined' && font !== null && typeof font !== 'undefined') {
                if (format !== null && typeof format !== 'undefined' && format.textDirection !== PdfTextDirection.none) {
                    var renderer = new _ArabicShapeRenderer();
                    var txt = renderer._shape(line);
                    layouted = this._customLayout(txt, rtl, format);
                }
                if (wordSpace) {
                    var words = layouted.split('');
                    var count = words.length;
                    for (var i = 0; i < count; i++) {
                        words[Number.parseInt(i.toString(), 10)] = this._addCharacter(font, words[Number.parseInt(i.toString(), 10)]);
                    }
                    result = words;
                }
                else {
                    result = [];
                    result[0] = this._addCharacter(font, layouted);
                }
            }
            return result;
        }
    };
    _RtlRenderer.prototype._addCharacter = function (font, glyphs) {
        if (font !== null && typeof font !== 'undefined' && glyphs !== null && typeof glyphs !== 'undefined') {
            var internalFont = font._fontInternal;
            var ttfReader = internalFont._ttfReader;
            font._setSymbols(glyphs);
            glyphs = ttfReader._convertString(glyphs);
            var bytes = _stringToUnicodeArray(glyphs);
            glyphs = _bytesToString(bytes);
        }
        return glyphs;
    };
    _RtlRenderer.prototype._customSplitLayout = function (line, font, rtl, wordSpace, format) {
        var words = [];
        if (line !== null && typeof line !== 'undefined') {
            var reversedLine = this._customLayout(line, rtl, format);
            words = reversedLine.split('');
        }
        return words;
    };
    return _RtlRenderer;
}());
export { _RtlRenderer };
