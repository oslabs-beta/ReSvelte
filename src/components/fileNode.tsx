import React, { FunctionComponent, useState } from "react";
import "../styles.scss";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiFillFolder, AiFillFolderOpen } from "react-icons/ai";
import { Component } from "react";
import { FC } from "react";


interface fileNode{
  fileName: string,
  fileType: string,
  children: JSX.Element[],
}

const fileNode: FC<fileNode> = (props) => {

  console.log('children:', props.children)
  const [showChildren, setShow] = useState<Boolean>(false);

  return (
    <div id="treeNode">
      {
        //if filetype is svelteelement, run code below
        props.fileType === "svelteElement" ? (
          <div>
            {
              // if there are children
              props.children ? (
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
              {showChildren ? props.children : null}
            </div>
          </div>
        ) : (
          // component rendering
          <div>
            <div id="componentNode">
              Component
              <div>Name: {props.fileName}</div>
              <div>Children: {props.children ? props.children.length : 0}</div>
              {props.children ? (
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

            <div id="childrenNodes">{showChildren ? props.children : null}</div>
          </div>
        )
      }
    </div>
  );
}

export default fileNode;