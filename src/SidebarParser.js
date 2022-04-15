import { async } from 'regenerator-runtime';
import { parse } from 'svelte-parse';
const svelteParser =  parse;


// check later if async is necessary here
async function sidebarParser(file) {
  // if this file has already been parsed, dont parse again
  // if(svelteFiles.(file.name).parsedData) return;

  //check later if 87 and 88 need to be here or in the return
  const fileObj ={};
  const childComponents = [];

//returning a function that is a promise, takes in 2 params, resolve is a function that sets the status of promise to finished, reject is a catch
  return new Promise( async (resolve, reject) =>  {
    
    var reader = new FileReader();  
    // 97-113 is like a .then
    // svelte parser needs a string, below converts to string and stores in reader
    // file is an object?
    reader.readAsText(file);
    reader.onerror = reject;
    // .onload runs once the above finishes
    reader.onload = () => {
    console.log('finished');

    // check if we have parsed this component before
   // if (svelteFiles.some(e => e.fileName === file.fileName)) return;
   // stores the parsed version of the file
    const parsedData = svelteParser({ value: reader.result});
    console.log(parsedData);
      // data has filename and children
    for(let i = 0; i < parsedData.children.length; i++){

      // checking for just svelteelement and svelte component and svelte script and pushing into childComponents
      // svelte element any type of tags that allow us to write anything inside it <main> <div> <h1> etc.
      // svelte component the import at the top of file e.g. import FileButton from ./Button.svelte
      // svelte script basically anything in script tag <script></script>
      if(parsedData.children[i].type === 'svelteElement' || parsedData.children[i].type === 'svelteComponent' || parsedData.children[i].type === 'svelteScript'){    
        console.log('found sveltetype', parsedData.children[i]);
        // need to parse again? children aren't parsed


        // parse the svelte element but not components and push that as a children !!!!!!!!!!!!!!!!!!!!!!!!!!! Maybe
        childComponents.push(parsedData.children[i]);

      }

     
    };
    // store parsed data
  // elements in svelte files in app.jsx
    fileObj.fileName = file.name; // name of file
    fileObj.children = childComponents; // an array
    fileObj.parsedData = parsedData; // data object //might not need if able to parse line 122
    
// returning whole fileObj of the current file
// used in app.jsx line 63
    resolve(fileObj);
   };
   
   
 });
}


export default sidebarParser;
