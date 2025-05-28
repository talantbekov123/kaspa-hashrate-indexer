# Kaspa Hashrate Indexer

A Node.js application that tracks and stores Kaspa network hashrate data using TypeScript, Express, TypeORM, and PostgreSQL.

## Features

- Fetches Kaspa network hashrate data every 5 minutes
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

## API Endpoints

- `GET /`: Welcome message
- `GET /hashrate`: Get current hashrate (to be implemented)
- `GET /hashrate/history`: Get historical hashrate data (to be implemented)

## Project Structure

```
src/
├── bin/
│   └── www.ts              # Application entry point
├── entity/
│   └── Hashrate.ts         # Database entity for hashrate data
├── routes/
│   └── index.ts            # API routes
├── services/
│   └── HashrateService.ts  # Business logic for hashrate operations
├── app.ts                  # Express application setup
└── data-source.ts          # TypeORM data source configuration
```

## Environment Variables

- `DB_HOST`: PostgreSQL host (default: localhost)
- `DB_PORT`: PostgreSQL port (default: 5432)
- `DB_USER`: PostgreSQL username
- `DB_PASSWORD`: PostgreSQL password
- `DB_NAME`: Database name (default: kaspa_hashrate)
- `PORT`: Application port (default: 3000)
- `NODE_ENV`: Environment (development/production)

## Development

The application uses TypeScript for better type safety and development experience. Key development commands:

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build TypeScript files
- `npm start`: Start production server
- `npm run migration:generate`: Generate new migration
- `npm run migration:run`: Run pending migrations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Database Migrations

This project uses TypeORM for database migrations. Here's how to work with migrations:

### Prerequisites
- Make sure your database is running
- Ensure your database connection details are correctly set in your environment variables or `.env` file

### Generating Migrations

1. **Generate Initial Migration**
   ```bash
   npx typeorm-ts-node-commonjs migration:generate src/migration/yourMigrationName -d src/data-source.ts
   ```

2. **Generate Migration from Entity Changes**
   ```bash
   npx typeorm-ts-node-commonjs migration:generate src/migration/[MigrationName] -d src/data-source.ts
   ```
   Replace `[MigrationName]` with a descriptive name for your migration (e.g., `AddNewField`)

### Running Migrations

To apply pending migrations:
```bash
npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts
```

### Reverting Migrations

To revert the last migration:
```bash
npx typeorm-ts-node-commonjs migration:revert -d src/data-source.ts
```

### Migration Workflow

1. Make changes to your entity files (e.g., `src/entity/Hashrate.ts`)
2. Generate a new migration using the generate command
3. Review the generated migration file in `src/migration/`
4. Run the migration to apply changes to the database

### Important Notes

- Always review generated migrations before running them
- Keep `synchronize: false` in your `data-source.ts` to prevent automatic schema changes
- Make sure to commit migration files to version control
- Never modify existing migration files that have been run in production

### Example

If you want to add a new field to the Hashrate entity:

1. Modify the entity file:
   ```typescript
   @Column({ type: "varchar", length: 50 })
   newField!: string;
   ```

2. Generate the migration:
   ```bash
   npx typeorm-ts-node-commonjs migration:generate src/migration/AddNewField -d src/data-source.ts
   ```

3. Run the migration:
   ```bash
   npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts
   ``` 