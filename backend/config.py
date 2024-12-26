from dotenv import load_dotenv
import os

# Use a raw string or escape the backslashes
load_dotenv(dotenv_path=r"C:\Users\User\OneDrive\Documents\.env")

# Access the environment variable
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:pass@localhost:5432/dbname")

# Print the value for debugging
print(f"DATABASE_URL: {DATABASE_URL}")