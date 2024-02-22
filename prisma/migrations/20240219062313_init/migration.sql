-- CreateTable
CREATE TABLE "AssignmentSubmitFiles" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "assignmentSubmitId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssignmentSubmitFiles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AssignmentSubmitFiles" ADD CONSTRAINT "AssignmentSubmitFiles_assignmentSubmitId_fkey" FOREIGN KEY ("assignmentSubmitId") REFERENCES "AssignmentSubmit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
