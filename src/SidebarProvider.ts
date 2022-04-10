import * as vscode from 'vscode';


export class SidebarProvider implements vscode.WebviewViewProvider { 
	public _view?: vscode.WebviewView; //made everything public for now
	public _doc?: vscode.TextDocument; // made public

	constructor(
		public readonly _extensionUri: vscode.Uri, // made public
	) { }



	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this._view = webviewView;

		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,

			localResourceRoots: [
				this._extensionUri
			]
		};
		

		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

		webviewView.webview.onDidReceiveMessage(data => {
			switch (data.type) {
			}
		});
	}

	public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

	
	public _getHtmlForWebview(webview: vscode.Webview) { // made public
		// Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'dist', 'sidebar.js'));
	

		// Do the same for the stylesheet.
		// const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css'));
		// const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'vscode.css'));
		// const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.css'));

		// Use a nonce to only allow a specific script to be run.


		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
		
				<meta name="viewport" content="width=device-width, initial-scale=1.0">  				
				<title>ReSvelte</title>
			</head>
			<body>
				<div id="root">inside Div</div>
				<script  src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}