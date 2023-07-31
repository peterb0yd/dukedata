import { MessageKind } from '@prisma/client';
import { z } from 'zod';

export const ZMessageCreateSchema = z.object({
  body: z.string().min(1),
  kind: z.nativeEnum(MessageKind),
});