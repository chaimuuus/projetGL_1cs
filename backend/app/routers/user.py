from fastapi import APIRouter, HTTPException, Depends , Header
import jwt.utils
from sqlalchemy.orm import Session  
from sqlalchemy import text
from ..models.model_User import User_signup, User_login
from ..Utils.hashing import hash_password, verify_password
from ..database.db import get_db
import jwt
from fastapi.responses import JSONResponse
from datetime import datetime, timedelta, timezone
 
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

@router.post("/user/signup")
def user_signup(user_data: User_signup, db: Session = Depends(get_db)):
    # Validate the required fields
    if not user_data.user_name:
        raise HTTPException(status_code=400, detail="username is required.")
    if not user_data.email:
        raise HTTPException(status_code=400, detail="email is required.")
    if not user_data.password:
        raise HTTPException(status_code=400, detail="password is required.")
    if not user_data.phone_number:
        raise HTTPException(status_code=400, detail="phone_number is required.")
    if not user_data.address:
        raise HTTPException(status_code=400, detail="address is required.")
    
    # Check if the email or phone number already exists
    existing_user = db.execute(
        text("SELECT * FROM users WHERE email = :email OR phone_number = :phone_number"),
        {"email": user_data.email, "phone_number": user_data.phone_number}
    ).fetchone()

    if existing_user:
        raise HTTPException(
            status_code=400, detail="Email or phone number already exists"
        )

    # Hash the password
    hashed_password = hash_password(user_data.password)

    # Insert new user into the database using raw SQL with text()
    db.execute(
        text("""
        INSERT INTO users (user_name, email, password, phone_number, image_file, address)
        VALUES (:user_name, :email, :password, :phone_number, :image_file, :address )
        """),
        {
            "user_name": user_data.user_name,
            "email": user_data.email,
            "password": hashed_password,
            "phone_number": user_data.phone_number,
            "image_file": user_data.image_file,
            "address": user_data.address
        }
    )
    db.commit()  # Commit the transaction to save changes

    return {"message": "User registered successfully"}

@router.post("/user/login")
def user_login(user_data: User_login, db: Session = Depends(get_db)):
    # Validate required fields
    if not user_data.email:
        raise HTTPException(status_code=400, detail="Email is required.")
    if not user_data.password:
        raise HTTPException(status_code=400, detail="Password is required.")

    # Fetch the user from the database by email
    user = db.execute(
        text("SELECT * FROM users WHERE email = :email"),
        {"email": user_data.email}
    ).fetchone()

    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password.")

    # Verify the provided password with the stored hashed password
    if not verify_password(user_data.password, user[3]):
        raise HTTPException(status_code=400, detail="Invalid email or password.")

    # Generate JWT token
    access_token = create_access_token(
        data={"user_id": user[0], "email": user[2]},
        expires_delta=timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    )

    return {"access_token": access_token, "token_type": "bearer"}

def get_token_from_header(token: str = Header(...)):
    """
    Dependency to extract the token from the 'Authorization' header.
    """
    if not token.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header format")
    return token.split(" ")[1]  # Extract the token part after "Bearer "

@router.get("/user/profile")
def get_profile(token: str = Depends(get_token_from_header)):
    """
    Endpoint to get user profile by decoding the JWT token.
    """
    # Decode and verify JWT token
    payload = decode_access_token(token)
    user_id = payload.get("user_id")

    if not user_id:
        raise HTTPException(status_code=400, detail="Invalid token")

    return {"message": "This is your profile", "user_id": user_id}
