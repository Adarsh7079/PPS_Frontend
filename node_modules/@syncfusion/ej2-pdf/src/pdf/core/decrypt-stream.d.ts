import { _PdfBaseStream } from './base-stream';
import { _PdfDecodeStream } from './decode-stream';
import { _Cipher } from './security/encryptor';
export declare class _PdfDecryptStream extends _PdfDecodeStream {
    readonly _chunkSize: number;
    _initialized: boolean;
    _nextChunk: Uint8Array;
    _cipher: _Cipher;
    constructor(stream: _PdfBaseStream, maybeLength: number, cipher: _Cipher);
    readBlock(): void;
}
