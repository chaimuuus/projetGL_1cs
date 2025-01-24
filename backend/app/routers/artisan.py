from fastapi import APIRouter, HTTPException, Depends ,  Header
from sqlalchemy.orm import Session
from sqlalchemy import text
from ..models.model_Artisan import Artisan_Signup, Artisan_login , RequestedDevisResponseartisan ,ArtisanResponse,RespondedDevisResponse
from ..Utils.hashing import hash_password, verify_password
from ..database.db import get_db
from datetime import datetime, timedelta, timezone
from fastapi.responses import JSONResponse
import jwt
import logging
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
    print(artisan)
    if not verify_password(artisan_data.password, artisan[5]):
        raise HTTPException(status_code=400, detail="Invalid email or password.")
    
 # Adjust token expiration based on 'Remember Me'
    expiration = timedelta(days=30) if remember_me else timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)   
    # Generate JWT token
    access_token = create_access_token(
        data={"id_artizan": artisan[0], "email": artisan[5]},
        expires_delta=expiration
    )

    return {"access_token": access_token, "token_type": "bearer"}




def get_token_from_header(token: str = Header(...)):
    """
    Dependency to extract the token from the 'Authorization' header.
    """
    if not token.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header format")
    return token.split(" ")[1]  # Extract the token part after "Bearer "


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
            SELECT artisan_id, full_name, metier, phone_number, email, image_file, 
            localisation, disponibilite 
            FROM artisans 
            WHERE artisan_id = :id_artizan
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
            "phone_number": artisan[3],
            "email": artisan[4],
            "image_file": artisan[5],
            "localisation": artisan[6],
            "disponibilite": artisan[7]
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


## repondre a un devis 
@router.post("/artisan/respond_to_devis", response_model=dict)
def respond_to_devis(
    response: ArtisanResponse, 
    db: Session = Depends(get_db), 
    token: str = Depends(get_token_from_header)
):
    # Decode and verify the JWT token
    payload = decode_access_token(token)
    artisan_id = payload.get("id_artizan")

    if not artisan_id:
        raise HTTPException(status_code=400, detail="Invalid token")

    # Check if the requested devis exists and is assigned to the artisan
    devis_check = db.execute(
        text("""
            SELECT 1 FROM requested_devis 
            WHERE id_rqdevis = :id_rqdevis AND artisan_id = :artisan_id
        """),
        {"id_rqdevis": response.id_rqdevis, "artisan_id": artisan_id}
    ).fetchone()

    if not devis_check:
        raise HTTPException(status_code=404, detail="Requested devis not found or not assigned to this artisan")

    # Insert the response into the responded_devis table
    db.execute(
        text("""
            INSERT INTO responded_devis (
                id_rqdevis, artisan_id, prix, delai_estime, 
                service_details, remarques, id_user
            )
            VALUES (
                :id_rqdevis, :artisan_id, :prix, :delai_estime, 
                :service_details, :remarques, 
                (SELECT id_user FROM requested_devis WHERE id_rqdevis = :id_rqdevis)
            )
        """),
        {
            "id_rqdevis": response.id_rqdevis,
            "artisan_id": artisan_id,
            "prix": response.prix,
            "delai_estime": response.delai_estime,
            "service_details": response.service_details,
            "remarques": response.remarques
        }
    )
    db.commit()

    return {"message": "Response submitted successfully"}

## voir la liste des devis requested to him 
@router.get("/artisan/requested_devis", response_model=List[RequestedDevisResponseartisan])
def get_requested_devis_for_artisan(db: Session = Depends(get_db), token: str = Depends(get_token_from_header)):
    # Decode and verify the JWT token
    payload = decode_access_token(token)
    artisan_id = payload.get("id_artizan")  # Assuming artisan's ID is stored in 'artisan_id' in the payload

    if not artisan_id:
        raise HTTPException(status_code=400, detail="Invalid token")

    # SQL query to fetch requested devis assigned to this artisan
    result = db.execute(
        text(""" 
            SELECT 
                rd.id_rqdevis, rd.service_demande, rd.id_user, rd.description, 
                rd.budget_prevu, rd.date_souhaite, rd.illustrations, rd.request_date, 
                rd.location_user, rd.statut_demande, rd.urgence
            FROM requested_devis rd
            WHERE rd.artisan_id = :artisan_id
        """),
        {"artisan_id": artisan_id}
    )

    # Fetch all rows from the result
    requested_devis_list = result.fetchall()

    # If no devis are found for the artisan, raise an exception
    if not requested_devis_list:
        raise HTTPException(status_code=404, detail="No devis found for this artisan")

    # Convert each Row object to a dictionary before passing it to RequestedDevisResponseartisan
    return [
        RequestedDevisResponseartisan(**{key: value for key, value in zip(result.keys(), row)})
        for row in requested_devis_list
    ]
    
