import React from 'react';

import { failIcon } from '../../../assets/images';
import { Container, Typography, LangDisplay, Button, Image } from '../../atoms';
import { DialogBox, DialogBoxBody, DialogBoxFooter } from './DialogBox';

export interface ErrorDialogProps {
  title: string;
  subtext?: string;
  showRetry?: boolean;
  showSupport?: boolean;
  onRetry?: () => void;
}

export const ErrorDialog: React.FC<ErrorDialogProps> = ({
  title,
  subtext,
  showRetry,
  showSupport,
  onRetry,
}) => (
  <DialogBox width={500}>
    <DialogBoxBody>
      <Image src={failIcon} alt="Failure Icon" />
      <Container display="flex" direction="column" gap={4}>
        <Typography variant="h5" $textAlign="center">
          <LangDisplay text={title} />
        </Typography>
        {subtext && (
          <Typography variant="h6" $textAlign="center" color="muted">
            <LangDisplay text={subtext} />
          </Typography>
        )}
      </Container>
    </DialogBoxBody>
    <DialogBoxFooter>
      {showSupport && <Button variant="primary">Support</Button>}
      {showRetry && (
        <Button variant="primary" onClick={onRetry}>
          Retry
        </Button>
      )}
    </DialogBoxFooter>
  </DialogBox>
);

ErrorDialog.defaultProps = {
  subtext: undefined,
  showRetry: false,
  showSupport: false,
  onRetry: undefined,
};