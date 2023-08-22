import { Prisma } from '@prisma/client';
import { IDataSchemaCreate } from './interfaces/IDataSchemaCreate';

export const createDataSchemaToDataSchemaDto = (dataSchema: IDataSchemaCreate) => {
	return Prisma.validator<Prisma.DataSchemaCreateManyInput>()({
		name: dataSchema.name?.trim(),
		definition: dataSchema.definition,
		sample: dataSchema.sample ?? '',
		dataSourceId: dataSchema.dataSourceId,
		kind: dataSchema.kind,
	});
};

export const databaseTablesToSchemaDefinition = (databaseTables: Array<Record<string, any>>) => {
	return JSON.stringify({ tables: databaseTables });
};
