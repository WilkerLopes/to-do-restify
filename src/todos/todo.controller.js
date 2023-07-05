import { TodoService } from "./todo.service.js";
import { todoCreateSchema, todoUpdateSchema } from "./todo.validation.js";

const todoService = new TodoService();
export class TodoController {
  constructor() {}

  async create(req, res) {
    let reqTodo;
    try {
      reqTodo = await todoCreateSchema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });
    } catch (err) {
      res.send(400, { errors: err.errors });
    }

    try {
      const todos = await todoService.create(reqTodo);
      res.send(201, todos);
    } catch (err) {
      res.send(400, { errors: err.message });
    }
  }

  async getAll(req, res) {
    try {
      const { page, size } = req.query;
      const pageNumber = parseInt(page) || 1;
      const perPage = parseInt(size) || 10;

      const todos = await todoService.find(pageNumber, perPage, req.query);
      const totalCount = await todoService.count(req.query);
      const totalPages = Math.ceil(totalCount / perPage);

      if (page > totalPages) res.send(404, { errors: "Essa página não existe" });

      res.send(200, {
        total: totalCount,
        pages: totalPages,
        todos,
      });
    } catch (err) {
      res.send(400, { errors: err.message });
    }
  }

  async getById(req, res) {
    try {
      const todo = await todoService.findOne(req.params.id);
      if (todo) {
        res.send(200, todo);
      } else {
        res.send(404, { error: "Todo não encontrado" });
      }
    } catch (err) {
      res.send(400, { errors: err.message });
    }
  }

  async update(req, res) {
    try {
      await todoUpdateSchema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });
    } catch (err) {
      res.send(400, { errors: err.errors });
    }

    try {
      const todo = await todoService.update(req.params.id, req.body);
      res.send(202, todo);
    } catch (err) {
      res.send(400, { errors: err.message });
    }
  }

  async remove(req, res) {
    try {
      const todo = await todoService.remove(req.params.id);
      res.send(204, todo);
    } catch (err) {
      res.send(400, { errors: err.message });
    }
  }
}
