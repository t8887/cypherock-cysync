// The ReactNodes won't be rendered as list so key is not required
/* eslint-disable react/jsx-key */
import React, {
  Context,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

import { SyncAccountDialog } from '~/dialogs/AddAccountGuide/Dialogs';
import { selectLanguage, useAppSelector } from '~/store';
import logger from '~/utils/logger';

import { ReceiveDevice } from '../Dialogs';
import {
  ReceiveDeviceConfirm,
  ReceiveDeviceConfirmCancelled,
  ReceiveDeviceConfirmForToken,
  ReceiveDeviceConfirmTroubleShoot,
  ReceiveDeviceConnection,
  ReceiveVerifyAddress,
} from '../Dialogs/Device';

// import {
//   ReceiveDialog,
//   ReceiveSingleChainDialog,
//   InitialiseAccountDialog,
//   ConnectDevice,
//   NoAccountDialog,
//   SelectCryptoDialog,
//   SyncAccountDialog,
//   ReceiveCongrats,
// } from '../Dialogs';

type ITabs = {
  name: string;
  dialogs: ReactNode[];
}[];

export interface ReceiveGuideContextInterface {
  tabs: ITabs;
  currentTab: number;
  setCurrentTab: Dispatch<SetStateAction<number>>;
  currentDialog: number;
  setCurrentDialog: Dispatch<SetStateAction<number>>;
  onNext: (tab?: number, dialog?: number) => void;
  onPrevious: () => void;
}

export const ReceiveGuideContext: Context<ReceiveGuideContextInterface> =
  createContext<ReceiveGuideContextInterface>(
    {} as ReceiveGuideContextInterface,
  );

export interface ReceiveGuideContextProviderProps {
  children: ReactNode;
}

export const ReceiveGuideProvider: FC<ReceiveGuideContextProviderProps> = ({
  children,
}) => {
  const lang = useAppSelector(selectLanguage);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [currentDialog, setCurrentDialog] = useState<number>(0);

  const tabs: ITabs = [
    {
      name: lang.strings.receive.aside.tabs.source,
      dialogs: [<ReceiveDevice />],
    },
    {
      name: lang.strings.receive.aside.tabs.device,
      dialogs: [
        <ReceiveDeviceConnection />,
        <ReceiveDeviceConfirmCancelled />,
        <ReceiveDeviceConfirmTroubleShoot />,
        <ReceiveDeviceConfirmForToken />,
        <ReceiveDeviceConfirm />,
        <ReceiveVerifyAddress />,
        // <SyncAccountDialog />,
        // <NoAccountDialog />,
        // <ReceiveSingleChainDialog />,
        // <ReceiveDialog />,
      ],
    },
    {
      name: lang.strings.receive.aside.tabs.receive,
      dialogs: [<SyncAccountDialog />],
    },
  ];

  const onNext = (tab?: number, dialog?: number) => {
    logger.info('currentTab');

    if (typeof tab === 'number' && typeof dialog === 'number') {
      setCurrentTab(tab);
      setCurrentDialog(dialog);
    } else if (currentDialog + 1 > tabs[currentTab].dialogs.length - 1) {
      setCurrentTab(prevProps => Math.min(tabs.length - 1, prevProps + 1));
      if (currentTab !== tabs.length - 1) {
        setCurrentDialog(0);
      }
    } else {
      setCurrentDialog(prevProps =>
        Math.min(tabs[currentTab].dialogs.length - 1, prevProps + 1),
      );
    }
  };

  const onPrevious = () => {
    if (currentDialog - 1 < 0) {
      if (currentTab === 0) {
        setCurrentDialog(0);
      } else {
        setCurrentDialog(tabs[currentTab - 1].dialogs.length - 1);
        setCurrentTab(prevProps => Math.max(0, prevProps - 1));
      }
    } else {
      setCurrentDialog(prevProps => Math.max(0, prevProps - 1));
    }
  };

  const ctx = useMemo(
    () => ({
      currentTab,
      setCurrentTab,
      currentDialog,
      setCurrentDialog,
      tabs,
      onNext,
      onPrevious,
    }),
    [
      currentTab,
      setCurrentTab,
      currentDialog,
      setCurrentDialog,
      tabs,
      onNext,
      onPrevious,
    ],
  );

  return (
    <ReceiveGuideContext.Provider value={ctx}>
      {children}
    </ReceiveGuideContext.Provider>
  );
};

export function useReceiveGuide(): ReceiveGuideContextInterface {
  return useContext(ReceiveGuideContext);
}
