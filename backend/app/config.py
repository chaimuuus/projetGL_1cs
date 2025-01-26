


from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgresql:v8obAgL4NKPRe2AKBiXElzUSc0mK82oV@dpg-cuai3chopnds73ed3ubg-a.oregon-postgres.render.com/dzartisan")

API_KEY = os.getenv("API_KEY")
API_SECRET = os.getenv("API_SECRET")
CLOUD_NAME = os.getenv("CLOUD_NAME")