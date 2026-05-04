# URL Shortener - Full Stack URL Shortening Application

A modern, full stack URL shortener that converts long URLs into clean, shareable short links with real-time click tracking and persistent storage.

## Features

- **URL Shortening**: Instantly convert long URLs into short, shareable links
- **Click Tracking**: Real-time click count tracking for every shortened link
- **Recent Links**: Persistent display of previously shortened links loaded from the database
- **Redirect Engine**: Short links redirect to original URLs via the Express backend
- **Loading Skeleton**: Animated skeleton UI while fetching links on cold start
- **Copy to Clipboard**: One-click copy for shortened links
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
- **TypeScript**: Type-safe frontend codebase for better development experience

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Backend**: Node.js with Express
- **ORM**: Prisma v7
- **Database**: PostgreSQL via Supabase
- **Deployment**: Vercel (frontend) + Render (backend)

## Project Structure

```
url-shortener/
├── client/                   # React + Vite + Tailwind frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.tsx      # URL input, shorten button, result display
│   │   │   └── RecentLinks.tsx  # Recent links list with skeleton loader
│   │   ├── types/
│   │   │   └── index.ts      # Shared TypeScript types
│   │   ├── App.tsx           # Root component with data fetching
│   │   ├── main.tsx          # Entry point
│   │   └── index.css         # Global styles
│   └── .env                  # VITE_API_URL
└── server/                   # Express backend
    ├── controllers/
    │   └── linkController.js # Shorten, redirect, get links logic
    ├── routes/
    │   ├── links.js          # POST /api/links/shorten, GET /api/links
    │   └── redirect.js       # GET /:code
    ├── prisma/
    │   └── schema.prisma     # Database schema
    ├── prisma.config.ts      # Prisma v7 configuration
    ├── index.js              # Express server entry point
    └── .env                  # DATABASE_URL, DIRECT_URL, PORT
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd url-shortener
```

### Server Setup

```bash
cd server
npm install
```

Configure environment variables in `server/.env`:

```env
DATABASE_URL="postgresql://postgres.xxxx:password@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.xxxx:password@db.xxxx.supabase.co:5432/postgres"
PORT=5000
```

Push the database schema to Supabase:

```bash
npx prisma db push
npx prisma generate
```

### Client Setup

```bash
cd client
npm install
```

Configure environment variables in `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

## Development

Run both servers in separate terminals:

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/links/shorten` | Shorten a URL |
| `GET` | `/api/links` | Get all shortened links |
| `GET` | `/:code` | Redirect to original URL |

### Example Request

```bash
POST /api/links/shorten
Content-Type: application/json

{
  "originalUrl": "https://example.com/very/long/url"
}
```

### Example Response

```json
{
  "id": 1,
  "originalUrl": "https://example.com/very/long/url",
  "shortCode": "abc123",
  "clicks": 0,
  "createdAt": "2026-04-30T00:00:00.000Z"
}
```

## Database Schema

```prisma
model Link {
  id          Int      @id @default(autoincrement())
  originalUrl String
  shortCode   String   @unique
  clicks      Int      @default(0)
  createdAt   DateTime @default(now())
}
```

## Deployment

### Frontend → Vercel

1. Push code to GitHub
2. Import repo in Vercel
3. Set **Root Directory** to `client`
4. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com`
5. Deploy

### Backend → Render

1. Create a new **Web Service** in Render
2. Set **Root Directory** to `server`
3. Set **Build Command** to `npm install && npx prisma generate`
4. Set **Start Command** to `node index.js`
5. Add environment variables: `DATABASE_URL`, `DIRECT_URL`, `PORT`
6. Deploy

## Build

```bash
# Frontend production build
cd client
npm run build
```

## Author

Kenneth Jhun N. Balino

Full Stack Developer

Built with React, Node.js, Express, Prisma, and Supabase
