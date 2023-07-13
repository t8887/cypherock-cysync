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
} from '@cypherock/cysync-ui';
import React, { useState } from 'react';
import { useAppSelector } from '~/store';

export const SelectCryptoDialog: React.FC = () => {
  const lang = useAppSelector(state => state.addAccount.strings);
  const crypto = lang.addAccount.selectCrypto.info.dialogBox;

  const [firstDropdownSelection, setFirstDropdownSelection] = useState<
    string | null
  >(null);
  const [secondDropdownSelection, setSecondDropdownSelection] = useState<
    string | null
  >(null);

  const handleFirstDropdownSelectionChange = (
    selectedItemId: string | null,
  ) => {
    setFirstDropdownSelection(selectedItemId);
  };

  const handleSecondDropdownSelectionChange = (
    selectedItemId: string | null,
  ) => {
    // Handle the selection change of the second dropdown here
    setSecondDropdownSelection(selectedItemId);
  };

  return (
    <DialogBox width={500} height={500}>
      <DialogBoxHeader height={56} width={500}>
        <Typography variant="fineprint" width="100%" color="muted">
          <LangDisplay text={crypto.title} />
        </Typography>
      </DialogBoxHeader>
      <DialogBoxBody pt={4} pr={5} pb={4} pl={5}>
        <Image src={addIcon} alt="Verify Coin" />
        <Container display="flex" direction="column" gap={20} width="full">
          <Typography variant="h5" $textAlign="center">
            <LangDisplay text={crypto.header} />
          </Typography>
          <Container display="flex" gap={5}>
            <Typography variant="span" color="muted">
              <LangDisplay text={crypto.subTitle} />
            </Typography>
            <Typography variant="span" color="white">
              Cypherock Red
            </Typography>
          </Container>
        </Container>
        <Container display="flex" direction="column" gap={20} width="full">
          <Dropdown
            items={crypto.dropDownDataWithWallet}
            shouldChangeColor
            searchText={crypto.searchText}
            placeholderText={crypto.placeholderWalletText}
            onSelectionChange={handleFirstDropdownSelectionChange}
          />
          <Dropdown
            items={crypto.dropDownData}
            disabled={!firstDropdownSelection}
            searchText={crypto.searchText}
            placeholderText={crypto.placeholderText}
            onSelectionChange={handleSecondDropdownSelectionChange}
          />
        </Container>
      </DialogBoxBody>

      <DialogBoxFooter>
        <Button variant="primary" disabled={!secondDropdownSelection}>
          <LangDisplay text={crypto.buttonName} />
        </Button>
      </DialogBoxFooter>
    </DialogBox>
  );
};