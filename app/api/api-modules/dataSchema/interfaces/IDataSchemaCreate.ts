import { DataSchemaKind } from "@prisma/client";

export interface IDataSchemaCreate {
  name: string;
  dataSourceId: number;
  description: string;
  kind: DataSchemaKind;
}