-- DropForeignKey
ALTER TABLE "AssignmentFiles" DROP CONSTRAINT "AssignmentFiles_assignmentId_fkey";

-- AddForeignKey
ALTER TABLE "AssignmentFiles" ADD CONSTRAINT "AssignmentFiles_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
