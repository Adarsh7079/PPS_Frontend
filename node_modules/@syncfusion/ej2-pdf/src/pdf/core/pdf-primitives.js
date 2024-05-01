import { _defaultToString } from './utils';
/* eslint-disable */
var nameCache = Object.create(null);
var cmdCache = Object.create(null);
var refCache = Object.create(null);
var _PdfName = /** @class */ (function () {
    function _PdfName(name) {
        this.name = name;
    }
    _PdfName.get = function (name) {
        return nameCache[name] || (nameCache[name] = new _PdfName(name));
    };
    return _PdfName;
}());
export { _PdfName };
var _PdfCommand = /** @class */ (function () {
    function _PdfCommand(command) {
        this.command = command;
    }
    _PdfCommand.get = function (command) {
        return cmdCache[command] || (cmdCache[command] = new _PdfCommand(command));
    };
    return _PdfCommand;
}());
export { _PdfCommand };
var _PdfReference = /** @class */ (function () {
    function _PdfReference(objectNumber, gen) {
        this._isNew = false;
        this.objectNumber = objectNumber;
        this.generationNumber = gen;
    }
    _PdfReference.prototype.toString = function () {
        return this.objectNumber + " " + this.generationNumber;
    };
    _PdfReference.get = function (objectNumber, generationNumber) {
        var key = generationNumber === 0 ? objectNumber + "R" : objectNumber + "R" + generationNumber;
        return refCache[key] || (refCache[key] = new _PdfReference(objectNumber, generationNumber));
    };
    return _PdfReference;
}());
export { _PdfReference };
var _PdfReferenceSet = /** @class */ (function () {
    function _PdfReferenceSet(parent) {
        if (parent === void 0) { parent = null; }
        this._set = new Set(parent && parent._set);
    }
    _PdfReferenceSet.prototype.has = function (ref) {
        return this._set.has(ref.toString());
    };
    _PdfReferenceSet.prototype.put = function (ref) {
        this._set.add(ref.toString());
    };
    _PdfReferenceSet.prototype.remove = function (ref) {
        this._set.delete(ref.toString());
    };
    _PdfReferenceSet.prototype.clear = function () {
        this._set.clear();
    };
    return _PdfReferenceSet;
}());
export { _PdfReferenceSet };
var _PdfReferenceSetCache = /** @class */ (function () {
    function _PdfReferenceSetCache() {
        this._map = new Map();
    }
    Object.defineProperty(_PdfReferenceSetCache.prototype, "size", {
        get: function () {
            return this._map.size;
        },
        enumerable: true,
        configurable: true
    });
    _PdfReferenceSetCache.prototype.get = function (ref) {
        return this._map.get(ref.toString());
    };
    _PdfReferenceSetCache.prototype.has = function (ref) {
        return this._map.has(ref.toString());
    };
    _PdfReferenceSetCache.prototype.put = function (ref, obj) {
        this._map.set(ref.toString(), obj);
    };
    _PdfReferenceSetCache.prototype.set = function (objId, obj) {
        this._map.set(objId, obj);
    };
    _PdfReferenceSetCache.prototype.clear = function () {
        this._map.clear();
    };
    return _PdfReferenceSetCache;
}());
export { _PdfReferenceSetCache };
var Dictionary = /** @class */ (function () {
    function Dictionary(toStringFunction) {
        this.table = {};
        this.nElements = 0;
        this.toStr = toStringFunction || _defaultToString;
    }
    Dictionary.prototype.getValue = function (key) {
        var pair = this.table['$' + this.toStr(key)];
        if (typeof pair === 'undefined') {
            return undefined;
        }
        return pair.value;
    };
    Dictionary.prototype.setValue = function (key, value) {
        var ret;
        var k = '$' + this.toStr(key);
        var previousElement = this.table[k];
        this.nElements++;
        ret = undefined;
        this.table[k] = {
            key: key,
            value: value
        };
        return ret;
    };
    Dictionary.prototype.keys = function () {
        var keysArray = [];
        var namesOfKeys = Object.keys(this.table);
        for (var index1 = 0; index1 < namesOfKeys.length; index1++) {
            var pair1 = this.table[namesOfKeys[index1]];
            keysArray.push(pair1.key);
        }
        return keysArray;
    };
    Dictionary.prototype.containsKey = function (key) {
        var retutnValue = true;
        if (typeof this.getValue(key) === 'undefined') {
            retutnValue = true;
        }
        else {
            retutnValue = false;
        }
        return !retutnValue;
    };
    Dictionary.prototype._size = function () {
        return this.nElements;
    };
    return Dictionary;
}());
export { Dictionary };
var _PdfDictionary = /** @class */ (function () {
    function _PdfDictionary(xref) {
        this._isFont = false;
        this._initialize(xref);
    }
    Object.defineProperty(_PdfDictionary.prototype, "size", {
        get: function () {
            return Object.keys(this._map).length;
        },
        enumerable: true,
        configurable: true
    });
    _PdfDictionary.prototype.assignXref = function (xref) {
        this._crossReference = xref;
    };
    _PdfDictionary.prototype.getRaw = function (key) {
        return this._map[key];
    };
    _PdfDictionary.prototype.getRawValues = function () {
        return this._map.values;
    };
    _PdfDictionary.prototype.get = function (key1, key2, key3) {
        var value = this._get(key1, key2, key3);
        if (this._crossReference && typeof value !== 'undefined' && value instanceof _PdfReference) {
            value = this._crossReference._fetch(value);
        }
        return value;
    };
    _PdfDictionary.prototype.getArray = function (key1, key2, key3) {
        var value = this.get(key1, key2, key3);
        if (this._crossReference && typeof value !== 'undefined' && Array.isArray(value)) {
            value = value.slice();
            for (var i = 0; i < value.length; i++) {
                var reference = value[Number.parseInt(i.toString(), 10)];
                if (reference !== null && typeof reference !== 'undefined' && reference instanceof _PdfReference) {
                    value[Number.parseInt(i.toString(), 10)] = this._crossReference._fetch(reference);
                }
            }
        }
        return value;
    };
    _PdfDictionary.prototype.set = function (key, value) {
        this._map[key] = value;
    };
    _PdfDictionary.prototype.has = function (key) {
        return typeof this._map[key] !== 'undefined';
    };
    _PdfDictionary.prototype.forEach = function (callback) {
        for (var key in this._map) {
            callback(key, this.getRaw(key));
        }
    };
    _PdfDictionary.prototype.update = function (key, value) {
        if (this.has(key)) {
            var prevValue = this._map[key];
            if (prevValue !== null && typeof prevValue !== 'undefined' && prevValue instanceof _PdfReference && this._crossReference) {
                prevValue = this._crossReference._fetch(prevValue);
            }
            if (prevValue !== value) {
                this._map[key] = value;
                this._updated = true;
            }
        }
        else {
            this._map[key] = value;
            this._updated = true;
        }
    };
    _PdfDictionary.getEmpty = function (xref) {
        var emptyDict = new _PdfDictionary(xref);
        emptyDict.set = function (key, value) {
            throw new Error('Should not call set on the empty dictionary.');
        };
        return emptyDict;
    };
    _PdfDictionary.merge = function (xref, dictionaryArray, mergeSubDictionary) {
        if (mergeSubDictionary === void 0) { mergeSubDictionary = false; }
        var mergedDictionary = new _PdfDictionary(xref);
        var properties = Object.create(null);
        for (var _i = 0, dictionaryArray_1 = dictionaryArray; _i < dictionaryArray_1.length; _i++) {
            var dictionary = dictionaryArray_1[_i];
            if (!(dictionary instanceof _PdfDictionary)) {
                continue;
            }
            for (var _a = 0, _b = dictionary._map; _a < _b.length; _a++) {
                var _c = _b[_a], key = _c[0], value = _c[1];
                var property = properties.get(key);
                if (typeof property === 'undefined') {
                    property = [];
                    properties.set(key, property);
                }
                else if (!mergeSubDictionary || !(value instanceof _PdfDictionary)) {
                    continue;
                }
                property.push(value);
            }
        }
        for (var _d = 0, properties_1 = properties; _d < properties_1.length; _d++) {
            var _e = properties_1[_d], name_1 = _e[0], values = _e[1];
            if (values.length === 1 || !(values[0] instanceof _PdfDictionary)) {
                mergedDictionary._map[name_1] = values[0];
                continue;
            }
            var subDict = new _PdfDictionary(xref);
            for (var _f = 0, values_1 = values; _f < values_1.length; _f++) {
                var dictionary = values_1[_f];
                for (var _g = 0, _h = dictionary._map; _g < _h.length; _g++) {
                    var _j = _h[_g], key = _j[0], value = _j[1];
                    if (typeof subDict._map[key] === 'undefined') {
                        subDict._map[key] = value;
                    }
                }
            }
            if (subDict.size > 0) {
                mergedDictionary._map[name_1] = subDict;
            }
        }
        properties.clear();
        return mergedDictionary.size > 0 ? mergedDictionary : _PdfDictionary.getEmpty(xref);
    };
    _PdfDictionary.prototype._initialize = function (xref) {
        this._map = Object.create(null);
        this.suppressEncryption = false;
        this._updated = false;
        this.isCatalog = false;
        this._isNew = false;
        if (xref) {
            this._crossReference = xref;
        }
    };
    _PdfDictionary.prototype._get = function (key1, key2, key3) {
        var value = this._map[key1];
        if (typeof value === 'undefined') {
            value = this._map[key2];
            if (typeof key2 !== 'undefined' && key2 !== null) {
                value = this._map[key2];
            }
            else if (typeof key3 !== 'undefined' && key3 !== null) {
                value = this._map[key3];
            }
        }
        return value;
    };
    return _PdfDictionary;
}());
export { _PdfDictionary };
var _PdfNull = /** @class */ (function () {
    function _PdfNull(value) {
        if (value === void 0) { value = []; }
        this.value = value;
    }
    return _PdfNull;
}());
export { _PdfNull };
export function _clearPrimitiveCaches() {
    nameCache = Object.create(null);
    cmdCache = Object.create(null);
    refCache = Object.create(null);
}
export function _isName(value, name) {
    return value instanceof _PdfName && (typeof name === 'undefined' || value.name === name);
}
export function _isCommand(value, command) {
    return value instanceof _PdfCommand && (typeof command === 'undefined' || value.command === command);
}
