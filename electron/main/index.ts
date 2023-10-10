import {
  BrowserWindow,
  ThumbarButton,
  TitleBarOverlay,
  app,
  globalShortcut,
  ipcMain,
  nativeImage,
  nativeTheme
} from "electron";
import { join } from "node:path";

import { PlayingStatus } from "../@types/Type";

process.env.DIST_ELECTRON = join(__dirname, "../");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, "../public")
  : process.env.DIST;

app.disableHardwareAcceleration();
app.setAppUserModelId(app.getName());
if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

app.whenReady().then(async () => {
  const assetImage = (fileName: string) => {
    const useDarkColors = nativeTheme.shouldUseDarkColors;
    return nativeImage.createFromPath(
      join(process.env.VITE_PUBLIC, "assets", useDarkColors ? "light" : "dark", `${fileName}.png`)
    );
  };
  const backgroundColor = (): string => {
    return nativeTheme.shouldUseDarkColors ? "#121212" : "#ffffff";
  };
  const titleBarOverlay = (): TitleBarOverlay => {
    const useDarkColors = nativeTheme.shouldUseDarkColors;
    return {
      color: useDarkColors ? "#00000000" : "#ffffff00",
      symbolColor: useDarkColors ? "#ffffff" : "rgba(0, 0, 0, 0.87)",
      height: 32
    };
  };

  const thumbarButtons = (status?: PlayingStatus): ThumbarButton[] => {
    return [
      {
        tooltip: "Précédent",
        icon: assetImage("previous"),
        click: () => sendMediaKey("previous")
      },
      {
        tooltip: status !== "play" ? "Lecture" : "Pause",
        icon: assetImage(status !== "play" ? "play" : "pause"),
        click: () => sendMediaKey("play-pause")
      },
      {
        tooltip: "Suivant",
        icon: assetImage("next"),
        click: () => sendMediaKey("next")
      }
    ];
  };
  const sendMediaKey = (key: "previous" | "play-pause" | "next") => {
    webContents.send("media", key);
  };
  const mainWindow = new BrowserWindow({
    icon: join(process.env.VITE_PUBLIC, "favicon.ico"),
    titleBarStyle: "hidden",
    titleBarOverlay: titleBarOverlay(),
    backgroundColor: backgroundColor(),
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  });
  app.isPackaged
    ? await mainWindow.loadFile(join(process.env.DIST, "index.html"))
    : await mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL!);
  mainWindow.setMenu(null);
  mainWindow.setThumbarButtons(thumbarButtons());
  nativeTheme.on("updated", () => {
    mainWindow.setTitleBarOverlay(titleBarOverlay());
    mainWindow.setThumbarButtons(thumbarButtons());
  });

  const webContents = mainWindow.webContents;
  webContents.on("before-input-event", (_, input) => {
    if (input.type === "keyDown" && input.key === "F12") {
      webContents.toggleDevTools();
    }
  });

  globalShortcut.register("MediaPreviousTrack", () => sendMediaKey("previous"));
  globalShortcut.register("MediaPlayPause", () => sendMediaKey("play-pause"));
  globalShortcut.register("MediaNextTrack", () => sendMediaKey("next"));
  ipcMain.on("playing-status", (_, status: PlayingStatus) => {
    mainWindow.setThumbarButtons(thumbarButtons(status));
  });
});
