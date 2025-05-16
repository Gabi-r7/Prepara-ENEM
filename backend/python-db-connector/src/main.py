import sys
import os
import requests
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from db.connection import DatabaseConnection

def insert_question(data, db_path=None):
    if db_path is None:
        db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../prisma/dev.db'))
    db = DatabaseConnection(db_path)
    db.connect()

    # 0. Inserir Ano (se não existir)
    ano_valor = str(data.get("year"))
    ano = db.fetch_one("SELECT id FROM Ano WHERE ano = ?", (ano_valor,))
    if ano:
        ano_id = ano[0]
    else:
        db.execute_query("INSERT INTO Ano (ano) VALUES (?)", (ano_valor,))
        ano_id = db.execute_query("SELECT last_insert_rowid()").fetchone()[0]

    # 1. Inserir Questao (agora com todos os campos do novo schema)
    db.execute_query(
        """
        INSERT INTO Questao (
            title, 
            "index", 
            discipline, 
            language, 
            year, 
            context, 
            alternativesIntroduction, 
            correctAlternative, 
            ano_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            data.get("title"),
            data.get("index"),
            data.get("discipline"),
            data.get("language"),
            data.get("year"),
            data.get("context"),
            data.get("alternativesIntroduction"),
            data.get("correctAlternative"),
            ano_id
        )
    )
    questao_id = db.execute_query("SELECT last_insert_rowid()").fetchone()[0]

    # 2. Inserir Disciplina (se não existir)
    disciplina_nome = data.get("discipline")
    disciplina = db.fetch_one("SELECT id FROM Disciplina WHERE nome = ?", (disciplina_nome,))
    if disciplina:
        disciplina_id = disciplina[0]
    else:
        db.execute_query("INSERT INTO Disciplina (nome) VALUES (?)", (disciplina_nome,))
        disciplina_id = db.execute_query("SELECT last_insert_rowid()").fetchone()[0]

    # 3. Relacionar Questao e Disciplina
    db.execute_query(
        "INSERT INTO Questoes_has_Disciplina (questoes_id, disciplina_id) VALUES (?, ?)",
        (questao_id, disciplina_id)
    )

    # 4. Inserir arquivos (File)
    for file_url in data.get("files", []):
        db.execute_query(
            "INSERT INTO File (url, questao_id) VALUES (?, ?)",
            (file_url, questao_id)
        )

    # 5. Inserir alternativas
    for alt in data.get("alternatives", []):
        db.execute_query(
            "INSERT INTO Alternativa (letter, text, file, isCorrect, questao_id) VALUES (?, ?, ?, ?, ?)",
            (
                alt["letter"],
                alt["text"],
                alt.get("file"),
                int(alt.get("isCorrect", False)),  # SQLite espera 0/1 para boolean
                questao_id
            )
        )

    db.disconnect()
    print(f"Questão '{data.get('title')}' inserida com sucesso!")

if __name__ == "__main__":
    # Buscar e inserir as 10 primeiras questões de 2009 da API
    for i in range(1, 11):
        url = f"https://api.enem.dev/v1/exams/2009/questions/{i}"
        response = requests.get(url)
        if response.status_code == 200:
            question_data = response.json()
            insert_question(question_data)
        else:
            print(f"Erro ao buscar questão {i}: {response.status_code}")