import 'colors';

import ToDos from './models/tareas.js';
import { saveDB, readDB } from './helpers/saveFile.js';
import { inquirerMenu, pause, readInput, listToDosToErase, confirm, listTodosToCheck } from './helpers/inquirer.js';
import ToDo from './models/tarea.js';

console.clear();

const main = async () => {

  let opt = '';
  const tareas = new ToDos();

  const todosDB = readDB();

  if (todosDB) {
    const listTodo = ToDo.todoFromArray(todosDB);
    console.log(listTodo)
    tareas.uploadTodosFromArray(listTodo);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      //* Create a TODO
      case '1':
        const description = await readInput('Agregue una tarea: ');
        tareas.crearTarea(description);
        break;
      //* List TODOS
      case '2':
        tareas.getAllTodos()
        break;
      //* List Completed TODOS
      case '3':
        tareas.listCompletedTodos()
        break;
      //* List Pending TODOS
      case '4':
        tareas.listPendingTodos()
        break;
      //* Complete All TODOS
      case '5':
        const ids = await listTodosToCheck(tareas.getListTodos);
        tareas.toggleCompleteTodo(ids)

        break;
      //* Delete a TODO
      case '6':
        const id = await listToDosToErase(tareas.getListTodos);

        if (id !== '0') {
          const isOk = await confirm('Estás seguro?');

          if (isOk) {
            tareas.deleteToDo(id);
            console.log('Tarea Borrada ✔️'.yellow)
          }
        }


        break;
    }

    saveDB(tareas.getListTodos);

    if (opt !== '0') await pause();

  } while (opt != '0');
}

main();