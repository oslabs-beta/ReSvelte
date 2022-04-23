import React, { FC } from "react";
import '../styles.scss';

import { errorMessageTypes } from "../types";

const errorMessage : FC<errorMessageTypes> = (props) => {

  return(
    <div id='errorMessage'>
        {props.errorCode} : {props.errorMessage}
    </div>
  );
};

export default errorMessage;