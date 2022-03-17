'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
import { autoUpdater } from "electron-updater"
import { ipcMain } from 'electron'



// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
	{ scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
	// Create the browser window.
	const win = new BrowserWindow({
		// width: 800,
		// height: 600,
		useContentSize: true,
		frame: false,
		// resizable:false,
		// fullscreen :true,
		webPreferences: {
			webSecurity: false,
			nodeIntegration: true
		}
	})
	//登录窗口最小化
	ipcMain.on('min', function () {
		win.minimize();
	})
	//登录窗口最大化
	ipcMain.on('max', function () {
		if (win.isMaximized()) {
			win.restore();
		} else {
			win.maximize();
		}
	})
	ipcMain.on('close', function () {
		win.close();
	})

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// Load the url of the dev server if in development mode
		await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
		if (!process.env.IS_TEST) win.webContents.openDevTools()
	} else {
		createProtocol('app')
		// Load the index.html when not in development
		win.loadURL('app://./index.html')
		// 自动更新
		autoUpdater.checkForUpdatesAndNotify()
	}
}

// 增加更新过程日志
const checkUpdate = (win) => {
	//处理更新操作
	const returnData = {
		error: {
			status: -1,
			msg: '更新时发生意外，无法进行正常更新！'
		},
		checking: {
			status: 0,
			msg: '正在检查更新……'
		},
		updateAva: {
			status: 1,
			msg: '正在升级……'
		},
		updateNotAva: {
			status: 2,
			msg: '开始加载程序……'
		}
	};

	//更新错误事件
	autoUpdater.on('error', function (error) {
		sendUpdateMessage(returnData.error)
		log.info(returnData.error, error)
	});

	//检查事件
	autoUpdater.on('checking-for-update', function () {
		sendUpdateMessage(returnData.checking)
		log.info(returnData.checking)
	});

	//发现新版本
	autoUpdater.on('update-available', function () {
		sendUpdateMessage(returnData.updateAva)
		log.info(returnData.updateAva)
	});

	//当前版本为最新版本
	autoUpdater.on('update-not-available', function () {
		setTimeout(function () {
			sendUpdateMessage(returnData.updateNotAva)
			log.info(returnData.updateNotAva)
		}, 1000);
	});

	//更新下载进度事件
	autoUpdater.on('download-progress', function (progressObj) {
		win.webContents.send('downloadProgress', progressObj)
		log.info('正在下载', progressObj)
	});


	//下载完毕
	// autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
	autoUpdater.on('update-downloaded', function () {
		//退出并进行安装（这里可以做成让用户确认后再调用）
		autoUpdater.quitAndInstall();
		log.info("下载完毕")
	});

	//发送消息给窗口
	function sendUpdateMessage(text) {
		win.webContents.send('message', text)
	}
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
	if (isDevelopment && !process.env.IS_TEST) {
		// Install Vue Devtools
		try {
			await installExtension(VUEJS_DEVTOOLS)
		} catch (e) {
			console.error('Vue Devtools failed to install:', e.toString())
		}
	}
	createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', (data) => {
			if (data === 'graceful-exit') {
				app.quit()
			}
		})
	} else {
		process.on('SIGTERM', () => {
			app.quit()
		})
	}
}


