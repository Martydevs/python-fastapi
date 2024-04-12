from decouple import config
from fastapi import FastAPI, Response
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
from fastapi.responses import PlainTextResponse
from services.alignment import alignmentService

class Password(BaseModel):
  password: str

app = FastAPI(
  title="PyAligner API",
  version="1.0"
)
app.mount("/home", StaticFiles(directory="static", html=True), name="static")

@app.get("/")
async def index():
  return { "Hello from" : "FastAPI" }

@app.get("/align/{s1}/{s2}", response_class=PlainTextResponse)
async def align(s1: str, s2: str):
  result = alignmentService(s1, s2)
  return f"""
  {result["x"]}
  {result["y"]}
  """

@app.post("/env")
async def get_env(password: Password):
  options: list[str] = ["alexmarin", "pelosparados", "auronplay"]
  clave = password.password.replace(" ", "").lower()

  if clave not in options:
    return Response(content="Unauthorized", status_code=401)
  else:
    return Response(content=str(config("GEMINI_APIKEY")), status_code=200)