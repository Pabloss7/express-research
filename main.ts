import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
//import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { initialize } from './src/services/database.service';

// Open a database connection
async function openDB() {
  const dbPath = path.join(__dirname, '../data/pokemon.db');
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

async function main() {
  const db = await openDB();



}

// Initialize the database and then run the main function
(async () => {
  await initialize();

  await main();
})();