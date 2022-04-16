import React from "react";
import '../styles.scss';

const errorMessage = (props) => {

  return(
    <div id='errorMessage'>
        {props.errorCode} : {props.errorMessage}
    "svelte component called, but not imported"
    </div>
  );
};

export default errorMessage;