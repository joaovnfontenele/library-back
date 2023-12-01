/*
  Warnings:

  - Made the column `chapterId` on table `Paragraph` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paragraph" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chapterId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    CONSTRAINT "Paragraph_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Paragraph" ("chapterId", "content", "id", "order") SELECT "chapterId", "content", "id", "order" FROM "Paragraph";
DROP TABLE "Paragraph";
ALTER TABLE "new_Paragraph" RENAME TO "Paragraph";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
