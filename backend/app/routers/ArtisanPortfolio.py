from typing import Optional, Union
from fastapi import APIRouter, HTTPException, Depends,UploadFile, File , Form
from sqlalchemy.orm import Session  
from sqlalchemy import text
from .artisan import get_artisan_profile
from ..database.db import get_db
from pathlib import Path
import cloudinary
import cloudinary.uploader
router = APIRouter()
from ..config import API_KEY,API_SECRET,CLOUD_NAME


cloudinary.config(
    cloud_name=CLOUD_NAME,      # Replace with your Cloudinary cloud name
    api_key=API_KEY,            # Replace with your Cloudinary API key
    api_secret=API_SECRET      # Replace with your Cloudinary API secret
)


# Define the upload directory
UPLOAD_DIRECTORY = Path.cwd()/"uploads"/"artisans"/"projects"
SAVE_PATH = "uploads/artisans/projects"
# Ensure the directory exists
UPLOAD_DIRECTORY.mkdir(parents=True, exist_ok=True)

@router.get('/artisan/getProjects')
async def getProjects(profile: dict = Depends(get_artisan_profile),
    db: Session = Depends(get_db)):

    query = text("""
        SELECT * 
        FROM projects
        WHERE artisan_id = :artisan_id;
    """)
    result = db.execute(query, {"artisan_id": profile["user"]["id"]}).fetchall()
    if not result:
            raise HTTPException(status_code=404, detail="No projects found for this artisan")
    return [dict(row._mapping) for row in result]



@router.post('/artsian/addProject')
async def addProject(
    title: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    image_file: UploadFile = File(...),
    profile: dict = Depends(get_artisan_profile),
    db: Session = Depends(get_db)):
    
    upload_result = cloudinary.uploader.upload(image_file.file,
                                               folder=f"my_project/projects")

    
    query = text("""
        INSERT INTO projects (title, image_file, description, price, artisan_id)
        VALUES (:title, :image_file, :description, :price, :artisan_id)
        RETURNING project_id;
    """)
    result = db.execute(query,{"title" :title,"image_file" : upload_result["secure_url"],"description":description,"price":price,"artisan_id":profile["user"]["id"]})

    db.commit()

    return {"message":"project has been added succefully"}


@router.delete('/artisan/deleteProject')
async def deleteProject(project_id:int ,profile: dict = Depends(get_artisan_profile),
    db: Session = Depends(get_db)):
     
     query = text("""
        DELETE FROM projects
        WHERE project_id = :project_id;
    """)
     result = db.execute(query, {"project_id": project_id})
     db.commit()

     return {"message": "Project deleted successfully", "project_id": project_id}


@router.patch("/artisan/editProject")
async def editProject(
    project_id : int,
    title: str = Form(None) ,
    description: str = Form(None) ,
    price:  Union[str, None]  = Form(None),
    image_file: Union[UploadFile, str] = File(None),
    profile: dict = Depends(get_artisan_profile),
    db: Session = Depends(get_db)

):
    updates = []
    params = {}
    if title:
        updates.append("title = :title")
        params["title"] = title
    
    if description:
        updates.append("description = :description")
        params["description"] = description
    
    if price:
        updates.append("price = :price")
        params["price"] = price
    
    if image_file:
        upload_result = cloudinary.uploader.upload(image_file.file,
                                                   folder=f"my_project/projects")

        params["image_file"] = upload_result["secure_url"]
    
    
    
    # If no fields are provided to update, return a 400 error
    if not updates:
        raise HTTPException(status_code=400, detail="No fields provided to update.")
    
    # Construct the update query
    query = text(f"""
        UPDATE projects
        SET {', '.join(updates)}
        WHERE project_id = :project_id
    """)
    
    # Add the user_id to the params
    params["project_id"] = project_id
    
    # Execute the update query
    result = db.execute(query, params)
    
    # Commit the transaction to save the changes
    db.commit()

    # Return a success response
    return {"status": "success", "message": "project updated successfully"}
     