from fastapi import APIRouter, HTTPException, Depends , Header
import jwt.utils
from sqlalchemy.orm import Session  
from sqlalchemy import text
from ..models.model_User import User_signup, User_login ,RequestedDevisCreate,RequestedDevisResponse,RespondedDevisResponse
from ..Utils.hashing import hash_password, verify_password
from ..database.db import get_db
import jwt
from fastapi.responses import JSONResponse
from datetime import datetime, timedelta, timezone
from typing import List
 
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
    token = token.strip('=')
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(payload)
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
            "phone_number": user_data.phone_number,
            "email": user_data.email,
            "password": hashed_password,
            "image_file": user_data.image_file,
            "address": user_data.address
        }
    )
    db.commit()  # Commit the transaction to save changes

    return {"message": "User registered successfully"}



@router.post("/user/login")
def user_login(user_data: User_login,remember_me: bool = False, db: Session = Depends(get_db)):
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
    
 # Adjust token expiration based on 'Remember Me'
    expiration = timedelta(days=30) if remember_me else timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)   
    access_token = create_access_token(
        data={"user_id": user[0], "email": user[2]},  # Add user info to token
        expires_delta=expiration
    )

    return {"access_token": access_token, "token_type": "bearer"}

def get_token_from_header(authorization: str = Header(...)):
    
    #Dependency to extract the token from the 'Authorization' header.

    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header format")
    return authorization.split(" ")[1]  # Extract the token part after "Bearer "



@router.post("/user/logout")
def user_logout():
    """
    Stateless Logout API.
    The server does not store tokens, so the client is responsible for clearing the token.
    """
    return {"message": "Logged out successfully. Please remove the token on the client side."}



@router.get("/user/profile")
def get_profile(token: str = Depends(get_token_from_header), db: Session = Depends(get_db)):
    """
    Endpoint to get user profile by decoding the JWT token.
    """
    # Decode and verify JWT token
    payload = decode_access_token(token)
    print(payload)
    user_id = payload.get("user_id")

    if not user_id:
        raise HTTPException(status_code=400, detail="Invalid token")

    # Retrieve the user information from the database
    user = db.execute(
        text("SELECT id_user, user_name, email, phone_number, image_file, address FROM users WHERE id_user = :user_id"),
        {"user_id": user_id}
    ).fetchone()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Return full user profile
    return {
        "message": "This is your profile",
        "user": {
            "id": user[0],
            "user_name": user[1],
            "email": user[2],
            "phone_number": user[3],
            "image_file": user[4],
            "address": user[5],
        }
    }

################### System de devis #######################################


@router.post("/user/request_devis")
def request_devis(request: RequestedDevisCreate, db: Session = Depends(get_db), token: str = Depends(get_token_from_header)):
    # Decode and verify JWT token
    payload = decode_access_token(token)
    user_id = payload.get("user_id")

    if not user_id:
        raise HTTPException(status_code=400, detail="Invalid token")
    # Insert the new request into the requested_devis table using raw SQL
    result = db.execute(
        text("""
            INSERT INTO requested_devis (
                id_user, service_demande, artisan_id, description, 
                budget_prevu, date_souhaite, illustrations, 
                request_date, location_user, statut_demande, urgence
            )
            VALUES (
                :id_user, :service_demande, :artisan_id, :description, 
                :budget_prevu, :date_souhaite, :illustrations, 
                CURRENT_DATE, :location_user, 'Pending', :urgence
            )
            RETURNING id_rqdevis
        """),
        {
            "id_user": user_id,
            "service_demande": request.service_demande,
            "artisan_id": request.artisan_id,
            "description": request.description,
            "budget_prevu": request.budget_prevu,
            "date_souhaite": request.date_souhaite,
            "illustrations": request.illustrations,
            "location_user": request.location_user,
            "urgence": request.urgence
        }
    )

    # Fetch the returned ID of the newly created devis
    new_devis_id = result.fetchone()[0]

    # Commit the transaction
    db.commit()

    # Return a success message along with the ID of the newly created devis
    return {
        "message": "Request for devis created successfully",
        "id_rqdevis": new_devis_id
    }
    
    
    
    
