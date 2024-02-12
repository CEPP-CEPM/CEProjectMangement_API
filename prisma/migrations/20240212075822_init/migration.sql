/*
  Warnings:

  - You are about to drop the column `advisorId` on the `Assignments` table. All the data in the column will be lost.
  - You are about to drop the `AssignmentGroups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AssignmentSubmit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AssignmentSubmitFiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AssignmentGroups" DROP CONSTRAINT "AssignmentGroups_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "AssignmentGroups" DROP CONSTRAINT "AssignmentGroups_groupId_fkey";

-- DropForeignKey
ALTER TABLE "AssignmentSubmit" DROP CONSTRAINT "AssignmentSubmit_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "AssignmentSubmit" DROP CONSTRAINT "AssignmentSubmit_groupId_fkey";

-- DropForeignKey
ALTER TABLE "AssignmentSubmitFiles" DROP CONSTRAINT "AssignmentSubmitFiles_assignmentSubmitId_fkey";

-- DropForeignKey
ALTER TABLE "Assignments" DROP CONSTRAINT "Assignments_advisorId_fkey";

-- AlterTable
ALTER TABLE "Assignments" DROP COLUMN "advisorId";

-- DropTable
DROP TABLE "AssignmentGroups";

-- DropTable
DROP TABLE "AssignmentSubmit";

-- DropTable
DROP TABLE "AssignmentSubmitFiles";

-- CreateTable
CREATE TABLE "Score" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "score" INTEGER NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
