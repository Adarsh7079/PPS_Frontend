import { _TrueTypeTableInfo, _TrueTypeHorizontalHeaderTable, _TrueTypeNameTable, _TrueTypeHeadTable, _TrueTypeOS2Table, _TrueTypePostTable, _TrueTypeCmapSubTable } from './ttf-table';
import { Dictionary } from '../pdf-primitives';
import { _TrueTypeCmapEncoding } from '../../core/enumerator';
export declare class _TrueTypeReader {
    _fontData: Uint8Array;
    readonly _int32Size: number;
    _offset: number;
    _tableDirectory: Dictionary<string, _TrueTypeTableInfo>;
    _isFont: boolean;
    _isMacTtf: boolean;
    _lowestPosition: number;
    _metrics: _TrueTypeMetrics;
    _maxMacIndex: number;
    _isFontPresent: boolean;
    _isMacFont: boolean;
    _missedGlyphs: number;
    _tableNames: string[];
    _entrySelectors: number[];
    _width: number[];
    _bIsLocaShort: boolean;
    _macintoshDictionary: Dictionary<number, _TrueTypeGlyph>;
    _microsoftDictionary: Dictionary<number, _TrueTypeGlyph>;
    _internalMacintoshGlyphs: Dictionary<number, _TrueTypeGlyph>;
    _internalMicrosoftGlyphs: Dictionary<number, _TrueTypeGlyph>;
    readonly macintosh: Dictionary<number, _TrueTypeGlyph>;
    readonly _microsoft: Dictionary<number, _TrueTypeGlyph>;
    readonly _macintoshGlyphs: Dictionary<number, _TrueTypeGlyph>;
    readonly _microsoftGlyphs: Dictionary<number, _TrueTypeGlyph>;
    constructor(fontData: Uint8Array);
    _initialize(): void;
    _readFontDictionary(): void;
    _fixOffsets(): void;
    _check(): number;
    _readNameTable(): _TrueTypeNameTable;
    _readHeadTable(): _TrueTypeHeadTable;
    _readHorizontalHeaderTable(): _TrueTypeHorizontalHeaderTable;
    _readOS2Table(): _TrueTypeOS2Table;
    _readPostTable(): _TrueTypePostTable;
    _readWidthTable(glyphCount: number, unitsPerEm: number): number[];
    _readCmapTable(): _TrueTypeCmapSubTable[];
    _readCmapSubTable(subTable: _TrueTypeCmapSubTable): void;
    _readAppleCmapTable(subTable: _TrueTypeCmapSubTable, encoding: _TrueTypeCmapEncoding): void;
    _readMicrosoftCmapTable(subTable: _TrueTypeCmapSubTable, encoding: _TrueTypeCmapEncoding): void;
    _readTrimmedCmapTable(subTable: _TrueTypeCmapSubTable, encoding: _TrueTypeCmapEncoding): void;
    _initializeFontName(nameTable: _TrueTypeNameTable): void;
    _getTable(name: string): _TrueTypeTableInfo;
    _getWidth(glyphCode: number): number;
    _getCmapEncoding(platformID: number, encodingID: number): _TrueTypeCmapEncoding;
    _addGlyph(glyph: _TrueTypeGlyph, encoding: _TrueTypeCmapEncoding): void;
    _initializeMetrics(nameTable: _TrueTypeNameTable, headTable: _TrueTypeHeadTable, horizontalHeadTable: _TrueTypeHorizontalHeaderTable, os2Table: _TrueTypeOS2Table, postTable: _TrueTypePostTable, cmapTables: _TrueTypeCmapSubTable[]): void;
    _updateWidth(): number[];
    _getDefaultGlyph(): _TrueTypeGlyph;
    _getString(byteToProcess: number[], start: number, length: number): string;
    _setOffset(offset: number): void;
    _readFontProgram(chars: Dictionary<string, string>): number[];
    _generateGlyphTable(glyphChars: Dictionary<number, number>, locaTable: _TrueTypeLocaTable, newLocaTable: number[], newGlyphTable: number[]): {
        glyphTableSize: number;
        newLocaTable: number[];
        newGlyphTable: number[];
    };
    _readLocaTable(bShort: boolean): _TrueTypeLocaTable;
    _updateGlyphChars(glyphChars: Dictionary<number, number>, locaTable: _TrueTypeLocaTable): void;
    _processCompositeGlyph(glyphChars: Dictionary<number, number>, glyph: number, locaTable: _TrueTypeLocaTable): void;
    _updateLocaTable(newLocaTable: number[], bLocaIsShort: boolean): {
        newLocaUpdated: number[];
        newLocaSize: number;
    };
    _align(value: number): number;
    _getFontProgram(newLocaTableOut: number[], newGlyphTable: number[], glyphTableSize: number, locaTableSize: number): number[];
    _getFontProgramLength(newLocaTableOut: number[], newGlyphTable: number[], table: number): {
        fontProgramLength: number;
        table: number;
    };
    _getGlyphChars(chars: Dictionary<string, string>): Dictionary<number, number>;
    _writeCheckSums(writer: _BigEndianWriter, table: number, newLocaTableOut: number[], newGlyphTable: number[], glyphTableSize: number, locaTableSize: number): void;
    _calculateCheckSum(bytes: number[]): number;
    _writeGlyphs(writer: _BigEndianWriter, newLocaTable: number[], newGlyphTable: number[]): void;
    _read(buffer: number[], index: number, count: number): {
        buffer: number[];
        written: number;
    };
    _createInternals(): void;
    _getGlyph(charCode: string): _TrueTypeGlyph;
    _getGlyph(charCode: number): _TrueTypeGlyph;
    _readString(length: number): string;
    _readString(length: number, isUnicode: boolean): string;
    _readFixed(offset: number): number;
    _readInt32(offset: number): number;
    _readUInt32(offset: number): number;
    _readInt16(offset: number): number;
    _readInt64(offset: number): number;
    _readUInt16(offset: number): number;
    _readUShortArray(length: number): number[];
    _readBytes(length: number): number[];
    _readByte(offset: number): number;
    _getCharacterWidth(code: string): number;
    _convertString(text: string): string;
}
export declare class _TrueTypeNameRecord {
    _platformID: number;
    _encodingID: number;
    _languageID: number;
    _nameID: number;
    _length: number;
    _offset: number;
    _name: string;
}
export declare class _TrueTypeMetrics {
    _lineGap: number;
    _contains: boolean;
    _isSymbol: boolean;
    _isFixedPitch: boolean;
    _italicAngle: number;
    _postScriptName: string;
    _fontFamily: string;
    _capHeight: number;
    _leading: number;
    _macAscent: number;
    _macDescent: number;
    _winDescent: number;
    _winAscent: number;
    _stemV: number;
    _widthTable: number[];
    _macStyle: number;
    _subScriptSizeFactor: number;
    _superscriptSizeFactor: number;
    _fontBox: number[];
    readonly _isItalic: boolean;
    readonly _isBold: boolean;
}
export declare class _TrueTypeLongHorMetric {
    _advanceWidth: number;
    _lsb: number;
}
export declare class _TrueTypeGlyph {
    _index: number;
    _width: number;
    _charCode: number;
    readonly _empty: boolean;
}
export declare class _TrueTypeLocaTable {
    _offsets: number[];
}
export declare class _TrueTypeGlyphHeader {
    numberOfContours: number;
    xMin: number;
    yMin: number;
    xMax: number;
    yMax: number;
}
export declare class _BigEndianWriter {
    readonly int32Size: number;
    readonly int16Size: number;
    readonly int64Size: number;
    _buffer: number[];
    _bufferLength: number;
    _internalPosition: number;
    readonly _data: number[];
    readonly _position: number;
    constructor(capacity: number);
    _writeShort(value: number): void;
    _writeInt(value: number): void;
    _writeUInt(value: number): void;
    _writeString(value: string): void;
    _writeBytes(value: number[]): void;
    _flush(buff: number[]): void;
}
