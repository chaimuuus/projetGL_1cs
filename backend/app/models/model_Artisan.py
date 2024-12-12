from pydantic import BaseModel, EmailStr


class Artisan_Signup(BaseModel):
    full_name: str
    phone_number: str
    email: EmailStr
    password: str
    localisation: str
    
class Artisan_login(BaseModel):
    email: EmailStr
    password: str