-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'ADVISOR', 'PROCTOR');

-- CreateEnum
CREATE TYPE "AssignmentStatus" AS ENUM ('NOTSEND', 'SEND', 'TURNINLATE', 'REJECT', 'APPROVE');

-- CreateEnum
CREATE TYPE "CommentAssignmentType" AS ENUM ('PRIVATE', 'PUBLIC');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "name" VARCHAR(50),
    "lastname" VARCHAR(50),
    "tel" VARCHAR(10),
    "role" "Role" NOT NULL DEFAULT 'STUDENT',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGroups" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "groupId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "join" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Announcements" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifyAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Announcements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignments" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueAt" TIMESTAMP(3) NOT NULL,
    "modifyAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignmentSubmit" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "groupId" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "status" "AssignmentStatus" NOT NULL DEFAULT 'NOTSEND',
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifyAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssignmentSubmit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignmentSubmitFiles" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "assignmentSubmitId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssignmentSubmitFiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignmentFiles" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "assignmentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssignmentFiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnnouncementFiles" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "announcementId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnnouncementFiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Groups" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "createBy" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "Groups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserGroups_groupId_key" ON "UserGroups"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGroups_studentId_key" ON "UserGroups"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "AssignmentSubmit_groupId_key" ON "AssignmentSubmit"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "Groups_createBy_key" ON "Groups"("createBy");

-- AddForeignKey
ALTER TABLE "UserGroups" ADD CONSTRAINT "UserGroups_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroups" ADD CONSTRAINT "UserGroups_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentSubmit" ADD CONSTRAINT "AssignmentSubmit_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentSubmit" ADD CONSTRAINT "AssignmentSubmit_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentSubmitFiles" ADD CONSTRAINT "AssignmentSubmitFiles_assignmentSubmitId_fkey" FOREIGN KEY ("assignmentSubmitId") REFERENCES "AssignmentSubmit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentFiles" ADD CONSTRAINT "AssignmentFiles_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnouncementFiles" ADD CONSTRAINT "AnnouncementFiles_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "Announcements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Groups" ADD CONSTRAINT "Groups_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
