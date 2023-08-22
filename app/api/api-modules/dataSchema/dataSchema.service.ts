import { DataSchemaKind, DataSchemaPayload, DataSource } from '@prisma/client';
import DataSchemaModel from './dataSchema.model';
import { IDataSchemaCreate } from './interfaces/IDataSchemaCreate';
import { databaseTablesToSchemaDefinition } from './dataSchema.mapper';

export const createDataSchema = (dataSchema: IDataSchemaCreate) => {
	return DataSchemaModel.create(dataSchema);
};

// TODO: update types and clean up this function
export const createDataSchemasForDataSource = async (
	dataSource: DataSource,
	databaseTables: Array<Record<string, any>>,
	tableSchemas: Array<IDataSchemaCreate>
) => {
	const dataSchemaPromises = [];
	dataSchemaPromises.push(
		createDataSchema({
			name: dataSource.name,
			definition: databaseTablesToSchemaDefinition(databaseTables),
			dataSourceId: dataSource.id,
			kind: DataSchemaKind.DATABASE,
		})
	);
	dataSchemaPromises.push(
		...tableSchemas.map(tableSchema => {
			return createDataSchema({
				name: tableSchema.name,
				definition: tableSchema.definition,
        sample: tableSchema.sample,
				dataSourceId: dataSource.id,
				kind: DataSchemaKind.TABLE,
			});
		})
	);
	return Promise.all(dataSchemaPromises);
};

export const deleteSchemasForDataSource = async (dataSource: DataSource) => {
	return DataSchemaModel.deleteByDataSourceId(dataSource.id);
};
