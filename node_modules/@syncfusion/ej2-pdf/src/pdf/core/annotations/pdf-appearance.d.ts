import { PdfTemplate } from './../graphics/pdf-template';
import { PdfAnnotation } from './annotation';
/**
 * `PdfAppearance` class represents the appearance of the annotation.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new rubber stamp annotation
 * const annotation: PdfRubberStampAnnotation = new PdfRubberStampAnnotation(50, 100, 100, 50);
 * // Get the appearance of the annotation
 * let appearance: PdfAppearance = annotation.appearance;
 * // Create new image object by using JPEG image data as Base64 string format
 * let image: PdfImage = new PdfBitmap('/9j/4AAQSkZJRgABAQEAkACQAAD/4....QB//Z');
 * // Draw the image as the custom appearance for the annotation
 * appearance.normal.graphics.drawImage(image, 0, 0, 100, 50);
 * // Add annotation to the page
 * page.annotations.add(annotation);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfAppearance {
    _annotations: PdfAnnotation;
    _bounds: number[];
    private _crossReference;
    private _templateNormal;
    private _dictionary;
    /**
     * Initializes a new instance of the `PdfAppearance` class.
     *
     * @param {PdfAnnotation} annot - The annotation.
     * @param {number[]} bounds - The bounds.
     * @private
     */
    constructor(annot: PdfAnnotation, bounds: number[]);
    /**
     * Get the normal appearance of the annotation.
     *
     * @returns {PdfTemplate} Returns the normal appearance of the annotation.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new rubber stamp annotation
     * const annotation: PdfRubberStampAnnotation = new PdfRubberStampAnnotation(50, 100, 100, 50);
     * // Get the appearance of the annotation
     * let appearance: PdfAppearance = annotation.appearance;
     * // Access the normal template of the appearance
     * let template: PdfTemplate = appearance.normal;
     * // Create new image object by using JPEG image data as Base64 string format
     * let image: PdfImage = new PdfBitmap('/9j/4AAQSkZJRgABAQEAkACQAAD/4....QB//Z');
     * // Draw the image as the custom appearance for the annotation
     * template.graphics.drawImage(image, 0, 0, 100, 50);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Set the normal appearance of the annotation.
    *
    * @param {PdfTemplate} value The normal appearance of the annotation.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Create a new rubber stamp annotation
    * const annotation: PdfRubberStampAnnotation = new PdfRubberStampAnnotation(50, 100, 100, 50);
    * // Get the appearance of the annotation
    * let appearance: PdfAppearance = annotation.appearance;
    * // Access the normal template of the appearance
    * let template: PdfTemplate = appearance.normal;
    * // Create new image object by using JPEG image data as Base64 string format
    * let image: PdfImage = new PdfBitmap('/9j/4AAQSkZJRgABAQEAkACQAAD/4....QB//Z');
    * // Draw the image as the custom appearance for the annotation
    * template.graphics.drawImage(image, 0, 0, 100, 50);
    * // Add annotation to the page
    * page.annotations.add(annotation);
    * // Add a new rubber stamp annotation to the page
    * const annotation2: PdfRubberStampAnnotation = new PdfRubberStampAnnotation(50, 200, 100, 50);
    * // Set the normal appearance of the annotation
    * annotation2.appearance.normal = annotation.appearance.normal;
    * // Add annotation to the page
    * page.annotations.add(annotation2);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    normal: PdfTemplate;
    _initialize(): void;
}
