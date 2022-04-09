// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import path from 'path'


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "resvelte" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('resvelte.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from ReSvelte!');
	});


	
	let addStartCommand = vscode.commands.registerCommand('resvelte.start', () => {
		const panel = vscode.window.createWebviewPanel('ReSvelte', 'ReSvelte', vscode.ViewColumn.One, {});
		const scriptUri =  vscode.Uri.file(context.extensionUri.path + '/src/script');
		panel.webview.options = {
			enableScripts : true,
			//panel.webview.asWebviewUri(vscode.Uri.file((context.extensionUri.path)))
			localResourceRoots: [
				scriptUri
			]
		}	
		panel.webview.html = (
			`	
			<html>
				<head>
				</head>
				<body >
					Hello ReSvelte User!
					<div id='root'>im a div here is the path: ${scriptUri}</div>
				</body>
				<script src ='${scriptUri}' ></script>
			</html>
			`
		);
	});

	context.subscriptions.push(addStartCommand);
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
