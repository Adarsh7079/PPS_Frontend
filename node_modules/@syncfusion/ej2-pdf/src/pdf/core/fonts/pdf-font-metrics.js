var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { PdfSubSuperScript } from './../enumerator';
var _PdfFontMetrics = /** @class */ (function () {
    function _PdfFontMetrics() {
        this._lineGap = 0;
    }
    _PdfFontMetrics.prototype._getAscent = function (format) {
        return this._ascent * 0.001 * this._getSize(format);
    };
    _PdfFontMetrics.prototype._getDescent = function (format) {
        return this._descent * 0.001 * this._getSize(format);
    };
    _PdfFontMetrics.prototype._getLineGap = function (format) {
        return this._lineGap * 0.001 * this._getSize(format);
    };
    _PdfFontMetrics.prototype._getHeight = function (format) {
        var height;
        var clearTypeFonts = ['cambria', 'candara', 'constantia', 'corbel', 'cariadings'];
        var clearTypeFontCollection = [];
        for (var index = 0; index < clearTypeFonts.length; index++) {
            clearTypeFontCollection.push(clearTypeFonts[Number.parseInt(index.toString(), 10)]);
        }
        if (this._getDescent(format) < 0) {
            height = (this._getAscent(format) - this._getDescent(format) + this._getLineGap(format));
        }
        else {
            height = (this._getAscent(format) + this._getDescent(format) + this._getLineGap(format));
        }
        return height;
    };
    _PdfFontMetrics.prototype._getSize = function (format) {
        var size = this._size;
        if (format !== null && typeof format !== 'undefined') {
            switch (format.subSuperScript) {
                case PdfSubSuperScript.subScript:
                    size /= this._subScriptSizeFactor;
                    break;
                case PdfSubSuperScript.superScript:
                    size /= this._superscriptSizeFactor;
                    break;
            }
        }
        return size;
    };
    return _PdfFontMetrics;
}());
export { _PdfFontMetrics };
var _WidthTable = /** @class */ (function () {
    function _WidthTable() {
    }
    return _WidthTable;
}());
export { _WidthTable };
var _StandardWidthTable = /** @class */ (function (_super) {
    __extends(_StandardWidthTable, _super);
    function _StandardWidthTable(widths) {
        var _this = _super.call(this) || this;
        _this.widths = widths;
        return _this;
    }
    _StandardWidthTable.prototype._itemAt = function (index) {
        if (index < 0 || index >= this.widths.length) {
            throw new Error('The character is not supported by the font.');
        }
        return this.widths[Number.parseInt(index.toString(), 10)];
    };
    _StandardWidthTable.prototype._toArray = function () {
        return this.widths;
    };
    return _StandardWidthTable;
}(_WidthTable));
export { _StandardWidthTable };
var _CjkWidthTable = /** @class */ (function (_super) {
    __extends(_CjkWidthTable, _super);
    function _CjkWidthTable(defaultWidth) {
        var _this = _super.call(this) || this;
        _this._defaultWidth = defaultWidth;
        _this.widths = [];
        return _this;
    }
    _CjkWidthTable.prototype._itemAt = function (index) {
        var width = this._defaultWidth;
        this.widths.forEach(function (entry) {
            if (index >= entry._from && index <= entry._to) {
                width = entry._itemAt(index);
            }
        });
        return width;
    };
    _CjkWidthTable.prototype._toArray = function () {
        var array = [];
        this.widths.forEach(function (width) {
            width._appendToArray(array);
        });
        return array;
    };
    _CjkWidthTable.prototype._add = function (width) {
        this.widths.push(width);
    };
    return _CjkWidthTable;
}(_WidthTable));
export { _CjkWidthTable };
var _CjkWidth = /** @class */ (function () {
    function _CjkWidth() {
    }
    return _CjkWidth;
}());
export { _CjkWidth };
var _CjkSameWidth = /** @class */ (function (_super) {
    __extends(_CjkSameWidth, _super);
    function _CjkSameWidth(from, to, width) {
        var _this = _super.call(this) || this;
        _this._widthFrom = from;
        _this._widthTo = to;
        _this._width = width;
        return _this;
    }
    Object.defineProperty(_CjkSameWidth.prototype, "_from", {
        get: function () {
            return this._widthFrom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_CjkSameWidth.prototype, "_to", {
        get: function () {
            return this._widthTo;
        },
        enumerable: true,
        configurable: true
    });
    _CjkSameWidth.prototype._itemAt = function (index) {
        if (index < this._from || index > this._to) {
            throw new Error('Index is out of range.');
        }
        return this._width;
    };
    _CjkSameWidth.prototype._appendToArray = function (array) {
        array.push(this._from, this._to, this._width);
    };
    return _CjkSameWidth;
}(_CjkWidth));
export { _CjkSameWidth };
var _CjkDifferentWidth = /** @class */ (function (_super) {
    __extends(_CjkDifferentWidth, _super);
    function _CjkDifferentWidth(from, widths) {
        var _this = _super.call(this) || this;
        _this._widthFrom = from;
        _this._widths = widths;
        return _this;
    }
    Object.defineProperty(_CjkDifferentWidth.prototype, "_from", {
        get: function () {
            return this._widthFrom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_CjkDifferentWidth.prototype, "_to", {
        get: function () {
            return this._widthFrom + this._widths.length - 1;
        },
        enumerable: true,
        configurable: true
    });
    _CjkDifferentWidth.prototype._itemAt = function (index) {
        if (index < this._widthFrom || index > this._to) {
            throw new Error('Index is out of range.');
        }
        return this._widths[Number.parseInt(index.toString(), 10)];
    };
    _CjkDifferentWidth.prototype._appendToArray = function (array) {
        array.push(this._from);
        array.forEach(function (entry) {
            array.push(entry);
        });
    };
    return _CjkDifferentWidth;
}(_CjkWidth));
export { _CjkDifferentWidth };
