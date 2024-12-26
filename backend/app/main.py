from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .routers import example ,user ,artisan,edtiUserProfile
from starlette.middleware.sessions import SessionMiddleware


app = FastAPI()

app.include_router(example.router)
app.include_router(user.router)
app.include_router(artisan.router)
app.include_router(edtiUserProfile.router)


app.add_middleware(SessionMiddleware, secret_key="projet1cssecretpassword" ) 
@app.get("/")
def home():
    return {"message ":"hello"}

