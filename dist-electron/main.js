"use strict";
const n = require("electron");
n.app.whenReady().then(() => {
	const e = new n.BrowserWindow({ title: "Main window" });
	process.env.VITE_DEV_SERVER_URL ? e.loadURL(process.env.VITE_DEV_SERVER_URL) : e.loadFile("dist/index.html");
});
