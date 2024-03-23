/*
  Warnings:

  - Added the required column `originalName` to the `AssignmentFiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AssignmentFiles" ADD COLUMN     "originalName" TEXT NOT NULL;
