import {
  LangDisplay,
  DialogBox,
  DialogBoxBody,
  Typography,
  Image,
  Container,
  DialogBoxFooter,
  Button,
  circledCheckIcon,
  InputLabel,
  CopyContainer,
  Flex,
  bitcoinIcon,
  InformationBox,
  Tag,
  qrcodeIcon,
  informationOrangeIcon,
} from '@cypherock/cysync-ui';
import React from 'react';

import { selectLanguage, useAppSelector } from '~/store';

import { useReceiveDialog } from '../../context';

export const ReceiveAddressNotVerified: React.FC = () => {
  const lang = useAppSelector(selectLanguage);
  const connect = lang.strings.receive.deviceAddressNotVerified.info.dialogBox;
  const { buttons } = lang.strings;
  const { goTo, onClose } = useReceiveDialog();

  const handleVerificationAgain = () => {
    goTo(1, 0);
  };

  return (
    <DialogBox width={600}>
      <DialogBoxBody pt={4} pr={5} pb={4} pl={5}>
        <Image src={circledCheckIcon} alt="Connection Disconnected" />
        <Flex gap={5} direction="column">
          <Flex gap={5} direction="row">
            <Typography variant="h5" width="100%">
              <LangDisplay text={connect.text} />
            </Typography>
            <Image src={bitcoinIcon} alt="Bitcoin" />
            <Typography variant="h5" width="100%">
              <LangDisplay text={connect.coinText} />
            </Typography>

            <Tag $fontSize={12}>{connect.tag}</Tag>
          </Flex>
          <Typography variant="h5" width="100%" ml="auto" mr="auto">
            <LangDisplay text={connect.finaltext} />
          </Typography>
        </Flex>
        <Image src={qrcodeIcon} alt="qrcode image" />
        <Container
          display="flex"
          direction="column"
          width="full"
          gap={5}
          justify="flex-start"
        >
          <InputLabel mb={0}>{connect.label}</InputLabel>
          <CopyContainer link={connect.address} variant="gold" />
        </Container>
        <InformationBox
          text={connect.InfoBox.text}
          leftImage={
            <Image px={1} src={informationOrangeIcon} alt="Icon Image" />
          }
          $backgroundColor="warning"
          $borderColor="infoBoxOrange"
        />
      </DialogBoxBody>
      <DialogBoxFooter>
        <Button variant="secondary" onClick={handleVerificationAgain}>
          {buttons.reverify}
        </Button>
        <Button variant="primary" onClick={onClose}>
          {buttons.done}
        </Button>
      </DialogBoxFooter>
    </DialogBox>
  );
};
