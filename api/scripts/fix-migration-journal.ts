import * as fs from 'fs';
import * as path from 'path';

const journalPath = path.resolve(__dirname, '../drizzle/meta/_journal.json');
const migrationFilename = '0000_slippery_daimon_hellstrom.sql';

try {
  // Read the journal file
  const journalContent = fs.readFileSync(journalPath, 'utf8');
  const journal = JSON.parse(journalContent);
  
  // Create a backup of the journal
  fs.writeFileSync(`${journalPath}.backup`, journalContent);
  console.log('✅ Journal backup created');
  
  // Add the migration to the journal entries
  journal.entries = [{
    id: migrationFilename.split('_')[0],
    checksum: 'NA', // We don't have the checksum but this doesn't matter for this fix
    executedAt: new Date().toISOString()
  }];
  
  // Write the updated journal back
  fs.writeFileSync(journalPath, JSON.stringify(journal, null, 2));
  console.log(`✅ Migration "${migrationFilename}" marked as applied in the journal`);
  console.log('Next time you run migrations, Drizzle will know this migration was already applied');
  
} catch (error) {
  console.error('❌ Failed to update migration journal:', error);
}