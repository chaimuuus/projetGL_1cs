from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, Depends,APIRouter
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, text
from sqlalchemy.engine import Connection
from pydantic import BaseModel
from typing import List, Dict
from datetime import datetime
import json
from ..database.db import get_db
from ..models.messagesModels import ConnectionManager,ChatRoom,Message,Artisan,User
# Database connection

# FastAPI app
router = APIRouter()

# Models


manager = ConnectionManager()

# API Endpoints




@router.get("/chat/messages/{chat_room_id}", response_model=List[Message])
def get_messages(
    chat_room_id: int,
    skip: int = 0,  # Number of messages to skip (for pagination)
    limit: int = 100,  # Maximum number of messages to return
    connection: Connection = Depends(get_db)
):
    # Query to fetch messages with pagination
    query = text("""
        SELECT id, chat_room_id, sender_id, message, is_artisan, sent_at
        FROM messages
        WHERE chat_room_id = :chat_room_id
        ORDER BY sent_at DESC
        LIMIT :limit OFFSET :skip
    """)
    result = connection.execute(query, {
        "chat_room_id": chat_room_id,
        "skip": skip,
        "limit": limit
    }).fetchall()
    return result

@router.post("/chat/start/", response_model=ChatRoom)
def start_chat(chat_room: ChatRoom, connection: Connection = Depends(get_db)):
    # Check if the user and artisan exist
    user_query = text("SELECT id FROM users WHERE id = :user_id")
    artisan_query = text("SELECT id FROM artisans WHERE id = :artisan_id")
    user = connection.execute(user_query, {"user_id": chat_room.user_id}).fetchone()
    artisan = connection.execute(artisan_query, {"artisan_id": chat_room.artisan_id}).fetchone()

    if not user or not artisan:
        raise HTTPException(status_code=404, detail="User or Artisan not found")

    # Check if a chat room already exists between the user and artisan
    existing_chat_query = text("""
        SELECT id, user_id, artisan_id, created_at
        FROM chat_rooms
        WHERE user_id = :user_id AND artisan_id = :artisan_id
    """)
    existing_chat = connection.execute(existing_chat_query, {
        "user_id": chat_room.user_id,
        "artisan_id": chat_room.artisan_id
    }).fetchone()

    # If a chat room already exists, return it
    if existing_chat:
        return existing_chat

    # If no chat room exists, create a new one
    chat_query = text("""
        INSERT INTO chat_rooms (user_id, artisan_id)
        VALUES (:user_id, :artisan_id)
        RETURNING id, user_id, artisan_id, created_at
    """)
    try:
        result = connection.execute(chat_query, {
            "user_id": chat_room.user_id,
            "artisan_id": chat_room.artisan_id
        }).fetchone()
        connection.commit()
        return result
    except Exception as e:
            raise HTTPException(status_code=400, detail="Chat room already exists or could not be created")
# WebSocket endpoint for real-time chat
@router.websocket("/chat/ws/{chat_room_id}")
async def websocket_chat(websocket: WebSocket, chat_room_id: int, connection: Connection = Depends(get_db)):
    await manager.connect(chat_room_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)
            sender_id = message_data["sender_id"]
            message = message_data["message"]
            is_artisan = message_data.get("is_artisan", False)  # Default to False (user)

            
            query = text("""
                    INSERT INTO messages (chat_room_id, sender_id, message, is_artisan)
                    VALUES (:chat_room_id, :sender_id, :message, :is_artisan)
                    RETURNING id, chat_room_id, sender_id, message, is_artisan, sent_at
                """)
            result = connection.execute(query, {
                    "chat_room_id": chat_room_id,
                    "sender_id": sender_id,
                    "message": message,
                    "is_artisan": is_artisan  # Pass whether the sender is an artisan
                }).fetchone()
            connection.commit()

            # Broadcast the message to all clients in the chat room
            await manager.broadcast(chat_room_id, json.dumps({
                "id": result.id,
                "chat_room_id": result.chat_room_id,
                "sender_id": result.sender_id,
                "message": result.message,
                "is_artisan": result.is_artisan,  # Include is_artisan
                "sent_at": result.sent_at.isoformat()
            }))
    except WebSocketDisconnect:
        manager.disconnect(chat_room_id, websocket)

# Run the app

@router.get("/users/{user_id}/chat-rooms", response_model=List[ChatRoom])
def get_user_chat_rooms(user_id: int, connection: Connection = Depends(get_db)):
    # Query to fetch all chat rooms for a user
    query = text("""
        SELECT id, user_id, artisan_id, created_at
        FROM chat_rooms
        WHERE user_id = :user_id
    """)
    chat_rooms = connection.execute(query, {"user_id": user_id}).fetchall()
    return chat_rooms

@router.get("/artisans/{artisan_id}/chat-rooms", response_model=List[ChatRoom])
def get_artisan_chat_rooms(artisan_id: int, connection: Connection = Depends(get_db)):
    # Query to fetch all chat rooms for an artisan
    query = text("""
        SELECT id, user_id, artisan_id, created_at
        FROM chat_rooms
        WHERE artisan_id = :artisan_id
    """)
    chat_rooms = connection.execute(query, {"artisan_id": artisan_id}).fetchall()
    return chat_rooms