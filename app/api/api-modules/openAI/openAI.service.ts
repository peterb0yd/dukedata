import OpenAI from 'openai';
import { getSelectedDataSource } from '../dataSource/dataSource.service';
import { CreateChatCompletionRequestMessage } from 'openai/resources/chat';
import { queryDataSchemaEmbeddings } from '../chroma/chroma.service';
import { DataSchemaKind } from '@prisma/client';
import DataSchemaModel from '../dataSchema/dataSchema.model';
import { fulfilledPromiseValues } from '~/api/utils/promise.server';

let openAIService: OpenAI;

const getOpenAI = () => {
	if (!openAIService) {
		openAIService = new OpenAI({
			// organization: process.env.OPENAI_API_ORG,
			apiKey: process.env.OPENAI_API_KEY,
		});
	}
	return openAIService;
};

export const getEmbeddings = async (text: string) => {
	const openAI = getOpenAI();
	console.log({ text });
	const result = await openAI.embeddings.create({
		input: text,
		model: 'text-embedding-ada-002',
	});
	console.log({ result });
	return result.data[0].embedding;
};

export const getSchemaDescription = async (tableSchema: string) => {
	console.log('RUNNING OPENAI');
	const openAI = getOpenAI();
	return openAI.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'user',
				content: `
      You are a database master. Please provide me with a description about the following database schema.

      ${tableSchema}
    `,
			},
		],
	});
};

export const getTableDescription = async (tableName: string) => {
	console.log('RUNNING OPENAI');
	const openAI = getOpenAI();
	return openAI.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'user',
				content: `
      You are a database master. Please provide me with a description about the following table.

      ${tableName}
    `,
			},
		],
	});
};

export const getBotResponse = async (message: string) => {
	const openAI = getOpenAI();
	const selectedDataSource = await getSelectedDataSource();
	if (!selectedDataSource) {
		return {
			error: 'No data source selected',
		};
	}
	const databaseSchema = selectedDataSource.dataSchemas.find(
		(dataSchema) => dataSchema.kind === DataSchemaKind.DATABASE
	);
	const tableListResult = await openAI.chat.completions.create(
		{
			model: 'gpt-3.5-turbo-16k',
			messages: [{
        role: `user`,
        content: `
          Given a database schema including all known tables belonging to the database, which tables will most likely be required to answer the user's question provided below. Do not include any natural language in your response. Only provide a valid JSON result in this format where the array of tableNames are a list of valid table names from the database schema:

          ["tableA", "tableB", "etc"]
          }

          Here are the database schema: ${databaseSchema?.description}

          Here is the user's question: ${message}
        `,
      }],
			n: 1,
		},
		{
			maxRetries: 3,
		}
	);
  const likelyTables = JSON.parse(tableListResult.choices[0].message.content as string);
  const tableSchemaPromises = likelyTables.map((tableName: string) => {
    return DataSchemaModel.findByTableName(tableName);
  })
  const tableSchemas = fulfilledPromiseValues(
    await Promise.allSettled(tableSchemaPromises)
  );
  console.log({tableSchemas});
  return;
	// const results = await queryDataSchemaEmbeddings(selectedDataSource, message);
	// const messages = [];
	// for (let result of results) {
	// 	console.log(JSON.stringify(result, null, 2));
	// }
	// return 'TESTING';
	// // const messages: Array<CreateChatCompletionRequestMessage> = results.map((embeddings: any) => {
	// // 	return {
	// // 		role: 'user',
	// // 		content: `Context: ${JSON.stringify(embeddings.metadata)} ${embeddings.document} `,
	// // 	};
	// // });
	// messages.push({
	// 	role: 'user',
	// 	content: `
  //     Use the previous context as a reference in order to provide a POSTGRES query that will satisfy the user's request as best as possible. Make sure to check for any likely join tables where a table name includes two other table names. You can provide a brief explanation of the query if you would like. Do not make up an answer. If you do not know the answer, you can say "I couldn't generate a query to satisfy your request. Please try asking the question a different way or adding specific data in your request.".
      
  //     Present the POSTGRES query in the following format: 

  //     \`\`\`sql
  //       <POSTGRES Query>
  //     \`\`\`end

  //     The request from the user is: ${message}
  //   `,
	// });
	// console.log({ messages });
	// return openAI.chat.completions.create(
	// 	{
	// 		model: 'gpt-3.5-turbo-16k',
	// 		messages,
	// 		stream: true,
	// 		n: 1,
	// 	},
	// 	{
	// 		maxRetries: 3,
	// 	}
	// );
};
