import { _stringToBytes } from './../utils';
var _XmlWriter = /** @class */ (function () {
    function _XmlWriter(isAppearance) {
        if (isAppearance === void 0) { isAppearance = false; }
        this._position = 0;
        this._bufferText = '';
        this._buffer = new Uint8Array(0);
        this._namespaceStack = [];
        this._elementStack = [];
        if (!isAppearance) {
            this._currentState = 'Initial';
            this._namespaceStack.push(new _Namespace());
            this._elementStack.push(new _XmlElement());
            this._namespaceStack[0]._set('xmlns', 'http://www.w3.org/2000/xmlns/', 'Special');
            this._namespaceStack.push(new _Namespace());
            this._namespaceStack[1]._set('xml', 'http://www.w3.org/XML/1998/namespace', 'Special');
            this._namespaceStack.push(new _Namespace());
            this._namespaceStack[2]._set('', '', 'Implied');
            this._elementStack[0]._set('', '', '', this._namespaceStack.length - 1);
        }
        else {
            this._currentState = 'StartDocument';
            this._skipNamespace = true;
        }
        this._attributeStack = [];
    }
    Object.defineProperty(_XmlWriter.prototype, "buffer", {
        get: function () {
            this._flush();
            return this._buffer;
        },
        enumerable: true,
        configurable: true
    });
    _XmlWriter.prototype._writeStartDocument = function (standalone) {
        if (this._currentState !== 'Initial' || typeof this._buffer === 'undefined') {
            throw new Error('InvalidOperationException: Wrong Token');
        }
        this._currentState = 'StartDocument';
        this._rawText('<?xml version="1.0" encoding="utf-8');
        if (typeof standalone !== 'undefined' && standalone !== null) {
            this._rawText('" standalone="');
            this._rawText(standalone ? 'yes' : 'no');
        }
        this._rawText('"?>');
    };
    _XmlWriter.prototype._writeStartElement = function (localName, prefix, namespace) {
        if (typeof this._buffer === 'undefined') {
            throw new Error('InvalidOperationException: Wrong Token');
        }
        if (typeof localName === 'undefined' || localName === null || localName.length === 0) {
            throw new Error('ArgumentException: localName cannot be undefined, null or empty');
        }
        this._checkName(localName);
        if (this._currentState === 'Initial') {
            this._writeStartDocument();
        }
        if (this._currentState === 'StartElement') {
            this._startElementContent();
        }
        this._currentState = 'StartElement';
        if (typeof prefix === 'undefined' || prefix === null) {
            if (typeof namespace !== 'undefined' && namespace !== null) {
                prefix = this._lookupPrefix(namespace);
            }
            if (typeof prefix === 'undefined' || prefix === null) {
                prefix = '';
            }
        }
        else if (prefix.length > 0) {
            if (typeof namespace === 'undefined' || namespace === null) {
                namespace = this._lookupNamespace(prefix);
            }
            if (typeof namespace === 'undefined' || namespace === null || (typeof namespace !== 'undefined' && namespace.length === 0)) {
                throw new Error('ArgumentException: Cannot use a prefix with an empty namespace');
            }
        }
        if (typeof namespace === 'undefined' || namespace === null) {
            namespace = this._lookupNamespace(prefix);
        }
        this._writeStartElementInternal(prefix, localName, namespace);
    };
    _XmlWriter.prototype._writeEndElement = function () {
        if (this._currentState === 'StartElement') {
            this._startElementContent();
            this._currentState = 'ElementContent';
        }
        else if (this._currentState === 'ElementContent') {
            this._currentState = 'ElementContent';
        }
        this._currentState = 'EndElement';
        var top = this._elementStack.length - 1;
        this._writeEndElementInternal(this._elementStack[Number.parseInt(top.toString(), 10)]._prefix, this._elementStack[Number.parseInt(top.toString(), 10)]._localName);
        this._namespaceStack.splice(this._elementStack[Number.parseInt(top.toString(), 10)]._previousTop + 1);
        this._elementStack.splice(top);
        // if (this._bufferText.length > 10240) {
        //     this._flush();
        // }
    };
    _XmlWriter.prototype._writeElementString = function (localName, value, prefix, namespace) {
        this._writeStartElement(localName, prefix, namespace);
        if (typeof value !== 'undefined' && value !== null && value.length !== 0) {
            this._writeString(value);
        }
        this._writeEndElement();
    };
    _XmlWriter.prototype._writeAttributeString = function (localName, value, prefix, namespace) {
        this._writeStartAttribute(localName, value, prefix, namespace);
        this._writeStringInternal(value, true);
        this._writeEndAttribute();
    };
    _XmlWriter.prototype._writeString = function (text) {
        this._writeInternal(text, false);
    };
    _XmlWriter.prototype._writeRaw = function (text) {
        this._writeInternal(text, true);
    };
    _XmlWriter.prototype._writeInternal = function (text, isRawString) {
        if (text !== null && typeof text !== 'undefined') {
            if (this._currentState !== 'StartElement' && this._currentState !== 'ElementContent') {
                throw new Error('InvalidOperationException: Wrong Token');
            }
            if (this._currentState === 'StartElement') {
                this._startElementContent();
            }
            this._currentState = 'ElementContent';
            if (isRawString) {
                this._rawText(text);
            }
            else {
                this._writeStringInternal(text, false);
            }
        }
    };
    _XmlWriter.prototype._save = function () {
        while (this._elementStack.length - 1 > 0) {
            this._writeEndElement();
        }
        if (this._bufferText !== '') {
            this._flush();
        }
        return this._buffer;
    };
    _XmlWriter.prototype._destroy = function () {
        this._buffer = undefined;
        for (var i = 0; i < this._namespaceStack.length; i++) {
            this._namespaceStack[Number.parseInt(i.toString(), 10)]._destroy();
        }
        this._namespaceStack = [];
        for (var i = 0; i < this._elementStack.length; i++) {
            this._elementStack[Number.parseInt(i.toString(), 10)]._destroy();
        }
        this._elementStack = [];
        this._bufferText = '';
        this._position = 0;
    };
    _XmlWriter.prototype._flush = function () {
        if (this._buffer && this._bufferText && this._bufferText !== '') {
            if (this._buffer.length > 0) {
                var buffer = new Array(this._bufferText.length);
                for (var i = 0; i < this._bufferText.length; i++) {
                    buffer[Number.parseInt(i.toString(), 10)] = this._bufferText.charCodeAt(i) & 0xff;
                }
                var array = new Uint8Array(this._buffer.length + buffer.length);
                array.set(this._buffer);
                array.set(buffer, this._buffer.length);
                this._buffer = array;
            }
            else {
                this._buffer = _stringToBytes(this._bufferText);
            }
            this._bufferText = '';
        }
    };
    _XmlWriter.prototype._writeStartAttribute = function (localName, value, prefix, namespace) {
        if (typeof localName === 'undefined' || localName === null || localName.length === 0) {
            if (prefix === 'xmlns') {
                localName = 'xmlns';
                prefix = '';
            }
            else {
                throw new Error('ArgumentException: localName cannot be undefined, null or empty');
            }
        }
        if (this._currentState !== 'StartElement') {
            throw new Error('InvalidOperationException: Wrong Token');
        }
        this._checkName(localName);
        this._writeStartAttributePrefixAndNameSpace(localName, value, prefix, namespace);
    };
    _XmlWriter.prototype._writeStartAttributePrefixAndNameSpace = function (localName, value, prefix, namespace) {
        if (typeof prefix === 'undefined' || prefix === null) {
            if (typeof namespace !== 'undefined' && namespace !== null) {
                if (!(localName === 'xmlns' && namespace === 'http://www.w3.org/2000/xmlns/')) {
                    prefix = this._lookupPrefix(namespace);
                }
            }
            if (typeof prefix === 'undefined' || prefix === null) {
                prefix = '';
            }
        }
        if (typeof namespace === 'undefined' || namespace === null) {
            if (typeof prefix !== 'undefined' && prefix !== null && prefix.length > 0) {
                namespace = this._lookupNamespace(prefix);
            }
            if (typeof namespace === 'undefined' || namespace === null) {
                namespace = '';
            }
        }
        this._writeStartAttributeSpecialAttribute(prefix, localName, namespace, value);
    };
    _XmlWriter.prototype._writeStartAttributeSpecialAttribute = function (prefix, localName, namespace, value) {
        if (prefix.length === 0) {
            if (localName[0] === 'x' && localName === 'xmlns') {
                this._skipPushAndWrite(prefix, localName, namespace);
                this._pushNamespaceExplicit('', value);
                return;
            }
            else if (namespace.length > 0) {
                prefix = this._lookupPrefix(namespace);
            }
        }
        else {
            if (prefix[0] === 'x') {
                if (prefix === 'xmlns') {
                    this._skipPushAndWrite(prefix, localName, namespace);
                    this._pushNamespaceExplicit(localName, value);
                    return;
                }
                else if (prefix === 'xml') {
                    if (localName === 'space' || localName === 'lang') {
                        this._skipPushAndWrite(prefix, localName, namespace);
                        return;
                    }
                }
            }
            if (namespace.length === 0) {
                prefix = '';
            }
        }
        if (typeof prefix !== 'undefined' && prefix !== null && prefix.length !== 0) {
            this._pushNamespaceImplicit(prefix, namespace);
        }
        this._skipPushAndWrite(prefix, localName, namespace);
    };
    _XmlWriter.prototype._writeEndAttribute = function () {
        this._currentState = 'StartElement';
        this._bufferText += '"';
    };
    _XmlWriter.prototype._writeStartElementInternal = function (prefix, localName, namespace) {
        this._bufferText += '<';
        if (prefix.length > 0) {
            this._rawText(prefix);
            this._bufferText += ':';
        }
        this._rawText(localName);
        var top = this._elementStack.length;
        this._elementStack.push(new _XmlElement());
        this._elementStack[Number.parseInt(top.toString(), 10)]._set(prefix, localName, namespace, this._namespaceStack.length - 1);
        this._pushNamespaceImplicit(prefix, namespace);
        for (var i = 0; i < this._attributeStack.length; i++) {
            this._attributeStack[Number.parseInt(i.toString(), 10)]._destroy();
        }
        this._attributeStack = [];
    };
    _XmlWriter.prototype._writeEndElementInternal = function (prefix, localName) {
        if (this._position !== this._bufferText.length + 1) {
            this._bufferText += '</';
            if (typeof prefix !== 'undefined' && prefix !== null && prefix.length !== 0) {
                this._rawText(prefix);
                this._bufferText += ':';
            }
            this._rawText(localName);
            this._bufferText += '>';
        }
        else {
            this._bufferText = this._bufferText.substring(0, this._bufferText.length - 1);
            this._bufferText += ' />';
        }
    };
    _XmlWriter.prototype._writeStartAttributeInternal = function (prefix, localName) {
        this._bufferText += ' ';
        if (typeof prefix !== 'undefined' && prefix !== null && prefix.length > 0) {
            this._rawText(prefix);
            this._bufferText += ':';
        }
        this._rawText(localName);
        this._bufferText += '="';
    };
    _XmlWriter.prototype._writeNamespaceDeclaration = function (prefix, namespaceUri) {
        if (!this._skipNamespace) {
            this._writeStartNamespaceDeclaration(prefix);
            this._writeStringInternal(namespaceUri, true);
            this._bufferText += '"';
        }
    };
    _XmlWriter.prototype._writeStartNamespaceDeclaration = function (prefix) {
        if (typeof prefix === 'undefined' || prefix === null || prefix.length === 0) {
            this._rawText(' xmlns="');
        }
        else {
            this._rawText(' xmlns:');
            this._rawText(prefix);
            this._bufferText += '=';
            this._bufferText += '"';
        }
    };
    _XmlWriter.prototype._writeStringInternal = function (text, inAttributeValue) {
        if (typeof text === 'undefined' || text === null) {
            text = '';
        }
        text = text.replace(/\&/g, '&amp;'); // eslint-disable-line
        text = text.replace(/\</g, '&lt;'); // eslint-disable-line
        text = text.replace(/\>/g, '&gt;'); // eslint-disable-line
        if (inAttributeValue) {
            text = text.replace(/\"/g, '&quot;'); // eslint-disable-line
        }
        this._bufferText += text;
        if (!inAttributeValue) {
            this._position = 0;
        }
    };
    _XmlWriter.prototype._startElementContent = function () {
        var start = this._elementStack[this._elementStack.length - 1]._previousTop;
        for (var i = this._namespaceStack.length - 1; i > start; i--) {
            if (this._namespaceStack[Number.parseInt(i.toString(), 10)]._kind === 'NeedToWrite') {
                this._writeNamespaceDeclaration(this._namespaceStack[Number.parseInt(i.toString(), 10)]._prefix, this._namespaceStack[Number.parseInt(i.toString(), 10)]._namespaceUri);
            }
        }
        this._bufferText += '>';
        this._position = this._bufferText.length + 1;
    };
    _XmlWriter.prototype._rawText = function (text) {
        this._bufferText += text;
    };
    _XmlWriter.prototype._addNamespace = function (prefix, ns, kind) {
        var top = this._namespaceStack.length;
        this._namespaceStack.push(new _Namespace());
        this._namespaceStack[Number.parseInt(top.toString(), 10)]._set(prefix, ns, kind);
    };
    _XmlWriter.prototype._lookupPrefix = function (namespace) {
        for (var i = this._namespaceStack.length - 1; i >= 0; i--) {
            if (this._namespaceStack[Number.parseInt(i.toString(), 10)]._namespaceUri === namespace) {
                return this._namespaceStack[Number.parseInt(i.toString(), 10)]._prefix;
            }
        }
        return undefined;
    };
    _XmlWriter.prototype._lookupNamespace = function (prefix) {
        for (var i = this._namespaceStack.length - 1; i >= 0; i--) {
            if (this._namespaceStack[Number.parseInt(i.toString(), 10)]._prefix === prefix) {
                return this._namespaceStack[Number.parseInt(i.toString(), 10)]._namespaceUri;
            }
        }
        return undefined;
    };
    _XmlWriter.prototype._lookupNamespaceIndex = function (prefix) {
        for (var i = this._namespaceStack.length - 1; i >= 0; i--) {
            if (this._namespaceStack[Number.parseInt(i.toString(), 10)]._prefix === prefix) {
                return i;
            }
        }
        return -1;
    };
    _XmlWriter.prototype._pushNamespaceImplicit = function (prefix, ns) {
        var kind;
        var existingNsIndex = this._lookupNamespaceIndex(prefix);
        var isValid = true;
        if (existingNsIndex !== -1) {
            if (existingNsIndex > this._elementStack[this._elementStack.length - 1]._previousTop) {
                if (this._namespaceStack[Number.parseInt(existingNsIndex.toString(), 10)]._namespaceUri !== ns) {
                    throw new Error('XmlException namespace Uri needs to be the same as the one that is already declared');
                }
                isValid = false;
            }
            else {
                if (this._namespaceStack[Number.parseInt(existingNsIndex.toString(), 10)]._kind === 'Special') {
                    if (prefix === 'xml') {
                        if (ns !== this._namespaceStack[Number.parseInt(existingNsIndex.toString(), 10)]._namespaceUri) {
                            throw new Error('InvalidArgumentException: Xml String');
                        }
                        else {
                            kind = 'Implied';
                        }
                    }
                    else {
                        throw new Error('InvalidArgumentException: Prefix "xmlns" is reserved for use by XML.');
                    }
                }
                else {
                    kind = (this._namespaceStack[Number.parseInt(existingNsIndex.toString(), 10)]._namespaceUri === ns) ?
                        'Implied' :
                        'NeedToWrite';
                }
            }
        }
        else {
            if ((ns === 'http://www.w3.org/XML/1998/namespace' && prefix !== 'xml') ||
                (ns === 'http://www.w3.org/2000/xmlns/' && prefix !== 'xmlns')) {
                throw new Error('InvalidArgumentException');
            }
            kind = 'NeedToWrite';
        }
        if (isValid) {
            this._addNamespace(prefix, ns, kind);
        }
    };
    _XmlWriter.prototype._pushNamespaceExplicit = function (prefix, ns) {
        var existingNsIndex = this._lookupNamespaceIndex(prefix);
        if (existingNsIndex !== -1) {
            if (existingNsIndex > this._elementStack[this._elementStack.length - 1]._previousTop) {
                this._namespaceStack[Number.parseInt(existingNsIndex.toString(), 10)]._kind = 'Written';
                return;
            }
        }
        this._addNamespace(prefix, ns, 'Written');
        return;
    };
    _XmlWriter.prototype._addAttribute = function (prefix, localName, namespaceName) {
        var top = this._attributeStack.length;
        this._attributeStack.push(new _XmlAttribute());
        this._attributeStack[Number.parseInt(top.toString(), 10)]._set(prefix, localName, namespaceName);
        for (var i = 0; i < top; i++) {
            if (this._attributeStack[Number.parseInt(i.toString(), 10)]._isDuplicate(prefix, localName, namespaceName)) {
                throw new Error('XmlException: duplicate attribute name');
            }
        }
    };
    _XmlWriter.prototype._skipPushAndWrite = function (prefix, localName, namespace) {
        this._addAttribute(prefix, localName, namespace);
        this._writeStartAttributeInternal(prefix, localName);
    };
    _XmlWriter.prototype._checkName = function (text) {
        var format = /[ !@#$%^&*()+\=\[\]{};':"\\|,<>\/?]/; // eslint-disable-line
        if (format.test(text)) {
            throw new Error('InvalidArgumentException: invalid name character');
        }
    };
    return _XmlWriter;
}());
export { _XmlWriter };
var _Namespace = /** @class */ (function () {
    function _Namespace() {
    }
    _Namespace.prototype._set = function (prefix, namespaceUri, kind) {
        this._prefix = prefix;
        this._namespaceUri = namespaceUri;
        this._kind = kind;
    };
    _Namespace.prototype._destroy = function () {
        this._prefix = undefined;
        this._namespaceUri = undefined;
        this._kind = undefined;
    };
    return _Namespace;
}());
export { _Namespace };
var _XmlElement = /** @class */ (function () {
    function _XmlElement() {
    }
    _XmlElement.prototype._set = function (prefix, localName, namespaceUri, previousTop) {
        this._previousTop = previousTop;
        this._prefix = prefix;
        this._namespaceUri = namespaceUri;
        this._localName = localName;
    };
    _XmlElement.prototype._destroy = function () {
        this._previousTop = undefined;
        this._prefix = undefined;
        this._localName = undefined;
        this._namespaceUri = undefined;
    };
    return _XmlElement;
}());
export { _XmlElement };
var _XmlAttribute = /** @class */ (function () {
    function _XmlAttribute() {
    }
    _XmlAttribute.prototype._set = function (prefix, localName, namespaceUri) {
        this._prefix = prefix;
        this._namespaceUri = namespaceUri;
        this._localName = localName;
    };
    _XmlAttribute.prototype._isDuplicate = function (prefix, localName, namespaceUri) {
        return ((this._localName === localName) && ((this._prefix === prefix) || (this._namespaceUri === namespaceUri)));
    };
    _XmlAttribute.prototype._destroy = function () {
        this._prefix = undefined;
        this._namespaceUri = undefined;
        this._localName = undefined;
    };
    return _XmlAttribute;
}());
export { _XmlAttribute };
