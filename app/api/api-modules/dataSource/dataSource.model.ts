import { ZodDataSourceCreate, ZodDataSourceUpdate } from './dataSource.validator';
import { createDataSourceToDataSourceDto } from './dataSource.mapper';
import db from '~/api/db';
import { IDataSourceCreate } from './interfaces/IDataSourceCreate';
import { IDataSourceUpdate } from './interfaces/IDataSourceUpdate';

export default class DataSourceModel {
	constructor() {}

	static async create(dataSourceData: IDataSourceCreate) {
		const data = ZodDataSourceCreate.parse(createDataSourceToDataSourceDto(dataSourceData));
		return db.dataSource.create({ data });
	}

	static async update(id: number, dataSourceData: IDataSourceUpdate) {
		const data = ZodDataSourceUpdate.parse(dataSourceData);
		return db.dataSource.update({
			where: { id },
			data,
		});
	}

	static async findMany() {
		return db.dataSource.findMany();
	}

	static async findById(id: number) {
		return db.dataSource.findUnique({ where: { id } });
	}

	static async findSelected() {
		return db.dataSource.findFirst({
			where: {
        isSelected: true,
      },
      include: {
				dataSchemas: true,
			},
		});
	}

	static async deleteById(id: number) {
		return db.dataSource.delete({ where: { id } });
	}
}
