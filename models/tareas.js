import 'colors';

import ToDo from "./tarea.js";

export default class ToDos {

  constructor() {
    /**
     * @private
     * @type {Object.<string, ToDo>}
     */
    this._listToDos = {};
  }

  /**
   *S
   *
   * @readonly
   * @memberof ToDos
   * @return {ToDo[]}
   */
  get getListTodos() {
    const tmpList = [];
    Object.keys(this._listToDos).forEach((key) => {
      const tarea = this._listToDos[key]
      tmpList.push(tarea)
    })

    return tmpList
  }

  /**
   * Create a new ToDo
   * @param {string} description 
   */
  crearTarea(description) {
    const tarea = new ToDo(description);
    this._listToDos[tarea.id] = tarea;
  }

  /**
   * Upload all ToDo object that exist in array.
   * @param {ToDo[]} todos 
   */
  uploadTodosFromArray(todos) {
    for (const todo of todos) {
      this._listToDos[todo.id] = todo;
    }
  }

  /**
   * Get All Todos
   */
  getAllTodos() {
    console.log('\n');

    const todos = this.getListTodos

    this.showInfoInConsole(todos)
  }

  /**
   * Get All Completed Todos
   */
  listCompletedTodos() {

    console.log('\n');

    const todos = this.getListTodos

    const completedTodos = todos.filter((todo) => todo.completedAt)

    this.showInfoInConsole(completedTodos)

  }

  /**
   * Get All Pending Todos
   */
  listPendingTodos() {

    console.log('\n');

    const todos = this.getListTodos

    const pendingTodos = todos.filter((todo) => !todo.completedAt)

    this.showInfoInConsole(pendingTodos)

  }


  /**
   * 
   * @param {string[]} ids 
   */
  toggleCompleteTodo(ids) {
    ids.forEach(id => {
      const todo = this._listToDos[id];
      if (!todo.completedAt) {
        todo.completedAt = new Date().toISOString()
      }
    })

    this.getListTodos.forEach((todo) => {
      if (!ids.includes(todo.id)) {
        const tmpTodo = this._listToDos[todo.id]
        tmpTodo.completedAt = null
      }
    })
  }

  /**
   * Delete a ToDo by id
   * @param {string} id 
   */
  deleteToDo(id) {
    if (this._listToDos[id]) {
      delete this._listToDos[id]
    }
  }

  /**
   * @private
   * @param {Array<ToDo>} listToDos
   */
  showInfoInConsole(listToDos) {
    listToDos.map((todo, index) => {
      const indexVerbose = `${(index + 1).toString().magenta}.`
      const todoDescriptionVerbose = `${todo.description}`
      let todoCompletedAtVerbose = ''
      if (todo.completedAt) {
        todoCompletedAtVerbose = new Date(todo.completedAt).toLocaleString().green
      } else {
        todoCompletedAtVerbose = "Pendiente".red
      }

      const todoVerbose = `${indexVerbose} ${todoDescriptionVerbose} :: ${todoCompletedAtVerbose}`

      console.log(todoVerbose)
    })
  }

}

