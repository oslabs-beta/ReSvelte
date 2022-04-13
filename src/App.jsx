import React from "react";
import { useState } from "react";


import sidebarParser from "./SidebarParser";
import PerfomanceDisplay from './components/performanceDisplay';
import ErrorMessage from './components/errorMessage';



const App = () => {

 
  const [isUploaded, setUploaded] = useState(false);
  const [errorLog, setError] = useState([]);
  const [components, setComponents] = useState([]);
  const [totalComponents, setTotalComponents] = useState();
  const [totalRerendering, setTotalRerendering] = useState();

  const [svelteFiles, setSvelteFiles] = useState([]);
  const [filesDisplay, setReactFiles] = useState([]);
  const reader = new FileReader();

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

  const changeHandler = (files) => {
    
//File is an object that is inside of FileList
    
    const output = [];
    const svelteFiles = [];
    let mainFile;

    

    for (let i = 0; i < files.length; i++) {
      if (files[i].name.includes('.svelte')){
        sidebarParser(files[i], setSvelteFiles, svelteFiles)

        // let data;
        // reader.readAsText(files[i]);
        // reader.onload = (event) => {
        
        //   data = parse({ value: event.target.result});
        
        // };
        // svelteFiles.push(
        //   {
        //     fileName: files[i].name,
        //     parsedData: data,
        //     childComponents: []
        //   }
        // );

        output.push(<li>{files[i].name}</li>);

        // instead of this, we would look in our array of objects for it and pass that component object in for rendering
        // if(files[i].name === 'App.svelte' || files[i].name === 'app.svelte'){
        //   mainFile = files[i];
        // }
      }     
    };


    console.log(svelteFiles);
    

    // console.log('accessable files', files);
    // const parse = sidebarParser;
    // parse(files[3]);
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

    setSvelteFiles(svelteFiles);
    setReactFiles(output);
    setUploaded(true);

    return sidebarParser(mainFile);
    //console.log('svelteFiles', svelteFiles)
  };


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
            }
          } id='uploadButton' directory="" webkitdirectory="" type="file" ></input>  
          </div> 
          
        )
      }
    </div>
  );
};

export default App;      

