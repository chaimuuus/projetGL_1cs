from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

# Access the environment variables
DATABASE_URL = "postgresql://postgres:pass@localhost:5432/dzartisan"
DATABASE_URL = os.getenv("DATABASE_URL")