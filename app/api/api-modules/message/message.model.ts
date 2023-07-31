import { ZMessageCreateSchema } from "./message.schema";
import { IMessageCreate } from "./interfaces/IMessageCreate";
import { createMessageToMessageDto } from "./message.mapper";
import db from "~/api/db";

export default class MessageModel {

  constructor() {}

  static async create(dataSourceData: IMessageCreate) {
    const data = ZMessageCreateSchema.parse(
      createMessageToMessageDto(dataSourceData)
    );
    return db.message.create({ data });
  }

  static async findMany() {
    return db.message.findMany();
  }

  static async deleteById(id: number) {
    return db.message.delete({ where: { id } });
  }
  
}