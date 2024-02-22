/*
  Warnings:

  - Added the required column `assignmentId` to the `AssignmentSubmit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AssignmentSubmit" ADD COLUMN     "assignmentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AssignmentSubmit" ADD CONSTRAINT "AssignmentSubmit_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
