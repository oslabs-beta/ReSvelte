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
const Ai_1 = require("react-icons/Ai");
// filenode component takes in children and filename
const FileNode = (props) => {
    const childList = [];
    const finalList = [];
    const [showChildren, setShow] = (0, react_1.useState)(false);
    const [componentChildren, setChildren] = (0, react_1.useState)();
    const aliases = {};
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////area to refactor code /// multiple 'for' loops/////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // creates the tree; file is props
    // don't need to create tree if no children
    function createTree() {
        // search for a script tag and parse
        for (let i = 0; i < props.children.length; i++) {
            if (props.children[i].tagName === 'script') {
                // traverse the children of the parsedData
                // grab only svelteComponents
                //<script> tags only take text, cannot have components etc., script elements only have 1 child, text
                // grab import ... statements
                console.log('children array', props.children[i].children[0].value.split('\n')); // an array that is separated with each new line
                let childrenValue = props.children[i].children[0].value.split('\n'); // childrenValue is the text that is in the script
                for (let i = 0; i < childrenValue.length; i++) {
                    // if element has string .includes('import' && 'from') 
                    if (childrenValue[i].includes('import') && childrenValue[i].includes('from')) {
                        // grab the renamed component and the file name
                        console.log('childrenValue', childrenValue[i]);
                        const currentImport = childrenValue[i].trim(); //ex. "     import B from ./B.svelte    " ===> "import b from ./b.svelte"
                        console.log('currently imported', currentImport);
                        // Example: currentImport = import B from./B.svelte";
                        //split again to get the alias ex. "import B from ./B.svelte", getting the 'B' between import and from
                        const words = currentImport.split(' ');
                        // words = ['import', 'B', 'from', './B.svelte';] 
                        // './B';
                        for (let i = 0; i < words.length; i++) {
                            if (words[i] === 'from') {
                                console.log(words[i - 1]); // 'B'  // grabs the word after import
                                console.log(words[i + 1]); // './B.svelte;'  // grabs the path
                            }
                        }
                        // storing tagName in importTag
                        const importTag = words[1];
                        // input = "../components/B.svelte;"         output = "../components/B.svelte" 
                        const importDir = words[words.length - 1];
                        console.log('imported as ', importTag);
                        console.log('importDir', importDir);
                        //  importDir = "../components/Button;"
                        // for (let i = importDir.length- 1; i > 0; i--) {
                        // }
                        // importDir = '../compoennt/B.svelte'
                        let svelteComponentName = '';
                        // 
                        //       below output: Button.svelte";
                        //want to remove the ., ",', /, ;
                        for (let i = importDir.length - 1; i >= 0; i -= 1) {
                            if (importDir[i] === '/') {
                                break;
                            }
                            if (importDir[i] !== ';' && importDir[i] !== '"' && importDir[i] !== " ' " && importDir[i] !== `.`) {
                                svelteComponentName += importDir[i];
                            }
                        }
                        svelteComponentName = svelteComponentName.split('').reverse().join('');
                        if (svelteComponentName.includes('svelte')) {
                            svelteComponentName = svelteComponentName.replace('svelte', '.svelte');
                        }
                        else {
                            svelteComponentName += '.svelte';
                        }
                        console.log('this is ittttttttt', svelteComponentName);
                        aliases[importTag] = svelteComponentName;
                    }
                    console.log('aliases shown here', aliases);
                }
                break;
            }
        }
    }
    //   for(let i = 0; i < props.children.length; i++){
    //     // ignore reading scripts for now
    //     if(props.children[i].tagName === 'script') continue;
    //     // alias handling, pass alias down as props for each element for reference
    //     // cons
    //     // console.log('yessir', (props.children[0].children[0].value).indexOf(props.children[i].tagName))
    //     //ignore the combo of svelteComponent and svelteElement
    //     if(props.children[i].type !== 'svelteComponent' && props.children[i].type !== 'svelteElement') continue;
    //     // different function if we run into svelte element
    //     //create empty obj
    //     //store svelte component in the empty obj
    //     //
    //     // console.log('this is what file looks like', file)
    //     // if we go into an element we need to push to the last component we were in
    //     if(props.children[i].type === 'svelteElement'){
    //       // console.log('this is what file children.value looks like', file.children[0].children.value)
    //       // console.log('yessir', (props.children[0].children.value).indexOf(props.children[i].tagName))
    //       childList.push(<FileNode children={props.children[i].children} fileName={props.children[i].tagName} fileType={'svelteElement'}/>);
    //     } else{
    //       // console.log('this is what file children.value looks like', file)
    //       childList.push(<FileNode children={props.children[i].children} fileName={props.children[i].tagName} fileType={'svelteComponent'}/>);
    //     }
    //     // if(props.children[i].type === 'svelteComponent'){
    //     //   finalList.push(props.children[i].tagName);
    //     // }
    //   }
    // }
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
    // render children in here
    if (props.children) {
        createTree();
    }
    // when there is no children
    return (react_1.default.createElement("div", { id: 'treeNode' }, //if filetype is svelteelement, run code below
    props.fileType === 'svelteElement' ?
        (react_1.default.createElement("div", null,
            //if there is a length, if there is children
            props.children.length ?
                (
                // if current state of showchildren is truthy
                showChildren ?
                    // create up arrow icon
                    react_1.default.createElement("button", { id: 'expandButton', onClick: () => setShow(!showChildren) },
                        " ",
                        react_1.default.createElement(Ai_1.AiFillFolderOpen, null),
                        props.fileName,
                        react_1.default.createElement(io_1.IoIosArrowUp, { className: "arrow" }))
                    // otherwise create down arrow icon
                    : react_1.default.createElement("button", { id: 'expandButton', onClick: () => setShow(!showChildren) },
                        " ",
                        react_1.default.createElement(Ai_1.AiFillFolder, null),
                        props.fileName,
                        react_1.default.createElement(io_1.IoIosArrowDown, { className: "arrow" })))
                // if no child don't show any button
                : null,
            react_1.default.createElement("div", { id: 'childrenNodes' }, showChildren ? childList : null)))
        : //otherwise do this stuff
            (react_1.default.createElement("div", null,
                react_1.default.createElement("div", { id: 'componentNode' },
                    "Component",
                    react_1.default.createElement("div", null,
                        "Name: ",
                        props.fileName),
                    react_1.default.createElement("div", null,
                        "Children: ",
                        props.children ? props.children.length : 0),
                    props.children.length ?
                        (showChildren ?
                            react_1.default.createElement("button", { id: 'expandButton', onClick: () => setShow(!showChildren) },
                                react_1.default.createElement(io_1.IoIosArrowUp, { className: "arrow" }))
                            : react_1.default.createElement("button", { id: 'expandButton', onClick: () => setShow(!showChildren) },
                                react_1.default.createElement(io_1.IoIosArrowDown, { className: "arrow" })))
                        : null),
                react_1.default.createElement("div", { id: 'childrenNodes' }, showChildren ? childList : null)))));
};
exports.default = FileNode;
//# sourceMappingURL=fileNode.js.map