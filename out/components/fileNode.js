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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("../styles.scss");
const redArrow_png_1 = __importDefault(require("../../assets/redArrow.png"));
const FileNode = (props) => {
    const childList = [];
    const [showChildren, setShow] = (0, react_1.useState)(false);
    // render children in here
    if (props.children) {
        for (let i = 0; i < props.children.length; i++) {
            // ignore reading scripts for now
            if (props.children[i].tagName === 'script')
                continue;
            console.log(props.children[i].type);
            if (props.children[i].type !== 'svelteComponent' && props.children[i].type !== 'svelteElement')
                continue;
            childList.push(react_1.default.createElement(FileNode, { children: props.children[i].children, fileName: props.children[i].tagName }));
        }
    }
    return (react_1.default.createElement("div", { id: 'componentNode' },
        react_1.default.createElement("div", null,
            "NAME: ",
            props.fileName),
        react_1.default.createElement("div", null,
            "Children: ",
            props.children ? props.children.length : 0),
        props.children.length ? /*<button onClick={() => setShow(!showChildren)}> show children</button>*/
            react_1.default.createElement("input", { type: 'image', src: redArrow_png_1.default }) : null,
        react_1.default.createElement("div", { id: 'childrenNodes' }, showChildren ? childList : null)));
};
exports.default = FileNode;
//# sourceMappingURL=fileNode.js.map