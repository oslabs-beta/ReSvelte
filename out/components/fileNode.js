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
const io_1 = require("react-icons/io");
const ai_1 = require("react-icons/ai");
const getAliases_1 = __importDefault(require("../parser/getAliases"));
// filenode component takes in children and filename
const FileNode = (props) => {
    // console.log('this is props.svelteFiles', props.svelteFiles)
    const childList = [];
    const finalList = [];
    const [showChildren, setShow] = (0, react_1.useState)(false);
    const [componentChildren, setChildren] = (0, react_1.useState)();
    let aliases = props.aliases;
    // creates the tree; file is props
    function createTree() {
        // has access to the global props
        // search for a script tag and parse
        console.log(`CREATING TREE FOR ${props.fileName}`);
        console.log(aliases);
        for (let i = 0; i < props.children.length; i++) {
            // loop to generate aliases from out script tag
            if (props.children[i].type !== "svelteComponent" && props.children[i].type !== "svelteElement") {
                continue;
            }
            if (props.children[i].tagName === "script") {
                aliases = (0, getAliases_1.default)(props.children[i]);
                console.log(`Aliases for ${props.children[i].fileName}`, aliases);
                continue;
            }
            //recursion for elements like main,p,h1
            if (props.children[i].type === "svelteElement") {
                childList.push(react_1.default.createElement(FileNode, { children: props.children[i].children, fileName: props.children[i].tagName, fileType: "svelteElement", svelteFiles: props.svelteFiles, aliases: aliases }));
            }
            else {
                //HOW TO PERSIST ALIASES TO THINGS WE WANT IT TO
                // AND NOT THINGS WE DON'T WANT IT TO
                // handles svelte components
                // SEND ERROR IF IT CANT FIND KEY/VALUE PAIR
                // 
                // what we need to do:
                // SEND ARRAY OF CHILDREN FROM THE MATCHING SVELTEFILES OBJ AS PROPS TO REACT COMPONENT
                // iterate through the svelteFiles array
                //////////////////Stopped here thought about making aliases a state///////
                console.log('INSIDE A SVELTE COMPONENT:', props.children[i].tagName);
                console.log('test aliases', aliases);
                // console.log('searching for alias:', aliases[props.children[i].tagName], 'type:', aliases[props.children[i].tagName])
                // console.log("aliases:", aliases);
                let searchStr;
                let hasAlias = false;
                if (aliases[props.children[i].tagName]) {
                    hasAlias = true;
                    searchStr = aliases[props.children[i].tagName];
                }
                if (hasAlias) {
                    for (let i = 0; i < props.svelteFiles.length; i++) {
                        console.log('searching svelte files....');
                        // console.log("tagname:", props.children[i].tagName);
                        //const svelteFileName = props.svelteFiles[i].fileName.toString();
                        // console.log('type of svelteFile:', typeof aliases[props.children[i].tagName])
                        // console.log('alias for this file:', aliases[props.children[i].tagName])
                        // console.log('the svelteFile ', props.svelteFiles[i])
                        console.log('looking at', props.svelteFiles[i].fileName, 'type:', typeof props.svelteFiles[i].fileName);
                        const string = props.svelteFiles[i].fileName;
                        if (string == searchStr) {
                            console.log('matchinggg!');
                            console.log(`Children for ${props.children[i].tagName}`, props.svelteFiles[i].children);
                            childList.push(react_1.default.createElement(FileNode, { children: props.svelteFiles[i].children, fileName: props.children[i].tagName, fileType: "svelteComponent", svelteFiles: props.svelteFiles, aliases: aliases }));
                        }
                    }
                }
                else {
                    childList.push(react_1.default.createElement(FileNode, { children: [], fileName: props.children[i].tagName, fileType: "svelteComponent", svelteFiles: props.svelteFiles, aliases: aliases }));
                }
                console.log('after test');
            }
        }
    }
    // recursion to continuously find children
    // if there are children, continuously invoke createTree on line 21
    if (props.children) {
        createTree();
    }
    // if there are no children left to parse, render/return. Don't need to create/continue tree if no children
    return (react_1.default.createElement("div", { id: "treeNode" }, 
    //if filetype is svelteelement, run code below
    props.fileType === "svelteElement" ? (react_1.default.createElement("div", null,
        // if there is a length, if there is children
        props.children.length ? (
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
        react_1.default.createElement("div", { id: "childrenNodes" }, showChildren ? childList : null))) : (
    //otherwise do this stuff
    react_1.default.createElement("div", null,
        react_1.default.createElement("div", { id: "componentNode" },
            "Component",
            react_1.default.createElement("div", null,
                "Name: ",
                props.fileName),
            react_1.default.createElement("div", null,
                "Children: ",
                props.children ? props.children.length : 0),
            props.children.length ? (showChildren ? (react_1.default.createElement("button", { id: "expandButton", onClick: () => setShow(!showChildren) },
                react_1.default.createElement(io_1.IoIosArrowUp, { className: "arrow" }))) : (react_1.default.createElement("button", { id: "expandButton", onClick: () => setShow(!showChildren) },
                react_1.default.createElement(io_1.IoIosArrowDown, { className: "arrow" })))) : null),
        react_1.default.createElement("div", { id: "childrenNodes" }, showChildren ? childList : null)))));
};
exports.default = FileNode;
//# sourceMappingURL=fileNode.js.map