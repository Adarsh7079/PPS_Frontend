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
import { _PdfBaseStream, _PdfStream } from './base-stream';
var _PdfDecodeStream = /** @class */ (function (_super) {
    __extends(_PdfDecodeStream, _super);
    function _PdfDecodeStream(maybeMinBufferLength) {
        var _this = _super.call(this) || this;
        _this._rawMinBufferLength = maybeMinBufferLength || 0;
        _this.offset = 0;
        _this.bufferLength = 0;
        _this.eof = false;
        _this.buffer = new Uint8Array(0);
        _this.minBufferLength = 512;
        if (maybeMinBufferLength) {
            while (_this.minBufferLength < maybeMinBufferLength) {
                _this.minBufferLength *= 2;
            }
        }
        return _this;
    }
    Object.defineProperty(_PdfDecodeStream.prototype, "isEmpty", {
        get: function () {
            while (!this.eof && this.bufferLength === 0) {
                this.readBlock();
            }
            return this.bufferLength === 0;
        },
        enumerable: true,
        configurable: true
    });
    _PdfDecodeStream.prototype.ensureBuffer = function (requested) {
        var buffer = this.buffer;
        if (requested <= buffer.byteLength) {
            return buffer;
        }
        var size = this.minBufferLength;
        while (size < requested) {
            size *= 2;
        }
        var buffer2 = new Uint8Array(size);
        buffer2.set(buffer);
        this.buffer = buffer2;
        return this.buffer;
    };
    _PdfDecodeStream.prototype.getByte = function () {
        var position = this.offset;
        while (this.bufferLength <= position) {
            if (this.eof) {
                return -1;
            }
            this.readBlock();
        }
        return this.buffer[this.offset++];
    };
    _PdfDecodeStream.prototype.getBytes = function (length) {
        var position = this.offset;
        var end;
        if (length) {
            this.ensureBuffer(position + length);
            end = position + length;
            while (!this.eof && this.bufferLength < end) {
                this.readBlock();
            }
            var bufEnd = this.bufferLength;
            if (end > bufEnd) {
                end = bufEnd;
            }
        }
        else {
            while (!this.eof) {
                this.readBlock();
            }
            end = this.bufferLength;
        }
        this.offset = end;
        return this.buffer.subarray(position, end);
    };
    _PdfDecodeStream.prototype.reset = function () {
        this.offset = 0;
    };
    _PdfDecodeStream.prototype.makeSubStream = function (start, length, dictionary) {
        if (length === undefined) {
            while (!this.eof) {
                this.readBlock();
            }
        }
        else {
            var end = start + length;
            while (this.bufferLength <= end && !this.eof) {
                this.readBlock();
            }
        }
        return new _PdfStream(this.buffer, dictionary, start, length);
    };
    _PdfDecodeStream.prototype.getBaseStreams = function () {
        return this.stream ? this.stream.getBaseStreams() : null;
    };
    _PdfDecodeStream.prototype.moveStart = function () {
        throw new Error('Invalid call from decode stream');
    };
    _PdfDecodeStream.prototype.getByteRange = function (begin, end) {
        throw new Error('Invalid call from decode stream. begin: ' + begin + ', end: ' + end);
    };
    _PdfDecodeStream.prototype.readBlock = function () {
        throw new Error('Invalid call from decode stream');
    };
    return _PdfDecodeStream;
}(_PdfBaseStream));
export { _PdfDecodeStream };
