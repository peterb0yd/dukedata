import DataSourceModel from './dataSource.model';
import DataSourceConnectorService from './dataSourceConnector.service';
import { IDataSourceCreate } from './interfaces/IDataSourceCreate';
import {
	createDataSchemasForDataSource,
	deleteSchemasForDataSource,
} from '../dataSchema/dataSchema.service';
import {
	createDataSchemaEmbeddings,
	deleteEmbeddingsForDataSource,
} from '../chroma/chroma.service';
import { fulfilledPromiseValues } from '../../utils/promise.server';
import { DataSchema, DataSource } from '@prisma/client';
import { IDataSchemaCreate } from '../dataSchema/interfaces/IDataSchemaCreate';
import { sampleRowsToSampleDocument, tableSchemaToDefinitionDocument } from './dataSource.mapper';

export const createDataSource = async (dataSourceData: IDataSourceCreate) => {
	const dataSource = await DataSourceModel.create(dataSourceData);
	const connectorService = new DataSourceConnectorService(dataSource);
	await connectorService.connect();
	const databaseTables = await connectorService.getDatabaseSchema();
	const tableSchemas = await getTableSchemas(connectorService, databaseTables);
	await connectorService.disconnect();
	const dataSchemas = await createDataSchemasForDataSource(
		dataSource,
		databaseTables,
		tableSchemas
	);
	await createDataSchemaEmbeddings(dataSource, dataSchemas);
	return dataSource;
};

export const getSelectedDataSource = () => {
	return DataSourceModel.findSelected();
};

export const getDataSources = () => {
	return DataSourceModel.findMany();
};

export const deleteDataSource = async (id: number) => {
	const dataSource = await DataSourceModel.findById(id);
	if (!dataSource) {
		throw new Error('Data source not found');
	}
	await deleteEmbeddingsForDataSource(dataSource);
	await deleteSchemasForDataSource(dataSource);
	await DataSourceModel.deleteById(id);
};

export const getSampleRows = async (dataSource: DataSource, dataSchema: DataSchema) => {
	const connectorService = new DataSourceConnectorService(dataSource);
	await connectorService.connect();
	const sampleRows = connectorService.getTableRowSamples(dataSchema.name);
	await connectorService.disconnect();
	return sampleRows;
};

const getTableSchemas = async (
	connectorService: DataSourceConnectorService,
	dataBaseSchema: Array<Record<string, any>>
) => {
	const tableSchemas: Array<Partial<IDataSchemaCreate>> = [];
	await Promise.allSettled(
		dataBaseSchema.map(async (table) => {
      const { tableName } = table;
			const definition = await connectorService.getTableSchema(tableName);
			const sample = await connectorService.getTableRowSamples(tableName);
			tableSchemas.push({
				name: table.tableName,
				definition: tableSchemaToDefinitionDocument(tableName, definition),
				sample: sampleRowsToSampleDocument(tableName, sample),
			});
		})
	);
	return tableSchemas as Array<IDataSchemaCreate>;
};
