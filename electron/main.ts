import { app, BrowserWindow } from "electron";

app.whenReady().then(() => {
	const win = new BrowserWindow({
		title: "Main window"
	});

	// You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
	if (process.env.VITE_DEV_SERVER_URL) {
		win.loadURL(process.env.VITE_DEV_SERVER_URL);
	} else {
		// Load your file
		win.loadFile("dist/index.html");
	}
});
