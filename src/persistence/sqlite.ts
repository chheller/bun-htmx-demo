import Database from "bun:sqlite";
import { initializeTodoTable } from "../routes/todo/todo.repository";

const db = new Database("tododb.sqlite", { create: true });

initializeTodoTable(db);

export { db };
