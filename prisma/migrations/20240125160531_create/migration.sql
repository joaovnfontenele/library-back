-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Site" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Status" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Book" (
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

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "nextChapter" TEXT NOT NULL,
    CONSTRAINT "Chapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Paragraph" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chapterId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    CONSTRAINT "Paragraph_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");
