import { Pool } from "pg";

// Use DATABASE_URL directly from process.env - Node will automatically load .env file values
async function checkTableExists() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    // Check if the products table exists
    const { rows } = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'products'
      );
    `);

    console.log("Products table exists:", rows[0].exists);

    // If the table exists, also check the structure
    if (rows[0].exists) {
      const { rows: columns } = await pool.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'products'
        ORDER BY ordinal_position;
      `);

      console.log("\nTable structure:");
      console.table(columns);
    }
  } catch (error) {
    console.error("Error checking table:", error);
  } finally {
    await pool.end();
  }
}

checkTableExists().catch(console.error);
