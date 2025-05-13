-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "experiencia" REAL DEFAULT 0,
    "imagem_perfil" TEXT NOT NULL DEFAULT '/frontend/public/defaultProfileImage.jpg',
    "imagem_fundo_perfil" TEXT NOT NULL DEFAULT '/frontend/public/profile/background/defaultProfileImage.jpg',
    "disciplina_favorita" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Usuario" ("created_at", "disciplina_favorita", "email", "experiencia", "id", "imagem_perfil", "login", "senha", "updated_at") SELECT "created_at", "disciplina_favorita", "email", "experiencia", "id", "imagem_perfil", "login", "senha", "updated_at" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_login_key" ON "Usuario"("login");
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
