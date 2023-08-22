import { DataSchemaKind } from "@prisma/client";

export interface IDataSchemaCreate {
  name: string;
  dataSourceId: number;
  definition: string;
  sample?: string;
  kind: DataSchemaKind;
}