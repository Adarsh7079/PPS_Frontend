import { _PdfCrossReference } from './pdf-cross-reference';
import { _PdfDictionary, _PdfReferenceSetCache, _PdfReference } from './pdf-primitives';
export declare class _PdfCatalog {
    private _crossReference;
    _catalogDictionary: _PdfDictionary;
    pageIndexCache: _PdfReferenceSetCache;
    pageKidsCountCache: _PdfReferenceSetCache;
    _topPagesDictionary: _PdfDictionary;
    constructor(xref: _PdfCrossReference);
    readonly version: string;
    readonly pageCount: number;
    readonly acroForm: _PdfDictionary;
    _createForm(): _PdfDictionary;
    getPageDictionary(pageIndex: number): {
        dictionary: _PdfDictionary;
        reference: _PdfReference;
    };
    _destroy(): void;
}
