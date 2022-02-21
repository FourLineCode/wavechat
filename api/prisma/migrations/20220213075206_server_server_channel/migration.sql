/*
  Warnings:

  - Added the required column `serverId` to the `ServerChannel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServerChannel" ADD COLUMN     "serverId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ServerChannel" ADD CONSTRAINT "ServerChannel_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;
