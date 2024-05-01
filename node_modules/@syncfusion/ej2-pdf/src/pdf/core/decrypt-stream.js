var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { _PdfDecodeStream } from './decode-stream';
var _PdfDecryptStream = /** @class */ (function (_super) {
    __extends(_PdfDecryptStream, _super);
    function _PdfDecryptStream(stream, maybeLength, cipher) {
        var _this = _super.call(this, maybeLength) || this;
        _this._chunkSize = 512;
        _this.stream = stream;
        _this.dictionary = stream.dictionary;
        _this._cipher = cipher;
        _this._nextChunk = null;
        _this._initialized = false;
        return _this;
    }
    _PdfDecryptStream.prototype.readBlock = function () {
        var chunk;
        if (this._initialized) {
            chunk = this._nextChunk;
        }
        else {
            chunk = this.stream.getBytes(this._chunkSize);
            this._initialized = true;
        }
        if (!chunk || chunk.length === 0) {
            this.eof = true;
            return;
        }
        this._nextChunk = this.stream.getBytes(this._chunkSize);
        var hasMoreData = this._nextChunk && this._nextChunk.length > 0;
        chunk = this._cipher._decryptBlock(chunk, !hasMoreData);
        var bufferLength = this.bufferLength;
        var n = chunk.length;
        var buffer = this.ensureBuffer(bufferLength + n);
        for (var i = 0; i < n; i++) {
            buffer[bufferLength++] = chunk[Number.parseInt(i.toString(), 10)];
        }
        this.bufferLength = bufferLength;
    };
    return _PdfDecryptStream;
}(_PdfDecodeStream));
export { _PdfDecryptStream };
