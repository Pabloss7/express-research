import express from 'express';
import { savePokemon, getAllPokemons, deletePokemon } from './services/pokemon.service';
import { initialize, openDB } from './services/database.service';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/pokemon', async (req, res) => {
  const name = req.query.name as string;
  const type = req.query.type as string;
  openDB(); 
  try {
    await savePokemon(name, type);
    res.status(201).send('Pokemon saved');
  } catch (error) {
    res.status(500).send('Error saving Pokemon');
  }
});

app.get('/pokemon', async (req, res) => {
  try {
    const pokemons = await getAllPokemons();
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).send('Error fetching Pokemons');
  }
});
//create a delete endpoint
app.delete('/pokemon', async (req, res) => {
  const name = req.query.name as string;
  openDB(); 
  try {
    await deletePokemon(name);
    res.status(201).send('Pokemon deleted');
  } catch (error) {
    res.status(500).send('Error deleting Pokemon');
  }
});

async function initializeDB() {
    await initialize();
    console.log('Database initialized');
}

initializeDB();

app.listen(port, () => {
    openDB();
  console.log(`Server is running on http://localhost:${port}`);
});