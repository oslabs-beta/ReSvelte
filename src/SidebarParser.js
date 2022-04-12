import * as acorn from 'acorn';
import * as jsx from 'acorn-jsx';
// import * as path from 'path';
// import * as fs from 'fs';
const reader = new FileReader();
import regeneratorRuntime from "regenerator-runtime";

import { parse } from 'svelte-parse';

// const parser = acorn.Parser;
// const parse = parser.extend(jsx())




const sidebarParser =  async (file) => {
// if size of the file is 0 dont run

 
  console.log('file:',file);


  reader.readAsText(file);

  reader.onload = (e) => {

// remove non-printable and other non-valid JSON chars


    console.log(e.target.result);
    let sourceCode = e.target.result;
    // preserve newlines, etc - use valid JSON
console.log('before parse');
console.log('parsed', parse({ value: sourceCode}));
    // console.log(parse(sourceCode));
    // let data = parse('<>  ', {ecmaVersion:2020, sourceType: "module"});
    //  console.log('this is data', data);  
    console.log('after parse');
  };
  console.log('this is reader',  reader);
  console.log('reader result', reader.result); 

  };  

 

  
  

export default sidebarParser;
