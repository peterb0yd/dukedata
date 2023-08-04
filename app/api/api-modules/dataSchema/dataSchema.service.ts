import { DataSchemaKind, DataSource } from '@prisma/client';
import DataSchemaModel from './dataSchema.model';
import { IDataSchemaCreate } from './interfaces/IDataSchemaCreate';

export const createDataSchema = (dataSchema: IDataSchemaCreate) => {
	return DataSchemaModel.create(dataSchema);
};

// TODO: update types and clean up this function
export const createDataSchemasForDataSource = async (
	dataSource: DataSource,
	databaseSchema: string,
	tableSchemas: Array<Record<'name'|'schema', string>>,
) => {
	await createDataSchema({
		name: dataSource.name,
		description: JSON.stringify({ schema: databaseSchema }),
		dataSourceId: dataSource.id,
		kind: DataSchemaKind.DATABASE,
	});
	await Promise.all(
		tableSchemas.map(({ name, schema }: Record<'name'|'schema', string>) => {
			return createDataSchema({
				name,
				description: schema,
				dataSourceId: dataSource.id,
				kind: DataSchemaKind.TABLE,
			});
		})
	);
};
