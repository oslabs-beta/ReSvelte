import getAliases from "./getAliases";
import FileNode from "../components/fileNode";
import React, { Component } from "react";
import ErrorMessage from "../components/errorMessage";

import { fileObj , parsedSvelte } from "../types";




const parseTree = (root :fileObj, svelteFiles: fileObj[], setTotalComponents: Function , setTotalRerendering: Function, setError: Function, errorLog: Component[]): JSX.Element =>  {

    let rerendering = 0;
    let total = 0;
    const rerenderingComponents : (fileObj | parsedSvelte)[] = [];
    
    let reactRoot : JSX.Element =  <FileNode fileName={root.fileName} fileType={'svelteComponent'} children={[]}/>;

   

    const parseFile  = (file: parsedSvelte | fileObj, parentAliases = {}, parentComponent : JSX.Element = reactRoot) => {
      let isRendering : boolean = false;
      let aliases : Object = parentAliases;


      if(file.children.length > 0){
   
        for (let i = 0; i < file.children.length; i++) {



          file.children[i].parent = file;

          // filter out unnecessary files
          if (file.children[i].type !== "svelteComponent" && file.children[i].type !== "svelteElement" && file.children[i].type !== 'svelteScript' && file.children[i].type !== 'svelteDynamicContent'  && file.children[i].type !== 'svelteBranchingBlock') {
            continue;
          }

          if(file.children[i].type === 'svelteScript'){
            aliases = getAliases(file.children[i]);
            if(aliases === undefined){
              aliases = parentAliases;
            } 
            continue;
          }
          else if (file.children[i].type === 'svelteDynamicContent' || file.children[i].type === 'svelteBranchingBlock') {
            
            isRendering = true;
          }

          else if (file.children[i].type === 'svelteComponent') {
            const newComponent = <FileNode fileName={file.children[i].tagName} fileType={file.children[i].type} children={[]}/>;
            
            let hasAlias = false;
            for (let j = 0 ; j < svelteFiles.length; j++) {
              if (svelteFiles[j].fileName === aliases[file.children[i].tagName]) {
                hasAlias = true;
                parseFile(svelteFiles[j], aliases, newComponent);
              }
            }
            if(!hasAlias){
              setError([...errorLog, <ErrorMessage errorCode={404} errorMessage={`Failed to Find Import for ${file.children[i].tagName}`}/>]);
              continue;
            }
            parentComponent.props.children.push(newComponent);
            total ++;
          } 
          else{
            // type of svelteElement
            const newComponent = (<FileNode fileName={file.children[i].tagName} fileType={file.children[i].type} children={[]}/>);

            parseFile(file.children[i], aliases, newComponent);
            parentComponent.props.children.push(newComponent);
          }

          
          
        }

        if(isRendering){
          // storing the rerendering components
          let currParent : fileObj | parsedSvelte = file;
          while(currParent.parent){
            currParent = currParent.parent;
          }
          rerenderingComponents.push(currParent);
          rerendering ++;
        }


      } else{
        parentComponent.props.children.pop();
      }
      


    };


    // rerendering: 6
    // total: 10


    parseFile(root);


    console.log('Actively Rerendering Components:', rerenderingComponents);
    setTotalComponents(total);
    setTotalRerendering(rerendering);
    return reactRoot;
};

module.exports = parseTree;