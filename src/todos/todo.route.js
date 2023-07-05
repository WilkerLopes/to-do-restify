import { asyncMiddleware } from "../middlewares.js";
import { TodoController } from "./todo.controller.js";

const todoController = new TodoController();

export default (server) => {
  server.get("/todos", asyncMiddleware(todoController.getAll));
  server.post("/todos", asyncMiddleware(todoController.create));
  server.get("/todos/:id", asyncMiddleware(todoController.getById));
  server.put("/todos/:id", asyncMiddleware(todoController.update));
  server.patch("/todos/:id", asyncMiddleware(todoController.update));
  server.del("/todos/:id", asyncMiddleware(todoController.remove));
};
