from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

# Access the environment variables
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:admin@host.docker.internal:5432/dzartisan")
