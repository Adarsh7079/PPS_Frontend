var _ArabicShapeRenderer = /** @class */ (function () {
    /**
     * Creates an instance of the 'ArabicShapeRenderer' class.
     *
     * @private
     */
    function _ArabicShapeRenderer() {
        this._arabicCharTable = [['\u0621', '\uFE80'], ['\u0622', '\uFE81', '\uFE82'], ['\u0623', '\uFE83', '\uFE84'],
            ['\u0624', '\uFE85', '\uFE86'], ['\u0625', '\uFE87', '\uFE88'], ['\u0626', '\uFE89', '\uFE8A', '\uFE8B', '\uFE8C'],
            ['\u0627', '\uFE8D', '\uFE8E'], ['\u0628', '\uFE8F', '\uFE90', '\uFE91', '\uFE92'], ['\u0629', '\uFE93', '\uFE94'],
            ['\u062A', '\uFE95', '\uFE96', '\uFE97', '\uFE98'], ['\u062B', '\uFE99', '\uFE9A', '\uFE9B', '\uFE9C'],
            ['\u062C', '\uFE9D', '\uFE9E', '\uFE9F', '\uFEA0'], ['\u062D', '\uFEA1', '\uFEA2', '\uFEA3', '\uFEA4'],
            ['\u062E', '\uFEA5', '\uFEA6', '\uFEA7', '\uFEA8'], ['\u062F', '\uFEA9', '\uFEAA'], ['\u0630', '\uFEAB', '\uFEAC'],
            ['\u0631', '\uFEAD', '\uFEAE'], ['\u0632', '\uFEAF', '\uFEB0'], ['\u0633', '\uFEB1', '\uFEB2', '\uFEB3', '\uFEB4'],
            ['\u0634', '\uFEB5', '\uFEB6', '\uFEB7', '\uFEB8'], ['\u0635', '\uFEB9', '\uFEBA', '\uFEBB', '\uFEBC'],
            ['\u0636', '\uFEBD', '\uFEBE', '\uFEBF', '\uFEC0'], ['\u0637', '\uFEC1', '\uFEC2', '\uFEC3', '\uFEC4'],
            ['\u0638', '\uFEC5', '\uFEC6', '\uFEC7', '\uFEC8'], ['\u0639', '\uFEC9', '\uFECA', '\uFECB', '\uFECC'],
            ['\u063A', '\uFECD', '\uFECE', '\uFECF', '\uFED0'], ['\u0640', '\u0640', '\u0640', '\u0640', '\u0640'],
            ['\u0641', '\uFED1', '\uFED2', '\uFED3', '\uFED4'], ['\u0642', '\uFED5', '\uFED6', '\uFED7', '\uFED8'],
            ['\u0643', '\uFED9', '\uFEDA', '\uFEDB', '\uFEDC'], ['\u0644', '\uFEDD', '\uFEDE', '\uFEDF', '\uFEE0'],
            ['\u0645', '\uFEE1', '\uFEE2', '\uFEE3', '\uFEE4'], ['\u0646', '\uFEE5', '\uFEE6', '\uFEE7', '\uFEE8'],
            ['\u0647', '\uFEE9', '\uFEEA', '\uFEEB', '\uFEEC'], ['\u0648', '\uFEED', '\uFEEE'],
            ['\u0649', '\uFEEF', '\uFEF0', '\uFBE8', '\uFBE9'], ['\u064A', '\uFEF1', '\uFEF2', '\uFEF3', '\uFEF4'],
            ['\u0671', '\uFB50', '\uFB51'], ['\u0679', '\uFB66', '\uFB67', '\uFB68', '\uFB69'],
            ['\u067A', '\uFB5E', '\uFB5F', '\uFB60', '\uFB61'], ['\u067B', '\uFB52', '\uFB53', '\uFB54', '\uFB55'],
            ['\u067E', '\uFB56', '\uFB57', '\uFB58', '\uFB59'], ['\u067F', '\uFB62', '\uFB63', '\uFB64', '\uFB65'],
            ['\u0680', '\uFB5A', '\uFB5B', '\uFB5C', '\uFB5D'], ['\u0683', '\uFB76', '\uFB77', '\uFB78', '\uFB79'],
            ['\u0684', '\uFB72', '\uFB73', '\uFB74', '\uFB75'], ['\u0686', '\uFB7A', '\uFB7B', '\uFB7C', '\uFB7D'],
            ['\u0687', '\uFB7E', '\uFB7F', '\uFB80', '\uFB81'], ['\u0688', '\uFB88', '\uFB89'], ['\u068C', '\uFB84', '\uFB85'],
            ['\u068D', '\uFB82', '\uFB83'], ['\u068E', '\uFB86', '\uFB87'], ['\u0691', '\uFB8C', '\uFB8D'], ['\u0698', '\uFB8A', '\uFB8B'],
            ['\u06A4', '\uFB6A', '\uFB6B', '\uFB6C', '\uFB6D'], ['\u06A6', '\uFB6E', '\uFB6F', '\uFB70', '\uFB71'],
            ['\u06A9', '\uFB8E', '\uFB8F', '\uFB90', '\uFB91'], ['\u06AD', '\uFBD3', '\uFBD4', '\uFBD5', '\uFBD6'],
            ['\u06AF', '\uFB92', '\uFB93', '\uFB94', '\uFB95'], ['\u06B1', '\uFB9A', '\uFB9B', '\uFB9C', '\uFB9D'],
            ['\u06B3', '\uFB96', '\uFB97', '\uFB98', '\uFB99'], ['\u06BA', '\uFB9E', '\uFB9F'],
            ['\u06BB', '\uFBA0', '\uFBA1', '\uFBA2', '\uFBA3'], ['\u06BE', '\uFBAA', '\uFBAB', '\uFBAC', '\uFBAD'],
            ['\u06C0', '\uFBA4', '\uFBA5'], ['\u06C1', '\uFBA6', '\uFBA7', '\uFBA8', '\uFBA9'], ['\u06C5', '\uFBE0', '\uFBE1'],
            ['\u06C6', '\uFBD9', '\uFBDA'], ['\u06C7', '\uFBD7', '\uFBD8'], ['\u06C8', '\uFBDB', '\uFBDC'], ['\u06C9', '\uFBE2', '\uFBE3'],
            ['\u06CB', '\uFBDE', '\uFBDF'], ['\u06CC', '\uFBFC', '\uFBFD', '\uFBFE', '\uFBFF'],
            ['\u06D0', '\uFBE4', '\uFBE5', '\uFBE6', '\uFBE7'], ['\u06D2', '\uFBAE', '\uFBAF'], ['\u06D3', '\uFBB0', '\uFBB1']
        ];
        this._alef = '\u0627';
        this._alefHamza = '\u0623';
        this._alefHamzaBelow = '\u0625';
        this._alefMadda = '\u0622';
        this._lam = '\u0644';
        this._hamza = '\u0621';
        this._zeroWidthJoiner = '\u200D';
        this._hamzaAbove = '\u0654';
        this._hamzaBelow = '\u0655';
        this._wawHamza = '\u0624';
        this._yehHamza = '\u0626';
        this._waw = '\u0648';
        this._alefsura = '\u0649';
        this._yeh = '\u064A';
        this._farsiYeh = '\u06CC';
        this._shadda = '\u0651';
        this._madda = '\u0653';
        this._lwa = '\uFEFB';
        this._lwawh = '\uFEF7';
        this._lwawhb = '\uFEF9';
        this._lwawm = '\uFEF5';
        this._bwhb = '\u06D3';
        this._fathatan = '\u064B';
        this._superalef = '\u0670';
        this._vowel = 0x1;
        this._arabicMapTable = new Map();
        for (var i = 0; i < this._arabicCharTable.length; i++) {
            this._arabicMapTable.set(this._arabicCharTable[Number.parseInt(i.toString(), 10)][0], this._arabicCharTable[Number.parseInt(i.toString(), 10)]);
        }
    }
    _ArabicShapeRenderer.prototype._getCharacterShape = function (input, index) {
        if ((input >= this._hamza) && (input <= this._bwhb)) {
            var value = [];
            if (this._arabicMapTable.get(input)) {
                value = this._arabicMapTable.get(input);
                return value[index + 1];
            }
        }
        else if (input >= this._lwawm && input <= this._lwa) {
            return (input);
        }
        return input;
    };
    _ArabicShapeRenderer.prototype._shape = function (text) {
        var builder = '';
        var value = '';
        for (var i = 0; i < text.length; i++) {
            var c = text[Number.parseInt(i.toString(), 10)];
            if (c >= '؀' && c <= 'ۿ') {
                value = value + c;
            }
            else {
                if (value.length > 0) {
                    var shapeText = this._doShape(value.toString(), 0);
                    builder = builder + shapeText;
                    value = '';
                }
                builder = builder + c;
            }
        }
        if (value.length > 0) {
            var shapeText = this._doShape(value.toString(), 0);
            builder = builder + shapeText;
        }
        return builder.toString();
    };
    _ArabicShapeRenderer.prototype._doShape = function (input, level) {
        var str = '';
        var ligature = 0;
        var len = 0;
        var i = 0;
        var next = '';
        var previous = new _ArabicShape();
        var present = new _ArabicShape();
        while (i < input.length) {
            next = input[i++];
            ligature = this._ligature(next, present);
            if (ligature === 0) {
                var shapeCount = this._getShapeCount(next);
                len = (shapeCount === 1) ? 0 : 2;
                if (previous._shapes > 2) {
                    len += 1;
                }
                len = len % (present._shapes);
                present._shapeValue = this._getCharacterShape(present._shapeValue, len);
                str = this._append(str, previous, level);
                previous = present;
                present = new _ArabicShape();
                present._shapeValue = next;
                present._shapes = shapeCount;
                present._shapeLigature++;
            }
        }
        len = (previous._shapes > 2) ? 1 : 0;
        len = len % (present._shapes);
        present._shapeValue = this._getCharacterShape(present._shapeValue, len);
        str = this._append(str, previous, level);
        str = this._append(str, present, level);
        return str.toString();
    };
    _ArabicShapeRenderer.prototype._append = function (builder, shape, level) {
        if (shape._shapeValue !== '') {
            builder = builder + shape._shapeValue;
            shape._shapeLigature -= 1;
            if (shape._shapeType !== '') {
                if ((level & this._vowel) === 0) {
                    builder = builder + shape._shapeType;
                    shape._shapeLigature -= 1;
                }
                else {
                    shape._shapeLigature -= 1;
                }
            }
            if (shape._shapeVowel !== '') {
                if ((level & this._vowel) === 0) {
                    builder = builder + shape._shapeVowel;
                    shape._shapeLigature -= 1;
                }
                else {
                    shape._shapeLigature -= 1;
                }
            }
        }
        return builder;
    };
    _ArabicShapeRenderer.prototype._ligature = function (value, shape) {
        if (shape._shapeValue !== '') {
            var result = 0;
            if ((value >= this._fathatan && value <= this._hamzaBelow) || value === this._superalef) {
                result = 1;
                if ((shape._shapeVowel !== '') && (value !== this._shadda)) {
                    result = 2;
                }
                if (value === this._shadda) {
                    if (shape._shapeType === '') {
                        shape._shapeType = this._shadda;
                    }
                    else {
                        return 0;
                    }
                }
                else if (value === this._hamzaBelow) {
                    if (shape._shapeValue === this._alef) {
                        shape._shapeValue = this._alefHamzaBelow;
                        result = 2;
                    }
                    else if (shape._shapeValue === this._lwa) {
                        shape._shapeValue = this._lwawhb;
                        result = 2;
                    }
                    else {
                        shape._shapeType = this._hamzaBelow;
                    }
                }
                else if (value === this._hamzaAbove) {
                    if (shape._shapeValue === this._alef) {
                        shape._shapeValue = this._alefHamza;
                        result = 2;
                    }
                    else if (shape._shapeValue === this._lwa) {
                        shape._shapeValue = this._lwawh;
                        result = 2;
                    }
                    else if (shape._shapeValue === this._waw) {
                        shape._shapeValue = this._wawHamza;
                        result = 2;
                    }
                    else if (shape._shapeValue === this._yeh || shape._shapeValue === this._alefsura ||
                        shape._shapeValue === this._farsiYeh) {
                        shape._shapeValue = this._yehHamza;
                        result = 2;
                    }
                    else {
                        shape._shapeType = this._hamzaAbove;
                    }
                }
                else if (value === this._madda) {
                    if (shape._shapeValue === this._alef) {
                        shape._shapeValue = this._alefMadda;
                        result = 2;
                    }
                }
                else {
                    shape._shapeVowel = value;
                }
                if (result === 1) {
                    shape._shapeLigature++;
                }
                return result;
            }
            if (shape._shapeVowel !== '') {
                return 0;
            }
            if (shape._shapeValue === this._lam) {
                if (value === this._alef) {
                    shape._shapeValue = this._lwa;
                    shape._shapes = 2;
                    result = 3;
                }
                else if (value === this._alefHamza) {
                    shape._shapeValue = this._lwawh;
                    shape._shapes = 2;
                    result = 3;
                }
                else if (value === this._alefHamzaBelow) {
                    shape._shapeValue = this._lwawhb;
                    shape._shapes = 2;
                    result = 3;
                }
                else if (value === this._alefMadda) {
                    shape._shapeValue = this._lwawm;
                    shape._shapes = 2;
                    result = 3;
                }
            }
            return result;
        }
        else {
            return 0;
        }
    };
    _ArabicShapeRenderer.prototype._getShapeCount = function (shape) {
        if ((shape >= this._hamza) && (shape <= this._bwhb) && !((shape >= this._fathatan && shape <= this._hamzaBelow)
            || shape === this._superalef)) {
            var c = [];
            if (this._arabicMapTable.get(shape)) {
                c = this._arabicMapTable.get(shape);
                return c.length - 1;
            }
        }
        else if (shape === this._zeroWidthJoiner) {
            return 4;
        }
        return 1;
    };
    return _ArabicShapeRenderer;
}());
export { _ArabicShapeRenderer };
var _ArabicShape = /** @class */ (function () {
    function _ArabicShape() {
        this._shapeValue = '';
        this._shapeType = '';
        this._shapeVowel = '';
        this._shapeLigature = 0;
        this._shapes = 1;
    }
    return _ArabicShape;
}());
export { _ArabicShape };
