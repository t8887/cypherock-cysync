import { Button } from '@cypherock/cysync-ui';
import React, { ReactElement } from 'react';
import { SDK } from '@cypherock/sdk-core';
import { coinList } from '@cypherock/coins';
import logger from '../../../utils/logger';
import { useDevice } from '../../../context';
import { DeviceConnectionState } from '../../../context/device/helpers';

export const Splash = (): ReactElement => {
  const { connection } = useDevice();

  return (
    <>
      <div>
        <Button onClick={() => logger.info(SDK.create)} variant="primary">
          Get Started
        </Button>
        <Button variant="secondary" onClick={() => logger.info(coinList)}>
          Get Started
        </Button>
      </div>
      <div style={{ whiteSpace: 'pre-line' }}>
        {(!connection ||
          connection?.state === DeviceConnectionState.NOT_CONNECTED) &&
          `No device connected`}
        {connection?.state === DeviceConnectionState.CONNECTED &&
          `Device connected: ${JSON.stringify(connection, undefined, 2)}`}
        {connection?.state === DeviceConnectionState.UNKNOWN_ERROR &&
          `Error connecting device: ${JSON.stringify(
            connection,
            undefined,
            2,
          )}`}
      </div>
    </>
  );
};
