require("colors");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
} = require("./helpers/inquirer");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");
const { guardarBD, leerBD } = require("./helpers/guardarArchivo");

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasBD = leerBD();

  if (tareasBD) {
    //Cargar tareas
    tareas.cargarTareasFromArray(tareasBD);
  }

  do {
    //Imprimir el menu
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        //crear opcion
        const desc = await leerInput("Descripción: ");
        tareas.crearTareas(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarPendientesCompletadas(true);
        break;
      case "4":
        tareas.listarPendientesCompletadas(false);
        break;
      case "5":
        const ids = await mostrarListadoCheckList(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          //Preguntar si esta seguro de borrar
          const ok = await confirmar("¿Estas seguro?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea Borrada");
          }
        }
        break;
      default:
        break;
    }
    guardarBD(tareas.listadoArr);
    await pausa();
  } while (opt !== "0");
};

main();
