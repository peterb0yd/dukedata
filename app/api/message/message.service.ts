import db from '~/api/db';
import { IMessage } from './interfaces/IMessage';
import { createMessageToMessageDto } from './message.mapper';

export const createMessage = async (messageData: IMessage) => {
  const message = await db.message.create({
		data: createMessageToMessageDto(messageData),
	});
  return message;
}

export const getMessages = async () => {
  const messages = await db.message.findMany();
  return messages;
}