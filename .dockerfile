FROM python:3.11.0-slim

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . ./app

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]