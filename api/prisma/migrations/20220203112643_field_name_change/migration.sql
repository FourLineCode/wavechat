/*
  Warnings:

  - You are about to drop the column `admins` on the `Server` table. All the data in the column will be lost.
  - You are about to drop the column `bannedUsers` on the `Server` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Server" DROP COLUMN "admins",
DROP COLUMN "bannedUsers",
ADD COLUMN     "adminUserIds" TEXT[],
ADD COLUMN     "bannedUserIds" TEXT[];
