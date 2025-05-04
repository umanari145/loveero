// src/migration-cli.ts
import { MigrationManager } from './MigrationMagager';

async function main() {
  const command = process.argv[2];
  const targetVersion = process.argv[3] ? parseInt(process.argv[3], 10) : undefined;

  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const dbName = process.env.DB_NAME || 'myapp';

  const migrationManager = new MigrationManager(mongoUri, dbName);

  try {
    switch (command) {
      case 'up':
        await migrationManager.migrate(targetVersion);
        break;
      case 'down':
        if (!targetVersion && targetVersion !== 0) {
          throw new Error('Target version is required for down migration');
        }
        await migrationManager.migrate(targetVersion);
        break;
      case 'status':
        await migrationManager.status();
        break;
      default:
        console.log(`
Usage:
  npm run migrate [command] [targetVersion]

Commands:
  up [targetVersion]    - Migrate up to targetVersion or latest version if not specified
  down [targetVersion]  - Migrate down to targetVersion
  status                - Show migration status
`);
    }
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await migrationManager.close();
  }
}

if (require.main === module) {
  main();
}
