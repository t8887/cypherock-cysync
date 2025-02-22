import {
  ThemeProvider,
  getDefaultTheme,
  DeviceProvider,
  StoreProvider,
  store,
  LockscreenBoundary,
  LockscreenProvider,
  BackgroundTasks,
  DialogManager,
} from '@cypherock/cysync-core';
import { GlobalStyles } from '@cypherock/cysync-ui';
import React from 'react';

import { AppRouter } from './Router';

const theme = getDefaultTheme();

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <StoreProvider store={store}>
      <LockscreenProvider>
        <LockscreenBoundary>
          <DeviceProvider
            getDevices={window.electronAPI.getDevices}
            connectDevice={window.electronAPI.connectDevice}
          >
            <AppRouter>
              <DialogManager />
              <BackgroundTasks />
            </AppRouter>
          </DeviceProvider>
        </LockscreenBoundary>
      </LockscreenProvider>
    </StoreProvider>
  </ThemeProvider>
);

export default App;
