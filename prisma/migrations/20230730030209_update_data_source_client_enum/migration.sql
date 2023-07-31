/*
  Warnings:

  - You are about to drop the column `kind` on the `DataSource` table. All the data in the column will be lost.
  - Added the required column `client` to the `DataSource` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DataSourceClient" AS ENUM ('POSTGRES', 'MYSQL', 'SQLITE');

-- AlterTable
ALTER TABLE "DataSource" DROP COLUMN "kind",
ADD COLUMN     "client" "DataSourceClient" NOT NULL;

-- DropEnum
DROP TYPE "DataSourceKind";
