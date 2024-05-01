import { Dictionary } from './../../pdf-primitives';
export declare class _Bidirectional {
    _indexes: number[];
    _indexLevels: number[];
    _mirroringShape: Dictionary<number, number>;
    /**
     * Creates a new instance of the `_Bidirectional` class.
     *
     * @private
     */
    constructor();
    _doMirrorShaping(text: string): string;
    _getLogicalToVisualString(inputText: string, isRtl: boolean): string;
    _setDefaultIndexLevel(): void;
    _doOrder(sIndex: number, eIndex: number): void;
    _reArrange(i: number, j: number): void;
    _update(): void;
}
export declare class _RtlCharacters {
    _type: number[];
    _textOrder: number;
    _length: number;
    _result: number[];
    _levels: number[];
    _rtlCharacterTypes: number[];
    L: number;
    lre: number;
    lro: number;
    R: number;
    AL: number;
    rle: number;
    rlo: number;
    pdf: number;
    EN: number;
    ES: number;
    ET: number;
    AN: number;
    CS: number;
    nsm: number;
    BN: number;
    B: number;
    S: number;
    WS: number;
    ON: number;
    _charTypes: number[];
    /**
     * Creates an instance of the 'RtlCharacters' class.
     *
     * @private
     */
    constructor();
    _getVisualOrder(inputText: string, isRtl: boolean): number[];
    _getCharacterCode(text: string): number[];
    _setDefaultLevels(): void;
    _setLevels(): void;
    _updateLevels(index: number, level: number, length: number): void;
    _doVisualOrder(): void;
    _getEmbeddedCharactersLength(): number;
    _checkEmbeddedCharacters(length: number): void;
    _check(index: number, length: number, level: number, startType: number, endType: number): void;
    _checkEuropeanDigits(index: number, length: number, level: number, startType: number, endType: number): void;
    _checkArabicCharacters(index: number, length: number, level: number, startType: number, endType: number): void;
    _checkEuropeanNumberSeparator(index: number, length: number, level: number, startType: number, endType: number): void;
    _checkEuropeanNumberTerminator(index: number, length: number, level: number, startType: number, endType: number): void;
    _checkOtherNeutrals(index: number, length: number, level: number, startType: number, endType: number): void;
    _checkOtherCharacters(index: number, length: number, level: number, startType: number, endType: number): void;
    _getLength(index: number, length: number, validSet: number[]): number;
    _checkCharacters(index: number, length: number, level: number, startType: number, endType: number): void;
}
