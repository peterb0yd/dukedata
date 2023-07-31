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
	});;
};

export const getBotResponse = async (message: string) => {
	console.log('RUNNING OPENAI', message);
	const openAI = getOpenAI();
	return openAI.chat.completions.create({
		model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: message }],
		stream: true,
    n: 1,
	});
};
