-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientBusinessName" TEXT,
    "niche" TEXT NOT NULL,
    "platform" TEXT,
    "toneOfVoice" TEXT,
    "language" TEXT NOT NULL DEFAULT 'en',
    "brief" TEXT NOT NULL,
    "inputsJson" TEXT NOT NULL,
    "outputJson" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Project_type_idx" ON "Project"("type");

-- CreateIndex
CREATE INDEX "Project_clientName_idx" ON "Project"("clientName");

-- CreateIndex
CREATE INDEX "Project_createdAt_idx" ON "Project"("createdAt");
