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
import { _XmlWriter } from './xml-writer';
import { _bytesToString, _getNewGuidString } from './../utils';
import { _ExportHelper } from './xfdf-document';
var _XmlDocument = /** @class */ (function (_super) {
    __extends(_XmlDocument, _super);
    function _XmlDocument(fileName) {
        var _this = _super.call(this) || this;
        if (fileName !== null && typeof fileName !== 'undefined') {
            _this._fileName = fileName;
        }
        return _this;
    }
    _XmlDocument.prototype._exportAnnotations = function () {
        throw new Error('Method not implemented.');
    };
    _XmlDocument.prototype._exportFormFields = function (document) {
        this._document = document;
        this._crossReference = document._crossReference;
        this._isAnnotationExport = false;
        this._format = 'XML';
        this._key = _getNewGuidString();
        return this._save();
    };
    _XmlDocument.prototype._save = function () {
        var writer = new _XmlWriter();
        writer._writeStartDocument();
        if (this._asPerSpecification) {
            writer._writeStartElement('fields');
            writer._writeAttributeString('xfdf', 'http://ns.adobe.com/xfdf-transition/', 'xmlns', null);
        }
        else {
            writer._writeStartElement('Fields');
        }
        var form = this._document.form;
        if (form !== null && typeof form !== 'undefined') {
            this._exportEmptyFields = form.exportEmptyFields;
            var count = this._document.form.count;
            for (var i = 0; i < count; i++) {
                var field = this._document.form.fieldAt(i);
                if (field !== null && typeof field !== 'undefined' && field.export) {
                    this._exportFormFieldData(field);
                }
            }
            this._writeFormFieldData(writer, this._asPerSpecification);
        }
        var result = writer._save();
        writer._destroy();
        return result;
    };
    _XmlDocument.prototype._writeFormFieldData = function (writer, isAcrobat) {
        if (isAcrobat === void 0) { isAcrobat = false; }
        if (isAcrobat) {
            this._table.forEach(function (value, key) {
                if (key.includes(' ')) {
                    var text = key.replace(/ /g, '');
                    writer._writeStartElement(text.toString());
                    writer._writeAttributeString('original', key.toString(), 'xfdf', null);
                }
                else {
                    writer._writeStartElement(key.toString());
                }
                writer._writeString(value.toString());
                writer._writeEndElement();
            });
        }
        else {
            this._table.forEach(function (value, key) {
                if (key.includes(' ')) {
                    key = key.replace(/ /g, '_x0020_');
                }
                writer._writeStartElement(key.toString());
                writer._writeString(value.toString());
                writer._writeEndElement();
            });
        }
        writer._writeEndElement();
    };
    _XmlDocument.prototype._importFormData = function (document, data) {
        this._document = document;
        this._crossReference = document._crossReference;
        this._isAnnotationExport = false;
        var value = _bytesToString(data);
        value = value.replace(/(\r\n|\n|\r)/gm, '');
        value = value.replace(/[^\x20-\x7E]/g, '');
        this._xmlDocument = (new DOMParser()).parseFromString(value, 'text/xml');
        this._checkXml(this._xmlDocument);
        this._xmlImport = true;
        this._parseFormData(this._xmlDocument.documentElement);
        this._xmlImport = false;
    };
    _XmlDocument.prototype._parseFormData = function (root) {
        var child = root.childNodes;
        if (child !== null && typeof child !== 'undefined' && child.length > 0) {
            for (var i = 0; i < child.length; i++) {
                var childNode = child.item(i);
                if (childNode !== null && typeof childNode !== 'undefined' && childNode.nodeType === 1) {
                    var element = childNode;
                    var text = '';
                    if (element.attributes !== null && typeof element.attributes !== 'undefined' && element.attributes.length > 0) {
                        var attribute = element.attributes.item(0); // eslint-disable-line
                        if (attribute !== null && typeof attribute !== 'undefined' && attribute.name === 'xfdf:original') {
                            text = attribute.value;
                        }
                    }
                    else {
                        text = element.tagName;
                    }
                    var v = element.textContent;
                    if (text !== null && text !== undefined && text.length > 0) {
                        this._table.set(text, v);
                    }
                }
            }
        }
        this._importField();
    };
    _XmlDocument.prototype._importField = function () {
        var _this = this;
        var form = this._document.form;
        var count = form.count;
        if (count) {
            this._table.forEach(function (value, key) {
                var textValue;
                if (_this._table.size > 0 && _this._table.has(key)) {
                    textValue = _this._table.get(key);
                }
                var text = key.toString();
                if (text.indexOf('_x0020_') !== -1) {
                    text = text.replace(/_x0020_/g, ' ');
                }
                var index = form._getFieldIndex(text);
                if (index !== -1 && index < count) {
                    var field = form.fieldAt(index);
                    if (field && field !== null && typeof field !== 'undefined') {
                        if (textValue && textValue !== '') {
                            field._dictionary.update('RV', textValue);
                        }
                        var param = [];
                        param.push(value);
                        _this._importFieldData(field, param);
                    }
                }
            });
        }
    };
    _XmlDocument.prototype._checkXml = function (xmlDocument) {
        if (xmlDocument.getElementsByTagName('parsererror').length > 0) {
            throw new Error('Invalid XML file.');
        }
    };
    return _XmlDocument;
}(_ExportHelper));
export { _XmlDocument };
