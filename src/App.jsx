import React from "react";
import { useState } from "react";

import sidebarParser from "./SidebarParser";
import PerfomanceDisplay from './components/performanceDisplay';
import ErrorMessage from './components/errorMessage';
import parseTree from './parser/parseTree';

const App = () => {

  const [isUploaded, setUploaded] = useState(false);
  const [errorLog, setError] = useState([]);
  const [totalComponents, setTotalComponents] = useState(0);
  const [totalRerendering, setTotalRerendering] = useState();
  const [filesDisplay, setReactFiles] = useState([]);
  const [root, setRoot] = useState(); // reference line 107

  const svelteFiles = [];
  let mainFile;
  

  

  //////////////////STRETCH FEATURE : Create a render tree function so that user may upload another file at any given moment and it will rerender tree///////////////////

  // handler for when user uploads folder
    // grab only svelte files and pass them into the parser
    // parser will return a root node of the application
    // invoke the component tree builder with the returned node from parser

  const changeHandler = async (files) => {
    console.log('Inside upload handler');

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

        const fileObj = await sidebarParser(files[i]);

        if(fileObj.fileName === 'App.svelte' || fileObj.fileName === 'app.svelte'){
          mainFile = fileObj;
        }

        svelteFiles.push(fileObj); 


        // react component rendering (TEMPORARY)
        // shows all the components that should be in the tree
        output.push(<li>{files[i].name}</li>);

      }
    };

    // invalid svelte project error
    if (svelteFiles.length === 0) { return setError([...errorLog, <ErrorMessage errorCode={404} errorMessage={'No Svelte Files Detected in Folder'}/>,]);};
    if (!mainFile) {return setError([...errorLog, <ErrorMessage errorCode={404} errorMessage={'Failed to Locate Root File'}/>]);};

    console.log('Building tree...');
    setRoot(parseTree(mainFile, svelteFiles, setTotalComponents, setTotalRerendering, setError, errorLog));
    setUploaded(true);
    
    /////// test uploading errors //////////
    setReactFiles(output);
    


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
          
          {
            errorLog.length === 0 ?
            null
            :
            <div>
              <h4>Plase upload another folder</h4>
              {errorLog}
            </div>
          }
        </div>

        )
      }
    </div>
  );
};

export default App;

