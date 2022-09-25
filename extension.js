// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const KuromojiAnalyzer = require("kuroshiro-analyzer-kuromoji");
const Kuroshiro = require("kuroshiro")

const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {



	let disposable = vscode.commands.registerCommand('furigana-generator.gen-furigana', function () {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			const sentence = document.getText(selection);
			const kuroshiro = new Kuroshiro();
			kuroshiro.init(new KuromojiAnalyzer()).then(() => {
				return kuroshiro.convert(sentence, { to: "hiragana", mode: "okurigana" });
			}).then(function (result) {
				editor.edit(editBuilder => {
					editBuilder.replace(selection, result);
				});
			});
		}
	});

	context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
