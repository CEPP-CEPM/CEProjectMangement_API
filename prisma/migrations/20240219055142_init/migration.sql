/*
  Warnings:

  - You are about to drop the column `createAt` on the `AnnouncementFiles` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `AssignmentFiles` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CommentAssignmentType" AS ENUM ('PRIVATE', 'PUBLIC');

-- AlterTable
ALTER TABLE "AnnouncementFiles" DROP COLUMN "createAt";

-- AlterTable
ALTER TABLE "AssignmentFiles" DROP COLUMN "createAt";

-- CreateTable
CREATE TABLE "AssignmentSubmit" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "status" "AssignmentStatus" NOT NULL DEFAULT 'NOTSEND',
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifyAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssignmentSubmit_pkey" PRIMARY KEY ("id")
);
