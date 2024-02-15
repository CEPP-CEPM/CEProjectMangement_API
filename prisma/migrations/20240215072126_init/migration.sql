/*
  Warnings:

  - You are about to drop the column `topicId` on the `Groups` table. All the data in the column will be lost.
  - You are about to drop the `GroupInvites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Topics` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `topic` to the `Groups` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GroupInvites" DROP CONSTRAINT "GroupInvites_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Groups" DROP CONSTRAINT "Groups_topicId_fkey";

-- DropIndex
DROP INDEX "Groups_topicId_key";

-- AlterTable
ALTER TABLE "Groups" DROP COLUMN "topicId",
ADD COLUMN     "topic" TEXT NOT NULL;

-- DropTable
DROP TABLE "GroupInvites";

-- DropTable
DROP TABLE "Topics";
