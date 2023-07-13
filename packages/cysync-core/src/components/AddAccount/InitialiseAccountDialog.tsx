import {
  LangDisplay,
  DialogBox,
  DialogBoxHeader,
  DialogBoxBody,
  LeanBoxContainer,
  LeanBox,
  verifyCoinIcon,
  Typography,
  Image,
  Container,
} from '@cypherock/cysync-ui';
import React from 'react';
import { useAppSelector } from '~/store';

export const InitialiseAccountDialog: React.FC = () => {
  const lang = useAppSelector(state => state.addAccount.strings);
  const initAccount = lang.addAccount.initAccount.info.dialogBox;

  return (
    <div>
      <DialogBox width={500} height={480}>
        <DialogBoxHeader height={56} width={500}>
          <Typography variant="fineprint" width="100%" color="muted">
            <LangDisplay text={initAccount.title} />
          </Typography>
        </DialogBoxHeader>
        <DialogBoxBody pt={4} pr={5} pb={4} pl={5}>
          <Image src={verifyCoinIcon} alt="Verify Coin" />
          <Container display="flex" direction="column" gap={20} width="full">
            <Typography variant="h5" $textAlign="center">
              <LangDisplay text={initAccount.header} />
            </Typography>
            <Typography variant="span" $textAlign="center" color="muted">
              <LangDisplay text={initAccount.subheader} />
              <strong style={{ color: 'white' }}>
                {' '}
                <LangDisplay text={initAccount.subheader1} />
              </strong>
            </Typography>
          </Container>
          <LeanBoxContainer>
            {initAccount.dataArray.map(data => (
              <LeanBox
                key={data.id}
                leftImageSrc={data.leftImageSrc}
                rightImageSrc={data.rightImageSrc}
                text={data.text}
              />
            ))}
          </LeanBoxContainer>
        </DialogBoxBody>
      </DialogBox>
    </div>
  );
};