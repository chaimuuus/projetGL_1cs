from fastapi import APIRouter, HTTPException, Depends,UploadFile, File
from sqlalchemy.orm import Session  
from sqlalchemy import text
from ..models.editFormUser import Edit_form_user
from .user import get_profile
from ..database.db import get_db
from ..Utils.hashing import hash_password
from pathlib import Path
import os
router = APIRouter()

# Define the upload directory
UPLOAD_DIRECTORY = Path.cwd()/"uploads"/"users"/"profilePic"
SAVE_PATH = "uploads/users/profilePic"

# Ensure the directory exists
UPLOAD_DIRECTORY.mkdir(parents=True, exist_ok=True)


@router.patch('/user/editprofile')
async def editUserProfile(formdata: Edit_form_user, profile: dict = Depends(get_profile), db: Session = Depends(get_db)):
    updates = []
    params = {}
 
    # Check for each field and add to the updates and params dictionaries
    if formdata.user_name:
        updates.append("user_name = :user_name")
        params["user_name"] = formdata.user_name
    
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
    
    
    if formdata.address:
        updates.append("address = :address")
        params["address"] = formdata.address
    
    # If no fields are provided to update, return a 400 error
    if not updates:
        raise HTTPException(status_code=400, detail="No fields provided to update.")
    
    # Construct the update query
    query = text(f"""
        UPDATE users
        SET {', '.join(updates)}
        WHERE id_user = :user_id
    """)
    
    # Add the user_id to the params
    params["user_id"] = profile.get("user_id")
    
    # Execute the update query
    result = db.execute(query, params)
    
    # Commit the transaction to save the changes
    db.commit()

    # Return a success response
    return {"status": "success", "message": "User updated successfully"}


@router.patch('/user/updateProfilePic')
async def updateProfilePic(profilePic : UploadFile = File(...),db : Session = Depends      (get_db),profile: dict = Depends(get_profile) ):
    file_name = str(profile.get("user_id"))+profilePic.filename
    file_location = UPLOAD_DIRECTORY /file_name


    with open(file_location , 'wb') as f:
        f.write(await profilePic.read())
    
    query = text("""
                UPDATE users
                 SET image_file = :file_location
                 WHERE id_user = :id_user
                 """)
    result = db.execute(query,{"file_location" : SAVE_PATH+"/"+str(file_name),"id_user" : profile.get("user_id")})
    db.commit()

    return {"message": f"File {profilePic.filename} has been updated"}