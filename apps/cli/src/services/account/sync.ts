import { getCoinSupport } from '@cypherock/coin-support';
import { IDatabase } from '@cypherock/db-interfaces';
import colors from 'colors/safe';
import { lastValueFrom } from 'rxjs';

import { Spinner } from '~/utils';

const syncSpinnerText = 'Syncing accounts';

export const syncAccounts = async (params: { db: IDatabase }) => {
  console.log(colors.cyan('Starting to sync accounts'));

  const spinner = await Spinner.create(syncSpinnerText);

  const { db } = params;

  const accounts = await db.account.getAll();

  spinner.updateText(`${syncSpinnerText} (0/${accounts.length})`);

  if (accounts.length <= 0) {
    spinner.succeed();
    console.log(colors.grey('No accounts found'));
    return;
  }

  let count = 1;

  for (const account of accounts) {
    spinner.updateText(`${syncSpinnerText} (${count}/${accounts.length})`);

    const coinSupport = getCoinSupport(account.familyId);
    await lastValueFrom(
      coinSupport.syncAccounts({ db, accountId: account.__id }),
    );
    count += 1;
  }

  spinner.succeed();
  console.log(colors.green('Accounts synced'));
};
