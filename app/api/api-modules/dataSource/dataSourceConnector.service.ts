import { DataSource, DataSourceClient } from '@prisma/client';
import knex, { Knex } from 'knex';
import { getDataSourceKnexConfig } from './dataSource.helper';

let connections: Record<string, Knex<any, unknown[]>> = {};

const getOrCreateSharedConnection = (dataSource: DataSource) => {
	if (connections[dataSource.name]) {
		return connections[dataSource.name];
	} else {
		connections[dataSource.name] = knex(getDataSourceKnexConfig(dataSource));
		return connections[dataSource.name];
	}
};

export default class DataSourceConnectorService {
	dataSource: DataSource;

	constructor(dataSource: DataSource) {
		this.dataSource = dataSource;
	}

	async connect() {
		switch (this.dataSource.client) {
			case DataSourceClient.POSTGRES:
			case DataSourceClient.MYSQL:
			case DataSourceClient.SQLITE:
				await getOrCreateSharedConnection(this.dataSource);
				break;
			default:
				throw new Error('Invalid client');
		}
	}

	async disconnect() {
		switch (this.dataSource.client) {
			case DataSourceClient.POSTGRES:
			case DataSourceClient.MYSQL:
			case DataSourceClient.SQLITE:
				const connection = connections[this.dataSource.name];
				if (!connection) {
					throw new Error('Connection not found');
				}
				await connection.destroy();
				delete connections[this.dataSource.name];
				break;
			default:
				throw new Error('Invalid client');
		}
	}

	async getSchema(): Promise<any> {
		const connection = getOrCreateSharedConnection(this.dataSource);
		const schema = await connection.raw(`
      SELECT table_name
      FROM information_schema.tables
      WHERE 
          table_schema = 'public'
      AND table_type = 'BASE TABLE';
    `);
		return schema.rows;
	}

  async getTableSchema(tableName: string): Promise<any> {
    const connection = getOrCreateSharedConnection(this.dataSource);
    const schema = await connection.raw(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = '${tableName}';
    `);
    return schema.rows;
  }
}