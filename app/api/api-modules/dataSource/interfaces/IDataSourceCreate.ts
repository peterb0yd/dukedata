import { DataSourceClient } from '@prisma/client';

export interface IDataSourceCreate {
  name: string;
  url: string;
	client: DataSourceClient;
}
