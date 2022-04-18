import React, { useState } from "react";
import '../styles.scss';

import { IoIosArrowDown, IoIosArrowUp  } from 'react-icons/io';
import { AiFillFolder, AiFillFolderOpen } from 'react-icons/Ai';

import getAliases from '../parser/getAliases';

// filenode component takes in children and filename
const FileNode = (props) => {
  // console.log('this is props.svelteFiles', props.svelteFiles)
  const childList = [];
  const finalList = [];
  const [showChildren, setShow] = useState(false);
  const [componentChildren, setChildren] = useState();

  let aliases = {};
 // aliases = { importname: aliasfileName}
 // file
// creates the tree; file is props
  function createTree(){ // has access to the global props
    // search for a script tag and parse
   
    for (let i = 0; i < props.children.length; i++) {

      // loop to generate aliases from out script tag
      if (props.children[i].tagName === 'script') {
        aliases = getAliases(props.children[i]);
        console.log(`Aliases for ${props.children[i]}`, aliases);
        continue;
      }
      
      if(props.children[i].type !== 'svelteComponent' && props.children[i].type !== 'svelteElement') {
        continue;}

      console.log('this is props.svelteFiles 1', props.svelteFiles)
      
      if(props.children[i].type === 'svelteElement'){
        childList.push(<FileNode children={props.children[i].children} fileName={props.children[i].tagName} fileType={'svelteElement'} svelteFiles={props.svelteFiles}/>);
      } 
      else{
        console.log('this is props.svelteFiles 2', props.svelteFiles)
        // handles svelte components

        // SEND ERROR IF IT CANT FIND KEY/VALUE PAIR

        // what we need to do:
        // SEND ARRAY OF CHILDREN FROM THE MATCHING SVELTEFILES OBJ AS PROPS TO REACT COMPONENT
        // iterate through the svelteFiles array

        /////////////clicking main causes it not to work///////////
        /////////////////pick up here///////////////////
        for (let i = 0 ; i < props.svelteFiles.length; i ++) {
          // B.svelte === B.sveltea
          // console.log(props.svelteFiles)
          if (props.svelteFiles[i].fileName === aliases[props.children[i].tagName]){
            childList.push(<FileNode children={props.svelteFiles[i].children} fileName={props.children[i].tagName} fileType={'svelteComponent'} svelteFiles={props.svelteFiles}/>)
          }
        }
          // for each sveltefile, check if sveltefile.fileName is the same as aliases property value
          // if it is true
          // recursive call to <FileNode children = the children from fileNameObj  fileName=     svelteFiles = > sveltefile.children passing in the svelteFiles array as props again
        
          
      //
        // props.children[i].tagName = B
        // tagName = B
        // aliases = {B: B.svelte}
        // props.svelteFiles = [{filename: B, children: [svelteElement,svelteComponent, svelteScript]}]

        
        
        
      }

    }
  }

    // for(let i = 0; i < props.children.length; i++){

    //   // ignore reading scripts for now
    //   if(props.children[i].tagName === 'script') continue;
    //   // alias handling, pass alias down as props for each element for reference

    //   // console.log('yessir', (props.children[0].children[0].value).indexOf(props.children[i].tagName))
    //   //ignore the combo of svelteComponent and svelteElement
      
    //   // different function if we run into svelte element

    //   // console.log('this is what file looks like', file)

    //   // if we go into an element we need to push to the last component we were in


    // }
  
  //currently only see the components because we are looking through app.svelte
    //every component does not have access to the sveltefiles array
    // need to pass down sveltefiles array to the children to be 
    // loop through newAliases
      //check to see if the value in newaliass prop matches a svelte file name
        // if it does
         // loop through svelte files to find if there is a child
            //if there is no child, the component is finished, move on to next component

// why do we need aliases?
// to know what file is really what it is, it knows it's name but doesn't know what it is.
// if value is found in sveltefile
// what component has what children
// connect the renamed components 
// compare alias to filename, compare children
  // match between filename and the alias


  // function getComponents(list){
  //   console.log('list',list);
  //   console.log(list[0].props.children);
  //   for(let i = 0; i < list.length; i++){
  //     if(list[i].props.children){
  //       for(let j = 0; j < list[j].props.children.length; j++){
  //         if(list[i].props.children[j].type === 'svelteComponent'){
  //           finalList.push(list[i].props.children[j]);
  //         }
  //       }
  //     }
  //   }

  // recursion to continuously find children
  // if there are children, continuously invoke createTree on line 21
  if(props.children){
    createTree();
  }

// if there are no children left to parse, render/return. Don't need to create/continue tree if no children

  return(
  <div id='treeNode' >
    { //if filetype is svelteelement, run code below
    props.fileType === 'svelteElement'?
    (
      <div>
        {
          // if there is a length, if there is children
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