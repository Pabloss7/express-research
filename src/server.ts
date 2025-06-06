import express from 'express';
import { savePokemon, getAllPokemons, deletePokemon, patchPokemon } from './services/pokemon.service';
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
//delete endpoint
app.delete('/pokemon', async (req, res) => {
  const name = req.query.name as string;
  openDB(); 
  try {
    await deletePokemon(name);
    res.status(200).send('Pokemon deleted');
  } catch (error) {
    res.status(500).send('Error deleting Pokemon');
  }
});
//put endpoint to update the name and type of a pokemon
app.put('/pokemon', async (req, res) => {
  const name = req.query.name as string;
  const type = req.query.type as string;
  openDB(); 
  try {
    await deletePokemon(name);
    await savePokemon(name, type);
    res.status(200).send('Pokemon updated');
  } catch (error) {
    res.status(500).send('Error updating Pokemon');
  }
});
//patch endpoint to update the type of a pokemon
app.patch('/pokemon', async (req, res) => {
  const name = req.query.name as string;
  const type = req.query.type as string;
  try {
    await patchPokemon(name, type);
    res.status(200).send('Pokemon type updated');
  } catch (error) {
    res.status(500).send('Error updating Pokemon type');
  }
});
//initialize the database before starting the server
async function initializeDB() {
    await initialize();
    console.log('Database initialized');
}

initializeDB();
//open the database connection before starting the server and listen on port 3000
app.listen(port, () => {
    openDB();
  console.log(`Server is running on http://localhost:${port}`);
});
