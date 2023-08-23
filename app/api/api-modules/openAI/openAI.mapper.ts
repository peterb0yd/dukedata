import { CreateChatCompletionRequestMessage } from "openai/resources/chat";

export const contentToChatCompletionConfig = (content: string[] | string, stream: boolean = false) => {
	let messages = [];
	if (Array.isArray(content)) {
		content.map((cnt) => {
			messages.push({
				role: `user`,
				content: cnt,
			});
		});
	} else {
		messages.push({
			role: `user`,
			content,
		});
	}
	return {
		params: {
			model: 'gpt-3.5-turbo-16k',
			messages: messages as CreateChatCompletionRequestMessage[],
			n: 1,
      stream,
		},
		options: {
			maxRetries: 3,
		},
	};
};

export const userPromptToTableListPrompt = (definition: string, message: string) => {
	return `
    Given a database schema including all known tables belonging to the database, provide a list of tables will most likely be required to answer the user's question provided below. Do not include any other words in your response. 
    
    If it does not seem like they're asking for a specific data resource or if you are unsure which tables are relevant, provide the following JSON:
    { "unknown": true }
    
    Only provide a valid JSON result in this format where the array of tableNames are a list of valid table names from the database schema in this JSON:
    { "tables": ["tableA", "tableB", "etc"] }
    
    Here is the list of tables to choose from: ${definition}

    Here is the user's question: ${message}
  `;
};

export const databaseDefinitionToUnknownTablesResponse = (definition: string) => {
	const { tables } = JSON.parse(definition);
	const tableNames = tables.map((t: Record<'tableName', string>) => t.tableName).join(', ');
	return `I don't know how to formulate that into a SQL query. Try using specific table names in    your question. Here are the tables in the data source: 
    ${tableNames}`;
};

export const userPromptToSqlPrompt = (message: string) => {
	return `
  Use the previous context as a reference in order to provide a POSTGRES query that will satisfy the user's request as best as possible. Make sure to check for any likely join tables where a table name includes two other table names. You can provide a brief explanation of the query if you would like. Do not make up an answer. If you do not know the answer, you can say "I couldn't generate a query to satisfy your request. Please try asking the question a different way or adding specific data in your request.".
  
  Present the POSTGRES query in the following format: 

  \`\`\`sql
    <POSTGRES Query>
  \`\`\`end

  The request from the user is: ${message}
`;
};
