/*
  Warnings:

  - You are about to drop the column `Rrole` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Rrole",
ADD COLUMN     "roles" "Role"[] DEFAULT ARRAY['USER']::"Role"[];
