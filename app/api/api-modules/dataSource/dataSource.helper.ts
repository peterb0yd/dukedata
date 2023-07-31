import { DataSource, DataSourceClient } from "@prisma/client";
import { DataSourceKnexClients } from "./enums/datasourceClients";

export const getDataSourceKnexConfig = (dataSource: DataSource) => {
  switch (dataSource.client) {
    case DataSourceClient.MYSQL:
      return {};
    case DataSourceClient.POSTGRES:
      return {
        client: DataSourceKnexClients.POSTGRES,
        connection: dataSource.url,
        searchPath: ['knex', 'public'],
      };
    case DataSourceClient.SQLITE:
      return {};
    default:
      throw new Error('Invalid client');
  }
};
