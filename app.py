from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from services.alignment import alignmentService

app = FastAPI()
app.mount("/static", StaticFiles(directory="static", html=True), name="static")

@app.get("/")
async def index():
  return { "Hello from" : "FastAPI" }

@app.get("/align/{s1}/{s2}", response_class=HTMLResponse)
async def align(s1: str, s2: str):
  result = alignmentService(s1, s2)
  return f"""
    <code>
      <pre>
{result["x"]}
{result["y"]}
      </pre>
    </code>
  """