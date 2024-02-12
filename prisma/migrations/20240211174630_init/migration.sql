/*
  Warnings:

  - The values [REJECT_ADVISOR,APPROVE_ADVISOR,REJECT_PROCTOR,APPROVE_PROCTOR] on the enum `AssignmentStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `advisorId` on the `Announcements` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `Topics` table. All the data in the column will be lost.
  - You are about to drop the column `register` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `AnnouncementTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AssignmentStatus_new" AS ENUM ('NOTSEND', 'SEND', 'TURNINLATE', 'REJECT', 'APPROVE');
ALTER TABLE "AssignmentSubmit" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "AssignmentSubmit" ALTER COLUMN "status" TYPE "AssignmentStatus_new" USING ("status"::text::"AssignmentStatus_new");
ALTER TYPE "AssignmentStatus" RENAME TO "AssignmentStatus_old";
ALTER TYPE "AssignmentStatus_new" RENAME TO "AssignmentStatus";
DROP TYPE "AssignmentStatus_old";
ALTER TABLE "AssignmentSubmit" ALTER COLUMN "status" SET DEFAULT 'NOTSEND';
COMMIT;

-- DropForeignKey
ALTER TABLE "AnnouncementTag" DROP CONSTRAINT "AnnouncementTag_announcementId_fkey";

-- DropForeignKey
ALTER TABLE "AnnouncementTag" DROP CONSTRAINT "AnnouncementTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "Announcements" DROP CONSTRAINT "Announcements_advisorId_fkey";

-- DropForeignKey
ALTER TABLE "Topics" DROP CONSTRAINT "Topics_tagId_fkey";

-- AlterTable
ALTER TABLE "Announcements" DROP COLUMN "advisorId";

-- AlterTable
ALTER TABLE "Topics" DROP COLUMN "tagId";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "register";

-- DropTable
DROP TABLE "AnnouncementTag";

-- DropTable
DROP TABLE "Tags";

-- DropEnum
DROP TYPE "CommentAssignmentType";
