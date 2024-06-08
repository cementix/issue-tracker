/*
  Warnings:

  - You are about to drop the column `Status` on the `Issue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "Status",
ADD COLUMN     "status" "IssueStatus" NOT NULL DEFAULT 'OPEN';
