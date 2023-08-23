import { Prisma } from '@prisma/client';
import { IDataSourceCreate } from './interfaces/IDataSourceCreate';

export const createDataSourceToDataSourceDto = (dataSource: IDataSourceCreate) => {
	return Prisma.validator<Prisma.DataSourceCreateInput>()({
		name: dataSource.name?.trim(),
		url: dataSource.url?.trim(),
		client: dataSource.client,
	});
};

export const tableSchemaToDefinitionDocument = (
	tableName: string,
	schemaDefinition: Array<Record<string, any>>
) => {
	return JSON.stringify({ [`${tableName}-definition`]: schemaDefinition });
};

export const sampleRowsToSampleDocument = (
	tableName: string,
	sampleRows: Array<Record<string, any>>
) => {
	return JSON.stringify({ [`${tableName}-samples`]: sampleRows });
};
