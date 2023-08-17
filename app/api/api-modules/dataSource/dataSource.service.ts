import DataSourceModel from './dataSource.model';
import DataSourceConnectorService from './dataSourceConnector.service';
import { IDataSourceCreate } from './interfaces/IDataSourceCreate';
import { createDataSchemasForDataSource, deleteSchemasForDataSource } from '../dataSchema/dataSchema.service';
import { createDataSchemaEmbeddings, deleteEmbeddingsForDataSource } from '../chroma/chroma.service';
import { fulfilledPromiseValues } from '../../utils/promise.server';

export const createDataSource = async (dataSourceData: IDataSourceCreate) => {
  const dataSource = await DataSourceModel.create(dataSourceData);
  const connectorService = new DataSourceConnectorService(dataSource);
  await connectorService.connect();
  const dataBaseSchema = await connectorService.getSchema();
  const tableSchemas = await getTableSchemas(connectorService, dataBaseSchema);
  await connectorService.disconnect();
  const dataSchemas = await createDataSchemasForDataSource(dataSource, dataBaseSchema, tableSchemas);
  await createDataSchemaEmbeddings(dataSource, dataSchemas);
  return dataSource;
}

export const getSelectedDataSource = () => {
  return DataSourceModel.findSelected();
}

export const getDataSources = () => {
  return DataSourceModel.findMany();
}

export const deleteDataSource = async (id: number) => {
  const dataSource = await DataSourceModel.findById(id);
  if (!dataSource) {
    throw new Error('Data source not found');
  };
  await deleteEmbeddingsForDataSource(dataSource);
  await deleteSchemasForDataSource(dataSource);
  await DataSourceModel.deleteById(id);
}

const getTableSchemas = async (connectorService: DataSourceConnectorService, dataBaseSchema: Array<Record<string, any>>) => {
  const tableSchemas: Array<Record<string, string>> = [];
  const results = await Promise.allSettled(dataBaseSchema.map(async (table: Record<string, any>) => {
    const schema = await connectorService.getTableSchema(table.tableName);
    const samples = await connectorService.getTableRowSamples(table.tableName);
    tableSchemas.push({ 
      name: table.tableName, 
      schema: JSON.stringify({ schema, samples })
    })
  }));
  return fulfilledPromiseValues(results);
}