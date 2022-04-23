import React from "react";
import "../styles.scss";

import { FC } from "react";

import ElementNode from '../components/elementNode';
import ComponentNode from '../components/componentNode';

import { fileNode } from '../types';


const fileNode: FC<fileNode> = (props) => {

  console.log('children:', props.children)
  

  return (
    <div id="treeNode">
      {
        //if filetype is svelteelement, run code below
        props.fileType === "svelteElement" ? (
          <ElementNode children={props.children} fileName={props.fileName}/>
        ) : (
          <ComponentNode children={props.children} fileName={props.fileName}/>
        )
      }
    </div>
  );
}

export default fileNode;