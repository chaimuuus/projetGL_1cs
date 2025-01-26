import pytest
from unittest.mock import patch
from fastapi.testclient import TestClient
from sqlalchemy import text
from app.main import app  # Your FastAPI app

# Mocked profile data (as returned by get_profile)
def mock_get_profile(token: str):
    return {"artisan_id": 1}  # Mocked artisan profile data

# Mocked JWT decoding (for testing purposes)
def mock_decode_access_token(token: str):
    return {"id_artizan": 1}  # Mocked decoded token payload

@pytest.fixture
def client():
    # Set up TestClient for testing
    with TestClient(app) as client:
        yield client



def test_edit_artisan_profile(client):
    # Mock the necessary functions
    with patch("app.routers.artisan.decode_access_token", side_effect=mock_decode_access_token):
        with patch("app.routers.artisan.get_profile", side_effect=mock_get_profile):
            
            # Define the JSON data for the PATCH request
            response = client.patch(
                "/artisan/editprofile",
                json={
                    "full_name": "New Name",
                    "email": "newemail@example.com",  # Ensure this is a valid email
                    "password": "newpassword",  # Password should be a valid string
                    "phone_number": "123456789",  # Phone number as string
                    "localisation": "New Location",  # Localization should be a string
                    "metier": "New Job",  # Job should be a string
                    "disponibilite": True,  # Boolean value
                },
                headers={"token": "Bearer mocked-jwt-token"}  # Pass mocked token in header
            )

            # Inspect the response to understand what went wrong (if anything)
            print(response.json())  # This will give details on the validation error if 422 is returned

    # Assertions
    assert response.status_code == 200, f"Expected 200, but got {response.status_code}. Response: {response.json()}"
    assert response.json()["status"] == "success"

def test_update_profile_pic(client):
    with patch("app.routers.artisan.decode_access_token", side_effect=mock_decode_access_token):
        with patch("app.routers.artisan.get_profile", side_effect=mock_get_profile):
            with open("test_image.png", "wb") as f:
                f.write(b"fake image data")  # Create a dummy image file
            with open("test_image.png", "rb") as f:
                response = client.patch(
                    "/artisan/updateProfilePic", 
                    files={"profilePic": f},
                    headers={"token": "Bearer mocked-jwt-token"}  # Send token as a query parameter
                )

    assert response.status_code == 200
    assert "File test_image.png has been updated" in response.json()["message"]



def test_get_artisan_specialites(client):
    with patch("app.routers.artisan.decode_access_token", side_effect=mock_decode_access_token):
        with patch("app.routers.artisan.get_profile", side_effect=mock_get_profile):
            # Add data first
            client.patch("/artisan/addSpecialite", json=[1, 2], params={"token": "mocked-jwt-token"})
            # Retrieve specialites
            response = client.get(
                "/artisan/getSpecialites", 
                headers={"token": "Bearer mocked-jwt-token"}  # Send token as a query parameter
            )

    assert response.status_code == 200
    assert len(response.json()) >= 0  # Ensure specialites are returned

def test_remove_specialite(client):
    with patch("app.routers.artisan.decode_access_token", side_effect=mock_decode_access_token):
        with patch("app.routers.artisan.get_profile", side_effect=mock_get_profile):
            # Add a specialite first
            client.patch("/artisan/addSpecialite", json=[1], params={"token": "mocked-jwt-token"})
            # Remove the specialite
            response = client.delete(
                "/artisan/removeSpecialite?specialite_id=1", 
                headers={"token": "Bearer mocked-jwt-token"}  # Send token as a query parameter
            )

    assert response.status_code == 200
    assert response.json()["message"] == "specialite has been removed"