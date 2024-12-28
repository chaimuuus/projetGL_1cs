from fastapi import APIRouter, HTTPException, Depends ,  Header
from sqlalchemy.orm import Session
from sqlalchemy import text
from ..models.model_Artisan import Artisan_Signup, Artisan_login
from ..Utils.hashing import hash_password, verify_password
from ..database.db import get_db
from datetime import datetime, timedelta, timezone
from fastapi.responses import JSONResponse
import jwt
import logging


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
def artisan_login(artisan_data: Artisan_login,remember_me: bool = False, db: Session = Depends(get_db)):
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
    
 # Adjust token expiration based on 'Remember Me'
    expiration = timedelta(days=30) if remember_me else timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)   
    # Generate JWT token
    access_token = create_access_token(
        data={"id_artizan": artisan[0], "email": artisan[5]},
        expires_delta=expiration
    )

    return {"access_token": access_token, "token_type": "bearer"}




def get_token_from_header(authorization: str = Header(...)):
    """
    Dependency to extract the token from the 'Authorization' header.
    """
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header format")
    return authorization.split(" ")[1]  # Extract the token part after "Bearer "


@router.post("/artisan/logout")
def user_logout():
         ## since it's stateless so the token is removed from client side ##### 
         
    return {"message": "Logged out successfully. Please remove the token on the client side."}



@router.get("/artisan/profile")
def get_artisan_profile(token: str = Depends(get_token_from_header), db: Session = Depends(get_db)):
    """
    Endpoint to get artisan profile by decoding the JWT token.
    """
    # Decode and verify JWT token
    payload = decode_access_token(token)
    id_artizan = payload.get("id_artizan")

    if not id_artizan:
        raise HTTPException(status_code=400, detail="Invalid token")

    # Retrieve the artisan information from the database
    artisan = db.execute(
        text("""
            SELECT id_artizan, full_name, metier, specialite, phone_number, email, image_file, 
            localisation, disponibilite 
            FROM artisans 
            WHERE id_artizan = :id_artizan
        """),
        {"id_artizan": id_artizan}
    ).fetchone()

    if not artisan:
        raise HTTPException(status_code=404, detail="Artisan not found")

    # Return full artisan profile
    return {
        "message": "This is your artisan profile",
        "artisan": {
            "id": artisan[0],
            "full_name": artisan[1],
            "metier": artisan[2],
            "specialite": artisan[3],
            "phone_number": artisan[4],
            "email": artisan[5],
            "image_file": artisan[6],
            "localisation": artisan[7],
            "disponibilite": artisan[8]
        }
    }


# Enable logging for SQLAlchemy
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)


@router.get("/artisans/search_metier")
def search_artisans(metiers: str = "", clear_filters: bool = False, db: Session = Depends(get_db)):
    if clear_filters:
        # If clear_filters is True, fetch all artisans without filtering by métiers
        query = text("""
            SELECT * 
            FROM artisans
        """)
        artisans = db.execute(query).fetchall()
    else:
        # Clean up the list of métiers from the query parameter
        metier_list = [m.strip() for m in metiers.split(",") if m.strip()]
        
        if not metier_list:
            raise HTTPException(status_code=400, detail="No métiers provided.")
        
        # Build the SQL query with parameters for the métiers
        placeholders = ", ".join([f":metier{i}" for i in range(len(metier_list))])
        query = text(f"""
            SELECT * 
            FROM artisans 
            WHERE LOWER(TRIM(metier)) IN ({placeholders})
        """)

        # Parameters for the query
        params = {f"metier{i}": metier.lower() for i, metier in enumerate(metier_list)}
        
        # Execute the query
        artisans = db.execute(query, params).fetchall()

    # Process the results into a JSON-compatible structure
    results = [
        {
            "id": artisan[0],
            "name": artisan[1],
            "metier": artisan[2],
            "localisation": artisan[8],
            "specialite": artisan[3],
        }
        for artisan in artisans
    ]

    return {"artisans": results}

 

@router.get("/artisans/search_keywords")
def search_artisans(keywords: str = "", db: Session = Depends(get_db)):
    # Nettoyer la liste des mots-clés à partir du paramètre de requête
    keyword_list = [k.strip() for k in keywords.split(",") if k.strip()]

    if not keyword_list:
        raise HTTPException(status_code=400, detail="No keywords provided.")

    # Construction de la requête SQL avec des paramètres liés pour rechercher dans plusieurs colonnes
    placeholders = " OR ".join([f"LOWER(full_name) LIKE :keyword{i} OR LOWER(specialite) LIKE :keyword{i} OR LOWER(metier) LIKE :keyword{i}" for i in range(len(keyword_list))])
    
    query = text(f"""
        SELECT * 
        FROM artisans 
        WHERE ({placeholders})
    """)

    # Paramètres de la requête
    params = {f"keyword{i}": f"%{keyword.lower()}%" for i, keyword in enumerate(keyword_list)}

    # Exécution de la requête
    artisans = db.execute(query, params).fetchall()

    # Traiter les résultats dans une structure compatible avec JSON
    results = [
       {
            "id": artisan[0],
            "name": artisan[1],
            "metier": artisan[2],
            "localisation": artisan[8],
            "specialite": artisan[3],
        }
        for artisan in artisans
    ]

    return {"artisans": results}



################# System de devis ####################################
