import { coinList } from '@cypherock/coins';
import {
  LangDisplay,
  DialogBox,
  DialogBoxHeader,
  DialogBoxBody,
  Typography,
  Image,
  Container,
  DialogBoxFooter,
  Button,
  Dropdown,
  addIcon,
  DropDownListItemProps,
  WalletIcon,
  useTheme,
} from '@cypherock/cysync-ui';
import { createSelector } from '@reduxjs/toolkit';
import React, { useMemo } from 'react';

import { CoinIcon } from '~/components/CoinIcon';
import { selectLanguage, selectWallets, useAppSelector } from '~/store';

import { useAddAccountDialog } from '../context';

const coinDropDownList: DropDownListItemProps[] = Object.values(coinList).map(
  coin => ({
    id: coin.id,
    leftImage: <CoinIcon assetId={coin.id} />,
    shortForm: `(${coin.abbr.toUpperCase()})`,
    text: coin.name,
    checkType: 'radio',
  }),
);

const selectWalletAndLang = createSelector(
  [selectLanguage, selectWallets],
  (a, b) => ({ lang: a, ...b }),
);

export const AddAccountSelectionDialog: React.FC = () => {
  const { lang, wallets } = useAppSelector(selectWalletAndLang);
  const {
    onNext,
    selectedCoin,
    selectedWallet,
    setSelectedCoin,
    setSelectedWallet,
  } = useAddAccountDialog();
  const theme = useTheme()!;

  const strings = lang.strings.addAccount.select;
  const button = lang.strings.buttons;

  const handleWalletChange = (id: string | undefined) => {
    if (!id) setSelectedWallet(undefined);
    setSelectedWallet(wallets.find(w => w.__id === id));
  };

  const handleCoinChange = (id: string | undefined) => {
    if (!id) {
      setSelectedCoin(undefined);
      return;
    }

    setSelectedCoin(coinList[id]);
  };

  const walletDropdownList: DropDownListItemProps[] = useMemo(
    () =>
      wallets.map(w => ({
        id: w.__id,
        text: w.name,
        checkType: 'radio',
        leftImage: (
          <WalletIcon fill={theme.palette.text.white} width={20} height={20} />
        ),
      })),
    [wallets],
  );

  return (
    <DialogBox width={500}>
      <DialogBoxHeader height={56} width={500}>
        <Typography variant="fineprint" width="100%" color="muted">
          <LangDisplay text={strings.dialogTitle} />
        </Typography>
      </DialogBoxHeader>
      <DialogBoxBody pt={4} pr={5} pb={4} pl={5}>
        <Image src={addIcon} alt="Verify Coin" />
        <Container display="flex" direction="column" gap={20} width="full">
          <Typography variant="h5" $textAlign="center">
            <LangDisplay text={strings.header} />
          </Typography>
        </Container>
        <Container display="flex" direction="column" gap={20} width="full">
          <Dropdown
            items={walletDropdownList}
            selectedItem={selectedWallet?.__id}
            searchText={strings.searchText}
            placeholderText={strings.walletPlaceholder}
            onChange={handleWalletChange}
          />
          <Dropdown
            items={coinDropDownList}
            selectedItem={selectedCoin?.id}
            disabled={!selectedWallet}
            searchText={strings.searchText}
            placeholderText={strings.coinPlaceholder}
            onChange={handleCoinChange}
          />
        </Container>
      </DialogBoxBody>

      <DialogBoxFooter>
        <Button
          variant="primary"
          disabled={!selectedCoin || !selectedWallet}
          onClick={e => {
            e.preventDefault();
            onNext();
          }}
        >
          <LangDisplay text={button.continue} />
        </Button>
      </DialogBoxFooter>
    </DialogBox>
  );
};
