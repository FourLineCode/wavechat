/*
  Warnings:

  - You are about to drop the `_joinedServers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_joinedServers" DROP CONSTRAINT "_joinedServers_A_fkey";

-- DropForeignKey
ALTER TABLE "_joinedServers" DROP CONSTRAINT "_joinedServers_B_fkey";

-- DropTable
DROP TABLE "_joinedServers";
