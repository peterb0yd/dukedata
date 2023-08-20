import { ChromaClient, IEmbeddingFunction } from 'chromadb';
import { DataSchema, DataSource } from '@prisma/client';
import { ChromaEmbeddingFunction } from './chroma.embedding';
import { getEmbeddings } from '../openAI/openAI.service';
import { fulfilledPromiseValues } from '~/api/utils/promise.server';
import { getSampleRows } from '../dataSource/dataSource.service';
const client = new ChromaClient();
let embeddingFunction: IEmbeddingFunction;

const getEmbeddingFunction = () => {
	if (!embeddingFunction) {
		embeddingFunction = new ChromaEmbeddingFunction();
	}
	return embeddingFunction;
};

export const createDataSchemaEmbeddings = async (
	dataSource: DataSource,
	dataSchemas: DataSchema[],
	sampleRows?: string[]
) => {
	try {
		const collection = await client.createCollection({
			name: dataSource.name,
		});
		const ids = [], metadatas = [], documents = [], embeddings = [];
		const dataSchemasPromise = dataSchemas.map(async (dataSchema) => {
      const obj = Object.assign({}, dataSchema as any);
			obj.embeddings = await getEmbeddings(dataSchema.description);
      obj.samples = await getSampleRows(dataSource, dataSchema);
      return obj;
		});
		const dataSchemasData = fulfilledPromiseValues(await Promise.allSettled(dataSchemasPromise));
		for (const dataSchemaData of dataSchemasData) {
			ids.push(String(dataSchemaData.id));
			metadatas.push({ schemaName: dataSchemaData.name, kind: dataSchemaData.kind });
			documents.push(JSON.stringify({ 
        description: dataSchemaData.description, 
        samples: dataSchemaData.samples 
      }));
      embeddings.push(dataSchemaData.embeddings || []);
		}
		collection.add({
			ids,
			metadatas,
			documents,
			embeddings,
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
	console.log({ collection });
	const result = await collection.query({
		queryTexts: [text],
		nResults: 3,
	});
	console.log({ result });
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
};
