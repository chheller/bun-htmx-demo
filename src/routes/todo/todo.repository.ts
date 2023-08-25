import Database from "bun:sqlite";
import { Todo, TodoEntity } from "./todo.model";

export const getTodos = (db: Database) => {
  return db.query<never, Array<Todo>>("SELECT * FROM todos").all();
};
export const createTodo = (db: Database, { todo }: Omit<Todo, "id">) =>
  db.prepare<TodoEntity, string>("INSERT INTO todos (todo, complete) VALUES (?, false) RETURNING id, todo, complete").get(todo);

export const upsertTodo = (db: Database, todo: Todo) =>
  db
    .prepare<TodoEntity, { $todo: string; $id: number; $complete: number }>(
      "INSERT INTO todos (id, todo, complete) VALUES ($id, $todo, $complete) ON CONFLICT(id) DO UPDATE SET todo=excluded.todo, complete=excluded.complete RETURNING id, todo, complete",
    )
    .get({
      $todo: todo.todo,
      $complete: todo.complete ? 1 : 0,
      $id: todo.id,
    });
export const initializeTodoTable = (db: Database) =>
  db.query("CREATE TABLE IF NOT EXISTS todos ( id INTEGER PRIMARY KEY AUTOINCREMENT, todo TEXT(128), complete INTEGER )").run();
