import React from "react";
import '../styles.scss';

const errorMessage = (props) => {

  return(
    <div id='errorMessage'>
        {props.errorCode} : {props.errorMessage}
    </div>
  );
};

export default errorMessage;