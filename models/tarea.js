import { v4 as uuidv4 } from 'uuid';

export default class ToDo {

  /**
   * 
   * @param {Array<string>} arrayToDos 
   * @returns {Array<ToDo>}
   */
  static todoFromArray(arrayToDos) {

    const tmpList = []

    for (const rawToDo of arrayToDos) {
      const tarea = new ToDo(rawToDo['description'])
      tarea.id = rawToDo['id']
      tarea.completedAt = rawToDo['completedAt']

      tmpList.push(tarea)
    }

    return tmpList
  }

  /**
   * 
   * @param {string} description 
   */
  constructor(description) {
    /**
     * @type {string}
     */
    this.id = uuidv4();
    /**
     * @type {string}
     */
    this.description = description;
    this.completedAt = null;
  }

}