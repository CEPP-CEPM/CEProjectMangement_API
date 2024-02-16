/*
  Warnings:

  - You are about to drop the column `userId` on the `UserGroups` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `UserGroups` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UserGroups" DROP CONSTRAINT "UserGroups_userId_fkey";

-- DropIndex
DROP INDEX "UserGroups_userId_key";

-- AlterTable
ALTER TABLE "UserGroups" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "UserGroups_studentId_key" ON "UserGroups"("studentId");

-- AddForeignKey
ALTER TABLE "UserGroups" ADD CONSTRAINT "UserGroups_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
