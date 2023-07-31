import { Prisma } from '@prisma/client';
import { IDataSourceCreate } from './interfaces/IDataSourceCreate';

export const createDataSourceToDataSourceDto = (dataSource: IDataSourceCreate) => {
	return Prisma.validator<Prisma.DataSourceCreateInput>()({
		name: dataSource.name?.trim(),
    url: dataSource.url?.trim(),
		client: dataSource.client,
	});
};
