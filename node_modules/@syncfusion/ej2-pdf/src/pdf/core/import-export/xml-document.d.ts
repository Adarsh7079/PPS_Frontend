import { PdfDocument } from './../pdf-document';
import { _XmlWriter } from './xml-writer';
import { _ExportHelper } from './xfdf-document';
export declare class _XmlDocument extends _ExportHelper {
    constructor(fileName?: string);
    _exportAnnotations(): Uint8Array;
    _exportFormFields(document: PdfDocument): Uint8Array;
    _save(): Uint8Array;
    _writeFormFieldData(writer: _XmlWriter, isAcrobat?: boolean): void;
    _importFormData(document: PdfDocument, data: Uint8Array): void;
    _parseFormData(root: HTMLElement): void;
    _importField(): void;
    _checkXml(xmlDocument: Document): void;
}
