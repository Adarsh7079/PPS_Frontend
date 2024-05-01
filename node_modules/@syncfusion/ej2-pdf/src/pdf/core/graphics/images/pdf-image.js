import { _PdfGraphicsUnit } from './../../enumerator';
import { _PdfUnitConvertor } from './../../graphics/pdf-graphics';
/**
 * The 'PdfImage' contains methods and properties to handle the images.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Gets the graphics of the PDF page
 * let graphics: PdfGraphics = page.graphics;
 * // Create new image object by using JPEG image data as Base64 string format
 * let image: PdfImage = new PdfBitmap('/9j/4AAQSkZJRgABAQEAkACQAAD/4....QB//Z');
 * //Draw the image.
 * graphics.drawImage(image, 10, 20, 400, 400);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
var PdfImage = /** @class */ (function () {
    function PdfImage() {
    }
    Object.defineProperty(PdfImage.prototype, "width", {
        /**
         * Gets the width of the PDF image.
         *
         * @returns {number} image width.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access first page
         * let page: PdfPage = document.getPage(0);
         * // Gets the graphics of the PDF page
         * let graphics: PdfGraphics = page.graphics;
         * // Create new image object by using JPEG image data as Base64 string format
         * let image: PdfImage = new PdfBitmap('/9j/4AAQSkZJRgABAQEAkACQAAD/4....QB//Z');
         * // Gets the width of the image.
         * let width: number = image.width;
         * //Draw the image.
         * image.draw(graphics);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._imageWidth;
        },
        /**
         * Sets the width of the PDF image.
         *
         * @param {number} value value.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access first page
         * let page: PdfPage = document.getPage(0);
         * // Gets the graphics of the PDF page
         * let graphics: PdfGraphics = page.graphics;
         * // Create new image object by using JPEG image data as Base64 string format
         * let image: PdfImage = new PdfBitmap('/9j/4AAQSkZJRgABAQEAkACQAAD/4....QB//Z');
         * // Sets the width of the image.
         * image.width = 100;
         * //Draw the image.
         * image.draw(graphics);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._imageWidth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfImage.prototype, "height", {
        /**
         * Gets the height of the PDF image.
         *
         * @returns {number} image height.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access first page
         * let page: PdfPage = document.getPage(0);
         * // Gets the graphics of the PDF page
         * let graphics: PdfGraphics = page.graphics;
         * // Create new image object by using JPEG image data as Base64 string format
         * let image: PdfImage = new PdfBitmap('/9j/4AAQSkZJRgABAQEAkACQAAD/4....QB//Z');
         * // Gets the height of the image.
         * let height: number = image.height;
         * //Draw the image.
         * image.draw(graphics);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._imageHeight;
        },
        /**
         * Sets the height of the PDF image.
         *
         * @param {number} value value.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access first page
         * let page: PdfPage = document.getPage(0);
         * // Gets the graphics of the PDF page
         * let graphics: PdfGraphics = page.graphics;
         * // Create new image object by using JPEG image data as Base64 string format
         * let image: PdfImage = new PdfBitmap('/9j/4AAQSkZJRgABAQEAkACQAAD/4....QB//Z');
         * // Sets the height of the image.
         * image.height = 100;
         * //Draw the image.
         * image.draw(graphics);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._imageHeight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfImage.prototype, "physicalDimension", {
        /**
         * Gets the physical dimension of the PDF image (Read only).
         *
         * @returns {number[]} image physical dimension.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access first page
         * let page: PdfPage = document.getPage(0);
         * // Gets the graphics of the PDF page
         * let graphics: PdfGraphics = page.graphics;
         * // Create new image object by using JPEG image data as Base64 string format
         * let image: PdfImage = new PdfBitmap('/9j/4AAQSkZJRgABAQEAkACQAAD/4....QB//Z');
         * // Gets the physical dimension of the image.
         * let dimension: number[] = image.physicalDimension;
         * //Draw the image.
         * image.draw(graphics);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            this._imagePhysicalDimension = this._getPointSize(this.width, this.height, this._horizontalResolution);
            return [this.width, this.height];
        },
        enumerable: true,
        configurable: true
    });
    PdfImage.prototype.draw = function (graphics, x, y) {
        if ((x === null || typeof x === 'undefined') && (y === null || typeof y === 'undefined')) {
            x = 0;
            y = 0;
        }
        var needSave = (x !== 0 || y !== 0);
        var state = null;
        if (needSave) {
            state = graphics.save();
            graphics.translateTransform(x, y);
        }
        graphics.drawImage(this, 0, 0);
        if (needSave) {
            graphics.restore(state);
        }
    };
    PdfImage.prototype._getPointSize = function (width, height, horizontalResolution) {
        if ((horizontalResolution === null || typeof horizontalResolution === 'undefined')) {
            var dpiX = 96;
            var size = this._getPointSize(width, height, dpiX);
            return size;
        }
        else {
            var ucX = new _PdfUnitConvertor();
            var ucY = new _PdfUnitConvertor();
            var ptWidth = ucX._convertUnits(width, _PdfGraphicsUnit.pixel, _PdfGraphicsUnit.point);
            var ptHeight = ucY._convertUnits(height, _PdfGraphicsUnit.pixel, _PdfGraphicsUnit.point);
            var size = [ptWidth, ptHeight];
            return size;
        }
    };
    return PdfImage;
}());
export { PdfImage };
