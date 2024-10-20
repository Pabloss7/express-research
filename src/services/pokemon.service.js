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
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePokemon = savePokemon;
exports.getAllPokemons = getAllPokemons;
exports.deletePokemon = deletePokemon;
exports.patchPokemon = patchPokemon;
const database_service_1 = require("./database.service");
function savePokemon(name, type) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_service_1.openDB)();
        yield db.run('INSERT INTO pokemon (name, type) VALUES (?, ?)', [name, type]);
        yield db.close();
    });
}
function getAllPokemons() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_service_1.openDB)();
        const data = yield db.all('SELECT * FROM pokemon');
        yield db.close();
        return data;
    });
}
function deletePokemon(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_service_1.openDB)();
        yield db.run('DELETE FROM pokemon WHERE name = ?', [name]);
        yield db.close();
    });
}
function patchPokemon(name, type) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_service_1.openDB)();
        yield db.run('UPDATE pokemon SET type = ? WHERE name = ?', [type, name]);
        yield db.close();
    });
}
