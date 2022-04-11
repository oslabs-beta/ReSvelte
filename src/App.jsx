import React from "react";
import { useState } from "react";
// import 'App.css';


const App = () => {

  const [path, setPath] = useState(null);

  
  return(
    <div >
        <div id='uploadContainer'>
          <h2>Select the folder you would like to import!</h2>
          <input id='uploadButton' directory="" webkitdirectory="" type="file" ></input>

          
        </div>
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