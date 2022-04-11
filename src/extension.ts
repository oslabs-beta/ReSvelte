import * as vscode from 'vscode';

import { SidebarProvider } from './SidebarProvider';


export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "resvelte" is now active!');


	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider('ReSvelte-Sidebar', sidebarProvider)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("resvelte.createTree", async (uri: vscode.Uri | undefined) => {
			await vscode.commands.executeCommand('workbench.view.extension.Resvelte-Sidebar');
		// sidebarProvider.statusButtonClicked(uri);
		})
	);
};




// this method is called when your extension is deactivated
export function deactivate() {}
