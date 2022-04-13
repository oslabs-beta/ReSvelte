
const reader = new FileReader();
import { parse } from 'svelte-parse';
const svelteParser = parse;

/*
- create a component tree from imported data
- LOGIC
  - parse each file
  - add components as a child of the parent
  - parse each component recursively and do the same

-parse input file and send back data to react app to display
needed data:
  - total components
  - total rerendering components
  - errors?
  -

*/
    /////////////// PLAN OF ATTACK ///////////////////
  /*
  - get the children of the root
  - parse through those children
    
    - ONLY scan the following to search for component :
    - svelteElement or svelteComponent
    - Script to match the imported elements to the rendered components

    check for:
    - components called but not imported
    - conditional rendering
    - renaming components on import

    expected components: 
  */
//  ------------------
/* //Things to consider
//what if component is not imported but is placed in a tag and user wants to render it?
    //the svelteComponent for that component will still render 
    //so we still need to search in the script tag to see if the componenet is imported and search in the main or div tag to see if it was actually rendered 
    //we want to also alert the user that they did not import this component
//we need to capture the variable name of the import
//we also need to capture the file name that is in quotes...for later use
//edge case: conditional rendering (if,else). To think about later on*/

// function Component (children) {

//   this.children = children;
//   this.totalComponents = children.length;
//   this.rerenderingComponents = 0;
// }



//helper functions
// function that searches imported files
// function that searches for components 
// function to compare imported files to rendered component

// function to only parse children of svelteElement or svelteComponent types
function parseTree(file , setSvelteFiles, svelteFiles){
  // if this file has already been parsed, dont parse again
  //if(svelteFiles.(file.name).parsedData) return;
  const fileObj ={};
  const childComponents = [];

  reader.readAsText(file);
  reader.onload = (event) => {
    console.log('current file:',event.target.result)
    const data = svelteParser({ value: event.target.result});
    console.log('parsed', data);

   

    
    for(let i = 0; i < data.children.length; i++){
      if(data.children[i].type === 'svelteElement' || data.children[i].type === 'svelteComponent' || data.children[i].type === 'svelteScript'){    
        //parseComponent(data.children[i])
        console.log('found svelte component')
        childComponents.push(data.children[i]);
      }

    }
    fileObj.fileName = file.name;
    fileObj.parsedData = data;
    fileObj.children = childComponents;


  };
 
  console.log(fileObj)
  setSvelteFiles([...svelteFiles, fileObj]);
  //return fileObj;
}


// COMPONENT INTERFACE////
/*
FileName: 
ParsedData:
ChildComponents:


*/


//  // takes in source code as string
// function parseComponent(file, setSvelteFiles, svelteFiles){
//   // if size of the file is 0 dont run

//     console.log('file:',file);
//     const fileObj = parseTree(file);

//     // const fileObj = {
//     //   // fileName: 
//     //   // parsedData:
//     //   children: children
//     // }

   
//     // for(let i = 0; i < children.length; i++){
//     //   const currentFile = children[i];
//     // }
//     ; // returns an array of parsed components to parse



//     //console.log(event.target.result);
 

//     //data is an object with {type:root, chldren:array}
//     // function to read tagName === 'script'

//     // function to only grab children with type of 'svelteElement' or 'svelteComponent'

//     // invocation of recursion through each child component 
//     // for(const currFile of validComponents){
//     //   sidebarParser(currFile)
//     // }
    
    
//     setSvelteFiles([...svelteFiles, fileObj]);
//   };




 

  
  

export default parseTree;
