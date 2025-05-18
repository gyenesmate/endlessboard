import { DBConfig } from 'ngx-indexed-db';

export const indexDBConfig: DBConfig = {
  name: 'RouteLikeDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'routeLikes',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'routeID', keypath: 'routeID', options: { unique: true } },
      ],
    },
  ],
};