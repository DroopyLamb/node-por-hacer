const fs = require('fs');

let listadoPorHacer = [];

const crear = (descripcion) => {
    // Invocamos la función cargarDB() para que
    // no se sobre escriban las tareas
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer); //Convertimos a un JSON válido
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw err('No se pudo grabar ', err);
    });
}

const cargarDB = () => {

    try {
        // Leemos un archivo JSON
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        // Manejamos el error por si el archivo está
        // vacío
        listadoPorHacer = [];
    }
}

const getListado = () => {
    // Cargamos la Base de datos
    cargarDB();
    // Retornamos el JSON
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    // Dame la posición de esa tarea si la descripción 
    // de la tarea coincide
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }
}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}