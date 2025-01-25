from fastapi import APIRouter, HTTPException, Depends,UploadFile, File
from sqlalchemy.orm import Session  
from sqlalchemy import text
from ..models.editFormArtisan import Edit_form_artisan
from .artisan import get_artisan_profile
from ..database.db import get_db
from ..Utils.hashing import hash_password
from pathlib import Path
import os
router = APIRouter()


# Define the upload directory
UPLOAD_DIRECTORY = Path.cwd()/"uploads"/"artisans"/"profilePic"
SAVE_PATH = "uploads/artisans/profilePic"

# Ensure the directory exists
UPLOAD_DIRECTORY.mkdir(parents=True, exist_ok=True)

@router.patch('/artisan/editprofile')
async def editArtisanProfile(formdata: Edit_form_artisan, profile: dict = Depends(get_artisan_profile), db: Session = Depends(get_db)):
    updates = []
    params = {}
 
    # Check for each field and add to the updates and params dictionaries
    if formdata.full_name:
        updates.append("full_name = :full_name")
        params["full_name"] = formdata.full_name
    
    if formdata.email:
        updates.append("email = :email")
        params["email"] = formdata.email
    
    if formdata.password:
        # Hash the password before saving it
        hashed_password = hash_password(formdata.password)
        updates.append("password = :password")
        params["password"] = hashed_password
    
    if formdata.phone_number:
        updates.append("phone_number = :phone_number")
        params["phone_number"] = formdata.phone_number
    
    
    if formdata.localisation:
        updates.append("localisation = :localisation")
        params["localisation"] = formdata.localisation
    
    if formdata.metier:
        updates.append("metier = :metier")
        params["metier"] = formdata.metier
    
    if formdata.disponibilite:
        updates.append("disponibilite = :disponibilite")
        params["disponibilite"] = formdata.disponibilite
    
    
    
    # If no fields are provided to update, return a 400 error
    if not updates:
        raise HTTPException(status_code=400, detail="No fields provided to update.")
    
    # Construct the update query
    query = text(f"""
        UPDATE artisans
        SET {', '.join(updates)}
        WHERE artisan_id = :artisan_id
    """)
    
    # Add the user_id to the params
    params["artisan_id"] = profile["artisan"]["id"]
    
    # Execute the update query
    result = db.execute(query, params)
    
    # Commit the transaction to save the changes
    db.commit()

    # Return a success response
    return {"status": "success", "message": "artisan updated successfully"}

@router.patch('/artisan/updateProfilePic')
async def updateProfilePic(profilePic : UploadFile = File(...),db : Session = Depends      (get_db),profile: dict = Depends(get_artisan_profile) ):

    file_name = str(profile["artisan"]["id"])+profilePic.filename
    file_location = UPLOAD_DIRECTORY /file_name


    with open(file_location , 'wb') as f:
        f.write(await profilePic.read())
    
    query = text("""
                UPDATE artisans
                 SET image_file = :file_location
                 WHERE artisan_id = :artisan_id
                 """)
    result = db.execute(query,{"file_location" : SAVE_PATH+"/"+str(file_name),"artisan_id" : profile["artisan"]["id"]})
    db.commit()

    return {"message": f"File {profilePic.filename} has been updated"}


@router.patch('/artisan/addSpecialite')
async def addSpecialite(specialites : list[int] | None = None ,profile: dict = Depends(get_artisan_profile), db: Session = Depends(get_db)):

    if len(specialites) == 0:
            raise HTTPException(status_code=400, detail="No fields provided to add.")

    for specialite in specialites:
        query = text("""INSERT INTO artisan_specialite (artisan_id , specialite_id) VALUES (:artisan_id ,:specialite_id)
        ON CONFLICT (artisan_id, specialite_id) DO NOTHING """)
        db.execute(query,{"artisan_id":profile["artisan"]["id"],"specialite_id":specialite,})
    db.commit()
    
    return{"status":"specialites added"}

@router.get('/artisan/getSpecialites')
async def getArtisanSpecialites(profile: dict = Depends(get_artisan_profile), db: Session = Depends(get_db)):

    query = text("""
            SELECT specialites.name, specialites.specialite_id FROM specialites
            INNER JOIN artisan_specialite
            ON specialites.specialite_id = artisan_specialite.specialite_id
            WHERE artisan_id = :artisan_id
""")
    print(profile)
    result = db.execute(query,{"artisan_id":profile["artisan"]["id"]}).fetchall()

        
    return[row._mapping for row in result]

@router.delete('/artisan/removeSpecialite')
async def removeSpecialite(specialite_id : int ,profile: dict = Depends(get_artisan_profile), db: Session = Depends(get_db)):
    
    
    query = text("""
    DELETE FROM artisan_specialite
    WHERE specialite_id = :specialite_id AND artisan_id = :artisan_id
    """)

    result = db.execute(query,{"specialite_id":specialite_id,"artisan_id":profile["artisan"]["id"]})
    db.commit()

    return {"message":"specialite has been removed"}

@router.get("/artisan/getMetierSpecialites")
async def getMetierSpecialites(metier : int, db: Session = Depends(get_db)):
    query = text("""
    SELECT * FROM specialites
    WHERE metier_id = :metier_id
    """)
    result = db.execute(query,{"metier_id":metier}).fetchall()

    return[row._mapping for row in result]

@router.get("/artisan/getMetiers")
async def getMetiers(db: Session = Depends(get_db)):

    query = text("""
   SELECT * FROM metier
    """)
    result = db.execute(query).fetchall()
    return[row._mapping for row in result]

