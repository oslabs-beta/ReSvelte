"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("../styles.scss");
const errorMessage = (props) => {
    return (react_1.default.createElement("div", { id: 'errorMessage' },
        props.errorCode,
        " : ",
        props.errorMessage,
        "\"svelte component called, but not imported\""));
};
exports.default = errorMessage;
//# sourceMappingURL=errorMessage.js.map