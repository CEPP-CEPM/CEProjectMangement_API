/*
  Warnings:

  - A unique constraint covering the columns `[groupId]` on the table `AssignmentSubmit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `groupId` to the `AssignmentSubmit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AssignmentSubmit" ADD COLUMN     "groupId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AssignmentSubmit_groupId_key" ON "AssignmentSubmit"("groupId");

-- AddForeignKey
ALTER TABLE "AssignmentSubmit" ADD CONSTRAINT "AssignmentSubmit_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
