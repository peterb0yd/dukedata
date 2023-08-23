import OpenAI from 'openai';
import { getSelectedDataSource } from '../dataSource/dataSource.service';
import { CompletionCreateParams, CreateChatCompletionRequestMessage } from 'openai/resources/chat';
import { queryDataSchemaEmbeddings } from '../chroma/chroma.service';
import { DataSchemaKind } from '@prisma/client';
import DataSchemaModel from '../dataSchema/dataSchema.model';
import { fulfilledPromiseValues } from '~/api/utils/promise.server';
import { userPromptToTableListPrompt, databaseDefinitionToUnknownTablesResponse, contentToChatCompletionConfig, userPromptToSqlPrompt } from './openAI.mapper';

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
		return 'No data source selected';
	}
	const databaseSchema = selectedDataSource.dataSchemas.find(
		(dataSchema) => dataSchema.kind === DataSchemaKind.DATABASE
	);
	if (!databaseSchema) {
		return 'No database schema for selected data source';
	}

  // Get tables required for SQL response
	const tablePromptContent = userPromptToTableListPrompt(databaseSchema.definition, message);
  const tablePromptConfig = contentToChatCompletionConfig(tablePromptContent)
	const tableListResult = await openAI.chat.completions.create(
    tablePromptConfig.params as CompletionCreateParams.CreateChatCompletionRequestNonStreaming,
    tablePromptConfig.options,
	);
	const result = JSON.parse(tableListResult.choices[0].message.content as string);

	// Check if bot wasn't able to formulate a response
	if (result.unknown || !result.tables) {
		return databaseDefinitionToUnknownTablesResponse(databaseSchema.definition);
	}

	const tableSchemaPromises = result.tables.map((tableName: string) => {
		return queryDataSchemaEmbeddings(selectedDataSource, message, { tableName });
	});
	const documentsResults = fulfilledPromiseValues(await Promise.allSettled(tableSchemaPromises));
	const sqlPromptContent = documentsResults.flat();
  sqlPromptContent.push(userPromptToSqlPrompt(message));
  const sqlPromptConfig = contentToChatCompletionConfig(sqlPromptContent, true);
	return openAI.chat.completions.create(
    sqlPromptConfig.params as CompletionCreateParams.CreateChatCompletionRequestStreaming,
    sqlPromptConfig.options
	);
};
