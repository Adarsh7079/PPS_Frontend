import { PdfViewer, PdfViewerBase } from '../index';
/**
 * The 'AccessibilityTags' module helps to access the tagged layers in a PDF document for the users with disabilities.
 */
export declare class AccessibilityTags {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @param {PdfViewer} pdfViewer - The PdfViewer.
     * @param {PdfViewerBase} pdfViewerBase - The PdfViewerBase.
     * @private
     */
    constructor(pdfViewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    private addTaggedLayer;
    /**
     * @param pageIndex
     * @private
     */
    renderAccessibilityTags(pageIndex: number, taggedTextResponse: any): void;
    private createTag;
    private getTag;
    private setStyleToTaggedTextDiv;
    private setTextElementProperties;
    /**
     * @private
    */
    getModuleName(): string;
    /**
     * @private
     */
    destroy(): boolean;
}
