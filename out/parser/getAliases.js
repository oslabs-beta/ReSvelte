"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAliases = (file) => {
    // traverse the children of the parsedData
    // grab only svelteComponents
    //<script> tags only take text, cannot have components etc., script elements only have 1 child, text
    // grab import ... statements
    const aliases = {};
    //console.log('children array', file.children[0].value.split('\n')); // an array that is separated with each new line
    let childrenValue = file.children[0].value.split('\n'); // childrenValue is the text that is in the script
    for (let i = 0; i < childrenValue.length; i++) {
        // if element has string .includes('import' && 'from')
        if (childrenValue[i].includes('import') && childrenValue[i].includes('from')) {
            // grab the renamed component and the file name
            //console.log('childrenValue', childrenValue[i]);
            const currentImport = childrenValue[i].trim(); //ex. "     import B from ./B.svelte    " ===> "import b from ./b.svelte"
            //console.log('currently imported', currentImport);
            // Example: currentImport = import B from./B.svelte";
            //split again to get the alias ex. "import B from ./B.svelte", getting the 'B' between import and from
            const words = currentImport.split(' ');
            // words = ['import', 'B', 'from', './B.svelte';]
            // storing tagName in importTag
            const importTag = words[1]; // 'B'
            // input = "../components/B.svelte;"         output = "../components/B.svelte"
            const importDir = words[words.length - 1]; // ../components/B.svelte
            //console.log('imported as ', importTag);
            //console.log('importDir', importDir);
            let svelteComponentName = '';
            // want to remove the ., ",', /, ;
            for (let i = importDir.length - 1; i >= 0; i -= 1) { // loop begins at the end of the import string and works backwards
                if (importDir[i] === '/') { // once the loop reaches the / 
                    break; // break because we don't want anything after the /
                }
                // ignore any ., ",', /, ;
                if (importDir[i] !== ';' && importDir[i] !== '"' && importDir[i] !== " ' " && importDir[i] !== `.`) {
                    // currently reversed / incorrect -> etlevsB
                    svelteComponentName += importDir[i];
                }
            }
            svelteComponentName = svelteComponentName.split('').reverse().join(''); // reverses and corrects the string  -> Bsvelte
            if (svelteComponentName.includes('svelte')) { // if the string has svelte like above ^
                svelteComponentName = svelteComponentName.replace('svelte', '.svelte'); // then add a . before svelte
            }
            else {
                svelteComponentName += '.svelte';
            } // if the string doesn't have svelte e.g. is just 'B' then add .svelte to it
            //console.log('this is ittttttttt', svelteComponentName);
            // 
            aliases[importTag] = svelteComponentName;
        }
        //console.log('aliases shown here', aliases);
    }
    return aliases;
};
exports.default = getAliases;
//# sourceMappingURL=getAliases.js.map