import db from '~/api/db';
import { IDataSourceCreate } from './interfaces/IDataSourceCreate';
import { DataSource } from '@prisma/client';
import { createDataSourceToDataSourceDto } from './dataSource.mapper';

export const createDataSource = async (dataSourceData: IDataSourceCreate) => {
  const dataSource = await db.dataSource.create({
		data: createDataSourceToDataSourceDto(dataSourceData)
	});
  return dataSource;
}

export const getDataSources = async () => {
  const dataSources = await db.dataSource.findMany();
  return dataSources as DataSource[];
}