import { IReceiveEvent } from '@cypherock/coin-support-interfaces';
import { assert } from '@cypherock/cysync-utils';
import { Observable } from 'rxjs';

import { App, IMakeReceiveObservableParams } from './types';

export function makeReceiveObservable<T extends App, K extends IReceiveEvent>(
  params: IMakeReceiveObservableParams<T, K>,
) {
  return new Observable<K>(observer => {
    let finished = false;
    let app: T | undefined;

    const cleanUp = () => {
      if (app) {
        app.destroy();

        // TODO: Add this in SDK
        // app.abort();
      }
    };

    const unsubscribe = () => {
      finished = true;
      cleanUp();
    };

    const main = async () => {
      try {
        if (finished) return;

        const account = await params.db.account.getOne({
          __id: params.accountId,
        });
        assert(account, 'Invalid AccountId');

        if (finished) return;

        const { address, expectedFromDevice, derivationPath } =
          await params.generateReceiveAddress({
            account,
          });
        observer.next({ type: 'Address', address } as any);

        if (finished) return;

        if (params.connection) {
          app = await params.createApp(params.connection);
          const addressFromDevice = await params.getReceiveAddressFromDevice({
            app,
            derivationPath,
            walletId: account.walletId,
            observer,
          });
          observer.next({
            type: 'AddressMatched',
            didAddressMatched: addressFromDevice === expectedFromDevice,
          } as any);
        }

        observer.complete();
      } catch (error) {
        if (!finished) {
          observer.error(error);
        }
      }
    };

    main();

    return unsubscribe;
  });
}
