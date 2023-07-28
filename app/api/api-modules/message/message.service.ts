import db from '~/api/db';
import { IMessageCreate } from './interfaces/IMessageCreate';
import { createMessageToMessageDto } from './message.mapper';
import { Message } from '@prisma/client';

export const createMessage = async (messageData: IMessageCreate) => {
  const message = await db.message.create({
		data: createMessageToMessageDto(messageData),
	});
  return message;
}

export const getMessages = async () => {
  const messages = await db.message.findMany();
  return messages as Message[];
}