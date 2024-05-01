import { _PdfCrossReference } from './../pdf-cross-reference';
import { PdfPage } from './../pdf-page';
import { _PdfDictionary, _PdfReference } from './../pdf-primitives';
import { PdfAnnotation, PdfPopupAnnotation, PdfFileLinkAnnotation, PdfUriAnnotation, PdfComment } from './annotation';
/**
 * The class provides methods and properties to handle the collection of `PdfAnnotation`.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access annotation coolection from first page
 * let annotations: PdfAnnotationCollection = document.getPage(0).annotations;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfAnnotationCollection {
    _annotations: Array<_PdfReference>;
    _comments: Array<PdfPopupAnnotation>;
    _parsedAnnotations: Map<number, PdfAnnotation>;
    _isExport: boolean;
    private _page;
    private _crossReference;
    /**
     * Represents a annotation collection.
     *
     * @private
     * @param {Array<_PdfReference>} array Annotation references.
     * @param {_PdfCrossReference} xref Cross reference object.
     * @param {PdfPage} page PDF page object.
     */
    constructor(array: Array<_PdfReference>, xref: _PdfCrossReference, page: PdfPage);
    /**
     * Gets the annotation count (Read only).
     *
     * @returns {number} Number of annotations.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the annotation count
     * let count: number = page.annotations.count;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly count: number;
    /**
     * Gets the `PdfAnnotation` at the specified index.
     *
     * @param {number} index Field index.
     * @returns {PdfAnnotation} Annotation at the specified index.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Access the annotation at index 0
     * let annotation: PdfAnnotation = page.annotations.at(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    at(index: number): PdfAnnotation;
    /**
     * Add a new `PdfAnnotation` into the collection.
     *
     * @param {PdfAnnotation} annotation Annotation to add.
     * @returns {number} Annotation index.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Add a new annotation into the collection
     * page.annotations.add(annotation);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    add(annotation: PdfAnnotation): number;
    /**
     * Remove an annotation from the collection.
     *
     * @param {PdfAnnotation} annotation Annotation to remove.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Access first annotation from the PDF page
     * let annotation: PdfAnnotation = page.annotations.at(0);
     * // Remove an annotation from the collection
     * page.annotations.remove(annotation);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    remove(annotation: PdfAnnotation): void;
    /**
     * Remove an annotation from the collection at the specified index.
     *
     * @param {number} index Annotation index.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Remove an annotation from the collection
     * page.annotations.removeAt(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    removeAt(index: number): void;
    _reorderParsedAnnotations(index: number): void;
    _updateCustomAppearanceResource(annotation: PdfAnnotation): void;
    _addCommentsAndReview(annotation: PdfComment, flag: number): void;
    _updateChildReference(annotation: PdfComment, collection: PdfPopupAnnotationCollection, flag: number): void;
    _parseAnnotation(dictionary: _PdfDictionary): PdfAnnotation;
    _getLinkAnnotation(dictionary: _PdfDictionary): PdfFileLinkAnnotation | PdfUriAnnotation;
    _hasValidBorder(border: number[]): boolean;
    _doPostProcess(isFlatten: boolean): void;
    _reArrange(ref: _PdfReference, tabIndex: number, index: number): _PdfReference[];
    _clear(): void;
}
/**
 * Represents the collection of `PdfPopupAnnotation`
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access annotation collection from first page
 * let annotations: PdfRectangleAnnotation = document.getPage(0).annotations;
 * // Gets the comments of annotation
 * let comments: PdfPopupAnnotationCollection = annotation.comments;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfPopupAnnotationCollection {
    _isReview: boolean;
    _annotation: PdfAnnotation;
    _parentDictionary: _PdfDictionary;
    _collection: PdfPopupAnnotation[];
    _page: PdfPage;
    _lastParentReference: _PdfReference;
    /**
     * Initializes a new instance of the `PdfPopupAnnotationCollection` class
     *
     * @private
     * @param {PdfAnnotation} annotation Annotation reference
     * @param {boolean} isReview Boolean flag to set review
     */
    constructor(annotation: PdfAnnotation, isReview: boolean);
    /**
     * Gets the annotation count (Read only).
     *
     * @private
     * @returns {number} Number of annotations
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access annotation collection from first page
     * let annotations: PdfRectangleAnnotation = document.getPage(0).annotations;
     * // Gets the comments of annotation
     * let comments: PdfPopupAnnotationCollection = annotation.comments;
     * // Gets the count of comments
     * let count: number = comments.count;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly count: number;
    /**
     * Gets the popup annotation at the specified index.
     *
     * @private
     * @param {number} index Index of the annotation
     * @returns {number} Annotation at the specified index
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access annotation collection from first page
     * let annotations: PdfRectangleAnnotation = document.getPage(0).annotations;
     * // Gets the comments of annotation
     * let comments: PdfPopupAnnotationCollection = annotation.comments;
     * // Gets the first comment
     * let comment: PdfPopupAnnotation = comments.at(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    at(index: number): PdfPopupAnnotation;
    /**
     * Add a new popup annotation into the collection
     *
     * @param {PdfPopupAnnotation} annotation Annotation to add
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Create a new popup annotation
     * const popupAnnotation: PdfPopupAnnotation = new PdfPopupAnnotation('Test popup annotation', 10, 40, 30, 30);
     * popupAnnotation.author = 'Syncfusion';
     * // Add a new popup annotation into the collection
     * annotation.comments.add(popupAnnotation);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    add(annotation: PdfPopupAnnotation): void;
    /**
     * Remove an annotation from the collection
     *
     * @param {PdfPopupAnnotation} annotation Annotation to remove
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access annotation collection from first page
     * let annotations: PdfRectangleAnnotation = document.getPage(0).annotations;
     * // Gets the comments of annotation
     * let comments: PdfPopupAnnotationCollection = annotation.comments;
     * // Gets the first comment
     * let comment: PdfPopupAnnotation = comments.at(0);
     * // Remove the comment
     * comments.remove(comment);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    remove(annotation: PdfPopupAnnotation): void;
    /**
     * Remove an annotation from the collection at the specified index
     *
     * @param {number} index Annotation index to remove
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access annotation collection from first page
     * let annotations: PdfRectangleAnnotation = document.getPage(0).annotations;
     * // Gets the comments of annotation
     * let comments: PdfPopupAnnotationCollection = annotation.comments;
     * // Remove the first comment
     * comments.removeAt(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    removeAt(index: number): void;
    _parseCommentsOrReview(): void;
    _parseReview(): void;
    _parseComments(): void;
}
