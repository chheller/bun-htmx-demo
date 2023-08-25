import Elysia, { t } from "elysia";
import * as elements from "typed-html";
import { setup } from "../..";
import { TodoPage, TodoTableRow } from "./Todo";
import { createTodo, getTodos, upsertTodo } from "./todo.repository";

export const todoController = (app: Elysia) =>
  app
    .use(setup)
    .get("/todo", ({ html, db }) => html(<TodoPage todos={getTodos(db())} />))
    .get("/todo/table", ({ html, db }) =>
      html(
        getTodos(db())
          .map((todo) => <TodoTableRow todo={todo} />)
          .reduce((acc, prev) => `${acc}\n${prev}`, ""),
      ),
    )
    .post(
      "/todo",
      ({ body, db, set }) => {
        createTodo(db(), {
          ...body,
          complete: mapComplete(body.complete),
        });
        set.headers["HX-Trigger"] = "newTodo";
      },
      {
        body: t.Object({
          todo: t.String(),
          complete: t.Optional(t.Union([t.String(), t.Boolean({ default: false })])),
        }),
      },
    )
    .put(
      "/todo",
      ({ html, body, db }) => {
        const todoRequest = {
          todo: body.todo,
          id: body.id,
          complete: mapComplete(body.complete),
        };
        const todo = upsertTodo(db(), todoRequest);
        if (todo) return html(<TodoTableRow todo={todo} />);
      },
      {
        body: t.Object({
          todo: t.String(),
          id: t.Numeric(),
          complete: t.Optional(t.Union([t.String(), t.Boolean({ default: false })])),
        }),
      },
    );

const mapComplete = (complete?: string | boolean | undefined) =>
  complete != null ? (typeof complete === "string" ? complete === "checked" : false) : false;
