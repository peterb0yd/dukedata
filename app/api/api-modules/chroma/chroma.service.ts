import { ChromaClient, IEmbeddingFunction } from 'chromadb';
import { DataSchema, DataSource } from '@prisma/client';
import { ChromaEmbeddingFunction } from './chroma.embedding';
import { getEmbeddings } from '../openAI/openAI.service';
const client = new ChromaClient();
let embeddingFunction: IEmbeddingFunction;

const getEmbeddingFunction = () => {
  if (!embeddingFunction) {
    embeddingFunction = new ChromaEmbeddingFunction();
  }
  return embeddingFunction;
}

export const createDataSchemaEmbeddings = async (dataSource: DataSource, dataSchemas: DataSchema[]) => {
  try {
    const collection = await client.createCollection({
      name: dataSource.name,
    });
    const ids = [];
    const metadatas = [];
    const documents = [];
    const embeddingsPromise = dataSchemas.map((dataSchema) => {
      return getEmbeddings(dataSchema.description);
    });
    const embeddings = await Promise.all(embeddingsPromise);
    for (const dataSchema of dataSchemas) {
      ids.push(String(dataSchema.id));
      metadatas.push({ schemaName: dataSchema.name, kind: dataSchema.kind });
      documents.push(dataSchema.description);
    }
    collection.add({  
      ids,
      metadatas,
      documents,
      embeddings
    });
  } catch (error) {
    console.log('createDataSchemaEmbeddings caught error');
    console.log(error);
  }
};

export const queryDataSchemaEmbeddings = async (dataSource: DataSource, text: string) => {
	const collection = await client.getCollection({
		name: dataSource.name,
    embeddingFunction: getEmbeddingFunction(),
	});
  console.log({collection});
  const result = await collection.query({
    queryTexts: [text],
    nResults: 3,
  });
  console.log({result});
  const results = [];
  for (let i = 0; i < result.ids.length; i++) {
    results.push({
      id: result.ids[i],
      metadata: result.metadatas[i],
      document: result.documents[i],
      embedding: result.embeddings && result.embeddings[i],
    });
  }
  return results;
};

export const deleteEmbeddingsForDataSource = (dataSource: DataSource) => {
  return client.deleteCollection({
    name: dataSource.name,
  });
}