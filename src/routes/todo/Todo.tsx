import * as elements from "typed-html";
import { BaseHtml } from "../../components/BaseHtml";
import { Todo } from "./todo.model";

export const TodoPage = ({ todos }: { todos: Array<Todo> }) => (
  <BaseHtml>
    <body class="flex flex-col min-h-screen m-0">
      <div class="w-full place-items-center text-center">
        <h1 id="header" class="font-bold my-8 text-4xl">
          To Do App
        </h1>
      </div>
      <div id="todos_form" class="flex flex-1 flex-col justify-start items-center">
        <form class="my-8 ">
          <input name="todo" placeholder="To do..." class="border-0" />
          <button
            type="submit"
            hx-post="/todo"
            hx-swap="none"
            class="bg-blue-700 rounded-md py-2 px-4 mx-1 text-bold text-white shadow-md"
          >
            Save
          </button>
        </form>
        <div id="todos" class="flex justify-center w-full">
          <table class="table-fixed min-w-[75%] text-left text-sm">
            <thead class="border-b font-medium">
              <tr>
                <th>No.</th>
                <th>Todo Item</th>
                <th>Complete</th>
              </tr>
            </thead>
            <tbody id="todos_table_body" hx-get="/todo/table" hx-trigger="newTodo from:body">
              {todos.map((todo) => (
                <TodoTableRow todo={todo} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div class="w-full">footer</div>
    </body>
  </BaseHtml>
);

export const TodoTableRow = ({ todo: { id, complete, todo } }: { todo: Todo }) => {
  return (
    <tr id={`todo_row_${id}`}>
      <td class="font-semibold">{id}</td>
      <td>{todo}</td>
      <td>
        <form>
          <input type="hidden" value={id.toString()} name="id" />
          <input type="hidden" value={todo} name="todo" />
          <input
            hx-target={`#todo_row_${id}`}
            hx-put="/todo"
            type="checkbox"
            name="complete"
            value="true"
            checked={complete ? "checked" : "unchecked"}
          />
        </form>
      </td>
    </tr>
  );
};
