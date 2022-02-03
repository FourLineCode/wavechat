/*
  Warnings:

  - A unique constraint covering the columns `[userId,serverId]` on the table `ServerInvite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ServerInvite_userId_serverId_key" ON "ServerInvite"("userId", "serverId");
