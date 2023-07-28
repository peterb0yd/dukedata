import { DataSourceKind } from '@prisma/client';

export interface IDataSourceCreate {
  name: string;
  url: string;
	kind: DataSourceKind;
}
