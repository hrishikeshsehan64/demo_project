# Notes API – Cache Demo

A simple REST API built with Express.js to demonstrate response caching using **express-cache-kit**.

## Features
- Get all notes and get note by ID
- Create and delete notes
- Cache GET responses
- Automatic cache invalidation on data changes
- Cache statistics (hits, misses, hit rate)

## Tech Stack
- Node.js
- Express.js
- express-cache-kit

## Installation

```bash
git clone YOUR_REPOSITORY_URL
cd notes-cache-demo
npm install
```

## Run

```bash
node server.js
```

Server runs at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/notes` | Get all notes |
| GET | `/notes/:id` | Get note by ID |
| POST | `/notes` | Create note |
| DELETE | `/notes/:id` | Delete note |
| GET | `/stats` | Cache statistics |

## Caching

GET requests are cached temporarily. Repeated requests return `HIT` responses, while new requests return `MISS`. Creating or deleting a note clears the cache.

---
Built to demonstrate my npm package **express-cache-kit**.
</WritingBlock}