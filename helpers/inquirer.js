import "colors"
import inquirer from "inquirer";

import ToDo from "../models/tarea.js";
/**
 * 
 * Options Menu
 * @type {inquirer.Answers}
 */
const menuOptions = [
  {
    type: 'list',
    name: 'option',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Crear tarea`
      },
      {
        value: '2',
        name: `${'2.'.green} Listar tareas`
      },
      {
        value: '3',
        name: `${'3.'.green} Listar tareas completadas`
      },
      {
        value: '4',
        name: `${'4.'.green} Listar tareas pendientes`
      },
      {
        value: '5',
        name: `${'5.'.green} Completar tarea(s)`
      },
      {
        value: '6',
        name: `${'6.'.green} Borrar tarea`
      },
      {
        value: '0',
        name: `${'0.'.green} Salir`
      },

    ]
  }
]

/**
 * 
 * @returns {Promise<string>} option
 */
export const inquirerMenu = async () => {
  console.clear();
  console.log('============================='.green);
  console.log('   Seleccione una opción'.green);
  console.log('=============================\n'.green);

  const { option } = await inquirer.prompt(menuOptions);
  return option;
}

////////////////////////////////////////////////////////////////////

/**
 * @type {inquirer.Answers}
 */
const pauseOptions = [
  {
    type: 'input',
    name: 'enter',
    message: `Presione ${'ENTER'.green} para continuar`
  }
]

export const pause = async () => {
  console.log('\n')
  await inquirer.prompt(pauseOptions);
}

////////////////////////////////////////////////////////////////////

export const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'description',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true;
      }
    }
  ]

  const { description } = await inquirer.prompt(question);
  return description

}

////////////////////////////////////////////////////////////////////

/**
 * 
 * @param {ToDo[]} todos
 * @returns {Promise<string>} id
 */
export const listToDosToErase = async (todos) => {

  const choices = todos.map((todo, i) => {

    const index = `${i + 1}`.green

    return {
      value: todo.id,
      name: `${index}. ${todo.description}`,
    }
  })

  choices.unshift({
    value: '0',
    name: `${'0'.green}. Cancelar`
  })

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices
    }
  ]

  const { id } = await inquirer.prompt(questions)

  return id

}


////////////////////////////////////////////////////////////////////

/**
 * 
 * @param {ToDo[]} todos 
 * @returns {Promise<string[]>}
 */
export const listTodosToCheck = async (todos) => {

  const choices = todos.map((todo) => {
    return {
      value: todo.id,
      name: `${todo.description}`,
      checked: todo.completedAt ? true : false,
    }
  })

  const questions = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecione: ',
      choices
    }
  ];

  const { ids } = await inquirer.prompt(questions);

  return ids;

}

////////////////////////////////////////////////////////////////////

/**
 * 
 * @param {string} message
 * @returns {Promise<boolean>}
 */
export const confirm = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ]

  const { ok } = await inquirer.prompt(question);
  return ok
}