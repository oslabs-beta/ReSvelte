import React from "react";
import { useState, useEffect } from "react";


import sidebarParser from "./SidebarParser";
import PerfomanceDisplay from './components/performanceDisplay';
import ErrorMessage from './components/errorMessage';



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

  // STRETCH FEATURE : Create a render tree function so that user may upload another file at any given moment and it will rerender tree

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



  const changeHandler = async (files) => {

//File is an object that is inside of FileList

    const output = [];
    let mainFile;

    for (let i = 0; i < files.length; i++) {
      if (files[i].name.slice(-7) === '.svelte'){
        console.log('Parsing:',files[i].name);

        const data = await sidebarParser(files[i]);

        // search for main file to parse through later
        if(data.fileName === 'App.svelte' || data.fileName === 'app.svelte'){
          mainFile = data;
          //data is a child node
        }

        // store to global svelte files array
        svelteFiles.push(data);


        // react component rendering (TEMPORARY)
        output.push(<li>{files[i].name}</li>);

      }
    };

    
    buildTree(mainFile);

    console.log('svelteFiles',svelteFiles)
    // console.log('accessable files', files);
    // const parse = sidebarParser;
    // parse(files[3]);
    console.log('output:', output)
    console.log('mainFile:',mainFile);



    // test uploading errors
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

            /// ******ended here*****

  // takes in app 
  const buildTree = (component) => {
    console.log('inside buid tree',component);
    // base case

    // search if there are any child components, if there is

    // append children to parent

    // if there is no child, then return 


    // recursively call each child component
    
    // check current

    // return node


    
  }

  function checkHooks(){

    console.log(svelteFiles)
  }


  return(
    <div >
      {isUploaded ?
        (
          <div className="appDisplay">
              <div>
                  {filesDisplay}
                </div>
              <PerfomanceDisplay {...{errorLog, totalComponents, totalRerendering}}/>
           </div>
        ):
        (
       <div id='uploadContainer' className="appDisplay">
            <h2>Select the folder you would like to import!</h2>
            <input
            onChange={(event) => {
              changeHandler(event.target.files);
              checkHooks()
            }
          } id='uploadButton' directory="" webkitdirectory="" type="file" ></input>
          </div>

        )
      }
    </div>
  );
};

export default App;

