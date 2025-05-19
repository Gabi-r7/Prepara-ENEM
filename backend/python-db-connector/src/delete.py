import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from db.connection import DatabaseConnection

def limpar_banco(db_path=None):
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
    for tabela in tabelas:
        db.execute_query(f"DELETE FROM {tabela}")
    db.disconnect()
    print("Banco limpo com sucesso!")

if __name__ == "__main__":
    limpar_banco()