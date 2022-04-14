import React, { useState } from "react";
import '../styles.scss';

import { IoIosArrowDown, IoIosArrowUp  } from 'react-icons/io';


const FileNode = (props) => {

  const childList = [];
  const finalList = [];
  const [showChildren, setShow] = useState(false);
  const [componentChildren, setChildren] = useState();

  const aliases = {};


  function createTree(file){
    for(let i = 0; i < file.children.length; i++){
  
      // ignore reading scripts for now
      if(file.children[i].tagName === 'script') continue;
      console.log(file.children[i].type);
      if(file.children[i].type !== 'svelteComponent' && file.children[i].type !== 'svelteElement') continue;
      // different function if we run into svelte element
      //create empty obj
      //store svelte component in the empty obj
      //
  
      // if we go into an element we need to push to the last component we were in
      if(file.children[i].type === 'svelteElement'){
        childList.push(<FileNode children={file.children[i].children} fileName={file.children[i].tagName} fileType={'svelteElement'}/>);
      } else{
        childList.push(<FileNode children={file.children[i].children} fileName={file.children[i].tagName} fileType={'svelteComponent'}/>);
      }
  
       
      // if(props.children[i].type === 'svelteComponent'){
      //   finalList.push(props.children[i].tagName);
      // }
    
    }
  }
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
  // }
  

  // render children in here
  if(props.children){
    createTree(props); 
  }







  return(
  <div id='treeNode' >
    {props.fileType === 'svelteElement'? 
    <div>
        {props.children.length? 
        showChildren? 
        <button id='expandButton' onClick={() => setShow(!showChildren)}>{props.fileName}    <IoIosArrowUp className="arrow"/></button> 
        : <button id='expandButton' onClick={() => setShow(!showChildren)}>{props.fileName}    <IoIosArrowDown className="arrow"/></button> 
        : null}

      <div id='childrenNodes'>
        {showChildren? childList : null}
      </div>
    </div>
    
    :
    <div>
      <div id='componentNode'>
          Component
          <div>
            Name: {props.fileName} 
          </div>
          <div>
            Children: {props.children? props.children.length: 0}
          </div>
          {props.children.length? 
          showChildren ? 
          <button id='expandButton' onClick={() => setShow(!showChildren)}><IoIosArrowUp className="arrow"/></button>
          : <button id='expandButton' onClick={() => setShow(!showChildren)}><IoIosArrowDown className="arrow"/></button> 
          : null}
        </div>
        
      <div id='childrenNodes'>
        {showChildren? childList : null}

      </div>
    </div>
     
    }



    </div>
  );
}
 ;



export default FileNode;