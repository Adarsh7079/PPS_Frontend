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
define(["require", "exports", "@syncfusion/ej2-base/helpers/e2e"], function (require, exports, e2e_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InPlaceEditorHelper = (function (_super) {
        __extends(InPlaceEditorHelper, _super);
        function InPlaceEditorHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        InPlaceEditorHelper.prototype.getElement = function () {
            return this.selector('#' + this.id);
        };
        InPlaceEditorHelper.prototype.getValueElement = function () {
            return this.selector('#' + this.id + ' .e-editable-value');
        };
        InPlaceEditorHelper.prototype.getEditIconElement = function () {
            return this.selector('#' + this.id + ' .e-editable-overlay-icon');
        };
        InPlaceEditorHelper.prototype.getPopupElement = function () {
            return this.selector('.e-inplaceeditor-tip');
        };
        InPlaceEditorHelper.prototype.getLoadingElement = function (mode) {
            return (mode === 'Popup' ? this.selector('.e-inplaceeditor-tip .e-editable-loading') : this.selector('#' + this.id + ' .e-editable-loading'));
        };
        InPlaceEditorHelper.prototype.getErrorElement = function (mode) {
            return (mode === 'Popup' ? this.selector('.e-inplaceeditor-tip .e-editable-error') : this.selector('#' + this.id + ' .e-editable-error'));
        };
        InPlaceEditorHelper.prototype.getFormElement = function (mode) {
            return (mode === 'Popup' ? this.selector('.e-inplaceeditor-tip .e-editable-form') : this.selector('#' + this.id + ' .e-editable-form'));
        };
        InPlaceEditorHelper.prototype.getButtonsWrapper = function (mode) {
            return (mode === 'Popup' ? this.selector('.e-inplaceeditor-tip .e-editable-action-buttons') : this.selector('#' + this.id + ' .e-editable-action-buttons'));
        };
        InPlaceEditorHelper.prototype.getSaveButton = function (mode) {
            return (mode === 'Popup' ? this.selector('.e-inplaceeditor-tip .e-btn-save') : this.selector('#' + this.id + ' .e-btn-save'));
        };
        InPlaceEditorHelper.prototype.getCancelButton = function (mode) {
            return (mode === 'Popup' ? this.selector('.e-inplaceeditor-tip .e-btn-cancel') : this.selector('#' + this.id + ' .e-btn-cancel'));
        };
        InPlaceEditorHelper.prototype.getComponentWrapper = function (mode) {
            return (mode === 'Popup' ? this.selector('.e-inplaceeditor-tip .e-editable-component') : this.selector('#' + this.id + ' .e-editable-component'));
        };
        InPlaceEditorHelper.prototype.getComponentElement = function (mode) {
            return (mode === 'Popup' ? this.selector('.e-inplaceeditor-tip #' + this.id + '_editor') : this.selector('#' + this.id + '  #' + this.id + '_editor'));
        };
        InPlaceEditorHelper.prototype.getModel = function (property) {
            this.getModel(property);
        };
        InPlaceEditorHelper.prototype.setModel = function (property, value) {
            this.setModel(property, value);
        };
        InPlaceEditorHelper.prototype.invoke = function (fName, args) {
            this.invoke(fName, args);
        };
        return InPlaceEditorHelper;
    }(e2e_1.TestHelper));
    exports.InPlaceEditorHelper = InPlaceEditorHelper;
});
