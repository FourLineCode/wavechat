/*
  Warnings:

  - You are about to drop the column `userId` on the `ServerInvite` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fromUserId,toUserId,serverId]` on the table `ServerInvite` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fromUserId` to the `ServerInvite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toUserId` to the `ServerInvite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ServerInvite" DROP CONSTRAINT "ServerInvite_userId_fkey";

-- DropIndex
DROP INDEX "ServerInvite_userId_serverId_key";

-- AlterTable
ALTER TABLE "ServerInvite" DROP COLUMN "userId",
ADD COLUMN     "fromUserId" TEXT NOT NULL,
ADD COLUMN     "toUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ServerInvite_fromUserId_toUserId_serverId_key" ON "ServerInvite"("fromUserId", "toUserId", "serverId");

-- AddForeignKey
ALTER TABLE "ServerInvite" ADD CONSTRAINT "ServerInvite_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServerInvite" ADD CONSTRAINT "ServerInvite_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
