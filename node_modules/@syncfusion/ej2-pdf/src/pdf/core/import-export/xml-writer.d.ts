export declare type _XmlWriteState = 'Initial' | 'StartDocument' | 'EndDocument' | 'StartElement' | 'EndElement' | 'ElementContent';
export declare type _NamespaceKind = 'Written' | 'NeedToWrite' | 'Implied' | 'Special';
export declare class _XmlWriter {
    _bufferText: string;
    _buffer: Uint8Array;
    _currentState: _XmlWriteState;
    _namespaceStack: _Namespace[];
    _elementStack: _XmlElement[];
    _position: number;
    _attributeStack: _XmlAttribute[];
    _skipNamespace: boolean;
    readonly buffer: Uint8Array;
    constructor(isAppearance?: boolean);
    _writeStartDocument(standalone?: boolean): void;
    _writeStartElement(localName: string, prefix?: string, namespace?: string): void;
    _writeEndElement(): void;
    _writeElementString(localName: string, value: string, prefix?: string, namespace?: string): void;
    _writeAttributeString(localName: string, value: string, prefix?: string, namespace?: string): void;
    _writeString(text: string): void;
    _writeRaw(text: string): void;
    _writeInternal(text: string, isRawString: boolean): void;
    _save(): Uint8Array;
    _destroy(): void;
    _flush(): void;
    _writeStartAttribute(localName: string, value: string, prefix: string, namespace: string): void;
    _writeStartAttributePrefixAndNameSpace(localName: string, value: string, prefix?: string, namespace?: string): void;
    _writeStartAttributeSpecialAttribute(prefix: string, localName: string, namespace: string, value: string): void;
    _writeEndAttribute(): void;
    _writeStartElementInternal(prefix: string, localName: string, namespace: string): void;
    _writeEndElementInternal(prefix: string, localName: string): void;
    _writeStartAttributeInternal(prefix: string, localName: string): void;
    _writeNamespaceDeclaration(prefix: string, namespaceUri: string): void;
    _writeStartNamespaceDeclaration(prefix: string): void;
    _writeStringInternal(text: string, inAttributeValue: boolean): void;
    _startElementContent(): void;
    _rawText(text: string): void;
    _addNamespace(prefix: string, ns: string, kind: _NamespaceKind): void;
    _lookupPrefix(namespace: string): string;
    _lookupNamespace(prefix: string): string;
    _lookupNamespaceIndex(prefix: string): number;
    _pushNamespaceImplicit(prefix: string, ns: string): void;
    _pushNamespaceExplicit(prefix: string, ns: string): void;
    _addAttribute(prefix: string, localName: string, namespaceName: string): void;
    _skipPushAndWrite(prefix: string, localName: string, namespace: string): void;
    _checkName(text: string): void;
}
export declare class _Namespace {
    _prefix: string;
    _namespaceUri: string;
    _kind: _NamespaceKind;
    _set(prefix: string, namespaceUri: string, kind: _NamespaceKind): void;
    _destroy(): void;
}
export declare class _XmlElement {
    _previousTop: number;
    _prefix: string;
    _localName: string;
    _namespaceUri: string;
    _set(prefix: string, localName: string, namespaceUri: string, previousTop: number): void;
    _destroy(): void;
}
export declare class _XmlAttribute {
    _prefix: string;
    _namespaceUri: string;
    _localName: string;
    _set(prefix: string, localName: string, namespaceUri: string): void;
    _isDuplicate(prefix: string, localName: string, namespaceUri: string): boolean;
    _destroy(): void;
}
