
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app.main import app # Replace with your app's entry module
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database.db import Base, get_db  # Adjust import paths

# Set up the test PostgreSQL database
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:admin@localhost:5432/test_database"
engine = create_engine(SQLALCHEMY_DATABASE_URL,echo=True)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="session", autouse=True)
def setup_database():
    # Create all tables before running tests
    Base.metadata.create_all(bind=engine)
    yield
    # Drop all tables after tests are done
    Base.metadata.drop_all(bind=engine)

@pytest.fixture
def db_session():
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()

@pytest.fixture
def client(db_session):
    def override_get_db():
        yield db_session
    app.dependency_overrides[get_db] = override_get_db
    return TestClient(app)