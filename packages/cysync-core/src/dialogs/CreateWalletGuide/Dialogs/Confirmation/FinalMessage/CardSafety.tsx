import { GuidedFlowDialogBox, informationIcon } from '@cypherock/cysync-ui';
import React, { FC } from 'react';

import { useCreateWalletGuide } from '~/dialogs/CreateWalletGuide/context';
import { selectLanguage, useAppSelector } from '~/store';

export const CardSafety: FC = () => {
  const lang = useAppSelector(selectLanguage);
  const { onNext, onPrevious } = useCreateWalletGuide();
  return (
    <GuidedFlowDialogBox
      image={informationIcon}
      onNext={onNext}
      onPrevious={onPrevious}
      heading={
        lang.strings.onboarding.createWallet.finalMessage.cardSafety.heading
      }
      title={lang.strings.onboarding.createWallet.finalMessage.cardSafety.title}
      showInfoIcon={false}
      infoTextVariant="warn"
      infoText={
        lang.strings.onboarding.createWallet.finalMessage.cardSafety.note
      }
    />
  );
};