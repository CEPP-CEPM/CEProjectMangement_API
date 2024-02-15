/*
  Warnings:

  - You are about to drop the column `createBy` on the `Groups` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Groups" DROP CONSTRAINT "Groups_createBy_fkey";

-- DropIndex
DROP INDEX "Groups_createBy_key";

-- AlterTable
ALTER TABLE "Groups" DROP COLUMN "createBy";
