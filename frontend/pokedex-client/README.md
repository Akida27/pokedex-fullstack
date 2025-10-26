# Pokédex – Full-Stack Code Test

A modern full-stack **Pokédex web application** built for the **Stacc Farm Code Test**.  
This project demonstrates a clean full-stack architecture using:

- **.NET 9 Minimal API (C#)** as a reverse proxy backend  
- **React + TypeScript + Vite + TailwindCSS + shadcn/ui** for a responsive, styled frontend  

The application allows users to search for Pokémon by **name or ID**, displaying their image and details, while handling not-found cases gracefully.


## Project Summary

This Pokédex implements a **reverse-proxy backend** that communicates with the public [PokéAPI](https://pokeapi.co) and a **frontend client** that consumes it.  
The frontend sends a request to `/api/pokemon/{nameOrId}`, and the backend forwards it to PokéAPI, returning simplified JSON.

### Core Behaviors

- `GET /api/pokemon/{nameOrId}` - Returns Pokémon data  
- `404 Not Found` -  Returned when Pokémon does not exist  
- Frontend displays Pokémon image 
- Shows clear error feedback when not found  


## Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React (Vite + TypeScript), TailwindCSS, shadcn/ui |
| **Backend** | .NET 9 Minimal API (C#) |
| **API Source** | [PokéAPI](https://pokeapi.co) |
| **Version Control** | Git + GitHub |


## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Akida27/pokedex-fullstack.git
cd pokedex-fullstack
```
### 2. Run the Backend

```bash 
cd backend/PokemonApi
dotnet run
```
You should see:
```bash 
Now listening on: http://localhost:5148
```
Test directly:
curl http://localhost:5148/api/pokemon/pikachu

Expected output:
```bash
{
  "id": 25,
  "name": "pikachu",
  "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
}
```

### 3. Connect Frontend to Backend

The frontend needs to know where your backend is running.
Do this by creating a .env file in the ```frontend/pokedex-client``` folder.

Tips: To safely create .env file, run this command from the project root:
```bash 
cd frontend/pokedex-client
echo VITE_API_BASE=http://localhost:5148 > .env
```
Paste the following in the .env file:

```bash
VITE_API_BASE=http://localhost:5148
```

### 4. Run the Frontend
Open a new terminal and run:
```bash 
cd frontend/pokedex-client
npm install
npm run dev
```
Visit: http://localhost:5173


Now search for a Pokémon (e.g. “Pikachu”) 

##### Note:
If you are not getting any results, it could be due to one of the following reasons:

* The backend is not running in parallel with the frontend.

* The ```.env``` file is located in the wrong directory.

Please double-check Step 2 and Step 3 to ensure everything is set up correctly.

---
##### Example API CallsExample API Calls
| Method | Endpoint | Description |
|:-------|:----------|:-------------|
| `GET` | `/api/pokemon/pikachu` | Returns Pikachu image |
| `GET` | `/api/pokemon/1` | Returns Bulbasaur |
| `GET` | `/api/pokemon/unknown` | Returns 404 Not Found |

Example 200 Response
```bash
{
  "id": 6,
  "name": "charizard",
  "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
}
```

Author
Shukri Abdullahi
GitHub Profile: [Akida27](https://github.com/Akida27)
Email: shumah01a@gmail.com
