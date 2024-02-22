import readLine from "readline"

import 'colors';

/**
 * 
 * @returns Promise<string>
 */
export const showMenu = () => {

  return new Promise((resolve) => {
    console.clear();

    console.log('============================='.green);
    console.log('   Seleccione una opción'.green);
    console.log('=============================\n'.green);

    console.log(`${'1.'.green} Crear tarea`);
    console.log(`${'2.'.green} Listar tareas`);
    console.log(`${'3.'.green} Listar tareas completadas`);
    console.log(`${'4.'.green} Listar tareas pendientes`);
    console.log(`${'5.'.green} Completar tarea(s)`);
    console.log(`${'6.'.green} Borrar un tarea`);
    console.log(`${'0.'.green} Salir\n`);

    const readLines = readLine.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readLines.question("Seleccione una opción: ", (option) => {
      readLines.close();
      resolve(option);
    })
  })


}

export const pause = () => {

  return new Promise(
    (resolve) => {
      const readLines = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      readLines.question(`\nPresione ${'ENTER'.green} para continuar\n`, (option) => {
        readLines.close();
        resolve();
      })
    }
  );

}
