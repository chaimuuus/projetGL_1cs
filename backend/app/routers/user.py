from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session  
from sqlalchemy import text
from ..models.model_User import User_signup , User_login 
from ..Utils.hashing import hash_password ,verify_password
from ..database.db import get_db
import secrets
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta, timezone
from fastapi.responses import JSONResponse


router = APIRouter()

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

    session_token = secrets.token_hex(32)
    expiration_time = datetime.now(timezone.utc) + timedelta(days=2)
 
    result = db.execute(
    text(
        "INSERT INTO sessions (user_id, artisan_id, user_type, session_token, expires_at) VALUES (:user_id, :artisan_id, :user_type, :session_token, :expires_at)"
    ),
    {
        "user_id": user[0],
        "artisan_id": None,
        "user_type": "user",
        "session_token": session_token,
        "expires_at": expiration_time
    }
)
    db.commit()


    # Return session token in response
    response = JSONResponse(content={"message": "Login successful", "session_token": session_token,"user_id":user[0]})
    response.set_cookie(
        key="session_token", 
        value=session_token, 
        httponly=True,  # Prevent JavaScript access to the cookie
        secure=True,    # Ensure cookie is sent over HTTPS
        samesite="Strict",  # Ensure cookie is not sent in cross-site requests
        expires=expiration_time  # Set cookie expiration time
    )
    return response

def get_session(session_token: str, db: Session = Depends(get_db)):
    # Use raw SQL to query the session
    query = text("""
        SELECT * 
        FROM sessions 
        WHERE session_token = :session_token
    """)
    
    result = db.execute(query, {"session_token": session_token}).fetchone()

    if not result:
        raise HTTPException(status_code=400, detail="Session not found.")
    
    # Extract expiration date from the query result
    expires_at = result[6]  # Adjust the column name based on your database table schema
    
    # Compare expiration time with the current UTC time
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)

    # Compare expiration time with the current UTC time
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="Session expired.")

    return result

@router.post("/user/logout")
def user_logout(session_token: str, db: Session = Depends(get_db)):
 
    result = db.execute(
        text("DELETE FROM sessions WHERE session_token = :session_token"),
        {"session_token": session_token}
    )
    db.commit()

    # Check if any session was deleted
    if result.rowcount == 0:
        raise HTTPException(status_code=400, detail="Invalid session token.")

    # Return a response indicating the user has been logged out
    response = JSONResponse(content={"message": "Logout successful"})
    response.delete_cookie(
        key="session_token",  # Remove the session cookie
        path="/"  # Make sure the cookie is deleted from the root path
    )
    return response

@router.get("/user/profile")
def get_profile(session: dict = Depends(get_session)):
    return {"message": "This is your profile", "user_id": session.user_id}