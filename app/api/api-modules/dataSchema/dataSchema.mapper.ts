
import { Prisma } from '@prisma/client';
import { IDataSchemaCreate } from './interfaces/IDataSchemaCreate';

export const createDataSchemaToDataSchemaDto = (dataSchema: IDataSchemaCreate) => {
	return Prisma.validator<Prisma.DataSchemaCreateManyInput>()({
		name: dataSchema.name?.trim(),
    description: dataSchema.description?.trim(),
    dataSourceId: dataSchema.dataSourceId,
    kind: dataSchema.kind,
	});
};
