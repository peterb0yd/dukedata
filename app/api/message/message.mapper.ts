import { Prisma } from '@prisma/client';
import { IMessage } from './interfaces/IMessage';
import moment from 'moment';

export const createMessageToMessageDto = (message: IMessage) => {
	return Prisma.validator<Prisma.MessageCreateInput>()({
		body: message.body,
		kind: message.kind,
		sentAt: moment(message.sentAt).toISOString(),
	});
};
