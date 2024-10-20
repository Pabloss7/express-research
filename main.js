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
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
//import inquirer from 'inquirer';
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const database_service_1 = require("./src/services/database.service");
// Open a database connection
function openDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const dbPath = path_1.default.join(__dirname, '../data/pokemon.db');
        const dbDir = path_1.default.dirname(dbPath);
        // Ensure the directory exists
        if (!fs_1.default.existsSync(dbDir)) {
            fs_1.default.mkdirSync(dbDir, { recursive: true });
        }
        return (0, sqlite_1.open)({
            filename: dbPath,
            driver: sqlite3_1.default.Database
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openDB();
    });
}
// Initialize the database and then run the main function
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_service_1.initialize)();
    yield main();
}))();
