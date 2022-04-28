"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("../styles.scss");
const elementNode_1 = __importDefault(require("../components/elementNode"));
const componentNode_1 = __importDefault(require("../components/componentNode"));
const fileNode = (props) => {
    console.log('children:', props.children);
    return (react_1.default.createElement("div", { id: "treeNode" }, 
    //if filetype is svelteelement, run code below
    props.fileType === "svelteElement" ? (react_1.default.createElement(elementNode_1.default, { children: props.children, fileName: props.fileName })) : (react_1.default.createElement(componentNode_1.default, { children: props.children, fileName: props.fileName }))));
};
exports.default = fileNode;
//# sourceMappingURL=fileNode.js.map