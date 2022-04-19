import React, { useState } from "react";
import "../styles.scss";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiFillFolder, AiFillFolderOpen } from "react-icons/ai";

import getAliases from "../parser/getAliases";

// filenode component takes in children and filename
const FileNode = (props) => {
  // console.log('this is props.svelteFiles', props.svelteFiles)
  const childList = [];
  const finalList = [];
  const [showChildren, setShow] = useState(false);
  const [componentChildren, setChildren] = useState();

  let aliases = props.aliases;

  // creates the tree; file is props
  function createTree() {
    // has access to the global props
    // search for a script tag and parse
    
    console.log(`CREATING TREE FOR ${props.fileName}`)
    console.log(aliases)

    for (let i = 0; i < props.children.length; i++) {

      // loop to generate aliases from out script tag
      if (props.children[i].type !== "svelteComponent" && props.children[i].type !== "svelteElement" ) {
        continue;
      }
      
      if (props.children[i].tagName === "script") {
        aliases = getAliases(props.children[i]);
        console.log(`Aliases for ${props.children[i].fileName}`, aliases);
        continue;
      }

      //recursion for elements like main,p,h1
      if (props.children[i].type === "svelteElement") {
        childList.push(
          <FileNode
            children={props.children[i].children}
            fileName={props.children[i].tagName}
            fileType={"svelteElement"}
            svelteFiles={props.svelteFiles}
            aliases = {aliases}
          />
        );
      } else {
        //HOW TO PERSIST ALIASES TO THINGS WE WANT IT TO
        // AND NOT THINGS WE DON'T WANT IT TO
        // handles svelte components

        // SEND ERROR IF IT CANT FIND KEY/VALUE PAIR

        // 
        // what we need to do:
        // SEND ARRAY OF CHILDREN FROM THE MATCHING SVELTEFILES OBJ AS PROPS TO REACT COMPONENT
        // iterate through the svelteFiles array
//////////////////Stopped here thought about making aliases a state///////

        console.log('INSIDE A SVELTE COMPONENT:', props.children[i].tagName);
        console.log('test aliases', aliases)
        // console.log('searching for alias:', aliases[props.children[i].tagName], 'type:', aliases[props.children[i].tagName])
        // console.log("aliases:", aliases);


        
        let searchStr;
        let hasAlias = false;
        if(aliases[props.children[i].tagName]){
          hasAlias = true;
          searchStr = aliases[props.children[i].tagName];
        }
        
        if(hasAlias){
          for (let i = 0; i < props.svelteFiles.length; i++) {
            console.log('searching svelte files....');
            // console.log("tagname:", props.children[i].tagName);
            //const svelteFileName = props.svelteFiles[i].fileName.toString();
            // console.log('type of svelteFile:', typeof aliases[props.children[i].tagName])
            // console.log('alias for this file:', aliases[props.children[i].tagName])
            // console.log('the svelteFile ', props.svelteFiles[i])

            console.log('looking at', props.svelteFiles[i].fileName, 'type:', typeof props.svelteFiles[i].fileName );
            const string = props.svelteFiles[i].fileName;
            


            if ( string == searchStr) {
              console.log('matchinggg!');

              console.log(`Children for ${props.children[i].tagName}`, props.svelteFiles[i].children)
              childList.push(
                <FileNode 
                children={props.svelteFiles[i].children} 
                fileName={props.children[i].tagName} 
                fileType={"svelteComponent"} 
                svelteFiles={props.svelteFiles} 
                aliases={aliases}/>
              );

             
            }
          }
        }
        else {
          childList.push(
            <FileNode 
            children={[]} 
            fileName={props.children[i].tagName} 
            fileType={"svelteComponent"} 
            svelteFiles={props.svelteFiles} 
            aliases={aliases}/>
          );
        }
          
        console.log('after test')
        



      }
    }
  }


  // recursion to continuously find children
  // if there are children, continuously invoke createTree on line 21
  if (props.children) {
    createTree();
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
