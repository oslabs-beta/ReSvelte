import React, { useState } from "react";
import "../styles.scss";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiFillFolder, AiFillFolderOpen } from "react-icons/ai";

import getAliases from "../parser/getAliases";
import ErrorMessage from "./errorMessage";


// filenode component takes in children and filename
const FileNode = (props) => {

  let childList = [];
  const [showChildren, setShow] = useState(false);
  let components = props.totalComponents;
  

  let aliases = props.aliases;

  // creates the tree; file is props
  function createTree() {

    for (let i = 0; i < props.children.length; i++) {

      console.log('currently on:', props.children[i])

      // loop to generate aliases from out script tag
      if (props.children[i].type !== "svelteComponent" && props.children[i].type !== "svelteElement" && props.children[i].type !== 'svelteScript') {
        console.log('Filtered out file: ', props.children[i]);
        continue;
      }

      
      if (props.children[i].type === "svelteScript") {
        aliases = getAliases(props.children[i]);
        if (aliases === undefined){
          aliases = props.aliases;
        }
        
          
        
        console.log(`Updated aliase to: `, aliases);
        continue;
      }

      //recursion for elements like main,p,h1
      else if (props.children[i].type === "svelteElement") {
 
        childList.push(
          <FileNode
            children={props.children[i].children}
            fileName={props.children[i].tagName}
            fileType={"svelteElement"}
            svelteFiles={props.svelteFiles}
            aliases = {aliases}
            setTotalComponents={props.setTotalComponents} 
            totalComponents={props.totalComponents}
            errorLog = {props.errorLog}
            setError = {props.setError}
          />
        );
        console.log('Pushed element to child list: ', childList);

      } 
      else if(props.children[i].type === "svelteComponent"){
        
        let searchStr;
        let hasAlias = false;
        if(aliases[props.children[i].tagName]){
          hasAlias = true;
          searchStr = aliases[props.children[i].tagName];
        } 

        // if it cannot find an alias for the component throw an error
        if(!hasAlias){
          props.setError([...props.errorLog, <ErrorMessage errorCode={404} errorMessage={`Failed to Find Import for ${props.children[i].tagName}`}/>])
          continue;
        }
        
      
          for (let j = 0; j < props.svelteFiles.length; j++) {
            console.log('searching svelte files....', props.children[i]);

            const string = props.svelteFiles[j].fileName;


            if ( string === searchStr) {
              console.log('Found!')

              components += 1;
               childList.push(
                
                <FileNode 
                children={props.svelteFiles[j].children} 
                fileName={props.children[i].tagName} 
                fileType={"svelteComponent"} 
                svelteFiles={props.svelteFiles} 
                aliases={aliases}
                setTotalComponents={props.setTotalComponents} 
                totalComponents={props.totalComponents}
                errorLog = {props.errorLog}
                setError = {props.setError}
                />
                
              );

              console.log('Pushed with new alias');
              break;
             
            }
          }
        }
      }
    }
    //props.setTotalComponents(props.totalComponents + components);

  


  // recursion to continuously find children
  // if there are children, continuously invoke createTree on line 21
  if (props.children) {
    createTree()
  }

  // if there are no children left to parse, render/return. Don't need to create/continue tree if no children

  return (
    <div id="treeNode">
      {
        //if filetype is svelteelement, run code below
        props.fileType === "svelteElement" ? (
          <div>
            {
              // if there is a length, if there is children
              props.children.length ? (
                // if current state of showchildren is truthy
                showChildren ? (
                  // create up arrow icon
                  <button
                    id="expandButton"
                    onClick={() => setShow(!showChildren)}
                  >
                    {" "}
                    <AiFillFolderOpen />
                    {props.fileName}
                    <IoIosArrowUp className="arrow" />
                  </button>
                ) : (
                  // otherwise create down arrow icon
                  <button
                    id="expandButton"
                    onClick={() => setShow(!showChildren)}
                  >
                    {" "}
                    <AiFillFolder />
                    {props.fileName}
                    <IoIosArrowDown className="arrow" />
                  </button>
                )
              ) : // if no child don't show any button
              null
            }

            <div id="childrenNodes">
              {/* if showchildren is truthy, show childlist, otherwise show nothing */}
              {showChildren ? childList : null}
            </div>
          </div>
        ) : (
          //otherwise do this stuff
          <div>
            <div id="componentNode">
              Component
              <div>Name: {props.fileName}</div>
              <div>Children: {props.children ? props.children.length : 0}</div>
              {props.children.length ? (
                showChildren ? (
                  <button
                    id="expandButton"
                    onClick={() => setShow(!showChildren)}
                  >
                    <IoIosArrowUp className="arrow" />
                  </button>
                ) : (
                  <button
                    id="expandButton"
                    onClick={() => setShow(!showChildren)}
                  >
                    <IoIosArrowDown className="arrow" />
                  </button>
                )
              ) : null}
            </div>

            <div id="childrenNodes">{showChildren ? childList : null}</div>
          </div>
        )
      }
    </div>
  );
};
export default FileNode;
