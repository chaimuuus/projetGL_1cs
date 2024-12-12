from sqlalchemy.orm import Session
from fastapi import APIRouter,Depends
from ..crud.crud import get_artisans
from ..database.db import get_db
router = APIRouter()

@router.get("/artisans")
def get_artisan(db :Session = Depends(get_db)):
   return get_artisans(db)
