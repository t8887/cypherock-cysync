import {
  LangDisplay,
  DialogBox,
  DialogBoxBody,
  Typography,
  Image,
  Container,
  DialogBoxFooter,
  Button,
  verifyCoinIcon,
} from '@cypherock/cysync-ui';
import React from 'react';

import { selectLanguage, useAppSelector } from '~/store';

import { useReceiveDialog } from '../../context';

export const ReceiveDeviceConfirmCancelled: React.FC = () => {
  const lang = useAppSelector(selectLanguage);

  const connect = lang.strings.receive.deviceConfirmCancelled.info.dialogBox;
  const { buttons } = lang.strings;
  const { onNext } = useReceiveDialog();

  const handleButtonClick = () => {
    onNext();
  };

  return (
    <DialogBox width={500}>
      <DialogBoxBody pt={4} pr={5} pb={4} pl={5}>
        <Image src={verifyCoinIcon} alt="Verify Coin" />
        <Container display="flex" direction="column" width="full">
          <Typography variant="h5" $textAlign="center" color="error">
            <LangDisplay text={connect.header} />
          </Typography>
          <Typography
            variant="span"
            $textAlign="center"
            $fontSize={14}
            $fontWeight="normal"
            color="muted"
          >
            <LangDisplay text={connect.subheader} />
          </Typography>
        </Container>
      </DialogBoxBody>
      <DialogBoxFooter>
        <Button variant="secondary">{buttons.report}</Button>
        <Button variant="primary" onClick={handleButtonClick}>
          {buttons.retry}
        </Button>
      </DialogBoxFooter>
    </DialogBox>
  );
};
