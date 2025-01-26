import bcrypt
 

def hash_password(password: str) -> str:
    # Hash the password with bcrypt
    salt = bcrypt.gensalt()  # Generate a salt
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')  # Return as string for storage


def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Verify the password matches the hashed password
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
