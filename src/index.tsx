import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { todoController } from "./routes/todo/todo.controller";
import { html } from "@elysiajs/html";
import { db } from "./persistence/sqlite";
export const setup = (app: Elysia) =>
	app
		.use(html())
		.use(swagger())
		.decorate("db", () => db);
export const app = new Elysia()
	.use(setup)
	.get("/", ({ set }) => {
		set.redirect = "/todo";
	})
	.use(todoController)
	.listen(3000);

console.log(
	`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
