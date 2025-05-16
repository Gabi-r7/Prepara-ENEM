/*
  Warnings:

  - You are about to drop the `Files` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `e_correta` on the `Alternativa` table. All the data in the column will be lost.
  - You are about to drop the column `imagem_auxiliar` on the `Alternativa` table. All the data in the column will be lost.
  - You are about to drop the column `letra` on the `Alternativa` table. All the data in the column will be lost.
  - You are about to drop the column `questoes_id` on the `Alternativa` table. All the data in the column will be lost.
  - You are about to drop the column `texto` on the `Alternativa` table. All the data in the column will be lost.
  - You are about to drop the column `imagem_auxiliar` on the `Questao` table. All the data in the column will be lost.
  - You are about to drop the column `pergunta` on the `Questao` table. All the data in the column will be lost.
  - You are about to drop the column `texto_auxiliar` on the `Questao` table. All the data in the column will be lost.
  - Added the required column `letter` to the `Alternativa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questao_id` to the `Alternativa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Alternativa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alternativesIntroduction` to the `Questao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `context` to the `Questao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correctAlternative` to the `Questao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discipline` to the `Questao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `index` to the `Questao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Questao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Questao` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Files";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "questao_id" INTEGER NOT NULL,
    CONSTRAINT "File_questao_id_fkey" FOREIGN KEY ("questao_id") REFERENCES "Questao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Alternativa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "letter" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "file" TEXT,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "questao_id" INTEGER NOT NULL,
    CONSTRAINT "Alternativa_questao_id_fkey" FOREIGN KEY ("questao_id") REFERENCES "Questao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Alternativa" ("id") SELECT "id" FROM "Alternativa";
DROP TABLE "Alternativa";
ALTER TABLE "new_Alternativa" RENAME TO "Alternativa";
CREATE TABLE "new_Questao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "discipline" TEXT NOT NULL,
    "language" TEXT,
    "year" INTEGER NOT NULL,
    "context" TEXT NOT NULL,
    "alternativesIntroduction" TEXT NOT NULL,
    "correctAlternative" TEXT NOT NULL,
    "ano_id" INTEGER NOT NULL,
    "respostas_id" INTEGER,
    CONSTRAINT "Questao_ano_id_fkey" FOREIGN KEY ("ano_id") REFERENCES "Ano" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Questao_respostas_id_fkey" FOREIGN KEY ("respostas_id") REFERENCES "Resposta" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Questao" ("ano_id", "id", "respostas_id") SELECT "ano_id", "id", "respostas_id" FROM "Questao";
DROP TABLE "Questao";
ALTER TABLE "new_Questao" RENAME TO "Questao";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
