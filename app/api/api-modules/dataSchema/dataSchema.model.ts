import db from "~/api/db";
import { IDataSchemaCreate } from "./interfaces/IDataSchemaCreate";
import { createDataSchemaToDataSchemaDto } from "./dataSchema.mapper";
import { ZodDataSchemaCreate } from "./dataSchema.validator";

export default class DataSchemaModel {

  constructor() {}

  static async create(dataSchemaData: IDataSchemaCreate) {
    console.log(  {dataSchemaData})
    const data = ZodDataSchemaCreate.parse(
      createDataSchemaToDataSchemaDto(dataSchemaData)
    );
    return db.dataSchema.create({ data });
  }

  static async findByDataSourceId(dataSourceId: number) {
    return db.dataSchema.findMany({ where: { dataSourceId } });
  }

  static async deleteById(id: number) {
    return db.dataSchema.delete({ where: { id } });
  }
  
}