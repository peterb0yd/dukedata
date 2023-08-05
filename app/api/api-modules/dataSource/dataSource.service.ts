import DataSourceModel from './dataSource.model';
import DataSourceConnectorService from './dataSourceConnector.service';
import { IDataSourceCreate } from './interfaces/IDataSourceCreate';
import { createDataSchemasForDataSource } from '../dataSchema/dataSchema.service';

export const createDataSource = async (dataSourceData: IDataSourceCreate) => {
  const dataSource = await DataSourceModel.create(dataSourceData);
  const connectorService = new DataSourceConnectorService(dataSource);
  await connectorService.connect();
  const dataBaseSchema = await connectorService.getSchema();
  const tableSchemas = await getTableSchemas(connectorService, dataBaseSchema);
  await connectorService.disconnect();
  await createDataSchemasForDataSource(dataSource, dataBaseSchema, tableSchemas);
  return dataSource;
}

export const getSelectedDataSource = () => {
  return DataSourceModel.findSelected();
}

export const getDataSources = () => {
  return DataSourceModel.findMany();
}

export const deleteDataSource = (id: number) => {
  return DataSourceModel.deleteById(id);
}

const getTableSchemas = async (connectorService: DataSourceConnectorService, dataBaseSchema: Array<Record<string, any>>) => {
  const tableSchemas: Array<Record<string, string>> = [];
  await Promise.all(dataBaseSchema.map(async (table: Record<string, any>) => {
    const tableSchema = await connectorService.getTableSchema(table.tableName);
    tableSchemas.push({ name: table.tableName, schema: JSON.stringify(tableSchema) });
  }));
  return tableSchemas;
}