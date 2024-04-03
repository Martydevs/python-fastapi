from decouple import config
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import PlainTextResponse
from services.alignment import alignmentService

app = FastAPI()
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

@app.get("/env")
async def get_env():
  return { "value" : str(config("GEMINI_APIKEY")) }