import { DataSchemaKind } from '@prisma/client';
import { z } from 'zod';

export const ZodDataSchemaCreate = z.object({
  name: z.string().min(1).max(255),
  schema: z.string().min(1).max(100000),
  samples: z.string().min(1).max(100000),
  dataSourceId: z.number().int().positive(),
  kind: z.nativeEnum(DataSchemaKind),
});