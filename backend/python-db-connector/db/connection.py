class DatabaseConnection:
    def __init__(self, database_url):
        self.database_url = database_url
        self.connection = None

    def connect(self):
        import sqlite3  # Change this import based on your database
        self.connection = sqlite3.connect(self.database_url)
        print("Database connection established.")

    def disconnect(self):
        if self.connection:
            self.connection.close()
            print("Database connection closed.")

    def execute_query(self, query, params=None):
        cursor = self.connection.cursor()
        cursor.execute(query, params or ())
        self.connection.commit()
        return cursor

    def fetch_all(self, query, params=None):
        cursor = self.execute_query(query, params)
        return cursor.fetchall()

    def fetch_one(self, query, params=None):
        cursor = self.execute_query(query, params)
        return cursor.fetchone()