import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from db.connection import DatabaseConnection

def reset_db(db_path=None):
    if db_path is None:
        db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../prisma/dev.db'))
    db = DatabaseConnection(db_path)
    db.connect()
    tabelas = [
        "Files",
        "Alternativa",
        "Questoes_has_Disciplina",
        "Comentario",
        "Resposta",
        "Redacao",
        "Questao",
        "Disciplina",
        "Usuario",
        "Ano"
    ]
    db.execute_query("PRAGMA foreign_keys = OFF")
    for tabela in tabelas:
        db.execute_query(f"DELETE FROM {tabela}")
        db.execute_query(f"DELETE FROM sqlite_sequence WHERE name='{tabela}'")
    db.execute_query("PRAGMA foreign_keys = ON")
    db.disconnect()
    print("Banco resetado com sucesso!")

if __name__ == "__main__":
    reset_db()