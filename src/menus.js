/** @type {OSGUITopLevelMenus} */
var menus = {
	"&File": [
		{
			label: "&New",
			shortcutLabel: "Ctrl+N",
			ariaKeyShortcuts: "Control+N",
			action: file_new,
			description: "Creates a new document.",
		},
		{
			label: "&Open...",
			shortcutLabel: "Ctrl+O",
			ariaKeyShortcuts: "Control+O",
			action: file_open,
			description: "Opens an existing document.",
		},
		{
			label: "&Save",
			shortcutLabel: "Ctrl+S",
			ariaKeyShortcuts: "Control+S",
			action: file_save,
			description: "Saves the active document.",
		},
		{
			label: "Save &As...",
			shortcutLabel: "Ctrl+Shift+S",
			ariaKeyShortcuts: "Control+Shift+S",
			action: file_save_as,
			description: "Saves the active document with a new name.",
		},
		{divider: true},
		{
			label: "Page Se&tup...",
			action: function () {
				print();
			},
			description: "Prints the active document and sets printing options.",
		},
		{
			label: "&Print...",
			shortcutLabel: "Ctrl+P",
			ariaKeyShortcuts: "Control+P",
			action: function () {
				print();
			},
			description: "Prints the active document and sets printing options.",
		},
		{divider: true},
		{
			label: "E&xit",
			action: function () {
				window.close();
			},
			description: "Quits Notepad.",
		}
	],
	"&Edit": [
		{
			label: "&Undo",
			shortcutLabel: "Ctrl+Z",
			ariaKeyShortcuts: "Control+Z",
			enabled: function () {
				return document.queryCommandEnabled("undo");
			},
			action: function () {
				document.execCommand("undo");
			},
			description: "Undoes the last action.",
		},
		{
			label: "&Repeat",
			shortcutLabel: "Ctrl+Shift+Z",
			ariaKeyShortcuts: "Control+Shift+Z",
			enabled: function () {
				return document.queryCommandEnabled("redo");
			},
			action: function () {
				document.execCommand("redo");
			},
			description: "Redoes the previously undone action.",
		},
		{divider: true},
		{
			label: "Cu&t",
			shortcutLabel: "Ctrl+X",
			ariaKeyShortcuts: "Control+X",
			enabled: function () {
				return document.queryCommandEnabled("cut");
			},
			action: function () {
				$textarea.focus();
				document.execCommand("cut");
			},
			description: "Cuts the selection and puts it on the Clipboard.",
		},
		{
			label: "&Copy",
			shortcutLabel: "Ctrl+C",
			ariaKeyShortcuts: "Control+C",
			enabled: function () {
				return document.queryCommandEnabled("copy");
			},
			action: function () {
				$textarea.focus();
				document.execCommand("copy");
			},
			description: "Copies the selected text to the Clipboard.",
		},
		{
			label: "&Paste",
			shortcutLabel: "Ctrl+V",
			ariaKeyShortcuts: "Control+V",
			enabled: function () {
				return document.queryCommandEnabled("paste");
			},
			action: function () {
				$textarea.focus();
				document.execCommand("paste");
			},
			description: "Inserts the contents of the Clipboard.",
		},
		{
			label: "De&lete",
			shortcutLabel: "Del",
			ariaKeyShortcuts: "Delete",
			enabled: function () {
				var textarea = $textarea.get(0);
				var startPos = textarea.selectionStart;
				var endPos = textarea.selectionEnd;
				return (endPos !== startPos);
			},
			action: function () {
				$textarea.focus();
				if (document.queryCommandEnabled("delete")) {
					document.execCommand("delete");
				} else {
					var textarea = $textarea.get(0);
					var startPos = textarea.selectionStart;
					var endPos = textarea.selectionEnd;
					var selectionBefore = textarea.value.substring(0, startPos);
					var selectionAfter = textarea.value.substring(endPos);
					textarea.textContent = selectionBefore + selectionAfter;
					textarea.focus();
					textarea.selectionStart = textarea.selectionEnd = startPos;
				}
			},
			description: "Deletes the selection.",
		},
		{divider: true},
		{
			label: "Select &All",
			shortcutLabel: "Ctrl+A",
			ariaKeyShortcuts: "Control+A",
			action: select_all,
			description: "Selects the entire document.",
		},
		{
			label: "Time/&Date",
			shortcutLabel: "F5",
			ariaKeyShortcuts: "F5",
			enabled: function () {
				return document.queryCommandEnabled("insertText");
			},
			action: insert_time_and_date,
			description: "Inserts the current time and date.",
		},
		{divider: true},
		{
			label: "&Word Wrap",
			checkbox: {
				toggle: toggle_word_wrap,
				check: is_word_wrap_enabled,
			},
			description: "Makes overflowing lines either wrap or scroll.",
		},
	],
	"&Search": [
		{
			label: "&Find...",
			shortcutLabel: "Ctrl+F",
			ariaKeyShortcuts: "Control+F",
			action: function () { },
			enabled: false,
			description: "Finds the specified text.",
		},
		{
			label: "Find &Next",
			shortcutLabel: "F3",
			ariaKeyShortcuts: "F3",
			action: function () { },
			enabled: false,
			description: "Repeats the last find.",
		},
	],
	"&Help": [
		{
			label: "&Help Topics",
			action: function () {
				window.open("https://support.microsoft.com/en-us/windows/notepad-in-windows-10-c3c943d1-e0d3-7c6a-1186-e0c5e9eb0c9e", "_blank");
			},
			description: "Opens Help for RetroNotes.",
		},
		{divider: true},
		{
			label: "&About RetroNotes",
			action: function () {
				showMessageBox({
					message: "RetroNotes\n\nA simple text editor inspired by the classic Windows 98 Notepad application.",
					buttons: [
						{
							label: "OK",
							default: true,
						}
					]
				});
			},
			description: "Displays information about RetroNotes.",
		}
	]
};

// Initialize MenuBar
var MenuBar = window.MenuBar;
var menu_bar = MenuBar(menus);
$("#app").prepend(menu_bar.element);

// Add keyboard accessibility
$(window).on("keydown", function(e){
	if(e.altKey){
		menu_bar.focusMenu(e);
	}
});
