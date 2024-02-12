/*
  Warnings:

  - You are about to drop the `Score` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_studentId_fkey";

-- DropTable
DROP TABLE "Score";
