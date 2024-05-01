import { _PdfBaseStream } from './base-stream';
import { _PdfDictionary } from './pdf-primitives';
export declare class _PdfDecodeStream extends _PdfBaseStream {
    constructor(maybeMinBufferLength: number);
    _rawMinBufferLength: number;
    bufferLength: number;
    eof: boolean;
    buffer: Uint8Array;
    minBufferLength: number;
    stream: _PdfBaseStream;
    readonly isEmpty: boolean;
    ensureBuffer(requested: number): Uint8Array;
    getByte(): number;
    getBytes(length: number): Uint8Array;
    reset(): void;
    makeSubStream(start: number, length: number, dictionary: _PdfDictionary): _PdfBaseStream;
    getBaseStreams(): _PdfBaseStream[];
    moveStart(): void;
    getByteRange(begin: number, end: number): Uint8Array;
    readBlock(): void;
}
