from pydantic import BaseModel, EmailStr


class Edit_form_artisan(BaseModel):
    full_name: str | None = None
    email: EmailStr | None = None
    password: str | None = None
    phone_number: str | None = None
    localisation: str | None = None  # Assuming address is a text field
    metier: str | None = None 
    disponibilite: bool | None = None
    profile_pic : str| None = None