/*
  Warnings:

  - You are about to drop the column `type_chat` on the `User` table. All the data in the column will be lost.
  - Added the required column `botId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "type_chat",
ADD COLUMN     "botId" INTEGER NOT NULL;
