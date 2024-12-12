from pydantic import BaseModel, EmailStr

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

