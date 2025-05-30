# Kaspa Hashrate Indexer

A Node.js application that tracks and stores Kaspa network hashrate data using TypeScript, Express, TypeORM, and PostgreSQL.

## Features

- Fetches Kaspa network hashrate data every 30 seconds
- Stores historical hashrate data in PostgreSQL database
- RESTful API endpoints
- TypeScript for better type safety and development experience
- TypeORM for database operations
- Environment-based configuration

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hashrate-kaspa-indexer
```

2. Install dependencies:
```bash
npm install
```

3. Create a PostgreSQL database:
```sql
CREATE DATABASE kaspa_hashrate;
```

4. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

5. Update the `.env` file with your database credentials and other configurations.

## Database Setup

1. Generate the initial migration:
```bash
npm run migration:generate src/migration/InitialMigration
```

2. Run the migrations:
```bash
npm run migration:run
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## Running with Docker

1. Build the Docker image:
```bash
docker build -t kaspa-hashrate-indexer .
```

2. Run the container:
```bash
docker run -d --name kaspa-hashrate-container -p 3005:3000 kaspa-hashrate-indexer
```

The application will be available at `http://localhost:3000`.

## API Endpoints

- `GET /`: Welcome message
- `GET /hashrate`: Get current hashrate (to be implemented)

## Environment Variables

- `DB_HOST`: PostgreSQL host (default: localhost)
- `DB_PORT`: PostgreSQL port (default: 5432)
- `DB_USER`: PostgreSQL username
- `DB_PASSWORD`: PostgreSQL password
- `DB_NAME`: Database name (default: kaspa_hashrate)
- `PORT`: Application port (default: 3000)
- `NODE_ENV`: Environment (development/production)
