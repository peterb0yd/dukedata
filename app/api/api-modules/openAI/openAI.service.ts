import OpenAI from 'openai';

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
	console.log('RUNNING OPENAI', message);
	const openAI = getOpenAI();
	return openAI.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'user',
				content: `
        Provide data to be stored in a markdown table. You must make up the data but have be a realistic example for the provided query from the user. Do not provide any text that is not part of the table data.

        Present the data in markdown format.

        The query from the user is: ${message}
      `,
			},
		],
		stream: true,
		n: 1,
	});
};
