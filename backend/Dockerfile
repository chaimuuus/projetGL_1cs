# Use official Python image
FROM python:3.10

# Set working directory inside the container
WORKDIR /app

# Copy Pipenv files and install dependencies
COPY Pipfile Pipfile.lock ./
RUN pip install pipenv && pipenv install --deploy --system

# Copy project files
COPY . .

# Expose FastAPI default port
EXPOSE 8000

# Run the FastAPI app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]