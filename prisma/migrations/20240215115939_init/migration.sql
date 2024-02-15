/*
  Warnings:

  - Added the required column `tag` to the `Groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Groups" ADD COLUMN     "tag" TEXT NOT NULL;
