from pydantic import BaseModel, EmailStr ,validator
from datetime import date
from typing import Optional


class User_signup(BaseModel):
    user_name: str
    email: EmailStr
    password: str
    phone_number: str
    image_file: str = None
    address: str
    notif_activée: bool = False
    langue_préférée: str = "En"
    
class User_login(BaseModel):
    email: EmailStr
    password: str
    
    
class RequestedDevisCreate(BaseModel):
    service_demande: str
    artisan_id: int
    description: Optional[str] = None
    budget_prevu: Optional[int] = None
    date_souhaite: Optional[date] = None
    illustrations: Optional[str] = None
    location_user: str
    urgence: bool = False
    
    
class RequestedDevisResponse(BaseModel):
    id_rqdevis: int
    service_demande: str
    artisan_id: int
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
    id_rqdevis: Optional[int]
    artisan_id: Optional[int]
    prix: int
    delai_estime: Optional[int]
    service_details: Optional[str]
    response_date: date
    remarques: Optional[str]
    id_user: int