import coinList from './coins';

import { ICoinInfo, coinFamiliesMap } from '../types';

type BtcFamily = typeof coinFamiliesMap.bitcoin;

export interface IBtcCoinInfo extends ICoinInfo {
  family: BtcFamily;
  apiCoinType: string;
}

export const BtcIdMap = {
  bitcoin: 'bitcoin',
  dash: 'dash',
  dogecoin: 'dogecoin',
  litecoin: 'litecoin',
} as const;

export type BtcIds = (typeof BtcIdMap)[keyof typeof BtcIdMap] | string;

export const btcCoinList: Record<BtcIds, IBtcCoinInfo> = coinList.reduce<
  Record<BtcIds, IBtcCoinInfo>
>(
  (list, coin) => ({
    ...list,
    [coin.id]: {
      family: coinFamiliesMap.bitcoin,
      id: coin.id,
      name: coin.name,
      abbr: coin.abbr,
      isTest: coin.isTest,
      coinGeckoId: coin.coinGeckoId,
      coinIndex: coin.coinIndex,
      feesUnit: coin.feesUnit,
      apiCoinType: coin.apiCoinType,
      units: coin.units,
    },
  }),
  {},
);
