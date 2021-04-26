require("colors"); //para darle color a los string en la consola

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear(); //para limpiar la consola.
    console.log("===================================".green);
    console.log("Seleccione una opción".green);
    console.log("===================================\n".green);

    console.log(`${"1.".green} Crear tarea`);
    console.log(`${"2.".green} Listar treas`);
    console.log(`${"3.".green} Listar tareas completadas`);
    console.log(`${"4.".green} Listar tareas pendientes`);
    console.log(`${"5.".green} Completar tarea(s)`);
    console.log(`${"6.".green} Borrar tarea`);
    console.log(`${"7.".green} Salir\n`);
    //Para leer los inputs del usuario con un paquete de node readline
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Seleccione una opción: ", (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve, reject) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPresione ${"ENTER".green} para continuar\n`, (opt) => {
      resolve();
      readline.close();
    });
  });
};
module.exports = { mostrarMenu, pausa };
