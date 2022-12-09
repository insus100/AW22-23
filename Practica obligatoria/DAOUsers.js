"use strict"
class DAOUsers {
    constructor(pool) {
        this.pool = pool;
    }

    getUserIdFromEmail(email, callback){
        this.pool.getConnection((err, connection) => {
            if(err) callback(new Error("Error de conexión a la base de datos"));
            else {
                connection.query(`SELECT id FROM UCM_AW_CAU_USU_Usuarios WHERE email='${email}'`,
                (err, rows) => {
                    connection.release();
                    if(err) callback(new Error("Error de acceso a la base de datos " + err));
                    else {
                        if (rows.length === 0) callback(new Error("No existe el usuario"), -1);
                        else {
                            callback(null, rows[0].id);
                        }
                    }
                });
            }
        });
    }

    isUserCorrect(email, password, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error("Error de conexión a la base de datos"));
            else {
                connection.query("SELECT * FROM UCM_AW_CAU_USU_Usuarios WHERE email = ? AND password = ?", [email,password],
                (err, rows) => {
                    connection.release(); // devolver al pool la conexión
                    if (err) callback(new Error("Error de acceso a la base de datos"));
                    else {
                        if (rows.length === 0) callback(null); //no está el usuario con el password proporcionado
                        else callback(null, rows[0]);
                    }
                });
            }
        });
    }

    getUserImageName(email, callback) {
        this.pool.getConnection((err, connection) => {
            if(err) callback(new Error("Error de conexión a la base de datos"));
            else {
                connection.query(`SELECT img FROM UCM_AW_CAU_USU_Usuarios WHERE email='${email}'`,
                (err, rows) => {
                    connection.release();
                    if(err) callback(new Error("Error de acceso a la base de datos"));
                    else {
                        if (rows.length === 0) callback(new Error("No existe el usuario"));
                        else callback(null, rows[0].img);
                    }
                });
            }
        });
    }

    registerUser(userData, callback) {
        this.pool.getConnection((err, connection) => {
            if(err) callback(new Error("Error de conexión a la base de datos"));
            else {
                connection.query(`INSERT INTO UCM_AW_CAU_USU_Usuarios (email, password, username, uniprofile, role, employeenumber, img) VALUES 
                ('${userData.email}', '${userData.password}', '${userData.username}', '${userData.uniprofile}', ${userData.role}, '${userData.role === 1 ? userData.employeenumber : ''}', '${userData.img}')`,
                (err, res) => {
                    connection.release();
                    if(err) callback(err);
                    else callback(null, res);
                })
            }
        })
    }
}

module.exports = {
    DAOUsers
}