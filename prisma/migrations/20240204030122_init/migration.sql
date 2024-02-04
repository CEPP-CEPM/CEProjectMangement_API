-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'ADVISOR', 'PROCTOR');

-- CreateEnum
CREATE TYPE "AssignmentStatus" AS ENUM ('NOTSEND', 'SEND', 'TURNINLATE', 'REJECT_ADVISOR', 'APPROVE_ADVISOR', 'REJECT_PROCTOR', 'APPROVE_PROCTOR');

-- CreateEnum
CREATE TYPE "CommentAssignmentType" AS ENUM ('PRIVATE', 'PUBLIC');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "name" VARCHAR(50),
    "lastname" VARCHAR(50),
    "tel" VARCHAR(10),
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "register" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topics" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "tagId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGroups" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "groupId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupInvites" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "code" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "GroupInvites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Announcements" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "advisorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifyAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Announcements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnnouncementTag" (
    "tagId" TEXT NOT NULL,
    "announcementId" TEXT NOT NULL,

    CONSTRAINT "AnnouncementTag_pkey" PRIMARY KEY ("tagId","announcementId")
);

-- CreateTable
CREATE TABLE "Assignments" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "advisorId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignmentGroups" (
    "groupId" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,

    CONSTRAINT "AssignmentGroups_pkey" PRIMARY KEY ("groupId","assignmentId")
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
    "topicId" TEXT NOT NULL,

    CONSTRAINT "Groups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserGroups_userId_key" ON "UserGroups"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "GroupInvites_code_key" ON "GroupInvites"("code");

-- CreateIndex
CREATE UNIQUE INDEX "GroupInvites_groupId_key" ON "GroupInvites"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "AssignmentSubmit_groupId_key" ON "AssignmentSubmit"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "Groups_createBy_key" ON "Groups"("createBy");

-- CreateIndex
CREATE UNIQUE INDEX "Groups_topicId_key" ON "Groups"("topicId");

-- AddForeignKey
ALTER TABLE "Topics" ADD CONSTRAINT "Topics_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroups" ADD CONSTRAINT "UserGroups_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroups" ADD CONSTRAINT "UserGroups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupInvites" ADD CONSTRAINT "GroupInvites_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcements" ADD CONSTRAINT "Announcements_advisorId_fkey" FOREIGN KEY ("advisorId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnouncementTag" ADD CONSTRAINT "AnnouncementTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnouncementTag" ADD CONSTRAINT "AnnouncementTag_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "Announcements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "Assignments_advisorId_fkey" FOREIGN KEY ("advisorId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentGroups" ADD CONSTRAINT "AssignmentGroups_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentGroups" ADD CONSTRAINT "AssignmentGroups_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentSubmit" ADD CONSTRAINT "AssignmentSubmit_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentSubmit" ADD CONSTRAINT "AssignmentSubmit_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentSubmitFiles" ADD CONSTRAINT "AssignmentSubmitFiles_assignmentSubmitId_fkey" FOREIGN KEY ("assignmentSubmitId") REFERENCES "AssignmentSubmit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentFiles" ADD CONSTRAINT "AssignmentFiles_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnouncementFiles" ADD CONSTRAINT "AnnouncementFiles_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "Announcements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Groups" ADD CONSTRAINT "Groups_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Groups" ADD CONSTRAINT "Groups_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
