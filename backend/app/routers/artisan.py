from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session  
from sqlalchemy import text
from ..models.model_Artisan import Artisan_Signup , Artisan_login 
from ..Utils.hashing import hash_password ,verify_password
from ..database.db import get_db
import secrets
from datetime import datetime, timedelta, timezone
from fastapi.responses import JSONResponse



router = APIRouter()

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

    session_token = secrets.token_hex(32)
    expiration_time = datetime.now(timezone.utc) + timedelta(days=2)
 
    result = db.execute(
    text(
        "INSERT INTO sessions (user_id, artisan_id, user_type, session_token, expires_at) VALUES (:user_id, :artisan_id, :user_type, :session_token, :expires_at)"
    ),
    {
        "user_id": None ,
        "artisan_id": artisan[0],
        "user_type": "artisan",
        "session_token": session_token,
        "expires_at": expiration_time
    }
)
    db.commit()


    # Return session token in response
    response = JSONResponse(content={"message": "Login successful", "session_token": session_token,"artisan_id":artisan[0]})
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

@router.post("/artisan/logout")
def artisan_logout(session_token: str, db: Session = Depends(get_db)):
 
    result = db.execute(
        text("DELETE FROM sessions WHERE session_token = :session_token"),
        {"session_token": session_token}
    )
    db.commit()

    # Check if any session was deleted
    if result.rowcount == 0:
        raise HTTPException(status_code=400, detail="Invalid session token.")

    # Return a response indicating the artisan has been logged out
    response = JSONResponse(content={"message": "Logout successful"})
    response.delete_cookie(
        key="session_token",  # Remove the session cookie
        path="/"  # Make sure the cookie is deleted from the root path
    )
    return response

@router.get("/artisan/profile")
def get_profile(session: dict = Depends(get_session)):
    return {"message": "This is your profile", "artisan_id": session.artisan_id}