import { ChromaClient, IEmbeddingFunction } from 'chromadb';
import { DataSchema, DataSource } from '@prisma/client';
import { ChromaEmbeddingFunction } from './chroma.embedding';
import { getEmbeddings } from '../openAI/openAI.service';
import { fulfilledPromiseValues } from '~/api/utils/promise.server';
import { getSampleRows } from '../dataSource/dataSource.service';
import { IDataSchemaWithEmbeddings } from '../dataSchema/interfaces/IDataSchemaWithEmbeddings';
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
		const ids = [] as Array<string>,
			metadatas = [] as Array<Record<string, string>>,
			documents = [] as Array<string>,
			embeddings = [] as Array<number>;
		const dataSchemasPromise = dataSchemas.map(async (dataSchema) => {
			const ds = Object.assign({}, dataSchema as IDataSchemaWithEmbeddings);
			const definitionEmbeddings = await getEmbeddings(dataSchema.definition);
			const sampleEmbeddings = await getEmbeddings(dataSchema.sample);
			ds.embeddings = {
				definition: definitionEmbeddings,
				sample: sampleEmbeddings,
			};
			return ds;
		});
		const dataSchemasData = fulfilledPromiseValues(await Promise.allSettled(dataSchemasPromise));
		for (const data of dataSchemasData) {
			// add embeddings for the schema 'sample' and 'definition' to chroma
			Object.keys(data.embeddings).forEach((key) => {
				ids.push(`${data.id}-${key}`);
				metadatas.push({ tableName: data.name, kind: data.kind });
				documents.push(data[key]);
				embeddings.push(data.embeddings[key] || []);
			});
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

export const queryDataSchemaEmbeddings = async (
	dataSource: DataSource,
	text: string,
	where?: Record<string, string>
) => {
	const collection = await client.getCollection({
		name: dataSource.name,
		embeddingFunction: getEmbeddingFunction(),
	});
  const whereProp = where ? { where } : {};
	const result = await collection.query({
		nResults: 3,
		queryTexts: [text],
    ...whereProp,
	});
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