## voir la list des devis qu'il a repondu 
@router.get("/artisan/responded_devis", response_model=List[RespondedDevisResponse])
def get_responded_devis_for_artisan(
    db: Session = Depends(get_db), 
    token: str = Depends(get_token_from_header)
):
    # Décoder le token JWT
    payload = decode_access_token(token)
    artisan_id = payload.get("id_artizan")

    if not artisan_id:
        raise HTTPException(status_code=400, detail="Token invalide")

    # Récupérer les devis répondus par l'artisan
    result = db.execute(
        text("""
            SELECT 
                id_rpdevis, id_rqdevis, artisan_id, prix, delai_estime, 
                service_details, response_date, remarques, id_user
            FROM responded_devis
            WHERE artisan_id = :artisan_id
        """),
        {"artisan_id": artisan_id}
    )

    # Convertir les résultats en une liste
    responded_devis_list = result.fetchall()

    # Si aucun devis trouvé, renvoyer une erreur
    if not responded_devis_list:
        raise HTTPException(status_code=404, detail="Aucun devis répondu trouvé pour cet artisan")

    # Retourner les devis en format JSON
    return [
        RespondedDevisResponse(**{key: value for key, value in zip(result.keys(), row)})
        for row in responded_devis_list
    ]
    
## Supprimer un devis dont il a repondu "s'il a regreté zaema "
@router.delete("/artisan/responded_devis/{response_id}")
def delete_responded_devis_for_artisan(
    response_id: int,
    db: Session = Depends(get_db),
    token: str = Depends(get_token_from_header),
):
    # Décoder le token JWT
    payload = decode_access_token(token)
    artisan_id = payload.get("id_artizan")

    if not artisan_id:
        raise HTTPException(status_code=400, detail="Token invalide")

    # Vérifier si le devis existe et appartient à cet artisan
    result = db.execute(
        text("""
            SELECT id_rpdevis 
            FROM responded_devis 
            WHERE id_rpdevis = :response_id AND artisan_id = :artisan_id
        """),
        {"response_id": response_id, "artisan_id": artisan_id}
    ).fetchone()

    if not result:
        raise HTTPException(
            status_code=404, 
            detail="Devis introuvable ou non autorisé"
        )

    # Supprimer le devis
    db.execute(
        text("DELETE FROM responded_devis WHERE id_rpdevis = :response_id"),
        {"response_id": response_id}
    )
    db.commit()

    return {"message": "Devis supprimé avec succès", "id": response_id}

## suprimer requested_devis from his list 
@router.delete("/artisan/requested_devis/{request_id}")
def delete_requested_devis_for_artisan(
    request_id: int,
    db: Session = Depends(get_db),
    token: str = Depends(get_token_from_header),
):
    # Décoder le token JWT
    payload = decode_access_token(token)
    artisan_id = payload.get("id_artizan")

    if not artisan_id:
        raise HTTPException(status_code=400, detail="Token invalide")

    # Vérifier si le devis existe et appartient à cet artisan
    result = db.execute(
        text("""
            SELECT id_rqdevis 
            FROM requested_devis 
            WHERE id_rqdevis = :request_id AND artisan_id = :artisan_id
        """),
        {"request_id": request_id, "artisan_id": artisan_id}
    ).fetchone()

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Devis demandé introuvable ou non autorisé"
        )

    # Supprimer le devis
    db.execute(
        text("DELETE FROM requested_devis WHERE id_rqdevis = :request_id"),
        {"request_id": request_id}
    )
    db.commit()

    return {"message": "Devis demandé supprimé avec succès", "id": request_id}
