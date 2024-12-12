from sqlalchemy.orm import Session
from sqlalchemy import text

def get_artisans(db:Session):
    result = db.execute(text("SELECT * FROM artisans")).fetchall()
    artisans_list = [row._mapping for row in result ] 
    
    return artisans_list