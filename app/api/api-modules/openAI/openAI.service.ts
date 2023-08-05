import OpenAI from 'openai';
import { getSelectedDataSource } from '../dataSource/dataSource.service';
import { CreateChatCompletionRequestMessage } from 'openai/resources/chat';

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
	const tableSchemas = selectedDataSource?.dataSchemas.filter(
		(dataSchema) => dataSchema.kind === 'TABLE'
	);
	const messages: Array<CreateChatCompletionRequestMessage> = tableSchemas.map((tableSchema) => {
		return {
			role: 'user',
			content: `This is the table Schema for ${tableSchema.name}: ${tableSchema.description}
      
      Take note of any joins that you may need to make in your SQL query.
      `,
		};
	});
	messages.push({
		role: 'user',
		content: `
      Use the previous table schemas as a reference in order to provide a POSTGRES query that will satisfy the user's request as best as possible. Make sure to check for any likely join tables where a table name includes two other table names. You can provide a brief explanation of the query if you would like. Do not make up an answer. If you do not know the answer, you can say "I couldn't generate a query to satisfy your request. Please try asking the question a different way or adding specific data in your request.".
      
      Present the POSTGRES query in the following format: 

      \`\`\`sql
        <POSTGRES Query>
      \`\`\`end

      The request from the user is: ${message}
    `,
	});
	return openAI.chat.completions.create({
		model: 'gpt-3.5-turbo-16k',
		messages,
		stream: true,
		n: 1,
	}, {
    maxRetries: 3,
  });
};
