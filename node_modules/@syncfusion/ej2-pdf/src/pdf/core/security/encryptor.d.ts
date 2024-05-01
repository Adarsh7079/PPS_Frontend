import { _PdfDictionary, _PdfName } from './../pdf-primitives';
import { _PdfDecryptStream } from './../decrypt-stream';
import { _PdfBaseStream } from './../base-stream';
export declare class _PdfEncryptor {
    _filterName: string;
    _dictionary: _PdfDictionary;
    _algorithm: number;
    _messageDigest: _MD5;
    _encryptionKey: Uint8Array;
    _cipherDictionary: _PdfDictionary;
    _string: _PdfName;
    _stream: _PdfName;
    _eff: _PdfName;
    _isUserPassword: boolean;
    _hasUserPasswordOnly: boolean;
    _encryptOnlyAttachment: boolean;
    _encryptMetaData: boolean;
    _defaultPasswordBytes: Uint8Array;
    readonly _md5: _MD5;
    constructor(dictionary: _PdfDictionary, id: string, password?: string);
    _createEncryptionKey(isUserKey: boolean, password: Uint8Array, ownerKeySalt: Uint8Array, uBytes: Uint8Array, userKeySalt: Uint8Array, ownerEncryption: Uint8Array, userEncryption: Uint8Array, algorithm: _AdvancedEncryption | _BasicEncryption): Uint8Array;
    _prepareKeyData(id: Uint8Array, password: Uint8Array, ownerPassword: Uint8Array, userPassword: Uint8Array, flags: number, revision: number, keyLength: number, encryptMetaData: boolean): Uint8Array;
    _decodeUserPassword(password: Uint8Array, ownerPassword: Uint8Array, revision: number, keyLength: number): Uint8Array;
    _createCipherTransform(objectNumber: number, generationNumber: number): _CipherTransform;
    _buildCipherConstructor(cipherDictionary: _PdfDictionary, name: _PdfName, objectNumber: number, generationNumber: number, key: Uint8Array): _Cipher;
    _buildObjectKey(objectNumber: number, generationNumber: number, encryptionKey: Uint8Array, isAdvancedEncryption?: boolean): Uint8Array;
}
export declare class _MD5 {
    _r: Uint8Array;
    _k: Int32Array;
    hash(data: Uint8Array, offset?: number, length?: number): Uint8Array;
}
export declare class _Sha256 {
    _rotateRight(x: number, n: number): number;
    _sigma(x: number): number;
    _sigmaPrime(x: number): number;
    _littleSigma(x: number): number;
    _littleSigmaPrime(x: number): number;
    _hash(data: Uint8Array, offset: number, length: number): Uint8Array;
}
export declare class _Sha512 {
    _k: Array<_Word64>;
    _sigma(result: _Word64, x: _Word64, buffer: _Word64): void;
    _sigmaPrime(result: _Word64, x: _Word64, buffer: _Word64): void;
    _littleSigma(result: _Word64, x: _Word64, buffer: _Word64): void;
    _littleSigmaPrime(result: _Word64, x: _Word64, buffer: _Word64): void;
    _hash(data: Uint8Array, offset: number, length: number, isMode384?: boolean): Uint8Array;
}
export declare class _Word64 {
    high: number;
    low: number;
    constructor(high: number, low: number);
    and(word: _Word64): void;
    or(word: _Word64): void;
    not(): void;
    xor(word: _Word64): void;
    shiftRight(places: number): void;
    shiftLeft(places: number): void;
    rotateRight(places: number): void;
    add(word: _Word64): void;
    copyTo(bytes: Uint8Array, offset: number): void;
    assign(word: _Word64): void;
}
export declare abstract class _EncryptionKey {
    _sha256Obj: _Sha256;
    readonly _sha256: _Sha256;
    _sha512Obj: _Sha512;
    readonly _sha512: _Sha512;
    abstract _checkOwnerPassword(password: Uint8Array, ownerValidationSalt: Uint8Array, userBytes: Uint8Array, ownerPassword: Uint8Array): boolean;
    abstract _checkUserPassword(password: Uint8Array, userValidationSalt: Uint8Array, userPassword: Uint8Array): boolean;
    abstract _getOwnerKey(password: Uint8Array, ownerKeySalt: Uint8Array, userBytes: Uint8Array, ownerEncryption: Uint8Array): Uint8Array;
    abstract _getUserKey(password: Uint8Array, userKeySalt: Uint8Array, userEncryption: Uint8Array): Uint8Array;
}
export declare class _BasicEncryption extends _EncryptionKey {
    _checkOwnerPassword(password: Uint8Array, ownerValidationSalt: Uint8Array, userBytes: Uint8Array, ownerPassword: Uint8Array): boolean;
    _checkUserPassword(password: Uint8Array, userValidationSalt: Uint8Array, userPassword: Uint8Array): boolean;
    _getOwnerKey(password: Uint8Array, ownerKeySalt: Uint8Array, userBytes: Uint8Array, ownerEncryption: Uint8Array): Uint8Array;
    _getUserKey(password: Uint8Array, userKeySalt: Uint8Array, userEncryption: Uint8Array): Uint8Array;
}
export declare class _AdvancedEncryption extends _EncryptionKey {
    _checkOwnerPassword(password: Uint8Array, ownerValidationSalt: Uint8Array, userBytes: Uint8Array, ownerPassword: Uint8Array): boolean;
    _checkUserPassword(password: Uint8Array, userValidationSalt: Uint8Array, userPassword: Uint8Array): boolean;
    _getOwnerKey(password: Uint8Array, ownerKeySalt: Uint8Array, userBytes: Uint8Array, ownerEncryption: Uint8Array): Uint8Array;
    _getUserKey(password: Uint8Array, userKeySalt: Uint8Array, userEncryption: Uint8Array): Uint8Array;
    _hash(password: Uint8Array, input: Uint8Array, userBytes: Uint8Array): Uint8Array;
}
export declare abstract class _Cipher {
    abstract _decryptBlock(data: Uint8Array, finalize?: boolean, iv?: Uint8Array): Uint8Array;
    abstract _encrypt(data: Uint8Array): Uint8Array;
}
export declare class _NormalCipherFour extends _Cipher {
    _a: number;
    _b: number;
    _s: Uint8Array;
    constructor(key: Uint8Array);
    _encryptBlock(data: Uint8Array): Uint8Array;
    _decryptBlock(data: Uint8Array): Uint8Array;
    _encrypt(data: Uint8Array): Uint8Array;
}
export declare abstract class _AdvancedEncryptionBaseCipher extends _Cipher {
    _mixC: Uint8Array;
    _buffer: Uint8Array;
    _position: number;
    _keySize: number;
    _cyclesOfRepetition: number;
    _iv: Uint8Array;
    _key: Uint8Array;
    _bufferLength: number;
    _s: Uint8Array;
    _inverseS: Uint8Array;
    _mix: Uint32Array;
    readonly _mixCol: Uint8Array;
    abstract _expandKey(cipherKey: Uint8Array): Uint8Array;
    _decrypt(input: Uint8Array, key: Uint8Array): Uint8Array;
    _encryptBlock(input: Uint8Array, key: Uint8Array): Uint8Array;
    _decryptBlockHelper(data: Uint8Array, finalize: boolean): Uint8Array;
    _decryptBlock(data: Uint8Array, finalize: boolean, iv?: Uint8Array): Uint8Array;
    _encrypt(data: Uint8Array, iv?: Uint8Array): Uint8Array;
}
export declare class _AdvancedEncryption128Cipher extends _AdvancedEncryptionBaseCipher {
    _key: Uint8Array;
    constructor(key: Uint8Array);
    _expandKey(cipherKey: Uint8Array): Uint8Array;
}
export declare class _AdvancedEncryption256Cipher extends _AdvancedEncryptionBaseCipher {
    constructor(key: Uint8Array);
    _expandKey(cipherKey: Uint8Array): Uint8Array;
}
export declare class _NullCipher extends _Cipher {
    _decryptBlock(data: Uint8Array): Uint8Array;
    _encrypt(data: Uint8Array): Uint8Array;
}
export declare class _CipherTransform {
    _stringCipher: _Cipher;
    _streamCipher: _Cipher;
    constructor(stringCipher: _Cipher, streamCipher: _Cipher);
    createStream(stream: _PdfBaseStream, length: number): _PdfDecryptStream;
    decryptString(s: string): string;
    encryptString(s: string): string;
}
