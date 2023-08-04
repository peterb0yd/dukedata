import { DataSourceClient } from '@prisma/client';
import { z } from 'zod';

export const ZodDataSourceCreate = z.object({
  name: z.string().min(1).max(255),
  url: z.string().min(8).max(255),
  client: z.nativeEnum(DataSourceClient),
});