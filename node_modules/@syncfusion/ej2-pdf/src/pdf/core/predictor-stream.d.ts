import { _PdfDecodeStream } from './decode-stream';
import { _PdfDictionary } from './pdf-primitives';
export declare class PdfPredictorStream extends _PdfDecodeStream {
    predictor: number;
    dictionary: _PdfDictionary;
    pixBytes: number;
    rowBytes: number;
    colors: number;
    bits: number;
    columns: number;
    readBlock: any;
    constructor(stream: any, maybeLength: number, params: _PdfDictionary);
    readBlockTiff(): void;
    readBlockPng(): void;
}
