import React, { FC , useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {nodeTypes} from '../types';

const componentNode : FC<nodeTypes> = (props) : JSX.Element => {
  
  const [showChildren, setShow] = useState<Boolean>(false);

  return (
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

export default componentNode;