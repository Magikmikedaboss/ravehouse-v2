-- CreateTable
CREATE TABLE "RateLimit" (
    "ip" TEXT NOT NULL PRIMARY KEY,
    "count" INTEGER NOT NULL,
    "resetTime" BIGINT NOT NULL
);
