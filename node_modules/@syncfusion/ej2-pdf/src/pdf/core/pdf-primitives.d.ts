import { _PdfCrossReference } from './pdf-cross-reference';
export declare class _PdfName {
    constructor(name: string);
    name: string;
    static get(name: string): _PdfName;
}
export declare class _PdfCommand {
    constructor(command: string);
    command: string;
    static get(command: string): _PdfCommand;
}
export declare class _PdfReference {
    constructor(objectNumber: number, gen: number);
    objectNumber: number;
    generationNumber: number;
    _isNew: boolean;
    toString(): string;
    static get(objectNumber: number, generationNumber: number): _PdfReference;
}
export declare class _PdfReferenceSet {
    constructor(parent?: any);
    _set: Set<_PdfReference>;
    has(ref: any): boolean;
    put(ref: any): void;
    remove(ref: any): void;
    clear(): void;
}
export declare class _PdfReferenceSetCache {
    constructor();
    _map: any;
    readonly size: number;
    get(ref: _PdfReference): any;
    has(ref: _PdfReference): boolean;
    put(ref: _PdfReference, obj: any): void;
    set(objId: string, obj: any): void;
    clear(): void;
}
export interface IDictionaryPair<K, V> {
    key: K;
    value: V;
}
export declare class Dictionary<K, V> {
    protected table: {
        [key: string]: IDictionaryPair<K, V>;
    };
    protected nElements: number;
    protected toStr: (key: K) => string;
    constructor(toStringFunction?: (key: K) => string);
    getValue(key: K): V;
    setValue(key: K, value: V): V;
    keys(): K[];
    containsKey(key: K): boolean;
    _size(): number;
}
export declare class _PdfDictionary {
    constructor(xref?: _PdfCrossReference);
    _map: any;
    _crossReference: _PdfCrossReference;
    objId: any;
    _isNew: boolean;
    suppressEncryption: boolean;
    _updated: boolean;
    isCatalog: boolean;
    _currentObj: any;
    _isFont: boolean;
    readonly size: number;
    assignXref(xref: any): void;
    getRaw(key: string): any;
    getRawValues(): any;
    get(key1: string, key2?: string, key3?: string): any;
    getArray(key1: string, key2?: string, key3?: string): any;
    set(key: string, value: any): void;
    has(key: string): boolean;
    forEach(callback: any): void;
    update(key: string, value: any): void;
    static getEmpty(xref: _PdfCrossReference): _PdfDictionary;
    static merge(xref: _PdfCrossReference, dictionaryArray: Array<any>, mergeSubDictionary?: boolean): _PdfDictionary;
    _initialize(xref?: _PdfCrossReference): void;
    _get(key1: string, key2?: string, key3?: string): any;
}
export declare class _PdfNull {
    constructor(value?: any);
    value: any;
}
export declare function _clearPrimitiveCaches(): void;
export declare function _isName(value: _PdfName, name: string): boolean;
export declare function _isCommand(value: _PdfCommand, command: string): boolean;
