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
require("../styles.scss");
const io_1 = require("react-icons/io");
const FileNode = (props) => {
    const childList = [];
    const finalList = [];
    const [showChildren, setShow] = (0, react_1.useState)(false);
    const [componentChildren, setChildren] = (0, react_1.useState)();
    const aliases = {};
    function createTree(file) {
        for (let i = 0; i < file.children.length; i++) {
            // ignore reading scripts for now
            if (file.children[i].tagName === 'script')
                continue;
            console.log(file.children[i].type);
            if (file.children[i].type !== 'svelteComponent' && file.children[i].type !== 'svelteElement')
                continue;
            // different function if we run into svelte element
            //create empty obj
            //store svelte component in the empty obj
            //
            console.log('this is what file looks like', file);
            // console.log('yessir', (file.children[0].children.value).indexOf(file.children[i].tagName))
            // if we go into an element we need to push to the last component we were in
            if (file.children[i].type === 'svelteElement') {
                // console.log('this is what file children.value looks like', file.children[0].children.value)
                // console.log('yessir', (file.children[0].children.value).indexOf(file.children[i].tagName))
                childList.push(react_1.default.createElement(FileNode, { children: file.children[i].children, fileName: file.children[i].tagName, fileType: 'svelteElement' }));
            }
            else {
                // console.log('this is what file children.value looks like', file)
                // console.log('yessir', (file.children[0].children.value).indexOf(file.children[i].tagName))
                childList.push(react_1.default.createElement(FileNode, { children: file.children[i].children, fileName: file.children[i].tagName, fileType: 'svelteComponent' }));
            }
            // if(props.children[i].type === 'svelteComponent'){
            //   finalList.push(props.children[i].tagName);
            // }
        }
    }
    // function getComponents(list){
    //   console.log('list',list);
    //   console.log(list[0].props.children);
    //   for(let i = 0; i < list.length; i++){
    //     if(list[i].props.children){
    //       for(let j = 0; j < list[j].props.children.length; j++){
    //         if(list[i].props.children[j].type === 'svelteComponent'){
    //           finalList.push(list[i].props.children[j]);
    //         }
    //       }
    //     }
    //   }
    // }
    // render children in here
    if (props.children) {
        createTree(props);
    }
    return (react_1.default.createElement("div", { id: 'treeNode' }, props.fileType === 'svelteElement' ?
        react_1.default.createElement("div", null,
            props.children.length ?
                showChildren ?
                    react_1.default.createElement("button", { id: 'expandButton', onClick: () => setShow(!showChildren) },
                        props.fileName,
                        "    ",
                        react_1.default.createElement(io_1.IoIosArrowUp, { className: "arrow" }))
                    : react_1.default.createElement("button", { id: 'expandButton', onClick: () => setShow(!showChildren) },
                        props.fileName,
                        "    ",
                        react_1.default.createElement(io_1.IoIosArrowDown, { className: "arrow" }))
                : null,
            react_1.default.createElement("div", { id: 'childrenNodes' }, showChildren ? childList : null))
        :
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { id: 'componentNode' },
                    "Component",
                    react_1.default.createElement("div", null,
                        "Name: ",
                        props.fileName),
                    react_1.default.createElement("div", null,
                        "Children: ",
                        props.children ? props.children.length : 0),
                    props.children.length ?
                        showChildren ?
                            react_1.default.createElement("button", { id: 'expandButton', onClick: () => setShow(!showChildren) },
                                react_1.default.createElement(io_1.IoIosArrowUp, { className: "arrow" }))
                            : react_1.default.createElement("button", { id: 'expandButton', onClick: () => setShow(!showChildren) },
                                react_1.default.createElement(io_1.IoIosArrowDown, { className: "arrow" }))
                        : null),
                react_1.default.createElement("div", { id: 'childrenNodes' }, showChildren ? childList : null))));
};
exports.default = FileNode;
//# sourceMappingURL=fileNode.js.map