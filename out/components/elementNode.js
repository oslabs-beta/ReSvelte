"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const io_1 = require("react-icons/io");
const ai_1 = require("react-icons/ai");
const elementNode = (props) => {
    const [showChildren, setShow] = (0, react_1.useState)(false);
    return (react_1.default.createElement("div", null,
        // if there are children
        props.children ? (
        // if current state of showchildren is truthy
        showChildren ? (
        // create up arrow icon
        react_1.default.createElement("button", { id: "expandButton", onClick: () => setShow(!showChildren) },
            " ",
            react_1.default.createElement(ai_1.AiFillFolderOpen, null),
            props.fileName,
            react_1.default.createElement(io_1.IoIosArrowUp, { className: "arrow" }))) : (
        // otherwise create down arrow icon
        react_1.default.createElement("button", { id: "expandButton", onClick: () => setShow(!showChildren) },
            " ",
            react_1.default.createElement(ai_1.AiFillFolder, null),
            props.fileName,
            react_1.default.createElement(io_1.IoIosArrowDown, { className: "arrow" })))) : // if no child don't show any button
            null,
        react_1.default.createElement("div", { id: "childrenNodes" }, showChildren ? props.children : null)));
};
exports.default = elementNode;
//# sourceMappingURL=elementNode.js.map