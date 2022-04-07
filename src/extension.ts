// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';

function getHTML(){
return(
	
	`<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<!--
			Use a content security policy to only allow loading images from https or from our extension directory,
			and only allow scripts that have a specific nonce.
		-->
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

	</head>
	<body >
	<div>
	<input title="" type="file" value="import file"  id="files" style="display:none">
		<label for="files" id="import">Import Folder Here</label>
	</input>
</div>

<style>
	#import{
		width: 100px;
		height: 20px;
		border: solid 1px black;
		padding: 5px;
		background-color: white;
	}
	
	#import:hover{
		cursor:pointer;
		background-color: white;
		color: black;
		transition: 0.4s;
	}
	</body>


	</html>`
);
	

}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// adding the webView panel as a subscriber
	const sidebarProvider = new SidebarProvider(context.extensionUri);
	

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider("resvelte-sidebar", sidebarProvider)
	);


	// This line of code will only be executed once when your extension is activated
	console.log('Extension "resvelte" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('resvelte.helloWorld', () => {
		vscode.window.showInformationMessage('ReSvelte is Live!');
		let panel = vscode.window.createWebviewPanel('test','testing', vscode.ViewColumn.One, {});
		panel.webview.html = getHTML();
	});


	context.subscriptions.push(disposable);
	
}

// this method is called when your extension is deactivated
export function deactivate() {}
