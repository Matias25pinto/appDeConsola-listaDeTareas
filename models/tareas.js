const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      //Eliminar la propiedad del objeto
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  get listadoArr() {
    const listado = [];

    //obtener todos los keys de un objeto, con javascript
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  crearTareas(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    const tareas = this.listadoArr;
    let indice = 1;
    tareas.forEach((tarea) => {
      let estado = "Pendiente";
      let imprimir = "";
      if (tarea.completadoEn !== null) {
        estado = "Completada";
        imprimir = `${indice.toString().green}${".".green} ${tarea.desc} :: ${
          estado.green
        }`;
      } else {
        imprimir = `${indice.toString().green}${".".green} ${tarea.desc} :: ${
          estado.red
        }`;
      }
      console.log(imprimir);
      ++indice;
    });
  }
  listarPendientesCompletadas(completadas = true) {
    const tareas = this.listadoArr;
    let indice = 1;
    if (completadas) {
      tareas.forEach((tarea) => {
        let estado = "Completada";
        let imprimir = "";
        if (tarea.completadoEn !== null) {
          imprimir = `${indice.toString().green}${".".green} ${tarea.desc} :: ${
            tarea.completadoEn.green
          }`;
        }
        console.log(imprimir);
        ++indice;
      });
    } else {
      tareas.forEach((tarea) => {
        let estado = "Pendiente";
        let imprimir = "";
        if (tarea.completadoEn === null) {
          imprimir = `${indice.toString().green}${".".green} ${tarea.desc} :: ${
            estado.red
          }`;
        }
        console.log(imprimir);
        ++indice;
      });
    }
  }
  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
