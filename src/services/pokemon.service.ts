
import { debug } from "console";
import { openDB } from "./database.service";



async function savePokemon(name: string, type: string): Promise<void> {
  const db = await openDB();
  await db.run('INSERT INTO pokemon (name, type) VALUES (?, ?)', [name, type]);
  await db.close();
}
async function getAllPokemons() {
  const db = await openDB();
  const data = await db.all('SELECT * FROM pokemon');
  await db.close();
  return data;
}

async function deletePokemon(name: string): Promise<void> {
  const db = await openDB();
  await db.run('DELETE FROM pokemon WHERE name = ?', [name]);
  await db.close();
}


async function patchPokemon(name: string, type: string): Promise<void> {
  const db = await openDB();
  await db.run('UPDATE pokemon SET type = ? WHERE name = ?', [type, name]);
  await db.close();
}

export {savePokemon, getAllPokemons, deletePokemon, patchPokemon};