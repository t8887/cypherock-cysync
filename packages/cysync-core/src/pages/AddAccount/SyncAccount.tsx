import React from 'react';

import {
  AddAccountDialog,
  AddAccountSingleChainDialog,
  InitialiseAccountDialog,
  NoAccountDialog,
  SelectCryptoDialog,
} from '~/components';
import { selectLanguage, useAppSelector } from '~/store';

export const SyncAccount: React.FC = () => {
  const lang = useAppSelector(selectLanguage);
  const addAccount = lang.strings.addAccountSingleChain;
  const addAcc = lang.strings.addAccount;
  const { initAccount, noAccount } = lang.strings;
  const { selectCrypto } = lang.strings;
  console.log('selectCrypto', selectCrypto);
  return (
    <div>
      <AddAccountDialog addAccount={addAcc} />
      <SelectCryptoDialog selectCrypto={selectCrypto.info} />
      <AddAccountSingleChainDialog addAccount={addAccount} />
      {/* <Dropdown items={selectCrypto.info.dialogBox.dropDownData} />; */}
      {/* <Dropdown items={selectCrypto.info.dialogBox.dropDownDataWithWallet} shouldChangeColor />; */}
      <InitialiseAccountDialog initAccount={initAccount.info} />
      <NoAccountDialog noAccount={noAccount.info} />
      {/* {addAcc.info.dialogBox.dropDownData.map((item) => (
              <TempListItem key={item.id} {...item}/>
          ))} */}
    </div>
  );
};
