/*
  Warnings:

  - You are about to drop the column `Questoes_id` on the `Alternativa` table. All the data in the column will be lost.
  - You are about to drop the column `Comentarios_Usuario_id` on the `Comentario` table. All the data in the column will be lost.
  - You are about to drop the column `Comentarios_id` on the `Comentario` table. All the data in the column will be lost.
  - You are about to drop the column `Usuario_id` on the `Comentario` table. All the data in the column will be lost.
  - You are about to drop the column `Respostas_id` on the `Questao` table. All the data in the column will be lost.
  - The primary key for the `Questoes_has_Disciplina` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Disciplina_id` on the `Questoes_has_Disciplina` table. All the data in the column will be lost.
  - You are about to drop the column `Questoes_Respostas_id` on the `Questoes_has_Disciplina` table. All the data in the column will be lost.
  - You are about to drop the column `Questoes_id` on the `Questoes_has_Disciplina` table. All the data in the column will be lost.
  - You are about to drop the column `Usuario_id` on the `Redacao` table. All the data in the column will be lost.
  - You are about to drop the column `Usuario_id` on the `Resposta` table. All the data in the column will be lost.
  - Added the required column `questoes_id` to the `Alternativa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questao_id` to the `Comentario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_id` to the `Comentario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `respostas_id` to the `Questao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disciplina_id` to the `Questoes_has_Disciplina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questoes_id` to the `Questoes_has_Disciplina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questoes_respostas_id` to the `Questoes_has_Disciplina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_id` to the `Redacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_id` to the `Resposta` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Alternativa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "letra" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "questoes_id" INTEGER NOT NULL,
    "imagem_auxiliar" TEXT,
    CONSTRAINT "Alternativa_questoes_id_fkey" FOREIGN KEY ("questoes_id") REFERENCES "Questao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Alternativa" ("id", "imagem_auxiliar", "letra", "texto") SELECT "id", "imagem_auxiliar", "letra", "texto" FROM "Alternativa";
DROP TABLE "Alternativa";
ALTER TABLE "new_Alternativa" RENAME TO "Alternativa";
CREATE TABLE "new_Comentario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "questao_id" INTEGER NOT NULL,
    "comentarios_id" INTEGER,
    "comentarios_Usuario_id" INTEGER,
    CONSTRAINT "Comentario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comentario_questao_id_fkey" FOREIGN KEY ("questao_id") REFERENCES "Questao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comentario" ("autor", "data", "descricao", "id") SELECT "autor", "data", "descricao", "id" FROM "Comentario";
DROP TABLE "Comentario";
ALTER TABLE "new_Comentario" RENAME TO "Comentario";
CREATE TABLE "new_Questao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "texto_auxiliar" TEXT,
    "pergunta" TEXT NOT NULL,
    "respostas_id" INTEGER NOT NULL,
    "imagem_auxiliar" TEXT,
    CONSTRAINT "Questao_respostas_id_fkey" FOREIGN KEY ("respostas_id") REFERENCES "Resposta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Questao" ("id", "imagem_auxiliar", "pergunta", "texto_auxiliar") SELECT "id", "imagem_auxiliar", "pergunta", "texto_auxiliar" FROM "Questao";
DROP TABLE "Questao";
ALTER TABLE "new_Questao" RENAME TO "Questao";
CREATE TABLE "new_Questoes_has_Disciplina" (
    "questoes_id" INTEGER NOT NULL,
    "questoes_respostas_id" INTEGER NOT NULL,
    "disciplina_id" INTEGER NOT NULL,

    PRIMARY KEY ("questoes_id", "disciplina_id"),
    CONSTRAINT "Questoes_has_Disciplina_questoes_id_fkey" FOREIGN KEY ("questoes_id") REFERENCES "Questao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Questoes_has_Disciplina_disciplina_id_fkey" FOREIGN KEY ("disciplina_id") REFERENCES "Disciplina" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
DROP TABLE "Questoes_has_Disciplina";
ALTER TABLE "new_Questoes_has_Disciplina" RENAME TO "Questoes_has_Disciplina";
CREATE TABLE "new_Redacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "competencia_1" INTEGER NOT NULL,
    "competencia_2" INTEGER NOT NULL,
    "competencia_3" INTEGER NOT NULL,
    "competencia_4" INTEGER NOT NULL,
    "competencia_5" INTEGER NOT NULL,
    "texto" TEXT NOT NULL,
    "tema" TEXT NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    CONSTRAINT "Redacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Redacao" ("competencia_1", "competencia_2", "competencia_3", "competencia_4", "competencia_5", "data", "id", "tema", "texto") SELECT "competencia_1", "competencia_2", "competencia_3", "competencia_4", "competencia_5", "data", "id", "tema", "texto" FROM "Redacao";
DROP TABLE "Redacao";
ALTER TABLE "new_Redacao" RENAME TO "Redacao";
CREATE TABLE "new_Resposta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "id_alternativa_correta" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    CONSTRAINT "Resposta_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Resposta" ("data", "id", "id_alternativa_correta") SELECT "data", "id", "id_alternativa_correta" FROM "Resposta";
DROP TABLE "Resposta";
ALTER TABLE "new_Resposta" RENAME TO "Resposta";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
