"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAliases_1 = __importDefault(require("./getAliases"));
const fileNode_1 = __importDefault(require("../components/fileNode"));
const react_1 = __importDefault(require("react"));
const errorMessage_1 = __importDefault(require("../components/errorMessage"));
const parseTree = (root, svelteFiles, setTotalComponents, setTotalRerendering, setError, errorLog) => {
    let rerendering = 0;
    let total = 0;
    const rerenderingComponents = [];
    let reactRoot = react_1.default.createElement(fileNode_1.default, { fileName: root.fileName, fileType: 'svelteComponent', children: [] });
    const parseFile = (file, parentAliases = {}, parentComponent = reactRoot) => {
        let isRendering = false;
        let aliases = parentAliases;
        if (file.children.length > 0) {
            for (let i = 0; i < file.children.length; i++) {
                file.children[i].parent = file;
                // filter out unnecessary files
                if (file.children[i].type !== "svelteComponent" && file.children[i].type !== "svelteElement" && file.children[i].type !== 'svelteScript' && file.children[i].type !== 'svelteDynamicContent' && file.children[i].type !== 'svelteBranchingBlock') {
                    continue;
                }
                if (file.children[i].type === 'svelteScript') {
                    aliases = (0, getAliases_1.default)(file.children[i]);
                    if (aliases === undefined) {
                        aliases = parentAliases;
                    }
                    continue;
                }
                else if (file.children[i].type === 'svelteDynamicContent' || file.children[i].type === 'svelteBranchingBlock') {
                    isRendering = true;
                }
                else if (file.children[i].type === 'svelteComponent') {
                    const newComponent = react_1.default.createElement(fileNode_1.default, { fileName: file.children[i].tagName, fileType: file.children[i].type, children: [] });
                    let hasAlias = false;
                    for (let j = 0; j < svelteFiles.length; j++) {
                        if (svelteFiles[j].fileName === aliases[file.children[i].tagName]) {
                            hasAlias = true;
                            parseFile(svelteFiles[j], aliases, newComponent);
                        }
                    }
                    if (!hasAlias) {
                        setError([...errorLog, react_1.default.createElement(errorMessage_1.default, { errorCode: 404, errorMessage: `Failed to Find Import for ${file.children[i].tagName}` })]);
                        continue;
                    }
                    parentComponent.props.children.push(newComponent);
                    total++;
                }
                else {
                    // type of svelteElement
                    const newComponent = (react_1.default.createElement(fileNode_1.default, { fileName: file.children[i].tagName, fileType: file.children[i].type, children: [] }));
                    parseFile(file.children[i], aliases, newComponent);
                    parentComponent.props.children.push(newComponent);
                }
            }
            if (isRendering) {
                // storing the rerendering components
                let currParent = file;
                while (currParent.parent) {
                    currParent = currParent.parent;
                }
                rerenderingComponents.push(currParent);
                rerendering++;
            }
        }
        else {
            parentComponent.props.children.pop();
        }
    };
    // rerendering: 6
    // total: 10
    parseFile(root);
    console.log('Actively Rerendering Components:', rerenderingComponents);
    setTotalComponents(total);
    setTotalRerendering(rerendering);
    return reactRoot;
};
module.exports = parseTree;
//# sourceMappingURL=parseTree.js.map