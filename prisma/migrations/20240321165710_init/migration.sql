/*
  Warnings:

  - Added the required column `proctorId` to the `Announcements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Announcements" ADD COLUMN     "proctorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Announcements" ADD CONSTRAINT "Announcements_proctorId_fkey" FOREIGN KEY ("proctorId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
