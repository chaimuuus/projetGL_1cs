from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError

from config import DATABASE_URL

try:
    engine = create_engine(DATABASE_URL, echo=True)
    # Test the connection by executing a simple query
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
    print("Database connection successful!")
except OperationalError as e:
    print("Error connecting to the database:", e)
    raise  # Re-raise the exception to stop the application if the DB is inaccessible


Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    database = Session()
    try:
        yield database
    finally:
        database.close()