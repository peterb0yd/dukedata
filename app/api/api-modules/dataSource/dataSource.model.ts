import { ZodDataSourceCreate } from "./dataSource.validator";
import { createDataSourceToDataSourceDto } from "./dataSource.mapper";
import db from "~/api/db";
import { IDataSourceCreate } from "./interfaces/IDataSourceCreate";

export default class DataSourceModel {

  constructor() {}

  static async create(dataSourceData: IDataSourceCreate) {
    const data = ZodDataSourceCreate.parse(
      createDataSourceToDataSourceDto(dataSourceData)
    );
    return db.dataSource.create({ data });
  }

  static async findMany() {
    return db.dataSource.findMany();
  }

  // TODO: add where clause
  static async findSelected() {
    return db.dataSource.findFirst({ include: {
      dataSchemas: true,
    }}); 
  }

  static async deleteById(id: number) {
    return db.dataSource.delete({ where: { id } });
  }
  
}