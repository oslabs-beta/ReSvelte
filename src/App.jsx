import React from "react";
import { useState, useEffect } from "react";

import sidebarParser from "./SidebarParser";
import PerfomanceDisplay from './components/performanceDisplay';
import ErrorMessage from './components/errorMessage';
import FileNode from './components/fileNode';

const App = () => {

  const [isUploaded, setUploaded] = useState(false);
  const [errorLog, setError] = useState([]);
  const [components, setComponents] = useState([]);
  const [totalComponents, setTotalComponents] = useState();
  const [totalRerendering, setTotalRerendering] = useState();

  //const [svelteFiles, setSvelteFiles] = useState([]);
  const [filesDisplay, setReactFiles] = useState([]);
  const reader = new FileReader();

  const svelteFiles = [];
  //let root;
  const [root, setRoot] = useState(); // reference line 107
  let mainFile;

  //////////////////STRETCH FEATURE : Create a render tree function so that user may upload another file at any given moment and it will rerender tree///////////////////

  // handler for when user uploads folder
    // this function will:
    // grab only svelte files and pass them into the parser
    // parser will return a root node of the application
    // invoke the component tree builder with the returned node from parser
      // component tree builder is expecting an object of node type

  // inside the tree builder,
  /*
    // NODE TYPE
    interface Node{
      rerenderingComponents: number,
      totalComponents: number,
      children: node[],
    }

  */


    
    // files = everything in the folder that was imported e.g. 1129 files
  const changeHandler = async (files) => {

// File is an object that is inside of FileList

    const output = [];
    
// clean up code, refactor; no need to look at node_modules (only needs to look through folder where components could potentionally be)

/* 
loop below handles:
 1. finds svelte files
 2. parses through each svelte file using sidebarparser which return a fileObj
 3. makes the fileObj which has the filename, children and data(parsed file that contains parsed children)
 4. finds the app.svelte file (main application file) in fileObj
 5. pushed the fileObj to the svelteFiles array

*/
    for (let i = 0; i < files.length; i++) {
      // checking if last 7 characters is .svelte
      if (files[i].name.slice(-7) === '.svelte'){
        console.log('Parsing:',files[i].name);
        // waiting for sidebarParser function to finish before moving on 
        // will only pass in svelte files
        
        // svelteParsed data
        const fileObj = await sidebarParser(files[i]);
        
        /* 
        fileObj 
        {  
          fileName : file.name,
          children : childComponents,
        }
        */

        // search for main file to parse through later
        // searching for the app.svelte file
        // keeping track of root, because it has all the children, will use it as reference
        if(fileObj.fileName === 'App.svelte' || fileObj.fileName === 'app.svelte'){
          mainFile = fileObj;
        }

        // an empty array
        // store to global svelte files array
        svelteFiles.push(fileObj); // contains filename, childcomponents and parsedata, see line 130 in sidebarparser.js


        // react component rendering (TEMPORARY)
        // shows all the components that should be in the tree
        output.push(<li>{files[i].name}</li>);

      }
    };

    console.log('svelteFiles here',svelteFiles);
    // root = await buildTree(mainFile);
    // only need access to one node which will have all the children and nested
    //updated state by invoking FileNode
    
    // creates tree
    setRoot( <FileNode children={mainFile.children} fileName={mainFile.fileName} svelteFiles={svelteFiles}/> );
    
 

    /////// test uploading errors //////////
    setError([
      <ErrorMessage errorCode={12345} errorMessage={'testing123'}/>,
      <ErrorMessage errorCode={9095033204} errorMessage={'call me maybe'}/>,
      <ErrorMessage errorCode={12} errorMessage={'component error'}/>,
    ]);

    setComponents([
      'someComponent'
    ]);

    setTotalComponents(12);
    setTotalRerendering(9);
    setReactFiles(output);
    setUploaded(true);


  };



  return(
    <div >
      {isUploaded ?
        (
          <div className="appDisplay">
              <div>
                  {filesDisplay}
                  
                </div>
                <h2> Component Tree </h2>
                <div id='componentTree'>
                  {root}
                </div>
                
              <PerfomanceDisplay {...{errorLog, totalComponents, totalRerendering}}/>
           </div>
        ):
        (
       <div id='uploadContainer' className="appDisplay">
            <h2 className="selectFolder">Select the folder you would like to import!</h2>
            <input
            onChange={(event) => {
              changeHandler(event.target.files);

            }
          } id='uploadButton' directory="" webkitdirectory="" type="file" ></input>
          </div>

        )
      }
    </div>
  );
};

export default App;

