import React ,{ FC , useState} from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiFillFolder, AiFillFolderOpen } from "react-icons/ai";
import { nodeTypes } from '../types';

const elementNode : FC<nodeTypes> = (props) : JSX.Element => {

  const [showChildren, setShow] = useState<Boolean>(false);

  return (
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
  );
};

export default elementNode;