@router.get("/user/requested_devis", response_model=List[RequestedDevisResponse])
def get_requested_devis(db: Session = Depends(get_db), token: str = Depends(get_token_from_header)):
    # Decode and verify JWT token
    payload = decode_access_token(token)
    user_id = payload.get("user_id")

    if not user_id:
        raise HTTPException(status_code=400, detail="Invalid token")

    # Fetch all requested_devis for the user from the database
    result = db.execute(
        text("""
            SELECT id_rqdevis, service_demande, artisan_id, description, 
                budget_prevu, date_souhaite, illustrations, request_date, 
                location_user, statut_demande, urgence
            FROM requested_devis
            WHERE id_user = :id_user
        """),
        {"id_user": user_id}
    )

    # Fetch all rows from the result
    requested_devis_list = result.fetchall()

    # If no requested_devis found, raise an error
    if not requested_devis_list:
        raise HTTPException(status_code=404, detail="No requested devis found for the user")

    # Return the list of requested_devis
    return [
        {
            "id_rqdevis": row[0],
            "service_demande": row[1],
            "artisan_id": row[2],
            "description": row[3],
            "budget_prevu": row[4],
            "date_souhaite": row[5],
            "illustrations": row[6],
            "request_date": row[7],
            "location_user": row[8],
            "statut_demande": row[9],
            "urgence": row[10]
        }
        for row in requested_devis_list
    ]
    
    
@router.get("/user/responded_devis", response_model=List[RespondedDevisResponse])
def get_responded_devis_for_user(
    db: Session = Depends(get_db), 
    token: str = Depends(get_token_from_header)
):
    # Decode and verify JWT token
    payload = decode_access_token(token)
    user_id = payload.get("user_id")

    if not user_id:
        raise HTTPException(status_code=400, detail="Invalid token")

    # Fetch all responded_devis for the user from the database
    result = db.execute(
        text("""
            SELECT id_rpdevis, id_rqdevis, artisan_id, prix, delai_estime, 
                service_details, response_date, remarques, id_user
            FROM responded_devis
            WHERE id_user = :user_id
        """),
        {"user_id": user_id}
    )

    # Fetch all rows from the result
    responded_devis_list = result.fetchall()

    # If no responded_devis found, raise an error
    if not responded_devis_list:
        raise HTTPException(status_code=404, detail="No responded devis found for the user")

    # Return the list of responded_devis
    return [
        {
            "id_rpdevis": row[0],
            "id_rqdevis": row[1],
            "artisan_id": row[2],
            "prix": row[3],
            "delai_estime": row[4],
            "service_details": row[5],
            "response_date": row[6],
            "remarques": row[7],
            "id_user": row[8]
        }
        for row in responded_devis_list
    ]
    
@router.delete("/user/request_devis/{request_id}")
def delete_request_devis(
    request_id: int,
    db: Session = Depends(get_db),
    token: str = Depends(get_token_from_header),
):
    # Decode and verify JWT token
    payload = decode_access_token(token)
    user_id = payload.get("user_id")

    if not user_id:
        raise HTTPException(status_code=400, detail="Invalid token")

    # Check if the requested devis exists and belongs to the user
    result = db.execute(
        text("""
            SELECT id_rqdevis
            FROM requested_devis
            WHERE id_rqdevis = :request_id AND id_user = :user_id
        """),
        {"request_id": request_id, "user_id": user_id}
    ).fetchone()

    if not result:
        raise HTTPException(
            status_code=404, 
            detail="Requested devis not found or not authorized"
        )

    # Delete the requested devis
    db.execute(
        text("DELETE FROM requested_devis WHERE id_rqdevis = :request_id"),
        {"request_id": request_id}
    )
    db.commit()

    return {"message": "Requested devis deleted successfully", "id_rqdevis": request_id}




@router.get("/user/responded_devis_by_price", response_model=List[RespondedDevisResponse])
def get_responded_devis_sorted_by_price(
    db: Session = Depends(get_db),
    token: str = Depends(get_token_from_header)
):
    # Decode and verify JWT token
    payload = decode_access_token(token)
    user_id = payload.get("user_id")

    if not user_id:
        raise HTTPException(status_code=400, detail="Invalid token")

    # Query the responded_devis table sorted by price
    result = db.execute(
        text("""
            SELECT id_rpdevis, id_rqdevis, artisan_id, prix, delai_estime, service_details, 
                   response_date, remarques, id_user
            FROM responded_devis
            WHERE id_user = :user_id
            ORDER BY prix ASC
        """),
        {"user_id": user_id}
    )

    # Fetch all rows from the result
    responded_devis_list = result.fetchall()

    # If no responded_devis found, raise an error
    if not responded_devis_list:
        raise HTTPException(status_code=404, detail="No responded devis found for the user")

    # Return the sorted list of responded_devis
    return [
        {
            "id_rpdevis": row[0],
            "id_rqdevis": row[1],
            "artisan_id": row[2],
            "prix": row[3],
            "delai_estime": row[4],
            "service_details": row[5],
            "response_date": row[6],
            "remarques": row[7],
            "id_user": row[8]
        }
        for row in responded_devis_list
    ]
