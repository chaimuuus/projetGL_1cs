from fastapi import APIRouter, HTTPException, Depends ,  Header
from sqlalchemy.orm import Session
from sqlalchemy import text
from ..models.model_Artisan import Artisan_Signup, Artisan_login
from ..Utils.hashing import hash_password, verify_password
from ..database.db import get_db
from datetime import datetime, timedelta, timezone
from fastapi.responses import JSONResponse
import jwt


SECRET_KEY = "projetcode"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = 2

router = APIRouter()


# Utility function to create JWT tokens
def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# Utility function to verify and decode JWT tokens
def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


@router.post("/artisan/signup")
def artisan_signup(artisan_data: Artisan_Signup, db: Session = Depends(get_db)):
    # Validate required fields
    if not artisan_data.full_name:
        raise HTTPException(status_code=400, detail="Full name is required.")
    if not artisan_data.phone_number:
        raise HTTPException(status_code=400, detail="Phone number is required.")
    if not artisan_data.email:
        raise HTTPException(status_code=400, detail="Email is required.")
    if not artisan_data.password:
        raise HTTPException(status_code=400, detail="Password is required.")
    if not artisan_data.localisation:
        raise HTTPException(status_code=400, detail="Localisation is required.")

    # Check if the email or phone number already exists
    existing_artisan = db.execute(
        text("SELECT * FROM artisans WHERE email = :email OR phone_number = :phone_number"),
        {"email": artisan_data.email, "phone_number": artisan_data.phone_number}
    ).fetchone()

    if existing_artisan:
        raise HTTPException(status_code=400, detail="Email or phone number already exists.")

    # Hash the password
    hashed_password = hash_password(artisan_data.password)

    # Insert new artisan into the database
    db.execute(
        text("""
        INSERT INTO artisans (full_name, phone_number, email, password, localisation)
        VALUES (:full_name, :phone_number, :email, :password, :localisation)
        """),
        {
            "full_name": artisan_data.full_name,
            "phone_number": artisan_data.phone_number,
            "email": artisan_data.email,
            "password": hashed_password,
            "localisation": artisan_data.localisation
        }
    )
    db.commit()

    return {"message": "Artisan registered successfully"}


@router.post("/artisan/login")
def artisan_login(artisan_data: Artisan_login, db: Session = Depends(get_db)):
    # Validate required fields
    if not artisan_data.email:
        raise HTTPException(status_code=400, detail="Email is required.")
    if not artisan_data.password:
        raise HTTPException(status_code=400, detail="Password is required.")

    # Fetch the artisan from the database by email
    artisan = db.execute(
        text("SELECT * FROM artisans WHERE email = :email"),
        {"email": artisan_data.email}
    ).fetchone()

    if not artisan:
        raise HTTPException(status_code=400, detail="Invalid email or password.")

    # Verify the provided password with the stored hashed password
    if not verify_password(artisan_data.password, artisan[6]):
        raise HTTPException(status_code=400, detail="Invalid email or password.")

    # Generate JWT token
    access_token = create_access_token(
        data={"id_artizan": artisan[0], "email": artisan[5]},
        expires_delta=timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    )

    return {"access_token": access_token, "token_type": "bearer"}




def get_token_from_header(authorization: str = Header(...)):
    """
    Dependency to extract the token from the 'Authorization' header.
    """
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header format")
    return authorization.split(" ")[1]  # Extract the token part after "Bearer "

@router.get("/artisan/profile")
def get_profile(token: str = Depends(get_token_from_header)):
    """
    Endpoint to get artisan profile by decoding the JWT token.
    """
    # Decode and verify JWT token
    payload = decode_access_token(token)
    id_artizan = payload.get("id_artizan")

    if not id_artizan:
        raise HTTPException(status_code=400, detail="Invalid token")

    return {"message": "This is your profile", "artisan_id": id_artizan}
