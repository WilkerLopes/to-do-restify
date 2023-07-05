import { Todo } from "./todo.model.js";

export class TodoService {
  constructor() {}

  create(todo) {
    let item = new Todo(todo);
    return item.save();
  }

  count(params) {
    let query = this.parseToObject(params.where);

    return Todo.count(query);
  }
  find(page, perPage, params) {
    let query = this.parseToObject(params.where);
    let fields = this.parseToObject(params.fields, true);
    let options = { limit: perPage, skip: (page - 1) * perPage };

    return Todo.find(query, fields, options);
  }

  findOne(id, params = {}) {
    let fields = this.parseToObject(params.fields, true);
    return Todo.findById(id, fields);
  }

  update(id, updateTodo) {
    return Todo.updateOne({ _id: id }, { $set: updateTodo });
  }

  remove(id) {
    return Todo.deleteOne({ _id: id }).exec();
  }

  parseToObject(str, typed) {
    let obj = {};
    if (!str) return obj;

    let aux = str.split(",");
    aux.forEach((where) => {
      let item = where.split(":");
      obj[item[0]] = typed ? Boolean(item[1]) : item[1];
    });

    return obj;
  }
}
