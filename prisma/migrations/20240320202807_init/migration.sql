/*
  Warnings:

  - Added the required column `originalName` to the `AnnouncementFiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnnouncementFiles" ADD COLUMN     "originalName" TEXT NOT NULL;
