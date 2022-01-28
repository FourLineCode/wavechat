/*
  Warnings:

  - Added the required column `userAgent` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "userAgent" TEXT NOT NULL;
