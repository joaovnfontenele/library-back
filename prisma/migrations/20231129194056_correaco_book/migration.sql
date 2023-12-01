/*
  Warnings:

  - Made the column `siteId` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bookId` on table `Chapter` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "siteId" TEXT NOT NULL,
    "statusId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    CONSTRAINT "Book_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("description", "id", "image", "siteId", "statusId", "title", "url") SELECT "description", "id", "image", "siteId", "statusId", "title", "url" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE TABLE "new_Chapter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "nextChapter" TEXT NOT NULL,
    CONSTRAINT "Chapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Chapter" ("bookId", "id", "nextChapter", "number", "title", "url") SELECT "bookId", "id", "nextChapter", "number", "title", "url" FROM "Chapter";
DROP TABLE "Chapter";
ALTER TABLE "new_Chapter" RENAME TO "Chapter";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
