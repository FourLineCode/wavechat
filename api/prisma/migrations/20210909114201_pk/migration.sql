-- AlterTable
ALTER TABLE "FriendRequest" ADD COLUMN     "pk" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Friendship" ADD COLUMN     "pk" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "pk" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pk" SERIAL NOT NULL;
