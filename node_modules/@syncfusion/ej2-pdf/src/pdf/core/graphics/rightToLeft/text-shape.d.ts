export declare class _ArabicShapeRenderer {
    _arabicCharTable: string[][];
    _alef: string;
    _alefHamza: string;
    _alefHamzaBelow: string;
    _alefMadda: string;
    _lam: string;
    _hamza: string;
    _zeroWidthJoiner: string;
    _hamzaAbove: string;
    _hamzaBelow: string;
    _wawHamza: string;
    _yehHamza: string;
    _waw: string;
    _alefsura: string;
    _yeh: string;
    _farsiYeh: string;
    _shadda: string;
    _madda: string;
    _lwa: string;
    _lwawh: string;
    _lwawhb: string;
    _lwawm: string;
    _bwhb: string;
    _fathatan: string;
    _superalef: string;
    _vowel: number;
    _arabicMapTable: Map<string, string[]>;
    /**
     * Creates an instance of the 'ArabicShapeRenderer' class.
     *
     * @private
     */
    constructor();
    _getCharacterShape(input: string, index: number): string;
    _shape(text: string): string;
    _doShape(input: string, level: number): string;
    _append(builder: string, shape: _ArabicShape, level: number): string;
    _ligature(value: string, shape: _ArabicShape): number;
    _getShapeCount(shape: string): number;
}
export declare class _ArabicShape {
    _shapeValue: string;
    _shapeType: string;
    _shapeVowel: string;
    _shapeLigature: number;
    _shapes: number;
}
