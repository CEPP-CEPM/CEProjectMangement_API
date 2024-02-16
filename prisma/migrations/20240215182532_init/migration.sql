-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'ADVISOR', 'PROCTOR');

-- CreateEnum
CREATE TYPE "AssignmentStatus" AS ENUM ('NOTSEND', 'SEND', 'TURNINLATE', 'REJECT', 'APPROVE');

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
    "userId" TEXT NOT NULL,
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
    "topic" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "Groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignmentGrade" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "score" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AssignmentGrade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserGroups_userId_key" ON "UserGroups"("userId");

-- AddForeignKey
ALTER TABLE "UserGroups" ADD CONSTRAINT "UserGroups_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroups" ADD CONSTRAINT "UserGroups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentFiles" ADD CONSTRAINT "AssignmentFiles_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnouncementFiles" ADD CONSTRAINT "AnnouncementFiles_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "Announcements"("id") ON DELETE CASCADE ON UPDATE CASCADE;
