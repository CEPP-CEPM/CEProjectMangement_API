/*
  Warnings:

  - Added the required column `score` to the `AssignmentGrade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AssignmentGrade" ADD COLUMN     "score" DOUBLE PRECISION NOT NULL;
