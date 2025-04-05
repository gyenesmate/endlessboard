import { DBConfig } from 'ngx-indexed-db';

export const dbConfig: DBConfig = {
  name: 'UserDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'users',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'userName', keypath: 'userName', options: { unique: false } },
        { name: 'userEmail', keypath: 'userEmail', options: { unique: true } },
      ],
    },
  ],
};