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
	const dataSchemaPromises = [];
  dataSchemaPromises.push(
  createDataSchema({
		name: dataSource.name,
		description: JSON.stringify({ schema: databaseSchema }),
		dataSourceId: dataSource.id,
		kind: DataSchemaKind.DATABASE,
	})
  );
  dataSchemaPromises.push(
    ...tableSchemas.map(({ name, schema }: Record<'name'|'schema', string>) => {
			return createDataSchema({
				name,
				description: schema,
				dataSourceId: dataSource.id,
				kind: DataSchemaKind.TABLE,
			});
		})
  );
  return Promise.all(dataSchemaPromises);
};

export const deleteSchemasForDataSource = async (dataSource: DataSource) => {
  return DataSchemaModel.deleteByDataSourceId(dataSource.id);
}