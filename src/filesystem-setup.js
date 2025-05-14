var __fs_initialized;
var __fs_errored;
var __fs_timed_out;
var __fs_waiting_callbacks = [];

const desktop_folder_path = "/desktop/";

// For Wayback Machine, match URLs like https://web.archive.org/web/20191213113214/https://98.js.org/
// (also match URLs like https://98.js.org/ because why not)
const web_server_root_for_browserfs =
	location.href.match(/98.js.org/) ?
		location.href.match(/.*98.js.org/)[0] + "/" :
		"/";

// Simplified configuration that doesn't require the filesystem-index.json file
BrowserFS.configure({
	fs: "IndexedDB",
	options: {
		storeName: "RetroNotes"
	}
}, function (error) {
	if (error) {
		__fs_errored = true;
		if (__fs_waiting_callbacks.length) {
			console.error("Filesystem failed to initialize:", error);
			// Silently fail instead of showing alert - the app will still work without filesystem
			// alert("The filesystem is not available. It failed to initialize.");
		}
		__fs_waiting_callbacks = [];
		// Don't throw error, just log it
		console.error(error);
		return;
	}
	__fs_initialized = true;
	for (var i = 0; i < __fs_waiting_callbacks.length; i++) {
		__fs_waiting_callbacks[i]();
	}
	__fs_waiting_callbacks = [];
});

// Create desktop folder if it doesn't exist
withFilesystem(function() {
	try {
		var fs = BrowserFS.BFSRequire('fs');
		if (!fs.existsSync(desktop_folder_path)) {
			fs.mkdirSync(desktop_folder_path, { recursive: true });
		}
	} catch (e) {
		console.error("Failed to create desktop folder:", e);
	}
});

setTimeout(function () {
	__fs_timed_out = true;
	if (__fs_waiting_callbacks.length) {
		console.warn("Filesystem initialization timed out");
		// Silently fail instead of showing alert
		// alert("The filesystem is not working.");
	}
	__fs_waiting_callbacks = [];
}, 5000);

function withFilesystem(callback) {
	if (__fs_initialized) {
		callback();
	} else if (__fs_errored) {
		console.error("The filesystem is not available. It failed to initialize.");
	} else if (__fs_timed_out) {
		console.warn("The filesystem is not working.");
	} else {
		__fs_waiting_callbacks.push(callback);
	}
}

function file_name_from_path(file_path) {
	return file_path.split("\\").pop().split("/").pop();
}

function file_extension_from_path(file_path) {
	return (file_path.match(/\.(\w+)$/) || [, ""])[1];
}
