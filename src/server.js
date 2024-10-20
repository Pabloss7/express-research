"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pokemon_service_1 = require("./services/pokemon.service");
const database_service_1 = require("./services/database.service");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.post('/pokemon', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name;
    const type = req.query.type;
    (0, database_service_1.openDB)();
    try {
        yield (0, pokemon_service_1.savePokemon)(name, type);
        res.status(201).send('Pokemon saved');
    }
    catch (error) {
        res.status(500).send('Error saving Pokemon');
    }
}));
app.get('/pokemon', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pokemons = yield (0, pokemon_service_1.getAllPokemons)();
        res.status(200).json(pokemons);
    }
    catch (error) {
        res.status(500).send('Error fetching Pokemons');
    }
}));
//create a delete endpoint
app.delete('/pokemon', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name;
    (0, database_service_1.openDB)();
    try {
        yield (0, pokemon_service_1.deletePokemon)(name);
        res.status(201).send('Pokemon deleted');
    }
    catch (error) {
        res.status(500).send('Error deleting Pokemon');
    }
}));
function initializeDB() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, database_service_1.initialize)();
        console.log('Database initialized');
    });
}
initializeDB();
app.listen(port, () => {
    (0, database_service_1.openDB)();
    console.log(`Server is running on http://localhost:${port}`);
});
