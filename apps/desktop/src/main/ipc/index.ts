import { IpcMain, WebContents } from 'electron';

import { getAutoUpdateIPCHandlers } from './autoUpdater';
import { getCloseIPCHandlers } from './close';
import { getDbIPCHandlers, setupDbListeners } from './db';
import { getDeviceIPCHandlers } from './device';
import { getLoggerIPCHandlers } from './logger';
import { getResetIPCHandlers } from './reset';

export const setupIPCHandlers = (
  ipcMain: IpcMain,
  getWebContents: () => WebContents,
) => {
  const exportedFunctions = [
    ...getLoggerIPCHandlers(),
    ...getDeviceIPCHandlers(),
    ...getDbIPCHandlers(),
    ...getResetIPCHandlers(getWebContents),
    ...getAutoUpdateIPCHandlers(),
    ...getCloseIPCHandlers(),
  ];

  for (const func of exportedFunctions) {
    ipcMain.handle(func.name, async (_, ...args) => {
      try {
        const result = await (func.func as any)(...args);
        return { result };
      } catch (error: any) {
        if (error.toJSON) {
          return { error: error.toJSON() };
        }

        return { error };
      }
    });
  }
};

export const setupListeners = (webContents: WebContents) => {
  setupDbListeners(webContents);
};
