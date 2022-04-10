"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const SidebarProvider_1 = require("./SidebarProvider");
function activate(context) {
    console.log('Congratulations, your extension "resvelte" is now active!');
    const sidebarProvider = new SidebarProvider_1.SidebarProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider('ReSvelte-Sidebar', sidebarProvider));
}
exports.activate = activate;
;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map