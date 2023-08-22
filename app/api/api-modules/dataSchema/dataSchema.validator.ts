import { DataSchemaKind } from '@prisma/client';
import { z } from 'zod';

export const ZodDataSchemaCreate = z.object({
  name: z.string().min(1).max(255),
  definition: z.string().min(1).max(10000),
  sample: z.string().max(100000),
  dataSourceId: z.number().int().positive(),
  kind: z.nativeEnum(DataSchemaKind),
});