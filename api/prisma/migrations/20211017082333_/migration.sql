/*
  Warnings:

  - A unique constraint covering the columns `[fromUserId,toUserId]` on the table `FriendRequest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[firstUserId,secondUserId]` on the table `Friendship` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FriendRequest.fromUserId_toUserId_unique" ON "FriendRequest"("fromUserId", "toUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Friendship.firstUserId_secondUserId_unique" ON "Friendship"("firstUserId", "secondUserId");
