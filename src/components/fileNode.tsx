import React, { useState } from "react";
import '../styles.scss';

import { IoIosArrowDown, IoIosArrowUp  } from 'react-icons/io';
import { AiFillFolder, AiFillFolderOpen } from 'react-icons/Ai';

// filenode component takes in children and filename
const FileNode = (props) => {

  const childList = [];
  const finalList = [];
  const [showChildren, setShow] = useState(false);
  const [componentChildren, setChildren] = useState();

  const aliases = {};

  //area to refactor code /// multiple 'for' loops
  
// creates the tree; file is props
// don't need to create tree if no children
  function createTree(){ // has access to the global props
    // search for a script tag and parse
//     for (let i = 0; i < props.children.length; i++) {
//       if (props.children[i].tagName === 'script') {

//         // traverse the children of the parsedData
//           // grab only svelteComponents
//           //<script> tags only take text, cannot have components etc., script elements only have 1 child, text
//           // grab import ... statements
//           // an array that is separated with each new line
        
//         console.log('children array', props.children[i].children[0].value.split('\n'))
//         let childrenValue = props.children[i].children[0].value.split('\n');
//         //children Value is the text that is in the script

//         for (let i = 0; i < childrenValue.length; i++) {
//           // if element has string .includes('import' && 'from') 
//           if (childrenValue[i].includes('import') && childrenValue[i].includes('from')) {
//             // grab the renamed component and the file name
//             console.log('childrenValue', childrenValue[i]);
//             const currentImport = childrenValue[i].trim(); //ex. "     import B from ./B.svelte    " ===> "import b from ./b.svelte"
//             console.log('currently imported', currentImport);
//             // Example: currentImport = import B from./B.svelte";
//             // iterate each character and 
           
            
//             //split again to get the alias ex. "import B from ./B.svelte", getting the 'B' between import and from
//             const words = currentImport.split(' ');
//             // words ['import', 'B', 'from', './B.svelte' ,';']
            
//             for (let i = 0; i < words.length; i++) {
//               if (words[i] === 'from') {
//                 console.log(words[i - 1]); // 'B'  // grabs the word after import
//                 console.log(words[i + 1]); // './B.svelte'  // grabs the path
//               } 
//             }
// //////////////////////pick up here/////////////////////////////////////////
//             // input = "../../B.svelte"      ;   output = "B.svelte"
//             const lastword = currentImport[currentImport.length - 1];
//             //lastword = "../../B.svelte" 
//             console.log('lastword', lastword);
//             let svelteComponentName = '';
//             // 
//             for (let i = lastword.length - 1; i >= 0; i -= 1) {
//               console.log('in lastword loop',lastword[i]);
//               if (lastword[i] !== '/') {
//                 svelteComponentName = svelteComponentName.concat(lastword[i]);
                
//               } else {
//                 break;
//               }
//             }
//             console.log('svelte component name', svelteComponentName);
//           } 
//         }

//         break;
//       }
//     }
//   }

    for(let i = 0; i < props.children.length; i++){
  
      // ignore reading scripts for now
      if(props.children[i].tagName === 'script') continue;
      // alias handling, pass alias down as props for each element for reference
      // cons
      // console.log('yessir', (props.children[0].children[0].value).indexOf(props.children[i].tagName))
      //ignore the combo of svelteComponent and svelteElement
      if(props.children[i].type !== 'svelteComponent' && props.children[i].type !== 'svelteElement') continue;
      // different function if we run into svelte element
      //create empty obj
      //store svelte component in the empty obj
      //
      // console.log('this is what file looks like', file)

      // if we go into an element we need to push to the last component we were in
      if(props.children[i].type === 'svelteElement'){
        // console.log('this is what file children.value looks like', file.children[0].children.value)
        // console.log('yessir', (props.children[0].children.value).indexOf(props.children[i].tagName))
        childList.push(<FileNode children={props.children[i].children} fileName={props.children[i].tagName} fileType={'svelteElement'}/>);
      } else{
        // console.log('this is what file children.value looks like', file)

        childList.push(<FileNode children={props.children[i].children} fileName={props.children[i].tagName} fileType={'svelteComponent'}/>);
      }
  
       
      // if(props.children[i].type === 'svelteComponent'){
      //   finalList.push(props.children[i].tagName);
      // }
    
    }
  }
  function getComponents(list){
    console.log('list',list);
    console.log(list[0].props.children);
    for(let i = 0; i < list.length; i++){
      if(list[i].props.children){
        for(let j = 0; j < list[j].props.children.length; j++){
          if(list[i].props.children[j].type === 'svelteComponent'){
            finalList.push(list[i].props.children[j]);
          }
        }
      }
    }
  }
  
  // render children in here
  if(props.children){
    createTree(); 
  }

// when there is no children
  return(
  <div id='treeNode' >
    { //if filetype is svelteelement, run code below
    props.fileType === 'svelteElement'? 
    (
      <div>
        {
          //if there is a length, if there is children
          props.children.length? 
          ( 
            // if current state of showchildren is truthy
            showChildren? 
            // create up arrow icon
            <button id='expandButton' onClick={() => setShow(!showChildren)}> <AiFillFolderOpen/>{props.fileName}<IoIosArrowUp className="arrow"/></button> 
            // otherwise create down arrow icon
            : <button id='expandButton' onClick={() => setShow(!showChildren)}> <AiFillFolder/>{props.fileName}<IoIosArrowDown className="arrow"/></button> 
          )
          // if no child don't show any button
          : null
        }
        
        <div id='childrenNodes'>
          {/* if showchildren is truthy, show childlist, otherwise show nothing */}  
          {showChildren? childList : null}
        </div>
      </div>
    )
        
        : //otherwise do this stuff
      (
      <div>
        <div id='componentNode'>
            Component
            <div>
              Name: {props.fileName} 
            </div>
            <div>
              Children: {props.children ? props.children.length : 0}
            </div>
            {
              props.children.length?
              ( 
                showChildren ? 
                <button id='expandButton' onClick={() => setShow(!showChildren)}><IoIosArrowUp className="arrow"/></button>
                : <button id='expandButton' onClick={() => setShow(!showChildren)}><IoIosArrowDown className="arrow"/></button> 
              )
              : null
            }
        </div>
          
        <div id='childrenNodes'>
          {showChildren ? childList : null}

        </div>
      </div>
        )
    }

  </div>
  );
}
 ;



export default FileNode;