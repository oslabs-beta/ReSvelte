import React from "react";
import { useState } from "react";
// import { parse } from 'acorn';


import sidebarParser from "./SidebarParser";


// import PerfomanceDisplay from './components/performanceDisplay';



const App = () => {

  // renders different when uploaded
  const [isUploaded, setUploaded] = useState(false);

  const [importedFiles, setFiles] = useState([]);
  const reader = new FileReader();

  // STRETCH FEATURE : Create a render tree function so that user may upload another file at any given moment and it will rerender tree

  // handler for when user uploads folder
  const changeHandler = (files) => {
    const output = [];
    for (let i = 0; i < files.length; i++) {
      if (files[i].name.includes('.svelte')){
        output.push(<li>{files[i].name}</li>);
      }     
    };

    console.log('files we have access to', files)
    const parse = sidebarParser;
    parse(files[0]);
    //reader.readAsText(files[0], "UTF-8");
    //console.log(data);
    // let ast = parse(reader.readAsText(files[0]), {ecmaVersion: 2020})
    // console.log('ast', ast);

    // walk.simple(ast, {
    //   enter(node){  
    //     console.log('this is the node:',node);
    //     console.log('this is the node type:', node.type);
    //   }
    // } );

    setFiles(output);
    setUploaded(true);

  };


  return( 
    <div >
      {isUploaded ? 
        ( 
          <div>
              <div>
                  {importedFiles}
                </div>
              {/*<PerfomanceDisplay/>*/}
           </div>
        ): 
        (
       <div id='uploadContainer'>
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

// <div id='uploadContainer'>
//         Select the folder you would like to import!
  
//       </div>


/*
          <input title="" type="file" value="import file"  id="files" style="display:none">
            <label for="files" id="import">Import Folder Here</label>
          </input>
*/


/* 

document.addEventListener('DOMContentLoaded',() => {

  var folder = document.getElementById('files').addEventListener('change',(event)=> {

    let files = event.target.files; //files is object
    let fileList = document.getElementById('fileList');

    //console.log(files)

    let root;
    // search for app component/file and create a local variable to append children components to it
    for(const file of files){
      if(file.name === 'App.svelte'){
        root = file;
      }
    }
    console.log('root', root);

    // read the root file and check for children components (imports & instance) <Button />
    const reader = new FileReader();

    reader.readAsText(root)

    reader.addEventListener('load', (rootComponent) => {
        console.log(rootComponent.target.result)
    })
    // store the key/variable pairs for imported name and file [{importedAs: button, file: button.svelte, count: 0, hasRendered: false , key: 0}]
    const resvelte = {}



    for (let i = 0; i < files.length; i++) {
      // handle logic for only grabbing svelte files
      if (files[i].name.includes('.svelte')){
        console.log(files[i])

        let item = document.createElement('li');
        // store path as an attribute of the list element
        item.setAttribute('path',files[i].webkitRelativePath)

        // only store the file name without .svelte
        let name = files[i].name.slice(0,files[i].name.length-7)
        item.innerHTML = name;
        fileList.appendChild(item);

        // read through the files // displays all the code in the file
        const reader = new FileReader();
        const data = reader.readAsText(files[i])
        reader.addEventListener('load', (e) => {
          console.log(e.target.result)
        })

      }

    }
})
})

*/