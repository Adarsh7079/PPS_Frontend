import { PdfDocument } from './../pdf-document';
import { _PdfDictionary } from './../pdf-primitives';
import { _ExportHelper } from './xfdf-document';
import { PdfAnnotation } from './../annotations/annotation';
export declare class _FdfDocument extends _ExportHelper {
    _annotationObjects: Map<any, any>;
    _specialCharacters: string;
    constructor(fileName?: string);
    _exportAnnotations(document: PdfDocument): Uint8Array;
    _exportFormFields(document: PdfDocument): Uint8Array;
    _save(): Uint8Array;
    _importAnnotations(document: PdfDocument, data: Uint8Array): void;
    _importFormData(document: PdfDocument, data: Uint8Array): void;
    _readFdfData(parser: any): void;
    _parseAnnotationData(): Map<any, any>;
    _importField(): void;
    _exportAnnotationData(document: PdfDocument, pageCount: number): void;
    _exportAnnotation(annotation: PdfAnnotation, fdfString: string, index: number, annot: string[], pageIndex: number, appearance: boolean): _FdfHelper;
    _appendStream(value: any, fdfString: string): void;
    _getEntries(list: Map<any, any>, // eslint-disable-line
    streamReference: number[], index: number, dictionary: _PdfDictionary, fdfString: string, hasAppearance: boolean): _FdfHelper;
    _appendArray(array: any[], // eslint-disable-line
    fdfString: string, index: number, flag: boolean, list: Map<any, any>, // eslint-disable-line
    streamReference: number[]): _FdfHelper;
    _appendElement(element: any, // eslint-disable-line
    fdfString: string, index: number, flag: boolean, list: Map<any, any>, // eslint-disable-line
    streamReference: number[]): _FdfHelper;
    _getFormattedString(value: string): string;
    _checkFdf(element: string): void;
    _stringToHexString(text: string): string;
}
export declare class _FdfHelper {
    list: Map<any, any>;
    streamReference: number[];
    index: number;
    annot: string[];
}
