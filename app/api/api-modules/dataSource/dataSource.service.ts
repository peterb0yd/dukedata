import DataSourceModel from './dataSource.model';
import DataSourceConnectorService from './dataSourceConnector.service';
import { IDataSourceCreate } from './interfaces/IDataSourceCreate';
import { createDataSchemasForDataSource } from '../dataSchema/dataSchema.service';

export const createDataSource = async (dataSourceData: IDataSourceCreate) => {
  console.log({dataSourceData})
  const dataSource = await DataSourceModel.create(dataSourceData);
  const connectorService = new DataSourceConnectorService(dataSource);
  await connectorService.connect();
  const dataBaseSchema = await connectorService.getSchema();
  const tableSchemas: Array<Record<string, string>> = [];
  await Promise.all(dataBaseSchema.map(async (table: any) => {
    const tableSchema = await connectorService.getTableSchema(table);
    tableSchemas.push({ name: table?.table_name ?? 'no-name', schema: JSON.stringify(tableSchema) });
  }));
  await connectorService.disconnect();
  await createDataSchemasForDataSource(dataSource, dataBaseSchema, tableSchemas);
  return dataSource;
}

export const getDataSources = async () => {
  return DataSourceModel.findMany();
}

export const deleteDataSource = async (id: number) => {
  return DataSourceModel.deleteById(id);
}