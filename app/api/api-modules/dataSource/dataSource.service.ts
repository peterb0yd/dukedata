import { IDataSourceCreate } from './interfaces/IDataSourceCreate';
import { DataSource, MessageKind } from '@prisma/client';
import { createDataSourceToDataSourceDto } from './dataSource.mapper';
import DataSourceModel from './dataSource.model';
import DataSourceConnectorService from './dataSourceConnector.service';
import { getSchemaDescription } from '../openAI/openAI.service';
import MessageModel from '../message/message.model';

export const createDataSource = async (dataSourceData: IDataSourceCreate) => {
  const dataSource = await DataSourceModel.create(dataSourceData);
  const connectorService = new DataSourceConnectorService(dataSource);
  await connectorService.connect();
  const schema = await connectorService.getSchema();
  await connectorService.disconnect();
  const schemaDescription = await getSchemaDescription(JSON.stringify(schema));
  await MessageModel.create({
    body: JSON.stringify(schemaDescription),
    kind: MessageKind.BOT,
  })
  return dataSource;
}

export const getDataSources = async () => {
  const dataSources = await DataSourceModel.findMany();
  return dataSources as DataSource[];
}

export const deleteDataSource = async (id: number) => {
  const dataSource = await DataSourceModel.deleteById(id);
  return dataSource;
}