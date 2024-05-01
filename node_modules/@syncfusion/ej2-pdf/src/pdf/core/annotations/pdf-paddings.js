var _PdfPaddings = /** @class */ (function () {
    function _PdfPaddings(left, top, right, bottom) {
        this._left = 0;
        this._right = 0;
        this._top = 0;
        this._bottom = 0;
        if (typeof left === 'undefined') {
            this._left = 0.5;
            this._right = 0.5;
            this._top = 0.5;
            this._bottom = 0.5;
        }
        else {
            this._left = left;
            this._right = right;
            this._top = top;
            this._bottom = bottom;
        }
    }
    return _PdfPaddings;
}());
export { _PdfPaddings };
