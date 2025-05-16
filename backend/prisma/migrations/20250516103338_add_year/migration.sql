/*
  Warnings:

  - You are about to drop the column `questoes_respostas_id` on the `Questoes_has_Disciplina` table. All the data in the column will be lost.
  - You are about to drop the column `id_alternativa_correta` on the `Resposta` table. All the data in the column will be lost.
  - Added the required column `ano_id` to the `Questao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_alternativa_marcada` to the `Resposta` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Ano" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ano" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Files" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_path" TEXT NOT NULL,
    "question_id" INTEGER NOT NULL,
    CONSTRAINT "Files_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Questao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Alternativa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "letra" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "questoes_id" INTEGER NOT NULL,
    "imagem_auxiliar" TEXT,
    "e_correta" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Alternativa_questoes_id_fkey" FOREIGN KEY ("questoes_id") REFERENCES "Questao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Alternativa" ("id", "imagem_auxiliar", "letra", "questoes_id", "texto") SELECT "id", "imagem_auxiliar", "letra", "questoes_id", "texto" FROM "Alternativa";
DROP TABLE "Alternativa";
ALTER TABLE "new_Alternativa" RENAME TO "Alternativa";
CREATE TABLE "new_Questao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "texto_auxiliar" TEXT,
    "pergunta" TEXT NOT NULL,
    "respostas_id" INTEGER,
    "imagem_auxiliar" TEXT,
    "ano_id" INTEGER NOT NULL,
    CONSTRAINT "Questao_respostas_id_fkey" FOREIGN KEY ("respostas_id") REFERENCES "Resposta" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Questao_ano_id_fkey" FOREIGN KEY ("ano_id") REFERENCES "Ano" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Questao" ("id", "imagem_auxiliar", "pergunta", "respostas_id", "texto_auxiliar") SELECT "id", "imagem_auxiliar", "pergunta", "respostas_id", "texto_auxiliar" FROM "Questao";
DROP TABLE "Questao";
ALTER TABLE "new_Questao" RENAME TO "Questao";
CREATE TABLE "new_Questoes_has_Disciplina" (
    "questoes_id" INTEGER NOT NULL,
    "disciplina_id" INTEGER NOT NULL,

    PRIMARY KEY ("questoes_id", "disciplina_id"),
    CONSTRAINT "Questoes_has_Disciplina_questoes_id_fkey" FOREIGN KEY ("questoes_id") REFERENCES "Questao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Questoes_has_Disciplina_disciplina_id_fkey" FOREIGN KEY ("disciplina_id") REFERENCES "Disciplina" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Questoes_has_Disciplina" ("disciplina_id", "questoes_id") SELECT "disciplina_id", "questoes_id" FROM "Questoes_has_Disciplina";
DROP TABLE "Questoes_has_Disciplina";
ALTER TABLE "new_Questoes_has_Disciplina" RENAME TO "Questoes_has_Disciplina";
CREATE TABLE "new_Resposta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "id_alternativa_marcada" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    CONSTRAINT "Resposta_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Resposta" ("data", "id", "usuario_id") SELECT "data", "id", "usuario_id" FROM "Resposta";
DROP TABLE "Resposta";
ALTER TABLE "new_Resposta" RENAME TO "Resposta";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
