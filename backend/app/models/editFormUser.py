from pydantic import BaseModel, EmailStr


class Edit_form_user(BaseModel):
    user_name: str | None = None
    email: EmailStr | None = None
    password: str | None = None
    phone_number: str | None = None
    address: str | None = None  # Assuming address is a text field