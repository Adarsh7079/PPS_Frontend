import { _PdfBaseStream } from './base-stream';
import { _PdfDecodeStream } from './decode-stream';
import { _PdfDictionary } from './pdf-primitives';
export declare class _PdfFlateStream extends _PdfDecodeStream {
    constructor(stream: _PdfBaseStream, maybeLength: number);
    dictionary: _PdfDictionary;
    codeSize: number;
    codeBuffer: number;
    getBits(bits: number): number;
    getCode(table: Array<number | Int32Array>): number;
    generateHuffmanTable(lengths: Uint8Array): (number | Int32Array)[];
    readBlock(): void;
}
