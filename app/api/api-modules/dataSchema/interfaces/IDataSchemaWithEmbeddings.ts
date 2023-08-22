import { DataSchema } from "@prisma/client";

interface EmbeddingsObject {
  definition: Array<number>;
  sample: Array<number>;
}

export interface IDataSchemaWithEmbeddings extends DataSchema {
  embeddings: EmbeddingsObject;
}