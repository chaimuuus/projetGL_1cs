from typing import Union
from fastapi import APIRouter, HTTPException, Depends,UploadFile, File , Form
from sqlalchemy.orm import Session  
from sqlalchemy import text
from .artisan import get_profile
from ..database.db import get_db
from pathlib import Path
from datetime import date

router = APIRouter()
# Define the upload directory
UPLOAD_DIRECTORY = Path.cwd()/"uploads"/"artisans"/"certificats"
SAVE_PATH = "uploads/artisans/certificats"
# Ensure the directory exists
UPLOAD_DIRECTORY.mkdir(parents=True, exist_ok=True)

@router.get('/artisan/getCertificats')
async def getCertificats(profile: dict = Depends(get_profile),
    db: Session = Depends(get_db)):

    query = text("""
        SELECT * 
        FROM certificates
        WHERE artisan_id = :artisan_id;
    """)
    result = db.execute(query, {"artisan_id": profile.get("artisan_id")}).fetchall()
    if not result:
            raise HTTPException(status_code=400, detail="No certificats found for this artisan")
    return [dict(row._mapping) for row in result]



@router.post('/artsian/addCertificat')
async def addCertificat(
    title: str = Form(...),
    institution : str = Form(...),
    description : str = Form(...),
    obtaining_date : date = Form(...),
    image_file: UploadFile = File(...),
    profile: dict = Depends(get_profile),
    db: Session = Depends(get_db)):
    
    file_name = str(profile.get("artisan_id"))+image_file.filename
    file_location = UPLOAD_DIRECTORY /file_name

    with open(file_location , 'wb') as f:
        f.write(await image_file.read())
    
    query = text("""
        INSERT INTO certificates (title, institution, description, obtaining_date,image_file, artisan_id)
        VALUES (:title, :institution, :description, :obtaining_date,:image_file, :artisan_id)
        RETURNING certificat_id;
    """)
    result = db.execute(query,{"title" :title,"institution" : institution,"description":description,"obtaining_date":obtaining_date,"image_file":SAVE_PATH+"/"+str(file_name),"artisan_id":profile.get("artisan_id")})

    db.commit()

    return {"message":"certificat has been added succefully"}

#tofix
@router.delete('/artisan/deleteCertificat')
async def deleteCertificat(certificat_id:int ,profile: dict = Depends(get_profile),
    db: Session = Depends(get_db)):
     
     query = text("""
        DELETE FROM certificates
        WHERE certificat_id = :certificat_id;
    """)
     result = db.execute(query, {"certificat_id": certificat_id})
     db.commit()

     return {"message": "certificat deleted successfully", "certificat_id": certificat_id}

#to fix
@router.patch("/artisan/editCertificat")
async def editCertificat(
    certificat_id : int ,
    title: str = Form(None),
    institution : str = Form(None),
    description : str = Form(None),
    obtaining_date : Union[date,str] = Form(None),
    image_file: Union[UploadFile, str] = File(None),
    profile: dict = Depends(get_profile),
    db: Session = Depends(get_db)
):
    updates = []
    params = {}
    if title:
        updates.append("title = :title")
        params["title"] = title
    
    if institution:
        updates.append("institution = :institution")
        params["institution"] = institution
    
    if description:
        updates.append("description = :description")
        params["description"] = description

    if obtaining_date:
        updates.append("obtaining_date = :obtaining_date")
        params["obtaining_date"] = obtaining_date

    if image_file:
        file_name = str(profile.get("artisan_id"))+image_file.filename
        file_location = UPLOAD_DIRECTORY /file_name
        with open(file_location , 'wb') as f:
            f.write(await image_file.read())
        updates.append("image_file = :image_file")
        params["image_file"] = SAVE_PATH+"/"+str(file_name)
    
    
    
    # If no fields are provided to update, return a 400 error
    if not updates:
        raise HTTPException(status_code=400, detail="No fields provided to update.")
    
    # Construct the update query
    query = text(f"""
        UPDATE certificates
        SET {', '.join(updates)}
        WHERE certificat_id = :certificat_id
    """)
    
    # Add the user_id to the params
    params["certificat_id"] = certificat_id
    
    # Execute the update query
    result = db.execute(query, params)
    
    # Commit the transaction to save the changes
    db.commit()

    # Return a success response
    return {"status": "success", "message": "certificat updated successfully"}
     
