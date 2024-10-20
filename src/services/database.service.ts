import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';

// Open a database connection
export async function openDB() {
  const dbPath = path.join(__dirname, '../../data/pokemons.db');
  const dbDir = path.dirname(dbPath);

  // Ensure the directory exists
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  return open({
    filename: dbPath,
    driver: sqlite3.Database
  });
}

// Initialize the database
export async function initialize() {
  const db = await openDB();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS pokemon (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      type TEXT
    )
  `);
  await db.close();
}