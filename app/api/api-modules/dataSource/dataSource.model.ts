import { ZDataSourceCreateSchema } from "./dataSource.schema";
import { IDataSourceCreate } from "./interfaces/IDataSourceCreate";
import { createDataSourceToDataSourceDto } from "./dataSource.mapper";
import db from "~/api/db";

export default class DataSourceModel {

  constructor() {}

  static async create(dataSourceData: IDataSourceCreate) {
    const data = ZDataSourceCreateSchema.parse(
      createDataSourceToDataSourceDto(dataSourceData)
    );
    const dataSource = await db.dataSource.create({ data });
    return dataSource;
  }

  static async findMany() {
    const dataSources = await db.dataSource.findMany();
    return dataSources;
  }

  static async deleteById(id: number) {
    const dataSource = await db.dataSource.delete({ where: { id } });
    return dataSource;
  }
  
}