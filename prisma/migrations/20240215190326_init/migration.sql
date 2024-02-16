/*
  Warnings:

  - Added the required column `studentId` to the `UserGroups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserGroups" ADD COLUMN     "studentId" TEXT NOT NULL;
