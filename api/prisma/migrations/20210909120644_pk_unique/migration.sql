/*
  Warnings:

  - A unique constraint covering the columns `[pk]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User.pk_unique" ON "User"("pk");
