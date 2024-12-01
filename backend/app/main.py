from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from routers import example
app = FastAPI()
app.include_router(example.router)

@app.get("/")
def home():
    return {"hello"}

