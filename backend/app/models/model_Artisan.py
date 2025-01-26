from pydantic import BaseModel, EmailStr , validator
from datetime import date
from typing import Optional


class Artisan_Signup(BaseModel):
    full_name: str
    phone_number: str
    email: EmailStr
    password: str
    localisation: str
    
class Artisan_login(BaseModel):
    email: EmailStr
    password: str
    
    
class ArtisanResponse(BaseModel):
    id_rqdevis: int
    prix: int
    delai_estime: Optional[int] = None
    service_details: Optional[str] = None
    remarques: Optional[str] = None
    
class RequestedDevisResponseartisan(BaseModel):
    id_rqdevis: int
    service_demande: str
    id_user:int
    description: str
    budget_prevu: int
    date_souhaite: date
    illustrations: str
    request_date: date
    location_user: str
    statut_demande: str
    urgence: bool


class RespondedDevisResponse(BaseModel):
    id_rpdevis: int
    id_rqdevis: int
    artisan_id: int
    prix: int
    delai_estime: Optional[int] = None
    service_details: Optional[str] = None
    response_date: str
    remarques: Optional[str] = None
    id_user: int
    
    @validator("response_date", pre=True)
    def format_response_date(cls, v):
        if isinstance(v, date):
            return v.strftime("%Y-%m-%d")  # Format de date souhaité
        return v