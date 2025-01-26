from datetime import datetime
from typing import Dict, List
from fastapi import WebSocket
from pydantic import BaseModel

class User(BaseModel):
    user_name: str
    email: str

class Artisan(BaseModel):
    full_name: str
    metier: str

class ChatRoom(BaseModel):
    user_id: int
    artisan_id: int

class Message(BaseModel):
    chat_room_id: int
    sender_id: int
    message: str
    is_artisan: bool  # True if sent by an artisan, False if sent by a user
    sent_at: datetime

# Dependency to get a database connection


# WebSocket manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, List[WebSocket]] = {}

    async def connect(self, chat_room_id: int, websocket: WebSocket):
        await websocket.accept()
        if chat_room_id not in self.active_connections:
            self.active_connections[chat_room_id] = []
        self.active_connections[chat_room_id].append(websocket)

    def disconnect(self, chat_room_id: int, websocket: WebSocket):
        if chat_room_id in self.active_connections:
            self.active_connections[chat_room_id].remove(websocket)
            if not self.active_connections[chat_room_id]:
                del self.active_connections[chat_room_id]

    async def broadcast(self, chat_room_id: int, message: str):
        if chat_room_id in self.active_connections:
            for connection in self.active_connections[chat_room_id]:
                await connection.send_text(message)