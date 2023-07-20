-- CreateEnum
CREATE TYPE "MessageKind" AS ENUM ('USER', 'BOT');

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "body" TEXT NOT NULL,
    "kind" "MessageKind" NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
