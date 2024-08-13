-- CreateTable
CREATE TABLE "Options" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "questionnaireId" TEXT NOT NULL,

    CONSTRAINT "Options_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Options" ADD CONSTRAINT "Options_questionnaireId_fkey" FOREIGN KEY ("questionnaireId") REFERENCES "Questionnaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
