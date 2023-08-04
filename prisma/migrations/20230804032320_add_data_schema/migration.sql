-- CreateEnum
CREATE TYPE "DataSchemaKind" AS ENUM ('TABLE', 'DATABASE');

-- CreateTable
CREATE TABLE "DataSchema" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "kind" "DataSchemaKind" NOT NULL,
    "dataSourceId" INTEGER NOT NULL,

    CONSTRAINT "DataSchema_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DataSchema" ADD CONSTRAINT "DataSchema_dataSourceId_fkey" FOREIGN KEY ("dataSourceId") REFERENCES "DataSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
