/*
  Warnings:

  - You are about to drop the column `description` on the `DataSchema` table. All the data in the column will be lost.
  - Added the required column `definition` to the `DataSchema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sample` to the `DataSchema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DataSchema" DROP COLUMN "description",
ADD COLUMN     "definition" TEXT NOT NULL,
ADD COLUMN     "sample" TEXT NOT NULL;
