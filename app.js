const argv = require("./config/yargs").argv;
const porHacer = require('./por-hacer/por-hacer');
const colors = require('colors');
let comando = argv._[0];

switch (comando) {
    case 'crear':
        //Crea la tarea
        let tarea = porHacer.crear(argv.descripcion);
        break;
    case 'listar':
        let listado = porHacer.getListado();

        for (let tarea of listado) {
            console.log('===========Por Hacer ========='.rainbow);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('=============================='.rainbow);
        }
        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.c);
        console.log(actualizado);
        break;
    case 'borrar':
        console.log(argv.descripcion);
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;
    default:
        console.log('Comando no reconocido');
        break;
}