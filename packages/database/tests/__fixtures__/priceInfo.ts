import {
  IDatabase,
  IPriceInfo,
  IPriceInfoRepository,
} from '@cypherock/db-interfaces';

import { ITestClass } from './types';

class PriceInfoData implements ITestClass<IPriceInfo> {
  name = 'PriceInfo';

  sortKey = 'currency';

  isSortDescending = true;

  repo: IPriceInfoRepository;

  sorted: IPriceInfo[] = [
    {
      assetId: 'assetId1',
      currency: 'USD',
      latestPrice: '12.309',
    },
    {
      assetId: 'assetId1',
      currency: 'INR',
      latestPrice: '890.309',
    },
    {
      assetId: 'assetId2',
      currency: 'INR',
      latestPrice: '23.43',
    },
    {
      assetId: 'assetId3',
      currency: 'EUR',
      latestPrice: '0.002',
    },
  ];

  onlyRequired: IPriceInfo[] = [
    {
      assetId: 'assetId1',
      currency: 'USD',
      latestPrice: '12.309',
    },
    {
      assetId: 'assetId2',
      currency: 'INR',
      latestPrice: '23.43',
    },
    {
      assetId: 'assetId1',
      currency: 'INR',
      latestPrice: '890.309',
    },
    {
      assetId: 'assetId3',
      currency: 'EUR',
      latestPrice: '0.002',
    },
  ];

  partial: Partial<IPriceInfo>[] = [
    {
      currency: 'USD',
      latestPrice: '12.309',
    },
    {
      assetId: 'assetId2',
      latestPrice: '23.43',
    },
    {
      assetId: 'assetId1',
    },
    {
      currency: 'EUR',
    },
  ];

  all = this.onlyRequired;

  invalid: IPriceInfo[] = [
    {
      assetId: null as any,
      currency: undefined as any,
      latestPrice: false as any,
    },
    {
      assetId: null as any,
      currency: 'USD',
      latestPrice: '12.309',
    },
    {
      assetId: 'assetId1',
      currency: undefined as any,
      latestPrice: '12.309',
    },
    {
      assetId: 'assetId1',
      currency: 'USD',
      latestPrice: false as any,
    },
  ];

  setRepository(db: IDatabase) {
    this.repo = db.priceInfo;
  }
}
export const priceInfoData = new PriceInfoData();
