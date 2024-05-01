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
import { _PdfDictionary } from './pdf-primitives';
import { FormatError } from './utils';
var PdfPredictorStream = /** @class */ (function (_super) {
    __extends(PdfPredictorStream, _super);
    function PdfPredictorStream(stream, maybeLength, params) {
        var _this = _super.call(this, maybeLength) || this;
        if (!(params instanceof _PdfDictionary)) {
            return stream;
        }
        var predictor = (_this.predictor = params.get('Predictor') || 1);
        if (predictor <= 1) {
            return stream;
        }
        if (predictor !== 2 && (predictor < 10 || predictor > 15)) {
            throw new FormatError("Unsupported predictor: " + predictor);
        }
        if (predictor === 2) {
            _this.readBlock = _this.readBlockTiff;
        }
        else {
            _this.readBlock = _this.readBlockPng;
        }
        _this.stream = stream;
        _this.dictionary = stream.dictionary;
        var colors = (_this.colors = params.get('Colors') || 1);
        var bits = (_this.bits = params.get('BPC', 'BitsPerComponent') || 8);
        var columns = (_this.columns = params.get('Columns') || 1);
        _this.pixBytes = (colors * bits + 7) >> 3;
        _this.rowBytes = (columns * colors * bits + 7) >> 3;
        return _this;
    }
    PdfPredictorStream.prototype.readBlockTiff = function () {
        var rowBytes = this.rowBytes;
        var bufferLength = this.bufferLength;
        var buffer = this.ensureBuffer(bufferLength + rowBytes);
        var bits = this.bits;
        var colors = this.colors;
        var rawBytes = this.stream.getBytes(rowBytes);
        this.eof = !rawBytes.length;
        if (this.eof) {
            return;
        }
        var inbuf = 0;
        var outbuf = 0;
        var inbits = 0;
        var outbits = 0;
        var position = bufferLength;
        var i;
        if (bits === 1 && colors === 1) {
            for (i = 0; i < rowBytes; ++i) {
                var c = rawBytes[i] ^ inbuf; // eslint-disable-line
                c ^= c >> 1;
                c ^= c >> 2;
                c ^= c >> 4;
                inbuf = (c & 1) << 7;
                buffer[position++] = c;
            }
        }
        else if (bits === 8) {
            for (i = 0; i < colors; ++i) {
                buffer[position++] = rawBytes[i]; // eslint-disable-line
            }
            for (; i < rowBytes; ++i) {
                buffer[position] = buffer[position - colors] + rawBytes[i]; // eslint-disable-line
                position++;
            }
        }
        else if (bits === 16) {
            var bytesPerPixel = colors * 2;
            for (i = 0; i < bytesPerPixel; ++i) {
                buffer[position++] = rawBytes[i]; // eslint-disable-line
            }
            for (; i < rowBytes; i += 2) {
                var sum = ((rawBytes[i] & 0xff) << 8) + // eslint-disable-line
                    (rawBytes[i + 1] & 0xff) +
                    ((buffer[position - bytesPerPixel] & 0xff) << 8) +
                    (buffer[position - bytesPerPixel + 1] & 0xff);
                buffer[position++] = (sum >> 8) & 0xff;
                buffer[position++] = sum & 0xff;
            }
        }
        else {
            var compArray = new Uint8Array(colors + 1);
            var bitMask = (1 << bits) - 1;
            var j = 0;
            var k = bufferLength;
            var columns = this.columns;
            for (i = 0; i < columns; ++i) {
                for (var kk = 0; kk < colors; ++kk) {
                    if (inbits < bits) {
                        inbuf = (inbuf << 8) | (rawBytes[j++] & 0xff);
                        inbits += 8;
                    }
                    compArray[kk] = (compArray[kk] + (inbuf >> (inbits - bits))) & bitMask; // eslint-disable-line
                    inbits -= bits;
                    outbuf = (outbuf << bits) | compArray[kk]; // eslint-disable-line
                    outbits += bits;
                    if (outbits >= 8) {
                        buffer[k++] = (outbuf >> (outbits - 8)) & 0xff;
                        outbits -= 8;
                    }
                }
            }
            if (outbits > 0) {
                buffer[k++] = (outbuf << (8 - outbits)) + (inbuf & ((1 << (8 - outbits)) - 1));
            }
        }
        this.bufferLength += rowBytes;
    };
    PdfPredictorStream.prototype.readBlockPng = function () {
        var rowBytes = this.rowBytes;
        var pixBytes = this.pixBytes;
        var predictor = this.stream.getByte();
        var rawBytes = this.stream.getBytes(rowBytes);
        this.eof = !rawBytes.length;
        if (this.eof) {
            return;
        }
        var bufferLength = this.bufferLength;
        var buffer = this.ensureBuffer(bufferLength + rowBytes);
        var prevRow = buffer.subarray(bufferLength - rowBytes, bufferLength);
        if (prevRow.length === 0) {
            prevRow = new Uint8Array(rowBytes);
        }
        var i;
        var j = bufferLength;
        var up;
        var c;
        switch (predictor) {
            case 0:
                for (i = 0; i < rowBytes; ++i) {
                    buffer[j++] = rawBytes[i]; // eslint-disable-line
                }
                break;
            case 1:
                for (i = 0; i < pixBytes; ++i) {
                    buffer[j++] = rawBytes[i]; // eslint-disable-line
                }
                for (; i < rowBytes; ++i) {
                    buffer[j] = (buffer[j - pixBytes] + rawBytes[i]) & 0xff; // eslint-disable-line
                    j++;
                }
                break;
            case 2:
                for (i = 0; i < rowBytes; ++i) {
                    buffer[j++] = (prevRow[i] + rawBytes[i]) & 0xff; // eslint-disable-line
                }
                break;
            case 3:
                for (i = 0; i < pixBytes; ++i) {
                    buffer[j++] = (prevRow[i] >> 1) + rawBytes[i]; // eslint-disable-line
                }
                for (; i < rowBytes; ++i) {
                    buffer[j] = (((prevRow[i] + buffer[j - pixBytes]) >> 1) + rawBytes[i]) & 0xff; // eslint-disable-line
                    j++;
                }
                break;
            case 4:
                for (i = 0; i < pixBytes; ++i) {
                    up = prevRow[i]; // eslint-disable-line
                    c = rawBytes[i]; // eslint-disable-line
                    buffer[j++] = up + c;
                }
                for (; i < rowBytes; ++i) {
                    up = prevRow[i]; // eslint-disable-line
                    var upLeft = prevRow[i - pixBytes];
                    var left = buffer[j - pixBytes];
                    var p = left + up - upLeft;
                    var pa = p - left;
                    if (pa < 0) {
                        pa = -pa;
                    }
                    var pb = p - up;
                    if (pb < 0) {
                        pb = -pb;
                    }
                    var pc = p - upLeft;
                    if (pc < 0) {
                        pc = -pc;
                    }
                    c = rawBytes[i]; // eslint-disable-line
                    if (pa <= pb && pa <= pc) {
                        buffer[j++] = left + c;
                    }
                    else if (pb <= pc) {
                        buffer[j++] = up + c;
                    }
                    else {
                        buffer[j++] = upLeft + c;
                    }
                }
                break;
            default:
                throw new FormatError("Unsupported predictor: " + predictor);
        }
        this.bufferLength += rowBytes;
    };
    return PdfPredictorStream;
}(_PdfDecodeStream));
export { PdfPredictorStream };
