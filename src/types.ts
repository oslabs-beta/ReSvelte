import { Component } from "react";


export type fileObj = {
  fileName: string,
  children: parsedSvelte[]
  parent?: fileObj | parsedSvelte
  type?: string
  tagName?: string
};

export interface fileNode{
  fileName: string,
  fileType: string,
  children: JSX.Element[]
}

export interface parsedSvelte{
  type: string,
  children: parsedSvelte[] | fileObj[],
  parent?: fileObj,
  position?: any,
  properties?: any[],
  selfClosing?: Boolean,
  tagName?: string,
  
}

export interface performanceDisplayTypes{
  totalComponents: number,
  totalRerendering: number, 
  errorLog: JSX.Element[]
}

export interface errorMessageTypes {
  errorCode: number,
  errorMessage: string
}

export interface nodeTypes {
  children: JSX.Element[],
  fileName: string,
}





interface textChild{
 type: string,
 value: string
}