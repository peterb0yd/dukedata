import { Prisma } from '@prisma/client';
import { IMessageCreate } from './interfaces/IMessageCreate';
import moment from 'moment';

export const createMessageToMessageDto = (message: IMessageCreate) => {
	return Prisma.validator<Prisma.MessageCreateInput>()({
		body: message.body.trim(),
		kind: message.kind,
	});
};
