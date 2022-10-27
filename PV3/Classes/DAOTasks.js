"use strict";

class DAOTasks {
    constructor(pool) {
        this.pool = pool;
    }

    getAllTasks(email, callback) {
        this.pool.getConnection((err, connection) => {
            if(err) callback(new Error("Error de conexión a la base de datos"));
            else {
                connection.query(`SELECT idUser FROM aw_tareas_usuarios WHERE email=${email}`,
                (err, rows) => {
                    if(err) callback(new Error("Error de acceso a la base de datos"));
                    else {
                        if (rows.length === 0) callback(new Error("No existe el usuario"));
                        else {
                            const idUser = rows[0].idUser;
                            /*SELECT idUser, aw_tareas_tareas.idTareas, hecho, aw_tareas_tareas.texto, aw_tareas_etiquetas.texto FROM aw_tareas_user_tarea JOIN aw_tareas_tareas ON aw_tareas_user_tarea.idTarea = aw_tareas_tareas.idTareas JOIN aw_tareas_tareas_etiquetas ON aw_tareas_tareas.idTareas = aw_tareas_tareas_etiquetas.idTarea JOIN aw_tareas_etiquetas ON aw_tareas_etiquetas.idEtiqueta = aw_tareas_tareas_etiquetas.idEtiqueta WHERE aw_tareas_user_tarea.idUser = 1;*/
                            connection.query(`SELECT * FROM aw_tareas_user_tarea JOIN aw_tareas_tareas ON aw_tareas_user_tarea.idTarea = aw_tareas_tareas.idTareas WHERE aw_tareas_user_tarea.idUser = ${idUser}`,
                            (err, rows) => {
                                connection.release();
                                if(err) callback(new Error("Error de acceso a la base de datos"));
                                else {
                                    let tasks = [], task = {};
                                    rows.forEach((tarea) => {
                                        task.id = tarea.idTarea;
                                        task.text = tarea.texto;
                                        task.done = tarea.hecho;
                                        
                                    });
                                }
                            })
                        }
                    }
                });
            }
        });
    }
}

module.exports = {
    DAOTasks
}