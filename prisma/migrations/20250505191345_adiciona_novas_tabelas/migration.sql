/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "experiencia" REAL DEFAULT 0,
    "imagem_perfil" TEXT NOT NULL DEFAULT '/frontend/public/defaultProfileImage.jpg',
    "disciplina_favorita" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Redacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "competencia_1" INTEGER NOT NULL,
    "competencia_2" INTEGER NOT NULL,
    "competencia_3" INTEGER NOT NULL,
    "competencia_4" INTEGER NOT NULL,
    "competencia_5" INTEGER NOT NULL,
    "texto" TEXT NOT NULL,
    "tema" TEXT NOT NULL,
    "Usuario_id" INTEGER NOT NULL,
    CONSTRAINT "Redacao_Usuario_id_fkey" FOREIGN KEY ("Usuario_id") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Resposta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "id_alternativa_correta" INTEGER NOT NULL,
    "Usuario_id" INTEGER NOT NULL,
    CONSTRAINT "Resposta_Usuario_id_fkey" FOREIGN KEY ("Usuario_id") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Questao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "texto_auxiliar" TEXT,
    "pergunta" TEXT NOT NULL,
    "Respostas_id" INTEGER NOT NULL,
    "imagem_auxiliar" TEXT,
    CONSTRAINT "Questao_Respostas_id_fkey" FOREIGN KEY ("Respostas_id") REFERENCES "Resposta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "Usuario_id" INTEGER NOT NULL,
    "Comentarios_id" INTEGER,
    "Comentarios_Usuario_id" INTEGER,
    CONSTRAINT "Comentario_Usuario_id_fkey" FOREIGN KEY ("Usuario_id") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Disciplina" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Questoes_has_Disciplina" (
    "Questoes_id" INTEGER NOT NULL,
    "Questoes_Respostas_id" INTEGER NOT NULL,
    "Disciplina_id" INTEGER NOT NULL,

    PRIMARY KEY ("Questoes_id", "Disciplina_id"),
    CONSTRAINT "Questoes_has_Disciplina_Questoes_id_fkey" FOREIGN KEY ("Questoes_id") REFERENCES "Questao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Questoes_has_Disciplina_Disciplina_id_fkey" FOREIGN KEY ("Disciplina_id") REFERENCES "Disciplina" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Alternativa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "letra" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "Questoes_id" INTEGER NOT NULL,
    CONSTRAINT "Alternativa_Questoes_id_fkey" FOREIGN KEY ("Questoes_id") REFERENCES "Questao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_login_key" ON "Usuario"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
